import { defineConfig } from 'vite'
import path from 'path'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import prerenderPlugin from './prerender-plugin.mjs'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { GLOSSARY_TERMS } from './src/data/glossaryTerms.js'
import { EXPERT_PROJECTS } from './src/data/expertProjects.js'
import { PRODUCTS } from './src/data/products.js'

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
    faq: [
      { q: 'What services does OG Technologies EU offer?', a: 'IT consulting and tailored technology solutions across Finance, Education, and IT Helpdesk — plus specialized expertise in Web3 and blockchain, including verifiable credentials, payment infrastructure, and enterprise blockchain integration.' },
      { q: 'Where is OG Technologies EU based?', a: 'In Vienna, Austria, serving clients across Europe and internationally.' },
      { q: 'How can I request a quote or get in touch?', a: 'Use the quote request form on our website or email us at hi@ogtechnologies.co — we tailor every engagement to your specific business objectives.' },
    ],
  },
  '/blog/meridian-2024-highlights': {
    title: 'Meeting the Stellar Community at Meridian 2024: A Defining Moment for Web3 | OG Technologies EU',
    description: 'Discover our experience at Meridian 2024 in London, where we explored the future of blockchain, DeFi, and Stellar innovative solutions.',
    ogType: "article",
    article: {"datePublished": "2024-10-15", "dateModified": "2024-10-15", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'What is the Meridian conference?', a: 'Meridian is the Stellar ecosystem\'s annual conference, organized by the Stellar Development Foundation. It brings together developers, enterprises, and ecosystem partners to discuss the network\'s roadmap — the 2024 edition was held in London under the theme "Transformation."' },
      { q: 'What is Soroban?', a: 'Soroban is Stellar\'s smart contracts platform, designed for efficient, secure on-chain programs. It was a major topic at Meridian 2024 alongside asset tokenization and Stellar Aid Assist.' },
      { q: 'What is Stellar Aid Assist?', a: 'An open-source bulk-disbursement system built on Stellar that lets aid organizations deliver funds quickly and transparently to recipients, demonstrated at Meridian alongside integrations like the MoneyGram partnership.' },
      { q: 'Why does OG Technologies EU build on Stellar?', a: 'Stellar\'s focus on financial inclusion, fast low-cost settlement, and enterprise-ready asset issuance aligns with our payments work — including Mozart Pay, our Stellar-based payment platform built with Circle USDC/EURC.' },
    ],
  },
  '/blog/ebsi-verifiable-credentials': {
    title: 'Verifying EBSI Verifiable Credentials: Trust Chain Verification and Compliance | OG Technologies EU',
    description: 'Exploring key requirements for ensuring authenticity and compliance of verifiable credentials within EBSI.',
    ogType: "article",
    article: {"datePublished": "2025-03-30", "dateModified": "2025-04-17", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'What is EBSI?', a: 'The European Blockchain Services Infrastructure — an EU initiative operating a cross-border network of nodes that deliver public services via blockchain, with use cases including digital identity, educational diplomas, and trusted data sharing.' },
      { q: 'What is a verifiable credential trust chain?', a: 'The chain of cryptographic attestations linking a credential back to trusted issuers — from the credential, through trusted accreditation organizations, up to the EBSI root trust anchor — letting a verifier confirm authenticity without contacting the issuer directly.' },
      { q: 'How does eIDAS relate to EBSI?', a: 'eIDAS provides the EU legal framework for electronic identification and trust services. EBSI\'s verifiable credential model is designed to operate within it, including alignment with the European Digital Identity (EUDI) wallet.' },
      { q: 'Which standards underpin EBSI credential verification?', a: 'The W3C Verifiable Credentials data model and Decentralized Identifiers (DIDs), ISO/IEC 27001 for the security framework, ISO/IEC 29115 for authentication assurance, and the EBSI verifiable trust model governing accreditation.' },
    ],
  },
  '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers': {
    title: 'How Blockchain Standards Enable Enterprises to Reach Global Customers | OG Technologies EU',
    description: 'Standards play a crucial role in helping enterprises expand their reach and connect with more customers.',
    ogType: "article",
    article: {"datePublished": "2024-11-22", "dateModified": "2024-11-22", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'What are blockchain standards?', a: 'Agreed technical specifications — such as ISO/TC 307 DLT standards, W3C Verifiable Credentials, and ETSI/EBSI profiles — that let different blockchain systems and enterprises interoperate securely and predictably.' },
      { q: 'Why do standards matter for enterprises adopting blockchain?', a: 'They cut integration costs, create shared trust frameworks with partners and regulators, and let enterprises reach global customers on common rails instead of proprietary silos.' },
      { q: 'What is BlockStand?', a: 'An EU-funded initiative supporting European participation in international blockchain standardization. OG Technologies EU partnered with BlockStand to contribute expertise to standards development.' },
    ],
  },
  '/blog/digital-payments-future': {
    title: "Building the Rails for Europe's Digital Payment Future | OG Technologies EU",
    description: 'Three major transitions—MiCA, digital euro, ISO 20022—are converging. Europe is building a new digital payment infrastructure.',
    ogType: "article",
    article: {"datePublished": "2026-07-21", "dateModified": "2026-07-21", "author": {"@type": "Person", "name": "Olvis Enrique Gil Ríos"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'When did MiCA fully take effect?', a: 'MiCA\'s stablecoin provisions applied from June 2024 and the full regime for crypto-asset service providers from December 2024. Regulated exchanges began delisting non-compliant stablecoins as enforcement ramped up through 2025.' },
      { q: 'What is the digital euro timeline?', a: 'The ECB\'s preparation phase runs through the mid-2020s: the Single Currency Package advanced to trilogue negotiations, a pilot with 36 payment service providers is scheduled for the second half of 2027, and citizen availability is targeted around 2029 if negotiations stay on track.' },
      { q: 'What is the StandICT.eu fellowship?', a: 'An EU-funded program supporting European experts contributing to international ICT standardization. The author\'s fellowship develops standards for interoperable, compliant DLT integration in retail payments.' },
      { q: 'How does ISO 20022 relate to DLT payments?', a: 'ISO 20022 is the global financial messaging standard that becomes mandatory for cross-border payments in November 2026. The fellowship work maps DLT transaction metadata into ISO 20022 messages (pacs.008) via the SupplementaryData element so DLT systems can interoperate with bank rails.' },
    ],
  },
  '/blog/estandares-sismicos-colombia': {
    title: 'Terremoto en Colombia: guía de estándares ISO para responder, evaluar y reconstruir | OG Technologies EU',
    description: 'Normas clave para evaluación estructural, respuesta ante emergencias, continuidad del negocio y reconstrucción resiliente.',
    ogType: "article",
    article: {"datePublished": "2026-08-14", "dateModified": "2026-08-14", "author": {"@type": "Person", "name": "Olvis Enrique Gil Ríos"}, "image": "https://www.ogtechnologies.co/og-og-image.png", "inLanguage": "es"},
    faq: [
      { q: '¿Qué normas ISO aplican a la evaluación de edificaciones tras un sismo?', a: 'Las normas de gestión de emergencias y continuidad del negocio como la serie ISO 22301, junto con estándares de evaluación estructural y resiliencia organizacional, complementan — sin sustituir — el reglamento colombiano NSR-10 y la normativa local vigente.' },
      { q: '¿Las normas ISO sustituyen la normativa colombiana de construcción sismo-resistente?', a: 'No. La normativa colombiana (NSR-10, leyes y decretos locales) es obligatoria. Las normas ISO son marcos voluntarios que complementan la gestión de emergencias, la continuidad del negocio y la resiliencia organizacional.' },
      { q: '¿Cómo ayuda el software a la gestión de emergencias sísmicas?', a: 'Los módulos SaaS mapeados a requisitos ISO permiten coordinar inspecciones, gestionar evidencia, priorizar evaluaciones estructurales y documentar decisiones para aseguradoras y autoridades.' },
    ],
  },
  '/blog/entrepreneurship-avenue-2026': {
    title: 'AI Agent Architecture: Fueling Entrepreneurial Innovation — Workshop Recap at Entrepreneurship Avenue 2026 | OG Technologies EU',
    description: 'A recap of our interactive workshop at Entrepreneurship Avenue 2026 at WU Wien: the sense-think-act agent anatomy, MCP orchestration, RAG and vector DBs, and AI model selection for startups.',
    ogType: "article",
    article: {"datePublished": "2026-10-02", "dateModified": "2026-10-02", "author": {"@type": "Person", "name": "Olvis Enrique Gil Ríos"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'What is the sense-think-act agent anatomy?', a: 'A practical framework for understanding AI agents: sensing (ingesting market, visual, sensor, and API data), thinking (knowledge bases, planning logic, LLM-powered analysis with feedback loops), and acting (automation, alerts, and CRM/ERP actions).' },
      { q: 'What is MCP in AI agent architecture?', a: 'Model Context Protocol — an emerging standard for connecting AI agents with external tools, data sources, and other agents, enabling orchestrated multi-agent workflows.' },
      { q: 'Should startups choose small or large language models?', a: 'It depends on the use case: SLMs offer faster inference and lower operational cost for lean startups, LLMs provide superior reasoning for complex problems — and specialization through fine-tuning often beats raw capability.' },
      { q: 'What is Entrepreneurship Avenue?', a: 'A European student-run startup conference hosted at WU Wien (Vienna University of Economics and Business), connecting founders, students, and innovators — the 2026 edition featured our AI Agent Architecture workshop.' },
    ],
  },
  '/blog/introducing-og-crm-ticketing': {
    title: 'Introducing OG CRM & Ticketing: Contacts, Deals, and Support in One Platform | OG Technologies EU',
    description: 'Announcing OG CRM & Ticketing — our flagship platform combining contact management, companies, leads, opportunities, activities, and a full helpdesk. CSV import, analytics dashboard, free tier available.',
    ogType: "article",
    article: {"datePublished": "2026-10-13", "dateModified": "2026-10-13", "author": {"@type": "Person", "name": "Olvis Enrique Gil Ríos"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'Is there a free tier?', a: 'Yes — a real free tier, not a 14-day countdown. Pro is €8/month with a 14-day trial (no credit card required to start), and Enterprise plans cover larger teams.' },
      { q: 'Can I import my existing contacts?', a: 'Yes — the importer accepts CSV and JSON (Excel and XML are handled server-side). You map your columns before anything is written, invalid emails are flagged, and duplicate emails inside the file are skipped and reported.' },
      { q: 'Does it include a helpdesk?', a: 'Yes — ticketing is built in, not bolted on. Tickets have status, priority, ownership, and threaded comments, and they live on the same customer record as your deals and activities.' },
    ],
  },
  '/insights': {
    title: 'Insights - OG Technologies EU | Industry Articles on Standards, Payments & Developer Tools',
    description: 'In-depth industry articles from OG Technologies EU: ISO 20022 payments, ISO/IEC 42001 AI governance, IAM security, HL7/FHIR interoperability, and Ethereum development.',
    jsonLd: [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "Insights - OG Technologies EU", "description": "In-depth industry articles on payment standards, AI governance, cloud security, healthcare interoperability, and blockchain development.", "url": "https://www.ogtechnologies.co/insights/", "publisher": {"@type": "Organization", "name": "OG Technologies EU"}, "hasPart": [{"@type": "Article", "headline": "Claude Code for Enterprise Teams: Agentic Workflows, Subagents, and MCP Integration", "description": "How enterprise teams use Claude Code: the agentic loop, CLAUDE.md memory, subagents, Model Context Protocol (MCP) servers, permissions, and governance.", "url": "https://www.ogtechnologies.co/insights/claude-code-agentic-workflows-mcp/"}, {"@type": "Article", "headline": "GPT-6 Explained: Astra, Sol, and Luna — Choosing the Right Model Tier for Your Workload", "description": "OpenAI's GPT-6 family tiers by cost and intelligence: GPT-6 Astra (flagship), GPT-6.1 Sol (balanced), and GPT-6 Luna (efficient). How to route workloads across tiers.", "url": "https://www.ogtechnologies.co/insights/gpt-6-astra-sol-luna-model-tiers/"}, {"@type": "Article", "headline": "Inside Devin: What Autonomous AI Software Engineers Can (and Can't) Ship in Production", "description": "A practical evaluation of Devin, Cognition's autonomous AI software engineer — how ticket-to-PR workflows work, where it excels, and where human engineers still lead.", "url": "https://www.ogtechnologies.co/insights/devin-autonomous-ai-software-engineer/"}, {"@type": "Article", "headline": "DeepSeek V4.1 and the Open-Weight Price War: MIT-Licensed MoE Models for Coding Agents", "description": "DeepSeek V4.1 Flash ships MIT-licensed weights, a 552B-parameter MoE backbone, and agent-task economics ~40x cheaper than frontier open models.", "url": "https://www.ogtechnologies.co/insights/deepseek-v4-open-weight-moe-coding-agents/"}, {"@type": "Article", "headline": "Gemini 4 Argon and Antigravity: Google's New Agentic Coding Stack, Explained", "description": "Gemini 4 Argon is Google's newest frontier model — #1 on the Vals Index — paired with Antigravity, an agent-first IDE.", "url": "https://www.ogtechnologies.co/insights/gemini-4-argon-antigravity-agentic-coding/"}, {"@type": "Article", "headline": "Kimi K3: Inside the 2.8-Trillion-Parameter Open Model Leading Agentic Benchmarks", "description": "Moonshot AI's Kimi K3 is the largest open-weight flagship at 2.8 trillion parameters — leading agentic coding benchmarks.", "url": "https://www.ogtechnologies.co/insights/kimi-k3-open-weight-agentic-model/"}, {"@type": "Article", "headline": "GLM-5.3 Explained: Z.ai's Open-Weight Model for Long-Horizon Agent Sessions", "description": "Z.ai's GLM-5.3 targets long-horizon agent and engineering sessions at the cheapest API tier in its class.", "url": "https://www.ogtechnologies.co/insights/glm-5-zai-long-horizon-agents/"}, {"@type": "Article", "headline": "ISO 20022 Migration: What the November 2026 Deadline Means for Your Payment Messages", "description": "The coexistence period for MT and ISO 20022 messages ends in November 2026. Learn what changes, how to validate pain.001, camt.053 and pacs.008 messages, and which free tools can help.", "url": "https://www.ogtechnologies.co/insights/iso-20022-migration-guide/"}, {"@type": "Article", "headline": "ISO/IEC 42001 Explained: A Practical Guide to AI Management System Readiness", "description": "ISO/IEC 42001:2023 is the first international standard for AI management systems. Understand its clauses, Annex A controls, and how to assess your organization readiness before certification.", "url": "https://www.ogtechnologies.co/insights/iso-42001-ai-management-guide/"}, {"@type": "Article", "headline": "IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them", "description": "Overly permissive AWS IAM policies are a leading cause of cloud breaches. Learn the most common privilege escalation patterns, why wildcards are dangerous, and how to validate policies automatically.", "url": "https://www.ogtechnologies.co/insights/iam-policy-security-patterns/"}, {"@type": "Article", "headline": "HL7 v2 vs FHIR: Choosing the Right Healthcare Interoperability Standard", "description": "HL7 v2 still powers most hospital integrations, but FHIR R4 is the future of healthcare APIs. Compare message formats, transport, tooling, and migration strategies.", "url": "https://www.ogtechnologies.co/insights/hl7-v2-vs-fhir-comparison/"}, {"@type": "Article", "headline": "Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums", "description": "A developer reference for how Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and address checksums — with free tools to verify each step.", "url": "https://www.ogtechnologies.co/insights/ethereum-calldata-abi-guide/"}, {"@type": "Article", "headline": "ISO 27001 Gap Analysis: A Step-by-Step Guide", "description": "How to run an ISO 27001 gap analysis: scope, clause-by-clause assessment, scoring, remediation roadmap, and a PDF report.", "url": "https://www.ogtechnologies.co/insights/iso-27001-gap-analysis-guide/"}, {"@type": "Article", "headline": "Wei, Gwei, and Ether: Ethereum Units Explained", "description": "The full Ethereum denomination table, why gas is priced in Gwei, and worked wei-to-ETH conversion examples.", "url": "https://www.ogtechnologies.co/insights/ethereum-wei-gwei-units/"}, {"@type": "Article", "headline": "HL7 v2 Message Structure Explained: Segments, Fields, and Delimiters", "description": "A practical anatomy of HL7 v2 messages: delimiters, segments, fields, components, and message types — with a decoded ADT example.", "url": "https://www.ogtechnologies.co/insights/hl7-v2-message-structure/"}, {"@type": "Article", "headline": "How to Validate AWS IAM Policies: 7 Checks Before You Deploy", "description": "A practical checklist for validating AWS IAM policies before deployment: syntax, wildcards, resource ARNs, condition keys, and privilege escalation patterns.", "url": "https://www.ogtechnologies.co/insights/aws-iam-policy-validation/"}, {"@type": "Article", "headline": "DORA for Crypto and Web3 Companies: What You Need to Comply", "description": "DORA applies to crypto-asset service providers since January 2025 — the ICT risk, incident reporting, testing, and vendor requirements CASPs must implement.", "url": "https://www.ogtechnologies.co/insights/dora-crypto-web3-compliance/"}, {"@type": "Article", "headline": "Building Cross-Border Payments on Stellar: Anchors, SEP-24, and USDC/EURC Settlement", "description": "How Stellar cross-border payments work: anchors and the SEP stack (SEP-6, SEP-24, SEP-31, SEP-38), trustlines, path payments, and USDC/EURC settlement.", "url": "https://www.ogtechnologies.co/insights/stellar-cross-border-payments-anchors-sep24/"}, {"@type": "Article", "headline": "ISO 27001 Statement of Applicability: How to Choose and Justify Annex A Controls", "description": "What Clause 6.1.3 requires: selecting Annex A controls, justifying exclusions, and building a Statement of Applicability that survives a Stage 1 audit.", "url": "https://www.ogtechnologies.co/insights/iso-27001-statement-of-applicability/"}, {"@type": "Article", "headline": "ISO/IEC 42001 Annex A Controls: The Complete List of 38 Controls Across 9 Domains", "description": "Every ISO/IEC 42001:2023 Annex A control by reference and title, grouped by domain — plus how to select them in your AI Statement of Applicability.", "url": "https://www.ogtechnologies.co/insights/iso-42001-annex-a-controls/"}, {"@type": "Article", "headline": "One Management System, Three Standards: Integrating ISO 9001, ISO 27001, and ISO 42001", "description": "The Harmonized Structure shared by all three standards, where they diverge, and how to run quality, security, and AI governance on one integrated management system.", "url": "https://www.ogtechnologies.co/insights/integrated-management-system-iso-9001-27001-42001/"}, {"@type": "Article", "headline": "ISO 8601 Date Formats Explained: Durations, Week Dates, Intervals, and the RFC 3339 Subset", "description": "The anatomy of ISO 8601: calendar/ordinal/week dates, durations, intervals, reduced precision, and how RFC 3339 differs.", "url": "https://www.ogtechnologies.co/insights/iso-8601-format-guide/"}, {"@type": "Article", "headline": "How to Merge PDF Files for Free (No Acrobat, No Uploads)", "description": "Combine PDFs into one document entirely in your browser — how merging works, page order, protected files, and why no-upload tools are the private option.", "url": "https://www.ogtechnologies.co/insights/how-to-merge-pdf-files/"}, {"@type": "Article", "headline": "MT940 Format Explained: Field Tags, Field 86, and the Migration to camt.053", "description": "The SWIFT MT940 bank statement format decoded: every field tag from :20: to :62F:, the :61: statement line, structured :86: remittance data, and how it maps to ISO 20022 camt.053.", "url": "https://www.ogtechnologies.co/insights/mt940-format-camt053-migration/"}, {"@type": "Article", "headline": "eIDAS 2.0 and the EUDI Wallet: What Businesses Need to Know Before the Rollout", "description": "What the European Digital Identity Wallet contains, which businesses must accept it, how it relates to verifiable credentials and EBSI, and what to prepare now.", "url": "https://www.ogtechnologies.co/insights/eidas2-eudi-wallet/"}, {"@type": "Article", "headline": "OData Query Options Cheat Sheet: $filter, $select, $expand, and $orderby", "description": "Complete OData query options cheat sheet and guide: $filter operators, $select projections, $expand navigation properties, paging, V2 vs V4 differences, and SAP Gateway specifics.", "url": "https://www.ogtechnologies.co/insights/odata-query-options-guide/"}, {"@type": "Article", "headline": "How to Choose a CRM and Ticketing System: A Practical Buyer's Guide", "description": "A framework for evaluating CRM and ticketing platforms: must-have capabilities, data model, CSV import and migration, GDPR, integrations, and pricing — plus a 10-point buyer checklist.", "url": "https://www.ogtechnologies.co/insights/how-to-choose-crm-ticketing-system/"}, {"@type": "Article", "headline": "Helpdesk Workflow Best Practices: From Ticket Intake to Resolution", "description": "Intake, triage, resolve, learn — a practical helpdesk workflow covering priority and SLA rules, ownership and escalation, automation, and the metrics that matter.", "url": "https://www.ogtechnologies.co/insights/helpdesk-workflow-best-practices/"}, {"@type": "Article", "headline": "ISO 9001 Implementation: A Step-by-Step Guide to Certification", "description": "Clauses 4–10, the seven quality management principles, and the Stage 1/Stage 2 audit process — a practical ISO 9001 implementation roadmap with a free readiness checker.", "url": "https://www.ogtechnologies.co/insights/iso-9001-implementation-guide/"}, {"@type": "Article", "headline": "ISO/IEC 27001 Annex A Controls: The Complete List of 93 Controls", "description": "Every ISO/IEC 27001:2022 Annex A control by reference and title across the 4 themes (Organizational, People, Physical, Technological) — plus how to select them in your Statement of Applicability.", "url": "https://www.ogtechnologies.co/insights/iso-27001-annex-a-controls/"}, {"@type": "Article", "headline": "SOC 2 Trust Services Criteria: The Complete List Explained", "description": "All 52 AICPA Trust Services Criteria: the 33 Common Criteria (CC1–CC9) required in every SOC 2 report, plus the optional Availability, Processing Integrity, Confidentiality, and Privacy categories.", "url": "https://www.ogtechnologies.co/insights/soc-2-trust-services-criteria/"}, {"@type": "Article", "headline": "SOC 2 vs ISO 27001: Differences, Overlap, and Which You Need", "description": "Attestation vs certification, Trust Services Criteria vs Annex A, Type I/II vs 3-year cycle — a practical comparison for teams choosing (or combining) the two frameworks.", "url": "https://www.ogtechnologies.co/insights/soc-2-vs-iso-27001/"}, {"@type": "Article", "headline": "PDF Metadata Explained: What Your Files Reveal and How to Remove It", "description": "The document info dictionary and XMP stream inside every PDF — what each field reveals, how to inspect and edit them, and how to strip metadata before sharing a file.", "url": "https://www.ogtechnologies.co/insights/pdf-metadata-guide/"}, {"@type": "Article", "headline": "MT940 Fields Explained: The Complete Tag Reference (:20: to :62F:)", "description": "Every MT940 tag by name and format — :60F:/:62F: balances, the :61: statement line anatomy, structured :86: SEPA remittance subfields, and the transaction code table.", "url": "https://www.ogtechnologies.co/insights/mt940-field-reference/"}, {"@type": "Article", "headline": "OData $filter Examples: Operators, Functions, and 40+ Copy-Paste Queries", "description": "A copy-pasteable OData $filter cookbook: every operator and function with real examples, collection filters with any/all, and the V2 vs V4 differences that break queries.", "url": "https://www.ogtechnologies.co/insights/odata-filter-examples/"}, {"@type": "Article", "headline": "o1js State Assertions: getAndRequireEquals vs getAndAssertEquals", "description": "How o1js state preconditions work on Mina zkApps, why the assert* API was renamed to require*, and what \"precondition unsatisfied\" actually means.", "url": "https://www.ogtechnologies.co/insights/o1js-state-assertions/"}, {"@type": "Article", "headline": "Measuring SDG Impact on Stellar: ISO 24874 KPIs, Benchmarking and Reporting", "description": "How to apply the ISO/DPAS 24874 draft framework — KPI catalogue, five-level maturity benchmarking, and the SDG alignment methodology — to measure and report the sustainability impact of Stellar-based solutions.", "url": "https://www.ogtechnologies.co/insights/iso-24874-stellar-sdg-impact/"}, {"@type": "Article", "headline": "EU AI Act Compliance: What the August 2026 Obligations Mean for Your Business", "description": "The EU AI Act's general application date passed on 2 August 2026 — transparency duties, deployer obligations, and high-risk rules now apply to most AI systems.", "url": "https://www.ogtechnologies.co/insights/eu-ai-act-compliance-guide/"}, {"@type": "Article", "headline": "NIS2 Compliance: Scope, Management Liability, and the ISO 27001 Shortcut", "description": "Who NIS2 covers, what Article 21 requires, the 24/72-hour reporting clock, management liability — and how ISO 27001 covers most of the ground.", "url": "https://www.ogtechnologies.co/insights/nis2-compliance-iso-27001/"}, {"@type": "Article", "headline": "EU Cyber Resilience Act: SBOMs, CE Marking, and the December 2027 Deadline", "description": "CRA vulnerability-reporting duties apply since September 2026 and full obligations land December 2027 — SBOMs, secure updates, CE marking for products with digital elements.", "url": "https://www.ogtechnologies.co/insights/cyber-resilience-act-cra-guide/"}]}],
  },
  '/insights/iso-20022-migration-guide': {
    title: 'ISO 20022 Migration: What the November 2026 Deadline Means for Your Payment Messages | OG Technologies EU',
    description: 'The MT/ISO 20022 coexistence period ends in November 2026. Learn what changes for pain.001, camt.053 and pacs.008 messages and how to validate them.',
    ogType: "article",
    article: {"datePublished": "2026-09-21", "dateModified": "2026-09-21", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'Is ISO 20022 mandatory?', a: 'For cross-border payments on SWIFT, yes — from November 2026 MX messages become the required format for payment instructions. Many domestic market infrastructures (TARGET2, SEPA instant, CHAPS, Fedwire) have already migrated or announced mandates.' },
      { q: 'What is the difference between MT940 and camt.053?', a: 'MT940 is the legacy SWIFT end-of-day statement with tagged fields (:61:, :86:). camt.053 is its ISO 20022 XML equivalent with structured elements for balances, entries, and remittance details. Both represent bank statements, but camt.053 carries richer, machine-readable data.' },
      { q: 'Do I need to change my ERP or accounting software?', a: 'Possibly. If your ERP generates pain.001 files for payment initiation, confirm it produces a schema version your bank accepts (e.g., pain.001.001.03 or .09) and that it captures the structured data elements now required.' },
    ],
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
    faq: [
      { q: 'What is the principle of least privilege?', a: 'Grant only the specific actions on the specific resources a workload needs — nothing more. In practice: replace Action: "*" with explicit actions, scope Resource to concrete ARNs, and add conditions (MFA, source IP, PassedToService) where possible.' },
      { q: 'Are wildcards ever acceptable?', a: 'Prefix wildcards like s3:Get* or resource wildcards like arn:aws:s3:::my-bucket/* are reasonable when scoped deliberately. Full *:* or service-level s3:* on Resource: "*" should trigger review.' },
      { q: 'How often should policies be audited?', a: 'Continuously. Validate policies in CI before deployment, enable AWS IAM Access Analyzer for external-access findings, and re-review after any incident or architecture change.' },
    ],
  },
  '/insights/hl7-v2-vs-fhir-comparison': {
    title: 'HL7 v2 vs FHIR: Choosing the Right Healthcare Interoperability Standard | OG Technologies EU',
    description: 'HL7 v2 still powers most hospital integrations, but FHIR R4 is the future of healthcare APIs. Compare formats, transport, tooling, and migration strategies.',
    ogType: "article",
    article: {"datePublished": "2026-09-21", "dateModified": "2026-09-21", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'Is HL7 v2 being replaced by FHIR?', a: 'Not soon. v2 remains dominant for intra-hospital messaging and will persist for years. FHIR is the standard for new API-based exchange — the two coexist, connected by integration engines and FHIR facades.' },
      { q: 'What is the difference between FHIR R4 and R5?', a: 'R4 (2019) is the first normative release and the version mandated by US regulations — use it unless a partner requires otherwise. R5 adds new resources and refinements but has less implementation support.' },
      { q: 'What are Z-segments in HL7 v2?', a: 'Custom, vendor-defined segments prefixed with Z (e.g., ZPD, ZIN). They carry site-specific data not covered by the standard — a common source of integration bugs when migrating or mapping to FHIR.' },
    ],
  },
  '/insights/ethereum-calldata-abi-guide': {
    title: 'Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums | OG Technologies EU',
    description: 'A developer reference for how Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and EIP-55 address checksums.',
    ogType: "article",
    article: {"datePublished": "2026-09-21", "dateModified": "2026-09-21", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'How do I decode calldata without the contract ABI?', a: 'Start with the 4-byte selector — look it up in a public selector database or compute candidates with a selector calculator. If the selector matches a known signature, the argument types tell you how to decode the rest: 32-byte words for static types, offset pointers for dynamic ones.' },
      { q: 'Why is Keccak-256 used instead of SHA-256?', a: 'Ethereum adopted Keccak-256 — the original submission to the SHA-3 competition — before NIST finalized the SHA-3 standard with different padding. They are related but not identical: Keccak-256 and SHA3-256 produce different hashes for the same input.' },
      { q: 'Do all transactions have calldata?', a: 'No. A plain ETH transfer has empty calldata — the value field carries the amount. Calldata only appears when calling contract code, and a contract\'s receive() or fallback() function handles calls with empty or unmatched calldata.' },
    ],
  },
  '/insights/iso-27001-gap-analysis-guide': {
    title: 'ISO 27001 Gap Analysis: Step-by-Step Guide + Free Template (Excel/CSV) | OG Technologies EU',
    description: 'How to run an ISO 27001 gap analysis: scope, clause-by-clause assessment, scoring, remediation roadmap. Download a free Excel/CSV gap analysis template covering clauses 4–10 and all 93 Annex A controls, or use the free online tool for a scored PDF report.',
    ogType: "article",
    article: {"datePublished": "2026-09-26", "dateModified": "2026-10-12", "author": {"@type": "Organization", "name": "OG Technologies EU"}, "image": "https://www.ogtechnologies.co/og-og-image.png"},
    faq: [
      { q: 'How long does an ISO 27001 gap analysis take?', a: 'A focused self-assessment takes 2–4 hours with a structured questionnaire. A consultant-led analysis for a mid-size company typically runs 2–4 weeks including document review and interviews.' },
      { q: 'Is there a free ISO 27001 gap analysis template?', a: 'Yes — download the free Excel or PDF template covering clauses 4–10 and all 93 Annex A controls, with columns for status, gap severity, evidence, remediation, owner, and due date. A CSV of the Annex A controls is also available.' },
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
  '/insights/stellar-cross-border-payments-anchors-sep24': {
    title: 'Building Cross-Border Payments on Stellar: Anchors, SEP-24, and USDC/EURC Settlement | OG Technologies EU',
    description: 'How Stellar cross-border payments actually work: anchors and the SEP stack (SEP-6, SEP-24, SEP-31, SEP-38), trustlines, path payments, and USDC/EURC settlement for regulated businesses.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-03',
      dateModified: '2026-10-03',
    },
    faq: [
      { q: 'What is a Stellar anchor?', a: 'An anchor is a regulated financial entity — a bank, e-money institution, or money transmitter — that bridges fiat currency and the Stellar network. It accepts fiat deposits, issues corresponding tokens on-chain, and redeems tokens back into fiat. Anchors handle KYC/AML at the edges so the network itself stays neutral.' },
      { q: 'What is the difference between SEP-6 and SEP-24?', a: 'Both handle fiat deposits and withdrawals through anchors. SEP-24 is hosted: the wallet opens an anchor-provided web interface where the user completes the fiat step. SEP-6 is programmatic: the wallet builds its own UX and calls the anchor\'s API directly. Use SEP-24 for speed of integration, SEP-6 when you want full control of the user experience.' },
      { q: 'What is a trustline on Stellar?', a: 'A trustline is an explicit opt-in between a Stellar account and a specific issued asset. Your account can\'t hold USDC, EURC, or any other non-native asset until it trusts the issuer — which prevents unsolicited tokens and makes each asset relationship deliberate. Native XLM doesn\'t require trustlines.' },
      { q: 'Does Stellar support euro payments?', a: 'Yes. Circle\'s EURC — a fully reserved, MiCA-compliant euro stablecoin — is issued natively on Stellar. Combined with USDC and anchor fiat rails, it enables EUR↔USD cross-border flows entirely on regulated assets.' },
      { q: 'How fast and how cheap are Stellar payments?', a: 'Ledgers close roughly every 5 seconds with deterministic finality — no confirmation waiting game. The base transaction fee is 0.00001 XLM (100 stroops), a fraction of a cent. Real-world cost is dominated by anchor deposit/withdrawal fees and FX spreads, not the network itself.' },
    ],
  },
  '/insights/iso-27001-statement-of-applicability': {
    title: 'ISO 27001 Statement of Applicability: How to Choose and Justify Annex A Controls | OG Technologies EU',
    description: 'The Statement of Applicability (SoA) is the document ISO 27001 auditors ask for first. Learn what it must contain under Clause 6.1.3, how to justify Annex A control selections and exclusions, and the mistakes that fail Stage 1 audits.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-03',
      dateModified: '2026-10-03',
    },
    faq: [
      { q: 'Is the Statement of Applicability mandatory for ISO 27001?', a: 'Yes. Clause 6.1.3(d) makes the SoA a required piece of documented information. Without it a certification body cannot proceed — it is typically the first document requested at the Stage 1 audit.' },
      { q: 'How many controls does the SoA cover?', a: 'Under ISO/IEC 27001:2022, Annex A contains 93 controls across four themes (Organizational, People, Physical, Technological). Every one must appear in your SoA — marked applicable with justification and status, or excluded with justification. The 2013 edition had 114 controls in 14 domains; certified organizations had to transition by October 2025.' },
      { q: 'Can I exclude Annex A controls?', a: 'Yes — but only when a control is not necessary for your risk treatment, and you must justify each exclusion in the SoA itself. "No physical offices" is a legitimate exclusion for physical controls; "too expensive" is not. Any control needed to treat an identified risk cannot be excluded without an alternative treatment.' },
      { q: 'What is the difference between the risk assessment and the SoA?', a: 'The risk assessment (Clause 6.1.2) identifies and evaluates threats to your information assets. The SoA (Clause 6.1.3) records which controls you chose to treat those risks, their implementation status, and justifications. The assessment finds the problems; the SoA documents the answers.' },
      { q: 'How often should the SoA be updated?', a: 'Whenever something material changes — new risks identified, controls implemented or retired, scope modified, incidents revealing gaps — and at minimum at your periodic management review (Clause 9.3). Auditors at surveillance audits will compare it to the previous version and ask what changed and why.' },
    ],
  },
  '/insights/iso-42001-annex-a-controls': {
    title: 'ISO/IEC 42001 Annex A Controls: The Complete List of 38 Controls Across 9 Domains | OG Technologies EU',
    description: 'Every ISO/IEC 42001:2023 Annex A control listed: all 38 controls across the 9 domains (A.2–A.10) with one-line descriptions, plus a free Excel, PDF, or CSV controls-list download and how to select controls in your AI Statement of Applicability.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-03',
      dateModified: '2026-10-03',
    },
    faq: [
      { q: 'How many controls are in ISO 42001 Annex A?', a: '38 controls across 9 domains (A.2–A.10). By comparison, ISO/IEC 27001:2022 Annex A has 93 controls in 4 themes. The 42001 set is smaller because it focuses specifically on AI governance; information-security controls are referenced to ISO 27001 rather than duplicated.' },
      { q: 'Are all 38 Annex A controls mandatory?', a: 'No. Annex A is a reference set — you select applicable controls through the Statement of Applicability based on your scope, AI risk assessment, and impact assessments. What is mandatory is the process: you must evaluate all 38 and justify each inclusion or exclusion.' },
      { q: 'Why do the control numbers start at .2 instead of .1?', a: 'The .1 sub-clause in each domain contains the control objective statement — the goal that domain\'s controls achieve. The numbered controls therefore begin at .2. A.6 additionally splits into two sub-objectives (A.6.1 responsible development, A.6.2 life-cycle processes), each with its own objective statement.' },
      { q: 'Which controls matter most if we only use third-party AI?', a: 'A.9 (use of AI systems — all 3 controls apply) and A.10 (third-party relationships, especially A.10.2 responsibilities and A.10.3 suppliers), plus the cross-cutting governance controls A.2, A.3, and A.5 impact assessment. Development-heavy domains A.6 and A.7 largely shift to your vendors — which is exactly what A.10 exists to manage.' },
      { q: 'How does Annex A relate to the EU AI Act?', a: 'Annex A provides the management-system machinery — impact assessments, documentation, oversight processes — that regulators expect to see, but it doesn\'t replace AI Act conformity work. Think of it as complementary: the AIMS gives you the operational processes; the AI Act defines the legal obligations for in-scope systems.' },
    ],
  },
  '/insights/integrated-management-system-iso-9001-27001-42001': {
    title: 'One Management System, Three Standards: Integrating ISO 9001, ISO 27001, and ISO 42001 | OG Technologies EU',
    description: 'ISO 9001, ISO 27001, and ISO 42001 share the same Harmonized Structure. How to build one integrated management system (IMS) covering quality, information security, and AI governance — shared clauses, separate risk objects, and a single audit cycle.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-03',
      dateModified: '2026-10-03',
    },
    faq: [
      { q: 'What is an integrated management system (IMS)?', a: 'A single management system — one set of processes, policies, and documentation — that satisfies multiple ISO standards at once, rather than running parallel systems for each. It works because all modern ISO management standards share the Harmonized Structure (clauses 4–10), so context, leadership, support, evaluation, and improvement processes can be shared while discipline-specific requirements (mainly Clause 8 and Annex A controls) stay separate.' },
      { q: 'Can ISO 9001, ISO 27001, and ISO 42001 really share one system?', a: 'Yes — all three follow the same high-level structure with nearly identical management clauses. Each keeps its own risk register, objectives, operational controls, and Statement of Applicability (27001 and 42001), but policies, competence, document control, internal audit, and management review can be fully integrated. Certification bodies routinely perform integrated audits covering all three in a single engagement.' },
      { q: 'Which standard should we implement first?', a: 'Build on whichever system is most mature — usually ISO 9001. If starting from scratch, ISO 27001 first is often the best foundation because its formal risk assessment and Statement of Applicability discipline are the hardest machinery to build, and both ISO 9001 and ISO 42001 then slot onto proven processes.' },
      { q: 'Does an IMS reduce audit costs?', a: 'Significantly. Certification bodies offer integrated audits — one audit team covering multiple standards in a single visit — because the shared clauses are audited once rather than three times. Combined with one surveillance cycle and one management review, total audit effort typically drops 30–40% versus three standalone certifications.' },
      { q: 'What are the risks of integrating too much?', a: 'Dilution. Each standard protects a different thing — product quality, information security, and AI impacts — so risk registers, objectives, and Clause 8 operations must remain discipline-specific. An IMS that blurs these into generic processes loses the rigor auditors test for. Share the machinery; keep the accountability separate.' },
    ],
  },
  '/insights/iso-8601-format-guide': {
    title: 'ISO 8601 Date Formats Explained: Durations, Week Dates, Intervals, and the RFC 3339 Subset | OG Technologies EU',
    description: 'ISO 8601 explained: the anatomy of date-time strings, calendar/ordinal/week dates, durations (PnYnMnDTnHnMnS), intervals, reduced precision, and how RFC 3339 differs. With a free online validator.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-03',
      dateModified: '2026-10-03',
    },
    faq: [
      { q: 'What does the T in ISO 8601 mean?', a: 'It\'s just a separator marking the transition from the date part to the time part — 2026-10-03T14:30:00 reads "October 3, 2026, at 14:30:00." It\'s required in ISO 8601 (not a placeholder). In durations, a second T also separates date units (years/months/days) from time units (hours/minutes/seconds) — which is how P1M (one month) differs from PT1M (one minute).' },
      { q: 'Is RFC 3339 the same as ISO 8601?', a: 'No — RFC 3339 is a profile (strict subset) of ISO 8601 designed for internet protocols. It mandates a UTC offset, requires separators, and only allows calendar dates — no week dates, ordinal dates, durations, intervals, or reduced precision. A valid RFC 3339 timestamp is always valid ISO 8601, but the reverse is not true.' },
      { q: 'What is an ISO week date?', a: 'A date expressed as year-weeknumber-weekday: 2026-W40-6 is Saturday of week 40 (October 3, 2026). Week 1 is the week containing the first Thursday of the year, and weeks run Monday–Sunday. This means the ISO week-year can differ from the calendar year at year boundaries — 2025-12-29 through 2025-12-31 can belong to 2026-W01.' },
      { q: 'How do I write a duration in ISO 8601?', a: 'Start with P, then date components, then T, then time components: P1Y2M10DT2H30M = 1 year, 2 months, 10 days, 2 hours, 30 minutes. Omit components you don\'t need (PT15M = 15 minutes). Weeks use W and can\'t be mixed with other units.' },
      { q: 'Is 24:00 a valid ISO 8601 time?', a: 'Yes — ISO 8601 accepts 24:00 to mean midnight at the end of the day, equivalent to 00:00 of the following day. But RFC 3339 and most parsers reject it, so normalize to 00:00 when exchanging data.' },
    ],
  },
  '/insights/how-to-merge-pdf-files': {
    title: 'How to Merge PDF Files for Free (No Acrobat, No Uploads) | OG Technologies EU',
    description: 'Combine PDF files into one document for free — directly in your browser. How merging works, page order, protected files, and why client-side merging keeps documents private.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-08',
      dateModified: '2026-10-08',
    },
    faq: [
      { q: 'Is it safe to merge PDF files online?', a: 'It depends on where processing happens. Server-based tools upload your documents to their infrastructure. Our tool runs entirely in your browser — files are read, merged, and downloaded locally with nothing transmitted, which you can verify in the network tab.' },
      { q: 'How do I merge more than two PDFs?', a: 'Merge in stages: combine files 1 and 2, download the result, then merge that output with file 3, and so on. Each pass appends pages in order, so the final document reads A → B → C → D.' },
      { q: 'Does merging PDFs reduce quality or add watermarks?', a: 'Neither. A proper merge copies whole pages into a new document structure without re-rendering — text stays selectable, images keep their resolution, and no watermark is added.' },
      { q: 'Can I merge a password-protected PDF?', a: 'Depends on the protection type. Owner-password files (restricting print/edit) generally merge fine. User-password files that require a password to open cannot be read at all — re-save without protection first.' },
      { q: 'How do I change the order of pages when combining PDFs?', a: 'The output follows input file order: all pages of file 1, then file 2. Swap the files to reorder whole documents; to reorder individual pages, split the PDF first, then merge the pieces in the desired order.' },
    ],
  },
  '/insights/mt940-format-camt053-migration': {
    title: 'MT940 Format Explained: Field Tags, Field 86, and the Migration to camt.053 | OG Technologies EU',
    description: 'The SWIFT MT940 bank statement format decoded: every field tag from :20: to :62F:, the :61: statement line, structured :86: remittance data, and how it maps to ISO 20022 camt.053.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-09',
      dateModified: '2026-10-09',
    },
    faq: [
      { q: 'What is the difference between MT940 and camt.053?', a: 'Both are bank statement formats, but MT940 encodes data in colon-delimited text tags while camt.053 uses ISO 20022 XML with typed, structured elements. What MT940 crams into a free-form :86: field becomes separately addressable elements (Ustrd/Strd, references, counterparty details) in camt.053 — which is why ERP auto-matching works far better on camt files.' },
      { q: 'Is MT940 being discontinued?', a: 'There is no mandated end-date for MT940 itself — the SWIFT coexistence deadline applies to payment instructions, not statement reporting. However, banks are individually migrating statement delivery to camt.053, and several European banks already default to it. Plan for a dual-format period rather than a hard cutoff.' },
      { q: 'How do I open an MT940 file in Excel?', a: 'Convert it to CSV first — Excel cannot read the tagged format directly. An MT940 to CSV converter produces a UTF-8 file with one row per transaction: dates, signed amounts, counterparty name/IBAN/BIC, end-to-end references, and a verified running balance.' },
      { q: 'Why does my MT940 parser produce garbled :86: fields?', a: 'Because :86: has no single grammar — German banks use ?NN subfields, SEPA banks embed TAG+ sequences, and others write plain text. A parser needs to detect which dialect is present, or decode both structured styles and fall back to raw text. Character encoding is the second trap: MT940 officially allows only a restricted character set.' },
    ],
  },
  '/insights/eidas2-eudi-wallet': {
    title: 'eIDAS 2.0 and the EUDI Wallet: What Businesses Need to Know Before the Rollout | OG Technologies EU',
    description: 'What the European Digital Identity Wallet contains under eIDAS 2.0 (Regulation (EU) 2024/1183), which businesses must accept it, how it relates to verifiable credentials and EBSI, and what to prepare now.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-09',
      dateModified: '2026-10-09',
    },
    faq: [
      { q: 'Is the EUDI Wallet mandatory for citizens?', a: 'No — use is voluntary for individuals. What is not voluntary is the obligation on certain businesses (relying parties requiring strong customer authentication, and very large online platforms) to accept the wallet when users choose to present it. Member states are also required to offer at least one certified wallet.' },
      { q: 'When must businesses accept the EUDI Wallet?', a: 'Acceptance obligations attach to relying parties that already require strong user authentication by law or contract — banking, telecoms, insurance — plus VLOPs designated under the DSA. The obligations phase in on a transition period after the implementing acts, placing the effective compliance window around 2026–2028 depending on sector and member state.' },
      { q: 'What is the difference between eIDAS 1.0 and eIDAS 2.0?', a: 'eIDAS 1.0 mutually recognized national eID schemes — mostly government-to-government login. eIDAS 2.0 adds the EUDI Wallet as a user-held credential container, makes attribute attestations a regulated trust service, introduces qualified electronic ledgers and archiving, and creates private-sector acceptance obligations.' },
      { q: 'How does the EUDI Wallet relate to verifiable credentials and EBSI?', a: 'Same architecture, evolved standards. The issuer–holder–verifier model, trust registries, and trust-chain verification pioneered in EBSI carry over conceptually, but the EUDI framework standardized on OpenID4VP for presentation, SD-JWT VC and ISO/IEC 18013-5 as formats, and its own governance of trusted lists.' },
    ],
  },
  '/insights/odata-query-options-guide': {
    title: 'OData Query Options Cheat Sheet: $filter, $select, $expand, $orderby | OG Technologies EU',
    description: 'Complete OData query options cheat sheet and guide: $filter operators and functions, $select projections, $expand navigation properties, $orderby, $top/$skip pagination, V2 vs V4 differences, and SAP Gateway specifics.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-09',
      dateModified: '2026-10-20',
    },
    faq: [
      { q: 'What is the difference between OData V2 and V4?', a: "V4 (the OASIS/ISO standard) simplified the protocol: JSON became the default format, substringof('x',F) became contains(F,'x'), date literals dropped the datetime'' wrapper for bare ISO 8601, $inlinecount became $count, and $expand gained nested query options. Most SAP Gateway services are still V2 — check the service metadata before writing queries." },
      { q: 'Is OData still relevant?', a: 'Very much so in enterprise software. Every SAP S/4HANA Fiori app talks to OData services, Microsoft Graph is an OData API, and Dynamics 365, SharePoint, and Teamcenter all expose it. GraphQL displaced it in new public APIs, but inside the SAP and Microsoft ecosystems OData remains the standard data access layer.' },
      { q: 'What is the difference between $filter and $search?', a: "$filter evaluates structured predicates against named properties — Status eq 'Open'. $search performs full-text search across the entity where the server supports it — $search=invoice. Filter is exact and deterministic; search is implementation-defined and only exists in OData V4." },
      { q: 'How do I test an OData URL before using it in code?', a: 'Paste it into a browser — OData GET requests need no tooling beyond a login session. Start with $metadata to confirm property names, build the URL with an OData URL builder, and add $top=5 while iterating so you do not pull entire entity sets.' },
    ],
  },
  '/insights/mt940-field-reference': {
    title: 'MT940 Fields Explained: Complete Tag Reference (:20: to :62F:) | OG Technologies EU',
    description: 'Every MT940 field tag explained: :20:, :21:, :25:, :28C:, :60F:/:60M:, :61:, :86:, :62F:/:62M:, :64:, :65: — plus the :61: subfield anatomy, structured :86: SEPA tags, and transaction codes.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-20',
      dateModified: '2026-10-20',
    },
    faq: [
      { q: 'What is tag :86: in an MT940?', a: ':86: is "Information to Account Owner" — the remittance/remark text attached to the preceding :61: transaction line. In SEPA statements it is usually structured: a ?00 posting code followed by ?NN subfields carrying the counterparty name (?32/?33), IBAN (?31), BIC (?30), and the SEPA remittance tags EREF+, SVWZ+, CRED+, and MREF+.' },
      { q: 'What is the difference between :62F: and :64:?', a: ':62F: is the final book balance of the statement period — what the ledger showed at the closing date. :64: is the available balance — what you could actually withdraw at generation time, after holds and pending debits. Reconciliation should tie against :62F:, not :64:.' },
      { q: 'What do C, D, RC, and RD mean in :61:?', a: 'C is a credit and D a debit. RC and RD are reversal marks: RC reverses a previous debit (money comes back), RD reverses a previous credit (money is taken back — e.g., a returned direct debit). Treat RD entries as negative amounts when summing.' },
      { q: 'Why does the amount use a comma?', a: 'SWIFT MT formats use the comma as the decimal separator and no thousands separator: 1234567,89. Parsers that assume a dot will either mis-parse or return NaN — normalise the comma before converting to a number.' },
    ],
  },
  '/insights/odata-filter-examples': {
    title: 'OData $filter Examples: Operators, Functions, and 40+ Copy-Paste Queries | OG Technologies EU',
    description: 'OData $filter examples cookbook: comparison and logical operators, startswith/contains/endswith, date and number filters, null checks, boolean filters, any/all on collections, and V2 vs V4 syntax.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-20',
      dateModified: '2026-10-20',
    },
    faq: [
      { q: 'Why does my OData filter return a syntax error?', a: "The top three causes: double-quoted strings (use 'single'), V4 syntax on a V2 service (contains(F,'x') → substringof('x',F)), and bare dates on a V2 service (2026-01-01 → datetime'2026-01-01T00:00:00'). Check the service version in $metadata before writing queries." },
      { q: 'How do I filter on a nested or expanded property?', a: "For a single-valued navigation property use a path: $filter=Customer/Country eq 'DE'. For a collection-valued property you need any/all: $filter=Items/any(i:i/Price gt 100) — Items/Price alone is invalid." },
      { q: 'Is OData filter case-sensitive?', a: "Property names are always case-sensitive. String values depend on the backend's collation — most SAP systems are case-sensitive, Microsoft Graph is not. For a case-insensitive match, normalise both sides: tolower(Customer) eq 'contoso'." },
      { q: 'How do I filter by "contains" text?', a: "V4: contains(Field,'text'). V2 (SAP Gateway): substringof('text',Field). Neither supports wildcards — %-style patterns are a SQL thing, not OData." },
    ],
  },
  '/insights/o1js-state-assertions': {
    title: 'o1js State Assertions: getAndRequireEquals vs getAndAssertEquals Explained | OG Technologies EU',
    description: 'What getAndRequireEquals does in o1js, why getAndAssertEquals was renamed, how state preconditions work on Mina zkApps, and what “precondition unsatisfied” actually means.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-20',
      dateModified: '2026-10-20',
    },
    faq: [
      { q: 'What does getAndRequireEquals do in o1js?', a: 'It reads the current value of an on-chain @state field inside a @method and records an account-update precondition that the value must equal what the chain holds when the transaction is included. The proof becomes invalid if another transaction changes the state first.' },
      { q: 'Is getAndAssertEquals different from getAndRequireEquals?', a: 'No — same method, renamed. o1js renamed the assert* precondition API to require* to distinguish account-update preconditions from in-circuit assertions. Update old code by renaming; semantics are unchanged.' },
      { q: 'Is state.get() enough inside a @method?', a: 'Yes, in current o1js this.x.get() inside provable code sets the same equality precondition. getAndRequireEquals() is preferred in code where you want the concurrency guarantee to be visible — it is self-documenting.' },
      { q: "Why can't I call state.get() outside a method?", a: 'Because a precondition only makes sense inside a transaction being proved. Off-chain reads go through fetch() or Mina.getAccount(), which return the raw appState without touching the account-update machinery.' },
    ],
  },
  '/insights/iso-24874-stellar-sdg-impact': {
    title: 'Measuring SDG Impact on Stellar: ISO 24874 KPIs, Benchmarking and Reporting | OG Technologies EU',
    description: 'How to apply the ISO/DPAS 24874 draft framework — KPI catalogue, five-level maturity benchmarking, and the SDG alignment methodology — to measure and report the sustainability impact of Stellar-based solutions.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'What is ISO/DPAS 24874?', a: 'A Draft Publicly Available Specification under development by ISO/TC 307 (Blockchain and distributed ledger technologies) titled "Guidance on the use of smart contracts in contributing to the Sustainable Development Goals." It provides a KPI framework for evaluating smart contracts, a five-level benchmarking maturity model, an SDG alignment methodology, and guiding principles for SDG-oriented oracles, energy accounting, and climate-friendly contract design.' },
      { q: 'Is ISO 24874 a published standard?', a: 'Not yet — DPAS denotes a draft at the Publicly Available Specification stage, still subject to ballot and revision within ISO/TC 307. It is usable today as a reference framework for structuring impact measurement, but treat clause and KPI identifiers as provisional and record the draft edition your reporting is based on.' },
      { q: 'How does StellarCarbon map to the ISO 24874 KPIs?', a: 'Sinking CARBON tokens corresponds to retiring Verra Verified Carbon Units — a direct fit for KPI SDG-01 (verified GHG emissions avoided or reduced, in tCO₂e). Verra acts as the MRV/oracle layer, the on-chain mirror provides public auditability, and registry retirement structurally prevents double counting. Its project co-benefits (REDD+ forest protection in Peru, VCS + CCB-Gold certified) can support SDG 15 linkages where verified.' },
      { q: 'Which SDG targets do Stellar payment solutions typically support?', a: 'Most commonly 1.4 (equal access to economic resources and financial services) and 8.10 (expanding access to banking and financial services) — the same targets the ISO draft assigns to its own financial-inclusion use case — plus 10.c for remittance-cost reduction. Climate-oriented deployments add SDG 13, and transparency architectures can support 16.6/16.10-style accountability claims and SDG 17 partnership objectives.' },
      { q: 'What does "attribution" mean in SDG impact reporting?', a: 'Attribution describes the causal link between your system and the outcome: direct (the system caused it, e.g., disbursements it executed), indirect (it contributed alongside other factors), or enabling (it created conditions for an outcome others deliver). ISO 24874 requires claims to be qualified as "contributing to" an SDG target whenever attribution cannot be established with confidence — the single most important anti-greenwashing rule in the framework.' },
    ],
  },
  '/insights/claude-code-agentic-workflows-mcp': {
    title: 'Claude Code for Enterprise Teams: Agentic Workflows, Subagents, and MCP Integration | OG Technologies EU',
    description: 'How enterprise teams use Claude Code: the agentic loop, CLAUDE.md memory, subagents, Model Context Protocol (MCP) servers, permissions, and governance.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'Does Claude Code replace code review?', a: 'No — it shifts it. Agents generate the diff; reviewers verify intent, edge cases, and fit with the architecture. Teams that skip review accumulate subtle defects faster than they accumulate features.' },
      { q: 'What is the difference between Claude Code and a chat assistant?', a: 'A chat assistant returns text you apply yourself. Claude Code operates the loop end-to-end — reading files, running commands, executing tests — inside your environment, with permissions and an audit trail.' },
      { q: 'Is MCP only for Claude?', a: 'No. MCP is an open protocol now supported by most major AI tools and IDEs. An MCP server you build once works across agents, which is why it has become the standard integration layer.' },
      { q: 'How do we control what the agent can access?', a: 'Through the permission model (scoped tool allowlists), sandboxed execution, MCP servers that expose only the endpoints you choose, and hooks that enforce policy on every tool call. Treat agent credentials like any service account: least privilege, scoped, auditable.' },
    ],
  },
  '/insights/gpt-6-astra-sol-luna-model-tiers': {
    title: 'GPT-6 Explained: Astra, Sol, and Luna — Choosing the Right Model Tier for Your Workload | OG Technologies EU',
    description: 'OpenAI\'s GPT-6 family tiers by cost and intelligence: GPT-6 Astra (flagship), GPT-6.1 Sol (balanced), and GPT-6 Luna (efficient). How to route workloads across tiers.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'Should we always default to the flagship?', a: 'No — that\'s the expensive failure mode. Most production traffic is routine work that Luna or Sol handles at a fraction of the price. Reserve Astra for workloads where you can demonstrate, with evals, that lower tiers fall short.' },
      { q: 'How stable are the tiers for production?', a: 'Model IDs are versioned and point releases ship frequently. Pin model versions per endpoint, run your eval suite before upgrading, and keep a documented rollback — tier improvements can change behavior on edge cases even when averages improve.' },
      { q: 'Is the ~1M context window a reason to skip retrieval (RAG)?', a: 'Usually not. Long context is excellent for single large documents or a codebase slice, but retrieval still wins on cost and latency for corpus-scale questions, and it keeps source attribution explicit.' },
      { q: 'How do we keep tier spend under control?', a: 'Route by workload, cap reasoning effort per endpoint, tag API spend by feature, and review the top-cost endpoints monthly. A monthly report of "tokens by tier by feature" catches drift before it becomes a budget conversation.' },
    ],
  },
  '/insights/devin-autonomous-ai-software-engineer': {
    title: 'Inside Devin: What Autonomous AI Software Engineers Can (and Can\'t) Ship in Production | OG Technologies EU',
    description: 'A practical evaluation of Devin, Cognition\'s autonomous AI software engineer — how ticket-to-PR workflows work, where it excels, and where human engineers still lead.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'Is Devin the same as a coding copilot?', a: 'No. Copilots assist line-by-line inside your editor session. Devin takes whole tasks and executes them asynchronously in its own environment, returning a pull request rather than suggestions.' },
      { q: 'How good is it on benchmarks?', a: 'Devin made its name on SWE-bench-style tasks — real GitHub issues resolved end-to-end. Benchmarks understate what matters operationally: success rate on your backlog, which depends on ticket quality and repo hygiene more than on the model.' },
      { q: 'What tasks should we assign first?', a: 'Dependency upgrades, test coverage gaps, and small well-specified bugs — bounded work with a clear verification signal. Avoid ambiguous feature work until you\'ve calibrated on easy wins.' },
      { q: 'Does it remove the need for code review?', a: 'No — it increases review demand. Every task ends in a PR, and the human merge decision stays mandatory. Plan for review capacity; it becomes the real throughput limit.' },
    ],
  },
  '/insights/deepseek-v4-open-weight-moe-coding-agents': {
    title: 'DeepSeek V4.1 and the Open-Weight Price War: MIT-Licensed MoE Models for Coding Agents | OG Technologies EU',
    description: 'DeepSeek V4.1 Flash ships MIT-licensed weights, a 552B-parameter MoE backbone, and agent-task economics ~40x cheaper than frontier open models. What it means for your AI stack.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'Is DeepSeek V4.1 really free to use commercially?', a: 'Yes — the weights are MIT-licensed, the most permissive mainstream license. You can run, modify, and embed it commercially with no usage restrictions. Hosted API access is priced separately by whichever provider serves it.' },
      { q: 'Should we self-host or use an API?', a: 'Self-host only if you have the GPU capacity (552B total parameters) and the utilization to justify it — continuous high-volume agent fleets, or hard data-residency requirements. Otherwise a hosted open-weights inference provider gives you the same model at per-token prices, often on EU/US infrastructure.' },
      { q: 'How does it compare to frontier models like GPT-6 or Claude 5.5?', a: 'On independent agentic-coding evals it sits just below the proprietary frontier while costing a small fraction per task. The right architecture usually isn\'t "either/or" — route hard judgment steps to frontier tiers and the high-volume agent loops to open-weight models.' },
      { q: 'Is it safe to send our code to a DeepSeek-hosted API?', a: 'For EU organizations, a China-hosted endpoint raises data-residency and GDPR considerations. The MIT license solves this cleanly: the same weights run on EU/US-hosted inference providers or your own infrastructure, so you can get the model without the data leaving your chosen jurisdiction.' },
    ],
  },
  '/insights/gemini-4-argon-antigravity-agentic-coding': {
    title: 'Gemini 4 Argon and Antigravity: Google\'s New Agentic Coding Stack, Explained | OG Technologies EU',
    description: 'Gemini 4 Argon is Google\'s newest frontier model — #1 on the Vals Index — paired with Antigravity, an agent-first IDE. What the stack means for engineering teams.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'Is Gemini 4 Argon available now?', a: 'Yes — generally available since October 13, 2026 via the Gemini API and AI Studio, and inside Antigravity for Google AI Ultra subscribers.' },
      { q: 'What makes Antigravity different from other AI IDEs?', a: 'Its primary surface is an agent manager: you dispatch and supervise multiple parallel agents and review structured walkthroughs of their work, rather than editing files with an assistant at your cursor. It\'s designed around orchestration first, editing second.' },
      { q: 'Should we switch from our current agentic stack?', a: 'Evaluate on your own codebase before deciding — run a fixed task suite through both stacks and compare acceptance rate, cost, and review effort. The introductory pricing makes a real pilot cheap right now.' },
      { q: 'How does the 1M context window affect cost?', a: 'Large contexts are expensive per call but cheap when cached — the 95% cache discount rewards keeping a stable prefix (your codebase, your conventions) and varying only the task. Design prompts to maximize cache hits.' },
    ],
  },
  '/insights/kimi-k3-open-weight-agentic-model': {
    title: 'Kimi K3: Inside the 2.8-Trillion-Parameter Open Model Leading Agentic Benchmarks | OG Technologies EU',
    description: 'Moonshot AI\'s Kimi K3 is the largest open-weight flagship at 2.8 trillion parameters — leading agentic coding benchmarks. What it offers, and the hosting reality.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'Can we self-host Kimi K3?', a: 'Practically, no — at 2.8T total parameters, full-quality serving needs a multi-node GPU cluster. Use a hosted API, or pick a smaller family variant or distilled model if self-hosting is a hard requirement.' },
      { q: 'Is K3 better than DeepSeek V4.1?', a: 'On independent evals they\'re statistically tied at the top of the open-weight field, with different strengths: K3 has the higher ceiling on the hardest agentic tasks; DeepSeek is dramatically cheaper per task and more self-hostable. Evaluate both on your own workload.' },
      { q: 'What about data residency?', a: 'Same consideration as any China-lab model: prefer inference providers hosting the open weights in your chosen jurisdiction over the vendor\'s own endpoint when data sensitivity demands it.' },
      { q: 'Where does Kimi fit vs. GPT-6 or Claude 5.5?', a: 'K3 narrows the gap on agentic benchmarks at a fraction of frontier prices, but proprietary flagships still lead the hardest reasoning work. Most production stacks end up tiered: open-weight models for volume, frontier models for judgment-critical steps.' },
    ],
  },
  '/insights/glm-5-zai-long-horizon-agents': {
    title: 'GLM-5.3 Explained: Z.ai\'s Open-Weight Model for Long-Horizon Agent Sessions | OG Technologies EU',
    description: 'Z.ai\'s GLM-5.3 targets long-horizon agent and engineering sessions at the cheapest API tier in its class. Capabilities, positioning vs DeepSeek and Kimi, and when to use it.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    },
    faq: [
      { q: 'Is Z.ai the same company as Zhipu?', a: 'Yes — Z.ai is the international brand of Zhipu AI, the Beijing lab behind the GLM (General Language Model) series, one of China\'s earliest foundation-model efforts.' },
      { q: 'When should we pick GLM over DeepSeek?', a: 'When your workloads are long-horizon: multi-hour agent sessions, deep refactoring loops, standing maintenance agents. GLM\'s differentiation is session stability; DeepSeek\'s is raw cost-per-task on shorter, retriable work.' },
      { q: 'What does GLM-5.3-Flash\'s video input enable?', a: 'Agents that can interpret screen recordings and UI walkthroughs — useful for QA agents watching app flows, documentation generation from demos, or verifying UI changes visually instead of only through the DOM.' },
      { q: 'Are the weights really open?', a: 'Yes — GLM-5.3 weights were released openly days after the API launch, enabling self-hosting, fine-tuning, and deployment through third-party inference providers in whatever jurisdiction you choose.' },
    ],
  },
  '/insights/eu-ai-act-compliance-guide': {
    title: 'EU AI Act Compliance: What the August 2026 Obligations Mean for Your Business | OG Technologies EU',
    description: 'The EU AI Act\'s general application date passed on 2 August 2026 — transparency duties, deployer obligations, and high-risk rules now apply to most AI systems.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-23',
      dateModified: '2026-10-23',
    },
    faq: [
      { q: 'Does the AI Act apply to companies outside the EU?', a: 'Yes, where the AI system\'s output is used in the EU. A US or UK company whose chatbot serves EU customers, or whose screening tool evaluates EU candidates, is in scope under the same extraterritorial logic as GDPR.' },
      { q: 'Do we have to disclose that customers are talking to a chatbot?', a: 'Yes — Article 50 has applied since 2 August 2026. AI systems interacting directly with natural persons must inform them they are interacting with AI, unless obvious from context. A short, conspicuous notice at the start of the interaction satisfies it.' },
      { q: 'Is using a third-party LLM enough to make us a provider?', a: 'Usually not — calling a model API as a deployer stays a deployer role. You become a provider if you place an AI system on the market under your own name, substantially modify a GPAI model, or repurpose a general system into a high-risk use case.' },
      { q: 'Does ISO/IEC 42001 certification equal AI Act compliance?', a: 'No — certification is evidence of governance maturity, not a legal safe harbor. But an AIMS gives you the inventory, risk process, and documentation machinery the Act assumes you have, and harmonized standards will provide presumption-of-conformity routes once published.' },
      { q: 'What is the deadline most companies actually face?', a: 'It already passed: 2 August 2026 brought transparency duties, deployer obligations, and Annex III high-risk rules into force. The remaining milestone is 2 August 2027 for AI embedded in regulated products. Compliance now is catch-up, not preparation.' },
    ],
  },
  '/insights/nis2-compliance-iso-27001': {
    title: 'NIS2 Compliance: Scope, Management Liability, and the ISO 27001 Shortcut | OG Technologies EU',
    description: 'Who NIS2 covers, what Article 21 requires, the 24/72-hour reporting clock, management liability — and how ISO 27001 covers most of the ground.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-23',
      dateModified: '2026-10-23',
    },
    faq: [
      { q: 'Is my company in scope for NIS2?', a: 'If you operate in an Annex I or II sector in the EU and have 50+ employees or over EUR 10M turnover, yes. Digital infrastructure, cloud, DNS, and managed-service providers are covered regardless of size — and even a small company can be designated by a member state as critical to public safety or systemic resilience.' },
      { q: 'Can directors really be held personally liable?', a: 'Yes — Article 20 requires the management body to approve the measures, oversee implementation, and train accordingly. National laws implement liability through fines on the entity and, for essential entities, the power to temporarily suspend responsible managers from their functions.' },
      { q: 'Is ISO 27001 certification enough for NIS2?', a: 'Not alone — the directive adds the 24/72-hour reporting regime, registration, management accountability, and sector-specific rules no certificate covers. But a certified ISMS implements most of Article 21 and provides the evidence structure supervisors expect; it is the fastest credible path.' },
      { q: 'How does NIS2 relate to DORA?', a: 'DORA is sector-specific law for financial entities — where the two overlap, DORA prevails as lex specialis. Banks, insurers, and CASPs follow DORA\'s testing, incident, and register regimes; their non-financial group entities may still sit under NIS2.' },
      { q: 'What if an incident is also a personal-data breach?', a: 'Both regimes apply in parallel: report the significant incident to the CSIRT under NIS2\'s 24/72-hour clock and the personal-data breach to the data protection authority under GDPR\'s 72-hour rule. Plan for two lanes, not one.' },
    ],
  },
  '/insights/cyber-resilience-act-cra-guide': {
    title: 'EU Cyber Resilience Act: SBOMs, CE Marking, and the December 2027 Deadline | OG Technologies EU',
    description: 'CRA vulnerability-reporting duties apply since September 2026 and full obligations land December 2027 — SBOMs, secure updates, CE marking for products with digital elements.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-23',
      dateModified: '2026-10-23',
    },
    faq: [
      { q: 'Does the CRA cover SaaS and cloud services?', a: 'Pure online services are out of scope — NIS2 covers those. But a cloud component that is integral to a product\'s functionality is assessed as part of the product: a smart lock\'s companion app and its backend are within the product\'s security boundary.' },
      { q: 'Is the SBOM made public?', a: 'No — it is part of the technical documentation shared with market-surveillance authorities on request. What is public is the CE marking and the declaration of conformity; the component inventory stays in your technical file.' },
      { q: 'How long must security support last?', a: 'At least 5 years, or the product\'s expected lifetime if that is shorter. Security updates must be made available free of charge, and the support commitment becomes part of product documentation.' },
      { q: 'What applies right now versus December 2027?', a: 'Now: the reporting duties — 24-hour early warning and 72-hour notification for actively exploited vulnerabilities and severe incidents — plus the authority framework machinery. December 2027: the essential security requirements, conformity assessment, technical documentation, and CE marking obligations for products placed on the market.' },
      { q: 'Does CRA apply to open-source projects?', a: 'Non-commercial open-source development is exempt. Commercial activity changes the answer — monetized OSS products fall in scope — and a separate open-source steward regime gives foundations light-touch duties around cybersecurity policies and cooperation with authorities.' },
    ],
  },
  '/insights/how-to-choose-crm-ticketing-system': {
    title: "How to Choose a CRM and Ticketing System: A Practical Buyer's Guide | OG Technologies EU",
    description: "A practical framework for evaluating CRM and ticketing systems: must-have capabilities, data model, migration and CSV import, GDPR and EU hosting, integrations, and pricing models — with a buyer's checklist.",
    ogType: 'article',
    article: {
      datePublished: '2026-10-13',
      dateModified: '2026-10-13',
    },
    faq: [
      { q: 'Should I buy CRM and helpdesk as one product or two?', a: 'One product for most small and mid-sized teams: a shared customer record beats the integrations you would otherwise have to build and maintain. Split only when a specialized requirement (telephony, dispatch, ITSM change management) justifies it.' },
      { q: 'What should a CRM CSV import include?', a: 'At minimum: name and email. Ideally also phone, company, job title, tags, and status (customer/lead/prospect). Deduplicate by email before importing.' },
      { q: 'How long does CRM migration take?', a: 'For clean contact data under ~10k records, an afternoon: export, dedupe, map columns, import, spot-check. The slow part is never the import — it is deciding which stale records and dead custom fields to leave behind.' },
      { q: 'Is per-seat or flat pricing better?', a: 'Per-seat is fine at small headcount if the per-seat price is honest and features are not gated aggressively. Flat pricing wins as teams grow. Model the 24-month cost at your projected size before deciding — the model matters less than the trajectory.' },
    ],
  },
  '/insights/helpdesk-workflow-best-practices': {
    title: 'Helpdesk Workflow Best Practices: From Ticket Intake to Resolution | OG Technologies EU',
    description: 'A practical helpdesk workflow: ticket intake and triage, priority and SLA rules, ownership and escalation paths, automation, and the metrics (FRT, resolution time, backlog, CSAT) that tell you if it is working.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-13',
      dateModified: '2026-10-13',
    },
    faq: [
      { q: 'What is a good first response time?', a: 'Depends on channel and priority, but as a baseline: under 1 hour for urgent issues, under 4 business hours for high priority, under one business day for normal tickets. Consistency matters more than raw speed.' },
      { q: 'How many priority levels should we use?', a: 'Four is the practical maximum: urgent, high, normal, low. More levels means triage meetings about edge cases instead of answers. If two levels are routinely treated the same, merge them.' },
      { q: 'When should a ticket be escalated?', a: 'Three triggers: SLA breach risk, capability (the owner cannot solve it), and business risk (the ticket involves a churn-threatened or high-value account). Escalate early; a late escalation costs more than a premature one.' },
      { q: 'Should support agents see CRM data?', a: 'Yes — customer context (plan, renewal dates, open deals, past tickets) changes how a ticket should be handled and often what the right answer is. That is the core argument for a unified CRM + ticketing platform over two separate tools.' },
    ],
  },
  '/insights/iso-9001-implementation-guide': {
    title: 'ISO 9001 Implementation: Step-by-Step Guide to Certification | OG Technologies EU',
    description: 'How to implement ISO 9001:2015 and get certified: clauses 4–10 explained, the seven quality management principles, the Stage 1/Stage 2 audit process, realistic timelines, and a free readiness checker with PDF report.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-16',
      dateModified: '2026-10-16',
      author: {"@type": "Organization", "name": "OG Technologies EU"},
      image: 'https://www.ogtechnologies.co/og-og-image.png',
    },
    faq: [
      { q: 'How long does ISO 9001 implementation take?', a: 'For a small organization with reasonably documented processes, typically 3–6 months. Mid-size companies should budget 6–12 months, and multi-site or regulated-scope implementations 12–18 months. The dominant variable is how much process documentation already exists.' },
      { q: 'Is ISO 9001 certification mandatory?', a: 'No — it is a voluntary standard. In practice it is often contractually mandatory: many tenders, supply chains, and enterprise customers require it, and sector schemes like IATF 16949 (automotive) and AS9100 (aerospace) build directly on it.' },
      { q: 'What is the difference between implementing ISO 9001 and getting certified?', a: 'Implementation means building and running the QMS; certification means an accredited third party has audited it and issued a certificate. You can implement without certifying, but only certification produces the document customers and procurement portals ask for.' },
      { q: 'What are the seven quality management principles?', a: 'Customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, and relationship management. They come from ISO 9000:2015 and form the conceptual basis for the clause requirements.' },
      { q: 'How much does ISO 9001 certification cost?', a: 'Certification-body fees scale with headcount and sites via audit-day tables (IAF MD5). Small companies typically pay €3,000–€10,000 for the initial audit cycle, plus annual surveillance fees — internal effort or consultant fees for implementation are separate and usually the larger cost.' },
      { q: 'Does ISO 9001 have a control catalog like ISO 27001\'s Annex A?', a: 'No. ISO 9001 is purely clause-based — conformance means satisfying clauses 4–10. There is no Annex A control list and no Statement of Applicability; that mechanism belongs to ISO 27001 and ISO 42001.' },
    ],
  },
  '/insights/iso-27001-annex-a-controls': {
    title: 'ISO/IEC 27001 Annex A Controls: The Complete List of 93 Controls (2022) | OG Technologies EU',
    description: 'All 93 ISO/IEC 27001:2022 Annex A controls listed by reference and title across the 4 themes (Organizational, People, Physical, Technological) — plus how to select them in your Statement of Applicability. Free controls checklist download.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-16',
      dateModified: '2026-10-16',
      author: {"@type": "Organization", "name": "OG Technologies EU"},
      image: 'https://www.ogtechnologies.co/og-og-image.png',
    },
    faq: [
      { q: 'How many controls are in ISO 27001 Annex A?', a: '93 controls in the 2022 edition, grouped into 4 themes: 37 Organizational (A.5), 8 People (A.6), 14 Physical (A.7), and 34 Technological (A.8). The previous 2013 edition had 114 controls across 14 domains.' },
      { q: 'Are all 93 Annex A controls mandatory?', a: 'No. Annex A is a reference set — you select applicable controls through the Statement of Applicability based on your risk assessment and scope. What is mandatory is the process: you must compare your risk treatment plan against all 93 controls and justify each inclusion or exclusion.' },
      { q: 'What changed between ISO 27001:2013 and 2022 Annex A?', a: 'The 14 domains collapsed into 4 themes, the control count went from 114 to 93 (merged, not just deleted), and 11 new controls arrived — including threat intelligence, cloud services, data masking, data leakage prevention, web filtering, and secure coding. Each control also gained attributes for tagging and NIST CSF mapping.' },
      { q: 'What are Annex A control attributes?', a: 'Tags attached to each control — control type (preventive/detective/corrective), security properties (confidentiality/integrity/availability), NIST CSF cybersecurity concepts, and operational capabilities. They let you filter the 93 controls into views and map them to other frameworks.' },
      { q: 'Do I need to map Annex A to NIST or CIS controls?', a: 'Not required, but useful. Annex A attributes already include a conceptual link to NIST CSF functions. If you must report against multiple frameworks (SOC 2, CIS v8, NIST CSF), mapping once in your SoA or GRC tool avoids repeating the assessment — many Annex A controls overlap substantially.' },
    ],
  },
  '/insights/soc-2-trust-services-criteria': {
    title: 'SOC 2 Trust Services Criteria: The Complete List Explained | OG Technologies EU',
    description: 'All 52 AICPA Trust Services Criteria listed and explained: the 33 Common Criteria (CC1–CC9) required in every SOC 2 report, plus the optional Availability, Processing Integrity, Confidentiality, and Privacy categories.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-16',
      dateModified: '2026-10-16',
      author: {"@type": "Organization", "name": "OG Technologies EU"},
      image: 'https://www.ogtechnologies.co/og-og-image.png',
    },
    faq: [
      { q: 'How many Trust Services Criteria are there?', a: '52 in the 2017 TSC: 33 Common Criteria across the CC1–CC9 series, plus 19 additional criteria — 3 Availability, 5 Processing Integrity, 2 Confidentiality, and 9 Privacy. Only the 33 Common Criteria are mandatory; the rest apply only if those categories are in scope.' },
      { q: 'Are the Trust Services Criteria the same as controls?', a: 'No. Criteria describe desired outcomes; controls are the mechanisms you implement to meet them. Two companies can satisfy the same criterion with different toolchains — this is the core difference from ISO 27001\'s prescriptive Annex A control list.' },
      { q: 'Which criteria matter most for a first SOC 2?', a: 'Auditors find the most exceptions in CC6 (logical access — MFA, access reviews, deprovisioning), CC7 (monitoring and incident response evidence), and CC8 (change management approval trails). A risk register that maps risks to controls (CC3/CC5) is another common gap.' },
      { q: 'Do the criteria map to ISO 27001 or NIST?', a: 'Substantially — the AICPA publishes official mapping supplements to ISO/IEC 27001 Annex A, NIST CSF, and COBIT. CC1–CC5 map onto organizational/management controls, CC6–CC8 onto technological controls. A functioning ISMS typically already covers 60–80% of the Common Criteria.' },
      { q: 'What changed in the 2017 TSC versus the older principles?', a: 'The 2017 revision replaced the legacy Trust Services Principles with the CC-series structure aligned to the 2013 COSO framework, adding points of focus per criterion. The 2022 update revised those points of focus (cloud, DevOps, SaaS examples) without changing the criteria themselves.' },
    ],
  },
  '/insights/soc-2-vs-iso-27001': {
    title: 'SOC 2 vs ISO 27001: Differences, Overlap, and Which You Need | OG Technologies EU',
    description: 'SOC 2 vs ISO 27001 compared: attestation vs certification, Trust Services Criteria vs Annex A controls, Type I/II reports, cost, timeline, US vs international recognition — and how much work carries over if you do both.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-16',
      dateModified: '2026-10-16',
      author: {"@type": "Organization", "name": "OG Technologies EU"},
      image: 'https://www.ogtechnologies.co/og-og-image.png',
    },
    faq: [
      { q: 'Is SOC 2 a certification?', a: 'No — it is an attestation. A CPA firm issues an opinion report on whether your controls meet the Trust Services Criteria; there is no certificate, and auditors issue unqualified, qualified, or adverse opinions rather than pass/fail.' },
      { q: 'Does SOC 2 satisfy ISO 27001 requirements?', a: 'No — they are separate frameworks with different auditors and deliverables. However, 60–80% of the underlying controls overlap, so the second framework is substantially cheaper to add than the first.' },
      { q: 'Which is harder to get?', a: 'Comparable effort distributed differently: ISO 27001 demands more documentation discipline (ISMS, SoA, mandatory records), while SOC 2 Type II demands demonstrated operational consistency over a 3–12 month observation period.' },
      { q: 'Do we need both?', a: 'Only if your customers require both — typically US enterprise deals (SOC 2) plus international or regulated-market sales (ISO 27001). Otherwise pick the one your target buyers ask for; one clean report beats two half-built programs.' },
      { q: 'What about SOC 3?', a: 'SOC 3 covers the same Trust Services Criteria but produces a short public report — a shareable marketing version of SOC 2 with a displayable seal. It requires a completed SOC 2 examination; it is a publishing format, not a separate audit.' },
    ],
  },
  '/insights/pdf-metadata-guide': {
    title: 'PDF Metadata Explained: How to View, Edit & Remove It | OG Technologies EU',
    description: 'Every PDF carries hidden metadata — author names, timestamps, tool fingerprints. What the document info dictionary and XMP stream contain, how to inspect them, and how to strip metadata before sharing.',
    ogType: 'article',
    article: {
      datePublished: '2026-10-18',
      dateModified: '2026-10-18',
      author: {"@type": "Organization", "name": "OG Technologies EU"},
      image: 'https://www.ogtechnologies.co/og-og-image.png',
    },
    faq: [
      { q: 'What metadata does a PDF contain?', a: 'A document information dictionary with title, author, subject, keywords, creator, producer, and creation/modification timestamps — plus optional custom fields. Most PDFs also embed an XMP metadata packet (an XML stream) duplicating and extending those properties.' },
      { q: 'What is the difference between Creator and Producer?', a: 'Creator names the application that authored the original content (e.g., Microsoft Word); Producer names the library or engine that converted it to PDF (e.g., Adobe PDF Library, iText). They often differ.' },
      { q: 'Does removing PDF metadata change the document?', a: 'No — only the document information dictionary and the XMP metadata stream are removed. Pages, text, images, fonts, and layout are preserved exactly.' },
      { q: 'Does removing metadata fully anonymize a PDF?', a: 'No. It removes document-level properties — author, timestamps, tool names. Author names on comments and annotations, embedded files, hidden layers, and page content itself are not affected.' },
      { q: 'Is it safe to edit PDF metadata online?', a: 'With a client-side tool, yes — the file is parsed and rewritten in your browser and never transmitted. Server-based tools upload the document first, which you can verify in the network tab.' },
    ],
  },
  '/ventures': { title: 'Ventures - OG Technologies EU', description: 'Supporting startups, spin-offs, and intrapreneurship programs in Web3 and blockchain.' },
  '/about': {
    title: 'About Us - OG Technologies EU | IT Consulting in Vienna',
    description: 'OG Technologies EU is a Vienna-based IT consultancy specializing in payment infrastructure, DLT, digital identity, and international standards. Learn about our mission, values, and expertise.',
    jsonLd: [{"@context": "https://schema.org", "@type": "AboutPage", "name": "About OG Technologies EU", "url": "https://www.ogtechnologies.co/about/", "description": "OG Technologies EU is a Vienna-based IT consultancy specializing in payment infrastructure, DLT, digital identity, and international standards.", "about": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/", "email": "hi@ogtechnologies.co", "address": {"@type": "PostalAddress", "streetAddress": "Widerhofergasse 6 / 12", "postalCode": "1090", "addressLocality": "Vienna", "addressCountry": "AT"}}}],
  },
  '/portfolio': {
    title: 'Portfolio - OG Technologies EU',
    description: 'Explore our innovative projects including EduNode, Mozart Pay, and Stellar Go CLI.',
    jsonLd: [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "Portfolio - OG Technologies EU", "url": "https://www.ogtechnologies.co/portfolio/", "description": "Projects developed under OG Technologies: EduNode, Mozart Pay, and Stellar Go CLI.", "creator": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}, "hasPart": [{"@type": "CreativeWork", "name": "EduNode", "description": "Educational platform for STEM, Web3, and AI — grant-funded by the Stellar Development Foundation.", "url": "https://www.ogtechnologies.co/portfolio/edunode/"}, {"@type": "CreativeWork", "name": "Mozart Pay", "description": "Payment platform built on the Stellar network with Circle USDC/EURC settlement.", "url": "https://www.ogtechnologies.co/portfolio/mozart-pay/"}, {"@type": "SoftwareSourceCode", "name": "Stellar Go CLI", "description": "Open-source Go command-line toolkit for the Stellar ecosystem — wallets, payments, SEP-41 assets, W3C DIDs/Verifiable Credentials, ISO 20022 reporting, Soroban RPC, and an MCP server.", "url": "https://www.ogtechnologies.co/portfolio/stellar-go-cli/"}]}],
  },
  '/portfolio/edunode': {
    title: 'EduNode - STEM, Web3 & AI Education Platform | OG Technologies EU',
    description: 'EduNode is OG Technologies\' educational platform for STEM, Web3, and AI — grant-funded by the Stellar Development Foundation with open-source components.',
    jsonLd: [{"@context": "https://schema.org", "@type": "WebApplication", "name": "EduNode", "url": "https://edunode.org/", "description": "Educational platform for STEM, Web3, and AI — grant-funded by the Stellar Development Foundation.", "applicationCategory": "EducationalApplication", "creator": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}}],
  },
  '/portfolio/mozart-pay': {
    title: 'Mozart Pay - Stellar Payment Platform with USDC/EURC | OG Technologies EU',
    description: 'Mozart Pay is OG Technologies\' Stellar-based payment platform using Circle USDC/EURC for fast, low-cost cross-border payments.',
    jsonLd: [{"@context": "https://schema.org", "@type": "WebApplication", "name": "Mozart Pay", "url": "https://mozartpay.com/", "description": "Payment platform built on the Stellar network with Circle USDC/EURC settlement for cross-border payments.", "applicationCategory": "FinanceApplication", "creator": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}}],
  },
  '/portfolio/stellar-go-cli': {
    title: 'Stellar Go CLI - Open-Source Stellar Developer Toolkit | OG Technologies EU',
    description: 'Open-source Go CLI for Stellar: wallets, payments, swaps, SEP-41 assets, W3C DIDs/Verifiable Credentials, ISO 20022 reporting, Soroban RPC, and an MCP server. Apache 2.0.',
    jsonLd: [{"@context": "https://schema.org", "@type": "SoftwareSourceCode", "name": "Stellar Go CLI", "codeRepository": "https://github.com/stellar-go-cli/stellar-go-cli", "programmingLanguage": "Go", "license": "https://www.apache.org/licenses/LICENSE-2.0", "description": "Open-source command-line toolkit for the Stellar ecosystem: wallets, payments, swaps, SEP-41 assets, W3C DIDs/Verifiable Credentials, ISO 20022 reporting, a pure-Go Soroban RPC client, and an MCP server.", "author": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}}],
  },
  '/partners': {
    title: 'Partner Program - Revenue Share Partnerships | OG Technologies EU',
    description: 'Earn revenue share referring enterprise IT, blockchain, and compliance contracts. Referral, reseller, and co-delivery partnership models for consultants, MSPs, and agencies.',
    jsonLd: [{"@context": "https://schema.org", "@type": "WebPage", "name": "Partner Program - OG Technologies EU", "url": "https://www.ogtechnologies.co/partners/", "description": "Revenue-share partnership program for consultants, MSPs, and agencies referring enterprise IT, blockchain, and compliance contracts to OG Technologies EU.", "about": {"@type": "Thing", "name": "Revenue share partnership program"}, "provider": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}}],
  },
  '/expert-hub': {
    title: 'Expert Hub - Freelance & Contract Projects | OG Technologies EU',
    description: 'Join the OG Technologies EU Expert Hub — freelance and contract work for independent developers and consultants on blockchain, payments, compliance, and healthcare IT projects. Browse open projects and apply.',
    faq: [
      { q: 'Is the Expert Hub the same as a job at OG Technologies?', a: 'No — the Hub is for independent freelancers and contractors who join us on specific projects. If you\'re looking for employment, check our careers page instead.' },
      { q: 'Do I need to be based in the EU?', a: 'No. Most work is remote; we ask for a few hours of overlap with European time zones. Individual postings note when a client requires EU-based contractors.' },
      { q: 'How do rates work?', a: 'You state your day or hourly rate in the application. When a project matches, we agree scope and terms in writing before work starts — no unpaid discovery.' },
      { q: 'What does the paid trial task look like?', a: 'A small, real piece of work scoped to a few hours — a parser, a contract module, a control mapping — paid at your rate. It replaces a long interview loop.' },
      { q: 'Can I apply if no open project matches my skills?', a: 'Yes — choose "General application" in the form. Most matches happen when new projects come in, not from the board, so the bench is the point.' },
      { q: 'Who owns the work I produce?', a: 'Engagement deliverables are assigned per the project agreement. Your own tools, libraries, and know-how stay yours — and your existing clients stay your clients.' },
    ],
    jsonLd: [
      {"@context": "https://schema.org", "@type": "WebPage", "name": "Expert Hub - OG Technologies EU", "url": "https://www.ogtechnologies.co/expert-hub/", "description": "Freelance and contract network for independent developers and consultants — open project board and application to join OG Technologies EU delivery engagements.", "about": {"@type": "Thing", "name": "Freelance expert network"}, "provider": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}},
      ...EXPERT_PROJECTS.filter((p) => p.status === 'open').map((p) => ({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": p.title,
        "description": `${p.summary} Required skills: ${p.skills.join(', ')}. Engagement type: ${p.type}; duration: ${p.duration}; commitment: ${p.commitment}; location: ${p.location}.`,
        "identifier": {"@type": "PropertyValue", "name": "OG Technologies EU", "value": p.id},
        "datePosted": p.datePosted,
        "validThrough": p.validThrough,
        "employmentType": "CONTRACTOR",
        "jobLocationType": "TELECOMMUTE",
        "hiringOrganization": {"@type": "Organization", "name": "OG Technologies EU", "sameAs": "https://www.ogtechnologies.co/", "logo": "https://www.ogtechnologies.co/og-og-image.png"},
        "jobLocation": {"@type": "Place", "address": {"@type": "PostalAddress", "addressLocality": "Vienna", "addressCountry": "AT"}},
        "url": "https://www.ogtechnologies.co/expert-hub/#openings",
      })),
    ],
  },
  '/publications': {
    title: 'Publications - Blockchain Standardization Reports | OG Technologies EU',
    description: 'Published standardization reports on blockchain interoperability, regulatory compliance, verifiable credentials, and secure protocols for cross-border payments — produced as a BlockStand expert.',
    jsonLd: [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "Publications - OG Technologies EU", "url": "https://www.ogtechnologies.co/publications/", "description": "Standardization reports authored by OG Technologies EU as a BlockStand expert on cross-border payments.", "publisher": {"@type": "Organization", "name": "OG Technologies EU", "url": "https://www.ogtechnologies.co/"}, "hasPart": [{"@type": "Report", "headline": "Framework for Blockchain Interoperability in Cross-Border Payments", "url": "https://blockstand.eu/blockstand/uploads/2025/05/Framework_for_Blockchain_Interoperability_in_Cross_Border_Payments_version-v1.2.pdf"}, {"@type": "Report", "headline": "Regulatory Compliance and Governance Model for Cross-Border Payments using Blockchain Technology", "url": "https://blockstand.eu/blockstand/uploads/2025/05/Regulatory_compliance_and_Governance_Model_1.0.pdf"}, {"@type": "Report", "headline": "Integrating Verifiable Credentials and Decentralized Identifiers in Cross-Border Payments", "url": "https://blockstand.eu/blockstand/uploads/2025/05/Use_cases__benefits__opportunities_and_interoperability_benefits_of_integrating_VCs_and_DIDs_in_cross_border_payment.pdf"}, {"@type": "Report", "headline": "Secure Transaction Protocol Blueprint", "url": "https://blockstand.eu/blockstand/uploads/2025/05/Secure_Transaction_Protocol_Blueprint_1_0.pdf"}]}],
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
    featureList: ["Merge two PDF files into one", "Split a PDF at any page", "Convert PNG/JPG images to PDF", "Convert DOCX, ODT, and TXT documents to PDF", "Convert PDF to Word (.docx, .txt, .html)", "View, edit, and remove PDF metadata"],
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
      'CSV export of scores and gap list',
      'Free Excel/PDF gap analysis template and Annex A CSV checklist',
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
  '/tools/soc-2-readiness-checker': {
    title: 'SOC 2 Readiness Checker - Free Trust Services Criteria Assessment | OG Technologies EU',
    description: 'Free SOC 2 readiness assessment based on the AICPA Trust Services Criteria. Check your controls across Security (Common Criteria), Availability, Processing Integrity, Confidentiality, and Privacy — instant score, prioritized gaps, downloadable PDF report. No signup.',
    appCategory: 'SecurityApplication',
    featureList: [
      'Trust Services Criteria assessment — Common Criteria (CC1–CC9) plus optional Availability, Processing Integrity, Confidentiality, and Privacy categories',
      'Scope-aware scoring — out-of-scope categories marked N/A are excluded',
      'Readiness score with letter grade',
      'Prioritized gap list with remediation recommendations',
      'Downloadable PDF report',
      'Estimated weeks to SOC 2 readiness',
    ],
    faq: [
      { q: 'What is a SOC 2 readiness assessment?', a: 'A readiness assessment compares your current controls against the AICPA Trust Services Criteria before you hire an auditor. It surfaces the gaps that would cause exceptions in a real examination, so you can remediate before the observation period starts.' },
      { q: 'What is the difference between SOC 2 Type I and Type II?', a: 'Type I audits whether controls are suitably designed at a point in time. Type II verifies they operated effectively over an observation period of typically 3–12 months. Most buyers ask for Type II; Type I is the usual first step.' },
      { q: 'Which Trust Services Categories do I need?', a: 'Security (the Common Criteria) is always required. Add Availability for uptime commitments, Processing Integrity for transaction processing, Confidentiality for sensitive business data, and Privacy for personal information. Out-of-scope questions can be marked N/A.' },
      { q: 'How long does SOC 2 take?', a: 'Readiness work typically takes 2–6 months depending on starting point. A Type I audit adds a few weeks; Type II requires a 3–12 month observation period. Organizations with ISO 27001 often move much faster.' },
      { q: 'Is this a substitute for a SOC 2 audit?', a: 'No — this is a self-assessment that produces a baseline and remediation roadmap. A SOC 2 report can only be issued by a licensed CPA firm after a formal examination.' },
      { q: 'Is my assessment data uploaded or stored?', a: 'No — scoring and PDF generation run entirely in your browser. Only your contact details are submitted, to send you a copy of the report.' },
    ],
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
  '/tools/servicenow-query-builder': {
    title: 'ServiceNow Encoded Query Builder - Free Online Tool | OG Technologies EU',
    description: 'Build and decode ServiceNow encoded queries visually — ^, ^OR, and ^NQ joiners with all operators (CONTAINS, IN, BETWEEN, ISEMPTY, ON). Generates sysparm_query URLs and GlideRecord scripts. 100% client-side.',
    featureList: ["Visual condition editor with ^, ^OR, and ^NQ joiners", "All encoded query operators: CONTAINS, IN, BETWEEN, ISEMPTY, ON, SAMEAS, GT_FIELD, and more", "Decode mode parses existing queries, sysparm_query values, or Table API URLs", "Generates URL-encoded sysparm_query, Table API URL, and GlideRecord script", "100% client-side — no data sent to any server"],
    faq: [
      { q: 'What is a ServiceNow encoded query?', a: 'An encoded query is ServiceNow\'s compact condition syntax — field + operator + value pairs joined by ^ (AND), ^OR (OR), or ^NQ (new query group). The same string works in list filters, GlideRecord.addEncodedQuery(), and the Table API\'s sysparm_query parameter.' },
      { q: 'How do I use this with the Table API?', a: 'Enter your instance name and table, then copy the generated Table API URL — the query is already URL-encoded in the sysparm_query parameter. Send it as a GET request with Basic Auth or an OAuth Bearer token. Add sysparm_fields, sysparm_limit, and other parameters as needed.' },
      { q: 'What does ^NQ (New Query) do?', a: '^NQ starts a new top-level query group that is OR\'d with everything before it. It\'s how you express (A AND B) OR (C AND D) in flat encoded-query syntax — equivalent to clicking "New Query" in the list filter designer.' },
      { q: 'Is it safe to paste queries here?', a: 'Yes. Building and decoding run entirely in your browser — nothing is sent to a server or stored. You can verify this in your browser\'s network tab.' },
    ],
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
    faq: [
      { q: 'Is formatting the same as validating?', a: 'No — formatting only changes whitespace. Use the XML Validator tab to check well-formedness, or the XSD Validator to check conformance against a schema.' },
      { q: 'Does formatting change my data?', a: 'No. Pretty-printing only adjusts whitespace between elements; element order, attributes, text content, comments, and CDATA are preserved.' },
      { q: 'Is my XML uploaded anywhere?', a: 'No — the formatter runs 100% in your browser. You can disconnect from the network and it still works.' },
      { q: 'What indentation should I use?', a: '2 spaces is the common default for XML; tabs keep diffs smallest in editors configured for them. The tool supports 2 spaces, 4 spaces, and tabs.' },
    ],
  },
  '/tools/xml-validator': {
    title: 'Free XML Validator Online - Check Well-Formed XML | OG Technologies EU',
    description: 'Validate XML well-formedness online. Check for unclosed tags, unescaped characters, duplicate attributes, and multiple root elements. Get error line and column numbers — 100% browser-based.',
    featureList: ["Well-formedness checking with line and column error reporting", "Document statistics: element count, attribute count, max depth, comments", "Supports all XML dialects including SVG, RSS, XSD, and WSDL"],
    faq: [
      { q: 'What does "well-formed" XML mean?', a: 'The document follows XML\'s basic syntax rules: every element is closed, attributes are quoted, special characters are escaped, nesting is correct, and there is exactly one root element.' },
      { q: 'What is the difference between well-formed and valid XML?', a: 'Well-formed means syntactically correct. Valid means it also conforms to a schema (XSD or DTD) that defines which elements and attributes are allowed. This tool checks well-formedness; the XSD Validator checks schema conformance.' },
      { q: 'Which errors does the validator catch?', a: 'Unclosed or mismatched tags, bad nesting, unescaped & < > characters, duplicate attributes, multiple root elements, and content outside the root — each reported with line and column numbers.' },
      { q: 'Is my XML uploaded or stored?', a: 'No — validation uses the browser\'s built-in DOM parser locally. Nothing is sent to a server.' },
    ],
  },
  '/tools/xml-to-json': {
    title: 'Free XML to JSON Converter Online | OG Technologies EU',
    description: 'Convert XML to JSON online using the @-prefix attribute convention (compatible with xml2js and xmltodict). Repeated elements become arrays automatically. 100% browser-based, no uploads.',
    featureList: ["XML to JSON conversion with @-prefix attribute convention", "Automatic array detection for repeated sibling elements", "Optional type inference for numbers, booleans, and null", "Compatible with xml2js and xmltodict output format"],
    faq: [
      { q: 'How are XML attributes converted?', a: 'Attributes become @-prefixed JSON properties — <item id="42"> becomes {"@id": "42"}, the same convention xml2js and xmltodict use.' },
      { q: 'What happens to repeated elements?', a: 'Repeated sibling elements automatically collapse into JSON arrays — two <item> elements become "item": [...]. Single elements stay objects.' },
      { q: 'Is the output compatible with xml2js or xmltodict?', a: 'Yes — the converter follows the @-prefix attribute and #text mixed-content conventions used by xml2js (Node.js) and xmltodict (Python).' },
      { q: 'Is my data uploaded anywhere?', a: 'No — conversion runs entirely in your browser. Nothing is sent to a server or persisted.' },
    ],
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
    faq: [
      { q: 'Which XPath version does this tester support?', a: 'XPath 1.0, via the browser\'s native document.evaluate() engine. XPath 2.0/3.x functions like matches() or tokenize() are not available in browsers.' },
      { q: 'How do I write an XPath expression?', a: 'Start with // for a descendant search, / for direct children, [@attr="value"] for attribute filters, [1] or [last()] for position, and functions like contains() or text() for content matching.' },
      { q: 'Does it work with XML namespaces?', a: 'Yes — namespaced elements can be matched using their prefix or local-name() (e.g. //*[local-name()="item"]), the practical workaround when prefixes differ between documents.' },
      { q: 'Is my XML or query sent to a server?', a: 'No — evaluation happens entirely in the browser via document.evaluate(). Nothing is uploaded.' },
    ],
  },
  '/tools/xml-to-csv': {
    title: 'Free XML to CSV Converter Online | OG Technologies EU',
    description: 'Convert XML to CSV online with automatic record element detection. Attributes included as @-prefixed columns. Choose comma, semicolon, or tab delimiter. Download or copy — 100% browser-based.',
    featureList: ["Automatic detection of repeating record elements", "Attributes included as @-prefixed columns", "Configurable delimiter: comma, semicolon, or tab", "Download as .csv file or copy to clipboard"],
  },
  '/tools/xsd-validator': {
    title: 'Free XSD Schema Validator Online - Validate XML Against Schema | OG Technologies EU',
    description: 'Validate XML against an XSD schema online. Checks element structure, cardinality, required attributes, and simple-type restrictions like enumerations and patterns — with path-level errors. 100% browser-based, no uploads.',
    featureList: ["Validate XML against XSD 1.0 schemas", "Element structure per xs:sequence, xs:choice, xs:all", "Cardinality checks: minOccurs and maxOccurs", "Required and declared attribute validation", "Simple-type facets: enumeration, pattern, lengths, ranges", "Path-level error reporting"],
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
    title: 'Free PDF to Word Converter with OCR - PDF to DOCX/TXT/HTML | OG Technologies EU',
    description: 'Convert PDF to Word (.docx), plain text (.txt), or HTML directly in your browser — with OCR for scanned pages and embedded image extraction. No file is ever uploaded to a server — 100% client-side and private.',
    appCategory: "UtilitiesApplication",
    featureList: ["Convert PDF to Word (.docx)", "Convert PDF to plain text (.txt)", "Convert PDF to HTML", "OCR for scanned, image-only pages via browser-based Tesseract", "Embeds images from the PDF into the .docx", "Reconstructs bordered tables with merged cells and column widths", "Preserves fonts, font sizes, bold/italic, and text alignment", "Detects multi-column layouts and preserves reading order", "Removes repeating headers, footers, and watermarks", "Preserves headings, lists, and dehyphenates line breaks", "100% browser-based — no file uploads"],
  },
  '/tools/pdf-metadata': {
    title: 'Free PDF Metadata Editor - View, Edit & Remove Metadata Online | OG Technologies EU',
    description: 'View, edit, and remove PDF metadata — title, author, subject, keywords, creator, producer, and timestamps — directly in your browser. Strip hidden metadata for privacy. 100% client-side, no uploads.',
    appCategory: "UtilitiesApplication",
    featureList: ["View all document info fields, including non-standard and custom entries", "Edit title, author, subject, keywords, creator, producer, and timestamps", "Remove every metadata field plus the embedded XMP stream in one click", "Shows file size, page count, PDF version, and XMP presence", "Files are processed locally and never uploaded"],
    faq: [
      { q: 'What metadata does a PDF contain?', a: 'A PDF stores a document information dictionary with fields like title, author, subject, keywords, creator application, producer library, and creation/modification timestamps. Many files also embed an XMP metadata packet with the same or additional properties, and applications may add custom fields.' },
      { q: 'Is my PDF uploaded to a server?', a: 'No. The file is read and rewritten entirely in your browser using JavaScript — nothing is transmitted, logged, or stored on our infrastructure.' },
      { q: 'Does removing metadata change the document content?', a: 'No. Only the document information dictionary and the embedded XMP metadata stream are removed. Pages, text, images, and layout are preserved exactly.' },
      { q: 'Does removing metadata fully anonymize a PDF?', a: 'It removes document-level properties such as author name, timestamps, and tool identifiers. Traces stored elsewhere — author names in comments and annotations, embedded fonts, hidden layers, or content inside the pages themselves — are separate and are not affected.' },
      { q: 'Can I clear just one field instead of everything?', a: 'Yes. In the editor, simply empty the fields you want gone — blank fields are deleted from the document — then download the result.' },
    ],
  },
  '/tools/wei-converter': {
    title: 'Free Wei to Ether Converter - Wei/Gwei/ETH Unit Calculator | OG Technologies EU',
    description: 'Convert between Wei, Gwei, Finney, and Ether with full BigInt precision — no floating point errors. Free browser-based Ethereum unit calculator with a full denomination table. 100% client-side.',
    featureList: ["Convert between Wei, Gwei, Finney, and Ether", "Full BigInt precision — no floating point errors", "Supports arbitrary precision input values", "Ethereum denomination table from wei to ether"],
    faq: [
      { q: 'How many wei are in 1 ETH?', a: 'Exactly 1,000,000,000,000,000,000 wei (10¹⁸). Ether has 18 decimal places — wei is its smallest indivisible unit.' },
      { q: 'How many gwei are in 1 ETH?', a: '1,000,000,000 gwei (10⁹). 1 gwei = 10⁹ wei, and gas prices are almost always quoted in gwei.' },
      { q: 'Is gwei the same as wei?', a: 'No — they are different denominations of the same currency. Wei is the base unit; gwei is a billion wei.' },
      { q: 'Why is gas priced in gwei?', a: 'Gas fees are small fractions of an ether — typically 0.000000001 to 0.0000001 ETH. Quoting them in gwei keeps the numbers readable (5 gwei instead of 0.000000005 ETH).' },
      { q: 'Does this converter handle large numbers precisely?', a: 'Yes — it uses BigInt arithmetic throughout, so no floating-point rounding even for very large values.' },
    ],
  },
  '/tools/keccak256-hash': {
    title: 'Free Keccak256 Hash Generator Online - Ethereum Hash | OG Technologies EU',
    description: 'Compute the Keccak-256 hash of any text or hex data. This is the hash function used throughout Ethereum for addresses, storage, signatures, and function selectors. 100% client-side, no data sent to any server.',
    featureList: ["Compute Keccak-256 hash of text or hex input", "Same hash function used in Ethereum (addresses, storage, signatures)", "Supports both text and hex input modes"],
  },
  '/tools/function-selector': {
    title: 'Solidity Function Selector Calculator & 4-Byte Decoder | OG Technologies EU',
    description: 'Calculate the 4-byte function selector for any Solidity signature, or decode a selector back to a signature — built-in database of common ERC-20, DeFi, and OpenZeppelin signatures. 100% client-side.',
    featureList: ["Calculate 4-byte function selectors from Solidity signatures", "Reverse lookup: decode a selector back to a matching signature", "Built-in database of common ERC-20, ERC-721, ERC-1155, ERC-4626, proxy, Uniswap, Safe, and OpenZeppelin error signatures", "Filterable selector reference table", "Uses keccak256 of the canonical function signature"],
    faq: [
      { q: "What is a 4-byte function selector?", a: "The first 4 bytes of the Keccak-256 hash of a function's canonical signature — its name and parameter types, like transfer(address,uint256). It prefixes transaction calldata so the EVM knows which function to dispatch to." },
      { q: "How do I decode a 4-byte selector back to a function name?", a: "Selectors are hashes, so they cannot be reversed mathematically — you look them up in a database of known signatures. Paste the selector (or full calldata) into the reverse lookup to match it against common ERC, DeFi, proxy, and OpenZeppelin error signatures." },
      { q: "Why doesn't my selector appear in the database?", a: "Most contract functions are unique to that contract. The local database covers widely deployed signatures; for contract-specific ones, public registries like 4byte.directory aggregate millions of community-submitted signatures." },
      { q: "Can two functions share the same selector?", a: "Yes — the selector space is only 4 bytes, so collisions exist and are even mined deliberately for proxy attacks. solc rejects collisions inside a single contract, but an attacker can craft a function whose selector collides with a target's. Always verify the full signature, not just the selector." },
      { q: "Do error selectors work the same way?", a: "Yes. Custom errors like ERC20InsufficientBalance(address,uint256,uint256) use the same keccak256-first-4-bytes scheme, and the built-in database includes the common OpenZeppelin errors you see in revert data." },
    ],
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
  '/tools/sepa-xml-validator': {
    title: 'Free SEPA XML Validator - pain.001, pain.008, camt.053 | OG Technologies EU',
    description: 'Validate SEPA payment files online: pain.001 credit transfers, pain.008 direct debits, camt.053 statements. Checks ISO 20022 structure, SEPA rulebook constraints (EUR currency, SLEV charges, mandates), IBANs and BICs. 100% client-side, no uploads.',
    appCategory: "FinanceApplication",
    featureList: ["pain.001 credit transfer, pain.008 direct debit, camt.053 statement checks", "SEPA rulebook constraints: EUR currency, SLEV charge bearer, creditor scheme ID", "NbOfTxs and CtrlSum consistency verification", "IBAN MOD-97 checksum and SEPA-zone reachability", "BIC validation per ISO 9362", "Error / warning / pass findings with detail"],
  },
  '/tools/mt940-to-csv': {
    title: 'Free MT940 to CSV Converter - SWIFT Statement Parser | OG Technologies EU',
    description: 'Convert SWIFT MT940 bank statements to CSV online. Parses :61:/:86: tags, SEPA references (EREF+, MREF+, CRED+), running balances verified against the closing balance. 100% client-side — no upload.',
    appCategory: "FinanceApplication",
    featureList: ["MT940 :61:/:86: tag parsing", "SEPA reference extraction (EREF+, MREF+, CRED+)", "Running balance verification against closing balance", "RFC 4180 CSV with UTF-8 BOM for Excel", "SWIFT envelope stripping"],
  },
  '/tools/mt940-to-camt053': {
    title: 'Free MT940 to camt.053 Converter - ISO 20022 Migration Tool | OG Technologies EU',
    description: 'Convert SWIFT MT940 bank statements to ISO 20022 camt.053.001.02 XML online. Maps :60F:/:62F: balances to OPBD/CLBD, :61: entries to Ntry, and :86: SEPA remittance to RmtInf. 100% client-side — no upload.',
    appCategory: "FinanceApplication",
    featureList: ["MT940 to camt.053.001.02 XML conversion", "Balance mapping: :60F:/:62F:/:64:/:65: → OPBD/CLBD/CLAV/FWAV", ":61: entries become Ntry with BookgDt and ValDt", "Structured :86: SEPA data into RltdPties, RltdAgts, RmtInf", "SWIFT envelope stripping", "XML preview, copy, and download"],
    faq: [
      { q: 'What is the ISO 20022 equivalent of an MT940?', a: 'camt.053 (Bank-to-Customer Statement) replaces MT940 for end-of-day account statements. camt.052 covers intraday reporting (like MT942), and camt.054 replaces MT900/MT910 debit/credit advices. The MT↔MX coexistence period ends in November 2026.' },
      { q: 'Which camt.053 version does this generate?', a: 'camt.053.001.02 — the version most widely deployed in SEPA (EBA/CGI guideline). Newer versions like .001.08 restructure some elements, but .02 remains the common denominator banks currently accept.' },
      { q: "Why doesn't my converted file include my bank's BIC or account owner?", a: 'MT940 simply does not carry them — the account is identified by tag :25: (your IBAN) and nothing else. camt.053 has optional Acct/Ownr and Acct/Svcr elements, but there is no source data to fill them, so the converter leaves them out.' },
      { q: 'Can I use the output as a real bank statement?', a: 'The XML is schema-shaped and useful for testing ISO 20022 parsers, building reconciliation pipelines, and validating your migration before the deadline. It is not a bank-certified statement — production feeds come from your bank with full party and agent enrichment.' },
    ],
  },
  '/tools/sepa-xml-generator': {
    title: 'Free SEPA XML Generator - pain.001 & pain.008 from CSV | OG Technologies EU',
    description: 'Generate SEPA pain.001 credit transfer and pain.008 direct debit XML files from a CSV of payments. IBAN/BIC validation, NbOfTxs and CtrlSum built in. 100% client-side — no upload.',
    appCategory: "FinanceApplication",
    featureList: ["pain.001.001.03 credit transfer (SCT) generation", "pain.008.001.02 direct debit (SDD) generation", "CSV import with per-row validation", "IBAN MOD-97 and BIC ISO 9362 validation", "NbOfTxs and CtrlSum computed automatically", "XML preview, copy, and download"],
    faq: [
      { q: 'What is the difference between pain.001 and pain.008?', a: 'pain.001 (SCT) pushes money — you instruct your bank to credit other accounts. pain.008 (SDD) pulls money — you collect from debtors who signed a mandate, which is why each transaction needs a mandate ID and signature date, and you need a creditor scheme ID.' },
      { q: 'Which pain.001 version do banks accept?', a: 'pain.001.001.03 remains the most widely accepted SEPA version. Some banks also offer .001.09 (the ISO 20022:2019 version used for CGI/global rollouts). Check your bank upload documentation — the schema version is in the xmlns declaration.' },
      { q: 'Do I need the BIC for each payment?', a: 'Not for SEPA payments — BIC is optional inside the SEPA zone and banks derive it from the IBAN. The generator accepts it per row if you have it, but you can leave the column empty.' },
      { q: 'Is my payment data uploaded anywhere?', a: 'No — CSV parsing, IBAN/BIC validation, and XML generation all run in your browser. Nothing is sent to a server, logged, or stored, which matters when the file contains real customer names and account numbers.' },
    ],
  },
  '/tools/hl7-parser': {
    title: 'Free HL7 v2 Message Parser & Viewer Online | OG Technologies EU',
    description: 'Parse, view, and read HL7 v2.x messages online: segment, field, component, and subcomponent breakdown with field labels for MSH, PID, PV1, OBR, OBX and more. Detects message type and version. 100% client-side — PHI never uploaded.',
    featureList: ["HL7 v2.x segment/field/component parsing", "Field labels for common segments (MSH, PID, PV1, OBR, OBX)", "Message type and version detection", "Delimiter and encoding character detection", "Load .hl7/.er7/.txt files directly"],
    faq: [
      { q: 'Is my patient data (PHI) uploaded or stored?', a: 'No. Parsing runs entirely in your browser — the message never touches a server, so real PHI can be inspected without leaving the machine.' },
      { q: 'Which HL7 versions are supported?', a: 'All pipe-delimited HL7 v2.x messages (2.1 through 2.9) — the parser reads the version from MSH-12 and the delimiters from MSH-1/MSH-2 automatically. FHIR resources (JSON) are a different standard.' },
      { q: 'Can I open .hl7 or .er7 files?', a: 'Yes — the file loader opens .hl7, .er7, or .txt exports directly from an interface engine or hospital system, entirely locally.' },
      { q: 'Is this an HL7 validator?', a: 'It performs structural checks — delimiter consistency, required MSH fields, segment ordering — and decodes every field with labels. It is not a conformance validator against a specific implementation guide or message profile.' },
      { q: 'What is the difference between HL7 v2 and FHIR?', a: 'v2 is the legacy pipe-delimited format that still runs most intra-hospital messaging (ADT, ORU, ORM); FHIR is the modern resource-based standard for APIs, usually JSON over REST.' },
    ],
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
    title: 'Free GTIN Checker — GS1 Check Digit Calculator (UPC/EAN/ISBN) | OG Technologies EU',
    description: 'Free GTIN checker online: verify UPC-A, EAN-8, EAN-13, and GTIN-14 barcodes against the GS1 mod-10 check digit, look up the country prefix, convert UPC to GTIN-14, and validate ISBNs. 100% client-side.',
    appCategory: "BusinessApplication",
    featureList: ["GS1 mod-10 check digit verification", "EAN-8, UPC-A, EAN-13, GTIN-14 format detection", "GS1 country prefix lookup", "UPC↔GTIN and EAN↔GTIN format conversion", "ISBN-10/ISBN-13 validation", "Check digit calculator"],
    faq: [
      { q: 'What is the difference between UPC, EAN, and GTIN?', a: 'GTIN is the umbrella identifier in the GS1 system. UPC-A (12 digits) is the North American variant, EAN-8 and EAN-13 are the international retail formats, and GTIN-14 is the 14-digit superset used on cases and pallets. They are the same numbering system — shorter codes are simply zero-padded to GTIN-14.' },
      { q: 'How do I convert UPC to GTIN-14?', a: 'Pad the UPC-A with leading zeros to 14 digits. The check digit does not change, because GS1 weights are counted from the rightmost data digit.' },
      { q: 'Does a valid check digit mean the barcode is registered?', a: 'No. The checksum only proves the digits are well-formed — it says nothing about whether GS1 issued the number or who owns it. Marketplaces like Amazon cross-check the GS1 registry and brand ownership, so a checksum-valid code can still be rejected.' },
      { q: 'Can I look up which company or product a GTIN belongs to?', a: 'Not from the digits alone. A GTIN encodes a GS1 prefix (which identifies the issuing country organization), a company prefix, and an item reference — but mapping those to a company name requires the GS1 registry (GEPIR) or a licensed product database. This tool verifies the number is structurally valid; ownership lookup is a separate registry query.' },
      { q: 'How do I calculate a GTIN check digit by hand?', a: 'Starting from the rightmost data digit, multiply digits alternately by 3 and 1 moving right-to-left, then sum. The check digit is whatever brings the total to the next multiple of 10. Enter the code without its last digit into the check digit calculator and it returns the complete GTIN.' },
      { q: 'What does the check digit actually catch?', a: 'Single mistyped digits and most adjacent-digit transpositions — the classic data-entry errors when someone keys a barcode by hand. It is an integrity check, not a security feature.' },
      { q: 'Can I validate ISBNs here too?', a: 'Yes. ISBN-13 is just an EAN with a Bookland prefix (978 or 979) and validates with the same GS1 check digit. The page also includes a separate ISBN-10 validator using the older mod-11 checksum.' },
      { q: 'Is my barcode data uploaded anywhere?', a: 'No — every check runs in your browser. Nothing is sent to a server, logged, or stored.' },
    ],
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

// Glossary — routeMeta generated from src/data/glossaryTerms.js so the data
// file stays the single source of truth (same definitions, FAQs, and slugs
// as the pages themselves).
routeMeta['/glossary'] = {
  title: 'IT & Standards Glossary - Security, Payments, Identity & Data Terms | OG Technologies EU',
  description: 'Plain-language glossary of the standards, regulations, and technologies our clients work with: ISO 27001, ISO 42001, DORA, GDPR, ISO 20022, SEPA, eIDAS, HL7/FHIR, verifiable credentials, blockchain, and more.',
  faq: [
    { q: 'Who is this glossary for?', a: 'Clients, partners, and practitioners who work with the standards and technologies we implement — compliance teams preparing for ISO 27001 or DORA, engineers integrating ISO 20022 or HL7, and product teams navigating eIDAS, MiCA, and verifiable credentials.' },
    { q: 'Are these the official definitions?', a: 'No — these are practical summaries written for orientation. Each entry lists the related standards and regulations it is based on; for compliance work always refer to the official standard text.' },
    { q: 'Can I request a term?', a: 'Yes — email hi@ogtechnologies.co or use the quote form if you want a walkthrough of how a standard or technology applies to your project.' },
  ],
  jsonLd: [{
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'OG Technologies EU Glossary',
    description: 'Definitions of the standards, regulations, and technologies OG Technologies EU works across — information security, AI governance, payments, digital identity, blockchain, health IT, and data formats.',
    url: 'https://www.ogtechnologies.co/glossary/',
    publisher: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      url: `https://www.ogtechnologies.co/glossary/${t.slug}/`,
    })),
  }],
}

