import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

export  const appStore = configureStore({
    reducer: {
        user: userSlice,
    }
});