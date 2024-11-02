import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Discover from './pages/Discover/Discover';
import Artist from './pages/Artists/Artist';
import ArtistDetail from './pages/Artists/ArtistDetail';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import Album from './pages/Album/Album';
import AlbumDetails from './pages/Album/AlbumDetail';
import Setting from './pages/Settings/Setting';
import  store,{ persistor } from '../redux/store';
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
import Dashboard from './pages/ArtistDashboard/Dashboard';
import ArtistProfile from './pages/ArtistDashboard/ArtistProfile';
import CreateSong from './pages/ArtistDashboard/CreateSong';
import CreateAlbum from './pages/ArtistDashboard/CreateAlbum';

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
    {path : "artist" ,element : <Dashboard />},
    {path:"artist/profile" , element: <ArtistProfile />},
    {path:"/artist/create-song" , element:<CreateSong />},
    {path:"/artist/create-album", element:<CreateAlbum /> },
  ];

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
