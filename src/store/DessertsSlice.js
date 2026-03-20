import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchDesserts = createAsyncThunk(
  "desserts/fetchDesserts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/desserts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch desserts");
    }
  }
);

const dessertsSlice = createSlice({
  name: "desserts",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
    reducers: {
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesserts.pending, (state) => {
        state.loading = true;
        state.error = null; // ← clears error when retry starts
      })
      .addCase(fetchDesserts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchDesserts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { clearError } = dessertsSlice.actions; // ← export it
export default dessertsSlice.reducer;
