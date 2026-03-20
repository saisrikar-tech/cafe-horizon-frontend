import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";


// ================= CREATE ORDER =================
export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async (amount, { rejectWithValue }) => {
    try {

      const response = await api.post("/create-payment", { amount });
      return response.data;

    } catch (error) {

      return rejectWithValue(error.response?.data || "Payment failed");
    }
  }
);


// ================= VERIFY PAYMENT =================
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {

      const response = await api.post("/verify-payment", paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Verification failed");
    
    }
  }
);


const paymentSlice = createSlice({
  name: "payment",

  initialState: {
    order: null,
    loading: false,
    error: null,
    verified: false,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // CREATE ORDER
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // VERIFY PAYMENT
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = action.payload.success;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default paymentSlice.reducer;