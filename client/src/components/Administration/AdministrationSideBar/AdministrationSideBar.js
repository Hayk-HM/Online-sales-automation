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
import { SiMicrosoftexcel } from 'react-icons/si'
import { ImStatsBars2 } from 'react-icons/im'
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

        <Link to='/administrationpanel/importexcelbalance'>
          <div className={`taskAppSideBarTasks ${activeField === 'importexcelbalance' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><SiMicrosoftexcel size={20} /></div>
            <div className='taskAppSideBarName'>Import Excel Balance</div>
          </div>
        </Link>

        <Link to='/administrationpanel/importexcelweborder'>
          <div className={`taskAppSideBarTasks ${activeField === 'importexcelweborder' ? 'activeField' : 'notActiveField'}`}>
            <div className='taskAppSideBarLogo'><SiMicrosoftexcel size={20} /></div>
            <div className='taskAppSideBarName'>Import Excel Web Order</div>
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
            <div className='administrationSideBarName'>Employess Positions</div>
          </div>
        </Link>

        <Link to='/administrationpanel/department'>
          <div className={`administrationSideBarTasks ${activeField === 'department' ? 'activeField' : 'notActiveField'}`}>
            <div className='administrationSideBarLogo'><HiOutlineOfficeBuilding size={20} /></div>
            <div className='administrationSideBarName'>Department</div>
          </div>
        </Link>

        <Link to='/administrationpanel/ordertatus'>
          <div className={`administrationSideBarTasks ${activeField === 'ordertatus' ? 'activeField' : 'notActiveField'}`}>
            <div className='administrationSideBarLogo'><ImStatsBars2 size={20} /></div>
            <div className='administrationSideBarName'>Order Status</div>
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
