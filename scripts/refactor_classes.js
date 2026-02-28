const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const original = content;
            content = content.replace(/rounded-\[([0-9.]+)rem\]/g, 'rounded-xl');
            content = content.replace(/\bfont-black\b/g, 'font-semibold');
            content = content.replace(/\bitalic\b/g, '');
            content = content.replace(/\btracking-tighter\b/g, 'tracking-normal');
            content = content.replace(/tracking-\[[a-zA-Z0-9.-]+\]/g, 'tracking-normal');
            content = content.replace(/\btracking-widest\b/g, 'tracking-wide');
            content = content.replace(/shadow-2xl/g, 'shadow-md');
            content = content.replace(/shadow-\[.*?\]/g, 'shadow-sm');
            content = content.replace(/\btext-secondary\b/g, 'text-slate-800');
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

processDir(path.join(process.cwd(), 'src/app'));
