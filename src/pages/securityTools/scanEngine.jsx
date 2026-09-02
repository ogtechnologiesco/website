const CORS_PROXIES = [
  (url) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://thingproxy.freeboard.io/fetch/${url}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

const SENSITIVE_PATHS = [
  '/.git/HEAD',
  '/.env',
  '/.git/config',
  '/backup/',
  '/admin/',
  '/.htaccess',
  '/wp-config.php',
  '/config.php',
  '/.DS_Store',
  '/robots.txt',
];

function parseHeaders(headerString) {
  const headers = {};
  if (!headerString) return headers;
  const lines = headerString.split('\r\n');
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      headers[key] = value;
    }
  }
  return headers;
}

function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
}

async function fetchViaProxies(url, timeoutMs = 20000) {
  let lastError = null;

  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxyUrl = CORS_PROXIES[i](url);
    try {
      const response = await fetchWithTimeout(proxyUrl, { method: 'GET' }, timeoutMs);

      if (!response.ok) {
        lastError = new Error(`Proxy returned HTTP ${response.status}`);
        continue;
      }

      const text = await response.text();

      const headerObj = {};
      response.headers.forEach((value, key) => {
        headerObj[key.toLowerCase()] = value;
      });

      return { text, headers: headerObj, status: response.status };
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('All CORS proxies failed');
}

async function fetchViaCorsProxy(url) {
  try {
    const { text, headers, status } = await fetchViaProxies(url, 20000);
    return { html: text, headers, status };
  } catch (err) {
    throw new Error(`All CORS proxies failed. Last error: ${err.message || 'unknown'}`);
  }
}

async function checkDirectoryListing(baseUrl) {
  const results = [];
  const isHttps = baseUrl.startsWith('https://');
  const origin = new URL(baseUrl).origin;

  for (const path of SENSITIVE_PATHS) {
    const targetUrl = origin + path;
    try {
      const { text, status } = await fetchViaProxies(targetUrl, 10000);

      if (path === '/robots.txt') {
        if (status >= 200 && status < 400) {
          const sensitivePatterns = [/Disallow:\s*\/admin/i, /Disallow:\s*\/backup/i, /Disallow:\s*\/private/i];
          const hasSensitive = sensitivePatterns.some((p) => p.test(text));
          if (hasSensitive) {
            results.push({
              id: 'robots-sensitive',
              title: 'robots.txt exposes sensitive paths',
              owaspCategory: 'A01:2021 – Broken Access Control',
              severity: 'low',
              status: 'warn',
              description: 'The robots.txt file disallows paths that may reveal sensitive directories to attackers.',
              remediation: 'Ensure sensitive paths are not listed in robots.txt. Use authentication instead of robots.txt for access control.',
            });
          }
        }
        continue;
      }

      if (status >= 200 && status < 400) {
        const looksLikeListing = /<title>Index of/i.test(text) || text.includes('Directory listing for');

        const isHtmlPage = /<html|<!doctype html|<head|<body/i.test(text);
        const isSoft404 = isHtmlPage && /404|not found|page not found/i.test(text);

        let looksLikeConfig = false;
        if (!isSoft404) {
          if (path === '/.env') {
            looksLikeConfig = /^[A-Z_]+=\s*\S+/m.test(text) && !isHtmlPage;
          } else if (path === '/.git/config') {
            looksLikeConfig = /\[core\]/i.test(text) && /repositoryformatversion/i.test(text);
          } else if (path === '/wp-config.php' || path === '/config.php') {
            looksLikeConfig = /<\?php/i.test(text) && /(DB_|DATABASE|mysql_connect|require)/i.test(text);
          } else if (path === '/.htaccess') {
            looksLikeConfig = /^(RewriteRule|RewriteCond|AuthType|Deny|Allow|Options|SetEnv)/im.test(text);
          }
        }

        let looksLikeGit = false;
        if (path.startsWith('/.git/') && !isSoft404) {
          if (path === '/.git/HEAD') {
            looksLikeGit = /^ref:\s*refs\/heads\//m.test(text) || /^[0-9a-f]{40}/m.test(text);
          } else {
            looksLikeGit = text.length > 0 && !isHtmlPage;
          }
        }

        if (looksLikeListing || looksLikeConfig || looksLikeGit) {
          results.push({
            id: `dir-${path}`,
            title: `Sensitive path exposed: ${path}`,
            owaspCategory: 'A01:2021 – Broken Access Control',
            severity: looksLikeConfig || looksLikeGit ? 'critical' : 'high',
            status: 'fail',
            description: `The path ${path} is publicly accessible and returns content matching the expected file format. This could expose sensitive configuration or source code.`,
            remediation: `Restrict access to ${path}. For .git, remove it from the web root. For config files, move them outside the web root or block via server configuration.`,
          });
        }
      }
    } catch {
      // All proxies failed for this path — treat as not accessible (good)
    }
  }

  return results;
}

function checkHttps(url, headers) {
  const results = [];
  const isHttps = url.startsWith('https://');

  if (!isHttps) {
    results.push({
      id: 'https-enforcement',
      title: 'Site not served over HTTPS',
      owaspCategory: 'A02:2021 – Cryptographic Failures',
      severity: 'critical',
      status: 'fail',
      description: 'The URL is not using HTTPS. All traffic should be encrypted to protect data in transit.',
      remediation: 'Obtain an SSL/TLS certificate (e.g., via Let\'s Encrypt) and configure your server to serve all content over HTTPS. Set up HTTP-to-HTTPS redirects.',
    });
  } else {
    results.push({
      id: 'https-enforcement',
      title: 'Site served over HTTPS',
      owaspCategory: 'A02:2021 – Cryptographic Failures',
      severity: 'info',
      status: 'pass',
      description: 'The URL is using HTTPS. Traffic is encrypted.',
      remediation: 'Continue enforcing HTTPS. Ensure HSTS is enabled for additional protection.',
    });
  }

  return results;
}

function checkHSTS(headers) {
  const hsts = headers['strict-transport-security'];
  if (!hsts) {
    return {
      id: 'hsts',
      title: 'Missing Strict-Transport-Security (HSTS) header',
      owaspCategory: 'A02:2021 – Cryptographic Failures',
      severity: 'medium',
      status: 'fail',
      description: 'HSTS is not set. Without it, browsers may allow HTTPS downgrade attacks.',
      remediation: 'Add the header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
    };
  }

  const maxAgeMatch = hsts.match(/max-age=(\d+)/);
  const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;
  const hasIncludeSubDomains = /includeSubDomains/i.test(hsts);
  const hasPreload = /preload/i.test(hsts);

  if (maxAge < 15552000) {
    return {
      id: 'hsts',
      title: 'HSTS max-age is too short',
      owaspCategory: 'A02:2021 – Cryptographic Failures',
      severity: 'low',
      status: 'warn',
      description: `HSTS is set but max-age is ${maxAge} seconds (less than 6 months recommended).`,
      remediation: 'Increase max-age to at least 31536000 (1 year). Consider adding includeSubDomains and preload.',
    };
  }

  const notes = [];
  if (!hasIncludeSubDomains) notes.push('consider adding includeSubDomains');
  if (!hasPreload) notes.push('consider adding preload');

  return {
    id: 'hsts',
    title: 'Strict-Transport-Security (HSTS) header present',
    owaspCategory: 'A02:2021 – Cryptographic Failures',
    severity: 'info',
    status: notes.length > 0 ? 'warn' : 'pass',
    description: `HSTS is set with max-age=${maxAge}.${notes.length > 0 ? ' ' + notes.join('; ') + '.' : ''}`,
    remediation: notes.length > 0 ? `HSTS is good. For stronger protection: ${notes.join('; ')}.` : 'HSTS is properly configured.',
  };
}

function checkCSP(headers) {
  const csp = headers['content-security-policy'];
  if (!csp) {
    return {
      id: 'csp',
      title: 'Missing Content-Security-Policy (CSP) header',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'high',
      status: 'fail',
      description: 'CSP is not set. Without it, the site is more vulnerable to XSS and data injection attacks.',
      remediation: 'Add a Content-Security-Policy header. Start with: Content-Security-Policy: default-src \'self\'; then refine per your needs.',
    };
  }

  const hasUnsafeInline = /unsafe-inline/i.test(csp);
  const hasUnsafeEval = /unsafe-eval/i.test(csp);
  const hasWildcard = /\*/.test(csp);

  if (hasUnsafeInline || hasUnsafeEval || hasWildcard) {
    const issues = [];
    if (hasUnsafeInline) issues.push('unsafe-inline');
    if (hasUnsafeEval) issues.push('unsafe-eval');
    if (hasWildcard) issues.push('wildcard (*) sources');
    return {
      id: 'csp',
      title: 'Content-Security-Policy is weak',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'medium',
      status: 'warn',
      description: `CSP is present but uses ${issues.join(', ')}, which weakens protection against XSS.`,
      remediation: 'Remove unsafe-inline, unsafe-eval, and wildcards from your CSP. Use nonces or hashes for inline scripts/styles.',
    };
  }

  return {
    id: 'csp',
    title: 'Content-Security-Policy (CSP) header present',
    owaspCategory: 'A05:2021 – Security Misconfiguration',
    severity: 'info',
    status: 'pass',
    description: 'CSP is set and does not use unsafe-inline, unsafe-eval, or wildcards.',
    remediation: 'CSP is properly configured. Regularly review and tighten directives as needed.',
  };
}

function checkXContentTypeOptions(headers) {
  const header = headers['x-content-type-options'];
  if (!header || !/nosniff/i.test(header)) {
    return {
      id: 'x-content-type-options',
      title: 'Missing X-Content-Type-Options header',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'medium',
      status: 'fail',
      description: 'X-Content-Type-Options is not set to nosniff. Browsers may MIME-sniff content, leading to security issues.',
      remediation: 'Add the header: X-Content-Type-Options: nosniff',
    };
  }
  return {
    id: 'x-content-type-options',
    title: 'X-Content-Type-Options header present',
    owaspCategory: 'A05:2021 – Security Misconfiguration',
    severity: 'info',
    status: 'pass',
    description: 'X-Content-Type-Options is set to nosniff.',
    remediation: 'Header is properly configured.',
  };
}

function checkFrameProtection(headers) {
  const xFrameOptions = headers['x-frame-options'];
  const csp = headers['content-security-policy'];
  const cspFrameAncestors = csp && /frame-ancestors/i.test(csp);

  if (!xFrameOptions && !cspFrameAncestors) {
    return {
      id: 'frame-protection',
      title: 'Missing clickjacking protection',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'medium',
      status: 'fail',
      description: 'Neither X-Frame-Options nor CSP frame-ancestors is set. The site could be embedded in iframes for clickjacking attacks.',
      remediation: 'Add X-Frame-Options: DENY or set CSP frame-ancestors directive (e.g., frame-ancestors \'none\').',
    };
  }

  return {
    id: 'frame-protection',
    title: 'Clickjacking protection present',
    owaspCategory: 'A05:2021 – Security Misconfiguration',
    severity: 'info',
    status: 'pass',
    description: `${xFrameOptions ? 'X-Frame-Options' : 'CSP frame-ancestors'} is set, protecting against clickjacking.`,
    remediation: 'Protection is in place. CSP frame-ancestors is preferred over X-Frame-Options for modern browsers.',
  };
}

function checkReferrerPolicy(headers) {
  const policy = headers['referrer-policy'];
  if (!policy) {
    return {
      id: 'referrer-policy',
      title: 'Missing Referrer-Policy header',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'low',
      status: 'fail',
      description: 'Referrer-Policy is not set. Referrer information may leak to third-party sites.',
      remediation: 'Add the header: Referrer-Policy: strict-origin-when-cross-origin',
    };
  }

  const weakPolicies = ['unsafe-url', 'no-referrer-when-downgrade'];
  if (weakPolicies.some((p) => policy.toLowerCase().includes(p))) {
    return {
      id: 'referrer-policy',
      title: 'Weak Referrer-Policy',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'low',
      status: 'warn',
      description: `Referrer-Policy is set to "${policy}" which may leak full URLs to third parties.`,
      remediation: 'Use a stricter policy: Referrer-Policy: strict-origin-when-cross-origin or no-referrer.',
    };
  }

  return {
    id: 'referrer-policy',
    title: 'Referrer-Policy header present',
    owaspCategory: 'A05:2021 – Security Misconfiguration',
    severity: 'info',
    status: 'pass',
    description: `Referrer-Policy is set to "${policy}".`,
    remediation: 'Referrer-Policy is properly configured.',
  };
}

function checkPermissionsPolicy(headers) {
  const policy = headers['permissions-policy'] || headers['feature-policy'];
  if (!policy) {
    return {
      id: 'permissions-policy',
      title: 'Missing Permissions-Policy header',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'low',
      status: 'fail',
      description: 'Permissions-Policy is not set. Browser features (camera, microphone, geolocation) are not restricted.',
      remediation: 'Add a Permissions-Policy header to restrict browser features. Example: Permissions-Policy: camera=(), microphone=(), geolocation=()',
    };
  }
  return {
    id: 'permissions-policy',
    title: 'Permissions-Policy header present',
    owaspCategory: 'A05:2021 – Security Misconfiguration',
    severity: 'info',
    status: 'pass',
    description: `Permissions-Policy is set: "${policy}".`,
    remediation: 'Permissions-Policy is configured. Review and restrict unnecessary features.',
  };
}

function checkInfoDisclosure(headers) {
  const results = [];
  const serverHeader = headers['server'];
  const xPoweredBy = headers['x-powered-by'];

  if (serverHeader && /\d/.test(serverHeader)) {
    results.push({
      id: 'server-disclosure',
      title: 'Server header reveals version information',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'low',
      status: 'warn',
      description: `The Server header is "${serverHeader}", which includes version information that helps attackers target known vulnerabilities.`,
      remediation: 'Configure your web server to suppress version information in the Server header.',
    });
  }

  if (xPoweredBy) {
    results.push({
      id: 'x-powered-by',
      title: 'X-Powered-By header reveals technology stack',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'low',
      status: 'warn',
      description: `X-Powered-By is set to "${xPoweredBy}", revealing your technology stack to potential attackers.`,
      remediation: 'Remove or obscure the X-Powered-By header in your application server configuration.',
    });
  }

  if (results.length === 0) {
    results.push({
      id: 'info-disclosure',
      title: 'No version information leaked in headers',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'info',
      status: 'pass',
      description: 'Server and X-Powered-By headers do not reveal version information.',
      remediation: 'Continue keeping version information hidden.',
    });
  }

  return results;
}

function checkCookieSecurity(headers) {
  const results = [];
  const setCookie = headers['set-cookie'];

  if (!setCookie) {
    return [{
      id: 'cookies',
      title: 'No cookies set by the server',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      severity: 'info',
      status: 'pass',
      description: 'The response does not set any cookies. No cookie security concerns detected.',
      remediation: 'No action needed. When setting cookies in the future, always use Secure, HttpOnly, and SameSite attributes.',
    }];
  }

  const cookies = setCookie.split(/,(?=\s*[a-zA-Z0-9_-]+=)/);

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const nameMatch = cookie.match(/^([^=]+)/);
    const name = nameMatch ? nameMatch[1].trim() : `cookie-${i}`;
    const hasSecure = /secure/i.test(cookie);
    const hasHttpOnly = /httponly/i.test(cookie);
    const hasSameSite = /samesite=/i.test(cookie);

    const missing = [];
    if (!hasSecure) missing.push('Secure');
    if (!hasHttpOnly) missing.push('HttpOnly');
    if (!hasSameSite) missing.push('SameSite');

    if (missing.length > 0) {
      results.push({
        id: `cookie-${name}`,
        title: `Cookie "${name}" missing security flags: ${missing.join(', ')}`,
        owaspCategory: 'A05:2021 – Security Misconfiguration',
        severity: missing.includes('Secure') || missing.includes('HttpOnly') ? 'medium' : 'low',
        status: 'fail',
        description: `The cookie "${name}" is missing the following security flags: ${missing.join(', ')}.`,
        remediation: `Set all security flags on this cookie: ${missing.map((f) => f).join('; ')}. Example: Set-Cookie: ${name}=value; Secure; HttpOnly; SameSite=Strict`,
      });
    } else {
      results.push({
        id: `cookie-${name}`,
        title: `Cookie "${name}" has all security flags`,
        owaspCategory: 'A05:2021 – Security Misconfiguration',
        severity: 'info',
        status: 'pass',
        description: `Cookie "${name}" has Secure, HttpOnly, and SameSite attributes set.`,
        remediation: 'Cookie is properly secured.',
      });
    }
  }

  return results;
}

