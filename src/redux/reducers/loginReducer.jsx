import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { USER_LOGIN, getStoreJson, setStoreJson } from '../../utility/config';

const initialState = {
    userLogin : getStoreJson(USER_LOGIN)

}

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState,
  reducers: {
    loginAction: (state,action) => {
           state.userLogin = action.payload
    }
  }
});

export const {loginAction} = loginReducer.actions

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