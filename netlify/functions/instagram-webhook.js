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
    keywords: ['pricing', 'price', 'cost', 'quote', 'budget', 'how much', 'precio', 'cotización'],
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

// Comment keywords expressing intent to receive info. When matched (and the
// comment itself has no topic keyword), we fetch the post and reply with
// post-specific content or the post link.
const INTENT_KEYWORDS = [
  'info', 'details', 'more info', 'dm', 'interested',
  'send me', 'send it', 'link please', 'enlace', 'publicación',
];

// Post-caption-aware DMs: matched against the post's caption, not the comment.
const POST_DM_RULES = [
  {
    keywords: ['iso 27001', 'iso27001', 'isms'],
    reply:
      'Thanks for your interest! Our ISO 27001 gap analysis guide: https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-guide/ — free readiness checker: https://www.ogtechnologies.co/tools/iso-27001-gap-analysis/',
  },
  {
    keywords: ['iso 42001', 'iso42001', 'ai management'],
    reply:
      'Our ISO 42001 AI management guide: https://www.ogtechnologies.co/insights/iso-42001-ai-management-guide/ — free readiness check: https://www.ogtechnologies.co/tools/iso-42001-ai-readiness/',
  },
  {
    keywords: ['dora', 'resilience act'],
    reply:
      'DORA compliance resources: https://www.ogtechnologies.co/dora/ — plus our guide: https://www.ogtechnologies.co/insights/dora-crypto-web3-compliance/',
  },
  {
    keywords: ['ethereum', 'web3', 'blockchain', 'evm'],
    reply:
      'Free Ethereum toolkit (calldata decoder, ABI tools, converters): https://www.ogtechnologies.co/tools/ethereum-toolkit/',
  },
  {
    keywords: ['hl7', 'fhir'],
    reply:
      'Free HL7/FHIR tools: https://www.ogtechnologies.co/tools/hl7-parser/ and https://www.ogtechnologies.co/tools/fhir-validator/',
  },
  {
    keywords: ['iam', 'aws policy'],
    reply:
      'Free IAM policy validator: https://www.ogtechnologies.co/tools/iam-policy-validator/ — plus our IAM security patterns guide: https://www.ogtechnologies.co/insights/iam-policy-security-patterns/',
  },
  {
    keywords: ['iso 20022', 'iso20022', 'mt940', 'payments'],
    reply:
      'ISO 20022 migration guide: https://www.ogtechnologies.co/insights/iso-20022-migration-guide/ — free viewer: https://www.ogtechnologies.co/tools/iso-20022-viewer/',
  },
  {
    keywords: ['pdf'],
    reply:
      'Free PDF tools (merge, split, convert): https://www.ogtechnologies.co/tools/pdf-tools/',
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
      const normalized = text.toLowerCase();
      let reply = matchReply(text, REPLY_RULES);

      if (!reply && INTENT_KEYWORDS.some((k) => normalized.includes(k))) {
        const media = comment.media && comment.media.id ? await fetchMedia(comment.media.id) : null;
        reply =
          (media && media.caption && matchReply(media.caption, POST_DM_RULES)) ||
          (media && media.permalink &&
            `Here's the post you asked about: ${media.permalink} — and more at https://www.ogtechnologies.co/`);
      }

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

async function fetchMedia(mediaId) {
  const res = await fetch(
    `${GRAPH_API_BASE}/${mediaId}?fields=caption,permalink,media_type&access_token=${encodeURIComponent(IG_ACCESS_TOKEN)}`
  );
  if (!res.ok) {
    console.error(`Media fetch failed (${res.status}):`, await res.text());
    return null;
  }
  return res.json();
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
