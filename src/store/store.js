import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import couponReducer from "./CouponSlice";
import ordersReducer from "./OrderPlaceSlice";
import ordersListReducer from "./OrdersSlice";
import shakesReducer from "./ShakesSlice"; 
import registerReducer from "./RegisterSlice"; 
import userLoginReducer from "./LoginSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    coupon: couponReducer,
    shakes: shakesReducer,
    orders: ordersReducer,
    ordersList: ordersListReducer,
    register: registerReducer,
    userLogin: userLoginReducer
  }
});

export default store;
