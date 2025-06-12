import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

var token =localStorage.getItem('token');

const LoginPhone = async (phone,{ rejectWithValue }) => {
    try {
       const response = await axios.post(`${API_KEY}/users/phone-signin`,
        {phone},
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

export const LoginPhoneThunk = createAsyncThunk('LoginPhone',LoginPhone);

const LoginPhoneSlice = createSlice({
    name: "LoginPhone",
    initialState: {
        Phone:'',
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginPhoneThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(LoginPhoneThunk.fulfilled, (state, action) => {
                state.Phone = action.payload;
                state.isLoading = false;
            })
            .addCase(LoginPhoneThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default LoginPhoneSlice ;