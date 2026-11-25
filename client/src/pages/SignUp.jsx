import React, { useContext } from 'react'
import { useState } from 'react';
import { FaEye, FaEyeDropper, FaEyeSlash } from 'react-icons/fa';
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {AppContext} from "../context/AppContex.jsx"
import { toast } from 'react-toastify';
import { UserContex } from '../context/userContex.jsx';
import { useEffect } from 'react';
const SignUp = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] =  useState("");
  const [fullName, setFullName] = useState("");
  const[isShowing, setIsShowing] = useState(false);
  const {backendurl} = useContext(AppContext);
  const {userToken,setUserToken} = useContext(UserContex);
  const navigate = useNavigate();
  useEffect(() => {
    if(userToken){
      navigate('/');
    }
  },[userToken])
  const fromHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = {fullName,email,password}
      const response = await axios.post(`${backendurl}/api/users/register`,formData);
      if(response.data.success){
        localStorage.setItem('userToken', response.data.token);
        setUserToken(response.data.token);
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
      setEmail("");
      setFullName("");
      setPassword("");
    } 
    catch (error) {
      toast.error(error.message || response?.data?.error.message);
    }
  }
  return (
    <div className='flex h-screen justify-center items-center'>
          <div className='login flex flex-col border h-2/3 border-gray-200  p-10 mt-10 rounded-md shadow-xl w-full sm:w-3/5 lg:w-1/3'>
            <div>
              <h2 className='text-md md:text-xl text-[#4B5563] font-bold'>Create Account</h2>
              <p className='text-sm md:text-md text-[#6b7685] mt-2 font-semibold'>Please sign up to book appointment</p>
            </div>
            <div className='form mt-5'>
              <form onSubmit={fromHandler} className='flex flex-col gap-2'>
                <div className='text-[#4B5563] font-light'>
                  <label htmlFor="">
                  Full Name
                  </label>
                  <input 
                  minLength={6}
                  maxLength={20}
                  value={fullName}
                  onChange={(e) => {setFullName(e.target.value)}}
                  className='border border-gray-400 rounded-sm outline-none w-full h-8' type="text" />
                </div>
                <div className='text-[#4B5563] font-light'>
                  <label htmlFor="">
                  Email
                  </label>
                  <input 
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  className='border border-gray-400 rounded-sm outline-none w-full h-8' type="email" />
                </div>
                <div className='text-[#4B5563] font-light relative'>
                  <label htmlFor="">
                  Password
                  </label>
                  <input 
                  minLength={6}
                  maxLength={12}
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
                  className='border border-gray-400 rounded-sm outline-none w-full h-8' type={isShowing ? "text" : "password"}/>
                  <span onClick={() => {setIsShowing(!isShowing)}}
                  className='absolute top-1/2 right-2'> 
                   {isShowing ? <FaEyeSlash />  : <FaEye/>}
                  </span>
                </div>
                <div className='mt-2'>
                  <button type='submit' className='p-3 bg-[#5F6FFF] text-center rounded-md text-sm md:text-md w-full text-white cursor-pointer'>
                   Submit
                  </button>
                </div>
              </form>
              <div className='mt-5 flex gap-0.5'>
                <p className='text-[#5E5E5E] font-light text-sm'>Already have an account?</p>
                <button onClick={() => {navigate('/login')}}
                className='cursor-pointer text-[#5F6FFF] text-sm'>Login here</button>
              </div>
            </div>
          </div>
    
        </div>
  )
}

export default SignUp
