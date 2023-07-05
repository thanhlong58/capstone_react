import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'
import { ARR_CART, getStore, getStoreJson, setStoreJson } from '../../utility/config';
const initialArrCart = getStoreJson(ARR_CART);
const defaultArrCart = Array.isArray(initialArrCart) ? initialArrCart : [];


const initialState = {

    arrCart : defaultArrCart,
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
    setStoreJson(ARR_CART,state.arrCart)
     
    }, 
    deleteAction : (state,action) => {
      let indexDel = state.arrCart.findIndex(item=> item.id  == action.payload);
      if(indexDel !== 1) {
        state.arrCart.splice(indexDel,1)
      }
      setStoreJson(ARR_CART,state.arrCart)
    },
    changeQuantity: (state,action) => {
     const sneaker = action.payload;
     let item = state.arrCart.find(item =>item.id == sneaker.id) ;
     if (item) {
      item.quantity += sneaker.quantity
      if(item.quantity < 1) {
        if(window.confirm('You want to delete this item?')) {
          state.arrCart = state.arrCart.filter(item=> item.id !== sneaker.id)
        }else {
           item.quantity -= sneaker.quantity
        }
      }
      setStoreJson(ARR_CART,state.arrCart)
     
     }
    
    },
    orderAction  : (state,action) => {
      state.orderDetail = action.payload
      setStoreJson(ARR_CART,state.arrCart)
    },
    clearCartAction : (state,action)=> {
      state.arrCart = [];
      setStoreJson(ARR_CART,state.arrCart)

    }
  }
});

export const {addtoCartAction,deleteAction,changeQuantity,orderAction,clearCartAction} = cartReducer.actions

export default cartReducer.reducer



export const orderApi = (order) => {
  return async (dispatch, getState) => {
    const { arrCart } = getState().cartReducer;

    if (arrCart.length === 0) {
      Swal.fire('Your cart is empty.')
      return;
    }

    try {
      const res = await axios({
        url: 'https://shop.cyberlearn.vn/api/Users/order',
        method: 'POST',
        data: order
      });
      Swal.fire('Successful payment', '', 'success');

      const action = orderAction(res.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};





