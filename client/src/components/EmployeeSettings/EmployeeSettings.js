import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { HiOutlinePhotograph } from 'react-icons/hi'
import './EmployeeSettings.css'
import photo from '../../img/userAvatar.png'

const EmployeeSettings = () => {

  useEffect(() => {

  }, [])

  const initialValues = {
    photo: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    position: '',
    department: '',
    cellPhoneOne: '',
    cellPhoneTwo: '',
    phone: '',
    address: '',
    store: '',
  }

  return (
    <div className='employeeSettings'>
      <div className="employeeSettingsWrapper">
        <div className='employeeSettingsPhotoCover'>
          <img src={photo} alt='employeeSettingsPhoto' className='employeeSettingsPhoto' />
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
            onSubmit={(values, actions) => {

              actions.resetForm()
            }}
          >
            {
              ({ errors, isSubmitting, touched }) => (
                <Form className='employeeSettingsForm'>
                  <label name='photo' className='employeeSettingsPhotoLabel'>
                    <span className='employeeSettingsChooseFile' >Choose photo</span>
                    <HiOutlinePhotograph size={50} color='#2969c9' />
                    <Field
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
