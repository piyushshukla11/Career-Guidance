/* ==========================================================================
   AuraCareer - Application Logic and Wizard Controller
   ========================================================================== */

// Global Application State
const state = {
  method: 'manual', // 'manual' or 'resume'
  activeStep: 0,    // Page index: 0 (landing) to 7 (results)
  selectedInterests: [],
  selectedSkills: new Set(),
  resumeFile: null,
  resumeSkills: [],
  profile: {
    name: "Alex Carter",
    location: "Bengaluru, Karnataka",
    degree: "B.E / B.Tech",
    experience: "Fresher (0 years)",
    proficiency: "Intermediate"
  },
  quizScore: null,
  quizAnswers: {},
  activeMatches: [],
  allCareersResults: [],
  activeResultsTab: 'matches',
  feedbacks: {}
};

// Keyword mapping for simulated AI resume parser
const RESUME_SKILL_MAP = {
  python: 'python',
  'c++': 'cpp',
  cpp: 'cpp',
  c: 'c',
  sql: 'sql',
  matlab: 'matlab',
  javascript: 'javascript',
  js: 'javascript',
  'machine learning': 'ml',
  ml: 'ml',
  'deep learning': 'dl',
  dl: 'dl',
  tensorflow: 'tensorflow',
  pytorch: 'pytorch',
  'scikit-learn': 'scikit',
  scikit: 'scikit',
  statistics: 'stats',
  stats: 'stats',
  numpy: 'numpy',
  pandas: 'pandas',
  'power bi': 'power_bi',
  powerbi: 'power_bi',
  'hugging face': 'huggingface',
  huggingface: 'huggingface',
  transformers: 'transformers',
  opencv: 'opencv',
  'image processing': 'image_processing',
  llms: 'llms',
  llm: 'llms',
  langchain: 'langchain',
  rag: 'rag',
  'prompt engineering': 'prompt',
  prompt: 'prompt',
  tinyml: 'tinyml',
  ros: 'ros',
  arduino: 'arduino',
  'raspberry pi': 'raspi',
  raspi: 'raspi',
  plc: 'plc',
  scada: 'scada',
  sensors: 'sensors',
  sensor: 'sensors',
  slam: 'slam',
  'motion planning': 'motion_planning',
  embedded: 'embedded',
  iot: 'iot',
  designing: 'designing',
  design: 'designing',
  figma: 'figma',
  css: 'css',
  html: 'html',
  cad: 'cad',
  robotics: 'robotics'
};

// DOM Elements cache
let elements = {};

// Initialize application on load
document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  initInterestsSelector();
  initSkillsSelector();
  setupQuizState();
  
  // Set window resize listener to redraw flowchart paths dynamically
  window.addEventListener("resize", () => {
    if (state.activeStep === 6) {
      drawFlowchartConnections();
    }
  });

  // Slider adjustments
  const relevanceSlider = document.getElementById("fb-relevance-slider");
  const utilitySlider = document.getElementById("fb-utility-slider");
  if (relevanceSlider) {
    relevanceSlider.addEventListener("input", (e) => {
      document.getElementById("fb-relevance-val").innerText = e.target.value;
    });
  }
  if (utilitySlider) {
    utilitySlider.addEventListener("input", (e) => {
      document.getElementById("fb-utility-val").innerText = e.target.value;
    });
  }
});

function cacheElements() {
  elements = {
    // Navigation dot items
    navProgress: document.getElementById("nav-step-progress"),
    stepLabel: document.getElementById("stepLabel"),
    stepDots: document.querySelectorAll(".step-dot"),
    themeToggleBtn: document.getElementById("theme-toggle"),
    
    // Pages
    pages: document.querySelectorAll(".page"),
    
    // Method select cards
    mManual: document.getElementById("mManual"),
    mResume: document.getElementById("mResume"),
    resumeSection: document.getElementById("resumeSection"),
    uploadZone: document.getElementById("uploadZone"),
    resumeFile: document.getElementById("resumeFile"),
    filePreview: document.getElementById("filePreview"),
    fileName: document.getElementById("fileName"),
    fileSize: document.getElementById("fileSize"),
    parseStatus: document.getElementById("parseStatus"),
    
    // Step 2 & 3 selectors
    interestsGrid: document.getElementById("interests-grid-wizard"),
    skillsCatTabs: document.getElementById("skills-cat-tabs-wizard"),
    skillsPool: document.getElementById("skills-pool-wizard"),
    activeSkillsList: document.getElementById("active-skills-list-wizard"),
    skillCountText: document.getElementById("skillCount"),
    autoNotice: document.getElementById("autoNotice"),
    autoNoticeText: document.getElementById("autoNoticeText"),
    
    // Step 4 profile inputs
    userName: document.getElementById("userName"),
    userLocation: document.getElementById("userLocation"),
    userDegree: document.getElementById("userDegree"),
    userExp: document.getElementById("userExp"),
    userLevel: document.getElementById("userLevel"),
    
    // Step 5 Quiz state blocks
    quizReady: document.getElementById("quiz-ready"),
    quizActive: document.getElementById("quiz-active"),
    quizFinished: document.getElementById("quiz-finished"),
    quizOptionsList: document.getElementById("quiz-options-list"),
    
    // Step 6 Flowchart
    flowchartContainer: document.getElementById("flowchart-container"),
    flowchartSvg: document.getElementById("flowchart-svg"),
    inputNodesList: document.getElementById("input-nodes-list"),
    outputNodesList: document.getElementById("output-nodes-list"),
    nodeInfoBoard: document.getElementById("node-info-board"),
    boardContent: document.getElementById("board-content"),
    boardTitle: document.getElementById("board-title"),
    boardBadge: document.getElementById("board-badge"),
    boardDesc: document.getElementById("board-desc"),
    boardDetailsGrid: document.getElementById("board-details-grid"),
    
    // Step 7 Results Dashboard
    resultGreeting: document.getElementById("resultGreeting"),
    resumeBanner: document.getElementById("resumeBanner"),
    resumeBannerText: document.getElementById("resumeBannerText"),
    summaryGrid: document.getElementById("summaryGrid"),
    aiInsightText: document.getElementById("aiInsightText"),
    careerResults: document.getElementById("careerResults"),
    learningPath: document.getElementById("learningPath"),
    learningSection: document.getElementById("learningSection"),
    consoleBox: document.getElementById("console-box"),
    
    // Modals
    jobModal: document.getElementById("job-modal"),
    modalJobName: document.getElementById("modal-job-name"),
    modalJobSalary: document.getElementById("modal-job-salary"),
    modalJobMatch: document.getElementById("modal-job-match"),
    modalJobDesc: document.getElementById("modal-job-desc"),
    modalCompaniesList: document.getElementById("modal-companies-list"),
    modalRoadmap: document.getElementById("modal-roadmap"),
    modalResources: document.getElementById("modal-resources")
  };
}

