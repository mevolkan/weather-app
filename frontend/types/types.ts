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
}

export interface WeatherData {
    wind: any;
    name: string;
    main: Main;
    weather: Weather[];
}

export interface WeatherProps {
    weatherData: WeatherData | null;
}
