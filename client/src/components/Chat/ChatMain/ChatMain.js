import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './ChatMain.css'
import Message from './Message/Message'
import { useDispatch } from 'react-redux'

const ChatMain = () => {

  const [messages, setMessage] = useState(['dewdqwdqwd qwdqwdqw dqwdqwdqw dqwdqwdqwdqwdqw qqwdqwdqwdqwdqwdewd qwdqwdqwdqwdqwdqwdqwdqwd qwdqwdqwdqwdqwqqwdqwdqwdqwdqw', 'asdadad', 'asda', 'dasdsada'])
  const dispatch = useDispatch()

  const initialValues = {
    message: ''
  }

  return (
    <div className='ChatMain'>
      <div className='ChatMainWrapper'>
        <div className='chatMainMessages'>
          {
            messages?.map(message => (
              <div className='chatMainLeft'><Message message={message} /></div>
            ))
          }
        </div>
        <div className='messageInputWrapper'>
          <Formik
            initialValues={initialValues}
            validationSchema={
              Yup.object().shape({
                message: Yup.string().max(255).required('Message is required'),
              })
            }
            onSubmit={(values, actions) => {
              const { message } = values
              setMessage([...messages, message])
              console.log(messages);
              actions.resetForm()
            }}
          >
            {
              ({ errors, isSubmitting, touched }) => (
                <Form className='messageForm'>
                  <div className='messageReq'>
                    <Field
                      className='messageInput'
                      type='text'
                      placeholder='New message'
                      name='message'
                    />
                    {touched.message && errors.message && <div className='signInError'>{errors.message}</div>}
                  </div>
                  <div className='messageButtonWrapper'>
                    <button className='messageButton' disabled={isSubmitting} type='submit'>Send message</button>
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

export default ChatMain
