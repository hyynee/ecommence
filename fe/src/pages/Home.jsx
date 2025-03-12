import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Hero from '../component/Layout/Hero'
import Feature from '../component/Products/Feature'
import FeatureSection from '../component/Products/FeatureSection'
import GenderConlecttion from '../component/Products/GenderConlecttion'
import NewArivals from '../component/Products/NewArivals'
import ProductDetail from '../component/Products/ProductDetail'
import ProductGrid from '../component/Products/ProductGrid'
import { fetchProductsByFitlers } from '../redux/slices/prodSlices'
import { http } from '../util/config'


const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProductsByFitlers({
            gender: "Women",
            category: "Bottom Wear",
            limit: 8
        }));
        const fetchBestSeller = async () => {
            try {
                const response = await http.get('/product/best-seller');
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error("Error fetching best seller product:", error);
            }
        };
        fetchBestSeller();
    }, [dispatch]);
    return (
        <div>
            <Hero />
            <GenderConlecttion />
            <NewArivals />

            {/* Best seller */}
            <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
            {bestSellerProduct ? (<ProductDetail productId={bestSellerProduct._id} />) : (
                <p className='text-center'>Loading best seller product...</p>
            )}


            <div className='container-fluid mx-auto'>
                <h2 className='text-3xl text-center font-bold mb-4'>Top Wear for Women</h2>
                <ProductGrid product={products} loading={loading} error={error} />
            </div>
            <Feature />
            <FeatureSection />
        </div>
    )
}

export default Home