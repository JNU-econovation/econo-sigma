import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  const login = async (username, password) => {
    try {
      const response = await axios.post('/login', { username, password });
      const token = response.headers['authorization'].split(' ')[1];
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/refresh-token', {}, { withCredentials: true });
      const token = response.headers['authorization'].split(' ')[1];
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshAccessToken, 15 * 60 * 1000); // 15분마다 액세스 토큰 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };