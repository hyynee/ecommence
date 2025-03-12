import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import FilterSideBar from '../component/Products/FilterSideBar';
import ProductGrid from '../component/Products/ProductGrid';
import SortOption from '../component/Products/SortOption';
import { fetchProductsByFitlers } from '../redux/slices/prodSlices';
const CollectionPage = () => {
  const { conllection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(fetchProductsByFitlers({ conllection, ...queryParams }))
  }, [dispatch, conllection, searchParams])

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  }
  useEffect(() => {
    // add event listeners for click
    document.addEventListener("mousedown", handleClickOutside);
    // remove event listeners 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  return (
    <div className='flex flex-col lg:flex-row'>
      { /* mobile filter*/}
      <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
        <FaFilter className='mr-2' /> Filters
      </button>
      { /* filter SideBar*/}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 z-50 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:w-auto lg:block`} ref={sidebarRef}>
        <FilterSideBar />
      </div>
      <div className='flex-grow p-4'>
        <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
        {/* sort */}
        <SortOption />
        {/* products */}
        <ProductGrid product={products} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default CollectionPage