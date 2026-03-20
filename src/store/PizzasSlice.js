import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/pizzas");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch pizzas");
    }
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
    reducers: {
    clearError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.error = null; // ← clears error when retry starts
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { clearError } = pizzasSlice.actions; // ← export it
export default pizzasSlice.reducer;
