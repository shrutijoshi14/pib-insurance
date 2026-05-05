const fs = require('fs');
const path = require('path');

const filesToAnimate = [
    'src/pages/About.jsx',
    'src/pages/Contact.jsx',
    'src/pages/Industries.jsx',
    'src/pages/Insights.jsx',
    'src/pages/Claim.jsx',
    'src/pages/InsuranceDetail.jsx',
    'src/components/Footer.jsx'
];

filesToAnimate.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Add AOS to sections
    content = content.replace(/<section([^>]*?)>/g, (match, attrs) => {
        if (attrs.includes('data-aos')) return match;
        return `<section${attrs} data-aos="fade-up">`;
    });

    // Add AOS to headings and paragraphs in sections
    content = content.replace(/<(h[1-2]|p)([^>]*?)>/g, (match, tag, attrs) => {
        if (attrs.includes('data-aos')) return match;
        // Basic stagger for text
        return `<${tag}${attrs} data-aos="fade-up" data-aos-delay="200">`;
    });

    // Specific staggering for common card patterns
    const cards = [
        'card', 'industry-card', 'insight-card', 'testimonial-card', 'why-box', 
        'col-lg-4', 'col-md-6', 'col-lg-3', 'col-md-4', 'process-step', 'contact-box', 'footer-col',
        'location-item', 'office', 'info-card', 'mv-box', 'promise-card'
    ];

    cards.forEach(cardClass => {
        let index = 0;
        // Match className="card" or className={`card ...`}
        const regex = new RegExp(`class(Name)?={?["'\`]${cardClass}([^"'\`]*)["'\`]}?`, 'g');
        content = content.replace(regex, (match) => {
            if (match.includes('data-aos')) return match;
            index++;
            const delay = (index % 6) * 100 + 100;
            return `data-aos="fade-up" data-aos-delay="${delay}" ${match}`;
        });
    });

    fs.writeFileSync(filePath, content);
    console.log(`Animated: ${filePath}`);
});
