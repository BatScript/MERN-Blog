import { createSlice, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";

const store = configureStore({
    reducer : {
        theme : themeSlice.reducer
    }
});

export default store;