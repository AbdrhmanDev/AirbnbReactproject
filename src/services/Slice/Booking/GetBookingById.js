    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";
    const API_KEY = import.meta.env.VITE_API;
    var token =localStorage.getItem('token');

    const GetBookingById = async (id,{ rejectWithValue }) => {
        try {
        const response = await axios.get(`${API_KEY}/bookings/${id}`,
           { headers: 
               { 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`}}
            
                );
            return response.data;
        } catch (error) {
            const message = error?.response || error.message || 'Unknown error';
            return rejectWithValue(message);
        }
    }

    export const BookingByIdThunk= createAsyncThunk('BookingBYID',GetBookingById);

    const BookingBtIdSlice = createSlice({
        name: "BookingBYID",
        initialState: {
            bookingById:[],
            isLoading: false,
            isError: false,
            errorMessage:''
        },
        extraReducers: (builder) => {
            builder
                .addCase(BookingByIdThunk.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                    state.errorMessage = '';
                })
                .addCase(BookingByIdThunk.fulfilled, (state, action) => {
                    state.bookingById = action.payload;
                    state.isLoading = false;
                })
                .addCase(BookingByIdThunk.rejected, (state,action) => {
                    state.isError = true;
                    state.isLoading = false;
                    state.errorMessage = action.payload || 'data is not found'; 
                });
        },
    });
    export default BookingBtIdSlice ;