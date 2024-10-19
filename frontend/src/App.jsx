import { Provider } from 'react-redux'; // Import Provider from redux
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Layout from './components/LayOut/Layout';
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

function App() {
  return (
    <Provider store={store}> {/* Wrap everything with Provider */}
      <MusicPlayerProvider>
        <Routes>
          {/* Auth route not wrapped in Layout */}
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<SignUp />} />
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
