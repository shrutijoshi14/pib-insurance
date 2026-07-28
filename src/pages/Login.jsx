import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/login.css';

const PosDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Policies list (with some starter records)
    const [policies, setPolicies] = useState([
        { id: 'PIB-POL-9821', customer: 'Amit Sharma', type: 'Motor Insurance', premium: 14500, commission: 2175, status: 'Issued', date: '2026-06-10' },
        { id: 'PIB-POL-7301', customer: 'Priya Patel', type: 'Health Insurance', premium: 22000, commission: 3300, status: 'Issued', date: '2026-06-08' },
        { id: 'PIB-POL-4289', customer: 'Ramesh Verma', type: 'Term Life', premium: 18000, commission: 4500, status: 'Issued', date: '2026-06-05' },
    ]);

    // Summary calculations
    const totalPremium = policies.reduce((acc, curr) => acc + curr.premium, 0);
    const totalCommission = policies.reduce((acc, curr) => acc + curr.commission, 0);

    // Quote Generator state
    const [quoteCategory, setQuoteCategory] = useState('motor'); // 'motor', 'health', 'life'
    const [motorDetails, setMotorDetails] = useState({ vehicleNo: '', model: '', year: '2025', ncb: '20%' });
    const [healthDetails, setHealthDetails] = useState({ age: '30', cover: 'self_spouse', sumInsured: '500000' });
    const [lifeDetails, setLifeDetails] = useState({ age: '25', tobacco: 'no', sumInsured: '10000000' });
    
    const [isCalculating, setIsCalculating] = useState(false);
    const [quotes, setQuotes] = useState(null);
    const [selectedQuote, setSelectedQuote] = useState(null);
    
    // Customer details for Policy Issuance
    const [customerDetails, setCustomerDetails] = useState({ fullName: '', email: '', phone: '' });
    const [issuedPolicyInfo, setIssuedPolicyInfo] = useState(null);

    // Commission Calculator state
    const [calcPremium, setCalcPremium] = useState('');
    const [calcClass, setCalcClass] = useState('motor');
    const [calcResult, setCalcResult] = useState(null);

    // Certificate state
    const [showCert, setShowCert] = useState(false);

    // Handle quote calculation
    const handleCalculateQuotes = (e) => {
        e.preventDefault();
        setIsCalculating(true);
        setQuotes(null);
        setSelectedQuote(null);
        setIssuedPolicyInfo(null);
        
        setTimeout(() => {
            setIsCalculating(false);
            if (quoteCategory === 'motor') {
                setQuotes([
                    { id: 'q1', insurer: 'HDFC Ergo', logo: 'HE', prem: 11400, commRate: 0.15 },
                    { id: 'q2', insurer: 'ICICI Lombard', logo: 'IL', prem: 12200, commRate: 0.15 },
                    { id: 'q3', insurer: 'Tata AIG', logo: 'TA', prem: 10800, commRate: 0.15 }
                ]);
            } else if (quoteCategory === 'health') {
                const base = parseInt(healthDetails.sumInsured) * 0.015;
                setQuotes([
                    { id: 'q1', insurer: 'HDFC Ergo', logo: 'HE', prem: Math.round(base), commRate: 0.15 },
                    { id: 'q2', insurer: 'ICICI Lombard', logo: 'IL', prem: Math.round(base * 1.05), commRate: 0.15 },
                    { id: 'q3', insurer: 'Tata AIG', logo: 'TA', prem: Math.round(base * 0.95), commRate: 0.15 }
                ]);
            } else {
                const base = parseInt(lifeDetails.sumInsured) * 0.0008;
                setQuotes([
                    { id: 'q1', insurer: 'HDFC Ergo', logo: 'HE', prem: Math.round(base), commRate: 0.25 },
                    { id: 'q2', insurer: 'ICICI Lombard', logo: 'IL', prem: Math.round(base * 1.1), commRate: 0.25 },
                    { id: 'q3', insurer: 'Tata AIG', logo: 'TA', prem: Math.round(base * 0.9), commRate: 0.25 }
                ]);
            }
        }, 1000);
    };

    // Handle quote selection to enter customer details
    const handleSelectQuote = (quote) => {
        setSelectedQuote(quote);
        setCustomerDetails({ fullName: '', email: '', phone: '' });
    };

    // Handle policy issuance
    const handleIssuePolicy = (e) => {
        e.preventDefault();
        const policyId = `PIB-POL-${Math.floor(1000 + Math.random() * 9000)}`;
        const commission = Math.round(selectedQuote.prem * selectedQuote.commRate);
        const newPolicy = {
            id: policyId,
            customer: customerDetails.fullName,
            type: quoteCategory === 'motor' ? 'Motor Insurance' : quoteCategory === 'health' ? 'Health Insurance' : 'Term Life',
            premium: selectedQuote.prem,
            commission: commission,
            status: 'Issued',
            date: new Date().toISOString().split('T')[0]
        };

        setPolicies([newPolicy, ...policies]);
        setIssuedPolicyInfo({
            ...newPolicy,
            insurer: selectedQuote.insurer,
            email: customerDetails.email,
            phone: customerDetails.phone
        });
        
        // Reset quote process
        setQuotes(null);
        setSelectedQuote(null);
    };

    // Handle commission calculation tab
    const handleCommissionCalc = (e) => {
        e.preventDefault();
        const premium = parseFloat(calcPremium);
        if (isNaN(premium) || premium <= 0) return;

        let rate = 0.15;
        if (calcClass === 'life') rate = 0.25;

        const comm = premium * rate;
        const tax = comm * 0.18;
        
        setCalcResult({
            premium: premium,
            rate: rate * 100,
            commission: comm,
            gst: tax,
            totalPayout: comm - tax // net commission after TDS (simulated)
        });
    };

    return (
        <div className="pos-dashboard-container" data-aos="fade-up">
            {/* Dashboard Header */}
            <div className="pos-dash-header">
                <div className="pos-agent-info">
                    <div className="pos-agent-avatar">RK</div>
                    <div className="pos-agent-text">
                        <h2>
                            Rajesh Kumar
                            <span className="pos-badge-certified">Certified POSP</span>
                        </h2>
                        <p>Agent ID: PIB-POSP-4082 | Status: Active</p>
                    </div>
                </div>
                <button className="pos-logout-btn" onClick={onLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Log Out</span>
                </button>
            </div>

            {/* Dashboard Tabs Nav */}
            <div className="pos-tabs-nav">
                <button className={`pos-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setShowCert(false); }}>
                    <i className="fa-solid fa-chart-line"></i> Overview
                </button>
                <button className={`pos-tab-btn ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => { setActiveTab('quotes'); setShowCert(false); }}>
                    <i className="fa-solid fa-calculator"></i> Quote Generator
                </button>
                <button className={`pos-tab-btn ${activeTab === 'commission' ? 'active' : ''}`} onClick={() => { setActiveTab('commission'); setShowCert(false); }}>
                    <i className="fa-solid fa-percent"></i> Commission Calc
                </button>
                <button className={`pos-tab-btn ${activeTab === 'training' ? 'active' : ''}`} onClick={() => { setActiveTab('training'); setShowCert(false); }}>
                    <i className="fa-solid fa-graduation-cap"></i> Training Hub
                </button>
            </div>

            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
                <div className="pos-tab-content">
                    <div className="pos-metrics-grid">
                        <div className="pos-metric-card">
                            <div className="pos-metric-icon">
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                            </div>
                            <div className="pos-metric-info">
                                <p>Total Premium Generated</p>
                                <h3>₹{totalPremium.toLocaleString('en-IN')}</h3>
                            </div>
                        </div>
                        <div className="pos-metric-card">
                            <div className="pos-metric-icon">
                                <i className="fa-solid fa-piggy-bank"></i>
                            </div>
                            <div className="pos-metric-info">
                                <p>Commission Earned</p>
                                <h3>₹{totalCommission.toLocaleString('en-IN')}</h3>
                            </div>
                        </div>
                        <div className="pos-metric-card">
                            <div className="pos-metric-icon">
                                <i className="fa-solid fa-file-contract"></i>
                            </div>
                            <div className="pos-metric-info">
                                <p>Active Policies Issued</p>
                                <h3>{policies.length}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="pos-section-title">
                        <span>Recent Policy Registry</span>
                    </div>
                    
                    <div className="pos-table-container">
                        <table className="pos-table">
                            <thead>
                                <tr>
                                    <th>Policy ID</th>
                                    <th>Customer Name</th>
                                    <th>Policy Type</th>
                                    <th>Premium</th>
                                    <th>Commission</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {policies.map(p => (
                                    <tr key={p.id}>
                                        <td style={{fontFamily: 'monospace', fontWeight: 'bold'}}>{p.id}</td>
                                        <td>{p.customer}</td>
                                        <td>{p.type}</td>
                                        <td>₹{p.premium.toLocaleString('en-IN')}</td>
                                        <td style={{color: '#10b981', fontWeight: 'bold'}}>₹{p.commission.toLocaleString('en-IN')}</td>
                                        <td>{p.date}</td>
                                        <td>
                                            <span className="pos-status-badge success">{p.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Quote Generator Tab Content */}
            {activeTab === 'quotes' && (
                <div className="pos-tab-content">
                    {!selectedQuote && !issuedPolicyInfo && (
                        <form onSubmit={handleCalculateQuotes} className="pos-form">
                            <div className="pos-section-title">
                                <span>Generate Policy Quote</span>
                            </div>

                            <div className="form-group mb-4">
                                <label>Select Insurance Class</label>
                                <select 
                                    className="pos-select" 
                                    value={quoteCategory} 
                                    onChange={(e) => { setQuoteCategory(e.target.value); setQuotes(null); }}
                                >
                                    <option value="motor">Motor Insurance</option>
                                    <option value="health">Health Insurance</option>
                                    <option value="life">Term Life Insurance</option>
                                </select>
                            </div>

                            {quoteCategory === 'motor' && (
                                <div className="pos-form-row">
                                    <div className="form-group">
                                        <label>Vehicle registration Number</label>
                                        <input 
                                            required 
                                            type="text" 
                                            placeholder="MH-02-AB-1234" 
                                            className="pos-input"
                                            value={motorDetails.vehicleNo}
                                            onChange={(e) => setMotorDetails({...motorDetails, vehicleNo: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Make & Model</label>
                                        <input 
                                            required 
                                            type="text" 
                                            placeholder="Maruti Swift / Honda City" 
                                            className="pos-input"
                                            value={motorDetails.model}
                                            onChange={(e) => setMotorDetails({...motorDetails, model: e.target.value})}
                                        />
                                    </div>
                                </div>
                            )}

                            {quoteCategory === 'health' && (
                                <div className="pos-form-row">
                                    <div className="form-group">
                                        <label>Proposer Age</label>
                                        <input 
                                            required 
                                            type="number" 
                                            placeholder="30" 
                                            className="pos-input"
                                            value={healthDetails.age}
                                            onChange={(e) => setHealthDetails({...healthDetails, age: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Sum Insured (INR)</label>
                                        <select 
                                            className="pos-select"
                                            value={healthDetails.sumInsured}
                                            onChange={(e) => setHealthDetails({...healthDetails, sumInsured: e.target.value})}
                                        >
                                            <option value="300000">3,00,000</option>
                                            <option value="500000">5,00,000</option>
                                            <option value="1000000">10,00,000</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {quoteCategory === 'life' && (
                                <div className="pos-form-row">
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input 
                                            required 
                                            type="number" 
                                            placeholder="25" 
                                            className="pos-input"
                                            value={lifeDetails.age}
                                            onChange={(e) => setLifeDetails({...lifeDetails, age: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tobacco User</label>
                                        <select 
                                            className="pos-select"
                                            value={lifeDetails.tobacco}
                                            onChange={(e) => setLifeDetails({...lifeDetails, tobacco: e.target.value})}
                                        >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="pos-btn" disabled={isCalculating}>
                                {isCalculating ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Calculating Quotes...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-magnifying-glass"></i> Search Insurer Quotes
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {quotes && !selectedQuote && !issuedPolicyInfo && (
                        <div className="pos-quotes-list" data-aos="fade-up">
                            <div className="pos-section-title">
                                <span>Comparison & Quotes</span>
                                <button className="pos-btn pos-btn-secondary" onClick={() => setQuotes(null)}>
                                    Re-Calculate
                                </button>
                            </div>

                            {quotes.map(q => (
                                <div key={q.id} className="pos-quote-row">
                                    <div className="pos-quote-insurer">
                                        <div className={`pos-insurer-logo ${q.logo.toLowerCase()}`}>{q.logo}</div>
                                        <div className="pos-insurer-name">
                                            <h4>{q.insurer}</h4>
                                            <p>Covers instant digital issuance</p>
                                        </div>
                                    </div>
                                    <div className="pos-quote-price">
                                        <div className="pos-price-block">
                                            <h4>₹{q.prem.toLocaleString('en-IN')}</h4>
                                            <p>incl. GST | Est. Comm: ₹{Math.round(q.prem * q.commRate)}</p>
                                        </div>
                                        <button className="pos-btn" onClick={() => handleSelectQuote(q)}>
                                            Issue Policy
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedQuote && (
                        <form onSubmit={handleIssuePolicy} className="pos-form" data-aos="fade-up">
                            <div className="pos-section-title">
                                <span>Enter Customer & Issuance Details</span>
                                <button className="pos-btn pos-btn-secondary" onClick={() => setSelectedQuote(null)}>
                                    Back to Quotes
                                </button>
                            </div>
                            
                            <div className="form-group mb-3">
                                <label>Selected Insurer</label>
                                <input type="text" disabled className="pos-input" value={`${selectedQuote.insurer} - ₹${selectedQuote.prem.toLocaleString('en-IN')}`} />
                            </div>

                            <div className="pos-form-row">
                                <div className="form-group">
                                    <label>Customer Full Name *</label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="Amit Kumar" 
                                        className="pos-input"
                                        value={customerDetails.fullName}
                                        onChange={(e) => setCustomerDetails({...customerDetails, fullName: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Customer Email *</label>
                                    <input 
                                        required 
                                        type="email" 
                                        placeholder="customer@email.com" 
                                        className="pos-input"
                                        value={customerDetails.email}
                                        onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label>Customer Phone Number *</label>
                                <input 
                                    required 
                                    type="tel" 
                                    placeholder="9876543210" 
                                    className="pos-input"
                                    value={customerDetails.phone}
                                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                                />
                            </div>

                            <button type="submit" className="pos-btn">
                                <i className="fa-solid fa-circle-check"></i> Submit Payment & Issue Policy
                            </button>
                        </form>
                    )}

                    {issuedPolicyInfo && (
                        <div className="pos-certificate-container" data-aos="fade-up">
                            <div className="pos-section-title" style={{width: '100%'}}>
                                <span>Policy Certificate Issued Successfully!</span>
                            </div>

                            <div className="pos-cert-paper">
                                <div className="pos-cert-inner">
                                    <div className="pos-cert-header">
                                        <h2>PIB Insurance Brokers</h2>
                                        <p>Official Policy Certificate</p>
                                    </div>
                                    
                                    <p className="pos-cert-title">This document certifies that the policy has been successfully issued to:</p>
                                    <div className="pos-cert-name">{issuedPolicyInfo.customer}</div>
                                    
                                    <div className="pos-cert-body">
                                        <p>
                                            <strong>Policy ID:</strong> {issuedPolicyInfo.id} | <strong>Type:</strong> {issuedPolicyInfo.type}<br/>
                                            <strong>Insurer:</strong> {issuedPolicyInfo.insurer} | <strong>Premium Paid:</strong> ₹{issuedPolicyInfo.premium.toLocaleString('en-IN')}<br/>
                                            <strong>Date of Issuance:</strong> {issuedPolicyInfo.date} | <strong>Status:</strong> ACTIVE<br/>
                                            <strong>Customer Contact:</strong> {issuedPolicyInfo.email} / {issuedPolicyInfo.phone}
                                        </p>
                                    </div>

                                    <div className="pos-cert-footer">
                                        <div className="pos-cert-sign">PIB Underwriting</div>
                                        <div className="pos-cert-sign">Compliance Stamp</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 d-flex gap-3">
                                <button className="pos-btn" onClick={() => window.print()}>
                                    <i className="fa-solid fa-print"></i> Print Document
                                </button>
                                <button className="pos-btn pos-btn-secondary" onClick={() => setIssuedPolicyInfo(null)}>
                                    <i className="fa-solid fa-rotate-left"></i> Issue Another Policy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Commission Calculator Content */}
            {activeTab === 'commission' && (
                <div className="pos-tab-content">
                    <div className="pos-calc-card">
                        <form onSubmit={handleCommissionCalc}>
                            <div className="pos-section-title">
                                <span>Commission Calculator</span>
                            </div>

                            <div className="form-group mb-3">
                                <label>Premium Size (INR)</label>
                                <input 
                                    required 
                                    type="number" 
                                    placeholder="Premium in Rupees" 
                                    className="pos-input"
                                    value={calcPremium}
                                    onChange={(e) => setCalcPremium(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label>Policy Class</label>
                                <select 
                                    className="pos-select"
                                    value={calcClass}
                                    onChange={(e) => setCalcClass(e.target.value)}
                                >
                                    <option value="motor">Motor Insurance (15% payout)</option>
                                    <option value="health">Health Insurance (15% payout)</option>
                                    <option value="life">Term Life Insurance (25% payout)</option>
                                </select>
                            </div>

                            <button type="submit" className="pos-btn">
                                Calculate Commission
                            </button>
                        </form>

                        <div className="pos-calc-result-wrapper">
                            {calcResult ? (
                                <div className="pos-calc-result" data-aos="fade-left">
                                    <p>Estimated Payout (Gross)</p>
                                    <h2>₹{calcResult.commission.toLocaleString('en-IN')}</h2>
                                    
                                    <div className="pos-calc-detail mt-3" style={{width: '100%'}}>
                                        <span>TDS / GST Retained (18%):</span>
                                        <span>₹{calcResult.gst.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="pos-calc-detail" style={{width: '100%', borderTop: '1px solid rgba(255,255,255,0.08)', fontWeight: 'bold', color: '#10b981'}}>
                                        <span>Net Payout:</span>
                                        <span>₹{calcResult.totalPayout.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="pos-calc-result" style={{opacity: 0.5}}>
                                    <i className="fa-solid fa-calculator mb-3" style={{fontSize: '48px', color: '#94a3b8'}}></i>
                                    <p>Enter details and click calculate to view estimated agent payout.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Training Hub Tab Content */}
            {activeTab === 'training' && (
                <div className="pos-tab-content">
                    {!showCert ? (
                        <div className="pos-form">
                            <div className="pos-section-title">
                                <span>POSP Training & Certification (IRDAI Mandatory)</span>
                            </div>

                            <p style={{color: '#94a3b8', fontSize: '14px', marginBottom: '25px'}}>
                                To sell point of sale insurance policies under the IRDAI Guidelines, a POSP agent is required to complete 15 hours of basic training and clear the certification examination.
                            </p>

                            <div className="d-flex flex-column gap-3 mb-4">
                                {[
                                    { name: 'Module 1: Principles of Insurance & Risk Transfer', progress: '100%', hours: '5 Hours' },
                                    { name: 'Module 2: Motor OD & Third-Party Regulations', progress: '100%', hours: '5 Hours' },
                                    { name: 'Module 3: Code of Conduct & IRDAI POSP Guidelines', progress: '100%', hours: '5 Hours' }
                                ].map((mod, i) => (
                                    <div key={i} className="p-3 rounded" style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)'}}>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span style={{color: '#fff', fontSize: '14px', fontWeight: '700'}}>{mod.name}</span>
                                            <span style={{color: '#10b981', fontSize: '12px', fontWeight: '700'}}><i className="fa-solid fa-circle-check"></i> {mod.progress}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span style={{color: '#64748b', fontSize: '11px'}}>{mod.hours} Completed</span>
                                            <div style={{width: '120px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden'}}>
                                                <div style={{width: mod.progress, height: '100%', background: '#10b981'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="pos-btn" onClick={() => setShowCert(true)}>
                                <i className="fa-solid fa-award"></i> View & Download POSP Certificate
                            </button>
                        </div>
                    ) : (
                        <div className="pos-certificate-container" data-aos="fade-up">
                            <div className="pos-section-title" style={{width: '100%'}}>
                                <span>POSP Compliance Certificate</span>
                                <button className="pos-btn pos-btn-secondary" onClick={() => setShowCert(false)}>
                                    Back to Modules
                                </button>
                            </div>

                            <div className="pos-cert-paper">
                                <div className="pos-cert-inner">
                                    <div className="pos-cert-header">
                                        <h2>PIB Insurance Brokers</h2>
                                        <p>POSP Certification of Competency</p>
                                    </div>
                                    
                                    <p className="pos-cert-title">This is to certify that the IRDAI mandatory hours of training and examination has been completed by:</p>
                                    <div className="pos-cert-name">Rajesh Kumar</div>
                                    
                                    <div className="pos-cert-body">
                                        <p>
                                            having POSP Identification Number <strong>PIB-POSP-4082</strong>, thereby granting authorization to solicit and market designated insurance policies under Point of Sale Person (POSP) directives.
                                        </p>
                                    </div>

                                    <div className="pos-cert-footer">
                                        <div className="pos-cert-sign">Principal Officer</div>
                                        <div className="pos-cert-sign">IRDAI Registry</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button className="pos-btn" onClick={() => window.print()}>
                                    <i className="fa-solid fa-print"></i> Print Certificate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Login = () => {
    const [activePortal, setActivePortal] = useState(null); // 'client', 'employee', 'benefits', 'pos'
    const [isPosLoggedIn, setIsPosLoggedIn] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const portals = [
        {
            id: 'client',
            title: 'Client Login',
            subtitle: 'Access your commercial insurance policies and documents.',
            icon: 'fa-briefcase',
            type: 'modal',
            gradient: 'from-blue-500 to-indigo-600'
        },
        {
            id: 'employee',
            title: 'Employee Login',
            subtitle: 'Secure broker console, underwriting dashboard, and operations.',
            icon: 'fa-user-tie',
            type: 'modal',
            gradient: 'from-indigo-600 to-purple-600'
        },
        {
            id: 'benefits',
            title: 'Employee Benefits Login',
            subtitle: 'GMC & GTL employee wellness portals and health card downloads.',
            icon: 'fa-heart-pulse',
            type: 'modal',
            gradient: 'from-teal-500 to-emerald-600'
        },
        {
            id: 'pos',
            title: 'POS Login',
            subtitle: 'Point of Sale Person portal to issue policies, track commissions & leads.',
            icon: 'fa-people-group',
            type: 'modal',
            gradient: 'from-amber-500 to-orange-600'
        },
        {
            id: 'claim',
            title: 'Claim Register',
            subtitle: 'Submit a new commercial claim or check active claims advisory.',
            icon: 'fa-file-shield',
            type: 'link',
            path: '/claims',
            gradient: 'from-rose-500 to-orange-600'
        },
        {
            id: 'quote',
            title: 'Get Quote',
            subtitle: 'Request a customized risk quote from our underwriters.',
            icon: 'fa-calculator',
            type: 'link',
            path: '/contact',
            gradient: 'from-sky-500 to-cyan-600'
        }
    ];

    const handleOpenModal = (id) => {
        setActivePortal(id);
        setLoginSuccess(false);
        setErrorMsg('');
        setFormData({ username: '', password: '' });
        setShowPassword(false);
    };

    const handleCloseModal = () => {
        setActivePortal(null);
        setErrorMsg('');
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleCloseModal();
            }
        };
        if (activePortal) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activePortal]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // POS credentials validation
        if (activePortal === 'pos') {
            if (formData.username.trim().toLowerCase() !== 'agent@pib.com' || formData.password !== 'agent123') {
                setErrorMsg('Invalid agent credentials. Use agent@pib.com / agent123 for testing.');
                return;
            }
        }
        
        setErrorMsg('');
        setLoginSuccess(true);
        setTimeout(() => {
            if (activePortal === 'pos') {
                setIsPosLoggedIn(true);
            }
            handleCloseModal();
        }, 1500);
    };

    const getPortalTitle = (id) => {
        if (id === 'client') return 'Client Portal Access';
        if (id === 'employee') return 'Employee Broker Console';
        if (id === 'benefits') return 'Employee Benefits Hub';
        if (id === 'pos') return 'POSP Agent Login';
        return '';
    };

    return (
        <>
            <SEO
                title="Secure Login Portal | PIB Insurance"
                description="Secure login portal for client accounts, employee consoles, claims registration, instant quotes, and employee benefits portals."
                canonical="https://pibinsurance.in/login"
                noindex={true}
            />
            
            <div className="login-portal-page">
                {/* Visual Ambient Glows */}
                <div className="portal-glow portal-glow-1"></div>
                <div className="portal-glow portal-glow-2"></div>
                
                <div className="portal-container">
                    <div className="portal-back-wrap" data-aos="fade-right">
                        <Link to="/" className="portal-back-btn" aria-label="Back to Homepage">
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    <header className="portal-header text-center">
                        <span className="portal-badge">PIB PORTAL CONTROL</span>
                        <h1>Secure Login Directory</h1>
                        <p>Select the corresponding service portal below to access your PIB dashboard or submit requests.</p>
                    </header>

                    {isPosLoggedIn ? (
                        <PosDashboard onLogout={() => setIsPosLoggedIn(false)} />
                    ) : (
                        <div className="portal-grid">
                            {portals.map((portal) => (
                                <div key={portal.id} className="portal-card-wrap">
                                    {portal.type === 'modal' ? (
                                        <button 
                                            className={`portal-card card-${portal.id}`} 
                                            onClick={() => handleOpenModal(portal.id)}
                                            aria-label={`Open ${portal.title} portal`}
                                        >
                                            <div className="portal-icon-box">
                                                <i className={`fa-solid ${portal.icon}`}></i>
                                            </div>
                                            <h3>{portal.title}</h3>
                                            <p>{portal.subtitle}</p>
                                            <div className="portal-card-action">
                                                <span>Access Portal</span>
                                            </div>
                                        </button>
                                    ) : (
                                        <Link 
                                            to={portal.path} 
                                            className={`portal-card card-${portal.id}`}
                                            aria-label={`Navigate to ${portal.title}`}
                                        >
                                            <div className="portal-icon-box">
                                                <i className={`fa-solid ${portal.icon}`}></i>
                                            </div>
                                            <h3>{portal.title}</h3>
                                            <p>{portal.subtitle}</p>
                                            <div className="portal-card-action">
                                                <span>{portal.id === 'claim' ? 'Register Claim' : 'Request Quote'}</span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Glassmorphism Login Modal */}
                <AnimatePresence>
                    {activePortal && (
                        <div className="portal-modal-overlay">
                            <motion.div 
                                className="portal-modal-overlay-bg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handleCloseModal}
                            />
                            <motion.div 
                                className={`portal-modal-card modal-${activePortal}`}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                            >
                                <button className="portal-modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
                                    <i className="fa fa-times"></i>
                                </button>

                                <div className="portal-modal-header">
                                    <div className={`portal-modal-icon-badge badge-${activePortal}`}>
                                        <i className={`fa-solid ${portals.find(p => p.id === activePortal)?.icon}`}></i>
                                    </div>
                                    <h2>{getPortalTitle(activePortal)}</h2>
                                    <p>Please enter your enterprise credentials to authenticate.</p>
                                </div>

                                {loginSuccess ? (
                                    <div className="portal-modal-success-state">
                                        <div className="success-checkmark-wrapper">
                                            <i className="fa fa-circle-check success-check-icon"></i>
                                        </div>
                                        <h3>Authentication Successful</h3>
                                        <p>Redirecting to secure PIB workspace...</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="portal-modal-form">
                                        {errorMsg && (
                                            <div style={{
                                                background: 'rgba(239,68,68,0.1)', 
                                                border: '1px solid rgba(239,68,68,0.2)', 
                                                color: '#f87171', 
                                                fontSize: '13px', 
                                                padding: '10px 14px', 
                                                borderRadius: '10px',
                                                marginBottom: '10px'
                                            }}>
                                                {errorMsg}
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <label htmlFor="username">Username or Corporate Email</label>
                                            <div className="input-with-icon">
                                                <i className="fa fa-envelope input-icon"></i>
                                                <input 
                                                    type="text" 
                                                    id="username" 
                                                    name="username" 
                                                    required 
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    placeholder="name@company.com"
                                                    autoComplete="username"
                                                    className="portal-modal-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <div className="input-with-icon">
                                                <i className="fa fa-lock input-icon"></i>
                                                <input 
                                                    type={showPassword ? "text" : "password"} 
                                                    id="password" 
                                                    name="password" 
                                                    required 
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
                                                    className="portal-modal-input"
                                                />
                                                <button 
                                                    type="button" 
                                                    className="password-toggle-btn"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-options">
                                            <label className="remember-me">
                                                <input type="checkbox" name="remember" />
                                                <span>Remember me</span>
                                            </label>
                                            <a href="#forgot" className="forgot-pass" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                                        </div>

                                        {activePortal === 'pos' && (
                                            <div className="portal-modal-tip mt-2" style={{
                                                fontSize: '12px', 
                                                color: '#f59e0b', 
                                                background: 'rgba(245,158,11,0.05)', 
                                                padding: '12px', 
                                                borderRadius: '12px', 
                                                border: '1px dashed rgba(245,158,11,0.2)',
                                                lineHeight: '1.5'
                                            }}>
                                                <strong>Demo Agent Credentials:</strong><br/>
                                                Username: <code style={{color: '#fff'}}>agent@pib.com</code><br/>
                                                Password: <code style={{color: '#fff'}}>agent123</code>
                                            </div>
                                        )}

                                        <button type="submit" className={`portal-submit-btn btn-${activePortal}`}>
                                            <span>Authenticate Securely</span>
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Login;
