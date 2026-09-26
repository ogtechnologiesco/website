import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

const PRIVILEGE_ESCALATION_ACTIONS = [
  'iam:CreateRole', 'iam:AttachRolePolicy', 'iam:PutRolePolicy', 'iam:CreatePolicy',
  'iam:CreateAccessKey', 'iam:CreateLoginProfile', 'iam:UpdateLoginProfile',
  'sts:AssumeRole', 'iam:PassRole', 'lambda:CreateFunction', 'lambda:UpdateFunctionCode',
  'ec2:RunInstances', 'cloudformation:CreateStack', 'cloudformation:UpdateStack',
];

const MANAGED_POLICY_LIMIT = 6144;
const INLINE_POLICY_LIMITS = { managed: 2048, group: 10240, role: 10240, user: 5120 };

function analyzePolicy(policy) {
  const findings = [];
  const stats = { statements: 0, totalActions: 0, totalResources: 0 };

  if (!policy.Statement) {
    findings.push({ severity: 'danger', message: 'Policy is missing required "Statement" field' });
    return { findings, stats };
  }

  const statements = Array.isArray(policy.Statement) ? policy.Statement : [policy.Statement];
  stats.statements = statements.length;

  statements.forEach((stmt, idx) => {
    const stmtLabel = statements.length > 1 ? `Statement ${idx + 1}` : 'Policy';

    if (stmt.Effect === 'Allow') {
      const actions = Array.isArray(stmt.Action) ? stmt.Action : stmt.Action ? [stmt.Action] : [];
      const notActions = Array.isArray(stmt.NotAction) ? stmt.NotAction : stmt.NotAction ? [stmt.NotAction] : [];
      const resources = Array.isArray(stmt.Resource) ? stmt.Resource : stmt.Resource ? [stmt.Resource] : [];
      const notResources = Array.isArray(stmt.NotResource) ? stmt.NotResource : stmt.NotResource ? [stmt.NotResource] : [];

      stats.totalActions += actions.length + notActions.length;
      stats.totalResources += resources.length + notResources.length;

      if (actions.includes('*')) {
        findings.push({ severity: 'danger', message: `${stmtLabel}: Action uses wildcard "*" — grants access to all AWS actions` });
      }
      if (resources.includes('*')) {
        findings.push({ severity: 'danger', message: `${stmtLabel}: Resource uses wildcard "*" — applies to all resources` });
      }
      if (notActions.length > 0) {
        findings.push({ severity: 'warning', message: `${stmtLabel}: Uses NotAction — grants all actions EXCEPT those listed. This is risky and easy to misconfigure.` });
      }
      if (notResources.length > 0) {
        findings.push({ severity: 'warning', message: `${stmtLabel}: Uses NotResource — applies to all resources EXCEPT those listed. This is risky.` });
      }
      if (!stmt.Condition) {
        findings.push({ severity: 'info', message: `${stmtLabel}: No Condition specified — this statement applies unconditionally` });
      }

      const principal = stmt.Principal;
      if (principal) {
        const principalStr = typeof principal === 'string' ? principal : JSON.stringify(principal);
        if (principalStr.includes('*')) {
          findings.push({ severity: 'danger', message: `${stmtLabel}: Principal includes "*" — grants access to everyone (public)` });
        }
      }

      actions.forEach((action) => {
        const lowerAction = action.toLowerCase();
        if (PRIVILEGE_ESCALATION_ACTIONS.some((pe) => lowerAction === pe.toLowerCase())) {
          findings.push({ severity: 'warning', message: `${stmtLabel}: Action "${action}" can be used for privilege escalation` });
        }
      });
    }

    if (stmt.Effect === 'Deny') {
      findings.push({ severity: 'info', message: `${stmtLabel}: Deny statement — explicit deny overrides any allow` });
    }
  });

  return { findings, stats };
}

