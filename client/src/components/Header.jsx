import React from 'react'
import {assets} from "../assets/assets"
const Header = () => {
  return (
    <div id='home' className='bg-[#5F6FFF] flex flex-col md:flex-row md:px-10 lg:px-15 rounded-lg mt-5'>
      {/* left side */}
      <div className='md:w-1/2 flex flex-col py-5 px-5 md:py-10 lg:py-20 xl:py-25 gap-4'>
        <p className='text-2xl text-[#FFFFFF] lg:text-4xl font-semibold leading-tight'>
            Book Appointment <br/> With Trusted Doctors
        </p>
        <div className='flex flex-col lg:flex-row gap-3 text-white text-sm font-light'>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>
            Simply browse through our extensive list of trusted doctors, <br /> 
            schedule your appointment hassle-free.
            </p>
        </div>
        <a href="#speciality" className='flex items-center gap-2 px-3 md:px-5 w-1/2 md:w-2/3 xl:w-1/3
        rounded-full bg-[#FFFFFF] py-3 text-gray-600 text-xs font-medium hover:scale-105 transition-all duration-300'>
          Book appointment
          <img className='w-3' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right side */}
      <div className='md:w-1/2 md:relative overflow-y-hidden'>
        <img className='w-full md:absolute bottom-0 xl:top-2.5 rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
