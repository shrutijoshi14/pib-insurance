import fs from 'fs';
import path from 'path';

const cssPath = 'e:/PIB Insurance/frontend-react/src/styles/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Specific corrected mappings to overwrite in style.css
const corrections = {
    // Liability Mappings
    '.hero-product-liability': 'product-liability-hero.png',
    
    // Travel Mappings
    '.hero-single-trip-travel-insurance': 'featured-1.png',
    '.hero-student-travel-insurance': 'student-travel-hero.png',
    '.hero-corporate-travel-insurance': 'market-updates-1.jpg',
    '.hero-group-travel-insurance': 'market-updates-2.jpg',
    '.hero-international-travel-insurance': 'travel-insurance.jpg',
    '.hero-domestic-travel-insurance': 'travel-insurance-misc-hero.jpg',
    '.hero-family-travel-insurance': 'employee-families-hero.png',
    
    // Health Mappings
    '.hero-maternity-health-insurance': 'maternity-health-hero.png',
    '.hero-personal-health-insurance-with-wellness-benefits': 'maternity-health-hero-2.png',
    '.hero-senior-citizen-health-insurance': 'senior-citizen-health-hero.png',
    '.hero-disease-specific-health-insurance': 'senior-citizen-health-hero-2.png',
    '.hero-critical-illness-insurance': 'critical-illness-hero.png',
    '.hero-super-top-up-health-insurance': 'critical-illness-hero-2.png',
    '.hero-individual-health-insurance': 'health-insurance.jpg',
    '.hero-health': 'benefits-bg-2.jpg',
    '.hero-hospital-cash-insurance': 'client-stories-2.jpg',
    '.hero-opd-health-insurance': 'regulatory-updates-1.jpg',
    
    // Home Mappings
    '.hero-comprehensive-home-insurance': 'comprehensive-home-insurance-hero.png',
    '.hero-building-insurance-structure-insurance': 'commercial-property-insurance.png',
    '.hero-contents-insurance': 'family-insurance.png',
    '.hero-fire-and-special-perils-insurance': 'fire-insurance.png',
    '.hero-burglary-and-theft-insurance': 'burglary-insurance-hero.jpg',
    '.hero-tenant-s-insurance': 'featured-2.png',
    '.hero-landlord-insurance': 'hero.jpeg',
    '.hero-holiday-home-second-home-insurance': 'get-insurance-two-img-1.jpg',
    '.hero-bharat-griha-raksha-policy': 'Professional Photo rsized.jpeg',
    
    // Life Mappings
    '.hero-child-plans': 'endowment-plans-hero-unique.png',
    '.hero-endowment-plans': 'endowment-plans-hero.png',
    '.hero-term-insurance-plans': 'term-insurance-plans-hero.png',
    '.hero-whole-life-insurance-plans': 'whole-life-insurance-plans-hero.png',
    '.hero-retirement-pension-plans': 'retirement-plans-hero-unique.png',
    
    // Motor Mappings
    '.hero-two-wheeler-insurance': 'two-wheeler-hero.png',
    '.hero-motor-add-on-covers': 'two-wheeler-hero-2.png',
    '.hero-comprehensive-motor-insurance': 'motor-fleet-insurance-hero.png',
    '.hero-fleet-insurance': 'motor-fleet-hero-unique.png',
    '.hero-passenger-carrying-vehicle-insurance': 'passenger-carrying-vehicle-hero.jpg',
    '.hero-goods-carrying-vehicle-insurance': 'marine-insurance.png',
    '.hero-own-damage-od-insurance': 'hero-img.png',
    '.hero-third-party-liability-insurance': 'homepage-hero-unique.png',
    '.hero-commercial-vehicle-insurance': 'product-liability-hero-unique.png',
    
    // Accident Mappings
    '.hero-individual-personal-accident-insurance': 'accidental-insurance.jpg',
    '.hero-family-personal-accident-insurance': 'group-personal-accident-hero.png',
    '.hero-accident-medical-expense-cover': 'group-accident-hero-unique.png'
};

// Apply corrections
for (const [selector, imageName] of Object.entries(corrections)) {
    const escapedSelector = selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const ruleRegex = new RegExp(`(${escapedSelector}\\s*\\{[^}]*background(?:-image)?:\\s*url\\(')(\\.\\.\\/assets\\/[^']+)('\\)[^}]*\\})`, 'g');
    
    cssContent = cssContent.replace(ruleRegex, (match, prefix, oldUrl, suffix) => {
        const newUrl = `../assets/${imageName}`;
        return `${prefix}${newUrl}${suffix}`;
    });
}

// Verification
const verifyRegex = /\.hero-[a-zA-Z0-9_-]+\s*\{[^}]*background(?:-image)?:\s*url\(['"]?([^'")]+)['"]?\)[^}]*\}/g;
const urlGroups = {};
let match;
while ((match = verifyRegex.exec(cssContent)) !== null) {
    const fullRule = match[0];
    const imageUrl = match[1];
    
    const selectorMatch = /^\s*(\.hero-[a-zA-Z0-9_-]+)/.exec(fullRule);
    if (selectorMatch) {
        const selector = selectorMatch[1].trim();
        const baseName = path.basename(imageUrl);
        if (!urlGroups[baseName]) {
            urlGroups[baseName] = [];
        }
        if (!urlGroups[baseName].includes(selector)) {
            urlGroups[baseName].push(selector);
        }
    }
}

let duplicateCount = 0;
for (const [image, selectors] of Object.entries(urlGroups)) {
    if (selectors.length > 1) {
        console.log(`DUPLICATE FOUND: Image "${image}" is shared by: ${selectors.join(', ')}`);
        duplicateCount++;
    }
}

if (duplicateCount === 0) {
    console.log("VERIFICATION SUCCESSFUL - ZERO DUPLICATES FOUND! Writing to style.css...");
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    console.log("style.css updated successfully.");
} else {
    console.log("Verification failed, style.css NOT written. Please resolve duplicate groups.");
}
