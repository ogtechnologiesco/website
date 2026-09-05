const STANDARDS_DATABASE = [
  {
    id: 'eidas',
    name: 'eIDAS / European Digital Identity',
    category: 'Identity & Digital Identity',
    priority: 'critical',
    description: 'eIDAS is the EU regulation on electronic identification, authentication, and trust services. The updated eIDAS 2.0 introduces the European Digital Identity Wallet (EUDI), enabling cross-border digital identity across all EU member states.',
    recommendation: 'Implement eIDAS-compliant electronic signatures, seals, and trust services. If providing identity services in the EU, ensure interoperability with the EUDI Wallet architecture and conform to the eIDAS reference implementations.',
    triggers: (data) => data.jurisdiction?.includes('EU') && (data.useCase === 'Digital Identity' || data.identity !== 'None' || data.identity !== ''),
  },
  {
    id: 'w3c-vc',
    name: 'W3C Verifiable Credentials',
    category: 'Identity & Digital Identity',
    priority: 'critical',
    description: 'W3C Verifiable Credentials (VCs) provide a standard way to express credentials on the web in a cryptographically secure, privacy-respecting, and machine-verifiable format.',
    recommendation: 'Structure credentials using the W3C VC Data Model. Use LD-Proofs or JWT-VC for signing. Ensure verifier workflows follow the W3C VC presentation exchange patterns.',
    triggers: (data) => data.identity === 'W3C Verifiable Credentials' || data.useCase === 'Digital Identity',
  },
  {
    id: 'did-core',
    name: 'DID Core (W3C)',
    category: 'Identity & Digital Identity',
    priority: 'critical',
    description: 'W3C DID Core specification defines Decentralized Identifiers (DIDs) — a new type of identifier that enables verifiable, decentralized digital identity without relying on a centralized registry.',
    recommendation: 'Implement DIDs per the W3C DID Core spec. Choose a DID method appropriate for your blockchain (e.g., did:ebsi for EBSI, did:web for web-based, did:key for lightweight). Ensure DID resolution and dereferencing follow the spec.',
    triggers: (data) => data.identity === 'DIDs' || data.identity === 'Self-Sovereign Identity' || data.web3Protocols?.includes('DID'),
  },
  {
    id: 'iso-27001',
    name: 'ISO/IEC 27001',
    category: 'Information Security',
    priority: 'critical',
    description: 'ISO/IEC 27001 is the international standard for Information Security Management Systems (ISMS). It provides a systematic approach to managing sensitive company and customer information.',
    recommendation: 'Establish an ISMS covering risk assessment, security policies, access control, incident management, and continuous improvement. Pursue ISO 27001 certification to demonstrate compliance to enterprise clients.',
    triggers: (data) => ['Personal Data (PII)', 'Financial Data', 'Health Data', 'Credential Data'].some((d) => data.dataHandled?.includes(d)),
  },
  {
    id: 'iso-29115',
    name: 'ISO/IEC 29115',
    category: 'Identity & Digital Identity',
    priority: 'high',
    description: 'ISO/IEC 29115 provides a framework for identity management and assurance of entity authentication. It defines four levels of assurance (LoA) for digital identity.',
    recommendation: 'Map your authentication flows to the four LoA levels defined in ISO 29115. Ensure identity proofing, credential management, and federation meet the appropriate assurance level for your use case.',
    triggers: (data) => data.useCase === 'Digital Identity' || data.identity !== 'None' || data.identity !== '',
  },
  {
    id: 'gdpr',
    name: 'GDPR (General Data Protection Regulation)',
    category: 'Privacy & Data Protection',
    priority: 'critical',
    description: 'GDPR is the EU regulation on data protection and privacy. It governs the processing of personal data of EU residents, including rights to access, rectification, erasure, and data portability.',
    recommendation: 'Conduct a Data Protection Impact Assessment (DPIA). Implement data minimization, consent management, right-to-erasure workflows, and appoint a Data Protection Officer (DPO) if required. Ensure on-chain personal data is minimized or encrypted.',
    triggers: (data) => data.jurisdiction?.includes('EU') || data.targetMarket?.includes('EU/EEA') || data.dataHandled?.includes('Personal Data (PII)'),
  },
  {
    id: 'iso-20022',
    name: 'ISO 20022',
    category: 'Payments & Financial Messaging',
    priority: 'critical',
    description: 'ISO 20022 is the global standard for financial messaging. It provides a common platform for developing messages using a standardized methodology across all financial domains.',
    recommendation: 'Align payment message formats with ISO 20022 schemas. If bridging traditional and blockchain payments, implement ISO 20022-to-blockchain translation layers. Ensure CBDC and cross-border payment integrations follow the standard.',
    triggers: (data) => data.payments !== 'None' && data.payments !== '' || data.useCase === 'Payments/DeFi',
  },
  {
    id: 'ebsi',
    name: 'EBSI Compliance',
    category: 'Blockchain-Specific Standards',
    priority: 'high',
    description: 'The European Blockchain Services Infrastructure (EBSI) is the EU blockchain network for public services. EBSI compliance ensures interoperability with EU member state digital services.',
    recommendation: 'If targeting EU public sector use cases, ensure your solution is EBSI-compatible. Use EBSI DID methods, conform to EBSI verifiable credential schemas, and participate in EBSI use case ecosystems (diplomas, credentials, document traceability).',
    triggers: (data) => data.blockchainNetwork?.includes('EBSI') || (data.jurisdiction?.includes('EU') && data.useCase === 'Digital Identity'),
  },
  {
    id: 'dora',
    name: 'DORA (Digital Operational Resilience Act)',
    category: 'Regional Regulation',
    priority: 'critical',
    description: 'DORA is the EU regulation establishing uniform requirements for ICT operational resilience in the financial sector. It covers risk management, third-party oversight, incident reporting, and resilience testing.',
    recommendation: 'Implement ICT risk management frameworks, third-party risk assessments for blockchain providers, digital resilience testing programs, and incident reporting procedures. Ensure compliance by January 2025 deadline.',
    triggers: (data) => data.jurisdiction?.includes('EU') && (data.useCase === 'Payments/DeFi' || data.payments !== 'None' && data.payments !== ''),
  },
  {
    id: 'mica',
    name: 'MiCA (Markets in Crypto-Assets)',
    category: 'Regional Regulation',
    priority: 'critical',
    description: 'MiCA is the EU regulation for crypto-asset markets, covering issuers of asset-referenced tokens, e-money tokens, and crypto-asset service providers (CASPs). It establishes a harmonized framework across the EU.',
    recommendation: 'Determine your MiCA classification (CASP, issuer, or exempt). Prepare whitepapers, comply with prudential requirements, and implement consumer protection measures. Apply for authorization with the relevant national competent authority.',
    triggers: (data) => data.jurisdiction?.includes('EU') && (data.payments?.includes('Crypto') || data.payments?.includes('Stablecoins') || data.useCase === 'Tokenized Assets' || data.useCase === 'Payments/DeFi'),
  },
  {
    id: 'iso-27018',
    name: 'ISO/IEC 27018',
    category: 'Privacy & Data Protection',
    priority: 'high',
    description: 'ISO/IEC 27018 extends ISO 27001 with specific controls for protecting personally identifiable information (PII) in public clouds acting as PII processors.',
    recommendation: 'If using cloud infrastructure to process PII, implement ISO 27018 controls including data return/transfer policies, data deletion capabilities, and enhanced PII protection measures beyond baseline ISO 27001.',
    triggers: (data) => data.dataHandled?.includes('Personal Data (PII)') && data.jurisdiction?.includes('EU'),
  },
  {
    id: 'nist-800-53',
    name: 'NIST SP 800-53',
    category: 'Information Security',
    priority: 'high',
    description: 'NIST SP 800-53 provides a comprehensive catalog of security and privacy controls for federal information systems in the United States. Widely adopted as a security framework beyond government.',
    recommendation: 'Select and implement appropriate security control baselines (Low/Moderate/High). Map controls to your blockchain architecture, focusing on access control, audit logging, system integrity, and supply chain risk management.',
    triggers: (data) => data.jurisdiction?.includes('US') || data.targetMarket?.includes('US'),
  },
  {
    id: 'iso-22301',
    name: 'ISO 22301',
    category: 'Information Security',
    priority: 'medium',
    description: 'ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). It ensures organizations can continue operating during disruptions.',
    recommendation: 'Develop a business continuity plan addressing blockchain network outages, node failures, consensus disruptions, and key management emergencies. Define recovery time objectives (RTO) and recovery point objectives (RPO) for critical blockchain operations.',
    triggers: (data) => data.blockchainNetwork?.length > 0 && data.blockchainNetwork?.[0] !== '',
  },
  {
    id: 'jtc19',
    name: 'CEN/CENELEC JTC 19',
    category: 'Blockchain-Specific Standards',
    priority: 'high',
    description: 'CEN/CENELEC JTC 19 is the European Joint Technical Committee for Blockchain and Distributed Ledger Technologies. It develops European standards for blockchain interoperability, governance, and identity.',
    recommendation: 'Monitor and align with JTC 19 published standards (especially on identity, smart contracts, and governance). Participate in European standardization activities to influence emerging requirements.',
    triggers: (data) => data.jurisdiction?.includes('EU'),
  },
  {
    id: 'hyperledger',
    name: 'Hyperledger Compliance Frameworks',
    category: 'Blockchain-Specific Standards',
    priority: 'medium',
    description: 'Hyperledger Foundation provides compliance-oriented frameworks including Hyperledger Indy for identity, Hyperledger Aries for verifiable credential exchange, and Hyperledger Fabric for enterprise blockchain.',
    recommendation: 'If using Hyperledger, leverage Indy/Aries for W3C-compliant identity, implement Fabric MSP for identity management, and follow Hyperledger best practices for governance, privacy, and chaincode security.',
    triggers: (data) => data.blockchainNetwork?.includes('Hyperledger'),
  },
  {
    id: 'erc-standards',
    name: 'ERC Standards (ERC-20/721/1155)',
    category: 'Blockchain-Specific Standards',
    priority: 'high',
    description: 'Ethereum Request for Comments (ERC) standards define token interfaces on Ethereum and EVM-compatible chains. ERC-20 (fungible), ERC-721 (NFTs), and ERC-1155 (multi-token) are the most widely adopted.',
    recommendation: 'Ensure smart contracts strictly implement the required ERC interfaces. Use audited OpenZeppelin implementations as a baseline. Include metadata standards (ERC-721 metadata, ERC-1155 metadata URI) and follow security extensions like ERC-4626 for tokenized vaults.',
    triggers: (data) => data.blockchainNetwork?.includes('Ethereum') && (data.useCase === 'Tokenized Assets' || data.useCase === 'NFT/Creator' || data.useCase === 'Payments/DeFi'),
  },
  {
    id: 'fatf-travel-rule',
    name: 'FATF Travel Rule',
    category: 'Payments & Financial Messaging',
    priority: 'high',
    description: 'The FATF Travel Rule requires Virtual Asset Service Providers (VASPs) to transmit originator and beneficiary information alongside virtual asset transfers, similar to traditional financial institution requirements.',
    recommendation: 'Implement Travel Rule compliance solutions (e.g., TRP, Sygna Bridge). Establish VASP-to-VASP information exchange protocols. Conduct KYC/CDD on customers and maintain transaction monitoring capabilities.',
    triggers: (data) => (data.payments?.includes('Crypto') || data.payments?.includes('Stablecoins')) && (data.jurisdiction?.length > 1 || data.targetMarket?.length > 1),
  },
  {
    id: 'eprivacy',
    name: 'ePrivacy Directive',
    category: 'Privacy & Data Protection',
    priority: 'medium',
    description: 'The ePrivacy Directive governs electronic communications, including cookies, tracking technologies, and direct marketing in the EU. The upcoming ePrivacy Regulation will expand these requirements.',
    recommendation: 'Implement consent mechanisms for cookies and tracking technologies. Ensure end-to-end encryption for communications. Comply with rules on metadata processing and directory listings for blockchain communication layers.',
    triggers: (data) => data.jurisdiction?.includes('EU'),
  },
  {
    id: 'iso-27005',
    name: 'ISO/IEC 27005',
    category: 'Information Security',
    priority: 'medium',
    description: 'ISO/IEC 27005 provides guidelines for information security risk management. It supports ISO 27001 by defining a structured approach to identifying, analyzing, and treating security risks.',
    recommendation: 'Conduct systematic risk assessments covering blockchain-specific threats (51% attacks, smart contract vulnerabilities, key compromise, oracle manipulation). Document risk treatment plans and maintain risk registers.',
    triggers: (data) => ['Personal Data (PII)', 'Financial Data', 'Health Data', 'Credential Data'].some((d) => data.dataHandled?.includes(d)),
  },
  {
    id: 'data-act',
    name: 'EU Data Act',
    category: 'Regional Regulation',
    priority: 'medium',
    description: 'The EU Data Act regulates access to and use of data generated by connected products and related services. It impacts blockchain-based data marketplaces and IoT data sharing.',
    recommendation: 'If operating a data marketplace or processing IoT-generated data on blockchain, ensure compliance with Data Act provisions on data access, sharing, and portability. Implement smart contract-based data access controls.',
    triggers: (data) => data.jurisdiction?.includes('EU') && (data.useCase === 'Data Marketplace' || data.useCase === 'Supply Chain'),
  },
  {
    id: 'w3c-did-resolution',
    name: 'W3C DID Resolution',
    category: 'Identity & Digital Identity',
    priority: 'medium',
    description: 'W3C DID Resolution defines how DIDs are resolved into DID Documents. It specifies the resolution interface, dereferencing process, and metadata structures.',
    recommendation: 'Implement DID resolution according to the W3C specification. Support universal resolvers where possible. Cache DID Documents appropriately and handle resolution failures gracefully in production systems.',
    triggers: (data) => data.identity === 'DIDs' || data.identity === 'Self-Sovereign Identity' || data.web3Protocols?.includes('DID'),
  },
  {
    id: 'ccpa',
    name: 'CCPA / CPRA',
    category: 'Privacy & Data Protection',
    priority: 'high',
    description: 'The California Consumer Privacy Act (CCPA), enhanced by the CPRA, grants California residents rights over their personal data including knowledge, deletion, and opt-out of sale/sharing.',
    recommendation: 'Implement consumer rights workflows (access, deletion, opt-out). Provide clear privacy notices. If handling data of California residents, ensure data mapping and inventory covers on-chain and off-chain personal data.',
    triggers: (data) => data.jurisdiction?.includes('US') || data.targetMarket?.includes('US'),
  },
  {
    id: 'uk-gdpr',
    name: 'UK GDPR / Data Protection Act 2018',
    category: 'Privacy & Data Protection',
    priority: 'high',
    description: 'UK GDPR is the UK version of GDPR, maintained post-Brexit alongside the Data Protection Act 2018. It governs personal data processing in the UK with requirements closely mirroring EU GDPR.',
    recommendation: 'If processing data of UK residents, comply with UK GDPR independently from EU GDPR. Appoint a UK representative if needed. Implement International Data Transfer Agreement (IDTA) for UK-to-international transfers.',
    triggers: (data) => data.jurisdiction?.includes('UK') || data.targetMarket?.includes('UK'),
  },
  {
    id: 'iso-14652',
    name: 'ISO 20022 Crypto Extension',
    category: 'Payments & Financial Messaging',
    priority: 'medium',
    description: 'Emerging extensions to ISO 20022 for crypto and digital asset messaging, enabling interoperability between traditional financial messaging and blockchain-based payment systems.',
    recommendation: 'Monitor ISO 20022 crypto extension developments. If building payment bridges, design message translation layers that can accommodate future ISO 20022 digital asset extensions.',
    triggers: (data) => data.payments?.includes('ISO 20022 Integration') || (data.payments !== 'None' && data.payments !== '' && data.useCase === 'Payments/DeFi'),
  },
];

