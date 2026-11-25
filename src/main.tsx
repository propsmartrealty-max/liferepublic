import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary';

const rootElement = document.getElementById('root')!;

const app = (
    <StrictMode>
        <GlobalErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalErrorBoundary>
    </StrictMode>
);

const hasPreRenderedHtml =
    rootElement.children.length > 0 && !rootElement.innerHTML.includes('<!--app-html-->');

if (hasPreRenderedHtml) {
    hydrateRoot(rootElement, app, {
        onRecoverableError(error) {
            if (import.meta.env.DEV) {
                console.warn('Hydration recoverable notice:', error);
            }
        },
    });
} else {
    createRoot(rootElement).render(app);
}
