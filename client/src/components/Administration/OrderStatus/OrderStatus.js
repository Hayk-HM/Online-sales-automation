import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './OrderStatus.css'
import { useDispatch, useSelector } from 'react-redux'
import { createOrderStatusAction, deleteOrderStatusAction, getOrderStatusAction, getOrderStatusesAction } from '../../../redux/actions/orderStatusActions'
import Status from './Status/Status'
import EditOrderStatus from './EditOrderStatus/EditOrderStatus'

const OrderStatus = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { orderStatuses } = useSelector(state => state.orderStatus)
  const [isEdit, setIsEdit] = useState(false)
  console.log(isEdit);
  useEffect(() => {
    dispatch(getOrderStatusesAction({ company: user.company }))
  }, [dispatch, user])

  const initialValues = {
    orderStatus: ""
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?. \nYou can no longer restore it !!!?')) {
      await dispatch(deleteOrderStatusAction({ company: user.company, id }))
      await dispatch(getOrderStatusesAction({ company: user.company }))
    } else {
      console.log('Keep');
    }
  }

  const handleEdit = async (id) => {
    dispatch(getOrderStatusAction({ company: user.company, id }))
    setIsEdit(true)
    console.log('edit');
  }

  return (
    <div className='orderStatus'>
      <div className='orderStatusWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              orderStatus: Yup.string().max(50).required('Order Status is required')
            })
          }
          onSubmit={async (values, actions) => {
            await dispatch(createOrderStatusAction({ company: user.company, orderStatus: values.orderStatus }))
            await dispatch(getOrderStatusesAction({ company: user.company }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, touched }) => (
              <Form className='orderStatusForm'>
                <div className='employeesPositionReq'>
                  <Field name='orderStatus' placeholder='New order status' className='orderStatusField' />
                  {touched.orderStatus && errors.orderStatus && <div className='orderStatusError'>{errors.orderStatus}</div>}
                </div>
                <div className='orderStatusButtonWrapper'>
                  <button className='orderStatusButton' type='onSubmit'>Create</button>
                </div>
              </Form>
            )
          }
        </Formik>
        <div className='orderStatusList'>
          {
            orderStatuses.map(elem => <Status statusName={elem.orderStatus} handleDelete={() => handleDelete(elem._id)} handleEdit={() => handleEdit(elem._id)} />)
          }
        </div>
      </div>
      {
        isEdit ? <EditOrderStatus setIsEdit={setIsEdit} /> : null
      }
    </div>
  )
}

export default OrderStatus
