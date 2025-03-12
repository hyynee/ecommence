import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStorageJSON, http, saveStorageJSON } from '../../util/config';

const userFromStorage = getStorageJSON('userInfo') || null;

const initialGuestId =
    localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestId', initialGuestId);

const initialState = {
    user: userFromStorage ? userFromStorage.user : null,
    token: userFromStorage ? userFromStorage.token : null,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await http.post('/user/login', userData);
            const data = response.data; // { user, token }
            saveStorageJSON('userInfo', data);
            saveStorageJSON('token', data.token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await http.post('/user/register', userData);
            const data = response.data; // { user, token }
            saveStorageJSON('userInfo', data); // Lưu object trực tiếp
            saveStorageJSON('token', data.token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const authSlices = createSlice({
    name: 'authSlices',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null; // Xóa token
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem('userInfo');
            localStorage.setItem('guestId', state.guestId);
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem('guestId', state.guestId);
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // registerUser
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, generateNewGuestId } = authSlices.actions;

export default authSlices.reducer;