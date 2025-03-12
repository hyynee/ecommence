import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/rabbit-hero.webp'
const Hero = () => {
    return (
        <section className='relative'>
            <img src={heroImg} alt="Rabbit" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
            <div className='absolute inset-0  bg-black opacity-40 flex items-center justify-center'>
                <div className='text-center text-white p-6'>
                    <h1 className='text-4xl md:text-9xl font-bold -tracking-tighter uppercase mb-4'>Welcome <br /> To Shop</h1>
                    <p className='text-sm tracking-tighter md:text-lg mb-6'>
                        Explore our vaction-ready outfits with a touch of elegance
                    </p>
                    <Link to='#' className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg '>Shop Now</Link>
                </div>
            </div>
        </section>
    )
}

export default Hero