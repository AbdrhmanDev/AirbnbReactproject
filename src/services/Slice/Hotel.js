import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const FetchAllHotel = async () => {
    let response;
    try {
        response = await axios.get('http://localhost:3000/Hotel', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }

    return response.data;
}
const FetchCategoryHotels = async (CategoryId) => {
    let response;
    try {
        response = await axios.post(
            'http://localhost:3000/Hotel/search/category',
            {
                id: CategoryId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
    console.log("category Hotels: ", response.data);

    return response.data;
};
export const fetchAllHotelAsync = createAsyncThunk('FetchAllHotel', FetchAllHotel)
export const FetchCategoryHotelsAsync = createAsyncThunk('FetchCategoryHotels', FetchCategoryHotels)

const AllHotelSlice = createSlice({
    name: "FetchAllHotel",
    initialState: {
        items: [], // All hotels
        filteredHotels: [], // Filtered hotels based on category
        isLoading: true,
        isError: false,
    },
    extraReducers: (builder) => {
        // Fetch All Hotels
        builder.addCase(fetchAllHotelAsync.fulfilled, (states, action) => {
            states.items = action.payload,
                states.isLoading = false
        })
        builder.addCase(fetchAllHotelAsync.rejected, (states) => {
            states.isError = true,
                states.isLoading = false
        })
        builder.addCase(fetchAllHotelAsync.pending, (states) => {
            states.isLoading = true
        })
        // Fetch Category Hotels
        builder.addCase(FetchCategoryHotelsAsync.fulfilled, (states, action) => {
            states.filteredHotels = action.payload;
            states.isLoading = false
        })
        builder.addCase(FetchCategoryHotelsAsync.rejected, (states) => {
            states.isError = true,
                states.isLoading = false
        })
        builder.addCase(FetchCategoryHotelsAsync.pending, (states) => {
            states.isLoading = true
        })

    }
})

export default AllHotelSlice;