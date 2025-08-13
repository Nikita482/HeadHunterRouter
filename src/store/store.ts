import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const Store = configureStore({
  reducer: {
    card: cartReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
