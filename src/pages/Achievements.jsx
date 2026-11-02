import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import '../styles/achievements.css';

import brokerTrophy from '../assets/achievements/broker-excellence-trophy.jpg';
import crystalAward from '../assets/achievements/leadership-crystal-award.jpg';
import trophyShowcase from '../assets/achievements/trophy-showcase.jpg';

const awardsList = [
    {
        id: 1,
        title: 'Brokerage Firm of the Year – Excellence Award',
        organization: 'Insurance Excellence Summit',
        year: '2024',
        category: 'Industry Excellence',
        image: brokerTrophy,
        badge: 'Premier Honor',
        description: 'Recognized for pioneering client-first risk advisory, robust underwriting support, and comprehensive coverage solutions across pan-India commercial and retail segments.'
    },
    {
        id: 2,
        title: 'Leadership & Corporate Innovation Award',
        organization: 'National Risk & Governance Forum',
        year: '2024',
        category: 'Leadership & Vision',
        image: crystalAward,
        badge: 'Leadership Award',
        description: 'Awarded to PIB Insurance Brokers for exceptional governance, visionary leadership under Mrs. Usha Pandey & Mr. Virendra Pandey, and proactive digital insurance enablement.'
    },
    {
        id: 3,
        title: 'Claims Assistance & Customer Trust Milestone',
        organization: 'Federation of Insurance Brokers',
        year: '2023 - 2024',
        category: 'Customer Advocacy',
        image: trophyShowcase,
        badge: 'Customer Trust',
        description: 'Honoring our dedicated claims advocacy division with 99%+ fast-track settlement assistance, transparent handling, and unwavering support during critical loss events.'
    }
];

const milestones = [
    {
        year: '2022',
        title: 'Inception & IRDAI Direct Broker License',
        desc: 'PIB Insurance Brokers was established on 8th Dec 2022 by Mr. Virendra Pandey (IIM Indore alumnus) with IRDAI Direct Broker License No. 935.'
    },
    {
        year: '2023',
        title: 'Rapid 4-Zone Expansion & 13 Regional Hubs',
        desc: 'Expanded operations across North, East, West, and South zones with 13 strategic regional offices covering 110+ cities nationwide.'
    },
    {
        year: '2024',
        title: '90,000+ Clients & Multi-Sector Coverage',
        desc: 'Surpassed 90,000+ satisfied individual and corporate clients across manufacturing, logistics, healthcare, engineering, and SME sectors.'
    },
    {
        year: '2025 - 2026',
        title: 'Nationwide Industry Leadership & Accolades',
        desc: 'Recognized with premier awards for brokerage excellence, curated risk management, and cutting-edge digital service infrastructure.'
    }
];

