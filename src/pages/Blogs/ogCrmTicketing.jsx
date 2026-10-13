import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import heroImage from '../../images/blog-og-crm-launch.jpg';
import RelatedPosts from '../../components/RelatedPosts';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

function OgCrmTicketing() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Helmet>
          <title>Introducing OG CRM &amp; Ticketing: Contacts, Deals, and Support in One Platform | OG Technologies EU</title>
          <meta name="description" content="Announcing OG CRM & Ticketing — our flagship platform combining contact management, companies, leads, opportunities, activities, and a full helpdesk with priorities and threaded tickets. CSV import, analytics dashboard, free tier available." />
          <meta name="keywords" content="OG CRM, CRM platform, ticketing system, helpdesk software, contact management, sales pipeline, customer support tool, CSV import CRM, free CRM, OG Technologies EU" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.ogtechnologies.co/blog/introducing-og-crm-ticketing/" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://www.ogtechnologies.co/blog/introducing-og-crm-ticketing/" />
          <meta property="og:title" content="Introducing OG CRM & Ticketing: Contacts, Deals, and Support in One Platform" />
          <meta property="og:description" content="Our flagship CRM & Ticketing platform: contacts, companies, deals, activities, and a full helpdesk — with CSV import and a free tier." />
          <meta property="og:image" content="https://www.ogtechnologies.co/og-og-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.ogtechnologies.co/blog/introducing-og-crm-ticketing/" />
          <meta name="twitter:title" content="Introducing OG CRM & Ticketing: Contacts, Deals, and Support in One Platform" />
          <meta name="twitter:description" content="Our flagship CRM & Ticketing platform: contacts, companies, deals, activities, and a full helpdesk — with CSV import and a free tier." />
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
                {/* Blog header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">Introducing OG CRM &amp; Ticketing: Contacts, Deals, and Support in One Platform</h1>
                  <div className="text-gray-400 text-center">13/10/2026</div>
                </div>

                {/* Blog content */}
                <div className="max-w-3xl mx-auto">
                  <img
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0"
                    src={heroImage}
                    alt="OG CRM & Ticketing platform — contacts, deals, and helpdesk in one place"
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />

                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      Today we are putting a name on what has quietly become our most-used internal system and the backbone of our client work: <strong>OG CRM &amp; Ticketing</strong>, our flagship product. It is a complete customer relationship platform — contacts, companies, leads, opportunities, and activities — with a full helpdesk built directly on top of the customer record. One platform, one customer view, no duct-taped integrations.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Why We Built It</h3>
                    <p className="mb-8">
                      Every client engagement taught us the same lesson: the moment sales data and support data live in different tools, both sides go blind. Support answers tickets without knowing the customer is mid-renewal; sales walks into calls unaware of three unresolved incidents. The usual fix — syncing two SaaS products — adds cost, lag, and a failure point. We wanted the shared record to be the default, not the integration project. So we built it.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">What's Inside</h3>
                    <p className="mb-8">
                      <strong>Contacts &amp; Companies.</strong> A deduplicated contact database with tags, statuses (customer, lead, prospect), custom fields, and real account hierarchies — every contact can roll up to a company with its own activity view.
                    </p>
                    <p className="mb-8">
                      <strong>Leads &amp; Opportunities.</strong> A visible pipeline from first touch to close, so deals have stages, values, and owners — and nothing depends on someone's memory of a spreadsheet.
                    </p>
                    <p className="mb-8">
                      <strong>Activities.</strong> Calls, meetings, notes, and follow-ups logged against the customer timeline. The next person who picks up the account gets the full story, not a mystery.
                    </p>
                    <p className="mb-8">
                      <strong>Ticketing Helpdesk.</strong> Every ticket carries status, priority, an owner, and a threaded comment history — with ticket detail pages for the full conversation. Because tickets sit on the same record as deals and activities, agents work with real customer context: plan, history, open opportunities.
                    </p>
                    <p className="mb-8">
                      <strong>CSV &amp; JSON Import.</strong> Moving in should not require a consultant. The importer maps your columns (name, email, phone, company, title, tags, status), validates emails, skips duplicate rows, and reports row-level results — and it just shipped alongside this announcement. Clean your file first with our free{' '}
                      <Link to="/tools/csv-deduplicator/" className="text-purple-400 hover:text-purple-300 underline">CSV Deduplicator</Link>, then import it straight into the CRM.
                    </p>
                    <p className="mb-8">
                      <strong>Dashboard &amp; Analytics.</strong> Pipeline value, contact growth, and ticket activity in one dashboard — the numbers you need for a Monday standup, without a BI tool.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Getting Started Takes Minutes</h3>
                    <p className="mb-8">
                      <Link to="/signup/" className="text-purple-400 hover:text-purple-300 underline">Create an account</Link>, open{' '}
                      <Link to="/crm/" className="text-purple-400 hover:text-purple-300 underline">the CRM</Link>, and import your contacts from CSV — the importer guides you through column mapping. Raise your first ticket in{' '}
                      <Link to="/helpdesk/" className="text-purple-400 hover:text-purple-300 underline">the Helpdesk</Link>{' '}
                      and it is already linked to the customer who raised it.
                    </p>
                    <p className="mb-8">
                      Pricing is deliberately simple: a genuinely usable <strong>free tier</strong>, <strong>Pro at €8/month</strong> with a 14-day trial, and Enterprise plans for larger teams — full details on the{' '}
                      <Link to="/pricing/" className="text-purple-400 hover:text-purple-300 underline">pricing page</Link>. If you want a guided tour first,{' '}
                      <Link to="/quote/" className="text-purple-400 hover:text-purple-300 underline">request a demo</Link>{' '}
                      and we will walk through it with your real workflow.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">What's Next</h3>
                    <p className="mb-8">
                      This is active development, not a finished artifact. On the roadmap: deeper automation rules for ticket routing and follow-ups, richer multi-channel intake, and expanded reporting. If there is a capability your team needs, tell us — the fastest way to shape the roadmap is to use the product and be loud about what is missing.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Frequently Asked Questions</h3>
                    <h4 className="h4 mb-3 text-gray-100">Is there a free tier?</h4>
                    <p className="mb-8">
                      Yes — a real free tier, not a 14-day countdown. Pro is €8/month with a 14-day trial (no credit card required to start), and Enterprise plans cover larger teams. See the{' '}
                      <Link to="/pricing/" className="text-purple-400 hover:text-purple-300 underline">pricing page</Link> for the full feature comparison.
                    </p>
                    <h4 className="h4 mb-3 text-gray-100">Can I import my existing contacts?</h4>
                    <p className="mb-8">
                      Yes — the importer accepts CSV and JSON (Excel and XML are handled server-side). You map your columns before anything is written, invalid emails are flagged, and duplicate emails inside the file are skipped and reported. Deduplicate first with our{' '}
                      <Link to="/tools/csv-deduplicator/" className="text-purple-400 hover:text-purple-300 underline">CSV Deduplicator</Link>.
                    </p>
                    <h4 className="h4 mb-3 text-gray-100">Does it include a helpdesk?</h4>
                    <p className="mb-8">
                      Yes — ticketing is built in, not bolted on. Tickets have status, priority, ownership, and threaded comments, and they live on the same customer record as your deals and activities.
                    </p>

                    <div className="mt-12 pt-8 border-t border-gray-700">
                      <p className="text-gray-400 mb-4">
                        <strong>Olvis Enrique Gil Ríos</strong> is the founder of OG Technologies EU, a Vienna-based consultancy helping enterprises and startups adopt AI, blockchain, and international standards.
                      </p>
                      <p className="text-gray-500 text-sm">
                        #OGCRM #CRM #Ticketing #Helpdesk #CustomerSupport #SaaS #OGTechnologies
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </main>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <RelatedPosts currentLink="/blog/introducing-og-crm-ticketing" categories={['Company', 'Product']} />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default OgCrmTicketing;
