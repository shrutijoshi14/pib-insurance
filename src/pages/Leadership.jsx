import { useParams, Link } from 'react-router-dom';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';

const leadersData = [
    {
        slug: 'shruti-joshi',
        name: 'Shruti Joshi',
        designation: 'Head – Information Technology & Digital Transformation',
        image: 'assets/Professional Photo rsized.jpeg',
        subTitle: 'Technology & Digital Strategy Leader',
        highlights: ['Digital Transformation', 'Web Architecture', 'Process Automation', 'IT Strategy'],
        bio: [
            "Shruti Joshi leads the Information Technology and Digital Transformation functions at PIB Insurance Brokers Pvt. Ltd., spearheading the organization’s technology strategy, digital innovation, and online growth initiatives. She plays a pivotal role in strengthening PIB’s digital capabilities, ensuring that technology remains a key driver of operational excellence, customer engagement, and business scalability.",
            "With expertise in web development, digital platforms, and technology implementation, Shruti oversees the design, development, and continuous enhancement of the company’s digital infrastructure. Her responsibilities include website management, digital experience optimization, process automation, systems integration, and the adoption of innovative technology solutions that support business objectives.",
            "She is committed to leveraging emerging technologies to improve efficiency, enhance user experiences, and create seamless digital interactions for clients, partners, and stakeholders. Her forward-thinking approach has contributed significantly to strengthening PIB Insurance’s digital presence and advancing its vision of delivering modern, customer-centric insurance solutions.",
            "As Head – Information Technology & Digital Transformation, Shruti continues to drive technological innovation and digital excellence, supporting PIB Insurance Brokers’ commitment to sustainable growth and industry leadership."
        ],
        social: {
            linkedin: "https://www.linkedin.com/company/pib-insurance-brokers-private-limited/"
        }
    },
    {
        slug: 'desh-dipak',
        name: 'Mr. Desh Dipak',
        designation: 'Senior Advisor – General Insurance & Risk Management',
        subTitle: 'Former Senior Divisional Manager, The Oriental Insurance Company Ltd.',
        image: 'assets/Dipak.jpeg',
        highlights: ['28+ Years Experience', 'General Insurance', 'Underwriting & Claims', 'Risk Management'],
        bio: [
            "Mr. Desh Dipak is a seasoned insurance leader with over 28 years of distinguished experience in the General Insurance sector. Having superannuated as Senior Divisional Manager from The Oriental Insurance Company Ltd., he brings extensive expertise in insurance operations, underwriting, claims management, business development, and strategic leadership.",
            "Throughout his career, he successfully led divisional operations, managed diverse insurance portfolios, and drove sustainable business growth while maintaining strong underwriting discipline and customer-centric service standards. His leadership has been instrumental in strengthening operational efficiency, enhancing distribution networks, and fostering long-term stakeholder relationships.",
            "With a comprehensive understanding of risk management, regulatory compliance, and market dynamics, Mr. Dipak has consistently delivered value across multiple lines of business. His proven ability to lead high-performing teams and navigate complex insurance environments has earned him recognition as a respected industry professional.",
            "As Senior Advisor – General Insurance & Risk Management at PIB Insurance Brokers Pvt. Ltd., Mr. Dipak provides strategic guidance, technical expertise, and industry insights, supporting the organization’s commitment to delivering innovative insurance solutions and exceptional client service."
        ],
        social: {
            email: "info@pibinsurance.in"
        }
    },
    {
        slug: 'naresh-marwari',
        name: 'Naresh Kumar Marwari',
        designation: 'Executive Advisor – General Insurance & Risk Management',
        subTitle: 'Former Deputy General Manager, National Insurance Company Ltd.',
        image: 'assets/Naresh.jpeg',
        highlights: ['36+ Years Experience', 'General Insurance', 'Underwriting & Claims', 'Risk Management'],
        bio: [
            "Mr. Naresh Kumar Marwari is a highly accomplished insurance leader with over 36 years of distinguished experience in the General Insurance industry. Having served as Deputy General Manager at National Insurance Company Ltd., one of India's leading public sector general insurers, he brings exceptional expertise in insurance operations, underwriting, claims management, business strategy, and organizational leadership.",
            "During his illustrious career, Mr. Marwari successfully led Regional, Divisional, and Branch Office operations, overseeing large-scale insurance portfolios and managing critical functions across underwriting, claims, marketing, human resources, training, and business development. His leadership has been instrumental in driving sustainable growth, strengthening operational efficiency, and enhancing customer-centric service delivery.",
            "Renowned for his deep technical knowledge and strategic vision, he has extensive experience across Property, Casualty, Motor, Health, Marine, Liability, Fire, and Engineering Insurance. He has also played a pivotal role in developing distribution networks, managing corporate relationships, implementing governance frameworks, and ensuring regulatory compliance in a dynamic insurance environment.",
            "At PIB Insurance Brokers Pvt. Ltd., Mr. Marwari serves as Executive Advisor – General Insurance & Risk Management, providing strategic counsel, industry insights, and technical expertise to support clients in navigating complex risk challenges and achieving their long-term business objectives.",
            "His vast experience, leadership acumen, and commitment to excellence significantly strengthen PIB Insurance's capability to deliver innovative, client-focused, and value-driven insurance solutions."
        ],
        social: {
            email: "info@pibinsurance.in"
        }
    }
];

