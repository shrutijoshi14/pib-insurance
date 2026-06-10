import { useParams, Link, useLocation } from 'react-router-dom';
import { insuranceData } from '../data/insuranceData';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';

const sidebarMenus = {
    commercial: [
        { path: '/commercial-insurance/liability', title: 'Liability & Financial Lines', icon: 'fa-scale-balanced' },
        { path: '/commercial-insurance/engineering', title: 'Engineering & Industrial', icon: 'fa-industry' },
        { path: '/commercial-insurance/property', title: 'Property & Fire', icon: 'fa-building' },
        { path: '/commercial-insurance/marine', title: 'Marine & Logistics', icon: 'fa-ship' },
        { path: '/commercial-insurance/motor', title: 'Motor & Fleet', icon: 'fa-car' },
        { path: '/commercial-insurance/miscellaneous', title: 'Miscellaneous Solutions', icon: 'fa-cubes' }
    ],
    group: [
        { path: '/group-insurance/group-health-insurance', title: 'Group Health Insurance', icon: 'fa-users' },
        { path: '/group-insurance/group-term-insurance', title: 'Group Term Insurance', icon: 'fa-file-shield' },
        { path: '/group-insurance/group-personal-accident', title: 'Group Personal Accident', icon: 'fa-shield-halved' },
        { path: '/group-insurance/group-travel-insurance', title: 'Group Travel Insurance', icon: 'fa-plane' },
        { path: '/group-insurance/group-overseas-mediclaim', title: 'Group Overseas Mediclaim', icon: 'fa-plane-departure' },
        { path: '/group-insurance/employee-health-wellness', title: 'Employee Health & Wellness', icon: 'fa-heart-pulse' },
        { path: '/group-insurance/keyman-insurance', title: 'Keyman Insurance Solutions', icon: 'fa-key' }
    ],
    individual: [
        { path: '/individual-insurance/term-insurance', title: 'Term Insurance', icon: 'fa-heart-pulse' },
        { path: '/individual-insurance/health-insurance', title: 'Health Insurance', icon: 'fa-stethoscope' },
        { path: '/individual-insurance/home-insurance', title: 'Home Insurance', icon: 'fa-house' },
        { path: '/individual-insurance/motor-insurance', title: 'Motor Insurance', icon: 'fa-car' },
        { path: '/individual-insurance/travel-insurance', title: 'Travel Insurance', icon: 'fa-plane' },
        { path: '/individual-insurance/accidental-insurance', title: 'Personal Accident', icon: 'fa-shield-halved' }
    ],
    liability: [
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
    ],
    engineering: [
        { path: '/commercial-insurance/contractor-all-risk', title: 'Contractors All Risk (CAR)', icon: 'fa-trowel-bricks' },
        { path: '/commercial-insurance/erection-all-risk', title: 'Erection All Risk (EAR)', icon: 'fa-screwdriver-wrench' },
        { path: '/commercial-insurance/machinery-breakdown', title: 'Machinery Breakdown', icon: 'fa-gears' },
        { path: '/commercial-insurance/contractors-plant-machinery', title: 'Contractor’s Plant & Machinery', icon: 'fa-truck-monster' },
        { path: '/commercial-insurance/electronic-equipment', title: 'Electronic Equipment Cover', icon: 'fa-laptop-code' },
        { path: '/commercial-insurance/boiler-pressure-plant', title: 'Boiler & Pressure Plant', icon: 'fa-gauge' },
        { path: '/commercial-insurance/workmens-compensation', title: 'Workmen’s Compensation', icon: 'fa-hard-hat' }
    ],
    property: [
        { path: '/commercial-insurance/standard-fire-special-perils', title: 'Standard Fire & Special Perils', icon: 'fa-fire-extinguisher' },
        { path: '/commercial-insurance/property-insurance', title: 'Property Insurance', icon: 'fa-building' },
        { path: '/commercial-insurance/fire-insurance', title: 'Fire Insurance', icon: 'fa-fire' },
        { path: '/commercial-insurance/industrial-all-risk', title: 'Industrial All Risk (IAR)', icon: 'fa-warehouse' },
        { path: '/commercial-insurance/bharat-sookshma-udyam', title: 'Bharat Sookshma Udyam', icon: 'fa-store' },
        { path: '/commercial-insurance/bharat-laghu-udyam', title: 'Bharat Laghu Udyam', icon: 'fa-landmark' },
        { path: '/commercial-insurance/office-factory-warehouse', title: 'Office, Factory & Warehouse', icon: 'fa-industry' },
        { path: '/commercial-insurance/business-interruption-insurance', title: 'Business Interruption', icon: 'fa-clock-rotate-left' }
    ],
    marine: [
        { path: '/commercial-insurance/marine-insurance', title: 'Marine Cargo Insurance', icon: 'fa-ship' },
        { path: '/commercial-insurance/inland-transit-insurance', title: 'Inland Transit Insurance', icon: 'fa-truck-ramp-box' },
        { path: '/commercial-insurance/import-export-cargo', title: 'Import & Export Cargo', icon: 'fa-anchor' },
        { path: '/commercial-insurance/marine-hull-insurance', title: 'Marine Hull Insurance', icon: 'fa-ferry' },
        { path: '/commercial-insurance/carriers-legal-liability', title: 'Carrier’s Legal Liability', icon: 'fa-business-time' }
    ],
    motor: [
        { path: '/commercial-insurance/commercial-vehicle-insurance', title: 'Commercial Vehicle Insurance', icon: 'fa-truck-front' },
        { path: '/commercial-insurance/motor-fleet-insurance', title: 'Motor Fleet Insurance', icon: 'fa-car-side' },
        { path: '/commercial-insurance/passenger-carrying-vehicle', title: 'Passenger Carrying Vehicle', icon: 'fa-bus' }
    ],
    miscellaneous: [
        { path: '/commercial-insurance/burglary-insurance', title: 'Burglary Insurance', icon: 'fa-vault' },
        { path: '/commercial-insurance/money-insurance', title: 'Money Insurance', icon: 'fa-coins' },
        { path: '/commercial-insurance/fidelity-guarantee-insurance', title: 'Fidelity Guarantee', icon: 'fa-handshake-slash' },
        { path: '/commercial-insurance/event-insurance', title: 'Event Insurance', icon: 'fa-calendar-check' },
        { path: '/commercial-insurance/travel-insurance-misc', title: 'Travel Insurance', icon: 'fa-plane' },
        { path: '/commercial-insurance/shop-insurance', title: 'Shop Insurance', icon: 'fa-shop' },
        { path: '/commercial-insurance/sme-package-policies', title: 'SME Package Policies', icon: 'fa-box-tissue' },
        { path: '/commercial-insurance/specialized-risk-covers', title: 'Specialized Risk Covers', icon: 'fa-shield-heart' }
    ]
};

