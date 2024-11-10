import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/users/create-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setSuccess('User created successfully');
      // navigate to login page
      window.location.href = '/submit/login';
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
      });
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">

        <h4 className="text-gray-800 text-base font-semibold mt-6">Sign up into your account</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">First Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter last name"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
            <input
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter mobile number"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter confirm password"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}

        <div className="!mt-12">
          <button type="submit" className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}