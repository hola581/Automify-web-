/* ─────────────────────────────────────────
   AUTOMIFY — Chat Widget (rule-based, no API)
───────────────────────────────────────── */
(function () {
  'use strict';

  var S = {
    open:      false,
    started:   false,
    sector:    null,
    exchanges: 0,
    MAX:       12
  };

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var ICON_X    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  /* ── Knowledge base ───────────────────── */
  var KB = {
    en: [
      {
        tags: ['hello','hi','hey','good morning','good afternoon','howdy','greetings'],
        reply: "Hi there! 👋 I can answer questions about Automify's services — websites, chatbots, automation, and more. What would you like to know?"
      },
      {
        tags: ['free website','free web','website','webpage','web page','web design','landing page','build a site','build a web'],
        reply: "We build you a fully custom, professional website at zero upfront cost — you only pay once you see it and love it. Most sites are delivered in 5–7 business days. 🚀"
      },
      {
        tags: ['chatbot','chat bot','ai chat','whatsapp bot','instagram bot','virtual assistant','automated replies','live chat'],
        reply: "Our AI chatbots work 24/7 on your website, WhatsApp, and Instagram — answering customers, capturing leads, and booking calls automatically. No human needed."
      },
      {
        tags: ['automation','automate','workflow','crm','invoic','manual task','save time','repetitive','process','integrate','zapier','make'],
        reply: "We connect your business tools (CRM, email, calendar, invoicing) and eliminate manual tasks. Clients typically save 10+ hours every week. 💪"
      },
      {
        tags: ['tappy','nfc','google review','tap to review','review chip','review device','reviews'],
        reply: "Tappy is a physical NFC chip for your venue. Customers tap their phone and leave a Google review in seconds. Positive reviews publish automatically; negative feedback goes only to you."
      },
      {
        tags: ['loyalti','loyalty','stamp card','reward','points card','loyalty card','loyalty program','loyalty programme'],
        reply: "Loyalti replaces paper stamp cards with a digital loyalty programme. It automates rewards and gives you real data on your best customers — no app needed for them."
      },
      {
        tags: ['price','cost','how much','pricing','fee','charge','afford','budget','pay','rates','plan'],
        reply: "The website is 100% free — you only pay if you love the result. Automation plans are monthly, quoted per project. Would you like to speak with the team about your budget?"
      },
      {
        tags: ['how long','delivery time','deadline','days','weeks','turnaround','timeline'],
        reply: "Most websites are delivered in 5–7 business days. Automation projects typically go live in 1–2 weeks. Onboarding takes less than 48 hours from signing."
      },
      {
        tags: ['contact','speak to','talk to','call','email','phone','expert','book a call','meeting','calendly','schedule','get in touch'],
        reply: "You can reach the team at hola@automify.xyz, call UK: +44 7860 230825 or ES: +34 658 941 796, or book a free 15-min call: https://calendly.com/hola-automify/30min 📅"
      },
      {
        tags: ['what do you do','what is automify','who are you','what can you','services','what you offer','tell me about','about automify'],
        reply: "Automify automates repetitive business tasks so you can focus on growth. We offer: free custom websites, AI chatbots, workflow automation, Tappy NFC reviews, and Loyalti loyalty programmes. What interests you most?"
      },
      {
        tags: ['sector','industry','hospitality','restaurant','hotel','cafe','bar','retail','shop','store','real estate','estate agent','services','ecommerce','e-commerce'],
        reply: "We work across hospitality, retail, services, e-commerce, real estate, and more — in the UK and Spain. Every solution is custom-built around your specific business."
      },
      {
        tags: ['result','case study','example','proof','client','success','saved','reduced','no-show'],
        reply: "A hospitality client cut no-shows by 40% with our booking automation. A services firm saved 10 admin hours per week. Every solution is tailored — your results will vary by business."
      },
      {
        tags: ['uk','spain','españa','united kingdom','london','madrid','barcelona','british','spanish','where'],
        reply: "We operate in the UK and Spain, serving businesses of all sizes. Our team is bilingual (English & Spanish) and we handle everything remotely."
      },
      {
        tags: ['thank','thanks','thank you','cheers','great','awesome','perfect','brilliant'],
        reply: "You're welcome! 😊 Feel free to ask anything else, or speak directly with the team: hola@automify.xyz"
      },
      {
        tags: ['no-show','cancellation','reservation','booking','appointment'],
        reply: "Our booking automation sends reminders automatically and handles confirmations — one hospitality client reduced no-shows by 40%. Want to know how it could work for your business?"
      },
      {
        tags: ['marketing','social media','campaign','email marketing','ads','advertising','seo'],
        reply: "We automate marketing workflows — personalised campaigns, follow-up emails, lead nurturing, and more. Everything runs automatically once set up."
      },
      {
        tags: ['sales','leads','lead generation','pipeline','proposal','convert','close'],
        reply: "We help automate your sales pipeline — from lead capture and follow-up to automated proposals and CRM updates. So your team focuses on closing, not admin."
      },
      {
        tags: ['hr','hiring','recruitment','onboarding','employee','staff','talent'],
        reply: "Our talent management automation handles recruitment workflows, employee onboarding, and performance tracking — freeing up HR for the work that actually matters."
      }
    ],

    es: [
      {
        tags: ['hola','buenas','buenos días','buenas tardes','buenas noches','hey','saludos'],
        reply: "¡Hola! 👋 Puedo responder tus preguntas sobre los servicios de Automify — webs, chatbots, automatización y más. ¿Qué quieres saber?"
      },
      {
        tags: ['web gratis','página gratis','sitio gratis','web','página','pagina','sitio web','diseño web','landing'],
        reply: "Diseñamos y construimos tu web profesional sin coste inicial — solo pagas cuando la ves y te encanta. La mayoría se entregan en 5–7 días laborables. 🚀"
      },
      {
        tags: ['chatbot','bot','whatsapp','instagram','asistente virtual','respuestas automáticas','chat automático','atención automática'],
        reply: "Nuestros chatbots con IA trabajan 24/7 en tu web, WhatsApp e Instagram — respondiendo clientes, captando leads y agendando llamadas de forma automática."
      },
      {
        tags: ['automatiz','flujo','workflow','crm','factur','tarea manual','ahorrar tiempo','repetitiv','proceso','integrar'],
        reply: "Conectamos las herramientas de tu negocio (CRM, email, calendario, facturación) y eliminamos las tareas manuales. Nuestros clientes ahorran más de 10 horas semanales. 💪"
      },
      {
        tags: ['tappy','nfc','reseña','opinión','google','chip','review'],
        reply: "Tappy es un chip NFC físico para tu local. El cliente toca con el móvil y deja una reseña en Google en segundos. Las positivas se publican solas; las negativas solo te llegan a ti."
      },
      {
        tags: ['loyalti','fideliz','sello','puntos','tarjeta','recompensa','programa de lealtad','fidelidad'],
        reply: "Loyalti reemplaza las tarjetas de sello en papel con un programa de fidelización digital. Automatiza recompensas y te da datos reales de tus mejores clientes — sin app para ellos."
      },
      {
        tags: ['precio','coste','costo','cuánto','cuanto','cuánto cuesta','pagar','tarifa','plan','presupuesto'],
        reply: "La web es 100% gratis — solo pagas si te encanta el resultado. Los planes de automatización son mensuales y se presupuestan por proyecto. ¿Quieres que el equipo te contacte?"
      },
      {
        tags: ['cuánto tiempo','tiempo','plazo','días','semanas','entrega','cuándo estará','rapido','rápido'],
        reply: "La mayoría de webs se entregan en 5–7 días laborables. Los proyectos de automatización suelen estar activos en 1–2 semanas. El onboarding tarda menos de 48 horas."
      },
      {
        tags: ['contacto','hablar','llamar','teléfono','telefono','email','experto','reservar','reunión','reunion','calendly','cita'],
        reply: "Puedes contactarnos en hola@automify.xyz, llamar ES: +34 658 941 796 / UK: +44 7860 230825, o reservar una llamada gratuita de 15 min: https://calendly.com/hola-automify/30min 📅"
      },
      {
        tags: ['qué hacéis','que haceis','qué es automify','que es automify','servicios','qué ofrecéis','que ofreceis','cuéntame','cuentame','sobre automify'],
        reply: "Automify automatiza las tareas repetitivas de tu negocio para que puedas centrarte en crecer. Ofrecemos: webs gratis personalizadas, chatbots con IA, automatización de procesos, Tappy NFC y Loyalti. ¿Qué te interesa más?"
      },
      {
        tags: ['sector','industria','hostelería','hosteleria','restaurante','hotel','cafetería','bar','retail','tienda','inmobiliaria','servicios','ecommerce','e-commerce'],
        reply: "Trabajamos con hostelería, retail, servicios, e-commerce, inmobiliaria y más — en España y el Reino Unido. Cada solución se construye a medida para tu negocio."
      },
      {
        tags: ['resultado','ejemplo','caso','cliente','éxito','exito','ahorr','reduccion','reducción','cancelacion'],
        reply: "Un cliente de hostelería redujo las cancelaciones un 40% con nuestra automatización de reservas. Una empresa de servicios ahorró 10 horas de admin semanales. Los resultados varían según el negocio."
      },
      {
        tags: ['españa','reino unido','uk','madrid','barcelona','sevilla','valencia','london','donde','dónde','operais','operáis'],
        reply: "Operamos en España y el Reino Unido, atendiendo negocios de todos los tamaños. Nuestro equipo es bilingüe y trabajamos de forma totalmente remota."
      },
      {
        tags: ['gracias','thank','genial','perfecto','guay','ok','vale','entendido'],
        reply: "¡De nada! 😊 Si tienes más preguntas, aquí estoy. O habla directamente con el equipo: hola@automify.xyz"
      },
      {
        tags: ['no-show','cancelacion','cancelación','reserva','cita','recordatorio'],
        reply: "Nuestra automatización de reservas envía recordatorios automáticos y gestiona confirmaciones — un cliente de hostelería redujo las cancelaciones un 40%. ¿Quieres saber cómo funcionaría en tu negocio?"
      },
      {
        tags: ['marketing','redes sociales','campaña','email marketing','publicidad','anuncios','seo'],
        reply: "Automatizamos flujos de marketing — campañas personalizadas, emails de seguimiento, nutrición de leads y más. Todo funciona solo una vez configurado."
      },
      {
        tags: ['ventas','lead','captacion','captación','pipeline','propuesta','cerrar','convertir'],
        reply: "Automatizamos tu pipeline de ventas — desde la captación de leads y el seguimiento hasta propuestas automatizadas y actualizaciones del CRM. Tu equipo solo se centra en cerrar."
      },
      {
        tags: ['rrhh','recursos humanos','contratacion','contratación','empleado','onboarding','talento','staff'],
        reply: "Nuestra automatización de talento gestiona flujos de selección, onboarding y seguimiento de rendimiento — liberando a RRHH para lo que realmente importa."
      }
    ]
  };

  /* ── Rule engine ──────────────────────── */
  function getReply(text, lang) {
    var t = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var rules = KB[lang] || KB.en;

    for (var i = 0; i < rules.length; i++) {
      var tags = rules[i].tags;
      for (var j = 0; j < tags.length; j++) {
        var tag = tags[j].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (t.indexOf(tag) !== -1) return rules[i].reply;
      }
    }

    // Fallback
    return lang === 'es'
      ? 'No estoy seguro de cómo ayudarte con eso exactamente, pero el equipo sí puede. Escríbenos a hola@automify.xyz o llama al +34 658 941 796. 😊'
      : "I'm not sure about that one, but our team can help! Reach us at hola@automify.xyz or call +44 7860 230825. 😊";
  }

  /* ── Build DOM ───────────────────────────────────────── */
  function init() {
    var fab = mkEl('button', { id: 'cb-fab', 'aria-label': 'Chat with Automify' });
    fab.innerHTML = ICON_CHAT;

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

  /* ── Toggle ──────────────────────────────────────────── */
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

  /* ── Welcome ─────────────────────────────────────────── */
  function showWelcome() {
    var es = getLang() === 'es';
    addBotMsg(es
      ? '¡Hola! 👋 Soy el asistente de Automify. ¿En qué sector está tu negocio?'
      : "Hi! 👋 I'm Automify's assistant. What sector is your business in?");
    renderSectorBtns();
  }

  function renderSectorBtns() {
    var es = getLang() === 'es';
    var sectors = es
      ? ['Hostelería', 'Retail', 'Servicios', 'E-commerce', 'Inmobiliaria', 'Otro']
      : ['Hospitality', 'Retail', 'Services', 'E-commerce', 'Real Estate', 'Other'];
    var wrap = mkEl('div', { class: 'cb-sectors' });
    sectors.forEach(function (s) {
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
        ? '¡Perfecto! ¿En qué puedo ayudarte? Puedes preguntarme sobre nuestros servicios, precios, plazos de entrega o cualquier otra cosa.'
        : 'Great! How can I help you? Feel free to ask about our services, pricing, delivery times, or anything else.');
    }, 280);
  }

  /* ── Send ────────────────────────────────────────────── */
  function handleSend() {
    var inp = document.getElementById('cb-input');
    var text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    addUserMsg(text);

    if (S.exchanges >= S.MAX) {
      var es = getLang() === 'es';
      addBotMsg(es
        ? 'Para más ayuda, contacta con nosotros directamente: hola@automify.xyz | +34 658 941 796'
        : 'For more help, reach us directly: hola@automify.xyz | +44 7860 230825');
      return;
    }

    S.exchanges++;
    addTyping();

    var lang = getLang();
    setTimeout(function () {
      removeTyping();
      addBotMsg(getReply(text, lang));
    }, 400 + Math.random() * 300);
  }

  /* ── Message helpers ─────────────────────────────────── */
  function addBotMsg(text) {
    var d = mkEl('div', { class: 'cb-msg cb-bot' });
    // Render links as clickable
    d.innerHTML = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">$1</a>');
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

  /* ── Utils ───────────────────────────────────────────── */
  function mkEl(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  function getLang() {
    return window.AutomifyI18n ? window.AutomifyI18n.getCurrentLang() : 'en';
  }

  /* ── Init ────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
