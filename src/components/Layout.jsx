import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Navbar />
            <main id="main-content" role="main" tabIndex="-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
