import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API;

export const LoginWithEmailThunk = createAsyncThunk(
  "LoginWithEmail",
  async ({  email ,password}, thunkAPI) => {
    try {
      const {data}  = await axios.post(`${API_KEY}/users/login`,
         { email,password },
        );
      return  {
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data||"error server LoginWithEmail");
    }
  }
);

const LoginWithEmailSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
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
      .addCase(LoginWithEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginWithEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(LoginWithEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  }
});

export const { logout } = LoginWithEmailSlice.actions;
export default LoginWithEmailSlice;
