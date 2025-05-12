import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

var token =localStorage.getItem('token');

const ExecutePayment = async ({ paymentId, orderId }) => {
    try {
       const response = await axios.post(`${API_KEY}/payments/execute-paypal-payment`,
        {
            paymentId,
            orderId
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

export const PaymentExecuteThunk = createAsyncThunk('ExecutePayment/execute', ExecutePayment);

const ExecutePaymentSlice = createSlice({
    name: "ExecutePayment",
    initialState: {
        ExecutePayment: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(PaymentExecuteThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(PaymentExecuteThunk.fulfilled, (state, action) => {
                state.ExecutePayment = action.payload;
                state.isLoading = false;
            })
            .addCase(PaymentExecuteThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default ExecutePaymentSlice;