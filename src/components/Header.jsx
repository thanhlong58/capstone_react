import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const {arrCart} = useSelector(state=>state.cartReducer)
  const {userLogin} = useSelector(state => state.loginReducer)

  const renderLogin = () => {
    if (userLogin.accessToken) {
      return <>
       <li className='nav-item'>
        <NavLink className={'nav-link'} to={'/profile'}>
            Hello {userLogin.email}
        </NavLink>
       </li>
         <li className='nav-item'>
          <span style={{cursor:'pointer'}} className='nav-link'>Logout</span>
         </li>
      </>
    }
    return  <li className="nav-item">
    <NavLink className="nav-link" to="/login">Login</NavLink>
  </li>
  }
  return (
   <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <NavLink className="navbar-brand" to='/'>Cybersoft shoe shop</NavLink>
  <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
  <div className="collapse navbar-collapse" id="collapsibleNavId">
    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link active" to="/" aria-current="page">Home <span className="visually-hidden">(current)</span></NavLink>
      </li>
      {renderLogin()}
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">Profile</NavLink>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div className="dropdown-menu" aria-labelledby="dropdownId">
          <a className="dropdown-item" href="#">Action 1</a>
          <a className="dropdown-item" href="#">Action 2</a>
        </div>
      </li>
    </ul>
    <form className="d-flex my-2 my-lg-0 text-light">
      
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        
      <NavLink to='/cart'>
         <i className='fa fa-cart-plus text-white fs-3'>({arrCart.length})</i>
      </NavLink>
     
    </form>
    
  </div>
</nav>

  )
}

export default Header