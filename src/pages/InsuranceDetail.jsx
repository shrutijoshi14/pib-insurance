import { useParams, Link } from 'react-router-dom';
import { insuranceData } from '../data/insuranceData';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';

const sidebarMenus = {
    group: [
        { path: '/group-health-insurance', title: 'Group Health Insurance', icon: 'fa-users' },
        { path: '/group-personal-accident', title: 'Group Personal Accident', icon: 'fa-shield-halved' },
        { path: '/group-term-insurance', title: 'Group Term Insurance', icon: 'fa-file-shield' },
        { path: '/group-travel-insurance', title: 'Group Travel Insurance', icon: 'fa-plane' }
    ],
    commercial: [
        { path: '/liability-insurance', title: 'Liability Insurance', icon: 'fa-scale-balanced' },
        { path: '/marine-insurance', title: 'Marine Insurance', icon: 'fa-ship' },
        { path: '/property-insurance', title: 'Property Insurance', icon: 'fa-building' },
        { path: '/fire-insurance', title: 'Fire Insurance', icon: 'fa-fire' },
        { path: '/workmens-compensation', title: 'Workmen’s Compensation', icon: 'fa-hard-hat' },
        { path: '/professional-indemnity', title: 'Professional Indemnity', icon: 'fa-user-tie' },
        { path: '/business-interruption-insurance', title: 'Business Interruption', icon: 'fa-clock-rotate-left' },
        { path: '/contractor-all-risk', title: 'Contractor All Risk', icon: 'fa-trowel-bricks' },
        { path: '/cyber-insurance', title: 'Cyber Insurance', icon: 'fa-shield-virus' }
    ],
    individual: [
        { path: '/term-insurance', title: 'Term Insurance', icon: 'fa-heart-pulse' },
        { path: '/health-insurance', title: 'Health Insurance', icon: 'fa-stethoscope' },
        { path: '/home-insurance', title: 'Home Insurance', icon: 'fa-house' },
        { path: '/motor-insurance', title: 'Motor Insurance', icon: 'fa-car' },
        { path: '/travel-insurance', title: 'Travel Insurance', icon: 'fa-plane' },
        { path: '/accidental-insurance', title: 'Personal Accident', icon: 'fa-shield-halved' }
    ]
};

const InsuranceDetail = () => {
    const { type } = useParams();
    const data = insuranceData[type];

    if (!data) {
        return <div className="container py-5"><h1>Page Not Found</h1></div>;
    }

    const sidebar = sidebarMenus[data.sidebarType] || [];

    return (
        <>
            <SEO 
                title={`${data.heroTitle} | PIB Insurance`} 
                description={data.heroText}
                canonical={`https://pibinsurance.in/${type}`}
            />
            {/* HERO SECTION */}
            <section className={`insurance-hero ${data.heroClass}`}>
                <div className="industries-hero-container">
                    <MotionSection className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>{data.heroTitle}</h1>
                            <div className="hero-header-divider"></div>
                            <div className="hero-header-info">{data.heroInfo}</div>
                        </div>
                        <p>{data.heroText}</p>
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
                                        <li key={item.path} className={type === item.path.substring(1) ? 'page-active' : ''}>
                                            <Link to={item.path}><i className={`fa ${item.icon}`}></i> {item.title}</Link>
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
                                <Link to="/contact" className="btn btn-light btn-lg px-5 py-3 fw-bold" style={{ color: '#1a6fa8', borderRadius: '12px' }}>GET A QUOTE NOW</Link>
                            </MotionItem>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InsuranceDetail;
