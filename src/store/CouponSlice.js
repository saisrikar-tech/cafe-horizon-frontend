import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "./Coupons";

const initialState = {
  code: "",
  applied: false,
  discount: 0,
  message: ""
};
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();
      if (coupons[code]) {
        state.code = code;
        state.applied = true;
        state.discount = coupons[code];
        state.message = `Coupon ${code} applied! You got ${coupons[code]}% off.`;
      } else {
        state.code = code;
        state.message = "Invalid coupon code.";
      }
    },
    clearCoupon: (state) => {
      state.code = "";
      state.applied = false;
      state.discount = 0;
      state.message = "";
    }
  }
});

export const { applyCoupon, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