/* ==========================================================================
   Wizard Routing (Page Swapping)
   ========================================================================== */
function goTo(stepIndex) {
  state.activeStep = stepIndex;
  
  // Toggle Navbar progress panel
  if (stepIndex === 0) {
    elements.navProgress.style.display = "none";
  } else {
    elements.navProgress.style.display = "flex";
  }

  // Update page visible active classes
  elements.pages.forEach((page, idx) => {
    if (idx === stepIndex) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  // Update dots navigation indicators
  elements.stepDots.forEach((dot, idx) => {
    const dotNum = idx + 1; // dots are 1-indexed
    dot.classList.remove("active", "done");
    
    if (dotNum < stepIndex) {
      dot.classList.add("done");
    } else if (dotNum === stepIndex) {
      dot.classList.add("active");
    }
  });

  if (stepIndex > 0) {
    elements.stepLabel.innerText = `Step ${stepIndex} of 7`;
  }

  // Hook specific scripts per page
  if (stepIndex === 3) {
    applyResumeSkills();
    initSkillsSelector();
  } else if (stepIndex === 5) {
    setupQuizState();
  } else if (stepIndex === 6) {
    renderFlowchartNodes();
    setTimeout(drawFlowchartConnections, 80); // short delay to get correct bounding offsets
  } else if (stepIndex === 7) {
    computeMatchesResults();
    renderResultsDashboard();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
  const html = document.documentElement;
  const themeBtn = elements.themeToggleBtn;
  
  if (html.getAttribute("data-theme") === "dark") {
    html.setAttribute("data-theme", "light");
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    html.setAttribute("data-theme", "dark");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

/* ==========================================================================
   Step 1: Method Selector (Manual Tag vs Upload Resume)
   ========================================================================== */
function selectMethod(method) {
  state.method = method;
  
  if (method === 'manual') {
    elements.mManual.classList.add("selected");
    elements.mResume.classList.remove("selected");
    elements.resumeSection.style.display = "none";
  } else {
    elements.mManual.classList.remove("selected");
    elements.mResume.classList.add("selected");
    elements.resumeSection.style.display = "block";
  }
}

function handleDragOver(e) {
  e.preventDefault();
  elements.uploadZone.classList.add("dragover");
}

function handleDragLeave(e) {
  elements.uploadZone.classList.remove("dragover");
}

function handleDrop(e) {
  e.preventDefault();
  elements.uploadZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
    showToast("⚠️ Standard files supported: PDF, DOC, DOCX");
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    showToast("⚠️ Limit files to 5MB");
    return;
  }

  state.resumeFile = file;
  elements.fileName.innerText = file.name;
  elements.fileSize.innerText = `${(file.size / 1024).toFixed(0)} KB · ${file.name.split('.').pop().toUpperCase()}`;
  
  elements.uploadZone.style.display = "none";
  elements.filePreview.style.display = "block";
  
  simulateResumeParsing(file);
}

function clearFile() {
  state.resumeFile = null;
  state.resumeSkills = [];
  elements.filePreview.style.display = "none";
  elements.uploadZone.style.display = "block";
  document.getElementById("resumeFile").value = "";
  elements.parseStatus.innerHTML = "";
}

function simulateResumeParsing(file) {
  const terminal = elements.parseStatus;
  terminal.innerHTML = `<div class="parse-row"><div class="dot dot-blue"></div>Reading binary data blocks...</div>`;
  
  // Use FileReader to extract keywords if it is a text-accessible file
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result || "";
    const lowerText = text.toLowerCase();

    setTimeout(() => {
      terminal.innerHTML += `<div class="parse-row"><div class="dot dot-blue"></div>Extracting active skill keywords...</div>`;
      
      setTimeout(() => {
        const foundSkills = new Set();
        
        // Scan mappings
        Object.entries(RESUME_SKILL_MAP).forEach(([keyword, skillId]) => {
          if (lowerText.includes(keyword)) {
            foundSkills.add(skillId);
          }
        });
        
        // Fallback default skills if no keywords parsed
        if (foundSkills.size === 0) {
          const defaults = ['python', 'pandas', 'numpy', 'scikit', 'sql'];
          defaults.forEach(sk => foundSkills.add(sk));
        }

        state.resumeSkills = Array.from(foundSkills);
        
        terminal.innerHTML += `<div class="parse-row"><div class="dot dot-green"></div>Extracted <strong>${foundSkills.size} skill tags</strong> successfully.</div>`;
        terminal.innerHTML += `<div class="extracted-tags">${state.resumeSkills.map(skId => {
          const skillObj = CAREER_DATA.skills.find(s => s.id === skId);
          return `<span class="ext-tag">${skillObj ? skillObj.name : skId}</span>`;
        }).join('')}</div>`;
        terminal.innerHTML += `<div class="parse-row"><div class="dot dot-green"></div>Ready to proceed. Adjust list on the next page.</div>`;
      }, 1000);
    }, 600);
  };

  reader.onerror = function() {
    // Fallback if reader errors
    const defaults = ['python', 'ml', 'tensorflow', 'scikit', 'numpy'];
    state.resumeSkills = defaults;
    terminal.innerHTML += `<div class="parse-row"><div class="dot dot-green"></div>Loaded default skills fallback.</div>`;
  };

  reader.readAsText(file.slice(0, 10000)); // scan first 10kb
}

function nextFromMethod() {
  if (state.method === 'resume' && !state.resumeFile) {
    showToast("⚠️ Please upload a resume file first");
    return;
  }
  goTo(2);
}

/* ==========================================================================
   Step 2: Interests Cards Page
   ========================================================================== */
function initInterestsSelector() {
  const grid = elements.interestsGrid;
  grid.innerHTML = "";
  
  CAREER_DATA.interests.forEach(interest => {
    const card = document.createElement("div");
    const isSelected = state.selectedInterests.includes(interest.id);
    card.className = `interest-card ${isSelected ? "selected" : ""}`;
    card.innerHTML = `
      <div class="icon">${interest.icon.includes('fa-') ? `<i class="${interest.icon}"></i>` : interest.icon}</div>
      <div class="label">${interest.name}</div>
      <div class="sublabel">Core sector</div>
    `;
    card.onclick = () => toggleInterest(interest.id, card);
    grid.appendChild(card);
  });
}

function toggleInterest(interestId, element) {
  const index = state.selectedInterests.indexOf(interestId);
  if (index === -1) {
    state.selectedInterests.push(interestId);
    element.classList.add("selected");
  } else {
    state.selectedInterests.splice(index, 1);
    element.classList.remove("selected");
  }
}

function nextFromInterests() {
  if (state.selectedInterests.length === 0) {
    showToast("⚠️ Select at least one domain of interest");
    return;
  }
  goTo(3);
}

/* ==========================================================================
   Step 3: Skills Checklist
   ========================================================================== */
let activeSkillTab = "All";
const categoryFilters = ["All", "Programming", "AI / ML & NLP", "Robotics & Hardware", "Design & UI"];

function initSkillsSelector() {
  const tabsContainer = elements.skillsCatTabs;
  tabsContainer.innerHTML = "";
  
  // Render tabs
  categoryFilters.forEach(cat => {
    const tab = document.createElement("button");
    tab.className = `skill-tab ${cat === activeSkillTab ? "active" : ""}`;
    tab.innerText = cat;
    tab.onclick = () => {
      activeSkillTab = cat;
      initSkillsSelector();
    };
    tabsContainer.appendChild(tab);
  });

  // Filter skills pool
  const filtered = activeSkillTab === "All"
    ? CAREER_DATA.skills
    : CAREER_DATA.skills.filter(s => s.category === activeSkillTab || (activeSkillTab === "Design & UI" && s.category === "Design & Analytics"));

  // Render pool pills
  const pool = elements.skillsPool;
  pool.innerHTML = "";
  
  filtered.forEach(skill => {
    const pill = document.createElement("div");
    const isSelected = state.selectedSkills.has(skill.id);
    const isAuto = state.resumeSkills.includes(skill.id);
    
    pill.className = `skill-pill ${isSelected ? "selected" : ""} ${isAuto ? "auto" : ""}`;
    pill.innerHTML = `
      <i class="${isSelected ? "fas fa-check" : "fas fa-plus"}"></i>
      <span>${skill.name}</span>
    `;
    pill.onclick = () => toggleSkill(skill.id);
    pool.appendChild(pill);
  });

  // Render active selection tags list
  const activeList = elements.activeSkillsList;
  activeList.innerHTML = "";
  
  if (state.selectedSkills.size === 0) {
    activeList.innerHTML = '<span class="no-skills-msg">Select skills from the list above.</span>';
  } else {
    state.selectedSkills.forEach(skillId => {
      const skillObj = CAREER_DATA.skills.find(s => s.id === skillId);
      if (!skillObj) return;
      
      const tag = document.createElement("span");
      tag.className = "active-skill-tag animate-pulse";
      tag.innerHTML = `
        <span>${skillObj.name}</span>
        <i class="fas fa-xmark" onclick="toggleSkill('${skillId}')"></i>
      `;
      activeList.appendChild(tag);
    });
  }

  elements.skillCountText.innerText = state.selectedSkills.size;
}

function applyResumeSkills() {
  if (state.method === 'resume' && state.resumeSkills.length > 0) {
    state.resumeSkills.forEach(skId => {
      state.selectedSkills.add(skId);
    });
    
    elements.autoNotice.style.display = "flex";
    elements.autoNoticeText.innerText = `${state.resumeSkills.length} skills auto-extracted from your resume are highlighted in green.`;
  } else {
    elements.autoNotice.style.display = "none";
  }
}

function toggleSkill(skillId) {
  if (state.selectedSkills.has(skillId)) {
    state.selectedSkills.delete(skillId);
  } else {
    state.selectedSkills.add(skillId);
  }
  
  initSkillsSelector();
}

function nextFromSkills() {
  if (state.selectedSkills.size === 0) {
    showToast("⚠️ Add at least one tech skill to continue");
    return;
  }
  goTo(4);
}

/* ==========================================================================
   Step 4: Profile Details Page
   ========================================================================== */
function nextFromProfile() {
  state.profile.name = elements.userName.value || "Alex Carter";
  state.profile.location = elements.userLocation.value || "Bengaluru, India";
  state.profile.degree = elements.userDegree.value || "B.E / B.Tech";
  state.profile.experience = elements.userExp.value || "Fresher (0 years)";
  state.profile.proficiency = elements.userLevel.value || "Intermediate";
  
  // Complete matching evaluations
  computeMatchesResults();
  goTo(5); // quiz page
}

/* ==========================================================================
   Step 5: Assessment Quiz Page
   ========================================================================== */
let activeQuestionsList = [];
let quizIndex = 0;
let quizScoreCorrect = 0;

function setupQuizState() {
  // Identify the skill categories of selected skills to query appropriate questions
  const activeCats = new Set();
  state.selectedSkills.forEach(skId => {
    const skObj = CAREER_DATA.skills.find(s => s.id === skId);
    if (skObj) {
      if (skObj.category === "Design & Analytics") {
        activeCats.add("Design & Analytics");
      } else {
        activeCats.add(skObj.category);
      }
    }
  });

  activeQuestionsList = CAREER_DATA.quiz.filter(q => {
    if (q.category === "Programming") return activeCats.has("Programming");
    if (q.category === "AI / ML & NLP") return activeCats.has("AI / ML & NLP");
    if (q.category === "Robotics & Hardware") return activeCats.has("Robotics & Hardware");
    if (q.category === "Design & Analytics") return activeCats.has("Design & Analytics");
    return false;
  });

  if (activeQuestionsList.length === 0) {
    // fallback default questions if no categories mapped
    activeQuestionsList = CAREER_DATA.quiz.slice(0, 3);
  }

  elements.quizReady.style.display = "flex";
  elements.quizActive.style.display = "none";
  elements.quizFinished.style.display = "none";
  document.getElementById("quiz-question-count").innerText = activeQuestionsList.length;
}

function startQuiz() {
  quizIndex = 0;
  quizScoreCorrect = 0;
  state.quizAnswers = {};
  
  elements.quizReady.style.display = "none";
  elements.quizActive.style.display = "flex";
  
  renderQuestion();
}

function skipQuiz() {
  state.quizScore = null;
  goTo(6); // flowchart page
}

function renderQuestion() {
  if (quizIndex >= activeQuestionsList.length) {
    completeQuiz();
    return;
  }

  const q = activeQuestionsList[quizIndex];
  
  document.getElementById("quiz-current-num").innerText = quizIndex + 1;
  document.getElementById("quiz-total-num").innerText = activeQuestionsList.length;
  
  const pct = (quizIndex / activeQuestionsList.length) * 100;
  document.getElementById("quiz-progress-bar").style.width = `${pct}%`;
  
  document.getElementById("quiz-question-category").innerText = q.category;
  document.getElementById("quiz-question-text").innerText = q.question;
  
  // Options render
  const list = elements.quizOptionsList;
  list.innerHTML = "";
  
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.innerHTML = `
      <div class="option-indicator"></div>
      <span>${opt}</span>
    `;
    btn.onclick = () => selectOption(opt, btn);
    list.appendChild(btn);
  });
  
  document.getElementById("quiz-submit-answer").disabled = true;
}

let activeSelectedOpt = null;

function selectOption(option, element) {
  activeSelectedOpt = option;
  
  const optionsBtns = elements.quizOptionsList.querySelectorAll(".quiz-option-btn");
  optionsBtns.forEach(btn => btn.classList.remove("selected"));
  
  element.classList.add("selected");
  document.getElementById("quiz-submit-answer").disabled = false;
}

function submitAnswer() {
  const q = activeQuestionsList[quizIndex];
  if (activeSelectedOpt === q.answer) {
    quizScoreCorrect++;
  }
  
  state.quizAnswers[q.id] = activeSelectedOpt;
  quizIndex++;
  activeSelectedOpt = null;
  renderQuestion();
}

function completeQuiz() {
  document.getElementById("quiz-progress-bar").style.width = "100%";
  
  const score = Math.round((quizScoreCorrect / activeQuestionsList.length) * 100);
  state.quizScore = score;
  
  elements.quizActive.style.display = "none";
  elements.quizFinished.style.display = "flex";
  
  document.getElementById("score-percentage").innerText = `${score}%`;
  document.getElementById("score-correct").innerText = quizScoreCorrect;
  document.getElementById("score-total").innerText = activeQuestionsList.length;
  
  // Re-run matching weights to include validation score bonus
  computeMatchesResults();
  
  logConsole(`[SYSTEM] Skills validation completed. Accuracy Score: ${score}%. Recommendations metrics updated.`, "system");
}

/* ==========================================================================
   Step 6: SVG flowchart pathways drawing
   ========================================================================== */
function renderFlowchartNodes() {
  // 1. Render Left Column (User Skills)
  elements.inputNodesList.innerHTML = "";
  
  CAREER_DATA.skills.forEach(skill => {
    const isSelected = state.selectedSkills.has(skill.id);
    const node = document.createElement("div");
    node.id = `node-skill-${skill.id}`;
    node.className = `flowchart-node ${isSelected ? "active" : ""}`;
    
    // Choose icons
    let icon = "fas fa-code";
    if (skill.id === "python") icon = "fab fa-python";
    else if (skill.id === "css") icon = "fab fa-css3-alt";
    else if (skill.id === "html") icon = "fab fa-html5";
    else if (skill.id === "designing") icon = "fas fa-wand-magic-sparkles";
    else if (skill.id === "figma") icon = "fab fa-figma";
    else if (skill.id === "cad") icon = "fas fa-cube";
    else if (skill.id === "ros") icon = "fas fa-robot";
    else if (skill.id === "sql") icon = "fas fa-database";
    else if (skill.id === "plc") icon = "fas fa-network-wired";
    else if (skill.id === "scada") icon = "fas fa-display";
    else if (skill.id === "sensors") icon = "fas fa-microchip";
    else if (skill.id === "slam") icon = "fas fa-route";
    else if (skill.id === "embedded") icon = "fas fa-memory";
    
    node.innerHTML = `
      <i class="${icon}"></i>
      <span>${skill.name}</span>
      <div class="node-indicator"></div>
    `;
    
    node.addEventListener("mouseenter", () => displayNodeDetails("skill", skill));
    elements.inputNodesList.appendChild(node);
  });

  // Activate preprocessor center nodes
  const prep = document.getElementById("node-preprocessor");
  const rec = document.getElementById("node-recommender");
  const mkt = document.getElementById("node-market-data");
  
  if (state.selectedSkills.size > 0) {
    prep.classList.add("active");
    rec.classList.add("active");
    mkt.classList.add("active");
    document.getElementById("engine-status-text").innerText = "Analyzing Paths";
    document.getElementById("engine-status-text").style.color = "var(--success)";
  } else {
    prep.classList.remove("active");
    rec.classList.remove("active");
    mkt.classList.remove("active");
    document.getElementById("engine-status-text").innerText = "Idle";
    document.getElementById("engine-status-text").style.color = "var(--text3)";
  }

  // 2. Render Right Column (Careers outputs)
  elements.outputNodesList.innerHTML = "";
  
  CAREER_DATA.jobs.forEach(job => {
    const matched = state.activeMatches.find(m => m.jobId === job.id);
    const isMatched = !!matched;
    
    const node = document.createElement("div");
    node.id = `node-job-${job.id}`;
    node.className = `flowchart-node ${isMatched ? "active" : ""}`;
    
    let icon = "fas fa-briefcase";
    if (job.id === "robotics_designer") icon = "fas fa-compass-drafting";
    else if (job.id === "ui_ux_designer") icon = "fas fa-pen-nib";
    else if (job.id === "gen_ai_engineer") icon = "fas fa-wand-magic-sparkles";
    else if (job.id === "ai_architect") icon = "fas fa-brain-circuit";
    else if (job.id === "ml_engineer") icon = "fas fa-microchip";
    else if (job.id === "data_scientist") icon = "fas fa-chart-line";
    
    node.innerHTML = `
      <div class="node-indicator"></div>
      <i class="${icon}"></i>
      <span>${job.name}</span>
    `;
    
    node.addEventListener("mouseenter", () => displayNodeDetails("job", job, matched));
    elements.outputNodesList.appendChild(node);
  });
}

function drawFlowchartConnections() {
  const svg = elements.flowchartSvg;
  const container = elements.flowchartContainer;
  svg.innerHTML = ""; // reset paths
  
  const containerRect = container.getBoundingClientRect();

  const prep = document.getElementById("node-preprocessor");
  const rec = document.getElementById("node-recommender");
  const mkt = document.getElementById("node-market-data");
  
  if (!prep || !rec || !mkt) return;
  
  const prepRect = prep.getBoundingClientRect();
  const recRect = rec.getBoundingClientRect();
  const mktRect = mkt.getBoundingClientRect();

  const prepLeft = { x: prepRect.left - containerRect.left, y: prepRect.top + prepRect.height/2 - containerRect.top };
  const prepRight = { x: prepRect.right - containerRect.left, y: prepRect.top + prepRect.height/2 - containerRect.top };
  const recLeft = { x: recRect.left - containerRect.left, y: recRect.top + recRect.height/2 - containerRect.top };
  const recRight = { x: recRect.right - containerRect.left, y: recRect.top + recRect.height/2 - containerRect.top };
  const mktLeft = { x: mktRect.left - containerRect.left, y: mktRect.top + mktRect.height/2 - containerRect.top };
  const mktRight = { x: mktRect.right - containerRect.left, y: mktRect.top + mktRect.height/2 - containerRect.top };

  const isEngineActive = state.selectedSkills.size > 0;

  // 1. Draw curves: Left Skills -> Preprocessor
  CAREER_DATA.skills.forEach(skill => {
    const node = document.getElementById(`node-skill-${skill.id}`);
    if (!node) return;
    
    const rect = node.getBoundingClientRect();
    const start = {
      x: rect.right - containerRect.left,
      y: rect.top + rect.height/2 - containerRect.top
    };
    
    const isActive = state.selectedSkills.has(skill.id);
    drawCurve(svg, start, prepLeft, isActive);
  });

  // 2. Draw center links
  drawCurve(svg, prepRight, recLeft, isEngineActive);
  drawCurve(svg, recRight, mktLeft, isEngineActive);

  // 3. Draw curves: Market DB -> Output Careers
  CAREER_DATA.jobs.forEach(job => {
    const node = document.getElementById(`node-job-${job.id}`);
    if (!node) return;
    
    const rect = node.getBoundingClientRect();
    const end = {
      x: rect.left - containerRect.left,
      y: rect.top + rect.height/2 - containerRect.top
    };
    
    const matched = state.activeMatches.find(m => m.jobId === job.id);
    drawCurve(svg, mktRight, end, !!matched);
  });
}

function drawCurve(svg, p1, p2, isActive) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const offset = Math.abs(p2.x - p1.x) * 0.45;
  const cp1x = p1.x + offset;
  const cp1y = p1.y;
  const cp2x = p2.x - offset;
  const cp2y = p2.y;
  
  const d = `M ${p1.x} ${p1.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  path.setAttribute("d", d);
  path.setAttribute("class", `flowchart-path ${isActive ? "active" : ""}`);
  
  svg.appendChild(path);
}

function displayNodeDetails(type, data, matchData = null) {
  const board = elements.nodeInfoBoard;
  const content = elements.boardContent;
  const placeholder = board.querySelector(".board-placeholder");
  
  placeholder.style.display = "none";
  content.style.display = "block";

  if (type === "skill") {
    elements.boardTitle.innerText = `Skill: ${data.name}`;
    elements.boardBadge.innerText = data.category;
    elements.boardBadge.style.background = "var(--accent-glow)";
    elements.boardBadge.style.color = "var(--accent)";
    
    const relevantJobs = CAREER_DATA.jobs.filter(j => j.requiredSkills.includes(data.id)).map(j => j.name);
    elements.boardDesc.innerText = `Primary capability utilized in matching parameters for: ${relevantJobs.join(", ") || "custom positions"}.`;
    
    elements.boardDetailsGrid.innerHTML = `
      <div>Active Profile: <strong>${state.selectedSkills.has(data.id) ? "Yes" : "No"}</strong></div>
      <div>Category Type: <strong>${data.category}</strong></div>
    `;
  } else {
    elements.boardTitle.innerText = `Matched Role: ${data.name}`;
    
    if (matchData) {
      elements.boardBadge.innerText = `Match Quotient: ${matchData.score}%`;
      elements.boardBadge.style.background = "var(--success-glow)";
      elements.boardBadge.style.color = "var(--success)";
      elements.boardDesc.innerText = data.description;
    } else {
      elements.boardBadge.innerText = "Requirements Not Met";
      elements.boardBadge.style.background = "var(--border)";
      elements.boardBadge.style.color = "var(--text3)";
      
      const missing = data.requiredSkills.filter(sk => !state.selectedSkills.has(sk)).map(skId => {
        const skObj = CAREER_DATA.skills.find(s => s.id === skId);
        return skObj ? skObj.name : skId;
      });
      elements.boardDesc.innerText = `${data.description} (Missing: ${missing.join(", ")})`;
    }
    
    elements.boardDetailsGrid.innerHTML = `
      <div>Average Salary: <strong>${data.averageSalary}</strong></div>
      <div>Required Skills: <strong>${data.requiredSkills.length} total</strong></div>
    `;
  }
}

/* ==========================================================================
   Step 7: Match Results Calculations & Local LPA Salaries
   ========================================================================== */
function computeMatchesResults() {
  const matches = [];
  const allCareers = [];
  const selected = Array.from(state.selectedSkills);
  
  CAREER_DATA.jobs.forEach(job => {
    const required = job.requiredSkills;
    const intersection = required.filter(skId => selected.includes(skId));
    
    // Core match percentage formula: (matched required skills / total required skills) * 100
    let matchScore = 0;
    if (required.length > 0) {
      matchScore = Math.round((intersection.length / required.length) * 100);
    }
    
    // Interest alignment bonus (adds up to 10% bonus if user's interest tags map with job domain keywords)
    const matchesDomain = state.selectedInterests.some(intId => {
      const intObj = CAREER_DATA.interests.find(i => i.id === intId);
      if (!intObj) return false;
      return job.domain.toLowerCase().includes(intObj.name.toLowerCase().split(" ")[0]);
    });
    
    if (matchesDomain && matchScore > 0 && matchScore < 100) {
      matchScore = Math.min(matchScore + 10, 98);
    }
    
    // Quiz score validation bonus (adds up to 5% bonus if user got above 80% accuracy in assessments)
    if (state.quizScore && state.quizScore >= 80 && matchScore > 0 && matchScore < 100) {
      matchScore = Math.min(matchScore + 5, 100);
    }

    // Nice skills bonus: add 5% for each matched nice/extra skill
    if (job.niceSkills && job.niceSkills.length > 0) {
      const niceIntersection = job.niceSkills.filter(skId => selected.includes(skId));
      matchScore = Math.min(matchScore + (niceIntersection.length * 5), 100);
    }

    const computedLpaRange = scaleSalaryToIndianMarket(job, state.profile);
    const item = {
      jobId: job.id,
      score: matchScore,
      salary: computedLpaRange,
      details: job
    };

    allCareers.push(item);
    
    // Include in matched list if user has at least 1 matching skill or domain interest alignment
    if (matchScore > 0 || matchesDomain) {
      matches.push(item);
    }
  });

  state.allCareersResults = allCareers.sort((a, b) => b.score - a.score);
  state.activeMatches = matches.sort((a, b) => b.score - a.score);
}

function scaleSalaryToIndianMarket(job, profile) {
  // Parse base average salary e.g. "₹12.0 LPA" -> float 12.0
  const baseAvgVal = parseFloat(job.averageSalary.replace(/[^\d.]/g, '')) || 10.0;
  
  // Experience tiers factors
  let expFactor = 0.6; // Fresher default
  if (profile.experience.includes("Junior")) expFactor = 1.1;
  else if (profile.experience.includes("Mid-level")) expFactor = 1.8;
  else if (profile.experience.includes("Senior")) expFactor = 2.8;

  // City hub metrics factors in India
  let cityFactor = 1.0;
  const locLower = profile.location.toLowerCase();
  if (locLower.includes("bengaluru") || locLower.includes("bangalore")) cityFactor = 1.25;
  else if (locLower.includes("mumbai") || locLower.includes("delhi") || locLower.includes("noida") || locLower.includes("gurugram")) cityFactor = 1.15;
  else if (locLower.includes("pune") || locLower.includes("hyderabad")) cityFactor = 1.1;
  else if (locLower.includes("chennai")) cityFactor = 1.05;

  // Self-assessed proficiency multipliers
  let profBonus = 0.0;
  if (profile.proficiency === "Intermediate") profBonus = 0.1;
  else if (profile.proficiency === "Advanced") profBonus = 0.25;
  else if (profile.proficiency === "Expert") profBonus = 0.4;

  const lowBound = Math.round(baseAvgVal * expFactor * cityFactor * (1.0 + profBonus) * 0.85);
  const highBound = Math.round(baseAvgVal * expFactor * cityFactor * (1.0 + profBonus) * 1.3);

  return {
    low: lowBound,
    high: highBound,
    text: `₹${lowBound}.0 – ${highBound}.0 LPA`
  };
}

function switchResultsTab(tab) {
  state.activeResultsTab = tab;
  renderResultsDashboard();
}

function renderResultsDashboard() {
  const p = state.profile;
  elements.resultGreeting.innerText = `Hi ${p.name.split(' ')[0]} — Your Indian Career Matches`;

  // Resume file parser banner display
  if (state.method === 'resume' && state.resumeFile) {
    elements.resumeBanner.style.display = "flex";
    elements.resumeBannerText.innerText = `Auto-parsed skills from your resume file: ${state.resumeFile.name}. Verified in matching models.`;
  } else {
    elements.resumeBanner.style.display = "none";
  }

  // Update tab counts
  document.getElementById("matches-tab-count").innerText = state.activeMatches.length;
  document.getElementById("all-careers-tab-count").innerText = state.allCareersResults.length;

  // Update active class on tab buttons
  const tabMatchesBtn = document.getElementById("tab-matches");
  const tabAllBtn = document.getElementById("tab-all-careers");
  if (tabMatchesBtn && tabAllBtn) {
    if (state.activeResultsTab === 'matches') {
      tabMatchesBtn.classList.add("active");
      tabMatchesBtn.classList.remove("btn-ghost");
      tabAllBtn.classList.remove("active");
      tabAllBtn.classList.add("btn-ghost");
    } else {
      tabMatchesBtn.classList.remove("active");
      tabMatchesBtn.classList.add("btn-ghost");
      tabAllBtn.classList.add("active");
      tabAllBtn.classList.remove("btn-ghost");
    }
  }

  const visibleList = state.activeResultsTab === 'matches' ? state.activeMatches : state.allCareersResults;
  const matchesCount = visibleList.length;
  const topMatch = visibleList[0];

  // Render Stats Grid
  elements.summaryGrid.innerHTML = `
    <div class="summary-stat">
      <div class="val">${state.activeMatches.length}</div>
      <div class="lbl">Matches Unlocked</div>
    </div>
    <div class="summary-stat">
      <div class="val">${state.selectedSkills.size}</div>
      <div class="lbl">Skills Parsed</div>
    </div>
    <div class="summary-stat">
      <div class="val">${topMatch ? topMatch.score + "%" : "-"}</div>
      <div class="lbl">Top Match Score</div>
    </div>
    <div class="summary-stat">
      <div class="val">${topMatch ? topMatch.salary.text : "-"}</div>
      <div class="lbl">Top Predicted Salary</div>
    </div>
  `;

  // AI Market Insight
  if (topMatch) {
    elements.aiInsightText.innerHTML = `
      Supervised analysis based on Indian recruitment logs: professionals matching <strong>${topMatch.details.name}</strong> 
      qualifications inside <strong>${p.location}</strong> are witnessing high demand. Your predicted range of 
      <strong>${topMatch.salary.text}</strong> aligns with your <strong>${p.experience}</strong> experience tier, 
      ${p.degree} qualification, and <strong>${p.proficiency}</strong> self-assessed competency level.
    `;
  } else {
    elements.aiInsightText.innerText = "Configure skills or select presets to view customized Indian market intelligence forecasts.";
  }

  // Render Job Recommendations Cards list
  const container = elements.careerResults;
  container.innerHTML = "";
  
  if (matchesCount === 0) {
    container.innerHTML = `
      <div class="recs-empty-block glass">
        <i class="fas fa-triangle-exclamation recs-large-icon"></i>
        <h2>No Career Matches Found</h2>
        <p>No career roles matched your current skill configurations. Click the tab above to explore the entire India Career Directory anyway!</p>
        <button class="btn btn-primary" onclick="switchResultsTab('all')">Explore All Careers</button>
      </div>
    `;
    elements.learningSection.style.display = "none";
    return;
  }

  elements.learningSection.style.display = "block";

  visibleList.forEach((match, idx) => {
    const job = match.details;
    const card = document.createElement("div");
    card.id = `rc_${idx}`;
    card.className = "result-card glass";
    
    // Check which feedback state
    const isLoggedFeedback = state.feedbacks[idx];
    const isGood = isLoggedFeedback === 'good';
    const isBad = isLoggedFeedback === 'bad';

    const requiredBadgesHtml = job.requiredSkills.map(skId => {
      const skObj = CAREER_DATA.skills.find(s => s.id === skId);
      const isSelected = state.selectedSkills.has(skId);
      return `<span class="result-skill ${isSelected ? "" : "missing"}">${isSelected ? "" : "+ "}${skObj ? skObj.name : skId}</span>`;
    }).join("");

    const niceBadgesHtml = (job.niceSkills || []).map(skId => {
      const skObj = CAREER_DATA.skills.find(s => s.id === skId);
      const isSelected = state.selectedSkills.has(skId);
      return `<span class="result-skill nice-skill ${isSelected ? "matched-nice" : "missing-nice"}">${isSelected ? "✓ " : "+ "}${skObj ? skObj.name : skId}</span>`;
    }).join("");

    const skillBadgesHtml = requiredBadgesHtml + niceBadgesHtml;

    const missingSkillsList = job.requiredSkills.filter(sk => !state.selectedSkills.has(sk));
    const missingNiceSkills = (job.niceSkills || []).filter(sk => !state.selectedSkills.has(sk));

    let adviceHtml = "";
    if (missingSkillsList.length > 0) {
      adviceHtml += `Missing core skills: <strong>${missingSkillsList.map(sId => {
        const sObj = CAREER_DATA.skills.find(sk => sk.id === sId);
        return sObj ? sObj.name : sId;
      }).join(', ')}</strong>. `;
    }
    if (missingNiceSkills.length > 0) {
      adviceHtml += `Add extra skills for match boost: <strong>${missingNiceSkills.map(sId => {
        const sObj = CAREER_DATA.skills.find(sk => sk.id === sId);
        return sObj ? sObj.name : sId;
      }).join(', ')}</strong>.`;
    }

    // Generate company tags for quick preview on the card
    let companiesSectionHtml = "";
    if (job.companies && job.companies.length > 0) {
      const companiesHtml = job.companies.map(c => `
        <span class="card-company-tag" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(0, 0, 0, 0.15); border: 1px solid var(--border); border-radius: 6px; font-size: 0.78rem;">
          <i class="fas fa-building" style="color: var(--text3); font-size: 0.7rem;"></i>
          <span style="font-weight: 600; color: var(--text);">${c.name}</span>
          <span style="color: var(--success); font-weight: 700; margin-left: 4px;">(${c.salary})</span>
        </span>
      `).join("");
      
      companiesSectionHtml = `
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--text3); text-transform: uppercase; margin-top: 12px; margin-bottom: 8px;">
          Top Hiring Companies & Packages:
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          ${companiesHtml}
        </div>
      `;
    }

    card.innerHTML = `
      <div class="result-header">
        <div>
          <div class="result-title">${job.name}</div>
          <div class="result-domain"><i class="fas fa-tag"></i> ${job.domain}</div>
        </div>
        <div class="match-badge">${match.score}% Match</div>
      </div>

      <div class="match-bar">
        <div class="match-fill" style="width: ${match.score}%;"></div>
      </div>

      <p>${job.description}</p>

      <div class="salary-row">
        <i class="fas fa-indian-rupee-sign"></i> Predicted Salary: <span class="salary-val">${match.salary.text}</span>
        <span class="text-muted">· ${p.location.split(',')[0]} R&D center</span>
      </div>

      <div style="font-size: 0.75rem; font-weight: 600; color: var(--text3); text-transform: uppercase; margin-bottom: 8px;">
        Skills Mapping Analytics (Core & Extra):
      </div>
      <div class="result-skills">
        ${skillBadgesHtml}
      </div>

      ${companiesSectionHtml}

      ${adviceHtml.length > 0 ? `
        <div class="insight-box" style="margin-top: 12px; margin-bottom: 0;">
          <div class="ai-chip"><i class="fas fa-bolt"></i> Skill Gap recommendations</div>
          <p style="margin: 6px 0 0; font-size: 0.8rem; line-height: 1.4;">
            ${adviceHtml}
          </p>
        </div>
      ` : ''}

      <div class="feedback-row">
        <span style="font-size: 0.75rem; color: var(--text3);">Assess this recommendation:</span>
        
        <button class="feedback-btn ${isGood ? "accepted" : ""}" onclick="logFeedback(${idx}, 'good')" ${isLoggedFeedback ? "style='display:none;'" : ""}>
          <i class="fas fa-thumbs-up"></i> Relevant
        </button>
        <button class="feedback-btn reject ${isBad ? "rejected" : ""}" onclick="logFeedback(${idx}, 'bad')" ${isLoggedFeedback ? "style='display:none;'" : ""}>
          <i class="fas fa-thumbs-down"></i> Not Relevant
        </button>
        
        <span class="feedback-btn ${isGood ? "accepted" : "rejected"}" id="fb_${idx}" style="display: ${isLoggedFeedback ? "inline-flex" : "none"}; pointer-events: none;">
          ${isGood ? "✓ Marked Relevant" : "✗ Marked Irrelevant"}
        </span>

        <button class="btn btn-ghost btn-sm" onclick="openJobDetailsModal('${job.id}', ${match.score})" style="margin-left: auto;">
          <span>Explore Companies & Roadmap</span>
          <i class="fas fa-circle-arrow-right"></i>
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Render Smart Improvement plan based on the #1 matched job
  renderSmartImprovementPlan(topMatch.details);
}

