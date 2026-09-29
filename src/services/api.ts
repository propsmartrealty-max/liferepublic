import { projectsRegistry } from '../data/projects';

export const api = {
    leads: {
        create: async (lead: any) => {
            try {
                const formData = new FormData();
                formData.append('name', lead.name);
                formData.append('email', lead.email || 'N/A');
                formData.append('phone', lead.phone);
                formData.append('_subject', `New Lead from Life Republic Website - ${lead.name}`);
                formData.append('_captcha', 'false');
                formData.append('_template', 'table');
                
                const detailedMessage = `
Cluster / Project: ${lead.project_id || 'Not Specified'}
Message: ${lead.message || 'No additional message'}
                `.trim();
                
                formData.append('message', detailedMessage);

                const response = await fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (!response.ok) throw new Error('Failed to dispatch lead');
                return await response.json();
            } catch (error) {
                console.error('Lead Capture Error:', error);
                throw error;
            }
        }
    },
    projects: {
        getAll: async () => projectsRegistry,
        getById: async (id: string) => {
            const proj = projectsRegistry.find(p => p.id === id);
            if (!proj) throw new Error('Project not found');
            return proj;
        },
        getFeatured: async (limit = 3) => projectsRegistry.slice(0, limit)
    },
    amenities: {
        getAll: async () => [
            { id: 1, name: 'Clubhouse', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 1 },
            { id: 2, name: 'Swimming Pool', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 2 },
            { id: 3, name: 'Gymnasium', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 3 },
            { id: 4, name: 'Kids Play Area', image_url: 'https://liferepublic.in/images/home/overview-img.jpg', order: 4 },
        ]
    }
};
