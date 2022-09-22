import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

const rootNode: HTMLElement | null = document.getElementById('app')

if (rootNode !== null && rootNode !== undefined) {
  createRoot(rootNode).render(<App />)
}
