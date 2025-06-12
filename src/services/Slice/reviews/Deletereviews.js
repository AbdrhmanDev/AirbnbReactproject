import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = import.meta.env.VITE_API;
const DeleteReviews = async (id) => {

    try {
        var token = localStorage.getItem("token");
        const response = await axios.delete(
            `${API_KEY}/reviews/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        console.log("Response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding to ReviewsDelete:", error.response?.data || error.message);
        throw error;
    }
};

export const DeleteReviewsThunk = createAsyncThunk('ReviewsDelete', DeleteReviews);

const DeleteReviewsSlice = createSlice({
    name: "ReviewsDelete",
    initialState: {
        ReviewsDelete: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(DeleteReviewsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteReviewsThunk.fulfilled, (state, action) => {
                state.ReviewsDelete = action.payload;
                state.isLoading = false;
            })
            .addCase(DeleteReviewsThunk.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default DeleteReviewsSlice;
