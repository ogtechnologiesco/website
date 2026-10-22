import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/insight-o1js-state.jpg';
import RelatedInsights from '../../components/RelatedInsights';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function O1jsStateAssertions() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>o1js State Assertions: getAndRequireEquals vs getAndAssertEquals Explained | OG Technologies EU</title>
          <meta name="description" content="What getAndRequireEquals does in o1js, why getAndAssertEquals was renamed, how state preconditions work on Mina zkApps, and what 'precondition unsatisfied' actually means." />
          <meta name="keywords" content="o1js, getAndRequireEquals, getAndAssertEquals, o1js state, mina zkapp, o1js precondition, state.get, requireEquals, o1js documentation, mina protocol" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/insights/o1js-state-assertions/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/insights/o1js-state-assertions/" />
          <meta property="og:title" content="o1js State Assertions: getAndRequireEquals vs getAndAssertEquals Explained" />
          <meta property="og:description" content="How o1js state preconditions work, why the assert* API was renamed to require*, and when state.get() is enough." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/insights/o1js-state-assertions/" />
          <meta name="twitter:title" content="o1js State Assertions: getAndRequireEquals vs getAndAssertEquals Explained" />
          <meta name="twitter:description" content="o1js state preconditions, the assert* → require* rename, and what 'precondition unsatisfied' means." />
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
                  <div className="text-purple-400 text-sm font-medium mb-2">Blockchain · Developer</div>
                  <h1 className="h1">o1js State Assertions: getAndRequireEquals vs getAndAssertEquals</h1>
                  <div className="text-gray-400 text-center mt-4">20/10/2026</div>
                </div>

                {/* Article content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="o1js state assertions on Mina zkApps"
                  />

                  <article className="prose prose-invert max-w-none text-gray-300">
                    <p className="mb-8">
                      <code className="text-purple-300">getAndRequireEquals</code> is the most-googled method in o1js —
                      the TypeScript DSL for writing zkApps on Mina Protocol — and the least documented. The short
                      version: it reads an on-chain <code className="text-purple-300">@state</code> field <em>and</em> records
                      a precondition on the account update, so the transaction is only valid if the chain state still
                      matches when it is included in a block. This is how you get atomicity on a blockchain where your
                      proof was generated minutes earlier on a laptop.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Why state reads need preconditions at all</h2>
                    <p className="mb-4">
                      A zkApp transaction is a zero-knowledge proof generated off-chain. When you prove it, the
                      contract state says <em>x = 10</em> — but by the time the transaction is included, another user
                      may have changed <em>x</em>. The proof is only meaningful if it was computed against the state the
                      chain actually had. Mina solves this with <strong className="text-gray-200">preconditions</strong>: assertions
                      on the account update that validators check before applying it. If the precondition fails, the
                      whole transaction is rejected.
                    </p>
                    <p className="mb-8">
                      <code className="text-purple-300">getAndRequireEquals()</code> couples the read and the precondition into
                      one call — you get the value in your circuit <em>and</em> the guarantee that your proof is
                      invalidated if the value changed underneath you.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">get() vs getAndRequireEquals() vs requireEquals()</h2>
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full text-sm border border-gray-700">
                        <thead><tr className="bg-gray-800"><th className="text-left p-3 border-b border-gray-700">Call</th><th className="text-left p-3 border-b border-gray-700">Inside @method</th></tr></thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr><td className="p-3 font-mono text-purple-300 text-xs">this.x.get()</td><td className="p-3">Reads the value and sets the equality precondition — in current o1js this is exactly what getAndRequireEquals does.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300 text-xs">this.x.getAndRequireEquals()</td><td className="p-3">Same as <code className="font-mono text-xs">get()</code>, but self-documenting: the precondition is explicit in the name.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300 text-xs">this.x.requireEquals(v)</td><td className="p-3">Sets the precondition <em>without</em> returning the value — for constraints on state you don't otherwise use.</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300 text-xs">this.x.set(v)</td><td className="p-3">Writes new state (an action, not a precondition).</td></tr>
                          <tr><td className="p-3 font-mono text-purple-300 text-xs">this.x.get() outside provable code</td><td className="p-3">Throws — state can't be read outside a circuit. Off-chain, use <code className="font-mono text-xs">fetch()</code> or the account's appState.</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 className="h2 mb-4 text-gray-100">Where did getAndAssertEquals go?</h2>
                    <p className="mb-8">
                      It was <strong className="text-gray-200">renamed, not removed</strong>. The <code className="text-purple-300">assert*</code> family
                      was renamed to <code className="text-purple-300">require*</code> when o1js reworked its account-update
                      API (the same rename hit <code className="text-purple-300">assertEquals</code> → <code className="text-purple-300">requireEquals</code> and
                      the network preconditions). <code className="text-purple-300">getAndAssertEquals()</code> in old tutorials
                      and GitHub issues is the same method as today's <code className="text-purple-300">getAndRequireEquals()</code> — old
                      code just needs the name swap. The rename clarified that these are account-update
                      <em>preconditions</em>, not in-circuit <code className="text-purple-300">assert()</code> calls that would
                      fail the proof itself.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Worked example</h2>
                    <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto text-xs text-gray-300 mb-8">
{`class Counter extends SmartContract {
  @state(Field) num = State<Field>();

  @method async increment() {
    // read + precondition in one call
    const num = this.num.getAndRequireEquals();
    this.num.set(num.add(1));
  }

  @method async reset(newOwner: PublicKey) {
    // precondition without needing the value back
    this.num.requireEquals(Field(0));
    this.num.set(Field(0));
  }
}`}
                    </pre>
                    <p className="mb-8">
                      The <code className="text-purple-300">increment</code> method encodes an optimistic-concurrency contract:
                      if two users race, only the first transaction lands — the second sees a changed
                      <code className="text-purple-300"> num</code> and fails the precondition.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">The error you're actually here for</h2>
                    <p className="mb-4">
                      <code className="text-purple-300">Precondition unsatisfied</code> (or a transaction silently
                      stuck/failing) means a require* assertion didn't match chain state at inclusion time. Common
                      causes:
                    </p>
                    <ul className="list-disc pl-6 mb-8 space-y-2">
                      <li>Another transaction mutated the state between proving and inclusion — the design working as intended.</li>
                      <li>You read state with a plain <code className="text-purple-300">get()</code> on an old version where it <em>didn't</em> set the precondition, and your method consumed a stale value.</li>
                      <li>You wrote an in-circuit <code className="text-purple-300">assert()</code> where you needed an account-update <code className="text-purple-300">require*</code> — the proof builds fine but the semantics differ.</li>
                      <li>Network preconditions (<code className="text-purple-300">this.network.timestamp</code>, <code className="text-purple-300">blockchainLength</code>) set too tight a range.</li>
                    </ul>

                    <h2 className="h2 mb-4 text-gray-100">Off-chain reads</h2>
                    <p className="mb-8">
                      Outside <code className="text-purple-300">@method</code> code there is no precondition machinery —
                      <code className="text-purple-300"> get()</code> throws. To display state in a UI, call
                      <code className="text-purple-300"> await this.x.fetch()</code> (o1js ≥ 1.x) or query the account's
                      <code className="text-purple-300"> appState</code> via <code className="text-purple-300">Mina.getAccount()</code>. Only provable
                      code gets the read-and-require guarantee.
                    </p>

                    <h2 className="h2 mb-4 text-gray-100">Frequently Asked Questions</h2>
                    <h3 className="h3 mb-4 text-gray-100">What does getAndRequireEquals do in o1js?</h3>
                    <p className="mb-8">
                      It reads the current value of an on-chain <code className="text-purple-300">@state</code> field inside a
                      <code className="text-purple-300">@method</code> and records an account-update precondition that the value
                      must equal what the chain holds when the transaction is included. The proof becomes invalid if
                      another transaction changes the state first.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is getAndAssertEquals different from getAndRequireEquals?</h3>
                    <p className="mb-8">
                      No — same method, renamed. o1js renamed the <code className="text-purple-300">assert*</code> precondition
                      API to <code className="text-purple-300">require*</code> to distinguish account-update preconditions from
                      in-circuit assertions. Update old code by renaming; semantics are unchanged.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Is state.get() enough inside a @method?</h3>
                    <p className="mb-8">
                      Yes, in current o1js <code className="text-purple-300">this.x.get()</code> inside provable code sets the
                      same equality precondition. <code className="text-purple-300">getAndRequireEquals()</code> is preferred in
                      code where you want the concurrency guarantee to be visible — it's self-documenting.
                    </p>
                    <h3 className="h3 mb-4 text-gray-100">Why can't I call state.get() outside a method?</h3>
                    <p className="mb-8">
                      Because a precondition only makes sense inside a transaction being proved. Off-chain reads go
                      through <code className="text-purple-300">fetch()</code> or <code className="text-purple-300">Mina.getAccount()</code>,
                      which return the raw appState without touching the account-update machinery.
                    </p>
                  </article>

                  <RelatedInsights
                    currentLink="/insights/o1js-state-assertions/"
                    categories={['Blockchain', 'Developer']}
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

export default O1jsStateAssertions;
