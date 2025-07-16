import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { WiThermometer, WiHumidity, WiRain } from 'weather-icons-react';
import { format } from 'date-fns';

export default function WeatherCard() {
    const [weather, setWeather] = useState({
        temperature: '',
        humidity: '',
        precipitation: ''
    });
    const today = format(new Date(), 'eeee, MMMM d, yyyy');

    useEffect(() => {
        fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/weather/')
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="w-full">
            <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9fc', width: '100%' }}>
                <CardContent>
                    {/* Header */}
                    <div className="bg-purple-100 p-3 rounded-md mb-4 text-center">
                        <Typography variant="h5" component="div" color="textPrimary">
                            Iloilo City, Iloilo, Philippines
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {today}
                        </Typography>
                    </div>

                    {/* Weather Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        {/* Temperature */}
                        <div className="flex flex-col items-center">
                            <WiThermometer size={48} color="#ff5722" />
                            <Typography variant="body2" color="textSecondary">
                                Temperature
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {weather.temperature ? `${weather.temperature}°C` : 'N/A'}
                            </Typography>
                        </div>

                        {/* Humidity */}
                        <div className="flex flex-col items-center">
                            <WiHumidity size={48} color="#2196f3" />
                            <Typography variant="body2" color="textSecondary">
                                Humidity
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {weather.humidity ? `${weather.humidity}%` : 'N/A'}
                            </Typography>
                        </div>

                        {/* Precipitation */}
                        <div className="flex flex-col items-center">
                            <WiRain size={48} color="#4caf50" />
                            <Typography variant="body2" color="textSecondary">
                                Total Precipitation
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {weather.precipitation ? `${weather.precipitation} mm` : 'N/A'}
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
