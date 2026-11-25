import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='mt-10'>
            <footer className=" text-gray-600 px-6 md:px-16 py-10">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Left - Logo & Description */}
                    <div>
                        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                            <span className="bg-blue-500 w-6 h-6 rounded-full inline-block"></span>
                            DcoTime
                        </h1>
                        <p className="mt-4 text-sm leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s.
                        </p>
                    </div>

                    {/* Middle - Company Links */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">COMPANY</h2>
                        <ul className="space-y-2 text-sm">
                            <NavLink to="/">
                                <li className="hover:text-blue-500 cursor-pointer">Home</li>
                            </NavLink>
                            <NavLink to="/about">
                                <li className="hover:text-blue-500 cursor-pointer">About us</li>
                            </NavLink>
                            <NavLink to="/contact">
                                <li className="hover:text-blue-500 cursor-pointer">Contact us</li>
                            </NavLink>
                            <NavLink to="#">
                                <li className="hover:text-blue-500 cursor-pointer">Privacy policy</li>
                            </NavLink>
                        </ul>
                    </div>

                    {/* Right - Contact */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">GET IN TOUCH</h2>
                        <p>+91 9735638690</p>
                        <p className="text-sm mt-2">ramizm036@gmail.com</p>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
                    Copyright © 2024 GreatStack - All Right Reserved.
                </div>

            </footer>
        </div>
    )
}

export default Footer
