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
    // Measure safe-area insets via sentinel elements so particles fill the
    // status-bar zone (top) and home-indicator zone (bottom) on iOS Safari.
    function getSafeInsets() {
      const t = document.createElement('div');
      const b = document.createElement('div');
      t.style.cssText = 'position:fixed;top:0;height:env(safe-area-inset-top,0px);left:0;right:0;pointer-events:none;visibility:hidden;';
      b.style.cssText = 'position:fixed;bottom:0;height:env(safe-area-inset-bottom,0px);left:0;right:0;pointer-events:none;visibility:hidden;';
      document.documentElement.appendChild(t);
      document.documentElement.appendChild(b);
      const insets = { top: t.getBoundingClientRect().height || 0, bottom: b.getBoundingClientRect().height || 0 };
      t.remove(); b.remove();
      return insets;
    }

    let W = innerWidth;
    const _i = getSafeInsets();
    let H = innerHeight + _i.top + _i.bottom;
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
      const _ri = getSafeInsets();
      W = pCanvas.width  = innerWidth;
      H = pCanvas.height = innerHeight + _ri.top + _ri.bottom;
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
     6. HERO TYPEWRITER
  ──────────────────────────────────── */
  (function () {
    var h1       = document.querySelector('.hero h1');
    var subtitle = document.querySelector('.hero-subtitle');
    var cta      = document.querySelector('.hero .btn-cta');

    if (!h1 || !subtitle || !cta) return;

    // Hide subtitle and CTA immediately — no flash
    subtitle.style.opacity      = '0';
    cta.style.opacity           = '0';
    cta.style.pointerEvents     = 'none';

    var originalHTML = h1.innerHTML;

    // Build a flat token array from the h1 HTML tree
    var tokens = [];
    var tmp = document.createElement('div');
    tmp.innerHTML = originalHTML;

    function walkNode(node, ctx) {
      if (node.nodeType === 3) {
        for (var i = 0; i < node.textContent.length; i++) {
          tokens.push({ type: 'char', char: node.textContent[i], ctx: ctx });
        }
      } else if (node.nodeType === 1) {
        var tag = node.tagName.toLowerCase();
        if (tag === 'br') {
          tokens.push({ type: 'br' });
        } else {
          for (var j = 0; j < node.childNodes.length; j++) {
            walkNode(node.childNodes[j], tag);
          }
        }
      }
    }
    for (var i = 0; i < tmp.childNodes.length; i++) walkNode(tmp.childNodes[i], null);

    var charCount = tokens.filter(function (t) { return t.type === 'char'; }).length;
    var baseInterval = 1900 / charCount; // ~1.9 s total
    var pos = 0;

    function nextInterval() {
      // ±25% random variation for a natural, fluid feel
      return baseInterval * (0.75 + Math.random() * 0.5);
    }

    function buildHTML(upTo) {
      var html = '';
      var openTag = null;
      for (var i = 0; i < upTo; i++) {
        var tok = tokens[i];
        if (tok.type === 'br') {
          if (openTag) { html += '</' + openTag + '>'; openTag = null; }
          html += '<br>';
        } else {
          if (tok.ctx !== openTag) {
            if (openTag) html += '</' + openTag + '>';
            if (tok.ctx) html += '<' + tok.ctx + '>';
            openTag = tok.ctx;
          }
          html += tok.char;
        }
      }
      if (openTag) html += '</' + openTag + '>';
      return html;
    }

    function tick() {
      pos++;
      h1.innerHTML = buildHTML(pos) + '<span class="tw-cursor"></span>';

      if (pos < tokens.length) {
        setTimeout(tick, nextInterval());
      } else {
        // h1 done — restore HTML, then type subtitle
        setTimeout(function () {
          h1.innerHTML = originalHTML;
          typeSubtitle();
        }, 150);
      }
    }

    function typeSubtitle() {
      var text     = subtitle.textContent;
      var subInterval = 700 / text.length; // ~0.7 s
      var subPos   = 0;
      subtitle.textContent = '';
      subtitle.style.opacity = '1';

      function subTick() {
        subPos++;
        subtitle.textContent = text.slice(0, subPos) + (subPos < text.length ? '' : '');
        if (subPos < text.length) {
          // Add blinking cursor while typing
          subtitle.innerHTML = text.slice(0, subPos) + '<span class="tw-cursor"></span>';
          setTimeout(subTick, subInterval);
        } else {
          subtitle.textContent = text;
          // CTA fades in slowly after subtitle finishes
          setTimeout(function () {
            cta.style.transition    = 'opacity 1.2s ease';
            cta.style.opacity       = '1';
            cta.style.pointerEvents = 'auto';
          }, 100);
        }
      }
      subTick();
    }

    // Make h1 visible (empty) before starting so gradient is ready
    h1.style.opacity = '1';
    h1.innerHTML = '';
    setTimeout(tick, 200);
  })();

  /* ────────────────────────────────────
     7. FEATURE CARDS — fade in on scroll
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
