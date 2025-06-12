import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

var token =localStorage.getItem('token');

const verifyOtp = async ({phone,otp},{ rejectWithValue }) => {
    console.log(phone); 
        console.log(otp);
    try {
       const response = await axios.post(`${API_KEY}/users/verify-otp`,
        {
            phone,
            otp
        },
        {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
            );
            console.log(response);
            
        return response.data;
    } catch (error) {
        const message = error?.response?.data  || 'Unknown error';
        return rejectWithValue(message);
    }
}

export const verifyOtpThunk = createAsyncThunk('verifyOtp',verifyOtp);

const verifyOtpSlice = createSlice({
    name: "verifyOtp",
    initialState: {
        verifyOtp:'',
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOtpThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(verifyOtpThunk.fulfilled, (state, action) => {
                state.verifyOtp = action.payload;
                state.isLoading = false;
            })
            .addCase(verifyOtpThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default verifyOtpSlice ;