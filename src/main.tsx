import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'

// Fonts
import '@fontsource-variable/syne/index.css';
import '@fontsource-variable/dm-sans/index.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)