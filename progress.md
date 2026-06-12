# AuraCareer — Progress Log

## 2026-06-10 — Project Restructure Completed ✅

### Summary
Restructured AuraCareer from a single-page wizard into a multi-page application with proper authentication flow.

### Changes Made:

#### 1. Project Structure Redesign
- `index.html` (old wizard) → moved to `app.html`
- New `index.html` → premium landing page with animated WebGL Orb
- New `login.html` → authentication page with login/signup

#### 2. New Files Created:
| File | Purpose |
|------|---------|
| `css/landing.css` | Landing page styles with glassmorphism |
| `css/login.css` | Login page styles with form validation |
| `js/orb.js` | Vanilla WebGL Orb shader (converted from React/OGL) |
| `js/landing.js` | Landing page interactions & animations |
| `js/login.js` | Login/auth logic with localStorage sessions |
| `api/gemini.js` | Gemini API integration module |
| `gemini-env/.env.example` | API key template |
| `gemini-env/README.md` | Gemini setup instructions |
| `progress.md` | This file |

#### 3. Modified Files:
| File | Changes |
|------|---------|
| `app.html` | Removed old landing hero/islands, added auth check, Gemini settings panel, logout button |
| `.gitignore` | Added env file exclusions |

#### 4. Navigation Flow:
```
Landing Page (index.html) 
    → "Get Started" → Login (login.html) 
    → Sign In/Up → Main App (app.html)
```

#### 5. Features Added:
- WebGL animated Orb shader on landing page
- Login/signup with localStorage session management
- Google social login button (visual demo)
- Gemini API settings panel in main app navbar
- User greeting from auth session
- Logout functionality
- Floating particle effects on landing page
- Count-up stat animations

---

*This file is updated after every significant change.*

---

## 2026-06-10 — Gemini API Key Configured

- API key saved to `gemini-env/.env` (gitignored)
- `api/gemini.js` updated to auto-initialize with the key on page load
- Key also persists in localStorage for the app's settings panel

---

## 2026-06-12 — Real Backend Server Implemented ✅

### Summary
Replaced the client-side-only localStorage auth and browser-exposed Gemini API with a fully functional Node.js/Express backend.

### New Files Created:
| File | Purpose |
|------|---------|
| `server.js` | Express backend — auth routes, Gemini proxy, static file serving |
| `package.json` | Node.js project config with dependencies |
| `.env` | Server configuration (Gemini API key, session secret, port) |
| `data/users.json` | JSON file database for user accounts (auto-created) |

### Modified Files:
| File | Changes |
|------|---------|
| `js/login.js` | Replaced localStorage auth with `fetch('/api/auth/login')` and `/signup` API calls |
| `app.html` | Session check via `fetch('/api/auth/me')`, logout via `fetch('/api/auth/logout')` |
| `api/gemini.js` | Routes through `/api/gemini/generate` server proxy, with client-side fallback |
| `.gitignore` | Added `data/`, `*.db`, `.env` |

### Backend API Endpoints:
| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `/api/auth/signup` | Create user with bcrypt-hashed password |
| `POST` | `/api/auth/login` | Authenticate & create server-side session |
| `POST` | `/api/auth/logout` | Destroy session |
| `GET`  | `/api/auth/me` | Check if session is active |
| `POST` | `/api/gemini/generate` | Server-side Gemini API proxy (auth required) |

### Key Tech Decisions:
- Used `bcryptjs` (pure JS) instead of `bcrypt` (native) to avoid C++ build tools requirement
- Used JSON file storage instead of SQLite to avoid native `better-sqlite3` compilation issues on Windows
- Server-side sessions via `express-session` with HTTP-only cookies
- Gemini API key stored in `.env` on server — never exposed to browser

---

## 2026-06-12 — Dither Animation Mouse Fix ✅

- Fixed: dither wave animation on login page would freeze when mouse passed over the login card, then jerk back when exiting
- **Root cause**: `mousemove` listener was on the dither container only; login card blocked events from reaching it
- **Fix**: Changed `mousemove` listener from `container` to `document` level in `js/dither.js`
- Removed unnecessary `pointer-events: auto` from dither container in `login.html`

