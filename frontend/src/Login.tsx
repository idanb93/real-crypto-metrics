import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Login: React.FC = () => {
  return (
    <>
      <Navbar />
      <div id="login-page-container">
        <div id="login-window-container">
          <input className="user-details" type="text" placeholder="Email" />
          <input
            className="user-details"
            type="password"
            placeholder="Password"
          />
          <div id="login-links-container">
            <Link className="login-window-link" to="/dashboard">
              {' '}
              LOGIN{' '}
            </Link>
            <Link className="login-window-link" to="/signup">
              {' '}
              SIGNUP{' '}
            </Link>{' '}
          </div>
        </div>
      </div>
    </>
  )
}
