import { blogPosts } from './blogPosts';
import { insightsPosts } from './insightsPosts';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from './glossaryTerms';
import { PRODUCTS } from './products';

export const searchIndex = [
  { title: 'Home', description: 'OG Technologies EU - IT consulting for Web3, blockchain, and enterprise solutions', path: '/' },
  { title: 'Products', description: 'Our software products and platforms including EduNode and Mozart Pay', path: '/products/' },
  { title: 'Pricing', description: 'Pricing plans for IT consulting and software development services', path: '/pricing/' },
  { title: 'Standards', description: 'Blockchain and IT standards consulting - ISO, CEN, EBSI', path: '/standards/' },
  { title: 'DORA Compliance', description: 'Digital Operational Resilience Act compliance consulting', path: '/dora/' },
  { title: 'Blog', description: 'Insights on Web3, blockchain standards, verifiable credentials, and digital payments', path: '/blog/' },
  { title: 'Insights', description: 'Industry articles on payment standards, AI governance, cloud security, healthcare interoperability, and blockchain development', path: '/insights/' },
  { title: 'Ventures', description: 'Supporting startups, spin-offs, and intrapreneurship programs', path: '/ventures/' },
  { title: 'About Us', description: 'Vienna-based IT consultancy — payment infrastructure, DLT, digital identity, and international standards', path: '/about/' },
  { title: 'Portfolio', description: 'Innovative projects including EduNode, Mozart Pay, and Stellar Go CLI', path: '/portfolio/' },
  { title: 'EduNode', description: 'Educational platform for STEM, Web3, and AI — grant-funded by the Stellar Development Foundation', path: '/portfolio/edunode/' },
  { title: 'Mozart Pay', description: 'Stellar-based payment platform with Circle USDC/EURC for cross-border payments', path: '/portfolio/mozart-pay/' },
  { title: 'Stellar Go CLI', description: 'Open-source Go CLI for Stellar — wallets, payments, SEP-41, DIDs/Verifiable Credentials, ISO 20022 reporting, Soroban RPC, MCP server', path: '/portfolio/stellar-go-cli/' },
  { title: 'Careers', description: 'Join OG Technologies EU - jobs in Web3, blockchain, and enterprise IT', path: '/careers/' },
  { title: 'Partner Program', description: 'Revenue share partnerships for consultants, MSPs, and agencies - referral, reseller, and co-delivery models', path: '/partners/' },
  { title: 'Expert Hub', description: 'Freelance and contract projects for independent developers and consultants — open projects board and application', path: '/expert-hub/' },
  { title: 'Publications', description: 'Blockchain standardization reports on cross-border payments — BlockStand expert deliverables', path: '/publications/' },
  { title: 'Request a Quote', description: 'Get a customized quote for IT consulting services', path: '/quote/' },
  { title: 'Helpdesk', description: 'IT helpdesk and support services', path: '/helpdesk/' },
  { title: 'Terms and Conditions', description: 'Terms for using OG Technologies EU website and services', path: '/terms/' },
  { title: 'Privacy Policy', description: 'How we collect, use, and protect your personal information', path: '/privacy/' },
  { title: 'Cookie Policy', description: 'Types of cookies we use and GDPR compliance', path: '/cookie-policy/' },
  { title: 'Imprint', description: 'Legal imprint for OG Technologies EU, Vienna, Austria', path: '/imprint/' },
  { title: 'Security Hall of Fame', description: 'Recognizing security researchers who responsibly disclose vulnerabilities — how to report security issues', path: '/security-hall-of-fame/' },
  { title: 'Glossary', description: 'Plain-language definitions of the standards, regulations, and technologies our clients work with', path: '/glossary/' },
  // Tools
  { title: 'All Tools', description: 'Index of all free browser-based tools and utilities', path: '/tools/' },
  { title: 'HTML to Image', description: 'Convert HTML content to images', path: '/tools/html-to-image/' },
  { title: 'Screenshot to Image', description: 'Capture screenshots of web pages', path: '/tools/screenshot-to-image/' },
  { title: 'PDF Tools', description: 'PDF manipulation and conversion utilities', path: '/tools/pdf-tools/' },
  { title: 'PDF Metadata Editor', description: 'View, edit, and remove PDF metadata — title, author, keywords, timestamps', path: '/tools/pdf-metadata/' },
  { title: 'Merge PDF', description: 'Combine multiple PDF files into one document', path: '/tools/merge-pdf/' },
  { title: 'Split PDF', description: 'Extract pages or page ranges from a PDF', path: '/tools/split-pdf/' },
  { title: 'Image to PDF', description: 'Convert PNG/JPG images to a PDF document', path: '/tools/image-to-pdf/' },
  { title: 'Document to PDF', description: 'Convert DOCX/ODT/TXT documents to PDF', path: '/tools/document-to-pdf/' },
  { title: 'PDF to Word', description: 'Convert PDF to DOCX, TXT, or HTML', path: '/tools/pdf-to-word/' },
  { title: 'Security Scanner', description: 'Scan websites for security vulnerabilities', path: '/tools/security-tools/' },
  { title: 'Blockchain Compliance Checker', description: 'Check blockchain smart contracts for compliance', path: '/tools/blockchain-compliance-checker/' },
  { title: 'ISO 27001 Gap Analysis', description: 'Free ISO/IEC 27001:2022 gap analysis tool — assess your ISMS readiness', path: '/tools/iso-27001-gap-analysis/' },
  { title: 'ISO 9001 Readiness Checker', description: 'Free ISO 9001:2015 readiness checker — assess your QMS', path: '/tools/iso-9001-readiness-checker/' },
  { title: 'ISO 42001 AI Readiness', description: 'Free ISO/IEC 42001:2023 AI readiness assessment — evaluate your AIMS', path: '/tools/iso-42001-ai-readiness/' },
  { title: 'SOC 2 Readiness Checker', description: 'Free SOC 2 readiness assessment against the AICPA Trust Services Criteria — Security, Availability, Processing Integrity, Confidentiality, Privacy', path: '/tools/soc-2-readiness-checker/' },
  { title: 'ISO 8601 Date Validator', description: 'Free ISO 8601 / RFC 3339 date validator — validate date strings in bulk', path: '/tools/iso-8601-validator/' },
  { title: 'Ethereum Developer Toolkit', description: 'Free Ethereum tools: Wei/Gwei/ETH converter, Keccak256 hash, function selector, ABI encoder, EIP-55 address checksum', path: '/tools/ethereum-toolkit/' },
  { title: 'Wei Converter', description: 'Convert Wei, Gwei, Finney, and Ether units', path: '/tools/wei-converter/' },
  { title: 'Keccak256 Hash', description: 'Compute Ethereum Keccak-256 hashes', path: '/tools/keccak256-hash/' },
  { title: 'Function Selector', description: 'Calculate 4-byte Solidity function selectors', path: '/tools/function-selector/' },
  { title: 'Event Topic Calculator', description: 'Compute Ethereum event signature hashes (topics[0]) for log filtering — handles full declarations and bulk lists', path: '/tools/event-topic-hash/' },
  { title: 'ABI Encoder', description: 'Encode and decode Ethereum ABI calldata', path: '/tools/abi-encoder/' },
  { title: 'Address Checksum', description: 'Validate EIP-55 checksummed Ethereum addresses', path: '/tools/address-checksum/' },
  { title: 'AWS ARN Parser', description: 'Parse AWS ARN strings into components or build valid ARNs from fields', path: '/tools/aws-arn-parser/' },
  { title: 'IAM Policy Validator', description: 'Validate AWS IAM policies — flag wildcards, privilege escalation, NotAction traps, public principals', path: '/tools/iam-policy-validator/' },
  { title: 'SAP OData URL Builder', description: 'Build SAP OData query URLs with $select, $expand, $filter, $orderby, $top, $skip', path: '/tools/sap-odata-url-builder/' },
  { title: 'ServiceNow Encoded Query Builder', description: 'Build and decode ServiceNow encoded queries — ^, ^OR, ^NQ joiners — generates sysparm_query URLs and GlideRecord scripts', path: '/tools/servicenow-query-builder/' },
  { title: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, Keccak-256, Keccak-512, SHAKE-128, SHAKE-256 hashes online', path: '/tools/hash-generator/' },
  { title: 'IBAN Validator', description: 'Validate IBANs — MOD-97 checksum, BBAN structure, SEPA reachability', path: '/tools/iban-validator/' },
  { title: 'BIC / SWIFT Validator', description: 'Decode BIC/SWIFT codes per ISO 9362 — institution, country, branch', path: '/tools/bic-validator/' },
  { title: 'LEI Validator', description: 'Validate Legal Entity Identifiers per ISO 17442 with MOD 97-10 check digits', path: '/tools/lei-validator/' },
  { title: 'ISO 20022 Viewer', description: 'Parse pain.001, camt.053, pacs.008 messages with consistency checks', path: '/tools/iso-20022-viewer/' },
  { title: 'SEPA XML Validator', description: 'Validate pain.001, pain.008, camt.053 files — SEPA rulebook checks, IBAN/BIC validation', path: '/tools/sepa-xml-validator/' },
  { title: 'SEPA XML Generator', description: 'Generate pain.001 credit transfer and pain.008 direct debit XML from a CSV of payments', path: '/tools/sepa-xml-generator/' },
  { title: 'MT940 to CSV', description: 'Convert SWIFT MT940 bank statements to CSV for Excel', path: '/tools/mt940-to-csv/' },
  { title: 'MT940 to camt.053', description: 'Convert MT940 statements to ISO 20022 camt.053.001.02 XML', path: '/tools/mt940-to-camt053/' },
  { title: 'HL7 v2 Message Parser', description: 'Parse HL7 v2.x messages — segment, field, component breakdown with labels', path: '/tools/hl7-parser/' },
  { title: 'FHIR Resource Viewer', description: 'Validate and inspect FHIR R4 JSON resources', path: '/tools/fhir-validator/' },
  { title: 'TLE Parser', description: 'Decode NORAD two-line element sets into orbital elements', path: '/tools/tle-parser/' },
  { title: 'TLE to JSON/CSV', description: 'Convert TLE/3LE satellite files to OMM/GP JSON or CSV', path: '/tools/tle-converter/' },
  { title: 'SCORM Package Validator', description: 'Validate SCORM/xAPI/cmi5 packages before LMS upload', path: '/tools/scorm-validator/' },
  { title: 'xAPI Statement Builder & Validator', description: 'Build and validate xAPI (Tin Can) statements — actors, verbs, objects, results, context', path: '/tools/xapi-statement-builder/' },
  { title: 'ISO 27001 Gap Analysis Template', description: 'Free Excel & PDF gap analysis template — clauses 4–10 plus all 93 Annex A controls', path: '/insights/iso-27001-gap-analysis-template/' },
  { title: 'GS1 Barcode / AI Parser', description: 'Decode GS1-128, DataMatrix, QR element strings — GTIN, SSCC, batch, serial, dates, GLN', path: '/tools/gs1-barcode-parser/' },
  { title: 'GEO & SEO Checker', description: 'Audit any website — SEO fundamentals, llms.txt, AI crawler rules, structured data, DMARC, security headers', path: '/tools/geo-checker/' },
  { title: 'GTIN / UPC / EAN Validator', description: 'GS1 check digit validation, format detection, country prefix lookup', path: '/tools/gtin-validator/' },
  { title: 'Phone Number Formatter', description: 'E.164, international, national phone formats — single or bulk', path: '/tools/phone-formatter/' },
  { title: 'vCard Generator', description: 'Create and parse .vcf contact files (v3.0/4.0)', path: '/tools/vcard-generator/' },
  { title: 'Email List Validator', description: 'Bulk email syntax check, dedupe, disposable-domain flagging', path: '/tools/email-validator/' },
  { title: 'CSV Deduplicator', description: 'Remove duplicate rows by key columns before CRM import', path: '/tools/csv-deduplicator/' },
  { title: 'Word Counter', description: 'Count words, characters, sentences, paragraphs, and spaces — with reading time and keyword density', path: '/tools/word-counter/' },
  { title: 'XML Tools', description: 'Index of XML utilities: formatter, validator, XSD schema check, JSON/CSV converters, XPath tester', path: '/tools/xml-tools/' },
  { title: 'XML Formatter', description: 'Beautify and pretty-print XML with configurable indentation — 100% client-side', path: '/tools/xml-formatter/' },
  { title: 'XML Validator', description: 'Check XML well-formedness with line/column error reporting', path: '/tools/xml-validator/' },
  { title: 'XSD Validator', description: 'Validate XML against XSD schemas — structure, cardinality, types', path: '/tools/xsd-validator/' },
  { title: 'XML to JSON', description: 'Convert XML to JSON with the @-prefix attribute convention', path: '/tools/xml-to-json/' },
  { title: 'XML Minifier', description: 'Compress XML by removing unnecessary whitespace', path: '/tools/xml-minifier/' },
  { title: 'XPath Tester', description: 'Evaluate XPath 1.0 expressions against XML documents live', path: '/tools/xpath-tester/' },
  { title: 'XML to CSV', description: 'Convert XML to CSV with automatic record detection', path: '/tools/xml-to-csv/' },
  // Product pages
  ...PRODUCTS.map((p) => ({
    title: p.name,
    description: p.tagline,
    path: `/products/${p.slug}/`,
  })),
  // Glossary terms
  ...GLOSSARY_TERMS.map((t) => ({
    title: t.term,
    description: t.definition,
    path: `/glossary/${t.slug}/`,
    categories: [(GLOSSARY_CATEGORIES.find((c) => c.id === t.category) || {}).name || ''],
  })),
  // Blog posts
  ...blogPosts.map((post) => ({
    title: post.title,
    description: post.description,
    path: post.link,
    categories: post.categories,
  })),
  // Insights articles
  ...insightsPosts.map((post) => ({
    title: post.title,
    description: post.description,
    path: post.link,
    categories: post.categories,
  })),
];

export function search(query, limit = 8) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  return searchIndex
    .map((item) => {
      const titleLower = item.title.toLowerCase();
      const descLower = (item.description || '').toLowerCase();
      const catsLower = (item.categories || []).join(' ').toLowerCase();

      let score = 0;
      terms.forEach((term) => {
        if (titleLower.includes(term)) score += 3;
        if (descLower.includes(term)) score += 2;
        if (catsLower.includes(term)) score += 2;
        if (titleLower.startsWith(term)) score += 2;
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
