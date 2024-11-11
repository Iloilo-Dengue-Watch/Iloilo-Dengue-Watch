import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthdate: '',
    mobile: '',
    street: '',
    city: '',
    state: '',
    lat: '',
    lng: ''
  });
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getLatLngFromAddress = async () => {
    const { street, city, state } = formData;
    const formattedAddress = `${street}, ${city}, ${state}`;
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formattedAddress)}&key=${import.meta.env.VITE_MAPS_KEY}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setFormData((prevData) => ({
          ...prevData,
          lat: location.lat,
          lng: location.lng
        }));
        setAddress(data.results[0].formatted_address);
        return true;
      } else {
        setError('Unable to fetch location for the provided address');
        return false;
      }
    } catch (error) {
      setError('Error fetching location from address');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword || !formData.gender || !formData.birthdate || !formData.street || !formData.city || !formData.state) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get lat and lng from address
    const isLocationFetched = await getLatLngFromAddress();
    if (!isLocationFetched) return;

    try {
      const response = await fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/users/create-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          address,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setSuccess('User created successfully');
      navigate('/submit/login');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        birthdate: '',
        mobile: '',
        street: '',
        city: '',
        state: '',
        lat: '',
        lng: ''
      });
      setAddress('');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-7xl w-full flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
      <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:!px-20 px-4 py-4">
  <div>
    <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
    <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
      Welcome! Let’s start by creating your account.
    </p>
  </div>
  <div>
    <h4 className="text-white text-lg font-semibold">Easy and Safe Registration</h4>
    <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
      Our registration process is quick and secure. Your privacy is important to us, and we take every step to protect your information.
    </p>
  </div>
  <div>
    <h4 className="text-white text-lg font-semibold">Why We Need Your Data</h4>
    <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
      This website is community-focused. We use your information to track dengue cases and monitor mosquito activity in Iloilo Province.
    </p>
    <p className="text-[13px] text-gray-300 mt-2 leading-relaxed">
      You have control over what information you choose to share, especially when submitting reports.
    </p>
    <p className="text-[13px] text-gray-300 mt-2 leading-relaxed">
      <a href="#" className="text-blue-400 underline">Click here</a> to learn more about why we collect this data.
    </p>
    <p className="text-[13px] text-gray-300 mt-2 leading-relaxed">
      We promise to keep your data safe. We will never sell or share your information with data brokers.
    </p>
  </div>
</div>

        <form className="md:col-span-2 !w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
            <p className="text-sm mt-4 text-gray-800 text-center"> Already have an account? <span className="text-blue-600 font-semibold hover:underline">Log in</span></p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Mobile</label>
              <input
                name="mobile"
                type="text"
                value={formData.mobile}
                onChange={handleChange}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                placeholder="Enter mobile number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Birthdate</label>
                <input
                  name="birthdate"
                  type="date"
                  required
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Street Address</label>
              <input
                name="street"
                type="text"
                required
                value={formData.street}
                onChange={handleChange}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                placeholder="Enter street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">City</label>
                <input
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">State</label>
                <input
                  name="state"
                  type="text"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter state"
                />
              </div>
            </div>


            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md text-sm font-semibold mt-4"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
