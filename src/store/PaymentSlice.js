import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// ================= CREATE ORDER =================
export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async (amount, { rejectWithValue }) => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/v1/products/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await response.json();

      return data;

    } catch (error) {

      return rejectWithValue(error.message);

    }
  }
);


// ================= VERIFY PAYMENT =================
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/v1/products/verify-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await response.json();

      return data;

    } catch (error) {

      return rejectWithValue(error.message);

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