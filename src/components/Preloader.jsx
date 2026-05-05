import { motion } from 'framer-motion';

const Preloader = () => {
    return (
        <div className="pib-preloader">
            <div className="preloader-content">
                <motion.div 
                    className="preloader-logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                        scale: [0.8, 1.1, 1],
                        opacity: 1 
                    }}
                    transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="PIB Insurance Brokers Logo" width="200" height="60" />
                </motion.div>
                <div className="preloader-bar">
                    <motion.div 
                        className="preloader-progress"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Preloader;