function renderSmartImprovementPlan(job) {
  const pathContainer = elements.learningPath;
  pathContainer.innerHTML = "";

  // Pre-compiled roadmap phases mapped to job
  const defaultRoadmap = [
    { n: 1, title: `Foundations of ${job.domain}`, type: "course", source: "Coursera / NPTEL India", duration: "4 weeks" },
    { n: 2, title: `Learn key libraries: ${job.requiredSkills.slice(0, 2).map(s => {
      const sk = CAREER_DATA.skills.find(sk => sk.id === s);
      return sk ? sk.name : s;
    }).join(' and ')}`, type: "course", source: "Kaggle Learn / Documentation", duration: "2 weeks" },
    { n: 3, title: `Build an open-source portfolio project`, type: "project", source: "GitHub portfolio development", duration: "3 weeks" },
    { n: 4, title: `Complete certification testing`, type: "cert", source: "Industry Standards Organization", duration: "Professional standard" }
  ];

  defaultRoadmap.forEach(step => {
    const item = document.createElement("div");
    item.className = "path-item";
    item.innerHTML = `
      <div class="path-num"></div>
      <div class="path-info">
        <h5>
          <span>${step.title}</span>
          <span class="path-type type-${step.type}">${step.type.charAt(0).toUpperCase() + step.type.slice(1)}</span>
        </h5>
        <p>${step.source} · ${step.duration}</p>
      </div>
    `;
    pathContainer.appendChild(item);
  });
}

