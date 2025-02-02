import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import { ClipLoader } from 'react-spinners';
import { min } from 'date-fns';
import DropDownWeather from './DropDownWeather';

export default function TemperatureChart({ date, data }) {
  const [chartData, setChartData] = useState([]);
  const [fluidChartData, setFluidChartData] = useState([]);
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');

  const handleSelect = (timeFrame) => {
    let newFluidChartData;
    switch (timeFrame) {
      case "Last 7 days":
        newFluidChartData = chartData.slice(-7);
        break;
      case "Last 14 days":
        newFluidChartData = chartData.slice(-14);
        break;
      case "Last 30 days":
        newFluidChartData = chartData.slice(-30);
        break;
      case "Last 6 months":
        newFluidChartData = chartData.slice(-180); // Assuming daily data, adjust as needed
        break;
      case "Last 12 months":
        newFluidChartData = chartData.slice(-365); // Assuming daily data, adjust as needed
        break;
      default:
        newFluidChartData = chartData;
    }
    setFluidChartData(newFluidChartData);
  };

  useEffect(() => {
    if (data.length > 0) {
      const formattedData = data.map((temperature, index) => ({
        temperature,
        date: date[index],
      }));
      setChartData(formattedData);
      // Get the last 30 days as default
      const last30days = formattedData.slice(-30);
      setFluidChartData(last30days);
    }
  }, [data, date]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-600 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Temperature Forecast</h1>

      {chartData.length > 0 ? (
        <>
          <div className="w-full h-96 bg-white rounded-lg shadow-md md:p-4"> {/* Chart container */}
            <ResponsiveContainer className="-ml-2">
              <LineChart data={fluidChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" />
                <YAxis domain={[min(data), 'dataMax']} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Line type="monotone" dataKey="temperature" stroke="#8b0000" dot={fluidChartData !== "Last 12 months" || fluidChartData !== "Last 6 months" } />
                {refAreaLeft && refAreaRight ? (
                  <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <DropDownWeather handleSelect={handleSelect} />
          </div>
        </>
      ) : (
        <ClipLoader color="#000" loading={true} size={50} />
      )}
    </div>
  );
}
