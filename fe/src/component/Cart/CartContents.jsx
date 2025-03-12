import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlices';
const CartContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        console.log("Sending request:", {
            userId,
            guestId,
            productId,
            quantity: newQuantity,
            size,
            color
        });

        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                userId,
                guestId,
                productId,
                quantity: newQuantity,
                size,
                color
            }));
        }
    };


    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({
            userId,
            guestId,
            productId: productId,
            size,
            color
        }))
    };

    return (
        <div>
            {cart?.data?.products.map((item, index) => {
                return <div key={index} className='flex items-start justify-between border-b border-gray-200 py-4'>
                    <div className='flex items-start'>
                        <img
                            src={item.image}
                            alt={item.name}
                            className='w-20 h-24 object-cover mr-4' />
                        <div>
                            <h3>{item.name}</h3>
                            <p className='text-sm text-gray-500'>size: {item.size} | color: {item.color}</p>
                            <div className='flex items-center mt-2'>
                                <button
                                    onClick={() => handleAddToCart(item.productId, -1, item.quantity, item.size, item.color)}
                                    className='border rounded px-2 py-1 text-xs font-medium'
                                >-</button>
                                <span className='mx-4'>{item.quantity}</span>
                                <button
                                    onClick={() => handleAddToCart(item.productId, 1, item.quantity, item.size, item.color)}
                                    className='border rounded px-2 py-1 text-xs font-medium'
                                >+</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        {Number(item.price)?.toLocaleString("vi-VN")} VND
                        <button
                            onClick={() => handleRemoveFromCart(item.productId, item.size, item.color)}
                        >
                            <RiDeleteBin6Line className='text-red-500 size-4 mt-2 ' />
                        </button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default CartContents