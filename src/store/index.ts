import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer : {
    // Add reducers here
    cart : cartSlice
  }
})

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
