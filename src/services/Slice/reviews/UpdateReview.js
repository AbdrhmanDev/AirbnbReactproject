import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = import.meta.env.VITE_API;
const updateReviews = async ({id,rating, comment}) => {
    console.log(id,rating,comment);
    
    try {
        var token = localStorage.getItem("token");
        const response = await axios.patch(
            `${API_KEY}/reviews/${id}`,
            {
                rating,
                comment
            },
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
        console.error("Error adding to ReviewsUpdate:", error.response?.data || error.message);
        throw error;
    }
};

export const updateReviewsThunk = createAsyncThunk('ReviewsUpdate', updateReviews);

const updateReviewsSlice = createSlice({
    name: "ReviewsUpdate",
    initialState: {
        ReviewsUpdate: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateReviewsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReviewsThunk.fulfilled, (state, action) => {
                state.ReviewsUpdate = action.payload;
                state.isLoading = false;
            })
            .addCase(updateReviewsThunk.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default updateReviewsSlice;
