import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchSoups = createAsyncThunk(
  "soups/fetchSoups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/soups");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch soups");
    }
  }
);

const soupsSlice = createSlice({
  name: "soups",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSoups.pending, (state) => {
        state.loading = true;
        state.error = null; // ← clears error when retry starts
      })
      .addCase(fetchSoups.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchSoups.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearError } = soupsSlice.actions; // ← export it
export default soupsSlice.reducer;