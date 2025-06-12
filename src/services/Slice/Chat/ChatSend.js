import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;


const SendMessage = async ( {receiverId, content},{ rejectWithValue }) => {
    // console.log(receiverId);
    // console.log(content)
    
    try {
        var token =localStorage.getItem('token');
       const response = await axios.post(`${API_KEY}/chat/messages`,
        {
          receiverId, content
        },
        {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
            );
        return response.data;
    } catch (error) {
        const message = error?.response || error.message || 'Unknown error';
        return rejectWithValue(message);
    }
}

export const sendMessageThunk= createAsyncThunk('message',SendMessage);

const SendMessageSlice = createSlice({
    name: "message",
    initialState: {
        send: [],
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageThunk.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = '';
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.send = action.payload;
                state.isLoading = false;
            })
            .addCase(sendMessageThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload || 'data is not found'; 
            });
    },
});
export default SendMessageSlice;