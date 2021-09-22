import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { getAllOrdersWithBalance } from '../../redux/actions/orderActions'
import './Booking.css'
import { getDepartmentsAction } from '../../redux/actions/departmentActions'
import { getOrderStatusesAction } from '../../redux/actions/orderStatusActions'

const Booking = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { allOrdersWithBalance } = useSelector(state => state.order)
  const { multiOrdersAdmissibility } = useSelector(state => state.order)
  const { departments } = useSelector(state => state.department)
  const { orderStatuses } = useSelector(state => state.orderStatus)

  let multiOrders = []
  multiOrdersAdmissibility.map(elem => multiOrders.push(elem.dbColumnName))

  useEffect(() => {
    dispatch(getDepartmentsAction({ company: user.company }))
    dispatch(getOrderStatusesAction({ company: user.company }))
  }, [dispatch, user])

  const initialValues = {
    createDate: ''
  }

  const handleChangeStatus = (status) => {
    console.log(status.target.value);
  }

  const handleChangeQuantity = () => {

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
            await dispatch(getAllOrdersWithBalance({ company: user.company, createDate: values.createDate }))
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
        {
          allOrdersWithBalance.length !== 0 ? <table className='bookingTable'>
            <thead>
              <tr>
                <td>Id</td>
                <td>Code</td>
                <td>Name</td>
                <td>Size</td>
                <td>Color</td>
                <td>Quantity</td>
                {
                  departments.map(elem => <>
                    <td>{elem.departmentName}</td>
                    <td>{elem.departmentName + ' amount'}</td>
                    <td>{elem.departmentName + ' status'}</td>
                  </>)
                }
              </tr>
            </thead>
            <tbody>
              {
                allOrdersWithBalance[0]?.map(elem => {
                  const balance = JSON.parse(elem.balance)
                  return <tr>
                    <td>{elem.id}</td>
                    <td>{elem.code}</td>
                    <td>{elem.productName}</td>
                    <td>{elem.size}</td>
                    <td>{elem.color}</td>
                    <td>{elem.quantity}</td>
                    {
                      departments.map(department => <>
                        <td>{balance[department.departmentName]}</td>
                        <td><input type='number' placeholder='-' onChange={handleChangeQuantity} /></td>
                        <td>
                          <select name='status' id='status' onChange={(e) => handleChangeStatus(e)}>
                            {
                              orderStatuses.map(status =>
                                <option value={status.orderStatus} >{status.orderStatus}</option>)
                            }
                          </select>
                        </td>
                      </>)
                    }
                  </tr>
                })
              }
            </tbody>
          </table>
            : null
        }
      </div>
    </div>
  )
}

export default Booking
