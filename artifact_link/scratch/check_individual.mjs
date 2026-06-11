import { insuranceData } from 'file:///e:/PIB Insurance/frontend-react/src/data/insuranceData.js';
import fs from 'fs';

// Read Navbar.jsx
const navbarContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/components/Navbar.jsx', 'utf8');

const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Match all paths in products arrays in Navbar.jsx
const pathRegex = /path:\s*'([^']+)'/g;
const paths = [];
let match;
while ((match = pathRegex.exec(navbarContent)) !== null) {
    paths.push(match[1]);
}

const individualCategoryKeys = [
    'life-insurance',
    'health-insurance',
    'home-insurance',
    'motor-insurance',
    'travel-insurance',
    'accidental-insurance'
];

console.log("Checking individual paths:");
let missingCount = 0;
let checkedCount = 0;

for (const p of paths) {
    const isIndividual = p.includes('/individual-insurance/') || p.includes('/individual/');
    if (!isIndividual) continue;
    
    const parts = p.split('/').filter(Boolean);
    const dataKey = parts[parts.length - 1];
    
    // Skip category pages themselves
    if (individualCategoryKeys.includes(dataKey)) {
        continue;
    }
    
    checkedCount++;
    let found = false;
    for (const catKey of individualCategoryKeys) {
        const cat = insuranceData[catKey];
        if (cat && cat.features) {
            const matchedFeature = cat.features.find(f => slugify(f.title) === dataKey);
            if (matchedFeature) {
                found = true;
                break;
            }
        }
    }
    
    if (!found) {
        console.log(`Missing individual feature data for path: ${p} (Key checked: '${dataKey}')`);
        missingCount++;
    }
}

console.log(`Checked ${checkedCount} individual paths. Missing: ${missingCount}`);
