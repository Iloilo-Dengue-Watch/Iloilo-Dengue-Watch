import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useCsrfToken } from '../CrsfTokenContext';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const initialCenter = {
  lat: 10.7202,
  lng: 122.5621,
};

const libraries = ['places'];

const symptomOptions = [
  'Fever',
  'Headache',
  'Muscle Pain',
  'Joint Pain',
  'Rash',
  'Nausea',
  'Vomiting',
  'Pain Behind Eyes',
  'Fatigue',
  'Bleeding (e.g., gums, nose)',
];

const SelfReportForm = () => {
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [isPositive, setIsPositive] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(initialCenter.lat);
  const [lng, setLng] = useState(initialCenter.lng);
  const [symptoms, setSymptoms] = useState([]);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
  const { csrfToken } = useCsrfToken();

  const handleAddressChange = async (address) => {
    setAddress(address);
    await geocodeAddress(address);
  };

  const geocodeAddress = async (address) => {
    const apiKey = import.meta.env.VITE_MAPS_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results[0]) {
        setLat(results[0].geometry.location.lat);
        setLng(results[0].geometry.location.lng);
        mapRef.current.panTo(results[0].geometry.location);
      } else {
        setError('Address not found');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Error fetching geolocation');
    }
  };

  const handleMapClick = async (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();
    setLat(clickedLat);
    setLng(clickedLng);

    const apiKey = import.meta.env.VITE_MAPS_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedLat},${clickedLng}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setError('Address not found');
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      setError('Error fetching address');
    }
  };

  const handleSymptomChange = (symptom) => {
    setSymptoms((prevSymptoms) =>
      prevSymptoms.includes(symptom)
        ? prevSymptoms.filter((s) => s !== symptom)
        : [...prevSymptoms, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !temperature || !lat || !lng || symptoms.length === 0) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const formData = {
        date,
        symptoms,
        temperature,
        address,
        lat,
        lng,
        is_positive: isPositive,
      };

      const response = await axios.post('https://dengue-watch-backend-f59b9593b035.herokuapp.com/users/self-report/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      setError('');
      alert('Self report submitted successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Submission error:', err);
      if (err.response && err.response.status === 401) {
        setError('User not authenticated');
      } else {
        setError('Error submitting form');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-14 bg-white rounded-lg shadow-lg mt-4 flex flex-col justify-between items-stretch">
      <h2 className="text-2xl font-bold mb-4">Self Report Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="temperature">
              Temperature (°C)
            </label>
            <input
              type="number"
              step="0.1"
              id="temperature"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              min="20"
              max="45"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Symptoms</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {symptomOptions.map((symptom) => (
                <div key={symptom} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={symptoms.includes(symptom)}
                    onChange={() => handleSymptomChange(symptom)}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">{symptom}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="is_positive"
              checked={isPositive}
              onChange={() => setIsPositive(!isPositive)}
              className="mr-2"
            />
            <label htmlFor="is_positive" className="text-sm font-medium text-gray-700">
              Is this report positive?
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit Report
          </button>
        </div>

        <div className="relative">
          <div className="absolute left-0 h-full w-0.5 bg-gray-300"></div>
          <div className="ml-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                Address (for geolocation)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                placeholder="Enter your address"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_KEY} libraries={libraries}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: lat || initialCenter.lat, lng: lng || initialCenter.lng }}
                zoom={13}
                onClick={handleMapClick}
                onLoad={(map) => (mapRef.current = map)}
              >
                {lat && lng && <Marker position={{ lat, lng }} />}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelfReportForm;
