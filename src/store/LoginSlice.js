// src/store/LoginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

// ------------------ LOGIN THUNK ------------------
export const loginUser = createAsyncThunk(
  "userLogin/loginUser",
  async (formData, thunkAPI) => {
    try {
      console.log("Sending to API:", formData);

      const response = await api.post("/login", formData);
      console.log("API Response:", response.data);

      const { user, token, message } = response.data;

      // Save token & user
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      return { user, token, message };
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const userFromStorage = JSON.parse(sessionStorage.getItem("user"));
const tokenFromStorage = sessionStorage.getItem("token");

const loginSlice = createSlice({
  name: "userLogin",
  initialState: {
    user: userFromStorage || null,
    token: tokenFromStorage || null,
    loading: false,
    error: null,
    isLoggedIn: !!tokenFromStorage,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    clearLoginError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearLoginError } = loginSlice.actions;
export default loginSlice.reducer;
