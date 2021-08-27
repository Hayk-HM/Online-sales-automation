import React from 'react'
import { BiTask, BiChat, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { FaPenNib } from 'react-icons/fa'
import { RiAdminLine } from 'react-icons/ri'
import { CgList } from 'react-icons/cg'
import './TaskAppSideBar.css'

const TaskAppSideBar = () => {

  const location = useLocation()
  const activeField = (location.pathname.split('/')[location.pathname.split('/').length - 1]);

  return (
    <div className='taskAppSideBar'>
      <div className='taskAppSideBarWrapper'>

        <Link to='/app/neworder'>
          <div className={`taskAppSideBarTasks ${activeField === 'neworder' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><FaPenNib size={20} /></div>
            <div className='taskAppSideBarName'>New Order</div>
          </div>
        </Link>

        <Link to='/app/orderlist'>
          <div className={`taskAppSideBarTasks ${activeField === 'orderlist' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><CgList size={20} /></div>
            <div className='taskAppSideBarName'>Order List</div>
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

        <Link to={`/administrationpanel`}>
          <div className={`taskAppSideBarTasks ${activeField === 'administrationtools' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><RiAdminLine size={20} /></div>
            <div className='taskAppSideBarName'>Administration panel</div>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default TaskAppSideBar