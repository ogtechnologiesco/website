import iso20022Image from '../images/insight-iso20022-payments.jpg';
import aiImage from '../images/insight-iso42001-ai.jpg';
import awsImage from '../images/insight-iam-security.jpg';
import hl7Image from '../images/insight-hl7-fhir.jpg';
import ethereumImage from '../images/insight-ethereum-calldata.jpg';
import iso27001Image from '../images/insight-iso27001-gap.jpg';
import ethereumUnitsImage from '../images/insight-ethereum-units.jpg';
import hl7MessagesImage from '../images/insight-hl7-messages.jpg';
import iamPolicyImage from '../images/insight-iam-policy.jpg';
import doraCryptoImage from '../images/insight-dora-crypto.jpg';
import stellarPaymentsImage from '../images/insight-stellar-payments.jpg';
import iso27001SoaImage from '../images/insight-iso27001-soa.jpg';
import iso42001AnnexAImage from '../images/insight-iso42001-annexa.jpg';
import imsImage from '../images/insight-integrated-management-system.jpg';
import iso8601Image from '../images/insight-iso8601-format.jpg';
import mergePdfImage from '../images/insight-merge-pdf.jpg';
import mt940Image from '../images/insight-mt940-camt053.jpg';
import eudiWalletImage from '../images/insight-eudi-wallet.jpg';
import odataImage from '../images/insight-odata-query.jpg';
import chooseCrmImage from '../images/insight-choose-crm.jpg';
import helpdeskWorkflowImage from '../images/insight-helpdesk-workflow.jpg';
import iso9001Image from '../images/insight-iso9001-implementation.jpg';
import iso27001AnnexAImage from '../images/insight-iso27001-annexa.jpg';
import soc2TscImage from '../images/insight-soc2-tsc.jpg';
import soc2VsIsoImage from '../images/insight-soc2-vs-iso27001.jpg';
import pdfMetadataImage from '../images/insight-pdf-metadata.jpg';
import mt940FieldsImage from '../images/insight-mt940-fields.jpg';
import odataFilterImage from '../images/insight-odata-filter.jpg';
import o1jsStateImage from '../images/insight-o1js-state.jpg';
import iso24874StellarImage from '../images/insight-iso24874-stellar-sdg.jpg';
import claudeCodeMcpImage from '../images/insight-claude-code-mcp.jpg';
import gpt6TiersImage from '../images/insight-gpt6-model-tiers.jpg';
import devinAutonomousImage from '../images/insight-devin-autonomous.jpg';
import deepseekV4Image from '../images/insight-deepseek-v4-moe.jpg';
import geminiArgonImage from '../images/insight-gemini-4-argon.jpg';
import kimiK3Image from '../images/insight-kimi-k3.jpg';
import glm5Image from '../images/insight-glm-5-zai.jpg';

