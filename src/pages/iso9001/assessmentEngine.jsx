const QUESTIONS = [
  // Clause 4 — Context of the Organization
  {
    id: 'clause-4',
    section: 'Clauses 4–10',
    clause: 'Clause 4: Context of the Organization',
    question: 'Have you determined the scope of your Quality Management System (QMS) and identified internal/external issues and interested parties?',
    weight: 2,
    remediation: 'Document the QMS scope, identify relevant internal and external issues (market, regulatory, technological), and determine the needs and expectations of interested parties.',
  },
  // Clause 5 — Leadership
  {
    id: 'clause-5',
    section: 'Clauses 4–10',
    clause: 'Clause 5: Leadership',
    question: 'Does top management demonstrate leadership commitment, establish a quality policy, and assign QMS roles and responsibilities?',
    weight: 2,
    remediation: 'Obtain visible top-management commitment, publish a quality policy aligned with organizational strategy, and assign clear QMS roles and responsibilities.',
  },
  // Clause 6 — Planning
  {
    id: 'clause-6',
    section: 'Clauses 4–10',
    clause: 'Clause 6: Planning',
    question: 'Have you established measurable quality objectives and addressed risks and opportunities for the QMS?',
    weight: 2,
    remediation: 'Define measurable quality objectives at relevant functions and levels. Identify risks and opportunities, and plan actions to address them.',
  },
  // Clause 7 — Support
  {
    id: 'clause-7',
    section: 'Clauses 4–10',
    clause: 'Clause 7: Support',
    question: 'Do you provide adequate resources, ensure competence, build awareness, and manage documented information for the QMS?',
    weight: 1,
    remediation: 'Allocate sufficient resources, ensure staff competence through training and evaluation, build quality awareness, and control documented information.',
  },
  // Clause 8 — Operation
  {
    id: 'clause-8',
    section: 'Clauses 4–10',
    clause: 'Clause 8: Operation',
    question: 'Do you plan and control operational processes, including product/service requirements, design, and production/service provision?',
    weight: 2,
    remediation: 'Plan and control operational processes, review product/service requirements before commitment, manage design and development, and control production/service provision.',
  },
  // Clause 9 — Performance Evaluation
  {
    id: 'clause-9',
    section: 'Clauses 4–10',
    clause: 'Clause 9: Performance Evaluation',
    question: 'Do you monitor, measure, analyze, and evaluate QMS performance, including customer satisfaction, internal audits, and management reviews?',
    weight: 2,
    remediation: 'Monitor and measure QMS performance, track customer satisfaction, conduct internal audits, and hold management reviews to evaluate effectiveness.',
  },
  // Clause 10 — Improvement
  {
    id: 'clause-10',
    section: 'Clauses 4–10',
    clause: 'Clause 10: Improvement',
    question: 'Do you identify nonconformities, take corrective actions, and drive continual improvement of the QMS?',
    weight: 1,
    remediation: 'Establish a nonconformity and corrective action process, and demonstrate continual improvement through periodic updates to processes, objectives, and controls.',
  },

  // Quality-Specific Deep-Dive
  {
    id: 'customer-focus',
    section: 'Quality Management Principles',
    clause: 'Customer Focus',
    question: 'Do you systematically gather, analyze, and act on customer feedback to improve customer satisfaction?',
    weight: 2,
    remediation: 'Implement systematic customer feedback collection (surveys, NPS, complaints), analyze trends, and act on insights to improve products, services, and processes.',
  },
  {
    id: 'process-approach',
    section: 'Quality Management Principles',
    clause: 'Process Approach',
    question: 'Are your core business processes defined, documented, and managed as a coherent system with clear inputs, outputs, and interactions?',
    weight: 2,
    remediation: 'Map core business processes, define inputs/outputs and process owners, document interactions between processes, and manage them as an integrated system.',
  },
  {
    id: 'evidence-based',
    section: 'Quality Management Principles',
    clause: 'Evidence-Based Decision Making',
    question: 'Do you base decisions on data analysis and evidence rather than intuition, with defined KPIs and measurement systems?',
    weight: 1,
    remediation: 'Define KPIs for quality objectives, implement data collection and analysis processes, and ensure decisions are supported by verifiable data and evidence.',
  },
  {
    id: 'relationship-mgmt',
    section: 'Quality Management Principles',
    clause: 'Relationship Management',
    question: 'Do you manage relationships with relevant interested parties (suppliers, partners, customers) to maximize their impact on QMS performance?',
    weight: 1,
    remediation: 'Identify key interested parties, establish communication channels, monitor supplier performance, and collaborate on quality improvement initiatives.',
  },
  {
    id: 'risk-based',
    section: 'Quality Management Principles',
    clause: 'Risk-Based Thinking',
    question: 'Do you apply risk-based thinking throughout the QMS to identify, assess, and address risks to quality objectives?',
    weight: 2,
    remediation: 'Integrate risk-based thinking into all QMS processes. Identify risks to conformity and customer satisfaction, and plan actions to mitigate them.',
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
  const weeksToReady = Math.max(3, criticalGaps * 2 + partialGaps + 3);

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
