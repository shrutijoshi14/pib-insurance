import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const commercialCategories = {
    liability: {
        title: 'Liability & Financial',
        icon: 'fa-scale-balanced',
        products: [
            { path: '/commercial-insurance/public-liability-insurance', title: 'Public Liability Insurance', icon: 'fa-scale-balanced' },
            { path: '/commercial-insurance/product-liability-insurance', title: 'Product Liability Insurance', icon: 'fa-box-open' },
            { path: '/commercial-insurance/commercial-general-liability', title: 'Commercial General Liability', icon: 'fa-briefcase' },
            { path: '/commercial-insurance/professional-indemnity', title: 'Professional Indemnity', icon: 'fa-user-tie' },
            { path: '/commercial-insurance/directors-officers-liability', title: 'Directors & Officers (D&O) Liability', icon: 'fa-users-gear' },
            { path: '/commercial-insurance/cyber-insurance', title: 'Cyber Insurance', icon: 'fa-shield-virus' },
            { path: '/commercial-insurance/errors-omissions-insurance', title: 'Errors & Omissions (E&O) Insurance', icon: 'fa-triangle-exclamation' },
            { path: '/commercial-insurance/commercial-crime-insurance', title: 'Commercial Crime Insurance', icon: 'fa-mask' },
            { path: '/commercial-insurance/fidelity-guarantee-insurance', title: 'Fidelity Guarantee Insurance', icon: 'fa-handshake-slash' },
            { path: '/commercial-insurance/title-insurance', title: 'Title Insurance', icon: 'fa-file-signature' }
        ]
    },
    engineering: {
        title: 'Engineering & Industrial',
        icon: 'fa-industry',
        products: [
            { path: '/commercial-insurance/contractor-all-risk', title: 'Contractors All Risk (CAR)', icon: 'fa-trowel-bricks' },
            { path: '/commercial-insurance/erection-all-risk', title: 'Erection All Risk (EAR)', icon: 'fa-screwdriver-wrench' },
            { path: '/commercial-insurance/machinery-breakdown', title: 'Machinery Breakdown', icon: 'fa-gears' },
            { path: '/commercial-insurance/contractors-plant-machinery', title: 'Contractor’s Plant & Machinery', icon: 'fa-truck-monster' },
            { path: '/commercial-insurance/electronic-equipment', title: 'Electronic Equipment Cover', icon: 'fa-laptop-code' },
            { path: '/commercial-insurance/boiler-pressure-plant', title: 'Boiler & Pressure Plant', icon: 'fa-gauge' },
            { path: '/commercial-insurance/workmens-compensation', title: 'Workmen’s Compensation', icon: 'fa-hard-hat' }
        ]
    },
    property: {
        title: 'Property & Fire',
        icon: 'fa-building',
        products: [
            { path: '/commercial-insurance/standard-fire-special-perils', title: 'Standard Fire & Special Perils', icon: 'fa-fire-extinguisher' },
            { path: '/commercial-insurance/property-insurance', title: 'Property Insurance', icon: 'fa-building' },
            { path: '/commercial-insurance/fire-insurance', title: 'Fire Insurance', icon: 'fa-fire' },
            { path: '/commercial-insurance/industrial-all-risk', title: 'Industrial All Risk (IAR)', icon: 'fa-warehouse' },
            { path: '/commercial-insurance/bharat-sookshma-udyam', title: 'Bharat Sookshma Udyam', icon: 'fa-store' },
            { path: '/commercial-insurance/bharat-laghu-udyam', title: 'Bharat Laghu Udyam', icon: 'fa-landmark' },
            { path: '/commercial-insurance/office-factory-warehouse', title: 'Office, Factory & Warehouse', icon: 'fa-industry' },
            { path: '/commercial-insurance/business-interruption-insurance', title: 'Business Interruption', icon: 'fa-clock-rotate-left' }
        ]
    },
    marine: {
        title: 'Marine & Logistics',
        icon: 'fa-ship',
        products: [
            { path: '/commercial-insurance/marine-insurance', title: 'Marine Cargo Insurance', icon: 'fa-ship' },
            { path: '/commercial-insurance/inland-transit-insurance', title: 'Inland Transit Insurance', icon: 'fa-truck-ramp-box' },
            { path: '/commercial-insurance/import-export-cargo', title: 'Import & Export Cargo', icon: 'fa-anchor' },
            { path: '/commercial-insurance/marine-hull-insurance', title: 'Marine Hull Insurance', icon: 'fa-ferry' },
            { path: '/commercial-insurance/carriers-legal-liability', title: 'Carrier’s Legal Liability', icon: 'fa-business-time' }
        ]
    },
    motor: {
        title: 'Motor & Fleet',
        icon: 'fa-car',
        products: [
            { path: '/commercial-insurance/commercial-vehicle-insurance', title: 'Commercial Vehicle Insurance', icon: 'fa-truck-front' },
            { path: '/commercial-insurance/motor-fleet-insurance', title: 'Motor Fleet Insurance', icon: 'fa-car-side' },
            { path: '/commercial-insurance/passenger-carrying-vehicle', title: 'Passenger Carrying Vehicle', icon: 'fa-bus' }
        ]
    },
    miscellaneous: {
        title: 'Miscellaneous Solutions',
        icon: 'fa-cubes',
        products: [
            { path: '/commercial-insurance/burglary-insurance', title: 'Burglary Insurance', icon: 'fa-vault' },
            { path: '/commercial-insurance/money-insurance', title: 'Money Insurance', icon: 'fa-coins' },
            { path: '/commercial-insurance/fidelity-guarantee-insurance', title: 'Fidelity Guarantee', icon: 'fa-handshake-slash' },
            { path: '/commercial-insurance/event-insurance', title: 'Event Insurance', icon: 'fa-calendar-check' },
            { path: '/commercial-insurance/travel-insurance-misc', title: 'Travel Insurance', icon: 'fa-plane' },
            { path: '/commercial-insurance/shop-insurance', title: 'Shop Insurance', icon: 'fa-shop' },
            { path: '/commercial-insurance/sme-package-policies', title: 'SME Package Policies', icon: 'fa-box-tissue' },
            { path: '/commercial-insurance/specialized-risk-covers', title: 'Specialized Risk Covers', icon: 'fa-shield-heart' }
        ]
    }
};

