import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { useAuth } from '../AuthContext.jsx';
import { FaArrowLeft } from 'react-icons/fa';
import SelfReportForm from './SelfReportForm.jsx';
import { CsrfTokenProvider } from '../CrsfTokenContext.jsx';
import useAuthStatus from '../useAuthStatus';

export default function Submit() {
  const { isAuthenticated, loading } = useAuthStatus();
  const [isSignUp, setIsSignUp] = useState(false);
    
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="top-4 left-8 z-10 px-4 sticky">
        <Link to="/" className="text-black p-2 rounded-full transition">
          <FaArrowLeft size={24} />
        </Link>
      </div>
      {isAuthenticated ? (
        <MainContent />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-4">
          <LogIn />
          <button
            onClick={toggleAuthMode}
            className="mt-4 text-blue-600 hover:underline"
          >
            {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </div>
      )}
    </>
  );
}

function MainContent() {
  const { logOut } = useAuth();

  return (
    <div>
      <button
        onClick={logOut}
        className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600 transition"
      >
        Log out
      </button>
      <h1 className="text-center">Welcome! You are logged in.</h1>
      <SelfReportForm />
    </div>
  );
}
