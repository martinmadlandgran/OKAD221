"""Lager to Excel-arbeidsbøker fra eksamensdataene og kapittel-LF:
excel/OKAD221_oppgaver.xlsx og excel/OKAD221_fasit.xlsx, med én fane per kapittel.

Kjøres fra roten: python3 tools/excel.py
Henter dataene med node (samme filer som nettsiden bruker), så teksten er ordrett den samme.
"""
import json, os, re, subprocess, sys
from bs4 import BeautifulSoup, NavigableString, Tag
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'excel')

# ---------- Data ----------
JS = r"""
const fs=require('fs'),vm=require('vm');const ctx={console,Intl,Math,Number,String,Array,Object,JSON,Date,RegExp,Error};
ctx.window=ctx;ctx.self=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const f of ['js/util.js','js/data/eksamen-a.js','js/data/eksamen-b.js','js/data/prognose.js','js/data/teori-a.js','js/data/teori-b.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const O=ctx.OKAD;process.stdout.write(JSON.stringify({exams:O.exams,topics:O.topics,theory:O.theory.map(c=>({nr:c.nr,title:c.title}))}));
"""
D = json.loads(subprocess.run(['node', '-e', JS], cwd=ROOT, capture_output=True, text=True, check=True).stdout)
TOPICS = D['topics']
TITLES = {c['nr']: c['title'] for c in D['theory']}

# Hovedkapittel for hver oppgave: hele oppgaven står samlet der, slik den ble gitt.
MAIN = {'prosjekt': 4, 'toprosjekt': 4, 'levetid': 4, 'obligasjon': 4, 'rente': 3, 'payback': 5,
        'folsomhet': 6, 'laan': 7, 'kortfin': 7, 'skatt': 8, 'inflasjon': 9, 'portefolje': 10, 'kvm': 11, 'opsjon': 13}


def main_chapter(t):
    tp = t['topics']
    if 'kvm' in tp and 'skatt' in tp:  # WACC + nåverdi etter skatt: tyngden ligger i kapittel 8
        return 8
    return MAIN[tp[0]]


def part_chapters(p, t):
    out = set()
    for tp in p.get('topics') or t['topics']:
        out.update(TOPICS[tp]['ch'])
    return out


# Kapitteloppgaver fra kapittel-LF (oversiktstabellene)
def read_lf():
    md = open(os.path.join(ROOT, 'kilder', 'kapittel_lf.md'), encoding='utf-8').read()
    res = {}
    for sec in re.split(r'\n## Kapittel ', md)[1:]:
        ch = int(re.match(r'(\d+)', sec).group(1))
        m = re.search(r'### Oversikt[^\n]*\n+((?:\|[^\n]*\n)+)', sec)
        if not m:
            continue
        rows = [[c.strip() for c in r.strip().strip('|').split('|')] for r in m.group(1).strip().split('\n')]
        head, body = rows[0], [r for r in rows[2:] if len(r) == len(rows[0])]
        clean = lambda s: re.sub(r'\*\*|`', '', s).replace('<br>', '\n')
        res[ch] = [{h: clean(v) for h, v in zip(head, r)} for r in body]
    return res


LF = read_lf()

