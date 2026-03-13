/* ─────────────────────────────────────────
   AUTOMIFY — Cookie Consent Banner
───────────────────────────────────────── */
(function () {
  var STORAGE_KEY = 'automify-cookie-consent';

  function getConsent() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function setConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);
  }

  function t(key) {
    if (window.AutomifyI18n) return window.AutomifyI18n.t(key);
    var fallback = {
      'cookie.msg':    'We use cookies to improve your browsing experience and analyse site traffic.',
      'cookie.policy': 'Cookie Policy',
      'cookie.accept': 'Accept All',
      'cookie.reject': 'Reject Non-Essential',
    };
    return fallback[key] || key;
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="cookie-inner">' +
        '<p class="cookie-msg">' +
          '<span data-i18n="cookie.msg"></span>' +
          ' <a href="#" class="cookie-policy-link" data-i18n="cookie.policy"></a>' +
        '</p>' +
        '<div class="cookie-actions">' +
          '<button class="cookie-btn cookie-reject" id="cookie-reject" data-i18n="cookie.reject"></button>' +
          '<button class="cookie-btn cookie-accept" id="cookie-accept" data-i18n="cookie.accept"></button>' +
        '</div>' +
      '</div>';
    return banner;
  }

  function applyTexts(banner) {
    banner.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (el.tagName === 'A') {
        el.textContent = t(key);
      } else {
        el.textContent = t(key);
      }
    });
  }

  function showBanner() {
    var banner = buildBanner();
    document.body.appendChild(banner);

    // Apply translations once i18n is ready
    applyTexts(banner);

    // Re-apply if language changes
    document.addEventListener('automify:langchange', function () {
      applyTexts(banner);
    });

    // Small delay so the CSS transition plays
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('cookie-visible');
      });
    });

    document.getElementById('cookie-accept').addEventListener('click', function () {
      setConsent('accepted');
      hideBanner(banner);
    });

    document.getElementById('cookie-reject').addEventListener('click', function () {
      setConsent('rejected');
      hideBanner(banner);
    });
  }

  function hideBanner(banner) {
    banner.classList.remove('cookie-visible');
    banner.classList.add('cookie-hiding');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 400);
  }

  function init() {
    if (getConsent()) return; // Already decided
    showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
