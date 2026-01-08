import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

// --- POSTHOG INIT ---
posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  persistence: 'localStorage+cookie', 
  autocapture: true, 
  // 👇 THIS IS THE SAFETY FIX
  capture_exceptions: true, // Captures crashes
  
  // Only show debug logs on localhost
  loaded: (ph) => { 
    if (import.meta.env.DEV) ph.debug() 
  },
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