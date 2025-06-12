import { Reviews } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = import.meta.env.VITE_API;


const AddReviews = async ({bookingId, HotelId, rating, comment}) => {

    try {
        var token = localStorage.getItem("token");
        const response = await axios.post(
            `${API_KEY}/reviews`,
            {
                bookingId,
                HotelId,
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
        console.log("Response:reviwe", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding to Reviews:", error.response?.data || error.message);
        throw error;
    }
};

export const AddReviewsThunk = createAsyncThunk('ReviewsPost', AddReviews);

const ReviewsSlice = createSlice({
    name: "ReviewsPost",
    initialState: {
        Reviews: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddReviewsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddReviewsThunk.fulfilled, (state, action) => {
                state.Reviews = action.payload;
                state.isLoading = false;
            })
            .addCase(AddReviewsThunk.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default ReviewsSlice;
