import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { useAuth } from '../AuthContext.jsx';
import { FaArrowLeft } from 'react-icons/fa';
import SelfReportForm from './SelfReportForm.jsx';
import useAuthStatus from '../useAuthStatus';

export default function Submit() {
  const { isAuthenticated, loading } = useAuthStatus();
  const [isSignUp, setIsSignUp] = useState(false);
  const { isLoggedIn } = useAuth();
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="top-4 left-8 z-10 px-4 absolute">
        <Link to="/" className="text-black p-2 rounded-full transition">
        <button className='flex'>
          <FaArrowLeft size={24} />
          Go back to Homepage
        </button>

        </Link>
      </div>
      {isAuthenticated ? (
        <MainSubmitContent />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-4">
          {isSignUp ? <SignUp /> : <LogIn />}
          <button
            onClick={toggleAuthMode}
            className="mt-4 text-blue-600 hover:underline"
          >
            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      )}
    </>
  );
}

export function MainSubmitContent() {
  const { logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userInfo } = useAuthStatus();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {userInfo?.first_name && (
        <div className="relative font-[sans-serif] w-max mx-auto">
          <button
            type="button"
            id="dropdownToggle"
            onClick={handleDropdownToggle}
            className="px-4 py-2 flex items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-100"
          >
            <img src="https://readymadeui.com/profile_6.webp" className="w-7 h-7 mr-3 rounded-full shrink-0" alt="Profile" />
            <span>{userInfo.first_name} {userInfo.last_name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400 inline ml-3" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                clipRule="evenodd"
                data-original="#000000"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <ul id="dropdownMenu" className="absolute block shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
              <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                {/* Profile and other menu items here */}
              </li>
              <li onClick={logOut} className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 mr-3" viewBox="0 0 6.35 6.35">
                  <path
                    d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                    data-original="#000000"
                  />
                </svg>
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
      <h1 className="text-center mt-4">Welcome! You are logged in.</h1>
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
          <SelfReportComponent />
          <MosquitoSightingComponent />
        </div>
      </div>
    </div>
  );
}


import { Button, Card } from "flowbite-react";

function SelfReportComponent() {
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Self Report Form
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Fill out the self report to submit a self diagnosis regarding your relevant dengue health status.
      </p>
      <Button className='text-white !bg-blue-600' onClick={()=> window.location.href = '/submit/self-report/'}>
        Submit a form
        <svg className="-mr-1 ml-2 h-4 w-4 text-black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}
function MosquitoSightingComponent() {
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Mosquito Sightings Form
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Fill out the self report to submit a self diagnosis regarding your relevant dengue health status.
      </p>
      <Button className='text-white !bg-blue-600' onClick={()=> window.location.href = '/submit/mosquito-sightings/'}>
        Submit a form
        <svg className="-mr-1 ml-2 h-4 w-4 text-black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}
