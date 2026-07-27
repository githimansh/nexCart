import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import type { Seller } from '../../types/sellerTypes';
import axios from 'axios';

// Define initial state
interface SellerAuthState {
    error: string | null;
    loading: boolean;
    jwt: string | null;
    sellerCreated: string | null;
}

const initialState: SellerAuthState = {
    error: null,
    loading: false,
    jwt: null,
    sellerCreated: ""
};

const API_URL = '/sellers';

export const sellerSignin = createAsyncThunk(
    'sellerAuth/sellerSignin',
    async (data: { email: string; password: string; navigate: any }, { rejectWithValue }) => {
        try {
            const response = await api.post('/sellers/signin', { email: data.email, password: data.password });
            localStorage.setItem('jwt', response.data.jwt);
            data.navigate('/seller');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const sellerGoogleLogin = createAsyncThunk(
    'sellerAuth/sellerGoogleLogin',
    async (data: { token: string; navigate: any }, { rejectWithValue }) => {
        try {
            const response = await api.post('/sellers/google', { idToken: data.token });
            localStorage.setItem('jwt', response.data.jwt);
            data.navigate('/seller');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Google login failed');
        }
    }
);

export const createSeller = createAsyncThunk<Seller, Seller>(
    'sellers/createSeller',
    async (seller: Seller, { rejectWithValue }) => {
        try {
            const response = await api.post<Seller>(API_URL, seller);
            console.log('create seller', response.data);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Create seller error response data:', error.response.data);
                console.error('Create seller error response status:', error.response.status);
                console.error('Create seller error response headers:', error.response.headers);
                return rejectWithValue(error.message);
            } else {
                console.error('Create seller error message:', error.message);
                return rejectWithValue('Failed to create seller');
            }
        }
    }
);

// Create the slice
const sellerAuthSlice = createSlice({
    name: 'sellerAuth',
    initialState,
    reducers: {
        resetSellerAuthState: (state) => {
            state.error = null;
            state.loading = false;
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sellerSignin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sellerSignin.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(sellerSignin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(sellerGoogleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sellerGoogleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(sellerGoogleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state, _action: PayloadAction<Seller>) => {
                state.sellerCreated = "verification email sent to you";
                state.loading = false;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to create seller';
            });
    },
});

// Export actions and reducer
export const { resetSellerAuthState } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
