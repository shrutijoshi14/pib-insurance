import fs from 'fs';
import path from 'path';

const assetsDir = 'e:/PIB Insurance/frontend-react/src/assets';
const cssContent = fs.readFileSync('e:/PIB Insurance/frontend-react/src/styles/style.css', 'utf8');

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
    return isImage && !cartoonAssets.some(ca => ca.toLowerCase() === f.toLowerCase());
});

const usedImages = new Set();
// Find all references to assets in style.css
const regex = /url\('\.\.\/assets\/([^']+)'\)/g;
let match;
while ((match = regex.exec(cssContent)) !== null) {
    usedImages.add(match[1]);
}

console.log(`Total photographic assets found: ${allAssets.length}`);
console.log(`Used assets in style.css: ${usedImages.size}`);

const unusedAssets = allAssets.filter(asset => !usedImages.has(asset));
console.log("\nUnused photographic assets:");
unusedAssets.forEach(asset => {
    console.log(`- ${asset} (${fs.statSync(path.join(assetsDir, asset)).size} bytes)`);
});
