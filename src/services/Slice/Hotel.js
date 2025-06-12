import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var API_KEY = import.meta.env.VITE_API;
const FetchAllHotel = async () => {
    let response;
    try {
        response = await axios.get(`${API_KEY}/hotel`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    } catch (error) {
        throw error("Place try again")
    }
    return response.data;
}
const FetchCategoryHotels = async (CategoryId) => {
    let response;
    try {
        response = await axios.post(
            `${API_KEY}/hotel/search/category`,
            CategoryId ? { id: CategoryId } : {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("No hotels available in this category");
        } else if (error.response && error.response.status === 400) {
            throw new Error("Invalid Category ID");
        } else {
            throw new Error("An error occurred while fetching hotels");
        }
    }
    console.log("category Hotels: ", response.data);
    return response.data;
};
export const fetchAllHotelAsync = createAsyncThunk('FetchAllHotel', FetchAllHotel)
export const FetchCategoryHotelsAsync = createAsyncThunk('FetchCategoryHotels', FetchCategoryHotels)

const AllHotelSlice = createSlice({
    name: "FetchAllHotel",
    initialState: {
        allHotels: [], // All hotels
        filteredHotels: [], // Filtered hotels based on category
        isLoading: true,
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        // Fetch All Hotels
        builder.addCase(fetchAllHotelAsync.fulfilled, (states, action) => {
            states.allHotels = action.payload;
            states.isLoading = false
            states.isError = false;
        })
        builder.addCase(fetchAllHotelAsync.rejected, (states, action) => {
            states.isError = true;
            states.isLoading = false;
            states.errorMessage = action.error.message;
        })
        builder.addCase(fetchAllHotelAsync.pending, (states) => {
            states.isLoading = true;
            states.isError = false;
            states.errorMessage = null;
        })
        // Fetch Category Hotels
        builder.addCase(FetchCategoryHotelsAsync.fulfilled, (states, action) => {
            states.filteredHotels = action.payload;
            states.isLoading = false
            states.isError = false;
        })
        builder.addCase(FetchCategoryHotelsAsync.rejected, (states, action) => {
            states.isError = true;
            states.isLoading = false;
            states.errorMessage = action.error.message;
        })
        builder.addCase(FetchCategoryHotelsAsync.pending, (states) => {
            states.isLoading = true;
            states.isError = false;
            states.errorMessage = null;
        })
    }
})

export default AllHotelSlice;