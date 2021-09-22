import React from 'react'
import './Status.css'

const Status = ({ statusName, handleDelete, handleEdit }) => {
  return (
    <div className='orderStatus'>
      <div className='orderStatusWrapper'>
        <div className='orderStatusName'>
          <ul>
            <li>{statusName}</li>
          </ul>
        </div>
        <div className='orderStatusButtonWrapper'>
          <button className='orderStatusDeleteButton' onClick={handleDelete}>Delete</button>
          <button className='orderStatusEditButton' onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default Status
