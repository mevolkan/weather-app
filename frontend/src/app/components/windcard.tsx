"use client";

import React from 'react';
import { WeatherData } from '../../../types/types';

interface WindCardProps {
    weatherData: WeatherData | null;
}

const WindCard: React.FC<WindCardProps> = ({ weatherData }) => {
    if (!weatherData) {
        return null;
    }

    const { wind } = weatherData;

    const getCardinalDirection = (angle: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(angle / 45) % 8;
        return directions[index];
    };

    const windSpeedKmh = wind.speed * 3.6;

    return (
        <div className="flex h-40 w-full items-center justify-center">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">Wind Status</h2>
                    <p className="text-content2">
                        <span>{windSpeedKmh.toFixed(2)} km/h</span><br />
                        <span>{getCardinalDirection(wind.deg)} ({wind.deg}°)</span>
                    </p>
                    <div className="card-footer">
                        <span>Wind Icon</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindCard;