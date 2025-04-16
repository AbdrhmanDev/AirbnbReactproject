import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;
const API_TOKEN = import.meta.env.VITE_TOKEN;

export const FilterAddressThank = createAsyncThunk(
  'FilterAddress',
  async ( {country}) => {
    console.log("Sending to backend:", {
      address: {
        country: country,
      }
    });

console.log("dd",country);


    const response = await axios.post(`http://localhost:3000/Hotel/search/address`,
      {
          "address": {
            "country": country
          }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      }
    );

console.log(response.data.hotels);


    return response.data.hotels;
  }
);


const FilterAddressSlice = createSlice({
  name: "FilterAddress",
  initialState: {
    FilterAddress: [],
    isLoading: false,
    isError: false,
    errorMessage: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(FilterAddressThank.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(FilterAddressThank.fulfilled, (state, action) => {
        console.log("ss ",action.payload);
        
        state.FilterAddress = action.payload;
        state.isLoading = false;
      })
      .addCase(FilterAddressThank.rejected, (state,action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.error.message
      })
      
  },
});

export default FilterAddressSlice; 
