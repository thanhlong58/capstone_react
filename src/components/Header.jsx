import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { arrCart } = useSelector(state => state.cartReducer);
  const { userLogin, userProfile } = useSelector(state => state.loginReducer);

  const renderLogin = () => {
    if (userLogin.accessToken) {
      return (
        <>
          <NavLink className="nav-link mx-3" to="/profile">
            <img className="rounded-circle" src={userProfile.avatar} alt="Profile Avatar" width={50} />
          </NavLink>
        </>
      );
    }
    return (
      <span className="nav-item fs-4 mx-2">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </span>
    );
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">Cybersoft Shoe Shop</NavLink>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/" aria-current="page">Home <span className="visually-hidden">(current)</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/test-card">Test Card</NavLink>
          </li>
        </ul>
        <form className="d-flex my-2 my-lg-0 text-light align-items-center">
          {renderLogin()}
          <NavLink className="text-right" to="/cart">
            <i className="fa fa-cart-plus text-white fs-3">({arrCart.length})</i>
          </NavLink>
        </form>
      </div>
    </nav>
  );
};

export default Header;
