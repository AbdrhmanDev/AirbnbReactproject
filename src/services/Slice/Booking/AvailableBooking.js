import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

const BookingAvailableHotel = async (startDate,endDate,propertyId) => {
    try {
        const response = await axios.get(`${API_KEY}/Bookings/properties/available-range`, {
            params: { startDate, endDate, propertyId },
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          });
          console.log(response.data);
          
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.message || error.message || 'Unknown error';
        throw new Error(message);
    }
}

export const BookingAvailableThunk = createAsyncThunk(
    'AvailableBooking/getById',
    async ({ startDate, endDate, propertyId }, thunkAPI) => {
      try {
        return await BookingAvailableHotel(startDate, endDate, propertyId);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

const AvailableBookingSlice = createSlice({
    name: "AvailableBooking",
    initialState: {
        Available: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(BookingAvailableThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(BookingAvailableThunk.fulfilled, (state, action) => {
                state.Available = action.payload;
                state.isLoading = false;
            })
            .addCase(BookingAvailableThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default AvailableBookingSlice ;