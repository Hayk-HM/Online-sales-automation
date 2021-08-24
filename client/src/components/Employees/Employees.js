import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '../../redux/actions/employeesActions'
import Employee from './Employee/Employee'
import './Employees.css'

const Employees = () => {

  const dispatch = useDispatch()
  const employees = useSelector(state => state.employees.employees)

  useEffect(() => {
    const { result } = JSON.parse(localStorage.getItem('user'))
    dispatch(getAllEmployees({ company: result[0].companyName }))

  }, [dispatch])


  return (
    <div className='employees'>
      <div className='employeesWrapper'>
        {
          employees.map(employee => (
            <Employee employee={employee} />
          ))
        }
      </div>
    </div >
  )
}

export default Employees
