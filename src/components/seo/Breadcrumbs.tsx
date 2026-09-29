import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
    label: string;
    path: string;
}

const ROUTE_LABELS: Record<string, string> = {
    'projects': 'Projects',
    'amenities': 'Amenities',
    'contact': 'Contact',
    'about': 'About',
    'privacy': 'Privacy Policy',
    'terms': 'Terms',
    'location': 'Location',
    'connectivity': 'Connectivity',
    'lifestyle': 'Lifestyle',
    'sustainability': 'Sustainability',
    'community-hub': 'Community Hub',
    'nri-corner': 'NRI Corner',
    'nri-investment-guide': 'NRI Investment Guide',
    'testimonials': 'Testimonials',
    'township-guide': 'Township Guide',
    'township-intelligence': 'Township Intelligence',
    'media-center': 'Media Center',
};

function slugToLabel(slug: string): string {
    return ROUTE_LABELS[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) return null;

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', path: '/' },
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
        currentPath += `/${segment}`;
        breadcrumbs.push({ label: slugToLabel(segment), path: currentPath });
    });

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.label,
            'item': `https://life-republic.in${item.path}`,
        })),
    };

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        </Helmet>
    );
};
