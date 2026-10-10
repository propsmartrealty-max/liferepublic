import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary'

export function render(url: string): Promise<{ html: string; head: string }> {
  return new Promise((resolve, reject) => {
    const helmetContext = {} as any;
    let html = '';

    const writable = new Writable({
      write(chunk: any, _encoding: any, callback: () => void) {
        html += chunk.toString();
        callback();
      }
    });

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <GlobalErrorBoundary>
          <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </HelmetProvider>
        </GlobalErrorBoundary>
      </StrictMode>,
      {
        onAllReady() {
          pipe(writable);
        },
        onShellError(err: any) {
          reject(err);
        },
        onError(err: any) {
          console.warn(`[SSR notice on ${url}]:`, err);
        }
      }
    );

    writable.on('finish', () => {
      const { helmet } = helmetContext;
      resolve({
        html,
        head: helmet ? `
          ${helmet.title?.toString() || ''}
          ${helmet.meta?.toString() || ''}
          ${helmet.link?.toString() || ''}
          ${helmet.style?.toString() || ''}
          ${helmet.script?.toString() || ''}
        ` : ''
      });
    });

    writable.on('error', (err: any) => {
      reject(err);
    });
  });
}
