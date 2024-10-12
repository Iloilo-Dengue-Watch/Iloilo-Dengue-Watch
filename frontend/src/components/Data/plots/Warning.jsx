import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
                console.log("Fetched data:", data); // Debugging log
                // Transform data into array for warnings
                const transformedData = Object.entries(data).map(([date, values]) => ({
                    date,
                    y: values.y,
                    yhat_upper: values.yhat_upper
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

    const countExceedingThreshold = prediction.filter(data => data.y > warningThreshold).length;

    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8">
            <Typography variant="h4" component="h1" className="text-center font-bold mb-6">
                Dengue Warning
            </Typography>

            <div className="w-full max-w-3xl mb-6">
                <img src={imgForecast} alt="Forecast" className="rounded-lg shadow-lg w-full max-h-96 object-cover mb-4" />
                <Typography variant="body1" className="text-center">
                    The model used for this is the Prophet model by Meta.
                </Typography>
            </div>


            <div className="overflow-x-auto w-full max-w-3xl border-2 p-4">
                <div className="w-full max-w-3xl mb-6">
                    <Typography variant="h6" component="h2" className="text-center font-bold mb-4">
                        Data Points Exceeding Warning Threshold
                    </Typography>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="warning table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Actual Value (y)</TableCell>
                                <TableCell align="right">Forecast Upper Bound</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {prediction.length > 0 ? (
                                prediction.map((data) => (
                                    <TableRow
                                        key={data.date}
                                        sx={{
                                            '&:last-child td, &:last-child th': {border: 0},
                                            backgroundColor: data.y > data.yhat_upper ? '#ffebee' : 'inherit' // Highlight rows exceeding threshold
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {data.date}
                                        </TableCell>
                                        <TableCell align="right">{data.y}</TableCell>
                                        <TableCell align="right">{data.yhat_upper}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        No warnings to display.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}