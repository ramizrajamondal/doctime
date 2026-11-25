import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from "axios"
import { AdminContex } from '../contex/adminContex'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expericence, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [aboutme, setAboutMe] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const { adminToken, backendurl } = useContext(AdminContex);

  const addDoctorFromHandler = async (e) => {
    try {
      e.preventDefault();
      if (!docImg) {
        toast.error("please upload doctor picture");
        return;
      }
      if (!name || !email || !password || !expericence || !fees || !address ||
        !speciality || !degree || !aboutme) {
        toast.error('please fill all the fields');
        return;
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('degree', degree);
      formData.append('speciality', speciality);
      formData.append('experience', expericence);
      formData.append('fees', Number(fees));
      formData.append('about', aboutme);
      formData.append('address', address);
      setIsLoading(true);
      const response = await axios.post(backendurl + '/api/admin/add-doctor', formData, {
        headers: {
          admintoken: adminToken
        },
      })
      if (response.data.success) {
        toast.success(response.data.message);
      }
      setDocImg('');
      setEmail('');
      setPassword('');
      setDegree('');
      setAboutMe('');
      setFees('');
      setExperience('');
      setAddress('');
      setSpeciality('');
      setName('');
      setIsShow(false);
    }
    catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    finally {
      setIsLoading(false);
    }
  }
  return (
    <div className=''>
      <Navbar />
      <div className='flex'>
        <SideBar />
        <div className="p-2">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-screen overflow-y-scroll scroll-smooth">
            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-700 mb-8">
              Add Doctor
            </h2>

            {/* Upload Section */}
            <form onSubmit={addDoctorFromHandler} className='h-8/12 overflow-y-scroll scroll-smooth'>
              <div className="flex items-center gap-4 mb-10">
                <label htmlFor="doc-img">
                  <img src={docImg ? URL.createObjectURL(docImg) : assets.doctor_icon} alt="" className='w-20 h-20 rounded-full cursor-pointer bg-gray-100 flex items-center justify-center text-3xl text-gray-400' />
                  Upload doctor <br /> picture
                </label>
                <input onChange={(e) => { setDocImg(e.target.files[0]) }}
                  type="file" id='doc-img' hidden />
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-20">

                {/* Left Side */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Doctor name
                    </label>
                    <input
                      onChange={(e) => { setName(e.target.value) }}
                      value={name}
                      type="text"
                      placeholder="Name"

                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Doctor Email
                    </label>
                    <input
                      onChange={(e) => { setEmail(e.target.value) }}
                      value={email}
                      type="email"

                      placeholder="Your email"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Doctor Password
                    </label>
                    <div className='relative'>
                      <input
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                        type={isShow ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                      />
                      {
                        isShow ? <FaEye onClick={() => { setIsShow(!isShow) }} className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer' />
                          : <FaEyeSlash onClick={() => { setIsShow(!isShow) }} className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer' />
                      }
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Experience
                    </label>
                    <select onChange={(e) => setExperience(e.target.value)}
                      value={expericence}

                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-500">
                      <option>1 Year</option>
                      <option>2 Years</option>
                      <option>3 Years</option>
                      <option>4 Year</option>
                      <option>5 Years</option>
                      <option>6 Years</option>
                      <option>7 Years</option>
                      <option>8 Year</option>
                      <option>9 Years</option>
                      <option>10+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Fees
                    </label>
                    <input

                      onChange={(e) => { setFees(e.target.value) }}
                      value={fees}
                      type="text"
                      placeholder="Your fees"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                    />
                  </div>
                </div>

                {/* Right Side */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Speciality
                    </label>
                    <select
                      onChange={(e) => { setSpeciality(e.target.value) }}
                      value={speciality}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none text-gray-500">
                      <option>General physician</option>
                      <option>Gynecologist</option>
                      <option>Dermatologist</option>
                      <option>Pediatricians</option>
                      <option>Neurologist</option>
                      <option>Gastroenterologis</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Degree
                    </label>
                    <input

                      autoCapitalize='characters'
                      onChange={(e) => { setDegree(e.target.value) }}
                      value={degree}
                      type="text"
                      placeholder="Degree"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Address
                    </label>
                    <input

                      onChange={(e) => { setAddress(e.target.value) }}
                      value={address}
                      type="text"
                      placeholder="Address 1"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none mb-4"
                    />
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="mt-8">
                <label className="block text-sm text-gray-700 mb-2">
                  About me
                </label>

                <textarea
                  onChange={(e) => { setAboutMe(e.target.value) }}
                  value={aboutme}
                  rows="5"
                  placeholder="write about doctor"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type='onSubmit'
                className="mt-8 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full text-sm font-medium transition flex gap-2 items-center">
                <div className={`w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin ${isloading ? 'block' : 'hidden'}`}></div>
                {isloading ? 'Loading' : 'Add Doctor'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDoctor

