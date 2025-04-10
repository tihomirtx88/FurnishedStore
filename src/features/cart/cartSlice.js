import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  orderTotal: 0,
  tax: 0,
};

const getCartFromLocalStorage = () => {
  try {
    
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart || typeof cart !== "object") return defaultState;

    return {
      ...defaultState,
      ...cart,
      cartItems: Array.isArray(cart.cartItems) ? cart.cartItems : [],
      cartTotal: Number(cart.cartTotal) || 0,
      numItemsInCart: Number(cart.numItemsInCart) || 0,
      shipping: Number(cart.shipping) || defaultState.shipping,
      tax: Number(cart.tax) || 0,
      orderTotal: Number(cart.orderTotal) || 0,
    };
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return defaultState;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      console.log("Adding product to cart:", product);
      const item = state.cartItems.find(
        (item) => item.cartID === product.cartID
      );
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;

      if (
        typeof product.price !== "number" ||
        typeof product.amount !== "number"
      ) {
        console.warn("Invalid product data:", product);
        return;
      }
      state.cartTotal += product.price * product.amount;

      //involce reducers
      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added in cart");
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      // Find product
      const product = state.cartItems.find((item) => item.cartID === cartID);
      //filtering
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );

      //Calculating
      state.numItemsInCart -= product.amount;

      if (
        typeof product.price !== "number" ||
        typeof product.amount !== "number"
      ) {
        console.warn("Invalid product data:", product);
        return;
      }
      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item remove from cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      console.log(state);

      return defaultState;
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((item) => item.cartID === cartID);

      state.numItemsInCart += amount - item.amount;

      if (typeof item.price !== "number" || typeof item.amount !== "number") {
        console.warn("Invalid product data:", item);
        return;
      }
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * (state.cartTotal || 0);
      state.orderTotal =
        (state.cartTotal || 0) + (state.shipping || 0) + (state.tax || 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;

export default cartSlice.reducer;