export const insightsPosts = [
  {
    title: 'Claude Code for Enterprise Teams: Agentic Workflows, Subagents, and MCP Integration',
    date: '22/10/2026',
    description:
      'How enterprise teams deploy Claude Code: the agentic loop, CLAUDE.md memory, subagents, Model Context Protocol (MCP) servers, permission models, and AI governance.',
    image: claudeCodeMcpImage,
    imageText: 'Claude Code terminal with MCP server connections',
    link: '/insights/claude-code-agentic-workflows-mcp/',
    categories: ['AI Agents', 'Developer'],
  },
  {
    title: 'GPT-6 Explained: Astra, Sol, and Luna — Choosing the Right Model Tier for Your Workload',
    date: '22/10/2026',
    description:
      'OpenAI\'s GPT-6 family tiers by cost and intelligence: Astra at the frontier, Sol in the balanced middle, Luna at the efficient end. How to route workloads across tiers.',
    image: gpt6TiersImage,
    imageText: 'GPT-6 model tiers on the cost-intelligence curve',
    link: '/insights/gpt-6-astra-sol-luna-model-tiers/',
    categories: ['LLMs', 'AI Governance'],
  },
  {
    title: 'Inside Devin: What Autonomous AI Software Engineers Can (and Can\'t) Ship in Production',
    date: '22/10/2026',
    description:
      'A practical evaluation of Cognition\'s Devin — how ticket-to-PR workflows work, where autonomous engineers excel, and where human judgment still leads.',
    image: devinAutonomousImage,
    imageText: 'Devin autonomous engineer ticket-to-PR workflow',
    link: '/insights/devin-autonomous-ai-software-engineer/',
    categories: ['AI Agents', 'Developer'],
  },
  {
    title: 'DeepSeek V4.1 and the Open-Weight Price War: MIT-Licensed MoE Models for Coding Agents',
    date: '22/10/2026',
    description:
      'DeepSeek V4.1 Flash ships MIT-licensed weights and a 552B MoE backbone at ~1/40th the cost per agent task of frontier open models. What it means for your AI stack.',
    image: deepseekV4Image,
    imageText: 'DeepSeek V4.1 mixture-of-experts routing diagram',
    link: '/insights/deepseek-v4-open-weight-moe-coding-agents/',
    categories: ['LLMs', 'AI Agents'],
  },
  {
    title: 'Gemini 4 Argon and Antigravity: Google\'s New Agentic Coding Stack, Explained',
    date: '22/10/2026',
    description:
      'Gemini 4 Argon — Google\'s newest frontier model, #1 on the Vals Index — paired with Antigravity, an agent-first IDE. What the stack means for engineering teams.',
    image: geminiArgonImage,
    imageText: 'Gemini 4 Argon with the Antigravity agent manager',
    link: '/insights/gemini-4-argon-antigravity-agentic-coding/',
    categories: ['LLMs', 'AI Agents'],
  },
  {
    title: 'Kimi K3: Inside the 2.8-Trillion-Parameter Open Model Leading Agentic Benchmarks',
    date: '22/10/2026',
    description:
      'Moonshot AI\'s Kimi K3 is the largest open-weight flagship at 2.8T parameters — leading agentic coding benchmarks. What it offers, and the hosting reality.',
    image: kimiK3Image,
    imageText: 'Kimi K3 2.8-trillion-parameter open model',
    link: '/insights/kimi-k3-open-weight-agentic-model/',
    categories: ['LLMs', 'AI Agents'],
  },
  {
    title: 'GLM-5.3 Explained: Z.ai\'s Open-Weight Model for Long-Horizon Agent Sessions',
    date: '22/10/2026',
    description:
      'Z.ai\'s GLM-5.3 targets long-horizon agent and engineering sessions at the cheapest API tier in its class — capabilities, positioning vs DeepSeek and Kimi.',
    image: glm5Image,
    imageText: 'GLM-5.3 long-horizon agent session timeline',
    link: '/insights/glm-5-zai-long-horizon-agents/',
    categories: ['LLMs', 'AI Agents'],
  },
  {
    title: 'Measuring SDG Impact on Stellar: ISO 24874 KPIs, Benchmarking and Reporting',
    date: '22/10/2026',
    description:
      'How to apply the ISO/DPAS 24874 draft framework — KPI catalogue, five-level maturity benchmarking, and the SDG alignment methodology — to measure and report the impact of Stellar-based solutions.',
    image: iso24874StellarImage,
    imageText: 'ISO 24874 KPI panel measuring SDG impact on Stellar',
    link: '/insights/iso-24874-stellar-sdg-impact/',
    categories: ['Blockchain', 'Standards', 'Sustainability'],
  },
  {
    title: 'ISO 20022 Migration: What the November 2026 Deadline Means for Your Payment Messages',
    date: '21/09/2026',
    description:
      'The coexistence period for MT and ISO 20022 messages ends in November 2026. Learn what changes, how to validate pain.001, camt.053 and pacs.008 messages, and which free tools can help.',
    image: iso20022Image,
    imageText: 'ISO 20022 payment message migration',
    link: '/insights/iso-20022-migration-guide/',
    categories: ['Payments', 'Standards'],
  },
  {
    title: 'ISO/IEC 42001 Explained: A Practical Guide to AI Management System Readiness',
    date: '21/09/2026',
    description:
      'ISO/IEC 42001:2023 is the first international standard for AI management systems. Understand its clauses, Annex A controls, and how to assess your organization readiness before certification.',
    image: aiImage,
    imageText: 'ISO/IEC 42001 AI management system',
    link: '/insights/iso-42001-ai-management-guide/',
    categories: ['AI Governance', 'Standards', 'Compliance'],
  },
  {
    title: 'IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them',
    date: '21/09/2026',
    description:
      'Overly permissive AWS IAM policies are a leading cause of cloud breaches. Learn the most common privilege escalation patterns, why wildcards are dangerous, and how to validate policies automatically.',
    image: awsImage,
    imageText: 'AWS IAM policy security',
    link: '/insights/iam-policy-security-patterns/',
    categories: ['Security', 'Cloud'],
  },
  {
    title: 'HL7 v2 vs FHIR: Choosing the Right Healthcare Interoperability Standard',
    date: '21/09/2026',
    description:
      'HL7 v2 still powers most hospital integrations, but FHIR R4 is the future of healthcare APIs. Compare message formats, transport, tooling, and migration strategies.',
    image: hl7Image,
    imageText: 'HL7 v2 versus FHIR interoperability',
    link: '/insights/hl7-v2-vs-fhir-comparison/',
    categories: ['Healthcare', 'Standards'],
  },
  {
    title: 'Ethereum Calldata Deep Dive: Function Selectors, ABI Encoding, and EIP-55 Checksums',
    date: '21/09/2026',
    description:
      'A developer reference for how Ethereum transactions encode function calls: 4-byte selectors, ABI argument encoding, and address checksums — with free tools to verify each step.',
    image: ethereumImage,
    imageText: 'Ethereum calldata and ABI encoding',
    link: '/insights/ethereum-calldata-abi-guide/',
    categories: ['Blockchain', 'Developer'],
  },
  {
    title: 'ISO 27001 Gap Analysis: A Step-by-Step Guide',
    date: '26/09/2026',
    description:
      'How to run an ISO 27001 gap analysis: scope, clause-by-clause assessment, scoring, remediation roadmap, and a PDF report — with a free browser-based gap assessment tool.',
    image: iso27001Image,
    imageText: 'ISO 27001 gap analysis',
    link: '/insights/iso-27001-gap-analysis-guide/',
    categories: ['Standards', 'Compliance', 'Security'],
  },
  {
    title: 'Wei, Gwei, and Ether: Ethereum Units Explained',
    date: '26/09/2026',
    description:
      'The full Ethereum denomination table, why gas is priced in Gwei, worked wei-to-ETH conversion examples, and how to avoid off-by-18-zeros mistakes.',
    image: ethereumUnitsImage,
    imageText: 'Ethereum wei, gwei, and ether units',
    link: '/insights/ethereum-wei-gwei-units/',
    categories: ['Blockchain', 'Developer'],
  },
  {
    title: 'HL7 v2 Message Structure Explained: Segments, Fields, and Delimiters',
    date: '26/09/2026',
    description:
      'A practical anatomy of HL7 v2 messages: delimiters, segments (MSH, PID, OBR, OBX), fields, and message types — with a decoded ADT example and a free online parser.',
    image: hl7MessagesImage,
    imageText: 'HL7 v2 message structure',
    link: '/insights/hl7-v2-message-structure/',
    categories: ['Healthcare', 'Standards', 'Developer'],
  },
  {
    title: 'How to Validate AWS IAM Policies: 7 Checks Before You Deploy',
    date: '26/09/2026',
    description:
      'A practical checklist for validating AWS IAM policies before deployment: syntax, wildcards, resource ARNs, condition keys, and privilege escalation patterns.',
    image: iamPolicyImage,
    imageText: 'AWS IAM policy validation',
    link: '/insights/aws-iam-policy-validation/',
    categories: ['Security', 'Cloud'],
  },
  {
    title: 'DORA for Crypto and Web3 Companies: What You Need to Comply',
    date: '26/09/2026',
    description:
      'DORA applies to crypto-asset service providers since January 2025. The ICT risk, incident reporting, resilience testing, and vendor register requirements CASPs must implement.',
    image: doraCryptoImage,
    imageText: 'DORA compliance for crypto and Web3',
    link: '/insights/dora-crypto-web3-compliance/',
    categories: ['Compliance', 'Blockchain', 'Standards'],
  },
  {
    title: 'Building Cross-Border Payments on Stellar: Anchors, SEP-24, and USDC/EURC Settlement',
    date: '03/10/2026',
    description:
      'How Stellar cross-border payments work: anchors and the SEP stack (SEP-6, SEP-24, SEP-31, SEP-38), trustlines, path payments, and USDC/EURC settlement.',
    image: stellarPaymentsImage,
    imageText: 'Stellar cross-border payments network',
    link: '/insights/stellar-cross-border-payments-anchors-sep24/',
    categories: ['Payments', 'Blockchain', 'Standards'],
  },
  {
    title: 'ISO 27001 Statement of Applicability: How to Choose and Justify Annex A Controls',
    date: '03/10/2026',
    description:
      'What Clause 6.1.3 requires: selecting Annex A controls, justifying exclusions, and building a Statement of Applicability that survives a Stage 1 audit.',
    image: iso27001SoaImage,
    imageText: 'ISO 27001 Statement of Applicability checklist',
    link: '/insights/iso-27001-statement-of-applicability/',
    categories: ['Standards', 'Compliance', 'Security'],
  },
  {
    title: 'ISO/IEC 42001 Annex A Controls: The Complete List of 38 Controls Across 9 Domains',
    date: '03/10/2026',
    description:
      'Every ISO/IEC 42001:2023 Annex A control by reference and title, grouped by domain — plus how to select them in your AI Statement of Applicability.',
    image: iso42001AnnexAImage,
    imageText: 'ISO/IEC 42001 Annex A controls',
    link: '/insights/iso-42001-annex-a-controls/',
    categories: ['AI Governance', 'Standards', 'Compliance'],
  },
  {
    title: 'One Management System, Three Standards: Integrating ISO 9001, ISO 27001, and ISO 42001',
    date: '03/10/2026',
    description:
      'The Harmonized Structure shared by all three standards, where they diverge, and how to run quality, security, and AI governance on one integrated management system.',
    image: imsImage,
    imageText: 'Integrated management system gears',
    link: '/insights/integrated-management-system-iso-9001-27001-42001/',
    categories: ['Standards', 'Compliance'],
  },
  {
    title: 'ISO 8601 Date Formats Explained: Durations, Week Dates, Intervals, and the RFC 3339 Subset',
    date: '03/10/2026',
    description:
      'The anatomy of ISO 8601: calendar/ordinal/week dates, durations (PnYnMnDTnHnMnS), intervals, reduced precision, and how RFC 3339 differs.',
    image: iso8601Image,
    imageText: 'ISO 8601 date-time format',
    link: '/insights/iso-8601-format-guide/',
    categories: ['Standards', 'Developer'],
  },
  {
    title: 'How to Merge PDF Files for Free (No Acrobat, No Uploads)',
    date: '08/10/2026',
    description:
      'Combine PDFs into one document entirely in your browser — how merging works, page order, protected files, and why no-upload tools are the private option.',
    image: mergePdfImage,
    imageText: 'Merge PDF tool combining two PDF files',
    link: '/insights/how-to-merge-pdf-files/',
    categories: ['Tools', 'Developer'],
  },
  {
    title: 'MT940 Format Explained: Field Tags, Field 86, and the Migration to camt.053',
    date: '09/10/2026',
    description:
      'The SWIFT MT940 bank statement format decoded: every tag from :20: to :62F:, the :61: statement line, structured :86: remittance data, and how it all maps to ISO 20022 camt.053.',
    image: mt940Image,
    imageText: 'MT940 to CSV converter parsing statement entries',
    link: '/insights/mt940-format-camt053-migration/',
    categories: ['Payments', 'Standards'],
  },
  {
    title: 'eIDAS 2.0 and the EUDI Wallet: What Businesses Need to Know Before the Rollout',
    date: '09/10/2026',
    description:
      'The European Digital Identity Wallet is rolling out across member states. What it contains, which businesses must accept it, and how it builds on verifiable credentials and EBSI.',
    image: eudiWalletImage,
    imageText: 'European Digital Identity Wallet credential card',
    link: '/insights/eidas2-eudi-wallet/',
    categories: ['Compliance', 'Standards', 'Blockchain'],
  },
  {
    title: 'OData Query Options Cheat Sheet: $filter, $select, $expand, and $orderby',
    date: '09/10/2026',
    description:
      'A cheat sheet and practical guide to OData system query options: filter operators and functions, projections, navigation expansion, sorting, paging, V2 vs V4 syntax, and SAP Gateway specifics.',
    image: odataImage,
    imageText: 'SAP OData URL builder with generated query string',
    link: '/insights/odata-query-options-guide/',
    categories: ['Developer', 'Standards'],
  },
  {
    title: "How to Choose a CRM and Ticketing System: A Practical Buyer's Guide",
    date: '13/10/2026',
    description:
      'A framework for evaluating CRM and ticketing platforms: must-have capabilities, data model, CSV import and migration, GDPR, integrations, and pricing — plus a 10-point buyer checklist.',
    image: chooseCrmImage,
    imageText: 'Choosing a CRM and ticketing system',
    link: '/insights/how-to-choose-crm-ticketing-system/',
    categories: ['Tools', 'Business'],
  },
  {
    title: 'Helpdesk Workflow Best Practices: From Ticket Intake to Resolution',
    date: '13/10/2026',
    description:
      'Intake, triage, resolve, learn — a practical helpdesk workflow covering priority and SLA rules, ownership and escalation, automation, and the metrics that matter.',
    image: helpdeskWorkflowImage,
    imageText: 'Helpdesk workflow stages from intake to resolution',
    link: '/insights/helpdesk-workflow-best-practices/',
    categories: ['Business', 'Tools'],
  },
  {
    title: 'ISO 9001 Implementation: A Step-by-Step Guide to Certification',
    date: '16/10/2026',
    description:
      'Clauses 4–10, the seven quality management principles, and the Stage 1/Stage 2 audit process — a practical ISO 9001 implementation roadmap with a free readiness checker.',
    image: iso9001Image,
    imageText: 'ISO 9001 certification badge',
    link: '/insights/iso-9001-implementation-guide/',
    categories: ['Standards', 'Compliance', 'Business'],
  },
  {
    title: 'ISO/IEC 27001 Annex A Controls: The Complete List of 93 Controls',
    date: '16/10/2026',
    description:
      'Every ISO/IEC 27001:2022 Annex A control by reference and title across the 4 themes (Organizational, People, Physical, Technological) — plus how to select them in your Statement of Applicability.',
    image: iso27001AnnexAImage,
    imageText: 'ISO/IEC 27001 Annex A controls',
    link: '/insights/iso-27001-annex-a-controls/',
    categories: ['Standards', 'Compliance', 'Security'],
  },
  {
    title: 'SOC 2 Trust Services Criteria: The Complete List Explained',
    date: '16/10/2026',
    description:
      'All 52 AICPA Trust Services Criteria: the 33 Common Criteria (CC1–CC9) required in every SOC 2 report, plus the optional Availability, Processing Integrity, Confidentiality, and Privacy categories.',
    image: soc2TscImage,
    imageText: 'SOC 2 Trust Services Criteria checklist',
    link: '/insights/soc-2-trust-services-criteria/',
    categories: ['Compliance', 'Security', 'Standards'],
  },
  {
    title: 'SOC 2 vs ISO 27001: Differences, Overlap, and Which You Need',
    date: '16/10/2026',
    description:
      'Attestation vs certification, Trust Services Criteria vs Annex A, Type I/II vs 3-year cycle — a practical comparison for teams choosing (or combining) the two frameworks.',
    image: soc2VsIsoImage,
    imageText: 'SOC 2 vs ISO 27001 comparison',
    link: '/insights/soc-2-vs-iso-27001/',
    categories: ['Compliance', 'Security', 'Standards'],
  },
  {
    title: 'PDF Metadata Explained: What Your Files Reveal and How to Remove It',
    date: '18/10/2026',
    description:
      'The document info dictionary and XMP stream inside every PDF — what each field reveals, how to inspect and edit them, and how to strip metadata before sharing a file.',
    image: pdfMetadataImage,
    imageText: 'PDF metadata viewer showing document info fields',
    link: '/insights/pdf-metadata-guide/',
    categories: ['Tools', 'Security'],
  },
  {
    title: 'MT940 Fields Explained: The Complete Tag Reference (:20: to :62F:)',
    date: '20/10/2026',
    description:
      'Every MT940 tag by name and format — :60F:/:62F: balances, the :61: statement line anatomy, structured :86: SEPA remittance subfields, and the transaction code table.',
    image: mt940FieldsImage,
    imageText: 'MT940 field tag reference table',
    link: '/insights/mt940-field-reference/',
    categories: ['Payments', 'Standards'],
  },
  {
    title: 'OData $filter Examples: Operators, Functions, and 40+ Copy-Paste Queries',
    date: '20/10/2026',
    description:
      'A copy-pasteable OData $filter cookbook: every operator and function with real examples, collection filters with any/all, and the V2 vs V4 differences that break queries.',
    image: odataFilterImage,
    imageText: 'OData $filter query examples',
    link: '/insights/odata-filter-examples/',
    categories: ['Developer', 'Standards'],
  },
  {
    title: 'o1js State Assertions: getAndRequireEquals vs getAndAssertEquals',
    date: '20/10/2026',
    description:
      'How o1js state preconditions work on Mina zkApps, why the assert* API was renamed to require*, and what "precondition unsatisfied" actually means.',
    image: o1jsStateImage,
    imageText: 'o1js zkApp state assertion code',
    link: '/insights/o1js-state-assertions/',
    categories: ['Blockchain', 'Developer'],
  },
];

export const allInsightCategories = [
  'All',
  'Payments',
  'Standards',
  'AI Agents',
  'LLMs',
  'AI Governance',
  'Compliance',
  'Security',
  'Cloud',
  'Healthcare',
  'Blockchain',
  'Developer',
  'Tools',
  'Business',
  'Sustainability',
];

export function getRelatedInsights(currentLink, categories, count = 3) {
  return insightsPosts
    .filter((post) => post.link !== currentLink)
    .map((post) => ({
      ...post,
      matchCount: post.categories.filter((c) => categories.includes(c)).length,
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, count);
}
