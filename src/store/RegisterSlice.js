import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./Api";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register",
        userData
      );
      
      // Handle backend-controlled failure (like duplicate email)
      if (response.data.success === false) {
        return rejectWithValue(response.data.message);
      }

      return response.data; // success case
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: null,
    user: null, // optional: store user data if returned
  },
  reducers: {
    clearRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Registration successful!";
        state.user = action.payload; // store user data if backend returns it
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { clearRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
