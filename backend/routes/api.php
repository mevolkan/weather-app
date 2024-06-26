<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// weather endpoint
Route::get('/weather', [WeatherController::class, 'getWeather']);

// forecast endpoint
Route::get('/forecast', [WeatherController::class, 'getWeatherForecast']);