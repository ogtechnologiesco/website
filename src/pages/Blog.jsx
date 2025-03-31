// Imprint.js
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';
import FeaturedPost from './FeaturedPost';
import blog1 from '../images/blog1.jpg';
import meridian from '../images/meridian.png';
import stand from '../images/stand.jpeg';
import ebsi from '../images/ebsi2.png';

const myPosts = [
  {
    title: 'Reaching new Tech frontiers with OG Technologies EU',
    date: '14/05/2024',
    description:
      'In todays fast-paced business landscape, technology plays a crucial role in driving growth and innovation.',
    image: blog1,
    imageText: 'Image Text',
    link: '/blog/reaching-new-frontiers',
  },
  {
    title: 'Meeting the Stellar Community at Meridian 2024',
    date: '24/10/2024',
    description:
      'Last week, we had the incredible opportunity to attend Meridian 2024 in London, where the Stellar community gathered to discuss...',
    image: meridian,
    imageText: 'meridian',
    link: '/blog/meridian-2024-highlights',
  },
 {
   title: 'How Blockchain Standards Enable Enterprises to Reach Global Customers',
     date: '22/11/2024',
     description: 'In todays interconnected business world, standards play a crucial role in helping enterprises expand their reach and connect with more customers.',
     image: stand,
     imageText: 'standards',
    link: '/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers',
   },
   {
    title: 'Verifying EBSI Verifiable Credentials, trust chain verification and compliance',
    date: '30/03/2025',
    description: 'In this article, we explore the key requirements for ensuring the authenticity and compliance of verifiable credentials within the European Blockchain Services Infrastructure (EBSI).',
    image: ebsi,
    imageText: 'Key requirements for verifying EBSI Verifiable Credentials',
    link: '/blog/ebsi-verifiable-credentials',
   },
];

function Blog() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome to our Blog</h1>
                <p>
                  Hello, and welcome to the blog of OG Technologies EU! We are thrilled you've decided to join us on this digital journey as we explore the dynamic world of Information Technology (IT) and the innovative solutions we offer at our top-tier consulting firm.
                  Based in Europe, OG Technologies EU is a leading IT consulting company with a strong commitment to delivering high-quality services and customized solutions to businesses across various industries. Our areas of expertise include Finance, Education, and Corporate Helpdesk. In addition, we set ourselves apart from the competition by specializing in cutting-edge technologies such as Web3 and Blockchain.
                </p>
              </div>

              {/* Posts */}
              <div className="max-w-XL mx-auto">
                <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb: 6 }}>
                  <main>
                    <Grid container spacing={4}>
                      {myPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                      ))}
                    </Grid>
                  </main>
                </Container>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
