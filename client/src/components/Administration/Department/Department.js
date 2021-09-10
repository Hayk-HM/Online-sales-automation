import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import { deleteDepartmentAction, getDepartmentAction, getDepartmentsAction } from '../../../redux/actions/departmentActions'
import CreateDepartment from './CreateDepartment/CreateDepartment'
import './Department.css'
import UpdateDepartment from './UpdateDepartment/UpdateDepartment'

const Department = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const { departments } = useSelector(state => state.department)

  useEffect(() => {
    dispatch(getDepartmentsAction({ company: user.company }))
  }, [dispatch, user])

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  const handleUpdate = async (id) => {
    await dispatch(getDepartmentAction({ company: user.company, id }))
    setIsUpdateVisible(!isUpdateVisible)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?. \nYou can no longer restore it !!!?')) {
      await dispatch(deleteDepartmentAction({ company: user.company, id }))
      await dispatch(getDepartmentsAction({ company: user.company }))
    } else {
      console.log('Keep');
    }

  }

  return (
    <div className='department'>
      <div className='departmentWrapper'>
        <div className='departmentTitle'>Create department</div>
        <div className='departmentCenter'>
          <div className='departmentAddButtonCover'>
            {
              isVisible
                ? <button className='departmentAddButton' onClick={handleClick}>-</button>
                : <button className='departmentAddButton' onClick={handleClick}>+</button>
            }
          </div>
          <div className='departmentsWrapper'>
            {
              departments.map(department => <div className='depWrapper'>
                <div className='depAddress'>{department.address}</div>
                <div className='depDepartmentName'>{department.departmentName}</div>
                <div className='depManager'>{department.manager}</div>
                <div className='depPhoneNumber'>{department.phoneNumber}</div>
                <div className='depEdit' onClick={() => handleUpdate(department._id)}><AiOutlineEdit size={24} /></div>
                <div className='depDelete' onClick={() => handleDelete(department._id)}><RiDeleteBinLine size={24} /></div>
              </div>)
            }

          </div>
        </div>
      </div>
      <div className={`departmentCreateDepartment ${!isVisible ? 'departmentDeActive' : 'departmentActive'}`}>
        <CreateDepartment isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
      <div className={`departmentCreateDepartment ${!isUpdateVisible ? 'departmentDeActive' : 'departmentActive'}`}>
        <UpdateDepartment isUpdateVisible={isUpdateVisible} setIsUpdateVisible={setIsUpdateVisible} />
      </div>
    </div>
  )
}

export default Department
