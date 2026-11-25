import React, { useContext } from 'react'
import AdminLoginPage from './pages/AdminLoginPage'
import DoctorLoginPage from './pages/DoctorLoginPage'
import Home from './pages/Home'
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { AdminContex } from './contex/adminContex'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddDoctor from './pages/AddDoctor'
import Appointments from './pages/Appointments'
import DoctorsList from './pages/DoctorsList'
import DoctorDashBoard from './pages/doctor/DoctorDashBoard'
import DoctorProfile from './pages/doctor/DoctorProfile'
import Appointment from './pages/doctor/Appointments'
import { DoctorContex } from './contex/doctorContex'
const App = () => {
  const {adminToken} = useContext(AdminContex);
  const{doctorToken} = useContext(DoctorContex);
  //bg-[#F8F9FD]
  return (
    <div className=''>
      <Routes>
        {
          adminToken ? <>
          <Route path='/' element={<Home />} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/all-appoinments' element={<Appointments/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />
          </>
          : 
          <>
          {
            doctorToken ? <>
              <Route path='/' element={<DoctorDashBoard />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
              <Route path='/doctor-appointments' element={<Appointment />} />
            </> 
            : 
            <>
            <Route path='/' element={<AdminLoginPage />} />
            <Route path='/doctor-login' element={<DoctorLoginPage />} /> 
            </>
          }
          </>
        }
      </Routes>
    </div>
  )
}
export default App
