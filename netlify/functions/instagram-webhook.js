const crypto = require('crypto');

const GRAPH_API_BASE = 'https://graph.instagram.com/v24.0';

const {
  META_VERIFY_TOKEN,
  META_APP_SECRET,
  IG_ACCESS_TOKEN,
  IG_ACCOUNT_ID,
} = process.env;

const DEFAULT_REPLY =
  "Thanks for reaching out to OG Technologies! We've received your message and will get back to you soon. In the meantime, you can explore our services at https://www.ogtechnologies.co/products/";

const REPLY_RULES = [
  {
    keywords: ['pricing', 'price', 'cost', 'quote', 'budget', 'how much'],
    reply:
      "Thanks for your interest! You can find our plans at https://www.ogtechnologies.co/pricing/ or request a custom quote at https://www.ogtechnologies.co/quote/",
  },
  {
    keywords: ['support', 'help', 'issue', 'problem', 'bug', 'broken', 'error'],
    reply:
      "Sorry you're running into trouble. Please open a ticket on our helpdesk and our team will assist you: https://www.ogtechnologies.co/helpdesk/",
  },
  {
    keywords: ['service', 'product', 'offer', 'what do you do', 'consulting'],
    reply:
      'We build software, blockchain, and compliance solutions for businesses. See everything we offer at https://www.ogtechnologies.co/products/',
  },
  {
    keywords: ['job', 'career', 'hiring', 'vacancy', 'work with you'],
    reply:
      "Great to hear! Check out our open positions at https://www.ogtechnologies.co/careers/",
  },
  {
    keywords: ['tool', 'free tool', 'pdf', 'validator'],
    reply:
      'We offer a range of free online tools — PDF utilities, validators, converters and more: https://www.ogtechnologies.co/tools/',
  },
];

// Comment-triggered DMs: comment a trigger word on a post, get a DM.
// No match = no DM (avoids spamming every commenter).
const COMMENT_DM_RULES = [
  {
    keywords: ['price', 'pricing', 'cost', 'quote', 'how much', 'precio'],
    reply:
      "Hey! Thanks for your comment — here's what you asked for: our plans are at https://www.ogtechnologies.co/pricing/ and you can request a custom quote at https://www.ogtechnologies.co/quote/. Feel free to reply here if you have questions!",
  },
  {
    keywords: ['info', 'details', 'more info', 'dm', 'interested'],
    reply:
      "Thanks for your interest! Here's more about what we do: https://www.ogtechnologies.co/products/ — and feel free to reply here anytime.",
  },
];

const COMMENT_PUBLIC_REPLY = 'Just sent you a DM! 📩';

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') return handleVerification(event);
  if (event.httpMethod === 'POST') return handleEvent(event);
  return { statusCode: 405, body: 'Method Not Allowed' };
};

function handleVerification(event) {
  const params = event.queryStringParameters || {};
  const mode = params['hub.mode'];
  const token = params['hub.verify_token'];
  const challenge = params['hub.challenge'];

  if (mode === 'subscribe' && token === META_VERIFY_TOKEN && challenge) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: challenge,
    };
  }
  return { statusCode: 403, body: 'Forbidden' };
}

async function handleEvent(event) {
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body || '';

  if (!verifySignature(rawBody, event.headers['x-hub-signature-256'])) {
    return { statusCode: 401, body: 'Invalid signature' };
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  if (payload.object !== 'instagram') {
    return { statusCode: 404, body: 'Not Found' };
  }

  try {
    await processEntries(payload.entry || []);
  } catch (err) {
    console.error('Error processing webhook entries:', err);
  }

  return { statusCode: 200, body: 'EVENT_RECEIVED' };
}

function verifySignature(rawBody, signatureHeader) {
  if (!META_APP_SECRET || !signatureHeader) return false;
  const expected =
    'sha256=' +
    crypto.createHmac('sha256', META_APP_SECRET).update(rawBody, 'utf8').digest('hex');
  const received = Buffer.from(signatureHeader);
  const expectedBuf = Buffer.from(expected);
  return received.length === expectedBuf.length && crypto.timingSafeEqual(received, expectedBuf);
}

async function processEntries(entries) {
  for (const entry of entries) {
    for (const event of entry.messaging || []) {
      const senderId = event.sender && event.sender.id;
      const message = event.message;

      // Skip echoes of our own replies (prevents infinite reply loops),
      // messages we sent, and non-text events (attachments, reactions, seen).
      if (!senderId || !message || message.is_echo) continue;
      if (senderId === IG_ACCOUNT_ID) continue;

      const text = (message.text || '').trim();
      if (!text) continue;

      const reply = matchReply(text, REPLY_RULES) || DEFAULT_REPLY;
      await sendMessage({ id: senderId }, reply);
    }

    for (const change of entry.changes || []) {
      if (change.field !== 'comments') continue;
      const comment = change.value || {};
      const from = comment.from || {};

      // Skip comments without an id, and our own comments (prevents reply loops).
      if (!comment.id || !from.id || from.id === IG_ACCOUNT_ID) continue;

      const text = (comment.text || '').trim();
      const reply = matchReply(text, COMMENT_DM_RULES);
      if (!reply) continue;

      const sent = await sendMessage({ comment_id: comment.id }, reply);
      if (sent) await replyToComment(comment.id);
    }
  }
}

function matchReply(text, rules) {
  const normalized = text.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.reply;
    }
  }
  return null;
}

async function sendMessage(recipient, text) {
  const res = await fetch(`${GRAPH_API_BASE}/me/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient,
      message: { text },
      access_token: IG_ACCESS_TOKEN,
    }),
  });

  if (!res.ok) {
    console.error(`Graph API send failed (${res.status}):`, await res.text());
  } else {
    console.log(`Reply sent to ${JSON.stringify(recipient)}`);
  }
  return res.ok;
}

async function replyToComment(commentId) {
  const res = await fetch(`${GRAPH_API_BASE}/${commentId}/replies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: COMMENT_PUBLIC_REPLY,
      access_token: IG_ACCESS_TOKEN,
    }),
  });

  if (!res.ok) {
    console.error(`Comment reply failed (${res.status}):`, await res.text());
  } else {
    console.log(`Public reply posted on comment ${commentId}`);
  }
}
