import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { CgClose } from 'react-icons/cg'
import './CreateDepartment.css'
import { getDepartmentsAction, newDepartmentAction } from '../../../../redux/actions/departmentActions'

const CreateDepartment = ({ isVisible, setIsVisible }) => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])

  const initialValues = {
    address: '',
    departmentName: '',
    phoneNumber: '',
    manager: '',
  }

  return (
    <div className='createDepartment'>
      <div className='createDepartmentHeader'>
        <div className='createDepartmentTitle'>Create new store</div>
        <div className='createDepartmentClose' onClick={() => setIsVisible(!isVisible)}><CgClose size={32} /></div>
      </div>
      <div className='createDepartmentWrapper'>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            await dispatch(newDepartmentAction({ ...values, company: user.company }))
            await dispatch(getDepartmentsAction({ company: user.company }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched, resetForm }) => (
              <Form className='createDepartmentForm'>
                <div className='createDepartmentInputWrapper'>
                  <span className='createDepartmentInputSpan'>Address</span>
                  <Field type='text' name='address' placeholder='Address' className='createDepartmentInput' />
                </div>

                <div className='createDepartmentInputWrapper'>
                  <span className='createDepartmentInputSpan'>Department name</span>
                  <Field type='text' name='departmentName' placeholder='Department name' className='createDepartmentInput' />
                </div>

                <div className='createDepartmentInputWrapper'>
                  <span className='createDepartmentInputSpan'>Department phone number</span>
                  <Field type='text' name='phoneNumber' placeholder='Department phone number' className='createDepartmentInput' />
                </div>

                <div className='createDepartmentInputWrapper'>
                  <span className='createDepartmentInputSpan'>Manager name</span>
                  <Field type='text' name='manager' placeholder='Manager name' className='createDepartmentInput' />
                </div>

                <div className='createDepartmentButtonWrapper'>
                  <button className='createDepartmentButton' type='submit' disabled={isSubmitting} >
                    Create
                  </button>
                  <button className='createDepartmentButtonClear' type='button' disabled={isSubmitting} onClick={() => resetForm()}>
                    Clear
                  </button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

export default CreateDepartment
