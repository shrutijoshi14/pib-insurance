import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    MotionSection,
    MotionItem,
    MotionList,
} from "../components/MotionWrappers";
import SEO from "../components/SEO";
import bridgeVideo from "../assets/Bridge.mp4";
import heroBg from "../assets/hero-video-poster.jpg";

const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        setCount(Math.floor(progress * end));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={countRef}>{count}{suffix}</span>;
};

const Home = () => {
    const [activeTab, setActiveTab] = useState("commercial");
    const [expandedInsights, setExpandedInsights] = useState({});
    const [expandedTestimonials, setExpandedTestimonials] = useState({});

    const toggleInsight = (id) => {
        setExpandedInsights((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleTestimonial = (id) => {
        setExpandedTestimonials((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <>
            <SEO
                title="PIB Insurance Brokers | Expert Risk Management in India"
                description="Secure your business and family with India's trusted IRDAI registered insurance broker. Expertise in Commercial and Group insurance."
                canonical="https://pibinsurance.in/"
            />
            {/* HERO SECTION */}
            <section className="hero">
                <video
                    className="hero-bg-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={heroBg}
                >
                    <source src={bridgeVideo} type="video/mp4" />
                </video>
            </section>

            {/* WHY CHOOSE US */}
            <section className="why-section">
                <div className="why-container">
                    <MotionSection className="why-content" variant="fadeRight">
                        <h2>Why Choose Us</h2>
                        <p className="intro">
                            We deliver comprehensive coverage, strong partnerships, and
                            customized policies for all types of businesses.
                        </p>
                        <div className="why-points">
                            <MotionItem className="why-box" delay={0.1}>
                                <i className="fa fa-check"></i>
                                <div>
                                    <h4>Tailored Coverage & Value</h4>
                                    <p>
                                        Solutions aligned to your budget and business goals. Compare
                                        intelligently to get the best value with access across
                                        quality.
                                    </p>
                                </div>
                            </MotionItem>
                            <MotionItem className="why-box" delay={0.2}>
                                <i className="fa fa-check"></i>
                                <div>
                                    <h4>Transparency & Reliability</h4>
                                    <p>
                                        Clear policies and dependable support at every step. We do
                                        not leave you at ignorant or unanswered while getting
                                        insured.
                                    </p>
                                </div>
                            </MotionItem>
                            <MotionItem className="why-box" delay={0.3}>
                                <i className="fa fa-check"></i>
                                <div>
                                    <h4>Smart Comparisons Below Choices</h4>
                                    <p>
                                        We keep you updated about what is happening around to make
                                        you aware of current market scenarios and with intelligently
                                        best to you.
                                    </p>
                                </div>
                            </MotionItem>
                        </div>
                    </MotionSection>
                    <MotionSection className="why-image" delay={0.2} variant="fadeLeft">
                        <img
                            src={`${import.meta.env.BASE_URL}assets/group-meeting.png`}
                            alt="PIB Insurance team of experts discussing corporate strategy and risk management"
                            width="1200"
                            height="800"
                            decoding="async"
                            loading="lazy"
                        />
                    </MotionSection>
                </div>
            </section>

            {/* HOW IT WORKS (PROCESS) */}
            <section className="process-section py-5">
                <div className="process-container">
                    <MotionSection className="text-center mb-5">
                        <h2 className="mb-2">How It Works</h2>
                        <p className="process-subtext">
                            Your journey from selection to coverage — a simple, transparent
                            process built around your needs.
                        </p>
                    </MotionSection>

                    <MotionList className="process-wrapper" stagger={0.15}>
                        <svg
                            className="journey-svg"
                            viewBox="0 0 1000 120"
                            preserveAspectRatio="none"
                        >
                            <path d="M125,60 C250,60 250,45 375,45 C500,45 500,75 625,75 C750,75 750,60 875,60" />
                        </svg>

                        <div className="process-step">
                            <div className="icon-circle">
                                <i className="fa-solid fa-file-lines"></i>
                            </div>
                            <h4>Policy Selection Made Easy</h4>
                            <p>
                                Compare various policies from many insurers, claims and terms of
                                policies to choose better options.
                            </p>
                        </div>

                        <div className="process-step">
                            <div className="icon-circle">
                                <i className="fa-solid fa-credit-card"></i>
                            </div>
                            <h4>Simple Premium Payment</h4>
                            <p>
                                Multiple payment options with easy premium payment facilities to
                                get a smooth and hassle-free process.
                            </p>
                        </div>

                        <div className="process-step">
                            <div className="icon-circle">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>
                            <h4>Get Insurance</h4>
                            <p>
                                After the successful payment of premiums, you'll be insured with
                                comprehensive coverage and regular support.
                            </p>
                        </div>

                        <div className="process-step">
                            <div className="icon-circle">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <h4>Effortless Claims Processing</h4>
                            <p>
                                A smooth and transparent claims management process with quick
                                claim support and settlement without any hassles.
                            </p>
                        </div>
                    </MotionList>
                </div>
            </section>


            {/* INSURANCE SOLUTIONS */}
            <section className="insurance-section">
                <div className="container">
                    <MotionSection>
                        <h2 className="mb-4">Insurance Solutions</h2>
                        <p className="insurance-subtext mb-5">
                            Comprehensive coverage tailored to your business needs
                        </p>
                    </MotionSection>

                    <MotionItem className="tabs mb-4" variant="fadeUp">
                        <button
                            className={`tab ${activeTab === "commercial" ? "active" : ""}`}
                            onClick={() => setActiveTab("commercial")}
                        >
                            Commercial Insurance
                        </button>
                        <button
                            className={`tab ${activeTab === "group" ? "active" : ""}`}
                            onClick={() => setActiveTab("group")}
                        >
                            Group Insurance
                        </button>
                        <button
                            className={`tab ${activeTab === "individual" ? "active" : ""}`}
                            onClick={() => setActiveTab("individual")}
                        >
                            Individual Insurance
                        </button>
                    </MotionItem>

                    {/* COMMERCIAL */}
                    <div
                        className={`tab-content ${activeTab === "commercial" ? "active" : ""}`}
                        id="commercial"
                    >
                        <MotionList className="grid grid-3-3">
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/liability-insurance.jpg`}
                                        alt="Liability Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Liability Insurance</h4>
                                <p>Protection against legal liabilities and claims.</p>
                                <Link to="/commercial-insurance/liability-insurance" aria-label="Learn more about Liability Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/commercial-property-insurance.png`}
                                        alt="Property Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Property Insurance</h4>
                                <p>Coverage for business assets and premises.</p>
                                <Link to="/commercial-insurance/property-insurance" aria-label="Learn more about Property Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/business-interruption-insurance.png`}
                                        alt="Business Interruption Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Business Interruption Insurance</h4>
                                <p>Covers income loss during disruptions.</p>
                                <Link to="/commercial-insurance/business-interruption-insurance" aria-label="Learn more about Business Interruption Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/fire-insurance.png`}
                                        alt="Fire Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Fire Insurance</h4>
                                <p>Protection against fire-related risks.</p>
                                <Link to="/commercial-insurance/fire-insurance" aria-label="Learn more about Fire Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/marine-insurance.png`}
                                        alt="Marine Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Marine Insurance</h4>
                                <p>Cargo and marine transit coverage.</p>
                                <Link to="/commercial-insurance/marine-insurance" aria-label="Learn more about Marine Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/workmen-compensation.png`}
                                        alt="Workmen's Compensation"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Workmen’s Compensation</h4>
                                <p>Statutory liability coverage for employees.</p>
                                <Link to="/commercial-insurance/workmens-compensation" aria-label="Learn more about Workmen’s Compensation">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/professional-indemnity.png`}
                                        alt="Professional Indemnity"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Professional Indemnity</h4>
                                <p>Protection against professional errors and omissions.</p>
                                <Link to="/commercial-insurance/professional-indemnity" aria-label="Learn more about Professional Indemnity">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/contractor.jpg`}
                                        alt="Contractor All Risk"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Contractor All Risk</h4>
                                <p>Comprehensive coverage for construction projects.</p>
                                <Link to="/commercial-insurance/contractor-all-risk" aria-label="Learn more about Contractor All Risk Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/cybe-insurance.jpg`}
                                        alt="Cyber Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Cyber Insurance</h4>
                                <p>Protection against digital threats and data breaches.</p>
                                <Link to="/commercial-insurance/cyber-insurance" aria-label="Learn more about Cyber Insurance">Learn More</Link>
                            </div>
                        </MotionList>
                    </div>

                    {/* GROUP */}
                    <div
                        className={`tab-content ${activeTab === "group" ? "active" : ""}`}
                        id="group"
                    >
                        <MotionList className="grid grid-2-3">
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/group-insurance-1.jpg`}
                                        alt="Group Health"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Health Insurance</h4>
                                <p>Employee group health coverage.</p>
                                <Link to="/group-insurance/group-health-insurance" aria-label="Learn more about Group Health Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/employee-families.png`}
                                        alt="Group Term"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Term Insurance</h4>
                                <p>Life cover for employees and their families.</p>
                                <Link to="/group-insurance/group-term-insurance" aria-label="Learn more about Group Term Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/group-insurance-2.png`}
                                        alt="Group Accident"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Personal Accident</h4>
                                <p>Accident coverage for teams.</p>
                                <Link to="/group-insurance/group-personal-accident" aria-label="Learn more about Group Personal Accident Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/group-insurance-3.jpg`}
                                        alt="Group Travel"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Travel Insurance</h4>
                                <p>Travel coverage for employees.</p>
                                <Link to="/group-insurance/group-travel-insurance" aria-label="Learn more about Group Travel Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/group-overseas-mediclaim-hero.png`}
                                        alt="Group Overseas Mediclaim"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Overseas Mediclaim</h4>
                                <p>Global medical and travel safety for international teams.</p>
                                <Link to="/group-insurance/group-overseas-mediclaim" aria-label="Learn more about Group Overseas Mediclaim">Learn More</Link>
                            </div>
                        </MotionList>
                    </div>

                    {/* INDIVIDUAL */}
                    <div
                        className={`tab-content ${activeTab === "individual" ? "active" : ""}`}
                        id="individual"
                    >
                        <MotionList className="grid grid-3-3">
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/term-insurance.jpg`}
                                        alt="Term Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Term Insurance</h4>
                                <p>
                                    Protect your business continuity with comprehensive term life
                                    coverage.
                                </p>
                                <Link to="/individual-insurance/term-insurance" aria-label="Learn more about Term Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/health-insurance.jpg`}
                                        alt="Health Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Health Insurance</h4>
                                <p>Employee wellness and health coverage.</p>
                                <Link to="/individual-insurance/health-insurance" aria-label="Learn more about Health Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/motor-insurance.jpg`}
                                        alt="Motor Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Motor Insurance</h4>
                                <p>Fleet and vehicle insurance solutions.</p>
                                <Link to="/individual-insurance/motor-insurance" aria-label="Learn more about Motor Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/travel-insurance.jpg`}
                                        alt="Travel Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Travel Insurance</h4>
                                <p>Corporate travel protection.</p>
                                <Link to="/individual-insurance/travel-insurance" aria-label="Learn more about Travel Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/accidental-insurance.jpg`}
                                        alt="Personal Accident"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Personal Accident</h4>
                                <p>Accident and safety coverage.</p>
                                <Link to="/individual-insurance/accidental-insurance" aria-label="Learn more about Personal Accident Insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/individual-home-insurance.jpg`}
                                        alt="Home Insurance"
                                        width="1200"
                                        height="800"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Home Insurance</h4>
                                <p>Asset and infrastructure protection.</p>
                                <Link to="/individual-insurance/home-insurance" aria-label="Learn more about Home Insurance">Learn More</Link>
                            </div>
                        </MotionList>
                    </div>
                </div>
            </section>

            {/* FEATURED INSIGHTS */}
            <section className="insights-section py-5">
                <div className="container insights-container">
                    <MotionSection className="text-center mb-5">
                        <h2 className="mb-2">Featured Insights</h2>
                        <p className="section-subtext">
                            Strategic insights to strengthen your risk and insurance
                            decisions.
                        </p>
                    </MotionSection>

                    <MotionList className="row g-4" stagger={0.1}>
                        {/* Card 1 */}
                        <div className="col-md-6 col-lg-3">
                            <div
                                className={`insight-card ${expandedInsights[1] ? "expanded" : ""}`}
                                onClick={() => toggleInsight(1)}
                            >
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/featured-1.png`}
                                        alt="Detailed insights into health insurance trends and coverage options"
                                        width="2048"
                                        height="1117"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="card-body">
                                    <span className="category-tag">Insurance Guide</span>
                                    <h5 className="card-title mt-3">
                                        Group Health vs Individual Mediclaim — What Employers Need
                                        to Know
                                    </h5>
                                    <p className="card-text">
                                        Understand key differences to choose the right coverage for
                                        your team.
                                    </p>
                                    <div className="more-content">
                                        <p>
                                            Balance premiums and benefits while ensuring comprehensive
                                            protection.
                                        </p>
                                    </div>
                                    <button
                                        className="read-more-btn"
                                        aria-label={expandedInsights[1] ? "Show less about Group Health vs Individual Mediclaim" : "Read more about Group Health vs Individual Mediclaim"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleInsight(1);
                                        }}
                                    >
                                        {expandedInsights[1]
                                            ? "Show Less \u2190"
                                            : "Read More \u2192"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-md-6 col-lg-3">
                            <div
                                className={`insight-card ${expandedInsights[2] ? "expanded" : ""}`}
                                onClick={() => toggleInsight(2)}
                            >
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/featured-2.png`}
                                        alt="Keyman Insurance"
                                        width="2048"
                                        height="1117"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="card-body">
                                    <span className="category-tag">Regulatory Update</span>
                                    <h5 className="card-title mt-3">
                                        IRDAI’s New Composite Licence Framework
                                    </h5>
                                    <p className="card-text">
                                        What it means for insurers and corporate risk strategies.
                                    </p>
                                    <div className="more-content">
                                        <p>
                                            Insights into how this changes the insurance landscape.
                                        </p>
                                    </div>
                                    <button
                                        className="read-more-btn"
                                        aria-label={expandedInsights[2] ? "Show less about IRDAI’s New Composite Licence Framework" : "Read more about IRDAI’s New Composite Licence Framework"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleInsight(2);
                                        }}
                                    >
                                        {expandedInsights[2]
                                            ? "Show Less \u2190"
                                            : "Read More \u2192"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-md-6 col-lg-3">
                            <div
                                className={`insight-card ${expandedInsights[3] ? "expanded" : ""}`}
                                onClick={() => toggleInsight(3)}
                            >
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/featured-3.jpg`}
                                        alt="Cyber Risk"
                                        width="7360"
                                        height="4912"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="card-body">
                                    <span className="category-tag">Cyber Risk</span>
                                    <h5 className="card-title mt-3">
                                        DPDP Act 2023 — Do You Need Cyber Liability Cover?
                                    </h5>
                                    <p className="card-text">
                                        Understand why cyber insurance is now essential for
                                        businesses.
                                    </p>
                                    <div className="more-content">
                                        <p>
                                            Fines and legal costs for breaches can be astronomical;
                                            insurance is your safety net.
                                        </p>
                                    </div>
                                    <button
                                        className="read-more-btn"
                                        aria-label={expandedInsights[3] ? "Show less about Risk Mitigation in the Tech Sector" : "Read more about Risk Mitigation in the Tech Sector"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleInsight(3);
                                        }}
                                    >
                                        {expandedInsights[3]
                                            ? "Show Less \u2190"
                                            : "Read More \u2192"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="col-md-6 col-lg-3">
                            <div
                                className={`insight-card ${expandedInsights[4] ? "expanded" : ""}`}
                                onClick={() => toggleInsight(4)}
                            >
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/featured-4.png`}
                                        alt="Keyman Insurance"
                                        width="2048"
                                        height="1117"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="card-body">
                                    <span className="category-tag">Market Updates</span>
                                    <h5 className="card-title mt-3">
                                        Quarterly review of marine insurance pricing trends
                                        affecting Indian exporters and importers.
                                    </h5>
                                    <p className="card-text">
                                        Quarterly review of marine insurance pricing trends
                                        affecting Indian exporters and importers.
                                    </p>
                                    <div className="more-content">
                                        <p>
                                            Stay updated on market dynamics to optimise your shipping
                                            insurance costs.
                                        </p>
                                    </div>
                                    <button
                                        className="read-more-btn"
                                        aria-label={expandedInsights[4] ? "Show less about Future of Corporate Insurance in India" : "Read more about Future of Corporate Insurance in India"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleInsight(4);
                                        }}
                                    >
                                        {expandedInsights[4]
                                            ? "Show Less \u2190"
                                            : "Read More \u2192"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </MotionList>
                </div>
            </section>

            {/* COUNTER SECTION */}
            <section className="counter-section">
                <div className="container">
                    <MotionList className="counter-grid" stagger={0.1}>
                        <div className="counter-item">
                            <div className="counter-number">
                                <StatCounter end={110} suffix="+" />
                            </div>
                            <div className="counter-label">Cities Covered</div>
                            <div className="counter-line"></div>
                        </div>
                        <div className="counter-item">
                            <div className="counter-number">
                                <StatCounter end={279} suffix="+" />
                            </div>
                            <div className="counter-label">Corporate Clients</div>
                            <div className="counter-line"></div>
                        </div>
                        <div className="counter-item">
                            <div className="counter-number">
                                <StatCounter end={371} suffix=" Cr" />
                            </div>
                            <div className="counter-label">Premium Under Management</div>
                            <div className="counter-line"></div>
                        </div>
                        <div className="counter-item">
                            <div className="counter-number">
                                <StatCounter end={42} suffix=" Lakhs" />
                            </div>
                            <div className="counter-label">Claims Settled</div>
                            <div className="counter-line"></div>
                        </div>
                    </MotionList>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testimonials-section py-5">
                <div className="container testimonials-container">
                    <MotionSection className="text-center mb-5">
                        <h2 className="mb-2">Trusted by Industry Leaders</h2>
                        <p className="section-subtext">
                            See what our clients say about working with PIB Insurance Brokers
                        </p>
                    </MotionSection>

                    <MotionList className="row g-4" stagger={0.1}>
                        <div className="col-lg-4">
                            <div className={`testimonial-card ${expandedTestimonials[1] ? "expanded" : ""}`}>
                                <div className="profile mb-3">
                                    <img
                                        src="https://placehold.co/150x150?text=NM"
                                        alt="Mr. Nilesh Manik"
                                        className="profile-img"
                                    />
                                    <div className="profile-info">
                                        <h6 className="mb-0">Mr. Nilesh Manik</h6>
                                        <small>Chartered Accountant</small>
                                    </div>
                                </div>
                                <i className="fa fa-quote-left quote-icon-main mb-3"></i>
                                <div className="testimonial-content">
                                    <p className="quote-text">
                                        "PIB Insurance has helped us with specialized solutions tailored to our practice. Their team understands the nuances of professional risk and has ensured we are well protected with the right coverage."
                                    </p>
                                </div>
                                <button
                                    className="read-more-btn testimonial-toggle"
                                    aria-label={expandedTestimonials[1] ? "Show less from Mr. Nilesh Manik" : "Read more from Mr. Nilesh Manik"}
                                    onClick={() => toggleTestimonial(1)}
                                >
                                    {expandedTestimonials[1] ? "Read Less" : "Read More"}
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className={`testimonial-card ${expandedTestimonials[2] ? "expanded" : ""}`}>
                                <div className="profile mb-3">
                                    <img
                                        src="https://placehold.co/150x150?text=UT"
                                        alt="Mr. Umesh Thakkar"
                                        className="profile-img"
                                    />
                                    <div className="profile-info">
                                        <h6 className="mb-0">Mr. Umesh Thakkar</h6>
                                        <small>Director, Nav Bharat Metallic Oxide Industries</small>
                                    </div>
                                </div>
                                <i className="fa fa-quote-left quote-icon-main mb-3"></i>
                                <div className="testimonial-content">
                                    <p className="quote-text">
                                        "We appreciate PIB Insurance's expertise in handling complex industrial and environmental risks. Their support across multiple coverage areas has been critical for our operations. Their proactive approach and strong technical expertise make them a highly reliable risk management partner."
                                    </p>
                                </div>
                                <button
                                    className="read-more-btn testimonial-toggle"
                                    aria-label={expandedTestimonials[2] ? "Show less from Mr. Umesh Thakkar" : "Read more from Mr. Umesh Thakkar"}
                                    onClick={() => toggleTestimonial(2)}
                                >
                                    {expandedTestimonials[2] ? "Read Less" : "Read More"}
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className={`testimonial-card ${expandedTestimonials[3] ? "expanded" : ""}`}>
                                <div className="profile mb-3">
                                    <img
                                        src="https://placehold.co/150x150?text=MM"
                                        alt="Mr. Mohan Makikum"
                                        className="profile-img"
                                    />
                                    <div className="profile-info">
                                        <h6 className="mb-0">Mr. Mohan Makikum</h6>
                                        <small>SVP, Welspun</small>
                                    </div>
                                </div>
                                <i className="fa fa-quote-left quote-icon-main mb-3"></i>
                                <div className="testimonial-content">
                                    <p className="quote-text">
                                        "PIB Insurance Brokers Private Limited has been providing insurance advisory and brokerage services to our organization for Group Medical, Group Personal Accident, and Group Term Life policies for several years. Over the years, they have consistently provided insurance services to me personally as well as to our organization. This association has been built on a long-standing professional relationship, continuity of service, and sustained engagement over time."
                                    </p>
                                </div>
                                <button
                                    className="read-more-btn testimonial-toggle"
                                    aria-label={expandedTestimonials[3] ? "Show less from Mr. Mohan Makikum" : "Read more from Mr. Mohan Makikum"}
                                    onClick={() => toggleTestimonial(3)}
                                >
                                    {expandedTestimonials[3] ? "Read Less" : "Read More"}
                                </button>
                            </div>
                        </div>
                    </MotionList>
                </div>
            </section>

            {/* PARTNERS */}
            <section className="partners-section py-5">
                <div className="container text-center">
                    <MotionSection>
                        <h2 className="mb-2">Our Trusted Partners</h2>
                        <p className="section-subtext mb-5">
                            Working with leading insurers to provide you the best coverage
                        </p>
                    </MotionSection>
                    <MotionItem className="partners-scroll-wrapper" variant="zoomIn">
                        <div className="partners-scroll-track">
                            {[
                                7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                                7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
                            ].map((num, idx) => (
                                <div key={idx} className="partner-logo">
                                    <img
                                        src={`${import.meta.env.BASE_URL}images/partners/${num}.png`}
                                        alt="Insurance Partner Logo"
                                        width="150"
                                        height="80"
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </MotionItem>
                </div>
            </section>
        </>
    );
};

export default Home;
