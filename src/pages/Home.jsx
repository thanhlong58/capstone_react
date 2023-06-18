import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { getProductActionApi } from '../redux/reducers/productsReducer';
import { NavLink } from 'react-router-dom';
import { addtoCartAction } from '../redux/reducers/cartReducer';

const Home = () => {
    const dispatchComponent = useDispatch();
    const {arrProduct} = useSelector (state => state.productsReducer)

    const getProductApi = async () => {
       const actionAsync = getProductActionApi;


      dispatchComponent(actionAsync)
    }

    useEffect (() => {
     getProductApi()
    },[])
  return (
    <div className='container'>
        <div className='row mt-5'>
           {arrProduct.map((sneaker,index)=>{
            return   <div className='col-3' key={index}>
            <div className='card'>
                <img src={sneaker.image} alt="..." />
                <div className='card-body'>
                    <p>tên sản phẩm</p>
                    <h3>giá sản phẩm </h3>
                    <NavLink className='btn btn-dark' to={`/detail/${sneaker.id}`}>View detail</NavLink>
                    <button className='btn btn-dark mt2' onClick={() => {
                                    const action = addtoCartAction(sneaker)
                                    dispatchComponent(action)

                                }}>Add to cart <i className='fa fa-cart-plus'></i></button>
                </div>
            </div>
           </div>
           })}
        </div>
    </div>
  )
}

export default Home