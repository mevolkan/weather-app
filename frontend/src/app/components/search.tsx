"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
interface SearchProps {
    fetchWeatherData: (location: string) => void;
}

const Search: React.FC<SearchProps> = ({ fetchWeatherData }) => {
    const [location, setLocation] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchWeatherData(location);
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-row">
            <div className="form-control flex-grow">
                <input
                    type="search"
                    className="input input-lg max-w-full"
                    placeholder="Search"
                    value={location}
                    onChange={handleInputChange}
                />
                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </span>
            </div>
            <div className="form-control">
                <button type="submit" className="btn btn-primary w-full px-5 py-3">Go</button>
            </div>
        </form>
    );
}

export default Search;
