import React from 'react'
import Layout from '../../components/LayOut/Layout'
import Banner from '../../components/home/Banner'
import NewRelease from '../../components/home/NewRelease'

function Home() {
  return (
    <div>
      <Layout>
        <Banner />
        <NewRelease />
      </Layout>
    </div>
  )
}

export default Home