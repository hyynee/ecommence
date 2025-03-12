import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFitlers, setFilters } from '../../redux/slices/prodSlices';
const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchItems, setSearchItems] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setFilters({ search: searchItems }));
        dispatch(fetchProductsByFitlers({ search: searchItems }));
        navigate(`/collection/all?search=${searchItems}`);
        setIsOpen(false);
    }
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? 'absolute top-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'}`}>
            {isOpen ? (<form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
                <div className='relative w-1/2'>
                    <input
                        type="text"
                        placeholder='Search'
                        value={searchItems}
                        onChange={(e) => setSearchItems(e.target.value)}
                        className='bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700' />
                    {/* search */}
                    <button type='submit' className='absolute right-0 top-0 bottom-0 bg-gray-100 px-4 rounded-r-lg hover:text-gray-800'>
                        <HiMagnifyingGlass className='size-6' />
                    </button>
                </div>
                {/* close */}
                <button type='button' onClick={handleSearchToggle} className='absolute top-0 right-0 bg-gray-100 px-4 py-2 hover:text-gray-800'>
                    <HiMiniXMark />
                </button>
            </form>)
                :
                <button onClick={handleSearchToggle}><CiSearch className='size-6' /></button>}
        </div>
    )
}

export default Search