import React from 'react'

export const Sidebar: React.FC = () => {
  return (
    <div id="sidebar-container">
      <ul>
        <li>
          <div className="navbar-button">
            <a href="/">Github</a>
          </div>
        </li>
        <li>
          <div className="navbar-button">
            <a href="/">Twitter</a>
          </div>
        </li>
        <li>
          <div className="navbar-button">
            <a href="/">Metrics</a>
          </div>
        </li>
      </ul>
    </div>
  )
}
