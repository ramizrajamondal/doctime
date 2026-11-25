import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from "react-router-dom"
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
const SideBar = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    return (
        <>
        {!isMobileDevice  && <IoIosMenu onClick={() => {setIsMobileDevice(true)}}
        className='size-8 m-3 cursor-pointer sm:hidden'/>
        }
        <div className={`bg-white border-r border-gray-300 min-h-screen flex flex-col
          transition-all duration-300 ${isMobileDevice ? 'fixed w-full z-50' : 'hidden'} sm:flex sm:static sm:w-1/4 md:w-2/6 xl:w-1/6`}>
            <div className='flex justify-end sm:hidden'>
                <IoClose onClick={() => {setIsMobileDevice(false)}} className='size-8 cursor-pointer' />
            </div>
            <div className={`text-[#515151] font-light py-3 sm:py-5 flex-col gap-4`}>
                <div className=''>
                    <NavLink to={'/'} className={({ isActive }) => `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : 'hover:bg-gray-100'}`}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={'/all-appoinments'} className={({ isActive }) => `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : 'hover:bg-gray-50'}`}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={'/add-doctor'} className={({ isActive }) => `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : 'hover:bg-gray-50'}`}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={'/doctor-list'} className={({ isActive }) => `flex items-center gap-3 px-6 py-3 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF]' : 'hover:bg-gray-50'}`}>
                        <img src={assets.people_icon} alt="" />
                        <p>Doctors List</p>
                    </NavLink>
                </div>
            </div>
        </div>
        </>
    );
}
export default SideBar
