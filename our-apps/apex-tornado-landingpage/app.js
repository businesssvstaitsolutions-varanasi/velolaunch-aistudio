/**
 * Apex Tornado Landing Page Script
 * Interactivity: Theme toggle, mobile drawer, showcase tabs, memory simulator, FAQ
 * Produced by Velo Launch & Smart Vista IT Solutions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle System
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('apex_landing_theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('apex_landing_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.innerHTML = theme === 'dark'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // 2. Sticky Navbar Glass Effect
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  mobileToggle?.addEventListener('click', () => {
    mobileDrawer?.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.remove('open');
    });
  });

  // 4. Interactive Product Showcase Tabs
  const showcaseTabs = document.querySelectorAll('.showcase-tab-btn');
  const showcaseImages = document.querySelectorAll('.showcase-image');

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      showcaseTabs.forEach(t => t.classList.remove('active'));
      showcaseImages.forEach(img => img.classList.remove('active'));

      tab.classList.add('active');
      const targetImg = document.getElementById(targetId);
      if (targetImg) {
        targetImg.classList.add('active');
      }
    });
  });

  // 5. Interactive Memory Cleanup Simulator
  const simBtn = document.getElementById('simBoostBtn');
  const simVal = document.getElementById('simGaugeVal');
  const simStatus = document.getElementById('simGaugeStatus');
  const simFill = document.getElementById('simProgressFill');
  const simToast = document.getElementById('simResultToast');

  let isSimulating = false;

  simBtn?.addEventListener('click', () => {
    if (isSimulating) return;
    isSimulating = true;
    simBtn.disabled = true;
    simBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Purging Buffers & Cache...
    `;

    // Step 1: Progress drop animation
    let currentMem = 1480;
    let targetMem = 460;
    let step = (currentMem - targetMem) / 25;

    const interval = setInterval(() => {
      currentMem = Math.max(targetMem, Math.round(currentMem - step));
      if (simVal) simVal.textContent = `${currentMem} MB`;

      const pct = Math.round((currentMem / 1900) * 100);
      if (simFill) {
        simFill.style.width = `${pct}%`;
        if (pct < 35) {
          simFill.style.background = 'linear-gradient(90deg, #10B981, #22C55E)';
          if (simVal) simVal.style.color = 'var(--success)';
        }
      }

      if (currentMem <= targetMem) {
        clearInterval(interval);
        if (simStatus) {
          simStatus.textContent = 'Optimal Condition • 1,020 MB Recovered';
          simStatus.style.color = 'var(--success)';
        }
        if (simToast) {
          simToast.textContent = '✓ Simulated Cleanup Complete: 1,020 MB Freed in 0.4s';
          simToast.style.display = 'block';
        }

        simBtn.disabled = false;
        simBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Boost Again
        `;
        isSimulating = false;
      }
    }, 30);
  });

  // 6. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    questionBtn?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Smooth Anchor Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
