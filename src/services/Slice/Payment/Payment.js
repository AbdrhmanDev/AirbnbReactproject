import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;
var token =localStorage.getItem('token');

const PaymentFirst = async (id) => {
    try {
        
        const response = await axios.post(
            `${API_KEY}/payments/create-paypal-payment`,
            { bookingId: id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        console.log("Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Payment creation error:', error);
        const message = error?.response?.data?.message || error.message || 'Unknown error';
        throw new Error(message);
    }
}

export const PaymentFirstThunk = createAsyncThunk(
    'PaymentFirst/getById',
    async (id, { rejectWithValue }) => {
        try {
            return await PaymentFirst(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const PaymentFirstSlice = createSlice({
    name: "PaymentFirst",
    initialState: {
        Payment: [],
        isLoading: false,
        isError: false,
        errorMessage: ''
    },
    reducers: {
        resetPayment: (state) => {
            state.Payment = null;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(PaymentFirstThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(PaymentFirstThunk.fulfilled, (state, action) => {
                state.Payment = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(PaymentFirstThunk.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'Failed to create payment';
            });
    },
});

export const { resetPayment } = PaymentFirstSlice.actions;
export default PaymentFirstSlice;