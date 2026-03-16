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
    MAX:       20
  };

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var ICON_X    = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  /* ──────────────────────────────────────────────────────────
     KNOWLEDGE BASE
     Each rule has: tags (keyword triggers) + reply
     Rules are checked in order — first match wins.
  ────────────────────────────────────────────────────────── */
  var KB = {

    en: [

      /* ── Greetings ─────────────────────────────────────── */
      {
        tags: ['hello','hi ','hey','good morning','good afternoon','good evening','howdy','greetings','sup ','what\'s up'],
        reply: "Hi there! 👋 I'm Automify's assistant. I can tell you all about our services — free websites, AI chatbots, workflow automation, Tappy, Loyalti, and more. What would you like to know?"
      },

      /* ── What is Automify ──────────────────────────────── */
      {
        tags: ['what is automify','who are you','who is automify','tell me about automify','about automify','what do you do','what does automify do','what you do'],
        reply: "Automify is an AI business automation agency operating in the UK and Spain. We help businesses eliminate repetitive tasks, save hours every week, and grow faster — with custom websites, AI chatbots, workflow automation, and tools like Tappy and Loyalti. Everything is built specifically for your business, never from a template."
      },

      /* ── Free Website — general ────────────────────────── */
      {
        tags: ['free website','free web','free site','website for free','web for free','get a website','build my website','need a website','want a website','build a site','build a web','web design','website design','professional website','new website','create a website'],
        reply: "Our free website offer is real — we design and build a fully custom, professional website at zero upfront cost. You fill in a brief (takes 5 minutes), our team builds it, and you only pay once you see it and genuinely love it. No hidden fees, no contracts, no risk. 🚀 Want to get started? → https://www.automify.xyz/onboarding.html"
      },

      /* ── Website price — ONLY if asked specifically ────── */
      {
        tags: ['how much does the website cost','how much is the website','website price','web price','price of the website','cost of the website','what does the website cost','website fee','web cost'],
        reply: "In 80% of cases the website investment is between £500–£800 (or €500–€800). It only goes higher for very high-traffic sites or technically complex projects with lots of custom features. Either way, you never pay upfront — only once you've seen it and love it."
      },

      /* ── Website process ───────────────────────────────── */
      {
        tags: ['how does the website work','website process','how do i get the website','web process','steps for website','website steps','onboarding','brief','fill the brief'],
        reply: "It's a simple 3-step process: 1️⃣ Fill in a short brief about your brand (colours, fonts, what you do — takes under 5 min). 2️⃣ Our team builds your fully custom site. 3️⃣ You review it — love it, then pay. Start here: https://www.automify.xyz/onboarding.html"
      },

      /* ── Website delivery time ─────────────────────────── */
      {
        tags: ['how long website','website time','delivery time','how long does it take','when will my website','website deadline','website days','days to build'],
        reply: "Most websites are delivered within 5–7 business days of receiving your brief. More complex projects with many pages may take a few extra days — we'll always give you a clear timeline upfront."
      },

      /* ── Website — what if I don't like it ─────────────── */
      {
        tags: ['what if i don\'t like','don\'t like the website','not happy','what if i hate','don\'t pay','no obligation','no risk website'],
        reply: "You don't pay. Simple as that. If you're not completely happy with what we deliver, you owe us nothing. We'd rather earn your trust than your money. Zero risk."
      },

      /* ── AI Chatbots ────────────────────────────────────── */
      {
        tags: ['chatbot','chat bot','ai chatbot','ai assistant','virtual assistant','automated chat','whatsapp bot','instagram bot','ai chat','bot for my website','bot for website'],
        reply: "Our AI chatbots work 24/7 on your website, WhatsApp, and Instagram. They answer customer questions, qualify leads automatically, and book calls — without any human needed. Great for businesses that get lots of enquiries and want to respond instantly at any hour."
      },

      /* ── Workflow Automation — general ─────────────────── */
      {
        tags: ['workflow','automation','automate','automating','workflow automation','automate my business','business automation','process automation','automate tasks','repetitive tasks','manual tasks','save time','eliminate admin'],
        reply: "Workflow automation is what we do best. We map your current processes, find the bottlenecks, and build automation that connects your tools — CRM, email, calendar, invoicing, spreadsheets — so everything runs without manual input. Clients typically save 10+ hours every week. 💪"
      },

      /* ── CRM / specific tools ──────────────────────────── */
      {
        tags: ['crm','hubspot','salesforce','pipedrive','airtable','notion','zapier','make','n8n','integrate','integration','connect my tools','connect tools'],
        reply: "We integrate your existing tools — whether that's a CRM like HubSpot, Salesforce, or Pipedrive, project management tools, email platforms, or anything else. We build the connections so data flows automatically and nothing falls through the cracks."
      },

      /* ── Tappy NFC ─────────────────────────────────────── */
      {
        tags: ['tappy','nfc','google review','tap to review','review chip','review device','get more reviews','more google reviews','review automation','tap and review'],
        reply: "Tappy is a physical NFC chip you place in your venue. Customers tap their phone on it and leave a Google review in seconds — no app needed. The smart bit: positive reviews auto-publish to Google, but negative feedback comes only to you privately. Perfect for restaurants, cafés, shops, salons, and any customer-facing business."
      },

      /* ── Loyalti ────────────────────────────────────────── */
      {
        tags: ['loyalti','loyalty','loyalty program','loyalty programme','stamp card','digital stamp','reward','points','loyalty card','customer retention','keep customers','returning customers','repeat customers'],
        reply: "Loyalti replaces paper stamp cards with a smart digital loyalty programme. Customers collect rewards digitally — no app to download on their end. You get real data on your best customers and can automate rewards and re-engagement campaigns. It's a proper retention tool, not just a digital version of a paper card."
      },

      /* ── Customer Acquisition ───────────────────────────── */
      {
        tags: ['customer acquisition','get more customers','attract customers','find customers','lead generation','leads','generate leads','new customers','grow my customer base','outreach','targeted ads','advertising'],
        reply: "Our Customer Acquisition solution uses AI-powered tools to find, engage, and convert your ideal customers — from targeted ad campaigns to personalised outreach and automated lead generation. You define who your ideal customer is; we build the system to bring them in."
      },

      /* ── Sales ─────────────────────────────────────────── */
      {
        tags: ['sales','sales automation','sales pipeline','pipeline','proposals','automated proposals','sales forecasting','close deals','sales team','close more sales'],
        reply: "We automate your sales pipeline so your team spends time closing, not doing admin. That means automated proposals, intelligent follow-ups, CRM updates, and sales forecasting — all running without manual effort. Your pipeline manages itself."
      },

      /* ── Revenue ────────────────────────────────────────── */
      {
        tags: ['revenue','increase revenue','grow revenue','revenue optimisation','pricing','dynamic pricing','revenue analytics','maximise revenue','revenue strategy'],
        reply: "Our Revenue solutions focus on maximising every stream — AI-driven pricing models that adapt to demand, real-time revenue analytics, and automated growth strategies. We find where you're leaving money on the table and fix it."
      },

      /* ── Marketing ─────────────────────────────────────── */
      {
        tags: ['marketing','marketing automation','email marketing','campaigns','social media','content','a/b testing','personalised campaigns','dynamic content','marketing strategy','newsletter','email campaign'],
        reply: "We automate your marketing so campaigns run themselves. Hyper-personalised emails, A/B testing, dynamic content that adapts to your audience — all continuously optimised. You set the strategy, we build the engine that executes it 24/7."
      },

      /* ── Talent / HR ────────────────────────────────────── */
      {
        tags: ['talent','hr','human resources','recruitment','hiring','onboarding staff','employee onboarding','onboard employees','performance','staff management','team management'],
        reply: "Our Talent Management automation handles the heavy lifting for HR — recruitment workflows, automated interview scheduling, employee onboarding, and performance tracking. Your HR team focuses on people, not paperwork."
      },

      /* ── Operational Efficiency ─────────────────────────── */
      {
        tags: ['operational','operations','efficiency','invoicing','invoice','scheduling','supply chain','task scheduling','operational efficiency','bottleneck','eliminate bottleneck'],
        reply: "We eliminate operational bottlenecks — automated invoicing, task scheduling, supply chain management, and end-to-end process automation across your business. If it's repetitive and takes up time, we can automate it."
      },

      /* ── Pricing — general (NOT website-specific) ───────── */
      {
        tags: ['how much does it cost','how much do you charge','pricing','price','cost','fee','rates','how much','what does it cost','plan','plans','monthly plan','subscription'],
        reply: "Our pricing varies by project. The free website offer means zero upfront cost — you pay only if you love the result. Automation plans are quoted per project depending on what needs to be built. Drop us a message at hola@automify.xyz and we'll give you a clear quote with no pressure."
      },

      /* ── Results / proof ────────────────────────────────── */
      {
        tags: ['results','proof','case study','example','does it work','real results','client results','success','how successful','track record','no-show','40%','10 hours','48 hours'],
        reply: "Here's what we've delivered for real clients: a hospitality business reduced no-shows by 40% with booking automation; a professional services firm saved 10 admin hours every week; and every single client goes from signed to fully onboarded in under 48 hours. Results vary by business and setup, but these are real numbers from live projects."
      },

      /* ── Who we work with / sectors ────────────────────── */
      {
        tags: ['what industries','sectors','who do you work with','what businesses','hospitality','retail','restaurant','hotel','cafe','bar','shop','real estate','estate agent','ecommerce','e-commerce','services company'],
        reply: "We work with businesses across hospitality, retail, services, e-commerce, and real estate — primarily in the UK and Spain. If you run a business with repetitive tasks that eat up your time, we can help. Every solution is built custom for your specific setup."
      },

      /* ── UK / Spain ─────────────────────────────────────── */
      {
        tags: ['where are you based','where do you operate','uk','united kingdom','spain','españa','london','madrid','barcelona','do you work in','spanish','english','bilingual'],
        reply: "We operate in the UK and Spain and work with businesses of all sizes in both countries. Our team is bilingual (English & Spanish) and everything is handled remotely — so wherever you are, we can build and run your automation."
      },

      /* ── Technical knowledge needed ─────────────────────── */
      {
        tags: ['do i need technical','technical knowledge','tech knowledge','coding','code','developer','no tech','non-technical','not technical','easy to use'],
        reply: "None at all. You don't need any technical knowledge — ever. You fill in a brief about your brand and what you need, and we handle everything from design to development to delivery. No code, no tools, no learning curve required."
      },

      /* ── How it works / process ─────────────────────────── */
      {
        tags: ['how does it work','how do you work','process','what\'s the process','steps','how do i start','get started','next steps','where do i begin'],
        reply: "It starts with a free 15-min Discovery Call where we map out what your business needs. Then we build a custom solution, onboard you in under 48 hours, and provide ongoing monthly support so everything keeps improving. Want to book that call? → https://calendly.com/hola-automify/30min"
      },

      /* ── Support ────────────────────────────────────────── */
      {
        tags: ['support','ongoing support','after delivery','maintenance','what happens after','monthly support','after you build it','keep running'],
        reply: "We don't disappear after delivery. All our clients are on monthly plans that include continuous support — your automations keep improving alongside your business, and our team knows your setup inside out. You're never left to figure it out alone."
      },

      /* ── Approach / custom vs template ─────────────────── */
      {
        tags: ['custom','bespoke','template','generic','one size','tailored','specific to my business','built for me','not a template'],
        reply: "Everything we build is 100% custom — no templates, no generic setups. We map your existing processes, find the friction points, and build automation around how your business actually works. The result fits your business like it was built for it. Because it was."
      },

      /* ── Delivery time — general ────────────────────────── */
      {
        tags: ['how fast','how quickly','turnaround','delivery','timeline','when can you start','how soon','1-2 weeks','one week','two weeks'],
        reply: "Onboarding takes under 48 hours from signing. Most projects go live in 1–2 weeks. We move fast because every week you spend doing things manually is a week of lost time."
      },

      /* ── Book a call / contact ──────────────────────────── */
      {
        tags: ['book a call','book call','speak to someone','speak to an expert','talk to someone','schedule a call','meeting','calendly','discovery call','free call','get in touch','contact','reach you','email you','phone','whatsapp'],
        reply: "You can reach the team here:\n📧 hola@automify.xyz\n📞 UK: +44 7860 230825 | ES: +34 658 941 796\n📅 Book a free 15-min call: https://calendly.com/hola-automify/30min"
      },

      /* ── Thank you ──────────────────────────────────────── */
      {
        tags: ['thank','thanks','thank you','cheers','appreciated','helpful','great answer','good answer'],
        reply: "You're welcome! 😊 Feel free to ask anything else — or if you're ready to get started, book a free call with the team: https://calendly.com/hola-automify/30min"
      },

      /* ── Yes / interested ───────────────────────────────── */
      {
        tags: ['yes','yeah','yep','sure','interested','sounds good','i\'m interested','let\'s do it','want to proceed','ready'],
        reply: "Brilliant! The best next step is a free 15-min Discovery Call so we can understand your business and map out exactly what we'd build for you. Book here: https://calendly.com/hola-automify/30min — or drop us an email at hola@automify.xyz 📩"
      },

      /* ── No-shows / bookings ────────────────────────────── */
      {
        tags: ['no-show','no show','cancellation','reservation','booking','appointment','last minute cancel'],
        reply: "No-shows are a real problem — especially in hospitality. Our booking automation sends personalised reminders, handles confirmations, and follows up with no-shows automatically. One of our clients cut no-shows by 40%. We can build something similar for your business."
      }
    ],

    /* ═══════════════════════════════════════════════════════
       ESPAÑOL
    ═══════════════════════════════════════════════════════ */
    es: [

      /* ── Saludos ────────────────────────────────────────── */
      {
        tags: ['hola','buenas','buenos días','buenas tardes','buenas noches','hey','saludos','qué tal','ey '],
        reply: "¡Hola! 👋 Soy el asistente de Automify. Puedo contarte todo sobre nuestros servicios — webs gratis, chatbots con IA, automatización, Tappy, Loyalti y más. ¿Qué quieres saber?"
      },

      /* ── Qué es Automify ────────────────────────────────── */
      {
        tags: ['qué es automify','que es automify','quiénes sois','quienes sois','qué hacéis','que haceis','sobre automify','cuéntame sobre','cuentame sobre','a qué os dedicáis','a que os dedicais'],
        reply: "Automify es una agencia de automatización con inteligencia artificial que opera en España y el Reino Unido. Ayudamos a negocios a eliminar tareas repetitivas, ahorrar horas cada semana y crecer más rápido — con webs personalizadas, chatbots con IA, automatización de procesos y herramientas como Tappy y Loyalti. Todo se construye a medida para tu negocio, nunca desde plantillas."
      },

      /* ── Web gratis — general ───────────────────────────── */
      {
        tags: ['web gratis','página gratis','sitio gratis','web gratuita','quiero una web','necesito una web','hacer una web','crear una web','diseño web','página web','construir web','nueva web'],
        reply: "La oferta de web gratis es real — diseñamos y construimos una web profesional completamente personalizada sin coste inicial. Rellenas un briefing en 5 minutos, nuestro equipo la construye, y solo pagas cuando la ves y te encanta de verdad. Sin letra pequeña, sin contratos, sin riesgo. 🚀 ¿Empezamos? → https://www.automify.xyz/onboarding.html"
      },

      /* ── Precio web — SOLO si preguntan específicamente ─── */
      {
        tags: ['cuánto cuesta la web','cuanto cuesta la web','precio de la web','coste de la web','cuánto vale la web','cuanto vale la web','precio web','coste web','cuánto cobráis por la web','cuanto cobrar web'],
        reply: "En el 80% de los casos la inversión está entre 500€ y 800€. Solo sube de precio para webs con mucho tráfico o proyectos técnicamente complejos con muchas funcionalidades a medida. En cualquier caso, nunca pagas nada por adelantado — solo cuando la hayas visto y te encante."
      },

      /* ── Proceso web ────────────────────────────────────── */
      {
        tags: ['cómo funciona la web','como funciona la web','cómo consigo la web','como consigo la web','proceso web','pasos para la web','briefing','formulario','cómo empiezo','como empiezo'],
        reply: "El proceso tiene 3 pasos: 1️⃣ Rellenas un briefing rápido sobre tu marca (colores, fuentes, qué haces — menos de 5 minutos). 2️⃣ Nuestro equipo construye tu web a medida. 3️⃣ La ves, la amas, y entonces pagas. Empieza aquí: https://www.automify.xyz/onboarding.html"
      },

      /* ── Tiempo de entrega web ──────────────────────────── */
      {
        tags: ['cuánto tiempo tarda la web','cuanto tiempo tarda','en cuánto tiempo','cuando estará lista','plazo web','días para la web','entrega web'],
        reply: "La mayoría de webs se entregan en 5–7 días laborables desde que recibimos el briefing. Para proyectos más complejos con muchas páginas puede llevar un poco más — siempre te damos un plazo claro por adelantado."
      },

      /* ── No me gusta la web ─────────────────────────────── */
      {
        tags: ['qué pasa si no me gusta','que pasa si no me gusta','no me gusta la web','no estoy contento','no pago','sin riesgo web','si no me convence'],
        reply: "No pagas. Así de simple. Si no estás completamente satisfecho con lo que entregamos, no nos debes nada. Preferimos ganarnos tu confianza antes que tu dinero. Riesgo cero."
      },

      /* ── Chatbots ───────────────────────────────────────── */
      {
        tags: ['chatbot','bot','chat automático','asistente virtual','whatsapp bot','bot instagram','atención automática','respuestas automáticas','bot web','asistente ia'],
        reply: "Nuestros chatbots con IA trabajan 24/7 en tu web, WhatsApp e Instagram. Responden preguntas, cualifican leads automáticamente y agendan llamadas — sin necesidad de ningún humano. Ideal para negocios que reciben muchas consultas y quieren responder al instante a cualquier hora."
      },

      /* ── Automatización de procesos ─────────────────────── */
      {
        tags: ['automatización','automatizar','flujo de trabajo','workflow','automatizar mi negocio','automatización de procesos','tareas repetitivas','tareas manuales','ahorrar tiempo','eliminar admin'],
        reply: "La automatización de procesos es lo que mejor hacemos. Mapeamos tus procesos actuales, encontramos los cuellos de botella y construimos automatizaciones que conectan tus herramientas — CRM, email, calendario, facturación — para que todo fluya sin intervención manual. Nuestros clientes ahorran más de 10 horas semanales. 💪"
      },

      /* ── CRM / herramientas ─────────────────────────────── */
      {
        tags: ['crm','hubspot','salesforce','pipedrive','airtable','notion','zapier','make','integrar','integración','conectar herramientas','conectar mis herramientas'],
        reply: "Integramos tus herramientas existentes — ya sea un CRM como HubSpot, Salesforce o Pipedrive, herramientas de gestión de proyectos, plataformas de email o cualquier otra. Construimos las conexiones para que los datos fluyan automáticamente y nada se pierda."
      },

      /* ── Tappy ──────────────────────────────────────────── */
      {
        tags: ['tappy','nfc','reseña google','reseñas google','opiniones google','más reseñas','chip nfc','tocar para reseñar','review'],
        reply: "Tappy es un chip NFC físico que colocas en tu local. El cliente toca con el móvil y deja una reseña en Google en segundos — sin necesidad de ninguna app. Lo inteligente: las reseñas positivas se publican automáticamente en Google, pero el feedback negativo solo te llega a ti de forma privada. Perfecto para restaurantes, cafés, tiendas, salones y cualquier negocio con clientes presenciales."
      },

      /* ── Loyalti ────────────────────────────────────────── */
      {
        tags: ['loyalti','fidelización','programa de fidelización','tarjeta de sello','sello digital','puntos','recompensas','tarjeta de fidelidad','retención de clientes','clientes que vuelven','fidelizar clientes'],
        reply: "Loyalti reemplaza las tarjetas de sello en papel con un programa de fidelización digital inteligente. Los clientes acumulan recompensas de forma digital — sin app que descargar. Tú obtienes datos reales sobre tus mejores clientes y puedes automatizar recompensas y campañas de re-engagement. Es una herramienta de retención de verdad, no solo una versión digital de la tarjeta de papel."
      },

      /* ── Captación de clientes ──────────────────────────── */
      {
        tags: ['captación de clientes','captar clientes','conseguir clientes','atraer clientes','generación de leads','leads','generar leads','nuevos clientes','hacer crecer mi base de clientes','publicidad dirigida'],
        reply: "Nuestra solución de Captación de Clientes usa herramientas de IA para encontrar, captar y convertir a tus clientes ideales — desde campañas publicitarias dirigidas hasta contacto personalizado y generación automática de leads. Tú defines quién es tu cliente ideal; nosotros construimos el sistema para traerlos."
      },

      /* ── Ventas ─────────────────────────────────────────── */
      {
        tags: ['ventas','automatización de ventas','pipeline de ventas','pipeline','propuestas','propuestas automatizadas','previsión de ventas','cerrar ventas','equipo de ventas','más ventas'],
        reply: "Automatizamos tu pipeline de ventas para que tu equipo se dedique a cerrar, no a tareas administrativas. Eso significa propuestas automáticas, seguimientos inteligentes, actualizaciones del CRM y previsión de ventas — todo funcionando sin esfuerzo manual. Tu pipeline se gestiona solo."
      },

      /* ── Ingresos ───────────────────────────────────────── */
      {
        tags: ['ingresos','aumentar ingresos','crecer ingresos','optimización de ingresos','precios dinámicos','analítica de ingresos','maximizar ingresos','estrategia de ingresos'],
        reply: "Nuestras soluciones de Ingresos se centran en maximizar cada fuente — modelos de precios dinámicos con IA que se adaptan a la demanda, analítica de ingresos en tiempo real y estrategias de crecimiento automatizadas. Encontramos dónde estás dejando dinero sobre la mesa y lo arreglamos."
      },

      /* ── Marketing ──────────────────────────────────────── */
      {
        tags: ['marketing','automatización de marketing','email marketing','campañas','redes sociales','contenido','pruebas a/b','campañas personalizadas','contenido dinámico','estrategia de marketing','newsletter'],
        reply: "Automatizamos tu marketing para que las campañas se ejecuten solas. Emails hiper-personalizados, pruebas A/B, contenido dinámico que se adapta a tu audiencia — todo optimizándose continuamente. Tú marcas la estrategia; nosotros construimos el motor que la ejecuta 24/7."
      },

      /* ── Talento / RRHH ─────────────────────────────────── */
      {
        tags: ['talento','rrhh','recursos humanos','reclutamiento','contratación','onboarding empleados','incorporación empleados','rendimiento','gestión de personal','gestión del equipo'],
        reply: "Nuestra automatización de Gestión del Talento hace el trabajo pesado por RRHH — flujos de reclutamiento, programación automática de entrevistas, onboarding de empleados y seguimiento de rendimiento. Tu equipo de RRHH se centra en las personas, no en el papeleo."
      },

      /* ── Eficiencia operativa ───────────────────────────── */
      {
        tags: ['eficiencia operativa','operaciones','eficiencia','facturación','programación','cadena de suministro','cuello de botella','eliminar cuellos','gestión operativa'],
        reply: "Eliminamos los cuellos de botella operativos — facturación automatizada, programación de tareas, gestión de la cadena de suministro y automatización de procesos de extremo a extremo. Si es repetitivo y te consume tiempo, lo podemos automatizar."
      },

      /* ── Precio — general ───────────────────────────────── */
      {
        tags: ['cuánto cuesta','cuanto cuesta','precio','coste','costo','tarifas','planes','cuánto cobráis','cuanto cobrar','plan mensual','suscripción'],
        reply: "El precio varía según el proyecto. La web tiene coste cero por adelantado — solo pagas si te encanta el resultado. Los planes de automatización se presupuestan por proyecto según lo que haya que construir. Escríbenos a hola@automify.xyz y te damos un presupuesto claro sin ningún compromiso."
      },

      /* ── Resultados ─────────────────────────────────────── */
      {
        tags: ['resultados','pruebas','caso de éxito','ejemplo','funciona de verdad','clientes','éxito','historial','cancelaciones','40%','10 horas','48 horas'],
        reply: "Estos son resultados reales de nuestros clientes: un negocio de hostelería redujo las cancelaciones un 40% con automatización de reservas; una empresa de servicios profesionales ahorró 10 horas de admin cada semana; y todos los clientes pasan de firma a onboarding completo en menos de 48 horas. Son números reales de proyectos activos."
      },

      /* ── Sectores ───────────────────────────────────────── */
      {
        tags: ['sectores','qué sectores','con quién trabajáis','con quien trabajais','hostelería','hosteleria','restaurante','hotel','cafetería','bar','tienda','inmobiliaria','ecommerce','e-commerce','empresa de servicios'],
        reply: "Trabajamos con negocios de hostelería, retail, servicios, e-commerce e inmobiliaria — principalmente en España y el Reino Unido. Si tienes un negocio con tareas repetitivas que te consumen tiempo, podemos ayudarte. Cada solución se construye a medida para tu caso concreto."
      },

      /* ── UK / España ────────────────────────────────────── */
      {
        tags: ['dónde estáis','donde estais','españa','reino unido','uk','madrid','barcelona','sevilla','valencia','london','operáis en','operais en','español','inglés'],
        reply: "Operamos en España y el Reino Unido y trabajamos con negocios de todos los tamaños en los dos países. Nuestro equipo es bilingüe (inglés y español) y todo se gestiona de forma remota — estés donde estés, podemos construir y gestionar tu automatización."
      },

      /* ── Conocimientos técnicos ─────────────────────────── */
      {
        tags: ['necesito conocimientos técnicos','hay que saber programar','sin conocimientos','no sé de tecnología','no soy técnico','fácil de usar','simple'],
        reply: "Para nada. No necesitas ningún conocimiento técnico. Rellenas un briefing sobre tu marca y lo que necesitas, y nosotros nos encargamos de todo — diseño, desarrollo y entrega. Sin código, sin herramientas, sin curva de aprendizaje."
      },

      /* ── Cómo funciona / proceso general ───────────────── */
      {
        tags: ['cómo funciona','como funciona','proceso','cuál es el proceso','cual es el proceso','pasos','cómo empiezo','como empiezo','próximos pasos','próximo paso','por donde empiezo'],
        reply: "Todo empieza con una Discovery Call gratuita de 15 minutos donde mapeamos lo que necesita tu negocio. Después construimos la solución a medida, te hacemos el onboarding en menos de 48 horas y te damos soporte mensual continuo para que todo siga mejorando. ¿Reservamos esa llamada? → https://calendly.com/hola-automify/30min"
      },

      /* ── Soporte ────────────────────────────────────────── */
      {
        tags: ['soporte','qué pasa después','después de la entrega','mantenimiento','support','actualizaciones','seguimiento','plan mensual','después de construirlo'],
        reply: "No desaparecemos tras la entrega. Todos nuestros clientes tienen planes mensuales que incluyen soporte continuo — tus automatizaciones siguen mejorando junto con tu negocio, y nuestro equipo conoce tu configuración a fondo. Nunca te dejamos solo."
      },

      /* ── A medida / no plantillas ───────────────────────── */
      {
        tags: ['personalizado','a medida','plantilla','genérico','especifico para mi','construido para mi','sin plantillas','hecho a medida'],
        reply: "Todo lo que construimos es 100% personalizado — sin plantillas, sin configuraciones genéricas. Mapeamos tus procesos existentes, encontramos los puntos de fricción y construimos automatización en torno a cómo funciona tu negocio de verdad. El resultado encaja con tu negocio como si estuviera hecho para él. Porque lo está."
      },

      /* ── Contacto / hablar con el equipo ────────────────── */
      {
        tags: ['hablar con alguien','hablar con un experto','contactar','contacto','llamar','whatsapp','email','reunión','cita','reservar','calendly','ponerse en contacto'],
        reply: "Puedes contactar al equipo aquí:\n📧 hola@automify.xyz\n📞 ES: +34 658 941 796 | UK: +44 7860 230825\n📅 Reserva una llamada gratuita de 15 min: https://calendly.com/hola-automify/30min"
      },

      /* ── Gracias ─────────────────────────────────────────── */
      {
        tags: ['gracias','muchas gracias','thank you','perfecto','genial','muy útil','muy bien','me ha ayudado'],
        reply: "¡De nada! 😊 Si tienes más preguntas, aquí estoy. Y si estás listo para empezar, reserva una llamada gratuita con el equipo: https://calendly.com/hola-automify/30min"
      },

      /* ── Sí / interesado ─────────────────────────────────── */
      {
        tags: ['sí','si ','me interesa','interesado','suena bien','adelante','quiero proceder','estoy listo','vamos'],
        reply: "¡Genial! El mejor siguiente paso es una Discovery Call gratuita de 15 minutos para que podamos entender tu negocio y diseñar exactamente lo que necesitas. Reserva aquí: https://calendly.com/hola-automify/30min — o escríbenos a hola@automify.xyz 📩"
      },

      /* ── No-shows / reservas ─────────────────────────────── */
      {
        tags: ['no-show','cancelaciones','reservas','citas','último momento','recordatorio','confirmación'],
        reply: "Las cancelaciones de última hora son un gran problema, especialmente en hostelería. Nuestra automatización de reservas envía recordatorios personalizados, gestiona confirmaciones y hace seguimiento de los no-shows automáticamente. Uno de nuestros clientes redujo las cancelaciones un 40%. Podemos construir algo similar para tu negocio."
      }
    ]
  };

  /* ── Rule engine ──────────────────────────────────────── */
  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function getReply(text, lang) {
    var t = normalize(text);
    var rules = KB[lang] || KB.en;

    for (var i = 0; i < rules.length; i++) {
      var tags = rules[i].tags;
      for (var j = 0; j < tags.length; j++) {
        if (t.indexOf(normalize(tags[j])) !== -1) {
          return rules[i].reply;
        }
      }
    }

    // Fallback
    return lang === 'es'
      ? 'Buena pregunta — no tengo la respuesta exacta para eso, pero el equipo de Automify sí puede ayudarte. Escríbenos a hola@automify.xyz o llama al +34 658 941 796 y te lo resolvemos. 😊'
      : "Good question — I don't have the exact answer for that, but the Automify team can help. Email us at hola@automify.xyz or call +44 7860 230825 and we'll sort it out. 😊";
  }

  /* ── Build DOM ────────────────────────────────────────── */
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

  /* ── Toggle ───────────────────────────────────────────── */
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

  /* ── Welcome ──────────────────────────────────────────── */
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
        ? '¡Perfecto! Puedes preguntarme sobre nuestros servicios, precios, plazos, cómo funciona todo o cualquier otra cosa sobre Automify. ¿Qué quieres saber?'
        : 'Great! Feel free to ask me about our services, pricing, timelines, how everything works, or anything else about Automify. What would you like to know?');
    }, 280);
  }

  /* ── Send ─────────────────────────────────────────────── */
  function handleSend() {
    var inp = document.getElementById('cb-input');
    var text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    addUserMsg(text);

    if (S.exchanges >= S.MAX) {
      var es = getLang() === 'es';
      addBotMsg(es
        ? 'Para seguir hablando, contacta con nosotros directamente: hola@automify.xyz | +34 658 941 796'
        : 'To continue, reach us directly: hola@automify.xyz | +44 7860 230825');
      return;
    }

    S.exchanges++;
    addTyping();

    var lang = getLang();
    setTimeout(function () {
      removeTyping();
      addBotMsg(getReply(text, lang));
    }, 400 + Math.random() * 350);
  }

  /* ── Message helpers ──────────────────────────────────── */
  function addBotMsg(text) {
    var d = mkEl('div', { class: 'cb-msg cb-bot' });
    d.innerHTML = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">$1</a>');
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

  /* ── Utils ────────────────────────────────────────────── */
  function mkEl(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  function getLang() {
    return window.AutomifyI18n ? window.AutomifyI18n.getCurrentLang() : 'en';
  }

  /* ── Init ─────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
