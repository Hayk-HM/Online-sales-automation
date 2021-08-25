import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import './EmployeeSettings.css'
import photo from '../../img/userAvatar.png'
import { getEmployeeInformation, updateEmployeeFormData, uploadEmployeePhoto } from '../../redux/actions/employeesActions'
import { employeesApi } from '../../api/Api'
import Loading from '../Loading/Loading'

const EmployeeSettings = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [file, setFile] = useState(null)

  const initialValues = {
    photo: user.result[0].photo || '',
    firstName: user.result[0].firstName,
    lastName: user.result[0].lastName || '',
    companyName: user.result[0].companyName || '',
    email: user.result[0].email || '',
    position: user.result[0].position || '',
    department: user.result[0].department || '',
    cellPhoneOne: user.result[0].cellPhoneOne || '',
    cellPhoneTwo: user.result[0].cellPhoneTwo || '',
    phone: user.result[0].phone || '',
    address: user.result[0].address || '',
    store: user.result[0].store || '',
  }

  const onChange = async (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
  }

  return (

    <div className='employeeSettings'>
      <div className="employeeSettingsWrapper">
        <div className='employeeSettingsPhotoCover'>
          <img src='//localhost:5000/1629881842954KARE-52564-700x700.jpg' alt='employeeSettingsPhoto' className='employeeSettingsPhoto' />
        </div>
        <hr className='employeeSettingsHr' />
        <div className='employeeSettingsInformation'>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              })
            }
            onSubmit={async (values, actions) => {
              const data = new FormData()
              data.append('file', file)
              await dispatch(uploadEmployeePhoto(data))
              await dispatch(updateEmployeeFormData({ ...values, userId: user.result[0].userId }))
              window.location.reload();
            }}
          >
            {
              ({ errors, isSubmitting, touched }) => (
                <Form className='employeeSettingsForm'>
                  <label name='photo' className='employeeSettingsPhotoLabel'>
                    <span className='employeeSettingsChooseFile' >Choose photo</span>
                    <HiOutlinePhotograph size={50} color='#2969c9' />
                    <Field
                      onChange={onChange}
                      className='employeeSettingsPhotoInput employeeSettingsInput'
                      type='file'
                      placeholder='photo'
                      name='photo'
                    />
                  </label>

                  <Field
                    className='employeeSettingsFirstName employeeSettingsInput'
                    type='text'
                    placeholder='first mame'
                    name='firstName'
                  />

                  <Field
                    className='employeeSettingsLastName employeeSettingsInput'
                    type='text'
                    placeholder='last name'
                    name='lastName'
                  />

                  <Field
                    className='employeeSettingsCompanyName employeeSettingsInput'
                    type='text'
                    placeholder='company name'
                    name='companyName'
                    disabled
                  />

                  <Field
                    className='employeeSettingsEmail employeeSettingsInput'
                    type='email'
                    placeholder='email'
                    name='email'
                  />
                  {touched.email && errors.email && <div className='signInError'>{errors.email}</div>}

                  <Field
                    className='employeeSettingsPosition employeeSettingsInput'
                    type='text'
                    placeholder='position'
                    name='position'
                  />

                  <Field
                    className='employeeSettingsDepartment employeeSettingsInput'
                    type='text'
                    placeholder='department'
                    name='department'
                  />

                  <Field
                    className='employeeSettingsCellPhoneOne employeeSettingsInput'
                    type='text'
                    placeholder='cell phone one'
                    name='cellPhoneOne'
                  />

                  <Field
                    className='employeeSettingsCellPhoneTwo employeeSettingsInput'
                    type='text'
                    placeholder='cell phone two'
                    name='cellPhoneTwo'
                  />

                  <Field
                    className='employeeSettingsPhone employeeSettingsInput'
                    type='text'
                    placeholder='phone'
                    name='phone'
                  />

                  <Field
                    className='employeeSettingsAddress employeeSettingsInput'
                    type='text'
                    placeholder='address'
                    name='address'
                  />

                  <Field
                    className='employeeSettingsStore employeeSettingsInput'
                    type='text'
                    placeholder='store'
                    name='store'
                  />
                  <div className='employeeSettingsButtonWrapper'>
                    <button className='employeeSettingsInButton' disabled={isSubmitting} type='submit'>Save</button>
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

export default EmployeeSettings
