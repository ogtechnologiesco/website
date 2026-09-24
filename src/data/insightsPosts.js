import iso20022Image from '../images/insight-iso20022-payments.jpg';
import aiImage from '../images/insight-iso42001-ai.jpg';
import awsImage from '../images/insight-iam-security.jpg';
import hl7Image from '../images/insight-hl7-fhir.jpg';
import ethereumImage from '../images/insight-ethereum-calldata.jpg';

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
