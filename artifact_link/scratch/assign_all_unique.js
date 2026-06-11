import fs from 'fs';
import path from 'path';

// Define the assets directory and the clean style.css path
const assetsDir = 'e:/PIB Insurance/frontend-react/src/assets';
const cssPath = 'e:/PIB Insurance/frontend-react/src/styles/style.css';

// 1. Gather all photographic assets in src/assets
const cartoonAssets = [
    'Accidental-Insurance.png',
    'Fire-Insurance (1).png',
    'Health-Insurance.png',
    'Home-Insurance.png',
    'Liability-Insurance.png',
    'Marine-Insurance (1).png',
    'Motor-Insurance.png',
    'Property-Insurance.png',
    'Term-Insurance.png',
    'Travel-Insurance.png',
    'workmen-compensation.png',
    'employee-families.png',
    'group-personal-accident.png',
    'group-term-insurance.png',
    'group-travel-insurance.png',
    'group-health-insurance.png',
    'director-office-liability.png'
];

const allAssets = fs.readdirSync(assetsDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    const isImage = ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp';
    const isLogo = f.toLowerCase().includes('logo') || f === 'CEO.jpeg' || f.includes('rsized') || f === 'hero.png' || f === 'hero.jpeg' || f === 'hero-img.png';
    return isImage && !cartoonAssets.some(ca => ca.toLowerCase() === f.toLowerCase()) && !isLogo;
});

// We also manually include some specific high-res logo/CEO/rsized files as fallbacks if needed
const fallbackPhotos = [
    'CEO.jpeg',
    'Professional Photo rsized.png',
    'Professional Photo rsized.jpeg',
    'hero-img.png',
    'hero.jpeg',
    'benefits-bg-2.jpg'
];
const photoPool = Array.from(new Set([...allAssets, ...fallbackPhotos]));
console.log(`Total unique photographic assets in pool: ${photoPool.length}`);

// 2. Read the clean style.css to get all existing .hero- selectors and their definitions
let cssContent = fs.readFileSync(cssPath, 'utf8');
const selectorRegex = /(\.hero-[a-zA-Z0-9_-]+)\s*\{[^}]*background(?:-image)?:\s*url\(['"]?([^'")]+)['"]?\)[^}]*\}/g;

const existingSelectors = {};
let match;
while ((match = selectorRegex.exec(cssContent)) !== null) {
    const selector = match[1].trim();
    const imagePath = match[2];
    existingSelectors[selector] = path.basename(imagePath);
}
console.log(`Parsed ${Object.keys(existingSelectors).length} existing selectors from style.css.`);

// 3. Define the list of 59 child page selectors based on the submenus
const childPageSlugs = [
    // Life Subpages
    "term-insurance-plans",
    "whole-life-insurance-plans",
    "endowment-plans",
    "money-back-plans",
    "ulips-unit-linked-insurance-plans",
    "child-plans",
    "retirement-pension-plans",
    "participating-par-plans",
    "non-participating-non-par-plans",
    "guaranteed-income-return-plans",
    // Health Subpages
    "individual-health-insurance",
    "family-floater-health-insurance",
    "senior-citizen-health-insurance",
    "group-health-insurance",
    "critical-illness-insurance",
    "personal-accident-insurance",
    "top-up-health-insurance",
    "super-top-up-health-insurance",
    "disease-specific-health-insurance",
    "maternity-health-insurance",
    "hospital-cash-insurance",
    "opd-health-insurance",
    "personal-health-insurance-with-wellness-benefits",
    // Home Subpages
    "building-insurance-structure-insurance",
    "contents-insurance",
    "comprehensive-home-insurance",
    "fire-and-special-perils-insurance",
    "burglary-and-theft-insurance",
    "tenant-s-insurance",
    "landlord-insurance",
    "holiday-home-second-home-insurance",
    "bharat-griha-raksha-policy",
    // Motor Subpages
    "third-party-liability-insurance",
    "comprehensive-motor-insurance",
    "own-damage-od-insurance",
    "private-car-insurance",
    "two-wheeler-insurance",
    "commercial-vehicle-insurance",
    "passenger-carrying-vehicle-insurance",
    "goods-carrying-vehicle-insurance",
    "fleet-insurance",
    "motor-add-on-covers",
    // Travel Subpages
    "international-travel-insurance",
    "domestic-travel-insurance",
    "single-trip-travel-insurance",
    "multi-trip-annual-travel-insurance",
    "family-travel-insurance",
    "student-travel-insurance",
    "senior-citizen-travel-insurance",
    "corporate-travel-insurance",
    "group-travel-insurance",
    // Personal Accident Subpages
    "individual-personal-accident-insurance",
    "family-personal-accident-insurance",
    "group-personal-accident-insurance-gpa",
    "accidental-death-cover-ad",
    "permanent-total-disability-ptd",
    "permanent-partial-disability-ppd",
    "temporary-total-disability-ttd",
    "accident-medical-expense-cover"
];

