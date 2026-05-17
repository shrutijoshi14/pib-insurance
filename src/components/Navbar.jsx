import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            setActiveDropdown(null);
            document.body.style.overflow = '';
        } else {
            setIsMenuOpen(true);
            document.body.style.overflow = 'hidden';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        document.body.style.overflow = '';
    };

    const handleDropdownToggle = (e, name) => {
        if (window.innerWidth < 992) {
            // If the user clicked the caret icon, toggle the dropdown submenu
            if (e.target.classList.contains('caret') || e.target.closest('.caret')) {
                e.preventDefault();
                setActiveDropdown(activeDropdown === name ? null : name);
            } else {
                // If they clicked the parent item text, let it navigate and close the drawer
                closeMenu();
            }
        }
    };

    const isGroupActive = ['/group-insurance', '/group-insurance/group-health-insurance', '/group-insurance/group-personal-accident', '/group-insurance/group-term-insurance', '/group-insurance/group-travel-insurance'].includes(location.pathname);
    const isCommercialActive = [
        '/commercial-insurance', 
        '/commercial-insurance/liability-insurance', '/commercial-insurance/marine-insurance', '/commercial-insurance/property-insurance', '/commercial-insurance/fire-insurance',
        '/commercial-insurance/workmens-compensation', '/commercial-insurance/professional-indemnity', '/commercial-insurance/business-interruption-insurance',
        '/commercial-insurance/contractor-all-risk', '/commercial-insurance/cyber-insurance'
    ].includes(location.pathname);
    const isIndividualActive = [
        '/individual-insurance', 
        '/individual-insurance/term-insurance', '/individual-insurance/health-insurance', '/individual-insurance/home-insurance', 
        '/individual-insurance/motor-insurance', '/individual-insurance/travel-insurance', '/individual-insurance/accidental-insurance'
    ].includes(location.pathname);

    const isGroupSubmenuActive = [
        '/group-insurance/group-health-insurance', 
        '/group-insurance/group-personal-accident', 
        '/group-insurance/group-term-insurance', 
        '/group-insurance/group-travel-insurance'
    ].includes(location.pathname);

    const isCommercialSubmenuActive = [
        '/commercial-insurance/liability-insurance', 
        '/commercial-insurance/marine-insurance', 
        '/commercial-insurance/property-insurance', 
        '/commercial-insurance/fire-insurance',
        '/commercial-insurance/workmens-compensation', 
        '/commercial-insurance/professional-indemnity', 
        '/commercial-insurance/business-interruption-insurance',
        '/commercial-insurance/contractor-all-risk', 
        '/commercial-insurance/cyber-insurance'
    ].includes(location.pathname);

    const isIndividualSubmenuActive = [
        '/individual-insurance/term-insurance', 
        '/individual-insurance/health-insurance', 
        '/individual-insurance/home-insurance', 
        '/individual-insurance/motor-insurance', 
        '/individual-insurance/travel-insurance', 
        '/individual-insurance/accidental-insurance'
    ].includes(location.pathname);

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            if (isGroupSubmenuActive) {
                setActiveDropdown('group');
            } else if (isCommercialSubmenuActive) {
                setActiveDropdown('commercial');
            } else if (isIndividualSubmenuActive) {
                setActiveDropdown('individual');
            }
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                closeMenu();
            }
        };
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* TOPBAR */}
            <div className="topbar">
                <div className="topbar-inner">
                    <div className="logo-wrap">
                        <Link to="/" className="logo" aria-label="PIB Insurance Home">
                            <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="PIB Insurance Brokers" width="167" height="50" loading="lazy" />
                        </Link>
                        <Link to="/claims" className="claim-btn mobile-claim">
                            <i className="fa fa-file-plus"></i>
                            <span className="btn-text">ADD CLAIMS</span>
                        </Link>
                        <button 
                            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                            id="menuToggle" 
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mainMenu"
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
            </div>

            {/* NAV OVERLAY */}
            {isMenuOpen && (
                <div 
                    className="nav-overlay show"
                    onClick={closeMenu}
                />
            )}

            {/* NAVBAR */}
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
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
                            <NavLink 
                                to="/group-insurance"
                                className="dropdown-trigger"
                                onClick={(e) => handleDropdownToggle(e, 'group')}
                                aria-haspopup="true"
                                aria-expanded={activeDropdown === 'group'}
                                aria-label="Group Insurance Menu"
                            >
                                GROUP INSURANCE <i className="fa fa-chevron-down caret" style={{ transform: activeDropdown === 'group' ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
                            </NavLink>
                            <ul className="submenu" role="menu">
                                <li role="none"><NavLink to="/group-insurance/group-health-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-users"></i></span>Group Health Insurance</NavLink></li>
                                <li role="none"><NavLink to="/group-insurance/group-term-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-file-shield"></i></span>Group Term Insurance</NavLink></li>
                                <li role="none"><NavLink to="/group-insurance/group-personal-accident" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-shield-halved"></i></span>Group Personal Accident</NavLink></li>
                                <li role="none"><NavLink to="/group-insurance/group-travel-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-plane"></i></span>Group Travel Insurance</NavLink></li>
                            </ul>
                        </li>

                        <li className={`dropdown ${activeDropdown === 'commercial' ? 'active' : ''} ${isCommercialActive ? 'page-active' : ''}`}>
                            <NavLink 
                                to="/commercial-insurance"
                                className="dropdown-trigger"
                                onClick={(e) => handleDropdownToggle(e, 'commercial')}
                                aria-haspopup="true"
                                aria-expanded={activeDropdown === 'commercial'}
                                aria-label="Commercial Insurance Menu"
                            >
                                COMMERCIAL INSURANCE <i className="fa fa-chevron-down caret" style={{ transform: activeDropdown === 'commercial' ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
                            </NavLink>
                            <ul className="submenu" role="menu">
                                <li role="none"><NavLink to="/commercial-insurance/liability-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-scale-balanced"></i></span>Liability Insurance</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/marine-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-ship"></i></span>Marine Insurance</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/property-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-building"></i></span>Property Insurance</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/fire-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-fire"></i></span>Fire Insurance</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/workmens-compensation" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-hard-hat"></i></span>Workmen’s Compensation</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/professional-indemnity" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-user-tie"></i></span>Professional Indemnity</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/business-interruption-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-clock-rotate-left"></i></span>Business Interruption</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/contractor-all-risk" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-trowel-bricks"></i></span>Contractor All Risk</NavLink></li>
                                <li role="none"><NavLink to="/commercial-insurance/cyber-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-shield-virus"></i></span>Cyber Insurance</NavLink></li>
                            </ul>
                        </li>

                        <li className={`dropdown ${activeDropdown === 'individual' ? 'active' : ''} ${isIndividualActive ? 'page-active' : ''}`}>
                            <NavLink 
                                to="/individual-insurance"
                                className="dropdown-trigger"
                                onClick={(e) => handleDropdownToggle(e, 'individual')}
                                aria-haspopup="true"
                                aria-expanded={activeDropdown === 'individual'}
                                aria-label="Individual Insurance Menu"
                            >
                                INDIVIDUAL INSURANCE <i className="fa fa-chevron-down caret" style={{ transform: activeDropdown === 'individual' ? 'rotate(180deg)' : 'rotate(0deg)' }}></i>
                            </NavLink>
                            <ul className="submenu" role="menu">
                                <li role="none"><NavLink to="/individual-insurance/term-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-heart-pulse"></i></span>Term Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/health-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-stethoscope"></i></span>Health Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/home-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-house"></i></span>Home Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/motor-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-car"></i></span>Motor Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/travel-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-plane"></i></span>Travel Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/accidental-insurance" role="menuitem" className={({isActive}) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-shield-halved"></i></span>Personal Accident</NavLink></li>
                            </ul>
                        </li>

                        <li><NavLink to="/industries" className={({isActive}) => isActive ? "page-active" : ""} aria-label="Industries we serve">INDUSTRIES</NavLink></li>
                        <li><NavLink to="/insights" className={({isActive}) => isActive ? "page-active" : ""} aria-label="Insurance insights and articles">INSIGHTS</NavLink></li>
                        <li><NavLink to="/careers" className={({isActive}) => isActive ? "page-active" : ""} aria-label="Careers at PIB Insurance">CAREERS</NavLink></li>
                        <li><NavLink to="/contact" className={({isActive}) => isActive ? "page-active" : ""} aria-label="Contact PIB Insurance">CONTACT US</NavLink></li>
                    </ul>
                    <Link to="/claims" className="claim-btn desktop-claim">
                        <i className="fa fa-file-plus"></i>
                        <span className="btn-text">ADD CLAIMS</span>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
