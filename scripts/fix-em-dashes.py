#!/usr/bin/env python3
"""Convert AI-style em dashes to natural punctuation.

Order:
1. Strip duplicate YAML frontmatter blocks (4 broken articles).
2. **Bold lead-in** — text   →  **Bold lead-in:** text   (start-of-line bold).
3. word — aside, more — text  →  word (aside, more) text  (paired em dashes).
4. word — text                →  word. Text              (single em dash + capitalize).
"""

import re
import sys
from pathlib import Path

ARTICLES_DIR = Path('src/content/articles')
SITE_FILES = [
    Path('src/lib/categories.ts'),
    Path('src/pages/articles/index.astro'),
    Path('src/pages/articles/category/[slug].astro'),
]

EMD = '—'


def strip_duplicate_frontmatter(content: str) -> str:
    lines = content.split('\n')
    fm_idx = [i for i, l in enumerate(lines) if l.strip() == '---']
    if len(fm_idx) >= 4 and fm_idx[2] == fm_idx[1] + 1:
        del lines[fm_idx[2]:fm_idx[3] + 1]
        # remove leading blank lines that result from the deletion
        while fm_idx[2] < len(lines) and lines[fm_idx[2]].strip() == '':
            del lines[fm_idx[2]]
    return '\n'.join(lines)


def fix_bold_lead_in(content: str) -> str:
    return re.sub(
        r'(^|\n)\*\*([^*\n]+?)\*\* ' + EMD + r' ',
        r'\1**\2:** ',
        content,
    )


def fix_double_dash(content: str) -> str:
    return re.sub(
        r' ' + EMD + r' ([^' + EMD + r'\n]+?) ' + EMD + r' ',
        r' (\1) ',
        content,
    )


def fix_single_dash(content: str) -> str:
    def repl(m):
        ch = m.group(1)
        return '. ' + (ch.upper() if ch.islower() else ch)
    return re.sub(r' ' + EMD + r' (\S)', repl, content)


def transform_article(content: str) -> str:
    content = strip_duplicate_frontmatter(content)
    content = fix_bold_lead_in(content)
    content = fix_double_dash(content)
    content = fix_single_dash(content)
    return content


def transform_site(content: str) -> str:
    content = fix_bold_lead_in(content)
    content = fix_double_dash(content)
    content = fix_single_dash(content)
    return content


def update_file(path: Path, transformer, dry_run: bool) -> tuple[bool, int]:
    original = path.read_text(encoding='utf-8')
    new = transformer(original)
    before = original.count(EMD)
    after = new.count(EMD)
    if after > 0:
        print(f"  REMAINING {after} em dash(es) in {path}")
    if new != original:
        print(f"  {path}: {before} -> {after}")
        if not dry_run:
            path.write_text(new, encoding='utf-8')
        return True, after
    return False, after


def process_files(paths, transformer, dry_run: bool) -> tuple[int, int]:
    changed_count = 0
    remaining = 0
    for path in paths:
        changed, after = update_file(path, transformer, dry_run)
        if changed:
            changed_count += 1
        remaining += after
    return changed_count, remaining


def print_summary(dry_run: bool, article_count: int, site_count: int, remaining: int) -> None:
    print(f"\nMode: {'dry-run' if dry_run else 'write'}")
    print(f"Articles updated: {article_count}")
    print(f"Site files updated: {site_count}")
    print(f"Remaining em dashes: {remaining}")


def main():
    dry_run = '--dry-run' in sys.argv
    article_count, article_remaining = process_files(
        sorted(ARTICLES_DIR.glob('*.md')),
        transform_article,
        dry_run,
    )
    site_count, site_remaining = process_files(SITE_FILES, transform_site, dry_run)
    print_summary(dry_run, article_count, site_count, article_remaining + site_remaining)


if __name__ == '__main__':
    main()
