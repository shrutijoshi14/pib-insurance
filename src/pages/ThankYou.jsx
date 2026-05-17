import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';
import '../styles/thank-you.css';

const ThankYou = () => {
    const location = useLocation();
    // Get the ID from the redirect state, or generate a fallback if someone visits the page directly
    const referenceId = location.state?.referenceId || `PIB-${Math.floor(100000 + Math.random() * 900000)}`;

    useEffect(() => {
        // Track conversion event (GA4 / GTM)
        console.log('Conversion Tracked: Lead Form Submitted - Ref:', referenceId);
        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/LABEL',
                'value': 1.0,
                'currency': 'INR',
                'transaction_id': referenceId
            });
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO 
                title="Thank You | PIB Insurance Brokers" 
                description="Thank you for your inquiry. Our insurance experts have received your details and will contact you shortly."
                canonical="https://pibinsurance.in/thank-you"
            />
            
            <div className="thank-you-page">
                <div className="container">
                    <MotionSection className="thank-you-card">
                        <MotionItem className="success-badge" variant="scale">
                            <i className="fa-solid fa-circle-check"></i>
                        </MotionItem>
                        
                        <MotionItem variant="fadeUp" delay={0.1}>
                            <h1>Thank You for Choosing PIB</h1>
                            <p className="subtitle">Your inquiry has been successfully received by our risk experts.</p>
                        </MotionItem>
                        
                        <MotionItem className="reference-box" variant="fadeUp" delay={0.2}>
                            <span>Reference ID:</span>
                            <span className="ref-id">{referenceId}</span>
                        </MotionItem>

                        <MotionList className="info-grid" stagger={0.1} delay={0.3}>
                            <MotionItem className="info-item">
                                <i className="fa-solid fa-clock-rotate-left"></i>
                                <h4>Response Time</h4>
                                <p>Our team usually responds within 2-4 business hours.</p>
                            </MotionItem>
                            <MotionItem className="info-item">
                                <i className="fa-solid fa-shield-halved"></i>
                                <h4>Data Secure</h4>
                                <p>Your information is encrypted and handled with care.</p>
                            </MotionItem>
                        </MotionList>

                        <MotionItem className="cta-group" variant="fadeUp" delay={0.5}>
                            <Link to="/" className="btn-primary">Return to Home</Link>
                            <Link to="/claims" className="btn-secondary">Check Claim Status</Link>
                        </MotionItem>

                        <MotionItem className="trust-footer" variant="fadeUp" delay={0.6}>
                            <p>Trusted by 500+ Corporate Clients across India</p>
                            <div className="trust-icons">
                                <i className="fa-solid fa-award"></i>
                                <i className="fa-solid fa-certificate"></i>
                                <i className="fa-solid fa-user-shield"></i>
                            </div>
                        </MotionItem>
                    </MotionSection>

                    <div className="conversion-help" style={{ display: 'none' }}>
                        {/* 
                            GTM / GA4 Implementation Note:
                            The route change to /thank-you should be tracked as a page_view event.
                            In GA4, mark this URL as a conversion event.
                        */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThankYou;
