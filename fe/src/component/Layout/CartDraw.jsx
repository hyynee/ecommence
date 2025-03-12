import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartContents from '../Cart/CartContents';
const CartDraw = ({ drawerOpen, tonggleCardDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.cart);
    const userId = user ? user?._id : null;
    const handleCheckout = () => {
        tonggleCardDrawer();
        if (!userId) {
            navigate('/login?redirect=checkout');
        } else {
            navigate('/checkout');
        }
    };
    return (
        <div className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[30rem] bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* close */}
            <div className='flex justify-end p-4'>
                <button onClick={tonggleCardDrawer}>
                    <IoMdClose className='size-6 text-gray-600' />
                </button>
            </div>
            {/* Cart */}
            <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-xl font-bold mb-4'>Your cart</h2>
                {/* Item */}
                {cart && cart.data?.products?.length > 0 ?
                    (
                        <CartContents cart={cart} userId={userId} guestId={guestId} />
                    )
                    :
                    (
                        <p className='text-gray-600 text-center'>Your cart is empty</p>
                    )
                }
            </div>
            {/* Checkout */}
            <div className='p-4'>
                {cart && cart.data?.products?.length > 0 && (
                    <>
                        <button className='w-full py-2 bg-gray-800 text-white rounded' onClick={handleCheckout}>Checkout</button>
                        <p className='mt-4 text-gray-600 text-sm'>Shipping, taxes and discounts calculated at checkout</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default CartDraw