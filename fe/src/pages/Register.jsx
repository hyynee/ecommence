import React from 'react';
import { Link } from 'react-router-dom';
import register from '../assets/register.webp';
import registerHooks from '../hooks/registerHooks';
const Register = () => {
    const { name, email, password, setName, setEmail, setPassword,
        handleSubmit } = registerHooks();
    const redirect = new URLSearchParams(location.search).get('redirect') || "/";
    const isCheckoutRedirect = redirect.includes('checkout');
    return (
        <div className='flex '>
            <div className="w-full md:w-1/2  flex flex-col justify-between items-center p-8 md:p-12">
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-bold '>Register</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>
                        Hey there! <span className='text-blue-500'>👋</span>
                    </h2>
                    <p className='text-center mb-6'>
                        Enter your username and password to register
                    </p>
                    {/* name */}
                    <div className='mb-4 '>
                        <label className="block text-sm font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rouded'
                            placeholder='Enter your name'
                        />
                    </div>
                    {/* emai */}
                    <div className='mb-4 '>
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rouded'
                            placeholder='Enter your email address'
                        />
                    </div>
                    {/* password */}
                    <div className='mb-4 '>
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rouded'
                            placeholder='Enter your password'
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>
                        Sign Up
                    </button>
                    <p className='mt-6 text-center text-sm'>
                        You have account? <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500 hover:underline'>Login Now</Link>
                    </p>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-gray-200 h-full">
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={register} alt="register" className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Register