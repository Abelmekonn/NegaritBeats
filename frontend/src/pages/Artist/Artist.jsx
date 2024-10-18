import React from 'react'
import Banner from "../../components/home/Banner"
import banner from "../../assets/banner/banner5.jpg"
import AllArtists from '../../components/Artist/AllArtists'
import NewRelease from '../../components/home/NewRelease'
import TopAlbum from '../../components/home/TopAlbum'
import TrendingSongs from '../../components/home/TrendingSongs'

function Artist() {
  return (
    <div className='flex flex-col pt-20 gap-12'>
      <AllArtists />
      <NewRelease />
      <TrendingSongs />
      <TopAlbum />
    </div>
  )
}

export default Artist