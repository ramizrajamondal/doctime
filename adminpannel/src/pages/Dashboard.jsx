import React from 'react'
import { AdminContex } from '../contex/adminContex'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const Dashboard = () => {
  const { adminToken, backendurl } = useContext(AdminContex);
  const [dashData, setDashData] = useState({});
  const navigate = useNavigate();
  const getDashBoardData = async () => {
    try {
      const response = await axios.get(backendurl + '/api/admin/get-dashboard', {
        headers: {
          admintoken: adminToken
        }
      });
      if (response.data.success) {
        setDashData(response.data.dashData);
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(backendurl + '/api/admin/cancel-appointment', { appointmentId }, {
        headers: {
          admintoken: adminToken
        }
      })
      if (response.data.success) {
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
  const formatDate = (slotDate) => {
    let splitDate = slotDate.split('/');
    if (splitDate[1] > 9) {
      return splitDate[0] + " " + month[Number(splitDate[1])] + " " + splitDate[2];
    }
    else {
      const lastDigit = Number(splitDate[1]) % 10;
      return splitDate[0] + " " + month[lastDigit] + " " + splitDate[2];
    }
  }
  useEffect(() => {
    getDashBoardData();
  }, [adminToken, cancelAppointment]);
  return (
    <div className='p-6 md:p-10'>
      <div className='flex gap-5 max-md:flex-wrap'>
        <div className='flex w-full md:w-2/4 gap-2 border border-[#E1E1E1] shadow-sm rounded-md py-3 px-8 bg-white'>
          <img src={assets.doctor_icon} alt="" />
          <div className='flex flex-col gap-1 items-center justify-center text-sm'>
            <p >{dashData.doctorLength}</p>
            <p className='text-[#8893B0]'>Doctors</p>
          </div>
        </div>

        <div className='flex w-full md:w-2/4 gap-2 border border-[#E1E1E1] shadow-sm rounded-md py-3 px-8 bg-white'>
          <img src={assets.appointments_icon} alt="" />
          <div className='flex flex-col gap-1 items-center justify-center text-sm'>
            <p>{dashData.appointmentLength}</p>
            <p className='text-[#8893B0]'>Appointments</p>
          </div>
        </div>

        <div className='flex w-full md:w-2/4 gap-2 border border-[#E1E1E1] shadow-sm rounded-md py-3 px-8 bg-white'>
          <img src={assets.patients_icon} alt="" />
          <div className='flex flex-col gap-1 items-center justify-center text-sm'>
            <p>{dashData.userLength}</p>
            <p className='text-[#8893B0]'>Patients</p>
          </div>
        </div>
      </div>

      <div className='mt-8 border border-gray-300 p-4 rounded-md'>
        <div className='flex gap-3'>
          <img src={assets.list_icon} alt="" />
          <h2 className='text-[#323232] text-base font-semibold'>Latest Appointment</h2>
        </div>
        <hr className='h-1 text-gray-300 mt-3' />
        <div className='p-2 md:p-3 flex flex-col gap-10'>
          {dashData?.latestAppointments?.map((appoinment, idx) => (
            <div className='flex justify-between items-center' key={idx}>
              <div className='flex gap-5'>
                <div className='bg-gray-300 h-13 w-13 rounded-full'><img src={appoinment?.doctorData?.image} alt="" className='h-13 w-13 rounded-full border border-gray-300' /></div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[#262626] text-lg font-medium'>{appoinment?.doctorData?.name}</p>
                  <p className='text-[#696B80] text-sm'>Booking on {formatDate(appoinment?.slotDate)}</p>
                </div>
              </div>
              <div>
                {appoinment?.cancelled ?
                  <p className='text-red-600 text-xs ms:text-sm font-semibold rounded-full px-2 sm:px-4 py-1 bg-red-100'>
                    Cancelled
                  </p>
                  :
                  appoinment.isCompleted ?
                    <p className='text-green-600 text-xs ms:text-sm font-semibold rounded-full px-2 sm:px-4 py-1 bg-green-200'>
                      Completed
                    </p>
                    :
                    <button onClick={() => { cancelAppointment(appoinment?._id) }}
                      className='cursor-pointer hover:scale-110'>
                      <img src={assets.cancel_icon} alt="" />
                    </button>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}


export default Dashboard
