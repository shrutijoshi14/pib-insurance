import fs from 'fs';
import path from 'path';

const cssContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/styles/style.css', 'utf8');
const regex = /(\.hero-[a-zA-Z0-9_-]+)\s*\{[^}]*background(?:-image)?:\s*url\(['"]?([^'")]+)['"]?\)[^}]*\}/g;

const mappings = [];
let match;
while ((match = regex.exec(cssContent)) !== null) {
    mappings.push({
        selector: match[1].trim(),
        image: path.basename(match[2])
    });
}

// Print sorted by selector
mappings.sort((a, b) => a.selector.localeCompare(b.selector));
console.log(JSON.stringify(mappings, null, 2));
console.log(`Total mappings: ${mappings.length}`);
