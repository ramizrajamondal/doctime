import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../context/AppContex"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { UserContex } from '../context/UserContex';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [allAppointments, setAllAppointments] = useState([]);
  const { userToken, backendurl } = useContext(UserContex);
  const navigate = useNavigate();
  const monthArray = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const getAppointmentRecords = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/users/appointment-records`, {
        headers: { usertoken: userToken }
      })
      if (response.data.success) {
        setAllAppointments(response.data.allAppointment.reverse());
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
    const dateArray = slotDate.split('/');
    if (dateArray[1] > 9) {
      return dateArray[0] + " " + monthArray[Number(dateArray[1])] + " " + dateArray[2];
    }
    else {
      const lastDigit = Number(dateArray[1]) % 10;
      return dateArray[0] + " " + monthArray[lastDigit] + " " + dateArray[2];
    }
  }
  const cancelAppointment = async (appointmentId) => {
    try {
      if (!appointmentId) {
        toast.error('please provide appointment id');
      }
      const response = await axios.post(`${backendurl}/api/users/cancel-appointment`, { appointmentId }, {
        headers: { usertoken: userToken }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentRecords();
      }
      else {
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      toast.error(error.message || error.response?.data?.message);
    }
  }
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Doctime Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const res = await axios.post(backendurl + '/api/users/verify-payment', response, {
            headers: {
              usertoken: userToken
            }
          });
          if (res.data.success) {
            getAppointmentRecords();
            toast.success(res.data.message);
          }
          else {
            toast.error(res?.data?.message);
          }
        }
        catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }

      },
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  const appointmentFeesPayment = async (appointmentId) => {
    try {
      const response = await axios.post(backendurl + '/api/users/fees-payment', { appointmentId }, {
        headers: {
          usertoken: userToken
        }
      });
      if (response.data.success) {
        initPay(response.data.order);
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
    if (!userToken) {
      toast.warn('login your account');
      navigate('/login');
    }
    else {
      getAppointmentRecords();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className='mt-5'>
        <p className='text-[#414853] text-sm lg:text-lg font-medium'>My Appointments</p>
        <hr className='mt-3 h-1 text-[#D1D1D1]' />
        <div className='booked-appoinment '>
          {allAppointments.map((record, idx) => (
            <div key={idx}>
              <div className='mt-5 sm:flex sm:justify-between'>
                {/* pic and info */}
                <div className='flex gap-5'>
                  <div className='pic  w-2/6 bg-[#EAEFFF] flex items-center justify-center'>
                    <img src={record.doctorData.image} alt="" className='full' />
                  </div>
                  <div className='info'>
                    <div>
                      <h1 className='text-[#262626] text-md md:text-xl lg:text-2xl font-medium'>{record.doctorData.name}</h1>
                      <p className='text-[#4B5563] text-xs md:text-lg font-medium'>{record.doctorData.speciality}</p>
                    </div>
                    <div className='mt-3'>
                      <h1 className='text-md md:text-lg text-[#4B5563 font-bold]'>Address:</h1>
                      <p className='text-[#4B5563] text-xs md:text-lg font-medium'>{record.doctorData.address}</p>
                    </div>
                    <div className='mt-3'>
                      <p className='text-[#2a2c2d]'>Date & Time: <span className='text-[#4B5563]'>{formatDate(record.slotDate)} |  {record.slotTime}</span></p>
                      <h2 className='text-[#2a2c2d]'>Booking Name: <span className='text-[#4B5563] text-md'>{record.userData.name}</span></h2>
                    </div>
                    <div className='mt-3 flex  gap-2'>
                      Status:
                      {
                        record.cancelled ? (
                          <p className='text-md text-red-600'>Cancelled</p>
                        )
                          :
                          record.isCompleted ? (
                            <p className='text-md text-green-600'>Completed</p>
                          )
                            :
                            (
                              <p className='text-md text-orange-500'>In Process</p>
                            )
                      }
                    </div>
                  </div>
                </div>
                {/* button */}
                <div className='flex flex-col gap-2 max-sm:mt-3 max-sm:w-2/6'>
                  {!record.payment && !record.cancelled && !record.isCompleted ?
                    (<button onClick={() => appointmentFeesPayment(record?._id)} className="px-3 py-2 rounded-md bg-[#6c7af9] text-white text-xs font-medium hover:bg-[#515dca] hover:scale-105 transition-colors duration-200 cursor-pointer whitespace-nowrap md:text-sm">
                      Pay Here
                    </button>
                    ) : !record.payment && record.cancelled ? (
                      <button disabled className="px-3 py-2 rounded-md bg-red-50 text-red-600 text-xs font-medium border border-red-200 cursor-not-allowed whitespace-nowrap md:text-sm">
                        Payment not done
                      </button>
                    ) : (
                      <button disabled className="px-3 py-2 rounded-md bg-green-50 text-green-600 text-xs font-medium border border-green-200 cursor-not-allowed whitespace-nowrap md:text-sm" >
                        Paid
                      </button>
                    )}

                  {!record.isCompleted && <button onClick={() => { cancelAppointment(record._id) }}
                    className={`${record.cancelled ? 'hidden' : 'block'} cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-[#4B5563] text-xs hover:bg-red-600 hover:text-white hover:scale-105 duration-300`}>
                    Cancel Appointment
                  </button>}
                  <p className={`${record.isCompleted ? 'block' : 'hidden'} px-4 py-2 border border-gray-400 rounded-md text-green-700 text-xs md:px-6 md:text-lg`}>Appointment Completed</p>
                  {record.cancelled && <button className='px-4 py-2 border border-gray-400 rounded-md text-red-700 text-xs md:px-6 md:text-lg'>Appointment Cancelled</button>}
                </div>
              </div>
              <hr className='mt-3 h-1 text-[#D1D1D1]' />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyAppointments
