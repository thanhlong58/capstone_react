import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileApi, upLoadAvatarApi, updateUserApi, uploadAvatarAction } from '../redux/reducers/loginReducer';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { favouriteActionApi } from '../redux/reducers/productsReducer';
import { Pagination } from 'antd';
import  styles from '../styles/profile.module.css'


const Profile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { avatar } = useSelector(state => state.loginReducer)
  console.log(avatar)
  const { userProfile } = useSelector((state) => state.loginReducer);
  const { arrProduct } = useSelector((state) => state.productsReducer);
  const { favouriteProducts } = useSelector((state) => state.productsReducer);
  console.log(userProfile);
  console.log(favouriteProducts)
  const dispatch = useDispatch();
  const getFav = async () => {
    const action = favouriteActionApi;
    dispatch(action);
  };
  const getProfileApiFunction = async () => {
    const actionAsync = getProfileApi();
    dispatch(actionAsync);
  };

  useEffect(() => {
    getProfileApiFunction();
  }, []);
  useEffect(() => {
    getFav();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const frm = useFormik({
    initialValues: {
      email: userProfile.email || '',
      name: userProfile.name || '',
      password: userProfile.password || '',
      phone: userProfile.phone || '',
      gender: userProfile.gender || true,
    },
    onSubmit: (values) => {
      console.log(values);
      const action = updateUserApi(values);
      dispatch(action);
    },
  });

  const ava = useFormik({
    initialValues: {
      customFile: null,
    },
    onSubmit: (values) => {
      console.log('value', values)
      var jsonFile = JSON.stringify(values);
      const action = upLoadAvatarApi(jsonFile)
      dispatch(action);
    },
  });

  const [activeTab, setActiveTab] = useState('orderHistory');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };




  return (
    <div className='container bg-light'>
      <div className='row'>
        <div className='col-4'>
          <div className='text-center'>
          <label htmlFor='avatarUpload' className='avatar-label'>
              <img width={200} className='rounded-circle avatar-img' src={userProfile.avatar} alt='Avatar' />
              <input
                className={`text-align-right ${styles.customFileInput}`} 
                type='file'
                id='avatarUpload'
                name='customFile'
                onChange={(event) => {
                  ava.setFieldValue('customFile', event.currentTarget.files[0]);
                }}
              /> <button type='submit' className='btn btn-primary d-block mx-5 my-2 avatar-btn' onClick={ava.handleSubmit}>
              Upload Avatar
            </button>
            </label>
           
          </div>
        </div>
        <div className='col-8'>
          <form onSubmit={frm.handleSubmit}>
            <div className='row'>
              <div className='col-6 form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  className='w-100 form-control'
                  id='email'
                  name='email'
                  onChange={frm.handleChange}
                  value={frm.values.email}
                />
              </div>
              <div className='col-6 form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  className='w-100 form-control'
                  id='name'
                  name='name'
                  value={frm.values.name}
                  onChange={frm.handleChange}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-6 form-group'>
                <label htmlFor='phone'>Phone</label>
                <input
                  className='w-100 form-control'
                  id='phone'
                  name='phone'
                  value={frm.values.phone}
                  onChange={frm.handleChange}
                />
              </div>
              <div className='col-6 form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='w-100 form-control'
                  id='password'
                  name='password'
                  value={frm.values.password}
                  onChange={frm.handleChange}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>Gender</label>
              <div className='form-check'>
                <input
                  type='radio'
                  className='form-check-input'
                  name='gender'
                  id='male'
                  checked={frm.values.gender === true}
                  onChange={() => frm.setFieldValue('gender', true)}
                />
                <label className='form-check-label' htmlFor='male'>
                  Male
                </label>
              </div>
              <div className='form-check'>
                <input
                  type='radio'
                  className='form-check-input'
                  name='gender'
                  id='female'
                  checked={frm.values.gender === false}
                  onChange={() => frm.setFieldValue('gender', false)}
                />
                <label className='form-check-label' htmlFor='female'>
                  Female
                </label>
                <button style={{ marginLeft: '400px' }} type='submit' className='btn btn-success w-25 '>
                  Update
                </button>

              </div>

            </div>

          </form>
        </div>
      </div>


      <ul className='nav nav-tabs mt-5'>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === 'orderHistory' ? 'active' : ''}`}
            onClick={() => handleTabChange('orderHistory')}
          >
            Order History
          </button>
        </li>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === 'favoriteProducts' ? 'active' : ''}`}
            onClick={() => handleTabChange('favoriteProducts')}
          >
            Favorite Products
          </button>
        </li>
      </ul>

      <div className='tab-content'>
        {activeTab === 'orderHistory' && (
          <div className='tab-pane fade show active' id='orderHistory'>
           
            {userProfile.ordersHistory?.slice((currentPage - 1) * 2, currentPage * 3).map((order, index) => (
              <table key={index} className='table table-striped'>
                <span className='text-success' >Order have been placed on {order.date}</span>
                <thead>
                  <tr>

                    <th>img</th>
                    <th>name</th>
                    <th>price</th>

                  </tr>
                </thead>
                <tbody>
                  {order.orderDetail?.map((item, itemIndex) => (
                    <tr key={itemIndex}>

                      <td>
                        <img
                          width={50}
                          src={item.image}
                          alt='Product'
                          className='product-image'
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
             <div className='text-center bg-light' style={{ display: 'inline-block' }}>
        <Pagination
          current={currentPage}
          total={Math.ceil(userProfile.ordersHistory?.length / 2)} // Show only 1 page
          pageSize={1}
          onChange={handlePageChange}
        />
      </div>
          </div>
        )}

{activeTab === 'favoriteProducts' && (
  <div className='tab-pane fade show active' id='favoriteProducts'>
   
    <table className='table'>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>Image</th>
          <th style={{ textAlign: 'center' }}>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {favouriteProducts?.slice((currentPage - 1) * 2, currentPage * 6).map((item, index) => {
          return (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>
                <img src={item.image} alt='...' width={100} />
              </td>
              <td className='fs-4' style={{ textAlign: 'center' }}>{item.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <div className='text-center bg-light' style={{ display: 'inline-block' }}>
    <Pagination
      defaultCurrent={1}
      total={Math.ceil(favouriteProducts?.length / 6)} 
       pageSize={1}
      onChange={handlePageChange}
    />
  </div>
  </div>
  
)}

      </div>
     
    </div>
  );
};

export default Profile;
