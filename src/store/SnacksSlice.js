import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchSnacks = createAsyncThunk(
  "snacks/fetchSnacks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/snacks");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch snacks");
    }
  }
);

const snacksSlice = createSlice({
  name: "snacks",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnacks.pending, (state) => { state.loading = true; })
      .addCase(fetchSnacks.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchSnacks.rejected, (state, action) => { state.error = action.payload; state.loading = false; });
  }
});

export default snacksSlice.reducer;
