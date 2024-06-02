"use client";

import React from 'react';
import Image from 'next/image'

interface ForecastCardProps {
    date: number;
    icon: string;
    description: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ date, icon, description }) => {
    const formattedDate = new Date(date * 1000).toLocaleDateString(); 

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-header">{formattedDate}</h2>
                <div className="text-content">
                <Image
                        src ={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
                        width={150}
                        height={150}
                        alt="alt text"
                    />
                </div>
                <div className="card-footer">
                    {description}
                </div>
            </div>
        </div>
    );
};

export default ForecastCard;