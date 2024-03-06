import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";


export interface CartInt {
  id : number,
  title : String,
  description : String,
  price : number,
  url : String,
}

interface CartState {
  cart : CartInt[],
  total : number,
  quantity : number,
  isItemAdded : boolean
}

const initialCartState : CartState = {
  cart : [],
  total : 0,
  quantity : 0,
  isItemAdded : false,
}

export const cartSlice = createSlice({
  name : "cartSlice",
  initialState : initialCartState,
  reducers : {
    getCart(state) {
      state.cart = []
      if (typeof localStorage !== "undefined") {
        const storedCart = localStorage.getItem("carts")
        if (storedCart !== null) {
          state.cart = JSON.parse(storedCart)
        }else {
          state.cart = []
        }
      }
    },
    addToCart(state, action : PayloadAction<CartInt>) {
      state.cart = []
      if (typeof localStorage !== "undefined") {
        const storedCart = localStorage.getItem("carts")
        if (storedCart !== null) {
          state.cart = JSON.parse(storedCart)
        } else {  
          state.cart = []
        }
      }
      state.cart.push(action.payload);
      state.total = state.cart.length
      localStorage.setItem("carts", JSON.stringify(state.cart))
    },
    removeFromCart(state, action : PayloadAction<CartInt>) {
      state.cart = []
      if (typeof localStorage !== "undefined") {
        const storedCart = localStorage.getItem("carts")
        if (storedCart !== null) {
          state.cart = JSON.parse(storedCart)
        } else {  
          state.cart = []
        }
      }
      state.cart = state.cart.filter((item)=>item.id !== action.payload.id);
      state.total = state.cart.length
      localStorage.setItem("carts", JSON.stringify(state.cart))
    },
    cartCount(state){
      state.cart = []
      if (typeof localStorage !== "undefined") {
        const storedCart = localStorage.getItem("carts")
        if (storedCart !== null) {
          state.cart = JSON.parse(storedCart)
        } else {  
          state.cart = []
        }
      }
      state.total = state.cart.length
    },
    cartQuantity(state){
      state.cart = []
      state.quantity= 0
      if (typeof localStorage !== "undefined") {
        const storedCart = localStorage.getItem("carts")
        if (storedCart !== null) {
          state.cart = JSON.parse(storedCart)
        } else {  
          state.cart = []
        }
      }
      for (let i = 0; i < state.cart.length; i++) {
        const element = state.cart[i];
        state.quantity += element.price
      }
    },
    clearCart(state){
      localStorage.removeItem("carts");
    },
    isItemAddedToCart(state, action : PayloadAction<CartInt>){
      state.cart = []
      if (typeof localStorage !== "undefined") {
        const storedCart = localStorage.getItem("carts")
        if (storedCart !== null) {
          state.cart = JSON.parse(storedCart)
        } else {  
          state.cart = []
        }
      }
      const item = state.cart.find((item)=>item.id === action.payload.id);
      if (item) {
        state.isItemAdded = true;
        return
      }
      state.isItemAdded = false;
    }
  }

})


export const { getCart, addToCart, cartQuantity, clearCart, removeFromCart, isItemAddedToCart } = cartSlice.actions
export default cartSlice.reducer