/* ==========================================================================
   AuraCareer — Gemini API Integration Module
   Client-side wrapper that proxies requests through the backend server
   ========================================================================== */

const GeminiAPI = (() => {
  // Optional: allow client-side key for fallback (not recommended for production)
  let CLIENT_API_KEY = '';
  let MODEL = 'gemini-2.0-flash';
  const DIRECT_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

  /**
   * Initialize the Gemini API module with an optional client-side API key
   * In production, the server handles the key via .env — this is only a fallback
   * @param {string} apiKey - Optional client-side API key
   * @param {string} [model] - Model to use (default: gemini-2.0-flash)
   */
  function init(apiKey, model) {
    if (apiKey && typeof apiKey === 'string') {
      CLIENT_API_KEY = apiKey.trim();
    }
    if (model) MODEL = model;
    console.log(`[GeminiAPI] Initialized with model: ${MODEL}`);
    return true;
  }

  /**
   * Check if API is configured (either server-side or client-side)
   */
  function isConfigured() {
    // Always true — the server may have the key configured even if client doesn't
    return true;
  }

  /**
   * Send a prompt to Gemini via the backend proxy, with client-side fallback
   * @param {string} prompt - The text prompt
   * @returns {Promise<string>} The generated text response
   */
  async function generateText(prompt) {
    // Try server-side proxy first (recommended — keeps API key secure)
    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: MODEL })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) return data.text;
      }

      // If server returns 503 (no key configured), try client-side fallback
      const errorData = await response.json().catch(() => ({}));
      if (response.status !== 503 || !CLIENT_API_KEY) {
        throw new Error(errorData.error || `Server proxy error: HTTP ${response.status}`);
      }
    } catch (err) {
      // If server proxy fails and we have a client key, fall through to direct call
      if (!CLIENT_API_KEY) throw err;
      console.warn('[GeminiAPI] Server proxy failed, using client-side fallback:', err.message);
    }

    // Client-side fallback (only if a key was provided via the settings panel)
    if (!CLIENT_API_KEY) {
      throw new Error('Gemini API not configured. Set GEMINI_API_KEY in your server .env file.');
    }

    const url = `${DIRECT_BASE_URL}/${MODEL}:generateContent?key=${CLIENT_API_KEY}`;

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
      throw new Error(`Gemini API error: ${msg}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No text content in Gemini response');
    }

    return text;
  }

  /**
   * Get AI-powered career advice based on user skills and profile
   */
  async function getCareerAdvice(skills, profile) {
    const prompt = `You are an expert Indian career counselor. A user has the following profile:
    
Name: ${profile.name || 'Student'}
Location: ${profile.location || 'India'}
Degree: ${profile.degree || 'B.Tech'}
Experience: ${profile.experience || 'Fresher'}
Proficiency: ${profile.proficiency || 'Intermediate'}
Skills: ${skills.join(', ')}

Based on this profile, provide:
1. Top 3 career recommendations with match reasoning (focus on Indian job market)
2. Expected salary range in LPA (Lakhs Per Annum)
3. Key skill gaps to address
4. A brief 3-phase learning roadmap

Keep the response concise and actionable. Format with clear sections.`;

    return generateText(prompt);
  }

  /**
   * Get AI insights for resume text
   */
  async function getResumeInsights(resumeText) {
    const prompt = `Analyze this resume text and extract:
1. Key technical skills identified
2. Experience level assessment
3. Top 3 Indian job market career matches
4. Strengths and areas for improvement
5. Suggested additional skills to learn

Resume text:
${resumeText.substring(0, 3000)}

Provide a structured, concise analysis focused on the Indian tech job market.`;

    return generateText(prompt);
  }

  /**
   * Get skill gap analysis
   */
  async function getSkillGapAnalysis(currentSkills, targetRole) {
    const prompt = `A user in India wants to become a "${targetRole}". 
Their current skills are: ${currentSkills.join(', ')}.

Provide:
1. Skills they already have that are relevant
2. Critical missing skills they need to learn
3. A prioritized 4-week learning plan
4. Recommended free/affordable courses (Indian platforms like NPTEL preferred)
5. Expected timeline to become job-ready

Be specific and practical. Focus on Indian job market requirements.`;

    return generateText(prompt);
  }

  // Public API
  return {
    init,
    isConfigured,
    generateText,
    getCareerAdvice,
    getResumeInsights,
    getSkillGapAnalysis
  };
})();

// Auto-load API key from localStorage if previously saved (client-side fallback)
(function autoLoadKey() {
  const savedKey = localStorage.getItem('auracareer_gemini_key');
  if (savedKey) {
    GeminiAPI.init(savedKey);
  }
})();
