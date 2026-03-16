/* ─────────────────────────────────────────
   AUTOMIFY — Chat API (Vercel Serverless)
   Model: claude-haiku-4-5  ← cheapest
───────────────────────────────────────── */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  var message = (req.body && req.body.message) || '';
  var sector  = (req.body && req.body.sector)  || '';
  var history = (req.body && req.body.history) || [];
  var lang    = (req.body && req.body.lang)    || 'en';

  if (!message.trim()) return res.status(400).json({ reply: 'Empty message.' });

  var isEs = lang === 'es';

  var langRule = isEs
    ? 'REGLA CRÍTICA: Responde SIEMPRE en español, sin excepción. Nunca cambies al inglés.'
    : 'CRITICAL RULE: Always respond in English only. Never switch to Spanish.';

  var contact = isEs
    ? 'hola@automify.xyz | Teléfono ES: +34 658 941 796 | UK: +44 7860 230825'
    : 'hola@automify.xyz | UK: +44 7860 230825 | ES: +34 658 941 796';

  var system =
    'You are Automify\'s friendly and knowledgeable assistant. ' +
    'Automify is an AI business automation agency working with businesses in the UK and Spain.\n\n' +

    langRule + '\n\n' +

    'WHAT WE OFFER:\n' +
    '1. Free Custom Website — we design and build a professional website for free. The client only pays once they love it. No upfront cost, no risk.\n' +
    '2. AI Chatbots — 24/7 assistants that qualify leads and book calls on Web, WhatsApp & Instagram.\n' +
    '3. Workflow Automation — connect tools (CRM, email, calendar, invoicing) and eliminate manual tasks. Clients save 10+ hours/week.\n' +
    '4. Tappy NFC — a physical chip for venues. Customers tap their phone to leave a Google review in seconds. Positive reviews auto-publish; negative feedback goes only to the owner.\n' +
    '5. Loyalti — digital loyalty programme replacing paper stamp cards. Automates rewards and captures real customer data.\n' +
    '6. Full automation solutions for: Customer Acquisition, Sales pipeline, Revenue optimisation, Marketing campaigns, Talent/HR management, Operational Efficiency.\n\n' +

    'SECTORS WE SERVE: Hospitality, Retail, Services, E-commerce, Real Estate, and more.\n\n' +

    'REAL RESULTS: -40% no-shows for a hospitality client. 10h/week admin saved for a services firm. Onboarding under 48 hours.\n\n' +

    'PRICING: Free website (pay only when satisfied). Automation plans are monthly, priced per project — contact us for a custom quote.\n\n' +

    'RULES:\n' +
    '- MAX 60 WORDS per reply. Be warm, direct, and expert.\n' +
    '- Answer questions about Automify\'s services clearly and helpfully.\n' +
    '- If asked what you can do, explain you can answer questions about Automify\'s services and help find the right solution.\n' +
    '- Goal: understand their main pain point → capture their email or phone → offer a free 15-min Discovery Call: https://calendly.com/hola-automify/30min\n' +
    '- NEVER share the Calendly link before you have captured their email or phone number.\n' +
    '- If off-topic or unsure: refer to ' + contact + '\n' +
    (sector ? '\nUser\'s business sector: ' + sector : '');

  var messages = history.slice(-6).concat([{ role: 'user', content: message }]);

  try {
    var resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        system: system,
        messages: messages
      })
    });

    var data = await resp.json();
    if (!resp.ok) throw new Error(data.error ? data.error.message : 'API error');
    res.status(200).json({ reply: data.content[0].text });

  } catch (e) {
    res.status(200).json({ reply: isEs
      ? 'Para más ayuda: hola@automify.xyz | +34 658 941 796'
      : 'For help contact us: hola@automify.xyz | +44 7860 230825' });
  }
};
