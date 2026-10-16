const QUESTIONS = [
  // CC1 — Control Environment
  {
    id: 'cc1-oversight',
    section: 'Common Criteria (Security)',
    clause: 'CC1 Control Environment',
    question: 'Does leadership demonstrate commitment to security — with defined security roles, an approved policy set, and clear accountability (including board or executive oversight)?',
    weight: 2,
    remediation: 'Establish board/executive oversight of security, assign an accountable security owner, publish an approved security policy, and communicate security responsibilities to all personnel.',
  },
  {
    id: 'cc1-personnel',
    section: 'Common Criteria (Security)',
    clause: 'CC1 Personnel Practices',
    question: 'Do you perform background checks, require confidentiality agreements, and include security responsibilities in onboarding and performance expectations?',
    weight: 1,
    remediation: 'Add pre-employment screening proportionate to role sensitivity, signed confidentiality/acceptable-use agreements, and security responsibilities in job descriptions and reviews.',
  },
  // CC2 — Communication and Information
  {
    id: 'cc2-internal',
    section: 'Common Criteria (Security)',
    clause: 'CC2 Internal Communication',
    question: 'Are security policies, changes, and incident lessons communicated internally through defined channels that personnel actually use?',
    weight: 1,
    remediation: 'Define internal communication channels (policy portal, Slack/Teams, all-hands, onboarding), publish policy updates, and run post-incident reviews with documented lessons learned.',
  },
  {
    id: 'cc2-external',
    section: 'Common Criteria (Security)',
    clause: 'CC2 External Communication',
    question: 'Do you communicate security commitments and requirements to external parties — customers, auditors, and vendors — through contracts, documentation, or SLAs?',
    weight: 1,
    remediation: 'Document external-facing security commitments (master agreements, security pages, subprocessors list) and define how affected parties are notified of incidents or changes.',
  },
  // CC3 — Risk Assessment
  {
    id: 'cc3-risk',
    section: 'Common Criteria (Security)',
    clause: 'CC3 Risk Assessment',
    question: 'Do you run a formal, repeatable risk assessment that identifies threats to your service commitments and evaluates their likelihood and impact?',
    weight: 2,
    remediation: 'Stand up a documented risk assessment process: identify assets and threats, score likelihood/impact, record results in a risk register, and refresh it at least annually and on major change.',
  },
  {
    id: 'cc3-change-fraud',
    section: 'Common Criteria (Security)',
    clause: 'CC3 Change & Fraud Risk',
    question: 'Does your risk assessment explicitly consider fraud, insider threats, and risks introduced by significant changes (new products, infrastructure, acquisitions)?',
    weight: 1,
    remediation: 'Extend the risk register to cover fraud scenarios, insider misuse, and change-related risk; require a risk review step for significant changes before they proceed.',
  },
  // CC4 — Monitoring Activities
  {
    id: 'cc4-monitoring',
    section: 'Common Criteria (Security)',
    clause: 'CC4 Monitoring Activities',
    question: 'Do you evaluate whether controls keep working — through internal audits, control self-assessments, or continuous monitoring — on a defined cadence?',
    weight: 2,
    remediation: 'Schedule periodic control evaluations (internal audit or self-assessment), track results, and define KPIs/KRIs that show whether controls are operating effectively.',
  },
  {
    id: 'cc4-deficiencies',
    section: 'Common Criteria (Security)',
    clause: 'CC4 Deficiency Remediation',
    question: 'Are control deficiencies and audit findings tracked to remediation with owners and deadlines, and escalated to management?',
    weight: 1,
    remediation: 'Create a findings register: every deficiency gets an owner, a deadline, and a remediation status review. Escalate overdue or systemic items to management.',
  },
  // CC5 — Control Activities
  {
    id: 'cc5-controls',
    section: 'Common Criteria (Security)',
    clause: 'CC5 Control Activities',
    question: 'Have you selected and documented the specific control activities (policies and procedures) that mitigate each risk identified in your assessment?',
    weight: 2,
    remediation: 'Map each risk to a concrete control activity with an owner and evidence source. A risk register without mapped controls is the most common SOC 2 readiness gap.',
  },
  {
    id: 'cc5-general-it',
    section: 'Common Criteria (Security)',
    clause: 'CC5 Technology Controls',
    question: 'Do general controls govern your technology infrastructure — access provisioning, change management, and operations procedures are documented and followed?',
    weight: 1,
    remediation: 'Document general IT controls: how access is granted/revoked, how changes reach production, and how operations incidents are handled — with evidence they are followed.',
  },
  // CC6 — Logical and Physical Access
  {
    id: 'cc6-access',
    section: 'Common Criteria (Security)',
    clause: 'CC6 Access Management',
    question: 'Is access provisioned on least privilege with unique identities, approved before grant, and deprovisioned promptly on role change or termination?',
    weight: 2,
    remediation: 'Implement joiner/mover/leaver workflows: approved access requests, role-based permissions, unique accounts (no sharing), and same-day deprovisioning on termination.',
  },
  {
    id: 'cc6-mfa-review',
    section: 'Common Criteria (Security)',
    clause: 'CC6 Authentication & Review',
    question: 'Do you require MFA on remote access and privileged accounts, and review access rights on a regular schedule?',
    weight: 2,
    remediation: 'Enforce MFA for all remote access, admin consoles, and production systems. Run quarterly access reviews with documented sign-off and removal of stale rights.',
  },
  {
    id: 'cc6-physical',
    section: 'Common Criteria (Security)',
    clause: 'CC6 Physical Access',
    question: 'Are offices, server rooms, and equipment protected by physical access controls — badges, visitor logs, and datacenter controls (directly or via your cloud provider)?',
    weight: 1,
    remediation: 'For offices: badge access, visitor sign-in, and escort policies. For datacenter workloads: review your cloud providers\u2019 SOC 2 reports and document the inherited physical controls.',
  },
  {
    id: 'cc6-data',
    section: 'Common Criteria (Security)',
    clause: 'CC6 Data Protection',
    question: 'Is sensitive data encrypted at rest and in transit, with managed keys and controls preventing unauthorized transmission or removal?',
    weight: 2,
    remediation: 'Encrypt storage (AES-256) and transport (TLS 1.2+), manage keys in a KMS/HSM, restrict data export channels, and consider DLP for high-sensitivity data.',
  },
  // CC7 — System Operations
  {
    id: 'cc7-monitoring',
    section: 'Common Criteria (Security)',
    clause: 'CC7 Security Monitoring',
    question: 'Do you monitor systems for security events — centralized logging, alerting on suspicious activity, and someone accountable for triage?',
    weight: 2,
    remediation: 'Centralize logs from production systems, identity providers, and endpoints; define alert rules for suspicious activity; assign triage responsibility and track response times.',
  },
  {
    id: 'cc7-vulnerability',
    section: 'Common Criteria (Security)',
    clause: 'CC7 Vulnerability Management',
    question: 'Do you scan for vulnerabilities on a schedule and remediate findings within defined SLAs (e.g., critical within days, not months)?',
    weight: 2,
    remediation: 'Run vulnerability scans at least monthly (infrastructure and dependencies), set remediation SLAs by severity, and track findings to closure in a register.',
  },
  {
    id: 'cc7-incident',
    section: 'Common Criteria (Security)',
    clause: 'CC7 Incident Response',
    question: 'Do you have a documented incident response plan — severity levels, roles, communication steps — that has been exercised, not just written?',
    weight: 2,
    remediation: 'Write an incident response plan covering detection, triage, containment, communication, and post-mortem. Run a tabletop exercise annually and keep the records.',
  },
  {
    id: 'cc7-recovery',
    section: 'Common Criteria (Security)',
    clause: 'CC7 Recovery & Backups',
    question: 'Are backups automated, protected, and actually tested — with documented recovery procedures for declared incidents?',
    weight: 1,
    remediation: 'Automate backups, encrypt and isolate copies from production credentials, test restores quarterly, and document recovery steps in the incident plan.',
  },
  // CC8 — Change Management
  {
    id: 'cc8-change',
    section: 'Common Criteria (Security)',
    clause: 'CC8 Change Management',
    question: 'Do all changes to production (code, config, infrastructure) go through authorization, testing, and approval before deployment?',
    weight: 2,
    remediation: 'Enforce change control: PR review or change tickets, CI checks, separated dev/prod environments, and an auditable approval trail for emergency changes.',
  },
  // CC9 — Risk Mitigation
  {
    id: 'cc9-mitigation',
    section: 'Common Criteria (Security)',
    clause: 'CC9 Risk Mitigation',
    question: 'When risks are identified, do you formally decide and execute mitigation — acceptance, transfer (insurance), or treatment — rather than letting them sit?',
    weight: 1,
    remediation: 'Give every register entry a treatment decision (mitigate, transfer, accept, avoid) with rationale and a named approver; review open risks quarterly.',
  },
  {
    id: 'cc9-vendors',
    section: 'Common Criteria (Security)',
    clause: 'CC9 Vendor Management',
    question: 'Do you assess vendors and subservice organizations that touch your system or data — contracts, security reviews, SOC reports where available?',
    weight: 2,
    remediation: 'Maintain a vendor inventory with risk tiers, review SOC 2 reports for critical subservice organizations, and include security terms in contracts.',
  },
  // Availability
  {
    id: 'a1-capacity',
    section: 'Availability',
    clause: 'A1.1 Capacity Planning',
    question: 'Do you monitor capacity (compute, storage, bandwidth) and forecast demand so availability commitments survive growth and spikes?',
    weight: 1,
    remediation: 'Set capacity thresholds and alerts, review utilization trends monthly, and document how scaling decisions are made before limits are hit.',
  },
  {
    id: 'a1-resilience',
    section: 'Availability',
    clause: 'A1.2 Resilience & Recovery',
    question: 'Are critical components redundant (failover, multi-AZ) with a documented recovery plan aligned to your uptime commitments?',
    weight: 2,
    remediation: 'Eliminate single points of failure for critical paths (multi-AZ deployments, failover), document RTO/RPO, and test failover at least annually.',
  },
  {
    id: 'a1-testing',
    section: 'Availability',
    clause: 'A1.3 Recovery Testing',
    question: 'Have you actually executed your backup restoration and disaster recovery procedures in the last 12 months?',
    weight: 1,
    remediation: 'Schedule and document DR tests: restore from backup, fail over a service, measure actual vs. target RTO/RPO, and file the results.',
  },
  // Processing Integrity
  {
    id: 'pi1-inputs',
    section: 'Processing Integrity',
    clause: 'PI1 Inputs',
    question: 'Are inputs to your system validated — completeness and accuracy checks so bad data is rejected before processing?',
    weight: 1,
    remediation: 'Add input validation at system boundaries (schema checks, checksums, reconciliation on bulk imports) and log rejected inputs for review.',
  },
  {
    id: 'pi1-processing',
    section: 'Processing Integrity',
    clause: 'PI1 Processing & Outputs',
    question: 'Do you verify processing is complete and accurate — error handling, reconciliation, and output checks against expectations?',
    weight: 1,
    remediation: 'Instrument processing: completion checkpoints, automated reconciliation (records in vs. records out), error queues with ownership, and output validation.',
  },
  // Confidentiality
  {
    id: 'c1-classification',
    section: 'Confidentiality',
    clause: 'C1 Confidential Information',
    question: 'Is confidential information identified, classified, and labeled — with handling rules for storage, transmission, and retention?',
    weight: 1,
    remediation: 'Define confidentiality classifications (e.g., public/internal/confidential), label or tag sensitive data stores, and document retention periods per class.',
  },
  {
    id: 'c1-disposal',
    section: 'Confidentiality',
    clause: 'C1 Secure Disposal',
    question: 'Is confidential information securely destroyed at end of retention — including vendor-held copies and media sanitization?',
    weight: 1,
    remediation: 'Implement disposal procedures: retention schedules, cryptographic erasure or certified destruction for media, and contractual deletion obligations for vendors.',
  },
  // Privacy
  {
    id: 'p1-notice',
    section: 'Privacy',
    clause: 'P-series Notice & Consent',
    question: 'Do you publish a privacy notice covering what personal information you collect, why, and how long you keep it — and obtain consent where required?',
    weight: 1,
    remediation: 'Publish a privacy notice covering collection purposes, retention, third-party sharing, and subject rights; capture consent where required (cookies, marketing).',
  },
  {
    id: 'p1-rights',
    section: 'Privacy',
    clause: 'P-series Access & Disposal',
    question: 'Can you honor data subject rights — access, correction, deletion — and dispose of PII when no longer needed?',
    weight: 1,
    remediation: 'Build a request workflow for access/deletion with identity verification, track fulfillment deadlines, and implement PII disposal tied to retention rules.',
  },
];

const SCORE_MAP = { yes: 2, partial: 1, no: 0 };
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
    // 'na' is excluded from the denominator — Trust Services Categories other
    // than Security are optional and shouldn't penalize the readiness score.
    if (answer !== 'na') {
      sections[q.section].max += maxQ;
      sections[q.section].score += score * q.weight;
      totalScore += score * q.weight;
      maxScore += maxQ;
    }

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