const InsuranceDetail = () => {
    const { type } = useParams();
    const location = useLocation();

    // Determine the key based on either the :type parameter OR the full path if :type is missing (for hubs)
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];

    // Attempt to find data by :type param, then by last part of path
    const dataKey = type || lastPart;
    const data = insuranceData[dataKey];

    if (!data) {
        return <div className="container py-5 text-center"><h1>Page Not Found</h1><p>We couldn't find the insurance page you're looking for.</p></div>;
    }

    const sidebar = sidebarMenus[data.sidebarType] || [];

    return (
        <>
            <SEO
                title={`${data.heroTitle} | PIB Insurance`}
                description={data.heroText}
                canonical={`https://pibinsurance.in${location.pathname}`}
            />
            {/* HERO SECTION */}
            <section className={`insurance-hero ${data.heroClass}`}>
                <div className="industries-hero-container">
                    <MotionSection className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>{data.heroTitle}</h1>
                        </div>
                        <div className="breadcrumb-custom">{data.breadcrumb}</div>
                    </MotionSection>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="insurance-container">
                <div className="container">
                    <div className="insurance-grid">
                        {/* SIDEBAR */}
                        <aside className="insurance-sidebar">
                            <MotionItem className="sidebar-card" variant="fadeRight">
                                <ul className="sidebar-menu">
                                    {sidebar.map((item) => (
                                        <li key={item.path} className={location.pathname === item.path ? 'page-active' : ''}>
                                            <Link to={item.path} aria-label={`View details for ${item.title}`}><i className={`fa ${item.icon}`}></i> {item.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </MotionItem>
                        </aside>

                        {/* MAIN CONTENT */}
                        <main className="insurance-main">
                            <MotionSection className="content-detail">
                                <h3>{data.contentTitle}</h3>
                                <p>{data.contentText}</p>
                            </MotionSection>

                            <div className="section-divider my-5"></div>

                            <MotionSection className="covered-section">
                                <h4 className="section-title"><i className="fa fa-notes-medical me-3"></i> {data.coveredTitle}</h4>
                                <MotionList className="features-list" stagger={0.1}>
                                    {data.features.map((feature, index) => (
                                        <li key={index}>
                                            <i className={`fa ${feature.icon}`}></i>
                                            <div><strong>{feature.title}</strong> {feature.text}</div>
                                        </li>
                                    ))}
                                </MotionList>
                            </MotionSection>

                            <div className="section-divider my-5"></div>

                            <MotionSection className="why-matters-section bg-light p-4 p-md-5 rounded-4">
                                <h4 className="section-title"><i className="fa fa-lightbulb me-3"></i> Why It Matters</h4>
                                <MotionList className="row g-4 mt-2" stagger={0.1}>
                                    {data.whyMatters.map((item, index) => (
                                        <div key={index} className="col-12 col-xxl-6">
                                            <div className="matter-item">
                                                <div className="matter-icon"><i className={`fa ${item.icon}`}></i></div>
                                                <div>{item.text}</div>
                                            </div>
                                        </div>
                                    ))}
                                </MotionList>
                            </MotionSection>

                            <MotionSection className="consider-box mt-5" delay={0.2}>
                                <h4 className="section-title">{data.considerTitle}</h4>
                                <div className="consider-content">
                                    <p>{data.considerText}</p>
                                </div>
                            </MotionSection>

                            <MotionItem className="cta-box mt-5 p-4 p-md-5 bg-primary text-white rounded-4 text-center" variant="zoomIn" delay={0.3}>
                                <h3 className="text-white mb-3">{data.ctaTitle || "Ready to get started?"}</h3>
                                <p className="text-white-50 mb-4">{data.ctaText || "Contact our expert risk advisors to find the perfect insurance cover for your needs."}</p>
                                <Link to="/contact" className="btn btn-light btn-lg px-5 py-3 fw-bold" style={{ color: '#1a6fa8', borderRadius: '12px' }} aria-label="Contact us for your insurance needs">CONTACT US</Link>
                            </MotionItem>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InsuranceDetail;
