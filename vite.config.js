import { defineConfig } from 'vite'
import path from 'path'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import vitePrerender, { PuppeteerRenderer } from 'vite-plugin-prerender'

const routeMeta = {
  '/': { title: 'OG Technologies EU - Web3 & Blockchain Innovation', description: 'Transforming businesses through Web3 and blockchain innovation. Enterprise solutions for the decentralized future.' },
  '/products': { title: 'Products - OG Technologies EU', description: 'Explore our software products and platforms including EduNode and Mozart Pay for enterprise Web3 solutions.' },
  '/pricing': { title: 'Pricing - OG Technologies EU', description: 'Transparent pricing plans for IT consulting, software development, and blockchain services.' },
  '/standards': { title: 'Standards - OG Technologies EU', description: 'Blockchain and IT standards consulting. ISO, CEN, EBSI standards expertise for enterprise compliance.' },
  '/dora': { title: 'DORA Compliance - OG Technologies EU', description: 'Digital Operational Resilience Act compliance consulting for financial institutions.' },
  '/blog': { title: 'Blog - OG Technologies EU | Web3, Blockchain & IT Insights', description: 'Explore the OG Technologies EU blog for insights on Web3, blockchain standards, verifiable credentials, digital payments, and enterprise IT innovation.' },
  '/blog/reaching-new-frontiers': { title: 'Reaching New Tech Frontiers with OG Technologies EU', description: 'In todays fast-paced business landscape, technology plays a crucial role in driving growth and innovation.' },
  '/blog/meridian-2024-highlights': { title: 'Meeting the Stellar Community at Meridian 2024: A Defining Moment for Web3 | OG Technologies EU', description: 'Discover our experience at Meridian 2024 in London, where we explored the future of blockchain, DeFi, and Stellar innovative solutions.' },
  '/blog/ebsi-verifiable-credentials': { title: 'Verifying EBSI Verifiable Credentials: Trust Chain Verification and Compliance | OG Technologies EU', description: 'Exploring key requirements for ensuring authenticity and compliance of verifiable credentials within EBSI.' },
  '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers': { title: 'How Blockchain Standards Enable Enterprises to Reach Global Customers | OG Technologies EU', description: 'Standards play a crucial role in helping enterprises expand their reach and connect with more customers.' },
  '/blog/digital-payments-future': { title: "Building the Rails for Europe's Digital Payment Future | OG Technologies EU", description: 'Three major transitions—MiCA, digital euro, ISO 20022—are converging. Europe is building a new digital payment infrastructure.' },
  '/blog/estandares-sismicos-colombia': { title: 'Terremoto en Colombia: guía de estándares ISO para responder, evaluar y reconstruir | OG Technologies EU', description: 'Normas clave para evaluación estructural, respuesta ante emergencias, continuidad del negocio y reconstrucción resiliente.' },
  '/ventures': { title: 'Ventures - OG Technologies EU', description: 'Supporting startups, spin-offs, and intrapreneurship programs in Web3 and blockchain.' },
  '/portfolio': { title: 'Portfolio - OG Technologies EU', description: 'Explore our innovative projects including EduNode and Mozart Pay.' },
  '/careers': { title: 'Careers - OG Technologies EU', description: 'Join OG Technologies EU. We are hiring in Web3, blockchain, and enterprise IT.' },
  '/quote': { title: 'Request a Quote - OG Technologies EU', description: 'Get a customized quote for IT consulting and software development services.' },
  '/helpdesk': { title: 'Helpdesk - OG Technologies EU', description: 'IT helpdesk and support services for enterprise clients.' },
  '/terms': { title: 'Terms and Conditions - OG Technologies EU', description: 'Terms and Conditions for the use of OG Technologies EU website and software development services.' },
  '/privacy': { title: 'Privacy Policy - OG Technologies EU', description: 'Privacy Policy for OG Technologies EU. Learn how we collect, use, and protect your personal information.' },
  '/cookie-policy': { title: 'Cookie Policy - OG Technologies EU', description: 'Cookie Policy for OG Technologies EU. Learn about the types of cookies we use and how to manage your preferences.' },
  '/imprint': { title: 'Imprint - OG Technologies EU', description: 'Legal imprint for OG Technologies EU, based in Vienna, Austria.' },
  '/tools/html-to-image': { title: 'HTML to Image Converter - OG Technologies EU', description: 'Convert HTML content to images easily with our free online tool.' },
  '/tools/screenshot-to-image': { title: 'Screenshot to Image - OG Technologies EU', description: 'Capture screenshots of web pages with our free online tool.' },
  '/tools/pdf-tools': { title: 'PDF Tools - OG Technologies EU', description: 'PDF manipulation and conversion utilities.' },
  '/tools/security-tools': { title: 'Security Scanner - OG Technologies EU', description: 'Scan websites for security vulnerabilities with our online tool.' },
  '/tools/blockchain-compliance-checker': { title: 'Blockchain Compliance Checker - OG Technologies EU', description: 'Check blockchain smart contracts for compliance with regulatory standards.' },
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      indexPath: path.join(__dirname, 'dist', 'index.html'),
      routes: [
        '/',
        '/products',
        '/pricing',
        '/standards',
        '/dora',
        '/blog',
        '/blog/reaching-new-frontiers',
        '/blog/meridian-2024-highlights',
        '/blog/ebsi-verifiable-credentials',
        '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers',
        '/blog/digital-payments-future',
        '/blog/estandares-sismicos-colombia',
        '/ventures',
        '/portfolio',
        '/careers',
        '/quote',
        '/helpdesk',
        '/terms',
        '/privacy',
        '/cookie-policy',
        '/imprint',
        '/tools/html-to-image',
        '/tools/screenshot-to-image',
        '/tools/pdf-tools',
        '/tools/security-tools',
        '/tools/blockchain-compliance-checker',
      ],
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
      renderer: new PuppeteerRenderer({
        maxConcurrentRoutes: 4,
        renderAfterTime: 5000,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      }),
      postProcess(renderedRoute) {
        const meta = routeMeta[renderedRoute.route]
        if (meta) {
          const canonicalUrl = `https://www.ogtechnologies.co${renderedRoute.route === '/' ? '' : renderedRoute.route}`

          renderedRoute.html = renderedRoute.html.replace(
            /<title>[^<]*<\/title>/,
            `<title>${meta.title}</title>`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+name="description"|name="description"\s+content="[^"]*")/,
            `$1name="description" content="${meta.description}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="og:title"|property="og:title"\s+content="[^"]*")/,
            `$1property="og:title" content="${meta.title}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="og:description"|property="og:description"\s+content="[^"]*")/,
            `$1property="og:description" content="${meta.description}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<link\s+)(?:href="[^"]*"\s+rel="canonical"|rel="canonical"\s+href="[^"]*")/,
            `$1rel="canonical" href="${canonicalUrl}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="og:url"|property="og:url"\s+content="[^"]*")/,
            `$1property="og:url" content="${canonicalUrl}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="twitter:title"|property="twitter:title"\s+content="[^"]*")/,
            `$1property="twitter:title" content="${meta.title}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="twitter:description"|property="twitter:description"\s+content="[^"]*")/,
            `$1property="twitter:description" content="${meta.description}"`
          )
          renderedRoute.html = renderedRoute.html.replace(
            /(<meta\s+)(?:content="[^"]*"\s+property="twitter:url"|property="twitter:url"\s+content="[^"]*")/,
            `$1property="twitter:url" content="${canonicalUrl}"`
          )

          const jsonLdScripts = []

          if (renderedRoute.route !== '/') {
            const segments = renderedRoute.route.split('/').filter(Boolean)
            const itemListElement = segments.map((seg, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
              item: `https://www.ogtechnologies.co/${segments.slice(0, i + 1).join('/')}`,
            }))
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement,
            })
          }

          if (renderedRoute.route.startsWith('/blog/') && renderedRoute.route !== '/blog') {
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: meta.title,
              description: meta.description,
              url: canonicalUrl,
              author: { '@type': 'Organization', name: 'OG Technologies EU' },
              publisher: { '@type': 'Organization', name: 'OG Technologies EU' },
            })
          }

          if (renderedRoute.route.startsWith('/tools/')) {
            jsonLdScripts.push({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: meta.title.replace(' - OG Technologies EU', ''),
              description: meta.description,
              url: canonicalUrl,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            })
          }

          if (jsonLdScripts.length > 0) {
            const jsonLdHtml = jsonLdScripts
              .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
              .join('')
            renderedRoute.html = renderedRoute.html.replace(
              /<\/head>/,
              `${jsonLdHtml}</head>`
            )
          }
        }
        return renderedRoute
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
