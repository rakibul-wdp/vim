import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const state = useSelector((state) => state.auth);

  if (state.isAuth) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
