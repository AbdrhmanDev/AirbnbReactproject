const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const GetWishlist = async () => {
    const token = localStorage.getItem("token");
    try {
       const response = await axios.get(
            `${API_KEY}/users/wishlist`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data.wishlist;
    } catch (error) {
        console.error("Error fetching wishlist:", error.response?.data || error.message);
        throw error;
    }   
}
export const getwishlistThunk= createAsyncThunk('wishlist/get', GetWishlist);
const GetWishlistSlice = createSlice({
    name: "GetWishlist",
    initialState: {
        get: [],
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(getwishlistThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getwishlistThunk.fulfilled, (state, action) => {
                state.get = action.payload;
                state.isLoading = false;
            })
            .addCase(getwishlistThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.error?.message || 'حدث خطأ ما';
            });
    },
});
export default GetWishlistSlice;