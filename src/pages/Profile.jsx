import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileApi, upLoadAvatarApi, updateUserApi, uploadAvatarAction } from '../redux/reducers/loginReducer';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { favouriteActionApi } from '../redux/reducers/productsReducer';

const Profile = () => {
  const { avatar } = useSelector(state => state.loginReducer)
  console.log(avatar)
  const { userProfile } = useSelector((state) => state.loginReducer);
  const { arrProduct } = useSelector((state) => state.productsReducer);
  const { favouriteProducts } = useSelector((state) => state.productsReducer);
  console.log(userProfile);

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
      const action = upLoadAvatarApi(values);
      dispatch(action);
    },
  });

  const ava = useFormik({
    initialValues: {
      customFile: null,
    },
    onSubmit: (values) => {
      console.log('value',values)
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
          <a style={{ cursor: 'pointer' }} >
            <img className='rounded-circle' src={avatar} width={200} alt='Avatar' />
          </a>
          <form onSubmit={ava.handleSubmit}>
            <input
              type="file"
              class="form-control"
              id="customFile"
              name="customFile"
              onChange={(event) => {
                ava.setFieldValue('customFile', event.currentTarget.files[0]);
              }}
            />
            <button type="submit" className="btn btn-primary">Upload Avatar</button>
          </form>

        </div>
        <div className='col-8'>
          <form onSubmit={frm.handleSubmit}>
            <div className='row'>
              <div className='col-6 form-group'>
                <p>Email</p>
                <input
                  className='w-50 form-control'
                  id='email'
                  name='email'
                  onChange={frm.handleChange}
                  value={frm.values.email}
                />
              </div>
              <div className='col-6 form-group'>
                <p>Name</p>
                <input
                  className='w-50 form-control'
                  id='name'
                  name='name'
                  value={frm.values.name}
                  onChange={frm.handleChange}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-6 form-group'>
                <p>Phone</p>
                <input
                  className='w-50 form-control'
                  id='phone'
                  name='phone'
                  value={frm.values.phone}
                  onChange={frm.handleChange}
                />
              </div>
              <div className='col-6 form-group'>
                <p>Password</p>
                <input
                  type='password'
                  className='w-50 form-control'
                  id='password'
                  name='password'
                  value={frm.values.password}
                  onChange={frm.handleChange}
                />
              </div>
            </div>
            <p>Gender</p>
            <input
              type='radio'
              name='gender'
              id='male'
              checked={frm.values.gender === true}
              onChange={() => frm.setFieldValue('gender', true)}
            />
            Male{' '}
            <span>
              {' '}
              <input
                type='radio'
                name='gender'
                id='female'
                checked={frm.values.gender === false}
                onChange={() => frm.setFieldValue('gender', false)}
              />
              Female
            </span>

            <button type='submitre' className='btn btn-success'>
              Update
            </button>
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
            <h3>Order History</h3>
            {userProfile.ordersHistory?.map((item, index) => {
              const orderDetail = item.orderDetail[0];

              return (
                <table key={index} className='table table-striped'>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>img</th>
                      <th>name</th>
                      <th>price</th>
                      <th>quantity</th>
                      <th>total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.id}</td>
                      <td>
                        <img
                          width={50}
                          src={orderDetail.image}
                          alt='Product'
                          className='product-image'
                        />
                      </td>
                      <td>{orderDetail.name}</td>
                      <td>${orderDetail.price}</td>
                      <td>{orderDetail.quantity}</td>
                      <td>${orderDetail.price * orderDetail.quantity}</td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
        )}

        {activeTab === 'favoriteProducts' && (
          <div className='tab-pane fade show active' id='favoriteProducts'>
            <h3>Favorite Products</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {favouriteProducts?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        <img src={item.image} alt='...' width={50} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
