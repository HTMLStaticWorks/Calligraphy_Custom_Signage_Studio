import os
import re

dir_path = r'c:\class\.vscode\calligraphy'
for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # 1. Remove icon near home menu
        content = re.sub(r'Home\s*<i class="bi bi-chevron-down"[^>]*></i>', 'Home', content)

        # 2. Remove Sign Up button from header (since it's already in the hamburger menu)
        content = re.sub(r'<a href="register\.html"\s+class="btn-header-signup[^>]*>Sign Up</a>', '', content)

        # 3. Make footer logo same as header logo inner HTML
        # The header logo inner html is typically:
        header_logo_match = re.search(r'<header.*?>\s*<div.*?>\s*<a[^>]*class="site-logo[^>]*>(.*?)</a>', content, flags=re.DOTALL | re.IGNORECASE)
        if header_logo_match:
            header_inner = header_logo_match.group(1).strip()
            # Find footer logo and replace its inner HTML
            def replace_footer_logo(match):
                prefix = match.group(1)
                return prefix + '\n                        ' + header_inner + '\n                    </a>'
            content = re.sub(r'(<footer.*?<a[^>]*class="site-logo[^>]*>).*?</a>', replace_footer_logo, content, flags=re.DOTALL | re.IGNORECASE)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {filename}')

