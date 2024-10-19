import React from 'react'
import Albums from '../../components/Album/Albums'
import TopAlbum from '../../components/home/TopAlbum'
import Layout from '../../components/LayOut/Layout'

function Album() {
  return (
    <Layout >
      <div className='flex flex-col pt-20 gap-12'>
        <Albums />
        <TopAlbum />
      </div>
    </Layout>
  )
}

export default Album