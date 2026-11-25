import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContexProvider } from './contex/appContex.jsx'
import { DoctorContexProvider } from './contex/doctorContex.jsx'
import { AdminContexProvider } from './contex/adminContex.jsx'
import { BrowserRouter } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContexProvider>
      <AdminContexProvider>
        <DoctorContexProvider>
          <App />
          <ToastContainer />
        </DoctorContexProvider>
      </AdminContexProvider>
    </AppContexProvider>
  </BrowserRouter>
)
