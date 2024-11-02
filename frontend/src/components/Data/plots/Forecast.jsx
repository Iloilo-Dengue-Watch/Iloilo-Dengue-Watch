import { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent, Typography, Modal, CircularProgress } from '@mui/material';

export default function Forecast() {
    const imageURL = "https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/forecast/?image=forecast";
    const predictionURL = "https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/forecast/?data=prediction";
    
    const [imgForecast, setImgForecast] = useState(null);
    const [prediction, setPrediction] = useState([]);
    const [open, setOpen] = useState(false);
    const [loadingImage, setLoadingImage] = useState(true); // Loading state for image
    const [loadingData, setLoadingData] = useState(true); // Loading state for prediction data
    const [transition, setTransition] = useState(false); // State to control transition visibility
    const [showFirstText, setShowFirstText] = useState(false); // State for the first text
    const [showSecondText, setShowSecondText] = useState(false); // State for the second text

    useEffect(() => {
        fetch(predictionURL)
            .then(response => response.json())
            .then(data => {
                const transformedData = data.date.map((date, index) => ({
                    date: formatDate(date),
                    y: data.y[index]
                }));
                setPrediction(transformedData);
                setLoadingData(false); // Set loadingData to false when data is loaded
                setTransition(true); // Enable transition after data is loaded
                setShowFirstText(true); // Show first text after data is loaded
                setTimeout(() => setShowSecondText(true), 500); // Show second text after a delay
            })
            .catch(error => {
                console.error(error);
                setLoadingData(false); // Ensure loadingData is false even if there's an error
                setTransition(true); // Enable transition even on error
                setShowFirstText(true); // Show first text even on error
                setTimeout(() => setShowSecondText(true), 500); // Show second text after a delay
            });
    }, []);

    useEffect(() => {
        fetch(imageURL)
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(data => {
                setImgForecast(data);
                setLoadingImage(false); // Set loadingImage to false when image is loaded
                setTransition(true); // Enable transition after image is loaded
            })
            .catch(error => {
                console.error(error);
                setLoadingImage(false); // Ensure loadingImage is false even if there's an error
                setTransition(true); // Enable transition even on error
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const isLoading = loadingImage || loadingData; // Determine if either image or data is still loading

    return (
        <Grid container spacing={2} className='px-5'>
            <Grid 
                item 
                xs={12} 
                md={3} 
                className={`md:!mt-20 transform transition-transform duration-1000 ${transition ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} // Conditional classes for transition
            > 
                <Typography variant="h4" component="h2" className="text-gray-800 mb-4 font-bold text-center md:text-left">
                    Dengue Case Forecast
                </Typography>
                
                <Typography 
                    variant="body1" 
                    className={`text-gray-600 mb-6 text-center md:text-justify transition-opacity duration-500 ${showFirstText ? 'opacity-100' : 'opacity-0'}`} // Transition for first text
                >
                    A forecast of dengue cases over time, factoring in environmental data.
                </Typography>
                
                <Typography 
                    variant='body1' 
                    className={`md:text-justify text-center transition-opacity duration-500 ${showSecondText ? 'opacity-100' : 'opacity-0'}`} // Transition for second text
                >
                    This helps in proactive public health management by providing predictive insights.
                </Typography>
            </Grid>
            
            <Grid item xs={12} md={9}> {/* Right column takes 80% on medium screens and above */}
                {isLoading ? ( // Check if loading
                    <Box 
                        display='flex' 
                        justifyContent='center' 
                        alignItems='center' 
                        height='50vh'
                    >
                        <CircularProgress size={80} /> {/* Adjust size for better visibility */}
                    </Box>
                ) : (
                    <div className="flex flex-col items-center md:p-4 max-w-4xl mx-auto my-8">
                        <div className="flex flex-col xl:flex-row w-full">
                            <div className="flex flex-col items-center justify-center w-full">
                                <img 
                                    src={imgForecast} 
                                    alt="Forecast" 
                                    className="rounded-lg shadow-lg w-full max-h-96 cursor-pointer transition-transform duration-300"
                                    onClick={() => setOpen(true)} 
                                />
                                <p className="text-center m-2 text-gray-500 italic">Click the image to enlarge</p>
                                <p className="text-center m-2">The model used for this is the Prophet model by Meta.</p>
                            </div>
                            <Grid item xs={12} sm={4}>
                                <Box className="bg-opacity-60 w-full px-2">
                                    <Card className="bg-cyan-700">
                                        {prediction.map((data, index) => (
                                            <CardContent key={index} className="border-b border-cyan-500 last:border-0">
                                                <Typography variant="h6" component="h2">
                                                    {data.date}
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
                )}
            </Grid>

            {/* Modal for full-screen image view */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <img 
                    src={imgForecast} 
                    alt="Zoomed Forecast" 
                    style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
                />
            </Modal>
        </Grid>
    );
}
