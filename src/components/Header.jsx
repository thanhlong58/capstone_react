import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../utility/config';
import { loginAction, loginActionApi } from '../redux/reducers/loginReducer';
import '../styles/random.scss'
import 'animate.css';
const Header = () => {
  const navi = useNavigate()
  const { arrCart } = useSelector((state) => state.cartReducer);
  const { userLogin, userProfile } = useSelector((state) => state.loginReducer);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [prevCartLength, setPrevCartLength] = useState(arrCart.length);
  const dispatch = useDispatch()
 
  useEffect(() => {
    if (userLogin.accessToken) {
      dispatch(loginActionApi(userLogin));
    }
    
    // Check if arrCart length increased
    if (arrCart.length > prevCartLength) {
      const cartIcon = document.getElementById('cartIcon');
      cartIcon.classList.add('animate__animated', 'animate__bounce');
      
      // Remove the bounce animation after it finishes
      setTimeout(() => {
        cartIcon.classList.remove('animate__animated', 'animate__bounce');
      }, 1000);
    }
  
    // Update the previous cart length
    setPrevCartLength(arrCart.length);
  }, [userLogin, dispatch, arrCart, prevCartLength]);
  useEffect(() => {

    if (userLogin.accessToken) {
      dispatch(loginActionApi(userLogin));
    }
  }, [userLogin, dispatch]);

  const renderLogin = () => {
    if (userLogin.accessToken) {
      return (
        <div className="nav-item dropdown mx-3">
          <a

            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              className="rounded-circle"
              src={userProfile?.avatar}
              alt="..."
              width={50}
            />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

            <li>
              <NavLink className="nav-link   " to="/profile">
                <i class="fa fa-user"></i>  Profile
              </NavLink>
            </li>
            <li>
              <NavLink className=" nav-link  " to="/cart">
                <i class="fa fa-shopping-cart"></i> Cart
              </NavLink>
            </li>
            <li>
              <span
                style={{ cursor: 'pointer' }}
                className="nav-link"
                onClick={() => {
                  navi('/profile?tab=favoriteProducts');
                }}
              >
                <i className="fa fa-heart text-danger"></i> Likes
              </span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <span style={{ cursor: 'pointer' }} className="nav-link " onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                const action = loginAction({});
                dispatch(action);
                navi('/login')

              }}>
                <i class="fa fa-sign-out-alt"></i>  Logout
              </span>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <span className="nav-item fs-4 mx-2">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </span>
    );
  };

  const handleCartClick = () => {
    if (!userLogin.accessToken) {
      setShowLoginAlert(true);
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 2000);
    } else {
      return null
    }
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top ">
      <NavLink className="navbar-brand" to="/">
        Cybersoft Shoe Shop
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/" aria-current="page">
              Home <span className="visually-hidden">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>

        </ul>
        <div className="d-flex  my-lg-0 text-light align-items-center">
          {renderLogin()}
          <NavLink style={{ marginRight: '60px' }} className="text-right" to="/cart" onClick={handleCartClick}>
          <i id="cartIcon" className="fa fa-shopping-cart text-info fs-4">
  ({arrCart.length})
</i>
          </NavLink>
        </div>
        {showLoginAlert && (
          <span className="alert alert-primary mx-3 mt-2" role="alert">
            Please login to visit your cart!
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
