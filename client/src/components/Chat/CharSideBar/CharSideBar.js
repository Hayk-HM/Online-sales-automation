import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CharSideBar.css'
import avatar from '../../../img/userAvatar.png'

const CharSideBar = () => {

  const dispatch = useDispatch()
  const [checkedUser, setCheckedUser] = useState('')
  const { employees } = useSelector(state => state.employees)
  const { activeUsers } = useSelector(state => state)

  return (
    <div className='chatSideBar'>
      <div className='chatSideBarWrapper'>
        {
          employees.map(employee => (
            <div className='chatSideBarEmployee'>
              <div className='chatSideBarEmployeeWrapper'>
                <div className={`chatSideBarEmployeePhoto ${checkedUser === employee.userId ? 'chatSideBarEmployeeActive' : 'chatSideBarEmployeeNotActive'}`} onClick={() => setCheckedUser(employee.userId)}>
                  {
                    employee.photo
                      ? <img src={`//localhost:5000/image/1630310843594-84542.jpg`} alt='chatSideBarPhoto' className='chatSideBarPhoto' />
                      : <img src={avatar} alt='employeeSettingsPhoto' className='chatSideBarPhoto' />
                  }
                  <div className='chatSideBarEmployeeFullName'>{employee.fullName}</div>
                  <div className={activeUsers.some(user => user.userId === employee.userId) ? `chatSideBarEmployeeIsActive` : `chatSideBarEmployeeIsNotActive`}></div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default CharSideBar
