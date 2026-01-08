import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'
import { HelmetProvider } from 'react-helmet-async'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  autocapture: true,
  disable_session_recording: true, // Started later
  loaded: (ph) => {
    // ⚡️ Wait for the browser to be "Idle" before starting heavy recording
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        setTimeout(() => ph.startSessionRecording(), 5000);
      });
    } else {
      setTimeout(() => ph.startSessionRecording(), 6000);
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)