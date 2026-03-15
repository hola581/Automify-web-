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

  if (!message.trim()) return res.status(400).json({ reply: 'Empty message.' });

  var system =
    'You are Automify\'s concise sales assistant. ' +
    'Automify automates business tasks for ANY sector (hospitality, retail, services, e-commerce, real estate, etc.) in UK and Spain.\n\n' +
    'Services: Custom websites (£500-£800 typical, up to £2000 only for very high-traffic or technically complex sites), ' +
    'AI Chatbots, Workflow Automation, Tappy NFC, Loyalti.\n\n' +
    'Results: -40% no-shows for hospitality client. 10h/week saved for services client.\n\n' +
    'Rules:\n' +
    '- MAX 40 WORDS per reply. No exceptions. Be direct and expert.\n' +
    '- Match user language (English or Spanish).\n' +
    '- Goal: capture email or phone number, then offer 15-min Discovery Call: https://calendly.com/hola-automify/30min\n' +
    '- NEVER share the Calendly link before capturing email or phone.\n' +
    '- If you don\'t know something or it\'s off-topic: give contact directly → hola@automify.xyz | UK: +44 7860 230825 | ES: +34 658 941 796\n' +
    (sector ? '\nUser\'s sector: ' + sector : '');

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
        max_tokens: 120,
        system: system,
        messages: messages
      })
    });

    var data = await resp.json();
    if (!resp.ok) throw new Error(data.error ? data.error.message : 'API error');
    res.status(200).json({ reply: data.content[0].text });

  } catch (e) {
    res.status(200).json({ reply: 'For help contact us: hola@automify.xyz | +44 7860 230825' });
  }
};
