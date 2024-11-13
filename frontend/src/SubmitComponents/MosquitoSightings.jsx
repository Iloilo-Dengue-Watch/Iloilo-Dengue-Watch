import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const initialCenter = {
  lat: 10.7202,
  lng: 122.5621,
};

const libraries = ['places'];

const MosquitoSightings = () => {
  const [date, setDate] = useState('');
  const [sightingType, setSightingType] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(initialCenter.lat);
  const [lng, setLng] = useState(initialCenter.lng);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const mapRef = useRef(null);

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
      setError('Error fetching address');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !sightingType || !lat || !lng) {
      setError('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('date', date);
    formData.append('sighting_type', sightingType);
    formData.append('address', address);
    formData.append('lat', lat);
    formData.append('lng', lng);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/mosquito-sightings/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Mosquito sighting reported successfully!');
      setError('');
      setDate('');
      setSightingType('');
      setAddress('');
      setLat(initialCenter.lat);
      setLng(initialCenter.lng);
      setImage(null);
    } catch (err) {
      setError('Error submitting form');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Mosquito Sighting Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="sightingType">
              Type of Sighting
            </label>
            <select
              id="sightingType"
              value={sightingType}
              onChange={(e) => setSightingType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Select type</option>
              <option value="biting">Biting</option>
              <option value="breeding">Breeding</option>
              <option value="sighting">Just Sighting</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="image">
              Attach Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div>
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

          <div className="mt-6">
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

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit Sighting
          </button>
        </div>
      </form>
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default MosquitoSightings;