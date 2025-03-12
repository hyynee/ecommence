import React from 'react'
import Navbar from "../Common/Navbar"
import Topbar from "../Layout/Topbar"
const Header = () => {
    return (
        <header className='border-b border-gray-400'>
            <Topbar />
            <Navbar />
        </header>
    )
}

export default Header