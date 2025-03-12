import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';


export const fetchAdminProducts = createAsyncThunk('adminProducts/fetchAdminProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await http.get('/product/get-products');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const createProduct = createAsyncThunk('adminProducts/createProduct',
    async (prodData) => {
        try {
            const response = await http.post(`/product/create-product`, prodData);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
)

export const updateProduct = createAsyncThunk('adminProducts/updateProduct',
    async ({ id, productData }) => {
        console.log("Product updated", id, productData);
        const response = await http.put(`/product/update-product/${id}`, productData);
        return response.data;
    }
)

export const deleteProduct = createAsyncThunk('adminProducts/deleteProduct',
    async (id) => {
        const response = await http.delete(`/product/delete-product/${id}`);
        return id;
    }
)

const initialState = {
    products: [],
    loading: false,
    error: null
}

const adminProductSlices = createSlice({
    name: 'adminProductSlices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchAdminProducts
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // createProduct
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            // updateProduct
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(prod => prod._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            // deleteProduct
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(prod => prod._id !== action.payload);
            })
    }
});

export const { } = adminProductSlices.actions

export default adminProductSlices.reducer