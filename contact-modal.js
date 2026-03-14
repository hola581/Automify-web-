/* ─────────────────────────────────────────
   AUTOMIFY — Contact Modal
───────────────────────────────────────── */
(function () {

  var contacts = {
    en: {
      phone:        'tel:+447860230825',
      phoneDisplay: '+44 7860 230825',
      whatsapp:     'https://wa.me/447860230825',
      email:        'mailto:hola@automify.xyz',
      calendar:     'https://calendly.com/hola-automify/30min',
    },
    es: {
      phone:        'tel:+34658941796',
      phoneDisplay: '+34 658 941 796',
      whatsapp:     'https://wa.me/34658941796',
      email:        'mailto:hola@automify.xyz',
      calendar:     'https://calendly.com/hola-automify/30min',
    },
  };

  function t(key) {
    return window.AutomifyI18n ? window.AutomifyI18n.t(key) : key;
  }

  function getLang() {
    return window.AutomifyI18n ? window.AutomifyI18n.getCurrentLang() : 'en';
  }

  function buildModal() {
    var overlay = document.createElement('div');
    overlay.id = 'contact-overlay';

    var modal = document.createElement('div');
    modal.id = 'contact-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    renderModal(modal);

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // Re-render on language change
    document.addEventListener('automify:langchange', function () {
      renderModal(modal);
    });

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('contact-visible');
      });
    });
  }

  function renderModal(modal) {
    var lang = getLang();
    var c = contacts[lang] || contacts.en;

    var title    = t('contact.title');
    var subtitle = t('contact.subtitle');

    var options = [
      {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        label: t('contact.phone'),
        value: c.phoneDisplay,
        href:  c.phone,
        color: 'blue',
      },
      {
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
        label: t('contact.whatsapp'),
        value: c.phoneDisplay,
        href:  c.whatsapp,
        color: 'green',
        target: '_blank',
      },
      {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
        label: t('contact.email'),
        value: 'hola@automify.xyz',
        href:  c.email,
        color: 'blue',
      },
      {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        label: t('contact.calendar'),
        value: t('contact.calendar.sub'),
        href:  c.calendar,
        color: 'gradient',
        target: '_blank',
      },
    ];

    modal.innerHTML =
      '<button class="contact-close" id="contact-close" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '<h2 class="contact-title">' + title + '</h2>' +
      '<p class="contact-subtitle">' + subtitle + '</p>' +
      '<div class="contact-options">' +
        options.map(function (o) {
          return '<a href="' + o.href + '" class="contact-option contact-option--' + o.color + '"' +
            (o.target ? ' target="' + o.target + '" rel="noopener"' : '') + '>' +
            '<span class="contact-option-icon">' + o.icon + '</span>' +
            '<span class="contact-option-text">' +
              '<span class="contact-option-label">' + o.label + '</span>' +
              '<span class="contact-option-value">' + o.value + '</span>' +
            '</span>' +
            '<span class="contact-option-arrow">→</span>' +
          '</a>';
        }).join('') +
      '</div>';

    document.getElementById('contact-close').addEventListener('click', closeModal);
  }

  function closeModal() {
    var overlay = document.getElementById('contact-overlay');
    if (!overlay) return;
    overlay.classList.remove('contact-visible');
    overlay.classList.add('contact-hiding');
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 350);
  }

  function openModal() {
    if (document.getElementById('contact-overlay')) return;
    buildModal();
  }

  // Hook all "Contact" buttons
  function hookButtons() {
    document.querySelectorAll('.btn-signup[data-i18n="nav.contact"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookButtons);
  } else {
    hookButtons();
  }

  window.AutomifyContact = { open: openModal, close: closeModal };

})();
