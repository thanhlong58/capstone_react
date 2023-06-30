import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { store } from './redux/configStore';
import {Provider} from 'react-redux'
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
//custom history 
import  {createBrowserHistory} from 'history'

export const customNavigate = createBrowserHistory()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <div>
    <Provider store={store}>
    <HistoryRouter history={customNavigate}>
       <Routes>
        <Route path=''element={<HomeTemplate/>}>
          <Route index element={<Home/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='register' element={<Register/>}></Route>
         <Route path='profile' element={<Profile/>}></Route>
          <Route path='detail'>
            <Route path=':id' element={<Detail/>}></Route>
          </Route>

          <Route path='cart' element={<Cart/>}></Route>
         
        </Route>
       </Routes>
    </HistoryRouter>
    </Provider>
    
 </div>
);

