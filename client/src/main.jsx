import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from "./context/AppContex.jsx"
import { UserContextProvider } from './context/userContex.jsx'
import { ToastContainer } from "react-toastify"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <UserContextProvider>
        <ToastContainer />
        <App />
      </UserContextProvider>
    </AppContextProvider>
  </BrowserRouter>
)
