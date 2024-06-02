"use client";

import React, { useState, useEffect } from 'react';
import { Forecast, WeatherData } from '../../../types/types';
import Sidebar from './sidebar';
import Search from './search';
import Switch from './switch';
import ForecastCard from './forecastcard';
import WindCard from './windcard';
import HumidityCard from './humiditycard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const WeatherContainer: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [forecastData, setForecastData] = useState<Forecast[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (location: string) => {
        setError(null);
        setWeatherData(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?location=${location}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Unable to fetch weather data');
            }

            const data: WeatherData = await response.json();
            setWeatherData(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchWeatherDataByCoords = async (lat: number, lon: number) => {
        setError(null);
        setWeatherData(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?lat=${lat}&lon=${lon}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Unable to fetch weather data');
            }

            const data: WeatherData = await response.json();
            setWeatherData(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchForecastData = async (location: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forecast?location=${location}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Unable to fetch forecast data');
            }

            const data: ForecastData = await response.json();
            setForecastData(data.list); // Assuming the API returns an array of forecasts in 'list'
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchForecastDataByCoords = async (lat: number, lon: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forecast?lat=${lat}&lon=${lon}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Unable to fetch forecast data');
            }

            const data: ForecastData = await response.json();
            setForecastData(data.list); // Assuming the API returns an array of forecasts in 'list'
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherDataByCoords(latitude, longitude);
                },
                (err) => {
                    console.error(err);
                    setError("Unable to retrieve your location. Using default location Nairobi.");
                    fetchWeatherData("Nairobi");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser. Using default location Nairobi.");
            fetchWeatherData("Nairobi");
        }
    }, []);

    return (
        <div className="flex flex-row sm:gap-10 ">
            <div className="sm:w-full sm:max-w-[18rem]">
                <input aria-label="mobile sidebar" type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
                <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay" />
                <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-center max-sm:fixed max-sm:-translate-x-full">
                    <Sidebar weatherData={weatherData} />
                </aside>
            </div>
            <main className="w-full ">
                <div className="w-full gap-1 flex p-4 justify-between">
                    <>
                        <label htmlFor="sidebar-mobile-fixed" className="p-4 sm:hidden">
                        <FontAwesomeIcon icon={faBars as IconProp} />
                        </label>
                    </>
                    <Search fetchWeatherData={fetchWeatherData} />
                    <Switch />
                </div>
                <div className="flex flex-col p-4">
                    <div className="my-4 grid grid-cols-3 gap-4">
                    {forecastData && forecastData.slice(0, 3).map((forecast: Forecast, index: number) => (
                            <ForecastCard 
                                key={index} 
                                date={forecast.dt} 
                                icon={forecast.weather[0].icon} 
                                description={forecast.weather[0].description} 
                            />
                        ))}
                    </div>
                    <div className="my-4 grid w-full grid-cols-2 gap-2">
                        <WindCard weatherData={weatherData} />
                        <HumidityCard humidity={weatherData?.main.humidity || 0} />
                    </div>
                </div>
                {error && <p>{error}</p>}
            </main>
        </div>
    );
};

export default WeatherContainer;