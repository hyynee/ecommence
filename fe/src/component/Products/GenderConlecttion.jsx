import React from 'react'
import { Link } from 'react-router-dom'
import mensCollection from '../../assets/mens-collection.webp'
import womensCollection from '../../assets/womens-collection.webp'

const GenderConlecttion = () => {
    return (
        <section className='py-16 px-4 lg:px-0 '>
            <div className='container-fluid mx-auto flex flex-col md:flex-row gap-8'>
                {/* Women */}
                <div className='relative flex-1'>
                    <img src={womensCollection} alt="womens" className='w-full h-[500px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white opacity-50 p-4'>
                        <div className='text-center text-white p-6'>
                            <h1 className='text-2xl font-bold  text-gray-900 mb-3'>Women's Collection</h1>
                            <Link to='/collection/all?gender=Women' className='bg-black text-white px-6 py-2 rounded-sm text-lg '>Shop Now</Link>
                        </div>
                    </div>
                </div>
                {/* Men */}
                <div className='relative flex-1'>
                    <img src={mensCollection} alt="womens" className='w-full h-[500px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white opacity-50 p-4'>
                        <div className='text-center text-white p-6'>
                            <h1 className='text-2xl font-bold  text-gray-900 mb-3'>Men's Collection</h1>
                            <Link to='/collection/all?gender=Men' className='bg-black text-white px-6 py-2 rounded-sm text-lg '>Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GenderConlecttion