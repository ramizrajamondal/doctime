import React, { useContext } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import Profile from "./pages/Profile";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { use } from 'react';
import { UserContex } from './context/UserContex';

const App = () => {
  //const{userToken} = useContext(UserContex);
  return (
    <div className='mx-5 sm:mx-[10%]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/book-appointment/:docId' element={<Appointment />} />
        <Route path='my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App