const childSelectors = childPageSlugs.map(slug => `.hero-${slug}`);
console.log(`Adding ${childSelectors.length} individual child page selectors.`);

// Combine all selectors
const allSelectors = Array.from(new Set([
    ...Object.keys(existingSelectors),
    ...childSelectors
]));
allSelectors.sort();
console.log(`Total unique selectors to assign: ${allSelectors.length}`);

// 4. Implement semantic keyword matching heuristic
const keywords = {
    'motor': ['motor', 'car', 'vehicle', 'fleet', 'two-wheeler', 'passenger-carrying', 'goods-carrying'],
    'travel': ['travel', 'trip', 'domestic', 'international', 'tourist'],
    'accident': ['accident', 'death', 'disability', 'ptd', 'ppd', 'ttd', 'accidental'],
    'health': ['health', 'doctor', 'stethoscope', 'medical', 'hospital', 'illness', 'disease', 'maternity', 'wellness'],
    'home': ['home', 'house', 'building', 'structure', 'tenant', 'landlord', 'holiday-home', 'contents', 'fire', 'perils', 'burglary', 'griha'],
    'life': ['life', 'term', 'endowment', 'money-back', 'ulip', 'child-plans', 'retirement', 'pension', 'guaranteed-income', 'non-par', 'par-plans']
};

const getCategory = (selector) => {
    const s = selector.toLowerCase();
    for (const [cat, words] of Object.entries(keywords)) {
        if (words.some(word => s.includes(word))) {
            return cat;
        }
    }
    return 'general';
};

const getImageCategory = (filename) => {
    const f = filename.toLowerCase();
    for (const [cat, words] of Object.entries(keywords)) {
        if (words.some(word => f.includes(word))) {
            return cat;
        }
    }
    return 'general';
};

// Map each photo in the pool to its category
const categorizedPhotos = {};
photoPool.forEach(photo => {
    const cat = getImageCategory(photo);
    if (!categorizedPhotos[cat]) {
        categorizedPhotos[cat] = [];
    }
    categorizedPhotos[cat].push(photo);
});

console.log("\nCategorized photos in pool:");
for (const [cat, list] of Object.entries(categorizedPhotos)) {
    console.log(`- ${cat}: ${list.length} photos`);
}

// 5. Match selectors to photos
const finalAssignments = {};
const assignedPhotos = new Set();

