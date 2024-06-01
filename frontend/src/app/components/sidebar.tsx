import React from 'react';
import { WeatherData } from '../../../types/types';
import Image from 'next/image'

interface SidebarProps {
    weatherData: WeatherData | null;
}
const Sidebar: React.FC<SidebarProps> = ({ weatherData }) => {
    return (
        <>
            {weatherData && (
                <div className="weather-data flex flex-col items-center justify-center">
                    <Image
                        src ={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
                        width={150}
                        height={150}
                        alt={weatherData.weather[0].description}
                    />
                    <p>{weatherData.main.temp}°C</p>
                    <p>{weatherData.weather[0].main}</p>
                    <p>{weatherData.weather[0].description}</p>
                    <p>{weatherData.name}</p>
                </div>
            )}
        </>
    );
}

export default Sidebar;
