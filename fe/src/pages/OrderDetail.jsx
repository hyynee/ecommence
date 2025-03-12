import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetail } from '../redux/slices/orderSlices';
const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orderDetail, loading, error } = useSelector((state) => state.order);
    console.log("OrderDetail", orderDetail);
    useEffect(() => {
        dispatch(fetchOrderDetail(id));
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div className='text-center'>Error: {error.message}</div>
    }

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Detail</h2>
            {!orderDetail ? (
                <div className='text-center'>Loading...</div>
            ) : (
                <div className='p-4 sm:p-6 rounded-lg border'>
                    <div className='flex flex-col sm:flex-row justify-between mb-8'>
                        <div>
                            <h3 className='text-lg md:text-xl font-semibold'>Order ID: #{orderDetail.data._id}</h3>
                            <p>{new Date(orderDetail.data.createAt).toLocaleDateString()}</p>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span className={`${orderDetail.data.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetail.data.isPaid ? 'Approved' : 'Pending'}
                            </span>
                            <span className={`${orderDetail.data.isDelivery ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-500'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetail.data.isDelivery ? 'Delivered' : 'Pending Delivery'}
                            </span>
                        </div>
                    </div>
                    { /* Payment Info */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
                            <p>Payment method: {orderDetail.data.paymentMethod}</p>
                            <p>Status: {orderDetail.data.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
                            <p>Ship method: {orderDetail.data.shippingMethod}</p>
                            <p>Address: {`${orderDetail.data.shippingAddress.city}, ${orderDetail.data.shippingAddress.country}`}</p>
                        </div>
                    </div>
                    { /* Items */}
                    <div className="overflow-x-auto">
                        <h4 className="text-lg font-semibold mb-4">Products</h4>
                        <table className='min-w-full text-gray-600 mb-4'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='py-2 px-4'>Name</th>
                                    <th className='py-2 px-4'>Price</th>
                                    <th className='py-2 px-4'>Quantity</th>
                                    <th className='py-2 px-4'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.data.items.map((item) => {
                                    console.log("items", item);
                                    return (
                                        <tr key={item.productId} className='border-b'>
                                            <td className='py-2 px-4 flex items-center'>
                                                <img src={item.image} alt={item.name} className='size-12 object-cover rounded-lg mr-4' />
                                                <Link to={`/product/${item.productId}`} />{item.name}
                                            </td>
                                            <td className=' py-2 px-4'>{item.price}</td>
                                            <td className=' py-2 px-4'>{item.quantity}</td>
                                            <td className=' py-2 px-4'>{item.price * item.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* back to order*/}
                    <Link to="/my-orders" className="text-blue-500 hover:underline">Back to My Orders</Link>
                </div>
            )}
        </div>
    )
}

export default OrderDetail