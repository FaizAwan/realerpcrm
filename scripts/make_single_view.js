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
            let original = content;

            // Header padding remove
            content = content.replace(/bg-primary px-6 py-4 text-white/g, 'bg-primary px-4 py-3 text-white');
            content = content.replace(/bg-primary px-4 py-4 text-white/g, 'bg-primary px-4 py-3 text-white');

            // Remove margin below modal header text
            content = content.replace(/text-white\/60 font-semibold uppercase text-\[[^\]]+\] tracking-normal mt-1/g, 'text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0');
            content = content.replace(/text-white\/60 font-semibold uppercase text-\[[^\]]+\] tracking-wide mt-4/g, 'text-white/60 font-semibold uppercase text-[10px] tracking-normal mt-0');

            // Form container wrapper: remove outer padding
            content = content.replace(/p-6 py-4 space-y-2 flex-1/g, 'p-4 space-y-2 flex-1 flex flex-col justify-center');
            content = content.replace(/p-10 space-y-8 pb-24 flex-1/g, 'p-4 space-y-2 flex-1 flex flex-col justify-center');
            content = content.replace(/p-10 space-y-8 pb-20 flex-1/g, 'p-4 space-y-2 flex-1 flex flex-col justify-center');
            content = content.replace(/p-5 space-y-4 flex-1/g, 'p-4 space-y-2 flex-1 flex flex-col justify-center');

            // Inner spacing inside form: from 'space-y-4' to 'space-y-2'
            content = content.replace(/<div className="space-y-4">/g, '<div className="space-y-1">');
            content = content.replace(/<div className="space-y-6">/g, '<div className="space-y-1">');

            // Make group containers tight
            content = content.replace(/className="space-y-1"/g, 'className=""');

            // Make inputs extremely compact
            // match "pl-[?] pr-[?] py-[?] bg-[...]"
            content = content.replace(/w-full pl-10 pr-4 py-2 /g, 'w-full pl-10 pr-4 py-1.5 ');
            content = content.replace(/w-full pl-10 pr-4 py-2.5 /g, 'w-full pl-10 pr-4 py-1.5 ');
            content = content.replace(/w-full pl-[0-9]+ pr-[0-9]+ py-[0-9.]+ /g, 'w-full pl-10 pr-4 py-1.5 ');
            // Make labels have 0 margin bottom
            // pl-2 -> pl-1
            content = content.replace(/text-slate-400 tracking-normal pl-2 /g, 'text-slate-400 tracking-tight pl-1 mb-0 pb-0 block text-[9px] ');

            // Form submit button
            content = content.replace(/w-full py-2 m-0/g, 'w-full py-1.5 mt-2');
            content = content.replace(/w-full py-3 /g, 'w-full py-1.5 mt-2 ');
            content = content.replace(/w-full py-6 /g, 'w-full py-1.5 mt-2 ');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Processed for one-view compact: ' + fullPath);
            }
        }
    }
}

processDir(path.join(process.cwd(), 'src/app'));
