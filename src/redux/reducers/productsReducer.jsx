import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    arrProduct : []

}

const productsReducer = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {
    getProductAction : (state,action ) => {
        state.arrProduct = action.payload 
    }
  }
});

export const {getProductAction} = productsReducer.actions

export default productsReducer.reducer

//async action 

 export  const getProductActionApi = async (dispatch) => {
    let res =   await axios ({
        url : 'https://shop.cyberlearn.vn/api/Product',
        method : 'GET'
    })

    const action2 = getProductAction(res.data.content)
    dispatch(action2)
  }


