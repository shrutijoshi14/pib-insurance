import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';
import SuccessModal from '../components/SuccessModal';

const COUNTRY_CODES = [
    { code: '+91', label: 'India (+91)' },
    { code: '+1', label: 'USA/Canada (+1)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+971', label: 'UAE (+971)' },
    { code: '+65', label: 'Singapore (+65)' },
    { code: '+61', label: 'Australia (+61)' },
    { code: '+49', label: 'Germany (+49)' },
    { code: '+33', label: 'France (+33)' },
    { code: '+81', label: 'Japan (+81)' },
    { code: 'other', label: 'Other' }
];

const INDUSTRIES = [
    'Insurance', 'Banking & Finance', 'Information Technology', 'Manufacturing',
    'Healthcare & Pharmaceuticals', 'Education', 'Logistics & Supply Chain',
    'Real Estate & Construction', 'Retail & E-commerce', 'Hospitality & Tourism',
    'Energy & Utilities', 'Other'
];

const REVENUE_RANGES = [
    'Under 50 Lakhs', '50 Lakhs to 1 Crore', '1 Crore to 5 Crore', 'More than 5 Crore'
];

const HEADCOUNT_RANGES = [
    '1 - 50', '51 - 200', '201 - 500', '501 - 1000', '1001 - 5000', '5000 to 10000', 'More than 10000'
];

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', jobTitle: '', businessEmail: '',
        personalLocation: '', countryCode: '+91', phoneNumber: '',
        organizationName: '', industry: '', annualRevenue: '',
        employeeHeadcount: '', message: '', agreed: false
    });

    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched
        const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        setTouched(allTouched);

        const requiredFields = ['firstName', 'lastName', 'businessEmail', 'countryCode', 'phoneNumber', 'agreed'];
        const missing = requiredFields.filter(f => f === 'agreed' ? !formData.agreed : !formData[f]);

        if (missing.length > 0) {
            setStatus({ loading: false, success: false, error: 'Please fill all required fields and agree to the policies.' });
            return;
        }

        setStatus({ ...status, loading: true });

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjCYB-5C9apz2Zm1utyfllerzWtWUDUymAkU7Bd4TjCJPrqp9uZUYlADyWuyNWeFOx0w/exec";

        try {
            // Generate the ID here so it's the SAME one sent to the sheet and the Thank You page
            const refId = `PIB-${Math.floor(100000 + Math.random() * 900000)}`;

            // Prepare the data
            const payload = {
                ...formData,
                referenceId: refId
            };

            // Send to Google Sheets
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            setStatus({ loading: false, success: true, error: '' });

            // Go to Thank You page with the ID
            setTimeout(() => {
                navigate('/thank-you', { state: { referenceId: refId } });
            }, 2000);

        } catch (err) {
            setStatus({
                loading: false,
                success: false,
                error: 'Submission failed. Please try again.'
            });
        }
    };


    const getFieldStatus = (name, required = false) => {
        if (!touched[name]) return '';
        if (required && !formData[name]) return 'is-invalid';
        if (formData[name]) return 'is-valid';
        return '';
    };

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
                        <p>Whether you have a question about our services or need expert risk advice, our team is here to help you across our 30+ locations in India.</p>
                        <div className="breadcrumb-custom">HOME / CONTACT US</div>
                    </div>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="contact-content">
                <div className="container">
                    <div className="contact-header">
                        <h2>Feel free to get in touch with experts</h2>
                    </div>

                    <div className="contact-grid-new">
                        {/* MAIN LAYOUT: Sidebar + Form */}
                        <div className="contact-main-flex-wrapper">
                            {/* LEFT SIDE: Info Cards */}
                            <aside className="contact-sidebar">
                                <MotionList className="info-grid-vertical" stagger={0.1}>
                                    {/* HELP DESK */}
                                    <MotionItem className="info-card flex-card" variant="fadeRight">
                                        <i className="fa-solid fa-headset"></i>
                                        <div>
                                            <h4>Help Desk</h4>
                                            <p>+91 98204 19256<br />+91 98204 19276</p>
                                            <p>info@pibinsurance.in<br />sales@pibinsurance.in</p>
                                        </div>
                                    </MotionItem>

                                    {/* CORPORATE */}
                                    <MotionItem className="info-card flex-card" variant="fadeRight">
                                        <i className="fa-solid fa-building"></i>
                                        <div>
                                            <h4>Corporate</h4>
                                            <p>+91 9820006729<br />+91 9820006779</p>
                                            <p>corporate@pibinsurance.in</p>
                                        </div>
                                    </MotionItem>

                                    {/* ADDRESS CARD */}
                                    <MotionItem className="info-card flex-card" variant="fadeRight">
                                        <i className="fa-solid fa-location-dot"></i>
                                        <div>
                                            <h4>Address</h4>
                                            <p>B/3rd Floor, Chintamani Plaza, Chakala, Andheri Kurla Road, Andheri East, Mumbai — 400093</p>
                                        </div>
                                    </MotionItem>
                                </MotionList>
                            </aside>

                            {/* RIGHT SIDE: Form */}
                            <MotionSection className="contact-form-side-wrapper" delay={0.2} variant="fadeLeft">
                                <div className="contact-form-container">
                                    <h3 className="form-title">Business Inquiry</h3>
                                    <form onSubmit={handleSubmit} className="business-form">
                                        {status.error && <div className="form-error-alert">{status.error}</div>}

                                        {/* PERSONAL DETAILS SECTION */}
                                        <div className="form-section">
                                            <h4 className="section-title">Personal Details</h4>
                                            <div className="form-row">
                                                <div className={`form-group floating-group ${getFieldStatus('firstName', true)}`}>
                                                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                    <label>First Name *</label>
                                                    {touched.firstName && !formData.firstName && <span className="error-msg">Required</span>}
                                                </div>
                                                <div className={`form-group floating-group ${getFieldStatus('lastName', true)}`}>
                                                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                    <label>Last Name *</label>
                                                    {touched.lastName && !formData.lastName && <span className="error-msg">Required</span>}
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className={`form-group floating-group ${getFieldStatus('jobTitle')}`}>
                                                    <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                    <label>Job Title</label>
                                                </div>
                                                <div className={`form-group floating-group ${getFieldStatus('businessEmail', true)}`}>
                                                    <input required type="email" name="businessEmail" value={formData.businessEmail} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                    <label>Business Email *</label>
                                                    {touched.businessEmail && !formData.businessEmail && <span className="error-msg">Required</span>}
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className={`form-group floating-group ${getFieldStatus('countryCode', true)}`}>
                                                    <select required name="countryCode" value={formData.countryCode} onChange={handleInputChange} onBlur={handleBlur}>
                                                        {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                                                    </select>
                                                    <label className="static-label">Country Code *</label>
                                                </div>
                                                <div className={`form-group floating-group ${getFieldStatus('phoneNumber', true)}`}>
                                                    <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                    <label>Phone Number *</label>
                                                    {touched.phoneNumber && !formData.phoneNumber && <span className="error-msg">Required</span>}
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className={`form-group floating-group ${getFieldStatus('personalLocation')}`}>
                                                    <input type="text" name="personalLocation" value={formData.personalLocation} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                    <label>Location</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* BUSINESS DETAILS SECTION */}
                                        <div className="form-section">
                                            <h4 className="section-title">Business Details</h4>
                                            <div className={`form-group floating-group ${getFieldStatus('organizationName')}`}>
                                                <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                <label>Organization Name</label>
                                            </div>

                                            <div className="form-row">
                                                <div className={`form-group floating-group ${getFieldStatus('industry')}`}>
                                                    <select name="industry" value={formData.industry} onChange={handleInputChange} onBlur={handleBlur}>
                                                        <option value="" disabled hidden>Select Industry</option>
                                                        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                                                    </select>
                                                    <label className="static-label">Industry</label>
                                                </div>
                                                <div className={`form-group floating-group ${getFieldStatus('annualRevenue')}`}>
                                                    <select name="annualRevenue" value={formData.annualRevenue} onChange={handleInputChange} onBlur={handleBlur}>
                                                        <option value="" disabled hidden>Select Range</option>
                                                        {REVENUE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                                                    </select>
                                                    <label className="static-label">Annual Revenue</label>
                                                </div>
                                            </div>

                                            <div className={`form-group floating-group ${getFieldStatus('employeeHeadcount')}`}>
                                                <select name="employeeHeadcount" value={formData.employeeHeadcount} onChange={handleInputChange} onBlur={handleBlur}>
                                                    <option value="" disabled hidden>Select Headcount</option>
                                                    {HEADCOUNT_RANGES.map(h => <option key={h} value={h}>{h}</option>)}
                                                </select>
                                                <label className="static-label">Employee Headcount</label>
                                            </div>
                                        </div>

                                        {/* HELP SECTION */}
                                        <div className="form-section">
                                            <h4 className="section-title">How can we help you?</h4>
                                            <div className={`form-group floating-group ${getFieldStatus('message')}`}>
                                                <textarea name="message" value={formData.message} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " rows="4"></textarea>
                                                <label>Your Message / Requirements</label>
                                            </div>
                                        </div>
                                        
                                        <div className={`form-group checkbox-group mb-4 ${touched.agreed && !formData.agreed ? 'has-error' : ''}`}>
                                            <label className="checkbox-container">
                                                <input 
                                                    type="checkbox" 
                                                    name="agreed" 
                                                    checked={formData.agreed} 
                                                    onChange={handleInputChange} 
                                                />
                                                <span className="checkbox-text">
                                                    i confirm i have read and agree to the 
                                                    <a href="/privacy-policy" className="policy-link" onClick={(e) => e.stopPropagation()}> Privacy and Data Protection policies</a>.
                                                </span>
                                            </label>
                                            {touched.agreed && !formData.agreed && <span className="error-msg block">Please agree to the policies to continue</span>}
                                        </div>

                                        <button type="submit" disabled={status.loading} className="submit-btn">
                                            {status.loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Submit Inquiry'}
                                        </button>
                                    </form>
                                </div>
                            </MotionSection>
                        </div>

                        {/* BOTTOM: Presence Row */}
                        <MotionSection className="contact-presence-section">
                            <div className="contact-address">
                                <h3 className="section-main-title">Our Presence Across India</h3>

                                <MotionList className="offices-row" stagger={0.1} delay={0.2}>
                                    {/* WEST */}
                                    <MotionItem className="office west" variant="fadeUp">
                                        <h4>West</h4>
                                        <div className="zonal-contact-header">
                                            <p className="zonal-email"><i className="fa fa-envelope me-2"></i>west@pibinsurance.in</p>
                                            <p className="zonal-phone"><i className="fa fa-phone me-2"></i>+91 98204 19256</p>
                                        </div>
                                        <div className="city-grid">
                                            {[
                                                { name: 'Mumbai', email: 'mumbai@pibinsurance.in' },
                                                { name: 'Pune', email: 'pune@pibinsurance.in' },
                                                { name: 'Raipur', email: 'raipur@pibinsurance.in' },
                                                { name: 'Ahmedabad', email: 'ahmedabad@pibinsurance.in' },
                                                { name: 'Surat', email: 'surat@pibinsurance.in' },
                                                { name: 'Nagpur', email: 'nagpur@pibinsurance.in' },
                                                { name: 'Nashik', email: 'nashik@pibinsurance.in' },
                                                { name: 'Vadodara', email: 'vadodara@pibinsurance.in' },
                                                { name: 'Rajkot', email: 'rajkot@pibinsurance.in' }
                                            ].map(city => (
                                                <div key={city.name} className="city-email-tag">
                                                    <div className="city-tag-top">
                                                        <span className="city-label">{city.name}</span>
                                                    </div>
                                                    <span className="city-id"><i className="fa-solid fa-envelope me-1"></i>{city.email}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </MotionItem>

                                    {/* SOUTH */}
                                    <MotionItem className="office south" variant="fadeUp">
                                        <h4>South</h4>
                                        <div className="zonal-contact-header">
                                            <p className="zonal-email"><i className="fa fa-envelope me-2"></i>south@pibinsurance.in</p>
                                            <p className="zonal-phone"><i className="fa fa-phone me-2"></i>+91 98204 19276</p>
                                        </div>
                                        <div className="city-grid">
                                            {[
                                                { name: 'Chennai', email: 'chennai@pibinsurance.in' },
                                                { name: 'Bengaluru', email: 'bengaluru@pibinsurance.in' },
                                                { name: 'Hyderabad', email: 'hyderabad@pibinsurance.in' },
                                                { name: 'Visakhapatnam', email: 'visakhapatnam@pibinsurance.in' },
                                                { name: 'Kochi', email: 'kochi@pibinsurance.in' },
                                                { name: 'Coimbatore', email: 'coimbatore@pibinsurance.in' },
                                                { name: 'Madurai', email: 'madurai@pibinsurance.in' },
                                                { name: 'Vijaywada', email: 'vijaywada@pibinsurance.in' },
                                                { name: 'Mangaluru', email: 'mangaluru@pibinsurance.in' },
                                                { name: 'Mysore', email: 'mysore@pibinsurance.in' }
                                            ].map(city => (
                                                <div key={city.name} className="city-email-tag">
                                                    <div className="city-tag-top">
                                                        <span className="city-label">{city.name}</span>
                                                    </div>
                                                    <span className="city-id"><i className="fa-solid fa-envelope me-1"></i>{city.email}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </MotionItem>

                                    {/* NORTH */}
                                    <MotionItem className="office north" variant="fadeUp">
                                        <h4>North</h4>
                                        <div className="zonal-contact-header">
                                            <p className="zonal-email"><i className="fa fa-envelope me-2"></i>north@pibinsurance.in</p>
                                            <p className="zonal-phone"><i className="fa fa-phone me-2"></i>+91 98200 06729</p>
                                        </div>
                                        <div className="city-grid">
                                            {[
                                                { name: 'Delhi', email: 'delhi@pibinsurance.in' },
                                                { name: 'Jaipur', email: 'jaipur@pibinsurance.in' },
                                                { name: 'Chandigarh', email: 'chandigarh@pibinsurance.in' },
                                                { name: 'Lucknow', email: 'lucknow@pibinsurance.in' },
                                                { name: 'Bhopal', email: 'bhopal@pibinsurance.in' },
                                                { name: 'Ludhiana', email: 'ludhiana@pibinsurance.in' },
                                                { name: 'Agra', email: 'agra@pibinsurance.in' },
                                                { name: 'Kanpur', email: 'kanpur@pibinsurance.in' },
                                                { name: 'Amritsar', email: 'amritsar@pibinsurance.in' }
                                            ].map(city => (
                                                <div key={city.name} className="city-email-tag">
                                                    <div className="city-tag-top">
                                                        <span className="city-label">{city.name}</span>
                                                    </div>
                                                    <span className="city-id"><i className="fa-solid fa-envelope me-1"></i>{city.email}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </MotionItem>

                                    {/* EAST */}
                                    <MotionItem className="office east" variant="fadeUp">
                                        <h4>East</h4>
                                        <div className="zonal-contact-header">
                                            <p className="zonal-email"><i className="fa fa-envelope me-2"></i>east@pibinsurance.in</p>
                                            <p className="zonal-phone"><i className="fa fa-phone me-2"></i>+91 98200 06779</p>
                                        </div>
                                        <div className="city-grid">
                                            {[
                                                { name: 'Kolkata', email: 'kolkata@pibinsurance.in' },
                                                { name: 'Patna', email: 'patna@pibinsurance.in' },
                                                { name: 'Ranchi', email: 'ranchi@pibinsurance.in' },
                                                { name: 'Bhubaneswar', email: 'bhubaneswar@pibinsurance.in' },
                                                { name: 'Guwahati', email: 'guwahati@pibinsurance.in' },
                                                { name: 'Jamshedpur', email: 'jamshedpur@pibinsurance.in' }
                                            ].map(city => (
                                                <div key={city.name} className="city-email-tag">
                                                    <div className="city-tag-top">
                                                        <span className="city-label">{city.name}</span>
                                                    </div>
                                                    <span className="city-id"><i className="fa-solid fa-envelope me-1"></i>{city.email}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </MotionItem>
                                </MotionList>
                            </div>
                        </MotionSection>
                    </div>
                </div>
            </section>

            {/* GOOGLE MAP */}
            <section className="map-section">
                <iframe
                    src="https://www.google.com/maps?q=Chintamani%20Plaza%20Chakala%20Andheri%20East%20Mumbai&z=15&output=embed"
                    width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="PIB Insurance Corporate Office Location">
                </iframe>
            </section>

            <SuccessModal
                isOpen={status.success}
                countdown={3}
            />
        </>
    );
};

export default Contact;
