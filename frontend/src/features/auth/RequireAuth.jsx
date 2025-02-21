import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentToken } from './authSlice';

const RequireAuth = ({ children, allowedRoles }) => {
  // Get the current authentication token from the Redux store
  const token = useSelector(selectCurrentToken);
  
  // Get the current location to store for redirecting after login
  const location = useLocation();
  
  // TODO: Add logic to decode the JWT and extract user roles dynamically
  const userRoles = token ? ['Admin'] : []; // Replace this with actual role extraction logic
  
  // Check if the user has at least one of the required roles
  const hasRequiredRole = userRoles.some(role => allowedRoles.includes(role));

  return token && hasRequiredRole ? (
    // If the user is authenticated and has the required role, render the requested component
    children
  ) : token ? (
    // If the user is authenticated but lacks permission, redirect to an unauthorized page
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    // If the user is not authenticated, redirect to the login page
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
