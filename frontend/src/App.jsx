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

function App() {
  return (
    <MusicPlayerProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/artists" element={<Artist />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path='/albums' element={<Album  />} />
          <Route path='/album/:id' element={<AlbumDetails  />} />
        </Routes>
      </Layout>
    </MusicPlayerProvider>
  );
}

export default App;
