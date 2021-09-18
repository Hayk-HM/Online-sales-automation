import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, FieldArray } from 'formik'
import * as Yup from 'yup'
import './OrderNew.css'
import { createNewAllOrder, createNewOrder, getMultiOrdersColumnsAdmissibility, getOrdersAdmissibility } from '../../redux/actions/orderActions'

const OrderNew = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const ordersAdmissibility = useSelector(state => state.order.ordersAdmissibility)
  const newOrdersAdmissibility = ordersAdmissibility.filter(elem => elem.visibleInNewOrder === 'true')
  const multiOrdersAdmissibility = useSelector(state => state.order.multiOrdersAdmissibility)
  const newMultiOrdersAdmissibility = multiOrdersAdmissibility.filter(elem => elem.visibleInNewOrder === 'true')

  useEffect(() => {
    dispatch(getOrdersAdmissibility({ company: user.company }))
    dispatch(getMultiOrdersColumnsAdmissibility({ company: user.company }))
  }, [dispatch, user.company])


  const initialValues = {
    createDate: '',
  }

  newOrdersAdmissibility.map(ele => initialValues[ele.dbColumnName] = "")
  newMultiOrdersAdmissibility.map(ele => initialValues[ele.dbColumnName] = "")
  newMultiOrdersAdmissibility.map(multiOrder => [Object.keys(JSON.parse(multiOrder.value))][0].map(elem => initialValues[elem] = ""))
  newMultiOrdersAdmissibility.map(ele => initialValues[ele.dbColumnName] = [JSON.parse(ele.value)])
  initialValues['orderCreator'] = user.fullName

  return (
    <div className='order'>
      <div className='orderWrapper'>
        <div className='requestTitle'>Request</div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              createDate: Yup.string().max(255).required('Create Date is required'),
            })
          }
          onSubmit={async (values, actions) => {
            // dispatch(createNewOrder({ ...values, company: user.company, user_id: user._id, userId: user.userId }))
            const needFields = [...newMultiOrdersAdmissibility.map(elem => elem.dbColumnName), ...newOrdersAdmissibility.map(elem => elem.dbColumnName)]
            const sendingObj = {}
            needFields.map(elem => sendingObj[elem] = values[elem])
            needFields.map(elem => {
              if (typeof (sendingObj[elem]) === 'object') {
                const subFields = Object.keys(sendingObj[elem][0])
                subFields.map(subElem => sendingObj[elem][0][subElem] = values[subElem])
              } else {
                sendingObj[elem] = values[elem]
              }
            })
            const arrAllOrders = []
            const forAllOrders = Object.keys(values)
            forAllOrders.map(elem => {
              if (typeof (values[elem]) === 'object') {
                let subArrays = Object.keys(values[elem][0])
                if (values[elem][0][subArrays[0]] === '') {
                  return
                } else {
                  arrAllOrders.push(...values[elem])
                }
              }
            }
            )
            console.log('arrAllOrders', arrAllOrders);
            await dispatch(createNewOrder({ ...sendingObj, company: user.company, user_id: user._id, userId: user.userId, createDate: values.createDate, orderCreator: values.orderCreator }))
            await dispatch(createNewAllOrder({ product: arrAllOrders, company: user.company, user_id: user._id, userId: user.userId, createDate: values.createDate, orderCreator: values.orderCreator, id: values.Id }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched, resetForm, values }) => (

              <Form className='orderForm'>
                <div className='orderField'><span className='orderSpan'>Create date</span><Field name='createDate' placeholder='create date' type='date' className='orderInput' /></div>
                {touched.createDate && errors.createDate && <div className='signInError'>{errors.createDate}</div>}
                <div lassName='orderField'><span className='orderSpan'>Order creator</span><Field disabled name='orderCreator' placeholder='order creator' type='text' className='orderInput' /></div>
                {
                  newOrdersAdmissibility.map(elem =>
                    <div className='orderField'>
                      <span className='orderSpan'>{elem.columnName}</span>
                      <Field name={elem.dbColumnName} placeholder={elem.columnName} type='text' className='orderInput' />
                    </div>)
                }
                {
                  newMultiOrdersAdmissibility.map(order => {
                    const orderArr = JSON.parse(order.value)
                    const subField = Object.keys(orderArr)
                    return <div className='orderField'>
                      <span className='orderSpanTitle'>{order?.columnName}</span>
                      {
                        subField.map(subOrder => {
                          return <div>
                            <span className='orderSpan'>{subOrder}</span>
                            <Field name={subOrder} placeholder={subOrder} type='text' className='orderInput' />
                          </div>
                        })
                      }
                    </div>
                  }
                  )
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
