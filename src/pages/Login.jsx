import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/login.css';

const Login = () => {
    const [activePortal, setActivePortal] = useState(null); // 'client', 'employee', 'benefits'
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

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
        setFormData({ username: '', password: '' });
        setShowPassword(false);
    };

    const handleCloseModal = () => {
        setActivePortal(null);
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
        setLoginSuccess(true);
        setTimeout(() => {
            handleCloseModal();
        }, 1500);
    };

    const getPortalTitle = (id) => {
        if (id === 'client') return 'Client Portal Access';
        if (id === 'employee') return 'Employee Broker Console';
        return 'Employee Benefits Hub';
    };

    return (
        <>
            <SEO
                title="Secure Login Portal | PIB Insurance"
                description="Secure login portal for client accounts, employee consoles, claims registration, instant quotes, and employee benefits portals."
                canonical="https://pibinsurance.in/login"
            />
            
            <div className="login-portal-page">
                {/* Visual Ambient Glows */}
                <div className="portal-glow portal-glow-1"></div>
                <div className="portal-glow portal-glow-2"></div>
                
                <div className="portal-container">
                    <div className="portal-back-wrap" data-aos="fade-right">
                        <Link to="/" className="portal-back-btn" aria-label="Back to Homepage">
                            <i className="fa fa-arrow-left"></i>
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    <header className="portal-header text-center">
                        <span className="portal-badge">PIB PORTAL CONTROL</span>
                        <h1>Secure Login Directory</h1>
                        <p>Select the corresponding service portal below to access your PIB dashboard or submit requests.</p>
                    </header>

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
                                            <i className={`fa ${portal.icon}`}></i>
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
                                            <i className={`fa ${portal.icon}`}></i>
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
                                        <i className={`fa ${portals.find(p => p.id === activePortal)?.icon}`}></i>
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
