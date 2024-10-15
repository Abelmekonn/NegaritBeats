import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import Layout from './components/LayOut/Layout'

function App() {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  )
}

export default App
