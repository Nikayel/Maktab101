import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const result = dotenv.config({ path: join(__dirname, '..', '.env.local') });
if (result.error) {
  throw new Error('Failed to load .env.local file');
}

const app = express();
const DEFAULT_PORT = 5000;
let port = parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10);

// Validate environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase URL or Service Key is missing from environment variables");
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middleware
app.use(cors());
app.use(express.json());

// User management routes
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('profiles').update({ approved: true }).eq('id', id);
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Course management routes
app.post('/api/courses', async (req, res) => {
  const { title, description, tutor_id } = req.body;
  if (!title || !description || !tutor_id) {
    return res.status(400).json({ error: 'Title, description, and tutor_id are required.' });
  }

  try {
    const { data, error } = await supabase.from('courses').insert({ title, description, tutor_id });
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const startServer = (port: number) => {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying port ${port + 1}`);
      startServer(port + 1); // Increment port and retry
    } else {
      console.error('An error occurred:', err);
    }
  });
};

// Initial server startup
startServer(port);
