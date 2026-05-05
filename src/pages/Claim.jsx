import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import SEO from '../components/SEO';

const config = {
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

const Claim = () => {
    const [insuranceType, setInsuranceType] = useState('car');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        limit: config.car.default,
        dynamic: {}
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentConfig = config[insuranceType];

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            limit: currentConfig.default,
            dynamic: currentConfig.fields.reduce((acc, field) => {
                acc[field.name] = field.defaultValue || '';
                return acc;
            }, {})
        }));
    }, [insuranceType]);

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
        setFormData(prev => ({ ...prev, limit: parseInt(e.target.value) }));
    };

    const calculatePremium = () => {
        return Math.round(formData.limit * currentConfig.rate);
    };

    const formatCurrency = (val) => {
        return val.toLocaleString('en-IN');
    };

    const formatShortCurrency = (val) => {
        return val / 100000 >= 1 ? (val / 100000) + 'L' : (val / 1000).toLocaleString('en-IN') + 'K';
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const premium = calculatePremium();

        // Header
        doc.setFillColor(26, 111, 168);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text('PIB INSURANCE BROKERS', 15, 25);
        doc.setFontSize(12);
        doc.text('Your Risk Management Partners', 15, 33);

        // Quote Title
        doc.setTextColor(26, 111, 168);
        doc.setFontSize(18);
        doc.text('INSURANCE QUOTE ESTIMATE', 15, 55);

        // Customer Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 55);

        const tableData = [
            ['Customer Name', formData.fullName],
            ['Email', formData.email],
            ['Phone', formData.phone],
            ['Insurance Type', currentConfig.name],
            ['Sum Insured (Limit)', `INR ${formatCurrency(formData.limit)}`],
            ['Estimated Annual Premium', `INR ${formatCurrency(premium)}*`]
        ];

        // Add dynamic fields
        Object.entries(formData.dynamic).forEach(([key, value]) => {
            const label = key.replace('_', ' ').toUpperCase();
            tableData.push([label, value]);
        });

        doc.autoTable({
            startY: 65,
            head: [['Field', 'Details']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [26, 111, 168] }
        });

        const finalY = doc.lastAutoTable.finalY || 150;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('*Disclaimer: This is an automated estimate based on standard rates. Final premium is subject to', 15, finalY + 20);
        doc.text('underwriting approval, age, health status, and other policy-specific factors.', 15, finalY + 25);

        doc.setTextColor(26, 111, 168);
        doc.text('PIB Insurance Brokers | info@pibinsurance.in | +91 9820419276', 15, 280);

        doc.save(`PIB_Quote_${formData.fullName.replace(/\s+/g, '_')}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // In a real app, you'd send this to a backend or Google Sheets
        console.log('Form submitted:', formData);

        generatePDF();

        setTimeout(() => {
            alert('Success! Your quote PDF has been generated and our team has been notified. We will contact you shortly.');
            setIsSubmitting(false);
        }, 1000);
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
                    <div className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>File a Claim</h1>
                            <div className="hero-header-divider"></div>
                            <div className="hero-header-info">Support When It Matters Most</div>
                        </div>
                        <p>We're here for you when it matters most. Use our streamlined process to submit your claim details and our team will guide you through the rest.</p>
                        <div className="breadcrumb-custom">HOME / ADD CLAIMS</div>
                    </div>
                </div>
            </section>

            <section className="claim-section py-5">
                <div className="container">
                    <div className="claim-grid">
                        {/* Sidebar Tabs */}
                        <div className="claim-sidebar">
                            <div className="sidebar-title">
                                <h3>Insurance Types</h3>
                                <p>Select category for quote</p>
                            </div>
                            <ul className="claim-tabs">
                                {Object.entries(config).map(([key, cfg]) => (
                                    <li 
                                        key={key} 
                                        className={insuranceType === key ? 'page-active' : ''} 
                                        onClick={() => setInsuranceType(key)}
                                    >
                                        <i className={`fa ${key === 'car' ? 'fa-car' : key === 'bike' ? 'fa-motorcycle' : key === 'health' ? 'fa-stethoscope' : key === 'travel' ? 'fa-plane' : key === 'life' ? 'fa-heart-pulse' : 'fa-house'}`}></i> {cfg.name}
                                    </li>
                                ))}
                            </ul>

                            <div className="help-card mt-4">
                                <i className="fa fa-headset"></i>
                                <h4>Need Help?</h4>
                                <p>Our experts are here to assist you with your quote calculation.</p>
                                <a href="tel:+919820419276" className="btn btn-sm btn-outline-light mt-2">Call Expert</a>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="claim-content">
                            <div className="content-header">
                                <div className="header-text text-center w-100">
                                    <h2>Get an insurance quote<br /><span>to get started!</span></h2>
                                    <p>Fill in the details below to receive a personalized quote directly from our experts.</p>
                                </div>
                            </div>

                            <form className="quote-form mt-4" onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input 
                                            type="text" 
                                            name="fullName" 
                                            className="form-control" 
                                            placeholder="Enter your name" 
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className="form-control" 
                                            placeholder="Enter your email" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            className="form-control" 
                                            placeholder="+91 XXXXX XXXXX" 
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Insurance Type</label>
                                        <select 
                                            className="form-select" 
                                            value={insuranceType} 
                                            onChange={(e) => setInsuranceType(e.target.value)}
                                        >
                                            {Object.entries(config).map(([key, cfg]) => (
                                                <option key={key} value={key}>{cfg.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Dynamic Fields */}
                                    {currentConfig.fields.map(field => (
                                        <div key={field.id} className="col-md-6">
                                            <label className="form-label">{field.label}</label>
                                            {field.type === 'select' ? (
                                                <select 
                                                    name={field.name} 
                                                    className="form-select"
                                                    value={formData.dynamic[field.name] || ''}
                                                    onChange={handleInputChange}
                                                >
                                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <input 
                                                    type={field.type} 
                                                    name={field.name} 
                                                    className="form-control" 
                                                    placeholder={field.placeholder}
                                                    value={formData.dynamic[field.name] || ''}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            )}
                                        </div>
                                    ))}

                                    {/* Progress Bar Section */}
                                    <div className="col-12 mt-4">
                                        <div className="limit-wrapper">
                                            <div className="limit-info">
                                                <label className="form-label">Sum Insured (Limit)</label>
                                                <span className="amount-display">₹ {formatCurrency(formData.limit)}</span>
                                            </div>
                                            <div className="progress-container">
                                                <input 
                                                    type="range" 
                                                    className="form-range" 
                                                    min={currentConfig.min} 
                                                    max={currentConfig.max} 
                                                    step={currentConfig.step} 
                                                    value={formData.limit}
                                                    onChange={handleLimitChange}
                                                />
                                                <div className="progress" style={{ height: '8px' }}>
                                                    <div 
                                                        className="progress-bar progress-bar-striped progress-bar-animated" 
                                                        role="progressbar" 
                                                        style={{ width: `${((formData.limit - currentConfig.min) / (currentConfig.max - currentConfig.min)) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="limit-labels">
                                                <span>₹ {formatShortCurrency(currentConfig.min)}</span>
                                                <span>₹ {formatShortCurrency(currentConfig.max)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <div className="calculation-box">
                                            <div className="calc-row">
                                                <span>Estimated Premium</span>
                                                <span className="calc-value">₹ {formatCurrency(calculatePremium())}*</span>
                                            </div>
                                            <p className="calc-note">*Final premium subject to underwriting and policy terms.</p>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="get-quote-btn" disabled={isSubmitting}>
                                            {isSubmitting ? <><i className="fa fa-spinner fa-spin"></i> GENERATING QUOTE...</> : <>GET A QUOTE NOW <i className="fa fa-arrow-right ms-2"></i></>}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Claim;
