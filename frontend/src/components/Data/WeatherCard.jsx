import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import { Card, CardMedia, CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useState, useEffect } from 'react';

export default function MainCardWeather (){
    const [weather, setWeather] = useState({
        temperature: '',
        humidity: '',
        precipitation: ''
    });
    useEffect(() => {
        fetch('http://localhost:8000/ml/weather/')
        .then(response => response.json())
        .then(data => setWeather(data))
        .catch(error => console.log(error))
    }, [])

        return(
            <Grid container spacing={3} mt = {2}>
                <Grid item xs={0} sm={2}>

                </Grid>
                <Grid item xs={12} sm ={4}>
                    <Box>
                        <Card sx ={{maxWidth: 345, minHeight: 400}} >

                            <CardContent>
                                <h1>Iloilo City</h1>
                                <h3>{weather.temperature}</h3>
                                <h3>{weather.humidity}</h3>
                                <h3>{weather.precipitation}</h3>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>

        )
}
