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

export default function TemperatureChart({ date, data }) {
  const [chartData, setChartData] = useState([]);
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      const formattedData = data.map((temperature, index) => ({
        temperature,
        date: date[index],
      }));
      setChartData(formattedData);
    }
  }, [data, date]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-600 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Temperature Forecast</h1>

      {chartData.length > 0 ? (
        <div className="w-full h-96 bg-white rounded-lg shadow-md p-4"> {/* Chart container */}
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" />
              <YAxis domain ={min(data)}/>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
              <Line type="monotone" dataKey="temperature" stroke="#8b0000" dot={false} />
              {refAreaLeft && refAreaRight ? (
                <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <ClipLoader color="#000" loading={true} size={50} />
      )}
    </div>
  );
}
