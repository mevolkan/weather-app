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

        // Fetch weather data from OpenWeatherMap API
        $response = Http::get('https://api.openweathermap.org/data/2.5/forecast', [
            'q' => $location,
            'appid' => $this->apiKey,
            'units' => 'metric'
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Unable to fetch weather data'], 500);
        }

        $weatherData = $response->json();
        
        // Store the weather data in the database
        Weather::create([
            'location' => $location,
            'data' => json_encode($weatherData)
        ]);

        return response()->json($weatherData);
    }
}
