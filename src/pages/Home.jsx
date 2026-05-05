import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MotionSection,
    MotionItem,
    MotionList,
} from "../components/MotionWrappers";
import SEO from "../components/SEO";

const Home = () => {
    const [activeTab, setActiveTab] = useState("commercial");
    const [expandedInsights, setExpandedInsights] = useState({});

    const toggleInsight = (id) => {
        setExpandedInsights((prev) => ({
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
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
                    >
                        <h1>Managing risk for modern businesses</h1>
                        <p className="subtext">
                            Expert risk management and personalized insurance solutions
                            designed to perform when it matters most.
                        </p>
                        <p className="subtext">
                            Trusted by businesses across industries to navigate risk with
                            clarity.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/contact" className="btn primary">
                                GET QUOTE
                            </Link>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSeSFMEm_15EtbVGivGYxcOvet9ZNOu7h3EjzjPRgYgYnv58Cw/viewform?usp=header"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn secondary"
                            >
                                REQUEST A CALL BACK
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="why-section">
                <div className="why-container">
                    <MotionSection className="why-content">
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
                    <MotionSection className="why-image" delay={0.2}>
                        <img
                            src={`${import.meta.env.BASE_URL}assets/group-meeting.png`}
                            alt="PIB Insurance Experts discussing corporate strategy"
                            width="1536"
                            height="1024"
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
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Liability Insurance</h4>
                                <p>Protection against legal liabilities and claims.</p>
                                <Link to="/liability-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/property-insurance.jpg`}
                                        alt="Property Insurance"
                                        width="4500"
                                        height="3000"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Property Insurance</h4>
                                <p>Coverage for business assets and premises.</p>
                                <Link to="/property-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/business-interruption-insurance.png`}
                                        alt="Business Interruption Insurance"
                                        width="1024"
                                        height="434"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Business Interruption Insurance</h4>
                                <p>Covers income loss during disruptions.</p>
                                <Link to="/business-interruption-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/fire-insurance.png`}
                                        alt="Fire Insurance"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Fire Insurance</h4>
                                <p>Protection against fire-related risks.</p>
                                <Link to="/fire-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/marine-insurance.png`}
                                        alt="Marine Insurance"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Marine Insurance</h4>
                                <p>Cargo and marine transit coverage.</p>
                                <Link to="/marine-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/workmen-compensation.png`}
                                        alt="Workmen's Compensation"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Workmen’s Compensation</h4>
                                <p>Statutory liability coverage for employees.</p>
                                <Link to="/workmens-compensation">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/professional-indemnity.png`}
                                        alt="Professional Indemnity"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Professional Indemnity</h4>
                                <p>Protection against professional errors and omissions.</p>
                                <Link to="/professional-indemnity">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/contractor.jpg`}
                                        alt="Contractor All Risk"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Contractor All Risk</h4>
                                <p>Comprehensive coverage for construction projects.</p>
                                <Link to="/contractor-all-risk">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/cybe-insurance.jpg`}
                                        alt="Cyber Insurance"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Cyber Insurance</h4>
                                <p>Protection against digital threats and data breaches.</p>
                                <Link to="/cyber-insurance">Learn More</Link>
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
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Health Insurance</h4>
                                <p>Employee group health coverage.</p>
                                <Link to="/group-health-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/employee-families.png`}
                                        alt="Group Term"
                                        width="1024"
                                        height="434"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Term Insurance</h4>
                                <p>Life cover for employees and their families.</p>
                                <Link to="/group-term-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/group-insurance-2.png`}
                                        alt="Group Accident"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Personal Accident</h4>
                                <p>Accident coverage for teams.</p>
                                <Link to="/group-personal-accident">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/group-insurance-3.jpg`}
                                        alt="Group Travel"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Group Travel Insurance</h4>
                                <p>Travel coverage for employees.</p>
                                <Link to="/group-travel-insurance">Learn More</Link>
                            </div>
                        </MotionList>
                    </div>

                    {/* INDIVIDUAL */}
                    <div
                        className={`tab-content ${activeTab === "individual" ? "active" : ""}`}
                        id="individual"
                    >
                        <MotionList className="grid grid-2-3">
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/term-insurance.jpg`}
                                        alt="Term Insurance"
                                        width="6192"
                                        height="4128"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Term Insurance</h4>
                                <p>
                                    Protect your business continuity with comprehensive term life
                                    coverage.
                                </p>
                                <Link to="/term-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/health-insurance.jpg`}
                                        alt="Health Insurance"
                                        width="3840"
                                        height="2160"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Health Insurance</h4>
                                <p>Employee wellness and health coverage.</p>
                                <Link to="/health-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/motor-insurance.jpg`}
                                        alt="Motor Insurance"
                                        width="3840"
                                        height="5760"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Motor Insurance</h4>
                                <p>Fleet and vehicle insurance solutions.</p>
                                <Link to="/motor-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/travel-insurance.jpg`}
                                        alt="Travel Insurance"
                                        width="4160"
                                        height="6240"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Travel Insurance</h4>
                                <p>Corporate travel protection.</p>
                                <Link to="/travel-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/accidental-insurance.jpg`}
                                        alt="Personal Accident"
                                        width="2304"
                                        height="3456"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Personal Accident</h4>
                                <p>Accident and safety coverage.</p>
                                <Link to="/accidental-insurance">Learn More</Link>
                            </div>
                            <div className="card">
                                <div className="img-wrap">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/Home-Insurance.png`}
                                        alt="Home Insurance"
                                        width="4500"
                                        height="3000"
                                        loading="lazy"
                                    />
                                </div>
                                <h4>Home Insurance</h4>
                                <p>Asset and infrastructure protection.</p>
                                <Link to="/home-insurance">Learn More</Link>
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
                                        alt="Health Insurance"
                                        width="2048"
                                        height="1117"
                                        loading="lazy"
                                        decoding="async"
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
                            <div className="testimonial-card">
                                <div className="profile mb-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1659353220482-554773c2f7fa?w=150"
                                        alt="Rajesh Kumar"
                                        className="profile-img"
                                    />
                                    <div className="profile-info">
                                        <h6 className="mb-0">Rajesh Kumar</h6>
                                        <small>CFO, Tech Solutions Ltd</small>
                                    </div>
                                </div>
                                <p className="quote-text">
                                    "PIB Insurance has been instrumental in streamlining our risk
                                    management. Their expertise and responsiveness are unmatched
                                    in the industry."
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="testimonial-card">
                                <div className="profile mb-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
                                        alt="Priya Sharma"
                                        className="profile-img"
                                    />
                                    <div className="profile-info">
                                        <h6 className="mb-0">Priya Sharma</h6>
                                        <small>Director, Manufacturing Co</small>
                                    </div>
                                </div>
                                <p className="quote-text">
                                    "Working with PIB has given us peace of mind. Their
                                    comprehensive approach to insurance has protected our
                                    operations across multiple locations."
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="testimonial-card">
                                <div className="profile mb-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjM3MjY5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                        alt="Amit Desai"
                                        className="profile-img"
                                    />
                                    <div className="profile-info">
                                        <h6 className="mb-0">Amit Desai</h6>
                                        <small>Founder, Logistics Pro</small>
                                    </div>
                                </div>
                                <p className="quote-text">
                                    "The team at PIB understands our business-specific risks and
                                    their tailored solutions have significantly reduced our risk
                                    exposure."
                                </p>
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
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                            ].map((num, idx) => (
                                <div key={idx} className="partner-logo">
                                    <img
                                        src={`https://pibinsurance.in/assets/images/partners/${num}.png`}
                                        alt="Insurance Partner"
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                            e.target.src = `https://placehold.co/150x80?text=Partner+${num}`;
                                            e.target.onerror = null;
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
