import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '../../../redux/actions/employeesActions'
import { getEmployeeInformation } from '../../../redux/actions/employeesActions'
import Employee from '../../Employees/Employee/Employee'
import './AdminEmployees.css'
import AdminUpdateEmployees from './AdminUpdateEmployees/AdminUpdateEmployees'

const AdminEmployees = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { employees } = useSelector(state => state.employees)
  const [isOpen, setIsOpen] = useState(false)
  const { employee } = useSelector(state => state.employees)
  console.log('employee[0]', employee[0]);

  useEffect(() => {
    dispatch(getAllEmployees({ company: user.company }))
  }, [dispatch, user])

  const handleClick = (employee) => {
    setIsOpen(true)
    console.log(employee);
    dispatch(getEmployeeInformation({ companyName: employee.companyName, userId: employee.userId }))
  }

  return (
    <div className='adminEmployees'>
      <div className='adminEmployeesWrapper'>
        <div className='adminEmployeesTitle'>Employees</div>
        <div className='adminEmployeesBody'>
          {
            employees.map(employee => (
              <div className='adminEmployee' onClick={() => handleClick(employee)} >
                <Employee employee={employee} />
              </div>
            ))
          }
        </div>
      </div>
      {
        isOpen ? <AdminUpdateEmployees employee={employee} setIsOpen={setIsOpen} user={user} /> : null
      }
    </div>
  )
}

export default AdminEmployees
