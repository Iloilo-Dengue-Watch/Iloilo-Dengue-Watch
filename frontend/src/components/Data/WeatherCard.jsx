import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { WiThermometer, WiHumidity, WiRain } from 'weather-icons-react';

// Import the date formatting library (optional)
import { format } from 'date-fns';

export default function WeatherCard() {
    const [weather, setWeather] = useState({
        temperature: '',
        humidity: '',
        precipitation: ''
    });

    // Get today's date
    const today = format(new Date(), 'eeee, MMMM d, yyyy'); // Example: "Saturday, October 12, 2024"

    useEffect(() => {
        fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/weather/')
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.log(error))
    }, []);

    return (
        <Grid container spacing={3} mt={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <Box>
                    <Card sx={{ maxWidth: 345, minHeight: 450, backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h4" component="div" gutterBottom className="text-center text-gray-800">
                                Iloilo City
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
                                    Temperature: {weather.temperature}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mb={2}>
                                <WiHumidity size={32} color="#2196f3" />
                                <Typography variant="h6" component="div" ml={1}>
                                    Humidity: {weather.humidity}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <WiRain size={32} color="#4caf50" />
                                <Typography variant="h6" component="div" ml={1}>
                                    Total Precipitation: {weather.precipitation}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}
