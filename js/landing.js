/* ==========================================================================
   AuraCareer — Landing Page Interactions
   Navbar scroll effect, particle generator, smooth scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar scroll effect ---
  const nav = document.querySelector('.landing-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // --- Initialize Orb ---
  const orbContainer = document.getElementById('orb-mount');
  if (orbContainer && typeof createOrb === 'function') {
    createOrb(orbContainer, {
      hue: 0,
      hoverIntensity: 0.2,
      rotateOnHover: true,
      forceHoverState: false,
      backgroundColor: '#000000'
    });
  }

  // --- Generate floating particles ---
  const particleField = document.querySelector('.particle-field');
  if (particleField) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 14) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.width = (1 + Math.random() * 2.5) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = (0.15 + Math.random() * 0.35);

      // Randomize color between silver/white shades
      const colors = [
        'rgba(255, 255, 255, 0.3)',
        'rgba(192, 192, 192, 0.25)',
        'rgba(220, 220, 220, 0.2)',
        'rgba(255, 255, 255, 0.15)'
      ];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      particleField.appendChild(p);
    }
  }

  // --- Animate stats on scroll ---
  const statVals = document.querySelectorAll('.stat-val');
  if (statVals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statVals.forEach(el => observer.observe(el));
  }

  // --- Feature cards stagger entrance ---
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i * 0.1) + 's';
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      cardObserver.observe(card);
    });
  }
});

// Count-up animation for stat numbers
function animateCountUp(el) {
  const text = el.getAttribute('data-value') || el.textContent;
  const isPlus = text.includes('+');
  const numStr = text.replace(/[^0-9.]/g, '');
  const target = parseFloat(numStr);
  if (isNaN(target)) return;

  const duration = 1500;
  const startTime = performance.now();
  const isDecimal = numStr.includes('.');

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = target * eased;

    if (isDecimal) {
      el.textContent = current.toFixed(1) + (isPlus ? '+' : '');
    } else {
      el.textContent = Math.round(current) + (isPlus ? '+' : '');
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// Make feature cards visible (called by intersection observer)
document.addEventListener('DOMContentLoaded', () => {
  // Apply visible class style
  const style = document.createElement('style');
  style.textContent = `.feature-card.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
});
