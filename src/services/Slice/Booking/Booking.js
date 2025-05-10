import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

const token =localStorage.getItem('token');

const BookingTheHotel = async (BookingData,{ rejectWithValue }) => {
    try {
       const response = await axios.post(`${API_KEY}/bookings`,
        BookingData,
        {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
            );
        
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.message || error.message || 'Unknown error';
        return rejectWithValue(message);
    }
}

export const BookingThunk= createAsyncThunk('Booking/getById',BookingTheHotel);

const BookingHotelSlice = createSlice({
    name: "Booking",
    initialState: {
        booking: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(BookingThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(BookingThunk.fulfilled, (state, action) => {
                state.booking = action.payload;
                state.isLoading = false;
            })
            .addCase(BookingThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default BookingHotelSlice ;