import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={accessToken ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;