import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    arrCart : []

}

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    addtoCartAction : (state,action) => {
     let item = {...action.payload,quantity : 1};
     let itemCart  = state.arrCart.find(sp=> sp.id === item.id);
     if (itemCart) {
        itemCart.quantity += 1
     }else  {
        state.arrCart.push(item )
     }
    
    }
  }
});

export const {addtoCartAction} = cartReducer.actions

export default cartReducer.reducer



