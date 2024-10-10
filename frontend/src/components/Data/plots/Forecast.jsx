import { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent } from '@mui/material';

export default function Forecast() {
    const imageURL = "http://localhost:8000/ml/forecast/?image=true";
    const predictionURL = "http://localhost:8000/ml/forecast/?data=true";
    const [imgForecast, setImgForecast] = useState(null);
    const [prediction, setPrediction] = useState([]);

    useEffect(() => {
        fetch(predictionURL)
            .then(response => response.json())
            .then(data => {
                // Transform the data into an array of objects
                const transformedData = data.date.map((date, index) => ({
                    date,
                    y: data.y[index]
                }));
                setPrediction(transformedData);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(imageURL)
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(data => setImgForecast(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="flex flex-col align-middle">
            <h1 className="text-3xl font-bold text-center">Dengue Forecast</h1>
            <div className="container flex flex-row">
                <Grid item xs={12} sm={12}>

                    <img src={imgForecast} alt="Forecast" style={{maxWidth: '100%', maxHeight: '400px'}}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box>

                        <Card style={{ margin: '10px 0' }}>
                        {prediction.map((data, index) => (
                                <CardContent key={index}>
                                    <h2>Date: {data.date}</h2>
                                    <p>Forecast: {data.y}</p>
                                </CardContent>
                        ))}

                        </Card>
                    </Box>
                </Grid>
            </div>
        </div>
    );
}