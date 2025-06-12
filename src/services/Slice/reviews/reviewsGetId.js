import { Reviews } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = import.meta.env.VITE_API;
const GetByIdReviews = async (id) => {

    try {
        var token = localStorage.getItem("token");
        const response = await axios.get(
            `${API_KEY}/reviews/bookings/${id}`,
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
        console.error("Error adding to Reviews:", error.response?.data || error.message);
        throw error;
    }
};

export const GetByIdThunk = createAsyncThunk('ReviewsGetId', GetByIdReviews);

const ReviewsGetIdSlice = createSlice({
    name: "ReviewsGetId",
    initialState: {
        ReviewsId: [],
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetByIdThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetByIdThunk.fulfilled, (state, action) => {
                state.ReviewsId = action.payload;
                state.isLoading = false;
            })
            .addCase(GetByIdThunk.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    },
});

export default ReviewsGetIdSlice;
