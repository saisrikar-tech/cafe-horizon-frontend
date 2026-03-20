import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchAppetizers = createAsyncThunk(
  "appetizers/fetchAppetizers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appetizers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch appetizers");
    }
  }
);

const appetizersSlice = createSlice({
  name: "appetizers",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
    reducers: {
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppetizers.pending, (state) => {
        state.loading = true;
        state.error = null; // ← clears error when retry starts
      })
      .addCase(fetchAppetizers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAppetizers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { clearError } = appetizersSlice.actions; // ← export it
export default appetizersSlice.reducer;
