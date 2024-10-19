import React from 'react'
import { useParams } from 'react-router-dom'
import ArtistAlbum from '../../components/Album/ArtistAlbum'
import Layout from '../../components/LayOut/Layout'

const AlbumDetail = () => {
  const { id } = useParams()
  return (
    <Layout >
      <ArtistAlbum id={id} />
    </Layout>
  )
}

export default AlbumDetail