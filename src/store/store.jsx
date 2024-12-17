import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cartSlice";
import cartReducer from './cartSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})


export default store;