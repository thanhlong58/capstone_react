import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const {arrCart} = useSelector (state=> state.cartReducer)
    console.log(arrCart)
  return (
   <div className='container'>
    Cart
    <table className='table'>
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
            
          {arrCart?.map((item,index) =>{
            return   <tr key={index}>
            <td>{item.id}</td>
            <td>
                <img src={item.image}width={50} alt="..." />
            </td>
            <td>Produc1</td>
            <td>1000</td>
            <td>2</td>
            <td>2000</td>
            <td>
                <button className='btn btn-danger'>Delete</button>
            </td>
        </tr>
          })}
        </tbody>
    </table>
   </div>
  )
}

export default Cart