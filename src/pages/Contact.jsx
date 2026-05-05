import SEO from '../components/SEO';

const Contact = () => {
    return (
        <>
            <SEO 
                title="Contact PIB Insurance | Get a Custom Quote Today" 
                description="Get in touch with PIB Insurance Brokers for expert risk advice. Reach out to our help desk or visit our corporate office."
                canonical="https://pibinsurance.in/contact"
            />
            <section className="insurance-hero hero-contact">
                <div className="industries-hero-container">
                    <div className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>Get in Touch</h1>
                            <div className="hero-header-divider"></div>
                            <div className="hero-header-info">Expert Risk Support</div>
                        </div>
                        <p>Whether you have a question about our services or need expert risk advice, our team is here to help you across our 20+ locations in India.</p>
                        <div className="breadcrumb-custom">HOME / CONTACT US</div>
                    </div>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="contact-content">
                <div className="container">
                    <div className="contact-header">
                        <h2>Feel free to get in touch with experts</h2>
                        <p className="location">Andheri East, Mumbai, Maharashtra 400053</p>
                    </div>

                    <div className="contact-grid-new">
                        {/* LEFT COLUMN: Info Cards & Button */}
                        <div className="contact-left">
                            <div className="info-grid-vertical">
                                {/* HELP DESK */}
                                <div className="info-card flex-card">
                                    <i className="fa-solid fa-headset"></i>
                                    <div>
                                        <h4>Help Desk</h4>
                                        <p>+91 9820419276 / +91 9820419256</p>
                                        <p>info@pibinsurance.in</p>
                                    </div>
                                </div>

                                {/* CORPORATE */}
                                <div className="info-card flex-card">
                                    <i className="fa-solid fa-building"></i>
                                    <div>
                                        <h4>Corporate</h4>
                                        <p>+91 9820006729 / +91 9820006779</p>
                                        <p>corporate@pibinsurance.in</p>
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div className="info-card flex-card">
                                    <i className="fa-solid fa-envelope"></i>
                                    <div>
                                        <h4>Email</h4>
                                        <p>info@pibinsurance.in</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-action mt-4">
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeSFMEm_15EtbVGivGYxcOvet9ZNOu7h3EjzjPRgYgYnv58Cw/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="form-btn w-100 text-center">
                                    Fill in the Form
                                </a>
                                <div id="successMessage" className="success-message">
                                    ✅ Your message has been submitted successfully!
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Offices */}
                        <div className="contact-right">
                            <div className="contact-address">
                                <h3>Our Offices</h3>

                                <div className="office">
                                    <h4>Mumbai (HO)</h4>
                                    <p>A/203 Chintamani Plaza, Chakala, Andheri Kurla Road, Near Western Express Highway Metro, Opp
                                        Gurunanak Petrol Pump, Above Union Bank Of India, Andheri East, Mumbai - 400093.</p>
                                </div>

                                <div className="office">
                                    <h4>Hyderabad</h4>
                                    <p>1-11-251, TECHNALS, RKP Mansion, 11, Beside Maxi Vision Eye Hospital, Begumpet, Hyderabad,
                                        Telangana - 500016.</p>
                                </div>

                                <div className="office">
                                    <h4>Bengaluru</h4>
                                    <p>No. 38, Kalyan Plaza, 2nd Floor, 9th Main, Jayanagar 4th block, Bengaluru - 560011.</p>
                                </div>

                                <div className="office">
                                    <h4>Chandigarh</h4>
                                    <p>Idea Coworking, SCO - 32-34, 4th Floor, OPP DC Office, SEC 17C, Chandigarh - 160017.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GOOGLE MAP */}
            <section className="map-section">
                <iframe
                    src="https://www.google.com/maps?q=Chintamani%20Plaza%20Chakala%20Andheri%20East%20Mumbai&z=15&output=embed"
                    width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                </iframe>
            </section>

            {/* CITY-WISE DIRECTORY */}
            <section className="contact-content" style={{ paddingTop: '20px', paddingBottom: '60px', background: '#f4f7fc' }}>
                <div className="container">
                    <div className="contact-header" style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <h2>PIB Insurance — Our Presence Across India</h2>
                        <p style={{ color: '#5a7a99', fontSize: '15px' }}>Reach your nearest PIB Insurance office or get in touch by email.</p>
                    </div>
                    <div className="location-grid">
                        {[
                            { city: 'Mumbai', email: 'mumbai@pibinsurance.in' },
                            { city: 'Pune', email: 'pune@pibinsurance.in' },
                            { city: 'Raipur', email: 'raipur@pibinsurance.in' },
                            { city: 'Ahmedabad', email: 'ahmedabad@pibinsurance.in' },
                            { city: 'Surat', email: 'surat@pibinsurance.in' },
                            { city: 'Chennai', email: 'chennai@pibinsurance.in' },
                            { city: 'Bengaluru', email: 'bengaluru@pibinsurance.in' },
                            { city: 'Hyderabad', email: 'hyderabad@pibinsurance.in' },
                            { city: 'Visakhapatnam', email: 'visakhapatnam@pibinsurance.in' },
                            { city: 'Cochin', email: 'cochin@pibinsurance.in' },
                            { city: 'Guwahati', email: 'guwahati@pibinsurance.in' },
                            { city: 'Kolkata', email: 'kolkata@pibinsurance.in' },
                            { city: 'Patna', email: 'patna@pibinsurance.in' },
                            { city: 'Ranchi', email: 'ranchi@pibinsurance.in' },
                            { city: 'Bhubaneswar', email: 'bhubaneswar@pibinsurance.in' },
                            { city: 'Lucknow', email: 'lucknow@pibinsurance.in' },
                            { city: 'Bhopal', email: 'bhopal@pibinsurance.in' },
                            { city: 'Delhi', email: 'delhi@pibinsurance.in' },
                            { city: 'Jaipur', email: 'jaipur@pibinsurance.in' },
                            { city: 'Chandigarh', email: 'chandigarh@pibinsurance.in' }
                        ].map((loc, idx) => (
                            <div key={idx} className="location-item">
                                <h4><i className="fa fa-location-dot" style={{ color: '#1a6fa8', marginRight: '8px' }}></i>{loc.city}</h4>
                                <p><a href={`mailto:${loc.email}`}>{loc.email}</a></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
