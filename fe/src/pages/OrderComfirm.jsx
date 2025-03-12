import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlices';

const checkout = {
    _id: "2412",
    createAt: new Date(),
    checkoutItems: [
        {
            id: "1",
            name: "Product 1",
            color: "Red",
            size: "M",
            price: 100,
            image: "https://picsum.photos/200?random=2",
            quantity: 1
        },
        {
            id: "2",
            name: "Product 2",
            color: "Blue",
            size: "L",
            price: 100,
            image: "https://picsum.photos/200?random=3",
            quantity: 1
        }
    ],
    shippingAddress: {
        firstName: "Huy",
        lastName: "Anh",
        address: "220 Au Co",
        city: "Ho Chi Minh",
        postalCode: "24122003",
        country: "VietNam",
        phone: "123456789"
    }
}

const OrderComfirm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    // clear cart is payment success
    useEffect(() => {
        if (checkout && checkout.checkout._id) {
            dispatch(clearCart());
        } else {
            navigate('/my-orders')
        }
    }, [checkout, dispatch, navigate]);
    const calculateEstimatedDeliver = (date) => {
        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() + 10) // 10 days
        return orderDate.toLocaleDateString();
    }
    return (
        <div className='max-w-4xl mx-auto p-6 bg-white'>
            <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>Thank you for your order</h1>
            {checkout && (
                <div className='p-6 rounded-lg border'>
                    <div className="flex justify-between mb-20">
                        {/* */}
                        <div>
                            <h2 className='text-xl font-semibold'>Order ID: {checkout?.checkout._id}</h2>
                            <p className='text-gray-500'>Date: {new Date(checkout?.checkout.createAt).toLocaleDateString()}</p>
                        </div>
                        {/* */}
                        <div>
                            <p className='text-emerald-700 text-sm'>
                                Estimated Deliver: {calculateEstimatedDeliver(checkout?.checkout.createAt)}
                            </p>
                        </div>
                        {/* */}

                    </div>
                    <div className='mb-20'>
                        {checkout?.checkout?.checkoutItems.map((item, index) => {
                            console.log("item", item)
                            return (
                                <div key={index} className='flex items-center mb-4'>
                                    <img src={item.image} alt={item.name} className='size-16 rounded-md object-cover mr-4' />
                                    <div>
                                        <h4 className='text-md font-semibold'>{item.name}</h4>
                                        <p className='text-sm text-gray-500'>{item.color} | {item.size}</p>
                                    </div>
                                    <div className='ml-auto text-right'>
                                        <p className='text-md'>$ {item.price}</p>
                                        <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    { /* payment */}
                    <div className='grid grid-cols-2 gap-8'>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                            <p className='text-gray-600'>PayPal</p>
                        </div>
                        {/* */}
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                            <p className='text-gray-600'>{checkout?.checkout.shippingAddress.address}</p>
                            <p className='text-gray-600'>{checkout?.checkout.shippingAddress.city}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderComfirm