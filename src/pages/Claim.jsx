import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import SEO from '../components/SEO';
import SuccessModal from '../components/SuccessModal';

const retailConfig = {
    car: {
        name: 'Car Insurance',
        rate: 0.025,
        min: 200000,
        max: 5000000,
        step: 50000,
        default: 500000,
        fields: [
            { id: 'vehicle_reg', name: 'vehicle_reg', label: 'Vehicle Reg. No', placeholder: 'MH 01 AB 1234', type: 'text' },
            { id: 'vehicle_model', name: 'vehicle_model', label: 'Vehicle Model', placeholder: 'e.g. Honda City', type: 'text' }
        ]
    },
    bike: {
        name: 'Bike Insurance',
        rate: 0.018,
        min: 50000,
        max: 500000,
        step: 5000,
        default: 100000,
        fields: [
            { id: 'bike_reg', name: 'bike_reg', label: 'Bike Reg. No', placeholder: 'MH 02 XY 5678', type: 'text' },
            { id: 'engine_cc', name: 'engine_cc', label: 'Engine CC', placeholder: 'e.g. 150', type: 'number' }
        ]
    },
    health: {
        name: 'Health Insurance',
        rate: 0.009,
        min: 300000,
        max: 2000000,
        step: 100000,
        default: 500000,
        fields: [
            { id: 'members', name: 'members', label: 'Members Count', placeholder: '', type: 'number', defaultValue: 1, min: 1, max: 10 },
            { id: 'age', name: 'age', label: 'Oldest Member Age', placeholder: 'e.g. 35', type: 'number' }
        ]
    },
    travel: {
        name: 'Travel Insurance',
        rate: 0.005,
        min: 500000,
        max: 10000000,
        step: 100000,
        default: 1000000,
        fields: [
            { id: 'destination', name: 'destination', label: 'Destination', placeholder: 'e.g. Europe', type: 'text' },
            { id: 'duration', name: 'duration', label: 'Trip Duration (Days)', placeholder: 'e.g. 15', type: 'number' }
        ]
    },
    life: {
        name: 'Life Insurance',
        rate: 0.002,
        min: 1000000,
        max: 50000000,
        step: 500000,
        default: 5000000,
        fields: [
            { id: 'income', name: 'income', label: 'Annual Income', placeholder: 'e.g. 10,00,000', type: 'number' },
            { id: 'smoker', name: 'smoker', label: 'Smoker?', type: 'select', options: ['No', 'Yes'] }
        ]
    },
    home: {
        name: 'Home Insurance',
        rate: 0.0035,
        min: 1000000,
        max: 20000000,
        step: 500000,
        default: 2500000,
        fields: [
            { id: 'prop_value', name: 'prop_value', label: 'Property Value', placeholder: '₹', type: 'number' },
            { id: 'prop_type', name: 'prop_type', label: 'Property Type', type: 'select', options: ['Apartment', 'Villa'] }
        ]
    }
};

