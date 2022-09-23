import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Login } from './Login'

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Login />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
