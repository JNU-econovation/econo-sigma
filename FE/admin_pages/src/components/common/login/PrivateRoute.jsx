import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? <Outlet /> : <Navigate to="/users/login" />;
};

export default PrivateRoute;