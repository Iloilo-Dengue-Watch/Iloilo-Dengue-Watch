import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { WiThermometer, WiHumidity, WiRain } from 'weather-icons-react';
import { format } from 'date-fns';

export function WeatherCardHeader() {

    const today = format(new Date(), 'eeee, MMMM d, yyyy');

   

    return (
        <div className="w-full">
            <div sx={{ padding: 3, boxShadow: 3, borderRadius: 2, width: '100%' }}>
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

                    
                </CardContent>
            </div>
        </div>
    );
}

export function WeatherCardComponents(){
    const [weather, setWeather] = useState({
        temperature: '',
        humidity: '',
        precipitation: ''
    });
    useEffect(() => {
        fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/weather/')
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.log(error));
    }, []);
    return(
        <div className='h-full w-full flex'>
                    <div className="flex justify-evenly text-center h-full w-full">
                        {/* Temperature */}
                        <div className='p-2 h-full w-full'>
                        <div className="flex flex-col items-center justify-center bg-slate-500 h-full w-full p-2 rounded-md bg-opacity-30">
                            <WiThermometer size={48} color="#ff5722" />
                            <Typography variant="body2" color="textSecondary">
                                Temperature
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {weather.temperature ? `${weather.temperature}°C` : 'N/A'}
                            </Typography>
                        </div>


                        </div>
                        {/* Humidity */}
                        <div className = 'p-2 h-full w-full'>
                        <div className="flex flex-col items-center h-full w-full bg-slate-500 justify-center p-2 rounded-md bg-opacity-30">
                            <WiHumidity size={48} color="#2196f3" />
                            <Typography variant="body2" color="textSecondary">
                                Humidity
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {weather.humidity ? `${weather.humidity}%` : 'N/A'}
                            </Typography>
                        </div>
                        </div>

                        {/* Precipitation */}
                        <div className='p-2 h-full w-full'>
                        <div className="flex flex-col items-center h-full w-full bg-slate-500 justify-center p-2 rounded-md bg-opacity-30">
                            <WiRain size={48} color="#4caf50" />
                            <Typography variant="body2" color="textSecondary">
                                Total Precipitation
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {weather.precipitation ? `${weather.precipitation} mm` : 'N/A'}
                            </Typography>
                        </div>
                        </div>
                    </div>
        </div>
    )
}