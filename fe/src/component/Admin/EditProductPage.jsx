import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../redux/slices/adminProductSlices';
import { fetchProductsDetail } from '../../redux/slices/prodSlices';
import { http } from '../../util/config';

const EditProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedProduct, loading, error } = useSelector(state => state.products);
    const [productData, setProductData] = React.useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        sku: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: [],
        materials: [],
        gender: '',
        images: [],
    });
    const [uploading, setUploading] = React.useState(false);
    useEffect(() => {
        if (id) {
            dispatch(fetchProductsDetail(id));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            setUploading(true);
            const response = await http.post('/upload', formData);
            console.log("Response Data:", response);
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: response.data.imageUrl, altText: "" }]
            }));
            setUploading(false);
        } catch (error) {
            console.log("error", error);
            setUploading(false);
        }
    };
    const hanldeSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting product data:', productData);
        dispatch(updateProduct({ id, productData }));
        navigate('/admin/products');
    };
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div className='max-w-7xl mx-auto p-6 shadow-md rounded-md'>
            <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
            <form onSubmit={hanldeSubmit}>
                {/* Product Name */}
                <div className="mb-4">
                    <label className='block text-gray-700'>Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={productData.name}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                {/* Product Description */}
                <div className="mb-4">
                    <label className='block text-gray-700'>Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={productData.description}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                {/* Product Price */}
                <div className="mb-4">
                    <label className='block text-gray-700'>Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={productData.price}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                {/* Product Count In Stock */}
                <div className="mb-4">
                    <label className='block text-gray-700'>Count In Stock</label>
                    <input
                        type="number"
                        name="countInStock"
                        id="countInStock"
                        value={productData.countInStock}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                {/* Product SKU */}
                <div className="mb-4">
                    <label className='block text-gray-700'>SKU</label>
                    <input
                        type="text"
                        name="sku"
                        id="sku"
                        value={productData.sku}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                {/* Product Category */}
                {/* <div className="mb-4">
                    <label className='block text-gray-700'>Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={productData.category}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div> */}
                {/* Product Brand */}
                {/* <div className="mb-4">
                    <label className='block text-gray-700'>Brand</label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div> */}
                {/* Product Sizes */}
                <div className="mb-4">
                    <label className='block text-gray-700'>Sizes</label>
                    <input
                        type="text"
                        name="sizes"
                        id="sizes"
                        value={productData.sizes.join(',')}
                        onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(',').map((size) => size.trim()) })}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                {/* Product Colors */}
                <div className="mb-4">
                    <label className='block text-gray-700'>Colors</label>
                    <input
                        type="text"
                        name="colors"
                        id="colors"
                        value={productData.colors.join(',')}
                        onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(',').map((color) => color.trim()) })}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>
                {/* Product Collections */}
                {/* <div className="mb-4">
                    <label className='block text-gray-700'>Product Collections</label>
                    <input
                        type="text"
                        name="collections"
                        id="collections"
                        value={productData.collections}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div> */}
                {/* Product Materials */}
                {/* <div className="mb-4">
                    <label className='block text-gray-700'>Product Materials</label>
                    <input
                        type="text"
                        name="materials"
                        id="materials"
                        value={productData.materials}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div> */}
                {/* Product Gender */}
                {/* <div className="mb-4">
                    <label className='block text-gray-700'>Gender</label>
                    <input
                        type="text"
                        name="gender"
                        id="gender"
                        value={productData.gender}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div> */}
                {/* Product Images */}
                <div className="mb-4">
                    <label className='block text-gray-700'>Upload Image</label>
                    <input
                        type="file"
                        name="images"
                        id="images"
                        multiple
                        onChange={handleImageUpload}
                        className='w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                    {uploading && <p>Uploading image...</p>}
                    <div className='flex gap-4 mt-4'>
                        {productData.images.map((img, index) => (
                            <div key={index}>
                                <img src={img.url} alt="Product Image" className='w-20 h-20 object-cover rounded-md shadow-md' />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full transition-colors"
                >
                    Update Product
                </button>
            </form >
        </div >
    )
}

export default EditProductPage