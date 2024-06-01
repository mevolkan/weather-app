// types.ts
export interface Weather {
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