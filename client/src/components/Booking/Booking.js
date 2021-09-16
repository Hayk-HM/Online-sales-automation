import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDailyWebOrdersAction, getExcelsWebOrderAction } from '../../redux/actions/excelActions'
import { getAllOrders, getMultiOrdersColumns } from '../../redux/actions/orderActions'
import './Booking.css'

const Booking = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { orders } = useSelector(state => state.order)
  const { multiOrdersAdmissibility } = useSelector(state => state.order)
  const { dailyWebOrders } = useSelector(state => state.excels)
  console.log('dailyWebOrders', dailyWebOrders);

  let multiOrders = []
  multiOrdersAdmissibility.map(elem => multiOrders.push(elem.dbColumnName))

  useEffect(() => {
    dispatch(getAllOrders({ company: user.company }))
    dispatch(getMultiOrdersColumns({ company: user.company }))
    dispatch(getDailyWebOrdersAction({ company: user.company }))
  }, [dispatch, user])

  return (
    <div className='booking'>
      <div className='bookingWrapper'>
        {
          orders.map(order => <div className='bookingOrder'>

            {
              multiOrders.map(multiOrder => {
                const multiOrderObj = JSON.parse(order[multiOrder])
                const keysForMultiOrderObj = Object.keys(multiOrderObj[0])
                return <div className='bookingProducts'>
                  <div className='bookingId'>{order.Id}</div>
                  {
                    keysForMultiOrderObj.map(elem => <div className={`bookingProduct`}>{multiOrderObj[0][elem]}</div>)
                  }
                </div>
              })
            }
            {
              dailyWebOrders.map(dailyWebOrder => {
                const dailyWebOrderObj = JSON.parse(dailyWebOrder.balance)
                console.log('dailyWebOrderObj', dailyWebOrderObj);
                return <div className='bookingProducts'>
                  <div className='bookingProduct'>{dailyWebOrderObj.ID}</div>
                  <div className='bookingProduct'>{dailyWebOrderObj.Code}</div>
                  <div className='bookingProduct'>{dailyWebOrderObj.Order}</div>
                </div>
              })
            }
          </div>)
        }
      </div>
    </div>
  )
}

export default Booking
