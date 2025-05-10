import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;

const token =localStorage.getItem('token');

const FetchProfile = async () => {
    const API_TOKEN = localStorage.getItem("token")
    let response;
    try {
        response = await axios.get(`${API_KEY}/users/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Profile fetch error:", error.response?.data || error.message);
        throw new Error("Place try again")
    }
    console.log("Authenticated user:", response);
    return response.data;
}

export const fetchProfileThunk = createAsyncThunk('FetchProfile', FetchProfile)

const ProfileSlice = createSlice({
    name: "FetchProfile",
    initialState: {
        profile: [],
        isLoading: true,
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileThunk.fulfilled, (states, action) => {
            states.profile= action.payload;
            states.isLoading = false
            states.isError = false;
        })
        builder.addCase(fetchProfileThunk.rejected, (states, action) => {
            states.isError = true;
            states.isLoading = false;
            states.errorMessage = action.error.message;
        })
        builder.addCase(fetchProfileThunk.pending, (states) => {
            states.isLoading = true;
            states.isError = false;
            states.errorMessage = null;
        })
    }
})

export default ProfileSlice;