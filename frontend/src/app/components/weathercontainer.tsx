"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { WeatherData } from '../../../types/types';
import Sidebar from './sidebar';
import Main from './maincontent';
import Search from './search';
import Switch from './switch';

const WeatherContainer: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
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

    return (
        <> <div className="flex flex-row sm:gap-10" >
            <div className="sm:w-full sm:max-w-[18rem]">
                <input  aria-label="mobile sidebar" type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
                <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay" />
                <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
                    <Sidebar weatherData={weatherData} />
                </aside>
            </div>
            <main className=" w-full">
                <div className="w-full gap-1 flex p-4" >
                    <>
                        <div className="w-fit">
                            <label htmlFor="sidebar-mobile-fixed" className="btn-primary btn sm:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="#fff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                            </label>
                        </div>
                    </>
                    <Search fetchWeatherData={fetchWeatherData} />
                    <Switch />
                </div>
                <Main />
                {error && <p>{error}</p>}
            </main>
        </div>
        </>

    );
};
export default WeatherContainer;
