import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import SideBar from './DoctorSidebar'
import { toast } from 'react-toastify'
import axios from 'axios'
import { DoctorContex } from "../../contex/doctorContex"

const DoctorDashBoard = () => {
  const { backendurl, doctorToken } = useContext(DoctorContex);
  const [doctorDashData, setdoctorDashData] = useState([]);

  const getDoctorDashData = async () => {
    try {
      const response = await axios.get(backendurl + '/api/doctor/dashboard', {
        headers: {
          doctortoken: doctorToken
        }
      });
      if (response.data.success) {
        setdoctorDashData(response.data.doctorDashData);
      }
      else {
        toast.error(response?.data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if(doctorToken){
      getDoctorDashData();
    }
  }, [doctorToken])

  return (
    <div>
      <Navbar />
      <div className='flex gap-2'>
        <SideBar />
        <div className='body'>
          <div className="space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Completed Appointments */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Completed Appointments
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                      {doctorDashData.completeAppoinments}
                    </h2>

                    <p className="mt-1 text-xs text-emerald-600">
                      Successfully completed
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    ✓
                  </div>
                </div>
              </div>


              {/* Total Earnings */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Total Earnings
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                      ₹{doctorDashData.totalEarning}
                    </h2>

                    <p className="mt-1 text-xs text-indigo-600">
                      From completed appointments
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    ₹
                  </div>
                </div>
              </div>


              {/* Latest Appointment */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Latest Appointment
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-800">
                      {doctorDashData.latestAppointment?.[0]?.userData?.name ||
                        "No appointment"}
                    </h2>

                    <div className='flex flex-col'>
                      <p className="mt-1 text-xs text-slate-500">
                        {doctorDashData.latestAppointment?.[0]?.slotDate || ""}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {doctorDashData.latestAppointment?.[0]?.slotTime || ""}
                      </p>
                    </div>
                  </div>

                  <img
                    src={
                      doctorDashData.latestAppointment?.[0]?.userData?.image ||
                      "/default-avatar.png"
                    }
                    alt="Patient"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
              </div>

            </div>


            {/* Latest Completed Appointments */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Appointments
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Recently patient appointments
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  {doctorDashData.completeAppoinments} Completed
                </span>
              </div>


              {/* Appointments */}
              <div className="divide-y divide-slate-100">

                {doctorDashData.latestAppointment?.length > 0 ? (
                  doctorDashData.latestAppointment.map((appointment) => (

                    <div
                      key={appointment._id}
                      className="flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                    >

                      {/* Patient */}
                      <div className="flex items-center gap-4">

                        <img
                          src={
                            appointment.userData?.image ||
                            "/default-avatar.png"
                          }
                          alt={appointment.userData?.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100"
                        />

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {appointment.userData?.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {appointment.userData?.email}
                          </p>
                        </div>

                      </div>


                      {/* Date & Time */}
                      <div className="flex items-center gap-8">

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Date
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {appointment.slotDate}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Time
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {appointment.slotTime}
                          </p>
                        </div>

                      </div>


                      {/* Fees */}
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Fees
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          ₹{appointment.fees}
                        </p>
                      </div>


                      {/* Status */}
                      <div>
                        {appointment.cancelled ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Cancelled
                          </span>
                        ) : appointment.isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            Pending
                          </span>
                        )}
                      </div>

                    </div>

                  ))
                ) : (

                  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                      📅
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-800">
                      No appointments
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Your appointments will appear here.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashBoard
