import React, { useContext, useEffect } from 'react'
import Navbar from "../../components/Navbar"
import DoctorSidebar from "./DoctorSidebar";
import SideBar from './DoctorSidebar';
import { toast } from 'react-toastify';
import { DoctorContex } from "../../contex/doctorContex"
import axios from 'axios';
import { useState } from 'react';

const DoctorProfile = () => {
  const { backendurl, doctorToken } = useContext(DoctorContex);
  const [docProfile, setdocProfile] = useState();
  const [isEdit, setisEdit] = useState(false);

  const getProfileData = async () => {
    try {
      const response = await axios.get(backendurl + '/api/doctor/profile', {
        headers: {
          doctortoken: doctorToken
        }
      });
      if (response.data.success) {
        setdocProfile(response.data.docProfile);
      } else {
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const updateProfileData = async () => {
    try {
      const response = await axios.post(backendurl + '/api/doctor/update-profile',docProfile,{
        headers:{
          doctortoken: doctorToken
        }
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        getProfileData();
      }
      else {
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (doctorToken) {
      getProfileData();
    }
  }, [doctorToken])


  return (
    <div>
      <Navbar />
      <div className='flex'>
        <SideBar />
        <div className='w-4/5 rounded-lg m-4 p-4 border border-gray-200 flex flex-col gap-3'>

          {/* doctorimage */}
          <div className='w-full sm:max-w-70 bg-indigo-400 rounded-lg'>
            <img className='' src={docProfile?.image} alt="" />
          </div>

          <div>
            <p className='text-md md:text-2xl font-medium'>{docProfile?.name}</p>
          </div>

          {/* doctor degree */}

          <div className='flex gap-2 text-gray-700 text-center items-center'>
            <p className='text-md'>{docProfile?.degree}</p> -
            <p className='text-md'>{docProfile?.speciality}</p>
            <p className='px-2 py-1 text-center text-xs rounded-full border border-gray-200'>{docProfile?.experience}</p>
          </div>

          {/* about */}

          <div className='flex flex-col'>
            About:
            <p className='text-gray-700 text-xs sm:text-sm text-wrap'>
              {docProfile?.about}
            </p>
          </div>

          {/* fees */}

          <div className='flex flex-col sm:flex-row sm:items-center gap-2 text-xl'>
            <span>
              Appointment Fees:
            </span>
            {
              isEdit ?
                (
                  <input className='w-full sm:w-40 px-3 py-2 text-base border border-gray-300 rounded-lg outline-none focus:border-indigo-500'
                    type="number" value={docProfile?.fees} onChange={(e) => setdocProfile((prev) => ({ ...prev, fees: e.target.value }))} />
                )
                :
                (
                  <span className='text-md text-gray-700'>{docProfile?.fees} RS</span>
                )
            }
          </div>

          {/* address */}

          <div className='flex flex-col sm:flex-row sm:items-center gap-2 text-xl'>
            <span>
              Address:
            </span>
            {
              isEdit ?
                (
                  <input className='w-full sm:w-40 px-3 py-2 text-base border border-gray-300 rounded-lg outline-none focus:border-indigo-500'
                    type="text" value={docProfile?.address} onChange={(e) => setdocProfile((prev) => ({ ...prev, address: e.target.value }))} />
                )
                :
                (
                  <span className='text-md text-gray-700'>{docProfile?.address}</span>
                )
            }
          </div>

          <div className='flex text-center items-center gap-2'>
            <input className='hover:cursor-pointer' type="checkbox" checked={docProfile?.available} onChange={() => isEdit && setdocProfile((prev) => ({...prev, available: !prev.available }))} />
            <label htmlFor="">Available</label>
          </div>

          <div className='flex w-20 flex-col gap-3 sm:flex-row sm:gap-5'>

            <button onClick={() => { setisEdit(true) }}
              className='px-2 hover:cursor-pointer hover:bg-indigo-600 transition duration-500 hover:scale-110 ease-in-out  hover:text-white sm:px-5 py-1 border border-gray-200 rounded-full'>
              Edit
            </button>

            <button onClick={() => {
              updateProfileData();
              setisEdit(false);
            }}
              className='px-2 hover:cursor-pointer hover:bg-indigo-600 transition duration-700 hover:scale-110 ease-in-out hover:text-white sm:px-5 py-1 border border-gray-200 rounded-full'>
              Save
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile

