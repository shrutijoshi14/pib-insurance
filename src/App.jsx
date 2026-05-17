import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Industries = lazy(() => import('./pages/Industries'));
const Insights = lazy(() => import('./pages/Insights'));
const Claim = lazy(() => import('./pages/Claim'));
const InsuranceDetail = lazy(() => import('./pages/InsuranceDetail'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Careers = lazy(() => import('./pages/Careers'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function RouteChangeListener() {
  const { pathname } = useLocation();
  useEffect(() => {
    AOS.refresh();
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out-quart',
    });
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <RouteChangeListener />
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/claims" element={<Claim />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Hierarchical Insurance Routes */}
            <Route path="/individual-insurance" element={<InsuranceDetail />} />
            <Route path="/individual-insurance/:type" element={<InsuranceDetail />} />
            <Route path="/individual/:type" element={<InsuranceDetail />} />
            
            <Route path="/group-insurance" element={<InsuranceDetail />} />
            <Route path="/group-insurance/:type" element={<InsuranceDetail />} />
            <Route path="/group/:type" element={<InsuranceDetail />} />
            
            <Route path="/commercial-insurance" element={<InsuranceDetail />} />
            <Route path="/commercial-insurance/:type" element={<InsuranceDetail />} />
            <Route path="/commercial/:type" element={<InsuranceDetail />} />

            {/* Fallback for old flat URLs or direct access */}
            <Route path="/:type" element={<InsuranceDetail />} />

            {/* General Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
