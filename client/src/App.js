import React, { useEffect } from 'react'
import { useState } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import TaskApp from './pages/TaskApp/TaskApp';
import { authActions } from './redux/actions/authActions';

const App = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const location = useLocation()

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) authActions.logOut();
    }
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [location, user?.token])

  return (
    <Switch>
      {
        user?.result[0].email ? <TaskApp /> : <MainPage />
      }
    </Switch>
  );
}

export default App;
