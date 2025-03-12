import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlices';
import { clearCart } from '../redux/slices/cartSlices';
import MyOrders from './MyOrders';
const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart())
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div className='min-h-screen flex flex-col'>
            <div className="flex-row container-fluid mx-auto md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {/* left */}
                    <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
                        <h1 className='text-2xl md:text-3xl font-bold mb-4'>{user?.name}</h1>
                        <p className='w-full text-gray-600 mb-4'>{user?.email}</p>
                        <button className='w-full bg-red-500 text-white py-2 px-4 rouded hover:bg-red-700' onClick={handleLogout}>Log out</button>
                    </div>
                    {/* right */}
                    <div className='w-full md:w-2/3 lg:w-3/4 shadow-md rounded-lg p-6'>
                        <MyOrders />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile