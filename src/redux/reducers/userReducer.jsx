import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {

    userRegister :  {},
    inValid : true 

}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    registerAction : (state,action) => {
        state.userRegister = action.payload
    },
    setValidAction: (state, action) => {
        state.inValid = !action.payload;
      }
  }
});

export const {registerAction,setValidAction } = userReducer.actions

export default userReducer.reducer


//asyn action 



export const registerApi = (user) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          url: 'https://shop.cyberlearn.vn/api/Users/signup',
          method: 'POST',
          responseType: 'json',
          data: user
        });
  
        const action = registerAction(res.data.content);
        dispatch(action);
        alert(`Welcome onboard ${user.email}`)
      } catch (error) {
     
        console.error('Error:', error);
        
      }
    };
  };