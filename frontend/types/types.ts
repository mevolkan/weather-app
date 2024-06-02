import { ReactNode } from "react";

// types.ts
export interface Weather {
    main: ReactNode;
    icon: ReactNode;
    description: string;
}
export interface Icon {
    description: string;
}


export interface Main {
    temp: number;
    humidity: number; 
}

export interface WeatherData {
    dt: ReactNode;
    wind: {
        deg: number;
        speed: number;
    };
    name: string;
    main: Main;
    weather: [
        {
            description: string;
            icon: string;
        }
    ];
}

export interface WeatherProps {
    weatherData: WeatherData | null;
}

export interface Forecast {
    dt: number;
    temp: {
        day: number;
    };
    weather: [
        {
            description: string;
            icon: string;
        }
    ];
}

export interface ForecastData {
    list: Forecast[];
}