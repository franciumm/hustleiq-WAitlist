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
  capture_performance: false, // Turned off to save main thread cycles
  capture_exceptions: true,
  disable_session_recording: true, // Started later for performance

  loaded: (ph) => {
    // ⚡️ Only start session recording 3 seconds after the site is interactive
    setTimeout(() => {
      ph.startSessionRecording();
    }, 3000);

    if (import.meta.env.DEV) ph.debug();
  },
  session_recording: {
    maskAllInputs: false,
    maskInputOptions: { password: true, email: false }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)