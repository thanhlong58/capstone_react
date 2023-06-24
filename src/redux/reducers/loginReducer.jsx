import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { USER_LOGIN, getStoreJson, http, setStoreJson } from '../../utility/config';
import { customNavigate } from '../..';

const initialState = {
    userLogin : getStoreJson(USER_LOGIN),
    userProfile :  {

    },
    userUpdate : {}

}

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState,
  reducers: {
    loginAction: (state,action) => {
           state.userLogin = action.payload
    },
    setProfileAction :(state,action) => {
      state.userProfile = action.payload
    },
    UpdateUserAction : (state,action) => {
      state.userUpdate = action.payload
    }
  }
  
});

export const {loginAction,setProfileAction,UpdateUserAction } = loginReducer.actions

export default loginReducer.reducer


//asyn actiom 
export const loginActionApi = (user) => {
    return async (dispatch)=> {
        try {
            const res = await axios ({
             url : 'https://shop.cyberlearn.vn/api/Users/signin',
             method : 'POST',
             data : user

            })

            const action = loginAction(res.data.content);
            dispatch(action)

            alert(`Hello ${user.email}`)
            setStoreJson(USER_LOGIN,res.data.content)
        }
        catch (err) {
         console.log(err)
        }
    }
} 


// export const getProfileApi = () => {
//   return async (dispatch) => {
//     try {
//       const res = await axios  ({
//         url : 'https://shop.cyberlearn.vn/api/Users/getProfile',
//         method : 'POST',
//         headers  : {
//           Authorization  : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`
//         }
//       })
//       const action  =  setProfileAction(res.data.content);
//       dispatch(action)
//     }
//     catch (err) {
//       console.log(err)

//       if(err.response?.status === 401) {
//         customNavigate.push('/login')
//       }

//     }
  
//   }
// }

export const getProfileApi = () => {


  return async dispatch => {

      const res = await http.post('/api/Users/getProfile');
      if (res) {
          //đưa lên store redux
          const action = setProfileAction(res.data.content);
          dispatch(action);
      }


  }
}


export const updateUserApi =  (user) => {
  return async (dispatch)  => {
       const res = await http.post('/api/Users/updateProfile',user);
       if(res) {
        const action = UpdateUserAction(res.data.content)
        dispatch(action)
       }
  }
}
