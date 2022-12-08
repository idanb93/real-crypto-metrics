import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <>
      <nav id="navbar">
        <Link to="/">LOGO</Link>
        <ul>
          <li>
            <Link to="/">USERNAME</Link>
          </li>
          <li>
            <Link to="/dashboard">Docs</Link>
          </li>
          <li>
            <Link to="/">Log Out</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
