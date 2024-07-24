import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://43.202.196.181:8080/api/users/login', { loginId: username, password: password }, { withCredentials: true });
      const authHeader = response.headers['authorization'];
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        setAccessToken(token);
        localStorage.setItem('accessToken', token);
        navigate('/books/all'); // 로그인 성공 후 /books/all 페이지로 리디렉트
      } else {
        console.error('Authorization header is missing in the response');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate('/books/all'); // 로그아웃 후 /books/all 페이지로 리디렉트

      setAccessToken(null);
      localStorage.removeItem('accessToken');
      document.cookie = 'refreshToken=; Max-Age=0; path=/;';
    }

  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('http://43.202.196.181:8080/api/refresh-token', {}, { withCredentials: true });
      const authHeader = response.headers['authorization'];
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        setAccessToken(token);
        localStorage.setItem('accessToken', token);
      } else {
        console.error('Authorization header is missing in the response');
      }
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