import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./Api";

// Async thunk to fetch shake products
export const fetchShakeProducts = createAsyncThunk(
  "shakes/fetchShakeProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/shakes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch shakes");
    }
  }
);

const shakesSlice = createSlice({
  name: "shakes",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    // Optional: You can add local reducers here if needed later
  },
    reducers: {
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShakeProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // ← clears error when retry starts 
      })
      .addCase(fetchShakeProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchShakeProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { clearError } = shakesSlice.actions; // ← export it
export default shakesSlice.reducer;