function checkMixedContent(html, pageUrl) {
  if (!pageUrl.startsWith('https://')) {
    return {
      id: 'mixed-content',
      title: 'Mixed content check skipped (non-HTTPS URL)',
      owaspCategory: 'A02:2021 – Cryptographic Failures',
      severity: 'info',
      status: 'pass',
      description: 'Mixed content is only relevant for HTTPS pages. This URL is not HTTPS.',
      remediation: 'Switch to HTTPS to enable mixed content protection.',
    };
  }

  const httpResources = [];
  const patterns = [
    /src=["'](http:\/\/[^"']+)["']/gi,
    /href=["'](http:\/\/[^"']+)["']/gi,
    /url\((http:\/\/[^)]+)\)/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      httpResources.push(match[1]);
    }
  }

  if (httpResources.length > 0) {
    return {
      id: 'mixed-content',
      title: `Mixed content detected (${httpResources.length} HTTP resources)`,
      owaspCategory: 'A02:2021 – Cryptographic Failures',
      severity: 'medium',
      status: 'fail',
      description: `The HTTPS page loads ${httpResources.length} resource(s) over HTTP. This can allow man-in-the-middle attacks on those resources.`,
      remediation: 'Update all resource URLs to use HTTPS. Common sources: images, scripts, stylesheets, and fonts loaded via http://.',
    };
  }

  return {
    id: 'mixed-content',
    title: 'No mixed content detected',
    owaspCategory: 'A02:2021 – Cryptographic Failures',
    severity: 'info',
    status: 'pass',
    description: 'All resources on the HTTPS page appear to use secure protocols.',
    remediation: 'Continue ensuring all resources are loaded over HTTPS.',
  };
}

