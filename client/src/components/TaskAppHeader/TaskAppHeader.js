import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { SiCivicrm } from 'react-icons/si'
import { authActions } from '../../redux/actions/authActions'
import './TaskAppHeader.css'

const TaskAppHeader = ({ user }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSignOut = () => {
    dispatch(authActions.logOut(history))
  }

  return (
    <div className='taskAppHeader'>
      <div className='taskAppHeaderWrapper'>
        <div className='taskAppHeaderCompany'>
          <Link to='/app/task'>
            <div className='taskAppHeaderLogo'>
              <SiCivicrm color='rgb(41, 105, 201)' size={50} />
            </div>
          </Link>
          <Link to='/app/task'>
            <div className='taskAppHeaderCompanyName'>
              {user.companyName}
            </div>
          </Link>
        </div>

        <div className='taskAppHeaderUserInfo'>
          <div className='taskAppHeaderUsername'>
            {
              `${user.firstName} ${user.lastName}`
            }
          </div>
          <div className='taskAppHeaderSignOut'>
            <button className='taskAppHeaderSignOutButton' onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskAppHeader
