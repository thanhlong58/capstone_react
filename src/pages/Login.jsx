import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { loginActionApi } from '../redux/reducers/loginReducer'
import styles from '../css/login.module.css'

const Login = () => {
  const {userProfile} = useSelector(state=> state.loginReducer)
  console.log(userProfile);
  
  const dispatch = useDispatch()
  const frm = useFormik({
    initialValues: {
      email: '',
      password: '',


    },

    onSubmit: (values) => {
      console.log('values', values)
      const action = loginActionApi(values);
      dispatch(action)
    }

  })

  return (
    <div id={styles.loginCss} className='container'>
     
      <div className='mt-5'>
        <div className={styles['styles']}>
          <div className={styles['login-box']}>
            <h2 className={styles['login-heading']}>Login</h2>
            <form onSubmit={frm.handleSubmit}>
              <div className={styles['user-box']}>
                <input type="text" name="email" id="email" onChange={frm.handleChange} />
                <label>Email</label>
              </div>
              <div className={styles['user-box']}>
                <input type="password" name="password" id="password" onChange={frm.handleChange} />
                <label>Password</label>
              </div>
              <button type='submit' className={`btn btn-transparent ${styles['submit-button']}`}>
                <span />
                <span />
                <span />
                <span />
                Submit
              </button>
            </form>
            <div className='mt-3'>
            
            </div>
           
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login