import React from 'react'
import Layout from '../../components/Artist-pages/Layout/Layout'
import ArtistHeader from '../../components/Artist-pages/Dashboard/ArtistHeader'
import { useSelector } from 'react-redux';
import TopListenAlbum from '../../components/Artist-pages/Dashboard/TopListenAlbums';
import ToplistenSongs from '../../components/Artist-pages/Dashboard/ToplistenSongs';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
        <Layout >
            <ArtistHeader artist={user}/>
            <TopListenAlbum />
            <ToplistenSongs />
        </Layout>
    </div>
  )
}

export default Dashboard