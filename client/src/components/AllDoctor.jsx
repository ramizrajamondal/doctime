import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContex'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AllDoctor = () => {
    const docSpeciality = [
        "General physician",
        "Gynecologist",
        "Dermatologist",
        "Pediatricians",
        "Neurologist",
        "Gastroenterologis"
    ]
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const {speciality} = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const[filter, setFilter] = useState(false);
    const applyFilter = () => {
        if(speciality){
          setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
        }
        else {
            setFilterDoc(doctors);
        }
    }
    useEffect(() => {
    applyFilter();
    },[doctors,speciality])
    return (
        <div className='flex max-md:flex-col'>
            <div>
                <button onClick={() => {setFilter(!filter)}}
                className={`px-4 py-2 mt-5 border border-gray-400 rounded-md text-gray-500 ${filter ? 'bg-blue-400 text-white font-extralight': ''} md:hidden`}>
                Filter
                </button>
                <div className={`mt-10 md:block ${filter ? 'block' : 'hidden'}`}>
                <p className='text-[#4B5563] text-sm hidden md:block'>Browse through the doctors specialist</p>
                {docSpeciality.map((item, idx) => (
                    <div onClick={() => {speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}} key={idx} className={`border hover:scale-105 duration-300 border-[#B4B4B4] mt-3 px-2 py-2 cursor-pointer rounded-md transition-all ${speciality === item ? 'bg-indigo-100 text-black' : "" }`}>
                        <p className='text-[#4B5563]'>{item}</p>
                    </div>
                ))}
                </div>
            </div>
            <div className='px-10 lg:px-24 flex flex-col items-center mt-5 md:mt-15'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5'>
                    {filterDoc.map((item, idx) => (
                        <div onClick={() => { item.available ? navigate(`/book-appointment/${item._id}`) : toast.warn('doctor is unavailable') }} key={idx} className={`border mt-5 border-[#c1d1fe] rounded-md flex flex-col gap:0.5 md:gap-1.5 cursor-pointer hover:-translate-y-2 duration-300`}>
                            <div className='doc-pic bg-[#EAEFFF] hover:bg-indigo-300 transition delay-150 duration-300 ease-in-out'>
                                <img className='w-45' src={item.image} alt="" />
                            </div>
                            <div className='doc-data flex flex-col gap-0.5 py-4 px-2'>
                                {
                                    item.available ?
                                    <p className='text-sm font-semibold text-green-500'>. Available</p>
                                    : <p className='text-sm font-semibold text-gray-500'>. Not Available</p>
                                }
                                <p className='text-[#1F2937] font-medium text-xl'>{item.name}</p>
                                <p className='text-xs text-[#4B5563] font-normal'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllDoctor

