import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        document.body.style.overflow = '';
    };

    const handleDropdownToggle = (e, name) => {
        if (window.innerWidth < 992) {
            e.preventDefault();
            setActiveDropdown(activeDropdown === name ? null : name);
        }
    };

    const isGroupActive = ['/group-health-insurance', '/group-personal-accident', '/group-term-insurance', '/group-travel-insurance'].includes(location.pathname);
    const isCommercialActive = [
        '/liability-insurance', '/marine-insurance', '/property-insurance', '/fire-insurance',
        '/workmens-compensation', '/professional-indemnity', '/business-interruption-insurance',
        '/contractor-all-risk', '/cyber-insurance'
    ].includes(location.pathname);
    const isIndividualActive = ['/term-insurance', '/health-insurance', '/home-insurance', '/motor-insurance', '/travel-insurance', '/accidental-insurance'].includes(location.pathname);

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                closeMenu();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* TOPBAR */}
            <motion.div 
                className="topbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="topbar-inner">
                    <div className="logo-wrap">
                        <Link to="/" className="logo">
                            <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="PIB Insurance Brokers" width="167" height="50" loading="lazy" />
                        </Link>
                        <Link to="/claim" className="claim-btn mobile-claim">
                            <i className="fa fa-file-plus"></i>
                            <span className="btn-text">ADD CLAIMS</span>
                        </Link>
                        <button 
                            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                            id="menuToggle" 
                            aria-label="Open navigation menu"
                            onClick={toggleMenu}
                        >
                            <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} id="menuIcon" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="contact-row">
                        <div className="contact-box">
                            <div className="contact-icon"><i className="fa fa-envelope"></i></div>
                            <div className="contact-text">
                                <span className="label">Write us</span>
                                <span className="value">info@pibinsurance.in</span>
                            </div>
                        </div>
                        <div className="contact-box">
                            <div className="contact-icon"><i className="fa fa-phone"></i></div>
                            <div className="contact-text">
                                <span className="label">Talk to our experts</span>
                                <span className="value">+91 9820419276</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* NAV OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="nav-overlay show"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                    />
                )}
            </AnimatePresence>

            {/* NAVBAR */}
            <motion.nav 
                className="navbar"
                style={{ 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 2000,
                    background: 'linear-gradient(90deg, #0b2c3d 0%, #1a5276 40%, #1a6fa8 100%)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="nav-inner">
                    <ul className={`menu ${isMenuOpen ? 'show' : ''}`} id="mainMenu">
                        <li className="menu-header" style={{ display: isMenuOpen ? 'flex' : 'none', listStyle: 'none' }}>
                            <Link to="/" className="drawer-logo" onClick={closeMenu}>
                                <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="PIB Insurance Brokers" style={{ height: '32px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
                            </Link>
                            <button className="close-btn" id="closeBtn" aria-label="Close menu" onClick={closeMenu}>
                                <i className="fa fa-times"></i>
                            </button>
                        </li>
                        <li className="mobile-only"><NavLink to="/" className={({isActive}) => isActive ? "page-active" : ""}>HOME</NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? "page-active" : ""}>ABOUT US</NavLink></li>
                        
                        <li className={`dropdown ${activeDropdown === 'group' ? 'active' : ''} ${isGroupActive ? 'page-active' : ''}`}>
                            <a href="#" onClick={(e) => handleDropdownToggle(e, 'group')}>
                                GROUP INSURANCE <i className="fa fa-chevron-down caret" style={{ transform: activeDropdown === 'group' ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
                            </a>
                            <ul className="submenu">
                                <li><NavLink to="/group-health-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-users"></i></span>Group Health Insurance</NavLink></li>
                                <li><NavLink to="/group-term-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-file-shield"></i></span>Group Term Insurance</NavLink></li>
                                <li><NavLink to="/group-personal-accident" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-shield-halved"></i></span>Group Personal Accident</NavLink></li>
                                <li><NavLink to="/group-travel-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-plane"></i></span>Group Travel Insurance</NavLink></li>
                            </ul>
                        </li>

                        <li className={`dropdown ${activeDropdown === 'commercial' ? 'active' : ''} ${isCommercialActive ? 'page-active' : ''}`}>
                            <a href="#" onClick={(e) => handleDropdownToggle(e, 'commercial')}>
                                COMMERCIAL INSURANCE <i className="fa fa-chevron-down caret" style={{ transform: activeDropdown === 'commercial' ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
                            </a>
                            <ul className="submenu">
                                <li><NavLink to="/liability-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-scale-balanced"></i></span>Liability Insurance</NavLink></li>
                                <li><NavLink to="/marine-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-ship"></i></span>Marine Insurance</NavLink></li>
                                <li><NavLink to="/property-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-building"></i></span>Property Insurance</NavLink></li>
                                <li><NavLink to="/fire-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-fire"></i></span>Fire Insurance</NavLink></li>
                                <li><NavLink to="/workmens-compensation" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-hard-hat"></i></span>Workmen’s Compensation</NavLink></li>
                                <li><NavLink to="/professional-indemnity" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-user-tie"></i></span>Professional Indemnity</NavLink></li>
                                <li><NavLink to="/business-interruption-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-clock-rotate-left"></i></span>Business Interruption</NavLink></li>
                                <li><NavLink to="/contractor-all-risk" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-trowel-bricks"></i></span>Contractor All Risk</NavLink></li>
                                <li><NavLink to="/cyber-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-shield-virus"></i></span>Cyber Insurance</NavLink></li>
                            </ul>
                        </li>

                        <li className={`dropdown ${activeDropdown === 'individual' ? 'active' : ''} ${isIndividualActive ? 'page-active' : ''}`}>
                            <a href="#" onClick={(e) => handleDropdownToggle(e, 'individual')}>
                                INDIVIDUAL INSURANCE <i className="fa fa-chevron-down caret" style={{ transform: activeDropdown === 'individual' ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
                            </a>
                            <ul className="submenu">
                                <li><NavLink to="/term-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-heart-pulse"></i></span>Term Insurance</NavLink></li>
                                <li><NavLink to="/health-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-stethoscope"></i></span>Health Insurance</NavLink></li>
                                <li><NavLink to="/home-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-house"></i></span>Home Insurance</NavLink></li>
                                <li><NavLink to="/motor-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-car"></i></span>Motor Insurance</NavLink></li>
                                <li><NavLink to="/travel-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-plane"></i></span>Travel Insurance</NavLink></li>
                                <li><NavLink to="/accidental-insurance" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-shield-halved"></i></span>Personal Accident</NavLink></li>
                            </ul>
                        </li>

                        <li><NavLink to="/industries" className={({isActive}) => isActive ? "page-active" : ""}>INDUSTRIES</NavLink></li>
                        <li><NavLink to="/insights" className={({isActive}) => isActive ? "page-active" : ""}>INSIGHTS</NavLink></li>
                        <li><NavLink to="/contact" className={({isActive}) => isActive ? "page-active" : ""}>CONTACT US</NavLink></li>
                    </ul>
                    <Link to="/claim" className="claim-btn desktop-claim">
                        <i className="fa fa-file-plus"></i>
                        <span className="btn-text">ADD CLAIMS</span>
                    </Link>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;
