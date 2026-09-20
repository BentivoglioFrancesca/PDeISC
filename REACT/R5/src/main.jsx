// main.jsx
// A diferencia de la versión con React Router, acá NO hay BrowserRouter:
// toda la navegación ocurre por estado de React dentro de App.jsx.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