const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, info: 3 };
const PRIORITY_SCORE = { critical: 25, high: 15, medium: 8, info: 3 };

const CATEGORY_ORDER = [
  'Identity & Digital Identity',
  'Privacy & Data Protection',
  'Information Security',
  'Payments & Financial Messaging',
  'Blockchain-Specific Standards',
  'Regional Regulation',
];

export function evaluateCompliance(formData) {
  const matched = STANDARDS_DATABASE.filter((standard) => {
    try {
      return standard.triggers(formData);
    } catch {
      return false;
    }
  });

  const sorted = matched.sort((a, b) => {
    const pDiff = (PRIORITY_ORDER[a.priority] || 3) - (PRIORITY_ORDER[b.priority] || 3);
    if (pDiff !== 0) return pDiff;
    return a.name.localeCompare(b.name);
  });

  const grouped = sorted.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  const criticalCount = sorted.filter((s) => s.priority === 'critical').length;
  const highCount = sorted.filter((s) => s.priority === 'high').length;
  const maxPossibleScore = STANDARDS_DATABASE.length * 25;
  const achievedScore = sorted.reduce((sum, s) => sum + (PRIORITY_SCORE[s.priority] || 0), 0);
  const readinessScore = Math.min(100, Math.round((achievedScore / Math.max(maxPossibleScore * 0.3, 1)) * 100));

  const grade = readinessScore >= 80 ? 'A' : readinessScore >= 60 ? 'B' : readinessScore >= 40 ? 'C' : readinessScore >= 20 ? 'D' : 'E';

  return {
    matchedStandards: sorted,
    grouped,
    sortedCategories,
    summary: {
      total: sorted.length,
      critical: criticalCount,
      high: highCount,
      readinessScore,
      grade,
    },
  };
}
