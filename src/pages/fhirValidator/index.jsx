import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import { validateFhir } from '../../utils/fhirUtils';

const SAMPLE_PATIENT = `{
  "resourceType": "Patient",
  "id": "example",
  "meta": { "versionId": "1", "lastUpdated": "2026-09-21T08:30:00Z" },
  "identifier": [
    { "system": "urn:oid:1.2.3.4.5", "value": "123456" }
  ],
  "active": true,
  "name": [
    { "use": "official", "family": "Doe", "given": ["John", "A"] }
  ],
  "telecom": [
    { "system": "phone", "value": "+43-1-5551234", "use": "home" },
    { "system": "email", "value": "john.doe@example.com" }
  ],
  "gender": "male",
  "birthDate": "1980-01-15",
  "address": [
    { "use": "home", "line": ["123 Main St"], "city": "Vienna", "postalCode": "1010", "country": "AT" }
  ],
  "managingOrganization": { "reference": "Organization/1", "display": "General Hospital" }
}`;

const SAMPLE_OBSERVATION = `{
  "resourceType": "Observation",
  "id": "heart-rate",
  "status": "final",
  "category": [
    { "coding": [{ "system": "http://terminology.hl7.org/CodeSystem/observation-category", "code": "vital-signs" }] }
  ],
  "code": { "coding": [{ "system": "http://loinc.org", "code": "8867-4", "display": "Heart rate" }] },
  "subject": { "reference": "Patient/example" },
  "effectiveDateTime": "2026-09-21T08:30:00Z",
  "valueQuantity": { "value": 72, "unit": "beats/minute", "system": "http://unitsofmeasure.org", "code": "/min" }
}`;

function CheckRow({ check }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-700 last:border-0">
      <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${check.ok ? 'bg-green-900/60 text-green-400' : 'bg-red-900/60 text-red-400'}`}>
        {check.ok ? '✓' : '✗'}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-200">{check.label}</p>
        <p className="text-xs text-gray-400">{check.detail}</p>
      </div>
    </div>
  );
}

function FhirValidator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const validate = (value) => {
    const v = value !== undefined ? value : input;
    if (!v.trim()) { setResult(null); return; }
    setResult(validateFhir(v));
  };

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result || '');
      setInput(txt);
      validate(txt);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Free FHIR Resource Viewer & Validator - FHIR R4 JSON | OG Technologies EU</title>
        <meta name="description" content="Validate and inspect FHIR R4 resources online: Patient, Observation, Bundle, Encounter, MedicationRequest and more. Required-field checks, type validation, and flattened field view. 100% client-side — PHI never uploaded." />
        <meta name="keywords" content="fhir validator, fhir viewer, fhir r4, fhir json, fhir resource, hl7 fhir, patient resource, observation resource" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogtechnologies.co/tools/fhir-validator/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogtechnologies.co/tools/fhir-validator/" />
        <meta property="og:title" content="Free FHIR Resource Viewer & Validator - FHIR R4 JSON | OG Technologies EU" />
        <meta property="og:description" content="Validate and inspect FHIR R4 resources: required-field checks, type validation, flattened field view. 100% client-side — PHI never uploaded." />
        <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogtechnologies.co/tools/fhir-validator/" />
        <meta name="twitter:title" content="Free FHIR Resource Viewer & Validator - FHIR R4 JSON | OG Technologies EU" />
        <meta name="twitter:description" content="Validate and inspect FHIR R4 resources: required-field checks, type validation, flattened field view. 100% client-side — PHI never uploaded." />
        <meta name="twitter:image" content="https://www.ogtechnologies.co/og-og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'FHIR Resource Viewer & Validator',
            url: 'https://www.ogtechnologies.co/tools/fhir-validator/',
            description: 'Validate and inspect FHIR R4 resources: required-field checks, type validation, and flattened field view for Patient, Observation, Bundle, and more. 100% client-side.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            featureList: [
              'FHIR R4 JSON validation',
              'Required-field and type checks',
              'Flattened field-path view',
              'Patient, Observation, Bundle, Encounter, MedicationRequest schemas',
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
                <h1 className="h1">FHIR Resource Viewer &amp; Validator</h1>
                <p className="text-xl text-gray-400 mt-4">
                  Paste a FHIR R4 JSON resource to validate required fields and types, then browse a flattened
                  field-path view. <strong className="text-gray-300">PHI never leaves your browser</strong> —
                  all validation is client-side.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">FHIR R4 JSON resource</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={10}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none font-mono text-xs"
                      placeholder='{"resourceType": "Patient", "id": "example", ...}'
                      spellCheck="false"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => validate()}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Validate
                    </button>
                    <label className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 transition-colors cursor-pointer">
                      Load .json file
                      <input type="file" accept=".json,.txt" className="hidden" onChange={onFile} />
                    </label>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE_PATIENT); setResult(validateFhir(SAMPLE_PATIENT)); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Sample Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => { setInput(SAMPLE_OBSERVATION); setResult(validateFhir(SAMPLE_OBSERVATION)); }}
                      className="px-3 py-2 rounded-md text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      Sample Observation
                    </button>
                  </div>

                  {result && (
                    <div>
                      <div className={`rounded-md px-4 py-3 mb-4 text-sm font-medium ${result.valid ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'}`}>
                        {result.valid
                          ? `Valid ${result.resourceType} resource`
                          : result.resourceType
                            ? `${result.resourceType} — validation issues found`
                            : 'Invalid FHIR resource'}
                      </div>

                      <div className="mb-6">
                        {result.checks.map((c, i) => <CheckRow key={i} check={c} />)}
                      </div>

                      {result.summary.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-300 mb-2">Field view ({result.summary.length} fields)</h3>
                          <div className="overflow-x-auto max-h-96 overflow-y-auto">
                            <table className="w-full text-xs">
                              <thead className="sticky top-0 bg-gray-800">
                                <tr className="text-left text-gray-400 border-b border-gray-700">
                                  <th className="pb-2 pr-4">Path</th>
                                  <th className="pb-2">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.summary.map((row, i) => (
                                  <tr key={i} className="border-b border-gray-700/50 align-top">
                                    <td className="py-1.5 pr-4 font-mono text-gray-400 whitespace-nowrap">{row.path}</td>
                                    <td className="py-1.5 font-mono text-gray-200 break-all">{row.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 text-sm text-gray-500 space-y-2">
                  <p>
                    <strong className="text-gray-400">Supported resources:</strong> Patient, Observation, Bundle,
                    Encounter, MedicationRequest, Condition, Procedure, DiagnosticReport, AllergyIntolerance,
                    Immunization, Organization, Practitioner. Other resource types are parsed and displayed without
                    schema checks.
                  </p>
                  <p>
                    This validates structure and common required fields — not full FHIR profile conformance. For
                    HL7 v2 messages, use the{' '}
                    <a href="/tools/hl7-parser/" className="text-purple-400 hover:text-purple-300">HL7 Message Parser</a>.
                  </p>
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

export default FhirValidator;
