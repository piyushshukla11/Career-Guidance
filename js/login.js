/* ==========================================================================
   AuraCareer — Login Page Logic
   Auth tab switching, form validation, backend API authentication
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginHeaderTitle = document.getElementById('auth-title');
  const loginHeaderSub = document.getElementById('auth-subtitle');

  // --- Tab switching ---
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    loginHeaderTitle.textContent = 'Welcome Back';
    loginHeaderSub.textContent = 'Sign in to continue your career journey';
    clearErrors();
  });

  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.style.display = 'flex';
    loginForm.style.display = 'none';
    loginHeaderTitle.textContent = 'Create Account';
    loginHeaderSub.textContent = 'Start your AI-powered career discovery';
    clearErrors();
  });

  // --- Login form submission ---
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    let valid = true;

    if (!email || !isValidEmail(email)) {
      showFieldError('login-email-field', 'Please enter a valid email address');
      valid = false;
    }
    if (!password || password.length < 4) {
      showFieldError('login-password-field', 'Password must be at least 4 characters');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = loginForm.querySelector('.login-submit');
    submitBtn.classList.add('loading');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();
      submitBtn.classList.remove('loading');

      if (res.ok && data.success) {
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = 'app.html';
        }, 1000);
      } else {
        const errMsg = data.error || 'Login failed. Please try again.';
        showToast(errMsg, 'error');

        if (errMsg.toLowerCase().includes('password')) {
          showFieldError('login-password-field', errMsg);
        } else if (errMsg.toLowerCase().includes('email') || errMsg.toLowerCase().includes('account')) {
          showFieldError('login-email-field', errMsg);
        }
      }
    } catch (err) {
      submitBtn.classList.remove('loading');
      showToast('Network error. Is the server running?', 'error');
      console.error('[Login] Request failed:', err);
    }
  });

  // --- Signup form submission ---
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    let valid = true;

    if (!name || name.length < 2) {
      showFieldError('signup-name-field', 'Please enter your full name');
      valid = false;
    }
    if (!email || !isValidEmail(email)) {
      showFieldError('signup-email-field', 'Please enter a valid email address');
      valid = false;
    }
    if (!password || password.length < 6) {
      showFieldError('signup-password-field', 'Password must be at least 6 characters');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = signupForm.querySelector('.login-submit');
    submitBtn.classList.add('loading');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      const data = await res.json();
      submitBtn.classList.remove('loading');

      if (res.ok && data.success) {
        showToast('Account created! Redirecting to AuraCareer...', 'success');
        setTimeout(() => {
          window.location.href = 'app.html';
        }, 1000);
      } else {
        const errMsg = data.error || 'Signup failed. Please try again.';
        showToast(errMsg, 'error');

        if (errMsg.toLowerCase().includes('email') || errMsg.toLowerCase().includes('exists')) {
          showFieldError('signup-email-field', errMsg);
        }
      }
    } catch (err) {
      submitBtn.classList.remove('loading');
      showToast('Network error. Is the server running?', 'error');
      console.error('[Signup] Request failed:', err);
    }
  });

  // --- Social login (placeholder) ---
  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Google OAuth integration coming soon!', 'error');
    });
  }

  // --- Password visibility toggles ---
  document.querySelectorAll('.eye-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  });

  // --- Redirect if already logged in ---
  fetch('/api/auth/me', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        window.location.href = 'app.html';
      }
    })
    .catch(() => { /* Server might not be running, stay on login page */ });
});

// --- Utility functions ---
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.add('error');
    const errEl = field.querySelector('.field-error');
    if (errEl) errEl.textContent = message;
  }
}

function clearErrors() {
  document.querySelectorAll('.form-field.error').forEach(f => f.classList.remove('error'));
}

function showToast(message, type = 'success') {
  const existing = document.querySelector('.login-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `login-toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
