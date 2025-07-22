import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MarksProvider } from './context/marksContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MarksProvider>
      <App />
    </MarksProvider>
  </StrictMode>,
)
