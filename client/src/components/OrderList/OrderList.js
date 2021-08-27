import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../redux/actions/orderActions'
import './OrderList.css'

const OrderList = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const orders = useSelector(state => state.order.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders({ company: user.company }))
  }, [user.company, dispatch])

  return (
    <div className='orderList'>
      <div className='orderListWrapper'>
        <table className='orderTable'>
          <tr className='tableTr'>
            <th className='tableTh'>Id</th>
            <th>createDate</th>
            <th>product</th>
            <th>store</th>
            <th>orderQuantity</th>
            <th>shippedQuantity</th>
            <th>price</th>
            <th>purchasedQuantity</th>
            <th>customerAddress</th>
            <th>phoneNumberOne</th>
            <th>phoneNumberTwo</th>
            <th>customerName</th>
            <th>orderPlace</th>
            <th>orderCreator</th>
            <th>whereTo</th>
            <th>comment</th>
          </tr>
          {
            orders.map(order => (
              <tr className='tableTr'>
                <td>{order._id}</td>
                <td>{(new Date(order.createDate).getDate() < 10 ? '0' + new Date(order.createDate).getDate() : new Date(order.createDate).getDate())
                  + '-' + (new Date(order.createDate).getMonth() < 10 ? '0' + new Date(order.createDate).getMonth() : new Date(order.createDate).getMonth())
                  + '-' + new Date(order.createDate).getFullYear()}</td>
                <td>{order.product}</td>
                <td>{order.store}</td>
                <td>{order.orderQuantity}</td>
                <td>{order.shippedQuantity}</td>
                <td>{order.price}</td>
                <td>{order.purchasedQuantity}</td>
                <td>{order.customerAddress}</td>
                <td>{order.phoneNumberOne}</td>
                <td>{order.phoneNumberTwo}</td>
                <td>{order.customerName}</td>
                <td>{order.orderPlace}</td>
                <td>{order.orderCreator}</td>
                <td>{order.whereTo}</td>
                <td>{order.comment}</td>
              </tr>))
          }
        </table>
      </div>
    </div >
  )
}

export default OrderList
