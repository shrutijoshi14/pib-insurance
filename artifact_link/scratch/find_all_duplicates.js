import fs from 'fs';

const cssContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/styles/style.css', 'utf8');

// A parser to find all rules with background-image: url(...)
// and split their selectors.
// We can find all matches of selectors and the background url.
// E.g., .selector1, .selector2 { background-image: url('url'); }
const regex = /([^{}]+)\{[^}]*background(?:-image)?:\s*url\('([^']+)'\)/g;
const urlGroups = {};
let match;
while ((match = regex.exec(cssContent)) !== null) {
    const selectors = match[1].split(',').map(s => s.trim()).filter(s => s.startsWith('.hero-'));
    const url = match[2];
    if (selectors.length === 0) continue;
    
    if (!urlGroups[url]) {
        urlGroups[url] = [];
    }
    urlGroups[url].push(...selectors);
}

console.log("All background image mappings (showing duplicates):");
for (const [url, classes] of Object.entries(urlGroups)) {
    if (classes.length > 1) {
        console.log(`- ${url} is used by: ${classes.join(', ')}`);
    }
}
