import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AdminContex } from '../contex/adminContex'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
const Appointments = () => {
  const [allAppointment, setAllAppointment] = useState([]);
  const { adminToken, backendurl } = useContext(AdminContex);
  const navigate = useNavigate();
  const month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const getAppointmentList = async () => {
    try {
      const response = await axios.get(backendurl + '/api/admin/get-appointments', {
        headers: {
          admintoken: adminToken
        }
      })
      if (response.data.success) {
        setAllAppointment(response.data.appointmentList);
      } else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      toast.error(error.message || error.response?.data?.message);
    }
  }
  const calculateAge = (mydate) => {
    const today = new Date();
    const dobtToDate = new Date(mydate);
    const age = today.getFullYear() - dobtToDate.getFullYear();
    return age;
  }
  const formatDate = (slotDate) => {
    const dateArray = slotDate.split('/');
    let formatted = ''
    if (dateArray[1] > 9) {
      formatted += dateArray[0] + month[Number(dateArray[1])] + dateArray[2];
      return formatted;
    }
    else {
      const lastDigit = Number(dateArray[1]) % 10;
      return dateArray[0] + month[lastDigit] + dateArray[2];
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
  useEffect(() => {
    if (!adminToken) {
      navigate('/login');
    }
    getAppointmentList();
  }, [adminToken, cancelAppointment]);
  return (
    <div className=''>
      <Navbar />
      <div className='flex gap-5'>
        <SideBar />
        <div className="w-full">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl  font-medium text-gray-800">
              All Appointments
            </h3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

            {/* Header */}
            <div className="hidden md:grid grid-cols-12 bg-indigo-100 border-gray-200">
              <div className="col-span-3 px-6 py-4 font-semibold text-gray-700">
                Patient
              </div>

              <div className="col-span-1 px-2 py-4 text-center font-semibold text-gray-700">
                Age
              </div>

              <div className="col-span-3 px-4 py-4 font-semibold text-gray-700">
                Date & Time
              </div>

              <div className="col-span-3 px-4 py-4 font-semibold text-gray-700">
                Doctor
              </div>

              <div className="col-span-1 px-2 py-4 text-center font-semibold text-gray-700">
                Fees
              </div>

              <div className="col-span-1 px-2 py-4 text-center font-semibold text-gray-700">
                Action
              </div>
            </div>

            {/* Body */}
            <div className="divide-y divide-gray-100">
              {allAppointment.map((item, idx) => (
                <div
                  key={idx}
                  className="transition hover:bg-gray-50"
                >
                  {/* Desktop */}
                  <div className="hidden md:grid grid-cols-12 items-center">

                    {/* Patient */}
                    <div className="col-span-3 flex items-center gap-3 px-6 py-5">
                      <span className="font-semibold text-indigo-600">
                        #{idx + 1}
                      </span>

                      <img
                        src={item.userData?.image}
                        className="h-11 w-11 rounded-full object-cover border"
                        alt=""
                      />

                      <p className="font-medium text-gray-800">
                        {item.userData?.name}
                      </p>
                    </div>

                    {/* Age */}
                    <div className="col-span-1 text-center text-gray-600">
                      {calculateAge(item.userData?.dob)}
                    </div>

                    {/* Date */}
                    <div className="col-span-3 px-4">
                      <p className="font-medium">
                        {formatDate(item.slotDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.slotTime}
                      </p>
                    </div>

                    {/* Doctor */}
                    <div className="col-span-3 flex items-center gap-3 px-4">
                      <img
                        src={item.doctorData?.image}
                        className="h-11 w-11 rounded-full border"
                        alt=""
                      />

                      <p>{item.doctorData?.name}</p>
                    </div>

                    {/* Fees */}
                    <div className="col-span-1 text-center font-semibold text-green-600">
                      ${item.fees}
                    </div>

                    {/* Action */}
                    <div className="col-span-1 flex justify-center">
                      {item.cancelled ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                          Cancelled
                        </span>
                      ) :
                        item.isCompleted ? (
                          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-700">
                            Completed
                          </span>
                        )
                          : (
                            <button onClick={() => { cancelAppointment(item._id) }}
                              className="rounded-full cursor-pointer bg-red-100 p-2 hover:bg-red-50">
                              <img
                                src={assets.cancel_icon}
                                className="h-10 w-10"
                                alt=""
                              />
                            </button>
                          )
                      }
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="space-y-4 p-5 md:hidden">

                    <div className="flex justify-between">
                      <span className="font-bold text-indigo-600">
                        #{idx + 1}
                      </span>

                      <span className="font-semibold text-green-600">
                        ${item.fees}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={item.userData?.image}
                        className="h-12 w-12 rounded-full"
                        alt=""
                      />

                      <div>
                        <p className="font-semibold">
                          {item.userData?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Age: {calculateAge(item.userData?.dob)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Appointment</p>

                      <p className="font-medium">
                        {formatDate(item.slotDate)}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.slotTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={item.doctorData?.image}
                        className="h-10 w-10 rounded-full"
                        alt=""
                      />

                      <p>{item.doctorData?.name}</p>
                    </div>

                    <div className="flex justify-end">
                      {item.cancelled ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                          Cancelled
                        </span>
                      ) : (
                        <button onClick={() => { cancelAppointment(item._id) }}
                          className="rounded-full cursor-pointer p-2 hover:bg-red-300">
                          <img
                            src={assets.cancel_icon}
                            className="h-14 w-14"
                            alt=""
                          />
                        </button>
                      )}
                    </div>
                    <hr className='h-1 text-gray-400' />
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

export default Appointments
