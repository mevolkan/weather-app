"use client";

import React from 'react';

interface HumidityCardProps {
    humidity: number; 
}

const HumidityCard: React.FC<HumidityCardProps> = ({ humidity }) => {
    return (
        <div className="flex h-40 w-full items-center justify-center">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">Humidity</h2>
                    <p className="text-content2">{humidity}%</p>
                    <div className="card-footer">
                        {/* Additional content or footer */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HumidityCard;
