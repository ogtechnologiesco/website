import React from 'react';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import PageIllustration from '../../partials/PageIllustration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useInView } from 'react-intersection-observer';
import './BlogPost.css';
import img from "../../images/meridian.png"; // Make sure to add an appropriate image
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function MeridianBlogPost() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Update image gallery data with actual images
  const galleryImages = [

    {
      src: "https://i.imgur.com/kNfOJU5.jpeg",
      alt: "Stellar Community Gathering",
      placeholder: "https://i.imgur.com/kNfOJU5t.jpeg",
      srcSet: "https://i.imgur.com/kNfOJU5.jpeg",
      sizes: "(max-width: 768px) 100vw, 50vw"
    },
    {
      src: "https://i.imgur.com/7sA44MU.jpeg",
      alt: "Conference Presentations",
      placeholder: "https://i.imgur.com/7sA44MUt.jpeg",
      srcSet: "https://i.imgur.com/7sA44MU.jpeg",
      sizes: "(max-width: 768px) 100vw, 50vw"
    },
    {
      src: "https://i.imgur.com/ZgcYdB9.jpeg",
      alt: "Meridian Conference Highlights",
      placeholder: "https://i.imgur.com/ZgcYdB9t.jpeg",
      srcSet: "https://i.imgur.com/ZgcYdB9.jpeg",
      sizes: "(max-width: 768px) 100vw, 50vw"
    },
    {
      src: "https://i.imgur.com/PsnLtgx.jpeg",
      alt: "Networking at Meridian",
      placeholder: "https://i.imgur.com/PsnLtgxt.jpeg",
      srcSet: "https://i.imgur.com/PsnLtgx.jpeg",
      sizes: "(max-width: 768px) 100vw, 50vw"
    },
    {
      src: "https://i.imgur.com/4ZcKHoE.jpeg",
      alt: "Meridian Event Space",
      placeholder: "https://i.imgur.com/4ZcKHoEt.jpeg",
      srcSet: "https://i.imgur.com/4ZcKHoE.jpeg",
      sizes: "(max-width: 768px) 100vw, 50vw"
    },
    {
      src: "https://i.imgur.com/uEv90cr.jpeg",
      alt: "Meridian Additional View",
      placeholder: "https://i.imgur.com/uEv90crt.jpeg",
      srcSet: "https://i.imgur.com/uEv90cr.jpeg",
      sizes: "(max-width: 768px) 100vw, 50vw"
    },
    {
      src: "https://i.imgur.com/w929Qo4.jpeg",
      alt: "Meridian 2024 Conference Main Stage",
      placeholder: "https://i.imgur.com/w929Qo4t.jpeg",
      srcSet: "https://i.imgur.com/w929Qo4.jpeg",
      sizes: "(max-width: 768px) 100vw, 50vw"
    },
  ];

  // Create optimized versions for the hero image
  const heroImage = {
    src: img,
    placeholder: img.replace('.png', '-small.png'),
    srcSet: `
      ${img.replace('.png', '-sm.png')} 500w,
      ${img.replace('.png', '-md.png')} 1000w,
      ${img} 1500w
    `,
    sizes: "100vw"
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Helmet>
        <title>Meeting the Stellar Community at Meridian 2024: A Defining Moment for Web3 | OG Technologies EU</title>
        <meta name="description" content="Discover our experience at Meridian 2024 in London, where we explored the future of blockchain, DeFi, and Stellar's innovative solutions for enterprise-level adoption." />
        <meta name="keywords" content="Meridian 2024, Stellar blockchain, DeFi, Web3, blockchain conference, Soroban, enterprise blockchain, OG Technologies EU" />
        <meta property="og:title" content="Meeting the Stellar Community at Meridian 2024: A Defining Moment for Web3" />
        <meta property="og:description" content="Explore our insights from Meridian 2024, where the Stellar community gathered to discuss the future of blockchain and financial technology." />
        <meta property="og:image" content={heroImage.src} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://yourdomain.com/blogs/meridian-2024" />
        <link rel="preload" as="image" href={heroImage.placeholder} />
      </Helmet>

      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow" itemScope itemType="http://schema.org/BlogPosting">
        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                {/* Update the hero image */}
                <div
                  ref={ref}
                  className={`blog-image ${inView ? 'slide-in' : ''}`}
                >
                  <LazyLoadImage
                    src={heroImage.src}
                    alt="Meeting the Stellar Community at Meridian 2024"
                    effect="blur"
                    itemProp="image"
                    threshold={100}
                    placeholderSrc={heroImage.placeholder}
                    srcSet={heroImage.srcSet}
                    sizes={heroImage.sizes}
                    width="100%"
                    height="auto"
                  />
                </div>
                <h1 className="h1" itemProp="headline">Meeting the Stellar Community at Meridian 2024: A Defining Moment for Web3</h1>
                <meta itemProp="datePublished" content="2024-10-19" /> 
                <meta itemProp="author" content="OG Technologies EU" />
              </div>

              {/* Blog content */}
              <div className="max-w-XL mx-auto" itemProp="articleBody">
                <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb: 6 }}>
                  <Typography textAlign="left" variant="h5" align="justify" color="white" component="p">
                    We had the incredible opportunity to attend Meridian 2024 in London, where the Stellar community gathered to discuss the future of blockchain and the next chapter of financial technology. This event, designed to connect developers, entrepreneurs, and thought leaders, exceeded every expectation, leaving us energized and more excited than ever about the impact of decentralized finance (DeFi) on the global economy.
                    <br /><br />
                    <strong>A Warm Welcome from the Stellar Ecosystem</strong><br />
                    One of the most striking aspects of the Meridian conference was the sheer warmth and openness of the Stellar community. From the moment we arrived, it was clear that this was a group of people driven by the shared vision of a more inclusive financial system, powered by blockchain and built on the values of transparency and innovation. We loved that this year´s slogan "Transformation" matched our own vision of transforming people and businesses through Blockchain innovations. The community’s deep passion for financial inclusion and creating accessible, affordable cross-border payment solutions resonated deeply with us.
                    <br /><br />
                    Throughout the event, we were fortunate to engage in insightful conversations with developers, network participants, and decision-makers, all of whom were eager to share ideas, collaborate, and explore new possibilities. This exchange of knowledge and experiences highlighted the collaborative spirit that is driving Stellar's growth and global adoption. We left feeling more connected to the community and inspired by the potential that lies ahead.
                    <br /><br />
                    <strong>Stellar's Vision Aligns with Our Mission</strong><br />
                    As a company deeply invested in Web3 technologies and enterprise-level blockchain solutions, seeing Stellar's long-term commitment to building an open financial infrastructure felt like a perfect alignment with the work we do at OG Technologies EU. Their vision for a decentralized, borderless economy mirrors our belief in the transformative power of blockchain for businesses of all sizes.
                    <br /><br />
                    At Meridian, the discussions around Stellar’s smart contracts (Soroban), asset tokenization, Stellar Aid Assist, the work with Moneygram, and more showcased Stellar’s forward-thinking approach. These innovations are exactly the kind of solutions we believe will define the next wave of blockchain adoption in enterprise settings. Listening to use cases from across industries and regions further emphasized how Stellar is not just thinking about technology but also about real-world applications and impact.
                    <br /><br />
                    <strong>Highlight: The Power of Collaboration</strong><br />
                    The true highlight of the event was experiencing first-hand the collaborative energy that thrives within the Stellar Global ecosystem. Whether it was brainstorming during breakout sessions or casually chatting with fellow attendees between panels, there was a sense that every conversation had the potential to spark something innovative.
                    <br /><br />
                    The conference’s emphasis on connecting developers with business leaders and decision-makers provided a unique opportunity for real-world collaborations. For us, this was a chance to share insights about how we help enterprises integrate blockchain into their operations, while also learning from those who are pushing the boundaries of Decentralized Finance (DeFi) and cross-border payments.
                    <br /><br />
                    <strong>Moving Forward with Stellar</strong><br />
                    Leaving Meridian, we felt even more confident about the future of Stellar and its growing role in reshaping how businesses approach payments, assets, and financial infrastructure. As we continue to push the boundaries of Web3 adoption, we’re excited to explore deeper collaborations within the Stellar ecosystem, bringing our expertise in enterprise blockchain solutions to further accelerate the adoption of Stellar technologies in businesses around the globe.
                    <br /><br />
                    In summary, attending Meridian 2024 was more than just an opportunity to learn—it was an inspiring reminder of the power of community, collaboration, and innovation. We can’t wait to see what’s next for Stellar, and we’re proud to be part of a movement that’s changing the world one blockchain transaction at a time.
                    <br /><br />
                    <strong>Until Next Time</strong><br />
                    To the Stellar team and community: Thank you for making this event so transformative. We’re already looking forward to the next Meridian and continuing this journey together. Here’s to a future built on blockchain, innovation, and inclusion!
                  </Typography>

                  {/* Optimized image gallery */}
                  <div className="image-gallery grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="gallery-image-wrapper relative">
                        <LazyLoadImage
                          src={image.src}
                          alt={image.alt}
                          effect="blur"
                          placeholderSrc={image.placeholder}
                          srcSet={image.srcSet}
                          sizes={image.sizes}
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                          threshold={100}
                        />
                      </div>
                    ))}
                  </div>

                  <Typography textAlign="left" variant="h5" align="justify" color="white" component="p">
                    {/* Continue with existing text */}
                  </Typography>
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

export default MeridianBlogPost;

