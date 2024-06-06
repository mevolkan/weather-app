<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Weather;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.openweathermap.key');
    }

    private function getCoordinates($location)
    {
        $geoResponse = Http::withOptions(['verify' => false])->get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $location,
            'limit' => 1,
            'appid' => $this->apiKey
        ]);

        if ($geoResponse->failed() || empty($geoResponse->json())) {
            return null;
        }

        return $geoResponse->json()[0];
    }

    private function fetchWeatherData($lat, $lon, $endpoint)
    {
        $response = Http::withOptions(['verify' => false])->get($endpoint, [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $this->apiKey,
            'units' => 'metric'
        ]);

        if ($response->failed()) {
            return null;
        }

        return $response->json();
    }

    private function IsNullOrEmptyString($str)
    {
        return ($str === null || trim($str) === '');
    }

    public function getWeather(Request $request)
    {
        $location = strip_tags($request->input('location'));

        // Check if the location is already in the database
        $weather = Weather::where('location', $location)->first();

        if ($weather) {
            return response()->json(json_decode($weather->data));
        }
        if ($this->isNullOrEmptyString($location)) {
            // return response()->json(['error' => 'Location is required'], 400);
            $lat = strip_tags($request->input('lat'));
            $lon = strip_tags($request->input('lon'));
        } else {
            $geoData = $this->getCoordinates($location);

            if (!$geoData) {
                return response()->json(['error' => 'Unable to fetch coordinates for the location'], 500);
            }

            $lat = $geoData['lat'];
            $lon = $geoData['lon'];
        }

        $weatherData = $this->fetchWeatherData($lat, $lon, 'https://api.openweathermap.org/data/2.5/weather');

        if (!$weatherData) {
            return response()->json(['error' => 'Unable to fetch weather data'], 500);
        }

        // Store the weather data in the database
        Weather::create([
            'location' => $location,
            'data' => json_encode($weatherData)
        ]);

        return response()->json($weatherData);
    }

    public function getWeatherForecast(Request $request)
    {
        $location = strip_tags($request->input('location'));

        if ($this->isNullOrEmptyString($location)) {
            // return response()->json(['error' => 'Location is required'], 400);
            $lat = strip_tags($request->input('lat'));
            $lon = strip_tags($request->input('lon'));
        } else {
            $geoData = $this->getCoordinates($location);

            if (!$geoData) {
                return response()->json(['error' => 'Unable to fetch coordinates for the location'], 500);
            }

            $lat = $geoData['lat'];
            $lon = $geoData['lon'];
        }

        $forecastData = $this->fetchWeatherData($lat, $lon, 'https://api.openweathermap.org/data/2.5/forecast');

        if (!$forecastData) {
            return response()->json(['error' => 'Unable to fetch weather forecast data'], 500);
        }

        return response()->json($forecastData);
    }
}
