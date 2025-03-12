import React from 'react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className='border-t py-12'>
            <div className="container-fluid mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 lg:px-0">
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Newletter</h3>
                    <p className='text-gray-700 mb-4'>
                        Be the frist to hear the new products, excualsive deals, and more.
                    </p>
                    <p className='font-bold text-sm text-gray-900'>
                        Sign up and get 10% off in our store.
                    </p>
                    {/*form newletters */}
                    <form className='flex' action="">
                        <input
                            type="email"
                            placeholder='Enter your email'
                            className='p-3 w-full text-sm border-t border-l border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
                            required
                        />
                        <button className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800' type='submit'>Subscribe</button>
                    </form>
                </div>
                {/*shop links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>Men's Top Wear</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>WoMen's Top Wear</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>Men's Bottom Wear</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>WoMen's Bottom Wear</Link>
                        </li>
                    </ul>
                </div>
                {/*support links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <ul className='space-y-2 text-gray-600'>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>About Us</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>FAQs</Link>
                        </li>
                        <li>
                            <Link to='#' className='hover:text-gray-600 transition-colors'>Features</Link>
                        </li>
                    </ul>
                </div>
                {/*Follow us */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                    <div className='text-gray-600 flex items-center space-x-4'>
                        <Link to='#' className='hover:text-gray-600 transition-colors size-4'>
                            <FaFacebook />
                        </Link>
                        <Link to='#' className='hover:text-gray-600 transition-colors size-4'>
                            <FaInstagram />
                        </Link>
                        <Link to='#' className='hover:text-gray-600 transition-colors size-4'>
                            <RiTwitterXLine />
                        </Link>
                    </div>
                    <p className='text-sm text-gray-600 mt-2'>Call Us</p>
                    <p>
                        <FiPhoneCall className='inline-block mr-2'/>
                        0346674072
                    </p>
                </div>
            </div>
            {/* footer bottom*/}
            <div className="container-fuild mx-auto mt-12 lg:px-0 border-t border-gray-200 pt-6">
                <p className='text-gray-600 text-sm text-center'>
                     © 2025 Rights Reserved. Designed by <span className='text-blue-500'>HUY ANH</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer