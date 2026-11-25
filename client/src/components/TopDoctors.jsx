import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContex';
const TopDoctors = () => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className='px-10 lg:px-24 flex flex-col items-center'>
            <h2 className='text-[#1F2937] text-xl lg:text-2xl font-medium text-center'>Top Doctors to Book</h2>
            <p className='mt-0.5 text-[#4B5563] text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5'>
                {doctors.slice(0, 10).map((item, idx) => (
                    <div onClick={() => { item.available ? navigate(`/book-appointment/${item._id}`) : toast.warn('doctor is unavailable'), scrollTo(0, 0) }} key={idx} className='border mt-5 border-[#c1d1fe] rounded-md flex flex-col gap:0.5 md:gap-1.5 cursor-pointer hover:-translate-y-2 duration-300'>
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
            <button onClick={() => { navigate('/doctors'), scrollTo(0, 0) }} className='mt-10 px-12 cursor-pointer py-3 rounded-full text-gray-600 bg-[#EAEFFF]'>more</button>
        </div>
    )
}

export default TopDoctors
