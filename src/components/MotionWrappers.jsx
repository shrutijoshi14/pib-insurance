import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    },
    fadeRight: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    },
    fadeLeft: {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 }
    },
    zoomIn: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    }
};

export const MotionSection = ({ children, className, delay = 0, component = "div" }) => {
    const Component = motion[component] || motion.div;
    
    return (
        <Component
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants.fadeUp}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </Component>
    );
};

export const MotionItem = ({ children, className, delay = 0, variant = "fadeUp", component = "div", onClick, inherit = false }) => {
    const Component = motion[component] || motion.div;
    const selectedVariant = variants[variant] || variants.fadeUp;

    return (
        <Component
            initial={inherit ? undefined : "hidden"}
            whileInView={inherit ? undefined : "visible"}
            viewport={inherit ? undefined : { once: true, margin: "-50px" }}
            variants={selectedVariant}
            transition={inherit ? undefined : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            onClick={onClick}
        >
            {children}
        </Component>
    );
};

export const MotionList = ({ children, className, stagger = 0.1, component = "div", delay = 0 }) => {
    const Component = motion[component] || motion.div;

    return (
        <Component
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay
                    }
                }
            }}
            className={className}
        >
            {/* We can't easily inject 'inherit' prop to children here without React.Children.map, 
                so we'll leave it to the user to pass 'inherit' to MotionItem when inside MotionList. */}
            {children}
        </Component>
    );
};
