import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { getAllEmployees, getEmployeeInformation, updateEmployeeFormData, updateEmployee } from '../../../../redux/actions/employeesActions'
import './AdminUpdateEmployees.css'

const AdminUpdateEmployees = ({ employee, setIsOpen, user }) => {

  const dispatch = useDispatch()

  const initialValues = {
    firstName: employee[0]?.firstName,
    lastName: employee[0]?.lastName,
    email: employee[0]?.email,
    address: employee[0]?.address,
    phone: employee[0]?.phone,
    cellPhoneOne: employee[0]?.cellPhoneOne,
    cellPhoneTwo: employee[0]?.cellPhoneTwo,
    position: employee[0]?.position,
    department: employee[0]?.department,
    companyName: employee[0]?.companyName,
    administrator: employee[0]?.administrator,
    admitted: employee[0]?.admitted,
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className='adminEmployeeSettings'>
      <div className='adminEmployeeSettingsHeader'>
        <div className='adminEmployeeSettingsTitle'>Employees settings</div>
        <div className='adminEmployeeSettingsClose' onClick={handleClose}>X</div>
      </div>
      <div className='adminEmployeeSettingsWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            console.log(values);
            await dispatch(updateEmployee({ ...values, userId: employee[0].userId, companyName: employee[0].companyName }))
            await dispatch(getAllEmployees({ company: employee[0].company }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched }) => (
              <Form className='adminEmployeeSettingsForm'>
                <Field className='adminEmployeeSettingsField' type='text' name='firstName' placeholder='First name' />
                <Field className='adminEmployeeSettingsField' type='text' name='lastName' placeholder='Last name' />
                <Field className='adminEmployeeSettingsField' type='email' name='email' placeholder='Email' />
                <Field className='adminEmployeeSettingsField' type='text' name='address' placeholder='Address' />
                <Field className='adminEmployeeSettingsField' type='text' name='phone' placeholder='Phone' />
                <Field className='adminEmployeeSettingsField' type='text' name='cellPhoneOne' placeholder='Cell phone one' />
                <Field className='adminEmployeeSettingsField' type='text' name='cellPhoneTwo' placeholder='Cell phone two' />
                <Field className='adminEmployeeSettingsField' type='text' name='position' placeholder='Position' />
                <Field className='adminEmployeeSettingsField' type='text' name='department' placeholder='Department' />
                <Field className='adminEmployeeSettingsField' type='text' name='companyName' disabled />
                <Field className='adminEmployeeSettingsField' as='select' name='administrator' placeholder='administrator'>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Field>
                <Field className='adminEmployeeSettingsField' as='select' name='admitted' placeholder='admitted'>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Field>
                <div className='adminEmployeeSettingsButtonWrapper'>
                  <button type='submit' className='adminEmployeeSettingsButton'>Update</button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

export default AdminUpdateEmployees