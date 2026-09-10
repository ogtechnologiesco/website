const QUESTIONS = [
  // Clause 4 — Context of the Organization
  {
    id: 'clause-4',
    section: 'Clauses 4–10',
    clause: 'Clause 4: Context of the Organization',
    question: 'Have you defined the scope of your Information Security Management System (ISMS) and identified internal/external issues and interested parties?',
    weight: 2,
    remediation: 'Document the ISMS scope, identify relevant internal and external issues (regulatory, technological, cultural), and determine requirements of interested parties (customers, regulators, employees).',
  },
  // Clause 5 — Leadership
  {
    id: 'clause-5',
    section: 'Clauses 4–10',
    clause: 'Clause 5: Leadership',
    question: 'Does top management demonstrate commitment to information security, establish a security policy, and assign ISMS roles and responsibilities?',
    weight: 2,
    remediation: 'Obtain visible top-management commitment, publish an information security policy, and assign clear roles and responsibilities for the ISMS.',
  },
  // Clause 6 — Planning
  {
    id: 'clause-6',
    section: 'Clauses 4–10',
    clause: 'Clause 6: Planning',
    question: 'Have you conducted an information security risk assessment and established a risk treatment plan with measurable security objectives?',
    weight: 2,
    remediation: 'Perform a systematic risk assessment, define risk acceptance criteria, create a risk treatment plan, and set measurable information security objectives.',
  },
  // Clause 7 — Support
  {
    id: 'clause-7',
    section: 'Clauses 4–10',
    clause: 'Clause 7: Support',
    question: 'Do you provide adequate resources, competence training, awareness programs, and documented information for the ISMS?',
    weight: 1,
    remediation: 'Allocate sufficient resources, ensure staff competence through training, run security awareness programs, and maintain required documented information.',
  },
  // Clause 8 — Operation
  {
    id: 'clause-8',
    section: 'Clauses 4–10',
    clause: 'Clause 8: Operation',
    question: 'Do you operationalize risk assessment, risk treatment, and control implementation as planned?',
    weight: 2,
    remediation: 'Execute the risk assessment and treatment processes operationally, implement controls per the Statement of Applicability, and keep evidence of operation.',
  },
  // Clause 9 — Performance Evaluation
  {
    id: 'clause-9',
    section: 'Clauses 4–10',
    clause: 'Clause 9: Performance Evaluation',
    question: 'Do you monitor, measure, analyze, and evaluate ISMS performance, including internal audits and management reviews?',
    weight: 2,
    remediation: 'Define and track KPIs/KRIs for the ISMS, conduct periodic internal audits, and hold management reviews to evaluate effectiveness.',
  },
  // Clause 10 — Improvement
  {
    id: 'clause-10',
    section: 'Clauses 4–10',
    clause: 'Clause 10: Improvement',
    question: 'Do you identify nonconformities, take corrective actions, and drive continual improvement of the ISMS?',
    weight: 1,
    remediation: 'Establish a nonconformity and corrective action process, and demonstrate continual improvement through periodic updates to controls, policies, and processes.',
  },

  // Annex A — Organizational (37 controls summarized)
  {
    id: 'org-policies',
    section: 'Annex A — Organizational',
    clause: 'A.5 Organizational policies',
    question: 'Do you have documented information security policies approved by management and communicated to all relevant personnel?',
    weight: 2,
    remediation: 'Create a topic-specific information security policy covering acceptable use, access control, cryptography, physical security, and more. Review at least annually.',
  },
  {
    id: 'org-roles',
    section: 'Annex A — Organizational',
    clause: 'A.6 Roles and responsibilities',
    question: 'Are information security roles and responsibilities defined, assigned, and segregated where required?',
    weight: 1,
    remediation: 'Define and assign security roles. Segregate duties where conflicting responsibilities exist (e.g., development vs. production access).',
  },
  {
    id: 'org-asset-mgmt',
    section: 'Annex A — Organizational',
    clause: 'A.5 Asset management',
    question: 'Do you maintain an inventory of information assets with assigned ownership and classification?',
    weight: 2,
    remediation: 'Build an asset inventory covering hardware, software, data, and services. Assign owners and classify assets by sensitivity.',
  },
  {
    id: 'org-supplier',
    section: 'Annex A — Organizational',
    clause: 'A.5 Supplier relationships',
    question: 'Do you assess and manage information security risks in supplier relationships, including contractual security requirements?',
    weight: 1,
    remediation: 'Establish supplier security policies, assess supplier risks, and include security clauses in contracts. Monitor supplier compliance periodically.',
  },
  {
    id: 'org-incident',
    section: 'Annex A — Organizational',
    clause: 'A.5 Incident management',
    question: 'Do you have a documented incident response process with defined roles, reporting channels, and lessons-learned procedures?',
    weight: 2,
    remediation: 'Create an incident response plan, define severity levels, establish reporting channels, and conduct post-incident reviews to capture lessons learned.',
  },
  {
    id: 'org-continuity',
    section: 'Annex A — Organizational',
    clause: 'A.5 Business continuity',
    question: 'Do you have information security continuity plans and redundancy for critical operations?',
    weight: 1,
    remediation: 'Integrate information security into business continuity plans. Ensure redundancy for critical systems and test continuity arrangements regularly.',
  },
  {
    id: 'org-compliance',
    section: 'Annex A — Organizational',
    clause: 'A.5 Compliance',
    question: 'Do you identify and comply with applicable legal, statutory, regulatory, and contractual requirements related to information security?',
    weight: 1,
    remediation: 'Maintain a register of applicable legal and contractual requirements. Assign responsibility for compliance monitoring and review periodically.',
  },
  {
    id: 'org-threat-intel',
    section: 'Annex A — Organizational',
    clause: 'A.5 Threat intelligence',
    question: 'Do you collect and use threat intelligence to inform your security controls and risk assessments?',
    weight: 1,
    remediation: 'Subscribe to threat intelligence feeds, integrate findings into risk assessments, and use them to update controls and detection capabilities.',
  },

  // Annex A — People (8 controls)
  {
    id: 'people-screening',
    section: 'Annex A — People',
    clause: 'A.6 Personnel screening',
    question: 'Do you conduct background verification checks on all new employees and contractors with access to sensitive information?',
    weight: 1,
    remediation: 'Implement background checks proportional to the sensitivity of the role. Verify education, employment history, and criminal records where legally permitted.',
  },
  {
    id: 'people-awareness',
    section: 'Annex A — People',
    clause: 'A.6 Security awareness',
    question: 'Do you provide ongoing security awareness training and test employee understanding (e.g., phishing simulations)?',
    weight: 2,
    remediation: 'Deliver regular security awareness training, conduct phishing simulations, and track completion rates. Tailor training to role-specific risks.',
  },
  {
    id: 'people-terms',
    section: 'Annex A — People',
    clause: 'A.6 Terms and conditions of employment',
    question: 'Do employment contracts and agreements include information security responsibilities and post-employment obligations?',
    weight: 1,
    remediation: 'Include confidentiality, acceptable use, and post-employment obligations in contracts. Ensure return of assets upon termination.',
  },

  // Annex A — Physical (14 controls)
  {
    id: 'physical-access',
    section: 'Annex A — Physical',
    clause: 'A.7 Physical access',
    question: 'Do you control physical access to offices, rooms, and facilities using badges, logs, and entry restrictions?',
    weight: 1,
    remediation: 'Implement badge-based access control, visitor logging, and restrict access to sensitive areas (server rooms, data centers).',
  },
  {
    id: 'physical-clear-desk',
    section: 'Annex A — Physical',
    clause: 'A.7 Clear desk and screen',
    question: 'Do you enforce clear desk and clear screen policies (auto-lock, secure document storage)?',
    weight: 1,
    remediation: 'Enforce auto-lock on workstations, provide lockable storage for sensitive documents, and implement a clean-desk policy.',
  },
  {
    id: 'physical-equipment',
    section: 'Annex A — Physical',
    clause: 'A.7 Equipment protection',
    question: 'Is IT equipment physically protected against damage, theft, and environmental threats (fire, water, power)?',
    weight: 1,
    remediation: 'Protect equipment with surge protectors, UPS, environmental monitoring, and secure placement away from public access.',
  },
  {
    id: 'physical-disposal',
    section: 'Annex A — Physical',
    clause: 'A.7 Secure disposal',
    question: 'Do you securely dispose of physical media and equipment (wiping, degaussing, destruction certificates)?',
    weight: 1,
    remediation: 'Establish a secure disposal process with certified data destruction, maintain disposal logs, and use approved vendors.',
  },

  // Annex A — Technological (34 controls)
  {
    id: 'tech-access-control',
    section: 'Annex A — Technological',
    clause: 'A.8 Access control',
    question: 'Do you enforce least-privilege access control with unique user IDs, periodic reviews, and MFA on critical systems?',
    weight: 2,
    remediation: 'Implement unique user accounts, enforce least privilege, require MFA on remote and critical systems, and review access rights quarterly.',
  },
  {
    id: 'tech-crypto',
    section: 'Annex A — Technological',
    clause: 'A.8 Cryptography',
    question: 'Do you use strong encryption for data at rest and in transit, with a documented key management process?',
    weight: 2,
    remediation: 'Encrypt sensitive data at rest (AES-256) and in transit (TLS 1.2+). Establish a key management policy covering generation, storage, rotation, and destruction.',
  },
  {
    id: 'tech-network',
    section: 'Annex A — Technological',
    clause: 'A.8 Network security',
    question: 'Do you segment networks, apply firewalls, and monitor network traffic for anomalies?',
    weight: 2,
    remediation: 'Implement network segmentation, deploy firewalls between zones, and use IDS/IPS or SIEM for traffic monitoring and anomaly detection.',
  },
  {
    id: 'tech-logging',
    section: 'Annex A — Technological',
    clause: 'A.8 Logging and monitoring',
    question: 'Do you centrally collect, protect, and review logs from critical systems, with alerting on suspicious activity?',
    weight: 2,
    remediation: 'Forward logs from critical systems to a central SIEM, protect log integrity, define alerting rules, and establish a review cadence.',
  },
  {
    id: 'tech-vuln',
    section: 'Annex A — Technological',
    clause: 'A.8 Vulnerability management',
    question: 'Do you regularly scan for vulnerabilities, apply patches, and track remediation timelines?',
    weight: 2,
    remediation: 'Run vulnerability scans at least monthly, establish patch management SLAs (critical: 7 days, high: 30 days), and track remediation in a register.',
  },
  {
    id: 'tech-backup',
    section: 'Annex A — Technological',
    clause: 'A.8 Backup and recovery',
    question: 'Do you maintain encrypted, tested backups with defined RTO/RPO and off-site or cloud storage?',
    weight: 2,
    remediation: 'Implement automated encrypted backups, store copies off-site or in immutable cloud storage, and test restoration at least quarterly.',
  },
  {
    id: 'tech-secure-dev',
    section: 'Annex A — Technological',
    clause: 'A.8 Secure development',
    question: 'Do you integrate security into the SDLC (code review, SAST/DAST, dependency scanning)?',
    weight: 1,
    remediation: 'Integrate SAST/DAST into CI/CD pipelines, conduct peer code reviews, scan dependencies for known vulnerabilities, and train developers on secure coding.',
  },
  {
    id: 'tech-endpoint',
    section: 'Annex A — Technological',
    clause: 'A.8 Endpoint protection',
    question: 'Do you deploy endpoint protection (EDR/AV), enforce mobile device management, and harden configurations?',
    weight: 1,
    remediation: 'Deploy EDR/AV on all endpoints, enforce MDM for mobile devices, and apply hardened configuration baselines (CIS Benchmarks or equivalent).',
  },
];

