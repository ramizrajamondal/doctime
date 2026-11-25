import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContex } from '../contex/adminContex'
import {DoctorContex} from "../contex/doctorContex"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();
    const { adminToken,setAdminToken,backendurl} = useContext(AdminContex);
    const{doctorToken,setDoctorToken} = useContext(DoctorContex);
    const logoutHandler = async () => {
        try {
            if(adminToken && !doctorToken){
                setAdminToken('');
                localStorage.removeItem('adminToken');
                toast.success('Logout successfull');
                navigate('/');
                return;
            }
            if(doctorToken && !adminToken){
                setDoctorToken('');
                localStorage.removeItem('doctortoken');
                toast.success('Logout successfull');
                navigate('/');
                return;
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div>
            <div className='flex px-2 sm:px-8  w-full justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <img className='w-20 bg-cover' src={assets.doctimeLogo} alt="" />
                    <p className='border border-gray-600 rounded-full px-2 sm:px-5 py-1 text-[#4B5563] text-xs'>
                        {adminToken ? 'Admin' : 'Doctor'}
                    </p>
                </div>
                <div>
                    <button 
                    onClick={logoutHandler}
                    className='px-5 sm:px-8 cursor-pointer text-xs sm:text-md py-2 h-10 bg-[#5F6FFF] rounded-full text-white '>
                    Logout
                    </button>
                </div>
            </div>
            <hr className='h-1 text-gray-200'/>
        </div>
    )
}

export default Navbar
