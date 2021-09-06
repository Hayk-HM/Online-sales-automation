import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiStore } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { CgWorkAlt } from 'react-icons/cg'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { BsPersonPlus } from 'react-icons/bs'
import { FaRegAddressBook } from 'react-icons/fa'
import { AiOutlineBars } from 'react-icons/ai'
import { BiSelectMultiple } from 'react-icons/bi'
import './AdministrationSideBar.css'

const AdministrationSideBar = () => {

  const location = useLocation()
  const activeField = (location.pathname.split('/')[location.pathname.split('/').length - 1]);

  return (
    <div className='administrationSideBar'>
      <div className='administrationSideBarWrapper'>

        <Link to='/administrationpanel/orderrequestcolumns'>
          <div className={`administrationSideBarTasks ${activeField === 'orderrequestcolumns' ? 'activeField' : 'administrationSideBarNotActiveField'}`}>
            <div className='administrationSideBarLogo'><AiOutlineBars size={20} /></div>
            <div className='administrationSideBarName'>Order Request Columns</div>
          </div>
        </Link>

        <Link to='/administrationpanel/orderrequestcolumnsmulti'>
          <div className={`administrationSideBarTasks ${activeField === 'orderrequestcolumnsmulti' ? 'activeField' : 'administrationSideBarNotActiveField'}`}>
            <div className='administrationSideBarLogo'><BiSelectMultiple size={20} /></div>
            <div className='administrationSideBarName'>Order Request Columns Multi</div>
          </div>
        </Link>

        <Link to='/administrationpanel/store'>
          <div className={`administrationSideBarTasks ${activeField === 'store' ? 'activeField' : 'administrationSideBarNotActiveField'}`}>
            <div className='administrationSideBarLogo'><BiStore size={20} /></div>
            <div className='administrationSideBarName'>Store</div>
          </div>
        </Link>

        <Link to='/administrationpanel/employees'>
          <div className={`administrationSideBarTasks ${activeField === 'employees' ? 'activeField' : 'administrationSideBarNotActiveField'}`}>
            <div className='administrationSideBarLogo'><FiUsers size={20} /></div>
            <div className='administrationSideBarName'>Employees</div>
          </div>
        </Link>

        <Link to='/administrationpanel/position'>
          <div className={`administrationSideBarTasks ${activeField === 'position' ? 'activeField' : 'notActiveField'}`}>
            <div className='administrationSideBarLogo'><CgWorkAlt size={20} /></div>
            <div className='administrationSideBarName'>Position</div>
          </div>
        </Link>

        <Link to='/administrationpanel/department'>
          <div className={`administrationSideBarTasks ${activeField === 'department' ? 'activeField' : 'notActiveField'}`}>
            <div className='administrationSideBarLogo'><HiOutlineOfficeBuilding size={20} /></div>
            <div className='administrationSideBarName'>Department</div>
          </div>
        </Link>

        <Link to='/administrationpanel/customers'>
          <div className={`administrationSideBarTasks ${activeField === 'customers' ? 'activeField' : 'notActiveField'}`}>
            <div className='administrationSideBarLogo'><BsPersonPlus size={20} /></div>
            <div className='administrationSideBarName'>Customers</div>
          </div>
        </Link>

        <Link to='/administrationpanel/address'>
          <div className={`administrationSideBarTasks ${activeField === 'address' ? 'activeField' : 'notActiveField'}`}>
            <div className='administrationSideBarLogo'><FaRegAddressBook size={20} /></div>
            <div className='administrationSideBarName'>Address</div>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default AdministrationSideBar
