const QUESTIONS = [
  // Clause 4 — Context
  {
    id: 'clause-4',
    section: 'Clauses 4–10',
    clause: 'Clause 4: Context of the Organization',
    question: 'Have you defined the scope of your AI Management System (AIMS) and identified internal/external issues, interested parties, and AI system boundaries?',
    weight: 2,
    remediation: 'Document the AIMS scope, identify relevant internal and external issues (regulatory, ethical, technical), determine interested party requirements, and define clear AI system boundaries.',
  },
  // Clause 5 — Leadership
  {
    id: 'clause-5',
    section: 'Clauses 4–10',
    clause: 'Clause 5: Leadership',
    question: 'Does top management demonstrate commitment to responsible AI, establish an AI policy, and assign AIMS roles and responsibilities?',
    weight: 2,
    remediation: 'Obtain visible top-management commitment, publish an AI policy covering ethics and responsible use, and assign clear AIMS roles including an AI governance owner.',
  },
  // Clause 6 — Planning
  {
    id: 'clause-6',
    section: 'Clauses 4–10',
    clause: 'Clause 6: Planning',
    question: 'Have you established AI objectives, identified AI-related risks and opportunities, and planned actions to address them?',
    weight: 2,
    remediation: 'Define measurable AI objectives aligned with organizational strategy, conduct AI risk assessments, identify opportunities, and plan actions to address risks and opportunities.',
  },
  // Clause 7 — Support
  {
    id: 'clause-7',
    section: 'Clauses 4–10',
    clause: 'Clause 7: Support',
    question: 'Do you provide adequate resources, ensure AI competence, build awareness, and manage documented information for the AIMS?',
    weight: 1,
    remediation: 'Allocate sufficient resources for AI governance, ensure staff competence in AI ethics and risk management, build awareness, and control AIMS documented information.',
  },
  // Clause 8 — Operation
  {
    id: 'clause-8',
    section: 'Clauses 4–10',
    clause: 'Clause 8: Operation',
    question: 'Do you operationalize AI requirements including AI impact assessments, data management, and lifecycle controls?',
    weight: 2,
    remediation: 'Execute AI impact assessments for each system, implement data governance controls, manage the AI lifecycle from design through decommissioning, and maintain operational evidence.',
  },
  // Clause 9 — Performance Evaluation
  {
    id: 'clause-9',
    section: 'Clauses 4–10',
    clause: 'Clause 9: Performance Evaluation',
    question: 'Do you monitor, measure, and evaluate AIMS performance, including AI system performance, audits, and management reviews?',
    weight: 2,
    remediation: 'Define and track AIMS KPIs, monitor AI system performance and drift, conduct internal audits, and hold management reviews to evaluate AIMS effectiveness.',
  },
  // Clause 10 — Improvement
  {
    id: 'clause-10',
    section: 'Clauses 4–10',
    clause: 'Clause 10: Improvement',
    question: 'Do you identify nonconformities, take corrective actions, and drive continual improvement of the AIMS?',
    weight: 1,
    remediation: 'Establish a nonconformity and corrective action process for AI-related issues, and demonstrate continual improvement through periodic updates to controls, policies, and processes.',
  },

  // Annex A — AI Policy and Governance
  {
    id: 'ai-policy',
    section: 'Annex A — AI Controls',
    clause: 'A.2 AI Policy and Governance',
    question: 'Do you have a documented AI policy covering ethics, acceptable use, and governance structures aligned with organizational values?',
    weight: 2,
    remediation: 'Create a comprehensive AI policy covering ethical principles, acceptable use, governance roles, and alignment with organizational values. Review at least annually.',
  },
  // Annex A — AI Risk Register
  {
    id: 'ai-risk-register',
    section: 'Annex A — AI Controls',
    clause: 'A.3 AI Risk Management',
    question: 'Do you maintain an AI risk register with identified risks, likelihood/impact ratings, and mitigation actions?',
    weight: 2,
    remediation: 'Build and maintain an AI risk register covering technical, ethical, legal, and operational risks. Rate each by likelihood and impact, and track mitigation actions.',
  },
  // Annex A — AI Impact Assessment
  {
    id: 'ai-impact-assessment',
    section: 'Annex A — AI Controls',
    clause: 'A.4 AI Impact Assessment',
    question: 'Do you conduct AI Impact Assessments for each AI system, evaluating potential impacts on individuals, society, and the environment?',
    weight: 2,
    remediation: 'Implement an AI Impact Assessment process for each AI system. Evaluate impacts on individuals, groups, society, and the environment. Document findings and mitigation measures.',
  },
  // Annex A — Data Governance
  {
    id: 'ai-data-governance',
    section: 'Annex A — AI Controls',
    clause: 'A.6 Data for AI',
    question: 'Do you have data governance controls covering training data quality, provenance, lineage, and bias testing?',
    weight: 2,
    remediation: 'Establish data governance controls for AI: document training data sources and provenance, maintain data lineage, test for bias, and ensure data quality throughout the AI lifecycle.',
  },
  // Annex A — Model Lifecycle
  {
    id: 'ai-lifecycle',
    section: 'Annex A — AI Controls',
    clause: 'A.7 AI System Lifecycle',
    question: 'Do you manage the full AI system lifecycle from design and development through deployment, monitoring, and decommissioning?',
    weight: 2,
    remediation: 'Define and document the AI system lifecycle: requirements, design, development, testing, deployment, monitoring, and decommissioning. Maintain evidence at each stage.',
  },
  // Annex A — Transparency
  {
    id: 'ai-transparency',
    section: 'Annex A — AI Controls',
    clause: 'A.8 Information for Interested Parties',
    question: 'Do you provide transparency about AI system capabilities, limitations, and usage to relevant interested parties (users, customers, regulators)?',
    weight: 1,
    remediation: 'Implement transparency mechanisms: system cards, user notifications, documentation of capabilities and limitations, and clear communication about AI usage to interested parties.',
  },
  // Annex A — Human Oversight
  {
    id: 'ai-oversight',
    section: 'Annex A — AI Controls',
    clause: 'A.9 Use of AI Systems',
    question: 'Do you have defined human oversight processes for AI systems, especially for high-impact decisions?',
    weight: 2,
    remediation: 'Define human oversight processes for each AI system based on impact level. Ensure meaningful human review for high-impact decisions, with escalation and override mechanisms.',
  },
  // Annex A — Supplier Management
  {
    id: 'ai-suppliers',
    section: 'Annex A — AI Controls',
    clause: 'A.10 Third-Party and Supplier Relationships',
    question: 'Do you assess and manage AI-related risks from third-party models, APIs, and suppliers?',
    weight: 1,
    remediation: 'Establish AI supplier due diligence: assess third-party models for bias, security, and compliance. Include AI-specific clauses in contracts. Monitor supplier AI practices.',
  },
  // Annex A — Monitoring and Drift
  {
    id: 'ai-monitoring',
    section: 'Annex A — AI Controls',
    clause: 'A.9 AI System Monitoring',
    question: 'Do you continuously monitor AI systems for performance degradation, drift, and unintended behavior?',
    weight: 2,
    remediation: 'Implement continuous monitoring for model drift, performance degradation, and unintended behavior. Define alerting thresholds and retraining triggers. Log monitoring results.',
  },
];

