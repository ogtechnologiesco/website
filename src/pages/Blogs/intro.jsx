import React from 'react';
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import PageIllustration from '../../partials/PageIllustration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useInView } from 'react-intersection-observer';
import './BlogPost.css'; // Make sure to create this CSS file for styling
import img from "../../images/blog1.jpg"
function BlogPost() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
                <div
                  ref={ref}
                  className={`blog-image ${inView ? 'slide-in' : ''}`}
                >
                  <img src={img} alt="Welcome to OG Technologies EU: Your Premier Partner for IT Solutions in Finance, Education, and Web3/Blockchain" />
                
                </div>
                <h1 className="h1">Welcome to OG Technologies EU: Your Premier Partner for IT Solutions in Finance, Education, and Web3/Blockchain</h1>
              </div>

              {/* Blog content */}
              <div className="max-w-XL mx-auto">
                <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb: 6 }}>
                  <Typography textAlign="left" variant="h5" align="justify" color="white" component="p">
                    Hello and welcome to the blog of OG Technologies EU! We are thrilled you've decided to join us on this digital journey as we explore the dynamic world of Information Technology (IT) and the innovative solutions we offer at our top-tier consulting firm.
                    <br /><br />
                    Based in Europe, OG Technologies EU is a leading IT consulting company with a strong commitment to delivering high-quality services and customized solutions to businesses across various industries. Our areas of expertise include Finance, Education, and IT Helpdesk. In addition, we set ourselves apart from the competition by specializing in cutting-edge technologies such as Web3 and Blockchain.
                    <br /><br />
                    In today's fast-paced business landscape, technology plays a crucial role in driving growth and innovation. At OG Technologies EU, we recognize that every organization is unique, with its own specific needs and challenges. That's why we take a collaborative approach to understand your business objectives and tailor our solutions accordingly, ensuring maximum value and return on investment.
                    <br /><br />
                    In the Finance sector, we help organizations optimize their operations by providing expert consulting services and implementing advanced IT solutions. Our team of seasoned professionals has extensive experience in areas such as risk management, regulatory compliance, and digital transformation, enabling us to deliver robust and efficient solutions that meet your business requirements.
                    <br /><br />
                    In the Education sector, we collaborate with educational institutions to leverage technology for enhancing learning experiences, streamlining operations, and promoting innovation. Our team of experts can help you implement Learning Management Systems (LMS), virtual classrooms, and other technologies designed to improve student engagement and facilitate remote learning.
                    <br /><br />
                    Our IT Helpdesk services ensure that your organization's technology infrastructure is always running smoothly. With our round-the-clock support and proactive problem-solving approach, we minimize downtime and prevent potential issues before they escalate, ensuring your business remains productive and efficient.
                    <br /><br />
                    Now, let's delve deeper into the exciting world of Web3 and Blockchain – two emerging technologies that are poised to revolutionize the way we interact and transact online. At OG Technologies EU, we believe in embracing innovation and staying ahead of the curve. That's why we have dedicated resources to help businesses explore these technologies and harness their potential to drive growth and stay competitive.
                    <br /><br />
                    We will share insights on how Web3 and Blockchain are transforming industries such as Finance, Education, and Gaming, among others. We'll also discuss real-life use cases, share expert opinions, and provide actionable steps for businesses looking to adopt these technologies.
                    <br /><br />
                    Stay tuned to our blog for more informative articles, expert insights, and fascinating discussions on the latest IT trends and developments. If you have any specific topics you'd like us to cover or questions you'd like answered, feel free to reach out to us at <a href="mailto:hi@ogtechnologies.co">hi@ogtechnologies.co</a>.
                    <br /><br />
                    We look forward to embarking on this digital journey with you and helping your organization thrive in the ever-evolving world of IT!
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

export default BlogPost;


// import React from 'react';
// import Footer from '../../partials/Footer';
// import Header from '../../partials/Header';
// import PageIllustration from '../../partials/PageIllustration';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

// function BlogPost() {
//   return (
//     <div className="flex flex-col min-h-screen overflow-hidden">
//       {/* Site header */}
//       <Header />

//       {/* Page content */}
//       <main className="grow">
//         {/* Page illustration */}
//         <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
//           <PageIllustration />
//         </div>

//         <section className="relative">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6">
//             <div className="pt-32 pb-12 md:pt-40 md:pb-20">
//               {/* Page header */}
//               <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
//                 <h1 className="h1">Welcome to OG Technologies EU: Your Premier Partner for IT Solutions in Finance, Education, and Web3/Blockchain</h1>
//               </div>

//               {/* Blog content */}
//               <div className="max-w-XL mx-auto">
//                 <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb: 6 }}>
//                   <Typography textAlign="left" variant="h5" align="justify" color="white" component="p">
//                     Hello and welcome to the blog of OG Technologies EU! We are thrilled you've decided to join us on this digital journey as we explore the dynamic world of Information Technology (IT) and the innovative solutions we offer at our top-tier consulting firm.
//                     <br /><br />
//                     Based in Europe, OG Technologies EU is a leading IT consulting company with a strong commitment to delivering high-quality services and customized solutions to businesses across various industries. Our areas of expertise include Finance, Education, and IT Helpdesk. In addition, we set ourselves apart from the competition by specializing in cutting-edge technologies such as Web3 and Blockchain.
//                     <br /><br />
//                     In today's fast-paced business landscape, technology plays a crucial role in driving growth and innovation. At OG Technologies EU, we recognize that every organization is unique, with its own specific needs and challenges. That's why we take a collaborative approach to understand your business objectives and tailor our solutions accordingly, ensuring maximum value and return on investment.
//                     <br /><br />
//                     In the Finance sector, we help organizations optimize their operations by providing expert consulting services and implementing advanced IT solutions. Our team of seasoned professionals has extensive experience in areas such as risk management, regulatory compliance, and digital transformation, enabling us to deliver robust and efficient solutions that meet your business requirements.
//                     <br /><br />
//                     In the Education sector, we collaborate with educational institutions to leverage technology for enhancing learning experiences, streamlining operations, and promoting innovation. Our team of experts can help you implement Learning Management Systems (LMS), virtual classrooms, and other technologies designed to improve student engagement and facilitate remote learning.
//                     <br /><br />
//                     Our IT Helpdesk services ensure that your organization's technology infrastructure is always running smoothly. With our round-the-clock support and proactive problem-solving approach, we minimize downtime and prevent potential issues before they escalate, ensuring your business remains productive and efficient.
//                     <br /><br />
//                     Now, let's delve deeper into the exciting world of Web3 and Blockchain – two emerging technologies that are poised to revolutionize the way we interact and transact online. At OG Technologies EU, we believe in embracing innovation and staying ahead of the curve. That's why we have dedicated resources to help businesses explore these technologies and harness their potential to drive growth and stay competitive.
//                     <br /><br />
//                     In the coming weeks, we will share insights on how Web3 and Blockchain are transforming industries such as Finance, Supply Chain, and Gaming, among others. We'll also discuss real-life use cases, share expert opinions, and provide actionable steps for businesses looking to adopt these technologies.
//                     <br /><br />
//                     Stay tuned to our blog for more informative articles, expert insights, and thought-provoking discussions on the latest IT trends and developments. If you have any specific topics you'd like us to cover or questions you'd like answered, feel free to reach out to us at <a href="mailto:hi@ogtechnologies.co">hi@ogtechnologies.co</a>.
//                     <br /><br />
//                     We look forward to embarking on this digital journey with you and helping your organization thrive in the ever-evolving world of IT!
//                   </Typography>
//                 </Container>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default BlogPost;
