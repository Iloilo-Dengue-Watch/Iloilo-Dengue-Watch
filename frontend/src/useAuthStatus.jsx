import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useCsrfToken } from './CrsfTokenContext';

const useAuthStatus = () => {
  const { isLoggedIn } = useAuth();
  const { csrfToken } = useCsrfToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_PROD_URL}/users/check-auth-status/`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);

        if (response.data.isAuthenticated) {
          const response_user = await axios.get(`${import.meta.env.VITE_REACT_APP_PROD_URL}/users/get-user-info/`, {
            withCredentials: true,
            headers: {
              'X-CSRFToken': csrfToken,
            },
          });
          setUserInfo(response_user.data);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn, csrfToken]);

  return { isAuthenticated, loading, userInfo };
};

export default useAuthStatus;
