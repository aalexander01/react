import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import AppThree from './AppThree.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppThree/>
    {/* <App /> */}
  </StrictMode>
)
