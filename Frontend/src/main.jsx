import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MarksProvider } from './context/marksContext.jsx';
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MarksProvider>
        <App />
      </MarksProvider>
    </AuthProvider>
  </StrictMode>,
)