const groupProducts = [
    { path: '/group-insurance/group-health-insurance', title: 'Group Health Insurance (GMC)', icon: 'fa-users' },
    { path: '/group-insurance/group-term-insurance', title: 'Group Term Insurance (GTL)', icon: 'fa-file-shield' },
    { path: '/group-insurance/group-personal-accident', title: 'Group Personal Accident', icon: 'fa-shield-halved' },
    { path: '/group-insurance/group-travel-insurance', title: 'Group Travel Insurance', icon: 'fa-plane' },
    { path: '/group-insurance/group-overseas-mediclaim', title: 'Group Overseas Mediclaim', icon: 'fa-plane-departure' },
    { path: '/group-insurance/employee-health-wellness', title: 'Employee Health & Wellness', icon: 'fa-heart-pulse' },
    { path: '/group-insurance/keyman-insurance', title: 'Keyman Insurance Solutions', icon: 'fa-key' }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileSubcategoryOpen, setMobileSubcategoryOpen] = useState(null);
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
        setMobileSubcategoryOpen(null);
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

    const isGroupActive = location.pathname.startsWith('/group-insurance') || location.pathname.startsWith('/group/');
    const isCommercialActive = location.pathname.startsWith('/commercial-insurance') || location.pathname.startsWith('/commercial/');
    const isIndividualActive = location.pathname.startsWith('/individual-insurance') || location.pathname.startsWith('/individual/');

    const isGroupSubmenuActive = location.pathname.startsWith('/group-insurance/');
    const isCommercialSubmenuActive = location.pathname.startsWith('/commercial-insurance/');
    const isIndividualSubmenuActive = location.pathname.startsWith('/individual-insurance/');

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            if (isGroupSubmenuActive) {
                setActiveDropdown('group');
            } else if (isCommercialSubmenuActive) {
                setActiveDropdown('commercial');
                const activeCatEntry = Object.entries(commercialCategories).find(([catKey, cat]) =>
                    cat.products.some(p => p.path === location.pathname) ||
                    location.pathname === `/commercial-insurance/${catKey}`
                );
                if (activeCatEntry) {
                    setMobileSubcategoryOpen(activeCatEntry[0]);
                } else {
                    setMobileSubcategoryOpen(null);
                }
            } else if (isIndividualSubmenuActive) {
                setActiveDropdown('individual');
            }
        } else {
            setActiveDropdown(null);
            setMobileSubcategoryOpen(null);
        }
    }, [isMenuOpen, location.pathname]);

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
                            <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="PIB Insurance Brokers" width="167" height="50" fetchpriority="high" decoding="async" />
                        </Link>
                        <Link to="/login" className="claim-btn mobile-claim" aria-label="Login to portal">
                            <span className="btn-text">LOGIN</span>
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
                                <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="PIB Insurance Brokers" width="107" height="32" style={{ filter: 'brightness(0) invert(1)' }} />
                            </Link>
                            <button className="close-btn" id="closeBtn" aria-label="Close menu" onClick={closeMenu}>
                                <i className="fa fa-times"></i>
                            </button>
                        </li>
                        <li className="mobile-only"><NavLink to="/" className={({ isActive }) => isActive ? "page-active" : ""}>HOME</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? "page-active" : ""}>ABOUT US</NavLink></li>

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
                                {groupProducts.map((prod) => (
                                    <li key={prod.path} role="none">
                                        <NavLink
                                            to={prod.path}
                                            role="menuitem"
                                            className={({ isActive }) => isActive ? "page-active" : ""}
                                            onClick={closeMenu}
                                        >
                                            <span className="sub-icon"><i className={`fa ${prod.icon}`}></i></span>
                                            {prod.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className={`dropdown mega-dropdown ${activeDropdown === 'commercial' ? 'active' : ''} ${isCommercialActive ? 'page-active' : ''}`}>
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
                            <div className="mega-submenu" role="menu">
                                <div className="mega-submenu-sidebar">
                                    {Object.entries(commercialCategories).map(([catKey, cat]) => (
                                        <div key={catKey} className="mega-subcategory-item">
                                            <NavLink
                                                to={`/commercial-insurance/${catKey}`}
                                                className={({ isActive }) => {
                                                    const isProdActive = cat.products.some(p => p.path === location.pathname);
                                                    const isHubActive = isActive || location.pathname === `/commercial-insurance/${catKey}`;
                                                    const isMobileOpen = mobileSubcategoryOpen === catKey;
                                                    return `mega-subcategory-btn ${(isHubActive || isProdActive || isMobileOpen) ? 'active' : ''}`;
                                                }}
                                                onClick={(e) => {
                                                    if (window.innerWidth < 992) {
                                                        e.preventDefault();
                                                        setMobileSubcategoryOpen(mobileSubcategoryOpen === catKey ? null : catKey);
                                                    } else {
                                                        closeMenu();
                                                    }
                                                }}
                                            >
                                                <span className="sub-icon"><i className={`fa ${cat.icon}`}></i></span>
                                                <span>{cat.title}</span>
                                                <i className="fa fa-chevron-right caret-right"></i>
                                            </NavLink>
                                            <div className={`mega-submenu-content ${mobileSubcategoryOpen === catKey ? 'active' : ''}`}>
                                                <ul className="mega-product-list">
                                                    {cat.products.map((prod) => (
                                                        <li key={prod.path} role="none">
                                                            <NavLink
                                                                to={prod.path}
                                                                role="menuitem"
                                                                className={({ isActive }) => `mega-product-link ${isActive ? 'page-active' : ''}`}
                                                                onClick={closeMenu}
                                                            >
                                                                <span className="sub-icon"><i className={`fa ${prod.icon}`}></i></span>
                                                                <span>{prod.title}</span>
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
                                <li role="none"><NavLink to="/individual-insurance/term-insurance" role="menuitem" className={({ isActive }) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-heart-pulse"></i></span>Term Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/health-insurance" role="menuitem" className={({ isActive }) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-stethoscope"></i></span>Health Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/home-insurance" role="menuitem" className={({ isActive }) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-house"></i></span>Home Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/motor-insurance" role="menuitem" className={({ isActive }) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-car"></i></span>Motor Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/travel-insurance" role="menuitem" className={({ isActive }) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-plane"></i></span>Travel Insurance</NavLink></li>
                                <li role="none"><NavLink to="/individual-insurance/accidental-insurance" role="menuitem" className={({ isActive }) => isActive ? "page-active" : ""}><span className="sub-icon"><i className="fa fa-shield-halved"></i></span>Personal Accident</NavLink></li>
                            </ul>
                        </li>

                        <li><NavLink to="/industries" className={({ isActive }) => isActive ? "page-active" : ""} aria-label="Industries we serve">INDUSTRIES</NavLink></li>
                        <li><NavLink to="/insights" className={({ isActive }) => isActive ? "page-active" : ""} aria-label="Insurance insights and articles">INSIGHTS</NavLink></li>
                        <li><NavLink to="/careers" className={({ isActive }) => isActive ? "page-active" : ""} aria-label="Careers at PIB Insurance">CAREERS</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "page-active" : ""} aria-label="Contact PIB Insurance">CONTACT US</NavLink></li>
                    </ul>
                    <Link to="/login" className="claim-btn desktop-claim" aria-label="Login to portal">
                        <span className="btn-text">LOGIN</span>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