// Strict pre-assigned forceMap for dedicated photographic assets
const forceMap = {
    // Liability Mappings
    '.hero-product-liability': 'product-liability-hero.png',
    
    // Travel Mappings
    '.hero-student-travel-insurance': 'student-travel-hero.png',
    '.hero-single-trip-travel-insurance': 'featured-1.png',
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
    '.hero-holiday-home-second-home-insurance': 'specialized-risk-covers-hero.jpg',
    '.hero-bharat-griha-raksha-policy': 'Professional Photo rsized.jpeg',
    '.hero-contact': 'get-insurance-two-img-1.jpg',
    
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

for (const [selector, imageName] of Object.entries(forceMap)) {
    if (allSelectors.includes(selector)) {
        if (photoPool.includes(imageName)) {
            finalAssignments[selector] = imageName;
            assignedPhotos.add(imageName);
        } else {
            console.warn(`WARNING: Force-mapped image ${imageName} for ${selector} is not in the photo pool!`);
        }
    }
}
console.log(`Applied ${assignedPhotos.size} force-mapped assignments.`);

// First pass: Assign selectors that have a very close match in filename or can keep their clean original mapping if unique
const cleanImageUsage = {};
Object.entries(existingSelectors).forEach(([sel, img]) => {
    if (!cleanImageUsage[img]) cleanImageUsage[img] = [];
    cleanImageUsage[img].push(sel);
});

// If the clean image is used by only 1 selector in clean style.css, keep it!
for (const [sel, img] of Object.entries(existingSelectors)) {
    if (finalAssignments[sel]) continue; // already force-mapped
    if (assignedPhotos.has(img)) continue; // image already assigned
    
    if (cleanImageUsage[img].length === 1 && photoPool.includes(img)) {
        finalAssignments[sel] = img;
        assignedPhotos.add(img);
    }
}
console.log(`Kept ${assignedPhotos.size - Object.keys(forceMap).length} unique baseline mappings from clean style.css.`);

// Sort remaining selectors to assign: we want to assign category-specific ones first
const remainingSelectors = allSelectors.filter(sel => !finalAssignments[sel]);
remainingSelectors.sort((a, b) => {
    const catA = getCategory(a);
    const catB = getCategory(b);
    if (catA === 'general' && catB !== 'general') return 1;
    if (catA !== 'general' && catB === 'general') return -1;
    return a.localeCompare(b);
});

// Second pass: Assign remaining selectors to category-matching photos
for (const selector of remainingSelectors) {
    const cat = getCategory(selector);
    
    // Find an available photo in the same category
    let foundPhoto = null;
    if (categorizedPhotos[cat]) {
        foundPhoto = categorizedPhotos[cat].find(photo => !assignedPhotos.has(photo));
    }
    
    // Fallback to general category or any category
    if (!foundPhoto) {
        // Search in general first
        if (categorizedPhotos['general']) {
            foundPhoto = categorizedPhotos['general'].find(photo => !assignedPhotos.has(photo));
        }
    }
    
    // Final fallback: any available photo
    if (!foundPhoto) {
        foundPhoto = photoPool.find(photo => !assignedPhotos.has(photo));
    }
    
    if (foundPhoto) {
        finalAssignments[selector] = foundPhoto;
        assignedPhotos.add(foundPhoto);
    } else {
        console.error(`ERROR: No more unique photos available for ${selector}!`);
    }
}

console.log(`\nSuccessfully assigned all ${Object.keys(finalAssignments).length} selectors.`);

// 6. Verify uniqueness
const assignedList = Object.values(finalAssignments);
const uniqueAssigned = new Set(assignedList);
console.log(`Verification: Total selectors: ${Object.keys(finalAssignments).length}, Unique images assigned: ${uniqueAssigned.size}`);
if (Object.keys(finalAssignments).length !== uniqueAssigned.size) {
    console.error("CRITICAL ERROR: Duplicates found in assignment!");
    // List duplicates
    const counts = {};
    assignedList.forEach(img => {
        counts[img] = (counts[img] || 0) + 1;
    });
    for (const [img, count] of Object.entries(counts)) {
        if (count > 1) {
            const sels = Object.entries(finalAssignments).filter(([sel, i]) => i === img).map(([sel]) => sel);
            console.error(`- ${img} is assigned to: ${sels.join(', ')}`);
        }
    }
    process.exit(1);
} else {
    console.log("Verification passed: 100% unique assignments!");
}

// 7. Write the updated rules to style.css
// For existing selectors, we replace their rule in cssContent.
// For new child selectors, we append them to the end of style.css.
let updatedCss = cssContent;

// Separate existing vs new child selectors
const existingSelsToReplace = Object.keys(existingSelectors);
const newSelsToAppend = childSelectors.filter(sel => !existingSelsToReplace.includes(sel));

// Replace existing selectors in-place
for (const selector of existingSelsToReplace) {
    const imageName = finalAssignments[selector];
    const escapedSelector = selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const ruleRegex = new RegExp(`(${escapedSelector}\\s*\\{[^}]*background(?:-image)?:\\s*url\\(')(\\.\\.\\/assets\\/[^']+)('\\)[^}]*\\})`, 'g');
    
    updatedCss = updatedCss.replace(ruleRegex, (match, prefix, oldUrl, suffix) => {
        return `${prefix}../assets/${imageName}${suffix}`;
    });
}

// Append new child selectors to the end of the file with appropriate formatting
let newRules = '\n\n/* Individual Insurance Child Pages Custom Hero Backgrounds */\n';
newSelsToAppend.forEach(selector => {
    const imageName = finalAssignments[selector];
    newRules += `${selector} {\n  background-image: url('../assets/${imageName}') !important;\n}\n`;
});

updatedCss += newRules;

fs.writeFileSync(cssPath, updatedCss, 'utf8');
console.log(`\nSuccessfully wrote all changes to style.css. Added ${newSelsToAppend.length} child page rules.`);