const Achievements = () => {
    return (
        <>
            <SEO
                title="Achievements & Awards | PIB Insurance Brokers"
                description="Explore our accolades, trophies, and milestones at PIB Insurance Brokers Private Limited. Celebrating excellence in insurance broking and risk advisory."
                canonical="https://pibinsurance.in/achievements"
            />

            {/* HERO SECTION */}
            <section className="insurance-hero hero-achievements">
                <div className="industries-hero-container">
                    <div className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>Our Achievements & Awards</h1>
                        </div>
                        <div className="breadcrumb-custom">HOME / ABOUT US / ACHIEVEMENTS</div>
                    </div>
                </div>
            </section>

            {/* INTRO SUMMARY SECTION */}
            <section className="achievements-intro-section">
                <div className="container">
                    <MotionSection className="achievements-header text-center" delay={0.1}>
                        <span className="tag-badge">CELEBRATING EXCELLENCE</span>
                        <h2>Honoring Our Milestones, Trophies & Industry Recognitions</h2>
                        <div className="divider-line"></div>
                        <p className="intro-text">
                            At PIB Insurance Brokers Private Limited, every award and milestone is a testament to the
                            trust of our 90,000+ clients and our unwavering commitment to ethical business practices,
                            innovative risk advisory, and prompt claims advocacy.
                        </p>
                    </MotionSection>

                    {/* STATS STRIP */}
                    <MotionList className="stats-strip-grid" stagger={0.1}>
                        <div className="stat-card">
                            <div className="stat-icon"><i className="fa-solid fa-trophy"></i></div>
                            <div className="stat-num">25+</div>
                            <div className="stat-label">Industry Recognitions</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
                            <div className="stat-num">90,000+</div>
                            <div className="stat-label">Clients Protected</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><i className="fa-solid fa-city"></i></div>
                            <div className="stat-num">110+</div>
                            <div className="stat-label">Cities Reached</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><i className="fa-solid fa-shield-halved"></i></div>
                            <div className="stat-num">100%</div>
                            <div className="stat-label">IRDAI Regulated & Trusted</div>
                        </div>
                    </MotionList>
                </div>
            </section>

            {/* AWARDS & TROPHIES SHOWCASE */}
            <section className="awards-showcase-section">
                <div className="container">
                    <div className="section-title-wrap text-center">
                        <span className="tag-badge">HONORS & TROPHIES</span>
                        <h3>Key Awards & Industry Accolades</h3>
                        <p>A reflection of our ongoing journey to build trust, resilience, and #SecuringHappiness for India.</p>
                    </div>

                    <div className="awards-grid">
                        {awardsList.map((award, index) => (
                            <MotionItem
                                key={award.id}
                                className="award-card"
                                variant={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
                            >
                                <div className="award-img-wrap">
                                    <img
                                        src={award.image}
                                        alt={award.title}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="award-badge">
                                        <i className="fa-solid fa-award"></i> {award.badge}
                                    </span>
                                </div>
                                <div className="award-body">
                                    <div className="award-meta">
                                        <span className="award-cat">{award.category}</span>
                                        <span className="award-year"><i className="fa-regular fa-calendar-check"></i> {award.year}</span>
                                    </div>
                                    <h4>{award.title}</h4>
                                    <div className="award-org">
                                        <i className="fa-solid fa-building-columns"></i> {award.organization}
                                    </div>
                                    <p>{award.description}</p>
                                </div>
                            </MotionItem>
                        ))}
                    </div>
                </div>
            </section>

            {/* TIMELINE / MILESTONES */}
            <section className="milestones-section">
                <div className="container">
                    <div className="section-title-wrap text-center">
                        <span className="tag-badge">OUR JOURNEY</span>
                        <h3>Milestones That Define Our Growth</h3>
                        <p>Tracing our evolution into one of India’s most trusted direct insurance brokers.</p>
                    </div>

                    <div className="timeline-container">
                        {milestones.map((item, idx) => (
                            <MotionItem
                                key={idx}
                                className={`timeline-node ${idx % 2 === 0 ? 'left' : 'right'}`}
                                variant={idx % 2 === 0 ? 'fadeRight' : 'fadeLeft'}
                            >
                                <div className="timeline-content">
                                    <div className="timeline-year">{item.year}</div>
                                    <h5>{item.title}</h5>
                                    <p>{item.desc}</p>
                                </div>
                            </MotionItem>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="achievements-cta-section">
                <div className="container">
                    <MotionSection className="achievements-cta-box" delay={0.2}>
                        <div className="cta-content">
                            <h3>Experience Award-Winning Insurance Advisory</h3>
                            <p>
                                Join thousands of corporates and individuals who rely on PIB Insurance Brokers for customized
                                protection, risk management, and dependable claims support.
                            </p>
                        </div>
                        <div className="cta-actions">
                            <Link to="/contact" className="cta-btn primary">
                                Get In Touch <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                            <Link to="/about" className="cta-btn secondary">
                                About Us
                            </Link>
                        </div>
                    </MotionSection>
                </div>
            </section>
        </>
    );
};

export default Achievements;
