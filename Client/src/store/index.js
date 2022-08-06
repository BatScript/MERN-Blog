import { createSlice, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import loginStateSlice from "./loginStateSlice";
const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    isLoggedIn: loginStateSlice.reducer,
  },
});

export default store;
