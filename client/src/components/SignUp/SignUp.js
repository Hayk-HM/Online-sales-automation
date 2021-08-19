import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import './SignUp.css'
import { signUpAction } from '../../redux/actions/authActions'

const SignUp = () => {

  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  return (
    <div className='signUp'>
      <div className='signUpWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
              company: Yup.string().max(255).required('Company is required'),
              firstName: Yup.string().max(255).required('FirstName is required'),
              lastName: Yup.string().max(255).required('LastName is required'),
            })
          }
          onSubmit={(values, actions) => {
            const { email, password, company, firstName, lastName } = values
            dispatch(signUpAction({ email, password, company: company.replaceAll(' ', '_'), firstName, lastName }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched, handleSubmit }) => (
              <div className='signInFormInputs'>
                <div className='signInTitle'>
                  SignUp
                </div>
                <Form className='signUpForm'>
                  <Field
                    className='signUpInputFirstName'
                    type='text'
                    placeholder='first name'
                    name='firstName'
                  />
                  {touched.firstName && errors.firstName && <div className='signUpError'>{errors.firstName}</div>}
                  <Field
                    className='signUpInputLastName'
                    type='text'
                    placeholder='last name'
                    name='lastName'
                  />
                  {touched.lastName && errors.lastName && <div className='signUpError'>{errors.lastName}</div>}
                  <Field
                    className='signUpInputCompany'
                    type='text'
                    placeholder='company'
                    name='company'
                  />
                  {touched.company && errors.company && <div className='signUpError'>{errors.company}</div>}
                  <Field
                    className='signUpInputEmail'
                    type='email'
                    placeholder='email'
                    name='email'
                  />
                  {touched.email && errors.email && <div className='signUpError'>{errors.email}</div>}
                  <Field
                    className='signUpInputPassword'
                    type='password'
                    placeholder='password'
                    name='password'
                  />
                  {touched.password && errors.password && <div className='signUpError'>{errors.password}</div>}
                  <div className='signUpButtonWrapper'>
                    <button className='signUpButton' disabled={isSubmitting} type='submit'>SignIn</button>
                  </div>
                </Form>
              </div>
            )
          }
        </Formik >
      </div >
    </div >
  )
}

export default SignUp

