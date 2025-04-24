import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;
const FetchProfileEdit = async (username,formData) => {
    const isLogin= localStorage.getItem('authToken')
    console.log(formData);
    
    let response;
    try {
        response = await axios.patch(`${API_KEY}/users/${formData}`, 
            {username:username},
            {headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${isLogin}`
            },}
        );
    } catch (error) {
        console.log("fetch Edit Profile is Error",error);
        
        throw new error("Place try again")
    }
    console.log(response.data);
    
    return response.data;
}

export const ProfileEditThunk = createAsyncThunk('FetchProfileEdit', FetchProfileEdit)

const ProfileEditSlice = createSlice({
    name: "FetchProfileEdit",
    initialState: {
        edit: [],
        isLoading: true,
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(ProfileEditThunk.fulfilled, (states, action) => {
            states.edit= action.payload;
            states.isLoading = false
            states.isError = false;
        })
        builder.addCase(ProfileEditThunk.rejected, (states, action) => {
            states.isError = true;
            states.isLoading = false;
            states.errorMessage = action.error.message;
        })
        builder.addCase(ProfileEditThunk.pending, (states) => {
            states.isLoading = true;
            states.isError = false;
            states.errorMessage = null;
        })

    }
})

export default ProfileEditSlice;