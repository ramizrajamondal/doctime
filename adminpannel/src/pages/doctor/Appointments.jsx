import React, { useContext, useEffect } from 'react'
import { DoctorContex } from '../../contex/doctorContex'
import Navbar from "../../components/Navbar"
import SideBar from "./DoctorSidebar"
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const Appointments = () => {
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const { doctorToken,
    backendurl,
    doctorAppointments,
    getAppointmentByDoctor } = useContext(DoctorContex);

  const formatDate = (date) => {
    const splitDate = date.split('/');
    let fromatedDate = "";
    if (date[1] > 9) {
      fromatedDate += splitDate[0] + month[Number(splitDate[1]) - 1] + splitDate[2];
      return fromatedDate;
    }
    else {
      const lastDigit = Number(splitDate[1]) % 10;
      fromatedDate += splitDate[0] + month[lastDigit - 1] + splitDate[2];
      return fromatedDate;
    }
  };

  const formatAge = (dob) => {
    const dobToDate = new Date(dob);
    const currDate = new Date();
    return currDate.getFullYear() - dobToDate.getFullYear();
  }
  
  const completeAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(backendurl + '/api/doctor/complete-appointment',{appointmentId},{
        headers:{
          doctortoken: doctorToken,
        }
      })
      if(response.data.success){
        toast.success(response.data.message);
        getAppointmentByDoctor();
      }
    } 
    catch (error) {
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(backendurl + '/api/doctor/cancel-appointment',{appointmentId},{
        headers:{
          doctortoken: doctorToken,
        }
      })
      if(response.data.success){
        toast.success(response.data.message);
        getAppointmentByDoctor();
      }
    } 
    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (doctorToken) {
      getAppointmentByDoctor();
    }
  }, [doctorToken]);
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <SideBar />
        <div className="w-4/5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Appointments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage your upcoming patient appointments
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    #
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Patient
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Age
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date & Time
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Fees
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {doctorAppointments.map((appointment, idx) => (
                  <tr
                    key={idx}
                    className="border border-slate-200 transition-colors hover:bg-slate-50"
                  >
                    {/* # */}
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                      {idx + 1}
                    </td>

                    {/* Patient */}
                    <td className="md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className=''>
                          <img className='h-10 w-10 rounded-full bg-cover' src={appointment.userData.image} alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {appointment.userData.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            Patient
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      <div>
                        {
                          appointment.payment ? <span className='bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-medium'>
                            Done
                          </span>
                            : <span className='bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-xs font-medium'>
                              Pending
                            </span>
                        }
                      </div>
                    </td>

                    {/* Age */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatAge(appointment.userData.dob)}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className='flex flex-col'>
                        <p className="text-sm font-medium text-slate-700">
                          {formatDate(appointment.slotDate)}
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {appointment.slotTime}
                        </p>
                      </div>
                    </td>

                    {/* Fees */}
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      ₹{appointment.fees}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      {
                        appointment.cancelled ?
                          (
                            <button className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                              Cancelled
                            </button>
                          )
                          :
                          appointment.isCompleted ?
                            (
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                Completed
                              </span>
                            )
                            :
                            (
                              <div className='flex flex-col w-18'>
                                <button onClick={() => {cancelAppointment(appointment._id)}}
                                className="rounded-lg cursor-pointer  px-4 py-2 text-sm font-medium hover:scale-110">
                                  <img src={assets.cancel_icon} alt="" />
                                </button>

                                <button onClick={() => {completeAppointment(appointment._id)}}
                                className="rounded-lg cursor-pointer  px-4 py-2 text-sm font-medium transition hover:scale-110">
                                  <img src={assets.tick_icon} alt="" />
                                </button>
                              </div>
                            )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Appointments;