---

## 2026-06-12 — Back to Home Button Visibility ✅

- Made "Back to Home" link on login page more visible over the dither animation
- Changed from faint 25% opacity text to a glassmorphic pill button with:
  - 85% white text, dark blurred background, subtle border
  - Hover effect brightens to full white

---

## 2026-06-12 — Transparent Glassy Black Navbar ✅

- Made the main app navbar (`main-nav`) fully transparent with glassy black glassmorphism:
  - `background: rgba(0, 0, 0, 0.25)` — nearly transparent dark background
  - `backdrop-filter: blur(28px)` — strong blur so the blobs/content below bleeds through
  - Bottom border changed to a hairline `rgba(255,255,255, 0.06)` — ultra-subtle white line
  - Deep shadow `rgba(0,0,0,0.4)` to lift the bar visually from content
- Updated the `.glass` base class to use `rgba(0,0,0,0.35)` + lighter border `rgba(255,255,255,0.07)` for all glass cards

---

## 2026-06-12 — Premium Minimalist Dark Theme Refactoring ✅

- **Global Color Variables Migration**: Created a cohesive design language across the application using:
  - **Background**: Pure pitch-black `#000000`
  - **Text**: Pure white `#ffffff` (headings/primary) and neutral zinc grays `#a1a1aa`/`#71717a` (secondary/muted)
  - **Accents**: Premium light Sky Blue `#7dd3fc` and Slate `#94a3b8`
- **Global Theme Cleanup**:
  - Replaced all hardcoded blue (`rgba(79, 142, 247, ...)`) and purple (`rgba(124, 58, 237, ...)`) properties inside `css/style.css` with coordinated variable-aligned values or neutral transitions.
- **HTML Markup Cleanup**:
  - Removed all raw inline style overrides from `app.html` (`body`, `.blob-bg`, and `.main-nav`).
  - Added clean default stylesheet styling rule updates inside `css/style.css` to manage background states and navigation styles.
  - Cache-busted the app stylesheet inside `app.html` (bumped query parameter to `v=11`) to force instant visual updates.
- **Slow Ambient Breathing Background Glow**:
  - Re-enabled glowing background blobs on the pitch-black layout with a custom `@keyframes ambientBreath` animation (ranging from `0.005` to `0.045` opacity).
  - Slowed down floating velocity using offsets (80s, 95s, and 70s) to create an organic, non-synchronized floating effect.
  - Keeps the background blob colors static (as originally styled) and not changing automatically.
- **Click-Based Highlight Text Color Shifter**:
  - Implemented a JavaScript handler in `app.html` that registers a document click event.
  - With each click on the page (excluding inputs, buttons, and settings panels), a non-white accent text highlight, badge, or icon updates to the next color in a 12 (3*4) premium color palette one by one.
  - Smoothly changes colors of the elements gradually over consecutive clicks.
- **Reddish-Orange Color Palette Migration**:
  - Changed CSS variable `--accent` to Reddish Orange (`#ff5e36`) and `--accent2` to Warm Silver (`#d6d3d1`).
  - Coordinated the 12-color click-shift array inside `app.html` to a warm reddish-orange aligned palette of premium corals, oranges, ambers, and warm grays.
- **Global Page Alignment (Landing, Login, About)**:
  - Updated variables inside `css/landing.css` (`--mirror-accent` and `--mirror-accent-glow`) and `css/login.css` (`--login-accent` and `--login-accent-glow`) to the new Reddish Orange color scheme.
  - Adjusted the bottom-right ambient glow orb on the landing page to reddish-orange.
  - Updated the dither wave background simulation color on `login.html` to a warm reddish-orange `[1.0, 0.37, 0.21]`.
  - Cache-busted all stylesheets across `index.html`, `login.html`, and `about.html` (bumped to `v=2`).
- **Navbar Controls Alignment**:
  - Defined flexbox layout on `.nav-right` with vertical centering (`align-items: center`) and a clean `12px` gap.
  - Removed raw inline margins from the greeting span and logout button inside `app.html`.
  - Cache-busted `app.html` stylesheet to `v=12`.

---

