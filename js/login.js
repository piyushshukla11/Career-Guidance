/* ==========================================================================
   AuraCareer — Login Page Logic
   Auth tab switching, form validation, localStorage session management
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
  loginForm.addEventListener('submit', (e) => {
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

    // Simulate login
    const submitBtn = loginForm.querySelector('.login-submit');
    submitBtn.classList.add('loading');

    setTimeout(() => {
      submitBtn.classList.remove('loading');

      // Check localStorage for existing user
      const storedUsers = JSON.parse(localStorage.getItem('auracareer_users') || '[]');
      const user = storedUsers.find(u => u.email === email);

      if (user && user.password === password) {
        // Successful login
        localStorage.setItem('auracareer_session', JSON.stringify({
          name: user.name,
          email: user.email,
          loggedIn: true,
          timestamp: Date.now()
        }));
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = 'app.html';
        }, 1000);
      } else if (user) {
        showToast('Incorrect password. Please try again.', 'error');
        showFieldError('login-password-field', 'Incorrect password');
      } else {
        // Auto-create account for demo purposes
        const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        storedUsers.push({ name, email, password });
        localStorage.setItem('auracareer_users', JSON.stringify(storedUsers));
        localStorage.setItem('auracareer_session', JSON.stringify({
          name,
          email,
          loggedIn: true,
          timestamp: Date.now()
        }));
        showToast('Account created & logged in! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = 'app.html';
        }, 1000);
      }
    }, 1200);
  });

  // --- Signup form submission ---
  signupForm.addEventListener('submit', (e) => {
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

    setTimeout(() => {
      submitBtn.classList.remove('loading');

      const storedUsers = JSON.parse(localStorage.getItem('auracareer_users') || '[]');
      const exists = storedUsers.find(u => u.email === email);

      if (exists) {
        showToast('An account with this email already exists. Please log in.', 'error');
        showFieldError('signup-email-field', 'Email already registered');
        return;
      }

      storedUsers.push({ name, email, password });
      localStorage.setItem('auracareer_users', JSON.stringify(storedUsers));
      localStorage.setItem('auracareer_session', JSON.stringify({
        name,
        email,
        loggedIn: true,
        timestamp: Date.now()
      }));

      showToast('Account created! Redirecting to AuraCareer...', 'success');
      setTimeout(() => {
        window.location.href = 'app.html';
      }, 1000);
    }, 1200);
  });

  // --- Social login (demo) ---
  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      const name = 'Google User';
      const email = 'user@gmail.com';
      localStorage.setItem('auracareer_session', JSON.stringify({
        name,
        email,
        loggedIn: true,
        timestamp: Date.now()
      }));
      showToast('Google sign-in successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'app.html';
      }, 1000);
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
