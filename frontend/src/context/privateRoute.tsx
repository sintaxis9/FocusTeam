import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  onlyAdmin?: boolean;
  onlyEmpleado?: boolean;
}

const PrivateRoute = ({ children, onlyAdmin, onlyEmpleado }: PrivateRouteProps) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (onlyAdmin && user?.userType !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (onlyEmpleado && user?.userType !== 'empleado') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
