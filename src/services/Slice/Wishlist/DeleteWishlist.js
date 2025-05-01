import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;
const DeleteWishlist = async (id) => {
    try {
        let response = await axios.delete(
            `${API_KEY}/users/wishlist`,
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                data: {
                    hotelId: id
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error to remove wishlist:", error.response?.data || error.message);
        throw error;
    }
};
export const DeleteWishlistThunk= createAsyncThunk('wishlist/Delete', DeleteWishlist)

const DeleteWishlistSlice = createSlice({
    name: "WishlistDelete",
    initialState: {
        delete: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteWishlistThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteWishlistThunk.fulfilled, (state, action) => {
                state.delete = action.payload;
                state.isLoading = false;
            })
            .addCase(DeleteWishlistThunk.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default DeleteWishlistSlice