import { createContext, useContext, useState, useEffect } from "react";

const WeatherDataContext = createContext();

export const WeatherDataProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState({
        temperature: [],
        date: [],
        precipitation: [],
        humidity: []
    });
    const [gptResponse, setGptResponse] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherDataResponse = await fetch(
                    'https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/weather_data_year/'
                );
                const weatherDataJson = await weatherDataResponse.json();
                const temperatures = weatherDataJson.map(item => item.temperature);
                const dates = weatherDataJson.map(item => item.date);
                const humidities = weatherDataJson.map(item => item.humidity);
                const precipitations = weatherDataJson.map(item => item.precipitation || 0); 

                setWeatherData({
                    temperature: temperatures,
                    date: dates,
                    precipitation: precipitations,
                    humidity: humidities
                });

                const gptResponse = await fetch(
                    'https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/chat_weather_summary'
                );
                const gptJson = await gptResponse.json();
                setGptResponse(gptJson.response);

                setIsLoading(false);  // Set loading to false once data is fetched
            } catch (error) {
                console.log("Error fetching data: ", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <WeatherDataContext.Provider value={{ weatherData, gptResponse, isLoading }}>
            {children}
        </WeatherDataContext.Provider>
    );
};

export const useWeatherData = () => useContext(WeatherDataContext);
