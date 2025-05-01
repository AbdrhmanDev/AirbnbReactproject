import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (idToken, thunkAPI) => {
    try {
      const {data}  = await axios.post(`${API_KEY}/users/google`,
         { idToken },
        );
      return  {
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data||"error server");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token",action.payload.token);
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice;
