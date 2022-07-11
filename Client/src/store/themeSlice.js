import { createSlice, configureStore } from "@reduxjs/toolkit";

const stateObject = {
    isDark : false
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: stateObject,
    reducers: {
        toggleMode(state) {
            state.isDark = !state.isDark
        },
    }
});

export const themeActions = themeSlice.actions;

export default themeSlice;