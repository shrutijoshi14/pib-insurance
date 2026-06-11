import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';
import SuccessModal from '../components/SuccessModal';
import '../styles/careers.css';

const jobListings = {
    'corporate-sales': {
        id: 'corporate-sales',
        category: 'sales',
        title: 'Manager (Corporate Sales)',
        subtitle: 'Position Title: Manager (Corporate Sales) Department: Corporate Insurance / Business Insurance / Risk Advisory Location: Mumbai / PAN India (as applicable)',
        dept: 'Corporate Insurance / Business Insurance / Risk Advisory',
        location: 'Mumbai / PAN India',
        overview: 'We are looking for an experienced Corporate & Commercial Insurance Professional to manage and grow business across multiple lines of non-life insurance, including project, property, marine, liability, employee benefits, and specialty risks.',
        sections: [
            {
                title: 'Key Responsibilities',
                icon: 'fa-list-check',
                type: 'list',
                items: [
                    'Develop and manage corporate, SME, and large enterprise insurance portfolios',
                    'Understand client businesses and provide tailored risk solutions',
                    'Handle commercial insurance, corporate insurance, business insurance, and project insurance',
                    'Advise clients on property, fire, marine, liability, and specialty insurance',
                    'Work closely with CXOs, finance teams, and risk managers'
                ]
            },
            {
                title: 'Insurance Lines',
                icon: 'fa-shield-halved',
                type: 'nested-tags',
                subsections: [
                    { label: 'Core Lines', items: ['Commercial & Corporate Insurance', 'Business & Project Insurance', 'Property Insurance', 'Fire & Engineering Insurance', 'Marine Insurance (Cargo & Hull)', 'Liability Insurance (Public, Product, Professional, D&O)', 'Employee Insurance (Group Health, GPA, GTL)', 'Non-Employee Benefit Insurance', 'Workers’ Compensation'] },
                    { label: 'Specialty Solutions', items: ['Cyber Risk', 'Political Risk & Trade Credit', 'Terrorism Risk', 'Environmental Risk', 'Product Liability & Recall', 'Kidnap & Ransom', 'Fine Art, Jewellery & Specie', 'Flood & Parametric Insurance', 'Captive Insurance & Alternative Risk Transfer', 'Structured Credit & Surety', 'MGA & Program-based Solutions'] }
                ]
            },
            {
                title: 'Consulting & Analytics',
                icon: 'fa-magnifying-glass-chart',
                type: 'list',
                items: ['Deliver risk consulting and risk analytics solutions', 'Support business interruption and supply chain risk assessments', 'Assist in property risk management and valuations', 'Collaborate with forensic accounting and claims services', 'Provide multinational and international placement services', 'Support M&A, private equity, and transactional risk insurance']
            },
            {
                title: 'Claims Advocacy',
                icon: 'fa-handshake-angle',
                type: 'list',
                items: ['End-to-end claims management and negotiation', 'Coordinate with insurers, surveyors, and legal teams', 'Ensure fair, timely, and optimized claim settlements', 'Provide workplace rehabilitation and compensation support']
            },
            {
                title: 'Industry Coverage',
                icon: 'fa-city',
                type: 'text-box',
                content: 'Agribusiness, Automotive, Aviation & Space, Cargo & Logistics, Chemical, Construction & Infrastructure, Energy & Power, Financial Institutions, Food & Beverage, Healthcare & Life Sciences, Hospitality, Manufacturing, Marine, Media & Entertainment, Mining, Professional Services, Real Estate, Retail & Wholesale, Technology, Transportation & Utilities, Public Sector.'
            },
            {
                title: 'Skills & Competencies',
                icon: 'fa-gear',
                type: 'list',
                items: ['Strong understanding of commercial and corporate insurance products', 'Ability to structure complex risk solutions', 'Client relationship and negotiation skills', 'Knowledge of IRDAI regulations and compliance', 'Analytical mindset with exposure to risk modeling and data-driven insights', 'Excellent communication and presentation skills']
            },
            {
                title: 'Eligibility',
                icon: 'fa-user-graduate',
                type: 'list',
                items: ['Graduate / MBA (Insurance, Risk Management, Finance preferred)', '0–10+ years of experience in insurance broking, corporate insurance, general insurance companies, or risk advisory/consulting', 'Experience in handling large corporate accounts preferred']
            }
        ]
    },
    'property-underwriter': {
        id: 'property-underwriter',
        category: 'underwriting',
        title: 'Property Insurance Underwriting',
        subtitle: 'Job Title: Property Insurance Executive / Underwriter / Placement Specialist',
        dept: 'Underwriting',
        location: 'Mumbai & PAN India (30+ Locations)',
        overview: 'We are looking for a Property Insurance professional responsible for handling property insurance business including Fire Insurance, Industrial All Risk (IAR), Burglary Insurance, Engineering Insurance, and other commercial property lines.',
        sections: [
            {
                title: 'Key Responsibilities',
                icon: 'fa-list-check',
                type: 'list',
                items: [
                    'Handling Property Insurance business for corporate and retail clients',
                    'Preparing RFQ (Request for Quotation) and collecting quotations from insurers',
                    'Coordinating with insurance companies for policy issuance and endorsements',
                    'Reviewing client property risk exposure and suggesting suitable insurance coverage',
                    'Managing Fire Insurance, Industrial All Risk (IAR), Burglary, Machinery Breakdown, and Engineering policies',
                    'Handling renewals and maintaining customer relationships',
                    'Assisting clients in claim intimation, documentation, and settlement process',
                    'Negotiating premium rates and policy terms with insurers',
                    'Conducting risk inspections and reviewing survey reports',
                    'Maintaining underwriting and policy records',
                    'Ensuring compliance with IRDAI regulations and company guidelines'
                ]
            },
            {
                title: 'Required Skills',
                icon: 'fa-gear',
                type: 'list',
                items: [
                    'Good knowledge of Property Insurance and Fire Insurance products',
                    'Understanding of IRDAI regulations and Indian insurance market',
                    'Knowledge of underwriting principles and risk assessment',
                    'Strong communication and negotiation skills',
                    'Good Excel, reporting, and email drafting skills'
                ]
            },
            {
                title: 'Qualification',
                icon: 'fa-user-graduate',
                type: 'list',
                items: [
                    'Graduate in any discipline. MBA / PGDM in Insurance or Marketing preferred.'
                ]
            },
            {
                title: 'Experience',
                icon: 'fa-clock',
                type: 'list',
                items: [
                    '1 to 8 years in Property Insurance / General Insurance.'
                ]
            },
            {
                title: 'Preferred Industry',
                icon: 'fa-building',
                type: 'tags',
                items: [
                    'Insurance Broking',
                    'General Insurance Company',
                    'Risk Management Consultancy',
                    'Industrial & Manufacturing Sector'
                ]
            },
            {
                title: 'Applicable Indian Insurance Laws & Regulations',
                icon: 'fa-scale-balanced',
                type: 'list',
                items: [
                    'IRDAI Guidelines & Regulations',
                    'Insurance Act, 1938',
                    'General Insurance Business (Nationalisation) Act',
                    'Indian Contract Act related to insurance contracts'
                ]
            },
            {
                title: 'Locations Served',
                icon: 'fa-location-dot',
                type: 'text-box',
                content: 'Mumbai | Pune | Raipur | Ahmedabad | Surat | Nagpur | Nashik | Vadodara | Rajkot | Chennai | Bangalore | Hyderabad | Visakhapatnam | Cochin | Coimbatore | Madurai | Vijaywada | Mangaluru | Mysore | Delhi | Jaipur | Chandigarh | Lucknow | Bhopal | Ludhiana | Agra | Kanpur | Amritsar | Kolkata | Patna | Ranchi | Bhubaneswar | Guwahati | Jamshedpur'
            }
        ]
    },
    'liability-underwriter': {
        id: 'liability-underwriter',
        category: 'underwriting',
        title: 'Liability Insurance Underwriting',
        subtitle: 'Job Title: Liability Insurance Executive / Underwriter / Placement Specialist',
        dept: 'Underwriting',
        location: 'Mumbai & PAN India (30+ Locations)',
        overview: 'We are looking for a Liability Insurance professional responsible for handling various liability insurance products including Public Liability Insurance, Product Liability, Professional Indemnity, Directors & Officers (D&O), Cyber Liability, Employers Liability, and Commercial General Liability policies.',
        sections: [
            {
                title: 'Key Responsibilities',
                icon: 'fa-list-check',
                type: 'list',
                items: [
                    'Handling Liability Insurance business for corporate clients',
                    'Preparing RFQ (Request for Quotation) and collecting quotations from insurers',
                    'Coordinating with insurance companies for policy issuance and endorsements',
                    'Reviewing client liability exposure and suggesting suitable insurance coverage',
                    'Managing Public Liability, Product Liability, Professional Indemnity, D&O, Cyber Liability, and Employers Liability policies',
                    'Handling renewals and maintaining customer relationships',
                    'Assisting clients in claim intimation, documentation, and settlement process',
                    'Negotiating premium rates and policy terms with insurers',
                    'Conducting risk analysis and reviewing legal liability exposure',
                    'Maintaining underwriting and policy records',
                    'Ensuring compliance with IRDAI regulations and Indian insurance laws'
                ]
            },
            {
                title: 'Required Skills',
                icon: 'fa-gear',
                type: 'list',
                items: [
                    'Good knowledge of Liability Insurance products and policy wording',
                    'Understanding of Indian liability laws and IRDAI regulations',
                    'Knowledge of underwriting principles and risk assessment',
                    'Strong communication and negotiation skills',
                    'Good Excel, reporting, and email drafting skills'
                ]
            },
            {
                title: 'Qualification',
                icon: 'fa-user-graduate',
                type: 'list',
                items: [
                    'Graduate in any discipline. MBA / PGDM in Insurance or Marketing preferred.'
                ]
            },
            {
                title: 'Experience',
                icon: 'fa-clock',
                type: 'list',
                items: [
                    '1 to 8 years in Liability Insurance / General Insurance.'
                ]
            },
            {
                title: 'Preferred Industry',
                icon: 'fa-building',
                type: 'tags',
                items: [
                    'Insurance Broking',
                    'General Insurance Company',
                    'Risk Management Consultancy',
                    'Legal & Compliance Sector',
                    'Manufacturing & Corporate Sector'
                ]
            },
            {
                title: 'Applicable Indian Insurance Laws & Regulations',
                icon: 'fa-scale-balanced',
                type: 'list',
                items: [
                    'IRDAI Guidelines & Regulations',
                    'Public Liability Insurance Act, 1991',
                    'Employees Compensation Act, 1923',
                    'Indian Contract Act, 1872',
                    'Consumer Protection Act, 2019',
                    'Factories Act and applicable liability laws',
                    'Environmental Protection related liability regulations'
                ]
            },
            {
                title: 'Locations Served',
                icon: 'fa-location-dot',
                type: 'text-box',
                content: 'Mumbai | Pune | Raipur | Ahmedabad | Surat | Nagpur | Nashik | Vadodara | Rajkot | Chennai | Bangalore | Hyderabad | Visakhapatnam | Cochin | Coimbatore | Madurai | Vijaywada | Mangaluru | Mysore | Delhi | Jaipur | Chandigarh | Lucknow | Bhopal | Ludhiana | Agra | Kanpur | Amritsar | Kolkata | Patna | Ranchi | Bhubaneswar | Guwahati | Jamshedpur'
            }
        ]
    },
    'marine-underwriter': {
        id: 'marine-underwriter',
        category: 'underwriting',
        title: 'Marine Insurance Underwriting',
        subtitle: 'Job Title: Marine Insurance Executive / Underwriter / Placement Specialist',
        dept: 'Underwriting',
        location: 'Mumbai & PAN India (30+ Locations)',
        overview: 'We are looking for a Marine Insurance professional responsible for handling marine cargo and hull insurance business, underwriting support, client servicing, policy issuance, claims coordination, and placement activities with insurance companies.',
        sections: [
            {
                title: 'Key Responsibilities',
                icon: 'fa-list-check',
                type: 'list',
                items: [
                    'Handling Marine Cargo and Marine Hull insurance business',
                    'Preparing RFQ (Request for Quotation) and collecting quotations from insurers',
                    'Coordinating with insurance companies for policy issuance and endorsements',
                    'Reviewing client requirements and providing suitable marine insurance solutions',
                    'Managing import/export cargo insurance policies',
                    'Handling renewals and maintaining customer relationships',
                    'Assisting clients in marine claim documentation and settlement process',
                    'Negotiating premium rates and coverage terms with insurers',
                    'Maintaining underwriting and policy records',
                    'Coordinating with surveyors, shipping agents, and logistics partners',
                    'Ensuring compliance with IRDAI and company guidelines'
                ]
            },
            {
                title: 'Required Skills',
                icon: 'fa-gear',
                type: 'list',
                items: [
                    'Good knowledge of Marine Cargo Insurance and Hull Insurance',
                    'Understanding of Incoterms, shipping documents, and logistics operations',
                    'Strong communication and negotiation skills',
                    'Knowledge of policy wording and marine clauses',
                    'Good Excel and email drafting skills'
                ]
            },
            {
                title: 'Qualification',
                icon: 'fa-user-graduate',
                type: 'list',
                items: [
                    'Graduate in any discipline. MBA / PGDM in Insurance or Marketing preferred.'
                ]
            },
            {
                title: 'Experience & Salary',
                icon: 'fa-clock',
                type: 'list',
                items: [
                    'Experience: 1 to 8 years in Marine Insurance / General Insurance.',
                    'Salary: As per industry standards and experience.'
                ]
            },
            {
                title: 'Preferred Industry',
                icon: 'fa-building',
                type: 'tags',
                items: [
                    'Insurance Broking',
                    'General Insurance Company',
                    'Logistics & Shipping',
                    'Marine Trade & Export Industry'
                ]
            },
            {
                title: 'Applicable Indian Insurance Laws & Regulations',
                icon: 'fa-scale-balanced',
                type: 'list',
                items: [
                    'IRDAI Guidelines & Regulations',
                    'Insurance Act, 1938',
                    'General Insurance Business (Nationalisation) Act',
                    'Indian Contract Act related to insurance contracts'
                ]
            },
            {
                title: 'Locations Served',
                icon: 'fa-location-dot',
                type: 'text-box',
                content: 'Mumbai | Pune | Raipur | Ahmedabad | Surat | Nagpur | Nashik | Vadodara | Rajkot | Chennai | Bangalore | Hyderabad | Visakhapatnam | Cochin | Coimbatore | Madurai | Vijaywada | Mangaluru | Mysore | Delhi | Jaipur | Chandigarh | Lucknow | Bhopal | Ludhiana | Agra | Kanpur | Amritsar | Kolkata | Patna | Ranchi | Bhubaneswar | Guwahati | Jamshedpur'
            }
        ]
    },
    'operations-executive': {
        id: 'operations-executive',
        category: 'operations',
        title: 'Operations / Back Office Executive',
        subtitle: 'Position: Operations Executive / Back Office Executive – Insurance Broking',
        dept: 'Operations & Client Servicing',
        location: 'Mumbai & PAN India (30+ Locations)',
        overview: 'We are looking for a proactive, detail-oriented, and organized Operations / Back Office Executive to manage daily insurance broking operations, policy servicing, insurer coordination, documentation, and client support activities. The ideal candidate should possess good knowledge of insurance processes, strong communication skills, and the ability to handle multiple operational tasks efficiently while maintaining accuracy and timelines.',
        sections: [
            {
                title: 'Key Responsibilities',
                icon: 'fa-list-check',
                type: 'list',
                items: [
                    'Processing policy issuance, endorsements, renewals, and cancellations',
                    'Coordinating with insurance companies for quotations, underwriting, and policy servicing',
                    'Reviewing policy documents for accuracy and compliance',
                    'Assisting clients with policy servicing requests and documentation',
                    'Following up for pending documents, premium payments, and approvals',
                    'Handling email communication with clients, insurers, and internal teams',
                    'Supporting claims documentation and tracking processes',
                    'Preparing quotations, premium comparisons, debit notes, and MIS reports',
                    'Maintaining proper documentation and operational databases',
                    'Ensuring compliance with company policies and IRDAI guidelines'
                ]
            },
            {
                title: 'Required Skills',
                icon: 'fa-gear',
                type: 'list',
                items: [
                    'Knowledge of General Insurance / Health / Marine / Property Insurance',
                    'Good communication and coordination skills',
                    'Strong documentation and organizational abilities',
                    'Proficiency in MS Excel, Word, Outlook, and email drafting',
                    'Ability to work under pressure and meet deadlines',
                    'Attention to detail and operational accuracy'
                ]
            },
            {
                title: 'Eligibility Criteria',
                icon: 'fa-user-graduate',
                type: 'list',
                items: [
                    'Graduate in any discipline',
                    'Insurance certifications will be an added advantage',
                    'Freshers with good communication skills may apply',
                    'Candidates with insurance broking or insurance company experience preferred'
                ]
            },
            {
                title: 'Experience',
                icon: 'fa-clock',
                type: 'list',
                items: [
                    '0 to 5 years in Insurance Broking / Insurance Operations / Policy Servicing'
                ]
            },
            {
                title: 'Salary & Benefits',
                icon: 'fa-hand-holding-dollar',
                type: 'list',
                items: [
                    'Competitive salary as per industry standards',
                    'Performance-based growth opportunities',
                    'Professional development and learning exposure',
                    'Opportunity to work with corporate and retail insurance portfolios'
                ]
            },
            {
                title: 'Other Details',
                icon: 'fa-circle-info',
                type: 'list',
                items: [
                    'Working Days: Monday to Saturday',
                    'Reporting To: Operations Manager / Branch Head'
                ]
            },
            {
                title: 'Why Join PIB Insurance Brokers?',
                icon: 'fa-building',
                type: 'list',
                items: [
                    'Fast-growing insurance broking organization',
                    'Pan-India business exposure',
                    'Professional work environment',
                    'Career growth opportunities in insurance and risk management',
                    'Exposure to multiple insurance products and corporate clients'
                ]
            },
            {
                title: 'Job Locations',
                icon: 'fa-location-dot',
                type: 'text-box',
                content: 'Mumbai | Pune | Raipur | Ahmedabad | Surat | Nagpur | Nashik | Vadodara | Rajkot | Chennai | Bangalore | Hyderabad | Visakhapatnam | Cochin | Coimbatore | Madurai | Vijaywada | Mangaluru | Mysore | Delhi | Jaipur | Chandigarh | Lucknow | Bhopal | Ludhiana | Agra | Kanpur | Amritsar | Kolkata | Patna | Ranchi | Bhubaneswar | Guwahati | Jamshedpur'
            }
        ]
    }
};

