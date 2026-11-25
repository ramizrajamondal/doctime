import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { AdminContex } from '../contex/adminContex'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DoctorsList = () => {
  const { adminToken, backendurl } = useContext(AdminContex);
  const [allDoctors, setAllDoctors] = useState([]);
  const navigate = useNavigate();
  const getAllDoctors = async () => {
    try {
      const response = await axios.get(backendurl + '/api/admin/all-doctors', {
        headers: {
          admintoken: adminToken
        }
      })
      if (response?.data?.success) {
        setAllDoctors(response.data.allDoctor);
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      toast.error(error.message || error.response?.data?.message);
    }
  }
  const changeAvailablity = async (docid) => {
    try {
      const response = await axios.post(backendurl + 'api/admin/change-availablity',{docid}, {
        headers:{
          admintoken: adminToken
        }
      })
      if(response.data.success){
        toast.success(response.data.message);
        getAllDoctors();
      }
      else{
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      toast.error(error.response.data?.message || error.message);
    }
  }
  useEffect(() => {
    if (!adminToken) {
      navigate('/login')
    }
    else{
      getAllDoctors();
    }
  }, [adminToken])
  console.log(allDoctors);
  return (
    <div className=''>
      <Navbar />
      <div className='flex'>
        <SideBar />
        <div>
          <h2 className='text-[#323232] font-bold text-md lg:text-xl ml-3 mt-2'>All Doctors</h2>
          <div className='px-3 lg:px-10 flex flex-col items-center mt-1'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5'>
              {allDoctors.map((item, idx) => (
                <div key={idx} className='border mt-3 border-[#c1d1fe] rounded-md flex flex-col gap:0.5 md:gap-1.5 cursor-pointer hover:-translate-y-2 duration-300'>
                  <div className='doc-pic bg-[#EAEFFF]'>
                    <img className='w-48' src={item.image} alt="" />
                  </div>
                  <div className='doc-data flex flex-col gap-0.5 py-2 px-2'>
                    <p className='text-[#1F2937] font-medium text-xl'>{item.name}</p>
                    <p className='text-xs text-[#4B5563] font-normal'>{item.speciality}</p>
                    <div className='flex gap-1 text-sm'> 
                      <input onChange={() => {changeAvailablity(item._id)}}
                      type="checkbox" checked={item.available} className='cursor-pointer' />
                      <p className='text-sm font-semibold text-[#323232]'>
                      Available
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsList
