import React from 'react'
import Header from '../components/Header'
import {Outlet} from 'react-router-dom'

const HomeTemplate = () => {
  return (
    <div>
        <Header/>
        <div className='content'>
            
            <Outlet/>
        </div>
    </div>
  )
}

export default HomeTemplate