import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionSection, MotionItem, MotionList } from '../components/MotionWrappers';
import { industryData } from '../data/industryData';
import SEO from '../components/SEO';

const Industries = () => {
    const [selectedIndustry, setSelectedIndustry] = useState(null);

    const openModal = (type) => {
        setSelectedIndustry(industryData[type]);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedIndustry(null);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        if (selectedIndustry) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndustry]);

    return (
        <>
            <SEO 
                title="Industries We Serve | Tailored Corporate Risk Solutions" 
                description="PIB Insurance provides specialized risk management and insurance solutions tailored to the unique challenges of your industry."
                canonical="https://pibinsurance.in/industries"
            />
            <section className="insurance-hero hero-industries">
                <div className="industries-hero-container">
                    <MotionSection className="industries-hero-content">
                        <div className="hero-header-row">
                            <h1>Industries We Serve</h1>
                            <div className="hero-header-divider"></div>
                            <div className="hero-header-info">Dedicated Sector Expertise</div>
                        </div>
                        <p>Providing specialized risk management and insurance solutions tailored to the unique challenges of every industry across India.</p>
                        <div className="breadcrumb-custom">HOME / OUR INDUSTRIES</div>
                    </MotionSection>
                </div>
            </section>

            {/* INTRO SECTION */}
            <MotionSection className="industries-intro py-5">
                <div className="container text-center">
                    <p className="intro-text">PIB Insurance brokers, helping SMEs and MSMe for a long time to protect their valuable assets. Being in transport or in offices. We serve the following industries.</p>
                </div>
            </MotionSection>

            {/* INDUSTRIES GRID */}
            <section className="industries-section py-5">
                <div className="container">
                    <MotionList className="row g-4" id="industriesGrid" stagger={0.08}>
                        {Object.keys(industryData).map((key) => {
                            const industry = industryData[key];
                            return (
                                <MotionItem key={key} className="col-md-6 col-lg-3" inherit>
                                    <div 
                                        className="industry-card" 
                                        onClick={() => openModal(key)}
                                        role="button" 
                                        aria-label={`View ${industry.title} insurance details`}
                                    >
                                        <div className="icon-wrap">
                                            <i className={`fa-solid ${industry.icon}`}></i>
                                        </div>
                                        <h4>{industry.title}</h4>
                                        <div className="card-overlay">
                                            <span>View Details <i className="fa-solid fa-arrow-right"></i></span>
                                        </div>
                                    </div>
                                </MotionItem>
                            );
                        })}
                    </MotionList>
                </div>
            </section>

            {/* INDUSTRY MODAL */}
            <AnimatePresence>
                {selectedIndustry && (
                    <motion.div 
                        className="industry-modal active" 
                        id="industryModal" 
                        onClick={closeModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="modal-content" 
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="modal-header">
                                <div className="modal-header-left">
                                    <div className="modal-icon" id="modalIcon">
                                        <i className={`fa-solid ${selectedIndustry.icon}`}></i>
                                    </div>
                                    <h2 id="modalTitle">{selectedIndustry.title}</h2>
                                </div>
                                <button className="modal-close" id="modalClose" aria-label="Close modal" onClick={closeModal}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div 
                                    className="modal-desc" 
                                    id="modalDesc" 
                                    dangerouslySetInnerHTML={{ __html: selectedIndustry.desc }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Industries;
