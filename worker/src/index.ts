import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sign, verify } from 'hono/jwt';

type Bindings = {
  DB: D1Database;
  STORAGE: R2Bucket;
  JWT_SECRET: string;
  RESEND_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for frontend
app.use('*', cors());

app.get('/', (c) => c.text('LR Sovereign API (Cloudflare D1)'));

// -------------------------------------------------------------
// Auth (Replaces Supabase Auth)
// -------------------------------------------------------------
app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  
  // In a real app, hash passwords. For migration demonstration, simple check.
  const admin = await c.env.DB.prepare('SELECT * FROM admins WHERE email = ? AND password_hash = ?').bind(email, password).first();
  
  if (!admin) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }
  
  const token = await sign({ email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, c.env.JWT_SECRET || 'fallback-secret-123');
  return c.json({ token, user: { email } });
});

// Middleware for protected routes
const protect = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const token = authHeader.split(' ')[1];
  try {
    await verify(token, c.env.JWT_SECRET || 'fallback-secret-123');
    await next();
  } catch (e) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

// -------------------------------------------------------------
// Banners
// -------------------------------------------------------------
app.get('/api/banners', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM banners ORDER BY "order" ASC').all();
  return c.json(results);
});

// -------------------------------------------------------------
// Projects
// -------------------------------------------------------------
app.get('/api/projects', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM projects').all();
  
  const parsedResults = results.map((row: any) => ({
    ...row,
    features: JSON.parse(row.features || '[]'),
    amenities: JSON.parse(row.amenities || '[]'),
    floor_plans: JSON.parse(row.floor_plans || '[]'),
    gallery: JSON.parse(row.gallery || '[]')
  }));
  
  return c.json(parsedResults);
});

app.get('/api/projects/:id', async (c) => {
  const id = c.req.param('id');
  const project = await c.env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first();
  if (!project) return c.json({ error: 'Not found' }, 404);
  
  return c.json({
    ...project,
    features: JSON.parse((project.features as string) || '[]'),
    amenities: JSON.parse((project.amenities as string) || '[]'),
    floor_plans: JSON.parse((project.floor_plans as string) || '[]'),
    gallery: JSON.parse((project.gallery as string) || '[]')
  });
});

// -------------------------------------------------------------
// Amenities
// -------------------------------------------------------------
app.get('/api/amenities', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM amenities ORDER BY "order" ASC').all();
  return c.json(results);
});

// -------------------------------------------------------------
// Leads & Email Dispatch Pipeline (Resend)
// -------------------------------------------------------------
app.post('/api/leads', async (c) => {
  const body = await c.req.json();
  const { name, phone, email, project_id, message } = body;
  
  try {
    // 1. Persist to Sovereign D1 Vault
    await c.env.DB.prepare(
      'INSERT INTO leads (name, phone, email, project_id, message) VALUES (?, ?, ?, ?, ?)'
    ).bind(name, phone, email, project_id, message).run();
    
    // 2. Dispatch High-Priority Alert to Platinum Desk via Resend API
    if (c.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Sovereign Desk <leads@life-republic.in>',
          to: 'propsmartrealty@gmail.com',
          subject: `🔥 NEW HIGH-INTENT LEAD: ${name} (Life Republic)`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
              <h2 style="color: #D4AF37; margin-bottom: 20px;">Sovereign Lead Acquired</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'N/A'}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Project ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${project_id || 'General'}</td></tr>
                <tr><td style="padding: 10px;"><strong>Message:</strong></td><td style="padding: 10px;">${message || 'No message provided.'}</td></tr>
              </table>
              <p style="margin-top: 20px; font-size: 12px; color: #737373;">This lead was captured via the secure Cloudflare Edge Network.</p>
            </div>
          `
        })
      });
    }
    
    return c.json({ success: true }, 201);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/leads', protect, async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT leads.*, projects.title as project_title 
    FROM leads 
    LEFT JOIN projects ON leads.project_id = projects.id 
    ORDER BY leads.created_at DESC
  `).all();
  return c.json(results);
});

// -------------------------------------------------------------
// R2 Object Storage (Native Binary Uploads)
// -------------------------------------------------------------
app.post('/api/upload', protect, async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'] as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    // Generate secure unique filename
    const ext = file.name.split('.').pop();
    const filename = `assets/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    
    // Stream binary directly to Cloudflare R2 Edge
    await c.env.STORAGE.put(filename, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type }
    });
    
    // Return the public CDN URL mapping for this bucket
    // (Ensure you map your R2 bucket to a public custom domain like cdn.life-republic.in)
    const publicUrl = `https://cdn.life-republic.in/${filename}`;
    
    return c.json({ url: publicUrl, key: filename });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

export default app;
