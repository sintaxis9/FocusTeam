import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWithRouter from './App'
import { AuthProvider } from './context/authContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppWithRouter />
    </AuthProvider>
  </StrictMode>,
)
