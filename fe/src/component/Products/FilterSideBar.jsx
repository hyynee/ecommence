import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSideBar = () => {
    // x.com/?a=1&b=2 => a=1 and b=2
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        category: '',
        gender: '',
        color: '',
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 10000000,
    });
    const [price, setPrice] = useState([0, 10000000]);
    const categories = ["TopWear", "BottomWear"];
    const color = ["Red", "Green", "Blue", "Magenta", "Yellow", "Black", "White"];
    const size = ["S", "M", "L", "XL", "XXL"];
    const material = ["Cotton", "Polyester", "Silk", "Wool"];
    const brand = ["Brand1", "Brand2", "Brand3", "Brand 4"];
    const genders = ["Men", "Women"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        // {category: "Top Wear", maxPrice: "100", minPrice: "0"} => params.category
        setFilter({
            category: params.category || '',
            gender: params.gender || '',
            color: params.color || '',
            size: params.size ? params.size.split(',') : [],
            material: params.material ? params.material.split(',') : [],
            brand: params.brand ? params.brand.split(',') : [],
            minPrice: params.minPrice ? parseInt(params.minPrice) : 0,
            maxPrice: params.maxPrice ? parseInt(params.maxPrice) : 10000000,
        });
        setPrice([0, params.maxPrice ? Number(params.maxPrice) : 10000000]);
    }, [searchParams]);
    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newFilter = { ...filter };
        if (type === 'checkbox') {
            if (checked) {
                newFilter[name] = [...newFilter[name], value];
            } else {
                newFilter[name] = newFilter[name].filter((item) => item !== value);
            }
        } else {
            newFilter[name] = value;
        }
        setFilter(newFilter);
        setSearchParams(new URLSearchParams(newFilter).toString());
    };
    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        const newFilter = { ...filter, maxPrice: value };
        setPrice([price[0], value]);
        setFilter(newFilter);
        setSearchParams(new URLSearchParams(newFilter).toString());
    };


    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-gray-800 mb-4'>Filters</h3>
            {/* Category */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Category</label>
                {categories.map((category, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input
                            type="radio" name="category" id={category}
                            value={category}
                            checked={filter.category === category}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor={category} className='ml-2'>{category}</label>
                    </div>
                ))}
            </div>
            {/* gender */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Gender</label>
                {genders.map((gender, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input
                            type="radio" name="gender" id={gender}
                            value={gender}
                            checked={filter.gender === gender}
                            onChange={handleFilterChange}
                        />
                        <label htmlFor={gender} className='ml-2'>{gender}</label>
                    </div>
                ))}
            </div>
            {/* Color */}
            <div className="mb-6 ">
                <label className='block text-gray-600 font-medium mb-2'>Color</label>
                <div className='flex flex-wrap gap-2'>
                    {color.map((color, index) => (
                        <div key={index} >
                            <button
                                key={color}
                                name="color"
                                value={color}
                                onClick={handleFilterChange}
                                className='size-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 hover:border-gray-600'
                                style={{ backgroundColor: color.toLowerCase() }}
                                onChange={handleFilterChange}
                            >
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Size */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Size</label>
                {size.map((size, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input type="checkbox" name="size" id={size} value={size} className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-400' onChange={handleFilterChange} />
                        <span className='ml-2 text-gray-600'>{size}</span>
                    </div>
                ))}
            </div>

            {/* Material */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Material</label>
                {material.map((material, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input type="checkbox" name="material"
                            id={material} value={material}
                            className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-400' onChange={handleFilterChange} />
                        <span className='ml-2 text-gray-600'>{material}</span>
                    </div>
                ))}
            </div>

            {/* Brand */}
            <div className="mb-6">
                <label className='block text-gray-600 font-medium mb-2'>Brand</label>
                {brand.map((brand, index) => (
                    <div key={index} className='flex items-center mb-1'>
                        <input type="checkbox" name="brand" id={brand} value={brand} className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-400' onChange={handleFilterChange} />
                        <span className='ml-2 text-gray-600'>{brand}</span>
                    </div>
                ))}
            </div>

            {/* Price */}
            <div className="mb-8">
                <label className='block text-gray-600 font-medium mb-2'>Price</label>
                <input type="range" name="priceRange" min={0} max={100000000} value={price[1] !== undefined ? price[1] : 10000000} onChange={handlePriceChange} />
                <div className='flex justify-between'>
                    <span>0</span>
                    <span>{price[1].toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSideBar