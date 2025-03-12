import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import login from '../assets/login.webp';
import loginHooks from '../hooks/loginHooks';

const Login = () => {
    const { email, password, loading, error, handleSubmit, setEmail, setPassword } = loginHooks();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect') || "/";
    const isCheckoutRedirect = redirect.includes('checkout');

    return (
        <div className='flex'>
            <div className="w-full md:w-1/2 flex flex-col justify-between items-center p-8 md:p-12">
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-bold'>Login</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>
                        Hey there! <span className='text-blue-500'>👋</span>
                    </h2>
                    <p className='text-center mb-6'>
                        Enter your username and password to login
                    </p>
                    {/* Email */}
                    <div className='mb-4'>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your email address'
                        />
                    </div>
                    {/* Password */}
                    <div className='mb-4'>
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your password'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
                    <p className='mt-6 text-center text-sm'>
                        Don't have an account? <Link to='/register' className='text-blue-500 hover:underline'>Sign Up</Link>
                    </p>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-gray-200 h-full">
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={login} alt="Login" className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    );
};

export default Login;