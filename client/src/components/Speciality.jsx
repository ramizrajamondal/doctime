import React from 'react'
import { specialityData } from '../assets/assets'
import {NavLink} from "react-router-dom"

const Speciality = () => {
  return (
    <div id='speciality' className='w-full py-14 flex flex-col items-center'>
      <h1 className='text-[#1F2937] text-2xl md:text-3xl font-medium'>Find by Speciality </h1>
      <p className='text-[#4B5563] text-xs font-semibold mt-3 text-center'>Simply browse through our extensive list of trusted doctors, schedule <br /> your appointment hassle-free.</p>
      <div className='flex justify-center w-full pt-10 gap-4 overflow-scroll'>
        {specialityData.map((item, idx) => (
            <NavLink onClick={() => scrollTo(0,0)} key={idx} to={`/doctors/${item.speciality}`}>
                <div className='hover:-translate-y-2 duration-200'>
                <img className='w-20 md:w-24' src={item.image} alt="" />
                <p className='text-center text-sm'>{item.speciality}</p>
                </div>
            </NavLink>
        ))}
      </div>
    </div>
  )
}
export default Speciality
