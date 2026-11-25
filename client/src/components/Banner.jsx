import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { UserContex } from '../context/UserContex';

const Banner = () => {
  const navigate = useNavigate();
  const { userToken } = useContext(UserContex);
  return (
    <div className='mt-10 bg-[#5F6FFF] rounded-md px-6 py-4 xl:ml-15 xl:mr-15 lg:px-14 lg:py-10 flex justify-around'>
      <div className='text mt-10'>
        <h3 className='text-[#FFFFFF] font-medium text-sm md:text-xl lg:text-3xl'>
          Book Appointment <br />
          <p className='text-[#FFFFFF] font-medium text-sm md:text-xl lg:text-3xl mt-2 md:mt-4'>With 100+ Trusted Doctors</p>
        </h3>
        {
          userToken ? (
            <div onClick={() => { navigate('/doctors'), scrollTo(0,0) }} className='flex flex w-full md:w-2/4 text-[#4B5563] gap-2 px-6 md:px-8 py-2 bg-[#FFFFFF] mt-6 lg:mt-10 rounded-full font-normal cursor-pointer text-sm md:text-md hover:scale-105 trastion-all durataion-300'>
              <button className='cursor-pointer'>Book Appointment</button>
              <img className='w-3' src={assets.arrow_icon} alt="" />
            </div>
          )
            : (
              <div onClick={() => { navigate('/register') }} className='flex w-full md:w-2/4 text-[#4B5563] gap-2 px-6 py-3 bg-[#FFFFFF] mt-6 lg:mt-10 rounded-full font-normal cursor-pointer text-sm md:text-md hover:scale-105 trastion-all durataion-300'>
                <button className='cursor-pointer'>Create account</button>
                <img className='w-3' src={assets.arrow_icon} alt="" />
              </div>
            )
        }
      </div>
      <div className='pic hidden md:block md:w-52 lg:w-72 relative'>
        <img className='absolute -bottom-4 lg:-bottom-10' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
