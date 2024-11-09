import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const useAuthStatus = () => {
  const { isLoggedIn } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/check-auth-status/', {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    // Check auth status on component mount and whenever `isLoggedIn` changes
    checkAuthStatus();
  }, [isLoggedIn]);

  return { isAuthenticated, loading };
};

export default useAuthStatus;
