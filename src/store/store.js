import { configureStore } from "@reduxjs/toolkit";

import shakesReducer from "./ShakesSlice";
import hotBeveragesReducer from "./HotBeveragesSlice";
import breakfastReducer from "./BreakfastSlice";
import soupsReducer from "./SoupsSlice";
import appetizersReducer from "./AppetizersSlice";
import mocktailsReducer from "./MocktailsSlice";
import snacksReducer from "./SnacksSlice";
import pizzasReducer from "./PizzasSlice";
import pastasReducer from "./PastasSlice";
import dessertsReducer from "./DessertsSlice";

import cartReducer from "./CartSlice";
import couponReducer from "./CouponSlice";
import ordersReducer from "./OrderPlaceSlice";
import ordersListReducer from "./OrdersSlice";
import registerReducer from "./RegisterSlice";
import userLoginReducer from "./LoginSlice";

const store = configureStore({
  reducer: {
    shakes: shakesReducer,
    hotBeverages: hotBeveragesReducer,
    breakfast: breakfastReducer,
    soups: soupsReducer,
    appetizers: appetizersReducer,
    mocktails: mocktailsReducer,
    snacks: snacksReducer,
    pizzas: pizzasReducer,
    pastas: pastasReducer,
    desserts: dessertsReducer,
    cart: cartReducer,
    coupon: couponReducer,
    orders: ordersReducer,
    ordersList: ordersListReducer,
    register: registerReducer,
    userLogin: userLoginReducer
  }
});

export default store;
