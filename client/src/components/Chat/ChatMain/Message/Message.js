import React from 'react'
import './Message.css'

const Message = ({ message }) => {
  return (
    <div className='message'>
      <div className='messageWrapper'>
        {message}
      </div>
    </div>
  )
}

export default Message
