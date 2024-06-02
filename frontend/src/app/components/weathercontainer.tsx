"use client";

import React, { useState, useEffect } from 'react';
import { Forecast, ForecastData, WeatherData } from '../../../types/types';
import Sidebar from './sidebar';
import Search from './search';
import Switch from './switch';
import ForecastCard from './forecastcard';
import WindCard from './windcard';
import HumidityCard from './humiditycard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherContainer: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [forecastData, setForecastData] = useState<Forecast[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (location: string) => {
        setError(null);
        setWeatherData(null);
        setForecastData(null);

        try {
            const weatherResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?location=${location}`, {
                method: 'GET'
            });

            if (!weatherResponse.ok) {
                throw new Error('Unable to fetch weather data');
            }

            const weatherData: WeatherData = await weatherResponse.json();
            setWeatherData(weatherData);

            const forecastResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forecast?location=${location}`, {
                method: 'GET'
            });

            if (!forecastResponse.ok) {
                throw new Error('Unable to fetch forecast data');
            }

            const forecastData = await forecastResponse.json();
            setForecastData(forecastData.list);

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

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

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
                        <label htmlFor="sidebar-mobile-fixed" className="p-4 sm:hidden">
                            <FontAwesomeIcon icon={faBars as IconProp} />
                        </label>
                    <Search fetchWeatherData={fetchWeatherData} />
                    <Switch />
                </div>
                <div className="flex flex-col p-4">
                    <div className="my-4 grid grid-cols-1 gap-4">
                        <Slider {...settings}>
                            {forecastData && forecastData.map((forecast: Forecast, index: number) => (
                                <ForecastCard
                                    key={index}
                                    date={forecast.dt}
                                    icon={forecast.weather[0].icon}
                                    mintemp={forecast.main.temp_min}
                                    maxtemp={forecast.main.temp_max}
                                    description={forecast.main.description}
                                />
                            ))}
                        </Slider>
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