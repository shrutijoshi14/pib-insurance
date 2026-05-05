import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';

const About = () => {
    return (
        <>
            <SEO 
                title="About Us | PIB Insurance - Trusted IRDAI Broker" 
                description="PIB Insurance Brokers is your dedicated partner in risk management. Learn about our journey, expertise, and commitment to securing your future."
                canonical="https://pibinsurance.in/about"
            />
            <section className="insurance-hero hero-about">
                <div className="industries-hero-container">
                    <MotionSection className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>About PIB Insurance</h1>
                            <div className="hero-header-divider"></div>
                            <div className="hero-header-info">Our Journey & Expertise</div>
                        </div>
                        <p>We are more than just insurance brokers; we are your partners in risk management, dedicated to securing your future with integrity and expertise.</p>
                        <div className="breadcrumb-custom">HOME / ABOUT US</div>
                    </MotionSection>
                </div>
            </section>

            {/* ABOUT CONTENT */}
            <section className="about-section">
                <div className="about-container">
                    {/* LEFT IMAGE */}
                    <MotionItem className="about-image" variant="zoomIn">
                        <img src={`${import.meta.env.BASE_URL}assets/family-insurance.png`} alt="Happy Indian family protected by PIB Insurance" width="800" height="600" loading="lazy" />
                    </MotionItem>

                    {/* RIGHT TEXT */}
                    <MotionSection className="about-text" delay={0.2}>
                        <p>
                            Established in 2019 by <b>Mr. Virendra Pandey</b>, an accomplished management professional from the
                            <b>Indian Institute of Management (IIM) Indore</b>, PIB Insurance Broker has rapidly grown into a
                            trusted name in the Indian insurance broking industry.
                        </p>

                        <p>
                            Headquartered in <b>Mumbai</b>, the company has built a strong nationwide presence with
                            <b>13 regional offices strategically spread across 4 zones (North, East, West and South),</b>
                            delivering seamless services across <b>110+ cities in India.</b>
                        </p>

                        <p>
                            PIB Insurance has established partnerships with all leading insurance providers, enabling it to
                            design and deliver comprehensive insurance solutions tailored to the unique needs of individuals and
                            businesses. Over the years, it has successfully catered to a diverse client base of <b>90,000+
                                clients</b> covering multiple sectors and industries..
                        </p>

                        <p>
                            Driven by its commitmemt to <b>trust, transparency, and customer-centricity</b>, PIB Insurance
                            continues to strengthen its position as a reliable partner for businesses and individuals seeking
                            risk protection and financial security.
                        </p>
                    </MotionSection>
                </div>
            </section>

            {/* CEO MESSAGE */}
            <section className="ceo-section">
                <div className="ceo-container">
                    <MotionItem className="ceo-img" variant="zoomIn">
                        <img src={`${import.meta.env.BASE_URL}assets/CEO.jpeg`} alt="Mr. Virendra Pandey, CEO of PIB Insurance Brokers" width="400" height="500" loading="lazy" />
                    </MotionItem>

                    <MotionSection className="ceo-text" delay={0.2}>
                        <span className="tag">MESSAGE FROM CEO’S DESK</span>

                        <p>
                            At PIB Insurance Brokers, our vision is simple yet ambitious - to build India’s leading insurance
                            broking company anchored on three strong pillars : Curated Solutions, Expert Advice, and Reliable
                            Service.
                        </p>

                        <p>
                            Insurance in India is still under-penetrated, and millions remain underinsured. That’s why our
                            mission goes beyond just broking - it is about democratizing insurance, spreading awareness, and
                            making India truly insurance literate. Every day, we challenge the conventional path, explore new
                            ideas, and learn something new as we work alongside some of the brightest talent in the country.
                        </p>

                        <p>
                            With a presence in 110+ locations across India and a dedicated team of 100+ professionals, we are
                            proud to serve individuals and businesses with innovative risk management and insurance solutions
                            that not only protect but also empower them. Our partnerships with all leading national and private
                            insurers ensure that we bring the best coverage, at the most cost-effective terms, to help our
                            clients thrive in a dynamic business landscape.
                        </p>

                        <p>
                            For us, insurance is not just about policies - it’s about securing lives, securing businesses, and
                            most importantly, #SecuringHappiness.
                        </p>

                        <p>
                            Together, we are building more than a company - we are building trust, resilience, and a safer
                            future for India.
                        </p>
                    </MotionSection>
                </div>
            </section>

            {/* PROMISE SECTION */}
            <section className="promise-section">
                <div className="container">
                    <MotionSection className="promise-intro">
                        <p>PIB Insurance Brokers Pvt. Ltd. is an IRDAI-licensed direct broker (License No. 935) with offices in Mumbai
                        and New Delhi. We work for you — not for any insurer. That means we compare the market, recommend
                        what genuinely fits your needs, and stand with you through claims and renewals.</p>
                    </MotionSection>
                    <MotionList className="row g-4" stagger={0.15}>
                        <div className="col-md-4">
                            <div className="promise-card h-100">
                                <div className="promise-icon"><i className="fa fa-handshake"></i></div>
                                <h3>WE PROMISE</h3>
                                <p>To put your interests first. Always. We are independent brokers, which means we work for you — not the insurance companies. Our loyalty is to your protection and your peace of mind.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="promise-card h-100">
                                <div className="promise-icon"><i className="fa fa-magnifying-glass-chart"></i></div>
                                <h3>WE PROVIDE</h3>
                                <p>Unbiased, expert advice backed by deep market analysis. We don't just sell policies; we design risk management strategies that ensure you get the best coverage at the right price.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="promise-card h-100">
                                <div className="promise-icon"><i className="fa fa-shield-halved"></i></div>
                                <h3>WE PROTECT</h3>
                                <p>What matters most to you. From your family's health and future to your business assets and liabilities, we build the walls of financial security that keep your world safe.</p>
                            </div>
                        </div>
                    </MotionList>
                </div>
            </section>

            {/* MISSION VISION SECTION */}
            <section className="mv-section">
                <div className="mv-container">
                    <MotionItem className="mv-box mission" variant="fadeRight">
                        <i className="fa-solid fa-bullseye"></i>
                        <div className="mv-content">
                            <h3>MISSION</h3>
                            <p>
                                Our mission is to stand firmly on the side of our clients—delivering insurance solutions that are
                                optimized for cost, coverage, and long-term value. We are committed to guiding individuals and
                                businesses through every stage of their journey, from policy selection to claims support, ensuring
                                trust, transparency, and protection at every step.
                            </p>
                        </div>
                    </MotionItem>

                    <MotionItem className="mv-box vision" variant="fadeLeft">
                        <i className="fa-solid fa-lightbulb"></i>
                        <div className="mv-content">
                            <h3>VISION</h3>
                            <p>
                                Our vision is to be India’s most client-centric insurance broker, recognized for delivering
                                customized solutions, fair pricing, and unwavering post-sales support. We aspire to redefine
                                insurance broking by being not just a service provider, but a lifelong partner who safeguards our
                                clients’ interests & builds enduring confidence in their financial security.
                            </p>
                        </div>
                    </MotionItem>
                </div>
            </section>
        </>
    );
};

export default About;
