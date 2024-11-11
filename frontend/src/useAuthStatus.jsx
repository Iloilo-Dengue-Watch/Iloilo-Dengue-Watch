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
        const response = await axios.get('https://dengue-watch-backend-f59b9593b035.herokuapp.com/users/check-auth-status/', {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
        console.log('Auth status checked:', response.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn]);

  return { isAuthenticated, loading };
};

export default useAuthStatus;
