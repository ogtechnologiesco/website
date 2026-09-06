import blog1 from '../images/blog1.jpg';
import meridian from '../images/meridian.png';
import stand from '../images/stand.jpeg';
import ebsi from '../images/ebsi2.png';
import digitalPaymentsFuture from '../images/digital-payments-future.jpg';
import earthquakeStandards from '../images/pereira-earthquake.jpg';

export const blogPosts = [
  {
    title: 'Reaching new Tech frontiers with OG Technologies EU',
    date: '14/05/2024',
    description:
      'In todays fast-paced business landscape, technology plays a crucial role in driving growth and innovation.',
    image: blog1,
    imageText: 'Image Text',
    link: '/blog/reaching-new-frontiers',
    categories: ['Company', 'Web3', 'Blockchain'],
  },
  {
    title: 'Meeting the Stellar Community at Meridian 2024',
    date: '24/10/2024',
    description:
      'Last week, we had the incredible opportunity to attend Meridian 2024 in London, where the Stellar community gathered to discuss...',
    image: meridian,
    imageText: 'meridian',
    link: '/blog/meridian-2024-highlights',
    categories: ['Blockchain', 'Web3', 'Events'],
  },
  {
    title: 'How Blockchain Standards Enable Enterprises to Reach Global Customers',
    date: '22/11/2024',
    description: 'In todays interconnected business world, standards play a crucial role in helping enterprises expand their reach and connect with more customers.',
    image: stand,
    imageText: 'standards',
    link: '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers',
    categories: ['Standards', 'Blockchain', 'Compliance'],
  },
  {
    title: 'Verifying EBSI Verifiable Credentials, trust chain verification and compliance',
    date: '30/03/2025',
    description: 'In this article, we explore the key requirements for ensuring the authenticity and compliance of verifiable credentials within the European Blockchain Services Infrastructure (EBSI).',
    image: ebsi,
    imageText: 'Key requirements for verifying EBSI Verifiable Credentials',
    link: '/blog/ebsi-verifiable-credentials',
    categories: ['Standards', 'Blockchain', 'Compliance'],
  },
  {
    title: "Building the Rails for Europe's Digital Payment Future",
    date: '21/07/2026',
    description: 'Three major transitions—MiCA, digital euro, ISO 20022—are converging. Europe is building a new digital payment infrastructure, and we need the standards to make it work.',
    image: digitalPaymentsFuture,
    imageText: "Europe's Digital Payment Future",
    link: '/blog/digital-payments-future',
    categories: ['Standards', 'Payments', 'Blockchain'],
  },
  {
    title: 'Terremoto en Colombia: guía de estándares ISO para responder, evaluar y reconstruir',
    date: '14/08/2026',
    description: 'Normas clave para evaluación estructural, respuesta ante emergencias, continuidad del negocio y reconstrucción resiliente.',
    image: earthquakeStandards,
    imageText: 'Estándares ISO para resiliencia sísmica',
    link: '/blog/estandares-sismicos-colombia',
    categories: ['Standards', 'Compliance'],
  },
];

export const allCategories = ['All', 'Blockchain', 'Web3', 'Standards', 'Compliance', 'Payments', 'Company', 'Events'];

export function getRelatedPosts(currentLink, categories, count = 3) {
  return blogPosts
    .filter((post) => post.link !== currentLink)
    .map((post) => ({
      ...post,
      matchCount: post.categories.filter((c) => categories.includes(c)).length,
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, count);
}
