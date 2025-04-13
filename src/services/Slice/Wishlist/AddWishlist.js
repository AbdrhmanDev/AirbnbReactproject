import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;

// دالة API للإضافة للمفضلة
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
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2Y3NzgxYmFiZjRjN2YyMWEyOTk3YSIsImlhdCI6MTc0NDU3NzAxNCwiZXhwIjoxNzQ0NTgwNjE0fQ.-fO8KaUZPtAyvFMK4xmSsMOO-Fg0o2qK2Z9t4RimQ3k` // حط التوكن الحقيقي هنا
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist:", error.response?.data || error.message);
        throw error;
    }
};

// Thunk
export const addwishlistPost = createAsyncThunk('wishlist/add', AddWishlist);

// Slice
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

export default AddWishlistSlice.reducer;
