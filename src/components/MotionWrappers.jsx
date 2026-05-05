export const MotionSection = ({ children, className, delay = 0 }) => {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={delay * 1000}
            className={className}
        >
            {children}
        </div>
    );
};

export const MotionItem = ({ children, className, delay = 0, variant = "fadeUp" }) => {
    const aosVariants = {
        fadeUp: "fade-up",
        zoomIn: "zoom-in",
        fadeRight: "fade-right",
        fadeLeft: "fade-left",
        textReveal: "fade-up"
    };

    const selectedAos = aosVariants[variant] || "fade-up";

    return (
        <div
            data-aos={selectedAos}
            data-aos-delay={delay * 1000}
            className={className}
        >
            {children}
        </div>
    );
};

export const MotionList = ({ children, className, stagger = 0.1 }) => {
    // AOS doesn't natively do staggered children from a parent wrapper easily 
    // unless we map over children and inject delays, but React children iteration 
    // can be tricky. We will just return a div with standard fade-up and let 
    // child MotionItems handle their own delays if provided.
    return (
        <div
            data-aos="fade-up"
            className={className}
        >
            {children}
        </div>
    );
};
