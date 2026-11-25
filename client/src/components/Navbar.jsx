import React, { useContext } from 'react'
import {assets} from "../assets/assets"
import {NavLink, useNavigate} from "react-router-dom"
import { useState } from 'react'
import { UserContex } from '../context/UserContex'

const Navbar = () => {
  const navigate = useNavigate();
  const[menu, setMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const{userProfile,userToken, setUserToken} = useContext(UserContex);

  const menuOpenOrnot = (e) => {
    const text = e.target.outerText;
    if(text == "My Appointments"){
      navigate("/my-appointments");
    }
    else if(text == "My Profile"){
      navigate("/my-profile");
    }
    else if(text == "Logout"){
      if(userToken){
        setUserToken('');
        localStorage.removeItem('userToken');
        navigate('/register');
      }
    }
    setMenu(false);
  }
  return (
    <div id="nav" className='w-full flex items-center justify-between text-sm border-b border-b-gray-400'>
      <div>
        <img onClick={() => navigate('/')} className={`cursor-pointer ${mobileMenuOpen ? 'w-0' : 'w-20'}`} src={assets.doctimelogo} alt="Doctime" />  
      </div>

      <div>
        <ul className='hidden md:flex items-start font-medium gap-4 text-[#29374c]'>
          <NavLink to='/'>
          <li>
            HOME
            <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-3/5 m-auto hidden' />
          </li>
          </NavLink>
          <NavLink to='/doctors'>
          <li>
            All DOCTORS
            <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-3/5 m-auto hidden' />
          </li>
          </NavLink>
          <NavLink to='/about'>
          <li>
            ABOUT
            <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-3/5 m-auto hidden' />
          </li>
          </NavLink>
          <NavLink to='/contact'>
          <li>
            CONTACT
            <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-3/5 m-auto hidden' />
          </li>
          </NavLink>
         </ul>
      </div>

       <div className={`${mobileMenuOpen ? "hidden" : "block"}`}> 
        {
          userToken ?
          <div className='flex items-center gap-2 group relative'>
           <img className='rounded-full w-14' src={userProfile.image} alt="profile" />
           <button onClick={() => {setMenu(!menu)}}
           className='cursor-pointer'>
            <img className='w-3' src={assets.dropdown_icon} alt="" />
           </button>
           {
           menu ? 
           <div className='absolute top-0 right-0 mt-22 font-medium text-base text-gray-600 z-20 transform-fill'> 
            <div className='bg-slate-200 p-5 flex flex-col gap-2 rounded-sm min-w-48 mt-1'> 
              <p onClick={menuOpenOrnot} className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={menuOpenOrnot} className='cursor-pointer hover:text-black'>My Appointments</p>
              <p onClick={menuOpenOrnot} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
           </div>
            : null
            }
          </div> 
          : <button onClick={() => {navigate('/register')}}
        className='py-2.5 px-3.5 cursor-pointer bg-[#5F6FFF] text-[#FFFFFF] rounded-full hidden md:block'>Create account</button>
        }
       </div>
       
       <div className={`md:hidden ${mobileMenuOpen ? 'w-full' : ''}`}>
        <img className={`${mobileMenuOpen ? 'w-0' : 'w-8 cursor-pointer'}`}
        src={assets.menu_icon} alt="" 
        onClick={() => {setMobileMenuOpen(true)}}
        />
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} p-4 md:hidden`}>
          <img 
          className={`${mobileMenuOpen ? 'w-6' : 'w-0'} cursor-pointer right-0`}
          onClick={() => {setMobileMenuOpen(false)}}
          src={assets.cross_icon} alt="" />
        <ul className='text-[#29374c] flex items-center justify-center flex-col gap-1 mb-2'>
          <NavLink to='/' onClick={() => {setMobileMenuOpen(false)}}>
          <li>
            HOME
           <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-full m-auto hidden' />
          </li>
          </NavLink>
          <NavLink to='/doctors' onClick={() => {setMobileMenuOpen(false)}}>
          <li>
            All DOCTORS
           <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-full m-auto hidden' />
          </li>
          </NavLink>
          <NavLink to='/about' onClick={() => {setMobileMenuOpen(false)}}>
          <li>
            ABOUT
           <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-full m-auto hidden' />
          </li>
          </NavLink>
          <NavLink to='/contact' onClick={() => {setMobileMenuOpen(false)}}>
          <li>
            CONTACT
           <hr className='mt-1 bg-[#5F6FFF] border-none outline-none h-0.5 w-full m-auto hidden' />
          </li>
          </NavLink>
         </ul>
         </div>
       </div>
    </div>
    
  )
}


export default Navbar
