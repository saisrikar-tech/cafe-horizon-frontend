import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchHotBeverages = createAsyncThunk(
  "hotBeverages/fetchHotBeverages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/hotbeverages");
      return response.data;
    } catch (error) {
  return rejectWithValue(
    error.response?.data?.message || error.response?.data || "Failed to fetch hot beverages"
  );
}
  }); 

const hotBeveragesSlice = createSlice({
  name: "hotBeverages",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
    reducers: {
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotBeverages.pending, (state) => {
        state.loading = true;
        state.error = null; // ← clears error when retry starts
      })
      .addCase(fetchHotBeverages.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchHotBeverages.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});
export const { clearError } = hotBeveragesSlice.actions;
export default hotBeveragesSlice.reducer;
