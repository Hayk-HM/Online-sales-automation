import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { createPositionAction, getPositionAction, getPositionsAction, updatePositionAction } from '../../../redux/actions/positionActions'
import './EmployeesPosition.css'
import Position from './Position/Position'

const EmployeesPosition = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { positions } = useSelector(state => state.position)
  const { position } = useSelector(state => state.position)
  const [isEdit, setIsEdit] = useState(false)
  console.log('position', position[0]);
  useEffect(() => {
    dispatch(getPositionsAction({ company: user.company }))
  }, [dispatch, user])

  const initialValues = {
    position: ''
  }

  const initialValueEdit = {
    position: position[0]?.position
  }

  const handleCancel = () => {
    setIsEdit(false)
  }

  return (
    <div className='employeesPosition'>
      <div className='employeesPositionWrapper'>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              position: Yup.string().max(50).required('Position is required')
            })
          }
          onSubmit={async (values, actions) => {
            await dispatch(createPositionAction({ company: user.company, position: values.position }))
            await dispatch(getPositionsAction({ company: user.company }))
            actions.resetForm()
          }}
        >
          {
            ({ errors, isSubmitting, touched }) => (
              <Form className='employeesPositionForm'>
                <div className='employeesPositionReq'>
                  <Field name='position' placeholder='New position' className='employeesPositionField' />
                  {touched.position && errors.position && <div className='employeesPositionError'>{errors.position}</div>}
                </div>
                <div className='employeesPositionButtonWrapper'>
                  <button className='employeesPositionButton' type='submit'>Add</button>
                </div>
              </Form>
            )
          }
        </Formik>
        <div className='employeesPositionList'>
          {isEdit ? <div className='positionEditPart'>
            <Formik
              enableReinitialize
              initialValues={initialValueEdit}
              validationSchema={
                Yup.object().shape({
                  position: Yup.string().max(50).required('Position is required')
                })
              }
              onSubmit={async (values, actions) => {
                await dispatch(updatePositionAction({ ...values, company: user.company, id: position[0]?._id }))
                await dispatch(getPositionsAction({ company: user.company }))
                await dispatch(getPositionAction({ company: user.company, id: position[0]?._id }))
                setIsEdit(false)
                actions.resetForm()
              }}
            >
              {
                ({ errors, isSubmitting, touched }) => (
                  <Form className='editForm'>
                    <div className='editFormFieldWrapper'>
                      <Field name='position' placeholder="Position" className='editFormField' />
                      {touched.position && errors.position && <div className='employeesPositionError'>{errors.position}</div>}
                    </div>
                    <div className='positionEditButtonWrapper'>
                      <button className='positionEditButtonSave' type='submit'>Save</button>
                      <button className='positionEditButtonCancel' type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div> : null}
          {
            positions.map(position => <div className='employeesPositionItem'>
              <Position position={position} user={user} dispatch={dispatch} isEdit={isEdit} setIsEdit={setIsEdit} />
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default EmployeesPosition
