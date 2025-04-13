import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const FetchAllHotel = async () => {
   let response;
    try {
     response = await axios.get('http://localhost:3000/Hotel',{
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
export const fetchAllHotelAsync = createAsyncThunk('FetchAllHotel', FetchAllHotel)

const AllHotelSlice = createSlice({
    name: "FetchAllHotel",
    initialState: {
        items: [],
        isLoading: true,
        isError: false,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllHotelAsync.fulfilled,(states,action)=>{
            states.items=action.payload,
            states.isLoading=false
        })
        builder.addCase(fetchAllHotelAsync.rejected,(states)=>{
            states.isError=true,
            states.isLoading=false
        })
        builder.addCase(fetchAllHotelAsync.pending,(states)=>{
            states.isLoading=true
        })

    }
})

export default AllHotelSlice;