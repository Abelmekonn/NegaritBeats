import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const accessToken = Cookies.get("access_token"); // Check for token in cookies
    const location = useLocation();

    if (!accessToken) {
        // Redirect to login page, and pass current location in state for post-login redirect
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // If authenticated, render the children (protected component)
    return children;
};

export default ProtectedRoute;
