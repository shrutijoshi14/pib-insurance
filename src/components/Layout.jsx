import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="app-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Navbar />
            <AnimatePresence mode="wait">
                <motion.main 
                    key={location.pathname}
                    id="main-content" 
                    role="main" 
                    tabIndex="-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            <Footer />
        </div>
    );
};

export default Layout;
