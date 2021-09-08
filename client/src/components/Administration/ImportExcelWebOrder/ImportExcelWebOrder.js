import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { HiOutlinePhotograph } from 'react-icons/hi'
import './ImportExcelWebOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteExcelWebOrderAction, getDailyWebOrderAction, getExcelsWebOrderAction, uploadExcelWebOrderAction } from '../../../redux/actions/excelActions'

const ImportExcelWebOrder = () => {

  const [file, setFile] = useState('')
  const [chosenFile, setChosenFile] = useState('')
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const excels = useSelector(state => state.excels.excelWebOrder)

  useEffect(() => {
    dispatch(getExcelsWebOrderAction({ company: user.company }))
  }, [dispatch, user])

  const initialValues = ({
    excel: ''
  })

  const onChange = (e) => {
    e.preventDefault()
    setChosenFile(e.target.files[0].name);
    if (e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      || e.target.files[0].type === 'application/vnd.ms-excel') {
      setFile(e.target.files[0])
    } else {
      setFile(null)
      alert("Please check excel file")
    }
  }

  const handleClick = async (id, name) => {
    await dispatch(deleteExcelWebOrderAction({ company: user.company, id, name }))
    await dispatch(getExcelsWebOrderAction({ company: user.company }))
  }

  return (
    <div className='importExcel'>
      <div className='importExcelWrapper'>
        <div className='importExcelTitle'>Import web order file</div>
        <Formik
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              excel: Yup.string().max(255)
            })
          }
          onSubmit={async (values, actions) => {
            const data = new FormData()
            data.append('file', file)
            if (!file) return
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              || file.type === 'application/vnd.ms-excel') {
              await dispatch(uploadExcelWebOrderAction({ data, company: user.company }))
              await dispatch(getExcelsWebOrderAction({ company: user.company }))
              await dispatch(getDailyWebOrderAction({ company: user.company }))
            } else {
              return
            }

          }}
        >
          {
            ({ errors, isSubmitting, touched }) => (
              <Form className='importExcelForm'>
                <label name='photo' className='importExcelLabel'>
                  <span className='importExcelSpan'>Chose file</span>
                  <HiOutlinePhotograph size={50} color='#2969c9' />
                  <Field onChange={onChange}
                    type='file'
                    name='excel'
                    className='importExcelField' />
                </label>
                <div className='importExcelButtonWrapper'>
                  <button className='importExcelButton' type='submit'>Read file</button>
                </div>
              </Form>
            )
          }
        </Formik>
        {
          <div className='importExcelChosenFile'><span>Chosen File - </span>{chosenFile}</div>
        }

        {
          excels.map(excel => (
            <div className='importExcelExistedFiles'>
              <div className='importExcelId'>{excel._id}</div>
              {/* <div className='importExcelDate'>{moment(+excel.createDate).format('lll')} - </div> */}
              <div className='importExcelDate'>{excel.createDate}</div>
              <div className='importExcelName'>{excel.originalName}</div>
              <div className='importExcelDelete' onClick={() => handleClick(excel._id, excel.excel)}><RiDeleteBin6Line /></div>
            </div>
          ))
        }

      </div>
    </div >
  )
}

export default ImportExcelWebOrder
