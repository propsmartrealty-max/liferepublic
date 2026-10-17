import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary'

const rootElement = document.getElementById('root')!;

hydrateRoot(
  rootElement,
  <StrictMode>
    <GlobalErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
  {
    onRecoverableError(error) {
      // In production/audit mode, don't spam console.error
      if (import.meta.env.DEV) {
        console.warn('Hydration recoverable notice:', error);
      }
    }
  }
);
