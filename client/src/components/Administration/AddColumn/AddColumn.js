import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import './AddColumn.css'
import { addOrderColumn } from '../../../redux/actions/orderActions'

const AddColumn = ({ setAddArea, addArea }) => {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const dispatch = useDispatch()

  const handleClick = () => {
    setAddArea(!addArea)
  }

  const initialValues = {
    columnName: '',
    isVisibleInNewOrder: false,
    isVisibleInOrderList: false,
  }

  return (
    <div className='addColumn'>
      <div className='addColumnWrapper'>
        <div className='addColumnHeader'>
          <div className='addColumnLeft'>
            New order column
          </div>
          <div className='addColumnRight' onClick={handleClick}> X </div>
        </div>
        <div className='addColumnBody'>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              dispatch(addOrderColumn({ ...values, company: user.company, table: 'orders' }))
              console.log({ ...values, company: user.company, table: 'orders' });
              actions.resetForm()
              setAddArea(!addArea)
            }}
          >
            <Form>
              <div className='addColumnName'>New Column</div><Field name='columnName' className='addColumnInput' type='text' />
              <div className='addColumnName'>Visibility in new order</div>
              <div>
                <Field name='isVisibleInNewOrder' component='select' className='addColumnSelect' >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Field>
              </div>
              <div className='addColumnName'>Visibility in order list</div>
              <div>
                <Field name='isVisibleInOrderList' className='addColumnSelect' component='select'>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Field>
              </div>
              <div className='addColumnCreateButtonWrapper'>
                <button className='addColumnCreateButton' type='onSubmit'>Create</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddColumn
