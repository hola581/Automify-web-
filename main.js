/* ─────────────────────────────────────────
   AUTOMIFY — Particles, Interactions & Scroll
───────────────────────────────────────── */
(function () {
  'use strict';

  /* ────────────────────────────────────
     1. PARTICLE CANVAS
  ──────────────────────────────────── */
  const pCanvas = document.getElementById('particles');
  const pCtx    = pCanvas ? pCanvas.getContext('2d') : null;

  if (pCtx) {
    let W = innerWidth;
    let H = innerHeight;
    pCanvas.width  = W;
    pCanvas.height = H;

    // Generate particles
    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.22 + 0.06,
      vx:   (Math.random() - 0.5) * 0.18,
      vy:   (Math.random() - 0.5) * 0.18,
      // Randomly tint blue or green
      color: Math.random() > 0.55 ? '4,155,211' : '57,255,142',
    }));

    function drawParticles() {
      pCtx.clearRect(0, 0, W, H);
      for (const p of particles) {
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        pCtx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -2) p.x = W + 2;
        else if (p.x > W + 2) p.x = -2;
        if (p.y < -2) p.y = H + 2;
        else if (p.y > H + 2) p.y = -2;
      }
      requestAnimationFrame(drawParticles);
    }

    drawParticles();

    window.addEventListener('resize', () => {
      W = pCanvas.width  = innerWidth;
      H = pCanvas.height = innerHeight;
    }, { passive: true });
  }

  /* ────────────────────────────────────
     2. PROGRESS BAR ANIMATION (on load)
  ──────────────────────────────────── */
  window.addEventListener('load', () => {
    const bar = document.querySelector('.stat-progress-bar');
    if (bar) {
      // Small delay so the card entrance animation finishes first
      setTimeout(() => bar.classList.add('animate'), 900);
    }
  });

  /* ────────────────────────────────────
     3. DROPDOWN — keyboard & click support
  ──────────────────────────────────── */
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach((dd) => {
    const btn  = dd.querySelector('.nav-link-btn');
    const menu = dd.querySelector('.dropdown-menu');
    if (!btn || !menu) return;

    // Toggle on click (for touch devices)
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        menu.style.opacity       = '1';
        menu.style.pointerEvents = 'auto';
        menu.style.transform     = 'translateX(-50%) translateY(0)';
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', closeAllDropdowns);

  function closeAllDropdowns() {
    dropdowns.forEach((dd) => {
      const btn  = dd.querySelector('.nav-link-btn');
      const menu = dd.querySelector('.dropdown-menu');
      if (btn)  btn.setAttribute('aria-expanded', 'false');
      if (menu) {
        menu.style.opacity       = '';
        menu.style.pointerEvents = '';
        menu.style.transform     = '';
      }
    });
  }

  /* ────────────────────────────────────
     4. NAVBAR — shrink on scroll
  ──────────────────────────────────── */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.09)';
    } else {
      navbar.style.boxShadow = '';
    }
  }, { passive: true });

  /* ────────────────────────────────────
     5. MOBILE NAV — Hamburger toggle
  ──────────────────────────────────── */
  const hamburgerBtn = document.getElementById('nav-hamburger');
  const mobileMenu   = document.getElementById('nav-mobile-menu');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any link is clicked
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ────────────────────────────────────
     6. FEATURE CARDS — fade in on scroll
  ──────────────────────────────────── */
  const featureCards = document.querySelectorAll('.feature-card');

  if ('IntersectionObserver' in window && featureCards.length) {
    // Initially hidden
    featureCards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.55s ${i * 0.12}s ease, transform 0.55s ${i * 0.12}s ease`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    featureCards.forEach((card) => io.observe(card));
  }

})();
