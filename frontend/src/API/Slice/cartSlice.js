import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: { isOpen: false },
    reducers: {
        openCart: (state) => { state.isOpen = true },
        closeCart: (state) => { state.isOpen = false },
    }
});

export const { openCart, closeCart } = cartSlice.actions;
