import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppProducts from './AppProducts.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AppProducts />
    </BrowserRouter>
)