function generateSummary(results) {
  const counts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  const statusCounts = { pass: 0, fail: 0, warn: 0 };

  for (const r of results) {
    counts[r.severity] = (counts[r.severity] || 0) + 1;
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
  }

  let score = 100;
  score -= counts.critical * 25;
  score -= counts.high * 15;
  score -= counts.medium * 8;
  score -= counts.low * 3;
  score = Math.max(0, Math.min(100, score));

  let grade;
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';
  else grade = 'F';

  return { score, grade, counts, statusCounts, total: results.length };
}

export async function runScan(url) {
  const normalizedUrl = url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;

  const { html, headers, status } = await fetchViaCorsProxy(normalizedUrl);

  const results = [];

  results.push(...checkHttps(normalizedUrl, headers));
  results.push(checkHSTS(headers));
  results.push(checkCSP(headers));
  results.push(checkXContentTypeOptions(headers));
  results.push(checkFrameProtection(headers));
  results.push(checkReferrerPolicy(headers));
  results.push(checkPermissionsPolicy(headers));
  results.push(...checkInfoDisclosure(headers));
  results.push(...checkCookieSecurity(headers));
  results.push(checkMixedContent(html, normalizedUrl));

  const dirResults = await checkDirectoryListing(normalizedUrl);
  results.push(...dirResults);

  const summary = generateSummary(results);

  return { results, summary, scannedUrl: normalizedUrl, status };
}

export function validateUrl(url) {
  try {
    const normalized = url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
    const parsed = new URL(normalized);
    return parsed.hostname.includes('.') ? normalized : null;
  } catch {
    return null;
  }
}
