import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;

const ExecutePayment = async (bookingId,orderId) => {
    
    try {
       const response = await axios.post(`${API_KEY}/payments/execute-paypal-payment`,
        {
            bookingId:bookingId,
            orderId:orderId
        },
        {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
        }}
            );
        
        return response;
    } catch (error) {
        const message = error?.response?.data?.message || error.message || 'Unknown error';
        console.log(error,message);
        
    }
}

export const PaymentFirstThunk= createAsyncThunk('ExecutePayment/getById',ExecutePayment);

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
            .addCase(PaymentFirstThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(PaymentFirstThunk.fulfilled, (state, action) => {
                state.ExecutePayment = action.payload;
                state.isLoading = false;
            })
            .addCase(PaymentFirstThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default ExecutePaymentSlice ;