# ---------- HTML til celler ----------
SUB = str.maketrans('0123456789+−-=()aehijklmnoprstuvx', '₀₁₂₃₄₅₆₇₈₉₊₋₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ')
SUP = str.maketrans('0123456789+−-=()n', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻⁼⁽⁾ⁿ')


def inline(node):
    if isinstance(node, NavigableString):
        return str(node)
    if node.name == 'br':
        return '\n'
    if node.name == 'sub':
        s = inline_children(node)
        return s.translate(SUB) if all(ch in '0123456789+−-=()aehijklmnoprstuvx' for ch in s) else '_' + s
    if node.name == 'sup':
        s = inline_children(node)
        return s.translate(SUP) if all(ch in '0123456789+−-=()n' for ch in s) else '^(' + s + ')'
    if node.name == 'span' and 'frac' in (node.get('class') or []):
        a, b = [inline_children(x) for x in node.find_all('span', recursive=False)[:2]]
        wrap = lambda s: s if re.fullmatch(r'[\w ,.%−-]+', s) and ' ' not in s.strip() or re.fullmatch(r'[\d  ,.−-]+', s) else '(' + s + ')'
        return wrap(a) + ' / ' + wrap(b)
    return inline_children(node)


def inline_children(node):
    return ''.join(inline(c) for c in node.children)


def norm(s):
    s = s.replace(' ', ' ').replace(' ', ' ')
    s = re.sub(r'[ \t]+', ' ', s)
    s = re.sub(r' *\n *', '\n', s)
    return s.strip()


def blocks(html):
    """Gjør HTML om til en liste blokker: ('p', tekst, fet) | ('table', rader, sumrader)."""
    out = []
    soup = BeautifulSoup(html or '', 'html.parser')

    def walk(nodes):
        buf = ''
        for n in nodes:
            if isinstance(n, NavigableString) or n.name in ('b', 'em', 'span', 'sub', 'sup', 'br', 'i', 'strong'):
                buf += inline(n)
                continue
            if norm(buf):
                out.append(('p', norm(buf), False))
            buf = ''
            if n.name in ('p', 'h4'):
                out.append(('p', norm(inline_children(n)), n.name == 'h4'))
            elif n.name == 'div' and 'formula' in (n.get('class') or []):
                out.append(('p', norm(inline_children(n)), False))
            elif n.name == 'div' and n.find('table'):
                t = n.find('table')
                rows, sums = [], set()
                for tr in t.find_all('tr'):
                    if 'sum' in (tr.get('class') or []):
                        sums.add(len(rows))
                    rows.append([norm(inline_children(c)) for c in tr.find_all(['th', 'td'])])
                out.append(('table', rows, sums, bool(t.find('thead'))))
            elif n.name in ('ul', 'ol'):
                for k, li in enumerate(n.find_all('li', recursive=False)):
                    out.append(('p', ('• ' if n.name == 'ul' else f'{k + 1}. ') + norm(inline_children(li)), False))
            elif n.name == 'table':
                walk([soup.new_tag('div')])
            else:
                walk(n.children)
        if norm(buf):
            out.append(('p', norm(buf), False))

    walk(soup.children)
    return [b for b in out if b[0] == 'table' or b[1]]


def number(s):
    """Tall i tabellceller blir ekte tall, med samme antall desimaler som i kilden."""
    t = s.replace(' ', '').replace('−', '-').replace('–', '-')
    m = re.fullmatch(r'(-?)(\d+)(?:,(\d+))?(%?)', t)
    if not m or (len(m.group(2)) > 1 and m.group(2)[0] == '0'):
        return None
    dec = len(m.group(3) or '')
    v = float((m.group(1) or '') + m.group(2) + ('.' + m.group(3) if m.group(3) else ''))
    if m.group(4):
        return v / 100, ('0' + ('.' + '0' * dec if dec else '') + '%')
    fmt = '#,##0' + ('.' + '0' * dec if dec else '')
    return (int(v) if not dec else v), fmt + ';-' + fmt


# ---------- Utforming ----------
FONT = 'Arial'
NCOL = 13           # A = merkelapp, B = radtekst, C..M = tall
W = {'A': 6, 'B': 36}
DATAW = 13
THIN = Side(style='thin', color='999999')
F_BASE = Font(name=FONT, size=10)
F_BOLD = Font(name=FONT, size=10, bold=True)
F_TITLE = Font(name=FONT, size=16, bold=True)
F_SEC = Font(name=FONT, size=13, bold=True)
F_TASK = Font(name=FONT, size=11, bold=True)
F_MUTED = Font(name=FONT, size=9, italic=True, color='555555')
F_LINK = Font(name=FONT, size=10, color='0563C1', underline='single')
FILL_HEAD = PatternFill('solid', fgColor='E7E6E6')
FILL_TASK = PatternFill('solid', fgColor='D9E2F3')
FILL_IN = PatternFill('solid', fgColor='FFFF00')
WRAP = Alignment(wrap_text=True, vertical='top')
TEXTW = W['B'] + DATAW * (NCOL - 2)


def lines(text, width):
    n = 0
    for para in text.split('\n'):
        n += max(1, -(-len(para) * 1.05 // width))
    return int(n)


class Sheet:
    def __init__(self, ws):
        self.ws, self.r = ws, 1
        ws.column_dimensions['A'].width = W['A']
        ws.column_dimensions['B'].width = W['B']
        for c in range(3, NCOL + 1):
            ws.column_dimensions[get_column_letter(c)].width = DATAW
        ws.sheet_view.showGridLines = False
        ws.page_setup.orientation = 'landscape'
        ws.page_setup.fitToWidth, ws.page_setup.fitToHeight = 1, 0
        ws.sheet_properties.pageSetUpPr.fitToPage = True

    def text(self, s, font=F_BASE, label=None, fill=None, first=2, last=NCOL, height=None):
        ws, r = self.ws, self.r
        if label:
            c = ws.cell(r, 1, label)
            c.font, c.alignment = F_BOLD, WRAP
        c = ws.cell(r, first, s)
        c.font, c.alignment = font, WRAP
        if last > first:
            ws.merge_cells(start_row=r, start_column=first, end_row=r, end_column=last)
        if fill:
            for k in range(1, NCOL + 1):
                ws.cell(r, k).fill = fill
        width = W['B'] + DATAW * (last - 2) if first == 2 else DATAW * (last - first + 1)
        size = font.sz or 10
        ws.row_dimensions[r].height = height or max(15, lines(s, width * 10 / size) * (size * 1.32))
        self.r += 1
        return r

    def blank(self, n=1):
        self.r += n

    def table(self, rows, sums, head):
        ws = self.ws
        ws.row_dimensions[self.r].height = 6
        self.r += 1
        ncol = max(len(x) for x in rows)
        if ncol > NCOL - 1:  # svært brede tabeller: bruk flere kolonner
            for c in range(NCOL + 1, ncol + 2):
                ws.column_dimensions[get_column_letter(c)].width = DATAW
        for i, row in enumerate(rows):
            r = self.r
            tall = 1
            for j, v in enumerate(row):
                c = ws.cell(r, 2 + j)
                num = number(v) if (j > 0 or not v[:1].isalpha()) and not (head and i == 0) else None
                if num:
                    c.value, c.number_format = num
                    c.alignment = Alignment(horizontal='right', vertical='top')
                else:
                    c.value = v if v != '' else None
                    c.alignment = Alignment(wrap_text=True, vertical='top', horizontal='left' if j == 0 else 'right')
                    w = W['B'] if j == 0 else DATAW
                    tall = max(tall, lines(v, w))
                bold = (head and i == 0) or i in sums or j == 0
                c.font = F_BOLD if bold and not (j == 0 and not (head and i == 0) and i not in sums) else F_BASE
                if head and i == 0:
                    c.fill = FILL_HEAD
                    c.border = Border(bottom=THIN, top=THIN)
                elif i in sums:
                    c.border = Border(top=THIN, bottom=Side(style='double', color='000000'))
                else:
                    c.border = Border(bottom=Side(style='hair', color='BBBBBB'))
            ws.row_dimensions[r].height = max(15, tall * 13)
            self.r += 1
        ws.row_dimensions[self.r].height = 6
        self.r += 1

    def html(self, h, label=None):
        bl = blocks(h)
        for k, b in enumerate(bl):
            if b[0] == 'p':
                self.text(b[1], F_BOLD if b[2] else F_BASE, label=label if k == 0 else None)
            else:
                if k == 0 and label:
                    self.text('', label=label, height=15)
                self.table(b[1], b[2], b[3])
        if not bl and label:
            self.text('', label=label)


# ---------- Bygging ----------
EXAMS = sorted(D['exams'], key=lambda e: e['year'])
SRC = {'LF': 'Løsningsforslaget', 'LF+egen': 'Løsningsforslaget og egen utregning', 'egen': 'Egen utregning (ingen LF for dette punktet)'}


def tasks_for(ch):
    return [(e, t) for e in EXAMS for t in e['tasks'] if main_chapter(t) == ch]


def cross_for(ch):
    out = []
    for e in EXAMS:
        for t in e['tasks']:
            mc = main_chapter(t)
            if mc == ch:
                continue
            labs = [p['label'] for p in t['parts'] if ch in part_chapters(p, t)]
            if labs:
                out.append((e, t, labs, mc))
    return out


def task_head(s, e, t):
    s.text(f"{e['title']} · Oppgave {t['nr']} ({t['weight']} %) · {t['title']}", F_TASK, fill=FILL_TASK)


def build(fasit):
    wb = Workbook()
    ov = Sheet(wb.active)
    ov.ws.title = 'Oversikt'
    ov.text('ØKAD 221 – ' + ('fasit og løsningsforslag' if fasit else 'eksamensoppgaver per kapittel'), F_TITLE, height=26)
    ov.text('Bredesen, Investering og finansiering (7. utg.). Eksamenssettene 2016–2025 og kapitteloppgavene i læreboka, ordnet etter kapittel.', F_MUTED)
    ov.blank()
    intro = [
        'Hver eksamensoppgave står samlet under det kapitlet tyngden ligger i, med ordrett tekst og tall fra eksamenssettet. '
        'Delspørsmål som hører til andre kapitler, er listet nederst i disse kapitlenes faner, med henvisning.',
        'Oppgavene om WACC og nåverdi etter skatt står under kapittel 8, med henvisning fra kapittel 11 for WACC-delen.',
        'Tabeller er lagt inn som tall i celler, så de kan brukes direkte i utregningen.',
    ]
    if fasit:
        intro += ['Fasiten følger samme rekkefølge og nummerering som oppgavefilen. For hvert delspørsmål står svaret først, så løsningen. '
                  'Kilden står under løsningen. Merknader om feil og avvik i løsningsforslagene står i fanen «Merknader».',
                  'Tallene er hentet fra løsningsforslagene og kontrollert på nytt i øvingssiden. Der løsningsforslaget mangler eller avviker, er det sagt.']
    else:
        intro += ['Gule celler (kolonne C ved hvert delspørsmål) er til ditt eget svar. Alt annet er oppgavetekst.',
                  'Kapitteloppgavene fra boka står med oppgavetype og tall, ikke ordrett tekst (kilden er bare løsningsforslaget).']
    for s in intro:
        ov.text(s)
    ov.blank()
    r = ov.r
    for j, h in enumerate(['Fane', 'Kapittel', 'Eksamens-\noppgaver', 'Delspm. andre\nkapitler', 'Kapittel-\noppgaver']):
        c = ov.ws.cell(r, [1, 2, 3, 4, 5][j], h)
        c.font, c.fill, c.alignment = F_BOLD, FILL_HEAD, WRAP
        c.border = Border(top=THIN, bottom=THIN)
    ov.ws.row_dimensions[r].height = 28
    ov.r += 1
    for ch in range(1, 14):
        r = ov.r
        name = f'Kap {ch}'
        c = ov.ws.cell(r, 1, name)
        c.hyperlink, c.font = f"#'{name}'!A1", F_LINK
        ov.ws.cell(r, 2, f'{ch}. {TITLES[ch]}').font = F_BASE
        for j, v in enumerate([len(tasks_for(ch)), len(cross_for(ch)), len(LF.get(ch, []))]):
            c = ov.ws.cell(r, 3 + j, v)
            c.font, c.alignment = F_BASE, Alignment(horizontal='right')
        for k in range(1, 6):
            ov.ws.cell(r, k).border = Border(bottom=Side(style='hair', color='BBBBBB'))
        ov.r += 1
    if fasit:
        c = ov.ws.cell(ov.r, 1, 'Merknader')
        c.hyperlink, c.font = "#'Merknader'!A1", F_LINK
        ov.ws.cell(ov.r, 2, 'Merknader til løsningsforslagene, per eksamenssett').font = F_BASE
        ov.r += 1

    for ch in range(1, 14):
        s = Sheet(wb.create_sheet(f'Kap {ch}'))
        s.text(f'Kapittel {ch}: {TITLES[ch]}' + (' – fasit' if fasit else ''), F_TITLE, height=26)
        c = s.ws.cell(s.r, 2, '← Oversikt')
        c.hyperlink, c.font = "#'Oversikt'!A1", F_LINK
        s.r += 1
        s.blank()
        tk = tasks_for(ch)
        s.text('Eksamensoppgaver', F_SEC, height=20)
        if not tk:
            s.text('Ingen eksamensoppgave 2016–2025 har hovedtyngden i dette kapitlet. Se delspørsmålene og kapitteloppgavene under.', F_MUTED)
        for e, t in tk:
            s.blank()
            task_head(s, e, t)
            if not fasit:
                s.html(t['text'])
                for p in t['parts']:
                    s.blank()
                    s.html(p['q'], label=p['label'] + ')')
                    r = s.r
                    s.ws.cell(r, 2, 'Ditt svar:').font = F_MUTED
                    c = s.ws.cell(r, 3)
                    c.fill = FILL_IN
                    s.ws.merge_cells(start_row=r, start_column=3, end_row=r, end_column=7)
                    s.r += 1
            else:
                for p in t['parts']:
                    s.blank()
                    s.text(norm(BeautifulSoup(p['q'], 'html.parser').get_text()), F_MUTED, label=p['label'] + ')')
                    s.text('Svar', F_BOLD)
                    s.html(p['answer'])
                    if p.get('method'):
                        s.text('Løsning', F_BOLD)
                        s.html(p['method'])
                    s.text('Kilde: ' + SRC.get(p.get('src', 'LF'), p.get('src', 'LF')) + f" ({e['title']}).", F_MUTED)
            s.blank()

        cr = cross_for(ch)
        s.blank()
        s.text('Delspørsmål i oppgaver under andre kapitler', F_SEC, height=20)
        if not cr:
            s.text('Ingen.', F_MUTED)
        else:
            spans = [(2, 2), (3, 8), (9, 10), (11, 11)]

            def crow(vals, head):
                r = s.r
                for (a, z), v in zip(spans, vals):
                    c = s.ws.cell(r, a, v)
                    c.font, c.alignment = (F_BOLD if head else F_BASE), WRAP
                    for x in range(a, z + 1):
                        s.ws.cell(r, x).border = Border(top=THIN, bottom=THIN) if head else Border(bottom=Side(style='hair', color='BBBBBB'))
                        if head:
                            s.ws.cell(r, x).fill = FILL_HEAD
                    if z > a:
                        s.ws.merge_cells(start_row=r, start_column=a, end_row=r, end_column=z)
                s.ws.row_dimensions[r].height = 15
                s.r += 1
                return r
            crow(['Eksamen', 'Oppgave', 'Delspørsmål', 'Står i fanen'], True)
            for e, t, labs, mc in cr:
                r = crow([e['title'], f"{t['nr']}. {t['title']}", ', '.join(x + ')' for x in labs), f'Kap {mc}'], False)
                s.ws.cell(r, 11).hyperlink = f"#'Kap {mc}'!A1"
                s.ws.cell(r, 11).font = F_LINK

        lf = LF.get(ch, [])
        s.blank()
        s.text('Kapitteloppgaver i læreboka', F_SEC, height=20)
        if not lf:
            s.text('Kildene har ingen løsningsforslag til kapitteloppgavene i dette kapitlet.', F_MUTED)
        else:
            s.text('Fra løsningsforslaget til kapitteloppgavene (regnearket for kapitlet). Teksten er oppgavetype og tall, ikke ordrett oppgavetekst. '
                   'Usikre tolkninger i løsningsforslaget er merket der de står.', F_MUTED)
            keys = list(lf[0].keys())
            cols = (['Oppg.', 'Type', 'Inndata'] if not fasit
                    else ['Oppg.', 'Type'] + [k for k in keys if k not in ('Oppg.', 'Type', 'Inndata')])
            # Kolonneplassering: A = nr, B = type, C:H = inndata (eller løsning), I:M = sluttsvar
            spans = {'Oppg.': (1, 1), 'Type': (2, 2)}
            rest = [k for k in cols if k not in spans]
            if len(rest) == 1:
                spans[rest[0]] = (3, NCOL)
            else:
                spans[rest[0]] = (3, 8)
                spans[rest[1]] = (9, NCOL)
            r = s.r
            for k in cols:
                a, b = spans[k]
                c = s.ws.cell(r, a, k)
                c.font, c.fill, c.alignment = F_BOLD, FILL_HEAD, WRAP
                for x in range(a, b + 1):
                    s.ws.cell(r, x).border = Border(top=THIN, bottom=THIN)
                    s.ws.cell(r, x).fill = FILL_HEAD
                if b > a:
                    s.ws.merge_cells(start_row=r, start_column=a, end_row=r, end_column=b)
            s.r += 1
            for row in lf:
                r = s.r
                h = 1
                for k in cols:
                    a, b = spans[k]
                    v = row.get(k, '')
                    if not fasit:
                        v = re.sub(r'\(se full løsning\)', '(tallene står i fasiten)', v)
                        v = re.sub(r'Se full løsning', 'Tallene står i fasiten', v)
                    c = s.ws.cell(r, a, v)
                    c.font, c.alignment = (F_BOLD if k == 'Oppg.' else F_BASE), WRAP
                    for x in range(a, b + 1):
                        s.ws.cell(r, x).border = Border(bottom=Side(style='hair', color='BBBBBB'))
                    if b > a:
                        s.ws.merge_cells(start_row=r, start_column=a, end_row=r, end_column=b)
                    width = W['A'] if a == 1 else W['B'] if a == 2 else DATAW * (b - a + 1)
                    h = max(h, lines(v, width))
                s.ws.row_dimensions[r].height = max(15, h * 13)
                s.r += 1

    if fasit:
        s = Sheet(wb.create_sheet('Merknader'))
        s.text('Merknader til løsningsforslagene', F_TITLE, height=26)
        c = s.ws.cell(s.r, 2, '← Oversikt')
        c.hyperlink, c.font = "#'Oversikt'!A1", F_LINK
        s.r += 1
        for e in EXAMS:
            if e.get('note'):
                s.blank()
                s.text(e['title'], F_TASK, fill=FILL_TASK)
                s.html(e['note'])
    for w in wb.worksheets:
        for row in w.iter_rows():
            for c in row:
                if c.value is not None and c.font.name != FONT:
                    c.font = F_BASE
    return wb


os.makedirs(OUT, exist_ok=True)
for fasit, name in [(False, 'OKAD221_oppgaver.xlsx'), (True, 'OKAD221_fasit.xlsx')]:
    build(fasit).save(os.path.join(OUT, name))
    print('skrev', name)
print({ch: (len(tasks_for(ch)), len(cross_for(ch)), len(LF.get(ch, []))) for ch in range(1, 14)})
