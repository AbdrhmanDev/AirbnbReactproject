const API_KEY = import.meta.env.VITE_API;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GetHotelById = async (id) => {
    try {
       const response = await axios.get(
            `${API_KEY}/Hotel/${id}`,
        );
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching Hotel:", error.response?.data || error.message);
        throw error;
    }
}

export const GetHotelByIdThunk= createAsyncThunk('Hotel/getById',GetHotelById);
const GetHotelByIdSlice = createSlice({
    name: "GetHotel",
    initialState: {
        getById: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetHotelByIdThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetHotelByIdThunk.fulfilled, (state, action) => {
                state.getById = action.payload;
                state.isLoading = false;
            })
            .addCase(GetHotelByIdThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.error?.message || 'حدث خطأ ما';
            });
    },
});
export default GetHotelByIdSlice ;