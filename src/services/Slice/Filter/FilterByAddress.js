import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;

export const FilterAddressThank = createAsyncThunk(
  'FilterAddress',
  async ({ country }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_KEY}/Hotel/search/address`,
        {
          address: { country }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);



const FilterAddressSlice   = createSlice({
  name: 'FilterAddress',
  initialState: {
    FilterAddress: [], // ✅ Use the same name here
    isLoading: false,
    isError: false,
    errorMessage: null
  },
  reducers: {
    clearFilterAddress: (state) => {
      state.FilterAddress = [];
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FilterAddressThank.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(FilterAddressThank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FilterAddress = action.payload.hotels;
      })
      .addCase(FilterAddressThank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || "Something went wrong";


      });
  },
});


export const { clearFilterAddress } = FilterAddressSlice.actions;
export default FilterAddressSlice;
