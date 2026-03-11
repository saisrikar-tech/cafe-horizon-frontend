import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchBreakfast = createAsyncThunk(
  "breakfast/fetchBreakfast",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/breakfast");
          return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch breakfast");
    }
  }
);

const breakfastSlice = createSlice({
  name: "breakfast",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreakfast.pending, (state) => { state.loading = true; })
      .addCase(fetchBreakfast.fulfilled, (state, action) => { state.items = action.payload; state.loading = false;
        console.log(action.payload);
       })
      .addCase(fetchBreakfast.rejected, (state, action) => { state.error = action.payload || "Something went wrong"; state.loading = false; });
  }
});

export default breakfastSlice.reducer;
