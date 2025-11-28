import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{items: [],},
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            const existingItem=state.items.find(i=>i.id===item.id);
            if(existingItem){
                existingItem.quantity+=1;
            }else{
                state.items.push({...item,quantity:1})
            }
            },
        removeFromCart: (state, action) => {
      const index = state.items.findIndex(i => i.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    
    decrement: (state, action) => {
 const index = state.items.findIndex(i => i.id === action.payload);
 if (index !== -1) {
   if (state.items[index].quantity > 1) {
     state.items[index].quantity -= 1;
   }
 }
},
         clearCart:(state)=>{state.items.length = 0},
        }

})
export const{addToCart,removeFromCart,decrement,clearCart}=cartSlice.actions
export default cartSlice.reducer