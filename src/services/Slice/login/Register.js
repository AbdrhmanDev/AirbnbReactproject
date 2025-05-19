import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

const registerFun = async ({name,email,dateOfBirth,phone,password},{ rejectWithValue }) => {
    try {
       const response = await axios.post(`${API_KEY}/users/register`,
        {
            phone,
            email, 
            name,
            dateOfBirth,
            password
        },
        {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }}
            );
            console.log(response);
            
        return response.data;
    } catch (error) {
        const message = error?.response?.data  || 'Unknown error';
        return rejectWithValue(message);
    }
}

export const registerThunk = createAsyncThunk('LoginPhone',registerFun)

const RegisterSlice = createSlice({
    name: "LoginPhone",
    initialState: {
        register:[],
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.register = action.payload;
                state.isLoading = false;
            })
            .addCase (registerThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default RegisterSlice ;