const Careers = () => {
    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: 'Manager (Corporate Sales)',
        experience: '',
        appliedBefore: '',
        source: '',
        sourceOther: '',
        referralName: '',
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

        if (!formData.name || !emailRegex.test(formData.email) || !phoneRegex.test(formData.phone) || !formData.resume || !formData.agreed || !formData.appliedBefore || !formData.source) {
            setStatus({ loading: false, success: false, error: 'Please correct the errors and upload your resume before submitting.' });
            return;
        }

        if (formData.appliedBefore === 'Yes') {
            setStatus({ loading: false, success: false, error: 'Thank you for your interest. Under our current policy, candidates who have applied within the last 5 years are not eligible to re-apply at this time.' });
            return;
        }

        if (formData.source === 'Other' && !formData.sourceOther.trim()) {
            setStatus({ loading: false, success: false, error: 'Please specify how you heard about this opportunity.' });
            return;
        }

        if (formData.source === 'Friend' && !formData.referralName.trim()) {
            setStatus({ loading: false, success: false, error: 'Please specify the name of the friend or employee who referred you.' });
            return;
        }

        setStatus({ loading: true, success: false, error: '' });

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXb_An-Ye9fCk3CuafZ5A3b3CzHiZ4DJSx9Li6LDmHoYAnYZnR3lh6gNDphB7r7oYS/exec";

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
                experience: formData.appliedBefore === 'No' ? formData.experience : '',
                appliedBefore: formData.appliedBefore,
                source: formData.source,
                sourceOther: formData.source === 'Other' ? formData.sourceOther : '',
                referralName: formData.source === 'Friend' ? formData.referralName : '',
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
            document.body.style.overflow = '';
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
            document.body.style.overflow = '';
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
                        <MotionItem className="col-lg-6" variant="fadeLeft">
                            <div className="careers-image-wrapper">
                                <img src={`${import.meta.env.BASE_URL}assets/careers-team.png`} alt="PIB Insurance professional team collaborating in a modern office" width="1200" height="800" className="img-fluid rounded-4 shadow-lg" loading="lazy" decoding="async" />
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

                    {/* CATEGORY FILTER TABS */}
                    <div className="category-filter-tabs text-center mb-5">
                        <button
                            className={`filter-tab ${activeCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('all')}
                        >
                            <i className="fa-solid fa-layer-group"></i> All Positions
                        </button>
                        <button
                            className={`filter-tab ${activeCategory === 'sales' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('sales')}
                        >
                            <i className="fa-solid fa-chart-line"></i> Corporate Sales
                        </button>
                        <button
                            className={`filter-tab ${activeCategory === 'underwriting' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('underwriting')}
                        >
                            <i className="fa-solid fa-file-shield"></i> Underwriting & Technical
                        </button>
                        <button
                            className={`filter-tab ${activeCategory === 'operations' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('operations')}
                        >
                            <i className="fa-solid fa-briefcase"></i> Operations
                        </button>
                    </div>

                    <MotionList className="positions-grid" stagger={0.1}>
                        {Object.values(jobListings)
                            .filter(job => activeCategory === 'all' || job.category === activeCategory)
                            .map((job) => (
                                <MotionItem className="position-card" variant="fadeUp" key={job.id}>
                                    <div className="job-info">
                                        <span className="dept">{job.dept}</span>
                                        <h3>{job.title}</h3>
                                        <span className="loc">
                                            <i className="fa-solid fa-location-dot"></i> {job.location}
                                        </span>
                                    </div>
                                    <div className="card-actions d-flex gap-2 w-100 mt-auto">
                                        <button className="apply-btn-outline flex-grow-1" onClick={() => toggleJobModal(job.id)}>View Details</button>
                                        <button className="btn-pib flex-grow-1 py-2 text-sm" onClick={() => openApplyForm(job.title)}>Apply Now</button>
                                    </div>
                                </MotionItem>
                            ))
                        }
                    </MotionList>
                </div>
            </section>

            {/* JOB DETAILS MODAL */}
            <AnimatePresence>
                {selectedJob && jobListings[selectedJob] && (() => {
                    const job = jobListings[selectedJob];
                    return (
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
                                    <div className="job-title-row">
                                        <h2 className="job-title">{job.title}</h2>
                                        <div className="job-meta">
                                            <span><i className="fa-solid fa-location-dot"></i> {job.location}</span>
                                        </div>
                                    </div>
                                    {job.subtitle && <p className="job-subtitle">{job.subtitle}</p>}
                                </div>

                                <div className="job-modal-body">
                                    {job.overview && (
                                        <section className="jd-section">
                                            <h4><i className="fa-solid fa-briefcase"></i> Role Overview</h4>
                                            <p>{job.overview}</p>
                                        </section>
                                    )}

                                    {job.sections.map((section, idx) => (
                                        <section className="jd-section" key={idx}>
                                            <h4><i className={`fa-solid ${section.icon}`}></i> {section.title}</h4>
                                            {section.type === 'list' && (
                                                <ul>
                                                    {section.items.map((item, i) => <li key={i}>{item}</li>)}
                                                </ul>
                                            )}
                                            {section.type === 'tags' && (
                                                <div className="jd-tag-cloud">
                                                    {section.items.map((item, i) => <span key={i} className="jd-bubble">{item}</span>)}
                                                </div>
                                            )}
                                            {section.type === 'text-box' && (
                                                <p className="jd-industry-box">{section.content}</p>
                                            )}
                                            {section.type === 'nested-tags' && (
                                                <>
                                                    {section.subsections.map((sub, sIdx) => (
                                                        <div className="jd-sub-section mb-3" key={sIdx}>
                                                            <h5>{sub.label}</h5>
                                                            <div className="jd-tag-cloud">
                                                                {sub.items.map((item, i) => <span key={i} className="jd-bubble">{item}</span>)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </section>
                                    ))}
                                </div>

                                <div className="job-modal-footer">
                                    <button className="btn-pib w-100 py-3" onClick={() => openApplyForm(job.title)}>Apply For This Position</button>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })()}
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
                                                    {Object.values(jobListings).map(job => (
                                                        <option key={job.id} value={job.title}>{job.title}</option>
                                                    ))}
                                                </select>
                                                <label className="static-label">Applying For *</label>
                                            </div>
                                        </div>

                                        <div className="job-form-row">
                                            <div className={`job-form-group job-floating-group ${getFieldStatus('appliedBefore', true)}`}>
                                                <select name="appliedBefore" value={formData.appliedBefore} onChange={handleInputChange} onBlur={handleBlur} required>
                                                    <option value="" disabled hidden>Select an option</option>
                                                    <option value="No">No, I have not applied in the last 5 years</option>
                                                    <option value="Yes">Yes, I have applied in the last 5 years</option>
                                                </select>
                                                <label className="static-label">Have you applied to PIB in the last 5 years? *</label>
                                                {touched.appliedBefore && !formData.appliedBefore && <span className="job-error-msg">Required</span>}
                                            </div>
                                        </div>

                                        {formData.appliedBefore === 'Yes' && (
                                            <div className="job-form-row" style={{ gridTemplateColumns: '1fr', marginBottom: '20px' }}>
                                                <div className="p-3 rounded" style={{ backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba', fontSize: '13px', lineHeight: '1.6', fontWeight: '500', width: '100%' }}>
                                                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                                                    Thank you for your interest in PIB Insurance Brokers. Under our current recruitment policy, candidates are eligible to re-apply after a cooling-off period of 5 years from their last application. Your details are already in our talent database, and we will contact you should a suitable role align with your profile.
                                                </div>
                                            </div>
                                        )}

                                        {formData.appliedBefore === 'No' && (
                                            <div className="job-form-row">
                                                <div className={`job-form-group job-floating-group`}>
                                                    <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " />
                                                    <label>Total Experience (e.g. 5 Years)</label>
                                                </div>
                                            </div>
                                        )}

                                        <div className="job-form-row" style={{ gridTemplateColumns: (formData.source === 'Other' || formData.source === 'Friend') ? '1fr 1fr' : '1fr' }}>
                                            <div className={`job-form-group job-floating-group ${getFieldStatus('source', true)}`}>
                                                <select name="source" value={formData.source} onChange={handleInputChange} onBlur={handleBlur} required>
                                                    <option value="" disabled hidden>Select an option</option>
                                                    <option value="Google">Google</option>
                                                    <option value="LinkedIn">LinkedIn</option>
                                                    <option value="Instagram">Instagram</option>
                                                    <option value="Glassdoor">Glassdoor</option>
                                                    <option value="Friend">Friend / Employee Referral</option>
                                                    <option value="Other">Other (Please specify)</option>
                                                </select>
                                                <label className="static-label">How did you hear about this opportunity? *</label>
                                                {touched.source && !formData.source && <span className="job-error-msg">Required</span>}
                                            </div>

                                            {formData.source === 'Other' && (
                                                <div className={`job-form-group job-floating-group ${getFieldStatus('sourceOther', true)}`}>
                                                    <input type="text" name="sourceOther" value={formData.sourceOther} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " required />
                                                    <label>Please specify *</label>
                                                    {touched.sourceOther && !formData.sourceOther && <span className="job-error-msg">Required</span>}
                                                </div>
                                            )}

                                            {formData.source === 'Friend' && (
                                                <div className={`job-form-group job-floating-group ${getFieldStatus('referralName', true)}`}>
                                                    <input type="text" name="referralName" value={formData.referralName} onChange={handleInputChange} onBlur={handleBlur} placeholder=" " required />
                                                    <label>Referrer's Name *</label>
                                                    {touched.referralName && !formData.referralName && <span className="job-error-msg">Required</span>}
                                                </div>
                                            )}
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

                                    <button type="submit" disabled={status.loading || formData.appliedBefore === 'Yes'} className="btn-pib w-100 mt-3 py-3">
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
