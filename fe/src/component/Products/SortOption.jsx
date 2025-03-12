import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOption = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        setSearchParams({ sortBy });
    }
    return (
        <div className='mb-4 flex items-center justify-end'>
            <select name="sort" id="sort" className='border p-2 rounded-md focus:outline-none'
                onChange={handleSortChange}
                value={searchParams.get('sortBy') || ""}
            >
                <option value="">Default</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: Hign to Low</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    )
}

export default SortOption