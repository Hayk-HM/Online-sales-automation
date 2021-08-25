import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import Tasks from '../../components/Tasks/Tasks'
import Employees from '../Employees/Employees'
import EmployeeSettings from '../EmployeeSettings/EmployeeSettings'
import NewOrder from '../NewOrder/NewOrder'
import './TaskAppFeed.css'

const TaskAppFeed = () => {
  return (
    <div className='taskAppFeed'>
      <Switch>
        <Route path='/app/chat' render={() => <Chat />} />
        <Route path='/app/task' render={() => <Tasks />} />
        <Route exact path='/app/employees' render={() => <Employees />} />
        <Route path='/app/employees/settings' render={() => <EmployeeSettings />} />
        <Route path='/app/neworder' render={() => <NewOrder />} />
      </Switch>
    </div>
  )
}

export default TaskAppFeed
