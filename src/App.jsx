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
const Iso27001GapAnalysis = lazy(() => import('./pages/iso27001'));
const Iso9001ReadinessChecker = lazy(() => import('./pages/iso9001'));
const Iso42001AiReadiness = lazy(() => import('./pages/iso42001'));
const Iso8601Validator = lazy(() => import('./pages/iso8601'));
const EthereumToolkit = lazy(() => import('./pages/ethereumToolkit'));
const AwsArnParser = lazy(() => import('./pages/awsArnParser'));
const IamPolicyValidator = lazy(() => import('./pages/iamPolicyValidator'));
const SapODataUrlBuilder = lazy(() => import('./pages/sapODataUrlBuilder'));
const HashGenerator = lazy(() => import('./pages/hashGenerator'));
const IbanValidator = lazy(() => import('./pages/ibanValidator'));
const BicValidator = lazy(() => import('./pages/bicValidator'));
const LeiValidator = lazy(() => import('./pages/leiValidator'));
const Iso20022Viewer = lazy(() => import('./pages/iso20022'));
const Mt940ToCsv = lazy(() => import('./pages/mt940ToCsv'));
const Hl7Parser = lazy(() => import('./pages/hl7Parser'));
const FhirValidator = lazy(() => import('./pages/fhirValidator'));
const TleParser = lazy(() => import('./pages/tleParser'));
const TleConverter = lazy(() => import('./pages/tleConverter'));
const ScormValidator = lazy(() => import('./pages/scormValidator'));
const GtinValidator = lazy(() => import('./pages/gtinValidator'));
const PhoneFormatter = lazy(() => import('./pages/phoneFormatter'));
const VcardGenerator = lazy(() => import('./pages/vcardGenerator'));
const EmailValidator = lazy(() => import('./pages/emailValidator'));
const CsvDeduplicator = lazy(() => import('./pages/csvDeduplicator'));
const Tools = lazy(() => import('./pages/Tools'));
const XmlTools = lazy(() => import('./pages/xmlTools'));
const XmlFormatterPage = lazy(() => import('./pages/xmlTools/XmlFormatterPage'));
const XmlValidatorPage = lazy(() => import('./pages/xmlTools/XmlValidatorPage'));
const XmlToJsonPage = lazy(() => import('./pages/xmlTools/XmlToJsonPage'));
const XmlMinifierPage = lazy(() => import('./pages/xmlTools/XmlMinifierPage'));
const XPathTesterPage = lazy(() => import('./pages/xmlTools/XPathTesterPage'));
const XmlToCsvPage = lazy(() => import('./pages/xmlTools/XmlToCsvPage'));
const PdfMergePage = lazy(() => import('./pages/pdfTools/PdfMergePage'));
const PdfSplitPage = lazy(() => import('./pages/pdfTools/PdfSplitPage'));
const ImageToPdfPage = lazy(() => import('./pages/pdfTools/ImageToPdfPage'));
const DocToPdfPage = lazy(() => import('./pages/pdfTools/DocToPdfPage'));
const PdfToWordPage = lazy(() => import('./pages/pdfTools/PdfToWordPage'));
const WeiConverterPage = lazy(() => import('./pages/ethereumToolkit/WeiConverterPage'));
const Keccak256Page = lazy(() => import('./pages/ethereumToolkit/Keccak256Page'));
const FunctionSelectorPage = lazy(() => import('./pages/ethereumToolkit/FunctionSelectorPage'));
const AbiEncoderPage = lazy(() => import('./pages/ethereumToolkit/AbiEncoderPage'));
const AddressChecksumPage = lazy(() => import('./pages/ethereumToolkit/AddressChecksumPage'));
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
const Insights = lazy(() => import('./pages/Insights'));
const Iso20022Migration = lazy(() => import('./pages/Insights/iso20022Migration'));
const Iso42001Guide = lazy(() => import('./pages/Insights/iso42001Guide'));
const IamPolicySecurity = lazy(() => import('./pages/Insights/iamPolicySecurity'));
const Hl7VsFhir = lazy(() => import('./pages/Insights/hl7VsFhir'));
const EthereumCalldata = lazy(() => import('./pages/Insights/ethereumCalldata'));


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
        <Route exact path="/insights" element={<Insights/>} />
        <Route exact path="/insights/iso-20022-migration-guide" element={<Iso20022Migration/>} />
        <Route exact path="/insights/iso-42001-ai-management-guide" element={<Iso42001Guide/>} />
        <Route exact path="/insights/iam-policy-security-patterns" element={<IamPolicySecurity/>} />
        <Route exact path="/insights/hl7-v2-vs-fhir-comparison" element={<Hl7VsFhir/>} />
        <Route exact path="/insights/ethereum-calldata-abi-guide" element={<EthereumCalldata/>} />
        <Route exact path="/tools" element={<Tools/>} />
        <Route exact path="/tools/html-to-image" element={<HtmlToImage/>} />
        <Route exact path="/tools/screenshot-to-image" element={<ScreenshotToImage/>} />
        <Route exact path="/tools/pdf-tools" element={<PdfTools/>} />
        <Route exact path="/tools/security-tools" element={<SecurityTools/>} />
        <Route exact path="/tools/blockchain-compliance-checker" element={<BlockchainCompliance/>} />
        <Route exact path="/tools/iso-27001-gap-analysis" element={<Iso27001GapAnalysis/>} />
        <Route exact path="/tools/iso-9001-readiness-checker" element={<Iso9001ReadinessChecker/>} />
        <Route exact path="/tools/iso-42001-ai-readiness" element={<Iso42001AiReadiness/>} />
        <Route exact path="/tools/iso-8601-validator" element={<Iso8601Validator/>} />
        <Route exact path="/tools/ethereum-toolkit" element={<EthereumToolkit/>} />
        <Route exact path="/tools/aws-arn-parser" element={<AwsArnParser/>} />
        <Route exact path="/tools/iam-policy-validator" element={<IamPolicyValidator/>} />
        <Route exact path="/tools/sap-odata-url-builder" element={<SapODataUrlBuilder/>} />
        <Route exact path="/tools/hash-generator" element={<HashGenerator/>} />
        <Route exact path="/tools/xml-tools" element={<XmlTools/>} />
        <Route exact path="/tools/xml-formatter" element={<XmlFormatterPage/>} />
        <Route exact path="/tools/xml-validator" element={<XmlValidatorPage/>} />
        <Route exact path="/tools/xml-to-json" element={<XmlToJsonPage/>} />
        <Route exact path="/tools/xml-minifier" element={<XmlMinifierPage/>} />
        <Route exact path="/tools/xpath-tester" element={<XPathTesterPage/>} />
        <Route exact path="/tools/xml-to-csv" element={<XmlToCsvPage/>} />
        <Route exact path="/tools/merge-pdf" element={<PdfMergePage/>} />
        <Route exact path="/tools/split-pdf" element={<PdfSplitPage/>} />
        <Route exact path="/tools/image-to-pdf" element={<ImageToPdfPage/>} />
        <Route exact path="/tools/document-to-pdf" element={<DocToPdfPage/>} />
        <Route exact path="/tools/pdf-to-word" element={<PdfToWordPage/>} />
        <Route exact path="/tools/wei-converter" element={<WeiConverterPage/>} />
        <Route exact path="/tools/keccak256-hash" element={<Keccak256Page/>} />
        <Route exact path="/tools/function-selector" element={<FunctionSelectorPage/>} />
        <Route exact path="/tools/abi-encoder" element={<AbiEncoderPage/>} />
        <Route exact path="/tools/address-checksum" element={<AddressChecksumPage/>} />
        <Route exact path="/tools/iban-validator" element={<IbanValidator/>} />
        <Route exact path="/tools/bic-validator" element={<BicValidator/>} />
        <Route exact path="/tools/lei-validator" element={<LeiValidator/>} />
        <Route exact path="/tools/iso-20022-viewer" element={<Iso20022Viewer/>} />
        <Route exact path="/tools/mt940-to-csv" element={<Mt940ToCsv/>} />
        <Route exact path="/tools/hl7-parser" element={<Hl7Parser/>} />
        <Route exact path="/tools/fhir-validator" element={<FhirValidator/>} />
        <Route exact path="/tools/tle-parser" element={<TleParser/>} />
        <Route exact path="/tools/tle-converter" element={<TleConverter/>} />
        <Route exact path="/tools/scorm-validator" element={<ScormValidator/>} />
        <Route exact path="/tools/gtin-validator" element={<GtinValidator/>} />
        <Route exact path="/tools/phone-formatter" element={<PhoneFormatter/>} />
        <Route exact path="/tools/vcard-generator" element={<VcardGenerator/>} />
        <Route exact path="/tools/email-validator" element={<EmailValidator/>} />
        <Route exact path="/tools/csv-deduplicator" element={<CsvDeduplicator/>} />
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
