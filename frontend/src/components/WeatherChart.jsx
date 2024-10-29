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
import DropDownWeather from './DropDownWeather';

export default function WeatherChart({ date, data, title, dataKey, color }) {
  const [chartData, setChartData] = useState([]);
  const [fluidChartData, setFluidChartData] = useState([]);
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');
  const [minDomain, setMinDomain] = useState(false); // State to toggle min domain
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Last 30 days"); // State to track selected time frame

  const handleSelect = (timeFrame) => {
    setSelectedTimeFrame(timeFrame); // Update selected time frame
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
      const formattedData = data.map((value, index) => ({
        [dataKey]: value,
        date: date[index],
      }));
      setChartData(formattedData);
      // Get the last 30 days as default
      const last30days = formattedData.slice(-30);
      setFluidChartData(last30days);
    }
  }, [data, date, dataKey]);

  return (
      <div
          className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-600 md:p-6 rounded-lg shadow-lg mt-4">
        <h1 className="text-3xl font-bold text-white my-6 text-center">{title}</h1>
        <div className='w-full p-2 flex flex-row justify-between items-center md:!px-10'>
          <div className="flex flex-row items-center mb-4 w-fit">
            <div className="w-fit">
              <label className="text-white mr-2 w-fit">Min Y-axis Value</label>
              <div>
                <button className='bg-slate-300 bg-opacity-50 p-2 mx-2 rounded-lg'
                        onClick={() => setMinDomain(false)}>0
                </button>
                <button className='bg-slate-300 bg-opacity-50 p-2 rounded-lg' onClick={() => setMinDomain(true)}>Data
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2 ml-4 w-full flex justify-end">
            <DropDownWeather handleSelect={handleSelect}/>
          </div>
        </div>
        {chartData.length > 0 ? (
            <>

              <div
                  className="w-full h-96 bg-gray-100 rounded-lg shadow-md md:p-4"> {/* Chart container with gray background */}
                <ResponsiveContainer className="-ml-2">
                  <LineChart data={fluidChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                    <XAxis dataKey="date" stroke="#888"/>
                    <YAxis domain={[minDomain ? Math.min(...fluidChartData.map(d => d[dataKey])) : 0, 'dataMax']}
                           stroke="#888"/>
                    <Tooltip contentStyle={{backgroundColor: '#fff', border: '1px solid #ccc'}}/>
                    <Line type="monotone" dataKey={dataKey} stroke={color}
                          dot={!["Last 6 months", "Last 12 months"].includes(selectedTimeFrame)}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </>
        ) : (
            <ClipLoader color="#000" loading={true} size={50}/>
        )}
      </div>
  );
}