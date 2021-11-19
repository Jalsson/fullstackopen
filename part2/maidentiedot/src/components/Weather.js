import React, {useState, useEffect} from "react";
import axios from "axios";

const Weather = ({city}) => {
    const [weather, setWeather] = useState(null)

    useEffect(async () => {
        let source = axios.CancelToken.source()
        try {
            const response = await axios
                .get("http://api.weatherstack.com/current", {
                    params: {
                        access_key: process.env.REACT_APP_API_KEY,
                        query: city,
                    },
                    cancelToken: source.token,
                })
            if (response.statusText === "OK") {
                setWeather(response.data)
            }
        } catch (error) {
            console.log(error.config)
        }
        return () => {
            source.cancel("Weather component is unmounting")
        }
    }, [city])
    console.log(weather)
    if (weather && weather.current) {
        return (
            <div>
                <h1>Weather in {city}</h1>
                <p>
                    <strong>Temperature:</strong> {weather.current.temperature} Celsius
                </p>
                <img src={weather.current.weather_icons[0]} alt="weather" />
                <p>
                    <strong>Wind:</strong> {weather.current.wind_speed} km/h direction{" "}
                    {weather.current.wind_dir}
                </p>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default Weather