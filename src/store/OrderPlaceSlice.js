import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await api.post("/orders", orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to place order");
    }
  }
);

const orderPlaceSlice = createSlice({
  name: "orders",
  initialState: { loading: false, error: null, successMessage: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.loading = true; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.successMessage = action.payload; state.loading = false; })
      .addCase(placeOrder.rejected, (state, action) => { state.error = action.payload; state.loading = false; });
  }
});

export default orderPlaceSlice.reducer;
