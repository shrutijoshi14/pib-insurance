import { useParams, Link, useLocation } from 'react-router-dom';
import { insuranceData } from '../data/insuranceData';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';

const sidebarMenus = {
    group: [
        { path: '/group-insurance/group-health-insurance', title: 'Group Health Insurance', icon: 'fa-users' },
        { path: '/group-insurance/group-personal-accident', title: 'Group Personal Accident', icon: 'fa-shield-halved' },
        { path: '/group-insurance/group-term-insurance', title: 'Group Term Insurance', icon: 'fa-file-shield' },
        { path: '/group-insurance/group-travel-insurance', title: 'Group Travel Insurance', icon: 'fa-plane' }
    ],
    commercial: [
        { path: '/commercial-insurance/liability-insurance', title: 'Liability Insurance', icon: 'fa-scale-balanced' },
        { path: '/commercial-insurance/marine-insurance', title: 'Marine Insurance', icon: 'fa-ship' },
        { path: '/commercial-insurance/property-insurance', title: 'Property Insurance', icon: 'fa-building' },
        { path: '/commercial-insurance/fire-insurance', title: 'Fire Insurance', icon: 'fa-fire' },
        { path: '/commercial-insurance/workmens-compensation', title: 'Workmen’s Compensation', icon: 'fa-hard-hat' },
        { path: '/commercial-insurance/professional-indemnity', title: 'Professional Indemnity', icon: 'fa-user-tie' },
        { path: '/commercial-insurance/business-interruption-insurance', title: 'Business Interruption', icon: 'fa-clock-rotate-left' },
        { path: '/commercial-insurance/contractor-all-risk', title: 'Contractor All Risk', icon: 'fa-trowel-bricks' },
        { path: '/commercial-insurance/cyber-insurance', title: 'Cyber Insurance', icon: 'fa-shield-virus' }
    ],
    individual: [
        { path: '/individual-insurance/term-insurance', title: 'Term Insurance', icon: 'fa-heart-pulse' },
        { path: '/individual-insurance/health-insurance', title: 'Health Insurance', icon: 'fa-stethoscope' },
        { path: '/individual-insurance/home-insurance', title: 'Home Insurance', icon: 'fa-house' },
        { path: '/individual-insurance/motor-insurance', title: 'Motor Insurance', icon: 'fa-car' },
        { path: '/individual-insurance/travel-insurance', title: 'Travel Insurance', icon: 'fa-plane' },
        { path: '/individual-insurance/accidental-insurance', title: 'Personal Accident', icon: 'fa-shield-halved' }
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
                                <h3 className="text-white mb-3">Ready to empower your workforce?</h3>
                                <p className="text-white-50 mb-4">Our experts will help you design the perfect health plan for your organization.</p>
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
