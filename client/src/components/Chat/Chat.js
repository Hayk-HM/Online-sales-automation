import React from 'react'
import CharSideBar from './CharSideBar/CharSideBar'
import './Chat.css'
import ChatMain from './ChatMain/ChatMain'

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatWrapper'>
        <CharSideBar />
        <ChatMain />
      </div>
    </div>
  )
}

export default Chat
