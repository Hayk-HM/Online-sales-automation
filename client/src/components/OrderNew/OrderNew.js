import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './OrderNew.css'
import { createNewOrder, getOrdersAdmissibility } from '../../redux/actions/orderActions'

const OrderNew = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const ordersAdmissibility = useSelector(state => state.order.ordersAdmissibility)
  console.log(ordersAdmissibility);
  useEffect(() => {
    dispatch(getOrdersAdmissibility({ company: user.company }))
  }, [dispatch, user.company])

  const initialValues = {
    createDate: '',
    orderCreator: `${user.fullName}`,
  }

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
            (errors, isSubmitting, touched) => (
              <Form className='orderForm'>
                <div className='orderField'><span className='orderSpan'>Create date</span><Field name='createDate' placeholder='create date' type='date' className='orderInput' /></div>
                <div lassName='orderField'><span className='orderSpan'>Order creator</span><Field disabled name='orderCreator' placeholder='order creator' type='text' className='orderInput' /></div>
                {
                  ordersAdmissibility.map(elem => <div className='orderField'>
                    <span className='orderSpan'>{elem.columnName}</span>
                    <Field name={elem.dbColumnName} placeholder={elem.columnName} type='text' className='orderInput' />
                  </div>)
                }
                {/* <div className='orderField'><span className='orderSpan'>Product code</span><Field name='productCode' placeholder='product code' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Product name</span><Field name='product' placeholder='product name' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Color</span><Field name='color' placeholder='color' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Size</span><Field name='size' placeholder='size' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Store</span><Field name='store' placeholder='store' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Order quantity</span><Field name='orderQuantity' placeholder='order quantity' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Requested quantity</span><Field name='shippedQuantity' placeholder='requested quantity' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Price</span><Field name='price' placeholder='price' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Purchased quantity</span><Field name='purchasedQuantity' placeholder='purchased quantity' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Customer address</span><Field name='customerAddress' placeholder='customer address' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Phone number One</span><Field name='phoneNumberOne' placeholder='phone number' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Phone number</span><Field name='phoneNumberTwo' placeholder='phone number' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Customer name</span><Field name='customerName' placeholder='customer name' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Order place</span><Field name='orderPlace' placeholder='order Place' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Where to</span><Field name='whereTo' placeholder='where to' type='text' className='orderInput' /></div> */}
                {/* <div className='orderField'><span className='orderSpan'>Comment</span><Field name='comment' placeholder='comment' type='text' className='orderInput' /></div> */}

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
