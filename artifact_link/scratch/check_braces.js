import fs from 'fs';

const css = fs.readFileSync('e:/PIB Insurance/frontend-react/src/styles/style.css', 'utf8');
let openCount = 0;
let lineNum = 1;
let inComment = false;

for (let i = 0; i < css.length; i++) {
    const char = css[i];
    const nextChar = css[i + 1];
    
    if (char === '\n') {
        lineNum++;
    }
    
    if (inComment) {
        if (char === '*' && nextChar === '/') {
            inComment = false;
            i++;
        }
        continue;
    }
    
    if (char === '/' && nextChar === '*') {
        inComment = true;
        i++;
        continue;
    }
    
    if (char === '{') {
        openCount++;
    } else if (char === '}') {
        openCount--;
        if (openCount < 0) {
            console.error(`ERROR: Extra closing brace at line ${lineNum}`);
            openCount = 0;
        }
    }
}

if (openCount > 0) {
    console.error(`ERROR: ${openCount} unclosed opening braces remaining at end of file!`);
} else {
    console.log("SUCCESS: All braces match correctly!");
}
