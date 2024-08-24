<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Weather;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
    {
    private $apiKey;
    private const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
    private const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    private const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

    public function __construct()
        {
        $this->apiKey = config('services.openweathermap.key');
        }

    public function getWeather(Request $request)
        {
        try {
            $location = $this->getLocationFromRequest($request);
            $cachedWeather = $this->getCachedWeather($location);

            if ($cachedWeather) {
                return response()->json(json_decode($cachedWeather->data));
                }

            $coordinates = $this->getCoordinates($location);
            $weatherData = $this->fetchWeatherData($coordinates['lat'], $coordinates['lon'], self::WEATHER_API_URL);

            $this->cacheWeatherData($location, $weatherData);

            return response()->json($weatherData);
            } catch (\Exception $e) {
            Log::error('Error fetching weather data: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to fetch weather data'], 500);
            }
        }

    public function getWeatherForecast(Request $request)
        {
        try {
            $location = $this->getLocationFromRequest($request);
            $coordinates = $this->getCoordinates($location);
            $forecastData = $this->fetchWeatherData($coordinates['lat'], $coordinates['lon'], self::FORECAST_API_URL);

            return response()->json($forecastData);
            } catch (\Exception $e) {
            Log::error('Error fetching weather forecast data: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to fetch weather forecast data'], 500);
            }
        }

    private function getLocationFromRequest(Request $request): string
        {
        $location = $request->input('location');

        if (blank($location)) {
            $lat = $request->input('lat');
            $lon = $request->input('lon');

            if (blank($lat) || blank($lon)) {
                throw new \InvalidArgumentException('Either location or lat/lon coordinates are required');
                }

            return "$lat,$lon";
            }

        return $location;
        }

    private function getCoordinates($location)
        {
        if (strpos($location, ',') !== false) {
            list($lat, $lon) = explode(',', $location);
            return ['lat' => $lat, 'lon' => $lon];
            }

        $geoResponse = Http::withOptions(['verify' => false])->get(self::GEO_API_URL, [
            'q' => $location,
            'limit' => 1,
            'appid' => $this->apiKey
        ]);

        if ($geoResponse->failed() || empty($geoResponse->json())) {
            throw new \Exception('Unable to fetch coordinates for the location');
            }

        $geoData = $geoResponse->json()[0];
        return ['lat' => $geoData['lat'], 'lon' => $geoData['lon']];
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
            throw new \Exception('Unable to fetch weather data from API');
            }

        return $response->json();
        }

    private function isNullOrEmptyString($str)
        {
        return ($str === null || trim($str) === '');
        }

    private function getCachedWeather($location)
        {
        return Weather::where('location', $location)->first();
        }

    private function cacheWeatherData($location, $weatherData)
        {
        Weather::create([
            'location' => $location,
            'data' => json_encode($weatherData)
        ]);
        }
    }