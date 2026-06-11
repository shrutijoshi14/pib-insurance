import fs from 'fs';
import path from 'path';

const cssContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/styles/style.css', 'utf8');

// Use a regex to find all selectors and their background image URLs, allowing whitespace and !important
// Selector pattern matches class names like .hero-something
const regex = /\.hero-[a-zA-Z0-9_-]+\s*\{[^}]*background(?:-image)?:\s*url\(['"]?([^'")]+)['"]?\)[^}]*\}/g;

const urlGroups = {};
let match;
while ((match = regex.exec(cssContent)) !== null) {
    const fullRule = match[0];
    const imageUrl = match[1];
    
    // Find the selector from the rule
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

console.log("--- Grouped Hero Selectors by Background Image ---");
let duplicateCount = 0;
for (const [image, selectors] of Object.entries(urlGroups)) {
    if (selectors.length > 1) {
        console.log(`DUPLICATE: Image "${image}" is shared by: ${selectors.join(', ')}`);
        duplicateCount++;
    } else {
        console.log(`Unique: Image "${image}" -> ${selectors[0]}`);
    }
}

console.log(`\nTotal unique image assets mapped: ${Object.keys(urlGroups).length}`);
console.log(`Total duplicate groups: ${duplicateCount}`);
