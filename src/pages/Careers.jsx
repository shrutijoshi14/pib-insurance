import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';
import SuccessModal from '../components/SuccessModal';
import '../styles/careers.css';

const corporateSalesJD = {
    title: 'Manager (Corporate Sales)',
    subtitle: 'Management Trainee – Corporate Insurance (Future Manager)',
    dept: 'Corporate Insurance / Business Insurance / Risk Advisory',
    location: 'Mumbai / PAN India',
    overview: 'We are looking for an experienced Corporate & Commercial Insurance Professional to manage and grow business across multiple lines of non-life insurance, including project, property, marine, liability, employee benefits, and specialty risks.',
    responsibilities: [
        'Develop and manage corporate, SME, and large enterprise insurance portfolios',
        'Understand client businesses and provide tailored risk solutions',
        'Handle commercial insurance, corporate insurance, business insurance, and project insurance',
        'Advise clients on property, fire, marine, liability, and specialty insurance',
        'Work closely with CXOs, finance teams, and risk managers'
    ],
    insuranceLines: {
        core: ['Commercial & Corporate Insurance', 'Business & Project Insurance', 'Property Insurance', 'Fire & Engineering Insurance', 'Marine Insurance (Cargo & Hull)', 'Liability Insurance (Public, Product, Professional, D&O)', 'Employee Insurance (Group Health, GPA, GTL)', 'Non-Employee Benefit Insurance', 'Workers’ Compensation'],
        specialty: ['Cyber Risk', 'Political Risk & Trade Credit', 'Terrorism Risk', 'Environmental Risk', 'Product Liability & Recall', 'Kidnap & Ransom', 'Fine Art, Jewellery & Specie', 'Flood & Parametric Insurance', 'Captive Insurance & Alternative Risk Transfer', 'Structured Credit & Surety', 'MGA & Program-based Solutions']
    },
    consulting: ['Deliver risk consulting and risk analytics solutions', 'Support business interruption and supply chain risk assessments', 'Assist in property risk management and valuations', 'Collaborate with forensic accounting and claims services', 'Provide multinational and international placement services', 'Support M&A, private equity, and transactional risk insurance'],
    claims: ['End-to-end claims management and negotiation', 'Coordinate with insurers, surveyors, and legal teams', 'Ensure fair, timely, and optimized claim settlements', 'Provide workplace rehabilitation and compensation support'],
    industries: 'Agribusiness, Automotive, Aviation & Space, Cargo & Logistics, Chemical, Construction & Infrastructure, Energy & Power, Financial Institutions, Food & Beverage, Healthcare & Life Sciences, Hospitality, Manufacturing, Marine, Media & Entertainment, Mining, Professional Services, Real Estate, Retail & Wholesale, Technology, Transportation & Utilities, Public Sector.',
    skills: ['Strong understanding of commercial and corporate insurance products', 'Ability to structure complex risk solutions', 'Client relationship and negotiation skills', 'Knowledge of IRDAI regulations and compliance', 'Analytical mindset with exposure to risk modeling and data-driven insights', 'Excellent communication and presentation skills'],
    eligibility: ['Graduate / MBA (Insurance, Risk Management, Finance preferred)', '0–10+ years of experience in insurance broking, corporate insurance, general insurance companies, or risk advisory/consulting', 'Experience in handling large corporate accounts preferred']
};

