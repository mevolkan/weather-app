"use client";
import ForecastCard from "./forecastcard";
import HumidityCard from "./humiditycard";
import WindCard from "./windcard";

function Main() {
    return (
        <>
            <div className="flex flex-col p-4">
                <div className="my-4 grid grid-cols-3 gap-4">
                    <ForecastCard />
                    <ForecastCard />
                    <ForecastCard />
                </div>
            <div className="my-4 grid w-full grid-cols-2 gap-2">
                <WindCard />
                <HumidityCard />
            </div>
        </div>
        </>

    );
}

export default Main;