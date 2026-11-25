import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContex';
import { UserContex } from '../context/UserContex';
import { useEffect } from 'react';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const { backendurl } = useContext(AppContext);
  const {userToken, setUserToken } = useContext(UserContex);
  useEffect(() => {
    if(userToken){
    navigate('/');
    }
  },[userToken])
  const formHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = { email, password };
      const response = await axios.post(`${backendurl}/api/users/login`, formData);
      if (response.data.success) {
        setUserToken(response.data.token);
        localStorage.setItem('userToken', response.data.token);
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }
      setEmail('');
      setPassword('');
    }
    catch (error) {
      toast.error(error.message || response?.data?.error.message);
    }
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='login flex flex-col border h-2/3 border-gray-200 p-10 mt-10 rounded-md shadow-xl w-full sm:w-3/5 lg:w-1/3'>
        <div>
          <h2 className='text-md md:text-xl text-[#4B5563] font-bold'>Login</h2>
          <p className='text-sm md:text-md text-[#6b7685] mt-2 font-semibold'>
            Please login to book appointment
          </p>
        </div>

        <div className='form mt-5'>
          <form onSubmit={formHandler} className='flex flex-col gap-2'>

            <div className='text-[#4B5563] font-light'>
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-gray-400 rounded-sm outline-none w-full h-8'
                type="email"
                required
              />
            </div>

            <div className='text-[#4B5563] font-light relative'>
              <label>Password</label>
              <input
                minLength={6}
                maxLength={12}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-gray-400 rounded-sm outline-none w-full h-8 pr-8'
                type={isShowing ? "text" : "password"}
                required
              />

              <span
                onClick={() => setIsShowing(!isShowing)}
                className='absolute top-1/2 right-2 cursor-pointer'
              >
                {isShowing ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className='mt-2'>
              <button
                type='submit'
                className='p-3 bg-[#5F6FFF] text-center rounded-md text-sm md:text-md w-full text-white cursor-pointer'
              >
                Login
              </button>
            </div>
          </form>

          <div className='mt-5 flex gap-0.5'>
            <p className='text-[#5E5E5E] font-light text-sm'>
              Don't have an account?
            </p>
            <button
              onClick={() => navigate('/register')}
              className='cursor-pointer text-[#5F6FFF] text-sm'
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
