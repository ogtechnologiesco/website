# Security Policy

## Supported Versions

This repository contains the OG Technologies EU corporate website, deployed
continuously from `main` to Netlify. Only the latest deployed version is
supported — there are no maintained release branches.

| Version | Supported |
| ------- | --------- |
| latest (main) | :white_check_mark: |

## Reporting a Vulnerability

Please report security vulnerabilities by email to
**hi@ogtechnologies.co**.

Do **not** open a public GitHub issue for security reports.

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce, or a proof of concept
- Affected URL(s), endpoint(s), or component(s)

You can expect an acknowledgment within 48 hours. We will investigate
legitimate reports and keep you informed of progress toward a fix.
Reporters may be credited publicly if desired.

This policy is also published at
[/.well-known/security.txt](https://www.ogtechnologies.co/.well-known/security.txt).

## Scope

In scope:

- The public website at `https://www.ogtechnologies.co` (this repository)
- The backend API at `https://og-technologies.herokuapp.com`
- Authentication, subscription/payment flows, CRM, and helpdesk features

Out of scope:

- Vulnerabilities in third-party services (Stripe, Netlify, Heroku, etc.) —
  report those to the respective vendor
- Denial-of-service or rate-limiting issues that require no exploit
- Findings from automated scanners without a demonstrated exploit path
- Social engineering or phishing attacks

## Security Architecture Notes

- Security headers (CSP, HSTS, X-Frame-Options) are defined in
  `public/_headers`
- Authentication uses JWT tokens stored in `localStorage`; session handling
  lives in `src/services/api.jsx` and `src/contexts/AuthContext.jsx`
- Payments are handled via Stripe — no card data touches our servers
- Dependency vulnerabilities are tracked via GitHub Dependabot alerts
