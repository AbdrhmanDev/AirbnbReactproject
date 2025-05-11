const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem('token');

const GetUserTrip = async () => {
    let response;
    try {
        console.log(API_TOKEN);
        response = await axios.get(
            `${API_KEY}/bookings/user`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error.response?.data || error.message);
        throw error;
    }
}
const deleteUserTrip = async (paymentId) => {
    let response;
    console.log("Payment ID in delete:", paymentId);

    try {
        response = await axios.post(
            `${API_KEY}/payments/${paymentId}/cancel`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error c'ant delete trips", error.response?.data || error.message);
        throw error;
    }
}

const getPaymentId = async (bookingId) => {
    let response;
    console.log("Booking ID:", bookingId);

    try {
        response = await axios.get(
            `${API_KEY}/bookings/getPaymentIdByBookingId/${bookingId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error cant get BookingId:", error.response?.data || error.message);
        throw error;
    }
}

export const getUserTripThunk = createAsyncThunk('trip/get', GetUserTrip);
export const deleteUserTripThunk = createAsyncThunk('trip/delete', deleteUserTrip);
export const getPaymentIdThunk = createAsyncThunk('trip/getPaymentId', getPaymentId);
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