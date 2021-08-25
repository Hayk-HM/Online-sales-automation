import React from 'react'
import { BiTask, BiChat, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { FaShippingFast } from 'react-icons/fa'
import './TaskAppSideBar.css'

const TaskAppSideBar = () => {

  const location = useLocation()
  const activeField = (location.pathname.split('/')[location.pathname.split('/').length - 1]);

  return (
    <div className='taskAppSideBar'>
      <div className='taskAppSideBarWrapper'>

        <Link to='/app/orders'>
          <div className={`taskAppSideBarTasks ${activeField === 'orders' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><FaShippingFast size={20} /></div>
            <div className='taskAppSideBarName'>Orders</div>
          </div>
        </Link>

        <Link to='/app/task'>
          <div className={`taskAppSideBarTasks ${activeField === 'task' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><BiTask size={20} /></div>
            <div className='taskAppSideBarName'>Task</div>
          </div>
        </Link>

        <Link to='/app/chat'>
          <div className={`taskAppSideBarTasks ${activeField === 'chat' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><BiChat size={20} /></div>
            <div className='taskAppSideBarName'>Chat</div>
          </div>
        </Link>

        <Link to='/app/employees'>
          <div className={`taskAppSideBarTasks ${activeField === 'employees' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><BiUser size={20} /></div>
            <div className='taskAppSideBarName'>Employees</div>
          </div>
        </Link>

        <Link to={`/app/employees/settings`}>
          <div className={`taskAppSideBarTasks ${activeField === 'settings' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><FiSettings size={20} /></div>
            <div className='taskAppSideBarName'>Settings</div>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default TaskAppSideBar