const SCORE_MAP = { yes: 2, partial: 1, no: 0, na: 0 };
const STATUS_LABELS = { yes: 'Implemented', partial: 'Partially Implemented', no: 'Not Implemented', na: 'Not Applicable' };

export function evaluateAssessment(answers) {
  const sections = {};
  let totalScore = 0;
  let maxScore = 0;
  const gaps = [];

  for (const q of QUESTIONS) {
    const answer = answers[q.id] || 'no';
    const score = SCORE_MAP[answer] ?? 0;
    const maxQ = q.weight * 2;

    if (!sections[q.section]) {
      sections[q.section] = { score: 0, max: 0, gaps: 0, partials: 0 };
    }
    sections[q.section].score += score * q.weight;
    sections[q.section].max += maxQ;

    totalScore += score * q.weight;
    maxScore += maxQ;

    if (answer === 'no') {
      sections[q.section].gaps += 1;
      gaps.push({ ...q, status: 'critical', answer, remediation: q.remediation });
    } else if (answer === 'partial') {
      sections[q.section].partials += 1;
      gaps.push({ ...q, status: 'warning', answer, remediation: q.remediation });
    }
  }

  const readinessScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const grade = readinessScore >= 80 ? 'A' : readinessScore >= 60 ? 'B' : readinessScore >= 40 ? 'C' : readinessScore >= 20 ? 'D' : 'E';

  const criticalGaps = gaps.filter((g) => g.status === 'critical').length;
  const partialGaps = gaps.filter((g) => g.status === 'warning').length;
  const weeksToReady = Math.max(4, criticalGaps * 3 + partialGaps + 4);

  const sectionScores = Object.entries(sections).map(([name, data]) => ({
    name,
    score: data.score,
    max: data.max,
    percentage: data.max > 0 ? Math.round((data.score / data.max) * 100) : 0,
    gaps: data.gaps,
    partials: data.partials,
  }));

  return {
    questions: QUESTIONS,
    sections: sectionScores,
    gaps: gaps.sort((a, b) => {
      const order = { critical: 0, warning: 1 };
      return (order[a.status] ?? 2) - (order[b.status] ?? 2);
    }),
    summary: {
      readinessScore,
      grade,
      totalQuestions: QUESTIONS.length,
      criticalGaps,
      partialGaps,
      implemented: QUESTIONS.length - criticalGaps - partialGaps,
      weeksToReady,
    },
  };
}

export { QUESTIONS, STATUS_LABELS };
