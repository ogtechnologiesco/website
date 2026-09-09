import React, { useEffect, useState, lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import 'aos/dist/aos.css';
import './css/style.css';
import AOS from 'aos';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import ConsentBanner from './components/ConsentBanner';
import ConsentSettingsModal from './components/ConsentSettingsModal';
import ProtectedRoute from './components/ProtectedRoute';
import Breadcrumbs from './components/Breadcrumbs';

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Standards = lazy(() => import('./pages/Standards'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Terms = lazy(() => import('./pages/Terms'));
const Imprint = lazy(() => import('./pages/Imprint'));
const Products = lazy(() => import('./pages/Products'));
const Job = lazy(() => import('./pages/Job'));
const Blogs = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/Blogs/intro'));
const MeridianPost = lazy(() => import('./pages/Blogs/meridian2024'));
const StandardsPost = lazy(() => import('./pages/Blogs/standards'));
const Ebsi = lazy(() => import('./pages/Blogs/ebsi'));
const DigitalPaymentsFuture = lazy(() => import('./pages/Blogs/digitalPaymentsFuture'));
const EarthquakeStandards = lazy(() => import('./pages/Blogs/earthquakeStandards'));
const HtmlToImage = lazy(() => import('./pages/HtmlToImage'));
const ScreenshotToImage = lazy(() => import('./pages/ScreenshotToImage'));
const PdfTools = lazy(() => import('./pages/pdfTools'));
const SecurityTools = lazy(() => import('./pages/securityTools'));
const BlockchainCompliance = lazy(() => import('./pages/blockchainCompliance'));
const DataProtection = lazy(() => import('./pages/DataProtection'));
const DataPolicy = lazy(() => import('./pages/DataPolicy'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const Quote = lazy(() => import('./pages/Quote'));
const Dora = lazy(() => import('./pages/Dora'));
const HelpDesk = lazy(() => import('./pages/HelpDesk'));
const HelpDeskTicketDetail = lazy(() => import('./pages/HelpDeskTicketDetail'));
const CRM = lazy(() => import('./pages/CRM'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Leads = lazy(() => import('./pages/Leads'));
const Opportunities = lazy(() => import('./pages/Opportunities'));
const Activities = lazy(() => import('./pages/Activities'));
const Import = lazy(() => import('./pages/Import'));
const Companies = lazy(() => import('./pages/Companies'));
const Ventures = lazy(() => import('./pages/Ventures'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const PaymentCancel = lazy(() => import('./pages/PaymentCancel'));


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
    <HelmetProvider>
      <AuthProvider>
        <Breadcrumbs />
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-black"><div className="text-gray-400">Loading...</div></div>}>
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
        <Route exact path="/dora" element={<Dora/>} />
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
        <Route exact path="/ventures" element={<Ventures/>} />
        <Route exact path="/portfolio" element={<Portfolio/>} />
        <Route exact path="/blog" element={<Blogs/>} />
        <Route exact path="/blog/reaching-new-frontiers" element={<BlogPost/>} />
        <Route exact path="/blog/meridian-2024-highlights" element={<MeridianPost/>} />
        <Route exact path="/blog/ebsi-verifiable-credentials" element={<Ebsi/>} />
        <Route exact path="/blog/how-blockchain-standards-enable-enterprises-to-reach-global-customers" element={<StandardsPost/>} />
        <Route exact path="/blog/digital-payments-future" element={<DigitalPaymentsFuture/>} />
        <Route exact path="/blog/estandares-sismicos-colombia" element={<EarthquakeStandards/>} />
        <Route exact path="/tools/html-to-image" element={<HtmlToImage/>} />
        <Route exact path="/tools/screenshot-to-image" element={<ScreenshotToImage/>} />
        <Route exact path="/tools/pdf-tools" element={<PdfTools/>} />
        <Route exact path="/tools/security-tools" element={<SecurityTools/>} />
        <Route exact path="/tools/blockchain-compliance-checker" element={<BlockchainCompliance/>} />
      </Routes>
        </Suspense>
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
    </HelmetProvider>
  );
}

export default App;
