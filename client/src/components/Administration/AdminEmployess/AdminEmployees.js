import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentsAction } from '../../../redux/actions/departmentActions'
import { getAllEmployees } from '../../../redux/actions/employeesActions'
import { getEmployeeInformation } from '../../../redux/actions/employeesActions'
import Employee from '../../Employees/Employee/Employee'
import { getPositionsAction } from '../../../redux/actions/positionActions'
import './AdminEmployees.css'
import AdminUpdateEmployees from './AdminUpdateEmployees/AdminUpdateEmployees'

const AdminEmployees = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const { employees } = useSelector(state => state.employees)
  const [isOpen, setIsOpen] = useState(false)
  const { employee } = useSelector(state => state.employees)
  const { departments } = useSelector(state => state.department)
  const { positions } = useSelector(state => state.position)

  useEffect(() => {
    dispatch(getAllEmployees({ company: user.company }))
    dispatch(getDepartmentsAction({ company: user.company }))
    dispatch(getPositionsAction({ company: user.company }))
  }, [dispatch, user])

  const handleClick = (employee) => {
    setIsOpen(true)
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
        isOpen ? <AdminUpdateEmployees positions={positions} departments={departments} employee={employee} setIsOpen={setIsOpen} user={user} /> : null
      }
    </div>
  )
}

export default AdminEmployees