GLOSSARY_TERMS.forEach((t) => {
  routeMeta[`/glossary/${t.slug}`] = {
    title: `${t.term} — Definition & Meaning | OG Technologies EU`,
    description: t.definition,
    ...(t.faq && t.faq.length > 0 ? { faq: t.faq } : {}),
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: `https://www.ogtechnologies.co/glossary/${t.slug}/`,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'OG Technologies EU Glossary',
        url: 'https://www.ogtechnologies.co/glossary/',
      },
    }],
  }
})

// Product detail pages — JSON-LD type driven by product.schemaType
// ('software' -> SoftwareApplication, 'service' -> Service).
PRODUCTS.forEach((p) => {
  const url = `https://www.ogtechnologies.co/products/${p.slug}/`
  const schema = p.schemaType === 'software'
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: p.name,
        description: p.metaDescription,
        url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        ...(p.features ? { featureList: p.features } : {}),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: p.name,
        description: p.metaDescription,
        url,
        serviceType: p.shortName,
        provider: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
        areaServed: 'Worldwide',
      }
  routeMeta[`/products/${p.slug}`] = {
    title: p.metaTitle,
    description: p.metaDescription,
    ...(p.faq && p.faq.length > 0 ? { faq: p.faq } : {}),
    jsonLd: [schema],
  }
})

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
    ViteImageOptimizer({
      png: {
        quality: 70,
        palette: true,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      svg: {
        multipass: true,
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
    prerenderPlugin({
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
        '/blog/entrepreneurship-avenue-2026',
        '/blog/introducing-og-crm-ticketing',
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
        '/insights/stellar-cross-border-payments-anchors-sep24',
        '/insights/iso-27001-statement-of-applicability',
        '/insights/iso-42001-annex-a-controls',
        '/insights/integrated-management-system-iso-9001-27001-42001',
        '/insights/iso-8601-format-guide',
        '/insights/how-to-merge-pdf-files',
        '/insights/mt940-format-camt053-migration',
        '/insights/eidas2-eudi-wallet',
        '/insights/odata-query-options-guide',
        '/insights/how-to-choose-crm-ticketing-system',
        '/insights/helpdesk-workflow-best-practices',
        '/insights/iso-9001-implementation-guide',
        '/insights/iso-27001-annex-a-controls',
        '/insights/soc-2-trust-services-criteria',
        '/insights/soc-2-vs-iso-27001',
        '/insights/pdf-metadata-guide',
        '/insights/mt940-field-reference',
        '/insights/odata-filter-examples',
        '/insights/o1js-state-assertions',
        '/insights/iso-24874-stellar-sdg-impact',
        '/insights/claude-code-agentic-workflows-mcp',
        '/insights/gpt-6-astra-sol-luna-model-tiers',
        '/insights/devin-autonomous-ai-software-engineer',
        '/insights/deepseek-v4-open-weight-moe-coding-agents',
        '/insights/gemini-4-argon-antigravity-agentic-coding',
        '/insights/kimi-k3-open-weight-agentic-model',
        '/insights/glm-5-zai-long-horizon-agents',
        '/insights/eu-ai-act-compliance-guide',
        '/insights/nis2-compliance-iso-27001',
        '/insights/cyber-resilience-act-cra-guide',
        '/glossary',
        ...GLOSSARY_TERMS.map((t) => `/glossary/${t.slug}`),
        ...PRODUCTS.map((p) => `/products/${p.slug}`),
        '/ventures',
        '/about',
        '/portfolio',
        '/portfolio/edunode',
        '/portfolio/mozart-pay',
        '/portfolio/stellar-go-cli',
        '/partners',
        '/expert-hub',
        '/publications',
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
        '/tools/soc-2-readiness-checker',
        '/tools/iso-9001-readiness-checker',
        '/tools/iso-42001-ai-readiness',
        '/tools/iso-8601-validator',
  '/tools/ethereum-toolkit',
  '/tools/aws-arn-parser',
  '/tools/iam-policy-validator',
  '/tools/sap-odata-url-builder',
  '/tools/servicenow-query-builder',
  '/tools/hash-generator',
  '/tools/xml-tools',
  '/tools/xml-formatter',
  '/tools/xml-validator',
  '/tools/xml-to-json',
  '/tools/xml-minifier',
  '/tools/xpath-tester',
  '/tools/xml-to-csv',
  '/tools/xsd-validator',
  '/tools/merge-pdf',
  '/tools/split-pdf',
  '/tools/image-to-pdf',
  '/tools/document-to-pdf',
  '/tools/pdf-to-word',
  '/tools/pdf-metadata',
  '/tools/wei-converter',
  '/tools/keccak256-hash',
  '/tools/function-selector',
  '/tools/abi-encoder',
  '/tools/address-checksum',
  '/tools/iban-validator',
  '/tools/bic-validator',
  '/tools/lei-validator',
  '/tools/iso-20022-viewer',
  '/tools/sepa-xml-validator',
  '/tools/mt940-to-csv',
  '/tools/mt940-to-camt053',
  '/tools/sepa-xml-generator',
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
      maxConcurrentRoutes: 8,
      renderAfterTime: 500,
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // On macOS use system Chrome; on CI (Linux) fall back to Puppeteer's bundled Chromium
        executablePath:
          process.env.PUPPETEER_EXECUTABLE_PATH ||
          (process.platform === 'darwin'
            ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
            : undefined),
      },
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
