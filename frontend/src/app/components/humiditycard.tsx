"use client";

import React from 'react';

interface HumidityCardProps {
    humidity: number;
}

const HumidityCard: React.FC<HumidityCardProps> = ({ humidity }) => {
    const humidityLevel = `${humidity}%`;

    return (
        <div className="flex h-40 w-full items-center justify-center">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">Humidity</h2>
                    <p className="text-content">{humidity}%</p>
                    <div className="card-footer">
                        <div className="humidity-bar">
                            <div className="progress" style={{ width: humidityLevel }}>
                                <span className="progress-label">{humidityLevel}</span>
                            </div>
                        </div>
                        {/* <progress value={humidityLevel} max={100} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HumidityCard;
