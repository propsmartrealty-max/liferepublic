import { Lead, Project, Amenity, Banner } from '../lib/types';
import { emailService } from './email';

// Cloudflare Worker API URL (Update this when deploying)
const API_URL = import.meta.env.VITE_CLOUDFLARE_API_URL || 'http://localhost:8787/api';

const handleApiError = (error: any, context: string) => {
    console.error(`API Error in ${context}:`, error);
    throw error;
};

// Ensure URLs are absolute for images
const normalizeUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : url; 
};

// Helper to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('lr_admin_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const api = {
    auth: {
        login: async (email: string, password: string) => {
            try {
                const res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                if (!res.ok) throw new Error('Invalid credentials');
                const data = await res.json();
                localStorage.setItem('lr_admin_token', data.token);
                return data.user;
            } catch (e) { return handleApiError(e, 'auth.login'); }
        },
        logout: () => {
            localStorage.removeItem('lr_admin_token');
        }
    },
    banners: {
        getAll: async () => {
            try {
                const res = await fetch(`${API_URL}/banners`);
                if (!res.ok) throw new Error('Failed to fetch banners');
                const data = await res.json();
                return data.map((b: any) => ({
                    ...b,
                    image_url: normalizeUrl(b.image_url)
                }));
            } catch (e) { return handleApiError(e, 'banners.getAll'); }
        }
    },
    projects: {
        getAll: async () => {
            try {
                const res = await fetch(`${API_URL}/projects`);
                if (!res.ok) throw new Error('Failed to fetch projects');
                const data = await res.json();
                return data.map((p: any) => ({
                    ...p,
                    image: normalizeUrl(p.image),
                    floor_plans: p.floor_plans?.map(normalizeUrl) || [],
                    gallery: p.gallery?.map(normalizeUrl) || []
                }));
            } catch (e) { return handleApiError(e, 'projects.getAll'); }
        },
        getById: async (id: string) => {
            try {
                const res = await fetch(`${API_URL}/projects/${id}`);
                if (!res.ok) throw new Error('Project not found');
                const p = await res.json();
                return {
                    ...p,
                    image: normalizeUrl(p.image),
                    floor_plans: p.floor_plans?.map(normalizeUrl) || [],
                    gallery: p.gallery?.map(normalizeUrl) || []
                };
            } catch (e) { return handleApiError(e, 'projects.getById'); }
        }
    },
    amenities: {
        getAll: async () => {
            try {
                const res = await fetch(`${API_URL}/amenities`);
                if (!res.ok) throw new Error('Failed to fetch amenities');
                const data = await res.json();
                return data.map((a: any) => ({
                    ...a,
                    image_url: normalizeUrl(a.image_url)
                }));
            } catch (e) { return handleApiError(e, 'amenities.getAll'); }
        }
    },
    leads: {
        getAll: async () => {
            try {
                const res = await fetch(`${API_URL}/leads`, {
                    headers: getAuthHeaders()
                });
                if (!res.ok) throw new Error('Failed to fetch leads');
                return await res.json();
            } catch (e) { return handleApiError(e, 'leads.getAll'); }
        },
        create: async (lead: Omit<Lead, 'id' | 'created_at' | 'status'>) => {

            let emailSent = false;
            try {
                await emailService.sendLeadNotification({
                    name: lead.name,
                    phone: lead.phone,
                    email: lead.email,
                    message: lead.message || '',
                    project: lead.project_id || 'General Enquiry'
                });
                emailSent = true;
            } catch (e) {
                console.error("Email dispatch failed.");
            }

            try {
                const res = await fetch(`${API_URL}/leads`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(lead)
                });
                
                if (!res.ok) throw new Error('Failed to insert lead');

                const vault = JSON.parse(localStorage.getItem('lr_sovereign_vault') || '[]');
                const last = vault[vault.length - 1];
                if (last) last.synced = true;
                localStorage.setItem('lr_sovereign_vault', JSON.stringify(vault));
                
                return null;
            } catch (e) {
                console.error("Database connection failed.", e);
                if (!emailSent) {
                    throw new Error("Both Database and Email systems failed.");
                }
                return null; 
            }
        }
    },
    upload: {
        image: async (file: File) => {
            // Placeholder: R2 presigned URL implementation goes here
            console.warn("Upload not yet migrated to R2. Returning local blob.");
            return URL.createObjectURL(file);
        }
    },
    township: {
        searchKnowledgeBase: async (query: string) => {
            return [];
        }
    }
};
