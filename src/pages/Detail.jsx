import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import style from '../styles/TestCard.module.scss';
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
        <div className='container-fluid'>
          

         <div className='mt-5'>
         <div className={style['test-card']}>
      
      <section className={`${style.productCard} productCard`}>
        <div className={`${style.container} container`}>
          <div className={`${style.info} info`}>
            <h3 className={`${style.name} name`}>{productDetail.name}</h3>
            <h1 className={`${style.slogan} slogan`}>Performance with comfort</h1>
            <p className={`${style.price} price`}>${productDetail.price}</p>
            <div className={`${style.attribs} attribs`}>
              <div className={`${style.attrib} ${style.size} size`}>
                <p className={`${style.header} header`}>Select Size</p>
                <div className={`${style.options} options`}>
                  <div className={`${style.option} option`}>6</div>
                  <div className={`${style.option} option`}>7</div>
                  <div className={`${style.option} option`}>8</div>
                  <div className={`${style.option} option`}>9</div>
                  <div className={`${style.option} option`}>10</div>
                  <div className={`${style.option} option`}>11</div>
                </div>
              </div>
              <div className={`${style.attrib} ${style.color} color`}>
                <p className={`${style.header} header`}>Select Color</p>
                <div className={`${style.options} options`}>
                  <div className={`${style.option} option`} style={{ color: '#60aec1' }} />
                  <div className={`${style.option} option`} style={{ color: '#ef525e' }} />
                  <div className={`${style.option} option`} style={{ color: '#000000' }} />
                </div>
              </div>
            </div>
            <div className={`${style.buttons} buttons`}>
              <button onClick={() => {
                                    const action = addtoCartAction(productDetail)
                                    dispatchComponent(action)

                                }} className={`${style.button} button`}>Add to cart</button>
              <div className={`${style.button} ${style.colored} button`}>Buy now</div>
            </div>
            <div className='row mt-4'>
    <p>You might also like</p>
    {productDetail.relatedProducts?.map((item, index) => {
        return (
            <div className='col-3' key={index}>
                <div className='card'>
                    <NavLink to={`/detail/${item.id}`}>
                        <img
                            src={item.image}
                            alt="..."
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </NavLink>
                    <button
                        className='btn btn-dark mt-2'
                        onClick={() => {
                            const action = addtoCartAction(item);
                            dispatchComponent(action);
                        }}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        );
    })}
</div>
          </div>
          <div className={`${style.colorLayer} colorLayer`} />
          <div className={`${style.preview} preview`}>
            <h1 className={`${style.brand} brand`}>Cyber</h1>
            <div className={`${style.imgs} imgs`}>
              <img className={`${style.activ}`} src={productDetail.image} alt="img 1" />
              <img src="https://firebasestorage.googleapis.com/v0/b/fotos-3cba1.appspot.com/o/tenis%2Ffila%2Ft3.png?alt=media&token=b2352ce3-be90-411d-b112-cfc6453760a0" alt="img 2" />
              <img src="https://firebasestorage.googleapis.com/v0/b/fotos-3cba1.appspot.com/o/tenis%2Ffila%2Ft1.png?alt=media&token=9b161cad-8068-418e-a0d3-ee2e0975e6f4" alt="img 3" />
            </div>
           
          </div>
        </div>
      </section>
    </div>
         </div>
        </div>
        
    )
}

export default Detail