import React, { Component } from 'react';
import Hyperledger from "../images/HL.jpg"
import TestimonialImage01 from '../images/testimonial-01.jpg';
import TestimonialImage02 from '../images/testimonial-02.jpg';
import TestimonialImage03 from '../images/testimonial-03.jpg';
import Stellar from '../images/stellar1.png';
import Stellarglobal from '../images/stellarglobal.jpg';
import Mint from '../images/mainlogo.jpg';
import PublicNode from '../images/PublicNode1.jpg';
import Talent from '../images/talentgarden.jpg';
import Tech from '../images/tech1.png';
import wifi from '../images/wifi1.png';
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
import blockstandLogo from '../images/blockstand_logo.png'
import ffg from '../images/ffg.png'
import "~slick-carousel/slick/slick.css"; 
import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class Testimonials extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500
    };
    return (
      <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
      { /* <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Testimonials 
           <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">
              <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
                  <div>
                    <div className="relative inline-flex flex-col mb-4">
                      <img className="rounded-full" src={TestimonialImage03} width="48" height="48" alt="Testimonial 03" />
                        <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                        </svg>
                        </div>
                    </div>
                    <blockquote className="text-lg text-gray-400 grow">— Open PRO lets me quickly get the insights I care about so that I can focus on my productive work. I've had Open PRO for about 24 hours now and I honestly don't know how I functioned without it before.</blockquote>
                    <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                      <cite className="text-gray-200 not-italic">Anastasia Dan</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">UX Board</a>
                    </div>
                  </div>

                </div>
              </div>

              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Our Partners</h2>
           
             <div> <p></p></div>
            <div>
        
        <Slider {...settings}>
          <div>
            <h3><img src={Stellar}   alt="Stellar"/> 
            </h3>
          </div>
          <div>
            <h3><img src={Stellarglobal}   alt="Stellar"/></h3>
          </div>
          <div>
            <h3><img src={Mint}   alt="Stellar"/></h3>
          </div>
          <div>
            <h3><img src={PublicNode}   alt="Stellar"/></h3>
          </div>
          <div>
            <h3><img src={Talent}   alt="Stellar"/></h3>
          </div>
          <div>
            <h3><img src={Tech}   alt="Stellar"/></h3>
          </div>
          <div>
            <h3><img src={wifi}   alt="Stellar"/></h3>
          </div>
        </Slider>
      </div>

          </div>
*/}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Our clients, partners and technologies</h2>
           
             <div> <p></p></div>
            <div>
        
        <Slider {...settings}>
        <div>
            <h3><img src={openai}   alt="OpenAI"/></h3>
          </div>
          <div>
            <h3><img src={Netlify}   alt="Netlify"/> 
            </h3>
          </div>
          <div>
            <h3><img src={Heroku}   alt="Heroku"/></h3>
          </div>
          <div>
            <h3><img src={Mongodb}   alt="MongoDB"/></h3>
          </div>
          <div>
            <h3><img src={Ipfs}   alt="IPFS"/></h3>
          </div>
          <div>
            <h3><img src={Docker}   alt="Docker"/></h3>
          </div>
          <div>
            <h3><img src={Stellar}   alt="Stellar"/></h3>
          </div>
          <div>
            <h3><img src={Postg}   alt="Postgres"/></h3>
          </div>
          <div>
            <h3><img src={Bitcoin}   alt="Bitcoin"/></h3>
          </div>
          <div>
            <h3><img src={Vercel}   alt="Vercel"/></h3>
          </div>
          <div>
            <h3><img src={ethereum}   alt="Bitcoin"/></h3>
          </div>
          <div>
            <h3><img src={npm}   alt="npm"/></h3>
          </div>
          
          <div>
            <h3><img src={zaho}   alt="Zoho"/></h3>
          </div>
          <div>
            <h3><img src={vite}   alt="Vite"/></h3>
          </div>
            <div>
              <h3><img src={Hyperledger}   alt="Hyperledger"/></h3>
            </div>
          
          <div>
            <h3><img src={blockstandLogo} alt="Blockstand" style={{ backgroundColor: 'white'}} /></h3>
          </div>
          <div>
            <h3><img src={ffg} alt="FFG" /></h3>
          </div>
          
        </Slider>
      </div>

          </div>
  
            </div>
</section>
  );
}
}
export default Testimonials;
