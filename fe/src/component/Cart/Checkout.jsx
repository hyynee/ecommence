import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCheckout } from '../../redux/slices/checkoutSlices';
import { http } from '../../util/config';
import Paypal from './Paypal';



const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = React.useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    });
    useEffect(() => {
        if (!cart || !cart.data || !cart.data.products || cart.data.products.length === 0) {
            navigate('/');
        }
    }, [cart, navigate])
    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.data.products.length > 0) {
            const response = await dispatch(createCheckout({
                checkoutItems: cart.data.products,
                shippingAddress,
                paymentMethod: "Paypal",
                totalPrice: cart.data.totalPrice
            }));
            if (response.payload && response.payload.checkout._id) {
                setCheckoutId(response.payload.checkout._id);
            }
        }
    };
    const handlePaymentSuccess = async (details) => {
        try {
            const response = await http.put(`/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details }
            );
            if (response.status === 200) {
                await handleFinalizeCheckout(checkoutId)
            } else {
                console.error('Failed to pay for order:', response);
            }
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    }
    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await http.post(`/checkout/${checkoutId}/finalize`, {});
            navigate("/order-confirmation");

        } catch (error) {
            console.error('Failed to finalize order:', error);
        }
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!cart || !cart.data.products || !cart.data.products.length === 0) {
        return <div>No items in cart</div>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            {/* left */}
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Check out</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className='text-lg mb-4'>Contact Detail</h3>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Email</label>
                        <input
                            type="emai"
                            value={user ? user.email : ''}
                            className='w-full p-2 border rounded'
                            disabled
                        />
                    </div>
                    <h3 className='text-lg mb-4'>Delivery</h3>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'>Frist Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className='block text-gray-700'>City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>PostalCode</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Country</label>
                        <input
                            type="text"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Phone</label>
                        <input
                            type="tel"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className='w-full p-2 border rounded'
                            required
                        />
                    </div>

                    <div className='mt-6'>
                        {!checkoutId ? (
                            <button
                                type='submit'
                                className='w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-600'
                            >
                                Continue to Payment
                            </button>
                        ) : (
                            <div className=''>
                                <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                                {/* paypal component*/}
                                <Paypal amount={cart.data.totalPrice} onSuccess={handlePaymentSuccess} onError={(err) => alert("payment fail. Try again!")} />
                            </div>
                        )}
                    </div>
                </form>
            </div>
            {/* right */}
            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-lg mb-6'>Order Summary</h3>
                <div className='border-t py-4 mb-4'>
                    {cart.data.products.map((prod, index) => {
                        return <div key={index} className='flex items-start justify-between py-2 border-b'>
                            <div className='flex items-start'>
                                <img src={prod.image} alt={prod.name} className='w-20 h-24 object-cover mr-4' />
                                <div>
                                    <h3 className='text-md'>{prod.name}</h3>
                                    <p className='text-gray-700'>Size: {prod.size}</p>
                                    <p className='text-gray-700'>Color: {prod.color}</p>
                                </div>
                            </div>
                            <p className='text-xl'>$ {prod.price?.toLocaleString()}</p>
                        </div>
                    })}
                </div>
                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p>$ {cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p>Total</p>
                    <p>$ {cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout