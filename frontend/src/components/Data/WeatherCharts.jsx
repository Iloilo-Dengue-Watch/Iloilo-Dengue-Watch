import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ClipLoader } from 'react-spinners';
import "./asset.css";

export default function WeatherCharts({ data }) {
  const [chartData, setChartData] = useState({
    temperature: [],
    humidity: [],
    precipitation: [],
  });

  useEffect(() => {
    const formattedData = {
      temperature: data.temperature.map((value, index) => ({
        x: formatDate(data.date[index]),
        y: value,
      })),
      humidity: data.humidity.map((value, index) => ({
        x: formatDate(data.date[index]),
        y: value,
      })),
      precipitation: data.precipitation.map((value, index) => ({
        x: formatDate(data.date[index]),
        y: value,
      })),
    };

    setChartData(formattedData);
  }, [data]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className='w-full rounded-xl mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <WeatherChartCard title="Temperature" color="#FF5733" data={chartData.temperature} />
        <WeatherChartCard title="Humidity" color="#33A1FF" data={chartData.humidity} />
        <WeatherChartCard title="Precipitation" color="#33FF57" data={chartData.precipitation} />
      </div>
    </div>
  );
}

function WeatherChartCard({ title, color, data }) {
  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { type: 'category' },
    yaxis: { title: { text: title } },
    tooltip: { theme: 'light' },
    colors: [color],
  };

  const series = [{ name: title, data }];

  return (
    <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-cyan-800 bg-opacity-40 p-4" style={{ height: '400px', width: '100%' }}>
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      {data.length > 0 ? (
        <ApexCharts options={chartOptions} series={series} type="line" height="90%" width="100%" />
      ) : (
        <ClipLoader color="#fff" loading={true} size={50} />
      )}
    </div>
  );
}