function logFeedback(index, type) {
  state.feedbacks[index] = type;
  
  const card = document.getElementById(`rc_${index}`);
  const fbLabel = document.getElementById(`fb_${index}`);
  
  if (type === 'bad') {
    showToast("Feedback submitted. Model weights updated.");
    logConsole(`[REBALANCE] Match index ${index} marked irrelevant. Decreasing neural bias weights for this match route.`, "warn");
    setTimeout(() => {
      card.style.opacity = "0.45";
      card.style.transition = "opacity 0.4s ease";
    }, 250);
  } else {
    showToast("Feedback submitted. System metrics validated.");
    logConsole(`[REBALANCE] Match index ${index} marked relevant. Validating weights values parameters.`, "train");
  }

  // Toggle button visibilities
  fbLabel.style.display = "inline-flex";
  fbLabel.className = `feedback-btn ${type === 'good' ? 'accepted' : 'rejected'}`;
  fbLabel.innerText = type === 'good' ? "✓ Marked Relevant" : "✗ Marked Irrelevant";

  card.querySelectorAll(".feedback-row button").forEach(b => {
    if (!b.innerText.includes("Explore")) {
      b.style.display = "none";
    }
  });
}

/* ==========================================================================
   Modals popup window functions
   ========================================================================== */
function openJobDetailsModal(jobId, matchScore) {
  const job = CAREER_DATA.jobs.find(j => j.id === jobId);
  if (!job) return;

  // Localize custom salary predictions
  const localSalary = scaleSalaryToIndianMarket(job, state.profile);

  elements.modalJobName.innerText = job.name;
  elements.modalJobSalary.innerHTML = `<i class="fas fa-indian-rupee-sign"></i> Predicted Salary: ${localSalary.text}`;
  elements.modalJobMatch.innerHTML = `<i class="fas fa-award"></i> Match Score: ${matchScore}%`;
  elements.modalJobDesc.innerText = job.description;

  // Render Core & Extra Skills inside modal
  const modalSkills = document.getElementById("modal-job-skills");
  if (modalSkills) {
    const requiredBadges = job.requiredSkills.map(skId => {
      const skObj = CAREER_DATA.skills.find(s => s.id === skId);
      const isSelected = state.selectedSkills.has(skId);
      return `<span class="result-skill ${isSelected ? "" : "missing"}">${isSelected ? "✓ " : ""}${skObj ? skObj.name : skId} (Core)</span>`;
    }).join("");
    
    const niceBadges = (job.niceSkills || []).map(skId => {
      const skObj = CAREER_DATA.skills.find(s => s.id === skId);
      const isSelected = state.selectedSkills.has(skId);
      return `<span class="result-skill nice-skill ${isSelected ? "matched-nice" : "missing-nice"}">${isSelected ? "✓ " : "+ "}${skObj ? skObj.name : skId} (Extra)</span>`;
    }).join("");
    
    modalSkills.innerHTML = requiredBadges + niceBadges;
  }

  // Render hiring companies in India
  const compList = elements.modalCompaniesList;
  compList.innerHTML = "";
  
  job.companies.forEach(company => {
    const card = document.createElement("div");
    card.className = "company-item-card";
    card.innerHTML = `
      <div class="company-header-line">
        <span class="company-name">${company.name}</span>
        <span class="company-salary">${company.salary}</span>
      </div>
      <span class="company-role-title">${company.role}</span>
      <p class="company-details-text">${company.details}</p>
    `;
    compList.appendChild(card);
  });

  // Render timeline roadmap
  const roadmapTimeline = elements.modalRoadmap;
  roadmapTimeline.innerHTML = "";
  
  job.roadmap.forEach(step => {
    const node = document.createElement("div");
    node.className = "roadmap-node animate-pulse";
    node.innerHTML = `
      <h4>${step.phase}</h4>
      <p>${step.description}</p>
    `;
    roadmapTimeline.appendChild(node);
  });

  // Render course resource links
  const resourceList = elements.modalResources;
  resourceList.innerHTML = "";
  
  job.resources.forEach(res => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${res.link}" target="_blank" rel="noopener noreferrer">
        <span>${res.name}</span>
        <i class="fas fa-up-right-from-square"></i>
      </a>
    `;
    resourceList.appendChild(li);
  });

  elements.jobModal.style.display = "flex";
}

function closeJobModal() {
  elements.jobModal.style.display = "none";
}

/* ==========================================================================
   Model weights retraining terminal logger
   ========================================================================== */
function logConsole(message, type = "system") {
  const consoleBox = elements.consoleBox;
  if (!consoleBox) return;

  const line = document.createElement("div");
  line.className = `console-line ${type}-line`;
  
  const timestamp = new Date().toLocaleTimeString();
  line.innerText = `[${timestamp}] ${message}`;
  
  consoleBox.appendChild(line);
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

function handleFeedbackSubmit(event) {
  event.preventDefault();

  const relevance = document.getElementById("fb-relevance-slider").value;
  const utility = document.getElementById("fb-utility-slider").value;
  const comments = document.getElementById("fb-comments").value;

  logConsole(`[FEEDBACK] Logged validation metrics: Relevance=${relevance}/10, Utility=${utility}/10`, "warn");
  if (comments) {
    logConsole(`[FEEDBACK] Audit text comment: "${comments}"`, "warn");
  }

  // Trigger retraining progress animation
  const trainBox = document.getElementById("training-progress-box");
  const trainBar = document.getElementById("train-bar");
  const trainPct = document.getElementById("train-pct");

  trainBox.style.display = "block";
  trainBar.style.width = "0%";
  trainPct.innerText = "0%";

  let percentage = 0;
  logConsole("[TRAIN] Initializing backpropagation training loop...", "train");
  logConsole("[TRAIN] Adjusting nodes weights for active profile mappings...", "train");

  const interval = setInterval(() => {
    percentage += 10;
    trainBar.style.width = `${percentage}%`;
    trainPct.innerText = `${percentage}%`;

    if (percentage === 30) {
      logConsole("[TRAIN] Computing error deviations across hidden layers...", "train");
    } else if (percentage === 60) {
      logConsole("[TRAIN] Applying gradient descent optimizations...", "train");
    } else if (percentage === 80) {
      logConsole("[TRAIN] Aligning node activation thresholds...", "train");
    } else if (percentage === 100) {
      clearInterval(interval);
      logConsole("[SYSTEM] Retraining phase succeeded. Indian Market weights calibrated.", "system");
      document.getElementById("fb-comments").value = "";
      showToast("Model retraining completed successfully!");
    }
  }, 250);
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

/* ==========================================================================
   Presets loader for testing (landing page integrations)
   ========================================================================== */
function demoPreset(presetType) {
  state.quizScore = null;
  state.feedbacks = {};
  state.selectedSkills.clear();

  if (presetType === 'python-css-designing') {
    state.selectedSkills.add("python");
    state.selectedSkills.add("css");
    state.selectedSkills.add("designing");
    
    state.selectedInterests = ["ai_ml", "robotics", "vision"];
    logConsole("[SYSTEM] Demo Preset loaded: Python + CSS + Designing. Matching active for UI/UX & Robotics Designer.");
  } else if (presetType === 'ai-data') {
    state.selectedSkills.add("python");
    state.selectedSkills.add("sql");
    state.selectedSkills.add("pandas");
    state.selectedSkills.add("stats");
    
    state.selectedInterests = ["ai_ml", "data_sci"];
    logConsole("[SYSTEM] Demo Preset loaded: Data Science profile. Matches enabled for Data Scientist.");
  } else if (presetType === 'automation') {
    state.selectedSkills.add("plc");
    state.selectedSkills.add("scada");
    state.selectedSkills.add("sensors");
    state.selectedSkills.add("python");
    
    state.selectedInterests = ["automation", "robotics"];
    logConsole("[SYSTEM] Demo Preset loaded: Industrial Automation. Matches enabled for Automation Engineer.");
  }

  initInterestsSelector();
  initSkillsSelector();
  computeMatchesResults();
  
  // Navigate directly to the SVG flowchart page to inspect pathways
  goTo(6);
}

// Attach preset trigger hooks to window
window.demoPreset = demoPreset;
window.switchMethod = selectMethod;
window.goTo = goTo;
window.nextFromMethod = nextFromMethod;
window.nextFromInterests = nextFromInterests;
window.nextFromSkills = nextFromSkills;
window.nextFromProfile = nextFromProfile;
window.startQuiz = startQuiz;
window.skipQuiz = skipQuiz;
window.submitAnswer = submitAnswer;
window.closeJobModal = closeJobModal;
window.openJobDetailsModal = openJobDetailsModal;
window.handleFeedbackSubmit = handleFeedbackSubmit;
window.logFeedback = logFeedback;
