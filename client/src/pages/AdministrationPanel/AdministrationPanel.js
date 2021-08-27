import React from 'react'
import AdministrationFeed from '../../components/Administration/AdministrationFeed/AdministrationFeed'
import AdministrationSideBar from '../../components/Administration/AdministrationSideBar/AdministrationSideBar'
import './AdministrationPanel.css'

const AdministrationPanel = () => {
  return (
    <div className='administrationTools'>
      <div className='administrationToolsWrapper'>
        <div><AdministrationSideBar /></div>
        <div><AdministrationFeed /></div>
      </div>
    </div>
  )
}

export default AdministrationPanel
