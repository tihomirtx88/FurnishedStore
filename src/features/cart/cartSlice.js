import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    orderTotal: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultState,
    reducers: {
        addItem: (state, action) =>{

        },
        removeItem: (state, action) => {

        },
        clearCart: (state) => {},
        editItem: (state, action) =>{}
    }
});

export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;

export default cartSlice.reducer;