import { configureStore } from '@reduxjs/toolkit';
import adminOrderSlices from './slices/adminOrderSlices';
import adminProductSlices from './slices/adminProductSlices';
import adminSlices from './slices/adminSlices';
import authSlices from './slices/authSlices';
import cartSlices from './slices/cartSlices';
import checkoutSlices from './slices/checkoutSlices';
import orderSlices from './slices/orderSlices';
import prodSlices from './slices/prodSlices';
export const store = configureStore({
    reducer: {
        auth: authSlices,
        products: prodSlices,
        cart: cartSlices,
        checkout: checkoutSlices,
        order: orderSlices,
        admin: adminSlices,
        adminProducts: adminProductSlices,
        adminOrder: adminOrderSlices
    },
});

export default store;