import React, { useContext, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa";
import {assets} from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { DoctorContex } from '../contex/doctorContex';
import axios from 'axios';
import { toast } from 'react-toastify';
const DoctorLoginPage = () => {
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState(""); 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {backendurl,setDoctorToken} = useContext(DoctorContex);

    const fromHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendurl + '/api/doctor/login',{email,password});
            if(response.data.success){
              toast.success(response.data.message);
              localStorage.setItem('doctortoken', response.data.token);
              setDoctorToken(response.data.token);
              navigate('/');
            }
            else{
                toast.error(response.data.message);
            }
            setEmail("");
            setPassword("");
        } 
        catch (error) {
            toast.error(error.message || error.response?.data?.message);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
                {/* Left Side */}
                <div className="hidden md:flex flex-col pt-10 pl-6 justify-center from-indigo-600 to-purple-700 text-white overflow-hidden">
                    <div className="w-auto z-10 text-[#5F6FFF] bottom-0">
                        <img src={assets.adminPhoto} alt="" />
                    </div>
                </div>
                {/* right side */}
                <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-slate-800 mb-3">
                            Doctor <span className='text-[#5F6FFF]'>Login</span>
                        </h2>
                        <p className="text-slate-500">
                            Enter your credentials to access your account.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={fromHandler}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 pr-12 rounded-2xl border border-slate-300 outline-none"
                                />
                                {
                                    showPassword ?
                                        <FaEye
                                            onClick={() => { setShowPassword(!showPassword) }}
                                            className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer' />
                                        :
                                        <FaEyeSlash
                                        onClick={() => { setShowPassword(!showPassword) }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
                                        />
                                }
                            </div>
                        </div>
                        <button type="submit"
                            className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                    <div className='flex gap-1 mt-5'>
                        <p className='text-[#5E5E5E] text-xs sm:text-sm'>
                            Are you Admin?
                        </p>
                        <span onClick={() => {navigate('/')}}
                        className='text-[#5F6FFF] text-xs sm:text-sm cursor-pointer'>AdminLogin</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorLoginPage
