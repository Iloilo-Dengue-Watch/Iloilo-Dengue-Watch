import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { WiThermometer, WiHumidity, WiRain } from 'weather-icons-react';
import WeatherDengue from "./WeatherDengue.jsx";
// Import the date formatting library (optional)
import { format } from 'date-fns';

export default function WeatherCard() {
    const [weather, setWeather] = useState({
        temperature: '',
        humidity: '',
        precipitation: ''
    });
    const [gpt_response, setGPT_response] = useState('');
    // Get today's date
    const today = format(new Date(), 'eeee, MMMM d, yyyy'); // Example: "Saturday, October 12, 2024"

    useEffect(() => {
        fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/weather/')
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.log(error))
        fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/chat_weather_summary/')
            .then(response => response.json())
            .then(data => setGPT_response(data.response))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="flex flex-col xl:flex-row justify-center items-center lg:items-start gap-10 lg:p-5">
            {/* Weather Card */}
            <Box>
                <Card sx={{ minWidth: 300, maxWidth: 345, minHeight: 450, backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom className="text-center text-gray-800">
                            Iloilo City, Iloilo, Philippines
                        </Typography>

                        {/* Beautiful Date Display */}
                        <Box textAlign="center" mb={2}>
                            <Typography variant="h6" sx={{ fontStyle: 'italic', color: '#9c27b0' }}>
                                {today}
                            </Typography>
                        </Box>

                        {/* Weather Information */}
                        <Box display="flex" alignItems="center" mb={2}>
                            <WiThermometer size={32} color="#ff5722" />
                            <Typography variant="h6" component="div" ml={1}>
                                Temperature: {weather.temperature + "°C"}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" mb={2}>
                            <WiHumidity size={32} color="#2196f3" />
                            <Typography variant="h6" component="div" ml={1}>
                                Humidity: {weather.humidity + "%"}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <WiRain size={32} color="#4caf50" />
                            <Typography variant="h6" component="div" ml={1}>
                                Total Precipitation: {weather.precipitation + "mm"}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Weather Dengue Content */}
            <WeatherDengue content={gpt_response} />
        </div>
    );
}
