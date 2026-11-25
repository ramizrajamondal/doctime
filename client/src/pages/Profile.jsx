import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {UserContex} from "../context/UserContex"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  const [image, setImage] = useState();
  const[isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const {userProfile, setUserProfile, userToken, backendurl, getProfile} = useContext(UserContex);
  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userProfile.name);
      formData.append('phone', userProfile.phone);
      formData.append('address', userProfile.address);
      formData.append('dob', userProfile.dob);
      formData.append('gender',userProfile.gender);
      image && formData.append('image', image);
      const response = await axios.post(`${backendurl}/api/users/update-profile`, formData, {
        headers:{
          usertoken: userToken
        }
      });
      if(response.data.success){
        await getProfile();
        toast.success(response.data.message);
        setIsEdit(false);
        setImage(false);
      }
      else{
        toast.error(response.message);
      }
    } 
    catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }
  useEffect(() => {
    if(!userToken){
      toast.warn('please login to see your profile');
      navigate('/login');
    }
    else{
      getProfile();
    }
  },[])
  return userProfile && (
    <div>
    <Navbar />
    <div className='mt-8 font-normal'>
      <div className='img'>
       {isEdit ? 
          <label htmlFor="image">
            <img className='w-32 rounded-md cursor-pointer' src={image ? URL.createObjectURL(image) : userProfile.image} alt="" />
            <input className='cursor-pointer hidden' type="file" id='image' onChange={(e) => {setImage(e.target.files[0])}} />
          </label>
        : <img src={userProfile.image} className='w-32 rounded-md' />
       }
       <hr className='text-[#ADADAD] mt-2' />
      </div>
      <div className='contact-info mt-5'>
        <p className='text-md text-[#4B5563]'>CONTACT INFORMATION</p>
        <div className='email flex gap-5'>
          <p className='text-[#4B5563]'>Name:</p>
          {
            isEdit ? 
            <input type="text" value={userProfile.name} onChange={(e) => setUserProfile(prev => ({...prev, name:e.target.value}))} />
            : <p className='text-blue-600'>{userProfile.name}</p>
          }
        </div>
        <div className='phoneNo flex gap-5'>
          <p className='text-[#4B5563]'>Phone No:</p>
          {
            isEdit ? 
            <input type="text" value={userProfile.phone} onChange={(e) => setUserProfile(prev => ({...prev, phone: e.target.value}))} />
            : <p className='text-blue-600'>{userProfile.phone}</p>
          }
        </div>
        <div className='address flex gap-5'>
          <p className='text-[#4B5563]'>Address:</p>
          {
            isEdit ? 
            <input type="text" value={userProfile.address} onChange={(e) => setUserProfile(prev => ({...prev, address: e.target.value}))}/>
            : <p className='text-[#4B5563]'>{userProfile.address}</p>
          }
        </div>
      </div>
      <div className='basic-info mt-5'>
        <p className='text-md text-[#4B5563]'>BASIC INFORMATION</p>
         <div className='gender flex gap-5'>
          <p className='text-[#4B5563]'>Gender:</p>
          {
            isEdit ? 
            <input type="text" value={userProfile.gender} onChange={(e) => setUserProfile(prev => ({...prev, gender:e.target.value}))} />
            : <p className='text-gray-600'>{userProfile.gender}</p>
          }
         </div>
         <div className='dob flex gap-5'>
           <p className='text-[#4B5563]'>DOB:</p>
           {
            isEdit ? 
            <input type="date" value={userProfile.dob} onChange={(e) => setUserProfile(prev => ({...prev, dob:e.target.value}))} />
            : <p className='text-gray-600'>{userProfile.dob}</p>
           }
         </div>
      </div>

      <div className='btn flex gap-5 mt-5'>
        {
          isEdit ?
          <button onClick={updateProfile}
          className='px-7 py-2 text-sm text-[#4B5563] border border-gray-400 rounded-3xl cursor-pointer hover:bg-indigo-500 hover:text-white'>Save information</button>
          : 
          <button onClick={() => {setIsEdit(true)}}
          className='px-7 py-2 text-sm text-[#4B5563] border border-gray-400 rounded-3xl cursor-pointer hover:bg-indigo-500 hover:text-white'>Edit</button>
        }
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default Profile
