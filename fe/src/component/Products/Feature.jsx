import React from 'react';
import { Link } from 'react-router-dom';
import feature from '../../assets/featured.webp';
const Feature = () => {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className="container-fluid mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-200 rounded-3xl">
                {/* left */}
                <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Comfort and Style
                    </h2>
                    <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
                        Apparel made for your every day life
                    </h2>
                    <p className='text-lg text-gray-600 mb-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eveniet sunt voluptate! Inventore qui praesentium iure iusto illum earum quis minus, aut dolores quaerat quasi. Voluptates soluta dignissimos minus atque?
                    </p>
                    <Link to='/collection/all' className='bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700'>
                        Shop Now
                    </Link>
                </div>
                {/* right */}
                <div className='lg:w-1/2'>
                    <img src={feature} alt='Feature' className='w-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />
                </div>
            </div>
        </section>
    )
}

export default Feature