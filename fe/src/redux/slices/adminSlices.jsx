import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../util/config';


export const fetchUsers = createAsyncThunk('admin/fetchUsers',
    async () => {
        try {
            const response = await http.get('/user/getAllUser');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
);

export const addUser = createAsyncThunk('admin/addUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await http.post('/user/createUser', userData);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk('admin/updateUser',
    async ({ id, name, role, email, password }) => {
        const response = await http.put(`/user/updateUser/${id}`, { name, role, email, password });
        return response.data;
    }
);

export const removeUser = createAsyncThunk(
    'admin/removeUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await http.delete(`/user/deleteUser/${userId}`);
            return { id: userId };
        } catch (error) {
            console.error('Error removing user:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    users: [],
    loading: false,
    error: null
}

const adminSlices = createSlice({
    name: 'adminSlices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchUsers
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // updateUser
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload.user || action.payload;
                const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
                if (userIndex !== -1) {
                    state.users[userIndex] = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // createUser
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                const newUser = action.payload.user || action.payload;
                state.users.push(newUser);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // removeUser
            .addCase(removeUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload.id);
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});

export const { } = adminSlices.actions

export default adminSlices.reducer