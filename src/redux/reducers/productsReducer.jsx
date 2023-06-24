import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { DOMAIN, USER_LOGIN, getStoreJson, http } from '../../utility/config';

const initialState = {
    arrProduct : [],
    favouriteProducts : [],
    favoriteProd : {},
    productCategory : []


}

const productsReducer = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {
    getProductAction : (state,action ) => {
        state.arrProduct = action.payload 
    },
    favouriteAction : (state,action) => {
     state.favouriteProducts = action.payload
       
    },
    likeAction : (state,action) => {
      state.favoriteProd = action.payload
    },
    unlikeAction : (state,action) => {
     state.favoriteProd = action.payload
    },
    proDuctCategoryAction : (state,action) => {
      state.arrProduct = action.payload 
    },
    sortProductAction : (state,action) => {
      state.arrProduct = action.payload
    }
  }
});

export const {getProductAction,favouriteAction,likeAction,unlikeAction,proDuctCategoryAction,sortProductAction} = productsReducer.actions

export default productsReducer.reducer

//async action 

 export  const getProductActionApi =  (value) => {
     return async (dispatch) => {
      try {
        let res =   await axios ({
          url : `https://shop.cyberlearn.vn/api/Product?keyword= ${value}`,
          method : 'GET'
      })
    
      const action2 = getProductAction(res.data.content)
      dispatch(action2)
      }catch(err) {
        console.log(err)
      }
       
     }
 
  }



export const favouriteActionApi = async(dispatch) => {
  try{
    let res = await axios({
      url: 'https://shop.cyberlearn.vn/api/Users/getproductfavorite',
      method : 'GET',
      headers : {
        Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
      }
    })
    const action = favouriteAction(res.data.content.productsFavorite)
    dispatch(action)
}catch(err) {
    console.log(err)
  }
  
}


export const likeActionApi = (productId) => {
  return async (dispatch) => {
      try {
        let res = await axios ({
          url : `https://shop.cyberlearn.vn/api/Users/like?productId=${productId}`,
          method : 'GET',
        
          headers : {
            Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
          }
        })
        const action = likeAction(res.data.content);
        dispatch(action)
      }catch(err) {
        console.log(err)
      }
   }
}

export const unlikeActionApi = (productId) => {
  return async (dispatch) => {
    try {
      let res = await axios ({
        url : `https://shop.cyberlearn.vn/api/Users/unlike?productId=${productId}`,
        method : 'GET',
      
        headers : {
          Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
        }
      })
      
      const action = unlikeAction(res.data.content);
      dispatch(action)
    }catch(err) {
      console.log(err)
    }
  
  }
}


export const productCategoryApi = (keyword) => {
  return async (dispatch) => {
    try {
      let res = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getAllCategory?keyword=${keyword}`,
        method: 'GET'
      });

    
      const productList = JSON.parse(res.data.content[0].productList);
      
 
      dispatch(getProductAction(productList));
    } catch (err) {
      console.log(err);
    }
  };
};  