import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite'
import { AuthProvider } from './AuthContext.jsx'
import { CsrfTokenProvider } from './CrsfTokenContext';
import { WeatherDataProvider } from './contexts/WeatherContext.jsx'
createRoot(document.getElementById('root')).render(
  <WeatherDataProvider>
  <CsrfTokenProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CsrfTokenProvider>
  </WeatherDataProvider>,
)
