import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite'
import { AuthProvider } from './AuthContext.jsx'
import { CsrfTokenProvider } from './CrsfTokenContext';
createRoot(document.getElementById('root')).render(
  <CsrfTokenProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CsrfTokenProvider>,
)
