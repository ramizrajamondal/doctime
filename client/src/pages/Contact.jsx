import React from 'react'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div>
      <Navbar />
    <div className='mt-5'>
      <h1 className='text-gray-600 text-md lg:text-2xl font-medium text-center'>
        CONTACT
        <span className='text-gray-800'>  US</span>
      </h1>

      <div className='flex flex-col md:flex-row gap-5'>
         <div className='left w-full md:w-1/3 rounded-2xl mt-4'>
           <img className='rounded-2xl' src={assets.contact_image} alt="" />
         </div>
         <div className='right mt-5 flex flex-col gap-5'>
            <div className='text-gray-800 font-semibold'>
              <h3>OUR OFFICE</h3>
            </div>
            <div className='text-gray-600 text-xm md:text-md font-medium'>
              <p>741123, Techno City</p>
              <p>Lake 21, Kolkata, WestBengal</p>
            </div>
            <div className='text-gray-600 text-xm md:text-md font-medium'>
              <p>Tel (+91)9735638690</p>
              <p>Email: ramizm036@gmail.com</p>
            </div>
         </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
