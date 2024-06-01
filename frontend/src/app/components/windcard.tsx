"use client";

import React from 'react';
import { WeatherData } from '../../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface WindCardProps {
    weatherData: WeatherData | null;
}

const WindCard: React.FC<WindCardProps> = ({ weatherData }) => {
    if (!weatherData) {
        return null;
    }

    const { wind } = weatherData;

    const getCardinalDirection = (angle: number) => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(angle / 22.5) % 16;
        return directions[index];
    };

    const windSpeedKmh = wind.speed * 3.6;

    return (
        <div className="flex h-40 w-full items-center justify-center">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">Wind Status</h2>
                    <p className="text-content">
                        <span>{windSpeedKmh.toFixed(2)} km/h</span><br />
                    </p>
                    <div className="card-footer">
                    <span className='flex gap-2'>
                    <FontAwesomeIcon icon={faCompass as IconProp} />
                      {getCardinalDirection(wind.deg)} ({wind.deg}°)
                    </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindCard;
