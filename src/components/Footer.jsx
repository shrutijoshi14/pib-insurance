import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-top">
                    <h2 data-aos="fade-up" data-aos-delay="200">TO GET INSURED CONTACT OUR EXPERTS NOW</h2>
                    <div className="footer-contact">
                        <span><i className="fa fa-phone"></i> +91 98204 19256 / +91 98204 19276</span>
                        <span><i className="fa fa-envelope"></i> info@pibinsurance.in / sales@pibinsurance.in</span>
                    </div>
                </div>
                <div className="footer-main">
                    <div data-aos="fade-up" data-aos-delay="200" className="footer-col">
                        <div className="footer-logo mb-4">
                            <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="PIB Insurance Brokers" width="167" height="50" style={{ filter: 'brightness(0) invert(1)' }} />
                        </div>
                        <p className="office-title">CORPORATE OFFICE :</p>
                        <p>B/3rd Floor, Chintamani Plaza, Chakala, Andheri Kurla Road, Andheri East, Mumbai — 400093</p>
                        <div className="social-icons">
                            <a href="https://www.linkedin.com/company/pib-insurance-brokers-private-limited/" target="_blank" rel="noopener noreferrer" aria-label="PIB Insurance on LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://www.instagram.com/pib_insurancebrokers?igsh=YXkydzhnaTQ3OTNi" target="_blank" rel="noopener noreferrer" aria-label="PIB Insurance on Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://wa.me/919820006729" target="_blank" rel="noopener noreferrer" aria-label="Contact PIB Insurance on WhatsApp">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="300" className="footer-col center-box">
                        <h3 data-aos="fade-up" data-aos-delay="200">CERTIFICATES</h3>
                        <div className="certificate-box">
                            <p data-aos="fade-up" data-aos-delay="200"><strong>IRDAI License No. – 935,</strong></p>
                            <hr />
                            <p data-aos="fade-up" data-aos-delay="200">Registration code for the Insurance Broker – IRDAI / DBI047 / 2023,</p>
                            <hr />
                            <p data-aos="fade-up" data-aos-delay="200">Validity – 19/01/2024 to 18/01/2027.</p>
                            <hr />
                            <p data-aos="fade-up" data-aos-delay="200">Corporate Identity Number – U67200MH2022PTC394803</p>
                            <hr />
                            <p data-aos="fade-up" data-aos-delay="200"><strong>GST no - 27AANCP4176A1ZD</strong></p>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="400" className="footer-col">
                        <h3 data-aos="fade-up" data-aos-delay="200">FOR GRIEVANCES</h3>
                        <p data-aos="fade-up" data-aos-delay="200">
                            <strong>Mr. Upendra Pandey – Grievance Officer</strong><br />
                            BAF LLB LLM<br />
                            SRM University
                        </p>
                        <hr />
                        <p data-aos="fade-up" data-aos-delay="200">IRDAI Complaint Handling and Grievance Redressal Process</p>
                        <hr />
                        <p data-aos="fade-up" data-aos-delay="200">IFSCA Complaint Handling and Grievance Redressal Process</p>
                        <hr />
                        <p data-aos="fade-up" data-aos-delay="200">gro@pibinsurance.in</p>
                    </div>
                </div>

                <div className="footer-locations">
                    <h4>OUR PRESENCE ACROSS INDIA</h4>
                    <p data-aos="fade-up" data-aos-delay="200">
                        <span>Mumbai</span> · <span>Pune</span> · <span>Raipur</span> · <span>Ahmedabad</span> · <span>Surat</span> · <span>Nagpur</span> · <span>Nashik</span> · <span>Vadodara</span> · <span>Rajkot</span> ·
                        <span>Chennai</span> · <span>Bengaluru</span> · <span>Hyderabad</span> · <span>Visakhapatnam</span> · <span>Kochi</span> · <span>Coimbatore</span> · <span>Madurai</span> · <span>Vijaywada</span> · <span>Mangaluru</span> · <span>Mysore</span> ·
                        <span>Delhi</span> · <span>Jaipur</span> · <span>Chandigarh</span> · <span>Lucknow</span> · <span>Bhopal</span> · <span>Ludhiana</span> · <span>Agra</span> · <span>Kanpur</span> · <span>Amritsar</span> ·
                        <span>Kolkata</span> · <span>Patna</span> · <span>Ranchi</span> · <span>Bhubaneswar</span> · <span>Guwahati</span> · <span>Jamshedpur</span> ·<span>Indore</span>
                    </p>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 PIB Insurance Brokers Pvt. Ltd. All Right Reserved.</p>
                </div>
            </footer>

            {/* MOBILE BOTTOM STICKY BAR */}
            <div className="mobile-contact-bar">
                <a href="mailto:info@pibinsurance.in" className="item" aria-label="Send an email to PIB Insurance">
                    <i className="fa fa-envelope"></i>
                    <span>Email Us</span>
                </a>
                <a href="tel:+919820419276" className="item" aria-label="Call PIB Insurance experts">
                    <i className="fa fa-phone"></i>
                    <span>Call Now</span>
                </a>
            </div>
        </>
    );
};

export default Footer;
