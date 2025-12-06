import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./Api";

export const fetchOrders = createAsyncThunk(
  "ordersList/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/orders");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching orders");
    }
  }
);

const ordersSlice = createSlice({
  name: "ordersList",
  initialState: { orders: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.orders = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.error = action.payload; });
  }
});

export default ordersSlice.reducer;
