import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { addToCart } from '../../redux/slices/cartSlices';
import { fetchProductsDetail, fetchSimilarProducts } from '../../redux/slices/prodSlices';
import ProductGrid from './ProductGrid';

const ProductDetail = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth);
    const [mainImg, setMainImg] = useState(null);
    const [currentSize, setCurrentSize] = useState(null);
    const [currentColor, setCurrentColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductsDetail(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    }, [dispatch, productFetchId]);

    useEffect(() => {
        if (selectedProduct) {
            setMainImg(selectedProduct.images?.[0]?.url || 'https://via.placeholder.com/200');
            setCurrentSize(selectedProduct.sizes?.[0] || null);
            setCurrentColor(selectedProduct.colors?.[0] || null);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (type) => {
        if (type === 'plus') setQuantity((prev) => prev + 1);
        if (type === 'minus' && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddtocart = () => {
        if (!currentSize || !currentColor) {
            toast.error('Please select size and color.', { duration: 1000 });
            return;
        }
        setIsButtonDisabled(true);
        dispatch(
            addToCart({
                userId: user?._id,
                guestId,
                productId: productFetchId,
                quantity,
                size: currentSize,
                color: currentColor,
            })
        )
            .then(() => {
                toast.success('Product added to cart.', { duration: 1000 });
            })
            .catch((err) => {
                toast.error('Failed to add to cart: ' + err, { duration: 1000 });
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!selectedProduct) return <p className="text-center">No product found.</p>;

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/* Left - Thumbnail Images */}
                    <div className="hidden md:flex flex-col space-y-6 mr-6">
                        {selectedProduct.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img.url}
                                alt={img.altText || `Thumbnail ${index}`}
                                onClick={() => setMainImg(img.url)}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img
                                src={mainImg}
                                alt="Main Product"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Mobile Thumbnails */}
                    <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
                        {selectedProduct.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img.url}
                                alt={img.altText || `Thumbnail ${index}`}
                                onClick={() => setMainImg(img.url)}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                            />
                        ))}
                    </div>

                    {/* Right - Product Info */}
                    <div className="md:w-1/2 md:ml-10">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {selectedProduct.name || 'Default Product Name'}
                        </h1>
                        <p className="text-lg text-gray-600 mb-1 line-through">
                            {selectedProduct.price && `${selectedProduct.price.toLocaleString("vi-VN")} VND`}
                        </p>
                        <p className="text-xl text-red-600 mb-1">
                            {selectedProduct.discountPrice.toLocaleString("vi-VN") || selectedProduct.price} VND
                        </p>
                        <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                        {/* Colors */}
                        <div className="mb-4">
                            <p className="text-gray-700">Color:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`size-8 rounded-full border ${color === currentColor ? 'border-2 border-black' : 'border-gray-300'
                                            }`}
                                        onClick={() => setCurrentColor(color)}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="mb-4">
                            <p className="text-gray-700">Size:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.sizes?.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSize(size)}
                                        className={`px-4 py-2 rounded border ${size === currentSize ? 'bg-black text-white' : 'border-gray-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6">
                            <p className="text-gray-700">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button
                                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                                    onClick={() => handleQuantityChange('minus')}
                                >
                                    -
                                </button>
                                <span className="text-lg">{quantity}</span>
                                <button
                                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                                    onClick={() => handleQuantityChange('plus')}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddtocart}
                            disabled={isButtonDisabled}
                            className={`w-full py-2 bg-black text-white rounded-lg ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                                }`}
                        >
                            {isButtonDisabled ? 'Adding...' : 'ADD TO CART'}
                        </button>

                        {/* Characteristics */}
                        <div className="mt-10 text-gray-800">
                            <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                            <table className="w-full text-left text-sm text-gray-600">
                                <tbody>
                                    <tr>
                                        <td>Brand:</td>
                                        <td>{selectedProduct.brand}</td>
                                    </tr>
                                    <tr>
                                        <td>Material:</td>
                                        <td>{selectedProduct.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="mt-20">
                    <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
                    <ProductGrid product={similarProducts} loading={loading} error={error} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;