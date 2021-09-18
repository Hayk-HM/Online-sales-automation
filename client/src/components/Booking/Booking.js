import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { getDailyWebOrdersAction, getExcelsWebOrderAction } from '../../redux/actions/excelActions'
import { getAllOrders, getMultiOrdersColumns } from '../../redux/actions/orderActions'
import './Booking.css'
import { getOrdersWithBalanceAction } from '../../redux/actions/ordersWithBalanceActions'

const Booking = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { orders } = useSelector(state => state.order)
  const { multiOrdersAdmissibility } = useSelector(state => state.order)
  const { dailyWebOrders } = useSelector(state => state.excels)

  let codesArr = []
  let multiOrders = []
  multiOrdersAdmissibility.map(elem => multiOrders.push(elem.dbColumnName))

  useEffect(() => {
    dispatch(getMultiOrdersColumns({ company: user.company }))
  }, [dispatch, user])

  const initialValues = {
    createDate: ''
  }

  return (
    <div className='booking'>
      <div className='bookingWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              createDate: Yup.string().max(255).required('Create Date is required'),
            })
          }
          onSubmit={async (values, actions) => {
            await dispatch(getAllOrders({ company: user.company, createDate: values.createDate }))
            await dispatch(getDailyWebOrdersAction({ company: user.company, createDate: values.createDate }))
            // actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched }) => (
              <Form className='bookingForm'>
                <Field className='bookingFormField' type='date' name='createDate' />
                {touched.createDate && errors.createDate && <div className='signInError'>{errors.createDate}</div>}
                <div className='bookingFormButtonWrapper'>
                  <button className='bookingButton' type='submit'>Request</button>
                </div>
              </Form>
            )
          }
        </Formik>
        {/* {
          !(orders.length === 0 && dailyWebOrders.length === 0)
            ? <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Color</th>
                  <th>Size</th>
                </tr>
              </thead>
              {
                orders.map(order => (
                  multiOrders.map(multiOrder => {
                    const multiOrderObj = JSON.parse(order[multiOrder])
                    const keysForMultiOrderObj = Object.keys(multiOrderObj[0])

                    console.log('multiOrderObj', multiOrderObj);
                    codesArr.push(+multiOrderObj[0][keysForMultiOrderObj[0]])
                    return <tbody> <tr>
                      <td>{order.Id}</td>
                      {
                        keysForMultiOrderObj.map(elem => <td>{multiOrderObj[0][elem]}</td>)
                      }
                    </tr></tbody>
                  })
                ))
              }

              {
                dailyWebOrders.map(dailyWebOrder => {

                  console.log(codesArr);
                  const dailyWebOrderObj = JSON.parse(dailyWebOrder.balance)
                  codesArr.push(dailyWebOrderObj.Code)
                  console.log(codesArr);
                  return <tbody> <tr>
                    <td>{dailyWebOrderObj.ID}</td>
                    <td>{dailyWebOrderObj.Code}</td>
                    <td>{dailyWebOrderObj.Order}</td>
                  </tr></tbody>
                })
              }
            </table> : null
        } */}
      </div>
    </div>
  )
}

export default Booking
