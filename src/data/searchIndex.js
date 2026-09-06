import { blogPosts } from './blogPosts';

export const searchIndex = [
  { title: 'Home', description: 'OG Technologies EU - IT consulting for Web3, blockchain, and enterprise solutions', path: '/' },
  { title: 'Products', description: 'Our software products and platforms including EduNode and Mozart Pay', path: '/products' },
  { title: 'Pricing', description: 'Pricing plans for IT consulting and software development services', path: '/pricing' },
  { title: 'Standards', description: 'Blockchain and IT standards consulting - ISO, CEN, EBSI', path: '/standards' },
  { title: 'DORA Compliance', description: 'Digital Operational Resilience Act compliance consulting', path: '/dora' },
  { title: 'Blog', description: 'Insights on Web3, blockchain standards, verifiable credentials, and digital payments', path: '/blog' },
  { title: 'Ventures', description: 'Supporting startups, spin-offs, and intrapreneurship programs', path: '/ventures' },
  { title: 'Portfolio', description: 'Innovative projects including EduNode and Mozart Pay', path: '/portfolio' },
  { title: 'Careers', description: 'Join OG Technologies EU - jobs in Web3, blockchain, and enterprise IT', path: '/careers' },
  { title: 'Request a Quote', description: 'Get a customized quote for IT consulting services', path: '/quote' },
  { title: 'Helpdesk', description: 'IT helpdesk and support services', path: '/helpdesk' },
  { title: 'Terms and Conditions', description: 'Terms for using OG Technologies EU website and services', path: '/terms' },
  { title: 'Privacy Policy', description: 'How we collect, use, and protect your personal information', path: '/privacy' },
  { title: 'Cookie Policy', description: 'Types of cookies we use and GDPR compliance', path: '/cookie-policy' },
  { title: 'Imprint', description: 'Legal imprint for OG Technologies EU, Vienna, Austria', path: '/imprint' },
  // Tools
  { title: 'HTML to Image', description: 'Convert HTML content to images', path: '/tools/html-to-image' },
  { title: 'Screenshot to Image', description: 'Capture screenshots of web pages', path: '/tools/screenshot-to-image' },
  { title: 'PDF Tools', description: 'PDF manipulation and conversion utilities', path: '/tools/pdf-tools' },
  { title: 'Security Scanner', description: 'Scan websites for security vulnerabilities', path: '/tools/security-tools' },
  { title: 'Blockchain Compliance Checker', description: 'Check blockchain smart contracts for compliance', path: '/tools/blockchain-compliance-checker' },
  // Blog posts
  ...blogPosts.map((post) => ({
    title: post.title,
    description: post.description,
    path: post.link,
    categories: post.categories,
  })),
];

export function search(query, limit = 8) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  return searchIndex
    .map((item) => {
      const titleLower = item.title.toLowerCase();
      const descLower = (item.description || '').toLowerCase();
      const catsLower = (item.categories || []).join(' ').toLowerCase();

      let score = 0;
      terms.forEach((term) => {
        if (titleLower.includes(term)) score += 3;
        if (descLower.includes(term)) score += 2;
        if (catsLower.includes(term)) score += 2;
        if (titleLower.startsWith(term)) score += 2;
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
