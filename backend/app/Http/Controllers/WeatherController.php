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

    public function getWeather(Request $request)
    {
        $location = $request->input('location');

        // Check if the location is already in the database
        $weather = Weather::where('location', $location)->first();

        if ($weather) {
            return response()->json(json_decode($weather->data));
        }

        // Fetch coordinates from OpenWeatherMap Geocoding API
        $geoResponse = Http::withOptions(['verify' => false])->get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $location,
            'limit' => 1,
            'appid' => $this->apiKey
        ]);

        if ($geoResponse->failed() || empty($geoResponse->json())) {
            return response()->json(['error' => 'Unable to fetch coordinates for the location'], 500);
        }

        $geoData = $geoResponse->json()[0];
        $lat = $geoData['lat'];
        $lon = $geoData['lon'];

        // Fetch weather data from OpenWeatherMap Weather API using coordinates
        $weatherResponse = Http::withOptions(['verify' => false])->get('https://api.openweathermap.org/data/2.5/weather', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $this->apiKey,
            'units' => 'metric'
        ]);

        if ($weatherResponse->failed()) {
            return response()->json(['error' => 'Unable to fetch weather data'], 500);
        }

        $weatherData = $weatherResponse->json();

        // Store the weather data in the database
        Weather::create([
            'location' => $location,
            'data' => json_encode($weatherData)
        ]);

        return response()->json($weatherData);
    }
}