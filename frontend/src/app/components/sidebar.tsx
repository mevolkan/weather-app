"use client";

import React from 'react';
import { WeatherData } from '../../../types/types';
import Image from 'next/image';

interface WeatherProps {
    weatherData: WeatherData | null;
}

const Sidebar: React.FC<WeatherProps> = ({ weatherData }) => {
    const formatLocalTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000); 
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); 
    };

    const formatLocalDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000); 
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const ordinalSuffix = (n: number) => {
            const s = ["th", "st", "nd", "rd"],
                v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };

        return `${ordinalSuffix(day)} ${month} ${year}`;
    };

    return (
        <>
            {weatherData && (
                <div className="weather-data flex flex-col items-center justify-center">
                    <Image
                        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
                        width={150}
                        height={150}
                        alt={weatherData.weather[0].description}
                    />
                    <p className='text-5xl font-semibold pb-2'>{weatherData.main.temp}°C</p>
                    <p className='text-2xl pb-2 capitalize'>{weatherData.weather[0].description}</p>
                    <p className='pb-2'>{formatLocalTime(weatherData.dt)}</p>
                    <p>{formatLocalDate(weatherData.dt)}</p>
                    <p>{weatherData.name}</p>
                </div>
            )}
        </>
    );
};

export default Sidebar;