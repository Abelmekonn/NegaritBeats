import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken") // Check for the token in cookies
  if (!accessToken) {
    // If no token is present, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;