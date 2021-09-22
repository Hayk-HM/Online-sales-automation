import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './EditOrderStatus.css'
import { getOrderStatusesAction, updateOrderStatusAction } from '../../../../redux/actions/orderStatusActions'
import { useDispatch, useSelector } from 'react-redux'

const EditOrderStatus = ({ setIsEdit }) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const dispatch = useDispatch()
  const { orderStatus } = useSelector(state => state.orderStatus)


  const initialValues = {
    orderStatus: orderStatus[0]?.orderStatus
  }

  return (
    <div className='editOrderStatus'>
      <div className='editOrderStatusWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({ orderStatus: Yup.string().max(50).required('Order Status is required') })
          }
          onSubmit={async (values, actions) => {
            await dispatch(updateOrderStatusAction({ company: user.company, id: orderStatus[0]._id, orderStatus: values.orderStatus }))
            await dispatch(getOrderStatusesAction({ company: user.company }))
            setIsEdit(false)
          }}
        >
          {
            ({ errors, touched }) => (
              <Form className='editOrderStatusForm'>
                <Field type='input' name='orderStatus' className='editOrderStatusField' />
                {touched.orderStatus && errors.orderStatus && <div className='orderStatusError'>{errors.orderStatus}</div>}
                <div className='editOrderStatusButtonWrapper'>
                  <button type='submit' className='editOrderStatusButtonSave'>Save</button>
                  <button type='button' className='editOrderStatusButtonCancel' onClick={() => setIsEdit(false)}>Cancel</button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

export default EditOrderStatus
