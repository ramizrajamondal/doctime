import React from 'react'
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
    <Navbar />
      <div className="px-6 md:px-16 py-16 bg-white">
      
      {/* HEADING */}
      <h2 className="text-center text-gray-500 tracking-widest text-sm mb-10">
        ABOUT US
      </h2>

      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/3">
          <img
            src={assets.about_image}
            alt=""
            className="w-full object-cover"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="w-full md:w-2/3 text-gray-600 text-sm leading-6 space-y-4">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs
            conveniently and efficiently. At Prescripto, we understand the challenges
            individuals face when it comes to scheduling doctor appointments and managing
            their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously
            strive to enhance our platform, integrating the latest advancements to improve
            user experience and deliver superior service. Whether you're booking your first
            appointment or managing ongoing care, Prescripto is here to support you every
            step of the way.
          </p>

          {/* OUR VISION */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Our Vision</h3>
            <p>
              Our vision at Prescripto is to create a seamless healthcare experience for
              every user. We aim to bridge the gap between patients and healthcare providers,
              making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="text-sm text-gray-500 tracking-widest mb-6">
          WHY CHOOSE US
        </h3>

        <div className="grid md:grid-cols-3 border border-gray-200">
          
          {/* CARD 1 */}
          <div className="p-12 text-gray-600 hover:bg-blue-600 hover:text-white hover:scale-105 border-b md:border-b-0 md:border-r border-gray-200">
            <h4 className="font-semibold text-sm mb-2">
              EFFICIENCY:
            </h4>
            <p className="text-sm">
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-12 text-gray-600 hover:bg-blue-600 hover:text-white hover: scale-105 border-b md:border-b-0 md:border-r border-gray-200">
            <h4 className="font-semibold text-sm mb-2">
              CONVENIENCE:
            </h4>
            <p className="text-sm">
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-12 text-gray-700 hover:bg-blue-600 hover:text-white hover:scale-105">
            <h4 className="font-semibold text-sm mb-2">
              PERSONALIZATION:
            </h4>
            <p className="text-sm">
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>

        </div>
      </div>

    </div>
    <Footer />
    </div>
  )
}

export default About
