import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, HeatmapLayerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '800px',
};

const center = {
  lat: 10.7202,
  lng: 122.5621,
};

// Define the libraries array outside of the component
const libraries = ['visualization'];

export default function HeatMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
    libraries, // Use the static libraries array
  });

  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // Example heatmap data (lat, lng)
    const data = [
      { lat: 10.7202, lng: 122.5621 },
      { lat: 10.7212, lng: 122.5631 },
      { lat: 10.7222, lng: 122.5641 },
      { lat: 10.7232, lng: 122.5651 },
      { lat: 10.7242, lng: 122.5661 },
      { lat: 10.7252, lng: 122.5671 },
      { lat: 10.7262, lng: 122.5681 },
      { lat: 10.7272, lng: 122.5691 },
      { lat: 10.7282, lng: 122.5701 },
      { lat: 10.7292, lng: 122.5711 },
      { lat: 10.7302, lng: 122.5721 },
      { lat: 10.7312, lng: 122.5731 },
      { lat: 10.7322, lng: 122.5741 },
      { lat: 10.7332, lng: 122.5751 },
      { lat: 10.7342, lng: 122.5761 },
      { lat: 10.7352, lng: 122.5771 },
      { lat: 10.7362, lng: 122.5781 },
      { lat: 10.7372, lng: 122.5791 },
      { lat: 10.7382, lng: 122.5801 },
      { lat: 10.7392, lng: 122.5811 },
      {lat: 10.7402, lng: 122.5821},
        {lat: 10.7012, lng: 122.5831},
      // Add more data points here
    ];

    setHeatmapData(data);
  }, []);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10} // Adjusted zoom level to not zoom in too much initially
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false, // Remove OpenStreetView control
        draggable: false, // Lock the map so it can't be dragged
        disableDoubleClickZoom: true, // Optionally disable double-click zooming
      }}
    >
      {/* Heatmap Layer */}
      {heatmapData.length > 0 && (
        <HeatmapLayerF
          data={heatmapData.map(
            (point) => new window.google.maps.LatLng(point.lat, point.lng)
          )}
          options={{
            radius: 20,   // Radius of each "heat" point
            opacity: 0.6, // Opacity of the heatmap
            maxIntensity: 1, // Maximum intensity of the heatmap
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}