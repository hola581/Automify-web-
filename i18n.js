/* ─────────────────────────────────────────
   AUTOMIFY — i18n Language System
   Supports: English (en) · Español (es)
───────────────────────────────────────── */
(function () {

  var translations = {

    /* ══════════════════════════════════════
       ENGLISH
    ══════════════════════════════════════ */
    en: {
      // ── NAV
      'nav.about':      'About',
      'nav.solutions':  'Solutions',
      'nav.contact':    'Contact',
      'nav.login':      'Login',
      'nav.signup':     'Sign up',
      'nav.sol.ca':     'Customer Acquisition',
      'nav.sol.sales':  'Sales',
      'nav.sol.rev':    'Revenue',
      'nav.sol.cr':     'Customer Retention',
      'nav.sol.mkt':    'Marketing',
      'nav.sol.talent': 'Talent Management',
      'nav.sol.ops':    'Operational Efficiency',

      // ── INDEX · HERO
      'hero.h1':       'Focus Your Efforts<br>On What <em>Matters</em>',
      'hero.subtitle': 'Powered by automify',
      'hero.cta':      'Speak to an Expert',

      // ── INDEX · STAT CARDS
      'stat.left.label':  'Automation Flows',
      'stat.left.title':  'Unparalleled<br>Task Coverage',
      'stat.right.label': 'Active Workflows',

      // ── INDEX · PROMO
      'promo.tag':     '\u2736 \u00a0Limited Offer',
      'promo.heading': 'Your Brand.<br><em>Your Website.</em><br>Completely Free.',
      'promo.sub':     'We build you a fully custom, professionally designed website \u2014 tailored to your brand colours, fonts, and vision. <strong>You don\u2019t pay a single cent until you love what you see.</strong>',
      'promo.s1.title': 'Fill the Template',
      'promo.s1.desc':  'Share your brand colours, fonts, tone of voice, and what you do. Takes less than 5 minutes.',
      'promo.s2.title': 'We Build It',
      'promo.s2.desc':  'Our team crafts your fully custom, high-converting website \u2014 designed to impress from day one.',
      'promo.s3.title': 'Love It, Then Pay',
      'promo.s3.desc':  'Zero upfront cost. No risk. No hidden fees. Only pay when you\u2019re completely thrilled.',
      'promo.cta':      'Get Your Free Website \u00a0\u2192',
      'promo.trust':    'No credit card required \u00a0\u00b7\u00a0 No obligation \u00a0\u00b7\u00a0 100% risk-free',

      // ── SOLUTIONS PAGE · HERO
      'sol.hero.tag':   '\u2736 \u00a0Our Solutions',
      'sol.hero.title': 'Automation Built for<br>Every Corner of Your <em>Business</em>',
      'sol.hero.sub':   'From winning new customers to managing your team \u2014 Automify puts intelligent automation to work across your entire organisation.',

      // ── SOLUTIONS PAGE · CARDS
      'sol.c1.title': 'Customer Acquisition',
      'sol.c1.desc':  'Drive growth with AI-powered tools designed to find, engage, and convert your ideal customers \u2014 without lifting a finger.',
      'sol.c1.f1': 'Lead Generation',
      'sol.c1.f2': 'Personalised Outreach',
      'sol.c1.f3': 'Targeted Advertising',

      'sol.c2.title': 'Sales',
      'sol.c2.desc':  'Supercharge your sales team with intelligent forecasting, automated proposals, and a pipeline that manages itself.',
      'sol.c2.f1': 'Sales Forecasting',
      'sol.c2.f2': 'Automated Proposals',
      'sol.c2.f3': 'Pipeline Management',

      'sol.c3.title': 'Revenue',
      'sol.c3.desc':  'Maximise every revenue stream with dynamic pricing models, real-time analytics, and automated growth strategies.',
      'sol.c3.f1': 'AI-Driven Pricing Models',
      'sol.c3.f2': 'Revenue Analytics',
      'sol.c3.f3': 'Growth Optimisation',

      'sol.c4.title': 'Customer Retention',
      'sol.c4.desc':  'Keep customers loyal and reduce churn with personalised loyalty programs and timely, automated follow-ups.',
      'sol.c4.f1': 'Loyalty Programs',
      'sol.c4.f2': 'Churn Prediction',
      'sol.c4.f3': 'Automated Follow-ups',

      'sol.c5.title': 'Marketing',
      'sol.c5.desc':  'Deliver hyper-personalised campaigns at scale \u2014 continuously testing, optimising, and adapting to your audience in real time.',
      'sol.c5.f1': 'Personalised Campaigns',
      'sol.c5.f2': 'A/B Testing',
      'sol.c5.f3': 'Dynamic Content',

      'sol.c6.title': 'Talent Management',
      'sol.c6.desc':  'Attract, onboard, and develop your best people with intelligent automation that handles the heavy lifting for HR.',
      'sol.c6.f1': 'Recruitment Automation',
      'sol.c6.f2': 'Employee Onboarding',
      'sol.c6.f3': 'Performance Analytics',

      'sol.c7.title': 'Operational Efficiency',
      'sol.c7.desc':  'Eliminate bottlenecks across invoicing, scheduling, and supply chain management with end-to-end process automation.',
      'sol.c7.f1': 'Automated Invoicing',
      'sol.c7.f2': 'Task Scheduling',
      'sol.c7.f3': 'Supply Chain Optimisation',

      // ── SOLUTIONS PAGE · CTA
      'sol.cta.title': 'Ready to <em>Automate</em><br>Your Business?',
      'sol.cta.sub':   'Speak with an Automify expert and discover how our solutions can transform your operations from day one.',
      'sol.cta.btn':   'Speak to an Expert \u00a0\u2192',

      // ── ONBOARDING · STEPS
      'ob.s1.title': 'About Your Business',
      'ob.s2.title': 'Brand Identity',
      'ob.s3.title': 'Your Website',
      'ob.s4.title': 'Inspiration &amp; Extras',
      'ob.s5.title': 'Your Details',
      'ob.step.labels': [
        'Step 1 of 5 \u2014 About Your Business',
        'Step 2 of 5 \u2014 Brand Identity',
        'Step 3 of 5 \u2014 Your Website',
        'Step 4 of 5 \u2014 Inspiration & Extras',
        'Step 5 of 5 \u2014 Your Details',
      ],

      // ── ONBOARDING · LABELS
      'ob.l.business_name': 'Business Name',
      'ob.l.industry':      'Industry',
      'ob.l.description':   'What does your business do?',
      'ob.l.target':        'Who is your target audience?',
      'ob.l.colours':       'Brand Colours',
      'ob.l.primary':       'Primary',
      'ob.l.secondary':     'Secondary',
      'ob.l.font':          'Font Style',
      'ob.l.tone':          'Tone of Voice',
      'ob.l.goal':          'Main goal of your website',
      'ob.l.pages':         'Which pages do you need?',
      'ob.l.tagline':       'Tagline or Key Message',
      'ob.l.services':      'Services or Products to Highlight',
      'ob.l.inspo':         'Inspiration Websites',
      'ob.l.upto3':         'up to 3',
      'ob.l.logo':          'Logo Upload',
      'ob.l.optional':      'optional',
      'ob.l.notes':         'Additional Notes',
      'ob.l.fullname':      'Full Name',
      'ob.l.email':         'Email Address',
      'ob.l.phone':         'Phone Number',
      'ob.l.website':       'Current Website',
      'ob.l.referral':      'How did you hear about us?',

      // ── ONBOARDING · PLACEHOLDERS
      'ob.ph.business_name': 'e.g. Acme Studios',
      'ob.ph.industry':      'Select your industry\u2026',
      'ob.ph.description':   'Briefly describe what you offer and who you help\u2026',
      'ob.ph.target':        'e.g. Small business owners aged 25\u201345',
      'ob.ph.font':          'Choose a font style\u2026',
      'ob.ph.tone':          'Choose your tone\u2026',
      'ob.ph.goal':          'Select a goal\u2026',
      'ob.ph.tagline':       'e.g. Build smarter, grow faster',
      'ob.ph.services':      'List your main offerings\u2026',
      'ob.ph.inspo':         'https://example.com',
      'ob.ph.notes':         'Anything else we should know about your vision?',
      'ob.ph.fullname':      'e.g. Sarah Johnson',
      'ob.ph.email':         'you@company.com',
      'ob.ph.phone':         'e.g. +1 555 123 4567',
      'ob.ph.website':       'https://yoursite.com',
      'ob.ph.referral':      'Select an option\u2026',

      // ── ONBOARDING · MISC
      'ob.upload.text': 'Click to upload or drag &amp; drop',
      'ob.upload.sub':  'PNG, JPG, SVG \u2014 up to 5 MB',
      'ob.btn.next':    'Next \u00a0\u2192',
      'ob.btn.back':    '\u2190 Back',
      'ob.btn.submit':  'Submit &amp; Get My Brief',
      'ob.ty.title':    'You\u2019re all set!',
      'ob.ty.sub':      'Your brief is downloading now. Our team will review everything and be in touch within 24 hours to start building your website.',
      'ob.ty.btn':      'Back to Home \u00a0\u2192',

      // ── ONBOARDING · ERRORS
      'ob.err.business_name': 'Please enter your business name.',
      'ob.err.industry':      'Please select your industry.',
      'ob.err.description':   'Please describe your business.',
      'ob.err.target':        'Please describe your target audience.',
      'ob.err.goal':          'Please select a website goal.',
      'ob.err.fullname':      'Please enter your name.',
      'ob.err.email':         'Please enter a valid email address.',

      // ── COOKIE BANNER
      'cookie.msg':    'We use cookies to improve your browsing experience and analyse site traffic.',
      'cookie.policy': 'Cookie Policy',
      'cookie.accept': 'Accept All',
      'cookie.reject': 'Reject Non-Essential',

      // ── CONTACT MODAL
      'contact.title':        'Get in Touch',
      'contact.subtitle':     'Choose how you\'d like to reach us.',
      'contact.phone':        'Phone',
      'contact.whatsapp':     'WhatsApp',
      'contact.email':        'Email',
      'contact.calendar':     'Book a Meeting',
      'contact.calendar.sub': 'Schedule a free 30-min call',
    },

    /* ══════════════════════════════════════
       ESPAÑOL
    ══════════════════════════════════════ */
    es: {
      // ── NAV
      'nav.about':      'Nosotros',
      'nav.solutions':  'Soluciones',
      'nav.contact':    'Contacto',
      'nav.login':      'Iniciar sesi\u00f3n',
      'nav.signup':     'Registrarse',
      'nav.sol.ca':     'Captaci\u00f3n de Clientes',
      'nav.sol.sales':  'Ventas',
      'nav.sol.rev':    'Ingresos',
      'nav.sol.cr':     'Retenci\u00f3n de Clientes',
      'nav.sol.mkt':    'Marketing',
      'nav.sol.talent': 'Gesti\u00f3n del Talento',
      'nav.sol.ops':    'Eficiencia Operativa',

      // ── INDEX · HERO
      'hero.h1':       'Enfoca Tu Energ\u00eda<br>En Lo Que <em>Importa</em>',
      'hero.subtitle': 'Impulsado por automify',
      'hero.cta':      'Hablar con un Experto',

      // ── INDEX · STAT CARDS
      'stat.left.label':  'Flujos de Automatizaci\u00f3n',
      'stat.left.title':  'Cobertura de Tareas<br>Sin Igual',
      'stat.right.label': 'Flujos Activos',

      // ── INDEX · PROMO
      'promo.tag':     '\u2736 \u00a0Oferta Limitada',
      'promo.heading': 'Tu Marca.<br><em>Tu Sitio Web.</em><br>Completamente Gratis.',
      'promo.sub':     'Creamos tu sitio web completamente personalizado, dise\u00f1ado profesionalmente \u2014 adaptado a los colores, fuentes y visi\u00f3n de tu marca. <strong>No pagas ni un centavo hasta que ames lo que ves.</strong>',
      'promo.s1.title': 'Completa el Formulario',
      'promo.s1.desc':  'Comparte los colores de tu marca, fuentes, tono de voz y lo que haces. Toma menos de 5 minutos.',
      'promo.s2.title': 'Nosotros lo Construimos',
      'promo.s2.desc':  'Nuestro equipo crea tu sitio web completamente personalizado y de alta conversi\u00f3n \u2014 dise\u00f1ado para impresionar desde el primer d\u00eda.',
      'promo.s3.title': 'Am\u00e1lo, Luego Paga',
      'promo.s3.desc':  'Sin costo inicial. Sin riesgo. Sin tarifas ocultas. Solo paga cuando est\u00e9s completamente encantado.',
      'promo.cta':      'Obt\u00e9n Tu Sitio Web Gratis \u00a0\u2192',
      'promo.trust':    'Sin tarjeta de cr\u00e9dito \u00a0\u00b7\u00a0 Sin compromiso \u00a0\u00b7\u00a0 100% sin riesgo',

      // ── SOLUTIONS PAGE · HERO
      'sol.hero.tag':   '\u2736 \u00a0Nuestras Soluciones',
      'sol.hero.title': 'Automatizaci\u00f3n para Cada \u00c1rea<br>de tu <em>Negocio</em>',
      'sol.hero.sub':   'Desde captar nuevos clientes hasta gestionar tu equipo \u2014 Automify pone la automatizaci\u00f3n inteligente a trabajar en toda tu organizaci\u00f3n.',

      // ── SOLUTIONS PAGE · CARDS
      'sol.c1.title': 'Captaci\u00f3n de Clientes',
      'sol.c1.desc':  'Impulsa el crecimiento con herramientas de IA dise\u00f1adas para encontrar, captar y convertir a tus clientes ideales \u2014 sin mover un dedo.',
      'sol.c1.f1': 'Generaci\u00f3n de Leads',
      'sol.c1.f2': 'Contacto Personalizado',
      'sol.c1.f3': 'Publicidad Dirigida',

      'sol.c2.title': 'Ventas',
      'sol.c2.desc':  'Potencia tu equipo de ventas con pron\u00f3sticos inteligentes, propuestas automatizadas y un pipeline que se gestiona solo.',
      'sol.c2.f1': 'Pron\u00f3stico de Ventas',
      'sol.c2.f2': 'Propuestas Automatizadas',
      'sol.c2.f3': 'Gesti\u00f3n del Pipeline',

      'sol.c3.title': 'Ingresos',
      'sol.c3.desc':  'Maximiza cada fuente de ingresos con modelos de precios din\u00e1micos, an\u00e1lisis en tiempo real y estrategias de crecimiento automatizadas.',
      'sol.c3.f1': 'Modelos de Precios con IA',
      'sol.c3.f2': 'An\u00e1lisis de Ingresos',
      'sol.c3.f3': 'Optimizaci\u00f3n del Crecimiento',

      'sol.c4.title': 'Retenci\u00f3n de Clientes',
      'sol.c4.desc':  'Mant\u00e9n a los clientes leales y reduce la p\u00e9rdida con programas de lealtad personalizados y seguimientos oportunos y automatizados.',
      'sol.c4.f1': 'Programas de Lealtad',
      'sol.c4.f2': 'Predicci\u00f3n de Abandono',
      'sol.c4.f3': 'Seguimientos Automatizados',

      'sol.c5.title': 'Marketing',
      'sol.c5.desc':  'Entrega campa\u00f1as hiper-personalizadas a escala \u2014 probando, optimizando y adapt\u00e1ndose a tu audiencia en tiempo real.',
      'sol.c5.f1': 'Campa\u00f1as Personalizadas',
      'sol.c5.f2': 'Pruebas A/B',
      'sol.c5.f3': 'Contenido Din\u00e1mico',

      'sol.c6.title': 'Gesti\u00f3n del Talento',
      'sol.c6.desc':  'Atrae, integra y desarrolla a tus mejores personas con automatizaci\u00f3n inteligente que hace el trabajo pesado por RRHH.',
      'sol.c6.f1': 'Automatizaci\u00f3n de Reclutamiento',
      'sol.c6.f2': 'Incorporaci\u00f3n de Empleados',
      'sol.c6.f3': 'An\u00e1lisis de Rendimiento',

      'sol.c7.title': 'Eficiencia Operativa',
      'sol.c7.desc':  'Elimina cuellos de botella en facturaci\u00f3n, programaci\u00f3n y gesti\u00f3n de la cadena de suministro con automatizaci\u00f3n de extremo a extremo.',
      'sol.c7.f1': 'Facturaci\u00f3n Automatizada',
      'sol.c7.f2': 'Programaci\u00f3n de Tareas',
      'sol.c7.f3': 'Optimizaci\u00f3n de la Cadena de Suministro',

      // ── SOLUTIONS PAGE · CTA
      'sol.cta.title': '\u00bfListo para <em>Automatizar</em><br>tu Negocio?',
      'sol.cta.sub':   'Habla con un experto de Automify y descubre c\u00f3mo nuestras soluciones pueden transformar tus operaciones desde el primer d\u00eda.',
      'sol.cta.btn':   'Hablar con un Experto \u00a0\u2192',

      // ── ONBOARDING · STEPS
      'ob.s1.title': 'Sobre Tu Negocio',
      'ob.s2.title': 'Identidad de Marca',
      'ob.s3.title': 'Tu Sitio Web',
      'ob.s4.title': 'Inspiraci\u00f3n y Extras',
      'ob.s5.title': 'Tus Datos',
      'ob.step.labels': [
        'Paso 1 de 5 \u2014 Sobre Tu Negocio',
        'Paso 2 de 5 \u2014 Identidad de Marca',
        'Paso 3 de 5 \u2014 Tu Sitio Web',
        'Paso 4 de 5 \u2014 Inspiraci\u00f3n y Extras',
        'Paso 5 de 5 \u2014 Tus Datos',
      ],

      // ── ONBOARDING · LABELS
      'ob.l.business_name': 'Nombre del Negocio',
      'ob.l.industry':      'Industria',
      'ob.l.description':   '\u00bfQu\u00e9 hace tu negocio?',
      'ob.l.target':        '\u00bfQui\u00e9n es tu audiencia objetivo?',
      'ob.l.colours':       'Colores de Marca',
      'ob.l.primary':       'Principal',
      'ob.l.secondary':     'Secundario',
      'ob.l.font':          'Estilo de Fuente',
      'ob.l.tone':          'Tono de Voz',
      'ob.l.goal':          'Objetivo principal del sitio web',
      'ob.l.pages':         '\u00bfQu\u00e9 p\u00e1ginas necesitas?',
      'ob.l.tagline':       'Eslogan o Mensaje Clave',
      'ob.l.services':      'Servicios o Productos a Destacar',
      'ob.l.inspo':         'Sitios Web de Inspiraci\u00f3n',
      'ob.l.upto3':         'hasta 3',
      'ob.l.logo':          'Subir Logo',
      'ob.l.optional':      'opcional',
      'ob.l.notes':         'Notas Adicionales',
      'ob.l.fullname':      'Nombre Completo',
      'ob.l.email':         'Correo Electr\u00f3nico',
      'ob.l.phone':         'N\u00famero de Tel\u00e9fono',
      'ob.l.website':       'Sitio Web Actual',
      'ob.l.referral':      '\u00bfC\u00f3mo nos conociste?',

      // ── ONBOARDING · PLACEHOLDERS
      'ob.ph.business_name': 'ej. Estudio Acme',
      'ob.ph.industry':      'Selecciona tu industria\u2026',
      'ob.ph.description':   'Describe brevemente qu\u00e9 ofreces y a qui\u00e9n ayudas\u2026',
      'ob.ph.target':        'ej. Due\u00f1os de peque\u00f1os negocios entre 25 y 45 a\u00f1os',
      'ob.ph.font':          'Elige un estilo de fuente\u2026',
      'ob.ph.tone':          'Elige tu tono\u2026',
      'ob.ph.goal':          'Selecciona un objetivo\u2026',
      'ob.ph.tagline':       'ej. Construye m\u00e1s inteligente, crece m\u00e1s r\u00e1pido',
      'ob.ph.services':      'Enumera tus principales ofertas\u2026',
      'ob.ph.inspo':         'https://ejemplo.com',
      'ob.ph.notes':         '\u00bfHay algo m\u00e1s que debamos saber sobre tu visi\u00f3n?',
      'ob.ph.fullname':      'ej. Mar\u00eda Garc\u00eda',
      'ob.ph.email':         'tu@empresa.com',
      'ob.ph.phone':         'ej. +1 555 123 4567',
      'ob.ph.website':       'https://tusitio.com',
      'ob.ph.referral':      'Selecciona una opci\u00f3n\u2026',

      // ── ONBOARDING · MISC
      'ob.upload.text': 'Haz clic para subir o arrastra y suelta',
      'ob.upload.sub':  'PNG, JPG, SVG \u2014 hasta 5 MB',
      'ob.btn.next':    'Siguiente \u00a0\u2192',
      'ob.btn.back':    '\u2190 Atr\u00e1s',
      'ob.btn.submit':  'Enviar y Obtener Mi Brief',
      'ob.ty.title':    '\u00a1Todo listo!',
      'ob.ty.sub':      'Tu brief se est\u00e1 descargando ahora. Nuestro equipo revisar\u00e1 todo y se pondr\u00e1 en contacto en 24 horas para comenzar a construir tu sitio web.',
      'ob.ty.btn':      'Volver al Inicio \u00a0\u2192',

      // ── ONBOARDING · ERRORS
      'ob.err.business_name': 'Por favor ingresa el nombre de tu negocio.',
      'ob.err.industry':      'Por favor selecciona tu industria.',
      'ob.err.description':   'Por favor describe tu negocio.',
      'ob.err.target':        'Por favor describe tu audiencia objetivo.',
      'ob.err.goal':          'Por favor selecciona un objetivo para el sitio web.',
      'ob.err.fullname':      'Por favor ingresa tu nombre.',
      'ob.err.email':         'Por favor ingresa una direcci\u00f3n de correo v\u00e1lida.',

      // ── COOKIE BANNER
      'cookie.msg':    'Usamos cookies para mejorar tu experiencia de navegaci\u00f3n y analizar el tr\u00e1fico del sitio.',
      'cookie.policy': 'Pol\u00edtica de Cookies',
      'cookie.accept': 'Aceptar Todo',
      'cookie.reject': 'Rechazar No Esenciales',

      // ── CONTACT MODAL
      'contact.title':        'Cont\u00e1ctanos',
      'contact.subtitle':     'Elige c\u00f3mo quieres ponerte en contacto con nosotros.',
      'contact.phone':        'Tel\u00e9fono',
      'contact.whatsapp':     'WhatsApp',
      'contact.email':        'Email',
      'contact.calendar':     'Reservar una Reuni\u00f3n',
      'contact.calendar.sub': 'Agenda una llamada gratuita de 30 min',
    },
  };

  /* ── Core ──────────────────────────────────────────────── */

  var currentLang = localStorage.getItem('automify-lang') || 'en';

  function t(key) {
    var map = translations[currentLang] || translations.en;
    return map[key] !== undefined ? map[key]
         : translations.en[key]  !== undefined ? translations.en[key]
         : key;
  }

  function applyLanguage() {
    // textContent
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (v !== undefined) el.textContent = v;
    });

    // innerHTML
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-html'));
      if (v !== undefined) el.innerHTML = v;
    });

    // placeholder
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-ph'));
      if (v !== undefined) el.placeholder = v;
    });

    // error messages
    document.querySelectorAll('[data-i18n-err]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-err'));
      if (v !== undefined) el.textContent = v;
    });

    // Lang button
    var langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
      langBtn.innerHTML = (currentLang === 'es' ? 'ESP' : 'ENG') + ' <span class="chevron">\u25be</span>';
    }

    // html lang attribute
    document.documentElement.lang = currentLang;

    // Notify other scripts (e.g. onboarding step labels)
    document.dispatchEvent(new CustomEvent('automify:langchange', {
      detail: { lang: currentLang, t: t }
    }));
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('automify-lang', lang);
    applyLanguage();
  }

  // Public API
  window.AutomifyI18n = { setLanguage: setLanguage, t: t, getCurrentLang: function () { return currentLang; } };

  // Apply on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLanguage);
  } else {
    applyLanguage();
  }

})();
