import { motion } from 'framer-motion';

export const MotionSection = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay, ease: [0.2, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const MotionItem = ({ children, className, delay = 0, variant = "fadeUp" }) => {
    const variants = {
        fadeUp: {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 }
        },
        zoomIn: {
            initial: { opacity: 0, scale: 0.92 },
            animate: { opacity: 1, scale: 1 }
        },
        fadeRight: {
            initial: { opacity: 0, x: -40 },
            animate: { opacity: 1, x: 0 }
        },
        fadeLeft: {
            initial: { opacity: 0, x: 40 },
            animate: { opacity: 1, x: 0 }
        }
    };

    const selected = variants[variant] || variants.fadeUp;

    return (
        <motion.div
            initial={selected.initial}
            whileInView={selected.animate}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay, ease: [0.2, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const MotionList = ({ children, className, stagger = 0.1 }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 1, 0.3, 1] } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
