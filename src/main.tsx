import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

// --- POSTHOG INIT ---
// Ensure your .env file uses these exact names: VITE_POSTHOG_KEY and VITE_POSTHOG_HOST
posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
  persistence: 'localStorage+cookie', loaded: (ph) => {   }, 
  autocapture: true, 
  session_recording: {
    maskAllInputs: false,
    maskInputOptions: {
      password: true, 
      email: false,   
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)