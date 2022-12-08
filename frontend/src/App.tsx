import './App.css'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Login } from './Login'
import { Notification } from './SnackbarNotification'
import { Signup } from './Signup'

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
        </Switch>
        <Notification />
      </BrowserRouter>
    </>
  )
}