const SCORE_MAP = { full: 3, mostly: 2, partial: 1, none: 0, na: 0 };
const MATURITY_LABELS = {
  none: 'Not in place',
  partial: 'Partially in place',
  mostly: 'Mostly in place',
  full: 'Fully in place and evidenced',
  na: 'Not Applicable',
};

export function evaluateAssessment(answers) {
  const sections = {};
  let totalScore = 0;
  let maxScore = 0;
  const gaps = [];

  for (const q of QUESTIONS) {
    const answer = answers[q.id] || 'none';
    const score = SCORE_MAP[answer] ?? 0;
    const maxQ = q.weight * 3;

    if (!sections[q.section]) {
      sections[q.section] = { score: 0, max: 0, gaps: 0, partials: 0 };
    }
    sections[q.section].score += score * q.weight;
    sections[q.section].max += maxQ;

    totalScore += score * q.weight;
    maxScore += maxQ;

    if (answer === 'none' || answer === 'partial') {
      const status = answer === 'none' ? 'critical' : 'warning';
      if (status === 'critical') sections[q.section].gaps += 1;
      else sections[q.section].partials += 1;
      gaps.push({ ...q, status, answer, remediation: q.remediation });
    } else if (answer === 'mostly') {
      sections[q.section].partials += 1;
      gaps.push({ ...q, status: 'warning', answer, remediation: q.remediation });
    }
  }

  const readinessScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const grade = readinessScore >= 80 ? 'A' : readinessScore >= 60 ? 'B' : readinessScore >= 40 ? 'C' : readinessScore >= 20 ? 'D' : 'E';

  const maturityLevel = readinessScore >= 80 ? 'Optimized' : readinessScore >= 60 ? 'Managed' : readinessScore >= 40 ? 'Defined' : readinessScore >= 20 ? 'Initial' : 'Absent';

  const criticalGaps = gaps.filter((g) => g.status === 'critical').length;
  const partialGaps = gaps.filter((g) => g.status === 'warning').length;
  const weeksToReady = Math.max(4, criticalGaps * 3 + partialGaps * 2 + 8);

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
      maturityLevel,
      totalQuestions: QUESTIONS.length,
      criticalGaps,
      partialGaps,
      implemented: QUESTIONS.length - criticalGaps - partialGaps,
      weeksToReady,
    },
  };
}

export { QUESTIONS, MATURITY_LABELS };
