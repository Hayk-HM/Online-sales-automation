import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, getOrdersAdmissibility } from '../../redux/actions/orderActions'
import './OrderList.css'

const OrderList = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const orders = useSelector(state => state.order.orders)
  const ordersAdmissibility = useSelector(state => state.order.ordersAdmissibility)
  const newOrdersAdmissibility = ordersAdmissibility.filter(elem => elem.visibleInOrderList === 'true')

  const reportColumns = newOrdersAdmissibility.map(elem => elem.dbColumnName)
  console.log('reportColumns', reportColumns);

  console.log('orders', orders)
  console.log('newOrdersAdmissibility', newOrdersAdmissibility)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders({ company: user.company }))
    dispatch(getOrdersAdmissibility({ company: user.company }))
  }, [user.company, dispatch])

  return (
    <div className='orderList'>
      <div className='orderListWrapper'>
        <table className='orderTable'>
          <tr className='tableTr'>
            {
              reportColumns.map(elem => <th className='tableTh'>{elem}</th>)
            }
          </tr>
          {
            orders.map(order => <tr className='tableTr'>{reportColumns.map(elem => <td>{order[elem]}</td>)}</tr>)
            // orders.map(order => (
            //   newOrdersAdmissibility.map(elem => 
            //    order.elem ? <tr className='tableTr'>
            //     <td>{order._id}</td>
            //     <td>{(new Date(order.createDate).getDate() < 10 ? '0' + new Date(order.createDate).getDate() : new Date(order.createDate).getDate())
            //       + '-' + (new Date(order.createDate).getMonth() < 10 ? '0' + new Date(order.createDate).getMonth() : new Date(order.createDate).getMonth())
            //       + '-' + new Date(order.createDate).getFullYear()}</td>
            //     <td>{order.orderCreator}</td>
            //   </tr>))
            //     )

          }
        </table>
      </div>
    </div >
  )
}

export default OrderList
