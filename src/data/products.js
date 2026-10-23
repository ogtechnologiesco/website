// Product data — single source of truth for the /products/<slug>/ detail pages.
// Imported by Products.jsx (links), ProductDetail.jsx, src/data/searchIndex.js,
// src/components/Breadcrumbs.jsx, and vite.config.js (routeMeta + prerender routes).
//
// IMPORTANT: `metaDescription` and `definition`-style fields are injected into
// <meta> content attributes at build time — do not use double quotes inside them.
//
// schemaType drives the JSON-LD emitted per page:
//   'software' -> SoftwareApplication (a runnable product, e.g. OG CRM)
//   'service'  -> Service (a development/consulting offering)

export const PRODUCTS = [
  {
    slug: 'crm-ticketing',
    name: 'OG CRM & Ticketing',
    shortName: 'CRM & Ticketing',
    schemaType: 'software',
    badge: 'Flagship Product',
    status: 'Active development — free tier available',
    tagline: 'Contacts, companies, leads, opportunities, activities, and helpdesk ticketing on one customer record — with CSV/JSON import, analytics, and a real free tier.',
    metaTitle: 'OG CRM & Ticketing - Contacts, Deals & Support in One Platform | OG Technologies EU',
    metaDescription: 'OG CRM & Ticketing combines contact management, companies, leads, opportunities, activities, and a full helpdesk on one customer record. CSV/JSON import, analytics dashboard, and a real free tier — Pro from EUR 8/month.',
    metaKeywords: 'CRM system, ticketing system, helpdesk software, customer relationship management, contact management, sales pipeline, support tickets, CRM free tier',
    features: [
      'Contact and company management with full interaction history',
      'Leads and opportunity pipeline with stages and deal values',
      'Activities — calls, emails, meetings, reminders on the customer record',
      'Built-in helpdesk: ticket status, priority, ownership, threaded comments',
      'CSV/JSON import with column mapping, validation, and duplicate skipping',
      'Analytics dashboard — pipeline distribution, deal value, activity trends',
    ],
    sections: [
      {
        heading: 'One customer record, not two systems',
        paragraphs: [
          'Most teams run a CRM for sales and a separate helpdesk for support, then lose the context that lives between them. OG CRM & Ticketing puts tickets on the same record as deals and activities — when a customer calls, you see the open opportunity, the last interaction, and the unresolved ticket in one view.',
          'Ticketing is built in, not bolted on: tickets carry status, priority, ownership, and threaded comments, and they sit next to the pipeline data that explains why this customer matters.',
        ],
      },
      {
        heading: 'Migration without the mess',
        paragraphs: [
          'The importer accepts CSV and JSON, with Excel and XML handled server-side. You map your columns before anything is written, invalid emails are flagged, and duplicate emails inside the file are skipped and reported — so an import leaves your data cleaner than it arrived.',
          'Our free cleanup tools help you prepare files before you upload: deduplicate by key columns, validate email syntax in bulk, and normalize phone numbers to E.164.',
        ],
      },
      {
        heading: 'Pricing that starts free',
        paragraphs: [
          'The free tier is a real tier, not a 14-day countdown. Pro is EUR 8/month with a 14-day trial — no credit card required to start — and Enterprise plans cover larger teams and dedicated requirements.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'View pricing plans', url: '/pricing/', type: 'cta' },
      { label: 'Try it free — sign up', url: '/signup/', type: 'cta' },
      { label: 'Introducing OG CRM & Ticketing', url: '/blog/introducing-og-crm-ticketing/', type: 'blog' },
      { label: 'How to choose a CRM & ticketing system', url: '/insights/how-to-choose-crm-ticketing-system/', type: 'article' },
      { label: 'Helpdesk workflow best practices', url: '/insights/helpdesk-workflow-best-practices/', type: 'article' },
      { label: 'CSV Deduplicator', url: '/tools/csv-deduplicator/', type: 'tool' },
      { label: 'CRM in the glossary', url: '/glossary/crm/', type: 'article' },
    ],
    faq: [
      { q: 'Is there a free tier?', a: 'Yes — a real free tier, not a 14-day countdown. Pro is EUR 8/month with a 14-day trial (no credit card required to start), and Enterprise plans cover larger teams.' },
      { q: 'Can I import my existing contacts?', a: 'Yes — the importer accepts CSV and JSON (Excel and XML are handled server-side). You map your columns before anything is written, invalid emails are flagged, and duplicate emails inside the file are skipped and reported.' },
      { q: 'Does it include a helpdesk?', a: 'Yes — ticketing is built in, not bolted on. Tickets have status, priority, ownership, and threaded comments, and they live on the same customer record as your deals and activities.' },
    ],
  },
  {
    slug: 'travel-booking-platform',
    name: 'Travel Booking Platform Development',
    shortName: 'Travel Booking',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'A customized travel booking platform that combines AI-driven personalization with blockchain-secured transactions — designed around your inventory, suppliers, and payment flows.',
    metaTitle: 'Custom Travel Booking Platform Development - AI & Blockchain | OG Technologies EU',
    metaDescription: 'Custom travel booking platform development: AI-powered recommendations, supplier integrations, and blockchain-secured transactions. We design and build booking platforms tailored to your business.',
    metaKeywords: 'travel booking platform, custom booking engine, travel technology, AI travel recommendations, blockchain payments, payment infrastructure',
    features: [
      'AI-driven recommendations and itinerary personalization',
      'Supplier and inventory integrations — flights, hotels, experiences',
      'Payment infrastructure: SEPA, card, and stablecoin settlement options',
      'Blockchain-secured booking records and settlement transparency',
      'Booking management, refunds, and customer self-service flows',
    ],
    sections: [
      {
        heading: 'What we build',
        paragraphs: [
          'A booking platform that fits your business rather than forcing your business into an off-the-shelf engine: search and availability across your suppliers, AI-assisted recommendations tuned to your customers, checkout with the payment rails your market expects, and back-office tools for managing bookings, cancellations, and refunds.',
          'Where settlement complexity demands it, we bring payment-infrastructure expertise — SEPA file flows, ISO 20022 reconciliation data, and stablecoin settlement on Stellar through our work on Mozart Pay.',
        ],
      },
      {
        heading: 'How we deliver',
        paragraphs: [
          'Engagements start from a scoped architecture: booking flow, supplier APIs, payment orchestration, and the data model underneath. We build iteratively with a working booking path early, then extend into recommendations, loyalty, and reporting.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'Mozart Pay — our payment platform', url: '/portfolio/mozart-pay/', type: 'product' },
      { label: 'SEPA in the glossary', url: '/glossary/sepa/', type: 'article' },
      { label: 'Stellar cross-border payments explained', url: '/insights/stellar-cross-border-payments-anchors-sep24/', type: 'article' },
    ],
  },
  {
    slug: 'ecommerce-marketplace',
    name: 'E-Commerce Marketplace Development',
    shortName: 'E-Commerce Marketplace',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'A decentralized, secure e-commerce marketplace with AI-driven personalization — multi-vendor catalogs, real-time pricing optimization, and transparent settlement.',
    metaTitle: 'E-Commerce Marketplace Development - Blockchain & AI | OG Technologies EU',
    metaDescription: 'Custom e-commerce marketplace development: multi-vendor catalogs, AI product recommendations, real-time pricing optimization, and blockchain-based settlement for transparent, secure transactions.',
    metaKeywords: 'marketplace development, e-commerce platform, multi-vendor marketplace, blockchain e-commerce, AI product recommendations',
    features: [
      'Multi-vendor catalogs with onboarding and moderation workflows',
      'AI product recommendations and personalized discovery',
      'Real-time pricing optimization rules',
      'Blockchain-based settlement and auditability',
      'Standards-clean product data — GTIN validation and catalog hygiene',
    ],
    sections: [
      {
        heading: 'What we build',
        paragraphs: [
          'Marketplace infrastructure for your model: vendor onboarding, catalog management, search and personalization, order routing, and settlement. AI algorithms power product recommendations and pricing optimization — surfacing the right item at the right price without a data-science team of your own.',
          'Blockchain enters where it earns its place: provable settlement between vendors and the platform, transparent fee logic, and tamper-evident order records — not decentralization for its own sake.',
        ],
      },
      {
        heading: 'Catalog quality is the foundation',
        paragraphs: [
          'Marketplace integrations live and die on identifier hygiene. We build GTIN-aware catalog pipelines — check-digit validation, dedupe, country-prefix normalization — so marketplace and feed rejections do not become a support channel.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'GTIN / UPC / EAN Validator', url: '/tools/gtin-validator/', type: 'tool' },
      { label: 'Blockchain in the glossary', url: '/glossary/blockchain/', type: 'article' },
      { label: 'GTIN in the glossary', url: '/glossary/gtin/', type: 'article' },
    ],
  },
  {
    slug: 'blockchain-consulting',
    name: 'Blockchain Consulting Services',
    shortName: 'Blockchain Consulting',
    schemaType: 'service',
    badge: 'Consulting',
    tagline: 'Blockchain strategy, smart-contract development, and DLT integration — backed by active participation in international blockchain standardization.',
    metaTitle: 'Blockchain Consulting Services - Strategy, Smart Contracts & DLT | OG Technologies EU',
    metaDescription: 'Blockchain consulting for enterprises: DLT strategy, smart-contract design, regulatory alignment under MiCA and DORA, and integration with payment infrastructure. Standards-level expertise from BlockStand and publications.',
    metaKeywords: 'blockchain consulting, DLT strategy, smart contract development, MiCA compliance, DORA, blockchain standards, enterprise blockchain',
    features: [
      'Blockchain strategy and feasibility assessment',
      'Smart-contract design, development, and audit readiness',
      'Regulatory alignment — MiCA, DORA, eIDAS frameworks',
      'DLT integration with payment and identity infrastructure',
      'Standards expertise — ISO/TC 307, W3C VC/DID, BlockStand deliverables',
    ],
    sections: [
      {
        heading: 'From strategy to running systems',
        paragraphs: [
          'We help you decide whether blockchain solves a real problem, then build it: architecture selection (public vs permissioned), smart-contract development, integration with existing systems, and the compliance layer that makes it deployable — MiCA for crypto-assets, DORA for financial-sector resilience, eIDAS for identity and trust.',
          'The work is informed by participation in standardization itself: our published BlockStand deliverables on cross-border payment standardization and hands-on EBSI verifiable-credential verification are public evidence of depth, not slideware.',
        ],
      },
      {
        heading: 'Who it is for',
        paragraphs: [
          'Enterprises evaluating DLT for payments, credentials, or settlement; startups building on Stellar, Ethereum, or EBSI-aligned infrastructure; and regulated entities that need the technology and the compliance argument in the same document.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
      { label: 'DORA compliance', url: '/dora/', type: 'service' },
      { label: 'Our standardization publications', url: '/publications/', type: 'service' },
      { label: 'Blockchain Compliance Checker', url: '/tools/blockchain-compliance-checker/', type: 'tool' },
      { label: 'How blockchain standards enable enterprises', url: '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers/', type: 'blog' },
    ],
    faq: [
      { q: 'Do you only build on specific chains?', a: 'Our production work centers on Stellar (payments, credentials, Soroban) and Ethereum tooling, and we advise on EBSI-aligned EU infrastructure. Strategy work is chain-agnostic — the architecture follows the use case.' },
      { q: 'Can you help with MiCA or DORA compliance?', a: 'Yes — regulatory alignment is part of the offering. DORA applies to CASPs licensed under MiCA, and we consult on both the technical resilience requirements and the compliance documentation.' },
    ],
  },
  {
    slug: 'ai-chatbot',
    name: 'AI Agent & Chatbot Development',
    shortName: 'AI Agents',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'AI agents and chatbots that sense, think, and act — 24/7 customer support, knowledge-grounded answers, and automated actions inside your CRM and back office.',
    metaTitle: 'AI Agent & Chatbot Development - RAG, MCP & Automation | OG Technologies EU',
    metaDescription: 'AI agent and chatbot development: 24/7 customer support agents, RAG over your knowledge base, MCP-orchestrated tool use, and actions inside your CRM and helpdesk. Built with EU AI Act awareness.',
    metaKeywords: 'AI chatbot development, AI agent, RAG, MCP orchestration, customer support chatbot, LLM integration, conversational AI',
    features: [
      'Customer support agents with 24/7 coverage and escalation to humans',
      'RAG over your documentation, tickets, and knowledge base',
      'Tool use and orchestration — MCP-connected actions in CRM/ERP systems',
      'Model selection guidance: SLM vs LLM, cost and latency trade-offs',
      'Governance-ready design — logging, oversight hooks, EU AI Act awareness',
    ],
    sections: [
      {
        heading: 'Sense, think, act',
        paragraphs: [
          'We design agents around a practical anatomy: sensing (ingesting conversations, documents, and system data), thinking (knowledge bases, planning logic, and LLM-powered analysis with feedback loops), and acting (automation, alerts, and writes into your CRM, helpdesk, or ERP). The result is an agent that resolves work — not just chats.',
          'Orchestration uses emerging standards where they fit — Model Context Protocol for connecting agents to tools and data sources — so the architecture is not locked to one vendor or model.',
        ],
      },
      {
        heading: 'Right-sized models, governed deployment',
        paragraphs: [
          'Model choice is an engineering decision: smaller language models win on cost and latency for narrow tasks; frontier models handle complex reasoning. We advise on the split and on specialization through retrieval and fine-tuning.',
          'And because agents act on real customer data, we design with governance in mind — scoped permissions, audit logs, human oversight — the disciplines the EU AI Act and ISO/IEC 42001 formalize.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'AI agent architecture workshop recap', url: '/blog/entrepreneurship-avenue-2026/', type: 'blog' },
      { label: 'EU AI Act compliance guide', url: '/insights/eu-ai-act-compliance-guide/', type: 'article' },
      { label: 'EU AI Act in the glossary', url: '/glossary/eu-ai-act/', type: 'article' },
      { label: 'ISO/IEC 42001 in the glossary', url: '/glossary/iso-42001/', type: 'article' },
      { label: 'OG CRM & Ticketing', url: '/products/crm-ticketing/', type: 'product' },
    ],
  },
  {
    slug: 'loyalty-program',
    name: 'Blockchain Loyalty Program Development',
    shortName: 'Loyalty Programs',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'A loyalty program on blockchain rails — transparent points issuance, auditable reward distribution, and redemption logic enforced by smart contracts.',
    metaTitle: 'Blockchain Loyalty Program Development - Tokenized Rewards | OG Technologies EU',
    metaDescription: 'Blockchain-based loyalty program development: tokenized points, transparent reward distribution via smart contracts, partner interoperability, and auditable redemption — built on low-cost Stellar rails.',
    metaKeywords: 'loyalty program development, blockchain rewards, tokenized loyalty points, smart contract rewards, customer retention platform',
    features: [
      'Tokenized points with transparent issuance and burn rules',
      'Smart-contract reward distribution — auditable, automatic',
      'Partner interoperability — earn and redeem across programs',
      'Low-cost settlement on Stellar rails',
      'Member dashboard, tier logic, and campaign management',
    ],
    sections: [
      {
        heading: 'Why put loyalty on a ledger',
        paragraphs: [
          'Loyalty liability is real money owed to customers — and opaque ledgers erode trust on both sides. Issuing points as ledger assets makes issuance, transfer, and redemption provably correct: members can verify their balances, partners can reconcile settlements without disputes, and the rules are enforced by contracts rather than back-office spreadsheets.',
          'Stellar’s low fees and fast finality make micro-rewards economical — points can move in cents-sized transactions that would be absurd on card rails or congested chains.',
        ],
      },
      {
        heading: 'What we deliver',
        paragraphs: [
          'Program design (earn rules, tiers, breakage policy), the asset and contract layer, member-facing apps, and the merchant/admin console — plus the compliance consideration that comes with anything resembling a transferable asset in the EU.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'Stellar in the glossary', url: '/glossary/stellar/', type: 'article' },
      { label: 'Smart contracts in the glossary', url: '/glossary/smart-contract/', type: 'article' },
      { label: 'Mozart Pay — our payment platform', url: '/portfolio/mozart-pay/', type: 'product' },
    ],
  },
  {
    slug: 'elearning-platform',
    name: 'E-Learning Platform Development',
    shortName: 'E-Learning Platform',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'Custom e-learning platforms with SCORM/xAPI packaging, LMS interoperability, AI-personalized learning paths, and verifiable digital credentials for completions.',
    metaTitle: 'E-Learning Platform Development - SCORM, xAPI & AI | OG Technologies EU',
    metaDescription: 'Custom e-learning platform development: SCORM/xAPI/cmi5 packaging and validation, LMS integration, AI-personalized learning paths, and blockchain-verified credentials — proven by our own platform EduNode.',
    metaKeywords: 'e-learning platform, LMS development, SCORM, xAPI, cmi5, AI learning, verifiable credentials, EdTech development',
    features: [
      'SCORM 1.2 / 2004, xAPI, and cmi5 packaging and LMS interoperability',
      'AI-personalized learning paths and adaptive assessment',
      'Verifiable digital credentials for completions and certifications',
      'Content authoring workflows, quizzes, and progress analytics',
      'Standards-first architecture — your content stays portable',
    ],
    sections: [
      {
        heading: 'Proven on our own platform',
        paragraphs: [
          'EduNode — our STEM, Web3, and AI education platform, grant-funded by the Stellar Development Foundation — is the reference implementation: content tracks, interactive learning, and on-chain credential components built by the same team that would build yours.',
          'We build the packaging layer the standards way: imsmanifest.xml manifests, launch-file conventions, xAPI statement streams to a Learning Record Store, and cmi5 where you need LMS launch plus rich tracking. Our free package validator catches the classic failures before your LMS does.',
        ],
      },
      {
        heading: 'Credentials that verify themselves',
        paragraphs: [
          'Completions can be issued as verifiable credentials — W3C-standard, cryptographically signed attestations a graduate can present anywhere — the same stack behind the EUDI Wallet and our EBSI verification work. Your certificates stop being screenshots.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'EduNode — our education platform', url: '/portfolio/edunode/', type: 'product' },
      { label: 'SCORM Package Validator', url: '/tools/scorm-validator/', type: 'tool' },
      { label: 'SCORM in the glossary', url: '/glossary/scorm/', type: 'article' },
      { label: 'Verifiable credentials in the glossary', url: '/glossary/verifiable-credentials/', type: 'article' },
    ],
  },
  {
    slug: 'space-technology',
    name: 'Space Technology Development',
    shortName: 'Space Technology',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'Custom space-data platforms — satellite tracking, orbital-element processing, ground-segment integrations, and celestial data analysis with security-first engineering.',
    metaTitle: 'Space Technology Development - Satellite Data Platforms | OG Technologies EU',
    metaDescription: 'Custom space technology development: satellite tracking platforms, TLE/OMM orbital data processing, ground-segment integrations, and celestial data analysis — secure, standards-based engineering.',
    metaKeywords: 'space technology, satellite tracking, TLE parsing, orbital data, space data platform, ground segment software',
    features: [
      'Satellite catalog and tracking-data pipelines — TLE, 3LE, OMM/GP formats',
      'Orbital-element processing and derived-parameter computation',
      'Ground-segment and API integrations',
      'Celestial and telemetry data analysis dashboards',
      'Security-first handling of space-related data',
    ],
    sections: [
      {
        heading: 'Standards-based space data',
        paragraphs: [
          'Space data exchange runs on formats most web stacks never see — NORAD two-line element sets, CCSDS Orbit Data Messages, SGP4 propagation. We build the ingestion, validation, and conversion pipelines that turn raw element sets into usable products: catalogs, dashboards, APIs, and analysis tools.',
          'Our free TLE tools are a public slice of that capability — parsing line-1/line-2 fields, deriving period, apogee, and perigee, and batch-converting catalogs to the modern OMM/GP JSON format.',
        ],
      },
      {
        heading: 'Engineering for a high-stakes domain',
        paragraphs: [
          'Space systems tolerate no sloppy data handling: malformed element sets propagate into wrong positions. We apply the same rigor we bring to payment files and health records — schema validation, checksums, and testable pipelines — to celestial data.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'TLE Parser', url: '/tools/tle-parser/', type: 'tool' },
      { label: 'TLE to JSON/CSV Converter', url: '/tools/tle-converter/', type: 'tool' },
      { label: 'TLE in the glossary', url: '/glossary/tle/', type: 'article' },
    ],
  },
  {
    slug: 'healthcare-solutions',
    name: 'Health Industry Solutions',
    shortName: 'Health Solutions',
    schemaType: 'service',
    badge: 'Healthcare',
    tagline: 'Secure digital health platforms — EHR and patient management, telemedicine, HL7 v2 and FHIR interoperability, and GDPR-compliant handling of sensitive health data.',
    metaTitle: 'Health Industry Solutions - HL7, FHIR & Digital Health | OG Technologies EU',
    metaDescription: 'Digital health platform development: EHR and patient management systems, telemedicine, HL7 v2 and FHIR interoperability, and GDPR-compliant health data handling — with public tools and guides proving the depth.',
    metaKeywords: 'health IT, EHR development, telemedicine platform, HL7 integration, FHIR API, healthcare interoperability, digital health',
    features: [
      'EHR and patient management systems',
      'Telemedicine and virtual care platforms',
      'HL7 v2 interface integration — ADT, ORU, ORM message flows',
      'FHIR R4 APIs and SMART on FHIR app development',
      'GDPR-compliant architectures for health data',
    ],
    sections: [
      {
        heading: 'Interoperability is the hard part',
        paragraphs: [
          'Healthcare software fails or succeeds at the interfaces: HL7 v2 feeds inside hospitals, FHIR APIs at the edges. We build integration layers that handle both — parsing and mapping v2 message flows (ADT, orders, results) while exposing modern FHIR resources for apps and national infrastructures.',
          'Our public tooling shows the working knowledge: a client-side HL7 v2 parser that labels MSH/PID/PV1/OBR/OBX fields without ever uploading PHI, and a FHIR R4 resource viewer that validates structure and flattens field paths.',
        ],
      },
      {
        heading: 'Compliance-shaped engineering',
        paragraphs: [
          'Health data demands privacy by construction: PHI stays scoped, access is logged, and processing is documented. We design for GDPR Article 9 sensitivity — and for the HIPAA-shaped requirements international clients bring — rather than bolting compliance on afterward.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'HL7 v2 Message Parser', url: '/tools/hl7-parser/', type: 'tool' },
      { label: 'FHIR Resource Viewer & Validator', url: '/tools/fhir-validator/', type: 'tool' },
      { label: 'HL7 v2 vs FHIR: choosing the right standard', url: '/insights/hl7-v2-vs-fhir-comparison/', type: 'article' },
      { label: 'HL7 v2 message structure decoded', url: '/insights/hl7-v2-message-structure/', type: 'article' },
    ],
    faq: [
      { q: 'Do you work with HL7 v2, FHIR, or both?', a: 'Both — that is the realistic posture. v2 still powers intra-hospital messaging (ADT, ORU, ORM) and interface engines, while FHIR is the standard for new APIs and national access rules. We build integration layers that translate between them.' },
      { q: 'Is the platform GDPR-compliant?', a: 'We design for GDPR from the start — health data is Article 9 special-category data: scoped processing, encryption, access logs, DPIA-ready documentation. For non-EU clients we also design to HIPAA-shaped requirements.' },
    ],
  },
  {
    slug: 'payment-infrastructure',
    name: 'Payment Infrastructure & ISO 20022 Migration',
    shortName: 'Payment Infrastructure',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'ISO 20022 migration assessments, SEPA file pipelines, and payment infrastructure that connects your ERP to bank rails — and to the new digital-payment rails underneath them.',
    metaTitle: 'Payment Infrastructure & ISO 20022 Migration Services | OG Technologies EU',
    metaDescription: 'ISO 20022 migration and payment infrastructure development: pain/camt/pacs message integration, SEPA file pipelines, MT940 to camt.053 migration, ERP-to-bank connectivity, and stablecoin settlement on Stellar.',
    metaKeywords: 'ISO 20022 migration, payment infrastructure, SEPA integration, MT940 camt.053, pain.001, payment systems development, stablecoin settlement, payment consulting',
    features: [
      'ISO 20022 migration assessment and roadmap for the November 2026 deadline',
      'pain / camt / pacs message integration with banks and clearing systems',
      'SEPA SCT, SDD, and SCT Inst file pipelines — generation, validation, reconciliation',
      'MT940 to camt.053 statement migration and downstream reconciliation logic',
      'ERP-to-bank connectivity and payment operations automation',
      'Stablecoin and DLT settlement rails — USDC/EURC on Stellar, interoperable with ISO 20022 metadata',
    ],
    sections: [
      {
        heading: 'The November 2026 deadline is real work',
        paragraphs: [
          'SWIFT ends MT/MX coexistence for cross-border payment instructions in November 2026. If your ERP generates pain files or consumes MT940 statements, the migration reaches into your payment files, statement imports, and reconciliation logic — not just your bank relationship. We assess what changes, sequence the work, and validate the results against the schemas and rulebooks your banks enforce.',
          'Our public tooling is the working slice of that capability: an ISO 20022 message viewer that parses pain.001, camt.053, and pacs.008 with consistency checks, SEPA validators and generators that enforce EPC rulebook constraints, and MT940 converters that bridge to camt.053 XML.',
        ],
      },
      {
        heading: 'Rails old and new',
        paragraphs: [
          'Payment infrastructure is no longer only bank rails. We build the bridge both directions — regulated SEPA flows and, where the use case earns it, stablecoin settlement on Stellar through our own Mozart Pay platform, with DLT transaction metadata mapped into ISO 20022 messages so both worlds reconcile. Our BlockStand publications on cross-border payment standardization and the StandICT fellowship work on DLT↔ISO 20022 mapping sit underneath this offering.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'ISO 20022 Message Viewer', url: '/tools/iso-20022-viewer/', type: 'tool' },
      { label: 'MT940 to camt.053 Converter', url: '/tools/mt940-to-camt053/', type: 'tool' },
      { label: 'SEPA XML Validator', url: '/tools/sepa-xml-validator/', type: 'tool' },
      { label: 'ISO 20022 migration guide', url: '/insights/iso-20022-migration-guide/', type: 'article' },
      { label: 'Publications on payment standardization', url: '/publications/', type: 'service' },
      { label: 'Mozart Pay', url: '/portfolio/mozart-pay/', type: 'product' },
    ],
    faq: [
      { q: 'Is ISO 20022 migration mandatory for us?', a: 'If you send or receive cross-border payments on SWIFT, yes — MX messages become the required format in November 2026. Domestic mandates vary, but TARGET2, SEPA, CHAPS, and Fedwire have already migrated or announced them. The practical question is whether your ERP and reconciliation stack can produce and consume the new formats.' },
      { q: 'What does a migration engagement look like?', a: 'Typically: a message and system inventory, a gap assessment against the target schemas and your banks’ implementation guidelines, conversion or integration work on the affected pipelines, and validation — we use the same checks our public tools run, applied to your real files.' },
    ],
  },
  {
    slug: 'digital-identity',
    name: 'Digital Identity & Verifiable Credential Solutions',
    shortName: 'Digital Identity',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'Verifiable credential issuance and verification, EUDI Wallet readiness, and DID infrastructure — built on the same W3C standards Europe is adopting.',
    metaTitle: 'Digital Identity & Verifiable Credential Solutions | OG Technologies EU',
    metaDescription: 'Digital identity development: verifiable credential issuance and verification, EUDI Wallet readiness under eIDAS 2.0, DID infrastructure, and EBSI trust-chain integration — standards-based, not proprietary.',
    metaKeywords: 'digital identity, verifiable credentials, EUDI Wallet, eIDAS 2.0, decentralized identifiers, EBSI, KYC onboarding, W3C VC',
    features: [
      'Verifiable credential issuance and verification services — W3C VC data model',
      'EUDI Wallet readiness: accept and verify wallet presentations under eIDAS 2.0',
      'DID infrastructure — creation, resolution, and key management',
      'EBSI trust-chain integration — issuer accreditation and registry lookups',
      'Selective disclosure and privacy-preserving presentations (SD-JWT VC)',
      'KYC and onboarding flows upgraded to cryptographic verification',
    ],
    sections: [
      {
        heading: 'The EUDI Wallet changes the table',
        paragraphs: [
          'Under eIDAS 2.0, every member state must provide a digital identity wallet — and regulated industries will be expected to accept wallet-based identification. For businesses this converts identity from a document-upload problem into a cryptographic protocol: verified attributes presented in seconds, with selective disclosure that shares only what is needed.',
          'We build both sides of that protocol: issuers (universities, licensing bodies, employers issuing attestations) and verifiers (services that need to trust them). The stack is standards-based — W3C verifiable credentials, DIDs, and the EBSI trust model — so credentials verify anywhere, not just in your app.',
        ],
      },
      {
        heading: 'Proven in the ecosystem',
        paragraphs: [
          'This is active, hands-on work for us: EBSI trust-chain verification is documented in our blog, DID and verifiable-credential workflows are built into the open-source Stellar Go CLI, and our standards consulting covers the eIDAS 2.0 framework as it lands.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'eIDAS 2.0 and the EUDI Wallet', url: '/insights/eidas2-eudi-wallet/', type: 'article' },
      { label: 'Verifying EBSI verifiable credentials', url: '/blog/ebsi-verifiable-credentials/', type: 'blog' },
      { label: 'Stellar Go CLI — DIDs and VCs', url: '/portfolio/stellar-go-cli/', type: 'product' },
      { label: 'Verifiable credentials in the glossary', url: '/glossary/verifiable-credentials/', type: 'article' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
    faq: [
      { q: 'When do we need to be EUDI Wallet-ready?', a: 'Member states must provide wallets on a rollout running through 2026–2027, and regulated sectors will be obliged to accept them for identification. The sensible path is to design wallet-acceptance and attestation-issuance into identity flows now, rather than retrofitting after mandates land.' },
      { q: 'Do verifiable credentials require a blockchain?', a: 'Not necessarily — credentials are cryptographically signed documents that verify offline. Ledger-based DIDs and registries (like EBSI’s) anchor trust, but did:web and peer methods work without a chain. We choose the trust infrastructure the use case and regulator expect.' },
    ],
  },
  {
    slug: 'grc-compliance-automation',
    name: 'GRC & Management-System Automation',
    shortName: 'GRC Automation',
    schemaType: 'service',
    badge: 'Custom Development',
    tagline: 'Your ISMS, QMS, or AIMS as a working system, not a spreadsheet — gap analysis, Statement of Applicability, control evidence, and audit readiness automated.',
    metaTitle: 'GRC & Management-System Automation - ISMS, AIMS, DORA | OG Technologies EU',
    metaDescription: 'GRC and compliance automation: ISO 27001 ISMS, ISO 9001 QMS, and ISO 42001 AIMS implementation, Statement of Applicability tooling, control evidence tracking, DORA register of information, and integrated management systems.',
    metaKeywords: 'GRC platform, ISMS software, ISO 27001 implementation, compliance automation, Statement of Applicability, AIMS, DORA register of information, integrated management system',
    features: [
      'ISMS, QMS, and AIMS implementation — ISO 27001, 9001, 42001, SOC 2',
      'Gap analysis, risk assessment, and remediation-roadmap tooling',
      'Statement of Applicability as a living register, not a document',
      'Control evidence tracking and audit-readiness workflows',
      'DORA register of information and ICT third-party contract tracking',
      'Integrated management systems — shared policies, audits, and reviews',
    ],
    sections: [
      {
        heading: 'One system, several standards',
        paragraphs: [
          'ISO 9001, 27001, and 42001 share the same management-system skeleton, yet most organizations run them as parallel spreadsheets — separate policies, separate audits, separate evidence folders. We implement integrated management systems that share the common machinery (document control, internal audit, management review, corrective action) and layer the discipline-specific parts on top.',
          'The Statement of Applicability becomes a living register — controls, owners, justifications, implementation status, evidence — instead of the file you scramble to update before an audit.',
        ],
      },
      {
        heading: 'Compliance that produces evidence',
        paragraphs: [
          'Regulators and certification bodies want artifacts, not intentions: risk assessments with methodology, control selections with justification, incident registers, contract inventories. For financial entities that now includes DORA’s register of information over every ICT third-party contract — a system obligation, not a policy one. We build the tooling and the process so the evidence is a byproduct of operating, not a pre-audit project.',
          'The approach is proven in public: our free readiness checkers score ISO 27001, 9001, 42001, and SOC 2 posture, the gap-analysis templates and Annex A control lists are already in use, and our DORA practice handles the financial-sector layer.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Request a quote', url: '/quote/', type: 'cta' },
      { label: 'ISO 27001 Gap Analysis Tool', url: '/tools/iso-27001-gap-analysis/', type: 'tool' },
      { label: 'SOC 2 Readiness Checker', url: '/tools/soc-2-readiness-checker/', type: 'tool' },
      { label: 'ISO 42001 AI Readiness', url: '/tools/iso-42001-ai-readiness/', type: 'tool' },
      { label: 'Gap analysis template (.xlsx)', url: '/downloads/iso-27001-gap-analysis-template.xlsx', type: 'download' },
      { label: 'Integrated management system guide', url: '/insights/integrated-management-system-iso-9001-27001-42001/', type: 'article' },
      { label: 'NIS2 compliance and the ISO 27001 shortcut', url: '/insights/nis2-compliance-iso-27001/', type: 'article' },
      { label: 'Cyber Resilience Act guide', url: '/insights/cyber-resilience-act-cra-guide/', type: 'article' },
      { label: 'DORA compliance', url: '/dora/', type: 'service' },
      { label: 'Standards consulting', url: '/standards/', type: 'service' },
    ],
    faq: [
      { q: 'Do you implement the management system or just advise?', a: 'Both — depending on your internal capacity. Typical engagements run from a gap analysis through remediation support, tooling setup (SoA register, evidence workflows, registers), and pre-audit preparation. The goal is always a system you can operate without us.' },
      { q: 'Can one system really cover ISO 9001, 27001, and 42001?', a: 'Yes — they share the Annex SL structure, so 60–70% of the clauses map to common processes. The discipline-specific parts (risk assessment methods, control annexes, AI-specific impact assessment) layer on top. One audit cycle, one document-control system, one management review.' },
    ],
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}
