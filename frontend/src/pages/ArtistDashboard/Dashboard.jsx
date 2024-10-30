import React from 'react'
import Layout from '../../components/Artist-pages/Layout/Layout'
import ArtistHeader from '../../components/Artist-pages/Dashboard/ArtistHeader'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
        <Layout >
            <ArtistHeader artist={user}/>
        </Layout>
    </div>
  )
}

export default Dashboard