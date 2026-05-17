import React, { useEffect, useState } from 'react';
import '../styles/contact.css';

const SuccessModal = ({ isOpen, onClose, countdown = 3 }) => {
    const [timeLeft, setTimeLeft] = useState(countdown);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(timer);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="success-modal-overlay">
            <div className="success-modal-content" data-aos="zoom-in">
                <div className="cinematic-success">
                    <div className="success-icon-wrapper">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <div className="success-content">
                        <h4>Form Submitted Successfully!</h4>
                        <p>We have received your details. Our insurance experts will get back to you shortly.</p>
                        
                        <div className="redirect-status">
                            <div className="progress-loader">
                                <div className="progress-fill" style={{ animationDuration: `${countdown}s` }}></div>
                            </div>
                            <span>Redirecting to confirmation page in {timeLeft}s...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
