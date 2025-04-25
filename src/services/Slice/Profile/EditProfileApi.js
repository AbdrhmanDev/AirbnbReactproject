import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API;
const ProfileEdit = async ({ id, username, avatar }) => {
    const isLogin = localStorage.getItem("authToken");
    console.log(id, username);
    console.log(avatar);
  
    let response;
    try {
        const data = {
            username: username,
            avatar: avatar
          };
  
      response = await axios.patch(`${API_KEY}/users/${id}`, data, {
        headers: {
          "Authorization": `Bearer ${isLogin}`,
          "Content-Type": "application/json"
        },
      });
    } catch (error) {
      console.log("Edit Profile is Error", error);
      throw new Error("Error while updating profile");
    }
  
    console.log(response.data);
    return response.data.user;
  };
  
export const ProfileEditThunk = createAsyncThunk('ProfileEdit', ProfileEdit)

const ProfileEditSlice = createSlice({
    name: "ProfileEdit",
    initialState: {
        edit:null,
        isLoading: true,
        isError: false,
        errorMessage: null
    },
    reducers: {
        updateProfile: (state, action) => {
            state.edit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ProfileEditThunk.fulfilled, (states, action) => {
            states.edit= action.payload;
            states.isLoading = false
            states.isError = false;
        })
        builder.addCase(ProfileEditThunk.rejected, (states, action) => {
            states.isError = true;
            states.isLoading = false;
            states.errorMessage = action.error.message;
        })
        builder.addCase(ProfileEditThunk.pending, (states) => {
            states.isLoading = true;
            states.isError = false;
            states.errorMessage = null;
        })

    }
})
export const { updateProfile } = ProfileEditSlice.actions;
export default ProfileEditSlice;