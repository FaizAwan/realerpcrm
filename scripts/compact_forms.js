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

            // 1. Modal Header
            content = content.replace(/className="bg-primary p-12 text-white/g, 'className="bg-primary p-5 text-white');
            content = content.replace(/className="bg-primary p-8 text-white/g, 'className="bg-primary p-5 text-white');

            // 2. Form Parent container
            content = content.replace(/form onSubmit=\{handleSubmit\} className="p-10 space-y-8 pb-20 flex-1"/g, 'form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1"');
            content = content.replace(/form className="p-10 space-y-8 pb-20 flex-1"/g, 'form className="p-5 space-y-4 flex-1"');
            content = content.replace(/className="p-10 space-y-8 pb-20 flex-1"/g, 'className="p-5 space-y-4 flex-1"');

            // 3. Spacing around standard inputs
            content = content.replace(/ className="space-y-6"/g, ' className="space-y-3"');
            content = content.replace(/ className="space-y-8"/g, ' className="space-y-4"');

            // 4. Input wrapper spacing (label + input group)
            content = content.replace(/className="space-y-3"/g, 'className="space-y-1"');

            // 5. Input padding and sizing
            // w-full pl-24 pr-8 py-5 bg-slate-50 border-none rounded-xl text-sm
            content = content.replace(/pl-24 pr-8 py-5/g, 'pl-10 pr-4 py-2.5');
            // Select equivalent:
            content = content.replace(/pl-24 pr-8 py-4/g, 'pl-10 pr-4 py-2.5');

            // Textareas
            content = content.replace(/pl-24 pr-8 py-5 h-32/g, 'pl-10 pr-4 py-2.5 h-20');

            // 6. Icons inside inputs
            // absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5
            content = content.replace(/absolute left-6 top-1\/2 -translate-y-1\/2 w-5 h-5/g, 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4');

            // 7. Submit button
            // w-full py-6 bg-primary text-white rounded-xl
            content = content.replace(/w-full py-6 /g, 'w-full py-3 ');
            content = content.replace(/w-full py-5 /g, 'w-full py-2.5 ');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

processDir(path.join(process.cwd(), 'src/app'));
