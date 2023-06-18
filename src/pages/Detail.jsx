import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getProductDetailActionApi } from '../redux/reducers/detailProducer'
import { addtoCartAction } from '../redux/reducers/cartReducer'

const Detail = () => {
    const params = useParams()
    const { productDetail } = useSelector(state => state.detailProducer)
    const { arrCart } = useSelector(state => state.cartReducer)


    console.log(productDetail);
    const dispatchComponent = useDispatch();

    const getProductDetail = async () => {

        const actionAsync = getProductDetailActionApi((params.id));


        dispatchComponent(actionAsync)
    }

    useEffect(() => {
        getProductDetail()
    }, [params.id])
    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col-4'>
                    <div className='card'>
                        <img src={productDetail.image} alt="..." />

                    </div>
                </div>

                <div className='col-8'>
                    <h3>Nike 123</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, nemo!</p>
                    <h3>giá</h3>

                    <button className='btn btn-dark mt2' onClick={() => {
                        const action = addtoCartAction(productDetail)
                        dispatchComponent(action)
                        console.log(arrCart)
                    }}>Add to cart <i className='fa fa-cart-plus'></i></button>
                </div>
            </div>
            <div className='mt-2'>
                <h3>related products</h3>
                <div className='row'>
                    {productDetail.relatedProducts?.map((item, index) => {
                        return <div className='col-4' key={index}>
                            <div className='card'>
                            <img src={item.image} alt="..." />
                            <div className='card-body'>
                                <h3>name</h3>
                                <p>price</p>
                                <NavLink className='btn btn-dark' to={`/detail/${item.id}`}>View detail</NavLink>
                                <button className='btn btn-dark mt2' onClick={() => {
                                    const action = addtoCartAction(item)
                                    dispatchComponent(action)

                                }}>Add to cart <i className='fa fa-cart-plus'></i></button>
                            </div>
                            </div>
                           
                        </div>

                    })}
                </div>
            </div>


        </div>
    )
}

export default Detail