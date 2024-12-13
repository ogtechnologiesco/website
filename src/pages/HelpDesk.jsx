import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HelpDeskForm from '../partials/Tickets';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
}
from 'mdb-react-ui-kit';

function HelpDesk() {
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
                <h1 className="h1"> Help Desk </h1>
              </div>

              
              <div className="max-w-XL mx-auto">
                <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb: 6 }}>

                  <Typography textAlignLast='right' textAlign="left" variant="h5" align="justify" color="white" component="p">


                    Welcome to OG Technologies EU's Help Desk! We're here to assist you with any IT-related issues or inquiries you may have. Our dedicated team is committed to providing you with prompt and reliable support to ensure your business operations run smoothly.<br />

                    Whether you need technical assistance, have questions about our services, or require troubleshooting, we're here to help.<br />
                    <br />
                    <br />
                    <div >
                      <h3 className="h3"> How can we assist you today? </h3>
                    </div>
                    <br />
                    <br />
                    {/* Add your help desk form components here */}
                    {/* Example: */}
                     <HelpDeskForm />
                    <br />
                    <br />
                    <Typography textAlignLast='right' textAlign="left" variant="h5" align="justify" color="white" component="p" >
                      For any urgent inquiries, please contact us at hi@ogtechnologies.co <br></br>
                      We're here to help you overcome any challenges and ensure your business success!
                    </Typography>
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

export default HelpDesk;
