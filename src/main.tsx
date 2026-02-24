import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'

// Fonts
import '@fontsource/syne/variable.css';
import '@fontsource/dm-sans/variable.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className="noise-overlay" />
      <div className="grid-bg" />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)