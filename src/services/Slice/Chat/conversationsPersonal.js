import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

var token =localStorage.getItem('token');

const conversationsPersonal = async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_KEY}/chat/conversations`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.data?.data) {
        return thunkAPI.rejectWithValue("No conversations found");
      }
    
      return response.data.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.statusText ||
        error.message ||
        'Unknown error';
      return thunkAPI.rejectWithValue(message);
    }
  };
  

export const conversationsPersonalThunk= createAsyncThunk('conversationsPersonal/get',conversationsPersonal);

const conversationsPersonalSlice = createSlice({
    name: "conversationsPersonal",
    initialState: {
        conversationPersonal: [],
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(conversationsPersonalThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(conversationsPersonalThunk.fulfilled, (state, action) => { 
                state.conversationPersonal = action.payload;
                state.isLoading = false;
            })
            .addCase(conversationsPersonalThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default conversationsPersonalSlice;