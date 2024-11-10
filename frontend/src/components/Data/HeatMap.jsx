import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, HeatmapLayerF, LoadScript } from '@react-google-maps/api';
import WordCloud from 'wordcloud';

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
  const [loading, setLoading] = useState(true); // Add loading state
  const wordCloudCanvas = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Fetch heatmap data
    fetch(`http://localhost:8000/users/self-report/get`)
      .then((response) => response.json())
      .then((data) => {
        const heatmapData = data.reports.map((item) => ({
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
        }));
        console.log("Heatmap Data:", heatmapData);
        setHeatmapData(heatmapData);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching heatmap data:", error);
        setLoading(false); // Set loading to false in case of error
      });

    // Word cloud data
    const wordCloudData = [
      { text: 'Fever', weight: 30 },
      { text: 'Headache', weight: 25 },
      { text: 'Pain Behind Eyes', weight: 22 },
      { text: 'Nausea', weight: 20 },
      // ... other word cloud items
    ];

    // Initialize WordCloud only when canvas and window.WordCloud are available
    if (wordCloudCanvas.current && typeof window !== 'undefined' && window.WordCloud) {
      WordCloud(wordCloudCanvas.current, {
        list: wordCloudData.map(item => [item.text, item.weight]),
        gridSize: 10,
        weightFactor: 5,
        fontFamily: 'Times, serif',
        color: 'random-dark',
        minSize: 12,
      });
    }
  }, []);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      // Set zoom level after the map has been loaded
      const timeoutId = setTimeout(() => {
        if (map) {
          console.log('Setting zoom level to 5');
          map.setZoom(5);
        }
      }, 2000); // Delay for 2 seconds

      // Cleanup timeout if map is unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [map]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_MAPS_KEY}
      libraries={libraries}
      onLoad={() => console.log('Google Maps API Loaded')}
      onError={() => console.error('Error loading Google Maps API')}
    >
      <div className='grid grid-cols-2'>
        <div>
          <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
            Self Reported Dengue Cases Heatmap
          </h1>
          {loading ? (
            <div className="text-center">
              <p>Loading data...</p> {/* Loading message or spinner */}
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2} // Initial zoom level before map loads
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                streetViewControl: false,
              }}
            >
              {heatmapData.length > 0 && (
                <HeatmapLayerF
                  data={heatmapData.map((point) => {
                    if (window.google && window.google.maps) {
                      return new window.google.maps.LatLng(point.lat, point.lng);
                    }
                    console.error("google.maps.LatLng is not available");
                    return null;
                  })}
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
          <canvas ref={wordCloudCanvas} width="500" height="500" />
        </div>
      </div>
    </LoadScript>
  );
}
