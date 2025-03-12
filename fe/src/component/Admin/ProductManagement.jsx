import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlices';
const ProductManagement = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.adminProducts);
    useEffect(() => {
        dispatch(fetchAdminProducts())
    }, [dispatch])
    const handleDeleteProduct = (id) => {
        console.log('Delete product', id);
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
            <div className="overfow-x-auto shadow-md sm:rounded-lg">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-900'>
                        <tr>
                            <th className='py-3 px-4'>ID</th>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Price</th>
                            <th className='py-3 px-4'>SKU</th>
                            <th className='py-3 px-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((prod) => {
                                return (
                                    <tr key={prod._id} className='border-b border-gray-200 hover:bg-gray-100'>
                                        <td className='py-3 px-4'>{prod._id}</td>
                                        <td className='py-3 px-4'>{prod.name}</td>
                                        <td className='py-3 px-4'>{prod.price.toLocaleString()}</td>
                                        <td className='py-3 px-4'>{prod.sku}</td>
                                        <td className='py-3 px-4'>
                                            <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400'>
                                                <Link to={`/admin/products/${prod._id}/edit`} >Edit</Link>
                                            </button>
                                            <button
                                                className='px-4 py-2 ml-2 bg-red-500 text-white rounded-md hover:bg-red-400' onClick={() => handleDeleteProduct(prod._id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className='text-center py-4'>No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement