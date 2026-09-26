import { defineConfig } from 'vite'
import path from 'path'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import vitePrerender, { PuppeteerRenderer } from 'vite-plugin-prerender'
import viteImagemin from 'vite-plugin-imagemin'

const routeMeta = {
  '/': {
    title: 'OG Technologies EU - Web3 & Blockchain Innovation',
    description: 'Transforming businesses through Web3 and blockchain innovation. Enterprise solutions for the decentralized future.',
    jsonLd: [{"@context": "https://schema.org", "@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co", "logo": "https://www.ogtechnologies.co/og-og-image.png", "description": "Transforming businesses through Web3 and blockchain innovation. Enterprise solutions for the decentralized future.", "address": {"@type": "PostalAddress", "addressCountry": "AT", "addressRegion": "Vienna"}, "contactPoint": {"@type": "ContactPoint", "email": "hi@ogtechnologies.co", "contactType": "sales", "areaServed": "Worldwide"}, "sameAs": ["https://www.linkedin.com/company/ogtechnologieseu"], "knowsAbout": ["Blockchain", "Web3", "Decentralized Applications", "Verifiable Credentials", "Digital Identity", "Stellar", "DeFi", "Enterprise Solutions", "ISO Standards", "CRM Systems"]}, {"@context": "https://schema.org", "@type": "VideoObject", "name": "OG Technologies EU — Company Overview", "description": "An overview of OG Technologies EU and our expertise in Web3, blockchain, and enterprise solutions.", "thumbnailUrl": "https://www.ogtechnologies.co/og-og-image.png", "uploadDate": "2025-01-01", "contentUrl": "https://vimeo.com/1149520449", "embedUrl": "https://player.vimeo.com/video/1149520449", "potentialAction": {"@type": "WatchAction", "target": "https://www.ogtechnologies.co/#video", "actionAccessibilityRequirement": {"@type": "AccessAction", "availability": "https://schema.org/InStock", "category": "free"}}}],
  },
  '/products': { title: 'Products - OG Technologies EU', description: 'Explore our software products and platforms including EduNode and Mozart Pay for enterprise Web3 solutions.' },
  '/pricing': { title: 'Pricing - OG Technologies EU', description: 'Transparent pricing plans for IT consulting, software development, and blockchain services.' },
  '/standards': { title: 'Standards - OG Technologies EU', description: 'Blockchain and IT standards consulting. ISO, CEN, EBSI standards expertise for enterprise compliance.' },
  '/dora': { title: 'DORA Compliance - OG Technologies EU', description: 'Digital Operational Resilience Act compliance consulting for financial institutions.' },
  '/blog': { title: 'Blog - OG Technologies EU | Web3, Blockchain & IT Insights', description: 'Explore the OG Technologies EU blog for insights on Web3, blockchain standards, verifiable credentials, digital payments, and enterprise IT innovation.' },
  '/blog/reaching-new-frontiers': {
    title: 'Reaching New Tech Frontiers with OG Technologies EU',
    description: 'In todays fast-paced business landscape, technology plays a crucial role in driving growth and innovation.',
    ogType: "article",
    article: {"datePublished": "2024-05-14", "dateModified": "2024-05-14", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/blog/meridian-2024-highlights': {
    title: 'Meeting the Stellar Community at Meridian 2024: A Defining Moment for Web3 | OG Technologies EU',
    description: 'Discover our experience at Meridian 2024 in London, where we explored the future of blockchain, DeFi, and Stellar innovative solutions.',
    ogType: "article",
    article: {"datePublished": "2024-10-15", "dateModified": "2024-10-15", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/blog/ebsi-verifiable-credentials': {
    title: 'Verifying EBSI Verifiable Credentials: Trust Chain Verification and Compliance | OG Technologies EU',
    description: 'Exploring key requirements for ensuring authenticity and compliance of verifiable credentials within EBSI.',
    ogType: "article",
    article: {"datePublished": "2025-03-30", "dateModified": "2025-04-17", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers': {
    title: 'How Blockchain Standards Enable Enterprises to Reach Global Customers | OG Technologies EU',
    description: 'Standards play a crucial role in helping enterprises expand their reach and connect with more customers.',
    ogType: "article",
    article: {"datePublished": "2024-11-22", "dateModified": "2024-11-22", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/blog/digital-payments-future': {
    title: "Building the Rails for Europe's Digital Payment Future | OG Technologies EU",
    description: 'Three major transitions—MiCA, digital euro, ISO 20022—are converging. Europe is building a new digital payment infrastructure.',
    ogType: "article",
    article: {"datePublished": "2026-07-21", "dateModified": "2026-07-21", "author": {"@type": "Person", "name": "Olvis Enrique Gil Ríos"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/blog/estandares-sismicos-colombia': {
    title: 'Terremoto en Colombia: guía de estándares ISO para responder, evaluar y reconstruir | OG Technologies EU',
    description: 'Normas clave para evaluación estructural, respuesta ante emergencias, continuidad del negocio y reconstrucción resiliente.',
    ogType: "article",
    article: {"datePublished": "2026-08-14", "dateModified": "2026-08-14", "author": {"@type": "Person", "name": "Olvis Enrique Gil Ríos"}, "image": "https://www.ogtechnologies.co/og-og-image.png", "inLanguage": "es"},
  },
  '/insights': {
    title: 'Insights - OG Technologies EU | Industry Articles on Standards, Payments & Developer Tools',
    description: 'In-depth industry articles from OG Technologies EU: ISO 20022 payments, ISO/IEC 42001 AI governance, IAM security, HL7/FHIR interoperability, and Ethereum development.',
    jsonLd: [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "Insights - OG Technologies EU", "description": "In-depth industry articles on payment standards, AI governance, cloud security, healthcare interoperability, and blockchain development.", "url": "https://www.ogtechnologies.co/insights/", "publisher": {"@type": "Organization", "name": "OG Technologies EU"}, "hasPart": [{"@type": "Article", "headline": "ISO 20022 Migration: What the November 2026 Deadline Means for Your Payment Messages", "description": "The coexistence period for MT and ISO 20022 messages ends in November 2026. Learn what changes, how to validate pain.001, camt.053 and pacs.008 messages, and which free tools can help.", "url": "https://www.ogtechnologies.co/insights/iso-20022-migration-guide/"}, {"@type": "Article", "headline": "ISO/IEC 42001 Explained: A Practical Guide to AI Management System Readiness", "description": "ISO/IEC 42001:2023 is the first international standard for AI management systems. Understand its clauses, Annex A controls, and how to assess your organization readiness before certification.", "url": "https://www.ogtechnologies.co/insights/iso-42001-ai-management-guide/"}, {"@type": "Article", "headline": "IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them", "description": "Overly permissive AWS IAM policies are a leading cause of cloud breaches. Learn the most common privilege escalation patterns, why wildcards are dangerous, and how to validate policies automatically.", "url": "https://www.ogtechnologies.co/insights/iam-policy-security-patterns/"}, {"@type": "Article", "headline": "HL7 v2 vs FHIR: Choosing the Right Healthcare Interoperability Standard", "description": "HL7 v2 still powers most hospital integrations, but FHIR R4 is the future of healthcare APIs. Compare message formats, transport, tooling, and migration strategies.", "url": "https://www.ogtechnologies.co/insights/hl7-v2-vs-fhir-comparison/"}, {"@type": "Article", "headline": "Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums", "description": "A developer reference for how Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and address checksums — with free tools to verify each step.", "url": "https://www.ogtechnologies.co/insights/ethereum-calldata-abi-guide/"}, {"@type": "Article", "headline": "ISO 27001 Gap Analysis: A Step-by-Step Guide", "description": "How to run an ISO 27001 gap analysis: scope, clause-by-clause assessment, scoring, remediation roadmap, and a PDF report.", "url": "https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-guide/"}, {"@type": "Article", "headline": "Wei, Gwei, and Ether: Ethereum Units Explained", "description": "The full Ethereum denomination table, why gas is priced in Gwei, and worked wei-to-ETH conversion examples.", "url": "https://www.ogtechnologies.co/insights/ethereum-wei-gwei-units/"}, {"@type": "Article", "headline": "HL7 v2 Message Structure Explained: Segments, Fields, and Delimiters", "description": "A practical anatomy of HL7 v2 messages: delimiters, segments, fields, components, and message types — with a decoded ADT example.", "url": "https://www.ogtechnologies.co/insights/hl7-v2-message-structure/"}, {"@type": "Article", "headline": "How to Validate AWS IAM Policies: 7 Checks Before You Deploy", "description": "A practical checklist for validating AWS IAM policies before deployment: syntax, wildcards, resource ARNs, condition keys, and privilege escalation patterns.", "url": "https://www.ogtechnologies.co/insights/aws-iam-policy-validation/"}, {"@type": "Article", "headline": "DORA for Crypto and Web3 Companies: What You Need to Comply", "description": "DORA applies to crypto-asset service providers since January 2025 — the ICT risk, incident reporting, testing, and vendor requirements CASPs must implement.", "url": "https://www.ogtechnologies.co/insights/dora-crypto-web3-compliance/"}]}],
  },
  '/insights/iso-20022-migration-guide': {
    title: 'ISO 20022 Migration: What the November 2026 Deadline Means for Your Payment Messages | OG Technologies EU',
    description: 'The MT/ISO 20022 coexistence period ends in November 2026. Learn what changes for pain.001, camt.053 and pacs.008 messages and how to validate them.',
    ogType: "article",
    article: {"datePublished": "2026-09-21", "dateModified": "2026-09-21", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/insights/iso-42001-ai-management-guide': {
    title: 'ISO/IEC 42001 Explained: A Practical Guide to AI Management System Readiness | OG Technologies EU',
    description: 'ISO/IEC 42001:2023 is the first international standard for AI management systems. Understand its clauses, Annex A controls, and how to assess readiness.',
    ogType: 'article',
    article: {
      datePublished: '2026-09-21',
      dateModified: '2026-09-26',
    },
    faq: [
      { q: 'Is ISO/IEC 42001 certification mandatory?', a: 'No — it is voluntary. But it is increasingly requested in procurement and is strong evidence of AI governance maturity under the EU AI Act.' },
      { q: 'How long does ISO/IEC 42001 implementation take?', a: 'For organizations with an existing ISO management system, typically 4–8 months. Starting from scratch, expect 9–18 months depending on the number and risk profile of AI systems in scope.' },
      { q: 'Can ISO/IEC 42001 be integrated with ISO 27001?', a: 'Yes — both share the Harmonized Structure, so context, leadership, audit, and improvement processes can be integrated into a single management system.' },
      { q: 'Does ISO/IEC 42001 apply if we only use third-party AI?', a: 'Yes. The standard covers organizations that use AI-based products or services, not just those that develop them. Third-party AI relationships have a dedicated Annex A control domain covering supplier assessment and responsible use.' },
      { q: 'Is ISO/IEC 42001 required in procurement?', a: 'Not legally, but enterprise buyers increasingly ask for AI governance evidence in security questionnaires and RFPs. A certificate — or a documented readiness assessment — is becoming a recognized shorthand answer to those questions.' },
    ],
  },
  '/insights/iam-policy-security-patterns': {
    title: 'IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them | OG Technologies EU',
    description: 'Overly permissive AWS IAM policies are a leading cause of cloud breaches. Learn the most common privilege escalation patterns and how to validate policies.',
    ogType: "article",
    article: {"datePublished": "2026-09-21", "dateModified": "2026-09-21", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/insights/hl7-v2-vs-fhir-comparison': {
    title: 'HL7 v2 vs FHIR: Choosing the Right Healthcare Interoperability Standard | OG Technologies EU',
    description: 'HL7 v2 still powers most hospital integrations, but FHIR R4 is the future of healthcare APIs. Compare formats, transport, tooling, and migration strategies.',
    ogType: "article",
    article: {"datePublished": "2026-09-21", "dateModified": "2026-09-21", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/insights/ethereum-calldata-abi-guide': {
    title: 'Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums | OG Technologies EU',
    description: 'A developer reference for how Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and EIP-55 address checksums.',
    ogType: "article",
    article: {"datePublished": "2026-09-21", "dateModified": "2026-09-21", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
  },
  '/insights/iso-27001-gap-analysis-guide': {
    title: 'ISO 27001 Gap Analysis: A Step-by-Step Guide with Free Assessment Tool | OG Technologies EU',
    description: 'How to run an ISO 27001 gap analysis: scope, clause-by-clause assessment, scoring, remediation roadmap, and a PDF report. Includes a free browser-based gap assessment tool.',
    ogType: "article",
    article: {"datePublished": "2026-09-26", "dateModified": "2026-09-26", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'How long does an ISO 27001 gap analysis take?', a: 'A focused self-assessment takes 2–4 hours with a structured questionnaire. A consultant-led analysis for a mid-size company typically runs 2–4 weeks including document review and interviews.' },
      { q: 'What is the difference between a gap analysis and a gap assessment?', a: 'The terms are used interchangeably. "Gap analysis" emphasizes the comparison methodology; "gap assessment" emphasizes the scoring deliverable. Both measure distance from ISO 27001 conformity.' },
      { q: 'Do I need a gap analysis before certification?', a: 'It is not a formal requirement, but skipping it is the most common cause of failed Stage 1 audits. Certification bodies expect you to arrive with a working ISMS — the gap analysis is how you find out whether you have one.' },
      { q: 'Can I get a gap analysis report as a PDF?', a: 'Yes. The ISO 27001 Gap Assessment tool generates a downloadable PDF report with per-clause scores and remediation priorities, free and browser-based.' },
    ],
  },
  '/insights/ethereum-wei-gwei-units': {
    title: 'Wei, Gwei, and Ether: Ethereum Units Explained with Conversion Table | OG Technologies EU',
    description: 'Wei, Gwei, and Ether explained: the full Ethereum denomination table, why gas is priced in Gwei, and worked wei-to-ETH conversion examples. Free online Wei converter included.',
    ogType: "article",
    article: {"datePublished": "2026-09-26", "dateModified": "2026-09-26", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'How many wei are in 1 ETH?', a: 'Exactly 1,000,000,000,000,000,000 wei (10¹⁸). Ether has 18 decimal places, the same as most ERC-20 tokens.' },
      { q: 'Is gwei the same as wei?', a: 'No — 1 gwei = 1,000,000,000 wei (10⁹). Gwei is a denomination of wei, in the same way that a cent is a denomination of a dollar.' },
      { q: 'What is a good gas price in gwei?', a: 'It varies with network demand — single digits in quiet periods, 50+ gwei during congestion. Check a live gas tracker or your wallet\'s suggested fee rather than hardcoding a number.' },
      { q: 'Why does Solidity return values in wei?', a: 'Solidity has no floating-point type, so all Ether arithmetic is done in the smallest indivisible unit — wei — to preserve precision. Division happens only at the display layer.' },
    ],
  },
  '/insights/hl7-v2-message-structure': {
    title: 'HL7 v2 Message Structure Explained: Segments, Fields, and Delimiters | OG Technologies EU',
    description: 'A practical anatomy of HL7 v2 messages: delimiters, segments (MSH, PID, OBR, OBX), fields, components, and message types — with a decoded ADT example and a free online parser.',
    ogType: "article",
    article: {"datePublished": "2026-09-26", "dateModified": "2026-09-26", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'What does the MSH segment contain?', a: 'The encoding characters (MSH-1/2), sending and receiving applications and facilities (MSH-3 to MSH-6), timestamp (MSH-7), message type (MSH-9, e.g. ADT^A01), control ID (MSH-10), processing ID (MSH-11), and HL7 version (MSH-12).' },
      { q: 'What is the difference between ADT and ORU messages?', a: 'ADT messages report patient movement events (admission, transfer, discharge). ORU messages report clinical observations and results — lab values, radiology reports. An order flows as ORM, its result returns as ORU.' },
      { q: 'Is HL7 v2 still used, or has FHIR replaced it?', a: 'Still dominant inside hospitals — most EHR, lab, and imaging integrations run on v2 feeds. FHIR is the growing standard for APIs and external exchange, but coexistence is the reality; many organizations translate v2 to FHIR at the boundary.' },
      { q: 'How do I parse an HL7 message online?', a: 'Paste the raw message into the HL7 Parser tool — it auto-detects delimiters, decodes segments and fields, and validates the structure. Everything runs locally in your browser.' },
    ],
  },
  '/insights/aws-iam-policy-validation': {
    title: 'How to Validate AWS IAM Policies: 7 Checks Before You Deploy | OG Technologies EU',
    description: 'A practical checklist for validating AWS IAM policies before deployment: syntax, wildcards, resource ARNs, condition keys, and privilege escalation patterns. Free online policy validator.',
    ogType: "article",
    article: {"datePublished": "2026-09-26", "dateModified": "2026-09-26", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'What does an IAM policy validator check?', a: 'At minimum: JSON syntax, allowed policy elements, valid action names, ARN structure, condition key/operator compatibility, and wildcard scope. Good validators also flag security issues like privilege escalation patterns and NotAction/NotResource pitfalls.' },
      { q: 'Is it safe to paste IAM policies into an online validator?', a: 'Only if the validator runs client-side — policies can reveal account IDs, resource names, and internal architecture. A client-side validator processes everything in your browser; nothing is sent to a server.' },
      { q: 'Does AWS have a built-in policy validator?', a: 'Yes — IAM Access Analyzer runs policy checks and generates findings in the console, and the policy editor shows warnings inline. They are useful but require AWS access; a browser tool complements them for pre-deployment linting.' },
      { q: 'What is the most dangerous IAM policy pattern?', a: '"Action": "*", "Resource": "*", "Effect": "Allow" grants full admin. Nearly as dangerous: iam:PassRole to a powerful role combined with compute creation permissions — a classic privilege escalation path.' },
    ],
  },
  '/insights/dora-crypto-web3-compliance': {
    title: 'DORA for Crypto and Web3 Companies: What EU Regulation 2022/2554 Requires | OG Technologies EU',
    description: 'DORA applies to crypto-asset service providers since January 2025. What CASPs and Web3 firms must implement: ICT risk management, incident reporting, resilience testing, and third-party registers.',
    ogType: "article",
    article: {"datePublished": "2026-09-26", "dateModified": "2026-09-26", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'Does DORA apply to crypto companies?', a: 'Yes — crypto-asset service providers authorized under MiCA are explicitly listed as financial entities under Article 2. Unlicensed pure-DeFi protocols are outside the perimeter, but any centralized custodian, exchange, or on-ramp operating in the EU is in scope.' },
      { q: 'When did DORA take effect?', a: 'DORA entered into force on 16 January 2023 and has applied since 17 January 2025. There is no transition period left — obligations are live now.' },
      { q: 'What is the register of information?', a: 'A mandatory, maintained register of all contractual arrangements with ICT third-party service providers — vendors, scope, criticality, data locations, subcontracting chains. Supervisors can request it at any time, and missing it is a common first finding in supervisory reviews.' },
      { q: 'How does DORA interact with smart contract audits?', a: 'Audits fit into the resilience-testing pillar: contract audits and security testing form part of the testing program, audit firms are ICT vendors in the register, and a contract exploit is a reportable ICT incident if it disrupts a critical function.' },
    ],
  },
  '/ventures': { title: 'Ventures - OG Technologies EU', description: 'Supporting startups, spin-offs, and intrapreneurship programs in Web3 and blockchain.' },
  '/portfolio': { title: 'Portfolio - OG Technologies EU', description: 'Explore our innovative projects including EduNode and Mozart Pay.' },
  '/partners': {
    title: 'Partner Program - Revenue Share Partnerships | OG Technologies EU',
    description: 'Earn revenue share referring enterprise IT, blockchain, and compliance contracts. Referral, reseller, and co-delivery partnership models for consultants, MSPs, and agencies.',
    jsonLd: [{"@context": "https://schema.org", "@type": "WebPage", "name": "Partner Program - OG Technologies EU", "url": "https://www.ogtechnologies.co/partners/", "description": "Revenue-share partnership program for consultants, MSPs, and agencies referring enterprise IT, blockchain, and compliance contracts to OG Technologies EU.", "about": {"@type": "Thing", "name": "Revenue share partnership program"}, "provider": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}}],
  },
  '/careers': { title: 'Careers - OG Technologies EU', description: 'Join OG Technologies EU. We are hiring in Web3, blockchain, and enterprise IT.' },
  '/quote': { title: 'Request a Quote - OG Technologies EU', description: 'Get a customized quote for IT consulting and software development services.' },
  '/helpdesk': { title: 'Helpdesk - OG Technologies EU', description: 'IT helpdesk and support services for enterprise clients.' },
  '/terms': { title: 'Terms and Conditions - OG Technologies EU', description: 'Terms and Conditions for the use of OG Technologies EU website and software development services.' },
  '/privacy': { title: 'Privacy Policy - OG Technologies EU', description: 'Privacy Policy for OG Technologies EU. Learn how we collect, use, and protect your personal information.' },
  '/cookie-policy': { title: 'Cookie Policy - OG Technologies EU', description: 'Cookie Policy for OG Technologies EU. Learn about the types of cookies we use and how to manage your preferences.' },
  '/imprint': { title: 'Imprint - OG Technologies EU', description: 'Legal imprint for OG Technologies EU, based in Vienna, Austria.' },
  '/security-hall-of-fame': {
    title: 'Security Hall of Fame - OG Technologies EU',
    description: 'Recognizing security researchers who have responsibly disclosed vulnerabilities to OG Technologies EU.',
    jsonLd: [{"@context": "https://schema.org", "@type": "WebPage", "name": "Security Hall of Fame", "url": "https://www.ogtechnologies.co/security-hall-of-fame/", "description": "Recognizing security researchers who have responsibly disclosed vulnerabilities to OG Technologies EU.", "creator": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}}],
  },
  '/tools': {
    title: 'Free Online Tools - Developer, PDF, XML & Security Utilities | OG Technologies EU',
    description: 'Free browser-based tools: PDF converters, XML utilities, Ethereum toolkit, hash generator, ISO readiness checkers, and security scanners. No uploads — everything runs locally.',
    jsonLd: [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "Free Online Tools", "url": "https://www.ogtechnologies.co/tools/", "description": "Free browser-based tools by OG Technologies EU: PDF converters, XML utilities, Ethereum toolkit, hash generator, ISO readiness checkers, and security scanners.", "creator": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}}],
  },
  '/tools/html-to-image': {
    title: 'HTML to Image Converter - OG Technologies EU',
    description: 'Convert HTML content to images easily with our free online tool.',
    appCategory: "UtilitiesApplication",
  },
  '/tools/screenshot-to-image': {
    title: 'Screenshot to Image - OG Technologies EU',
    description: 'Capture screenshots of web pages with our free online tool.',
    appCategory: "UtilitiesApplication",
  },
  '/tools/pdf-tools': {
    title: 'PDF Tools - OG Technologies EU',
    description: 'PDF manipulation and conversion utilities.',
    appCategory: "UtilitiesApplication",
    featureList: ["Merge two PDF files into one", "Split a PDF at any page", "Convert PNG/JPG images to PDF", "Convert DOCX, ODT, and TXT documents to PDF", "Convert PDF to Word (.docx, .txt, .html)"],
  },
  '/tools/security-tools': {
    title: 'Security Scanner - OG Technologies EU',
    description: 'Scan websites for security vulnerabilities with our online tool.',
    appCategory: "SecurityApplication",
    featureList: ["HTTPS enforcement and HSTS verification", "Content-Security-Policy analysis", "Security headers audit (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)", "Cookie security flags check (Secure, HttpOnly, SameSite)", "Mixed content detection on HTTPS pages", "Sensitive path exposure probing", "Information disclosure detection", "OWASP Top 10 category mapping with remediation advice"],
  },
  '/tools/blockchain-compliance-checker': {
    title: 'Blockchain Compliance Checker - OG Technologies EU',
    description: 'Check blockchain smart contracts for compliance with regulatory standards.',
    appCategory: "BusinessApplication",
    featureList: ["Personalized standards mapping based on blockchain network, use case, and jurisdiction", "Covers eIDAS, W3C VCs, DID Core, ISO 27001, ISO 29115, GDPR, ISO 20022, MiCA, DORA", "FATF Travel Rule, CCPA/CPRA, UK GDPR, EBSI compliance, CEN/CENELEC JTC 19", "Compliance readiness scoring with grade assessment", "Downloadable PDF Standards & Compliance Roadmap", "Expert consultation lead capture for implementation support"],
  },
  '/tools/iso-27001-gap-analysis': {
    title: 'ISO 27001 Gap Analysis Tool - Free Assessment & PDF Report | OG Technologies EU',
    description: 'Free ISO/IEC 27001:2022 gap analysis and readiness assessment. Check your ISMS against all clauses and Annex A controls — readiness score, prioritized gap list, and a downloadable PDF report. No signup.',
    appCategory: 'SecurityApplication',
    featureList: [
      'Clause-by-clause assessment (Clauses 4–10)',
      'Annex A control assessment (Organizational, People, Physical, Technological)',
      'Readiness score with letter grade',
      'Prioritized gap list with remediation recommendations',
      'Downloadable PDF report',
      'Estimated weeks to certification readiness',
    ],
    faq: [
      { q: 'What is an ISO 27001 gap analysis?', a: 'A gap analysis compares your current information security practices against the requirements of ISO/IEC 27001:2022 — the management system clauses (4–10) and the Annex A controls. It produces a list of gaps to remediate before a certification audit, so you can budget effort and sequence work.' },
      { q: 'What is the difference between a gap analysis and a risk assessment?', a: 'A gap analysis measures your practices against the standard\'s requirements. A risk assessment (required by Clause 6.1.2) identifies and evaluates threats to your specific information assets. You need both: the risk assessment decides which controls matter; the gap analysis shows which of those controls are missing or incomplete.' },
      { q: 'How long does an ISO 27001 gap analysis take?', a: 'This self-assessment takes about 10 minutes. A consultant-led gap analysis typically takes 2–6 weeks depending on organization size, documentation maturity, and how many sites and systems are in scope.' },
      { q: 'What does the PDF report include?', a: 'The downloadable report contains your overall readiness score and grade, a clause-by-clause and Annex A breakdown, a prioritized gap list with remediation recommendations, and an estimated timeline to certification readiness — formatted for sharing with management or auditors.' },
      { q: 'Is this a substitute for a certification audit?', a: 'No. This is a self-assessment that gives you a baseline and a remediation roadmap. Certification requires a two-stage audit by an accredited certification body — but arriving at Stage 1 with a completed gap analysis significantly improves your chances of passing without major nonconformities.' },
    ],
  },
  '/tools/iso-9001-readiness-checker': {
    title: 'ISO 9001 Readiness Checker - Free QMS Self-Assessment | OG Technologies EU',
    description: 'Free ISO 9001:2015 readiness checker. Assess your Quality Management System against all clauses and quality management principles. Get a readiness score, prioritized gap list, and downloadable PDF report.',
    appCategory: "BusinessApplication",
    featureList: ["Clause-by-clause assessment (Clauses 4–10)", "Quality management principles assessment (customer focus, process approach, risk-based thinking)", "Readiness score with letter grade", "Prioritized gap list with remediation recommendations", "Downloadable PDF report", "Estimated weeks to certification readiness"],
  },
  '/tools/iso-42001-ai-readiness': {
    title: 'ISO 42001 AI Readiness Assessment - Free AIMS Checker | OG Technologies EU',
    description: 'Free ISO/IEC 42001:2023 AI readiness assessment tool. Evaluate your AI Management System against all clauses and Annex A controls. Get a maturity score, prioritized gap list, and downloadable PDF report.',
    appCategory: "SecurityApplication",
    featureList: ["Clause-by-clause assessment (Clauses 4–10)", "Annex A control assessment (AI policy, risk register, impact assessments, data governance, lifecycle, transparency, oversight, suppliers, monitoring)", "Maturity score with level (Absent to Optimized)", "Prioritized gap list with remediation recommendations", "Downloadable PDF report", "Estimated weeks to certification readiness"],
  },
  '/tools/iso-8601-validator': {
    title: 'ISO 8601 Date Validator - Free Online Date Format Checker | OG Technologies EU',
    description: 'Free ISO 8601 / RFC 3339 date validator. Validate date-time strings in bulk, catch malformed formats, illegal leap days, and missing offsets. 100% browser-based, no uploads.',
    featureList: ["Bulk validation of ISO 8601 / RFC 3339 date strings", "Per-line valid/invalid verdicts with error explanations", "Parsed component display (year, month, day, hour, minute, second, offset)", "UTC canonical form output for valid dates", "Supports calendar dates, week dates, ordinal dates, durations, and intervals", "100% browser-based — no data uploaded to any server"],
  },
  '/tools/ethereum-toolkit': {
    title: 'Ethereum Developer Toolkit - Wei Converter, Keccak256, ABI Encoder | OG Technologies EU',
    description: 'Free browser-based Ethereum developer tools: Wei/Gwei/ETH unit converter, Keccak256 hash generator, Solidity function selector calculator, ABI encoder/decoder, and EIP-55 address checksum validator. 100% client-side.',
    featureList: ["Wei / Gwei / Finney / Ether unit converter with BigInt precision", "Keccak256 hash generator for text and hex input", "Solidity function selector calculator (4-byte selectors)", "ABI encoder and decoder for smart contract calldata", "EIP-55 Ethereum address checksum validator"],
  },
  '/tools/aws-arn-parser': {
    title: 'AWS ARN Parser & Builder - Free Online Tool | OG Technologies EU',
    description: 'Parse AWS ARN strings into components (partition, service, region, account ID, resource) or build valid ARNs from fields. 100% client-side, no data sent to any server.',
    featureList: ["Parse ARN strings into individual components", "Build valid ARNs from individual fields", "Visual color-coded breakdown of ARN segments", "Validation with warnings for common mistakes"],
  },
  '/tools/iam-policy-validator': {
    title: 'AWS IAM Policy Validator & Checker Online | OG Technologies EU',
    description: 'Free AWS IAM policy checker. Paste IAM policy JSON to flag wildcard actions, privilege escalation, NotAction traps, and public principals — and check size limits. Runs 100% in your browser.',
    featureList: [
      'Detect wildcard actions and resources',
      'Flag privilege escalation actions',
      'Identify NotAction and NotResource traps',
      'Check for public principals',
      'Validate policy size against AWS limits',
    ],
    faq: [
      { q: 'Is it safe to paste my IAM policy into this checker?', a: 'Yes. All analysis runs entirely in your browser — the policy JSON is never sent to a server or stored anywhere. You can verify this in your browser\'s network tab.' },
      { q: 'What is the difference between this tool and AWS Access Analyzer?', a: 'AWS IAM Access Analyzer validates policies against the IAM grammar and checks against AWS best-practice rules inside your AWS account. This tool is a quick client-side check you can run without logging into AWS — useful for reviewing policies in pull requests, documentation, or third-party templates before deployment.' },
      { q: 'What AWS IAM policy size limits does this check?', a: 'Managed policies are limited to 6,144 characters. Inline policies are limited to 5,120 characters for users and 10,240 for groups and roles. AWS counts characters excluding whitespace for the managed-policy limit.' },
      { q: 'Which actions can be used for privilege escalation?', a: 'Actions like iam:CreatePolicy, iam:AttachRolePolicy, iam:PassRole, lambda:CreateFunction, and cloudformation:CreateStack let a principal grant itself or a resource broader permissions. This tool flags the most common escalation vectors, but a full audit needs a dedicated tool such as Cloudsplaining or Pacu.' },
    ],
  },
  '/tools/sap-odata-url-builder': {
    title: 'SAP OData URL Builder - Free Online Query Tool | OG Technologies EU',
    description: 'Build SAP OData query URLs interactively with $select, $expand, $filter, $orderby, $top, $skip, $format, and $count parameters. 100% client-side.',
    featureList: ["Interactive OData query parameter builder", "Support for $select, $expand, $filter, $orderby", "Support for $top, $skip, $format, $count, $search", "Live URL preview with URL encoding", "Copy generated URL to clipboard"],
  },
  '/tools/hash-generator': {
    title: 'Hash Generator - SHA-256, SHA-512, Keccak256, MD5 | OG Technologies EU',
    description: 'Generate hashes online: MD5, SHA-1, SHA-256, SHA-384, SHA-512, Keccak-256, Keccak-512. Text or hex input, multiple algorithms simultaneously. 100% client-side.',
    featureList: ["MD5 hash generation", "SHA-1, SHA-256, SHA-384, SHA-512", "Keccak-256 and Keccak-512", "Text and hex input modes", "Multiple algorithms simultaneously"],
  },
  '/tools/xml-tools': {
    title: 'XML Tools - Formatter, Validator, Converter | OG Technologies EU',
    description: 'Free online XML tools: format and beautify XML, validate well-formedness, convert XML to JSON or CSV, minify XML, and test XPath expressions. 100% browser-based, no data sent to any server.',
    featureList: ["XML Formatter & Beautifier with configurable indentation", "XML Validator with well-formedness checking and error reporting", "XML to JSON Converter with @-prefix attribute convention", "XML Minifier to compress XML by removing whitespace", "XPath Tester to evaluate XPath expressions against XML documents", "XML to CSV Converter with automatic record detection"],
  },
  '/tools/xml-formatter': {
    title: 'Free XML Formatter & Beautifier Online | OG Technologies EU',
    description: 'Format and beautify XML with customizable indentation (2 spaces, 4 spaces, or tabs). Pretty-print minified XML online — 100% browser-based, no data sent to any server.',
    featureList: ["Pretty-print XML with 2-space, 4-space, or tab indentation", "Preserves comments, CDATA sections, and processing instructions", "Error reporting with line and column numbers"],
  },
  '/tools/xml-validator': {
    title: 'Free XML Validator Online - Check Well-Formed XML | OG Technologies EU',
    description: 'Validate XML well-formedness online. Check for unclosed tags, unescaped characters, duplicate attributes, and multiple root elements. Get error line and column numbers — 100% browser-based.',
    featureList: ["Well-formedness checking with line and column error reporting", "Document statistics: element count, attribute count, max depth, comments", "Supports all XML dialects including SVG, RSS, XSD, and WSDL"],
  },
  '/tools/xml-to-json': {
    title: 'Free XML to JSON Converter Online | OG Technologies EU',
    description: 'Convert XML to JSON online using the @-prefix attribute convention (compatible with xml2js and xmltodict). Repeated elements become arrays automatically. 100% browser-based, no uploads.',
    featureList: ["XML to JSON conversion with @-prefix attribute convention", "Automatic array detection for repeated sibling elements", "Optional type inference for numbers, booleans, and null", "Compatible with xml2js and xmltodict output format"],
  },
  '/tools/xml-minifier': {
    title: 'Free XML Minifier Online - Compress XML | OG Technologies EU',
    description: 'Minify and compress XML by removing unnecessary whitespace. Reduce XML file size for production payloads. Shows original vs minified size and savings percentage — 100% browser-based.',
    featureList: ["Remove whitespace between XML elements", "Preserve text content, CDATA sections, and comments", "Shows original size, minified size, and savings percentage"],
  },
  '/tools/xpath-tester': {
    title: 'Free XPath Tester Online - Evaluate XPath Expressions | OG Technologies EU',
    description: 'Test and evaluate XPath expressions against XML documents in real time. Supports XPath 1.0 via the browser native document.evaluate(). 100% client-side, no data sent to any server.',
    featureList: ["Evaluate XPath 1.0 expressions against XML documents", "Typed results: elements, attributes, text, numbers, strings, booleans", "Example expressions for common queries", "Real-time evaluation with error reporting"],
  },
  '/tools/xml-to-csv': {
    title: 'Free XML to CSV Converter Online | OG Technologies EU',
    description: 'Convert XML to CSV online with automatic record element detection. Attributes included as @-prefixed columns. Choose comma, semicolon, or tab delimiter. Download or copy — 100% browser-based.',
    featureList: ["Automatic detection of repeating record elements", "Attributes included as @-prefixed columns", "Configurable delimiter: comma, semicolon, or tab", "Download as .csv file or copy to clipboard"],
  },
  '/tools/merge-pdf': {
    title: 'Free Merge PDF Tool - Combine PDF Files Online | OG Technologies EU',
    description: 'Merge two or more PDF files into one document directly in your browser. No file is ever uploaded to a server — 100% client-side and private.',
    appCategory: "UtilitiesApplication",
    featureList: ["Merge multiple PDF files into a single document", "Reorder files before merging", "100% browser-based — no file uploads"],
  },
  '/tools/split-pdf': {
    title: 'Free Split PDF Tool - Extract PDF Pages Online | OG Technologies EU',
    description: 'Split a PDF at any page number to extract specific pages or ranges. 100% browser-based — no file is ever uploaded to a server.',
    appCategory: "UtilitiesApplication",
    featureList: ["Split a PDF at any page number", "Extract specific page ranges", "100% browser-based — no file uploads"],
  },
  '/tools/image-to-pdf': {
    title: 'Free Image to PDF Converter - PNG/JPG to PDF Online | OG Technologies EU',
    description: 'Convert PNG and JPG images to PDF directly in your browser. No file is ever uploaded to a server — 100% client-side and private.',
    appCategory: "UtilitiesApplication",
    featureList: ["Convert PNG and JPG images to PDF", "Multiple images in a single PDF", "100% browser-based — no file uploads"],
  },
  '/tools/document-to-pdf': {
    title: 'Free Document to PDF Converter - DOCX/ODT/TXT to PDF | OG Technologies EU',
    description: 'Convert DOCX, ODT, and TXT documents to PDF directly in your browser. Preserves text, headings, bold/italic, lists, tables, and images. No file is ever uploaded to a server.',
    appCategory: "UtilitiesApplication",
    featureList: ["Convert DOCX, ODT, and TXT to PDF", "Preserves headings, bold/italic, lists, tables, and images", "100% browser-based — no file uploads"],
  },
  '/tools/pdf-to-word': {
    title: 'Free PDF to Word Converter - PDF to DOCX/TXT/HTML Online | OG Technologies EU',
    description: 'Convert PDF to Word (.docx), plain text (.txt), or HTML directly in your browser. No file is ever uploaded to a server — 100% client-side and private.',
    appCategory: "UtilitiesApplication",
    featureList: ["Convert PDF to Word (.docx)", "Convert PDF to plain text (.txt)", "Convert PDF to HTML", "100% browser-based — no file uploads"],
  },
  '/tools/wei-converter': {
    title: 'Free Wei to Ether Converter - Wei/Gwei/ETH Unit Calculator | OG Technologies EU',
    description: 'Convert between Wei, Gwei, Finney, and Ether with full BigInt precision — no floating point errors. Free browser-based Ethereum unit converter. 100% client-side, no data sent to any server.',
    featureList: ["Convert between Wei, Gwei, Finney, and Ether", "Full BigInt precision — no floating point errors", "Supports arbitrary precision input values"],
  },
  '/tools/keccak256-hash': {
    title: 'Free Keccak256 Hash Generator Online - Ethereum Hash | OG Technologies EU',
    description: 'Compute the Keccak-256 hash of any text or hex data. This is the hash function used throughout Ethereum for addresses, storage, signatures, and function selectors. 100% client-side, no data sent to any server.',
    featureList: ["Compute Keccak-256 hash of text or hex input", "Same hash function used in Ethereum (addresses, storage, signatures)", "Supports both text and hex input modes"],
  },
  '/tools/function-selector': {
    title: 'Free Solidity Function Selector Calculator - 4-Byte Selector | OG Technologies EU',
    description: 'Calculate the 4-byte function selector for any Solidity function signature. Uses keccak256 of the canonical function signature. 100% client-side, no data sent to any server.',
    featureList: ["Calculate 4-byte function selectors from Solidity signatures", "Uses keccak256 of the canonical function signature", "Supports multiple function signatures at once"],
  },
  '/tools/abi-encoder': {
    title: 'Free Ethereum ABI Encoder & Decoder Online | OG Technologies EU',
    description: 'Encode and decode Ethereum ABI calldata for smart contract interactions. Supports uint, address, bytes, string, and array types. 100% client-side, no data sent to any server.',
    featureList: ["Encode Solidity function calls into ABI calldata", "Decode raw ABI calldata back into typed values", "Supports uint, int, address, bool, bytes, string, and array types"],
  },
  '/tools/address-checksum': {
    title: 'Free EIP-55 Address Checksum Validator - Ethereum | OG Technologies EU',
    description: 'Validate and generate EIP-55 checksummed Ethereum addresses. Check if an address has a valid mixed-case checksum. 100% client-side, no data sent to any server.',
    featureList: ["Validate EIP-55 mixed-case checksum on Ethereum addresses", "Generate checksummed addresses from raw hex", "Detect invalid or non-checksummed addresses"],
  },
  '/tools/iban-validator': {
    title: 'Free IBAN Validator - Check IBAN Online (ISO 13616) | OG Technologies EU',
    description: 'Validate IBANs online: MOD-97 checksum, per-country BBAN structure, and SEPA reachability for 90+ countries. Includes check digit calculator. 100% client-side — no data sent to any server.',
    appCategory: "FinanceApplication",
    featureList: ["MOD-97 checksum validation (ISO 13616)", "Per-country BBAN structure checks", "SEPA reachability indicator", "Check digit calculator"],
  },
  '/tools/bic-validator': {
    title: 'Free BIC / SWIFT Code Validator & Decoder (ISO 9362) | OG Technologies EU',
    description: 'Validate and decode BIC/SWIFT codes online: institution, country, location, and branch breakdown per ISO 9362. Detects test BICs and primary office codes. 100% client-side.',
    appCategory: "FinanceApplication",
    featureList: ["ISO 9362 structure validation", "Institution, country, location, branch breakdown", "Test BIC and passive participant detection", "BIC8 and BIC11 support"],
  },
  '/tools/lei-validator': {
    title: 'Free LEI Validator - Legal Entity Identifier Check (ISO 17442) | OG Technologies EU',
    description: 'Validate Legal Entity Identifiers (LEI) online: 20-character structure, reserved positions, and ISO 7064 MOD 97-10 check digits. 100% client-side — no data sent to any server.',
    appCategory: "FinanceApplication",
    featureList: ["ISO 17442 structure validation", "ISO 7064 MOD 97-10 checksum", "LOU prefix decoding", "Reserved position check"],
  },
  '/tools/iso-20022-viewer': {
    title: 'Free ISO 20022 Message Viewer - pain.001, camt.053, pacs.008 | OG Technologies EU',
    description: 'Parse and inspect ISO 20022 XML messages online: pain.001, pain.008, camt.052/053/054, pacs.008. Auto-detects message type, checks NbOfTxs/CtrlSum consistency, validates embedded IBANs and BICs. 100% client-side.',
    appCategory: "FinanceApplication",
    featureList: ["Auto-detection of message type from namespace", "pain.001, pain.008, camt.052/053/054, pacs.008 support", "NbOfTxs and CtrlSum consistency checks", "Embedded IBAN and BIC validation", "Balances and transaction extraction"],
  },
  '/tools/mt940-to-csv': {
    title: 'Free MT940 to CSV Converter - SWIFT Statement Parser | OG Technologies EU',
    description: 'Convert SWIFT MT940 bank statements to CSV online. Parses :61:/:86: tags, SEPA references (EREF+, MREF+, CRED+), running balances verified against the closing balance. 100% client-side — no upload.',
    appCategory: "FinanceApplication",
    featureList: ["MT940 :61:/:86: tag parsing", "SEPA reference extraction (EREF+, MREF+, CRED+)", "Running balance verification against closing balance", "RFC 4180 CSV with UTF-8 BOM for Excel", "SWIFT envelope stripping"],
  },
  '/tools/hl7-parser': {
    title: 'Free HL7 v2 Message Parser & Viewer Online | OG Technologies EU',
    description: 'Parse HL7 v2.x messages online: segment, field, component, and subcomponent breakdown with field labels for MSH, PID, PV1, OBR, OBX and more. 100% client-side — PHI never uploaded.',
    featureList: ["HL7 v2.x segment/field/component parsing", "Field labels for common segments (MSH, PID, PV1, OBR, OBX)", "Message type and version detection", "Delimiter and encoding character detection"],
  },
  '/tools/fhir-validator': {
    title: 'Free FHIR Resource Viewer & Validator - FHIR R4 JSON | OG Technologies EU',
    description: 'Validate and inspect FHIR R4 resources online: Patient, Observation, Bundle, Encounter, MedicationRequest and more. Required-field checks and flattened field view. 100% client-side — PHI never uploaded.',
    featureList: ["FHIR R4 JSON validation", "Required-field and type checks", "Flattened field-path view", "Patient, Observation, Bundle, Encounter, MedicationRequest schemas"],
  },
  '/tools/tle-parser': {
    title: 'Free TLE Parser - Two-Line Element Set Decoder & Orbital Elements | OG Technologies EU',
    description: 'Decode NORAD two-line element sets (TLE) online: satellite catalog number, epoch, inclination, RAAN, eccentricity, mean motion — plus derived orbital period, apogee, and perigee. 100% client-side.',
    featureList: ["TLE line 1 and line 2 field decoding", "Checksum validation", "Epoch conversion to UTC date", "Derived orbital period, apogee, perigee, orbit type"],
  },
  '/tools/tle-converter': {
    title: 'Free TLE to JSON / CSV Converter - OMM GP Format | OG Technologies EU',
    description: 'Convert NORAD TLE/3LE satellite element sets to CCSDS OMM/GP JSON or CSV online. Batch convert entire catalogs, validate checksums, download results. 100% client-side — no upload.',
    featureList: ["TLE/3LE to OMM/GP JSON conversion", "TLE to CSV export", "Batch conversion of full catalogs", "Checksum validation per record"],
  },
  '/tools/scorm-validator': {
    title: 'Free SCORM Package Validator - SCORM 1.2 / 2004 / xAPI / cmi5 | OG Technologies EU',
    description: 'Validate SCORM, xAPI, and cmi5 packages online before LMS upload. Checks imsmanifest.xml, launch file, and file references — including case-sensitivity issues. 100% client-side.',
    appCategory: "BusinessApplication",
    featureList: ["SCORM 1.2 / 2004 / xAPI / cmi5 detection", "imsmanifest.xml structure validation", "Launch file existence check", "File reference and case-sensitivity checks"],
  },
  '/tools/gtin-validator': {
    title: 'Free GTIN / UPC / EAN Barcode Validator - GS1 Check Digit | OG Technologies EU',
    description: 'Validate UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes online: GS1 mod-10 check digit verification, format detection, and country prefix lookup. Includes ISBN validator. 100% client-side.',
    appCategory: "BusinessApplication",
    featureList: ["GS1 mod-10 check digit verification", "EAN-8, UPC-A, EAN-13, GTIN-14 format detection", "GS1 country prefix lookup", "ISBN-10/ISBN-13 validation", "Check digit calculator"],
  },
  '/tools/phone-formatter': {
    title: 'Free Phone Number Formatter - E.164, International, National | OG Technologies EU',
    description: 'Format and validate phone numbers online: E.164, international, national, and RFC 3966 formats for 240+ countries. Bulk mode for CRM imports and SMS campaigns. 100% client-side.',
    appCategory: "BusinessApplication",
    featureList: ["E.164, international, national, RFC 3966 output", "Validity and line-type detection", "Bulk list processing for CRM imports", "240+ country numbering plans (libphonenumber)"],
  },
  '/tools/vcard-generator': {
    title: 'Free vCard Generator & Parser - Create .vcf Contact Files | OG Technologies EU',
    description: 'Create and parse vCard (.vcf) contact files online. Generate vCard 3.0 or 4.0 for iPhone, Android, Outlook, and Google Contacts — or paste a .vcf to inspect its fields. 100% client-side.',
    appCategory: "BusinessApplication",
    featureList: ["vCard 3.0 and 4.0 generation", "Live .vcf preview with line folding", "vCard parser with property table", "Downloadable .vcf files"],
  },
  '/tools/email-validator': {
    title: 'Free Email List Validator - Bulk Email Checker & Cleaner | OG Technologies EU',
    description: 'Validate email lists online: RFC 5322 syntax check, duplicate detection, disposable-domain flagging, and typo suggestions. Export a clean CSV for your CRM. 100% client-side.',
    appCategory: "BusinessApplication",
    featureList: ["RFC 5322 syntax validation", "Duplicate detection", "Disposable domain flagging", "Domain typo suggestions", "Clean CSV export"],
  },
  '/tools/csv-deduplicator': {
    title: 'Free CSV Deduplicator - Remove Duplicate Rows for CRM Import | OG Technologies EU',
    description: 'Remove duplicate rows from CSV files online. Pick key columns (email, phone, name), see a duplicate report, and download a clean CSV ready for CRM import. 100% client-side.',
    appCategory: "BusinessApplication",
    featureList: ["Duplicate detection by selected key columns", "Case-insensitive normalized matching", "Duplicate report with row numbers", "Clean CSV export with UTF-8 BOM"],
  },
  '/tools/word-counter': {
    title: 'Free Word Counter - Words, Characters, Sentences, Paragraphs | OG Technologies EU',
    description: 'Count words, characters, sentences, paragraphs, and spaces online. Live stats, reading and speaking time estimates, and keyword density — 100% free and private.',
    appCategory: 'UtilitiesApplication',
    featureList: ["Live word, character, sentence, paragraph, space, and line counts", "Characters with and without spaces", "Reading time (200 wpm) and speaking time (130 wpm) estimates", "Keyword density table with top-word frequencies", "Unique word count and average word length", "100% client-side — text is never uploaded"],
    faq: [
      { q: 'How does this tool count words?', a: 'Text is split on whitespace, and each token that contains at least one letter or digit counts as a word — matching how Word and Google Docs count. Hyphenated terms count as one word; standalone punctuation does not.' },
      { q: 'How are sentences and paragraphs counted?', a: 'A sentence ends at a period, exclamation mark, question mark, or ellipsis — plus any trailing fragment without terminal punctuation. A paragraph is a block of text separated by one or more blank lines.' },
      { q: 'How accurate are the reading and speaking times?', a: 'They are estimates based on widely used averages — 200 words per minute for adult silent reading and 130 wpm for spoken delivery. Dense technical text reads slower; slides and dialogue read faster.' },
      { q: 'Is my text uploaded or stored anywhere?', a: 'No. All counting runs entirely in your browser — the text is never sent to a server or persisted. You can verify this in your browser\'s network tab.' },
    ],
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      webp: {
        quality: 80,
      },
    }),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      indexPath: path.join(__dirname, 'dist', 'index.html'),
      routes: [
        '/',
        '/products',
        '/pricing',
        '/standards',
        '/dora',
        '/blog',
        '/blog/reaching-new-frontiers',
        '/blog/meridian-2024-highlights',
        '/blog/ebsi-verifiable-credentials',
        '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers',
        '/blog/digital-payments-future',
        '/blog/estandares-sismicos-colombia',
        '/insights',
        '/insights/iso-20022-migration-guide',
        '/insights/iso-42001-ai-management-guide',
        '/insights/iam-policy-security-patterns',
        '/insights/hl7-v2-vs-fhir-comparison',
        '/insights/ethereum-calldata-abi-guide',
        '/insights/iso-27001-gap-analysis-guide',
        '/insights/ethereum-wei-gwei-units',
        '/insights/hl7-v2-message-structure',
        '/insights/aws-iam-policy-validation',
        '/insights/dora-crypto-web3-compliance',
        '/ventures',
        '/portfolio',
        '/partners',
        '/careers',
        '/quote',
        '/helpdesk',
        '/terms',
        '/privacy',
        '/cookie-policy',
        '/imprint',
        '/security-hall-of-fame',
        '/tools',
        '/tools/html-to-image',
        '/tools/screenshot-to-image',
        '/tools/pdf-tools',
        '/tools/security-tools',
        '/tools/blockchain-compliance-checker',
        '/tools/iso-27001-gap-analysis',
        '/tools/iso-9001-readiness-checker',
        '/tools/iso-42001-ai-readiness',
        '/tools/iso-8601-validator',
  '/tools/ethereum-toolkit',
  '/tools/aws-arn-parser',
  '/tools/iam-policy-validator',
  '/tools/sap-odata-url-builder',
  '/tools/hash-generator',
  '/tools/xml-tools',
  '/tools/xml-formatter',
  '/tools/xml-validator',
  '/tools/xml-to-json',
  '/tools/xml-minifier',
  '/tools/xpath-tester',
  '/tools/xml-to-csv',
  '/tools/merge-pdf',
  '/tools/split-pdf',
  '/tools/image-to-pdf',
  '/tools/document-to-pdf',
  '/tools/pdf-to-word',
  '/tools/wei-converter',
  '/tools/keccak256-hash',
  '/tools/function-selector',
  '/tools/abi-encoder',
  '/tools/address-checksum',
  '/tools/iban-validator',
  '/tools/bic-validator',
  '/tools/lei-validator',
  '/tools/iso-20022-viewer',
  '/tools/mt940-to-csv',
  '/tools/hl7-parser',
  '/tools/fhir-validator',
  '/tools/tle-parser',
  '/tools/tle-converter',
  '/tools/scorm-validator',
  '/tools/gtin-validator',
  '/tools/phone-formatter',
  '/tools/vcard-generator',
  '/tools/email-validator',
  '/tools/csv-deduplicator',
  '/tools/word-counter',
      ],
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
      renderer: new PuppeteerRenderer({
        maxConcurrentRoutes: 4,
        renderAfterTime: 5000,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      }),
      postProcess(renderedRoute) {
        const meta = routeMeta[renderedRoute.route]
        if (meta) {
          const canonicalUrl = `https://www.ogtechnologies.co${renderedRoute.route === '/' ? '/' : renderedRoute.route + '/'}`

          renderedRoute.html = renderedRoute.html.replace(
            /<title>[^<]*<\/title>/,
            `<title>${meta.title}</title>`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+name="description"|name="description"\s+content="[^"]*")/,
            `$1name="description" content="${meta.description}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="og:title"|property="og:title"\s+content="[^"]*")/,
            `$1property="og:title" content="${meta.title}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="og:description"|property="og:description"\s+content="[^"]*")/,
            `$1property="og:description" content="${meta.description}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<link\s+)(?:href="[^"]*"\s+rel="canonical"|rel="canonical"\s+href="[^"]*")/,
            `$1rel="canonical" href="${canonicalUrl}"`
          )
          if (meta.ogType) {
            renderedRoute.html = renderedRoute.html.replace(
              /(<meta\s+)(?:content="[^"]*"\s+property="og:type"|property="og:type"\s+content="[^"]*")/,
              `$1property="og:type" content="${meta.ogType}"`
            )
          }
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="og:url"|property="og:url"\s+content="[^"]*")/,
            `$1property="og:url" content="${canonicalUrl}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="twitter:title"|property="twitter:title"\s+content="[^"]*")/,
            `$1property="twitter:title" content="${meta.title}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="twitter:description"|property="twitter:description"\s+content="[^"]*")/,
            `$1property="twitter:description" content="${meta.description}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="twitter:url"|property="twitter:url"\s+content="[^"]*")/,
            `$1property="twitter:url" content="${canonicalUrl}"`
          )

          const jsonLdScripts = []

          if (renderedRoute.route !== '/') {
            const segments = renderedRoute.route.split('/').filter(Boolean)
            const itemListElement = segments.map((seg, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
              item: `https://www.ogtechnologies.co/${segments.slice(0, i + 1).join('/')}/`,
            }))
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement,
            })
          }

          const articleExtras = {
            url: canonicalUrl,
            mainEntityOfPage: canonicalUrl,
            image: 'https://www.ogtechnologies.co/og-og-image.png',
            author: { '@type': 'Organization', name: 'OG Technologies EU' },
            publisher: { '@type': 'Organization', name: 'OG Technologies EU', logo: { '@type': 'ImageObject', url: 'https://www.ogtechnologies.co/og-og-image.png' } },
            ...(meta.article || {}),
          }

          if (renderedRoute.route.startsWith('/blog/') && renderedRoute.route !== '/blog') {
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: meta.title,
              description: meta.description,
              ...articleExtras,
            })
          }

          if (renderedRoute.route.startsWith('/insights/') && renderedRoute.route !== '/insights') {
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: meta.title,
              description: meta.description,
              ...articleExtras,
            })
          }

          if (renderedRoute.route.startsWith('/tools/')) {
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: meta.title.replace(/ [-|] OG Technologies EU$/, ''),
              description: meta.description,
              url: canonicalUrl,
              applicationCategory: meta.appCategory || 'DeveloperApplication',
              operatingSystem: 'Any',
              ...(meta.featureList ? { featureList: meta.featureList } : {}),
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
              creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
            })
          }

          if (meta.jsonLd) {
            meta.jsonLd.forEach((s) => jsonLdScripts.push(s))
          }

          if (meta.faq) {
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: meta.faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            })
          }

          if (jsonLdScripts.length > 0) {
            const jsonLdHtml = jsonLdScripts
              .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
              .join('')
            renderedRoute.html = renderedRoute.html.replace(
              /<\/head>/,
              `${jsonLdHtml}</head>`
            )
          }
        }
        return renderedRoute
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
