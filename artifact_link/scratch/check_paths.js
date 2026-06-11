import fs from 'fs';

// Read Navbar.jsx
const navbarContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/components/Navbar.jsx', 'utf8');

// Read insuranceData.js
const dataContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/data/insuranceData.js', 'utf8');

// Match keys like 'key-name': {
const dataKeysRegex = /^\s{4}'([a-zA-Z0-9_-]+)'\s*:/gm;
const dataKeys = new Set();
let match;
while ((match = dataKeysRegex.exec(dataContent)) !== null) {
    dataKeys.add(match[1]);
}

// In Navbar.jsx, match all paths in products arrays
// e.g., { path: '/commercial-insurance/public-liability-insurance', ... }
const pathRegex = /path:\s*'([^']+)'/g;
const paths = [];
while ((match = pathRegex.exec(navbarContent)) !== null) {
    paths.push(match[1]);
}

console.log("Checking all navbar paths:");
let missingCount = 0;
for (const p of paths) {
    const parts = p.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    
    // Check if it is individual
    const isIndividual = p.includes('/individual-insurance/') || p.includes('/individual/');
    if (isIndividual) {
        // Individual pages use features search inside categories
        // Let's check if the category or feature matches
        // Wait, category is parent, e.g. life-insurance
        // Let's just check if it matches in the code
        continue;
    }
    
    if (!dataKeys.has(lastPart) && lastPart !== 'group-insurance' && lastPart !== 'commercial-insurance' && lastPart !== 'individual-insurance') {
        console.log(`Missing page data key for path: ${p} (Key checked: '${lastPart}')`);
        missingCount++;
    }
}
console.log(`Total missing commercial/group data keys: ${missingCount}`);
