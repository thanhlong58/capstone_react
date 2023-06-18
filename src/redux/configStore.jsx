import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './reducers/productsReducer'
import detailProducer from './reducers/detailProducer'
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

export const store  = configureStore ( {
    reducer : {
       productsReducer,
       detailProducer,
       cartReducer,
       userReducer,
       loginReducer,
     }
})