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

            // Ultra compact headers
            content = content.replace(/className="bg-primary p-5 text-white/g, 'className="bg-primary px-6 py-4 text-white');
            content = content.replace(/className="text-4xl font-semibold/g, 'className="text-xl m-0 p-0 font-semibold');
            content = content.replace(/className="text-3xl font-semibold/g, 'className="text-lg m-0 p-0 font-semibold');
            content = content.replace(/mt-4 flex items-center/g, 'mt-1 flex items-center');

            // Form container ultra compact
            content = content.replace(/className="p-5 space-y-4 flex-1"/g, 'className="p-6 py-4 space-y-2 flex-1"');

            // Form spacing
            content = content.replace(/className="space-y-4"/g, 'className="space-y-2"');

            // Label & Input wrapper 
            content = content.replace(/className="space-y-1"/g, 'className=""');

            // Input paddings
            content = content.replace(/pl-10 pr-4 py-2\.5/g, 'pl-10 pr-4 py-2');

            // Button compact
            content = content.replace(/w-full py-3 /g, 'w-full py-2 m-0 ');

            // Remove excessive padding at the bottom of forms (like pb-20) if any still exists
            content = content.replace(/pb-20/g, 'pb-4');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

processDir(path.join(process.cwd(), 'src/app'));
