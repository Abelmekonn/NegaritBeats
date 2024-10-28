import { Provider } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Discover from './pages/Discover/Discover';
import Artist from './pages/Artist/Artist';
import ArtistDetail from './pages/Artist/ArtistDetail';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import Album from './pages/Album/Album';
import AlbumDetails from './pages/Album/AlbumDetail';
import Setting from './pages/Settings/Setting';
import store from '../redux/store';
import Login from './pages/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Otp from './pages/Auth/Otp';
import { useDispatch } from 'react-redux';
import { loadUserRequest, loginUserSuccess } from '../redux/features/user/userSlice';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Subscription from './pages/Subscription/Subscription';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    const initializeApp = () => {
      const userData = Cookies.get('user_data');

      if (userData) {
        dispatch(loginUserSuccess(JSON.parse(userData)));
      }
      // Always call loadUserRequest to fetch the latest user data
      dispatch(loadUserRequest());
      setLoading(false);
    };

    initializeApp();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const protectedRoutes = [
    { path: '/', element: <Home /> },
    { path: 'discover', element: <Discover /> },
    { path: 'artists', element: <Artist /> },
    { path: 'artist/:id', element: <ArtistDetail /> },
    { path: 'albums', element: <Album /> },
    { path: 'album/:id', element: <AlbumDetails /> },
    { path: 'settings', element: <Setting /> },
    { path: 'subscription', element: <Subscription /> },
  ];

  return (
    <Provider store={store}>
      <MusicPlayerProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/activate" element={<Otp />} />
          
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<ProtectedRoute>{route.element}</ProtectedRoute>} />
          ))}
        </Routes>
      </MusicPlayerProvider>
    </Provider>
  );
}

export default App;
