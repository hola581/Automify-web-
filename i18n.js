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
      'nav.home':       'Home',
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
      'nav.sol.loyalti':'Loyalt\u03b9',
      'nav.sol.tappy':  'Tappy',

      // ── INDEX · HERO
      'hero.h1':       'Automate the Work.<br>Focus On What <em>Matters</em>',
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

      'sol.c4.title': 'Marketing',
      'sol.c4.desc':  'Deliver hyper-personalised campaigns at scale \u2014 continuously testing, optimising, and adapting to your audience in real time.',
      'sol.c4.f1': 'Personalised Campaigns',
      'sol.c4.f2': 'A/B Testing',
      'sol.c4.f3': 'Dynamic Content',

      'sol.c5.title': 'Talent Management',
      'sol.c5.desc':  'Attract, onboard, and develop your best people with intelligent automation that handles the heavy lifting for HR.',
      'sol.c5.f1': 'Recruitment Automation',
      'sol.c5.f2': 'Employee Onboarding',
      'sol.c5.f3': 'Performance Analytics',

      'sol.c6.title': 'Operational Efficiency',
      'sol.c6.desc':  'Eliminate bottlenecks across invoicing, scheduling, and supply chain management with end-to-end process automation.',
      'sol.c6.f1': 'Automated Invoicing',
      'sol.c6.f2': 'Task Scheduling',
      'sol.c6.f3': 'Supply Chain Optimisation',

      'sol.c7.title': 'Loyalt\u03b9',
      'sol.c7.desc':  'Keep customers coming back with a digital loyalty program that replaces paper stamp cards, automates rewards, and gives you real data on your best customers.',
      'sol.c7.f1': 'Digital Stamp Cards',
      'sol.c7.f2': 'Automated Rewards',
      'sol.c7.f3': 'Customer Retention Analytics',

      'sol.c8.title': 'Tappy',
      'sol.c8.desc':  'A physical NFC chip for your venue. Customers tap with their phone and leave a review in seconds \u2014 positive ones go straight to Google, negative feedback comes only to you.',
      'sol.c8.f1': 'NFC Tap-to-Review',
      'sol.c8.f2': 'Auto-publish to Google',
      'sol.c8.f3': 'Private Negative Feedback',

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

      // ── ABOUT PAGE
      'about.hero.tag':   '\u2736 \u00a0About Automify',
      'about.hero.title': 'We Automate What<br>Slows Your <em>Business Down</em>',
      'about.hero.sub':   'Automify is an automation agency helping businesses in the UK and Spain eliminate repetitive tasks, save hours every week, and focus on what actually drives growth.',
      'about.hero.cta':   'Speak to an Expert \u00a0\u2192',
      'about.intro.p1':   'We started Automify with a simple belief: <strong>business owners should spend their time building, not buried in admin.</strong> From a restaurant manager chasing no-show reservations to an e-commerce founder manually syncing orders into a CRM \u2014 we saw the same problem everywhere. Too much time wasted on tasks that technology should be handling.',
      'about.intro.p2':   'Today we work with businesses across <strong>hospitality, retail, services, e-commerce, real estate</strong>, and more \u2014 across the UK and Spain \u2014 delivering real, custom solutions. No templates. No generic setups. Just automation that fits your business like it was built for it. Because it was.',
      'about.approach.tag': '\u2736 \u00a0Our Approach',
      'about.c1.title': 'Real Solutions, No Templates',
      'about.c1.desc':  'Everything we build is custom. We map your existing processes, find the friction points, and build automation around how your business actually works \u2014 not a generic blueprint.',
      'about.c2.title': 'Fast Delivery',
      'about.c2.desc':  'Onboarding in under 48 hours. Most projects delivered in 1\u20132 weeks. We move fast so you start seeing results sooner \u2014 and don\u2019t spend months waiting on a solution.',
      'about.c3.title': 'Continuous Support',
      'about.c3.desc':  'We don\u2019t disappear after delivery. Monthly plans ensure your automations keep improving alongside your business \u2014 with a team that knows your setup inside out.',
      'about.products.tag': '\u2736 \u00a0What We Build',
      'about.p1.title': 'Custom Websites',
      'about.p1.desc':  'Conversion-focused, built from scratch \u2014 no page builders.',
      'about.p2.title': 'AI Chatbots',
      'about.p2.desc':  '24/7 assistants that qualify leads and book calls \u2014 on Web, WhatsApp & Instagram.',
      'about.p3.title': 'Workflow Automation',
      'about.p3.desc':  'Connect your tools and eliminate manual data entry across your whole operation.',
      'about.p4.title': 'Tappy NFC',
      'about.p4.desc':  'A physical tap-to-review device \u2014 your customers leave Google reviews in one touch.',
      'about.p5.title': 'Loyalti',
      'about.p5.desc':  'Digital loyalty that replaces paper stamp cards and captures real customer data.',
      'about.stat1.label': 'No-shows for a hospitality<br>client via booking automation',
      'about.stat2.label': 'Weekly admin hours saved<br>for a professional services firm',
      'about.stat3.label': 'From signed to onboarded \u2014<br>every single time',
      'about.cta.title': 'Ready to <em>Free Up</em><br>Your Time?',
      'about.cta.sub':   'Book a free 15-minute Discovery Call and let\u2019s map out exactly what automation can do for your business.',
      'about.cta.btn':   'Book a Free Call \u00a0\u2192',

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
      'nav.home':       'Inicio',
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
      'nav.sol.loyalti':'Loyalt\u03b9',
      'nav.sol.tappy':  'Tappy',

      // ── INDEX · HERO
      'hero.h1':       'Automatiza el Trabajo.<br>Enfoca En Lo Que <em>Importa</em>',
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

      'sol.c4.title': 'Marketing',
      'sol.c4.desc':  'Entrega campa\u00f1as hiper-personalizadas a escala \u2014 probando, optimizando y adapt\u00e1ndose a tu audiencia en tiempo real.',
      'sol.c4.f1': 'Campa\u00f1as Personalizadas',
      'sol.c4.f2': 'Pruebas A/B',
      'sol.c4.f3': 'Contenido Din\u00e1mico',

      'sol.c5.title': 'Gesti\u00f3n del Talento',
      'sol.c5.desc':  'Atrae, integra y desarrolla a tus mejores personas con automatizaci\u00f3n inteligente que hace el trabajo pesado por RRHH.',
      'sol.c5.f1': 'Automatizaci\u00f3n de Reclutamiento',
      'sol.c5.f2': 'Incorporaci\u00f3n de Empleados',
      'sol.c5.f3': 'An\u00e1lisis de Rendimiento',

      'sol.c6.title': 'Eficiencia Operativa',
      'sol.c6.desc':  'Elimina cuellos de botella en facturaci\u00f3n, programaci\u00f3n y gesti\u00f3n de la cadena de suministro con automatizaci\u00f3n de extremo a extremo.',
      'sol.c6.f1': 'Facturaci\u00f3n Automatizada',
      'sol.c6.f2': 'Programaci\u00f3n de Tareas',
      'sol.c6.f3': 'Optimizaci\u00f3n de la Cadena de Suministro',

      'sol.c7.title': 'Loyalt\u03b9',
      'sol.c7.desc':  'Fideliza a tus clientes con un programa de lealtad digital que sustituye las tarjetas de sellos, automatiza las recompensas y te da datos reales de tus mejores clientes.',
      'sol.c7.f1': 'Tarjetas de Sellos Digitales',
      'sol.c7.f2': 'Recompensas Automatizadas',
      'sol.c7.f3': 'An\u00e1lisis de Retenci\u00f3n',

      'sol.c8.title': 'Tappy',
      'sol.c8.desc':  'Un chip NFC f\u00edsico para tu local. Los clientes tocan con su m\u00f3vil y dejan una rese\u00f1a en segundos \u2014 las positivas van directo a Google, el feedback negativo solo te llega a ti.',
      'sol.c8.f1': 'Toque NFC para Valorar',
      'sol.c8.f2': 'Publicaci\u00f3n autom\u00e1tica en Google',
      'sol.c8.f3': 'Feedback negativo privado',

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

      // ── ABOUT PAGE
      'about.hero.tag':   '\u2736 \u00a0Sobre Automify',
      'about.hero.title': 'Automatizamos Lo Que<br>Frena Tu <em>Negocio</em>',
      'about.hero.sub':   'Automify es una agencia de automatizaci\u00f3n que ayuda a negocios en el Reino Unido y Espa\u00f1a a eliminar tareas repetitivas, ahorrar horas cada semana y centrarse en lo que realmente impulsa el crecimiento.',
      'about.hero.cta':   'Hablar con un Experto \u00a0\u2192',
      'about.intro.p1':   'Creamos Automify con una creencia simple: <strong>los due\u00f1os de negocios deber\u00edan dedicar su tiempo a construir, no enterrados en tareas administrativas.</strong> Desde el manager de un restaurante persiguiendo reservas canceladas hasta un fundador de e-commerce sincronizando pedidos manualmente en un CRM \u2014 vimos el mismo problema en todas partes. Demasiado tiempo perdido en tareas que la tecnolog\u00eda deber\u00eda gestionar.',
      'about.intro.p2':   'Hoy trabajamos con negocios de <strong>hosteler\u00eda, retail, servicios, e-commerce, inmobiliaria</strong> y m\u00e1s \u2014 en el Reino Unido y Espa\u00f1a \u2014 entregando soluciones reales y personalizadas. Sin plantillas. Sin configuraciones gen\u00e9ricas. Solo automatizaci\u00f3n que se adapta a tu negocio como si hubiera sido creada para \u00e9l. Porque lo fue.',
      'about.approach.tag': '\u2736 \u00a0Nuestro Enfoque',
      'about.c1.title': 'Soluciones Reales, Sin Plantillas',
      'about.c1.desc':  'Todo lo que construimos es personalizado. Mapeamos tus procesos existentes, encontramos los puntos de fricci\u00f3n y construimos automatizaci\u00f3n seg\u00fan c\u00f3mo funciona realmente tu negocio \u2014 no seg\u00fan un esquema gen\u00e9rico.',
      'about.c2.title': 'Entrega R\u00e1pida',
      'about.c2.desc':  'Onboarding en menos de 48 horas. La mayor\u00eda de proyectos entregados en 1\u20132 semanas. Avanzamos r\u00e1pido para que empieces a ver resultados antes \u2014 sin esperar meses por una soluci\u00f3n.',
      'about.c3.title': 'Soporte Continuo',
      'about.c3.desc':  'No desaparecemos tras la entrega. Los planes mensuales garantizan que tus automatizaciones sigan mejorando junto con tu negocio \u2014 con un equipo que conoce tu configuraci\u00f3n a fondo.',
      'about.products.tag': '\u2736 \u00a0Lo Que Construimos',
      'about.p1.title': 'Webs Personalizadas',
      'about.p1.desc':  'Orientadas a la conversi\u00f3n, construidas desde cero \u2014 sin maquetadores gen\u00e9ricos.',
      'about.p2.title': 'AI Chatbots',
      'about.p2.desc':  'Asistentes 24/7 que califican leads y agendan llamadas \u2014 en Web, WhatsApp e Instagram.',
      'about.p3.title': 'Workflow Automation',
      'about.p3.desc':  'Conecta tus herramientas y elimina la entrada manual de datos en toda tu operaci\u00f3n.',
      'about.p4.title': 'Tappy NFC',
      'about.p4.desc':  'Un dispositivo f\u00edsico de tocar para opinar \u2014 tus clientes dejan rese\u00f1as en Google con un solo toque.',
      'about.p5.title': 'Loyalti',
      'about.p5.desc':  'Fidelizaci\u00f3n digital que sustituye las tarjetas de sellos y capta datos reales de clientes.',
      'about.stat1.label': 'Menos no-shows para un cliente<br>de hosteler\u00eda con automatizaci\u00f3n de reservas',
      'about.stat2.label': 'Horas semanales de admin ahorradas<br>para una empresa de servicios profesionales',
      'about.stat3.label': 'De contrato firmado a en marcha \u2014<br>todas y cada una de las veces',
      'about.cta.title': '\u00bfListo para <em>Recuperar</em><br>Tu Tiempo?',
      'about.cta.sub':   'Reserva una Discovery Call gratuita de 15 minutos y descu\u00f3bre exactamente qu\u00e9 puede hacer la automatizaci\u00f3n por tu negocio.',
      'about.cta.btn':   'Reservar una Llamada Gratis \u00a0\u2192',

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
