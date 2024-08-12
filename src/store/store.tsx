import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice";

const cartStore = configureStore({
  reducer: {
    cart: productSlice.reducer,
  },
});

export default cartStore;
