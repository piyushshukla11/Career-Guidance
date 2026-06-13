/* ==========================================================================
   Career Guidance — Express Backend Server
   Auth (signup/login/logout/session), Gemini API proxy, static file serving
   Uses MongoDB Atlas for cloud-hosted database
   ========================================================================== */

require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;

// ---------------------------------------------------------------------------
// MongoDB Atlas Connection
// ---------------------------------------------------------------------------
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'career-guidance';

let db = null;
let client = null;

async function connectDB() {
  if (client) return db;

  if (!MONGODB_URI) {
    console.error('[DB] MONGODB_URI not set in environment variables');
    process.exit(1);
  }

  try {
    client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    db = client.db(DB_NAME);
    
    // Create indexes for better performance
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    
    console.log('[DB] Connected to MongoDB Atlas');
    return db;
  } catch (err) {
    console.error('[DB] MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('[DB] MongoDB connection closed');
  }
  process.exit(0);
});

// ---------------------------------------------------------------------------
// Database Functions (MongoDB)
// ---------------------------------------------------------------------------
async function findUserByEmail(email) {
  if (!db) await connectDB();
  return await db.collection('users').findOne({ email: email.toLowerCase() });
}

async function createUser(userData) {
  if (!db) await connectDB();
  return await db.collection('users').insertOne(userData);
}

async function updateUser(email, updates) {
  if (!db) await connectDB();
  return await db.collection('users').updateOne(
    { email: email.toLowerCase() },
    { $set: updates }
  );
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware - must be before session and routes
app.use(cors({
  origin: true, // Allow all origins (will be restricted based on credentials)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Detect if running in production (Railway)
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT === 'production';

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-me',
  resave: true,
  saveUninitialized: true,
  proxy: isProduction, // Trust proxy in production
  cookie: {
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax', // Use 'none' in production for cross-site
    secure: isProduction // Required for HTTPS in production
  }
}));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html'
}));

// Debug middleware - log all requests with session info
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log(`  Session ID: ${req.sessionID}`);
  console.log(`  Session User: ${req.session?.user?.email || 'none'}`);
  next();
});

// ---------------------------------------------------------------------------
// Auth Middleware Helper
// ---------------------------------------------------------------------------
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: 'Not authenticated. Please log in.' });
}

// ---------------------------------------------------------------------------
// Auth API Routes
// ---------------------------------------------------------------------------

// POST /api/auth/signup — Create a new user
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // Hash password and store
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = {
      _id: Date.now().toString(),
      name,
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    await createUser(newUser);

    // Create session
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    };

    console.log(`[AUTH] New user registered: ${normalizedEmail}`);
    console.log(`[AUTH] Session ID: ${req.sessionID}`);
    console.log(`[AUTH] Session user set: ${JSON.stringify(req.session.user)}`);
    
    // Force session save before responding
    req.session.save((err) => {
      if (err) {
        console.error('[AUTH] Session save error:', err);
        return res.status(500).json({ error: 'Session save failed' });
      }
      
      console.log(`[AUTH] Session saved successfully`);
      res.status(201).json({
        success: true,
        user: { name: newUser.name, email: newUser.email }
      });
    });
    return;
  } catch (err) {
    console.error('[AUTH] Signup error:', err.message);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error during signup.' });
  }
});

