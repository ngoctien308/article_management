import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/auth/info', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data.user[0]);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
        }
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        console.log('Ở authContext: ', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
