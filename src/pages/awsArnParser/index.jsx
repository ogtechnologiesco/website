import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';

const VALID_PARTITIONS = ['aws', 'aws-cn', 'aws-us-gov', 'aws-iso', 'aws-iso-b'];

const COMMON_ARNS = [
  { label: 'S3 Bucket', arn: 'arn:aws:s3:::my-bucket' },
  { label: 'Lambda Function', arn: 'arn:aws:lambda:us-east-1:123456789012:function:my-function' },
  { label: 'IAM User', arn: 'arn:aws:iam::123456789012:user/johndoe' },
  { label: 'EC2 Instance', arn: 'arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0' },
  { label: 'DynamoDB Table', arn: 'arn:aws:dynamodb:us-east-1:123456789012:table/my-table' },
  { label: 'SQS Queue', arn: 'arn:aws:sqs:us-east-1:123456789012:my-queue' },
  { label: 'SNS Topic', arn: 'arn:aws:sns:us-east-1:123456789012:my-topic' },
  { label: 'KMS Key', arn: 'arn:aws:kms:us-east-1:123456789012:key/abc123-456-789' },
];

function parseArn(arnStr) {
  const trimmed = arnStr.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(':');
  if (parts.length < 6 || parts[0] !== 'arn') {
    return { error: 'Invalid ARN: must start with "arn:" and have at least 6 colon-separated segments' };
  }

  const [prefix, partition, service, region, accountId, ...resourceParts] = parts;
  const resource = resourceParts.join(':');

  const warnings = [];
  if (!VALID_PARTITIONS.includes(partition)) {
    warnings.push(`Unknown partition "${partition}". Expected one of: ${VALID_PARTITIONS.join(', ')}`);
  }
  if (!service) warnings.push('Service is empty');
  if (!accountId && service !== 's3') {
    warnings.push('Account ID is empty (only S3 may omit account ID)');
  }
  if (!resource) warnings.push('Resource is empty');
  if (resource.includes('*')) warnings.push('Resource contains a wildcard (*) — verify this is intentional');

  const resourceMatch = resource.match(/^([^\/:]+)[\/:](.+)$/);
  const resourceType = resourceMatch ? resourceMatch[1] : null;
  const resourceId = resourceMatch ? resourceMatch[2] : resource;

  return {
    partition,
    service,
    region,
    accountId,
    resource,
    resourceType,
    resourceId,
    warnings,
  };
}

function buildArn(fields) {
  const { partition, service, region, accountId, resource } = fields;
  return `arn:${partition || ''}:${service || ''}:${region || ''}:${accountId || ''}:${resource || ''}`;
}

const FIELD_COLORS = {
  prefix: 'text-gray-400',
  partition: 'text-red-400',
  service: 'text-green-400',
  region: 'text-blue-400',
  accountId: 'text-yellow-400',
  resource: 'text-purple-400',
};