// POST /api/auth/login — Authenticate user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase();

    // Find user
    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email.' });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Create session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    console.log(`[AUTH] Login successful for: ${normalizedEmail}`);
    console.log(`[AUTH] Session ID: ${req.sessionID}`);
    console.log(`[AUTH] Session user set: ${JSON.stringify(req.session.user)}`);
    
    // Force session save before responding
    req.session.save((err) => {
      if (err) {
        console.error('[AUTH] Session save error:', err);
        return res.status(500).json({ error: 'Session save failed' });
      }
      
      console.log(`[AUTH] Session saved successfully`);
      res.json({
        success: true,
        user: { name: user.name, email: user.email }
      });
    });
    return;
  } catch (err) {
    console.error('[AUTH] Login error:', err.message);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// POST /api/auth/logout — Destroy session
app.post('/api/auth/logout', (req, res) => {
  const email = req.session?.user?.email || 'unknown';
  req.session.destroy((err) => {
    if (err) {
      console.error('[AUTH] Logout error:', err.message);
      return res.status(500).json({ error: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid');
    console.log(`[AUTH] User logged out: ${email}`);
    res.json({ success: true });
  });
});

// GET /api/auth/me — Check current session
app.get('/api/auth/me', (req, res) => {
  console.log(`[AUTH] /api/auth/me called`);
  console.log(`[AUTH] Session ID: ${req.sessionID}`);
  console.log(`[AUTH] Session exists: ${!!req.session}`);
  console.log(`[AUTH] Session user: ${JSON.stringify(req.session?.user || 'none')}`);
  
  if (req.session && req.session.user) {
    console.log(`[AUTH] Returning loggedIn: true for ${req.session.user.email}`);
    return res.json({
      loggedIn: true,
      user: req.session.user
    });
  }
  
  console.log(`[AUTH] Returning loggedIn: false (no session/user)`);
  res.json({ loggedIn: false });
});
// GET /api/auth/google-client-id — Expose Google Client ID to frontend
app.get('/api/auth/google-client-id', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId === 'your_google_client_id_here') {
    return res.status(503).json({ error: 'Google Client ID not configured.' });
  }
  res.json({ clientId });
});


app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Google credential token is required.' });
    }

    // Verify token with Google's tokeninfo endpoint (no extra npm packages needed)
    const verifyRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );

    if (!verifyRes.ok) {
      return res.status(401).json({ error: 'Invalid Google token. Please try again.' });
    }

    const payload = await verifyRes.json();

    // Validate required fields
    if (!payload.email || !payload.email_verified) {
      return res.status(401).json({ error: 'Google account email not verified.' });
    }

    const normalizedEmail = payload.email.toLowerCase();
    const googleName = payload.name || payload.email.split('@')[0];
    const googleId = payload.sub;

    // Find or create user in MongoDB
    let user = await findUserByEmail(normalizedEmail);

    if (!user) {
      // Auto-register new Google user (no password needed)
      user = {
        _id: Date.now().toString(),
        name: googleName,
        email: normalizedEmail,
        googleId,
        password: null, // Google users have no password
        createdAt: new Date().toISOString()
      };
      await createUser(user);
      console.log(`[AUTH] Google user auto-registered: ${normalizedEmail}`);
    } else {
      // Update Google ID if not already set
      if (!user.googleId) {
        await updateUser(normalizedEmail, { googleId });
      }
      console.log(`[AUTH] Google user logged in: ${normalizedEmail}`);
    }

    // Create server session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    console.log(`[AUTH] Google OAuth session created`);
    console.log(`[AUTH] Session ID: ${req.sessionID}`);
    console.log(`[AUTH] Session user set: ${JSON.stringify(req.session.user)}`);
    
    // Force session save before responding
    req.session.save((err) => {
      if (err) {
        console.error('[AUTH] Session save error:', err);
        return res.status(500).json({ error: 'Session save failed' });
      }
      
      console.log(`[AUTH] Session saved successfully`);
      res.json({
        success: true,
        user: { name: user.name, email: user.email }
      });
    });
    return;

  } catch (err) {
    console.error('[AUTH] Google OAuth error:', err.message);
    res.status(500).json({ error: 'Google sign-in failed. Please try again.' });
  }
});

// ---------------------------------------------------------------------------
// Gemini API Proxy Route
// ---------------------------------------------------------------------------
app.post('/api/gemini/generate', requireAuth, async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.status(503).json({
      error: 'Gemini API key not configured on server. Set GEMINI_API_KEY in your .env file.'
    });
  }

  try {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const geminiModel = model || 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

    const body = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData?.error?.message || `HTTP ${response.status}`;
      console.error(`[GEMINI] API error: ${msg}`);
      return res.status(response.status).json({ error: `Gemini API error: ${msg}` });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: 'No text content in Gemini response.' });
    }

    res.json({ text });
  } catch (err) {
    console.error('[GEMINI] Proxy error:', err.message);
    res.status(500).json({ error: 'Failed to call Gemini API.' });
  }
});

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
async function startServer() {
  try {
    // Connect to MongoDB before starting the server
    await connectDB();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n✦ Career Guidance Server running at http://localhost:${PORT}`);
      console.log(`  → Login:  http://localhost:${PORT}/login.html`);
      console.log(`  → App:    http://localhost:${PORT}/app.html`);
      console.log(`  → API:    http://localhost:${PORT}/api/auth/me\n`);
    });
  } catch (err) {
    console.error('[SERVER] Failed to start:', err.message);
    process.exit(1);
  }
}

startServer();
