import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppThree from './AppThree.jsx'
import Login from './login.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register.jsx";
import DashBoard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home_library" element={<AppThree />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  
    {/* <AppThree/> */}
  </StrictMode>
)
