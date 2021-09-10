
import React from 'react'
import './EmployeeInformation.css'
import photo from '../../img/userAvatar.png'

const EmployeeInformation = () => {
  return (
    <div className='employeeInformation'>
      <div className="employeeInformationWrapper">
        <div className='employeeInformationPhotoCover'>
          <img src={photo} alt='employeeInformationPhoto' className='employeeInformationPhoto' />
        </div>
        <div className='employeeInformationInformation'>
          <div className='employeeInformationChangePhoto'></div>
          <div className='employeeInformationFirstName'></div>
          <div className='employeeInformationLastName'></div>
          <div className='employeeInformationCompanyName'></div>
          <div className='employeeInformationEmail'></div>
          <div className='employeeInformationPosition'></div>
          <div className='employeeInformationDepartment'></div>
          <div className='employeeInformationCellPhoneOne'></div>
          <div className='employeeInformationCellPhoneTwo'></div>
          <div className='employeeInformationPhone'></div>
          <div className='employeeInformationAddress'></div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeInformation
