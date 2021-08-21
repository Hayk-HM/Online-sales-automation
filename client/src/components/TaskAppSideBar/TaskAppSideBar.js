import React from 'react'
import { BiTask, BiChat, BiUser } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import './TaskAppSideBar.css'

const TaskAppSideBar = () => {

  const location = useLocation()
  const activeField = (location.pathname.split('/')[2]);

  return (
    <div className='taskAppSideBar'>
      <div className='taskAppSideBarWrapper'>

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

      </div>
    </div>
  )
}

export default TaskAppSideBar