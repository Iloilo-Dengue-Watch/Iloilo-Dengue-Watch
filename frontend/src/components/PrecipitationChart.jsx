import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import { ClipLoader } from 'react-spinners';
import { min } from 'date-fns';

export default function PrecipitationChart({ date, data }) {
  const [chartData, setChartData] = useState([]);
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      const formattedData = data.map((precipitation, index) => ({
        precipitation,
        date: date[index],
      }));
      setChartData(formattedData);
    }
  }, [data, date]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-600 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Precipitation</h1>

      {chartData.length > 0 ? (
        <div className="w-full h-96 bg-white rounded-lg shadow-md p-4"> {/* Chart container */}
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" />
              <YAxis domain ={min(data)}/>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
              <Area type="monotone" dataKey="precipitation" stroke="#8b0000" fill="#82ca9d" />
              {refAreaLeft && refAreaRight ? (
                <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
              ) : null}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <ClipLoader color="#000" loading={true} size={50} />
      )}
    </div>
  );
}
