import React from 'react'
import { Link } from 'react-router-dom'

export const Login: React.FC = () => {
  return (
    <div>
      <Link
        className="navbar-brand text-white text-lg brand-text"
        to="/dashboard"
      >
        {' '}
        Dashboard{' '}
      </Link>
    </div>
  )
}
