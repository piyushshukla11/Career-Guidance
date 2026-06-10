/* ==========================================================================
   AuraCareer — Gemini API Integration Module
   Client-side wrapper for Google Gemini API calls
   ========================================================================== */

const GeminiAPI = (() => {
  let API_KEY = '';
  let MODEL = 'gemini-2.0-flash';
  const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

  /**
   * Initialize the Gemini API module with an API key
   * @param {string} apiKey - Your Google Gemini API key
   * @param {string} [model] - Model to use (default: gemini-2.0-flash)
   */
  function init(apiKey, model) {
    if (!apiKey || typeof apiKey !== 'string') {
      console.error('[GeminiAPI] Invalid API key provided.');
      return false;
    }
    API_KEY = apiKey.trim();
    if (model) MODEL = model;
    console.log(`[GeminiAPI] Initialized with model: ${MODEL}`);
    return true;
  }

  /**
   * Check if API is configured
   */
  function isConfigured() {
    return API_KEY.length > 0;
  }

  /**
   * Send a prompt to Gemini and get a text response
   * @param {string} prompt - The text prompt
   * @returns {Promise<string>} The generated text response
   */
  async function generateText(prompt) {
    if (!isConfigured()) {
      throw new Error('Gemini API not initialized. Call GeminiAPI.init(apiKey) first.');
    }

    const url = `${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`;

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

    try {
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
    } catch (err) {
      console.error('[GeminiAPI] Request failed:', err.message);
      throw err;
    }
  }

  /**
   * Get AI-powered career advice based on user skills and profile
   * @param {string[]} skills - Array of skill names
   * @param {object} profile - User profile (name, location, degree, experience, proficiency)
   * @returns {Promise<string>} Career advice text
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
   * @param {string} resumeText - Extracted text from resume
   * @returns {Promise<string>} Resume analysis
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
   * @param {string[]} currentSkills - User's current skills
   * @param {string} targetRole - Desired career role
   * @returns {Promise<string>} Skill gap analysis
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

// Auto-load API key from localStorage if previously saved
(function autoLoadKey() {
  const savedKey = localStorage.getItem('auracareer_gemini_key');
  if (savedKey) {
    GeminiAPI.init(savedKey);
  }
})();
