import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;

const AddWishlist = async (id) => {

    if (!id) throw new Error("hotelId is required");

    try {
        const response = await axios.post(
            `${API_KEY}/users/wishlist`,
            { hotelId: id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            }
        );
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist:", error.response?.data || error.message);
        throw error;
    }
};

export const addwishlistPost = createAsyncThunk('wishlist/add', AddWishlist);

const AddWishlistSlice = createSlice({
    name: "WishlistPost",
    initialState: {
        add: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addwishlistPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addwishlistPost.fulfilled, (state, action) => {
                state.add = action.payload;
                state.isLoading = false;
            })
            .addCase(addwishlistPost.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default AddWishlistSlice;
