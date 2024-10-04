import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import feedSlice from "../features/feedSlice"; 
import connectionSlice from "../features/connectionSlice";
export  const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed:feedSlice,
        connection:connectionSlice
    }
});