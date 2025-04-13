import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const FetchCategory = async () => {
   let response;
    try {
     response = await axios.get('http://localhost:3000/category',{
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
export const fetchCategoryAsync = createAsyncThunk('FetchCategory', FetchCategory)

const CategorySlice = createSlice({
    name: "GetCategory",
    initialState: {
        items: [],
        isLoading: true,
        isError: false,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategoryAsync.fulfilled,(states,action)=>{
            states.items=action.payload,
            states.isLoading=false
        })
        builder.addCase(fetchCategoryAsync.rejected,(states)=>{
            states.isError=true,
            states.isLoading=false
        })
        builder.addCase(fetchCategoryAsync.pending,(states)=>{
            states.isLoading=true
        })

    }
})

export default CategorySlice;