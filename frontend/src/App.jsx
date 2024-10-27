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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Import the ProtectedRoute component
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
      const accessToken = Cookies.get('access_token');

      if (userData && accessToken) {
        dispatch(loginUserSuccess(JSON.parse(userData)));
        dispatch(loadUserRequest());
      }
      setLoading(false);
    };

    initializeApp();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <MusicPlayerProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/activate' element={<Otp />} />

          {/* Wrap all protected routes in ProtectedRoute */}
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
          <Route path="artists" element={<ProtectedRoute><Artist /></ProtectedRoute>} />
          <Route path="artist/:id" element={<ProtectedRoute><ArtistDetail /></ProtectedRoute>} />
          <Route path="albums" element={<ProtectedRoute><Album /></ProtectedRoute>} />
          <Route path="album/:id" element={<ProtectedRoute><AlbumDetails /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />

        </Routes>
      </MusicPlayerProvider>
    </Provider>
  );
}

export default App;
