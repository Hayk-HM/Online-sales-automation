import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import './UpdateDepartment.css'
import { getDepartmentAction, getDepartmentsAction, updateDepartmentAction } from '../../../../redux/actions/departmentActions'

const UpdateDepartment = ({ isUpdateVisible, setIsUpdateVisible }) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { department } = useSelector(state => state.department)
  const dispatch = useDispatch()

  const initialValues = {
    address: department[0]?.address,
    departmentName: department[0]?.departmentName,
    manager: department[0]?.manager,
    phoneNumber: department[0]?.phoneNumber,
  }

  console.log('initialValues', initialValues);
  return (
    <div className='updateDepartment'>
      <div className='updateDepartmentWrapper'>
        <div className='updateDepartmentHeader'>
          <div className='updateDepartmentTitle'>Update</div>
          <div className='updateDepartmentClose' onClick={() => setIsUpdateVisible(!isUpdateVisible)}><CgClose size={32} /></div>
        </div>
        <div className='updateDepartmentBody'>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              await dispatch(updateDepartmentAction({ ...values, company: user.company, id: department[0]._id }))
              await dispatch(getDepartmentAction({ company: user.company, id: department[0]._id }))
              await dispatch(getDepartmentsAction({ company: user.company }))
              console.log('values', values);
              actions.resetForm()
            }}
          >
            {
              ({ errors, isSubmitting, touched }) => (
                <Form className='updateDepartmentForm'>
                  <Field type='text' name='address' className='updateDepartmentInput' placeholder='Address' />
                  <Field type='text' name='departmentName' className='updateDepartmentInput' placeholder='DepartmentName' />
                  <Field type='text' name='manager' className='updateDepartmentInput' placeholder='Manager' />
                  <Field type='text' name='phoneNumber' className='updateDepartmentInput' placeholder='Phone number' />
                  <div className='updateDepartmentButtonWrapper'>
                    <button type='submit' className='updateDepartmentButton'>Update</button>
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default UpdateDepartment
