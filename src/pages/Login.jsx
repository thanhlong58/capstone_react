import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useSelector,useDispatch } from 'react-redux'
import { loginActionApi } from '../redux/reducers/loginReducer'
const Login = () => {
  const dispatch = useDispatch()
  const frm = useFormik({
    initialValues : {
      email: '',
      password : '',
    

    },

    onSubmit: (values) => {
     console.log('values', values)
      const action  = loginActionApi (values);
      dispatch(action )
    }

  })

  return (
   <form onSubmit={frm.handleSubmit}  className='container'>
    <h3>Login</h3>
    <div className='form-group'>
    <p>Email</p>
     <input className='form-control w-25' id='email' name='email' onChange={frm.handleChange} />
    </div>
    <div className='form-group'>
    <p>Password</p>
     <input type='password' className='form-control w-25' id='password' name='password' onChange={frm.handleChange} />
    </div>

    <div className='form-group mt-4'>
      <button type='submit' className='btn btn-primary'>Login</button>
    </div>
    
   </form>
  )
}

export default Login