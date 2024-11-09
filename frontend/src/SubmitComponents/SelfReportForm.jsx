import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useCsrfToken } from '../CrsfTokenContext';
// Container style for the Google Map
const containerStyle = {
  width: '100%',
  height: '400px',
};

// Initial center coordinates for Iloilo City
const initialCenter = {
  lat: 10.7202,
  lng: 122.5621,
};

const libraries = ['places']; // Define the libraries array

const SelfReportForm = () => {
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [temperature, setTemperature] = useState('');
  const [isPositive, setIsPositive] = useState(false);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(initialCenter.lat);
  const [lng, setLng] = useState(initialCenter.lng);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
    const { csrfToken } = useCsrfToken();

  // Function to handle address changes
  const handleAddressChange = async (address) => {
    setAddress(address);
    await geocodeAddress(address);
  };

  // Function to geocode address into lat and lng using Google Geocoding API
  const geocodeAddress = async (address) => {
    const apiKey = import.meta.env.VITE_MAPS_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      console.log('Geocoding results:', results); // Debugging log
      if (results[0]) {
        setLat(results[0].geometry.location.lat);
        setLng(results[0].geometry.location.lng);
        mapRef.current.panTo(results[0].geometry.location);
      } else {
        setError('Address not found');
      }
    } catch (err) {
      console.error('Geocoding error:', err); // Debugging log
      setError('Error fetching geolocation');
    }
  };

  // Function to handle map clicks
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
      console.log('Reverse geocoding results:', results); // Debugging log
      if (results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setError('Address not found');
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err); // Debugging log
      setError('Error fetching address');
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    console.log(csrfToken)
    e.preventDefault();
    if (!date || !symptoms || !temperature || !lat || !lng) {
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

      // Send the data to your Django backend API
      const response = await axios.post('http://127.0.0.1:8000/users/self-report/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      setError('');
      alert('Self report submitted successfully!');
    } catch (err) {
      console.error('Submission error:', err); // Debugging log
      if (err.response && err.response.status === 401) {
        setError('User not authenticated');
      } else {
        setError('Error submitting form');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Self Report Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Date Input */}
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
            required
          />
        </div>

        {/* Symptoms Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="symptoms">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
            required
          />
        </div>

        {/* Temperature Input */}
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
            required
          />
        </div>

        {/* Address and Google Maps */}
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

          {/* Google Map Preview */}
          <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_KEY} libraries={libraries}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: lat || initialCenter.lat, lng: lng || initialCenter.lng }}
              zoom={15}
              onClick={handleMapClick}
              onLoad={(map) => (mapRef.current = map)}
            >
              {lat && lng && <Marker position={{ lat, lng }} />}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Positive Report Checkbox */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default SelfReportForm;