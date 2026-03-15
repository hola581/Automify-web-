/* ─────────────────────────────────────────
   AUTOMIFY — Chat Widget
   Cheap, fast, unobtrusive.
───────────────────────────────────────── */
(function () {
  'use strict';

  var S = {
    open:      false,
    started:   false,
    sector:    null,
    history:   [],
    exchanges: 0,
    MAX:       10       // hard cap — shows contact info after
  };

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var ICON_X    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  /* ── Build DOM ───────────────────────────── */
  function init() {
    // FAB
    var fab = mkEl('button', { id: 'cb-fab', 'aria-label': 'Chat with Automify' });
    fab.innerHTML = ICON_CHAT;

    // Window
    var win = mkEl('div', { id: 'cb-win', role: 'dialog', 'aria-label': 'Automify chat' });
    win.innerHTML =
      '<div id="cb-hdr">' +
        '<div class="cb-hdr-info">' +
          '<div class="cb-avatar">A</div>' +
          '<div class="cb-hdr-text">' +
            '<div class="cb-name">Automify AI</div>' +
            '<div class="cb-status"><span class="cb-dot"></span>Online</div>' +
          '</div>' +
        '</div>' +
        '<button id="cb-close" aria-label="Close">' + ICON_X + '</button>' +
      '</div>' +
      '<div id="cb-msgs" role="log" aria-live="polite"></div>' +
      '<div id="cb-footer">' +
        '<input id="cb-input" type="text" placeholder="Type a message…" autocomplete="off" maxlength="300">' +
        '<button id="cb-send" aria-label="Send">' + ICON_SEND + '</button>' +
      '</div>';

    document.body.appendChild(fab);
    document.body.appendChild(win);

    fab.addEventListener('click', toggleChat);
    document.getElementById('cb-close').addEventListener('click', toggleChat);
    document.getElementById('cb-send').addEventListener('click', handleSend);
    document.getElementById('cb-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    });
  }

  /* ── Toggle ──────────────────────────────── */
  function toggleChat() {
    S.open = !S.open;
    document.getElementById('cb-win').classList.toggle('cb-open', S.open);
    document.getElementById('cb-fab').classList.toggle('cb-open', S.open);
    if (S.open && !S.started) { S.started = true; showWelcome(); }
    if (S.open) setTimeout(function () {
      var inp = document.getElementById('cb-input');
      if (inp) inp.focus();
    }, 300);
  }

  /* ── Welcome + sector buttons ────────────── */
  function showWelcome() {
    var es = getLang() === 'es';
    addBotMsg(es
      ? '¡Hola! 👋 Soy el asistente de Automify. ¿En qué sector está tu negocio?'
      : "Hi! 👋 I'm Automify's assistant. What sector is your business in?");
    renderSectorBtns();
  }

  function renderSectorBtns() {
    var wrap = mkEl('div', { class: 'cb-sectors' });
    ['Hospitality', 'Retail', 'Services', 'E-commerce', 'Real Estate', 'Other'].forEach(function (s) {
      var b = mkEl('button', { class: 'cb-sector-btn' });
      b.textContent = s;
      b.addEventListener('click', function () { wrap.remove(); pickSector(s); });
      wrap.appendChild(b);
    });
    document.getElementById('cb-msgs').appendChild(wrap);
    scrollMsgs();
  }

  function pickSector(sector) {
    S.sector = sector;
    addUserMsg(sector);
    var es = getLang() === 'es';
    setTimeout(function () {
      addBotMsg(es
        ? '¡Perfecto! ¿Cuál es el proceso que más tiempo te roba en tu negocio ahora mismo?'
        : 'Perfect! What\'s the biggest time-consuming process in your ' + sector + ' business right now?');
    }, 280);
  }

  /* ── Send ────────────────────────────────── */
  function handleSend() {
    var inp = document.getElementById('cb-input');
    var text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    addUserMsg(text);

    // Hard cap reached → show contact
    if (S.exchanges >= S.MAX) {
      var es = getLang() === 'es';
      addBotMsg(es
        ? 'Para más ayuda, contáctanos directamente: hola@automify.xyz | +34 658 941 796'
        : 'For more help, reach us: hola@automify.xyz | +44 7860 230825');
      return;
    }

    S.exchanges++;
    addTyping();

    var payload = { message: text, sector: S.sector, history: S.history.slice(-6) };

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        removeTyping();
        var reply = d.reply || fallback();
        addBotMsg(reply);
        S.history.push({ role: 'user', content: text });
        S.history.push({ role: 'assistant', content: reply });
        if (S.history.length > 10) S.history = S.history.slice(-10);
      })
      .catch(function () {
        removeTyping();
        addBotMsg(fallback());
      });
  }

  /* ── Message helpers ─────────────────────── */
  function addBotMsg(text) {
    var d = mkEl('div', { class: 'cb-msg cb-bot' });
    d.textContent = text;
    document.getElementById('cb-msgs').appendChild(d);
    scrollMsgs();
  }

  function addUserMsg(text) {
    var d = mkEl('div', { class: 'cb-msg cb-user' });
    d.textContent = text;
    document.getElementById('cb-msgs').appendChild(d);
    scrollMsgs();
  }

  function addTyping() {
    var d = mkEl('div', { id: 'cb-typing', class: 'cb-msg cb-bot cb-typing' });
    d.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('cb-msgs').appendChild(d);
    scrollMsgs();
  }

  function removeTyping() {
    var t = document.getElementById('cb-typing');
    if (t) t.remove();
  }

  function scrollMsgs() {
    var m = document.getElementById('cb-msgs');
    if (m) m.scrollTop = m.scrollHeight;
  }

  /* ── Utils ───────────────────────────────── */
  function mkEl(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  function getLang() {
    return window.AutomifyI18n ? window.AutomifyI18n.getCurrentLang() : 'en';
  }

  function fallback() {
    return getLang() === 'es'
      ? 'Para más info: hola@automify.xyz | +34 658 941 796'
      : 'For more info: hola@automify.xyz | +44 7860 230825';
  }

  /* ── Init ────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
