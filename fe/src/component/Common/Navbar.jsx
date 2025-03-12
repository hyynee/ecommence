import React, { useState } from 'react';
import { BsGear } from "react-icons/bs";
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartDraw from '../Layout/CartDraw';
import Search from './Search';
const Navbar = () => {
    const [drawerOpen, setCartDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector(state => state.cart);
    const cartItemsCount = cart?.data?.products?.reduce((total, prod) => total + prod.quantity, 0) || 0;
    const { user } = useSelector(state => state.auth);
    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    const toggleCardDrawer = () => {
        setCartDrawerOpen(!drawerOpen);
    }
    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
                {/*Left*/}
                <div>
                    <Link to="/" className='text-2xl font-medium'>AnhHuy</Link>
                </div>
                {/*Center*/}
                <div className='hidden md:flex  space-x-6'>
                    <Link to="/collection/all?gender=Men" className='text-sm text-gray-700 hover:text-black font-medium uppercase'>Men</Link>
                    <Link to="/collection/all?gender=Women" className='text-sm text-gray-700 hover:text-black font-medium uppercase'>WoMen</Link>
                    <Link to="/collection/all?category=TopWear" className='text-sm text-gray-700 hover:text-black font-medium uppercase'>Top Wear</Link>
                    <Link to="/collection/all?category=BottomWear" className='text-sm text-gray-700 hover:text-black font-medium uppercase'>Bottom Wear</Link>
                </div>
                {/*Right*/}
                <div className='flex items-center space-x-4'>
                    {user?.role === 'admin' && (
                        <Link to='/admin' className='hover:text-black'>
                            <BsGear className='size-6 text-gray-700' />
                        </Link>
                    )}
                    <Link to='/profile' className='hover:text-black'>
                        <HiOutlineUser className='size-6 text-gray-700' />
                    </Link>
                    <button className='relative hover:text-black' onClick={toggleCardDrawer}>
                        <HiOutlineShoppingBag className='size-6 text-gray-700' />
                        {cartItemsCount > 0 && (<span className='absolute -top-1 bg-orange-400 text-white text-xs rounded-full px-2 py-0.5'>
                            {cartItemsCount}
                        </span>)}
                    </button>
                    {/* Search */}
                    <div className="overflow-hidden">
                        <Search />
                    </div>

                    <button onClick={toggleNavDrawer} className=' md:hidden hover:text-black'>
                        <HiBars3BottomRight className='size-6 text-gray-700' />
                    </button>
                </div>
            </nav>
            <CartDraw drawerOpen={drawerOpen} tonggleCardDrawer={toggleCardDrawer} />
            {/* Mobile Nav */}
            <div className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 md:w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300  ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer} >
                        <IoMdClose className='size-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to="/collection/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Men</Link>
                        <Link to="/collection/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>WoMen</Link>
                        <Link to="/collection/all?category=TopWear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Top</Link>
                        <Link to="/collection/all?category=BottomWear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Bottom</Link>
                    </nav>
                </div>
            </div>

        </>
    );
}

export default Navbar