const corporateConfig = {
    liability: {
        name: 'Liability & Financial Lines',
        rate: 0.015,
        min: 10000000,
        max: 500000000,
        step: 5000000,
        default: 50000000,
        fields: [
            { id: 'liability_type', name: 'liability_type', label: 'Liability Type', type: 'select', options: ['Directors & Officers', 'Errors & Omissions', 'Professional Indemnity', 'Commercial General Liability', 'Cyber Insurance', 'Commercial Crime', 'Carrier Legal Liability', 'Product Liability', 'Title Insurance'] },
            { id: 'company_turnover', name: 'company_turnover', label: 'Company Annual Turnover (INR)', placeholder: 'e.g. 500000000', type: 'number' }
        ]
    },
    engineering: {
        name: 'Engineering & Industrial Risks',
        rate: 0.012,
        min: 10000000,
        max: 500000000,
        step: 5000000,
        default: 100000000,
        fields: [
            { id: 'eng_type', name: 'eng_type', label: 'Risk Type', type: 'select', options: ['Contractors All Risk', 'Engineering All Risk', 'Workmen Compensation', 'Factory & Warehouse'] },
            { id: 'project_value', name: 'project_value', label: 'Project / Asset Value (INR)', placeholder: 'e.g. 100000000', type: 'number' }
        ]
    },
    marine: {
        name: 'Marine & Logistics',
        rate: 0.008,
        min: 5000000,
        max: 200000000,
        step: 1000000,
        default: 20000000,
        fields: [
            { id: 'marine_type', name: 'marine_type', label: 'Marine Cover Type', type: 'select', options: ['Marine Insurance', 'Export & Import Insurance', 'Marine Hull Insurance'] },
            { id: 'cargo_value', name: 'cargo_value', label: 'Cargo/Hull Value (INR)', placeholder: 'e.g. 20000000', type: 'number' }
        ]
    },
    property_specialized: {
        name: 'Property & Specialized Covers',
        rate: 0.005,
        min: 20000000,
        max: 1000000000,
        step: 10000000,
        default: 100000000,
        fields: [
            { id: 'prop_cover', name: 'prop_cover', label: 'Property Cover', type: 'select', options: ['Property Insurance', 'Office Insurance', 'Fire Insurance'] },
            { id: 'prop_location', name: 'prop_location', label: 'Property Location', placeholder: 'e.g. Mumbai, Maharashtra', type: 'text' }
        ]
    },
    fleet: {
        name: 'Fleet & Miscellaneous',
        rate: 0.02,
        min: 5000000,
        max: 100000000,
        step: 1000000,
        default: 10000000,
        fields: [
            { id: 'fleet_type', name: 'fleet_type', label: 'Fleet Cover', type: 'select', options: ['Motor Fleet Insurance', 'Miscellaneous Covers'] },
            { id: 'vehicle_count', name: 'vehicle_count', label: 'Number of Vehicles', placeholder: 'e.g. 50', type: 'number' }
        ]
    },
    gmc: {
        name: 'GMC - Group Mediclaim',
        rate: 0.01,
        min: 5000000,
        max: 100000000,
        step: 1000000,
        default: 20000000,
        fields: [
            { id: 'gmc_cover', name: 'gmc_cover', label: 'Cover Includes', type: 'select', options: ['Employee Health Insurance', 'Family Floater Options', 'Wellness Benefits'] },
            { id: 'emp_count', name: 'emp_count', label: 'Total Employees', placeholder: 'e.g. 100', type: 'number' }
        ]
    },
    gpa: {
        name: 'GPA - Group Personal Accident',
        rate: 0.005,
        min: 10000000,
        max: 200000000,
        step: 5000000,
        default: 50000000,
        fields: [
            { id: 'gpa_cover', name: 'gpa_cover', label: 'Cover Type', type: 'select', options: ['Accidental Death Cover', 'Permanent Disability Cover', 'Weekly Benefit'] },
            { id: 'emp_count_gpa', name: 'emp_count_gpa', label: 'Total Employees', placeholder: 'e.g. 100', type: 'number' }
        ]
    },
    gti: {
        name: 'GTI - Group Term Insurance',
        rate: 0.003,
        min: 50000000,
        max: 500000000,
        step: 10000000,
        default: 100000000,
        fields: [
            { id: 'gti_cover', name: 'gti_cover', label: 'Cover Type', type: 'select', options: ['Life Cover for Employees', 'Natural & Accidental Death', 'Affordable Group Premiums'] },
            { id: 'emp_count_gti', name: 'emp_count_gti', label: 'Total Employees', placeholder: 'e.g. 100', type: 'number' }
        ]
    }
};

