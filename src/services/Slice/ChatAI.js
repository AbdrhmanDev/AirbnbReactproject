const API_KEY = import.meta.env.VITE_API;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ChatAI = async (message) => {
    try {
       const response = await axios.post(
            `${API_KEY}/chat/chatbot`,{
                message
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error Chat Ai", error.response?.data || error.message);
        throw error;
    }
}

export const ChatAiThunk= createAsyncThunk('chatAi',ChatAI);

const ChatAiSlice = createSlice({
    name: "ChatAi",
    initialState: {
        chatAi: null,
        isLoading: false,
        isError: false,
        errorMessage:''
    },
    extraReducers: (builder) => {
        builder
            .addCase(ChatAiThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ChatAiThunk.fulfilled, (state, action) => {
                state.chatAi = action.payload;
                state.isLoading = false;
            })
            .addCase(ChatAiThunk.rejected, (state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.error?.message || 'حدث خطأ ما';
            });
    },
});
export default ChatAiSlice ;