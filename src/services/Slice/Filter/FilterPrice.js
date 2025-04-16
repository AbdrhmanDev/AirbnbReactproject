import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;

// Async Thunk - بياخد min و max كـ payload
export const FilterThank = createAsyncThunk(
  'FilterPrice',
  async ( {min, max} , thunkAPI) => {
    try {
        console.log(min,max);
        
      const response = await axios.post(
        `${API_KEY}/Hotel/search/price`,
        {
          minPrice: min,
          maxPrice: max,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN?.trim()}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Error Fetch Filter By Price:", error);
      return thunkAPI.rejectWithValue("Try again, use filter not fetch");
    }
  }
);


const FilterSlice = createSlice({
  name: "FilterPrice",
  initialState: {
    Filter: [],
    isLoading: false,
    isError: false,
    errorMessage: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(FilterThank.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(FilterThank.fulfilled, (state, action) => {
        state.Filter = action.payload;
        state.isLoading = false;
      })
      .addCase(FilterThank.rejected, (state,action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      
  },
});

export default FilterSlice.reducer; 