function AwsArnParser() {
  const [mode, setMode] = useState('parse');
  const [arnInput, setArnInput] = useState('arn:aws:lambda:us-east-1:123456789012:function:my-function');
  const [buildFields, setBuildFields] = useState({
    partition: 'aws',
    service: 's3',
    region: '',
    accountId: '',
    resource: '',
  });

  const parsed = useMemo(() => (mode === 'parse' ? parseArn(arnInput) : null), [arnInput, mode]);
  const builtArn = useMemo(() => (mode === 'build' ? buildArn(buildFields) : ''), [buildFields, mode]);

  const visualBreakdown = useMemo(() => {
    if (mode !== 'parse' || !parsed || parsed.error) return null;
    const segments = arnInput.trim().split(':');
    const labels = ['arn', 'partition', 'service', 'region', 'account', 'resource'];
    const colors = ['prefix', 'partition', 'service', 'region', 'accountId', 'resource'];
    return segments.map((seg, i) => ({
      value: seg,
      label: labels[i] || `extra-${i}`,
      color: colors[i] || 'resource',
    }));
  }, [arnInput, parsed, mode]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free AWS ARN Parser & Builder Online | OG Technologies EU</title>
        <meta name="description" content="Parse AWS ARN strings into components (partition, service, region, account ID, resource) or build valid ARNs from fields. 100% client-side, no data sent to any server." />
        <meta name="keywords" content="AWS ARN parser, ARN builder, Amazon Resource Name, AWS tools, ARN validator, AWS developer tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/aws-arn-parser/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/aws-arn-parser/" />
        <meta property="og:title" content="Free AWS ARN Parser & Builder Online | OG Technologies EU" />
        <meta property="og:description" content="Parse AWS ARN strings into components or build valid ARNs from fields. 100% client-side." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/aws-arn-parser/" />
        <meta name="twitter:title" content="Free AWS ARN Parser & Builder Online | OG Technologies EU" />
        <meta name="twitter:description" content="Parse AWS ARN strings into components or build valid ARNs from fields. 100% client-side." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AWS ARN Parser & Builder',
            url: 'https://www.ogtechnologies.co/tools/aws-arn-parser/',
            description: 'Parse AWS ARN strings into components (partition, service, region, account ID, resource) or build valid ARNs from fields. 100% client-side.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            featureList: [
              'Parse ARN strings into individual components',
              'Build valid ARNs from individual fields',
              'Visual color-coded breakdown of ARN segments',
              'Validation with warnings for common mistakes',
            ],
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            creator: { '@type': 'Organization', name: 'OG Technologies EU', url: 'https://www.ogtechnologies.co/' },
          })}
        </script>
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
                <h1 className="h1">AWS ARN Parser & Builder</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Parse Amazon Resource Names into their components or build valid ARNs from individual fields.
                  Everything runs in your browser — no data is sent to any server.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 mb-6">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      mode === 'parse' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setMode('parse')}
                  >
                    Parse ARN
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      mode === 'build' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setMode('build')}
                  >
                    Build ARN
                  </button>
                </div>

                {mode === 'parse' && (
                  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <label className="block text-gray-300 text-sm font-medium mb-1">AWS ARN</label>
                    <input
                      type="text"
                      value={arnInput}
                      onChange={(e) => setArnInput(e.target.value)}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm mb-4"
                      placeholder="arn:aws:service:region:account-id:resource"
                    />

                    {visualBreakdown && (
                      <div className="mb-6 bg-gray-700 rounded-md p-4">
                        <p className="text-xs text-gray-400 mb-2">Visual Breakdown</p>
                        <div className="flex flex-wrap gap-1 font-mono text-sm">
                          {visualBreakdown.map((seg, i) => (
                            <span key={i}>
                              {i > 0 && <span className="text-gray-500">:</span>}
                              <span className={FIELD_COLORS[seg.color]}>{seg.value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {parsed && parsed.error && (
                      <p className="text-red-400 text-sm">{parsed.error}</p>
                    )}

                    {parsed && !parsed.error && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: 'Partition', value: parsed.partition, color: 'text-red-400' },
                            { label: 'Service', value: parsed.service, color: 'text-green-400' },
                            { label: 'Region', value: parsed.region || '(empty)', color: 'text-blue-400' },
                            { label: 'Account ID', value: parsed.accountId || '(empty)', color: 'text-yellow-400' },
                            { label: 'Resource Type', value: parsed.resourceType || '(none)', color: 'text-purple-400' },
                            { label: 'Resource ID', value: parsed.resourceId, color: 'text-purple-300' },
                          ].map((field) => (
                            <div key={field.label} className="bg-gray-700 rounded-md px-4 py-3">
                              <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                              <p className={`font-mono text-sm break-all ${field.color}`}>{field.value}</p>
                            </div>
                          ))}
                        </div>

                        {parsed.warnings.length > 0 && (
                          <div className="bg-yellow-900/30 border border-yellow-700 rounded-md px-4 py-3">
                            <p className="text-xs text-yellow-300 font-medium mb-1">Warnings</p>
                            <ul className="text-xs text-yellow-200 list-disc list-inside space-y-1">
                              {parsed.warnings.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-6">
                      <p className="text-gray-300 text-sm font-medium mb-2">Common ARN Examples</p>
                      <div className="flex flex-wrap gap-2">
                        {COMMON_ARNS.map((ex) => (
                          <button
                            key={ex.label}
                            type="button"
                            onClick={() => setArnInput(ex.arn)}
                            className="text-xs px-3 py-1.5 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                          >
                            {ex.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'build' && (
                  <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Partition</label>
                        <select
                          value={buildFields.partition}
                          onChange={(e) => setBuildFields({ ...buildFields, partition: e.target.value })}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                        >
                          {VALID_PARTITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Service</label>
                        <input
                          type="text"
                          value={buildFields.service}
                          onChange={(e) => setBuildFields({ ...buildFields, service: e.target.value })}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                          placeholder="s3, lambda, ec2, ..."
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Region</label>
                        <input
                          type="text"
                          value={buildFields.region}
                          onChange={(e) => setBuildFields({ ...buildFields, region: e.target.value })}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                          placeholder="us-east-1 (leave empty for global services)"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Account ID</label>
                        <input
                          type="text"
                          value={buildFields.accountId}
                          onChange={(e) => setBuildFields({ ...buildFields, accountId: e.target.value })}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                          placeholder="123456789012 (leave empty for S3)"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Resource</label>
                        <input
                          type="text"
                          value={buildFields.resource}
                          onChange={(e) => setBuildFields({ ...buildFields, resource: e.target.value })}
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-sm"
                          placeholder="bucket-name or function:my-function"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">Generated ARN</label>
                      <div className="flex items-center gap-3 bg-gray-700 rounded-md px-4 py-3">
                        <code className="text-purple-300 font-mono text-sm break-all flex-1">{builtArn}</code>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(builtArn)}
                          className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300 hover:bg-gray-500 transition-colors whitespace-nowrap"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AwsArnParser;
