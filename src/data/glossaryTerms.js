// Glossary data — single source of truth for /glossary pages.
// Imported by the Glossary and GlossaryTerm pages, src/data/searchIndex.js,
// src/components/Breadcrumbs.jsx, and vite.config.js (routeMeta + prerender routes).
//
// IMPORTANT: `definition` is injected into <meta> content attributes at build
// time — do not use double quotes inside it.

export const GLOSSARY_CATEGORIES = [
  {
    id: 'security-compliance',
    name: 'Information Security & Compliance',
    description: 'Frameworks, standards, and EU regulations for managing information security risk and demonstrating compliance.',
  },
  {
    id: 'ai-governance',
    name: 'AI Governance',
    description: 'Standards and regulation for developing, deploying, and managing artificial intelligence responsibly.',
  },
  {
    id: 'payments',
    name: 'Payments & Financial Messaging',
    description: 'Standards, message types, and identifiers that move money and financial data between institutions.',
  },
  {
    id: 'identity',
    name: 'Digital Identity & Trust',
    description: 'The EU trust framework, verifiable credentials, and decentralized identity technologies.',
  },
  {
    id: 'blockchain',
    name: 'Blockchain & Web3',
    description: 'Distributed ledger technology, smart contracts, and the networks our products are built on.',
  },
  {
    id: 'health-it',
    name: 'Healthcare Interoperability',
    description: 'Standards for exchanging clinical and administrative health data between systems.',
  },
  {
    id: 'quality',
    name: 'Quality & Management Systems',
    description: 'Management system standards and the methods used to implement and integrate them.',
  },
  {
    id: 'data-formats',
    name: 'Data Formats & Identifiers',
    description: 'Formats and identifiers used to structure, validate, and exchange data.',
  },
  {
    id: 'enterprise-it',
    name: 'Enterprise IT & Cloud',
    description: 'Cloud, integration, and customer operations concepts used in day-to-day enterprise IT.',
  },
  {
    id: 'e-learning',
    name: 'E-Learning Standards',
    description: 'Packaging and tracking standards for digital learning content.',
  },
];

