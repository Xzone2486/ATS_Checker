const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, '../src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix the Hero.tsx import mistake I made:
    content = content.replace(/import Link from ["']react-router-dom["']/g, 'import { Link } from "react-router-dom"');

    // Link imports
    content = content.replace(/import Link from ["']next\/link["']/g, 'import { Link } from "react-router-dom"');
    
    // Link href -> to
    content = content.replace(/<Link([^>]*?)href=/g, '<Link$1to=');

    // navigation imports - this is basic but effectively covers our use case
    content = content.replace(/import { usePathname } from ["']next\/navigation["']/g, 'import { useLocation } from "react-router-dom"');
    
    content = content.replace(/usePathname/g, 'useLocation().pathname'); // Wait, useLocation().pathname isn't a hook call. 
    // Actually, it's better to replace `const pathname = usePathname();` with `const { pathname } = useLocation();`
    // Let's do a smarter replacement. Original content: `const pathname = usePathname()` or `pathname === ...`
    // If we replace `usePathname()` with `useLocation().pathname`, it's not violating rules of hooks because it's still called unconditionally inside the component.
    content = content.replace(/usePathname\(\)/g, 'useLocation().pathname');

    // router push (might need useRouter)
    content = content.replace(/import { useRouter } from ["']next\/navigation["']/g, 'import { useNavigate } from "react-router-dom"');
    content = content.replace(/useRouter\(\)/g, 'useNavigate()');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
