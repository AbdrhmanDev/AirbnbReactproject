import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

var token = localStorage.getItem('token');

const conversationsGet = async (id, { rejectWithValue }) => {    
    if (!id) return rejectWithValue('No ID provided');

    try {
        // console.log('Making API call to:', `${API_KEY}/chat/conversations/${id}`);
        const response = await axios.get(`${API_KEY}/chat/conversations/${id}`, {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        const message = error?.response?.data?.message || error?.message || 'Unknown error';
        return rejectWithValue(message);
    }
}

export const conversationsHostAndUserThunk = createAsyncThunk(
    'conversations/get',
    conversationsGet
);

const conversationsSlice = createSlice({
    name: "conversations/get",
    initialState: {
        conversation: [],
        isLoading: false,
        isError: false,
        errorMessage: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(conversationsHostAndUserThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(conversationsHostAndUserThunk.fulfilled, (state, action) => {
                state.conversation = action.payload;
                state.isLoading = false;
            })
            .addCase(conversationsHostAndUserThunk.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});

export default conversationsSlice;