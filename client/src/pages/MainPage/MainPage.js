import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Description from '../../components/Description/Description';
import MainPageHeader from '../../components/MainPageHeader/MainPageHeader';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import './MainPage.css'

const MainPage = () => {
  return (
    <>
      <MainPageHeader />
      <div className='MainPageCenter'>
        <div className='MainPageDescription'>
          <Description />
        </div>
        <div className='MainPageLog'>
          <Switch>
            <Route path='/signin'>
              <SignIn />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default MainPage