DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS amenities;

CREATE TABLE banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  link TEXT DEFAULT '/projects',
  "order" INTEGER DEFAULT 0
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  location TEXT,
  price TEXT,
  status TEXT DEFAULT 'Available',
  image TEXT NOT NULL,
  description TEXT,
  overview TEXT,
  features TEXT DEFAULT '[]',
  amenities TEXT DEFAULT '[]',
  master_layout TEXT,
  floor_plans TEXT DEFAULT '[]',
  gallery TEXT DEFAULT '[]',
  theme_color TEXT
);

CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_id TEXT REFERENCES projects(id),
  message TEXT,
  status TEXT DEFAULT 'New'
);

CREATE TABLE amenities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0
);

CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
