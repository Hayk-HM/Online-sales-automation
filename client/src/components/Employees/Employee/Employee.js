import React from 'react'
import { AiTwotonePhone } from 'react-icons/ai'
import { BsPhone } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import './Employee.css'
import avatar from '../../../img/userAvatar.png'

const Employee = ({ employee }) => {

  return (
    <div className='employee'>
      <div className='employeeWrapper'>
        <div className='employeePhotoCover'>
          {
            employee.photo
              ? <img className='employeePhoto' src={`//localhost:5000/image/${employee.photo}`} alt='employeePhoto' />
              : <img className='employeePhoto' src={avatar} alt='employeePhoto' />
          }
        </div>
        <div className='employeeInfoPartOne'>
          <div className='employeeFullName'>{`${employee.firstName} ${employee.lastName}`}</div>
          <div className='employeeOwnPosition'>{employee.position}</div>
          <div className='employeeDepartment'>{employee.department}</div>
        </div>
        <div className='employeeInfoPartTwo'>
          {
            employee.cellPhoneOne ? <div className='employeePhoneNumber'><BsPhone /><span>{employee.cellPhoneOne}</span></div> : null
          }
          {
            employee.cellPhoneTwo ? <div className='employeePhoneNumber'><BsPhone /><span>{employee.cellPhoneTwo}</span></div> : null
          }
          {
            employee.phone ? <div className='employeeCellPhoneNumber'><AiTwotonePhone /><span>{employee.phone}</span></div> : null
          }


        </div>
        <div className='employeeInfoPartThree'>
          <div className='employeeAddress'><AiFillHome /><span>{employee.address}</span></div>
        </div>
        <div className='isActive'></div>
      </div>
    </div>
  )
}

export default Employee
