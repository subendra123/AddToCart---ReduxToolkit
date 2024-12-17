import { createSlice } from "@reduxjs/toolkit";



const cartSlice  = createSlice({
    name: 'cart',
  initialState: {
    cart: [],
    quantity: 0
  },

    reducers:{
        addToCart: (state, action) => {
            // console.log(action);

        const itemInCart = state.cart.find(item => item.id === action.payload.id)

        if(itemInCart) {
          itemInCart.quantity++

        } else {
          state.cart.push({ ...action.payload, quantity: 1})
        }
            

          

        },


    removeProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)

    },

     removeAllCart: (state, action) => {
      state.cart = []

    },

    decrementProduct: (state, action) => {
      const indexData_dec  = state.cart.findIndex(item => item.id === action.payload.id);
      if(state.cart[indexData_dec].quantity <=1) {
        state.cart[indexData_dec].quantity=1;

      } else{
        state.cart[indexData_dec].quantity -= 1

      }

    

    }

       
    }
})


export const{ addToCart, removeProduct, removeAllCart, decrementProduct } = cartSlice.actions;
export default cartSlice.reducer;