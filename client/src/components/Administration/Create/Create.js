import React, { useState } from 'react'
import './Create.css'

const Create = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const handleClick = () => {

  }

  return (
    <div className='createStor'>
      <div className='createStorWrapper'>
        <div className='createStorTitle'>Create store</div>
        <div className='createStorCenter'>

        </div>
        <div className='createStorAddButtonCover'>
          <button className='createStorAddButton' onClick={handleClick}>+</button>
        </div>
      </div>
    </div>
  )
}

export default Create
