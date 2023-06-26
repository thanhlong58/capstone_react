import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {

    arrCart : [],
    orderDetail: null

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
    
    }, 
    deleteAction : (state,action) => {
      let indexDel = state.arrCart.findIndex(item=> item.id  == action.payload);
      if(indexDel !== 1) {
        state.arrCart.splice(indexDel,1)
      }
    },
    changeQuantity: (state,action) => {
     const sneaker = action.payload;
     let item = state.arrCart.find(item =>item.id == sneaker.id) ;
     if (item) {
      item.quantity += sneaker.quantity
     }
    },
    orderAction  : (state,action) => {
      state.orderDetail = action.payload
    },
    clearCartAction : (state,action)=> {
      state.arrCart = [];

    }
  }
});

export const {addtoCartAction,deleteAction,changeQuantity,orderAction,clearCartAction} = cartReducer.actions

export default cartReducer.reducer



export const orderApi = (order) =>  {
  return async ( dispatch) => {
   try {
    const res = await axios ({
      url : 'https://shop.cyberlearn.vn/api/Users/order',
      method : 'POST',
      data : order
    })
     
    const action  =  orderAction(res.data.content)
    dispatch (action)
   }catch(err) {
    console.log(err)
   }
   
  }
}


