import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './OrderNew.css'
import { createNewOrder } from '../../redux/actions/orderActions'

const OrderNew = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const initialValues = {
    createDate: '',
    product: '',
    store: '',
    orderQuantity: '',
    shippedQuantity: '',
    price: '',
    purchasedQuantity: '',
    customerAddress: '',
    phoneNumberOne: '',
    phoneNumberTwo: '',
    customerName: '',
    orderPlace: '',
    orderCreator: `${user.result[0].fullName}`,
    whereTo: '',
    comment: '',
  }

  return (
    <div className='order'>
      <div className='orderWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values)
            dispatch(createNewOrder({ ...values, company: user.result[0].company, user_id: user.result[0]._id, userId: user.result[0].userId }))
            actions.resetForm()
          }}
        >
          {
            (errors, isSubmitting, touched) => (
              <Form className='orderForm'>

                <div className='orderField'><span className='orderSpan'>Create date</span><Field name='createDate' placeholder='create date' type='date' className='orderInput' /></div>
                <divc lassName='orderField'><span className='orderSpan'>Product</span><Field name='product' placeholder='product' type='text' className='orderInput' /></divc>
                {/* <divc lassName='orderField'><span className='orderSpan'>Store</span><Field name='store' placeholder='store' type='text' className='orderInput' /></divc> */}
                {/* <divc lassName='orderField'><span className='orderSpan'>Order quantity</span><Field name='orderQuantity' placeholder='order quantity' type='text' className='orderInput' /></divc> */}
                <divc lassName='orderField'><span className='orderSpan'>Shipped quantity</span><Field name='shippedQuantity' placeholder='shipped quantity' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Price</span><Field name='price' placeholder='price' type='text' className='orderInput' /></divc>
                {/* <divc lassName='orderField'><span className='orderSpan'>Purchased quantity</span><Field name='purchasedQuantity' placeholder='purchased quantity' type='text' className='orderInput' /></divc> */}
                <divc lassName='orderField'><span className='orderSpan'>Customer address</span><Field name='customerAddress' placeholder='customer address' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Phone numberOne</span><Field name='phoneNumberOne' placeholder='phone number' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Phone number</span><Field name='phoneNumberTwo' placeholder='phone number' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Customer name</span><Field name='customerName' placeholder='customer name' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Order place</span><Field name='orderPlace' placeholder='order Place' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Order creator</span><Field disabled name='orderCreator' placeholder='order creator' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Where to</span><Field name='whereTo' placeholder='where to' type='text' className='orderInput' /></divc>
                <divc lassName='orderField'><span className='orderSpan'>Comment</span><Field name='comment' placeholder='comment' type='text' className='orderInput' /></divc>

                <div className='orderButtonWrapper'>
                  <button className='orderButtonNew' disabled={isSubmitting} type='submit'>Create new order</button>
                  <button className='orderButtonReset' disabled={isSubmitting} type='button' >Clear order</button>
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