const Careers = () => {
    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: 'Manager (Corporate Sales)',
        experience: '',
        resume: null,
        agreed: false
    });

    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const handleInputChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        if (name === 'resume') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        setTouched(allTouched);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.name || !emailRegex.test(formData.email) || !phoneRegex.test(formData.phone) || !formData.resume || !formData.agreed) {
            setStatus({ loading: false, success: false, error: 'Please correct the errors and upload your resume before submitting.' });
            return;
        }

        setStatus({ loading: true, success: false, error: '' });

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjIClxJV00IVYDjfmkQ0s4G20nwdvPk8-bmEbRq-Y4SnBctL2IZs1jfRsC5Lwb2R4R/exec";

        try {
            const refId = `PIB-CAREER-${Math.floor(100000 + Math.random() * 900000)}`;
            let resumeBase64 = '';

            if (formData.resume) {
                resumeBase64 = await getBase64(formData.resume);
            }

            const payload = {
                type: 'career',
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                experience: formData.experience,
                resume: resumeBase64,
                referenceId: refId
            };

            // Use 'text/plain' to avoid CORS preflight issues with Google Apps Script
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            });

            // If we reached here, the browser sent the request
            setStatus({ loading: false, success: true, error: '' });

            setTimeout(() => {
                navigate('/thank-you', { state: { referenceId: refId } });
            }, 3000);

        } catch (err) {
            console.error("Submission error:", err);
            setStatus({ loading: false, success: false, error: 'Submission failed. Please check your internet and try again.' });
        }
    };


    const getFieldStatus = (name, required = false) => {
        if (!touched[name]) return '';

        const value = formData[name];

        // Specific validations
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? 'is-valid' : 'is-invalid';
        }

        if (name === 'phone') {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(value) ? 'is-valid' : 'is-invalid';
        }

        if (required && !value) return 'is-invalid';
        if (value) return 'is-valid';

        return '';
    };

    const toggleJobModal = (jobId) => {
        setSelectedJob(jobId);
        if (jobId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                toggleJobModal(null);
            }
        };
        if (selectedJob) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedJob]);

    const openApplyForm = (title) => {
        setFormData(prev => ({ ...prev, position: title }));
        toggleJobModal(null);
        setTimeout(() => {
            document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    return (
        <>
            <SEO
                title="Careers | Join Our Team | PIB Insurance Brokers"
                description="Build your career with India's leading insurance broker. Explore job opportunities and join a team dedicated to securing happiness."
                canonical="https://pibinsurance.in/careers"
            />

            {/* HERO SECTION */}
            <section className="insurance-hero hero-careers">
                <div className="industries-hero-container">
                    <MotionSection className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>Join Our Team</h1>
                        </div>
                        <div className="breadcrumb-custom">HOME / CAREERS</div>
                    </MotionSection>
                </div>
            </section>

            {/* WHY JOIN US */}
            <section className="careers-intro">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <MotionItem className="col-lg-6" variant="fadeRight">
                            <div className="careers-content">
                                <span className="tag">WHY PIB INSURANCE?</span>
                                <h2>A Place Where You Can <span>Thrive</span></h2>
                                <p>At PIB Insurance Brokers, we believe our people are our greatest asset. We foster a culture of continuous learning, innovation, and mutual respect.</p>
                                <ul className="benefit-list">
                                    <li><i className="fa-solid fa-check-circle"></i> Professional Growth & Mentorship</li>
                                    <li><i className="fa-solid fa-check-circle"></i> Dynamic & Collaborative Environment</li>
                                    <li><i className="fa-solid fa-check-circle"></i> Impactful Work that Secures Lives</li>
                                    <li><i className="fa-solid fa-check-circle"></i> Competitive Compensation & Benefits</li>
                                </ul>
                            </div>
                        </MotionItem>
                        <MotionItem className="col-lg-6" variant="zoomIn">
                            <div className="careers-image-wrapper">
                                <img src={`${import.meta.env.BASE_URL}assets/careers-team.png`} alt="PIB Insurance professional team collaborating in a modern office" className="img-fluid rounded-4 shadow-lg" loading="lazy" decoding="async" />
                                <div className="stat-badge">
                                    <span className="number">100+</span>
                                    <span className="label">Professionals</span>
                                </div>
                            </div>
                        </MotionItem>
                    </div>
                </div>
            </section>

            {/* OPEN POSITIONS */}
            <section className="open-positions">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <span className="tag">OPPORTUNITIES</span>
                        <h2>Current Openings</h2>
                        <p>Explore our current openings and build your future with us</p>
                    </div>

                    <MotionList className="positions-grid" stagger={0.1}>
                        <MotionItem className="position-card" variant="fadeUp">
                            <div className="job-info">
                                <span className="dept">Corporate Sales</span>
                                <h3>Manager (Corporate Sales)</h3>
                                <span className="loc"><i className="fa-solid fa-location-dot"></i> Mumbai / PAN India</span>
                            </div>
                            <div className="card-actions d-flex gap-2 w-100 mt-auto">
                                <button className="apply-btn-outline flex-grow-1" onClick={() => toggleJobModal('corporate-sales')}>View Details</button>
                                <button className="btn-pib flex-grow-1 py-2 text-sm" onClick={() => openApplyForm('Manager (Corporate Sales)')}>Apply Now</button>
                            </div>
                        </MotionItem>

                        <MotionItem className="position-card" variant="fadeUp">
                            <div className="job-info">
                                <span className="dept">Technical</span>
                                <h3>Underwriting Specialist</h3>
                                <span className="loc"><i className="fa-solid fa-location-dot"></i> Mumbai</span>
                            </div>
                            <div className="card-actions d-flex gap-2 w-100 mt-auto">
                                <button className="apply-btn-outline flex-grow-1" style={{ opacity: 0.5, cursor: 'not-allowed' }}>Details Coming Soon</button>
                                <button className="btn-pib flex-grow-1 py-2 text-sm" onClick={() => openApplyForm('Underwriting Specialist')}>Apply Now</button>
                            </div>
                        </MotionItem>
                    </MotionList>
                </div>
            </section>

            {/* JOB DETAILS MODAL */}
            <AnimatePresence>
                {selectedJob === 'corporate-sales' && (
                    <motion.div
                        className="job-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => toggleJobModal(null)}
                    >
                        <motion.div
                            className="job-modal-container"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="job-modal-close" onClick={() => toggleJobModal(null)} aria-label="Close modal">
                                <i className="fa-solid fa-times"></i>
                            </button>

                            <div className="job-modal-header">
                                <span className="job-dept-tag">{corporateSalesJD.dept}</span>
                                <div className="job-title-row">
                                    <h2 className="job-title">{corporateSalesJD.title}</h2>
                                    <div className="job-meta">
                                        <span><i className="fa-solid fa-location-dot"></i> {corporateSalesJD.location}</span>
                                    </div>
                                </div>
                                <p className="job-subtitle">{corporateSalesJD.subtitle}</p>
                            </div>

                            <div className="job-modal-body">
                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-briefcase"></i> Role Overview</h4>
                                    <p>{corporateSalesJD.overview}</p>
                                </section>

                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-list-check"></i> Key Responsibilities</h4>
                                    <ul>
                                        {corporateSalesJD.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </section>

                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-shield-halved"></i> Insurance Lines</h4>
                                    <div className="jd-sub-section">
                                        <h5>Core Lines</h5>
                                        <div className="jd-tag-cloud">
                                            {corporateSalesJD.insuranceLines.core.map((t, i) => <span key={i} className="jd-bubble">{t}</span>)}
                                        </div>
                                    </div>
                                    <div className="jd-sub-section mt-3">
                                        <h5>Specialty Solutions</h5>
                                        <div className="jd-tag-cloud">
                                            {corporateSalesJD.insuranceLines.specialty.map((t, i) => <span key={i} className="jd-bubble">{t}</span>)}
                                        </div>
                                    </div>
                                </section>

                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-magnifying-glass-chart"></i> Consulting & Analytics</h4>
                                    <ul>
                                        {corporateSalesJD.consulting.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </section>

                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-handshake-angle"></i> Claims Advocacy</h4>
                                    <ul>
                                        {corporateSalesJD.claims.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </section>

                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-city"></i> Industry Coverage</h4>
                                    <p className="jd-industry-box">{corporateSalesJD.industries}</p>
                                </section>

                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-gear"></i> Skills & Competencies</h4>
                                    <ul>
                                        {corporateSalesJD.skills.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </section>

                                <section className="jd-section">
                                    <h4><i className="fa-solid fa-user-graduate"></i> Eligibility</h4>
                                    <ul>
                                        {corporateSalesJD.eligibility.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </section>
                            </div>

                            <div className="job-modal-footer">
                                <button className="btn-pib w-100 py-3" onClick={() => openApplyForm('Manager (Corporate Sales)')}>Apply For This Position</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* APPLICATION FORM */}
            <section id="apply-form" className="application-section">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <span className="tag">CAREERS</span>
                        <h2>Submit Your Application</h2>
                        <p>Fill in your details and upload your CV to start your journey with us.</p>
                    </div>

                    <div className="apply-container">
                        <div className="row g-0">
                            <div className="col-lg-5 apply-info-side">
                                <h3>Join India's Fastest Growing Broker</h3>
                                <p>We're looking for passionate individuals who want to redefine the insurance industry through technology and expert advisory.</p>
                                <div className="apply-contact">
                                    <div className="item">
                                        <i className="fa-solid fa-envelope"></i>
                                        <span>hr@pibinsurance.in</span>
                                    </div>
                                    <div className="item">
                                        <i className="fa-solid fa-phone"></i>
                                        <span>+91 98204 19256</span>
                                    </div>
                                    <div className="item">
                                        <i className="fa-solid fa-location-dot"></i>
                                        <span>Corporate Office, Mumbai</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 apply-form-side">
                                <form onSubmit={handleSubmit} className="job-application-form">
                                    {status.error && <div className="form-error-alert mb-4">{status.error}</div>}

                                    <div className="job-form-section">
                                        <h4 className="job-section-title">Candidate Details</h4>
                                        <div className="job-form-row">
                                            <div className={`job-form-group job-floating-group ${getFieldStatus('name', true)}`}>
                                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " required />
                                                <label>Full Name *</label>
                                                {touched.name && !formData.name && <span className="job-error-msg">Required</span>}
                                            </div>
                                            <div className={`job-form-group job-floating-group ${getFieldStatus('email', true)}`}>
                                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " required />
                                                <label>Email Address *</label>
                                                {touched.email && !formData.email && <span className="job-error-msg">Required</span>}
                                            </div>
                                        </div>

                                        <div className="job-form-row">
                                            <div className={`job-form-group job-floating-group ${getFieldStatus('phone', true)}`}>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " required />
                                                <label>Phone Number *</label>
                                                {touched.phone && !formData.phone && <span className="job-error-msg">Required</span>}
                                            </div>
                                            <div className={`job-form-group job-floating-group`}>
                                                <select name="position" value={formData.position} onChange={handleInputChange}>
                                                    <option value="Manager (Corporate Sales)">Manager (Corporate Sales)</option>
                                                    <option value="Underwriting Specialist">Underwriting Specialist</option>
                                                </select>
                                                <label className="static-label">Applying For *</label>
                                            </div>
                                        </div>

                                        <div className={`job-form-group job-floating-group`}>
                                            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                            <label>Total Experience (e.g. 5 Years)</label>
                                        </div>
                                    </div>

                                    <div className="job-form-section">
                                        <h4 className="job-section-title">Attachments</h4>
                                        <div className={`job-form-group ${getFieldStatus('resume', true)}`}>
                                            <label className="static-label mb-3">Upload Resume (PDF/DOC) *</label>
                                            <div className="file-upload-wrapper">
                                                <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleInputChange} required />
                                                <div className="file-dummy">
                                                    {formData.resume ? (
                                                        <>
                                                            <i className="fa-solid fa-file-circle-check" style={{ color: '#22c55e' }}></i>
                                                            <span style={{ color: '#22c55e' }}>{formData.resume.name}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa-solid fa-cloud-arrow-up"></i>
                                                            <span>Drop your resume here or click to browse</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            {touched.resume && !formData.resume && <span className="job-error-msg">Required</span>}
                                        </div>
                                    </div>

                                    <div className={`job-form-group job-checkbox-group mb-4 ${touched.agreed && !formData.agreed ? 'has-error' : ''}`}>
                                        <label className="job-checkbox-container">
                                            <input
                                                type="checkbox"
                                                name="agreed"
                                                checked={formData.agreed}
                                                onChange={handleInputChange}
                                            />
                                            <span className="job-checkbox-text">
                                                I confirm I have read and agree to the
                                                <a href="/privacy-policy" className="policy-link" onClick={(e) => e.stopPropagation()}> Privacy and Data Protection policies</a>.
                                            </span>
                                        </label>
                                        {touched.agreed && !formData.agreed && <span className="job-error-msg block">Please agree to the policies to continue</span>}
                                    </div>

                                    <button type="submit" disabled={status.loading} className="btn-pib w-100 mt-3 py-3">
                                        {status.loading ? 'Sending Application...' : 'Submit Application'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SuccessModal isOpen={status.success} onClose={() => setStatus(s => ({ ...s, success: false }))} />
        </>
    );
};

export default Careers;
