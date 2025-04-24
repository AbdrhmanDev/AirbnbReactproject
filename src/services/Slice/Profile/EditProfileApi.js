import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;
const FetchProfileEdit = async (id) => {
    const isLogin= localStorage.getItem('authToken')

    let response;
    try {
        response = await axios.get(`${API_KEY}/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${isLogin}`
            }
        });
    } catch (error) {
        console.log("fetch Edit Profile is Error",error);
        
        throw error("Place try again")
    }
    console.log(response.data);
    
    return response.data;
}

export const fetchProfileEditThunk = createAsyncThunk('FetchProfileEdit', FetchProfileEdit)

const ProfileEditSlice = createSlice({
    name: "FetchProfileEdit",
    initialState: {
        edit: [],
        isLoading: true,
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileEditThunk.fulfilled, (states, action) => {
            states.edit= action.payload;
            states.isLoading = false
            states.isError = false;
        })
        builder.addCase(fetchProfileEditThunk.rejected, (states, action) => {
            states.isError = true;
            states.isLoading = false;
            states.errorMessage = action.error.message;
        })
        builder.addCase(fetchProfileEditThunk.pending, (states) => {
            states.isLoading = true;
            states.isError = false;
            states.errorMessage = null;
        })

    }
})

export default ProfileEditSlice;