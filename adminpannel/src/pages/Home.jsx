import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Dashboard from './Dashboard'
const Home = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='flex'>
        <SideBar />
        <div className=''>
          <Dashboard/>
        </div>
      </div>
    </div>
  )
}

export default Home
