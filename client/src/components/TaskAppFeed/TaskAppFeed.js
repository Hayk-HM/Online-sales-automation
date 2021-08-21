import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import Tasks from '../../components/Tasks/Tasks'
import Employees from '../Employees/Employees'
import './TaskAppFeed.css'

const TaskAppFeed = () => {
  return (
    <div className='taskAppFeed'>
      <Switch>
        <Route path='/app/chat' render={() => <Chat />} />
        <Route path='/app/task' render={() => <Tasks />} />
        <Route path='/app/employees' render={() => <Employees />} />
      </Switch>
    </div>
  )
}

export default TaskAppFeed
