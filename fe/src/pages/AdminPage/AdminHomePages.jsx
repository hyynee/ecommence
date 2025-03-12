import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllOrders } from '../../redux/slices/adminOrderSlices';
import { fetchAdminProducts } from '../../redux/slices/adminProductSlices';

const AdminHomePages = () => {
    const dispatch = useDispatch();
    const { products, loading: productsLoading, error: productsError } = useSelector(state => state.adminProducts);
    const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector(state => state.adminOrder);
    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
    }, [dispatch])
    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>Admin DashBoard</h1>
            {productsLoading || ordersLoading ? (
                <div className='text-center'>Loading...</div>
            ) : productsError ? (
                <p className='text-red-500'>Error fetching products :{productsError}</p>
            ) : ordersError ? (
                <p className='text-red-500'>Error fetching orders :{ordersError}</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div className="p-4 shadow-md rounded-lg">
                        <h2 className='text-xl font-semibold'>Revence</h2>
                        <p className='text-2xl'>{totalSales.toLocaleString()} VND</p>
                    </div>
                    <div className="p-4 shadow-md rounded-lg">
                        <h2 className='text-xl font-semibold'>Total Oders</h2>
                        <p className='text-2xl'>{totalOrders}</p>
                        <Link to='/admin/orders' className='text-blue-500'>View All</Link>
                    </div>
                    <div className="p-4 shadow-md rounded-lg">
                        <h2 className='text-xl font-semibold'>Total Products</h2>
                        <p className='text-2xl'>{products.length}</p>
                        <Link to='/admin/products' className='text-blue-500'>View All</Link>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <h2>Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className='min-w-full text-left text-gray-500'>
                        <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                            <tr>
                                <th className='py-3 px-4'>Order ID</th>
                                <th className='py-3 px-4'>User</th>
                                <th className='py-3 px-4'>Total price</th>
                                <th className='py-3 px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.data ? (
                                orders?.data.map((order, index) => {
                                    return (
                                        <tr key={index} className='border-b border-gray-200'>
                                            <td className='py-3 px-4'>{order._id}</td>
                                            <td className='py-3 px-4'>{order?.userId?.name}</td>
                                            <td className='py-3 px-4'>{order.totalPrice.toLocaleString()} VND</td>
                                            <td className='py-3 px-4'>{order.status}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan='4' className='text-center py-3'>No orders found</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePages