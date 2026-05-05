import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-top">
                    <h2 data-aos="fade-up" data-aos-delay="200">TO GET INSURED CONTACT OUR EXPERTS NOW</h2>
                    <div className="footer-contact">
                        <span><i className="fa fa-phone"></i> +91 98204 19276 / +91 98204 19256</span>
                        <span><i className="fa fa-envelope"></i> info@pibinsurance.in</span>
                    </div>
                </div>
                <div className="footer-main">
                    <div data-aos="fade-up" data-aos-delay="200" data-aos="fade-up" data-aos-delay="200" className="footer-col">
                        <p data-aos="fade-up" data-aos-delay="200" className="office-title" data-aos="fade-up" data-aos-delay="200">REGISTERED OFFICE :</p>
                        <p data-aos="fade-up" data-aos-delay="200">A/203, Chintamani Plaza, Chakala, Andheri Kurla Road, Andheri East, Mumbai — 400093</p>
                        <hr />
                        <p data-aos="fade-up" data-aos-delay="300" className="office-title" data-aos="fade-up" data-aos-delay="200">CORPORATE OFFICE :</p>
                        <p data-aos="fade-up" data-aos-delay="200">7th Floor, Mangalya Complex, Sangeet Plaza, Marol, Andheri East, Mumbai — 400059</p>
                        <hr />
                        <h3 className="mt" data-aos="fade-up" data-aos-delay="200">REGIONAL DELHI OFFICE</h3>
                        <p data-aos="fade-up" data-aos-delay="200">Statesman's House, 8th Floor, Barakhamba Road, New Delhi — 110001</p>
                        <div className="social-icons">
                            <a href="https://www.linkedin.com/company/pib-insurance-brokers/" target="_blank" rel="noopener noreferrer" aria-label="PIB Insurance on LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://wa.me/919820419276" target="_blank" rel="noopener noreferrer" aria-label="Contact PIB Insurance on WhatsApp">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="300" data-aos="fade-up" data-aos-delay="300" className="footer-col center-box">
                        <h3 data-aos="fade-up" data-aos-delay="200">CERTIFICATES</h3>
                        <div className="certificate-box">
                            <p data-aos="fade-up" data-aos-delay="200"><strong>IRDAI License No. – 935,</strong></p>
                            <hr />
                            <p data-aos="fade-up" data-aos-delay="200">Registration code for the Insurance Broker – IRDAI / DBI047 / 2023,</p>
                            <hr />
                            <p data-aos="fade-up" data-aos-delay="200">Validity – 19/01/2024 to 18/01/2027.</p>
                            <hr />
                            <p data-aos="fade-up" data-aos-delay="200">Corporate Identity Number – U67200MH2022PTC394803</p>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="400" data-aos="fade-up" data-aos-delay="400" className="footer-col">
                        <h3 data-aos="fade-up" data-aos-delay="200">FOR GRIEVANCES</h3>
                        <p data-aos="fade-up" data-aos-delay="200"><strong>Mr. Upendra Pandey – Grievance Officer</strong></p>
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
                        <span>Mumbai</span> · <span>Pune</span> · <span>Raipur</span> · <span>Ahmedabad</span> · <span>Surat</span> ·
                        <span>Chennai</span> · <span>Bengaluru</span> · <span>Hyderabad</span> · <span>Visakhapatnam</span> ·
                        <span>Cochin</span> · <span>Guwahati</span> · <span>Kolkata</span> · <span>Patna</span> · <span>Ranchi</span> ·
                        <span>Bhubaneswar</span> · <span>Lucknow</span> · <span>Bhopal</span> · <span>Delhi</span> ·
                        <span>Jaipur</span> · <span>Chandigarh</span>
                    </p>
                </div>

                <div className="footer-bottom">
                    © 2026 PIB Insurance Brokers Pvt. Ltd. All Right Reserved. | Designed by OCS
                </div>
            </footer>

            {/* MOBILE BOTTOM STICKY BAR */}
            <div className="mobile-contact-bar">
                <a href="mailto:info@pibinsurance.in" className="item">
                    <i className="fa fa-envelope"></i>
                    <span>Email Us</span>
                </a>
                <a href="tel:+919820419276" className="item">
                    <i className="fa fa-phone"></i>
                    <span>Call Now</span>
                </a>
            </div>
        </>
    );
};

export default Footer;
