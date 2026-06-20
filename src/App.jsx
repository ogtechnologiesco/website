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
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Standards from './pages/Standards';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Imprint from './pages/Imprint';
import Products from './pages/Products';
import Job from './pages/Job';
import Blogs from './pages/Blog';
import BlogPost from './pages/Blogs/intro';
import MeridianPost from './pages/Blogs/meridian2024';
import StandardsPost from './pages/Blogs/standards';
import Ebsi from './pages/Blogs/ebsi';
import DataProtection from './pages/DataProtection';
import DataPolicy from './pages/DataPolicy';
import AuthCallback from './pages/AuthCallback';
import Quote from './pages/Quote';
import HelpDesk from './pages/HelpDesk';
import HelpDeskTicketDetail from './pages/HelpDeskTicketDetail';
import CRM from './pages/CRM';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Opportunities from './pages/Opportunities';
import Activities from './pages/Activities';
import Import from './pages/Import';
import Companies from './pages/Companies';
import Alliance from './pages/Alliance';
import Ventures from './pages/Ventures';
import Portfolio from './pages/Portfolio';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import ConsentBanner from './components/ConsentBanner';
import ConsentSettingsModal from './components/ConsentSettingsModal';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
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

  // Set up global function for cookie settings
  useEffect(() => {
    window.openCookieSettings = () => setShowCookieSettings(true);
    return () => {
      delete window.openCookieSettings;
    };
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/terms" element={<Terms/>} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignIn/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/auth/callback" element={<AuthCallback/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/standards" element={<Standards />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route exact path="/imprint" element={<Imprint/>} />
        <Route exact path="/privacy" element={<DataProtection/>} />
        <Route exact path="/cookie-policy" element={<DataPolicy/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/careers" element={<Job/>} />
        <Route exact path="/quote" element={<Quote/>} />
        <Route exact path="/helpdesk" element={<HelpDesk/>} />
        <Route path="/helpdesk/ticket/:id" element={
          <ProtectedRoute>
            <HelpDeskTicketDetail />
          </ProtectedRoute>
        } />
        <Route path="/crm" element={<CRM/>} />
        <Route path="/crm/contacts" element={<Contacts/>} />
        <Route path="/crm/leads" element={<Leads/>} />
        <Route path="/crm/opportunities" element={<Opportunities/>} />
        <Route path="/crm/activities" element={<Activities/>} />
        <Route path="/crm/import" element={<Import/>} />
        <Route path="/crm/companies" element={<Companies/>} />
        <Route exact path="/alliance" element={<Alliance/>} />
        <Route exact path="/ventures" element={<Ventures/>} />
        <Route exact path="/portfolio" element={<Portfolio/>} />
        <Route exact path="/blog" element={<Blogs/>} />
        <Route exact path="/blog/reaching-new-frontiers" element={<BlogPost/>} />
        <Route exact path="/blog/meridian-2024-highlights" element={<MeridianPost/>} />
        <Route exact path="/blog/ebsi-verifiable-credentials" element={<Ebsi/>} />
        <Route exact path="/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers" element={<StandardsPost/>} />
      </Routes>
      <ConsentBanner />
      <ConsentSettingsModal 
        isOpen={showCookieSettings} 
        onClose={() => setShowCookieSettings(false)} 
      />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
