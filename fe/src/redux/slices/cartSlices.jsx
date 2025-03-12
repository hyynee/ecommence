import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStorageJSON, http, saveStorageJSON } from '../../util/config';

const loadCartFromStorage = () => {
    const storedCart = getStorageJSON('cart');
    return storedCart ? storedCart : { products: [] };
}

const saveCartToStorage = (cart) => {
    saveStorageJSON('cart', cart);
}

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const params = userId ? { userId } : { guestId };
            const response = await http.get(`/cart`, { params });
            return response.data;
        } catch (e) {
            console.error("Error fetching cart:", e.response?.data || e.message);
            return rejectWithValue(e.response?.data || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk("cart/addToCart",
    async ({ userId, guestId, productId, quantity, size, color }, { rejectWithValue }) => {
        try {
            const response = await http.post(`/cart`, {
                userId,
                guestId,
                productId,
                quantity,
                size,
                color
            });
            return response.data;
        } catch (e) {
            console.error("Error adding to cart:", e);
            return rejectWithValue(e);
        }
    }
)

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await http.put('cart', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);


export const removeFromCart = createAsyncThunk("cart/removeFromCart",
    async ({ userId, guestId, productId, size, color }, { rejectWithValue }) => {
        try {
            const response = await http.delete(`/cart`, {
                data: {
                    userId,
                    guestId,
                    productId,
                    size,
                    color
                }
            });
            return response.data;
        } catch (e) {
            console.error("Error removing from cart:", e);
            return rejectWithValue(e);
        }
    }
)

export const mergeCart = createAsyncThunk("cart/mergeCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await http.post(`/cart/merge`, {
                userId,
                guestId
            });
            return response.data;
        } catch (e) {
            console.error("Error merging carts:", e);
            return rejectWithValue(e);
        }
    }
)


const initialState = {
    cart: loadCartFromStorage(),
    loading: false,
    error: null
}

const cartSlices = createSlice({
    name: 'cartSlices',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem('cart');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
            //
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })
            //
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity in cart";
            })
            //
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item in cart";
            })
            //
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            })
    }
});

export const { clearCart } = cartSlices.actions

export default cartSlices.reducer

