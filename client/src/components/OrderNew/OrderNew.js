import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import './OrderNew.css'
import { createNewOrder, getOrdersAdmissibility } from '../../redux/actions/orderActions'

const OrderNew = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const ordersAdmissibility = useSelector(state => state.order.ordersAdmissibility)
  const newOrdersAdmissibility = ordersAdmissibility.filter(elem => elem.visibleInNewOrder === 'true')
  useEffect(() => {
    dispatch(getOrdersAdmissibility({ company: user.company }))
  }, [dispatch, user.company])

  const initialValues = {
    createDate: '',
    orderCreator: `${user.fullName}`,
  }

  newOrdersAdmissibility.map(ele => initialValues[ele.dbColumnName] = "")

  return (
    <div className='order'>
      <div className='orderWrapper'>
        <div className='requestTitle'>Request</div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values)
            dispatch(createNewOrder({ ...values, company: user.company, user_id: user._id, userId: user.userId }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched, resetForm }) => (
              <Form className='orderForm'>
                <div className='orderField'><span className='orderSpan'>Create date</span><Field name='createDate' placeholder='create date' type='date' className='orderInput' /></div>
                <div lassName='orderField'><span className='orderSpan'>Order creator</span><Field disabled name='orderCreator' placeholder='order creator' type='text' className='orderInput' /></div>
                {
                  newOrdersAdmissibility.map(elem =>
                    <div className='orderField'>
                      <span className='orderSpan'>{elem.columnName}</span>
                      <Field name={elem.dbColumnName} placeholder={elem.columnName} type='text' className='orderInput' />
                    </div>)
                }
                <div className='orderButtonWrapper'>
                  <button className='orderButtonNew' disabled={isSubmitting} type='submit'>Create new order</button>
                  <button className='orderButtonReset' disabled={isSubmitting} type='button' onClick={() => resetForm()} >Clear order</button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div >
  )
}

export default OrderNew
