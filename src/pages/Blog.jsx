import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import bb from '../images/bb.png';

import FeaturedPost from './FeaturedPost';




  const featuredPosts = [
    {
      title: 'How to issue an asset on Stellar',
      date: '14/05/2020',
      description:
        'Here you will learn how to issue an asset on the Stellar Network using the Stellar Laboratory.',
      image: bb,
      imageText: 'Image Text',
      link: 'https://edunode.org/blog/How-to-issue',
    },
    {
      title: 'What is Keybase?',
      date: '23/05/2020',
      description:
        'Keybase is the best privacy-focused messaging app with a native integration of the Stellar network.',
      image: bb,
      imageText: 'Keybase',
      link: 'https://edunode.org/blog/What-is-Keybase',
    },
    {
      title: 'Stellarnomics',
      date: '14/06/2020',
      description:
        'Monetary aspects of the Stellar Consensus Protocol and its steps towards decentralization',
      image: bb,
      imageText: 'Stellarnomics',
      link: 'https://edunode.org/blog/Stellarnomics',
    },
    {
      title: 'Kelp: Setup your first trading bot',
      date: '03/09/2020',
      description:
        'Kelp is a free and open-source trading bot that supports the SDEX and 100+ centralized exchanges',
      image: bb,
      imageText: 'Kelp',
      link: 'https://edunode.org/blog/Stellarnomics',
    },
    {
      title: 'Identity verification with Albedo',
      date: '09/10/2020',
      description:
        'Albedo allows other Stellar apps to request transaction signing or identity verification without ever exposing your secret key.',
      image: bb,
      imageText: 'Albedo',
      link: 'https://edunode.org/blog/albedo',
    },
    {
      title: 'How to keep your lumens safe.',
      date: '08/12/2020',
      description:
        'Trying to keep your lumens safe is one of the challenges that cryptocurrencies face right now and the Stellar Ecosystem is not the exception.',
      image: bb,
      imageText: 'Tips and Security tools',
      link: 'https://edunode.org/blog/security-tools',
    },
    {
      title: 'What are NFTs and how to mint them using the Stellar Network?',
      date: '09/06/2021',
      description:
        'Have you ever of NFTs? I would say probably, it is right now all over the internet',
      image: bb,
      imageText: 'NFTs on Stellar',
      link: 'https://edunode.org/blog/minting-nfts',
    },
    {
      title: 'What are Smart Contracts?',
      date: '26/07/2021',
      description:
        'In the following blog post, we will talk about them, its early days, and how you can get started building SCs on Stellar.',
      image:bb,
      imageText: 'Smart Contracts',
      link: 'https://edunode.org/blog/smart-contracts',
    },
    {
      title: 'DeFi Explained: What is an Automated Market Maker?',
      date: '13/12/2021',
      description:
        'What are AMMs? Why are they useful? And how they are being used in decentralized finance.',
      image: bb,
      imageText: 'DeFi Explained: What is an Automated Market Maker?',
      link: 'https://edunode.org/blog/automated-market-maker',
    },
    {
      title: 'Learn about Blockchain',
      date: '17/05/2022',
      description:
        'Learn about Blockchain, what are the most popular applications, and how you can apply them to make your day-to-day activities easier.',
      image: bb,
      imageText: 'Learn about Blockchain and how to apply it to your day-to-day business life',
      link: 'https://edunode.org/blog/learn-about-blockchain',
    },
    {
      title: 'The Web3 Revolution And The New Creator Economy',
      date: '12/08/2022',
      description:
        'Before we can actually understand what Web3.0 means, it is essential to understand what Web1.0 and Web2.0 are.',
      image: bb,
      imageText: 'Learn about Blockchain and how to apply it to your day-to-day business life',
      link: 'https://edunode.org/blog/the-web3-revolution',
    },
  ];

function Imprint() {


    


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">welcome to our Blogs</h1>
              </div>

              {/* Form */}
              <div className="max-w-XL mx-auto">
              <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb:6}}>
              
        <main>
          
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} >
            {/* <Main title="" posts={posts} /> */}
            
        
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

export default Imprint;