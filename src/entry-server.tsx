import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { StaticRouter } from 'react-router';
import App from './App';
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary';
import { SSRHeadContext, type SSRHeadData } from './components/seo/SSRHeadContext';

function escapeAttr(val: string): string {
    return val
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function escapeHtml(val: string): string {
    return val
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export function render(url: string): Promise<{ html: string; head: string; title?: string; description?: string }> {
    return new Promise((resolve, reject) => {
        const headCollector: SSRHeadData = {
            metas: [],
            links: [],
            schemas: [],
        };
        let html = '';

        const writable = new Writable({
            write(chunk: any, _encoding: any, callback: () => void) {
                html += chunk.toString();
                callback();
            },
        });

        const { pipe } = renderToPipeableStream(
            <StrictMode>
                <GlobalErrorBoundary>
                    <SSRHeadContext.Provider value={headCollector}>
                        <StaticRouter location={url}>
                            <App />
                        </StaticRouter>
                    </SSRHeadContext.Provider>
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
                },
            }
        );

        writable.on('finish', () => {
            const descMeta = headCollector.metas.find(m => m.name === 'description');
            const otherMetas = headCollector.metas.filter(m => m.name !== 'description');

            const metaHtml = otherMetas
                .map(m => {
                    const attrs = Object.entries(m)
                        .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
                        .join(' ');
                    return `<meta ${attrs} />`;
                })
                .join('\n  ');

            const linkHtml = headCollector.links
                .map(l => {
                    const attrs = Object.entries(l)
                        .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
                        .join(' ');
                    return `<link ${attrs} />`;
                })
                .join('\n  ');

            const routeAttr = escapeAttr(headCollector.route || `https://life-republic.in${url === '/' ? '/' : url}`);
            const schemaHtml = headCollector.schemas
                .map(
                    s =>
                        `<script type="application/ld+json" data-seo-managed="true" data-seo-canonical="${routeAttr}">${s}</script>`
                )
                .join('\n  ');

            const head = [
                `<meta name="ssr-canonical" content="${routeAttr}" />`,
                '<meta name="ssr-prerendered" content="true" />',
                metaHtml,
                linkHtml,
                schemaHtml,
            ]
                .filter(Boolean)
                .join('\n  ');

            resolve({
                html,
                head,
                title: headCollector.title ? escapeHtml(headCollector.title) : undefined,
                description: descMeta ? escapeAttr(descMeta.content) : undefined,
            });
        });

        writable.on('error', (err: any) => {
            reject(err);
        });
    });
}