const PlaceholderAvatar = () => (
    <svg className="placeholder-avatar" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="url(#avatar-grad)" />
        <path d="M50 48C56.6274 48 62 42.6274 62 36C62 29.3726 56.6274 24 50 24C43.3726 24 38 29.3726 38 36C38 42.6274 43.3726 48 50 48Z" fill="white" fillOpacity="0.85" />
        <path d="M74 72C74 62.0589 63.2548 54 50 54C36.7452 54 26 62.0589 26 72" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
        <defs>
            <linearGradient id="avatar-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1b75bb" />
                <stop stopColor="#0a2e6e" />
            </linearGradient>
        </defs>
    </svg>
);

const Leadership = () => {
    const { slug } = useParams();

    // Render single person detail page
    if (slug) {
        const leader = leadersData.find(l => l.slug === slug);

        if (!leader) {
            return (
                <div className="leader-not-found">
                    <SEO title="Leader Not Found | PIB Insurance" />
                    <h2>Leader Not Found</h2>
                    <p>The requested leadership profile does not exist.</p>
                    <Link to="/leadership" className="back-btn">Back to Leadership</Link>
                </div>
            );
        }

        return (
            <>
                <SEO
                    title={`${leader.name} - ${leader.designation} | PIB Insurance`}
                    description={`Read the profile of ${leader.name}, ${leader.designation} at PIB Insurance Brokers.`}
                    canonical={`https://pibinsurance.in/leadership/${leader.slug}`}
                />

                {/* SINGLE HERO SECTION */}
                <section className="insurance-hero hero-leadership">
                    <div className="industries-hero-container">
                        <div className="industries-hero-content">
                            <div className="hero-header-row">
                                <h1>{leader.name}</h1>
                            </div>
                            <div className="breadcrumb-custom">HOME / LEADERSHIP / {leader.name.toUpperCase()}</div>
                        </div>
                    </div>
                </section>

                {/* DETAILED BIO VIEW */}
                <section className="leader-detail-section active-leader-view">
                    <div className="leader-container">
                        {/* LEFT COLUMN: Profile Card */}
                        <MotionItem className="leader-profile-sidebar" delay={0.1} variant="fadeRight">
                            <Link to="/leadership" className="back-to-team">
                                <i className="fa-solid fa-arrow-left"></i> Back to Leadership
                            </Link>
                            
                            <div className="leader-profile-card">
                                <div className="leader-profile-image">
                                    {leader.image ? (
                                        <img src={`${import.meta.env.BASE_URL}${leader.image}`} alt={leader.name} width="350" height="400" loading="lazy" decoding="async" className={leader.slug === 'desh-dipak' ? 'crop-top-border' : ''} />
                                    ) : (
                                        <PlaceholderAvatar />
                                    )}
                                </div>
                                <div className="leader-profile-info">
                                    <span className="leader-profile-tag">{leader.designation}</span>
                                    <h2>{leader.name}</h2>
                                    {leader.subTitle && <p className="leader-profile-subtitle">{leader.subTitle}</p>}
                                    
                                    <div className="leader-profile-social">
                                        {leader.social.linkedin && (
                                            <a href={leader.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn linkedin-btn">
                                                <i className="fab fa-linkedin"></i> Connect on LinkedIn
                                            </a>
                                        )}
                                        {leader.social.email && (
                                            <a href={`mailto:${leader.social.email}`} className="social-btn email-btn">
                                                <i className="fa-solid fa-envelope"></i> Contact Office
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </MotionItem>

                        {/* RIGHT COLUMN: Bio and Details */}
                        <MotionSection className="leader-bio-details" delay={0.2} variant="fadeLeft">
                            <div className="bio-section-card">
                                <h3 className="section-title">Biography</h3>
                                <div className="leader-bio">
                                    {leader.bio.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="bio-section-card highlights-card">
                                <h3 className="section-title">Key Areas of Expertise</h3>
                                <div className="leader-highlights-grid">
                                    {leader.highlights.map(hl => (
                                        <div key={hl} className="expertise-item">
                                            <i className="fa-solid fa-circle-check"></i>
                                            <span>{hl}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </MotionSection>
                    </div>
                </section>
            </>
        );
    }

    // Render cards list view
    return (
        <>
            <SEO
                title="Our Leadership | PIB Insurance - Guided by Expertise"
                description="Meet the leadership team at PIB Insurance Brokers. Learn about our board, advisors, and digital leads driving trust and innovation."
                canonical="https://pibinsurance.in/leadership"
            />

            {/* HERO SECTION */}
            <section className="insurance-hero hero-leadership">
                <div className="industries-hero-container">
                    <div className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>Our Leadership</h1>
                        </div>
                        <div className="breadcrumb-custom">HOME / ABOUT US / LEADERSHIP</div>
                    </div>
                </div>
            </section>

            {/* INTRO SUMMARY */}
            <section className="leadership-intro">
                <div className="leadership-intro-container">
                    <MotionSection variant="fadeUp" className="intro-content">
                        <span className="section-subtitle">GUIDED BY EXPERTISE</span>
                        <h2>The Pillars of Our Trust & Innovation</h2>
                        <p>
                            At PIB Insurance Brokers, our leadership team brings together a unique blend of strategic management,
                            general insurance operations, and digital transformation strategy.
                        </p>
                    </MotionSection>
                </div>
            </section>

            {/* CARDS GRID */}
            <section className="leader-grid-section">
                <div className="container">
                    <MotionList className="leader-cards-grid" stagger={0.15}>
                        {leadersData.map((leader) => (
                            <MotionItem key={leader.slug} className="leader-card-item" variant="fadeUp" inherit={true}>
                                <div className="leader-card">
                                    <div className="leader-card-image">
                                        {leader.image ? (
                                            <img src={`${import.meta.env.BASE_URL}${leader.image}`} alt={leader.name} width="350" height="400" loading="lazy" decoding="async" className={leader.slug === 'desh-dipak' ? 'crop-top-border' : ''} />
                                        ) : (
                                            <PlaceholderAvatar />
                                        )}
                                    </div>
                                    <div className="leader-card-info">
                                        <h3>{leader.name}</h3>
                                        <p className="card-designation">{leader.designation}</p>
                                        <Link to={`/leadership/${leader.slug}`} className="read-more-leader-btn">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </MotionItem>
                        ))}
                    </MotionList>
                </div>
            </section>
        </>
    );
};

export default Leadership;
