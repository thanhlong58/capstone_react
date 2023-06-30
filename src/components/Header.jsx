import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../utility/config';
import { loginAction, loginActionApi } from '../redux/reducers/loginReducer';

const Header = () => {
  const navi = useNavigate()
  const { arrCart } = useSelector((state) => state.cartReducer);
  const { userLogin, userProfile } = useSelector((state) => state.loginReducer);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch()
  
  useEffect(() => {
    // Fetch user profile data after successful login
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
              src={userProfile.avatar}
              alt="Profile Avatar"
              width={50}
            />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
           
            <li>
              <NavLink className="nav-link fs-5 text-primary " to="/profile">
               Profile
              </NavLink>
            </li>
            <li>
              <NavLink className=" nav-link  fs-5 text-primary " to="/cart">
                Cart
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <span style={{cursor:'pointer'}} className="nav-link fs-5 text-primary" onClick={()=> {
                localStorage.removeItem(USER_LOGIN);
                const action = loginAction({});
                dispatch (action);
                navi('/login')

              }}>
                Logout
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
    }
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
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
        <form className="d-flex my-2 my-lg-0 text-light align-items-center">
          {renderLogin()}
          <NavLink className="text-right" to="/cart" onClick={handleCartClick}>
            <i className="fa fa-cart-plus text-white fs-3">({arrCart.length})</i>
          </NavLink>
        </form>
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
