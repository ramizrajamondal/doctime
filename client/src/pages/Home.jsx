import React, { useContext } from 'react'
import Header from '../components/Header'
import Speciality from '../components/Speciality'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { UserContex } from '../context/UserContex.jsx'

const Home = () => {
  return (
   <div>
    <Navbar />
    <Header />
    <Speciality />
    <TopDoctors />
    <Banner />
    <Footer />
   </div>
  )
}

export default Home
