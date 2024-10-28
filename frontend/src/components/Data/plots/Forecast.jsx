import { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';

export default function Forecast() {
    const imageURL = "https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/forecast/?image=forecast";
    const predictionURL = "https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/forecast/?data=prediction";
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
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8">
            <Typography variant="h4" component="h1" className="text-center font-bold mb-6">
                Dengue Forecast
            </Typography>
            <div className="flex flex-col xl:flex-row w-full">
                <div>
                    <img src={imgForecast} alt="Forecast" className="rounded-lg shadow-lg w-full max-h-96" />
                    <p className="text-center m-2">The model used for this is the Prophet model by Meta.</p>
                </div>
                <Grid item xs={12} sm={4}>
                    <Box className="bg-cyan-700 bg-opacity-60 w-full p-4 rounded-lg shadow-lg">
                        <Card className="bg-cyan-700">
                            {prediction.map((data, index) => (
                                <CardContent key={index} className="border-b border-cyan-500 last:border-0">
                                    <Typography variant="h6" component="h2">
                                        Date: {data.date}
                                    </Typography>
                                    <Typography variant="body1">
                                        Forecast: {data.y}
                                    </Typography>
                                </CardContent>
                            ))}
                        </Card>
                    </Box>
                </Grid>
            </div>
        </div>
    );
}