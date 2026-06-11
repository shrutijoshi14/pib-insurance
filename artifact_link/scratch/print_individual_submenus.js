import { insuranceData } from 'file:///e:/PIB Insurance/frontend-react/src/data/insuranceData.js';

const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

const individualCategoryKeys = [
    'life-insurance',
    'health-insurance',
    'home-insurance',
    'motor-insurance',
    'travel-insurance',
    'accidental-insurance'
];

for (const catKey of individualCategoryKeys) {
    const cat = insuranceData[catKey];
    console.log(`\nCategory: ${catKey} (${cat.title})`);
    if (cat && cat.features) {
        cat.features.forEach(f => {
            console.log(`  - Title: "${f.title}" => Slug: "${slugify(f.title)}"`);
        });
    }
}
