import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const API_KEY = import.meta.env.VITE_API;

export const GetAllFilterThunk = createAsyncThunk(
  'Hotel/GetAllFilter',
  async (filterData) => {
    try {
      const response = await axios.get(`${API_KEY}/Hotel/flitter`, {
        params: filterData
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching HotelFilter:", error.response?.data || error.message);
      throw error;
    }
  }
);


const GetAllFilterSlice = createSlice({
  name: "GetAllFilter",
  initialState: {
    AllFilter: null,
    isLoading: false,
    isError: false,
    errorMessage: ''
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllFilterThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(GetAllFilterThunk.fulfilled, (state, action) => {
        state.AllFilter = action.payload;
        state.isLoading = false;
      })
      .addCase(GetAllFilterThunk.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message || "No hotels found matching the criteria";
      });
  },
});

export default GetAllFilterSlice;
