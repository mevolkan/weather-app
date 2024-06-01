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
    name: string;
    main: Main;
    weather: Weather[];
}

export interface SidebarProps {
    weatherData: WeatherData | null;
}