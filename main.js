/* ─────────────────────────────────────────
   AUTOMIFY — Particles, Interactions & Scroll
───────────────────────────────────────── */
(function () {
  'use strict';

  // Prevent browser from restoring scroll position on refresh
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ────────────────────────────────────
     1. PROGRESS BAR ANIMATION (on load)
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

    var timer = null; // active timeout — cancelled on language change

    function reset() {
      if (timer) { clearTimeout(timer); timer = null; }
      h1.style.opacity       = '0';
      subtitle.style.opacity = '0';
      cta.style.opacity      = '0';
      cta.style.transition   = 'none';
      cta.style.pointerEvents = 'none';
    }

    function buildTokens(html) {
      var tokens = [];
      var tmp = document.createElement('div');
      tmp.innerHTML = html;
      function walk(node, ctx) {
        if (node.nodeType === 3) {
          for (var i = 0; i < node.textContent.length; i++) {
            tokens.push({ type: 'char', char: node.textContent[i], ctx: ctx });
          }
        } else if (node.nodeType === 1) {
          var tag = node.tagName.toLowerCase();
          if (tag === 'br') {
            tokens.push({ type: 'br' });
          } else {
            for (var j = 0; j < node.childNodes.length; j++) walk(node.childNodes[j], tag);
          }
        }
      }
      for (var k = 0; k < tmp.childNodes.length; k++) walk(tmp.childNodes[k], null);
      return tokens;
    }

    function buildHTML(tokens, upTo) {
      var html = '', openTag = null;
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

    function runTypewriter() {
      reset();

      // Read current translated content from i18n-stored attribute or DOM
      var h1HTML      = h1.getAttribute('data-tw-original') || h1.innerHTML;
      var subtitleTxt = subtitle.getAttribute('data-tw-original') || subtitle.textContent;

      // Save originals for restore
      h1.setAttribute('data-tw-original', h1HTML);
      subtitle.setAttribute('data-tw-original', subtitleTxt);

      var tokens      = buildTokens(h1HTML);
      var charCount   = tokens.filter(function(t){ return t.type === 'char'; }).length;
      var interval    = 1500 / charCount;
      var pos         = 0;

      // Clear h1 and make visible (empty — no flash)
      h1.innerHTML    = '';
      h1.style.opacity = '1';

      function tick() {
        pos++;
        h1.innerHTML = buildHTML(tokens, pos) + '<span class="tw-cursor"></span>';
        if (pos < tokens.length) {
          timer = setTimeout(tick, interval);
        } else {
          timer = setTimeout(function () {
            h1.innerHTML = h1HTML;
            // On mobile, wait for plane + stat cards before showing subtitle & CTA
            var subtitleDelay = (window.innerWidth <= 600) ? 1200 : 0;
            timer = setTimeout(function () { typeSubtitle(subtitleTxt); }, subtitleDelay);
          }, 150);
        }
      }

      timer = setTimeout(tick, 150);
    }

    function typeSubtitle(text) {
      var subInterval = 700 / text.length;
      var subPos = 0;
      subtitle.textContent = '';
      subtitle.style.opacity = '1';

      function subTick() {
        subPos++;
        if (subPos < text.length) {
          subtitle.innerHTML = text.slice(0, subPos) + '<span class="tw-cursor"></span>';
          timer = setTimeout(subTick, subInterval);
        } else {
          // Restore full text, then wrap "Automify" with logo-style branding
          subtitle.innerHTML = text.replace('automify', '<span class="brand-name">automify</span>');
          timer = setTimeout(function () {
            cta.style.transition    = 'opacity 1.2s ease';
            cta.style.opacity       = '1';
            cta.style.pointerEvents = 'auto';
          }, 100);
        }
      }
      subTick();
    }

    // Run on load (i18n already applied text at this point)
    runTypewriter();

    // Re-run when language changes — i18n updates the DOM first, then fires this event
    document.addEventListener('automify:langchange', function () {
      // i18n has just updated h1 and subtitle — clear saved originals and re-run
      h1.removeAttribute('data-tw-original');
      subtitle.removeAttribute('data-tw-original');
      runTypewriter();
    });
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
