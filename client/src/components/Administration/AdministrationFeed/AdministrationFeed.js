import React from 'react'
import { Route, Switch } from 'react-router-dom'
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
        </Switch>
      </div>
    </div>
  )
}

export default AdministrationFeed
