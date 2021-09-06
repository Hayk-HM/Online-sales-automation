import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ImportExcel from '../ImportExcel/ImportExcel'
import OrderRequestColumns from '../OrderRequestColumns/OrderRequestColumns'
import OrderRequestColumnsMulti from '../OrderRequestColumnsMulti/OrderRequestColumnsMulti'
import './AdministrationFeed.css'

const AdministrationFeed = () => {
  return (
    <div className='AdministrationFeed'>
      <div className='AdministrationFeedWrapper'>
        <Switch>
          <Route path='/administrationpanel/orderrequestcolumns' render={() => <OrderRequestColumns />} />
          <Route path='/administrationpanel/orderrequestcolumnsmulti' render={() => <OrderRequestColumnsMulti />} />
          <Route path='/administrationpanel/importexcel' render={() => <ImportExcel />} />
        </Switch>
      </div>
    </div>
  )
}

export default AdministrationFeed
