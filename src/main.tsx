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
  capture_performance: false, 
  capture_exceptions: true, // Captures crashes
  disable_session_recording: true, 

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
window.addEventListener('load', () => {
  setTimeout(() => {
    posthog.startSessionRecording();
  }, 3000);
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)