import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Chat from '../../components/Chat/Chat'
import Tasks from '../../components/Tasks/Tasks'
import Employees from '../Employees/Employees'
import EmployeeSettings from '../EmployeeSettings/EmployeeSettings'
import OrderNew from '../OrderNew/OrderNew'
import OrderList from '../OrderList/OrderList'
import './TaskAppFeed.css'
import Booking from '../Booking/Booking'

const TaskAppFeed = () => {
  return (
    <div className='taskAppFeed'>
      <Switch>
        <Route path='/app/chat' render={() => <Chat />} />
        <Route path='/app/task' render={() => <Tasks />} />
        <Route exact path='/app/employees' render={() => <Employees />} />
        <Route path='/app/employees/settings' render={() => <EmployeeSettings />} />
        <Route path='/app/neworder' render={() => <OrderNew />} />
        <Route path='/app/orderlist' render={() => <OrderList />} />
        <Route path='/app/booking' render={() => <Booking />} />
      </Switch>
    </div>
  )
}

export default TaskAppFeed
