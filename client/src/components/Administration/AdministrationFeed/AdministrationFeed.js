import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminEmployees from '../AdminEmployess/AdminEmployees'
import Department from '../Department/Department'
import EmployeesPosition from '../EmployeesPosition/EmployeesPosition'
import ImportExcelBalance from '../ImportExcelBalance/ImportExcelBalance'
import ImportExcelWebOrder from '../ImportExcelWebOrder/ImportExcelWebOrder'
import OrderRequestColumns from '../OrderRequestColumns/OrderRequestColumns'
import OrderRequestColumnsMulti from '../OrderRequestColumnsMulti/OrderRequestColumnsMulti'
import OrderStatus from '../OrderStatus/OrderStatus'
import './AdministrationFeed.css'

const AdministrationFeed = () => {
  return (
    <div className='AdministrationFeed'>
      <div className='AdministrationFeedWrapper'>
        <Switch>
          <Route path='/administrationpanel/orderrequestcolumns' render={() => <OrderRequestColumns />} />
          <Route path='/administrationpanel/orderrequestcolumnsmulti' render={() => <OrderRequestColumnsMulti />} />
          <Route path='/administrationpanel/importexcelbalance' render={() => <ImportExcelBalance />} />
          <Route path='/administrationpanel/importexcelweborder' render={() => <ImportExcelWebOrder />} />
          <Route path='/administrationpanel/department' render={() => <Department />} />
          <Route path='/administrationpanel/employees' render={() => <AdminEmployees />} />
          <Route path='/administrationpanel/position' render={() => <EmployeesPosition />} />
          <Route path='/administrationpanel/ordertatus' render={() => <OrderStatus />} />
        </Switch>
      </div>
    </div>
  )
}

export default AdministrationFeed
