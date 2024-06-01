import React from 'react';
 import { WeatherData } from '../../../types/types';
 interface SidebarProps {
    weatherData: WeatherData | null;
}
const Sidebar: React.FC<SidebarProps> = ({ weatherData }) => {
    return (
        <div>
            {weatherData && (
                <div className="weather-data">
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
