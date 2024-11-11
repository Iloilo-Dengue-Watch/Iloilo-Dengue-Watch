import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, HeatmapLayerF, LoadScript } from '@react-google-maps/api';
import WordCloud from 'wordcloud';
import ReactWordcloud from 'react-wordcloud';
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
  const wordCloudData = [
    { text: 'Fever', value: 30 },
    { text: 'Headache', value: 25 },
    { text: 'Pain Behind Eyes', value: 22 },
    { text: 'Nausea', value: 20 },
    { text: 'Vomiting', value: 20 },
    { text: 'Muscle Pain', value: 18 },
    { text: 'Joint Pain', value: 18 },
    { text: 'Rash', value: 17 },
    { text: 'Fatigue', value: 15 },
    { text: 'Weakness', value: 15 },
    { text: 'Abdominal Pain', value: 14 },
    { text: 'Bleeding', value: 12 },
    { text: 'Diarrhea', value: 10 },
    { text: 'Skin Sensitivity', value: 10 },
    { text: 'Low Platelet Count', value: 10 },
    { text: 'Swollen Glands', value: 9 },
    { text: 'Severe Pain', value: 9 },
    { text: 'Chills', value: 8 },
    { text: 'Rash', value: 7 },
    { text: 'Dengue Fever', value: 7 },
    { text: 'Shock', value: 6 },
    { text: 'Dizziness', value: 6 },
    { text: 'Red Eyes', value: 5 },
    { text: 'Muscle Spasms', value: 5 },
    { text: 'Severe Fatigue', value: 5 },
    { text: 'Shortness of Breath', value: 5 },
    { text: 'Loss of Appetite', value: 5 },
  ];
  useEffect(() => {
    // Fetch heatmap data
    fetch(`https://dengue-watch-backend-f59b9593b035.herokuapp.com/users/self-report/get`)
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
  }, []);

  useEffect(() => {
    // Word cloud data
    const wordCloudData = [
      { text: 'Fever', value: 30 },
      { text: 'Headache', value: 25 },
      { text: 'Pain Behind Eyes', value: 22 },
      { text: 'Nausea', value: 20 },
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
  }, [wordCloudCanvas.current]); // Add wordCloudCanvas.current as a dependency

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
      <div className='grid grid-cols-1 lg:grid-cols-2'>
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
            Word Cloud of Disease Symptoms
          </h1>
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
            <div>
           <ReactWordcloud words={wordCloudData} size={[600,400]} 
           options={
              {
                rotations: 1,
                rotationAngles: [0],
                fontSizes: [20, 60],
                padding: 5,
              }
           }/>
 
            </div>
         </div>
        </div>
      </div>
    </LoadScript>
  );
}