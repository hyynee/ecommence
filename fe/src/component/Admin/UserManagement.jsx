import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, fetchUsers, removeUser, updateUser } from '../../redux/slices/adminSlices';

const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { users, loading, error } = useSelector(state => state.admin);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer', // default role
    });
    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, user])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData))
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer',
        });
    };
    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({ id: userId, role: newRole }));
    };
    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(removeUser(userId));
        }
    };
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-4'>UserManagement</h2>
            {loading && <p>Loading...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {/* Add User */}
            <div className="p-6 rounded-lg mb-6">
                <h3 className='text-lg font-bold mb-4'>Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Name</label>
                        <input
                            type="text"
                            name="name" id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded p-2'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Email</label>
                        <input
                            type="email"
                            name="email" id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded p-2'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Password</label>
                        <input
                            type="password"
                            name="password" id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded p-2'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Role</label>
                        <select name="role" id="role"
                            value={formData.role}
                            onChange={handleChange}
                            className='w-full border border-gray-300 rounded p-2'>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600' type='submit'>Add User</button>
                </form>
            </div>
            {/* User List */}
            <div className="overflow-x-auto shadow-md sm:roulded-lg">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-900'>
                        <tr>
                            <th className='py-3 px-6'>ID</th>
                            <th className='py-3 px-6'>Name</th>
                            <th className='py-3 px-6'>Email</th>
                            <th className='py-3 px-6'>Role</th>
                            <th className='py-3 px-6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className='py-3 px-6'>{user._id}</td>
                                <td className='py-3 px-6'>{user.name}</td>
                                <td className='py-3 px-6'>{user.email}</td>
                                <td className='py-3 px-6'>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className='w-full border border-gray-300 rounded p-2'
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className='py-3 px-6'>
                                    <button
                                        // onClick={() => handleEditUser(user._id)}
                                        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2'>Edit</button>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement