import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sign, verify } from 'hono/jwt';

type Bindings = {
  DB: D1Database;
  STORAGE: R2Bucket;
  JWT_SECRET: string;
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
// Leads
// -------------------------------------------------------------
app.post('/api/leads', async (c) => {
  const body = await c.req.json();
  const { name, phone, email, project_id, message } = body;
  
  try {
    await c.env.DB.prepare(
      'INSERT INTO leads (name, phone, email, project_id, message) VALUES (?, ?, ?, ?, ?)'
    ).bind(name, phone, email, project_id, message).run();
    
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
// Uploads (R2 Presigned URLs placeholder)
// -------------------------------------------------------------
app.post('/api/upload', protect, async (c) => {
  // Generate presigned URL for R2 in production
  return c.json({ url: 'https://cdn.life-republic.in/mock-upload-success.jpg' });
});

export default app;
