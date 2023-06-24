import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    productDetail : {}
}
const detailProducer = createSlice({
  name: 'detailProducer',
  initialState,
  reducers: {
    getProductDetailAction : (state,action) => {
        state.productDetail = action.payload
    }
  }
});

export const {getProductDetailAction} = detailProducer.actions

export default detailProducer.reducer


//async

export  const getProductDetailActionApi = (id) => {

    return async (dispatch) => {
      try {
        let res =   await axios ({
          url : `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
          method : 'GET'
      })
  
      const action2 = getProductDetailAction(res.data.content)
      dispatch(action2)
      }catch(err) {
        console.log(err)
      }
      
      }
}





