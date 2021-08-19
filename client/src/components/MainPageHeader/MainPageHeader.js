import React from 'react'
import { Link } from 'react-router-dom'
import './MainPageHeader.css'

const MainPageHeader = () => {
  return (
    <div className='MainPageHeader'>
      <div className='MainPageHeaderWrapper'>
        <div className='MainPageHeaderLogo'>
          <div className='MainPageHeaderCompanyName'>
            TASK APP
          </div>
        </div>
        <div className='MainPageHeaderLog'>
          <div className='MainPageHeaderSignIn'>
            <Link to='/signin'>
              <button className='MainPageHeaderSignInButton'> SignIn </button>
            </Link>
          </div>
          <div className='MainPageHeaderSignUp'>
            <Link to='/signup'>
              <button className='MainPageHeaderSignUpButton'> SignUp </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPageHeader
