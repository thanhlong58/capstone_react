import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { favouriteActionApi, getProductActionApi, likeActionApi, productCategoryApi, sortProductAction, unlikeActionApi } from '../redux/reducers/productsReducer';
import { NavLink } from 'react-router-dom';
import { addtoCartAction } from '../redux/reducers/cartReducer';
import { orderBy } from 'lodash';
import style from '../assets/HomePage.module.css';
import styles from '../assets/CardItem.module.css';
import { Carousel } from 'antd';
import video from '../assets/videos/sneaker.mp4'  

const Home = () => {
  const numberToWords = require('number-to-words');
  const dispatchComponent = useDispatch();
  const [sortBy, setSortBy] = useState('');
  const { arrProduct, favouriteProducts } = useSelector((state) => state.productsReducer);
  const { userLogin } = useSelector((state) => state.loginReducer);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  console.log(favouriteProducts);

  const getProductApi = async () => {
    const actionAsync = getProductActionApi(selectedCategory); // Pass selected category as a parameter
    dispatchComponent(actionAsync);
  };

  const [selectedCategory, setSelectedCategory] = useState('');

  const getFav = async () => {
    const action = favouriteActionApi;
    dispatchComponent(action);
  };

  useEffect(() => {
    getProductApi();
  }, []);

  useEffect(() => {
    getFav();
  }, []);

  useEffect(() => {
    
    const initialFavoriteStatus = {};
    arrProduct.forEach((sneaker) => {
      initialFavoriteStatus[sneaker.id] = favouriteProducts.some((product) => product.id === sneaker.id);
    });
    setFavoriteStatus(initialFavoriteStatus);
  }, [arrProduct, favouriteProducts]);

  useEffect(() => {
    getProductApi();
  }, [selectedCategory]);

  const handleLikeClick = (sneakerId) => {
    const isFavorite = favoriteStatus[sneakerId];
    const updatedStatus = { ...favoriteStatus };
    updatedStatus[sneakerId] = !isFavorite;
    setFavoriteStatus(updatedStatus);

 
    if (isFavorite) {
      const action = unlikeActionApi(sneakerId);
      dispatchComponent(action);
    } else {
      const action = likeActionApi(sneakerId);
      dispatchComponent(action);
    }
  };

  const handleSort = (e) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
  };

  useEffect(() => {
    let sortedProducts = [...arrProduct];

    if (sortBy === 'asc') {
      sortedProducts = orderBy(sortedProducts, 'price', 'asc');
    } else if (sortBy === 'desc') {
      sortedProducts = orderBy(sortedProducts, 'price', 'desc');
    } else {
      sortedProducts = [...arrProduct];
    }

    const action = sortProductAction(sortedProducts);
    dispatchComponent(action);
  }, [sortBy]);
  const contentStyle = {
    width: '100%',
    height: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  
 

  return (
    
    <div className="container">
       <Carousel >
      <div>
        
      <video style={contentStyle} autoPlay muted loop>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    
      </div>
      
    </Carousel>
      <div className={style['search-bar'] + ' mt-4'}>
        <input type="text" placeholder="Search product by name" />
        <select onChange={handleSort} className="mx-2" name="sort-by-price">
          <option value="none">Sort by price</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <select name="" id="" onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Product</option>
          <option value="nike">Nike</option>
          <option value="adidas">Adidas</option>
          <option value="vans">Vans</option>
          <option value="converse">Converse</option>
        </select>
      </div>
      {/* <div className={'row ' + style['card-container'] + ' mt-5'}>
        {arrProduct.map((sneaker, index) => {
          const isFavorite = favoriteStatus[sneaker.id];
          const heartClassName = isFavorite ? 'fa fa-heart text-danger' : 'fa fa-heart';

          return (
            <div className="col-3" key={index}>
              <div className={style.card}>
                <img src={sneaker.image} alt="Sneaker" />
                <div className={style['card-body']}>
                  <i
                    style={{ cursor: 'pointer' }}
                    className={heartClassName}
                    onClick={() => handleLikeClick(sneaker.id)}
                  ></i>
                  <p className={style['product-name']}>{sneaker.name}</p>
                  <h3 className={style.price}>{sneaker.price}</h3>
                  <NavLink className={'btn btn-dark ' + style['view-detail-btn']} to={`/detail/${sneaker.id}`}>
                    View detail
                  </NavLink>
                  <button
                    className={'btn btn-dark ' + style['add-to-cart-btn']}
                    onClick={() => {
                      const action = addtoCartAction(sneaker);
                      dispatchComponent(action);
                    }}
                  >
                    Add to cart <i className="fa fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}

      <div className='mt-5'>
          <div className='row '>
             {arrProduct.map((item,index)=> {
               const isFavorite = favoriteStatus[item.id];
               const heartClassName = isFavorite ? 'fa fa-heart text-danger' : 'fa fa-heart';
     
              return <div className='col-3 mt-4 card-group' key={index}>
                <div className={styles['product-card']}>
      <div className={styles['logo-cart']}>
        {/*<img src="images/logo.jpg" alt="logo">*/}
        <i className="bx bx-shopping-bag" />
      </div>
      <div className={styles['main-images']}>
        <img  id="blue" className={`${styles.blue} ${styles.active}`} src={item.image} alt="blue" />
        <img id="pink" className={styles.pink}  src={item.image} alt="blue" />
        <img id="yellow" className={styles.yellow} src="images/yellow.png" alt="blue" />
      </div>
      <div className={styles['shoe-details']}>
        <span className={styles['shoe_name']}>{item.name}</span>
        <p>{item.description}</p>
        <div className={styles.stars}>
          <i className="bx bxs-star" />
          <i className="bx bxs-star" />
          <i className="bx bxs-star" />
          <i className="bx bxs-star" />
          <i className="bx bx-star" />
        </div>
      </div>
      <div className={styles['color-price']}>
      <NavLink className={styles['nav-link']} activeClassName={styles['active']} to={`/detail/${item.id}`}>
                    View detail
                  </NavLink>
                  <div className={styles['heart-icon']} onClick={() => handleLikeClick(item.id)}>
                  <i className={`${heartClassName} ${styles['heart-icon-size']}`}></i>
        </div>
        <div className={styles.price}>
          <span className={styles['price_num']}>${item.price}</span>
          <span className={styles['price_letter']}>{numberToWords.toWords(item.price)} only</span>
        </div>
      </div>  
      <div className={styles.button}>
        <div className={styles['button-layer']} />
        <button  onClick={() => {
                      const action = addtoCartAction(item);
                      dispatchComponent(action);
                    }}>Add To Cart</button>
      </div>
    </div>
              </div>
             })}
          </div>
      </div>
    </div>
  );
};

export default Home;
