import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { RiDeleteBinLine } from 'react-icons/ri'
import { getAllEmployees, getEmployeeInformation, updateEmployeeFormData, updateEmployee, deleteEmployee } from '../../../../redux/actions/employeesActions'
import './AdminUpdateEmployees.css'

const AdminUpdateEmployees = ({ employee, setIsOpen, user, departments }) => {
  console.log(departments);
  const dispatch = useDispatch()

  const initialValues = {
    firstName: employee[0]?.firstName,
    lastName: employee[0]?.lastName,
    email: employee[0]?.email,
    address: employee[0]?.address,
    cellPhoneOne: employee[0]?.cellPhoneOne,
    cellPhoneTwo: employee[0]?.cellPhoneTwo,
    position: employee[0]?.position,
    departmentId: employee[0]?.departmentId || '',
    companyName: employee[0]?.companyName,
    administrator: employee[0]?.administrator,
    admitted: employee[0]?.admitted,
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this?. \nYou can no longer restore it !!!?')) {
      await dispatch(deleteEmployee({ company: employee[0].company, id: employee[0]._id }))
      await dispatch(getAllEmployees({ company: user.company }))
      setIsOpen(false)
    } else {
      console.log('Keep');
    }
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
            await dispatch(updateEmployee({ ...values, department: values.departmentId - 1 !== -1 ? departments[values.departmentId - 1].departmentName : "", departmentId: values.departmentId, userId: employee[0].userId, companyName: employee[0].companyName }))
            await dispatch(getAllEmployees({ company: employee[0].company }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched }) => (
              <Form className='adminEmployeeSettingsForm'>
                <span>First name</span><Field className='adminEmployeeSettingsField' type='text' name='firstName' placeholder='First name' />
                <span>Last name</span><Field className='adminEmployeeSettingsField' type='text' name='lastName' placeholder='Last name' />
                <span>Email</span><Field className='adminEmployeeSettingsField' type='email' name='email' placeholder='Email' />
                <span>Address</span><Field className='adminEmployeeSettingsField' type='text' name='address' placeholder='Address' />
                <span>Cell phone number</span><Field className='adminEmployeeSettingsField' type='text' name='cellPhoneOne' placeholder='Cell phone one' />
                <span>Cell phone number</span><Field className='adminEmployeeSettingsField' type='text' name='cellPhoneTwo' placeholder='Cell phone two' />
                <span>position</span><Field className='adminEmployeeSettingsField' type='text' name='position' placeholder='Position' />
                <span>Department</span><Field className='adminEmployeeSettingsField' as='select' name='departmentId'>

                  <option value='' default>-</option>
                  {
                    departments.map(department => <option value={department._id}>{department.departmentName}</option>)
                  }
                </Field>
                <span>Company name</span><Field className='adminEmployeeSettingsField' type='text' name='companyName' disabled />
                <span>Is admin</span><Field className='adminEmployeeSettingsField' as='select' name='administrator' placeholder='administrator'>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Field>
                <span>Admitted</span><Field className='adminEmployeeSettingsField' as='select' name='admitted' placeholder='admitted'>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Field>
                <div className='adminEmployeeSettingsButtonWrapper'>
                  <button type='submit' className='adminEmployeeSettingsButton'>Update</button>
                  <button className='adminEmployeeSettingsDelete' type='button' onClick={handleDelete}>Delete</button>
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