"""Check the static export without browser dependencies. Usage: python scripts/verify-export.py [/base-path]"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import sys
root=Path(__file__).resolve().parents[1]/'out'
prefix=(sys.argv[1] if len(sys.argv)>1 else '').rstrip('/')
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]; self.h1=0; self.title=''; self.in_title=False; self.desc=False; self.canonical=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='title': self.in_title=True
        if tag=='meta' and a.get('name')=='description': self.desc=bool(a.get('content'))
        if tag=='link' and a.get('rel')=='canonical': self.canonical=True
        if tag in ['a','link','script','img']:
            v=a.get('href') or a.get('src')
            if v: self.refs.append(v)
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
    def handle_data(self,data):
        if self.in_title: self.title+=data
errors=[]; titles=set(); pages=list(root.rglob('*.html'))
assert pages,'No static export found. Run pnpm build first.'
for file in pages:
    p=Page();p.feed(file.read_text(encoding='utf-8'))
    if p.h1!=1: errors.append(f'{file.relative_to(root)}: expected one H1, got {p.h1}')
    if not p.title or not p.desc: errors.append(f'{file}: missing title/description')
    if '404' not in str(file.relative_to(root)):
        if not p.canonical: errors.append(f'{file}: missing canonical')
        if p.title in titles: errors.append(f'{file}: duplicate title')
        titles.add(p.title)
    for ref in p.refs:
        url=urlparse(ref)
        if url.scheme or url.netloc or not url.path: continue
        path=unquote(url.path)
        if prefix and path.startswith('/'):
            if not path.startswith(prefix+'/'): errors.append(f'{file}: unprefixed asset/link {ref}');continue
            path=path[len(prefix):]
        target=root/path.lstrip('/') if path.startswith('/') else file.parent/path
        if target.is_dir(): target=target/'index.html'
        if not target.exists(): errors.append(f'{file.relative_to(root)}: missing {ref}')
if errors: raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML pages; internal links, assets, headings and metadata verified.')
