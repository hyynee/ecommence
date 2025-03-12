import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
const Topbar = () => {
    return (
        <div className='bg-[#ea2e0e] text-white'>
            <div className="container mx-auto flex items-center justify-between py-3 px-4">
                <div className='hidden md:flex items-center space-x-4'>
                    <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta className='size-5' />
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <IoLogoInstagram className='size-5' />
                    </a>
                    <a href="#" className='hover:text-gray-300'>
                        <RiTwitterXLine className='size-5' />
                    </a>
                </div>
                <div className='test-sm text-center flex-grow'>
                    <span>We ship worldwide - Fast and reliable shipping!</span>
                </div>
                <div className='test-sm hidden md:block'>
                    <a className='hover:text-gray-300' href='tel:0346674072'>
                        0346674072
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Topbar