import os
import re

dirs = [
    r'c:\Coding\projects\Resume Enhancer 2\ATS-Only-Version\src\app\improve',
    r'c:\Coding\projects\Resume Enhancer 2\ATS-Only-Version\src\components\improve'
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove company name and specific subtitle in UploadPage.tsx
    if 'UploadPage.tsx' in filepath:
        content = re.sub(
            r'Submit Your Resume for <br/>\s*<span[^>]*>\s*\{company\.name\}\s*</span>', 
            'Submit Your Resume', 
            content
        )
        content = re.sub(
            r'<p className="[^"]*">\s*Simple\. Secure\. Takes less than 60 seconds\.\s*</p>',
            '',
            content
        )

    # 2. Remove dark mode classes
    content = re.sub(r'\bdark:[a-zA-Z0-9_\-\/\[\]#]+\b', '', content)
    content = re.sub(r' +', ' ', content)
    
    # 3. Change colors to match ATS theme (Teal/Zinc)
    content = content.replace('slate-', 'zinc-')
    content = content.replace('blue-', 'teal-')
    content = content.replace('cyan-', 'emerald-')
    content = content.replace('indigo-', 'teal-')
    content = content.replace('purple-', 'emerald-')
    content = content.replace('bg-[#0a0a0a]', 'bg-zinc-50')
    content = content.replace('#b8c2cc', '#71717a')
    
    # 4. Remove Theme toggler buttons
    content = re.sub(r'<button[^>]*onClick=\w*\{?\w*\(\) => setTheme\([^>]+>\s*\{theme === \'dark\'.*?</button>', '', content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for d in dirs:
    if not os.path.exists(d):
        continue
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                process_file(os.path.join(root, file))
print('Processing complete.')