## 2026-06-12 — MongoDB Atlas + Railway Deployment (24/7 Cloud Hosting) 🚧

### Summary
Migrated from local JSON file database to MongoDB Atlas (cloud-hosted) and deployed to Railway for 24/7 uptime.

### Deployment Steps Completed:

#### 1. Database Migration
- Replaced JSON file DB (`data/users.json`) with MongoDB Atlas using official `mongodb` npm driver
- Updated `server.js` to use MongoDB connection pooling with automatic reconnect
- All auth routes (signup, login, Google OAuth) now use MongoDB instead of JSON files

#### 2. Railway Deployment Setup
- Created fork of repo to personal GitHub account (`piyushshukla11/Career-Guidance`)
- Added `railway.json` configuration file for Railway deployment
- Updated `package.json` with Node 18+ engine specification
- Pushed code to GitHub and connected Railway to deploy from personal fork

#### 3. Environment Variables Configured
- `MONGODB_URI`: MongoDB Atlas connection string
- `SESSION_SECRET`: Generated random secret for session encryption
- `GEMINI_API_KEY`: Gemini API key for AI features
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `NODE_ENV`: Set to `production`

#### 4. MongoDB Atlas Configuration
- Created free M0 cluster (512MB)
- Configured database user: `piyushkumarshukla677_db_user`
- Set IP access to "Allow Access from Anywhere" (0.0.0.0/0) for Railway connectivity
- Database name: `career-guidance`

#### 5. Session Configuration for Production
- Updated session cookie settings for Railway compatibility
- Changed `sameSite` from `'none'` to `'lax'` for better cookie handling
- Set `secure: true` for HTTPS in production

### Current Issue: Login Redirect Loop ⚠️

**Problem**: After successful login, user is redirected back to login page instead of app.html.

**Root Cause**: Session cookie not being properly set/persisted in Railway environment.

**Troubleshooting Steps Taken**:
1. ✅ Verified MONGODB_URI is correctly set (was placeholder, now actual connection string)
2. ✅ Verified SESSION_SECRET is set (was placeholder, now generated value)
3. ✅ Fixed MongoDB Atlas IP access (added 0.0.0.0/0)
4. ✅ Updated session cookie configuration (sameSite: 'lax')
5. ✅ Pushed fixes to GitHub and Railway redeployed

**Status**: Still experiencing redirect loop after all fixes. Session appears to not persist between login request and subsequent page load.

**Next Steps Needed**:
- Debug session cookie behavior in Railway environment
- Possibly add CORS configuration for cross-origin requests
- Consider alternative session storage (Redis) for production
- Add detailed logging to track session creation/validation

**Live URL**: https://career-guidance-production-9c5c.up.railway.app

---

## 2026-06-13 — Session Cookie Persistence Fix ✅

### Root Cause Identified & Fixed
The login redirect loop was caused by **missing `credentials: 'include'` in fetch requests**. Browsers don't send session cookies with fetch requests unless this option is explicitly set.

### Changes Made:
**Updated all authentication-related fetch requests** to include `credentials: 'include'`:

| File | Changes |
|------|---------|
| [js/login.js](js/login.js) | Added `credentials: 'include'` to login form, signup form, and session check fetches |
| [app.html](app.html) | Added `credentials: 'include'` to auth/me and logout fetches |
| [login.html](login.html) | Added `credentials: 'include'` to Google OAuth fetches |
| [api/gemini.js](api/gemini.js) | Added `credentials: 'include'` to authenticated Gemini API calls |

### Why This Works:
- **Without `credentials: 'include'`**: The browser makes the fetch request BUT does not attach session cookies. The server receives the request without any session identifier.
- **With `credentials: 'include'`**: The browser automatically attaches all cookies (including `connect.sid` session cookie) to the request, allowing the server to validate the session and maintain state.

### Testing:
- Login flow should now properly:
  1. Send credentials to `/api/auth/login`
  2. Server sets `connect.sid` cookie in response
  3. Browser stores the cookie
  4. Redirect to app.html with cookie in request
  5. App checks `/api/auth/me` with the cookie
  6. Server validates session and returns `loggedIn: true`

**Live URL**: https://career-guidance-production-9c5c.up.railway.app

