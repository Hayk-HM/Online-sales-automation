import React, { useEffect } from 'react'
import { AiTwotonePhone } from 'react-icons/ai'
import { BsPhone } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import './Employee.css'
import avatar from '../../../img/userAvatar.png'

const Employee = ({ employee }) => {

  return (
    <div className='employee'>
      <div className='employeeWrapper'>
        <div className='employeePhotoCover'><img className='employeePhoto' src={avatar} alt='employeePhoto' /></div>
        <div className='employeeInfoPartOne'>
          <div className='employeeFullName'>{`${employee.firstName} ${employee.lastName}`}</div>
          <div className='employeePosition'>MARKETOLOG</div>
          <div className='employeeDepartment'>MARKETING</div>
        </div>
        <div className='employeeInfoPartTwo'>
          <div className='employeePhoneNumber'><BsPhone /><span>033 53 44 12</span></div>
          <div className='employeePhoneNumber'><BsPhone /><span>095 54 54 54</span></div>
          <div className='employeeCellPhoneNumber'><AiTwotonePhone /><span>060 56 89 23</span></div>
        </div>
        <div className='employeeInfoPartThree'>
          <div className='employeeAddress'><AiFillHome /><span>Manandyan 33/27</span></div>
        </div>
        <div className='isActive'></div>
      </div>
    </div>
  )
}

export default Employee
