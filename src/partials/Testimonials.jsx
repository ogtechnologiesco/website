import React, { useEffect, useRef } from 'react';
import Hyperledger from "../images/HL.jpg"
import Stellar from '../images/stellar1.png';
import Netlify from '../images/netlify.jpg';
import Heroku from '../images/heroku.jpg';
import Ipfs from '../images/ipfs.jpg';
import Mongodb from '../images/MongoDB.jpg';
import Docker from '../images/Docker.jpg';
import Postg from '../images/postgres.png';
import Bitcoin from '../images/bitcoi.jpg'
import Vercel from '../images/Vercel.jpg'
import zaho from '../images/zaho.png'
import openai from '../images/openai.png'
import npm from '../images/NPM.png'
import ethereum from '../images/ETHEREUM.jpg'
import vite from '../images/vite.png'
import blockstandLogo from '../images/blockstand_logo1.jpg'
import ffg from '../images/ffg.png'
import asi from '../images/ASI_logo.png'
import iso from '../images/ISO_logo.png'

const Testimonials = () => {
  const scrollRef = useRef(null);

  const logos = [
  { src: openai, alt: "OpenAI", bg: "bg-black" },
  { src: Netlify, alt: "Netlify", bg: "bg-black" },
  { src: Heroku, alt: "Heroku", bg: "bg-black" },
  { src: Mongodb, alt: "MongoDB", bg: "bg-black" },
  { src: Ipfs, alt: "IPFS", bg: "bg-black" },
  { src: Docker, alt: "Docker", bg: "bg-black" },
  { src: Stellar, alt: "Stellar", bg: "bg-black" },
  { src: Postg, alt: "Postgres", bg: "bg-black" },
  { src: Bitcoin, alt: "Bitcoin", bg: "bg-black" },
  { src: Vercel, alt: "Vercel", bg: "bg-black" },
  { src: ethereum, alt: "Ethereum", bg: "bg-black" },
  { src: npm, alt: "npm", bg: "bg-black" },
  { src: zaho, alt: "Zoho", bg: "bg-black" },
  { src: vite, alt: "Vite", bg: "bg-black" },
  { src: Hyperledger, alt: "Hyperledger", bg: "bg-black" },
  { src: blockstandLogo, alt: "Blockstand", bg: "bg-black" },
  { src: ffg, alt: "FFG", bg: "bg-black" },
  { src: asi, alt: "Austrian Standards", bg: "bg-black" },
  { src: iso, alt: "ISO", bg: "bg-black" }
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust for faster/slower scrolling

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled through the first set of logos
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our clients, partners and technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by leading organizations and powered by cutting-edge technologies
          </p>
        </div>

        {/* Auto-scrolling logo carousel */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/50 to-transparent z-10"></div>
          
          <div 
            ref={scrollRef}
            className="flex space-x-12 overflow-x-hidden scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className={`relative w-32 h-32 ${logo.bg} rounded-xl p-4 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20`}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
                <p className="text-center mt-3 text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                  {logo.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;