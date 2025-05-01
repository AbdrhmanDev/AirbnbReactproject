const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GetUserTrip = async () => {
    let response;
    try {
        console.log(API_TOKEN);
        response = await axios.get(
            `${API_KEY}/bookings/user`,
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error.response?.data || error.message);
        throw error;
    }
}
const deleteUserTrip = async (tripId) => {
    let response;
    try {
        response = await axios.delete(
            `${API_KEY}/bookings/${tripId}`,
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error.response?.data || error.message);
        throw error;
    }
}

export const getUserTripThunk = createAsyncThunk('trip/get', GetUserTrip);
export const deleteUserTripThunk = createAsyncThunk('trip/get', deleteUserTrip);

const GetUserTripSlice = createSlice({
    name: "GetUserTrip",
    initialState: {
        trip: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserTripThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserTripThunk.fulfilled, (state, action) => {
                state.trip = action.payload;
                state.isLoading = false;
            })
            .addCase(getUserTripThunk.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = "Error fetching trip data. Please try again later.";
            });
    },
});
export default GetUserTripSlice;