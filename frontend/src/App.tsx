import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Login } from './Login'
import { Notification } from './SnackbarNotification'

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Login />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
        <Notification />
      </BrowserRouter>
    </>
  )
}
