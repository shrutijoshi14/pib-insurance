const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/Home.jsx',
    'src/pages/About.jsx',
    'src/pages/Contact.jsx',
    'src/pages/Industries.jsx',
    'src/pages/Insights.jsx',
    'src/pages/Claim.jsx',
    'src/pages/InsuranceDetail.jsx'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the hero section
    const heroRegex = /<section[^>]*?hero[^>]*?>([\s\S]*?)<\/section>/;
    const match = content.match(heroRegex);
    if (match) {
        let heroSection = match[0];
        // Remove data-aos and data-aos-delay from everything inside the hero
        let cleanedHero = heroSection.replace(/\sdata-aos="[^"]*"/g, '').replace(/\sdata-aos-delay="[^"]*"/g, '');
        // Replace MotionSection with div inside the hero
        cleanedHero = cleanedHero.replace(/<MotionSection/g, '<div').replace(/<\/MotionSection>/g, '</div>');
        cleanedHero = cleanedHero.replace(/<MotionItem/g, '<div').replace(/<\/MotionItem>/g, '</div>');
        
        content = content.replace(heroSection, cleanedHero);
    }

    fs.writeFileSync(file, content);
    console.log('Stripped AOS from Hero in: ' + file);
});
