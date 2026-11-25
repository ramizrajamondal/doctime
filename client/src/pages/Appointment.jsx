import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContex';
import { assets } from '../assets/assets';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { UserContex } from '../context/UserContex';
import axios from 'axios';

const Appointment = () => {
  const [docDetails, setDocDetails] = useState(null);
  const [relatedDoc, setRelatedDoc] = useState([]);
  const [appointmentSlot, setAppoinmentSlot] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const { docId } = useParams();
  const { doctors, currIcon } = useContext(AppContext);
  const { userToken, backendurl } = useContext(UserContex);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const setAppoinmentDoc = () => {
    const docDetails = doctors.find(doc => doc._id === docId);
    setDocDetails(docDetails);
  }
  const getBookingSlot = () => {
    setAppoinmentSlot([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(18, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        if (today.getHours() + 1 > 18) {
          continue;
        }
        else if (today.getHours() < 11) {
          currentDate.setHours(11, 0, 0);
        }
        else {
          if (currentDate.getMinutes() > 0) {
            currentDate.setHours(currentDate.getHours() + 1, 0, 0);
          }
          else {
            currentDate.setHours(today.getHours(), 0, 0, 0);
          }
        }
      }
      else {
        currentDate.setHours(11, 0, 0);
      }

      const slots = [];

      while (currentDate.getHours() < endTime.getHours()) {
        const formatedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const toSlotTime = new Date(currentDate);
        toSlotTime.setHours(toSlotTime.getHours() + 1);
        const endSlotTime = toSlotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        slots.push({
          date: new Date(currentDate),
          time: formatedTime,
          endSlot: endSlotTime
        });
        currentDate.setMinutes(currentDate.getMinutes() + 90);
      }
      setAppoinmentSlot(prev => ([...prev, slots]));
    }
  }
  const getRelatedDoctor = () => {
    const type = docDetails?.speciality;
    const id = docDetails?._id;
    const relatedDoctors = doctors.filter(doc => doc.speciality === type && doc._id != id);
    setRelatedDoc(relatedDoctors);
  }
  const bookAppointment = async () => {
    if (!userToken) {
      toast.warn('please login to book appointment');
      return navigate('/login');
    }
    const slotDate = selectedSlot.date.toLocaleDateString('en-GB');
    const slotTime = selectedSlot.time;
    try {
      const response = await axios.post(backendurl + '/api/users/book-appointment', { slotDate, slotTime, doctorId: docId }, {
        headers: {
          usertoken: userToken
        }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/my-appointments');
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
  useEffect(() => {
    setAppoinmentDoc();
  }, [doctors, docId]);

  useEffect(() => {
    getBookingSlot();
  }, [docDetails]);
  useEffect(() => {
    getRelatedDoctor();
  }, [docDetails, doctors])
  return (
    <div>
      <Navbar />
      <div className='mt-5'>
        <div className='top-sec flex flex-col lg:flex-row gap-5'>

          <div className='left-box w-full lg:w-1/5 bg-[#5F6FFF] flex justify-center items-center rounded-xl'>
            <img className='h-full object-cover rounded-xl' src={docDetails?.image} alt="" />
          </div>

          <div className='right-box w-full lg:w-4/5 border border-gray-400 rounded-md p-3 lg:p-5 h-full mb-4'>

            <div className='flex gap-2'>
              <h2 className='text-sm md:text-xl'>{docDetails?.name}</h2>
              <img src={assets.verified_icon} alt="" />
            </div>

            <div className='flex gap-2 mt-2 items-center'>
              <p className='text-[#4B5563] text-sm'>{docDetails?.degree} - </p>
              <p className='text-[#4B5563] text-sm'>{docDetails?.speciality}</p>
              <div className='rounded-full text-sm text-[#4B5563] flex justify-center px-3 py-1 border border-gray-400'>
                {docDetails?.experience}
              </div>
            </div>

            <div className='mt-2 flex flex-col text-[#1F2937]'>
              <div className='flex gap-1'>
                <h2 className='text-sm md:text-xl'>About</h2>
                <img src={assets.info_icon} alt="" />
              </div>
              <div className='mt-2 xl:w-5/6'>
                <p className='text-[#4B5563] text-sm'>
                  {docDetails?.about}
                </p>
              </div>
            </div>

            <div className='mt-4 flex gap-2'>
              <h2 className='text-[#4B5563] text-md lg:text-xl'>Appointment fee:</h2>
              <p className='text-md md:text-xl font-medium'><span>{currIcon}</span>{docDetails?.fees}</p>
            </div>
          </div>
        </div>

        <div className='lg:ml-54 sm:pl-4 mt-4 font-medium'>
          <p className='font-normal text-sm md:text-xl text-gray-600'>
            Booking Slot
          </p>

          <div className='p-8'>

            <div className='show-date flex gap-5 overflow-x-auto'>
              {appointmentSlot.map((eachDay, index) => {
                const date = eachDay[0]?.date;
                return (
                  <button key={index} onClick={() => { setSelectedDay(index), setSelectedSlot('') }}
                    className={`p-3 border border-gray-500 rounded-xl text-[#4B5563] 
                  cursor-pointer ${selectedDay === index ? "text-white bg-[#5F6FFF]" : ""}`}>
                    <p>
                      {days[date?.getDay()]}
                    </p>
                    {date?.getDate()}
                  </button>
                )
              })}
            </div>

            <div className='show-slot mt-5 flex gap-4 overflow-x-auto'>
              {appointmentSlot[selectedDay]?.map((slot, index) => {
                return (
                  <button key={index} onClick={() => { selectedSlot == slot ? setSelectedSlot('') : setSelectedSlot(slot) }} className={`px-4 py-3 border border-gray-300 
                rounded-xl text-[#4B5563] cursor-pointer ${selectedSlot === slot ? "text-white bg-[#5F6FFF]" : ""}`}>
                    <div className='flex flex-col items-center'>
                      <p className='text-sm md:text-xl'>
                        {slot?.time}
                      </p>
                      <p className={`text-sm mt-2 md:text-md text-gray-400`}>
                        {slot?.endSlot}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {selectedSlot ? (
              <div className='mt-5 p-5 bg-[#EDEFF6] overflow-auto rounded-2xl md:w-4/5 xl:w-2/3'>
                <h3 className='text-xl md:text-2xl font-normal text-[#4B5563]'>
                  Your slot has been selected!
                </h3>

                <div className='parent bg-white p-3 mt-3 rounded-xl flex flex-col gap-5 md:flex-row md:justify-between'>

                  <div className='date flex gap-2 md:gap-5'>
                    <div className='icon w-10 h-10 md:w-15 md:h-15 rounded-full bg-[#EDEFF6] flex items-center justify-center'>
                      <FaRegCalendarCheck className='text-[#5F6FFF] w-5 h-5 md:w-8 md:h-8 bg-cover' />
                    </div>
                    <div className='text'>
                      <p className='text-gray-500 text-sm md:text-xl'>Date</p>
                      <p className='text-sm md:text-xl'>{selectedSlot?.date.toLocaleDateString('en-in', { day: "2-digit", month: "short", year: "2-digit" })}</p>
                    </div>
                  </div>
                  <hr className='hidden md:block h-full w-10 rotate-90 mt-8 text-gray-400' />
                  <div className='time flex gap-2 md:gap-5'>
                    <div className='icon w-10 h-10 md:w-15 md:h-15 rounded-full bg-[#EDEFF6] flex items-center justify-center'>
                      <IoMdTime className='text-[#5F6FFF] w-5 h-5 md:w-8 md:h-8 bg-cover ' />
                    </div>
                    <div className='text'>
                      <p className='text-gray-500 text-sm md:text-xl'>Time</p>
                      <div className='flex gap-3'>
                        <p className='text-sm md:text-xl'>{selectedSlot?.time}</p>
                        <p className='text-sm md:text-xl'>{selectedSlot?.endSlot}</p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='mt-3 flex gap-3'>
                  <div className='w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-green-500'>
                    <FaArrowRight className='w-3 h-3 md:w-5 md:h-5 text-white' />
                  </div>
                  <p className='text-sm md:text-xl font-medium text-[#4B5563]'>please review and confirm your appointment</p>
                </div>
              </div>
            ) : (
              <div className='mt-5 bg-[#EDEFF6] p-5 overflow-auto rounded-2xl'>
                <h3 className='text-xl md:text-2xl font-normal text-[#4B5563]'>
                  Please select a slot
                </h3>
              </div>
            )}
            <button onClick={bookAppointment} className='text-[#FFFFFF] bg-[#5F6FFF] px-6 md:px-10 py-3 mt-5 rounded-2xl 
          shadow-xl cursor-pointer font-extralight text-sm md:text-md'>
              Book an appointment
            </button>
          </div>

          <div className="related-doc grid grid-cols-2 xl:grid-cols-3 gap-5">
            {relatedDoc.map((item, idx) => (
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
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Appointment