const Claim = () => {
    const navigate = useNavigate();
    const [clientType, setClientType] = useState('retail');
    const [insuranceType, setInsuranceType] = useState('car');

    const activeConfig = clientType === 'retail' ? retailConfig : corporateConfig;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        contactPerson: '',
        policyNumber: '',
        insuranceCompany: '',
        riskLocation: '',
        gstNumber: '',
        website: '',
        limit: '',
        dynamic: {}
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const currentConfig = activeConfig[insuranceType] || activeConfig[Object.keys(activeConfig)[0]];

    const handleClientTypeChange = (type) => {
        setClientType(type);
        const newConfig = type === 'retail' ? retailConfig : corporateConfig;
        setInsuranceType(Object.keys(newConfig)[0]);
    };

    useEffect(() => {
        if (!currentConfig) return;
        setFormData(prev => ({
            ...prev,
            limit: '',
            dynamic: currentConfig.fields.reduce((acc, field) => {
                acc[field.name] = field.defaultValue || '';
                return acc;
            }, {})
        }));
    }, [insuranceType, currentConfig]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in formData) {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                dynamic: { ...prev.dynamic, [name]: value }
            }));
        }
    };

    const handleLimitChange = (e) => {
        const val = e.target.value;
        setFormData(prev => ({ ...prev, limit: val === '' ? '' : parseInt(val) }));
    };

    const calculatePremium = () => {
        return Math.round(formData.limit * currentConfig.rate);
    };

    const formatCurrency = (val) => {
        if (!val) return '0';
        return Number(val).toLocaleString('en-IN');
    };

    const formatShortCurrency = (val) => {
        return val / 100000 >= 1 ? (val / 100000) + 'L' : (val / 1000).toLocaleString('en-IN') + 'K';
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzw0BqysZGimY_Uo6w1J4CFIDFCYlAOdnWD7Nj0meTXJmou7fpbnG5f75mSE3FeVQ/exec";

        try {
            const refId = `CLM-${Math.floor(100000 + Math.random() * 900000)}`;

            // Map the form data to specific column names based on client type for different tabs
            const payload = {
                "Reference ID": refId,
                "Client Type": clientType === 'retail' ? 'Retail' : 'Corporate',
                "Insurance Category": currentConfig?.name || "",
                "Email Address": formData.email || "",
                "Phone Number": formData.phone || "",
                "Sum Insured": formData.limit || ""
            };

            if (clientType === 'retail') {
                payload["Full Name"] = formData.fullName || "";
            } else {
                payload["Company Name"] = formData.companyName || "";
                payload["Contact Person"] = formData.contactPerson || "";
                payload["Policy Number"] = formData.policyNumber || "";
                payload["Insurance Company"] = formData.insuranceCompany || "";
                payload["Risk Location"] = formData.riskLocation || "";
                payload["GST Number"] = formData.gstNumber || "";
                payload["Company Website"] = formData.website || "";
            }

            // Map dynamic fields to their beautiful labels
            if (currentConfig && currentConfig.fields) {
                currentConfig.fields.forEach(field => {
                    const value = formData.dynamic[field.name];
                    if (value !== undefined && value !== '') {
                        payload[field.label] = value;
                    }
                });
            }

            // Remove empty keys to avoid creating blank columns
            Object.keys(payload).forEach(key => {
                if (payload[key] === "") {
                    delete payload[key];
                }
            });

            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            });

            setShowSuccess(true);
            setIsSubmitting(false);

            // Auto close modal and redirect to thank you page
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/thank-you', { state: { referenceId: refId } });
            }, 2500);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title="File a Claim | Easy Claim Processing - PIB Insurance"
                description="File your insurance claim easily with PIB Insurance. Our team provides dedicated support throughout the claims process."
                canonical="https://pibinsurance.in/claim"
            />
            <section className="insurance-hero hero-claim">
                <div className="industries-hero-container">
                    <MotionSection className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>File a Claim</h1>
                            <div className="hero-header-divider"></div>
                            <div className="hero-header-info">Support When It Matters Most</div>
                        </div>
                        <p>We're here for you when it matters most. Use our streamlined process to submit your claim details and our team will guide you through the rest.</p>
                        <div className="breadcrumb-custom">HOME / ADD CLAIMS</div>
                    </MotionSection>
                </div>
            </section>

            <section className="claim-section py-5">
                <div className="container">
                    <div className="claim-grid">
                        {/* Sidebar Tabs */}
                        <div className="claim-sidebar">
                            <MotionSection variant="fadeRight">
                                <div className="sidebar-title">
                                    <h3>Insurance Types</h3>
                                    <p>Select category for quote</p>
                                </div>
                                <div className="client-type-tabs d-flex justify-content-center mb-3 w-100">
                                    <button
                                        type="button"
                                        className={`btn ${clientType === 'retail' ? 'btn-active-toggle' : 'btn-outline-secondary'} flex-grow-1`}
                                        style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                        onClick={() => handleClientTypeChange('retail')}
                                    >
                                        Retail
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${clientType === 'corporate' ? 'btn-active-toggle' : 'btn-outline-secondary'} flex-grow-1`}
                                        style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                        onClick={() => handleClientTypeChange('corporate')}
                                    >
                                        Corporate
                                    </button>
                                </div>
                                <MotionList key={clientType} className="claim-tabs" stagger={0.1} component="ul">
                                    {Object.entries(activeConfig).map(([key, cfg]) => {
                                        let iconClass = 'fa-file-contract';
                                        if (key === 'car') iconClass = 'fa-car';
                                        if (key === 'bike') iconClass = 'fa-motorcycle';
                                        if (key === 'health') iconClass = 'fa-stethoscope';
                                        if (key === 'travel') iconClass = 'fa-plane';
                                        if (key === 'life') iconClass = 'fa-heart-pulse';
                                        if (key === 'home') iconClass = 'fa-house';
                                        if (key === 'liability') iconClass = 'fa-scale-balanced';
                                        if (key === 'engineering') iconClass = 'fa-hard-hat';
                                        if (key === 'marine') iconClass = 'fa-ship';
                                        if (key === 'property_specialized') iconClass = 'fa-building';
                                        if (key === 'fleet') iconClass = 'fa-truck';
                                        if (key === 'gmc') iconClass = 'fa-notes-medical';
                                        if (key === 'gpa') iconClass = 'fa-user-injured';
                                        if (key === 'gti') iconClass = 'fa-users';

                                        return (
                                            <MotionItem
                                                key={key}
                                                className={insuranceType === key ? 'page-active' : ''}
                                                onClick={() => setInsuranceType(key)}
                                                component="li"
                                                inherit
                                            >
                                                <i className={`fa-solid ${iconClass}`}></i> {cfg.name}
                                            </MotionItem>
                                        );
                                    })}
                                </MotionList>

                                <div className="help-card mt-4">
                                    <i className="fa fa-headset"></i>
                                    <h4>Need Help?</h4>
                                    <p>Our experts are here to assist you with your quote calculation.</p>
                                    <a href="tel:+919820419276" className="btn btn-sm btn-outline-light mt-2">Call Expert</a>
                                </div>
                            </MotionSection>
                        </div>

                        {/* Form Side */}
                        <MotionSection className="claim-content" delay={0.2} variant="fadeLeft">
                            <div className="content-header">
                                <div className="header-text text-center w-100">
                                    <h2>Get an insurance quote<br /><span>to get started!</span></h2>
                                    <p>Fill in the details below to receive a personalized quote directly from our experts.</p>
                                </div>
                            </div>

                            <form className="quote-form mt-4" onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    {clientType === 'retail' ? (
                                        <>
                                            <div className="col-md-6">
                                                <label className="form-label">Full Name</label>
                                                <input type="text" name="fullName" className="form-control" placeholder="Enter your name" value={formData.fullName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Email Address</label>
                                                <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Phone Number</label>
                                                <input type="tel" name="phone" className="form-control" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Insurance Type</label>
                                                <select className="form-select" value={insuranceType} onChange={(e) => setInsuranceType(e.target.value)}>
                                                    {Object.entries(activeConfig).map(([key, cfg]) => (
                                                        <option key={key} value={key}>{cfg.name}</option>
                                                    ))}
                                                </select>
                                            </div>


                                        </>
                                    ) : (
                                        <>
                                            <div className="col-md-12">
                                                <label className="form-label">Insured / Company Name</label>
                                                <input type="text" name="companyName" className="form-control" placeholder="Enter company name" value={formData.companyName} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Contact Person Name</label>
                                                <input type="text" name="contactPerson" className="form-control" placeholder="Enter contact person" value={formData.contactPerson} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Mobile Number</label>
                                                <input type="tel" name="phone" className="form-control" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Email ID</label>
                                                <input type="email" name="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Policy Number</label>
                                                <input type="text" name="policyNumber" className="form-control" placeholder="Enter policy number" value={formData.policyNumber} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Insurance Company Name</label>
                                                <input type="text" name="insuranceCompany" className="form-control" placeholder="Enter insurance company" value={formData.insuranceCompany} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Type of Insurance Policy</label>
                                                <select className="form-select" value={insuranceType} onChange={(e) => setInsuranceType(e.target.value)}>
                                                    {Object.entries(activeConfig).map(([key, cfg]) => (
                                                        <option key={key} value={key}>{cfg.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Risk Location / Address</label>
                                                <input type="text" name="riskLocation" className="form-control" placeholder="Enter risk location" value={formData.riskLocation} onChange={handleInputChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">GST Number</label>
                                                <input type="text" name="gstNumber" className="form-control" placeholder="Enter GST number" value={formData.gstNumber} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Company Website</label>
                                                <input type="url" name="website" className="form-control" placeholder="https://www.example.com" value={formData.website} onChange={handleInputChange} />
                                            </div>
                                        </>
                                    )}

                                    {/* Dynamic Fields */}
                                    {currentConfig.fields.map(field => (
                                        <div key={field.id} className="col-md-6">
                                            <label className="form-label">{field.label}</label>
                                            {field.type === 'select' ? (
                                                <select name={field.name} className="form-select" value={formData.dynamic[field.name] || ''} onChange={handleInputChange}>
                                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <input type={field.type} name={field.name} className="form-control" placeholder={field.placeholder} value={formData.dynamic[field.name] || ''} onChange={handleInputChange} required />
                                            )}
                                        </div>
                                    ))}

                                    {/* Sum Insured Input */}
                                    <div className="col-md-6 mt-2">
                                        <label className="form-label">Sum Insured (Limit)</label>
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input
                                                type="number"
                                                name="limit"
                                                className="form-control"
                                                placeholder="Enter sum insured amount"
                                                min={currentConfig.min}
                                                value={formData.limit}
                                                onChange={handleLimitChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="get-quote-btn" disabled={isSubmitting}>
                                            {isSubmitting ? <><i className="fa fa-spinner fa-spin"></i> GENERATING QUOTE...</> : <>GET A QUOTE NOW</>}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </MotionSection>
                    </div>
                </div>
            </section>

            <SuccessModal
                isOpen={showSuccess}
                countdown={3}
            />
        </>
    );
};

export default Claim;
