// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <--- Make sure this is imported
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/DataContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <BrowserRouter>  {/* <--- This is required for Routes to work */}
        <App />
      </BrowserRouter>
    </DataProvider>
  </StrictMode>,
)