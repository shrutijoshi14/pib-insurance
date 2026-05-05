import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure preloader shows for at least 1.5s for brand impact
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

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