export const GLOSSARY_TERMS = [
  // ---------------------------------------------------------------- security-compliance
  {
    slug: 'iso-27001',
    term: 'ISO/IEC 27001',
    shortName: 'ISO 27001',
    category: 'security-compliance',
    definition: 'ISO/IEC 27001 is the international standard for information security management systems (ISMS). It specifies requirements for establishing, implementing, maintaining, and continually improving an ISMS, and is the standard organizations certify against to prove they manage information security systematically.',
    sections: [
      {
        heading: 'What it covers',
        paragraphs: [
          'The current edition, ISO/IEC 27001:2022, has two parts. Clauses 4–10 define the management system requirements — organizational context, leadership, planning, support, operation, performance evaluation, and improvement. Annex A lists 93 reference controls grouped into four themes: organizational, people, physical, and technological.',
          'Which controls you implement is not fixed. Clause 6.1.2 requires a risk assessment, and Clause 6.1.3 requires a Statement of Applicability that records which Annex A controls you selected and why. ISO/IEC 27002 provides the implementation guidance for each control.',
        ],
      },
      {
        heading: 'Why it matters to your business',
        paragraphs: [
          'Certification is issued by accredited bodies after a two-stage audit and is increasingly a procurement requirement — especially when selling to enterprises, financial institutions, or the public sector. It also provides a structured backbone for meeting overlapping obligations: ISO 27001 maps closely onto GDPR security measures, NIS2 requirements, and the ICT risk-management framework DORA imposes on financial entities.',
          'Because the standard shares the Annex SL management-system structure with ISO 9001 and ISO/IEC 42001, organizations running several management systems can integrate them into a single IMS rather than maintaining parallel policies, audits, and reviews.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 27001:2022 — Information security management systems — Requirements' },
      { name: 'ISO/IEC 27002:2022 — Information security controls' },
      { name: 'ISO/IEC 27005 — Information security risk management guidance' },
    ],
    relatedTerms: ['isms', 'iso-27002', 'statement-of-applicability', 'risk-assessment', 'gap-analysis', 'soc-2'],
    relatedLinks: [
      { label: 'ISO 27001 Gap Analysis Tool', url: '/tools/iso-27001-gap-analysis/', type: 'tool' },
      { label: 'ISO 27001 gap analysis: the step-by-step guide', url: '/insights/iso-27001-gap-analysis-guide/', type: 'article' },
      { label: 'ISO/IEC 27001 Annex A: the complete list of 93 controls', url: '/insights/iso-27001-annex-a-controls/', type: 'article' },
      { label: 'SOC 2 vs ISO 27001: which framework do you need?', url: '/insights/soc-2-vs-iso-27001/', type: 'article' },
      { label: 'Free ISO 27001 gap analysis template (.xlsx)', url: '/downloads/iso-27001-gap-analysis-template.xlsx', type: 'download' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
    faq: [
      { q: 'Is ISO 27001 certification mandatory?', a: 'No — it is a voluntary standard. But enterprise procurement teams, financial institutions, and public-sector buyers increasingly require it, and it is strong supporting evidence for GDPR, NIS2, and DORA compliance.' },
      { q: 'How long does ISO 27001 certification take?', a: 'Organizations with an existing management system typically need 6–12 months. Starting from scratch, expect 12–18 months depending on scope, documentation maturity, and remediation work found by the gap analysis.' },
      { q: 'What is the difference between a gap analysis and a certification audit?', a: 'A gap analysis is a self- or consultant-led assessment against the standard that produces a remediation roadmap. A certification audit is the formal two-stage assessment by an accredited certification body that issues the certificate.' },
    ],
  },
  {
    slug: 'iso-27002',
    term: 'ISO/IEC 27002',
    shortName: 'ISO 27002',
    category: 'security-compliance',
    definition: 'ISO/IEC 27002 is the international guidance standard that describes each of the 93 information security controls referenced by Annex A of ISO/IEC 27001 — what the control is, what it is for, and how to implement it.',
    sections: [
      {
        heading: 'What it covers',
        paragraphs: [
          'ISO/IEC 27002:2022 groups the controls into four themes: 37 organizational controls (policies, roles, asset management, supplier security, incident management), 8 people controls (screening, awareness training, employment terms), 14 physical controls (access control, equipment protection, secure disposal), and 34 technological controls (access control, cryptography, network security, logging, vulnerability management, backups).',
          'Each control entry includes the control statement, its purpose, implementation guidance, and attributes that tag it by control type (preventive, detective, corrective), security property (confidentiality, integrity, availability), and cybersecurity concept — which makes the list usable as a design checklist, not just an audit checklist.',
        ],
      },
      {
        heading: 'How it relates to ISO 27001',
        paragraphs: [
          'ISO 27001 is the certifiable requirements standard; ISO 27002 is the guidance you use to implement it. When a clause-6.1.2 risk assessment shows a control is needed, ISO 27002 tells you what good implementation looks like — and your Statement of Applicability records the decision. You cannot certify against ISO 27002 itself.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 27002:2022 — Information security, cybersecurity and privacy protection — Information security controls' },
      { name: 'ISO/IEC 27001:2022 — ISMS requirements' },
    ],
    relatedTerms: ['iso-27001', 'isms', 'statement-of-applicability', 'risk-assessment'],
    relatedLinks: [
      { label: 'ISO/IEC 27001 Annex A: the complete list of 93 controls', url: '/insights/iso-27001-annex-a-controls/', type: 'article' },
      { label: 'Annex A controls list (.csv)', url: '/downloads/iso-27001-annex-a-controls.csv', type: 'download' },
      { label: 'ISO 27001 Gap Analysis Tool', url: '/tools/iso-27001-gap-analysis/', type: 'tool' },
    ],
  },
  {
    slug: 'isms',
    term: 'ISMS (Information Security Management System)',
    shortName: 'ISMS',
    category: 'security-compliance',
    definition: 'An information security management system (ISMS) is the set of policies, processes, people, and technology an organization uses to manage risks to the confidentiality, integrity, and availability of its information — run as a continuous cycle rather than a one-off project.',
    sections: [
      {
        heading: 'What makes it a management system',
        paragraphs: [
          'An ISMS is not a tool or a policy binder — it is an operating loop. You define scope, assess risk, select and implement controls, measure their performance, audit the results, and feed improvements back in. ISO/IEC 27001 structures this as a Plan-Do-Check-Act cycle embedded in its clauses 4–10.',
          'That framing matters because it makes security a management responsibility with owners, budgets, and metrics — rather than an IT-only activity. The same management-system skeleton is shared by quality (ISO 9001) and AI governance (ISO/IEC 42001), which is why organizations increasingly run one integrated management system instead of three parallel ones.',
        ],
      },
      {
        heading: 'Where to start',
        paragraphs: [
          'The practical entry point is a gap analysis: compare your current practices against the standard’s requirements, score the gaps, and sequence remediation. Risk assessment comes next — it determines which Annex A controls your ISMS actually needs, which the Statement of Applicability then documents.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 27001:2022 — ISMS requirements' },
      { name: 'ISO/IEC 27003 — ISMS implementation guidance' },
    ],
    relatedTerms: ['iso-27001', 'iso-27002', 'risk-assessment', 'statement-of-applicability', 'integrated-management-system'],
    relatedLinks: [
      { label: 'ISO 27001 Gap Analysis Tool', url: '/tools/iso-27001-gap-analysis/', type: 'tool' },
      { label: 'ISO 27001 gap analysis: the step-by-step guide', url: '/insights/iso-27001-gap-analysis-guide/', type: 'article' },
      { label: 'Building one integrated management system', url: '/insights/integrated-management-system-iso-9001-27001-42001/', type: 'article' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
  },
  {
    slug: 'statement-of-applicability',
    term: 'Statement of Applicability (SoA)',
    shortName: 'SoA',
    category: 'security-compliance',
    definition: 'The Statement of Applicability (SoA) is the mandatory ISO/IEC 27001 document that lists all 93 Annex A controls and records, for each one, whether it is included in your ISMS, why, and its implementation status.',
    sections: [
      {
        heading: 'What goes in it',
        paragraphs: [
          'Clause 6.1.3(d) requires the SoA to contain the necessary controls (from your risk assessment and any other sources), the justification for each inclusion, whether each control is implemented or planned, and the justification for every exclusion. Auditors treat it as the index of your entire ISMS — it is usually the first document they ask for.',
          'Exclusions need more care than inclusions. You can only drop an Annex A control if you can justify it — typically because the risk it treats does not exist in your scope (for example, physical access controls for a fully remote company with a cloud-only estate).',
        ],
      },
      {
        heading: 'Keeping it alive',
        paragraphs: [
          'The SoA is versioned and reviewed — after risk assessments, audits, incidents, and organizational changes. Treat it as a living register with owners and status, not a certification artifact you write once and file away.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 27001:2022 — Clause 6.1.3(d)' },
      { name: 'ISO/IEC 27002:2022 — Annex A control guidance' },
    ],
    relatedTerms: ['iso-27001', 'iso-27002', 'isms', 'risk-assessment', 'gap-analysis'],
    relatedLinks: [
      { label: 'Statement of Applicability: choosing and justifying controls', url: '/insights/iso-27001-statement-of-applicability/', type: 'article' },
      { label: 'ISO/IEC 27001 Annex A: the complete list of 93 controls', url: '/insights/iso-27001-annex-a-controls/', type: 'article' },
      { label: 'ISO 27001 Gap Analysis Tool', url: '/tools/iso-27001-gap-analysis/', type: 'tool' },
    ],
  },
  {
    slug: 'soc-2',
    term: 'SOC 2',
    shortName: 'SOC 2',
    category: 'security-compliance',
    definition: 'SOC 2 is an attestation framework from the AICPA under which an independent CPA firm reports on whether a service organization’s controls meet the Trust Services Criteria — Security plus optional Availability, Processing Integrity, Confidentiality, and Privacy categories.',
    sections: [
      {
        heading: 'Type I vs Type II',
        paragraphs: [
          'A Type I report evaluates whether your controls are suitably designed at a single point in time. A Type II report evaluates whether they actually operated effectively over a period — typically 6 to 12 months. Customers generally want Type II; Type I is mainly a stepping stone that proves the design is right before you start the observation window.',
          'Unlike ISO 27001 certification, SOC 2 is an attestation, not a certificate: a licensed CPA firm issues an opinion inside a detailed report you share with customers under NDA. There is no public register — the report itself is the deliverable.',
        ],
      },
      {
        heading: 'SOC 2 or ISO 27001?',
        paragraphs: [
          'SOC 2 dominates North American SaaS procurement; ISO 27001 is the default internationally. The control content overlaps heavily — most organizations implement one set of controls and map it to both frameworks rather than running two programs.',
        ],
      },
    ],
    standards: [
      { name: 'AICPA Trust Services Criteria (2017, revised 2022)' },
      { name: 'AT-C 205 — attestation standard for SOC 2 engagements' },
    ],
    relatedTerms: ['trust-services-criteria', 'iso-27001', 'sla', 'gap-analysis'],
    relatedLinks: [
      { label: 'SOC 2 Readiness Checker', url: '/tools/soc-2-readiness-checker/', type: 'tool' },
      { label: 'SOC 2 Trust Services Criteria: all 52 criteria explained', url: '/insights/soc-2-trust-services-criteria/', type: 'article' },
      { label: 'SOC 2 vs ISO 27001: attestation vs certification', url: '/insights/soc-2-vs-iso-27001/', type: 'article' },
    ],
    faq: [
      { q: 'Is SOC 2 a certification?', a: 'No — it is an attestation. A CPA firm issues an opinion on your controls inside a report. There is no certificate and no public registry; you distribute the report to customers yourself, usually under NDA.' },
      { q: 'How long does a SOC 2 Type II take?', a: 'The observation period alone is typically 6–12 months, plus readiness work beforehand. Most organizations first complete a Type I (point-in-time) report to prove control design, then start the Type II clock.' },
    ],
  },
  {
    slug: 'trust-services-criteria',
    term: 'Trust Services Criteria (TSC)',
    shortName: 'TSC',
    category: 'security-compliance',
    definition: 'The Trust Services Criteria are the AICPA control framework that SOC 2 reports are evaluated against — organized into five categories: Security (the mandatory Common Criteria), Availability, Processing Integrity, Confidentiality, and Privacy.',
    sections: [
      {
        heading: 'The five categories',
        paragraphs: [
          'Security is the only mandatory category — every SOC 2 report covers the Common Criteria (CC1–CC9): control environment, communication, risk assessment, monitoring, control activities, logical access, system operations, change management, and risk mitigation. The other four categories are optional and added when your service commitments require them: Availability for uptime promises, Processing Integrity for accurate and complete processing, Confidentiality for protecting sensitive data, and Privacy for personal-information handling.',
          'In total the framework defines 52 criteria. A SaaS company with an SLA typically reports on Security plus Availability; a company handling regulated personal data adds Privacy and Confidentiality.',
        ],
      },
      {
        heading: 'How auditors use them',
        paragraphs: [
          'Each criterion has points of focus — illustrative characteristics the auditor considers when judging whether your controls meet the criterion. You map your controls to the criteria you committed to; the auditor tests design (Type I) and operating effectiveness (Type II) against them.',
        ],
      },
    ],
    standards: [
      { name: 'AICPA Trust Services Criteria (2017, revised 2022)' },
    ],
    relatedTerms: ['soc-2', 'sla', 'gdpr'],
    relatedLinks: [
      { label: 'SOC 2 Trust Services Criteria: all 52 criteria explained', url: '/insights/soc-2-trust-services-criteria/', type: 'article' },
      { label: 'SOC 2 Readiness Checker', url: '/tools/soc-2-readiness-checker/', type: 'tool' },
    ],
  },
  {
    slug: 'dora',
    term: 'DORA (Digital Operational Resilience Act)',
    shortName: 'DORA',
    category: 'security-compliance',
    definition: 'DORA — Regulation (EU) 2022/2554 — is the EU law on digital operational resilience for the financial sector. It has applied since 17 January 2025 and imposes binding requirements on ICT risk management, incident reporting, resilience testing, and third-party technology oversight.',
    sections: [
      {
        heading: 'Who and what it covers',
        paragraphs: [
          'DORA applies to banks, insurers, investment firms, payment institutions, and — importantly for Web3 — crypto-asset service providers (CASPs) licensed under MiCA. Its pillars cover: an ICT risk-management framework; classification and reporting of major incidents (initial, intermediate, and final reports on tight deadlines); annual resilience testing, with threat-led penetration testing (TLPT) every three years for significant entities; and a register of information covering all ICT third-party contracts.',
          'The most consequential piece for vendors is the third-party pillar. Financial entities must contractually secure audit and access rights over their ICT providers, and the ESAs directly oversee designated critical third-party providers (CTPPs) — a first in EU law. Contracts without the mandatory DORA clauses must be remediated.',
        ],
      },
      {
        heading: 'How it relates to other frameworks',
        paragraphs: [
          'DORA is lex specialis for the financial sector — where it overlaps NIS2, DORA wins. Its risk-management and incident-handling requirements align closely with ISO/IEC 27001 practices, so a certified ISMS covers much of the groundwork, but DORA adds hard obligations the standard does not: statutory reporting deadlines, TLPT, and the register of information.',
        ],
      },
    ],
    standards: [
      { name: 'Regulation (EU) 2022/2554 (DORA)' },
      { name: 'ESA RTS/ITS on ICT risk, incident classification, TLPT, and the register of information' },
      { name: 'TIBER-EU — threat-intelligence-based red teaming framework' },
    ],
    relatedTerms: ['nis2', 'mica', 'iso-27001', 'gdpr', 'sla'],
    relatedLinks: [
      { label: 'DORA compliance consulting', url: '/dora/', type: 'service' },
      { label: 'DORA for crypto & Web3: what Regulation 2022/2554 requires from CASPs', url: '/insights/dora-crypto-web3-compliance/', type: 'article' },
      { label: 'Blockchain Compliance Checker', url: '/tools/blockchain-compliance-checker/', type: 'tool' },
      { label: 'Request a quote', url: '/quote/', type: 'service' },
    ],
    faq: [
      { q: 'Who does DORA apply to?', a: 'Almost the entire EU financial sector — banks, payment and e-money institutions, investment firms, insurers, fund managers, and crypto-asset service providers under MiCA — plus the ICT vendors that serve them, through mandatory contractual clauses and direct oversight of critical third-party providers.' },
      { q: 'Does DORA replace ISO 27001?', a: 'No. DORA is a legal obligation; ISO 27001 is a voluntary certification that gives you the management system to meet it efficiently. A certified ISMS covers much of the ICT risk-management groundwork, but DORA adds statutory duties — incident reporting deadlines, TLPT, and the register of information — that no standard provides.' },
      { q: 'When did DORA take effect?', a: 'It entered into force in January 2023 and has applied in full since 17 January 2025. There is no remaining transition period — requirements are live now.' },
    ],
  },
  {
    slug: 'gdpr',
    term: 'GDPR (General Data Protection Regulation)',
    shortName: 'GDPR',
    category: 'security-compliance',
    definition: 'The GDPR — Regulation (EU) 2016/679 — is the EU’s data protection law. It governs how organizations collect, use, store, and share personal data, grants individuals enforceable rights over their data, and allows fines of up to €20 million or 4% of global turnover.',
    sections: [
      {
        heading: 'Core obligations',
        paragraphs: [
          'Processing needs a lawful basis (consent, contract, legal obligation, legitimate interests, and others). Organizations must honor data subject rights — access, rectification, erasure, portability, objection — typically within one month. Breaches affecting individuals must be reported to the supervisory authority within 72 hours where feasible. High-risk processing requires a data protection impact assessment (DPIA), and larger processors may need a data protection officer (DPO).',
          'For vendors, Article 28 matters most: any processor you use must be bound by a contract with mandatory clauses, and international transfers need a mechanism — adequacy, standard contractual clauses, or binding corporate rules.',
        ],
      },
      {
        heading: 'GDPR and security standards',
        paragraphs: [
          'Article 32 requires security appropriate to the risk — pseudonymization, CIA of systems, resilience, regular testing — without prescribing technology. ISO/IEC 27001 is widely used as the framework that demonstrates those measures systematically, and EU regulators increasingly expect exactly that kind of documented, risk-based approach.',
        ],
      },
    ],
    standards: [
      { name: 'Regulation (EU) 2016/679 (GDPR)' },
      { name: 'ePrivacy Directive 2002/58/EC — cookies and electronic communications' },
    ],
    relatedTerms: ['dora', 'nis2', 'iso-27001', 'eu-ai-act', 'crm'],
    relatedLinks: [
      { label: 'Our privacy policy', url: '/privacy/', type: 'service' },
      { label: 'Cookie policy', url: '/cookie-policy/', type: 'service' },
      { label: 'How to choose a CRM & ticketing system (GDPR checklist)', url: '/insights/how-to-choose-crm-ticketing-system/', type: 'article' },
    ],
    faq: [
      { q: 'Does GDPR apply to non-EU companies?', a: 'Yes — its scope is extraterritorial. Any organization offering goods or services to people in the EU, or monitoring their behavior, must comply regardless of where it is established.' },
      { q: 'Is ISO 27001 enough for GDPR compliance?', a: 'It covers the security obligations of Article 32 well, but GDPR goes further: lawful bases, consent management, data subject rights workflows, DPIAs, processor contracts, and transfer mechanisms. You need both the management system and the data protection processes.' },
    ],
  },
  {
    slug: 'nis2',
    term: 'NIS2 Directive',
    shortName: 'NIS2',
    category: 'security-compliance',
    definition: 'NIS2 — Directive (EU) 2022/2555 — is the EU’s cybersecurity law for essential and important entities. It mandates risk-management measures, incident reporting with a 24-hour early-warning deadline, and personal accountability for management bodies across 18 critical sectors.',
    sections: [
      {
        heading: 'Who it covers',
        paragraphs: [
          'NIS2 dramatically widened the original NIS scope: energy, transport, health, banking, digital infrastructure, ICT service providers, manufacturing, food, waste management, space, and more — split into essential entities (larger, stricter supervision) and important entities. Member states transposed it into national law from October 2024; in Austria it is implemented through the NISG.',
          'Obligations include a defined set of risk-management measures (incident handling, supply-chain security, cryptography, MFA, training), registration with national authorities, and a two-stage incident reporting duty — early warning within 24 hours, full notification within 72 hours.',
        ],
      },
      {
        heading: 'NIS2 vs DORA',
        paragraphs: [
          'Financial entities are generally carved out because DORA — the sector-specific regulation — takes precedence wherever the two overlap. For everyone else in scope, NIS2 is the baseline, and ISO/IEC 27001 remains the most common framework for structuring the required measures.',
        ],
      },
    ],
    standards: [
      { name: 'Directive (EU) 2022/2555 (NIS2)' },
      { name: 'National transposition laws — e.g., Austria NISG 2026' },
    ],
    relatedTerms: ['dora', 'gdpr', 'iso-27001', 'zero-trust'],
    relatedLinks: [
      { label: 'DORA compliance consulting', url: '/dora/', type: 'service' },
      { label: 'Security Scanner', url: '/tools/security-tools/', type: 'tool' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
  },
  {
    slug: 'gap-analysis',
    term: 'Gap Analysis',
    shortName: 'Gap Analysis',
    category: 'security-compliance',
    definition: 'A gap analysis is a structured comparison of your organization’s current practices against the requirements of a target standard or framework — ISO 27001, ISO 9001, ISO/IEC 42001, SOC 2 — producing a prioritized list of what is missing or incomplete.',
    sections: [
      {
        heading: 'What you get out of it',
        paragraphs: [
          'The output is a remediation roadmap: every requirement scored as compliant, partial, or missing, with severity, suggested remediation, and typically an effort estimate. Done well, it converts an abstract certification goal into a costed project plan — which is exactly what management and auditors want to see at Stage 1.',
          'A gap analysis is usually the first step of any certification project: cheap, fast (days to a few weeks), and it prevents the classic failure mode of implementing controls nobody scoped. It is distinct from a risk assessment — the gap analysis measures you against the standard; the risk assessment identifies threats to your specific assets and drives which controls matter.',
        ],
      },
      {
        heading: 'Running one',
        paragraphs: [
          'You can self-assess with a structured questionnaire, use a spreadsheet template for workshop-style reviews, or commission a consultant-led analysis (typically 2–6 weeks). Our free readiness checkers score you instantly against ISO 27001, ISO 9001, ISO/IEC 42001, and the SOC 2 Trust Services Criteria.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 27001:2022' },
      { name: 'ISO 9001:2015' },
      { name: 'ISO/IEC 42001:2023' },
      { name: 'AICPA Trust Services Criteria' },
    ],
    relatedTerms: ['risk-assessment', 'iso-27001', 'iso-9001', 'iso-42001', 'soc-2'],
    relatedLinks: [
      { label: 'ISO 27001 Gap Analysis Tool', url: '/tools/iso-27001-gap-analysis/', type: 'tool' },
      { label: 'SOC 2 Readiness Checker', url: '/tools/soc-2-readiness-checker/', type: 'tool' },
      { label: 'ISO 9001 Readiness Checker', url: '/tools/iso-9001-readiness-checker/', type: 'tool' },
      { label: 'ISO 42001 AI Readiness', url: '/tools/iso-42001-ai-readiness/', type: 'tool' },
      { label: 'Gap analysis guide', url: '/insights/iso-27001-gap-analysis-guide/', type: 'article' },
      { label: 'Gap analysis template (.xlsx)', url: '/downloads/iso-27001-gap-analysis-template.xlsx', type: 'download' },
    ],
  },
  {
    slug: 'risk-assessment',
    term: 'Risk Assessment (Information Security)',
    shortName: 'Risk Assessment',
    category: 'security-compliance',
    definition: 'An information security risk assessment is the systematic process of identifying threats and vulnerabilities affecting your information assets, evaluating their likelihood and impact, and deciding which risks to treat, accept, transfer, or avoid.',
    sections: [
      {
        heading: 'Where it sits in the process',
        paragraphs: [
          'In ISO/IEC 27001, Clause 6.1.2 makes the risk assessment the engine of the whole ISMS: its results decide which Annex A controls you need, which the Statement of Applicability then documents. Skip or shortcut it and the control set is arbitrary — the most common finding auditors raise.',
          'Methodologies vary (asset-based, scenario-based, quantitative vs qualitative scales), but every defensible approach answers the same questions: what assets matter, what could go wrong, how likely is it, how bad would it be, and what residual risk remains after treatment. ISO/IEC 27005 provides dedicated guidance.',
        ],
      },
      {
        heading: 'Beyond ISO 27001',
        paragraphs: [
          'The same discipline appears across the regulatory landscape: DORA requires an ICT risk-management framework built on risk assessment, NIS2 expects risk-based measures, and GDPR Article 32 demands security appropriate to the risk. One well-run assessment can feed all of them.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 27001:2022 — Clause 6.1.2' },
      { name: 'ISO/IEC 27005 — risk management guidance' },
      { name: 'Regulation (EU) 2022/2554 (DORA) — ICT risk management' },
    ],
    relatedTerms: ['iso-27001', 'gap-analysis', 'statement-of-applicability', 'isms', 'dora'],
    relatedLinks: [
      { label: 'ISO 27001 Gap Analysis Tool', url: '/tools/iso-27001-gap-analysis/', type: 'tool' },
      { label: 'ISO 27001 gap analysis: the step-by-step guide', url: '/insights/iso-27001-gap-analysis-guide/', type: 'article' },
    ],
  },
  {
    slug: 'zero-trust',
    term: 'Zero Trust',
    shortName: 'Zero Trust',
    category: 'security-compliance',
    definition: 'Zero Trust is a security model that removes implicit trust from networks: every access request is authenticated, authorized, and continuously validated based on identity, device posture, and context — never on network location.',
    sections: [
      {
        heading: 'Core principles',
        paragraphs: [
          'Three rules define the model: verify explicitly (authenticate and authorize every request using all available signals), use least-privilege access (just-in-time, just-enough permission), and assume breach (segment aggressively, encrypt everything, monitor continuously). Perimeter defenses and VPN-style broad network access give way to per-resource, identity-bound decisions.',
          'In cloud environments this lands concretely in IAM design: scoped-down policies, no wildcard actions, conditions on source and principal, and short-lived credentials — the same failure patterns our IAM Policy Validator flags automatically.',
        ],
      },
      {
        heading: 'Where it fits with standards',
        paragraphs: [
          'Zero Trust is an architecture, not a certifiable standard — but its controls map cleanly onto ISO/IEC 27001 Annex A access-control, logging, and network-security controls, and onto NIST SP 800-207, the reference architecture most implementations follow.',
        ],
      },
    ],
    standards: [
      { name: 'NIST SP 800-207 — Zero Trust Architecture' },
      { name: 'ISO/IEC 27001:2022 — access control, logging, network security controls' },
    ],
    relatedTerms: ['iam', 'iso-27001', 'nis2', 'arn'],
    relatedLinks: [
      { label: 'IAM Policy Validator', url: '/tools/iam-policy-validator/', type: 'tool' },
      { label: 'IAM Policy Security: 7 privilege escalation patterns', url: '/insights/iam-policy-security-patterns/', type: 'article' },
    ],
  },
  // ---------------------------------------------------------------- ai-governance
  {
    slug: 'iso-42001',
    term: 'ISO/IEC 42001',
    shortName: 'ISO 42001',
    category: 'ai-governance',
    definition: 'ISO/IEC 42001 is the first international standard for AI management systems (AIMS). Published in December 2023, it specifies requirements for governing the development and use of AI — policies, risk assessment, lifecycle controls, and accountability — and is certifiable like ISO 27001.',
    sections: [
      {
        heading: 'What it covers',
        paragraphs: [
          'The standard follows the Annex SL management-system structure — clauses 4–10 covering context, leadership, planning, support, operation, performance evaluation, and improvement — so it slots naturally beside an existing ISO 27001 or ISO 9001 system. Annex A defines 38 controls across 9 domains, from AI policies and risk assessment processes through data quality, transparency, human oversight, and third-party AI management.',
          'Two features distinguish it from generic IT governance: an AI-specific risk assessment covering harms to individuals, groups, and society — not just the organization — and a system-impact assessment required for each AI system in scope.',
        ],
      },
      {
        heading: 'Why it matters now',
        paragraphs: [
          'The EU AI Act creates legal obligations for AI providers and deployers, and procurement teams are starting to ask for evidence of AI governance. ISO/IEC 42001 is emerging as the presumption-of-conformity vehicle: certification is voluntary, but it is becoming the fastest credible answer to the question how do you govern your AI.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 42001:2023 — AI management systems' },
      { name: 'ISO/IEC 23894 — AI risk management guidance' },
      { name: 'Regulation (EU) 2024/1689 (EU AI Act)' },
    ],
    relatedTerms: ['aims', 'eu-ai-act', 'iso-27001', 'integrated-management-system', 'iso-9001'],
    relatedLinks: [
      { label: 'ISO 42001 AI Readiness Assessment', url: '/tools/iso-42001-ai-readiness/', type: 'tool' },
      { label: 'ISO/IEC 42001 explained: AIMS readiness guide', url: '/insights/iso-42001-ai-management-guide/', type: 'article' },
      { label: 'ISO/IEC 42001 Annex A: the 38 controls', url: '/insights/iso-42001-annex-a-controls/', type: 'article' },
      { label: 'Annex A controls list (.csv)', url: '/downloads/iso-42001-annex-a-controls.csv', type: 'download' },
    ],
    faq: [
      { q: 'Is ISO/IEC 42001 certification mandatory?', a: 'No — it is voluntary. But it is increasingly requested in procurement and is strong evidence of AI governance maturity under the EU AI Act.' },
      { q: 'Who needs ISO/IEC 42001?', a: 'Any organization that develops, provides, or meaningfully deploys AI systems — especially where AI outputs affect customers, employees, or regulated decisions. Even organizations that only consume third-party AI can scope an AIMS around usage governance.' },
      { q: 'Can it integrate with an existing ISO 27001 system?', a: 'Yes — both follow the Annex SL structure, so context, leadership, document control, internal audit, and management review can be shared. Most organizations run them as one integrated management system with AI-specific extensions.' },
    ],
  },
  {
    slug: 'aims',
    term: 'AIMS (AI Management System)',
    shortName: 'AIMS',
    category: 'ai-governance',
    definition: 'An AI management system (AIMS) is the set of policies, processes, and controls an organization uses to govern the development, procurement, deployment, and retirement of AI systems — the AI equivalent of an ISMS for security or a QMS for quality.',
    sections: [
      {
        heading: 'What it governs',
        paragraphs: [
          'An AIMS covers the whole AI lifecycle: intended-purpose definition, data sourcing and quality, model development or procurement, impact and risk assessment, deployment with human oversight, monitoring for drift and incidents, and retirement. It also covers the organizational layer — roles, competencies, supplier management, and reporting to leadership.',
          'ISO/IEC 42001 is the standard that defines what a conforming AIMS requires. Because it shares the Annex SL skeleton with ISO 27001 and ISO 9001, organizations already running those systems extend them rather than building a parallel structure — shared audits, shared document control, one management review.',
        ],
      },
      {
        heading: 'Why organizations are building one',
        paragraphs: [
          'The EU AI Act makes AI governance a legal question, not an ethical preference. An AIMS gives you the inventory, risk process, and oversight evidence that regulators and enterprise customers increasingly request — and it is the only scalable way to answer what AI are we running and who is accountable for it.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/IEC 42001:2023 — AIMS requirements' },
      { name: 'ISO/IEC 23894 — AI risk management guidance' },
      { name: 'Regulation (EU) 2024/1689 (EU AI Act)' },
    ],
    relatedTerms: ['iso-42001', 'eu-ai-act', 'isms', 'integrated-management-system'],
    relatedLinks: [
      { label: 'ISO 42001 AI Readiness Assessment', url: '/tools/iso-42001-ai-readiness/', type: 'tool' },
      { label: 'ISO/IEC 42001 explained: AIMS readiness guide', url: '/insights/iso-42001-ai-management-guide/', type: 'article' },
      { label: 'Building one integrated management system', url: '/insights/integrated-management-system-iso-9001-27001-42001/', type: 'article' },
    ],
  },
  {
    slug: 'eu-ai-act',
    term: 'EU AI Act',
    shortName: 'AI Act',
    category: 'ai-governance',
    definition: 'The EU AI Act — Regulation (EU) 2024/1689 — is the world’s first comprehensive AI law. It applies a risk-based regime: unacceptable-risk practices are banned, high-risk AI systems carry strict obligations for providers and deployers, and limited-risk systems face transparency duties, with phased application from February 2025.',
    sections: [
      {
        heading: 'The risk tiers',
        paragraphs: [
          'Prohibited practices — social scoring, manipulative techniques, most real-time biometric identification — applied from February 2025. General-purpose AI (GPAI) model obligations followed in August 2025. High-risk obligations (Annex III use cases like employment screening, credit scoring, critical infrastructure) apply from August 2026–2027, requiring risk management, data governance, technical documentation, human oversight, and conformity assessment.',
          'Enforcement is serious: up to €35 million or 7% of global turnover for prohibited-practice violations, and each member state designates market surveillance authorities. Deployers — not just providers — carry duties: use according to instructions, human oversight, input-data quality, log retention, and fundamental-rights impact assessments for some public-sector uses.',
        ],
      },
      {
        heading: 'How organizations are responding',
        paragraphs: [
          'The Act deliberately connects to standards: conformity with harmonised CEN-CENELEC standards creates a presumption of conformity, and ISO/IEC 42001 is the management-system layer most organizations adopt to operationalize the obligations — AI inventory, risk process, oversight, and evidence in one system.',
        ],
      },
    ],
    standards: [
      { name: 'Regulation (EU) 2024/1689 (EU AI Act)' },
      { name: 'ISO/IEC 42001:2023 — AI management systems' },
      { name: 'CEN-CENELEC harmonised standards (in development)' },
    ],
    relatedTerms: ['iso-42001', 'aims', 'gdpr', 'mica'],
    relatedLinks: [
      { label: 'ISO/IEC 42001 explained: AIMS readiness guide', url: '/insights/iso-42001-ai-management-guide/', type: 'article' },
      { label: 'ISO 42001 AI Readiness Assessment', url: '/tools/iso-42001-ai-readiness/', type: 'tool' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
  },
  // ---------------------------------------------------------------- payments
  {
    slug: 'iso-20022',
    term: 'ISO 20022',
    shortName: 'ISO 20022',
    category: 'payments',
    definition: 'ISO 20022 is the global standard for financial messaging — a common XML-based language for payments, securities, cards, and trade data exchanged between financial institutions. It is replacing the legacy SWIFT MT formats, with the MT/MX coexistence period ending in November 2026.',
    sections: [
      {
        heading: 'The message families',
        paragraphs: [
          'ISO 20022 organizes messages by business area. The ones most organizations meet first: pain (payment initiation — pain.001 credit transfers, pain.008 direct debits), camt (cash management — camt.053 statements, camt.054 advices), and pacs (interbank clearing — pacs.008 customer credit transfers). Each message is an XML document validated against a published schema, with structured elements for parties, remittance data, and charges.',
          'The standard’s real advance is structured data: where MT940 crammed remittance information into a free-text :86: field, camt.053 has dedicated elements for invoice references, creditor details, and reconciliation codes — which is what enables straight-through processing and automated reconciliation.',
        ],
      },
      {
        heading: 'The migration deadline',
        paragraphs: [
          'SWIFT ends MT/MX coexistence for cross-border payment instructions in November 2026 — from then on MX (ISO 20022) messages are required. Domestic infrastructures have already moved: TARGET2, SEPA schemes, CHAPS, and Fedwire all migrated or mandate the format. If your ERP still generates or consumes MT files, the migration affects your payment files, statement imports, and reconciliation logic.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 20022 — Universal financial industry message scheme', url: 'https://www.iso20022.org/' },
      { name: 'EPC SEPA rulebooks — SCT, SDD, SCT Inst' },
      { name: 'CGI — Common Global Implementation guidelines' },
    ],
    relatedTerms: ['mt940', 'camt-053', 'pain-001', 'pain-008', 'pacs-008', 'sepa', 'bic'],
    relatedLinks: [
      { label: 'ISO 20022 Message Viewer', url: '/tools/iso-20022-viewer/', type: 'tool' },
      { label: 'ISO 20022 migration guide: what November 2026 means', url: '/insights/iso-20022-migration-guide/', type: 'article' },
      { label: 'MT940 to camt.053 converter', url: '/tools/mt940-to-camt053/', type: 'tool' },
      { label: 'SEPA XML Validator', url: '/tools/sepa-xml-validator/', type: 'tool' },
    ],
    faq: [
      { q: 'Is ISO 20022 mandatory?', a: 'For cross-border payments on SWIFT, yes — from November 2026 MX messages become the required format for payment instructions. Many domestic market infrastructures (TARGET2, SEPA instant, CHAPS, Fedwire) have already migrated or announced mandates.' },
      { q: 'What is the difference between MT940 and camt.053?', a: 'MT940 is the legacy SWIFT end-of-day statement with tagged fields (:61:, :86:). camt.053 is its ISO 20022 XML equivalent with structured elements for balances, entries, and remittance details. Both represent bank statements, but camt.053 carries richer, machine-readable data.' },
    ],
  },
  {
    slug: 'sepa',
    term: 'SEPA (Single Euro Payments Area)',
    shortName: 'SEPA',
    category: 'payments',
    definition: 'SEPA — the Single Euro Payments Area — harmonizes euro payments across 36+ countries so that a credit transfer or direct debit between any two SEPA accounts works like a domestic payment: same formats, same rulebooks, same fees.',
    sections: [
      {
        heading: 'How it works',
        paragraphs: [
          'SEPA is defined by the European Payments Council’s rulebooks. The three scheme families are SCT (SEPA Credit Transfer — push payments, delivered within one business day), SDD (SEPA Direct Debit — pull payments under a signed mandate, in CORE and B2B variants), and SCT Inst (instant credit transfer, settling in under ten seconds, 24/7).',
          'Technically, SEPA runs on ISO 20022 XML: customers submit pain.001 files for credit transfers and pain.008 for direct debits, and receive camt.053 statements back. Every payment is identified by the beneficiary’s IBAN; BICs became optional inside SEPA because banks derive them from the IBAN. Charges are shared (SLEV) and amounts are in EUR — constraints our validator checks automatically.',
        ],
      },
      {
        heading: 'Why it matters',
        paragraphs: [
          'For businesses, SEPA means one EUR account can pay or collect anywhere in the zone, with standardized file formats your ERP or accounting software can generate. Verification-of-payee requirements being phased in with instant payments add a new layer of payee checking before funds move.',
        ],
      },
    ],
    standards: [
      { name: 'EPC SEPA rulebooks — SCT, SDD CORE/B2B, SCT Inst' },
      { name: 'ISO 20022 — message standard' },
      { name: 'ISO 13616 — IBAN' },
    ],
    relatedTerms: ['iso-20022', 'iban', 'bic', 'pain-001', 'pain-008', 'psd2'],
    relatedLinks: [
      { label: 'SEPA XML Validator', url: '/tools/sepa-xml-validator/', type: 'tool' },
      { label: 'SEPA XML Generator (pain.001 & pain.008 from CSV)', url: '/tools/sepa-xml-generator/', type: 'tool' },
      { label: 'IBAN Validator', url: '/tools/iban-validator/', type: 'tool' },
    ],
    faq: [
      { q: 'What is the difference between SCT and SDD?', a: 'SCT (credit transfer) pushes money — you instruct your bank to credit another account. SDD (direct debit) pulls money — you collect from a debtor who signed a mandate, which is why SDD files carry mandate IDs, signature dates, and your creditor scheme ID.' },
      { q: 'Do I need a BIC for SEPA payments?', a: 'Not usually — inside the SEPA zone the BIC is optional because banks derive it from the IBAN. Our generator accepts it per row if you have it, but the column can stay empty.' },
    ],
  },
  {
    slug: 'iban',
    term: 'IBAN (International Bank Account Number)',
    shortName: 'IBAN',
    category: 'payments',
    definition: 'The IBAN is the international standard for identifying bank accounts — up to 34 characters starting with a country code and two MOD-97 check digits, defined by ISO 13616 and required for all SEPA payments.',
    sections: [
      {
        heading: 'Structure',
        paragraphs: [
          'An IBAN is country code + 2 check digits + BBAN (Basic Bank Account Number, the domestic part). Examples: AT611904300234573201 (Austria, 20 chars), DE89370400440532013000 (Germany, 22), GB29NWBK60161331926819 (UK, 22). The check digits are computed with MOD-97 — move the first four characters to the end, convert letters to numbers, and the remainder mod 97 must equal 1.',
          'The BBAN structure is country-specific: it encodes the domestic bank code, branch, and account number in a fixed layout, which is why a validator can tell you an Austrian IBAN belongs to a specific institution just from its digits.',
        ],
      },
      {
        heading: 'What validation does and does not prove',
        paragraphs: [
          'A valid checksum proves the number is well-formed and almost certainly transcribed correctly — it says nothing about whether the account exists or is open. Inside SEPA, the IBAN alone routes the payment; the BIC is optional because banks derive it.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 13616 — IBAN' },
      { name: 'EPC SEPA rulebooks' },
    ],
    relatedTerms: ['bic', 'sepa', 'pain-001', 'lei'],
    relatedLinks: [
      { label: 'IBAN Validator', url: '/tools/iban-validator/', type: 'tool' },
      { label: 'BIC / SWIFT Validator', url: '/tools/bic-validator/', type: 'tool' },
      { label: 'SEPA XML Generator', url: '/tools/sepa-xml-generator/', type: 'tool' },
    ],
    faq: [
      { q: 'Does a valid IBAN mean the account exists?', a: 'No. The MOD-97 checksum proves the digits are well-formed — it catches typos, not closed or fictitious accounts. Reachability and account existence are confirmed by your bank, and verification-of-payee checks increasingly confirm the account holder name before you send.' },
    ],
  },
  {
    slug: 'bic',
    term: 'BIC (Business Identifier Code)',
    shortName: 'BIC',
    category: 'payments',
    definition: 'The BIC — also called a SWIFT code — is the ISO 9362 standard identifier for financial institutions: 8 or 11 characters encoding the institution, country, location, and optionally the branch, used to route international payments.',
    sections: [
      {
        heading: 'Structure',
        paragraphs: [
          'An 8-character BIC identifies an institution’s head office (e.g., GIBAATWW for Erste Group Bank Vienna); an 11-character BIC adds a branch code. The breakdown is: 4-letter institution code, 2-letter ISO 3166 country code, 2-character location code, and optional 3-character branch. A BIC ending in XXX means head office.',
          'The same code doubles as the connected-party identifier on the SWIFT network — which is why BIC and SWIFT code are used interchangeably, though technically SWIFT runs the network and ISO 9362 defines the identifier.',
        ],
      },
      {
        heading: 'When you still need it',
        paragraphs: [
          'Inside SEPA the BIC is optional — banks derive it from the IBAN. For international payments outside SEPA, correspondent banking, and trade finance, it remains essential routing information, and many payment files still carry it for validation.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 9362 — Business Identifier Code' },
    ],
    relatedTerms: ['iban', 'sepa', 'iso-20022', 'lei', 'pacs-008'],
    relatedLinks: [
      { label: 'BIC / SWIFT Validator', url: '/tools/bic-validator/', type: 'tool' },
      { label: 'IBAN Validator', url: '/tools/iban-validator/', type: 'tool' },
      { label: 'ISO 20022 Message Viewer', url: '/tools/iso-20022-viewer/', type: 'tool' },
    ],
  },
  {
    slug: 'lei',
    term: 'LEI (Legal Entity Identifier)',
    shortName: 'LEI',
    category: 'payments',
    definition: 'The LEI is the ISO 17442 standard 20-character identifier for legal entities in financial transactions — a globally unique code linking an entity to reference data about who it is and, via parent relationships, who owns it.',
    sections: [
      {
        heading: 'What it is for',
        paragraphs: [
          'Created after the 2008 financial crisis, the LEI answers who is who and who owns whom in financial markets. Each record carries Level 1 data (legal name, registered address, entity status) and Level 2 data (direct and ultimate parent entities). The GLEIF operates the public registry — every LEI record is freely searchable.',
          'Regulatory regimes require it for transaction reporting: MiFID II/EMIR derivatives reporting, DORA registers of information, and most securities and payments supervision in the EU. Many banks now request an LEI during corporate onboarding even when not strictly mandated.',
        ],
      },
      {
        heading: 'Structure and renewal',
        paragraphs: [
          'The 20 alphanumeric characters include a 2-character check computed with MOD 97-10 — the same family of checksum used by IBANs, so a validator can catch transcription errors locally. LEIs lapse after one year without renewal; a lapsed LEI can block regulatory filings.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 17442 — Legal Entity Identifier' },
      { name: 'Regulation (EU) 2022/2554 (DORA) — register of information' },
    ],
    relatedTerms: ['bic', 'iban', 'dora', 'mica'],
    relatedLinks: [
      { label: 'LEI Validator', url: '/tools/lei-validator/', type: 'tool' },
      { label: 'BIC / SWIFT Validator', url: '/tools/bic-validator/', type: 'tool' },
    ],
  },
  {
    slug: 'mt940',
    term: 'MT940 (SWIFT Customer Statement)',
    shortName: 'MT940',
    category: 'payments',
    definition: 'MT940 is the SWIFT MT format for end-of-day bank account statements — a tagged-field text message (:20:, :25:, :60F:, :61:, :86:, :62F:) that treasuries and ERPs have consumed for decades, now being replaced by ISO 20022 camt.053.',
    sections: [
      {
        heading: 'Anatomy',
        paragraphs: [
          'Each MT940 is a sequence of tagged fields: :20: transaction reference, :25: account identification (usually the IBAN), :60F: opening balance, repeating :61: statement lines (one per transaction: value date, amount, transaction code, references) paired with :86: information-to-account-owner (free text plus structured SEPA subfields like EREF+, MREF+, CRED+), and :62F: closing balance.',
          'The format’s weakness is that :86: — where all the useful remittance detail lives — is essentially free text. Structured SEPA subfields help, but parsing still means handling bank-specific quirks, which is why the ISO 20022 migration matters.',
        ],
      },
      {
        heading: 'The move to camt.053',
        paragraphs: [
          'MT940’s ISO 20022 successor is camt.053 (bank-to-customer statement): the same information in structured XML — balances become OPBD/CLBD elements, :61: entries become Ntry elements, and remittance data gets dedicated RmtInf fields. Banks already deliver camt.053 alongside MT940; our converters let you bridge both directions — MT940 to CSV for analysis, and MT940 to camt.053 to test your ISO 20022 pipelines before the November 2026 deadline.',
        ],
      },
    ],
    standards: [
      { name: 'SWIFT MT standards — Category 9 customer statements' },
      { name: 'ISO 20022 camt.053 — successor format' },
    ],
    relatedTerms: ['camt-053', 'iso-20022', 'iban', 'sepa'],
    relatedLinks: [
      { label: 'MT940 to CSV converter', url: '/tools/mt940-to-csv/', type: 'tool' },
      { label: 'MT940 to camt.053 converter', url: '/tools/mt940-to-camt053/', type: 'tool' },
      { label: 'MT940 format explained and the camt.053 migration', url: '/insights/mt940-format-camt053-migration/', type: 'article' },
      { label: 'MT940 field reference: every tag decoded', url: '/insights/mt940-field-reference/', type: 'article' },
    ],
  },
  {
    slug: 'camt-053',
    term: 'camt.053 (Bank-to-Customer Statement)',
    shortName: 'camt.053',
    category: 'payments',
    definition: 'camt.053 is the ISO 20022 XML message for bank-to-customer account statements — the structured successor to SWIFT MT940, carrying balances, entries, and remittance data in machine-readable form.',
    sections: [
      {
        heading: 'What it carries',
        paragraphs: [
          'A camt.053 statement contains the account identification, opening (OPBD) and closing (CLBD) balances, and a list of entries (Ntry) — each with booking and value dates, amount, credit/debit indicator, transaction codes (BkTxCd), related parties and agents, and structured remittance information (RmtInf) that can carry invoice references and creditor identifiers as real XML elements rather than free text.',
          'The most widely deployed version in SEPA is camt.053.001.02 (per the EBA/CGI guideline). Newer versions like .001.08 restructure some elements, but .02 remains the common denominator European banks accept.',
        ],
      },
      {
        heading: 'Related camt messages',
        paragraphs: [
          'The camt family covers the whole cash-management reporting layer: camt.052 is the intraday/account-report counterpart (the MT942 successor), and camt.054 carries debit and credit advices (replacing MT900/MT910). Together they give ERPs a fully structured feed for reconciliation.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 20022 — camt.053 Bank-to-Customer Statement' },
      { name: 'CGI implementation guidelines' },
    ],
    relatedTerms: ['mt940', 'iso-20022', 'pain-001', 'sepa'],
    relatedLinks: [
      { label: 'MT940 to camt.053 converter', url: '/tools/mt940-to-camt053/', type: 'tool' },
      { label: 'ISO 20022 Message Viewer', url: '/tools/iso-20022-viewer/', type: 'tool' },
      { label: 'ISO 20022 migration guide', url: '/insights/iso-20022-migration-guide/', type: 'article' },
    ],
  },
  {
    slug: 'pain-001',
    term: 'pain.001 (Credit Transfer Initiation)',
    shortName: 'pain.001',
    category: 'payments',
    definition: 'pain.001 is the ISO 20022 message a customer sends to its bank to initiate credit transfers — the file format behind SEPA SCT batch uploads generated by ERPs and payroll systems.',
    sections: [
      {
        heading: 'Structure',
        paragraphs: [
          'A pain.001 file has a group header (message ID, creation timestamp, transaction count NbOfTxs, control sum CtrlSum, initiating party) followed by one or more payment information blocks, each containing a debtor account and a list of credit-transfer transactions — debtor/creditor names, IBANs, optional BICs, amounts in EUR, and remittance information. Banks verify that NbOfTxs and CtrlSum match the actual content.',
          'For SEPA, pain.001.001.03 is the most widely accepted version; some banks also accept .001.09 (the ISO 20022:2019 version used for CGI/global rollouts). The schema version is declared in the xmlns — validators read it to apply the right rules.',
        ],
      },
      {
        heading: 'SEPA-specific rules',
        paragraphs: [
          'SEPA constrains the base message: EUR currency, SLEV shared charges, and — inside the zone — BIC optional since banks derive it from the IBAN. Our generator builds conforming pain.001 from a simple CSV of payments, and the validator checks files against both schema and rulebook constraints.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 20022 — pain.001 Customer Credit Transfer Initiation' },
      { name: 'EPC SCT rulebook' },
    ],
    relatedTerms: ['pain-008', 'sepa', 'iso-20022', 'iban', 'pacs-008'],
    relatedLinks: [
      { label: 'SEPA XML Generator', url: '/tools/sepa-xml-generator/', type: 'tool' },
      { label: 'SEPA XML Validator', url: '/tools/sepa-xml-validator/', type: 'tool' },
      { label: 'ISO 20022 Message Viewer', url: '/tools/iso-20022-viewer/', type: 'tool' },
    ],
  },
  {
    slug: 'pain-008',
    term: 'pain.008 (Direct Debit Initiation)',
    shortName: 'pain.008',
    category: 'payments',
    definition: 'pain.008 is the ISO 20022 message a creditor sends to its bank to collect SEPA direct debits — each transaction carrying the mandate ID and signature date that authorize pulling money from the debtor’s account.',
    sections: [
      {
        heading: 'How it differs from pain.001',
        paragraphs: [
          'pain.001 pushes money out; pain.008 pulls money in. Because you are debiting someone else’s account, SEPA requires proof of authorization: every transaction references a mandate — the signed SDD authorization — via a unique mandate ID and its date of signature, and the creditor is identified by a creditor scheme ID issued under the EPC scheme.',
          'The file comes in two flavors matching the SDD schemes: CORE (collecting from consumers and businesses) and B2B (business-to-business only, shorter timelines, no debtor refund rights). Collection timing matters — files must reach the bank a set number of business days before the requested collection date.',
        ],
      },
      {
        heading: 'Generating and validating',
        paragraphs: [
          'Like pain.001, the file carries a group header with NbOfTxs and CtrlSum that banks verify. Our SEPA XML Generator builds pain.008.001.02 collections from a CSV of mandate references and amounts, and the validator checks mandate-related fields alongside schema and rulebook constraints.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 20022 — pain.008 Customer Direct Debit Initiation' },
      { name: 'EPC SDD rulebooks — CORE and B2B' },
    ],
    relatedTerms: ['pain-001', 'sepa', 'iso-20022', 'iban'],
    relatedLinks: [
      { label: 'SEPA XML Generator', url: '/tools/sepa-xml-generator/', type: 'tool' },
      { label: 'SEPA XML Validator', url: '/tools/sepa-xml-validator/', type: 'tool' },
    ],
  },
  {
    slug: 'pacs-008',
    term: 'pacs.008 (FI-to-FI Credit Transfer)',
    shortName: 'pacs.008',
    category: 'payments',
    definition: 'pacs.008 is the ISO 20022 interbank message that carries a customer credit transfer between financial institutions — the bank-to-bank leg of what a customer initiates with a pain.001 file.',
    sections: [
      {
        heading: 'Where it sits in the flow',
        paragraphs: [
          'When your ERP submits a pain.001 credit transfer, the debtor bank converts it into a pacs.008 to move the funds through the clearing infrastructure to the creditor bank. The message preserves the end-to-end identification chain — EndToEndId and the UETR (Unique End-to-End Transaction Reference) that lets corporates track a payment across institutions like a parcel.',
          'Compared with the legacy MT103 it replaces, pacs.008 carries fully structured party data — names, addresses, LEIs, structured remittance — which improves sanctions screening, reduces manual repair, and feeds richer data into camt.053 statements downstream.',
        ],
      },
      {
        heading: 'Why you will meet it',
        paragraphs: [
          'Most businesses never generate pacs.008 themselves — banks do — but you will increasingly receive it in payment status reports, investigation responses, and enriched statements. Understanding its structure helps when reconciling or debugging payment flows, which is what our ISO 20022 viewer decodes.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 20022 — pacs.008 FI-to-FI Customer Credit Transfer' },
      { name: 'SWIFT CBPR+ usage guidelines' },
      { name: 'EPC SCT Inst scheme — pacs.008 for instant payments' },
    ],
    relatedTerms: ['pain-001', 'iso-20022', 'camt-053', 'bic', 'sepa'],
    relatedLinks: [
      { label: 'ISO 20022 Message Viewer', url: '/tools/iso-20022-viewer/', type: 'tool' },
      { label: 'ISO 20022 migration guide', url: '/insights/iso-20022-migration-guide/', type: 'article' },
    ],
  },
  {
    slug: 'mica',
    term: 'MiCA (Markets in Crypto-Assets Regulation)',
    shortName: 'MiCA',
    category: 'payments',
    definition: 'MiCA — Regulation (EU) 2023/1114 — is the EU’s comprehensive crypto-asset framework: it licenses crypto-asset service providers (CASPs), regulates stablecoin issuance with reserve and redemption rules, and imposes white-paper disclosure and market-abuse requirements.',
    sections: [
      {
        heading: 'What it regulates',
        paragraphs: [
          'Three asset categories: e-money tokens (EMTs — single-fiat-referenced stablecoins, issuable only by banks and e-money institutions), asset-referenced tokens (ARTs — basket-referenced, with reserve, custody, and significant-token rules), and other crypto-assets (utility tokens and the rest — white paper and offer rules). CASPs — exchanges, custodians, brokers, advisers — need authorization in one member state, then passport across the EU.',
          'Stablecoin provisions applied from June 2024 and the full CASP regime from December 2024 — enforcement ramped through 2025 as regulated exchanges delisted non-compliant stablecoins. Circle’s USDC and EURC, which our payment platform Mozart Pay settles in, operate under this regime.',
        ],
      },
      {
        heading: 'How it connects to DORA and payments law',
        paragraphs: [
          'MiCA explicitly pulls CASPs into DORA’s operational-resilience scope, and its interaction with payments regulation is deepening as the digital euro and PSD3 progress — the three regimes are converging into Europe’s new digital payment infrastructure.',
        ],
      },
    ],
    standards: [
      { name: 'Regulation (EU) 2023/1114 (MiCA)' },
      { name: 'Regulation (EU) 2022/2554 (DORA) — resilience rules for CASPs' },
    ],
    relatedTerms: ['dora', 'psd2', 'stellar', 'blockchain', 'lei'],
    relatedLinks: [
      { label: 'DORA for crypto & Web3: what CASPs must do', url: '/insights/dora-crypto-web3-compliance/', type: 'article' },
      { label: 'Building the rails for Europe’s digital payment future', url: '/blog/digital-payments-future/', type: 'blog' },
      { label: 'Blockchain Compliance Checker', url: '/tools/blockchain-compliance-checker/', type: 'tool' },
      { label: 'Mozart Pay', url: '/portfolio/mozart-pay/', type: 'product' },
    ],
  },
  {
    slug: 'psd2',
    term: 'PSD2 (Revised Payment Services Directive)',
    shortName: 'PSD2',
    category: 'payments',
    definition: 'PSD2 — Directive (EU) 2015/2366 — is the EU law that opened bank payment accounts to licensed third parties (open banking), mandated strong customer authentication (SCA) for electronic payments, and created the licensing framework for payment institutions.',
    sections: [
      {
        heading: 'What it introduced',
        paragraphs: [
          'Two regulated open-banking services: AIS (account information — read-only aggregation of balances and transactions) and PIS (payment initiation — triggering a payment from the customer’s account). Banks must expose APIs to licensed third-party providers, which created Europe’s account-to-account payment and open-banking data industries.',
          'SCA — two-factor authentication for most electronic payments — was PSD2’s other big change, reshaping checkout flows and card fraud rates across the EU. The directive also standardized licensing for payment and e-money institutions, the category under which much of European fintech operates.',
        ],
      },
      {
        heading: 'What comes next',
        paragraphs: [
          'The Commission’s PSD3/PSR package is updating the framework — open-finance expansion, stronger IBAN-name verification (verification of payee), and refined SCA exemptions — converging with MiCA and the digital euro into a single European payment architecture.',
        ],
      },
    ],
    standards: [
      { name: 'Directive (EU) 2015/2366 (PSD2)' },
      { name: 'RTS on Strong Customer Authentication (Regulation (EU) 2018/389)' },
    ],
    relatedTerms: ['sepa', 'mica', 'dora', 'iban'],
    relatedLinks: [
      { label: 'Building the rails for Europe’s digital payment future', url: '/blog/digital-payments-future/', type: 'blog' },
      { label: 'SEPA XML Validator', url: '/tools/sepa-xml-validator/', type: 'tool' },
    ],
  },
  // ---------------------------------------------------------------- identity
  {
    slug: 'eidas',
    term: 'eIDAS (Electronic Identification and Trust Services)',
    shortName: 'eIDAS',
    category: 'identity',
    definition: 'eIDAS is the EU regulation on electronic identification and trust services — the legal framework for e-signatures, e-seals, timestamps, and national eID schemes. The 2024 update (eIDAS 2.0, Regulation (EU) 2024/1183) adds the European Digital Identity Wallet.',
    sections: [
      {
        heading: 'What it regulates',
        paragraphs: [
          'The original 2014 regulation (910/2014) created the market for trust services: qualified electronic signatures carry the legal effect of a handwritten signature, and qualified seals, timestamps, website certificates, and registered delivery get cross-border legal recognition through supervised providers (QTSPs). It also obliged member states to recognize each other’s notified national eID schemes.',
          'The 2024 amendment — commonly called eIDAS 2.0 — keeps the trust-services layer and adds the EUDI Wallet: every member state must make a wallet available that lets citizens hold and present identity attributes and qualified attestations (diplomas, licences, certificates) as verifiable credentials, with privacy properties like selective disclosure.',
        ],
      },
      {
        heading: 'Why businesses should care',
        paragraphs: [
          'eIDAS turns digital signatures and identity from nice-to-have integrations into legally recognized instruments — a qualified signature is enforceable like a wet-ink one. The wallet rollout adds a business-facing opportunity and obligation: regulated industries will be expected to accept EUDI Wallet identification, and issuers of attestations (universities, licensing bodies, employers) gain a standard, interoperable credential format.',
        ],
      },
    ],
    standards: [
      { name: 'Regulation (EU) 910/2014 (eIDAS)' },
      { name: 'Regulation (EU) 2024/1183 (eIDAS 2.0)' },
      { name: 'W3C Verifiable Credentials — the underlying credential data model' },
    ],
    relatedTerms: ['eudi-wallet', 'verifiable-credentials', 'did', 'ebsi'],
    relatedLinks: [
      { label: 'eIDAS 2.0 and the EUDI Wallet: what it means for businesses', url: '/insights/eidas2-eudi-wallet/', type: 'article' },
      { label: 'Verifying EBSI verifiable credentials', url: '/blog/ebsi-verifiable-credentials/', type: 'blog' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
    faq: [
      { q: 'What is the difference between eIDAS and eIDAS 2.0?', a: 'eIDAS (2014) created the trust-services framework — qualified signatures, seals, timestamps, and cross-border eID recognition. eIDAS 2.0 (Regulation 2024/1183) keeps that layer and adds the European Digital Identity Wallet, letting citizens hold identity attributes and attestations as verifiable credentials on their phones.' },
      { q: 'Is a qualified electronic signature legally binding?', a: 'Yes — under eIDAS a qualified electronic signature has the equivalent legal effect of a handwritten signature across all member states, and qualified trust services get mutual recognition EU-wide.' },
    ],
  },
  {
    slug: 'eudi-wallet',
    term: 'EUDI Wallet (European Digital Identity Wallet)',
    shortName: 'EUDI Wallet',
    category: 'identity',
    definition: 'The EUDI Wallet is the digital identity wallet every EU member state must make available under eIDAS 2.0 — a smartphone app holding verified identity attributes and qualified attestations as verifiable credentials, presentable to services across the EU.',
    sections: [
      {
        heading: 'What it holds and how it works',
        paragraphs: [
          'At its core the wallet stores a Person Identification Data (PID) credential from the state plus any number of (qualified) electronic attestations of attributes — diplomas, driving licences, professional certificates — issued by public and private attestors. Presentation happens peer-to-peer or online: the verifier requests specific attributes, the holder discloses only those, and cryptographic proofs let the verifier confirm authenticity without calling the issuer.',
          'Selective disclosure is a design requirement, not a feature request: a citizen can prove they are over 18 without revealing their birthdate. Member states must provide wallets on a rollout timeline running through 2026–2027, and large platforms plus regulated sectors will be obliged to accept them for identification.',
        ],
      },
      {
        heading: 'The business opportunity',
        paragraphs: [
          'For businesses the wallet creates a standardized, high-assurance KYC and onboarding channel: instead of document uploads and manual checks, a wallet presentation returns cryptographically verified attributes. Issuers — universities, licensing bodies, employers — gain a standard credential format (the ecosystem builds on W3C verifiable credentials and the EBSI pilot work) that is instantly verifiable EU-wide.',
        ],
      },
    ],
    standards: [
      { name: 'Regulation (EU) 2024/1183 (eIDAS 2.0)' },
      { name: 'W3C Verifiable Credentials Data Model' },
      { name: 'Implementing acts and the Architecture Reference Framework (ARF)' },
    ],
    relatedTerms: ['eidas', 'verifiable-credentials', 'did', 'ebsi'],
    relatedLinks: [
      { label: 'eIDAS 2.0 and the EUDI Wallet: what it means for businesses', url: '/insights/eidas2-eudi-wallet/', type: 'article' },
      { label: 'Verifying EBSI verifiable credentials', url: '/blog/ebsi-verifiable-credentials/', type: 'blog' },
    ],
  },
  {
    slug: 'verifiable-credentials',
    term: 'Verifiable Credentials (VC)',
    shortName: 'Verifiable Credentials',
    category: 'identity',
    definition: 'Verifiable credentials are cryptographically signed digital attestations defined by the W3C VC data model — an issuer signs claims about a holder, and a verifier can check authenticity and integrity without contacting the issuer.',
    sections: [
      {
        heading: 'The issuer–holder–verifier model',
        paragraphs: [
          'A VC is a tamper-evident JSON document: claims about a subject, issuer metadata, and a cryptographic proof. The issuer signs and delivers it to the holder’s wallet; the holder presents it (or a subset of it) to a verifier, who resolves the issuer’s key — typically via a DID — and verifies the signature offline. That decoupling is the point: verification scales without a call-back to the issuer.',
          'Modern deployments add two refinements: selective disclosure (SD-JWT VC, BBS proofs) lets holders reveal only requested attributes, and trust chains anchor issuers to accreditation — in EBSI’s model, from the credential up through trusted accreditation organizations to a root trust anchor, so a verifier can establish that the issuer was authorized to issue this type of credential.',
        ],
      },
      {
        heading: 'Where it is used',
        paragraphs: [
          'VCs are the credential format behind the EUDI Wallet, EBSI’s diploma and identity pilots, and enterprise use cases like employee credentials, supplier certifications, and KYC re-use. Our work on EBSI trust-chain verification and the DID/VC support in Stellar Go CLI are practical examples of the stack in production.',
        ],
      },
    ],
    standards: [
      { name: 'W3C Verifiable Credentials Data Model 1.1 / 2.0' },
      { name: 'W3C Decentralized Identifiers (DID) Core' },
      { name: 'SD-JWT VC — IETF selective-disclosure format' },
    ],
    relatedTerms: ['did', 'eudi-wallet', 'eidas', 'ebsi', 'zero-knowledge-proof'],
    relatedLinks: [
      { label: 'Verifying EBSI verifiable credentials', url: '/blog/ebsi-verifiable-credentials/', type: 'blog' },
      { label: 'eIDAS 2.0 and the EUDI Wallet', url: '/insights/eidas2-eudi-wallet/', type: 'article' },
      { label: 'Stellar Go CLI — DIDs and verifiable credentials', url: '/portfolio/stellar-go-cli/', type: 'product' },
    ],
  },
  {
    slug: 'did',
    term: 'DID (Decentralized Identifier)',
    shortName: 'DID',
    category: 'identity',
    definition: 'A decentralized identifier is a W3C-standard, globally unique identifier controlled by its subject rather than a central registry — resolvable to a DID document containing the public keys and service endpoints needed to verify signatures and interact.',
    sections: [
      {
        heading: 'How DIDs work',
        paragraphs: [
          'A DID looks like did:method:identifier — for example did:web:example.com or did:ion:xyz. The method defines how the identifier is created, resolved, and updated: did:web anchors to a domain’s HTTPS infrastructure, ledger-based methods anchor to a blockchain, and peer DIDs exist only between the parties that exchange them. Resolving a DID returns its DID document — public keys, authentication methods, and endpoints.',
          'In the verifiable-credential stack the DID is the glue: issuers sign VCs with keys advertised in their DID document, so any verifier can fetch the document and check the signature without a shared database or a phone-home to the issuer.',
        ],
      },
      {
        heading: 'Methods you will encounter',
        paragraphs: [
          'Enterprise and EU projects commonly use did:web (simple, domain-anchored) and ledger methods; the Stellar Go CLI implements DID creation and verifiable-credential workflows on Stellar, and EBSI’s trust model resolves issuer DIDs against its registry as part of the trust chain.',
        ],
      },
    ],
    standards: [
      { name: 'W3C Decentralized Identifiers (DID) Core 1.0' },
      { name: 'W3C Verifiable Credentials Data Model' },
    ],
    relatedTerms: ['verifiable-credentials', 'ebsi', 'eudi-wallet', 'blockchain'],
    relatedLinks: [
      { label: 'Verifying EBSI verifiable credentials', url: '/blog/ebsi-verifiable-credentials/', type: 'blog' },
      { label: 'Stellar Go CLI', url: '/portfolio/stellar-go-cli/', type: 'product' },
    ],
  },
  {
    slug: 'ebsi',
    term: 'EBSI (European Blockchain Services Infrastructure)',
    shortName: 'EBSI',
    category: 'identity',
    definition: 'EBSI is the EU’s cross-border blockchain infrastructure — a network of nodes operated by member states delivering public services, best known for its verifiable-credentials trust model used in diploma, identity, and trusted-data pilots.',
    sections: [
      {
        heading: 'What it provides',
        paragraphs: [
          'EBSI is infrastructure, not an app store: a permissioned network of EU-operated blockchain nodes plus registries — the DID registry, trusted-issuer and accreditation registries — that let a verifier establish whether an issuer was authorized to issue a given credential type. The flagship early use case was educational credentials under the EDC (European Digital Credentials) umbrella, alongside trusted data exchange between administrations.',
          'Its verification model is a trust chain: a credential points to its issuer, the issuer to accreditation organizations, and those up to EBSI’s root trust anchor — so a verifier in another member state can confirm authenticity and authority entirely through registry lookups rather than bilateral agreements.',
        ],
      },
      {
        heading: 'Where it is heading',
        paragraphs: [
          'EBSI’s credential model was designed to operate inside the eIDAS legal framework and is converging with the EUDI Wallet ecosystem — the same verifiable-credentials and DID stack under a single European trust architecture. Our work on EBSI trust-chain verification covers how these checks work in practice.',
        ],
      },
    ],
    standards: [
      { name: 'W3C Verifiable Credentials Data Model' },
      { name: 'W3C DID Core' },
      { name: 'Regulation (EU) 2024/1183 (eIDAS 2.0)' },
    ],
    relatedTerms: ['verifiable-credentials', 'did', 'eidas', 'eudi-wallet', 'blockchain'],
    relatedLinks: [
      { label: 'Verifying EBSI verifiable credentials', url: '/blog/ebsi-verifiable-credentials/', type: 'blog' },
      { label: 'How blockchain standards enable enterprises', url: '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers/', type: 'blog' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
  },
  // ---------------------------------------------------------------- blockchain
  {
    slug: 'blockchain',
    term: 'Blockchain / DLT',
    shortName: 'Blockchain',
    category: 'blockchain',
    definition: 'A blockchain is a distributed ledger: an append-only record replicated across nodes, where transactions are batched into cryptographically linked blocks and consensus rules — not a central operator — decide the shared state.',
    sections: [
      {
        heading: 'Public vs permissioned',
        paragraphs: [
          'Public networks (Bitcoin, Ethereum, Stellar) let anyone run a node and validate; consensus is economic (proof-of-work, proof-of-stake, federated voting). Permissioned networks restrict who validates — better suited to consortia and regulated data exchange, which is why infrastructures like EBSI chose that model. The trade-off is decentralization and censorship resistance versus throughput, privacy, and known validators.',
          'Either way, the enterprise value is the same: a shared, tamper-evident state that all parties trust without trusting each other — useful wherever multiple organizations need one version of the truth: payments, credentials, provenance, settlement.',
        ],
      },
      {
        heading: 'Enterprise adoption and standards',
        paragraphs: [
          'Adoption moved from pilots to infrastructure: payment settlement on Stellar, EU-wide credential registries on EBSI, and tokenized assets under MiCA. International standards are catching up — ISO/TC 307 publishes DLT vocabulary and architecture standards, W3C standardized DIDs and verifiable credentials, and ISO 20022 mapping lets DLT systems interoperate with bank rails. Our publications on cross-border payment standardization cover this space.',
        ],
      },
    ],
    standards: [
      { name: 'ISO/TC 307 — blockchain and DLT standards (ISO 22739 vocabulary)' },
      { name: 'W3C DID / VC — identity layer standards' },
    ],
    relatedTerms: ['smart-contract', 'stellar', 'ebsi', 'verifiable-credentials', 'zero-knowledge-proof', 'mica'],
    relatedLinks: [
      { label: 'How blockchain standards enable enterprises to reach global customers', url: '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers/', type: 'blog' },
      { label: 'Blockchain Compliance Checker', url: '/tools/blockchain-compliance-checker/', type: 'tool' },
      { label: 'Publications', url: '/publications/', type: 'service' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
  },
  {
    slug: 'smart-contract',
    term: 'Smart Contract',
    shortName: 'Smart Contract',
    category: 'blockchain',
    definition: 'A smart contract is a program stored on a blockchain that executes deterministically when called — enforcing rules and moving assets without an intermediary, and without the possibility of post-deployment edits.',
    sections: [
      {
        heading: 'How they run',
        paragraphs: [
          'On Ethereum, contracts are compiled to EVM bytecode and called via the contract ABI — a 4-byte function selector plus encoded arguments. On Stellar, the Soroban platform runs WASM contracts designed for efficiency. Either way, execution is deterministic and replicated: every validating node runs the same code on the same inputs and must agree on the result.',
          'Contracts pay for execution — gas on Ethereum, resource fees on Soroban — which prices computation in the network’s native units and discourages abuse.',
        ],
      },
      {
        heading: 'The risk profile',
        paragraphs: [
          'Immutability cuts both ways: a deployed bug cannot be patched in place. Reentrancy, integer errors, access-control mistakes, and upgrade-path surprises have caused the industry’s largest losses — which is why audits, formal checks, and automated compliance scanning before deployment are standard practice for anything holding value.',
        ],
      },
    ],
    standards: [
      { name: 'Ethereum EVM specification / Solidity ABI' },
      { name: 'Stellar Soroban smart contracts platform' },
    ],
    relatedTerms: ['blockchain', 'abi', 'keccak-256', 'stellar', 'mica'],
    relatedLinks: [
      { label: 'Blockchain Compliance Checker', url: '/tools/blockchain-compliance-checker/', type: 'tool' },
      { label: 'Ethereum calldata and ABI guide', url: '/insights/ethereum-calldata-abi-guide/', type: 'article' },
    ],
  },
  {
    slug: 'stellar',
    term: 'Stellar (Network)',
    shortName: 'Stellar',
    category: 'blockchain',
    definition: 'Stellar is an open-source layer-1 blockchain optimized for payments and asset issuance — fast finality, low fees, a built-in decentralized exchange, and an anchor model connecting fiat currencies to on-chain assets.',
    sections: [
      {
        heading: 'How it works',
        paragraphs: [
          'Stellar reaches consensus through the Stellar Consensus Protocol — federated Byzantine agreement where nodes choose which other nodes to trust, giving ~5-second finality without mining. Issued assets represent fiat or other value; anchors are the licensed on/off-ramps connecting bank money to tokens (standardized by SEP-24 for deposits and withdrawals), and trustlines express which assets an account accepts.',
          'Soroban, Stellar’s smart-contracts platform, adds WASM-based contracts for programmable payments and DeFi logic on top of the asset layer.',
        ],
      },
      {
        heading: 'Why we build on it',
        paragraphs: [
          'Stellar’s focus on financial inclusion and low-cost settlement aligns with our payments work: Mozart Pay uses Stellar with Circle USDC/EURC for cross-border payments, EduNode runs on it, and our open-source Stellar Go CLI gives developers wallets, payments, DIDs/verifiable credentials, and ISO 20022 reporting in one toolkit. We are active in the ecosystem — including Meridian, its annual conference, and SDG-impact measurement work using the ISO/DPAS 24874 KPI catalogue.',
        ],
      },
    ],
    standards: [
      { name: 'Stellar Consensus Protocol — federated BFT' },
      { name: 'SEPs — Stellar Ecosystem Proposals (SEP-24, SEP-41, and others)' },
      { name: 'ISO/DPAS 24874 — blockchain DLT use-case KPI catalogue' },
    ],
    relatedTerms: ['blockchain', 'smart-contract', 'mica', 'verifiable-credentials'],
    relatedLinks: [
      { label: 'Mozart Pay', url: '/portfolio/mozart-pay/', type: 'product' },
      { label: 'Stellar Go CLI', url: '/portfolio/stellar-go-cli/', type: 'product' },
      { label: 'Stellar cross-border payments: anchors, SEP-24, USDC/EURC', url: '/insights/stellar-cross-border-payments-anchors-sep24/', type: 'article' },
      { label: 'Measuring SDG impact on Stellar', url: '/insights/iso-24874-stellar-sdg-impact/', type: 'article' },
      { label: 'Meridian 2024 highlights', url: '/blog/meridian-2024-highlights/', type: 'blog' },
    ],
  },
  {
    slug: 'keccak-256',
    term: 'Keccak-256',
    shortName: 'Keccak-256',
    category: 'blockchain',
    definition: 'Keccak-256 is the 256-bit cryptographic hash function Ethereum uses everywhere — transaction hashes, addresses, event topics, and function selectors are all Keccak-256 digests.',
    sections: [
      {
        heading: 'Keccak vs SHA-3',
        paragraphs: [
          'Keccak is the algorithm family that won the SHA-3 competition, but Ethereum standardized on Keccak before NIST finalized the SHA-3 padding change — so Ethereum’s Keccak-256 and the standardized SHA3-256 produce different outputs for the same input. Interoperating tools must know which variant they are computing; a SHA3-256 hash of calldata will not match an Ethereum function selector.',
          'In Ethereum the hash shows up in three places developers touch daily: addresses (last 20 bytes of the public key’s Keccak-256), transaction and block hashes, and function selectors (first 4 bytes of the selector signature’s Keccak-256, e.g. transfer(address,uint256)).',
        ],
      },
      {
        heading: 'Properties',
        paragraphs: [
          'Like all cryptographic hashes it is one-way, deterministic, and collision-resistant — suitable for fingerprints and commitments, not for encryption. Our hash generator computes both the SHA-2 family and Keccak variants side by side, and the dedicated Keccak256 page targets the Ethereum use case directly.',
        ],
      },
    ],
    standards: [
      { name: 'Keccak — pre-standard SHA-3 variant used by Ethereum' },
      { name: 'FIPS 202 — SHA-3 (different padding)' },
    ],
    relatedTerms: ['abi', 'smart-contract', 'wei', 'blockchain'],
    relatedLinks: [
      { label: 'Keccak256 Hash tool', url: '/tools/keccak256-hash/', type: 'tool' },
      { label: 'Hash Generator (SHA-256, Keccak, and more)', url: '/tools/hash-generator/', type: 'tool' },
      { label: 'Ethereum calldata and ABI guide', url: '/insights/ethereum-calldata-abi-guide/', type: 'article' },
    ],
  },
  {
    slug: 'abi',
    term: 'ABI (Application Binary Interface)',
    shortName: 'ABI',
    category: 'blockchain',
    definition: 'The ABI is Ethereum’s contract calling convention: calldata is a 4-byte function selector (the Keccak-256 prefix of the function signature) followed by arguments encoded in 32-byte words — and the JSON ABI is the machine-readable description of that interface.',
    sections: [
      {
        heading: 'Anatomy of calldata',
        paragraphs: [
          'A call to transfer(address,uint256) encodes as: selector 0xa9059cbb + the address left-padded to 32 bytes + the amount as a 32-byte big-endian integer. Static types encode in place; dynamic types (strings, bytes, arrays, structs) use offsets pointing to length-prefixed data later in the payload. Signed integers sign-extend; addresses and bools left-pad.',
          'The JSON ABI is the contract’s interface description — every function and event with its parameter names, types, and mutability — which is what wallets, explorers, and SDKs use to turn a human intent into bytes the EVM understands.',
        ],
      },
      {
        heading: 'Why it matters beyond Ethereum',
        paragraphs: [
          'Understanding the ABI is table stakes for reading calldata, verifying contracts, debugging reverts, and building integrations — and the same pattern (selector + encoded args) appears wherever systems need a compact binary calling convention. Our toolkit encodes and decodes calldata, computes selectors, and validates EIP-55 addresses.',
        ],
      },
    ],
    standards: [
      { name: 'Solidity ABI specification' },
      { name: 'EIP-55 — mixed-case address checksum' },
    ],
    relatedTerms: ['smart-contract', 'keccak-256', 'wei', 'blockchain'],
    relatedLinks: [
      { label: 'ABI Encoder', url: '/tools/abi-encoder/', type: 'tool' },
      { label: 'Function Selector', url: '/tools/function-selector/', type: 'tool' },
      { label: 'Ethereum calldata and ABI guide', url: '/insights/ethereum-calldata-abi-guide/', type: 'article' },
      { label: 'Ethereum Developer Toolkit', url: '/tools/ethereum-toolkit/', type: 'tool' },
    ],
  },
  {
    slug: 'wei',
    term: 'Wei (Ether Denomination)',
    shortName: 'Wei',
    category: 'blockchain',
    definition: 'Wei is the smallest denomination of ether — 1 ETH equals 10^18 wei. Gas prices are quoted in gwei (10^9 wei), and Ethereum tooling works in wei to avoid floating-point error.',
    sections: [
      {
        heading: 'The denomination table',
        paragraphs: [
          'The units you will actually meet: wei (1), gwei (10^9 — gas prices and tips), and ether (10^18). Between them sit legacy names from Ethereum’s early days — kwei, finney (10^15), szabo — which surface in old documentation but rarely in practice.',
          'Everything on-chain counts in wei: balances, transfer amounts, gas price × gas used. Solidity arithmetic is integer-only, so contracts and calldata always express value in wei — which is why a transfer of 0.5 ETH appears as 500000000000000000 in the ABI-encoded arguments.',
        ],
      },
      {
        heading: 'Gas economics',
        paragraphs: [
          'Transaction cost = gas used × gas price, where gas price is quoted in gwei. Since EIP-1559 the price splits into a burned base fee and a priority tip — both still denominated in gwei. Our converter translates between wei, gwei, finney, and ether instantly, and the units explainer walks through worked examples.',
        ],
      },
    ],
    standards: [
      { name: 'Ethereum yellow paper — denominations' },
      { name: 'EIP-1559 — fee market reform' },
    ],
    relatedTerms: ['abi', 'smart-contract', 'keccak-256'],
    relatedLinks: [
      { label: 'Wei Converter', url: '/tools/wei-converter/', type: 'tool' },
      { label: 'Ethereum wei and gwei units explained', url: '/insights/ethereum-wei-gwei-units/', type: 'article' },
      { label: 'Ethereum Developer Toolkit', url: '/tools/ethereum-toolkit/', type: 'tool' },
    ],
  },
  {
    slug: 'zero-knowledge-proof',
    term: 'Zero-Knowledge Proof (ZKP)',
    shortName: 'ZKP',
    category: 'blockchain',
    definition: 'A zero-knowledge proof lets a prover convince a verifier that a statement is true without revealing the underlying data — enabling private transactions, selective disclosure, and off-chain computation verified on-chain.',
    sections: [
      {
        heading: 'How it works conceptually',
        paragraphs: [
          'Every ZKP provides three properties: completeness (true statements verify), soundness (false statements cannot be made to verify), and zero-knowledge (the proof leaks nothing beyond the statement’s truth). Two families dominate: SNARKs — small proofs, fast verification, but most require a trusted setup — and STARKs — larger proofs, no trusted setup, post-quantum assumptions.',
          'Because verification is cheap relative to re-execution, ZKPs unlock a unique pattern: compute off-chain, prove on-chain. That is the basis of zk-rollups (thousands of transactions compressed into one validity proof) and of zkApps on Mina, where contract state transitions are asserted and proven rather than re-executed.',
        ],
      },
      {
        heading: 'Where it meets identity and compliance',
        paragraphs: [
          'ZKPs are the technology behind selective disclosure in verifiable credentials — prove you are over 18 without revealing your birthdate — and are being explored for privacy-preserving compliance: proving reserves, sanctions-screening membership, or license status without exposing the underlying records.',
        ],
      },
    ],
    standards: [
      { name: 'zk-SNARK / zk-STARK proof systems' },
      { name: 'W3C VC — selective disclosure via ZKP-capable formats' },
    ],
    relatedTerms: ['verifiable-credentials', 'blockchain', 'smart-contract', 'eudi-wallet'],
    relatedLinks: [
      { label: 'o1js state assertions: Mina zkApp preconditions', url: '/insights/o1js-state-assertions/', type: 'article' },
      { label: 'Verifying EBSI verifiable credentials', url: '/blog/ebsi-verifiable-credentials/', type: 'blog' },
    ],
  },
  // ---------------------------------------------------------------- health-it
  {
    slug: 'hl7',
    term: 'HL7 v2 (Health Level Seven)',
    shortName: 'HL7 v2',
    category: 'health-it',
    definition: 'HL7 v2 is the pipe-delimited messaging standard that still powers most hospital interoperability — ADT admissions, ORU results, ORM orders exchanged as segments (MSH, PID, PV1, OBR, OBX) between clinical systems.',
    sections: [
      {
        heading: 'Anatomy of a message',
        paragraphs: [
          'An HL7 v2 message is a sequence of \r-separated segments. Each segment starts with a 3-letter type (MSH header, PID patient identification, PV1 visit, OBR order, OBX observation result), then pipe-delimited fields, caret-delimited components, and ampersand subcomponents. The MSH segment declares the delimiters and the message type (e.g., ADT^A01 for an admission, ORU^R01 for a lab result) plus the version in MSH-12.',
          'The standard is deliberately loose: every site implements it through an implementation guide defining which fields and segments are required for their workflow — which is why HL7 integration is famously parse once, tune per site, and why a structural parser that labels fields is more useful than a rigid schema validator.',
        ],
      },
      {
        heading: 'v2 vs FHIR',
        paragraphs: [
          'HL7 v2 remains the workhorse inside hospitals — it is embedded in every LIS, HIS, and interface engine — while FHIR is the modern API-facing standard for new development. Most organizations run both: v2 feeds inside, FHIR at the edges. Our articles on message structure and the v2-vs-FHIR comparison go deeper on migration strategy.',
        ],
      },
    ],
    standards: [
      { name: 'HL7 v2.x messaging standard (versions 2.1–2.9)' },
      { name: 'HL7 FHIR R4/R5 — the modern successor' },
    ],
    relatedTerms: ['fhir', 'json'],
    relatedLinks: [
      { label: 'HL7 v2 Message Parser', url: '/tools/hl7-parser/', type: 'tool' },
      { label: 'HL7 v2 vs FHIR: choosing the right standard', url: '/insights/hl7-v2-vs-fhir-comparison/', type: 'article' },
      { label: 'HL7 v2 message structure: segments and fields decoded', url: '/insights/hl7-v2-message-structure/', type: 'article' },
    ],
    faq: [
      { q: 'Is HL7 v2 being replaced by FHIR?', a: 'Not any time soon. v2 still runs most intra-hospital messaging (ADT, ORU, ORM) and is embedded in every LIS, HIS, and interface engine. New development targets FHIR, but realistic strategies run both: v2 feeds internally, FHIR APIs at the edges.' },
      { q: 'What characters does HL7 v2 use as delimiters?', a: 'By default: | separates fields, ^ components, & subcomponents, ~ repeats, and \\ escapes. The MSH segment declares the actual delimiters a message uses in MSH-1 and MSH-2, and segments are separated by carriage returns.' },
    ],
  },
  {
    slug: 'fhir',
    term: 'FHIR (Fast Healthcare Interoperability Resources)',
    shortName: 'FHIR',
    category: 'health-it',
    definition: 'FHIR is HL7’s modern healthcare interoperability standard: clinical data is modeled as resources (Patient, Observation, Encounter, MedicationRequest…) exchanged as JSON or XML over REST APIs — the format behind national patient-access APIs and SMART health apps.',
    sections: [
      {
        heading: 'Resources and REST',
        paragraphs: [
          'FHIR models healthcare as composable resources with predictable URLs — /Patient/123, /Observation?patient=123&code=8480-6. Resources serialize as JSON or XML, conform to profiles that constrain fields for specific use cases (US Core, EU Laboratory Report, national base profiles), and are validated against the FHIR specification’s schemas.',
          'FHIR R4 is the first normative release and the version most deployments and regulations target (US ONC rules require it for patient-access APIs); R4B and R5 refine the model. Bundles wrap resource collections for documents and messages, and SMART on FHIR defines the OAuth-based app-launch framework.',
        ],
      },
      {
        heading: 'Working with FHIR',
        paragraphs: [
          'For developers the practical surface is JSON resources: required fields (like a resource’s resourceType), coded elements with system+code pairs, and reference links between resources. Our viewer validates structure and flattens field paths for inspection — useful when debugging why a payer or national API rejected a resource.',
        ],
      },
    ],
    standards: [
      { name: 'HL7 FHIR R4 / R4B / R5', url: 'https://hl7.org/fhir/' },
      { name: 'US Core / national base profiles; SMART on FHIR' },
    ],
    relatedTerms: ['hl7', 'json'],
    relatedLinks: [
      { label: 'FHIR Resource Viewer & Validator', url: '/tools/fhir-validator/', type: 'tool' },
      { label: 'HL7 v2 vs FHIR: choosing the right standard', url: '/insights/hl7-v2-vs-fhir-comparison/', type: 'article' },
    ],
    faq: [
      { q: 'Which FHIR version should I use?', a: 'R4 is the safe default — it is the first normative release, the version US ONC rules require for patient-access APIs, and what most profiles and national implementations target. R4B/R5 refine the model but adoption is still catching up.' },
    ],
  },
  // ---------------------------------------------------------------- quality
  {
    slug: 'iso-9001',
    term: 'ISO 9001',
    shortName: 'ISO 9001',
    category: 'quality',
    definition: 'ISO 9001 is the international standard for quality management systems (QMS) — the requirements for consistently delivering products and services that meet customer and regulatory requirements, with certification through accredited bodies.',
    sections: [
      {
        heading: 'What it covers',
        paragraphs: [
          'ISO 9001:2015 uses the same clauses 4–10 structure as ISO 27001: organizational context, leadership, planning, support, operation (the product/service delivery processes), performance evaluation, and improvement. Underneath sit seven quality-management principles — customer focus, leadership, engagement of people, process approach, improvement, evidence-based decisions, relationship management.',
          'Certification follows the same Stage 1/Stage 2 audit pattern as other ISO management standards: Stage 1 reviews documentation and readiness, Stage 2 verifies the system actually operates. Organizations implementing it typically start with a process map and a gap analysis against the clauses.',
        ],
      },
      {
        heading: 'Why it pairs with other standards',
        paragraphs: [
          'Because ISO 9001, ISO 27001, and ISO 42001 share the Annex SL skeleton, their management-system machinery — document control, internal audit, management review, corrective action — can be implemented once and shared. That is the basis of an integrated management system, which our insights article covers in detail.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 9001:2015 — Quality management systems — Requirements' },
      { name: 'ISO 9000:2015 — fundamentals and vocabulary' },
    ],
    relatedTerms: ['qms', 'pdca', 'integrated-management-system', 'iso-27001', 'gap-analysis'],
    relatedLinks: [
      { label: 'ISO 9001 Readiness Checker', url: '/tools/iso-9001-readiness-checker/', type: 'tool' },
      { label: 'ISO 9001 implementation guide', url: '/insights/iso-9001-implementation-guide/', type: 'article' },
      { label: 'Integrated management system: ISO 9001 + 27001 + 42001', url: '/insights/integrated-management-system-iso-9001-27001-42001/', type: 'article' },
    ],
    faq: [
      { q: 'Is ISO 9001 only for manufacturers?', a: 'No — it is written for any organization delivering products or services. Software companies, consultancies, and service providers certify regularly; the operation clause simply applies to how you deliver your service, whatever it is.' },
      { q: 'How long does ISO 9001 implementation take?', a: 'Organizations with documented processes already in place typically certify in 6–12 months. Starting from scratch, expect 9–18 months — most of it spent establishing the process approach and generating records, not writing the quality manual.' },
    ],
  },
  {
    slug: 'qms',
    term: 'QMS (Quality Management System)',
    shortName: 'QMS',
    category: 'quality',
    definition: 'A quality management system is the framework of policies, processes, and responsibilities an organization runs to consistently meet customer and regulatory requirements — ISO 9001 is the standard that defines what a conforming QMS requires.',
    sections: [
      {
        heading: 'What is inside one',
        paragraphs: [
          'A working QMS covers: process documentation (how work gets done), quality objectives with owners, competence and training records, control of documented information, nonconformity and corrective-action handling, supplier evaluation, and the management-review loop that keeps leadership accountable for the system’s performance.',
          'The unifying idea is the process approach: describe the organization as interacting processes with inputs, outputs, and metrics, rather than as departments. That is what makes quality improvable — you improve a process, not a poster on the wall.',
        ],
      },
      {
        heading: 'QMS, ISMS, AIMS — same skeleton',
        paragraphs: [
          'A QMS is to quality what an ISMS is to security and an AIMS is to AI. All three share the management-system structure (context, leadership, planning, operation, evaluation, improvement), which is why mature organizations integrate them instead of running parallel bureaucracies.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 9001:2015 — QMS requirements' },
      { name: 'ISO 9000:2015 — fundamentals and vocabulary' },
    ],
    relatedTerms: ['iso-9001', 'pdca', 'integrated-management-system', 'isms', 'aims'],
    relatedLinks: [
      { label: 'ISO 9001 implementation guide', url: '/insights/iso-9001-implementation-guide/', type: 'article' },
      { label: 'ISO 9001 Readiness Checker', url: '/tools/iso-9001-readiness-checker/', type: 'tool' },
    ],
  },
  {
    slug: 'integrated-management-system',
    term: 'IMS (Integrated Management System)',
    shortName: 'IMS',
    category: 'quality',
    definition: 'An integrated management system combines two or more management standards — typically ISO 9001, ISO 27001, and ISO 42001 — into one system that shares policies, audits, document control, and management reviews instead of running parallel structures.',
    sections: [
      {
        heading: 'Why integration works',
        paragraphs: [
          'All modern ISO management standards share the Annex SL high-level structure: identical clause numbering, shared concepts like context, interested parties, objectives, document control, internal audit, and management review. Roughly 60–70% of the clauses can be satisfied by one common process — the remaining part is the discipline-specific layer (risk assessment methodology, control annexes, operational requirements).',
          'The benefits compound: one audit cycle instead of three, one document-control system, one management review covering all disciplines, and a single policy hierarchy — which cuts cost and, more importantly, keeps the systems consistent with each other.',
        ],
      },
      {
        heading: 'How to build one',
        paragraphs: [
          'Start with the most mature existing system as the skeleton, map the other standards’ discipline-specific requirements onto it, and run a gap analysis per standard to catch what the shared layer misses. Our detailed article walks through combining ISO 9001, 27001, and 42001 into a single IMS.',
        ],
      },
    ],
    standards: [
      { name: 'Annex SL — the common management-system structure' },
      { name: 'ISO 9001:2015 / ISO/IEC 27001:2022 / ISO/IEC 42001:2023' },
    ],
    relatedTerms: ['iso-9001', 'iso-27001', 'iso-42001', 'qms', 'isms', 'aims'],
    relatedLinks: [
      { label: 'Building one integrated management system', url: '/insights/integrated-management-system-iso-9001-27001-42001/', type: 'article' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
  },
  {
    slug: 'pdca',
    term: 'PDCA (Plan-Do-Check-Act)',
    shortName: 'PDCA',
    category: 'quality',
    definition: 'PDCA — Plan, Do, Check, Act — is the continuous-improvement cycle behind every ISO management system: plan objectives and controls, implement them, monitor and audit the results, then act on findings and repeat.',
    sections: [
      {
        heading: 'How it maps to the ISO clauses',
        paragraphs: [
          'In the Annex SL structure, clauses 4–6 are Plan (context, leadership, planning — including risk assessment), clauses 7–8 are Do (support and operation), clause 9 is Check (performance evaluation: monitoring, internal audit, management review), and clause 10 is Act (improvement: nonconformity and corrective action). One lap around the wheel is roughly one year of management-system operation.',
          'The cycle is what separates a management system from a documentation exercise: auditors look for evidence the loop actually turns — metrics reviewed, audits held, corrective actions closed — not just that procedures exist.',
        ],
      },
      {
        heading: 'Origin',
        paragraphs: [
          'PDCA descends from the Deming (Shewhart) cycle of statistical quality control. It applies equally to a QMS improving defect rates, an ISMS hardening controls after incidents, or an AIMS updating AI risk treatments as models drift — which is why integrated management systems share one improvement loop.',
        ],
      },
    ],
    standards: [
      { name: 'Annex SL high-level structure — clauses 4–10' },
      { name: 'ISO 9001:2015 — quality management principles' },
    ],
    relatedTerms: ['qms', 'iso-9001', 'isms', 'integrated-management-system'],
    relatedLinks: [
      { label: 'ISO 9001 implementation guide', url: '/insights/iso-9001-implementation-guide/', type: 'article' },
      { label: 'Integrated management system', url: '/insights/integrated-management-system-iso-9001-27001-42001/', type: 'article' },
    ],
  },
  // ---------------------------------------------------------------- data-formats
  {
    slug: 'iso-8601',
    term: 'ISO 8601 (Date and Time Format)',
    shortName: 'ISO 8601',
    category: 'data-formats',
    definition: 'ISO 8601 is the international standard for representing dates and times unambiguously — YYYY-MM-DD, the T separator, time-zone offsets, durations like P1Y2M, week dates, and intervals. RFC 3339 is the strict internet subset used in APIs.',
    sections: [
      {
        heading: 'The formats you will meet',
        paragraphs: [
          'Basic date: 2026-10-22 (year-month-day — the ordering that sorts correctly as text). Date-time: 2026-10-22T14:30:00+02:00 or with Z for UTC. Durations use P: P1Y2M3DT4H (one year, two months, three days, four hours). Week dates (2026-W43-4) and intervals (start/end or start/duration) round out the standard.',
          'RFC 3339 narrows the standard for internet protocols: it requires the full year-month-day, the T separator, and an explicit offset — no durations, no week dates, no reduced precision. When an API spec says ISO 8601, it almost always means RFC 3339.',
        ],
      },
      {
        heading: 'Why format discipline matters',
        paragraphs: [
          'Ambiguous dates corrupt data silently: 03/04/2026 means April 3 in the US and March 4 in Europe. ISO 8601 removes the ambiguity, sorts lexicographically, and survives round-trips through CSVs, databases, and message formats — which is why payment files, FHIR resources, and log pipelines all standardize on it.',
        ],
      },
    ],
    standards: [
      { name: 'ISO 8601-1:2019 — date and time representations' },
      { name: 'RFC 3339 — the internet-profile subset' },
    ],
    relatedTerms: ['xml', 'json', 'csv'],
    relatedLinks: [
      { label: 'ISO 8601 Date Validator', url: '/tools/iso-8601-validator/', type: 'tool' },
      { label: 'ISO 8601 format guide: durations, week dates, RFC 3339', url: '/insights/iso-8601-format-guide/', type: 'article' },
    ],
  },
  {
    slug: 'xml',
    term: 'XML (Extensible Markup Language)',
    shortName: 'XML',
    category: 'data-formats',
    definition: 'XML is the W3C markup language for structured documents — elements, attributes, namespaces — that underpins standards from ISO 20022 payment files and SCORM manifests to SOAP services, XSD schemas, and sitemaps.',
    sections: [
      {
        heading: 'The rules that matter',
        paragraphs: [
          'Well-formedness is strict: every element closes, attributes are quoted, exactly one root, tags nest properly, and the language is case-sensitive. Namespaces disambiguate vocabularies — xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03" both identifies the message type and tells a validator which schema version applies. An XML declaration can state encoding; UTF-8 is the modern default.',
          'Schema validation layers on top: XSD defines which elements and attributes may appear, their order, cardinality, and datatypes — the mechanism banks use to reject malformed pain.001 files before processing.',
        ],
      },
      {
        heading: 'Where it still dominates',
        paragraphs: [
          'JSON won the web-API war, but XML remains the language of regulated interchange: ISO 20022 financial messages, e-invoicing, SCORM package manifests, SAML assertions, SOAP enterprise services, and sitemaps are all XML. That is why we maintain a full XML toolkit — formatter, validator, XSD validation, XPath testing, and conversion to JSON and CSV.',
        ],
      },
    ],
    standards: [
      { name: 'XML 1.0/1.1 — W3C recommendation' },
      { name: 'XML Schema (XSD) — W3C' },
      { name: 'XPath — W3C query language' },
    ],
    relatedTerms: ['xsd', 'xpath', 'json', 'iso-20022', 'csv'],
    relatedLinks: [
      { label: 'XML Tools', url: '/tools/xml-tools/', type: 'tool' },
      { label: 'XML Formatter', url: '/tools/xml-formatter/', type: 'tool' },
      { label: 'XML Validator', url: '/tools/xml-validator/', type: 'tool' },
      { label: 'XML to JSON Converter', url: '/tools/xml-to-json/', type: 'tool' },
    ],
  },
  {
    slug: 'xsd',
    term: 'XSD (XML Schema Definition)',
    shortName: 'XSD',
    category: 'data-formats',
    definition: 'XSD is the W3C schema language that defines what a valid XML document looks like — allowed elements and attributes, order, cardinality, and datatypes — the mechanism used to validate ISO 20022 payment files and other regulated XML.',
    sections: [
      {
        heading: 'What a schema specifies',
        paragraphs: [
          'A schema declares elements (xs:element) with types, order constraints (xs:sequence, xs:choice, xs:all), occurrence ranges (minOccurs/maxOccurs), and datatypes — built-ins like xs:string, xs:decimal, xs:date plus derived types restricted by facets (patterns, enumerations, length, ranges). Complex types nest; attributes are declared on the containing type.',
          'Validation is two-level: well-formedness first (the XML parses at all), then schema conformance (the right elements in the right order with legal values). Banks reject pain.001 files at exactly this layer — a misplaced tag or an out-of-range amount is a schema violation, not a business error.',
        ],
      },
      {
        heading: 'Using it in practice',
        paragraphs: [
          'A document declares its schema via the namespace (and optionally xsi:schemaLocation). Validators resolve the schema and report violations with line/column positions. Our XSD validator checks documents against ISO 20022 message schemas and custom schemas entirely in the browser.',
        ],
      },
    ],
    standards: [
      { name: 'XML Schema Part 1 (structures) and Part 2 (datatypes) — W3C' },
      { name: 'ISO 20022 — published message schemas' },
    ],
    relatedTerms: ['xml', 'xpath', 'iso-20022'],
    relatedLinks: [
      { label: 'XSD Schema Validator', url: '/tools/xsd-validator/', type: 'tool' },
      { label: 'SEPA XML Validator', url: '/tools/sepa-xml-validator/', type: 'tool' },
      { label: 'XML Tools', url: '/tools/xml-tools/', type: 'tool' },
    ],
  },
  {
    slug: 'xpath',
    term: 'XPath',
    shortName: 'XPath',
    category: 'data-formats',
    definition: 'XPath is the W3C query language for addressing parts of an XML document — paths like /Document/CstmrCdtTrfInitn/PmtInf, predicates, and functions used in testing, extraction, transformation, and validation.',
    sections: [
      {
        heading: 'Reading an expression',
        paragraphs: [
          'An XPath is a location path: absolute from the root (/a/b/c) or relative (//a finds a anywhere). Predicates filter — //Entry[Amt > 1000] picks entries over a thousand; position predicates like [1] and last() select by order. The @ axis selects attributes, and functions (count, contains, sum, normalize-space) compute over node sets.',
          'Namespace handling trips everyone up: ISO 20022 messages live in a default namespace, so elements must be addressed with a bound prefix or namespace-agnostic matching — which is why a live tester that shows matches instantly beats guessing.',
        ],
      },
      {
        heading: 'Where it is used',
        paragraphs: [
          'XPath is embedded in XSLT transformations, Schematron business-rule checks, test assertions on XML payloads, and ad-hoc data extraction from payment files and manifests. Our tester evaluates XPath 1.0 expressions against any pasted XML live.',
        ],
      },
    ],
    standards: [
      { name: 'XPath 1.0 — W3C recommendation' },
      { name: 'XSLT / Schematron — the languages XPath plugs into' },
    ],
    relatedTerms: ['xml', 'xsd', 'iso-20022'],
    relatedLinks: [
      { label: 'XPath Tester', url: '/tools/xpath-tester/', type: 'tool' },
      { label: 'XML Tools', url: '/tools/xml-tools/', type: 'tool' },
    ],
  },
  {
    slug: 'json',
    term: 'JSON (JavaScript Object Notation)',
    shortName: 'JSON',
    category: 'data-formats',
    definition: 'JSON is the dominant data-interchange format for web APIs — objects, arrays, strings, numbers, booleans, null — standardized by RFC 8259 and ECMA-404, and the serialization behind REST APIs, FHIR resources, and most modern configuration.',
    sections: [
      {
        heading: 'Why it won',
        paragraphs: [
          'JSON maps directly onto the data structures of mainstream languages — parse it and you get dictionaries, lists, and scalars, no impedance mismatch. Compared to XML it is dramatically terser: no closing tags, no namespace machinery, no attribute/element ambiguity. The trade-off is a smaller toolbox — no built-in validation language (JSON Schema fills the gap) and no comments in the strict grammar.',
          'RFC 8259 defines the interoperable subset; ECMA-404 is the twin standard. Numbers have arbitrary precision in the spec, but real-world parsers inherit IEEE-754 limits — a classic interoperability trap with 64-bit integers.',
        ],
      },
      {
        heading: 'Where you meet it',
        paragraphs: [
          'Every REST API response, FHIR resources, AWS IAM policies, CCSDS OMM satellite data, package manifests, and most config files. Our toolkit converts XML↔JSON bidirectionally, and the TLE converter emits OMM/GP JSON for satellite catalogs.',
        ],
      },
    ],
    standards: [
      { name: 'RFC 8259 — The JSON Data Interchange Format' },
      { name: 'ECMA-404 — JSON specification' },
      { name: 'JSON Schema — validation vocabulary' },
    ],
    relatedTerms: ['xml', 'csv', 'fhir', 'odata'],
    relatedLinks: [
      { label: 'XML to JSON Converter', url: '/tools/xml-to-json/', type: 'tool' },
      { label: 'TLE to JSON/CSV Converter', url: '/tools/tle-converter/', type: 'tool' },
    ],
  },
  {
    slug: 'csv',
    term: 'CSV (Comma-Separated Values)',
    shortName: 'CSV',
    category: 'data-formats',
    definition: 'CSV is the lowest-common-denominator tabular format — one record per line, fields separated by commas — defined loosely by RFC 4180 and still the default exchange format for CRM imports, bank exports, and bulk operations.',
    sections: [
      {
        heading: 'The gotchas that bite',
        paragraphs: [
          'The format is deceptively underspecified: fields containing commas, quotes, or newlines must be quoted; embedded quotes double up (""); delimiters vary by locale (semicolons in much of Europe); and encoding is unspecified — Excel expects a UTF-8 BOM or it mangles non-ASCII names. Headers are conventional, not guaranteed.',
          'Dedupe and validation are the other practical problems: real-world exports contain duplicate rows, inconsistent casing, and stray whitespace. Cleaning before import — dedupe on key columns, E.164-normalized phones, validated emails — is what separates a working CRM import from a data-quality incident.',
        ],
      },
      {
        heading: 'In the payment and CRM pipeline',
        paragraphs: [
          'CSV sits at both ends of our tooling: payment CSVs feed the SEPA XML generator, MT940 statements convert to CSV for spreadsheet analysis, and the deduplicator plus email validator prepare clean files for CRM import.',
        ],
      },
    ],
    standards: [
      { name: 'RFC 4180 — Common Format and MIME Type for CSV Files' },
    ],
    relatedTerms: ['json', 'xml', 'crm', 'vcard'],
    relatedLinks: [
      { label: 'CSV Deduplicator', url: '/tools/csv-deduplicator/', type: 'tool' },
      { label: 'SEPA XML Generator (CSV in, pain.001/pain.008 out)', url: '/tools/sepa-xml-generator/', type: 'tool' },
      { label: 'MT940 to CSV converter', url: '/tools/mt940-to-csv/', type: 'tool' },
      { label: 'Email List Validator', url: '/tools/email-validator/', type: 'tool' },
    ],
  },
  {
    slug: 'vcard',
    term: 'vCard (.vcf)',
    shortName: 'vCard',
    category: 'data-formats',
    definition: 'vCard is the standard electronic business-card format — .vcf files with properties like FN, TEL, EMAIL, and ORG — defined by RFC 6350 and understood by every phone, mail client, and CRM.',
    sections: [
      {
        heading: 'Structure and versions',
        paragraphs: [
          'A vCard is a BEGIN:VCARD…END:VCARD block of properties: VERSION, FN (formatted name), N (structured name), TEL with type params, EMAIL, ORG, TITLE, ADR, URL, and more. Lines longer than 75 octets are folded — a continuation line starts with a space — which is the subtlety most hand-rolled parsers miss.',
          'Version 3.0 is the interoperable sweet spot (iPhone, Android, Outlook, Google Contacts all import it); 4.0 modernizes the property model and drops some legacy quirks; 2.1 survives mostly in old mobile exports. Choose 3.0 unless a specific target demands otherwise.',
        ],
      },
      {
        heading: 'Practical use',
        paragraphs: [
          'vCards travel in QR codes, email signatures, contact-sharing, and CRM onboarding — anywhere a contact needs to move between systems without retyping. Our generator builds standards-conformant .vcf files live, and the parser inspects any pasted card’s properties.',
        ],
      },
    ],
    standards: [
      { name: 'RFC 6350 — vCard Format Specification (version 4.0)' },
      { name: 'RFC 2426 — vCard 3.0 profile' },
    ],
    relatedTerms: ['e164', 'csv', 'crm'],
    relatedLinks: [
      { label: 'vCard Generator & Parser', url: '/tools/vcard-generator/', type: 'tool' },
      { label: 'Phone Number Formatter', url: '/tools/phone-formatter/', type: 'tool' },
    ],
  },
  {
    slug: 'gtin',
    term: 'GTIN (Global Trade Item Number)',
    shortName: 'GTIN',
    category: 'data-formats',
    definition: 'GTIN is the GS1 identifier for trade items — the number under every retail barcode. It comes in 8, 12, 13, and 14-digit variants (EAN-8, UPC-A, EAN-13, GTIN-14) and ends with a mod-10 check digit.',
    sections: [
      {
        heading: 'Anatomy',
        paragraphs: [
          'A GTIN encodes a GS1 prefix (identifying the issuing country organization), a company prefix, an item reference, and a check digit computed by alternating ×3/×1 weights from the rightmost data digit. The 14-digit GTIN-14 is the superset — shorter variants are just zero-padded into it, which is why UPC↔GTIN and EAN↔GTIN conversion is trivial.',
          'ISBN is a special case: ISBN-13 is an EAN with a Bookland prefix (978/979), so book validation is GTIN validation plus a prefix check.',
        ],
      },
      {
        heading: 'What the check digit proves — and does not',
        paragraphs: [
          'The mod-10 digit catches single-digit typos and most adjacent transpositions — the classic hand-entry errors. It does not prove the number is registered or that the brand owns it: marketplaces like Amazon cross-check the GS1 registry and brand ownership, so a checksum-valid but unregistered code still gets rejected.',
        ],
      },
    ],
    standards: [
      { name: 'GS1 General Specifications' },
      { name: 'ISO/IEC 15420 — EAN/UPC barcode specification' },
    ],
    relatedTerms: [],
    relatedLinks: [
      { label: 'GTIN / UPC / EAN Validator', url: '/tools/gtin-validator/', type: 'tool' },
    ],
  },
  {
    slug: 'e164',
    term: 'E.164 (International Phone Number Format)',
    shortName: 'E.164',
    category: 'data-formats',
    definition: 'E.164 is the ITU-T international numbering plan — the +country-code format (max 15 digits) behind tel: links, SMS routing, and every CRM that wants its phone fields to actually work.',
    sections: [
      {
        heading: 'The format',
        paragraphs: [
          'An E.164 number is + followed by a 1–3 digit country code and the national significant number, maximum 15 digits total: +431234567890. It deliberately drops everything else — no trunk prefixes (the domestic 0), no spaces or punctuation, no extension (extensions are a separate convention). RFC 3966 wraps it in a tel: URI for clickable dialing.',
          'National formats diverge wildly — trunk prefixes, mobile vs landline patterns, variable lengths — which is why formatting is non-trivial: you need per-country numbering-plan data (the libphonenumber approach) rather than regexes.',
        ],
      },
      {
        heading: 'Why CRMs insist on it',
        paragraphs: [
          'Mixed-format phone fields break dedup, click-to-call, and SMS campaigns. Normalizing to E.164 at import — which our formatter does in bulk for 240+ countries — makes phone a usable key instead of a text field, and it is what vCard and API payloads expect.',
        ],
      },
    ],
    standards: [
      { name: 'ITU-T E.164 — international public telecommunication numbering plan' },
      { name: 'RFC 3966 — tel: URIs' },
    ],
    relatedTerms: ['vcard', 'csv', 'crm'],
    relatedLinks: [
      { label: 'Phone Number Formatter', url: '/tools/phone-formatter/', type: 'tool' },
      { label: 'vCard Generator', url: '/tools/vcard-generator/', type: 'tool' },
    ],
  },
  {
    slug: 'tle',
    term: 'TLE (Two-Line Element Set)',
    shortName: 'TLE',
    category: 'data-formats',
    definition: 'A TLE is the NORAD two-line format for satellite orbital elements — 69-character lines encoding catalog number, epoch, inclination, RAAN, eccentricity, and mean motion — still the standard way satellite tracking data circulates.',
    sections: [
      {
        heading: 'Decoding the two lines',
        paragraphs: [
          'Line 1 carries the catalog number, classification, international designator, epoch (year + day-of-year), and ballistic terms. Line 2 carries the orbital elements proper: inclination, right ascension of the ascending node, eccentricity (decimal point implied), argument of perigee, mean anomaly, and mean motion in revs/day — everything an SGP4 propagator needs to predict position. A mod-10 checksum ends each line.',
          'From mean motion you derive the orbital period, and with eccentricity you get apogee and perigee — enough to classify an orbit as LEO, MEO, GEO, or highly elliptical at a glance.',
        ],
      },
      {
        heading: 'The modern counterpart',
        paragraphs: [
          'CCSDS standardized the same data as XML/JSON Orbit Mean-Elements Messages (OMM/GP format) — self-describing fields instead of positional columns. Our converter bridges both directions: TLE/3LE files to OMM/GP JSON or CSV, batch-converting entire catalogs with checksum validation.',
        ],
      },
    ],
    standards: [
      { name: 'NORAD Two-Line Element set format' },
      { name: 'CCSDS 502.0-B-2 — OMM/GP (Orbit Data Messages)' },
    ],
    relatedTerms: ['iso-8601', 'json', 'csv'],
    relatedLinks: [
      { label: 'TLE Parser', url: '/tools/tle-parser/', type: 'tool' },
      { label: 'TLE to JSON/CSV Converter', url: '/tools/tle-converter/', type: 'tool' },
    ],
  },
  // ---------------------------------------------------------------- enterprise-it
  {
    slug: 'iam',
    term: 'IAM (Identity and Access Management)',
    shortName: 'IAM',
    category: 'enterprise-it',
    definition: 'IAM is the discipline of managing digital identities and what they may access — authentication (who you are), authorization (what you may do), and the policies binding them. In AWS it is the JSON policy language controlling every API call.',
    sections: [
      {
        heading: 'The AWS flavor',
        paragraphs: [
          'AWS IAM policies are JSON documents: statements with Effect (Allow/Deny), Action, Resource (ARNs), and optional Condition. Principals attach to users, roles, or services. Deny always wins, and permission comes only from an explicit Allow — implicit deny is the default.',
          'The patterns that cause breaches are well known and checkable: wildcard actions (s3:*), wildcard resources, iam:PassRole to powerful roles, privilege-escalation chains (iam:PutRolePolicy, lambda:CreateFunction + PassRole, and friends), NotAction traps, and public principals. Our validator flags all of these, and the two IAM articles catalog the escalation patterns in detail.',
        ],
      },
      {
        heading: 'IAM as architecture',
        paragraphs: [
          'Good IAM is least privilege made concrete: scoped-down policies, short-lived roles over long-lived keys, conditions on source and principal. It is the operational core of a Zero Trust architecture and the layer where most cloud security actually happens.',
        ],
      },
    ],
    standards: [
      { name: 'AWS IAM policy language (JSON)' },
      { name: 'NIST SP 800-207 — Zero Trust context' },
    ],
    relatedTerms: ['arn', 'zero-trust', 'iso-27001'],
    relatedLinks: [
      { label: 'IAM Policy Validator', url: '/tools/iam-policy-validator/', type: 'tool' },
      { label: 'IAM Policy Security: 7 privilege escalation patterns', url: '/insights/iam-policy-security-patterns/', type: 'article' },
      { label: 'AWS IAM Policy Validation: checks before deploy', url: '/insights/aws-iam-policy-validation/', type: 'article' },
      { label: 'AWS ARN Parser', url: '/tools/aws-arn-parser/', type: 'tool' },
    ],
  },
  {
    slug: 'arn',
    term: 'ARN (Amazon Resource Name)',
    shortName: 'ARN',
    category: 'enterprise-it',
    definition: 'An ARN is AWS’s standardized resource identifier — arn:partition:service:region:account-id:resource — the address used in IAM policies, logging, tagging, and infrastructure-as-code to point at exactly one resource.',
    sections: [
      {
        heading: 'Anatomy',
        paragraphs: [
          'The colon-separated parts: partition (aws, aws-cn, aws-us-gov), service (s3, iam, lambda…), region (empty for global services like IAM and S3 bucket names), account-id (empty for resources like S3 buckets and some Layer-1 constructs), and resource — whose shape varies per service: resource-id, resource-type/resource-id, or resource-type:sub-resource.',
          'ARNs support wildcards — arn:aws:s3:::my-bucket/* — which is precisely what makes them dangerous in IAM policies: a wildcarded resource ARN combined with a wildcarded action is the classic over-permission pattern.',
        ],
      },
      {
        heading: 'Working with them',
        paragraphs: [
          'You parse ARNs to extract account IDs and resource types, build them when writing policies or IaC, and validate them before they land in a JSON policy. Our parser breaks an ARN into components and builds valid ARNs from fields; the IAM validator checks the policies that use them.',
        ],
      },
    ],
    standards: [
      { name: 'AWS ARN specification' },
      { name: 'AWS IAM policy language' },
    ],
    relatedTerms: ['iam', 'zero-trust'],
    relatedLinks: [
      { label: 'AWS ARN Parser', url: '/tools/aws-arn-parser/', type: 'tool' },
      { label: 'IAM Policy Validator', url: '/tools/iam-policy-validator/', type: 'tool' },
      { label: 'AWS IAM Policy Validation', url: '/insights/aws-iam-policy-validation/', type: 'article' },
    ],
  },
  {
    slug: 'odata',
    term: 'OData (Open Data Protocol)',
    shortName: 'OData',
    category: 'enterprise-it',
    definition: 'OData is the OASIS-standard REST protocol for queryable data APIs — URL conventions like $select, $filter, $expand, $orderby, $top, $skip that let clients shape responses server-side. SAP Gateway uses it across the enterprise landscape.',
    sections: [
      {
        heading: 'The query options',
        paragraphs: [
          'OData turns a REST resource into a queryable collection: $filter=Price gt 100 narrows rows, $select picks fields, $expand pulls related entities inline, $orderby sorts, and $top/$skip paginate. The server answers with JSON (V4) or JSON/XML (V2) plus an entity model described by the service’s $metadata document.',
          'Version differences matter in the field: SAP’s installed base largely runs OData V2, where some operators differ (substringof instead of contains) and payload defaults lean XML — one of the reasons a builder that emits the right syntax for your version saves real debugging time.',
        ],
      },
      {
        heading: 'Why SAP shops care',
        paragraphs: [
          'SAP Gateway exposes business objects — orders, materials, business partners — as OData services, making the protocol the de-facto integration language of the SAP estate. Our URL builder constructs queries interactively, and the two articles cover the query options and 40+ copy-paste $filter examples.',
        ],
      },
    ],
    standards: [
      { name: 'OASIS OData V4 — also ISO/IEC 20802' },
      { name: 'OData V2 — SAP Gateway prevalent version' },
    ],
    relatedTerms: ['json', 'xml'],
    relatedLinks: [
      { label: 'SAP OData URL Builder', url: '/tools/sap-odata-url-builder/', type: 'tool' },
      { label: 'OData query options guide', url: '/insights/odata-query-options-guide/', type: 'article' },
      { label: 'OData $filter examples', url: '/insights/odata-filter-examples/', type: 'article' },
    ],
  },
  {
    slug: 'crm',
    term: 'CRM (Customer Relationship Management)',
    shortName: 'CRM',
    category: 'enterprise-it',
    definition: 'CRM is the system of record for customer relationships — contacts, companies, deals/opportunities, activities, and increasingly support tickets in one place — the operational layer between marketing, sales, and service.',
    sections: [
      {
        heading: 'What a CRM actually tracks',
        paragraphs: [
          'The object model is near-universal: contacts belong to companies, opportunities track deals through pipeline stages, and activities (calls, emails, meetings) attach to all of them. Modern CRMs fold ticketing in — our OG CRM & Ticketing puts support tickets on the same customer record as deals, so the whole relationship is visible in one place.',
          'The hard part is never the schema — it is data quality: deduped imports, normalized phones (E.164), validated emails, consistent company matching. Which is why we ship the cleanup tools alongside the platform: CSV deduplicator, email validator, phone formatter.',
        ],
      },
      {
        heading: 'Choosing one',
        paragraphs: [
          'The buyer’s checklist that matters: data residency and GDPR posture, migration path from your current spreadsheet/CRM, integration surface (API, imports), pricing at your real seat count, and whether ticketing lives inside or bolted on. Our buyer’s guide walks through it; the blog post introduces our own take — a real free tier, CSV/JSON import, and built-in ticketing.',
        ],
      },
    ],
    standards: [],
    relatedTerms: ['sla', 'csv', 'vcard', 'e164', 'gdpr'],
    relatedLinks: [
      { label: 'OG CRM & Ticketing', url: '/products/', type: 'product' },
      { label: 'Introducing OG CRM & Ticketing', url: '/blog/introducing-og-crm-ticketing/', type: 'blog' },
      { label: 'How to choose a CRM & ticketing system', url: '/insights/how-to-choose-crm-ticketing-system/', type: 'article' },
      { label: 'CSV Deduplicator', url: '/tools/csv-deduplicator/', type: 'tool' },
    ],
    faq: [
      { q: 'Is OG CRM free?', a: 'Yes — there is a real free tier, not a 14-day countdown. Pro is €8/month with a 14-day trial (no credit card required to start), and Enterprise plans cover larger teams.' },
    ],
  },
  {
    slug: 'sla',
    term: 'SLA (Service Level Agreement)',
    shortName: 'SLA',
    category: 'enterprise-it',
    definition: 'An SLA is the measurable commitment inside a service contract — uptime percentages, response and resolution time targets, and the remedies when they are missed — the numbers that drive helpdesk triage and vendor accountability.',
    sections: [
      {
        heading: 'The metrics that matter',
        paragraphs: [
          'Uptime is quoted in nines: 99.9% allows ~43 minutes of downtime a month, 99.99% about four. Response SLAs are split into first-response (how fast someone acknowledges) and resolution (how fast it is fixed), usually tiered by priority — P1 outages get minutes, cosmetic issues get days. Remedies range from service credits to termination rights.',
          'In a helpdesk, the SLA is the operating clock: ticket priorities map to countdowns, escalation rules fire when a deadline approaches, and breach reports become the vendor review agenda — which is why our ticketing workflow article treats SLA design as the backbone of support operations.',
        ],
      },
      {
        heading: 'SLAs in the regulatory frame',
        paragraphs: [
          'For financial entities, DORA raises the stakes: ICT third-party contracts must contain defined service levels plus audit and access rights, and the register of information records them. An SLA is no longer just a commercial instrument — in regulated sectors it is a compliance artifact.',
        ],
      },
    ],
    standards: [
      { name: 'Regulation (EU) 2022/2554 (DORA) — ICT contract requirements' },
      { name: 'ISO/IEC 20000 — service management' },
    ],
    relatedTerms: ['crm', 'dora', 'soc-2'],
    relatedLinks: [
      { label: 'Helpdesk workflow best practices', url: '/insights/helpdesk-workflow-best-practices/', type: 'article' },
      { label: 'Helpdesk', url: '/helpdesk/', type: 'service' },
      { label: 'OG CRM & Ticketing', url: '/products/', type: 'product' },
    ],
  },
  // ---------------------------------------------------------------- e-learning
  {
    slug: 'scorm',
    term: 'SCORM (Sharable Content Object Reference Model)',
    shortName: 'SCORM',
    category: 'e-learning',
    definition: 'SCORM is the dominant e-learning packaging standard — a ZIP containing an imsmanifest.xml plus course assets that any compliant LMS can import, launch, and track (completions, scores, time) via a JavaScript API.',
    sections: [
      {
        heading: 'What is inside a package',
        paragraphs: [
          'A SCORM package is a ZIP whose root holds imsmanifest.xml — the manifest declaring organizations, resources, and the launch file — plus the HTML/JS content. The LMS reads the manifest, serves the launch file, and the content talks back through the SCORM API: completion status, score, suspend_data for resume state, and session time.',
          'The two live versions are SCORM 1.2 (the old workhorse every LMS supports) and SCORM 2004 (several editions, richer sequencing and a stricter data model). Validation failures cluster around a few classics: missing or malformed manifest, broken launch-file reference, and file-reference case mismatches that explode on case-sensitive servers.',
        ],
      },
      {
        heading: 'SCORM vs the newer standards',
        paragraphs: [
          'SCORM tracks one thing well — did the learner finish inside the LMS. xAPI generalizes tracking into actor-verb-object statements sent to a Learning Record Store, covering mobile, offline, and out-of-LMS learning; cmi5 bridges them by putting xAPI tracking inside an LMS-launched package. Most organizations still ship SCORM, which is why pre-upload validation saves real time.',
        ],
      },
    ],
    standards: [
      { name: 'SCORM 1.2 / SCORM 2004 (ADL)' },
      { name: 'xAPI — IEEE 9274.1.1' },
      { name: 'cmi5 — xAPI profile for LMS launch' },
    ],
    relatedTerms: ['xapi', 'xml'],
    relatedLinks: [
      { label: 'SCORM Package Validator (1.2 / 2004 / xAPI / cmi5)', url: '/tools/scorm-validator/', type: 'tool' },
      { label: 'EduNode', url: '/portfolio/edunode/', type: 'product' },
    ],
  },
  {
    slug: 'xapi',
    term: 'xAPI (Experience API)',
    shortName: 'xAPI',
    category: 'e-learning',
    definition: 'xAPI — also known as Tin Can, standardized as IEEE 9274.1.1 — is the learning-record standard that tracks experiences as actor-verb-object statements (Alice completed Module 3) sent to a Learning Record Store, covering learning that happens outside an LMS.',
    sections: [
      {
        heading: 'Statements and the LRS',
        paragraphs: [
          'Every tracked moment becomes a JSON statement: actor (who), verb (what they did — answered, completed, watched), object (the activity), plus optional context and results. Statements stream to an LRS — a store that other systems query for analytics, compliance reporting, or adaptive learning. Unlike SCORM, tracking does not depend on the content being launched from an LMS session.',
          'That decoupling is the point: mobile apps, simulators, offline field training, and real-world performance can all emit statements into the same record store — something SCORM’s browser-session model never handled.',
        ],
      },
      {
        heading: 'xAPI and cmi5',
        paragraphs: [
          'cmi5 is the bridge: it keeps the LMS launch/package mechanics of SCORM but replaces the data model and tracking with xAPI statements — the modern answer when you need both LMS administration and rich tracking. Our validator detects SCORM, xAPI, and cmi5 packages and checks each accordingly.',
        ],
      },
    ],
    standards: [
      { name: 'xAPI — IEEE 9274.1.1' },
      { name: 'cmi5 — xAPI LMS-launch profile' },
    ],
    relatedTerms: ['scorm', 'json'],
    relatedLinks: [
      { label: 'SCORM Package Validator', url: '/tools/scorm-validator/', type: 'tool' },
      { label: 'EduNode', url: '/portfolio/edunode/', type: 'product' },
    ],
  },
];

// ------------------------------------------------------------------ helpers

export function getGlossaryTerm(slug) {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function getGlossaryCategory(id) {
  return GLOSSARY_CATEGORIES.find((c) => c.id === id);
}

export function getTermsByCategory(categoryId) {
  return GLOSSARY_TERMS.filter((t) => t.category === categoryId);
}
