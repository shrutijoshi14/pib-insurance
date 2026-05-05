const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Replace cards
let cardIndex = 0;
content = content.replace(/<div className="card">/g, () => {
    cardIndex++;
    return `<div className="card" data-aos="fade-up" data-aos-delay="${((cardIndex - 1) % 9 + 1) * 100}">`;
});

// Replace process steps
let processIndex = 0;
content = content.replace(/<div className="process-step">/g, () => {
    processIndex++;
    return `<div className="process-step" data-aos="fade-up" data-aos-delay="${((processIndex - 1) % 4 + 1) * 100}">`;
});

// Replace insight cards
let insightIndex = 0;
content = content.replace(/className={`insight-card /g, () => {
    insightIndex++;
    return `data-aos="fade-up" data-aos-delay="${((insightIndex - 1) % 4 + 1) * 100}" className={\`insight-card `;
});

// Replace testimonial cards
let testIndex = 0;
content = content.replace(/<div className="testimonial-card">/g, () => {
    testIndex++;
    return `<div className="testimonial-card" data-aos="fade-up" data-aos-delay="${((testIndex - 1) % 3 + 1) * 100}">`;
});

fs.writeFileSync('src/pages/Home.jsx', content);
