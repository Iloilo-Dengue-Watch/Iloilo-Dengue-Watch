import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function Warning() {
    const imageURL = "https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/forecast/?image=warning";
    const warningURL = "https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/forecast/?data=warning";
    const [imgForecast, setImgForecast] = useState(null);
    const [prediction, setPrediction] = useState([]);
    
    const warningThreshold = 10; // Adjust this value based on your preference

    useEffect(() => {
        fetch(warningURL)
            .then(response => response.json())
            .then(data => {
                const transformedData = Object.entries(data).map(([date, values]) => ({
                    date: formatDate(date),
                    y: Math.round(values.y),
                    yhat_upper: Math.round(values.yhat_upper)
                }));
                setPrediction(transformedData);
            })
            .catch(error => console.log("Error fetching warning data:", error));
    }, []);

    useEffect(() => {
        fetch(imageURL)
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(data => setImgForecast(data))
            .catch(error => console.log("Error fetching image:", error));
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 p-4 bg-white rounded-lg shadow-lg mx-auto my-8 w-full gap-4">
            <div className="w-full max-w-3xl mb-6">
                <img src={imgForecast} alt="Forecast" className="rounded-lg shadow-lg w-full object-cover mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prediction.length > 0 ? (
                    prediction.map((data) => (
                        <Card
                            key={data.date}
                            sx={{
                                backgroundColor: data.y > data.yhat_upper ? '#ffebee' : '#f5f5f5',
                                width: '100%',
                                boxShadow: 3
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {data.date}
                                </Typography>
                                <Box mt={1}>
                                    <Typography variant="body1" color="text.secondary">
                                        Actual Value (y): {data.y}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Forecast Upper Bound: {data.yhat_upper}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card sx={{ width: '100%', boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="body1" align="center">
                                No warnings to display.
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
