# Gemini API Setup Guide

## Getting Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key

## Configuration

### Option 1: Through the App UI
1. Open AuraCareer (`app.html`)
2. Click the ⚙️ settings icon in the navbar
3. Paste your API key in the Gemini API field
4. Click "Save" — the key is stored in your browser's localStorage

### Option 2: Environment File (for development)
1. Copy `.env.example` to `.env` in this directory
2. Replace `your_gemini_api_key_here` with your actual key
3. The `.env` file is gitignored and won't be committed

## Usage in Code

The Gemini API module (`api/gemini.js`) provides these methods:

```javascript
// Initialize with your API key
GeminiAPI.init('YOUR_API_KEY');

// Get career advice
const advice = await GeminiAPI.getCareerAdvice(
  ['Python', 'Machine Learning', 'TensorFlow'],
  { name: 'Sandeep', location: 'Bengaluru', degree: 'B.Tech', experience: 'Fresher' }
);

// Analyze resume text
const insights = await GeminiAPI.getResumeInsights(resumeText);

// Get skill gap analysis
const gaps = await GeminiAPI.getSkillGapAnalysis(
  ['Python', 'SQL'],
  'Data Scientist'
);
```

## Model

Default model: `gemini-2.0-flash` (fast and cost-effective)

You can change the model during initialization:
```javascript
GeminiAPI.init('YOUR_API_KEY', 'gemini-2.0-flash');
```

## Security Note

⚠️ **Important**: This project uses the API key client-side for demo purposes. For production:
- Use a backend proxy server to protect your API key
- Implement rate limiting
- Add user authentication before allowing API calls
