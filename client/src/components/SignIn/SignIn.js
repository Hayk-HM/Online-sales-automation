import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import './SignIn.css'
import { signInAction } from '../../redux/actions/authActions'

const SignIn = () => {

  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    password: '',
  }

  return (
    <div className='signIn'>
      <div className='signInWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
            })
          }
          onSubmit={(values, actions) => {
            dispatch(signInAction(values))
            actions.resetForm()
          }}
        >
          {
            ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit, resetForm }) => (
              <div className='signInFormInputs'>
                <div className='signInTitle'>
                  SignIn
                </div>
                <Form className='signInForm'>
                  <Field
                    className='signInInputEmail'
                    type='email'
                    placeholder='email'
                    name='email'
                  />
                  {touched.email && errors.email && <div className='signUpError'>{errors.email}</div>}
                  <Field
                    className='signInInputPassword'
                    type='password'
                    placeholder='password'
                    name='password'
                  />
                  {touched.password && errors.password && <div className='signUpError'>{errors.password}</div>}
                  <div className='signInButtonWrapper'>
                    <button className='signInButton' disabled={isSubmitting} type='submit'>SignIn</button>
                  </div>
                </Form>
              </div>
            )
          }
        </Formik>
      </div>
    </div>
  )
}

export default SignIn
