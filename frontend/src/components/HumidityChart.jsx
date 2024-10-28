import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ClipLoader } from 'react-spinners';
import { min, max } from 'date-fns';
import DropDownWeather from './DropDownWeather';
export default function HumidityChart({ date, data }) {
  const [chartData, setChartData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      const formattedData = data.map((humidity, index) => ({
        humidity,
        date: date[index],
      }));
      setChartData(formattedData);
    }
  }, [data, date]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-600 md:p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Humidity</h1>

      {chartData.length > 0 ? (
        <>
          <div className="w-full h-96 bg-white rounded-lg shadow-md md:p-4"> {/* Chart container */}
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" />
                <YAxis domain={[min(data), max(data) + 10]} /> {/* Adjust the Y-axis domain */}
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Line type="monotone" dataKey="humidity" stroke="#8b0000" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <DropDownWeather />
        </>
      ) : (
        <ClipLoader color="#000" loading={true} size={50} />
      )}
    </div>
  );
}
