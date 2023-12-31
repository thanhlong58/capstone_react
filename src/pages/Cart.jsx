import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN, getStoreJson } from '../utility/config';
import { customNavigate } from '..';
import { changeQuantity, clearCartAction, deleteAction, orderApi } from '../redux/reducers/cartReducer';

const Cart = () => {
  const dispatch = useDispatch();
  const { arrCart } = useSelector(state => state.cartReducer);
  console.log(arrCart);
  if (!getStoreJson(USER_LOGIN).accessToken) {
    customNavigate.push('/login');
    return null;
  }

  const handleOrder = () => {
    const orderDetail = arrCart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const payload = {
      orderDetail,
      email: getStoreJson(USER_LOGIN).email,
    };

    const action = orderApi(payload);
    dispatch(action);
    dispatch(clearCartAction());
  };
  let totalBill = arrCart.reduce((total, item, index) => {
    return total += (item.price * item.quantity)
  }, 0)
  return (

    <div style={{ marginTop: '100px' }} className="container bg-white rounded">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrCart?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.image} width={50} alt="..." />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => {
                          const payload = {
                            id: item.id,
                            quantity: -1,
                          };
                          const action = changeQuantity(payload);
                          dispatch(action);
                        }}
                        className="btn btn-primary mx-2"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => {
                          const payload = {
                            id: item.id,
                            quantity: 1,
                          };
                          const action = changeQuantity(payload);
                          dispatch(action);
                        }}
                        className="btn btn-primary mx-2"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.quantity * item.price}</td>
                  <td>
                    <button
                      onClick={() => {
                        const action = deleteAction(item.id);
                        dispatch(action);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot >
            <td colSpan="5"></td>
            <td className='text-success fs-5 pt-4'>Total Bill</td>

            <td className='fs-5 text-bold text-success pt-4 '>  ${totalBill}</td>
          </tfoot>
        </table>
      </div>
      <div className="d-flex justify-content-end p-3">
        <button className="btn btn-success" onClick={() => handleOrder()}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