function IamPolicyValidator() {
  const [input, setInput] = useState(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}`);

  const { findings, stats, error, policySize } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { findings: [], stats: { statements: 0, totalActions: 0, totalResources: 0 }, error: '', policySize: 0 };
    try {
      const policy = JSON.parse(trimmed);
      const { findings, stats } = analyzePolicy(policy);
      return { findings, stats, error: '', policySize: trimmed.length };
    } catch (e) {
      return { findings: [], stats: { statements: 0, totalActions: 0, totalResources: 0 }, error: e.message, policySize: trimmed.length };
    }
  }, [input]);

  const severityColors = {
    danger: 'bg-red-900 text-red-300 border-red-700',
    warning: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    info: 'bg-blue-900 text-blue-300 border-blue-700',
  };

  const sizeLimit = MANAGED_POLICY_LIMIT;
  const sizePercent = Math.min(100, (policySize / sizeLimit) * 100);
  const sizeOver = policySize > sizeLimit;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>AWS IAM Policy Validator & Checker Online | OG Technologies EU</title>
        <meta name="description" content="Free AWS IAM policy checker. Paste IAM policy JSON to flag wildcard actions, privilege escalation, NotAction traps, and public principals — and check size limits. Runs 100% in your browser." />
        <meta name="keywords" content="IAM policy validator, AWS policy checker, AWS policy validator online, AWS JSON policy validator, IAM linter, privilege escalation, wildcard detection, AWS developer tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/iam-policy-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/iam-policy-validator/" />
        <meta property="og:title" content="AWS IAM Policy Validator & Checker Online | OG Technologies EU" />
        <meta property="og:description" content="Free AWS IAM policy checker. Paste IAM policy JSON to flag wildcards, privilege escalation, NotAction traps, public principals, and check size limits. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/iam-policy-validator/" />
        <meta name="twitter:title" content="AWS IAM Policy Validator & Checker Online | OG Technologies EU" />
        <meta name="twitter:description" content="Free AWS IAM policy checker. Paste IAM policy JSON to flag wildcards, privilege escalation, NotAction traps, public principals, and check size limits. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />
      </Helmet>

      <Header />

      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1">AWS IAM Policy Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste an IAM policy JSON to instantly flag wildcards, privilege escalation, NotAction traps,
                  public principals, and check size limits. Everything runs in your browser — no data is sent to any server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <label className="block text-gray-300 text-sm font-medium mb-1">IAM Policy JSON</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={12}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm mb-4"
                    placeholder='{"Version": "2012-10-17", "Statement": [...]}'
                  />

                  {error && (
                    <div className="bg-red-900/30 border border-red-700 rounded-md px-4 py-3 mb-4">
                      <p className="text-xs text-red-300 font-medium mb-1">JSON Parse Error</p>
                      <p className="text-xs text-red-200">{error}</p>
                    </div>
                  )}

                  {!error && input.trim() && (
                    <>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-gray-700 rounded-md px-4 py-3 text-center">
                          <p className="text-2xl font-bold text-white">{stats.statements}</p>
                          <p className="text-xs text-gray-400">Statements</p>
                        </div>
                        <div className="bg-gray-700 rounded-md px-4 py-3 text-center">
                          <p className="text-2xl font-bold text-white">{stats.totalActions}</p>
                          <p className="text-xs text-gray-400">Actions</p>
                        </div>
                        <div className="bg-gray-700 rounded-md px-4 py-3 text-center">
                          <p className="text-2xl font-bold text-white">{stats.totalResources}</p>
                          <p className="text-xs text-gray-400">Resources</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-400">Policy Size</span>
                          <span className={`text-xs font-mono ${sizeOver ? 'text-red-400' : 'text-green-400'}`}>
                            {policySize} / {sizeLimit} chars
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${sizeOver ? 'bg-red-500' : sizePercent > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(100, sizePercent)}%` }}
                          />
                        </div>
                        {sizeOver && (
                          <p className="text-xs text-red-400 mt-1">Policy exceeds managed policy size limit of {sizeLimit} characters</p>
                        )}
                      </div>

                      <div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Findings ({findings.length})</p>
                        {findings.length === 0 ? (
                          <p className="text-sm text-green-400">No issues found. Policy looks clean.</p>
                        ) : (
                          <div className="space-y-2">
                            {findings.map((f, i) => (
                              <div key={i} className={`border rounded-md px-4 py-2 ${severityColors[f.severity]}`}>
                                <span className="text-xs font-medium uppercase mr-2">{f.severity}</span>
                                <span className="text-sm">{f.message}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="mt-6 text-xs text-gray-500">
                    <p><strong>Size limits:</strong> Managed policies: 6,144 chars. Inline: user 5,120, group 10,240, role 10,240.</p>
                    <p className="mt-1">This tool performs static analysis only. It does not check whether resources actually exist or whether actions are valid.</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">What This IAM Policy Checker Catches</h2>
                  <div className="grid sm:grid-cols-2 gap-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Wildcard permissions</h3>
                      <p className="text-sm">
                        <code className="text-purple-300">"Action": "*"</code> grants every AWS action and{' '}
                        <code className="text-purple-300">"Resource": "*"</code> applies it to every resource.
                        Combined in an Allow statement this is effectively administrator access — the single most
                        common finding in real-world IAM audits.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Privilege escalation actions</h3>
                      <p className="text-sm">
                        Actions like <code className="text-purple-300">iam:PassRole</code>,{' '}
                        <code className="text-purple-300">iam:CreatePolicy</code>,{' '}
                        <code className="text-purple-300">lambda:CreateFunction</code>, and{' '}
                        <code className="text-purple-300">cloudformation:CreateStack</code> can let a limited
                        principal grant itself broader permissions through resources it controls.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">NotAction / NotResource traps</h3>
                      <p className="text-sm">
                        <code className="text-purple-300">NotAction</code> grants everything <em>except</em> the
                        listed actions — an allow-list in disguise that grows silently as AWS releases new APIs.
                        It is almost always safer to enumerate allowed actions explicitly.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Public principals</h3>
                      <p className="text-sm">
                        A <code className="text-purple-300">Principal</code> containing{' '}
                        <code className="text-purple-300">"*"</code> in a resource-based policy opens access to
                        anyone on the internet. Legitimate for a handful of cases (public S3 websites), dangerous
                        almost everywhere else.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 mt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Is it safe to paste my IAM policy into this checker?</h3>
                      <p className="text-sm">
                        Yes. All analysis runs entirely in your browser — the policy JSON is never sent to a server
                        or stored anywhere. You can verify this in your browser's network tab.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">How does this compare to AWS Access Analyzer?</h3>
                      <p className="text-sm">
                        AWS IAM Access Analyzer validates policies against the IAM grammar and AWS best-practice
                        rules inside your account. This tool is a quick client-side check you can run without
                        logging into AWS — useful for reviewing policies in pull requests, docs, or third-party
                        templates before deployment.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">What size limits apply to IAM policies?</h3>
                      <p className="text-sm">
                        Managed policies are limited to 6,144 characters; inline policies to 5,120 for users and
                        10,240 for groups and roles. If your policy is over the limit, split it into multiple
                        managed policies or move statements into separate inline policies.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Does a clean result mean my policy is safe?</h3>
                      <p className="text-sm">
                        No — this is static analysis, not a security guarantee. It catches common structural
                        misconfigurations but cannot evaluate your actual risk, which depends on which principals
                        hold the policy, resource sensitivity, and conditions. For a full audit use tools like
                        Cloudsplaining, Parliament, or Access Analyzer's unused-access findings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default IamPolicyValidator;
