import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import './SignIn.css'
import { signInAction } from '../../redux/actions/authActions'
import { useHistory } from 'react-router-dom'

const SignIn = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const initialValues = {
    email: '',
    password: '',
    company: '',
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
              company: Yup.string().max(255).required('Company is required'),
            })
          }
          onSubmit={(values, actions) => {
            const { email, password, company } = values
            dispatch(signInAction({ email, password, company: company.replaceAll(' ', '_') }, history))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched }) => (
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
                  {touched.email && errors.email && <div className='signInError'>{errors.email}</div>}
                  <Field
                    className='signInInputPassword'
                    type='password'
                    placeholder='password'
                    name='password'
                  />
                  {touched.password && errors.password && <div className='signInError'>{errors.password}</div>}
                  <Field
                    className='signInInputCompany'
                    type='text'
                    placeholder='company'
                    name='company'
                  />
                  {touched.company && errors.company && <div className='signInError'>{errors.company}</div>}
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
