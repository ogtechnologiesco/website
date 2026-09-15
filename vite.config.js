import { defineConfig } from 'vite'
import path from 'path'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import vitePrerender, { PuppeteerRenderer } from 'vite-plugin-prerender'
import viteImagemin from 'vite-plugin-imagemin'

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
  '/tools/iso-27001-gap-analysis': { title: 'ISO 27001 Gap Analysis Tool - Free Readiness Assessment | OG Technologies EU', description: 'Free ISO/IEC 27001:2022 gap analysis tool. Assess your ISMS against all clauses and Annex A controls. Get a readiness score, prioritized gap list, and downloadable PDF report.' },
  '/tools/iso-9001-readiness-checker': { title: 'ISO 9001 Readiness Checker - Free QMS Self-Assessment | OG Technologies EU', description: 'Free ISO 9001:2015 readiness checker. Assess your Quality Management System against all clauses and quality management principles. Get a readiness score, prioritized gap list, and downloadable PDF report.' },
  '/tools/iso-42001-ai-readiness': { title: 'ISO 42001 AI Readiness Assessment - Free AIMS Checker | OG Technologies EU', description: 'Free ISO/IEC 42001:2023 AI readiness assessment tool. Evaluate your AI Management System against all clauses and Annex A controls. Get a maturity score, prioritized gap list, and downloadable PDF report.' },
  '/tools/iso-8601-validator': { title: 'ISO 8601 Date Validator - Free Online Date Format Checker | OG Technologies EU', description: 'Free ISO 8601 / RFC 3339 date validator. Validate date-time strings in bulk, catch malformed formats, illegal leap days, and missing offsets. 100% browser-based, no uploads.' },
  '/tools/ethereum-toolkit': { title: 'Ethereum Developer Toolkit - Wei Converter, Keccak256, ABI Encoder | OG Technologies EU', description: 'Free browser-based Ethereum developer tools: Wei/Gwei/ETH unit converter, Keccak256 hash generator, Solidity function selector calculator, ABI encoder/decoder, and EIP-55 address checksum validator. 100% client-side.' },
  '/tools/aws-arn-parser': { title: 'AWS ARN Parser & Builder - Free Online Tool | OG Technologies EU', description: 'Parse AWS ARN strings into components (partition, service, region, account ID, resource) or build valid ARNs from fields. 100% client-side, no data sent to any server.' },
  '/tools/iam-policy-validator': { title: 'AWS IAM Policy Validator - Free Online Security Checker | OG Technologies EU', description: 'Paste an AWS IAM policy JSON and instantly flag wildcards, privilege escalation, NotAction traps, public principals, and check policy size limits. 100% client-side.' },
  '/tools/sap-odata-url-builder': { title: 'SAP OData URL Builder - Free Online Query Tool | OG Technologies EU', description: 'Build SAP OData query URLs interactively with $select, $expand, $filter, $orderby, $top, $skip, $format, and $count parameters. 100% client-side.' },
  '/tools/hash-generator': { title: 'Hash Generator - SHA-256, SHA-512, Keccak256, MD5 | OG Technologies EU', description: 'Generate hashes online: MD5, SHA-1, SHA-256, SHA-384, SHA-512, Keccak-256, Keccak-512. Text or hex input, multiple algorithms simultaneously. 100% client-side.' },
  '/tools/xml-tools': { title: 'XML Tools - Formatter, Validator, Converter | OG Technologies EU', description: 'Free online XML tools: format and beautify XML, validate well-formedness, convert XML to JSON or CSV, minify XML, and test XPath expressions. 100% browser-based, no data sent to any server.' },
  '/tools/xml-formatter': { title: 'Free XML Formatter & Beautifier Online | OG Technologies EU', description: 'Format and beautify XML with customizable indentation (2 spaces, 4 spaces, or tabs). Pretty-print minified XML online — 100% browser-based, no data sent to any server.' },
  '/tools/xml-validator': { title: 'Free XML Validator Online - Check Well-Formed XML | OG Technologies EU', description: 'Validate XML well-formedness online. Check for unclosed tags, unescaped characters, duplicate attributes, and multiple root elements. Get error line and column numbers — 100% browser-based.' },
  '/tools/xml-to-json': { title: 'Free XML to JSON Converter Online | OG Technologies EU', description: 'Convert XML to JSON online using the @-prefix attribute convention (compatible with xml2js and xmltodict). Repeated elements become arrays automatically. 100% browser-based, no uploads.' },
  '/tools/xml-minifier': { title: 'Free XML Minifier Online - Compress XML | OG Technologies EU', description: 'Minify and compress XML by removing unnecessary whitespace. Reduce XML file size for production payloads. Shows original vs minified size and savings percentage — 100% browser-based.' },
  '/tools/xpath-tester': { title: 'Free XPath Tester Online - Evaluate XPath Expressions | OG Technologies EU', description: 'Test and evaluate XPath expressions against XML documents in real time. Supports XPath 1.0 via the browser native document.evaluate(). 100% client-side, no data sent to any server.' },
  '/tools/xml-to-csv': { title: 'Free XML to CSV Converter Online | OG Technologies EU', description: 'Convert XML to CSV online with automatic record element detection. Attributes included as @-prefixed columns. Choose comma, semicolon, or tab delimiter. Download or copy — 100% browser-based.' },
  '/tools/merge-pdf': { title: 'Free Merge PDF Tool - Combine PDF Files Online | OG Technologies EU', description: 'Merge two or more PDF files into one document directly in your browser. No file is ever uploaded to a server — 100% client-side and private.' },
  '/tools/split-pdf': { title: 'Free Split PDF Tool - Extract PDF Pages Online | OG Technologies EU', description: 'Split a PDF at any page number to extract specific pages or ranges. 100% browser-based — no file is ever uploaded to a server.' },
  '/tools/image-to-pdf': { title: 'Free Image to PDF Converter - PNG/JPG to PDF Online | OG Technologies EU', description: 'Convert PNG and JPG images to PDF directly in your browser. No file is ever uploaded to a server — 100% client-side and private.' },
  '/tools/document-to-pdf': { title: 'Free Document to PDF Converter - DOCX/ODT/TXT to PDF | OG Technologies EU', description: 'Convert DOCX, ODT, and TXT documents to PDF directly in your browser. Preserves text, headings, bold/italic, lists, tables, and images. No file is ever uploaded to a server.' },
  '/tools/pdf-to-word': { title: 'Free PDF to Word Converter - PDF to DOCX/TXT/HTML Online | OG Technologies EU', description: 'Convert PDF to Word (.docx), plain text (.txt), or HTML directly in your browser. No file is ever uploaded to a server — 100% client-side and private.' },
  '/tools/wei-converter': { title: 'Free Wei to Ether Converter - Wei/Gwei/ETH Unit Calculator | OG Technologies EU', description: 'Convert between Wei, Gwei, Finney, and Ether with full BigInt precision — no floating point errors. Free browser-based Ethereum unit converter. 100% client-side, no data sent to any server.' },
  '/tools/keccak256-hash': { title: 'Free Keccak256 Hash Generator Online - Ethereum Hash | OG Technologies EU', description: 'Compute the Keccak-256 hash of any text or hex data. This is the hash function used throughout Ethereum for addresses, storage, signatures, and function selectors. 100% client-side, no data sent to any server.' },
  '/tools/function-selector': { title: 'Free Solidity Function Selector Calculator - 4-Byte Selector | OG Technologies EU', description: 'Calculate the 4-byte function selector for any Solidity function signature. Uses keccak256 of the canonical function signature. 100% client-side, no data sent to any server.' },
  '/tools/abi-encoder': { title: 'Free Ethereum ABI Encoder & Decoder Online | OG Technologies EU', description: 'Encode and decode Ethereum ABI calldata for smart contract interactions. Supports uint, address, bytes, string, and array types. 100% client-side, no data sent to any server.' },
  '/tools/address-checksum': { title: 'Free EIP-55 Address Checksum Validator - Ethereum | OG Technologies EU', description: 'Validate and generate EIP-55 checksummed Ethereum addresses. Check if an address has a valid mixed-case checksum. 100% client-side, no data sent to any server.' },
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
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      webp: {
        quality: 80,
      },
    }),
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
        '/tools/iso-27001-gap-analysis',
        '/tools/iso-9001-readiness-checker',
        '/tools/iso-42001-ai-readiness',
        '/tools/iso-8601-validator',
  '/tools/ethereum-toolkit',
  '/tools/aws-arn-parser',
  '/tools/iam-policy-validator',
  '/tools/sap-odata-url-builder',
  '/tools/hash-generator',
  '/tools/xml-tools',
  '/tools/xml-formatter',
  '/tools/xml-validator',
  '/tools/xml-to-json',
  '/tools/xml-minifier',
  '/tools/xpath-tester',
  '/tools/xml-to-csv',
  '/tools/merge-pdf',
  '/tools/split-pdf',
  '/tools/image-to-pdf',
  '/tools/document-to-pdf',
  '/tools/pdf-to-word',
  '/tools/wei-converter',
  '/tools/keccak256-hash',
  '/tools/function-selector',
  '/tools/abi-encoder',
  '/tools/address-checksum',
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
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
