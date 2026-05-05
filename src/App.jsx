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

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/claim" element={<Claim />} />

            {/* Insurance Detail Routes */}
            <Route path="/:type" element={<InsuranceDetail />} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
