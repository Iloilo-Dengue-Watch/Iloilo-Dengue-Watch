import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, HeatmapLayerF, LoadScript } from '@react-google-maps/api';
import ReactWordcloud from 'react-wordcloud';
import ApexCharts from 'react-apexcharts';

const containerStyle = {
  width: '100%',
  height: '800px',
};

const center = {
  lat: 10.7202,
  lng: 122.5621,
};

const libraries = ['visualization'];

export default function HeatMap() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [wordCloudData, setWordCloudData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]); 
  const [selectedPlot, setSelectedPlot] = useState('wordCloud'); 

  useEffect(() => {
    fetch(`https://dengue-watch-backend-f59b9593b035.herokuapp.com/users/self-report/get`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedHeatmapData = data.reports.map((item) => ({
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
        }));
        const wordCloudData = Object.entries(data.symptom_count).map(([word, count]) => ({
          text: word,
          value: count,
        }));
        const temperatureData = data.reports.map((item) => ({
          date: item.date,
          temperature: parseFloat(item.temperature),
        }));
        setHeatmapData(fetchedHeatmapData);
        setWordCloudData(wordCloudData);
        setTemperatureData(temperatureData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const renderPlot = () => {
    if (selectedPlot === 'symptom') {
      return (
        <ReactWordcloud
          words={wordCloudData}
          size={[600, 400]}
          options={{
            rotations: 1,
            rotationAngles: [0],
            fontSizes: [20, 60],
            padding: 5,
          }}
        />
      );
    } else if (selectedPlot === 'temperature') {
      return (
        <ApexCharts
          options={{
            chart: {
              type: 'line',
              height: 400,
            },
            xaxis: {
              type: 'datetime',
              categories: temperatureData.map((item) => item.date),
            },
            yaxis: {
              title: {
                text: 'Temperature (°C)',
              },
            },
            title: {
              text: 'Temperature over Time',
              align: 'center',
            },
          }}
          series={[
            {
              name: 'Temperature',
              data: temperatureData.map((item) => item.temperature),
            },
          ]}
          type="line"
          height={400}
          width={600}
        />
      );
    } else if (selectedPlot === 'barplot') {
      return (
        <ApexCharts
          options={{
            chart: {
              type: 'bar',
              height: 400,
            },
            xaxis: {
              categories: wordCloudData.map((item) => item.text),
            },
            title: {
              text: 'Symptoms Frequency',
              align: 'center',
            },
          }}
          series={[
            {
              name: 'Count',
              data: wordCloudData.map((item) => item.value),
            },
          ]}
          type="bar"
          height={400}
          width={600}
        />
      );
    } else if (selectedPlot === 'histogram') {
      return (
        <ApexCharts
          options={{
            chart: {
              type: 'histogram',
              height: 400,
            },
            xaxis: {
              title: { text: 'Symptoms' },
              categories: wordCloudData.map((item) => item.value),
            },
            title: {
              text: 'Symptoms Histogram',
              align: 'center',
            },
          }}
          series={[
            {
              name: 'Frequency',
              data: wordCloudData.map((item) => item.value),
            },
          ]}
          type="histogram"
          height={400}
          width={600}
        />
      );
    } else if (selectedPlot === 'piechart') {
      return (
        <ApexCharts
          options={{
            labels: wordCloudData.map((item) => item.text),
            title: {
              text: 'Symptoms Distribution',
              align: 'center',
            },
          }}
          series={wordCloudData.map((item) => item.value)}
          type="pie"
          height={400}
          width={600}
        />
      );
    }
    return null;
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_MAPS_KEY}
      libraries={libraries}
      onLoad={() => console.log('Google Maps API Loaded')}
      onError={() => console.error('Error loading Google Maps API')}
    >
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div>
          <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
            Self Reported Dengue Cases Heatmap
          </h1>
          {loading ? (
            <div className="text-center">
              <p>Loading data...</p>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                streetViewControl: false,
              }}
            >
              {heatmapData.length > 0 && window.google && window.google.maps && (
                <HeatmapLayerF
                  data={heatmapData.map((point) => new window.google.maps.LatLng(point.lat, point.lng))}
                  options={{
                    radius: 20,
                    opacity: 0.6,
                    maxIntensity: 1,
                  }}
                />
              )}
            </GoogleMap>
          )}
        </div>
        <div>
          <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
            {selectedPlot.charAt(0).toUpperCase() + selectedPlot.slice(1)} Plot
          </h1>
          <div className="text-center mb-4">
            {['symptom', 'temperature', 'barplot', 'histogram', 'piechart'].map((plot) => (
              <button
                key={plot}
                className={`px-4 py-2 mr-2 ${
                  selectedPlot === plot ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
                onClick={() => setSelectedPlot(plot)}
              >
                {plot.charAt(0).toUpperCase() + plot.slice(1)}
              </button>
            ))}
          </div>
          <div
            style={{
              padding: '20px',
              height: '800px',
              overflowY: 'auto',
              overflowX: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className='rounded-lg'
          >
            {renderPlot()}
          </div>
        </div>
      </div>
    </LoadScript>
  );
}
