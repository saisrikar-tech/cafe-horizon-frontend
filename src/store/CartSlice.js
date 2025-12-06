import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return;
      if (item.quantity === 1) state.items = state.items.filter((i) => i.id !== action.payload.id);
      else item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeCartItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
