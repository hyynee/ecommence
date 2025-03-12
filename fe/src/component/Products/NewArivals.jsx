import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import newArivalsHook from '../../hooks/newArivalsHook';
const NewArivals = () => {
    const {
        scrollRef,
        newArrivals,
        canScrollLeft,
        canScrollRight,
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
        scroll,
    } = newArivalsHook();
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto text-center mb-10 relative px-4'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p>Discover the latest books, hand-picked just for you.</p>

                {/* Scroll Buttons */}
                <div className='absolute right-4 top-14 flex space-x-2'>
                    <button
                        className={`hidden md:block p-2 rounded border bg-white text-black shadow-md transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                    >
                        <FiChevronLeft className='text-xl' />
                    </button>
                    <button
                        className={`hidden md:block p-2 rounded border bg-white text-black shadow-md transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                    >
                        <FiChevronRight className='text-xl' />
                    </button>
                </div>

                {/* Product List */}
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    className="overflow-x-auto whitespace-nowrap flex space-x-6 py-6 scrollbar-hide">
                    {newArrivals.map((prod) => (
                        <div key={prod._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]  relative'>
                            <img src={prod.images?.[0]?.url} alt={prod.images?.altText || prod.name} className='w-full h-[500px] object-cover rounded-lg' draggable="false" />
                            <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg'>
                                <Link to={`/product/${prod._id}`} className='block'>
                                    <h4 className='font-medium'>{prod.name}</h4>
                                    <p className='mt-1'>{prod.price.toLocaleString("vi-VN")} VND</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default NewArivals