import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateGlobalSchema, generateSiteNavigationSchema, generateBreadcrumbSchema } from '../../utils/schemaGenerator';
import { generateCanonicalURL } from '../../lib/seo-utils';
import seoMatrix from '../../data/seoMatrix.json';
import { SSRHeadContext } from './SSRHeadContext';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    schema?: Record<string, unknown> | Record<string, unknown>[] | null;
    breadcrumbItems?: { name: string; item: string }[];
    noindex?: boolean;
}

const DOMAIN = 'https://life-republic.in';

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
    if (typeof document === 'undefined') return;
    const selector = `meta[${attrName}="${attrValue}"]`;
    const existing = Array.from(document.head.querySelectorAll(selector));
    if (existing.length > 1) {
        for (let i = 1; i < existing.length; i++) {
            existing[i].remove();
        }
    }
    let el = existing[0] as HTMLMetaElement | undefined;
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
    }
    if (el.getAttribute('content') !== content) {
        el.setAttribute('content', content);
    }
}

function upsertCanonical(href: string) {
    if (typeof document === 'undefined') return;
    const existing = Array.from(document.head.querySelectorAll('link[rel="canonical"]'));
    if (existing.length > 1) {
        for (let i = 1; i < existing.length; i++) {
            existing[i].remove();
        }
    }
    let el = existing[0] as HTMLLinkElement | undefined;
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }
    if (el.getAttribute('href') !== href) {
        el.setAttribute('href', href);
    }
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonical,
    image = '/images/gallery/eros/master-layout.webp',
    type = 'website',
    schema,
    breadcrumbItems,
    noindex = false,
}) => {
    const ssrHead = useContext(SSRHeadContext);
    const location = useLocation();

    // SERP-Engineered Title Synthesis (Target: 45-62 characters, zero truncation)
    let finalTitle = '';
    if (title) {
        const trimmedTitle = title.trim();
        if (trimmedTitle.length <= 62) {
            finalTitle = trimmedTitle;
        } else {
            const sub = trimmedTitle.substring(0, 60);
            const lastSpace = sub.lastIndexOf(' ');
            finalTitle = (lastSpace > 35 ? sub.substring(0, lastSpace) : sub).replace(/[\s|:@&,\-]+$/, '');
        }
    } else {
        finalTitle = 'Kolte Patil Life Republic Hinjewadi | 390-Acre Township';
    }

    const defaultDescription =
        'Explore Kolte Patil Life Republic Hinjewadi, a 390-acre integrated township in Pune. RERA-registered 2, 3 & 4 BHK luxury residences near Hinjewadi IT Park.';
    const metaDescription = description || defaultDescription;

    const currentPath = location.pathname + location.search;
    const fullCanonical = generateCanonicalURL(canonical || currentPath);

    // Advanced Keyword Matrix Routing using Data Layer
    const getPathSpecificKeywords = (path: string) => {
        const cluster: string[] = [...seoMatrix.base];

        if (path.includes('2-bhk')) cluster.push(...seoMatrix.configurations['2-bhk']);
        if (path.includes('3-bhk')) cluster.push(...seoMatrix.configurations['3-bhk']);
        if (path.includes('4-bhk')) cluster.push(...seoMatrix.configurations['4-bhk']);

        if (path.includes('projects')) {
            if (path.includes('atmos')) cluster.push(...seoMatrix.projects.atmos);
            if (path.includes('aros')) cluster.push(...seoMatrix.projects.aros);
            if (path.includes('universe')) cluster.push(...seoMatrix.projects.universe);
            if (path.includes('oro-avenue')) cluster.push(...seoMatrix.projects['oro-avenue']);
            if (path.includes('first-avenue')) cluster.push(...seoMatrix.projects['first-avenue']);
            if (path.includes('24k-espada')) cluster.push(...seoMatrix.projects['24k-espada']);
            if (path.includes('sound-of-soul')) cluster.push(...seoMatrix.projects['sound-of-soul']);
            if (path.includes('arezo')) cluster.push(...seoMatrix.projects.arezo);
            if (path.includes('duet')) cluster.push(...seoMatrix.projects.duet);
            if (path.includes('canvas')) cluster.push(...seoMatrix.projects.canvas);
            if (path.includes('echoes')) cluster.push(...seoMatrix.projects.echoes);
            if (path.includes('villas')) cluster.push(...seoMatrix.projects.villas);
            if (path.includes('qrious')) cluster.push(...(seoMatrix.projects.qrious || []));
            if (path.includes('nora')) cluster.push(...(seoMatrix.projects.nora || []));
            if (path.includes('i-tower') || path.includes('i-towers')) cluster.push(...(seoMatrix.projects['i-towers'] || []));
            if (path.includes('3rd-avenue')) cluster.push(...(seoMatrix.projects['3rd-avenue'] || []));
        }

        if (path.includes('location') || path.includes('projects')) {
            if (path.includes('hinjewadi')) cluster.push(...seoMatrix.locations.hinjewadi);
            if (path.includes('marunji')) cluster.push(...seoMatrix.locations.marunji);
            if (path.includes('wakad')) cluster.push(...seoMatrix.locations.wakad);
            if (path.includes('tathawade')) cluster.push(...seoMatrix.locations.tathawade);
            if (path.includes('punawale')) cluster.push(...seoMatrix.locations.punawale);
            if (path.includes('baner')) cluster.push(...seoMatrix.locations.baner);
            if (path.includes('balewadi')) cluster.push(...seoMatrix.locations.balewadi);
            if (path.includes('bavdhan')) cluster.push(...seoMatrix.locations.bavdhan);
            if (path.includes('mahalunge')) cluster.push(...seoMatrix.locations.mahalunge);
            if (path.includes('bhugaon')) cluster.push(...seoMatrix.locations.bhugaon);

            cluster.push(...seoMatrix.regions.west_pune);
            cluster.push(...seoMatrix.regions.pune);
        }

        if (path.includes('nri') || path.includes('investment')) {
            cluster.push(...seoMatrix.investors.nri);
            cluster.push(...seoMatrix.buyer_intent);
        }

        if (path.includes('lifestyle') || path.includes('amenities') || path.includes('township')) {
            cluster.push(...seoMatrix.lifestyle.township);
        }

        return [...new Set(cluster)].join(', ');
    };

    const pathKeywords = getPathSpecificKeywords(location.pathname);
    const combinedTerms = (keywords ? `${keywords}, ${pathKeywords}` : pathKeywords)
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
    const metaKeywords = [...new Set(combinedTerms)].join(', ');

    const globalSchema = generateGlobalSchema(location.pathname);
    const navSchema = generateSiteNavigationSchema();

    const breadcrumbSchema = breadcrumbItems
        ? generateBreadcrumbSchema(breadcrumbItems)
        : location.pathname !== '/'
            ? generateBreadcrumbSchema(
                  location.pathname
                      .split('/')
                      .filter(Boolean)
                      .reduce(
                          (acc, curr, idx, arr) => {
                              const p = '/' + arr.slice(0, idx + 1).join('/');
                              acc.push({
                                  name: curr.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                                  item: p,
                              });
                              return acc;
                          },
                          [{ name: 'Home', item: '/' }]
                      )
              )
            : null;

    const allSchemas: Record<string, unknown>[] = [globalSchema as Record<string, unknown>, navSchema as Record<string, unknown>];
    if (breadcrumbSchema) allSchemas.push(breadcrumbSchema as Record<string, unknown>);
    if (schema) {
        if (Array.isArray(schema)) allSchemas.push(...schema);
        else allSchemas.push(schema);
    }

    const robotsContent = noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    const fullImage = image.startsWith('http') ? image : DOMAIN + image;
    const serializedSchemas = allSchemas.map(s => JSON.stringify(s));

    // SSR Synchronous Head Collection (prevents React 19 hydration duplication)
    if (ssrHead) {
        ssrHead.title = finalTitle;
        ssrHead.route = fullCanonical;
        ssrHead.metas = [
            { name: 'google-site-verification', content: 'IAyC1c_sDzY_uqhpy2gKk-M0IlkQdxdM_UMA9ukAIWQ' },
            { name: 'description', content: metaDescription },
            { name: 'keywords', content: metaKeywords },
            { name: 'robots', content: robotsContent },
            { name: 'application-name', content: 'Life Republic' },
            { name: 'apple-mobile-web-app-title', content: 'Life Republic' },
            { name: 'geo.region', content: 'IN-MH' },
            { name: 'geo.placename', content: 'Hinjewadi, Pune' },
            { name: 'geo.position', content: '18.5995;73.7153' },
            { name: 'ICBM', content: '18.5995, 73.7153' },
            { property: 'og:type', content: type },
            { property: 'og:url', content: fullCanonical },
            { property: 'og:site_name', content: 'Kolte Patil Life Republic' },
            { property: 'og:title', content: finalTitle },
            { property: 'og:description', content: metaDescription },
            { property: 'og:image', content: fullImage },
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:url', content: fullCanonical },
            { property: 'twitter:title', content: finalTitle },
            { property: 'twitter:description', content: metaDescription },
            { property: 'twitter:image', content: fullImage },
        ];
        ssrHead.links = [{ rel: 'canonical', href: fullCanonical }];
        ssrHead.schemas = serializedSchemas;
    }

    // Client-Side Head Synchronization (single authoritative copy in <head>, zero duplicates)
    useEffect(() => {
        if (typeof document === 'undefined') return;

        // Ensure single <title>
        const titles = Array.from(document.head.querySelectorAll('title'));
        if (titles.length > 1) {
            for (let i = 1; i < titles.length; i++) titles[i].remove();
        }
        document.title = finalTitle;

        // Upsert canonical & meta tags
        upsertCanonical(fullCanonical);
        upsertMeta('name', 'google-site-verification', 'IAyC1c_sDzY_uqhpy2gKk-M0IlkQdxdM_UMA9ukAIWQ');
        upsertMeta('name', 'description', metaDescription);
        upsertMeta('name', 'keywords', metaKeywords);
        upsertMeta('name', 'robots', robotsContent);
        upsertMeta('name', 'application-name', 'Life Republic');
        upsertMeta('name', 'apple-mobile-web-app-title', 'Life Republic');
        upsertMeta('name', 'geo.region', 'IN-MH');
        upsertMeta('name', 'geo.placename', 'Hinjewadi, Pune');
        upsertMeta('name', 'geo.position', '18.5995;73.7153');
        upsertMeta('name', 'ICBM', '18.5995, 73.7153');

        upsertMeta('property', 'og:type', type);
        upsertMeta('property', 'og:url', fullCanonical);
        upsertMeta('property', 'og:site_name', 'Kolte Patil Life Republic');
        upsertMeta('property', 'og:title', finalTitle);
        upsertMeta('property', 'og:description', metaDescription);
        upsertMeta('property', 'og:image', fullImage);

        upsertMeta('property', 'twitter:card', 'summary_large_image');
        upsertMeta('property', 'twitter:url', fullCanonical);
        upsertMeta('property', 'twitter:title', finalTitle);
        upsertMeta('property', 'twitter:description', metaDescription);
        upsertMeta('property', 'twitter:image', fullImage);

        // Synchronize JSON-LD schemas ONLY if not already rendered for this exact canonical
        const existingManaged = Array.from(
            document.head.querySelectorAll('script[type="application/ld+json"][data-seo-managed="true"]')
        );
        const alreadySynced =
            existingManaged.length === serializedSchemas.length &&
            existingManaged.every(el => el.getAttribute('data-seo-canonical') === fullCanonical);

        if (!alreadySynced) {
            // Remove all existing JSON-LD scripts across the document to guarantee zero duplication
            document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

            for (const jsonStr of serializedSchemas) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.setAttribute('data-seo-managed', 'true');
                script.setAttribute('data-seo-canonical', fullCanonical);
                script.textContent = jsonStr;
                document.head.appendChild(script);
            }
        }
    }, [finalTitle, metaDescription, metaKeywords, robotsContent, fullCanonical, type, fullImage, serializedSchemas]);

    return null;
};
