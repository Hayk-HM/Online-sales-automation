import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, getMultiOrdersColumnsAdmissibility, getOrdersAdmissibility } from '../../redux/actions/orderActions'
import './OrderList.css'

const OrderList = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const orders = useSelector(state => state.order.orders)
  const ordersAdmissibility = useSelector(state => state.order.ordersAdmissibility)
  const ordersMultiAdmissibility = useSelector(state => state.order.multiOrdersAdmissibility)
  const newOrdersAdmissibility = ordersAdmissibility.filter(elem => elem.visibleInOrderList === 'true')
  const newMultiOrdersAdmissibility = ordersMultiAdmissibility.filter(elem => elem.visibleInOrderList === 'true')

  const reportColumns = [...newOrdersAdmissibility.map(elem => elem.dbColumnName),
  ...newMultiOrdersAdmissibility.map(elem => elem.dbColumnName)]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders({ company: user.company }))
    dispatch(getOrdersAdmissibility({ company: user.company }))
    dispatch(getMultiOrdersColumnsAdmissibility({ company: user.company }))
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
          }
        </table>
      </div>
    </div >
  )
}

export default OrderList
