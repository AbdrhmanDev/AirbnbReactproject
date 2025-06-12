import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

var token =localStorage.getItem('token');

const CancelPayment = async ({ paymentId }) => {
    try {
       const response = await axios.post(`${API_KEY}/payments/execute-paypal-payment`,
        {
            paymentId,
        },
        {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
            );
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.message || error.message || 'Unknown error';
        console.log(error,message);
        throw error;
    }
}

export const PaymentCancelThunk = createAsyncThunk('CancelPayment/execute', CancelPayment);

const CancelPaymentSlice = createSlice({
    name: "CancelPayment",
    initialState: {
        CancelPayment: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(PaymentCancelThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(PaymentCancelThunk.fulfilled, (state, action) => {
                state.CancelPayment = action.payload;
                state.isLoading = false;
            })
            .addCase(PaymentCancelThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default CancelPaymentSlice;