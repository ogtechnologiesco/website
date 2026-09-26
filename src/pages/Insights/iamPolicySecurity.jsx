import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-iam-security.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function IamPolicySecurity() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them | OG Technologies EU</title>
          <meta name="description" content="Overly permissive AWS IAM policies are a leading cause of cloud breaches. Learn the 7 most common privilege escalation patterns, why wildcards are dangerous, and how to validate policies automatically." />
          <meta name="keywords" content="AWS IAM, IAM policy, privilege escalation, IAM security, iam:PassRole, wildcard permissions, cloud security, least privilege, IAM policy validator" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/iam-policy-security-patterns/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/iam-policy-security-patterns/" />
          <meta property="og:title" content="IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them" />
          <meta property="og:description" content="The 7 most common AWS IAM privilege escalation patterns, why wildcards are dangerous, and how to validate policies automatically." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/iam-policy-security-patterns/" />
          <meta name="twitter:title" content="IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them" />
          <meta name="twitter:description" content="The 7 most common AWS IAM privilege escalation patterns and how to validate policies automatically." />
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
                {/* Article header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <div className="text-purple-400 text-sm font-medium mb-2">Security · Cloud</div>
                  <h1 className="h1">IAM Policy Security: 7 Privilege Escalation Patterns and How to Catch Them</h1>
                  <div className="text-gray-400 text-center mt-4">21/09/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="AWS IAM policy security"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      Identity and Access Management is the perimeter of the cloud. Misconfigured IAM policies — not software vulnerabilities — are behind a large share of AWS breaches. The dangerous part: a policy can look harmless while silently allowing an attacker (or a compromised workload) to escalate to full administrative access.
                    </p>
                    <p className="mb-8">
                      Below are seven escalation patterns that appear constantly in real environments, why they are dangerous, and how to detect them before they ship.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">1. iam:PassRole with a Wildcard Resource</h2>
                    <p className="mb-8">
                      <code className="text-purple-300">iam:PassRole</code> lets a principal hand an IAM role to a service (e.g., launch an EC2 instance or Lambda function with that role). If the Resource is <code className="text-purple-300">*</code> and the principal can also create the service resource, it can pass a highly privileged role and execute code as that role — instant escalation. Always scope PassRole to specific role ARNs and add <code className="text-purple-300">iam:PassedToService</code> conditions.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">2. iam:CreatePolicyVersion on Own Policy</h2>
                    <p className="mb-8">
                      A user who can create a new version of a policy attached to themselves can simply author a version granting <code className="text-purple-300">*:*</code> and set it as default. This is one of the oldest escalation paths and still appears in permission-boundary misconfigurations.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">3. lambda:CreateFunction + lambda:InvokeFunction</h2>
                    <p className="mb-8">
                      Creating a Lambda function with an arbitrary role (via PassRole) and invoking it executes arbitrary code under that role's permissions. The same pattern applies to <code className="text-purple-300">glue:CreateDevEndpoint</code>, <code className="text-purple-300">cloudformation:CreateStack</code>, and <code className="text-purple-300">ec2:RunInstances</code> with a role-bearing instance profile.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">4. iam:AttachUserPolicy / AttachRolePolicy</h2>
                    <p className="mb-8">
                      If a principal can attach managed policies to itself or its role, it can attach <code className="text-purple-300">AdministratorAccess</code>. Restrict attachment permissions with conditions on <code className="text-purple-300">iam:PolicyARN</code>.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">5. iam:CreateAccessKey on Other Users</h2>
                    <p className="mb-8">
                      Creating an access key for another user — especially an admin — yields persistent credentials that bypass MFA assumptions in many setups. Scope CreateAccessKey to the caller's own user only.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">6. NotAction / NotResource Traps</h2>
                    <p className="mb-8">
                      <code className="text-purple-300">NotAction</code> in an Allow statement grants everything <em>except</em> the listed actions — an inverted allowlist that is easy to get wrong. <code className="text-purple-300">"Action": "NotAction": "iam:*"</code>-style mistakes silently grant broad access. Prefer explicit Action lists; reserve NotAction for tightly-scoped exceptions.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">7. Public Principals in Resource Policies</h2>
                    <p className="mb-8">
                      <code className="text-purple-300">"Principal": "*"</code> or <code className="text-purple-300">"AWS": "*"</code> in S3 bucket, KMS key, SNS, SQS, or Lambda resource policies can expose data or invoke paths to the entire internet. Combined with missing conditions, this is the classic public-bucket failure mode — but it applies to far more than S3.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">How to Catch Them Automatically</h2>
                    <p className="mb-8">
                      Manual review does not scale — AWS has over 18,000 actions and policies combine in non-obvious ways. Paste any policy JSON into our free{' '}
                      <Link to="/tools/iam-policy-validator/" className="text-purple-400 hover:text-purple-300 underline">IAM Policy Validator</Link>{' '}
                      to instantly flag wildcards, privilege escalation actions, NotAction traps, public principals, and size-limit violations. Everything runs client-side — policies never leave your browser.
                    </p>
                    <p className="mb-8">
                      Need to verify which account or service an ARN refers to while reviewing policies? Use the{' '}
                      <Link to="/tools/aws-arn-parser/" className="text-purple-400 hover:text-purple-300 underline">AWS ARN Parser</Link>{' '}
                      to break ARNs into partition, service, region, account ID, and resource components.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What is the principle of least privilege?</h3>
                    <p className="mb-8">
                      Grant only the specific actions on the specific resources a workload needs — nothing more. In practice: replace <code className="text-purple-300">Action: "*"</code> with explicit actions, scope <code className="text-purple-300">Resource</code> to concrete ARNs, and add conditions (MFA, source IP, PassedToService) where possible.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Are wildcards ever acceptable?</h3>
                    <p className="mb-8">
                      Prefix wildcards like <code className="text-purple-300">s3:Get*</code> or resource wildcards like <code className="text-purple-300">arn:aws:s3:::my-bucket/*</code> are reasonable when scoped deliberately. Full <code className="text-purple-300">*:*</code> or service-level <code className="text-purple-300">s3:*</code> on <code className="text-purple-300">Resource: "*"</code> should trigger review.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">How often should policies be audited?</h3>
                    <p className="mb-8">
                      Continuously. Validate policies in CI before deployment, enable AWS IAM Access Analyzer for external-access findings, and re-review after any incident or architecture change.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/iam-policy-security-patterns/"
                    categories={['Security', 'Cloud']}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default IamPolicySecurity;
