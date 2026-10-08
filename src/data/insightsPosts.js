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

export const insightsPosts = [
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
];

export const allInsightCategories = [
  'All',
  'Payments',
  'Standards',
  'AI Governance',
  'Compliance',
  'Security',
  'Cloud',
  'Healthcare',
  'Blockchain',
  'Developer',
  'Tools',
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
