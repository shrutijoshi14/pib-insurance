import { useState } from 'react';
import SEO from '../components/SEO';

const Insights = () => {
    const [filter, setFilter] = useState('all');

    const sections = [
        {
            id: 'guides',
            icon: 'fa-book-open',
            title: 'Insurance Guides',
            desc: 'Clear, practical explanations of the insurance products that matter to your business — so you know exactly what you are buying, what it covers, and what it does not.',
            items: [
                {
                    tag: 'Guides',
                    img: `${import.meta.env.BASE_URL}assets/insurance-guides-1.jpg`,
                    date: 'October 24, 2026',
                    time: '5 min read',
                    title: 'Group Health vs. Individual Mediclaim — What Indian Employers Need to Know',
                    text: 'Understanding the key differences between group health insurance and individual mediclaim policies can help you make the right coverage decisions for your team.'
                },
                {
                    tag: 'Guides',
                    img: `${import.meta.env.BASE_URL}assets/insurance-guides-2.jpg`,
                    date: 'October 05, 2026',
                    time: '4 min read',
                    title: 'What Your Marine Insurance Policy May Not Cover on Inland Routes',
                    text: 'Discover the common exclusions in marine insurance policies that apply to inland transportation and how to address coverage gaps.'
                }
            ]
        },
        {
            id: 'regulatory',
            icon: 'fa-gavel',
            title: 'Regulatory Updates',
            desc: "The latest from IRDAI, the Union Budget, and India's evolving compliance landscape — translated into plain language so you know what has changed and what it means for your coverage.",
            items: [
                {
                    tag: 'Regulatory',
                    img: `${import.meta.env.BASE_URL}assets/regulatory-updates-1.jpg`,
                    date: 'October 20, 2026',
                    time: '6 min read',
                    title: "IRDAI's New Composite Licence Framework — What It Means for Your Business Insurance",
                    text: 'Breaking down the recent regulatory changes from IRDAI and their impact on how businesses structure their insurance portfolios.'
                },
                {
                    tag: 'Regulatory',
                    img: `${import.meta.env.BASE_URL}assets/regulatory-updates-2.jpg`,
                    date: 'October 12, 2026',
                    time: '5 min read',
                    title: 'DPDP Act 2023 — Do You Need Cyber Liability Cover?',
                    text: "With India's new data protection legislation in effect, understand when cyber liability insurance becomes essential for your organization."
                }
            ]
        },
        {
            id: 'client',
            icon: 'fa-handshake-angle',
            title: 'Client Stories',
            desc: 'Real situations, real outcomes. How PIB Insurance Brokers has helped businesses and individuals navigate claims, structure the right coverage, and find stability when it mattered most.',
            items: [
                {
                    tag: 'Stories',
                    img: `${import.meta.env.BASE_URL}assets/client-stories-1.jpg`,
                    date: 'October 10, 2026',
                    time: '4 min read',
                    title: 'How a Mumbai Construction Firm Protected 80 Employees Under One Group Policy',
                    text: 'A real-world case study of how we helped a growing construction company transition to comprehensive group health coverage.'
                },
                {
                    tag: 'Stories',
                    img: `${import.meta.env.BASE_URL}assets/client-stories-2.jpg`,
                    date: 'October 02, 2026',
                    time: '3 min read',
                    title: 'Cashless Claim Settlement During a Medical Emergency — How PIB Managed the Process',
                    text: 'Step-by-step account of how our team coordinated with hospitals and insurers to ensure seamless cashless treatment for a client.'
                }
            ]
        },
        {
            id: 'market',
            icon: 'fa-chart-line',
            title: 'Market Updates',
            desc: "Quarterly observations on what is shifting in India's insurance market — pricing trends, product changes, and what to watch for at your next renewal.",
            items: [
                {
                    tag: 'Market',
                    img: `${import.meta.env.BASE_URL}assets/market-updates-1.jpg`,
                    date: 'October 15, 2026',
                    time: '7 min read',
                    title: "Q1 2026 India Insurance Market Update — What's Changed in Group Health Premiums",
                    text: 'Analysis of recent premium trends in the group health insurance market and what businesses should expect at renewal.'
                },
                {
                    tag: 'Market',
                    img: `${import.meta.env.BASE_URL}assets/market-updates-2.jpg`,
                    date: 'September 28, 2026',
                    time: '6 min read',
                    title: 'Marine Insurance Rates in India — Q4 2025 Overview for Exporters',
                    text: 'Quarterly review of marine insurance pricing trends affecting Indian exporters and importers, with insights on rate drivers.'
                }
            ]
        }
    ];

    return (
        <>
            <SEO 
                title="Insurance Insights & Market Updates | PIB Insurance" 
                description="Expert market analysis, regulatory updates, and insurance guides to help you make smarter decisions for your business."
                canonical="https://pibinsurance.in/insights"
            />
            <section className="insurance-hero hero-insights">
                <div className="industries-hero-container">
                    <div className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>Insurance Insights</h1>
                            <div className="hero-header-divider"></div>
                            <div className="hero-header-info">Expert Market Analysis</div>
                        </div>
                        <p>The perspectives, expertise, and guidance you need to make smarter insurance decisions for your business — and protect what you have built.</p>
                        <div className="breadcrumb-custom">HOME / INSIGHTS</div>
                    </div>
                </div>
            </section>

            <section className="insights-section">
                <div className="container">
                    {/* FILTERS */}
                    <div className="filter-container">
                        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                        <button className={`filter-btn ${filter === 'guides' ? 'active' : ''}`} onClick={() => setFilter('guides')}>Insurance Guides</button>
                        <button className={`filter-btn ${filter === 'regulatory' ? 'active' : ''}`} onClick={() => setFilter('regulatory')}>Regulatory Updates</button>
                        <button className={`filter-btn ${filter === 'client' ? 'active' : ''}`} onClick={() => setFilter('client')}>Client Stories</button>
                        <button className={`filter-btn ${filter === 'market' ? 'active' : ''}`} onClick={() => setFilter('market')}>Market Updates</button>
                    </div>

                    {/* SECTIONS WRAPPER */}
                    <div id="insightsSections">
                        {sections.filter(s => filter === 'all' || s.id === filter).map(section => (
                            <div key={section.id} className="insight-category-section" style={{ display: 'block' }}>
                                <div className="category-header">
                                    <h2><i className={`fa ${section.icon}`}></i> {section.title}</h2>
                                    <p>{section.desc}</p>
                                </div>
                                <div className="insights-grid">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="insight-card">
                                            <div className="insight-img">
                                                <span className="insight-tag">{item.tag}</span>
                                                <img src={item.img} alt={item.title} loading="lazy" />
                                            </div>
                                            <div className="insight-body">
                                                <div className="insight-metadata">
                                                    <span className="insight-date"><i className="far fa-calendar-alt"></i> {item.date}</span>
                                                    <span className="reading-time"><i className="far fa-clock"></i> {item.time}</span>
                                                </div>
                                                <h3>{item.title}</h3>
                                                <p>{item.text}</p>
                                                <a href="#" className="read-more">Read More <i className="fa fa-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Insights;
