import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyTokenRequest } from '../../../redux/features/user/userSlice';
import Loader from '../Loader/Loader';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(verifyTokenRequest()); // Dispatch the token verification action
    }, [dispatch]);

    if (loading) {
        return <div><Loader /></div>; // Show a loading message while verifying
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
