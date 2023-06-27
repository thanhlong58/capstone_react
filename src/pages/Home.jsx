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
import video from '../assets/videos/sneaker.webm'
import { Pagination } from 'antd';  

const Home = () => {
  const numberToWords = require('number-to-words');
  const dispatchComponent = useDispatch();
  const [sortBy, setSortBy] = useState('');
  const { arrProduct, favouriteProducts } = useSelector((state) => state.productsReducer);
  const { userLogin } = useSelector((state) => state.loginReducer);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  console.log(favouriteProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
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
          <source src={video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
    
      </div>
      
    </Carousel>

    <div className={style['search-bar'] + ' mt-4'}>
        <select
          onChange={handleSort}
          className={`mx-2 ${style['select-sort']}`} // Apply custom style class
          name="sort-by-price"
        >
          <option value="none">Sort by price</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <select
          name=""
          id=""
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={style['select-category']} // Apply custom style class
        >
          <option value="">All Product</option>
          <option value="nike">Nike</option>
          <option value="adidas">Adidas</option>
          <option value="vans">Vans</option>
          <option value="converse">Converse</option>
        </select>
      </div>
      <div >
          <div className='row '>
             {arrProduct.slice((currentPage - 1) * 6, currentPage * 6).map((item,index)=> {
               const isFavorite = favoriteStatus[item.id];
               const heartClassName = isFavorite ? 'fa fa-heart text-danger' : 'fa fa-heart';
     
              return <div className='col-4 mt-5 card-group' key={index}>
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
        <div className={styles['button-layer'] } />
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
      <div className='mt-5 d-flex justify-content-center'>
  <div className='text-center bg-light' style={{ display: 'inline-block' }}>
    <Pagination
      defaultCurrent={1}
      total={arrProduct.length}
      pageSize={6}
      onChange={handlePageChange}
    />
  </div>
</div>
      
    </div>
  );
};

export default Home;
