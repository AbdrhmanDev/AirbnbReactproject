import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

var token = localStorage.getItem('token');

export const ChangeBookingThunk = createAsyncThunk(
    'ChangeBooking',
    async ({ startDate, endDate, propertyId,bookingId }, thunkAPI) => {
      try {
        const response = await axios.patch(
          `${API_KEY}/bookings/${bookingId}/properties/${propertyId}/dates`,
          { startDate, endDate },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return response.data;
      } catch (error) {
        const message = error?.response?.data?.message || error.message || 'Unknown error';
        return thunkAPI.rejectWithValue(message); 
      }
    }
  );
  

const ChangeBookingSlice = createSlice({
    name: "ChangeBooking",
    initialState: {
        bookingChange: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(ChangeBookingThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(ChangeBookingThunk.fulfilled, (state, action) => {
                state.bookingChange = action.payload;
                state.isLoading = false;
            })
            .addCase(ChangeBookingThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default ChangeBookingSlice ;