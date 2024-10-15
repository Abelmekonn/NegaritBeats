import React from 'react'
import Layout from '../../components/LayOut/Layout'
import Banner from '../../components/home/Banner'
import NewRelease from '../../components/home/NewRelease'
import TopArtists from '../../components/home/TopArtists'
import TrendingSongs from '../../components/home/TrendingSongs'
import Playlist from '../../components/home/Playlist'

function Home() {
  return (
    <div className='flex flex-col gap-12'>
        <Banner />
        <NewRelease />
        <TrendingSongs />
        <TopArtists />
        <Playlist />
    </div>
  )
}

export default Home