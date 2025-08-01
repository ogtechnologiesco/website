import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import 'aos/dist/aos.css';
import './css/style.css';
import AOS from 'aos';
import { useState } from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Terms from './pages/Terms';
import Imprint from './pages/Imprint';
import Products from './pages/Products';
import Job from './pages/Job';
import Blogs from './pages/Blog';
import BlogPost from './pages/Blogs/intro';
import MeridianPost from './pages/Blogs/meridian2024';
import StandardsPost from './pages/Blogs/standards';
import Ebsi from './pages/Blogs/ebsi';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Quote from './pages/Quote';
import HelpDesk from './pages/HelpDesk';



function App() {

  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/terms" element={<Terms/>} />
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/imprint" element={<Imprint/>} />
        <Route exact path="/privacy" element={<PrivacyPolicy/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/careers" element={<Job/>} />
        <Route exact path="/quote" element={<Quote/>} />
        <Route exact path="/helpdesk" element={<HelpDesk/>} />
        <Route exact path="/blog" element={<Blogs/>} />
        <Route exact path="/blog/reaching-new-frontiers" element={<BlogPost/>} />
        <Route exact path="/blog/meridian-2024-highlights" element={<MeridianPost/>} />
        <Route exact path="/blog/ebsi-verifiable-credentials" element={<Ebsi/>} />
        <Route exact path="/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers" element={<StandardsPost/>} />

      </Routes>
    </>
  );
}

export default App;
