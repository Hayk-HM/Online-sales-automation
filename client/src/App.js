import React from 'react'
import { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import TaskApp from './pages/TaskApp/TaskApp';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user' || [])))
  return (
    <Switch>
      <MainPage />
    </Switch>
  );
}

export default App;
