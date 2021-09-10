import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '../../../redux/actions/employeesActions'
import Employee from '../../Employees/Employee/Employee'
import './AdminEmployees.css'

const AdminEmployees = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { employees } = useSelector(state => state.employees)

  useEffect(() => {
    dispatch(getAllEmployees({ company: user.company }))
  }, [dispatch, user])

  return (
    <div className='adminEmployees'>
      <div className='adminEmployeesWrapper'>
        <div className='adminEmployeesTitle'>Employees</div>
        <div className='adminEmployeesBody'>
          {
            employees.map(employee => <Employee employee={employee} />)
          }
        </div>
      </div>
    </div>
  )
}

export default AdminEmployees
