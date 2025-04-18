const API_KEY = import.meta.env.VITE_API;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GetAllFilter = async (Filter) => {
    try {
        const response = await axios.get(
            `${API_KEY}/Hotel/flitter`,
            { params: Filter } 
        );
        console.log(response.data.data);
        
        return response.data.data;
    } catch (error) {
        console.error("Error fetching HotelFilter :", error.response?.data || error.message);
        throw error;
    }
}

export const GetAllFilterThunk = createAsyncThunk('Hotel/GetAllFilter',GetAllFilter);
const GetAllFilterSlice = createSlice({
    name: "GetAllFilter",
    initialState: {
        AllFilter: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllFilterThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAllFilterThunk.fulfilled, (state, action) => {
                console.log("reduser",action.payload);
                
                state.AllFilter = action.payload;
                state.isLoading = false;
            })
            .addCase(GetAllFilterThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.error?.message || 'حدث خطأ ما';
            });
    },
});
export default GetAllFilterSlice ;