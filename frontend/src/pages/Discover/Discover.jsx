import React from 'react'
import Playlist from '../../components/home/Playlist'
import TopArtists from '../../components/home/TopArtists'
import NewRelease from '../../components/home/NewRelease'
import TopAlbum from '../../components/home/TopAlbum'
import Banner from "../../components/home/Banner"
import banner from "../../assets/banner/banner8.png"
import MusicGenres from '../../components/Discover/MusicGenres'


function Discover() {
  return (
    <div className='flex flex-col pt-20 gap-12'>
        <MusicGenres />
      <Playlist />
      <TopArtists />
      <NewRelease />
      <TopAlbum />
    </div>
  )
}

export default Discover