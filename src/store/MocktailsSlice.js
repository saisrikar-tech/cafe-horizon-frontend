import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchMocktails = createAsyncThunk(
  "mocktails/fetchMocktails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/mocktails");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch mocktails");
    }
  }
);

const mocktailsSlice = createSlice({
  name: "mocktails",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
    reducers: {
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMocktails.pending, (state) => {
        state.loading = true;
        state.error = null; // ← clears error when retry starts
      })
      .addCase(fetchMocktails.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchMocktails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { clearError } = mocktailsSlice.actions; // ← export it
export default mocktailsSlice.reducer;
