import fs from 'fs';
import path from 'path';

let cssContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/styles/style.css', 'utf8');

const newMappings = {
    // Category Hubs & Main pages
    '.hero-about': 'group-meeting.png',
    '.hero-contact': 'group-meeting-hero.png',
    '.hero-health': 'benefits-bg-2.jpg',
    '.hero-life': 'term-insurance.jpg',
    '.hero-motor': 'motor-insurance.jpg',
    '.hero-travel': 'travel-insurance.jpg',
    '.hero-accidental': 'accidental-insurance.jpg',
    '.hero-home': 'individual-home-insurance.jpg',
    '.hero-property-hub': 'insurance-guides-1.jpg',
    '.hero-motor-hub': 'motor-fleet-insurance-hero.jpg',
    '.hero-claim': 'claims-advisory-hero.png',
    '.hero-industries': 'featured-3.jpg',

    // Group Insurance
    '.hero-group-health-insurance': 'group-insurance-2.png',
    '.hero-group-term': 'group-meeting-hero.png',
    '.hero-group-personal-accident-insurance-gpa': 'employee-benefits-hero.png',
    
    // Life Subpages
    '.hero-term-insurance-plans': 'term-insurance-plans-hero.png',
    '.hero-whole-life-insurance-plans': 'whole-life-insurance-plans-hero.png',
    '.hero-child-plans': 'endowment-plans-hero-unique.png',
    '.hero-guaranteed-income-return-plans': 'CEO.jpeg',
    '.hero-non-participating-non-par-plans': 'guaranteed-return-hero.png',
    
    // Health Subpages
    '.hero-individual-health-insurance': 'health-insurance.jpg',
    '.hero-super-top-up-health-insurance': 'critical-illness-hero-2.png',
    '.hero-disease-specific-health-insurance': 'senior-citizen-health-hero-2.png',
    '.hero-personal-health-insurance-with-wellness-benefits': 'maternity-health-hero-2.png',
    '.hero-accident-medical-expense-cover': 'group-accident-hero-unique.png',
    
    // Home Subpages
    '.hero-building-insurance-structure-insurance': 'commercial-property-insurance.png',
    '.hero-comprehensive-home-insurance': 'comprehensive-home-insurance-hero.png',
    '.hero-landlord-insurance': 'hero.jpeg',
    '.hero-bharat-griha-raksha-policy': 'Professional Photo rsized.jpeg',
    '.hero-contents-insurance': 'family-insurance.png',
    '.hero-fire-and-special-perils-insurance': 'fire-insurance.png',
    '.hero-office-package': 'Professional Photo rsized.png',
    
    // Motor Subpages
    '.hero-third-party-liability-insurance': 'homepage-hero-unique.png',
    '.hero-comprehensive-motor-insurance': 'motor-fleet-insurance-hero.png',
    '.hero-commercial-vehicle-insurance': 'product-liability-hero-unique.png',
    '.hero-fleet-insurance': 'motor-fleet-hero-unique.png',
    '.hero-goods-carrying-vehicle-insurance': 'marine-insurance.png',
    '.hero-own-damage-od-insurance': 'hero-img.png',
    '.hero-passenger-carrying-vehicle-insurance': 'retirement-plans-hero-unique.png',
    '.hero-motor-add-on-covers': 'two-wheeler-hero-2.png',
    
    // Travel Subpages
    '.hero-international-travel-insurance': 'specialized-risk-hero-unique.png',
    '.hero-domestic-travel-insurance': 'hero-video-poster.jpg',
    
    // Personal Accident Subpages
    '.hero-individual-personal-accident-insurance': 'security-privacy-hero.png',
    '.hero-family-personal-accident-insurance': 'group-personal-accident-hero.png',
    '.hero-burglary-and-theft-insurance': 'Professional Photo rsized.jpeg'
};

// Apply all the replacements to cssContent string first
for (const [selector, imageName] of Object.entries(newMappings)) {
    const escapedSelector = selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const ruleRegex = new RegExp(`(${escapedSelector}\\s*\\{[^}]*background(?:-image)?:\\s*url\\(')(\\.\\.\\/assets\\/[^']+)('\\)[^}]*\\})`, 'g');
    
    cssContent = cssContent.replace(ruleRegex, (match, prefix, oldUrl, suffix) => {
        const newUrl = `../assets/${imageName}`;
        return `${prefix}${newUrl}${suffix}`;
    });
}

// Verify duplication inside the updated cssContent BEFORE writing
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
        console.log(`VERIFICATION FAILED - DUPLICATE FOUND: Image "${image}" is shared by: ${selectors.join(', ')}`);
        duplicateCount++;
    }
}

if (duplicateCount === 0) {
    console.log("VERIFICATION SUCCESSFUL - ZERO DUPLICATES FOUND! Writing to style.css...");
    fs.writeFileSync('e:/PIB Insurance/frontend-react/src/styles/style.css', cssContent, 'utf8');
    console.log("style.css updated successfully.");
} else {
    console.log("Verification failed, style.css NOT written. Please fix duplicate assignments.");
}
