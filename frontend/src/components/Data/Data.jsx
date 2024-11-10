import WeatherCard from './WeatherCard';
import Forecast from './plots/Forecast';
import WeatherChart from '../WeatherChart';
import Warning from './plots/Warning';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import HeatMap from './HeatMap';
import WeatherDengue from './WeatherDengue';
import WeatherCharts from './WeatherCharts';
function Data({handleTabChange}) {
  const [weatherData, setWeatherData] = useState({ temperature: [], date: [], precipitation : [], humidity: [] });
  const [GPT_response, setGPT_response] = useState('');
  useEffect(() => {
    fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/weather_data_year/')
        .then(response => response.json())
        .then(data => {
            // Extract the required properties from the fetched data
            const temperatures = data.map(item => item.temperature);
            const dates = data.map(item => item.date);
            const humidities = data.map(item => item.humidity);
            // Assuming precipitation is also in the data
            const precipitations = data.map(item => item.precipitation || 0); // Default to 0 if not present

            setWeatherData({
                temperature: temperatures,
                date: dates,
                precipitation: precipitations,
                humidity: humidities
            });

        })
        .catch(error => console.log(error));
}, []);
  useEffect(() => {
    fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/ml/chat_weather_summary')
      .then(response => response.json())
      .then(data => setGPT_response(data.response))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
  handleTabChange("Data");
  }, [handleTabChange]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 py-8 p-4 lg:px-10 mt-3">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center lg:!text-left sticky">Dengue Data Dashboard</h1>
          <WeatherCard />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <Forecast />
            <WeatherDengue content={GPT_response} />
          </div>
          <WeatherCharts data={weatherData}/>

          <div className="mt-8">
            <Typography variant="h4" component="h2" className="text-red-600 mb-4 font-bold">
              Critical Warnings
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6 text-center">
              This section highlights potential dengue outbreaks based on recent trends and environmental conditions. Pay close attention to areas marked with high warnings.
            </Typography>
            <Warning />
          </div>
      <div className="p-2 lg:p-12">
        <div>
          <HeatMap />
        </div>
        <MLInfo />
        
      </div>
    </div>
  );
}
function MLInfo(){
  return(
<div className="mt-12 text-center container md:px-5">
          <Typography variant="h3" component="h1" className="text-blue-600 mb-4 font-bold">
            Machine Learning Model Overview
          </Typography>

          <Typography variant="h5" component="h2" className="text-gray-700 mb-2 font-semibold">
            Model Used: Prophet by Meta
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-4">
            We used the <a href="https://facebook.github.io/prophet/" rel="noopener" className="text-blue-500 underline">Prophet</a> model developed by Meta to predict dengue cases. This model is well-suited for time-series data and has been enhanced with additional factors such as temperature, humidity, and rainfall as regressors.
          </Typography>

          <TableContainer component={Paper} className="mb-6">
            <Table sx={{ minWidth: 650 }} aria-label="data table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Data</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Source</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Iloilo City Dengue Cases</TableCell>
                  <TableCell align="center">Target</TableCell>
                  <TableCell align="center">
                    <a href="https://www.foi.gov.ph/agencies/doh/the-number-of-dengue-cases-per-week-in-iloilo-city-2022-most-recent/?fbclid=IwY2xjawF2frpleHRuA2FlbQIxMAABHUuxHTR3-xKEoOALAGmPRZ1BGzm0G7cDoUHYBu8aA0e05y2946Arcf1-RQ_aem_Rm6U-6y5pf7-UWNiuKa21g" rel="noopener" className="text-blue-500 underline">Department of Health</a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Temperature</TableCell>
                  <TableCell align="center">Regressor</TableCell>
                  <TableCell align="center">
                    <a href="https://openweathermap.org/api" rel="noopener" className="text-blue-500 underline">OpenWeatherMap Weather API</a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Humidity</TableCell>
                  <TableCell align="center">Regressor</TableCell>
                  <TableCell align="center">
                    <a href="https://openweathermap.org/api" rel="noopener" className="text-blue-500 underline">OpenWeatherMap Weather API</a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Precipitation</TableCell>
                  <TableCell align="center">Regressor</TableCell>
                  <TableCell align="center">
                    <a href="https://openweathermap.org/api" rel="noopener" className="text-blue-500 underline">OpenWeatherMap Weather API</a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box className="bg-blue-50 p-4 rounded-lg mb-6 shadow-md">
            <Typography variant="body1" className="text-gray-700">
              <strong>Data Source:</strong> Dengue cases in Iloilo City, Philippines from 2014 to September 2024.
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              <strong>Regressors:</strong> Temperature, Humidity, Rainfall
            </Typography>
          </Box>

        </div>
  )
}
export default Data;