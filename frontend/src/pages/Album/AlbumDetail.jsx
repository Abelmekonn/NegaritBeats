import React from 'react'
import { useParams } from 'react-router-dom'
import ArtistAlbum from '../../components/Album/ArtistAlbum'

const AlbumDetail = () => {
    const {id} = useParams()
  return (
    <div>
        <ArtistAlbum  id={id}/>
    </div>
  )
}

export default AlbumDetail