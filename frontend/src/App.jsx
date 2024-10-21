import { Provider } from 'react-redux'; // Import Provider from redux
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Discover from './pages/Discover/Discover';
import Artist from './pages/Artist/Artist';
import ArtistDetail from './pages/Artist/ArtistDetail';
import { MusicPlayerProvider } from './context/MusicPlayerContext';
import Album from './pages/Album/Album';
import AlbumDetails from './pages/Album/AlbumDetail';
import Setting from './pages/Settings/Setting';
import store from '../redux/store'; // Ensure you import your Redux store
import Login from './pages/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Otp from './pages/Auth/Otp';
import { useDispatch } from 'react-redux';
import { loadUserRequest, loginUserSuccess } from '../redux/features/user/userSlice';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading status

  const initializeApp = () => {
    const userData = Cookies.get('user_data');
    const accessToken = Cookies.get('access_token');

    if (userData && accessToken) {
      // Rehydrate user data into Redux state
      dispatch(loginUserSuccess(JSON.parse(userData)));
      // Optionally, you can re-fetch the user profile from the server
      dispatch(loadUserRequest());
    }
    setLoading(false); // Set loading to false once initialization is done
  };

  useEffect(() => {
    initializeApp(); // Run the initialization when the component mounts
  }, [dispatch]);

  if (loading) {
    return <Loader />; // Show the loader while initializing
  }

  return (
    <Provider store={store}> {/* Wrap everything with Provider */}
      <MusicPlayerProvider>
        <Routes>
          {/* Auth route not wrapped in Layout */}
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/activate' element={<Otp />} />
          {/* Wrap all other routes in Layout */}
          <Route path='/' element={<Home />} />
          <Route path="discover" element={<Discover />} />
          <Route path="artists" element={<Artist />} />
          <Route path="artist/:id" element={<ArtistDetail />} />
          <Route path="albums" element={<Album />} />
          <Route path="album/:id" element={<AlbumDetails />} />
          <Route path="settings" element={<Setting />} />
        </Routes>
      </MusicPlayerProvider>
    </Provider>
  );
}

export default App;
