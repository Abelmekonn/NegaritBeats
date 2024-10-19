import React from 'react'
import Layout from '../../components/LayOut/Layout'
import Banner from '../../components/home/Banner'
import NewRelease from '../../components/home/NewRelease'
import TopArtists from '../../components/home/TopArtists'
import TrendingSongs from '../../components/home/TrendingSongs'
import Playlist from '../../components/home/Playlist'
import TopAlbum from '../../components/home/TopAlbum'
import banner from "../../assets/banner/banner4.jpg"


function Home() {
  return (
    <Layout>
      <div className='flex flex-col gap-12'>
        <Banner
          backgroundImage={banner}
          heading="All the"
          highlightedText="Best Songs"
          subtext="On our website, you can access an amazing collection of songs from all over the world. Stream your favorite music and discover new artists and genres."
          primaryButton={{
            text: 'Discover Now',
            link: '/discover'
          }}
          secondaryButton={{
            text: 'Create Playlist',
            link: '/create-playlist'
          }}
        />
        <NewRelease />
        <TrendingSongs />
        <TopArtists />
        <TopAlbum />
        <Playlist />
      </div>
    </Layout>
  )
}

export default Home