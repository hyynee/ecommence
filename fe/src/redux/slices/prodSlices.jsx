import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';

const initialState = {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
        collection: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        material: "",
        brand: "",
    }
}

const prodSlices = createSlice({
    name: 'prodSlices',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = initialState.filters
        }
    },
    extraReducers: (builder) => {
        builder
            //fetchProductsByFitlers
            .addCase(fetchProductsByFitlers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFitlers.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchProductsByFitlers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //fetchProductsDetail
            .addCase(fetchProductsDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductsDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // handle UPDATE product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updateProduct = action.payload;
                const index = state.products.findIndex((p) => p._id === updateProduct._id);
                if (index > -1) {
                    state.products[index] = updateProduct;
                } else {
                    console.error(`Product not found with id ${updateProduct._id}`);
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // similar
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setFilters, clearFilters } = prodSlices.actions

export default prodSlices.reducer

export const fetchProductsByFitlers = createAsyncThunk("products/fetchByFilters",
    async ({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit
    }) => {
        const query = new URLSearchParams();
        if (collection) query.append('collection', collection);
        if (size) query.append('size', size);
        if (color) query.append('color', color);
        if (gender) query.append('gender', gender);
        if (minPrice) query.append('minPrice', minPrice);
        if (maxPrice) query.append('maxPrice', maxPrice);
        if (sortBy) query.append('sortBy', sortBy);
        if (search) query.append('search', search);
        if (category) query.append('category', category);
        if (material) query.append('material', material);
        if (brand) query.append('brand', brand);
        if (limit) query.append('limit', limit);

        const response = await http.get(`/product/get-products?${query.toString()}`);
        return response.data;
    }
)

export const fetchProductsDetail = createAsyncThunk("products/fetchDetail",
    async (id) => {
        const response = await http.get(`/product/get-product/${id}`);
        return response.data;
    }
);

export const updateProduct = createAsyncThunk("products/updateProduct",
    async (id, productData) => {
        const response = await http.put(`/product/update-product/${productData._id}`, productData);
        return response.data;
    }
);


export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts",
    async ({ id }) => {
        const response = await http.get(`/product/similar/${id}`);
        return response.data;
    }
)