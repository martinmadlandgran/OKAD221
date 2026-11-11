const { chromium } = require('playwright');
const out = process.argv[2]; const B = 'http://localhost:8765/index.html#/';
const fails = [], pass = [];
const ok = (c, msg) => (c ? pass : fails).push(msg);
(async () => {
  const b = await chromium.launch();
  const mk = async (o = {}) => { const ctx = await b.newContext({ viewport: { width: o.w || 1200, height: o.h || 900 }, colorScheme: o.dark ? 'dark' : 'light', deviceScaleFactor: 1, acceptDownloads: true }); if (o.init) await ctx.addInitScript(o.init); const p = await ctx.newPage(); p.on('pageerror', (e) => fails.push('JS-feil: ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') fails.push('konsoll: ' + m.text()); }); p.on('dialog', (d) => d.accept()); return p; };
  const go = async (p, h) => { await p.goto(B + h); await p.waitForTimeout(250); };
  const OKAD_FMT = (x) => x.toFixed(4).replace('.', ',');
  const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);

  // 1) Alle ruter, desktop + mobil, lyst + mørkt: ingen feil, ingen sidelengs rulling
  const routes = ['', 'analyse', 'oving', 'prove', 'prove/utskrift/4242', 'eksamener', 'eksamen/2025', 'eksamen/2016', 'tema', 'tema/8', 'tema/4', 'tema/12', 'formler', 'quiz', 'quiz/alle', 'quiz/repeter', 'verktoy', 'repeter', 'oving/k6-folsomhet-internrente/11', 'oving/k12-altman-z/7', 'oving/k12-kredittpolitikk/7', 'oving/k7-factoring/7', 'oving/k12-nokkeltall-likviditet/7'];
  for (const o of [{ w: 1200 }, { w: 390, h: 800 }, { w: 390, h: 800, dark: true }, { w: 320, h: 640 }]) {
    const p = await mk(o);
    for (const r of routes) { await go(p, r); ok(!(await overflow(p)), `ingen sidelengs rulling ${o.w}px ${r || 'hjem'}`); }
    await p.context().close();
  }
  // 2) Alle generatorer åpner, viser løsninger, ingen overflow på mobil
  { const p = await mk({ w: 390, h: 800 }); const ids = await (async () => { await go(p, 'oving'); return p.evaluate(() => OKAD.gens.map((g) => g.id)); })();
    for (const id of ids) { await go(p, 'oving/' + id + '/11'); await p.click('#all'); ok(!(await overflow(p)), 'mobil gen ' + id); ok((await p.locator('.solution').count()) > 0, 'løsning vises ' + id); }
    ok(ids.length === 43, '43 generatorer'); await p.context().close(); }

  const p = await mk();
  // 3) Svarsjekk: tomt, ugyldig, feil fortegn, desimal i stedet for prosent, riktig, Enter
  await go(p, 'oving/k4-obligasjon-kurs-ytm-durasjon/3');
  const ans = await p.evaluate(() => { const t = OKAD.make('k4-obligasjon-kurs-ytm-durasjon', 3); return t.parts.map((x) => x.kind === 'num' ? { a: x.answer, u: x.unit, s: OKAD.fmtAnswer(x) } : null); });
  await p.click('[data-act=check][data-i="0"]'); ok(/Skriv inn et svar/.test(await p.textContent('#p0-fb')), 'tomt svar gir beskjed');
  ok((await p.getAttribute('#p0-in', 'aria-invalid')) === 'true', 'aria-invalid ved tomt'); ok(await p.evaluate(() => document.activeElement.id === 'p0-in'), 'fokus til feltet ved feil');
  await p.fill('#p0-in', 'abc'); await p.press('#p0-in', 'Enter'); ok(/ikke forstått som et tall/.test(await p.textContent('#p0-fb')), 'ugyldig tekst gir beskjed');
  await p.fill('#p0-in', String(-ans[0].a).replace('.', ',')); await p.press('#p0-in', 'Enter'); ok(/fortegnet er feil/.test(await p.textContent('#p0-fb')), 'fortegnsfeil gjenkjennes');
  await p.fill('#p1-in', String(ans[1].a).replace('.', ',')); await p.press('#p1-in', 'Enter'); ok(/desimaltall/.test(await p.textContent('#p1-fb')), 'desimal i stedet for prosent gjenkjennes');
  await p.fill('#p0-in', String(ans[0].a * 1000).replace('.', ',')); await p.press('#p0-in', 'Enter'); ok(/størrelsesordenen/.test(await p.textContent('#p0-fb')), 'faktor 1000 gjenkjennes');
  await p.fill('#p0-in', '5'); await p.press('#p0-in', 'Enter'); ok(/Ikke riktig/.test(await p.textContent('#p0-fb')), 'galt svar');
  await p.fill('#p0-in', ans[0].s); await p.press('#p0-in', 'Enter'); ok(/Riktig/.test(await p.textContent('#p0-fb')), 'riktig svar med Enter (norsk tallformat med kr)');
  ok((await p.locator('#p0-sol .solution').count()) === 1, 'løsning åpnes ved riktig svar');
  await p.click('[data-act=hint][data-i="0"]'); ok((await p.locator('#p0-hint .callout').count()) === 1, 'hint åpnes'); await p.click('[data-act=hint][data-i="0"]'); ok((await p.locator('#p0-hint .callout').count()) === 0, 'hint lukkes');
  const st = await p.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')).gen['k4-obligasjon-kurs-ytm-durasjon']); ok(st.tried === 2 && st.ok === 0, 'bare første forsøk telles (' + JSON.stringify(st) + ')');
  const h1 = await p.textContent('.task-text'); await p.click('#new'); await p.waitForTimeout(100); ok((await p.textContent('.task-text')) !== h1, 'ny oppgave gir nye tall');
  await p.reload(); await p.waitForTimeout(200); const h2 = await p.textContent('.task-text'); await p.reload(); await p.waitForTimeout(200); ok((await p.textContent('.task-text')) === h2, 'samme adresse gir samme oppgave');
  // 4) Ukjente lenker
  for (const [h, t] of [['oving/finnes-ikke', 'oppgavetypen'], ['eksamen/1999', 'eksamenssettet'], ['tema/99', 'kapitlet'], ['tull', 'siden'], ['quiz/99', 'quiz']]) { await go(p, h); ok((await p.locator('.empty').count()) === 1 && (await p.textContent('.empty')).includes(t), 'ukjent lenke: ' + h); }
  // 5) Formelsøk: treff, null treff, tøm
  await go(p, 'formler'); await p.fill('#fs', 'durasjon'); ok(/treff/.test(await p.textContent('#fc')) && (await p.locator('.fitem').count()) > 0, 'formelsøk gir treff');
  await p.fill('#fs', 'zzzqqq'); ok((await p.locator('#fl .empty').count()) === 1, 'null treff har egen tilstand'); await p.click('#fclear'); ok((await p.locator('.fitem').count()) > 50, 'tøm søk viser alle');
  // 6) Kalkulatorer: ugyldige felt
  await go(p, 'verktoy'); ok(/972[\s ]333/.test(await p.textContent('#o1')), 'NNV-kalkulator gir 972 333 (2025 oppg. 1)');
  await p.fill('#c1', '-100; abc; 50'); ok(/ikke et tall/.test(await p.textContent('#o1')), 'kalkulator: ugyldig beløp'); await p.fill('#c1', '-100'); ok(/minst to/.test(await p.textContent('#o1')), 'kalkulator: for få beløp');
  await p.fill('#c1', '100; 50; 20'); ok(/finnes ikke/.test(await p.textContent('#o1')), 'kalkulator: ingen internrente');
  await p.fill('#c2n', '0'); ok(/større enn 0 år/.test(await p.textContent('#o2')), 'lån: 0 år'); await p.fill('#c2n', '5'); await p.fill('#c2r', ''); ok(/Renten/.test(await p.textContent('#o2')), 'lån: tom rente'); await p.fill('#c2r', '0'); ok(/20[\s ]000,00/.test(await p.textContent('#o2')), 'lån: 0 % rente virker');
  ok(/825,92/.test(await p.textContent('#o3')) && /8,92/.test(await p.textContent('#o3')), 'obligasjon 825,92 / 8,92 %'); await p.fill('#c3n', '2,5'); ok(/helt antall/.test(await p.textContent('#o3')), 'obligasjon: ikke heltall');
  ok(/8,000/.test(await p.textContent('#o4')), 'WACC 8,000 % (2025 oppg. 5)'); await p.fill('#c4w', '150'); ok(/mellom 0 og 100/.test(await p.textContent('#o4')), 'WACC: gjeldsandel > 100');
  ok(!/NaN|Infinity|∞|undefined/.test(await p.textContent('#view')), 'ingen NaN/∞ i kalkulatorene');
  // 7) Prøveeksamen: start, lagring ved reload, levering med blanke, logg, avbryt
  await go(p, 'prove'); ok(/Ingen ennå/.test(await p.textContent('#view')), 'prøve: tom logg har tekst'); await p.click('#start'); await p.waitForTimeout(200);
  await p.fill('#m0_0-in', '123'); await p.reload(); await p.waitForTimeout(300); ok((await p.inputValue('#m0_0-in')) === '123', 'prøve: svar overlever reload'); ok(/1 av/.test(await p.textContent('#filled')), 'prøve: teller utfylte');
  await go(p, ''); ok(/ikke er levert/.test(await p.textContent('.next')), 'forsiden viser påbegynt prøve'); await go(p, 'prove');
  const key = await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('okad221:v1')).mock.seed; const R = OKAD.U.rng(s); let i = 0; return null; });
  await p.click('#submit'); await p.waitForTimeout(200); ok(/omtrent karakter/.test(await p.textContent('#result')), 'prøve: resultat vises'); ok((await p.locator('.solution').count()) > 15, 'prøve: løsninger vises etter levering');
  ok(await p.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')).mock === null && JSON.parse(localStorage.getItem('okad221:v1')).mockLog.length === 1), 'prøve: logget og avsluttet');
  await p.click('#again'); ok((await p.locator('table.data').count()) === 1, 'prøve: forsøk i loggen'); await p.click('#start'); await p.waitForTimeout(100); await p.click('#abort'); await p.waitForTimeout(100); ok((await p.locator('#start').count()) === 1, 'prøve: avbryt går tilbake');
  // Riktig utfylt prøve gir 100 %
  await p.click('#start'); await p.waitForTimeout(200);
  await p.evaluate(() => { const S = JSON.parse(localStorage.getItem('okad221:v1')); const seed = S.mock.seed; const R = OKAD.U.rng(seed); OKAD.mockSlots.forEach((s, i) => { const tot = s.pool.reduce((a, x) => a + x[1], 0); let r = R.next() * tot, pick = s.pool[0][0]; for (const [g, w] of s.pool) { if ((r -= w) <= 0) { pick = g; break; } } const t = OKAD.make(pick, (seed * 31 + i * 977) % 2147483647 + 1); t.parts.forEach((x, j) => { if (x.kind === 'num') { const el = document.getElementById(`m${i}_${j}-in`); el.value = OKAD.fmtAnswer(x); el.dispatchEvent(new Event('input', { bubbles: true })); } }); }); });
  await p.click('#submit'); await p.waitForTimeout(200); ok(/^100 %/.test(await p.textContent('#result h1')), 'prøve: fasitsvar gir 100 % (' + (await p.textContent('#result h1')) + ')');
  // 8) Eksamen: avkryssing lagres
  await go(p, 'eksamen/2025'); await p.check('input[data-k="2025-1a"]'); await p.reload(); await p.waitForTimeout(200); ok(await p.isChecked('input[data-k="2025-1a"]'), 'eksamen: avkryssing lagres');
  // 9) Quiz hel runde
  await go(p, 'quiz/8'); for (let i = 0; i < 10; i++) { await p.click('.choice >> nth=0'); ok(await p.evaluate(() => document.activeElement.id === 'nx'), 'quiz: fokus på neste'); await p.click('#nx'); } ok(/av 10 riktige/.test(await p.textContent('h1')), 'quiz: resultat');
  // 10) Tastatur: skip-lenke, tab-rekkefølge, synlig fokus
  const k = await mk(); await go(k, ''); await k.keyboard.press('Tab'); ok(await k.evaluate(() => document.activeElement.classList.contains('skip')), 'første Tab = hopp til innhold');
  await k.keyboard.press('Enter'); await k.waitForTimeout(100); await k.keyboard.press('Tab'); const foc = await k.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { tag: e.tagName, inMain: !!e.closest('main'), ow: cs.outlineWidth, os: cs.outlineStyle }; }); ok(foc.inMain, 'etter skip er fokus i innholdet'); ok(parseFloat(foc.ow) >= 3 && foc.os !== 'none', 'fokusring synlig (' + foc.ow + ')');
  // Hele oppgaven kan løses bare med tastatur
  await go(p, 'oving/k3-effektiv-rente-grunn/2'); await p.focus('#p0-in'); await p.keyboard.type('1'); await p.keyboard.press('Tab'); ok(await p.evaluate(() => document.activeElement.dataset.act === 'check'), 'Tab fra felt til Sjekk'); await p.keyboard.press('Enter'); ok(/Ikke riktig|Nær/.test(await p.textContent('#p0-fb')), 'Sjekk med tastatur');
  // 11) Kontrast (WCAG) for tekstfarger mot bakgrunn, lyst og mørkt
  for (const dark of [false, true]) { const q = await mk({ dark }); await go(q, '');
    const res = await q.evaluate(() => { const cs = getComputedStyle(document.documentElement); const g = (v) => cs.getPropertyValue(v).trim(); const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4))); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }; const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
      const pairs = [['--ink', '--bg'], ['--ink-2', '--bg'], ['--ink-3', '--bg'], ['--ink-3', '--tint'], ['--ink-2', '--tint'], ['--accent', '--bg'], ['--accent', '--tint'], ['--accent-ink', '--accent'], ['--mark-ink', '--mark'], ['--bad', '--bg'], ['--bad', '--bad-bg'], ['--warn', '--bg'], ['--warn', '--warn-bg'], ['--good', '--good-bg'], ['--ink', '--warn-bg'], ['--ink', '--bad-bg']];
      return pairs.map(([a, b]) => [a + ' på ' + b, +cr(g(a), g(b)).toFixed(2)]); });
    res.forEach(([n2, r]) => ok(r >= 4.5, `kontrast ${dark ? 'mørk' : 'lys'} ${n2}: ${r}`)); await q.context().close(); }
  // 12) Trykkflater på mobil ≥ 44 px, bunnmeny synlig
  { const q = await mk({ w: 390, h: 800 }); await go(q, 'oving/k10-to-aksjer-tilstander/7'); const small = await q.evaluate(() => [...document.querySelectorAll('main button, .tabbar a, main .btn')].filter((e) => e.offsetParent && e.getBoundingClientRect().height < 43.5).map((e) => e.textContent.trim().slice(0, 20) + ':' + Math.round(e.getBoundingClientRect().height))); ok(small.length === 0, 'trykkflater ≥ 44 px på mobil ' + small.slice(0, 5).join(', '));
    ok(await q.locator('.tabbar').isVisible() && !(await q.locator('#nav').isVisible()), 'mobil: bunnmeny erstatter toppmeny'); await q.screenshot({ path: out + '/m-task.png' });
    await go(q, ''); await q.screenshot({ path: out + '/m-hjem.png' }); await go(q, 'prove'); await q.click('#start'); await q.waitForTimeout(200); await q.screenshot({ path: out + '/m-prove.png' }); await q.context().close(); }
  // 13) Sperret lagring
  { const q = await mk({ init: () => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('sperret'); } }); } }); await go(q, ''); ok(await q.locator('#notice').isVisible(), 'sperret lagring: varsel vises'); await go(q, 'oving/k3-effektiv-rente-grunn/2'); await q.fill('#p0-in', '1'); await q.press('#p0-in', 'Enter'); ok(/Ikke riktig|Nær/.test(await q.textContent('#p0-fb')), 'sperret lagring: oppgaver virker'); await q.context().close(); }
  // 14) Prøveeksamen på papir: fasit bakerst, utskrift, samme sett på skjerm
  { const q = await mk(); await go(q, 'prove'); await q.click('a[href="#/prove/utskrift"]'); await q.waitForTimeout(250);
    ok(/^#\/prove\/utskrift\/\d+$/.test(await q.evaluate(() => location.hash)), 'papir: nytt sett får nummer i adressen');
    await go(q, 'prove/utskrift/4242'); ok((await q.locator('section.pq').count()) === 5, 'papir: fem oppgaver');
    ok(!(await q.locator('#keybody').isVisible()), 'papir: fasiten er skjult på skjermen'); await q.click('#keyopen'); ok(await q.locator('#keybody').isVisible(), 'papir: fasiten kan vises');
    ok(await q.evaluate(() => document.activeElement.id === 'keyopen'), 'papir: fokus blir på knappen'); await q.click('#keyopen'); ok(!(await q.locator('#keybody').isVisible()), 'papir: fasiten kan skjules igjen');
    const want = await q.evaluate(() => { const R = OKAD.U.rng(4242); const s = OKAD.mockSlots[0]; const tot = s.pool.reduce((a, x) => a + x[1], 0); let r = R.next() * tot, pick = s.pool[0][0]; for (const [g, w] of s.pool) { if ((r -= w) <= 0) { pick = g; break; } } return OKAD.make(pick, (4242 * 31) % 2147483647 + 1).parts.map((x) => x.kind === 'num' ? OKAD.fmtAnswer(x) : null).filter(Boolean)[0]; });
    ok((await q.textContent('#keybody')).includes(want), 'papir: fasiten stemmer med oppgave 1');
    await q.emulateMedia({ media: 'print' }); ok(await q.locator('#keybody').isVisible() && !(await q.locator('.topbar').isVisible()) && !(await q.locator('#pp').isVisible()), 'papir: utskrift viser fasit, skjuler meny og knapper');
    ok(await q.evaluate(() => getComputedStyle(document.querySelector('.pagebreak')).breakBefore === 'page'), 'papir: fasiten begynner på ny side');
    ok(await q.evaluate(() => getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)'), 'papir: hvit bakgrunn ved utskrift');
    await q.emulateMedia({ media: 'screen' });
    await q.selectOption('#pk', 'ans'); ok((await q.locator('#keybody table').count()) === 0 && (await q.locator('#keybody .svar').count()) > 15, 'papir: «bare svar» fjerner fremgangsmåten');
    await q.selectOption('#pk', 'none'); ok((await q.locator('#keybody').count()) === 0, 'papir: fasiten kan slås av');
    await q.click('#pr'); await q.waitForTimeout(250); ok(/#\/prove$/.test(await q.evaluate(() => location.hash)) && (await q.textContent('#timer')) === 'Svar fra papir', 'papir: samme sett kan rettes på skjerm');
    ok(await q.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')).mock.seed === 4242), 'papir: samme settnummer');
    await go(q, 'prove/utskrift/4242'); await q.click('#pr'); ok(/påbegynt/.test(await q.textContent('#prmsg')), 'papir: varsler om påbegynt prøve');
    await go(q, 'prove'); await q.click('#submit'); await q.waitForTimeout(200); ok(/fra papiret/.test(await q.textContent('#result')), 'papir: resultat sier fra papir');
    await q.click('#again'); ok(/løst på papir/.test(await q.textContent('#view')), 'papir: loggen viser løst på papir');
    for (const bad of ['abc', '0', '99999999999']) { await go(q, 'prove/utskrift/' + bad); ok((await q.locator('.empty').count()) === 1, 'papir: ugyldig settnummer ' + bad); }
    await go(q, 'prove/tull'); ok((await q.locator('.empty').count()) === 1, 'prøve: ukjent underside');
    await go(q, 'prove/utskrift/4242'); await q.screenshot({ path: out + '/papir.png' }); await q.context().close(); }
  // 15) Flytte fremdrift: eksport, import, sammenslåing, feiltilstander
  { const A = await mk(), Bp = await mk();
    await go(A, ''); await A.click('#exp'); ok(/ingen fremdrift å flytte/.test(await A.textContent('#expmsg')), 'eksport: tom fremdrift gir beskjed');
    await go(A, 'oving/k3-effektiv-rente-grunn/2'); await A.fill('#p0-in', '1'); await A.press('#p0-in', 'Enter'); await go(A, 'eksamen/2025'); await A.check('input[data-k="2025-2a"]'); await go(A, '');
    const [dl] = await Promise.all([A.waitForEvent('download'), A.click('#exp')]); const txt = require('fs').readFileSync(await dl.path(), 'utf8');
    ok(/^okad221-fremdrift-\d{4}-\d{2}-\d{2}\.json$/.test(dl.suggestedFilename()) && JSON.parse(txt).app === 'okad221', 'eksport: fil med riktig navn og innhold');
    const file = (name, body) => ({ name, mimeType: 'application/json', buffer: Buffer.from(body) });
    await go(Bp, 'oving/k4-obligasjon-kurs-ytm-durasjon/3'); await Bp.fill('#p0-in', '5'); await Bp.press('#p0-in', 'Enter'); await go(Bp, '');
    for (const [nm, body, re] of [['tom.json', '', /tomt/], ['tull.json', '{ikke json', /kunne ikke leses/], ['annen.json', '{"app":"noe"}', /annet program/], ['ny.json', '{"app":"okad221","format":9,"data":{}}', /nyere versjon/], ['liste.json', '[1,2]', /ikke en fremdriftsfil/], ['uten.json', '{"app":"okad221","format":1,"data":{"x":1}}', /ingen fremdrift/]]) {
      await Bp.setInputFiles('#impf', file(nm, body)); await Bp.waitForTimeout(150); ok(re.test(await Bp.textContent('#impbox')) && /Ingenting er endret/.test(await Bp.textContent('#impbox')), 'import: ' + nm); }
    const before = await Bp.evaluate(() => localStorage.getItem('okad221:v1'));
    await Bp.setInputFiles('#impf', file('f.json', txt)); await Bp.waitForTimeout(150); ok(await Bp.evaluate(() => document.activeElement.id === 'impmerge'), 'import: fokus på Slå sammen');
    await Bp.click('#impcancel'); ok((await Bp.evaluate(() => localStorage.getItem('okad221:v1'))) === before, 'import: avbryt endrer ingenting');
    await Bp.setInputFiles('#impf', file('f.json', txt)); await Bp.waitForTimeout(150); await Bp.click('#impmerge'); await Bp.waitForTimeout(150);
    const m1 = await Bp.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1'))); ok(m1.gen['k3-effektiv-rente-grunn'].tried === 1 && m1.gen['k4-obligasjon-kurs-ytm-durasjon'].tried === 1 && m1.exam['2025-2a'], 'import: sammenslåing beholder begge');
    ok(/slått sammen/.test(await Bp.textContent('#impbox')), 'import: bekreftelse etter sammenslåing');
    await Bp.setInputFiles('#impf', file('f.json', txt)); await Bp.waitForTimeout(150); await Bp.click('#impmerge'); await Bp.waitForTimeout(150);
    ok(JSON.stringify(await Bp.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')))) === JSON.stringify(m1), 'import: samme fil to ganger endrer ingenting');
    await Bp.click('#pastebox summary'); await Bp.fill('#impt', txt); await Bp.click('#impgo'); await Bp.click('#impreplace'); await Bp.waitForTimeout(150);
    ok(!(await Bp.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')).gen['k4-obligasjon-kurs-ytm-durasjon'])), 'import: erstatt via innlimt tekst');
    const evil = JSON.stringify({ app: 'okad221', format: 1, data: { gen: { 'finnes-ikke': { tried: 3, ok: 1 }, 'k3-effektiv-rente-grunn': { tried: -4, ok: 1 } }, exam: { '<b>': true }, mockLog: [{ date: '<img src=x onerror=alert(1)>', score: 50, min: 3 }, { date: '1.1.2026', score: 70, min: 20 }] } });
    await Bp.click('#pastebox summary'); await Bp.fill('#impt', evil); await Bp.click('#impgo'); await Bp.waitForTimeout(100);
    ok(/finnes ikke på denne versjonen/.test(await Bp.textContent('#impbox')), 'import: ukjente oppgavetyper varsles'); await Bp.click('#impreplace'); await Bp.waitForTimeout(150);
    const ev = await Bp.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1'))); ok(ev.mockLog.length === 1 && !Object.keys(ev.exam).length && !ev.gen['k3-effektiv-rente-grunn'] && !ev.gen['finnes-ikke'], 'import: ugyldige verdier filtreres bort');
    ok((await Bp.locator('img[src=x]').count()) === 0, 'import: ingen HTML fra filen');
    const M = await mk({ w: 320, h: 640 }); await go(M, ''); await M.setInputFiles('#impf', file('f.json', txt)); await M.waitForTimeout(150); ok(!(await overflow(M)), 'import: forhåndsvisning uten sidelengs rulling på mobil');
    ok(await M.evaluate(() => { const t = document.querySelector('#impbox table'); return t.scrollWidth <= t.parentElement.clientWidth + 1; }), 'import: sammenligningstabellen får plass i 320 px'); await M.screenshot({ path: out + '/m-flytt.png', fullPage: true });
    await A.context().close(); await Bp.context().close(); await M.context().close(); }
  { const q = await mk({ init: () => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('sperret'); } }); } }); await go(q, '');
    await q.setInputFiles('#impf', { name: 'f.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ app: 'okad221', format: 1, data: { gen: { 'k3-effektiv-rente-grunn': { tried: 2, ok: 1, tasks: 1 } } } })) }); await q.waitForTimeout(150); await q.click('#impmerge'); await q.waitForTimeout(150);
    ok(/tillater ikke lagring/.test(await q.textContent('#impbox')) && /2 deloppgaver besvart/.test(await q.textContent('.statline')), 'sperret lagring: import virker for økten og sier fra'); await q.context().close(); }
  // 16) Repetisjonsliste: feil og åpnet løsning havner der, riktig løsning fjerner, prøveeksamen, flytting, ugyldige data
  { const q = await mk(), G = 'k6-lite-stort-anlegg', ls = () => q.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')));
    await go(q, 'repeter'); ok(/Ingenting å repetere ennå/.test(await q.textContent('#view')), 'repeter: tom liste forklarer hvordan den fylles');
    await go(q, ''); ok((await q.locator('.review-line').count()) === 0, 'repeter: ingen linje på forsiden når listen er tom');
    await go(q, `oving/${G}/7`); await q.fill('#p0-in', '1'); await q.press('#p0-in', 'Enter'); await q.click('[data-act=sol][data-i="1"]');
    ok(JSON.stringify((await ls()).gen[G].miss.map((x) => [x.s, x.p])) === '[[7,"ab"]]', 'repeter: feil svar og åpnet løsning lagres som a og b');
    await go(q, ''); ok(/Repeter 1 oppgave/.test(await q.textContent('.review-line')), 'repeter: forsiden viser linjen');
    await go(q, 'oving'); ok((await q.locator('.review-line a[href="#/repeter"]').count()) === 1, 'repeter: Øv-siden lenker til listen');
    await go(q, 'repeter'); ok((await q.locator('.review > li').count()) === 1 && /feil på a og b/.test(await q.textContent('.review')), 'repeter: listen viser oppgaven og deloppgavene');
    ok(await q.evaluate(() => document.querySelector('#nav a[aria-current]').textContent === 'Øv'), 'repeter: Øv er markert i menyen');
    await q.click('text=Samme oppgave igjen'); await q.waitForTimeout(200); ok(/#\/oving\/k6-lite-stort-anlegg\/7$/.test(await q.evaluate(() => location.hash)) && /deloppgave a og b/.test(await q.textContent('.callout.warn')), 'repeter: samme oppgave åpnes med beskjed om hva som var feil');
    const fasit = await q.evaluate((g) => OKAD.make(g, 7).parts.map((x) => (x.kind === 'num' ? OKAD.fmtAnswer(x) : null)), G);
    for (let i = 0; i < fasit.length; i++) if (fasit[i]) { await q.fill(`#p${i}-in`, fasit[i]); await q.press(`#p${i}-in`, 'Enter'); }
    ok(/fjernet fra repetisjonslisten/.test(await q.textContent('#rvmsg')) && !(await ls()).gen[G].miss, 'repeter: riktig løsning fjerner oppgaven');
    await go(q, 'repeter'); ok(/Ingenting å repetere</.test(await q.innerHTML('#view')) && !/ennå/.test(await q.textContent('.empty h2')), 'repeter: tom liste etter at alt er løst');
    await go(q, 'oving/k3-effektiv-rente-grunn/5'); await q.click('#all'); ok(((await ls()).gen['k3-effektiv-rente-grunn'].miss || []).length === 1, 'repeter: «Vis alle løsninger» før svar havner i listen');
    // Prøveeksamen levert blank: alle fem oppgavene havner i listen
    await go(q, 'prove'); await q.click('#start'); await q.waitForTimeout(200); await q.click('#submit'); await q.waitForTimeout(250);
    ok((await q.locator('#result a[href="#/repeter"]').count()) === 1, 'repeter: resultatet etter prøven lenker til listen');
    const mocked = Object.values((await ls()).gen).filter((g) => (g.miss || []).some((x) => x.m === 1)).length; ok(mocked >= 4, 'repeter: prøveeksamenens oppgaver lagres (' + mocked + ' typer)');
    await go(q, 'repeter'); ok(/prøveeksamen/.test(await q.textContent('.review')), 'repeter: merket «prøveeksamen»');
    const w = await q.evaluate(() => [...document.querySelectorAll('.review .rv-title')].map((a) => a.textContent)); ok(w.length >= 5, 'repeter: alle typene listes (' + w.length + ')');
    // Rekkefølge: den tyngste eksamenstypen (nåverdi etter skatt, 30 %) foran småtyper
    const order = await q.evaluate(() => [...document.querySelectorAll('.review .rv-title')].map((a) => a.getAttribute('href').split('/')[2]));
    ok(order.indexOf('k3-effektiv-rente-grunn') === order.length - 1, 'repeter: lite eksamensrelevant type står nederst');
    // Flytting beholder listen, og ugyldige oppføringer filtreres bort
    const txt = await q.evaluate(() => JSON.stringify({ app: 'okad221', format: 1, data: JSON.parse(localStorage.getItem('okad221:v1')) }));
    const q2 = await mk(); await go(q2, ''); await q2.click('#pastebox summary'); await q2.fill('#impt', txt); await q2.click('#impgo'); await q2.waitForTimeout(100);
    ok(/Oppgaver å repetere/.test(await q2.textContent('#impbox')), 'repeter: forhåndsvisningen viser antall å repetere'); await q2.click('#impmerge'); await q2.waitForTimeout(150);
    ok(JSON.stringify((await q2.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')))).gen['k3-effektiv-rente-grunn'].miss) === JSON.stringify((await ls()).gen['k3-effektiv-rente-grunn'].miss), 'repeter: listen flyttes med');
    await q2.click('#pastebox summary'); await q2.fill('#impt', txt); await q2.click('#impgo'); await q2.click('#impmerge'); await q2.waitForTimeout(150);
    ok((await q2.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')))).gen['k3-effektiv-rente-grunn'].miss.length === 1, 'repeter: samme fil to ganger dobler ikke listen');
    const bad = JSON.stringify({ app: 'okad221', format: 1, data: { gen: { 'k3-effektiv-rente-grunn': { tried: 2, ok: 1, tasks: 1, miss: [{ s: -3, p: 'a', t: 1 }, { s: 4, p: '<img src=x>', t: 1 }, { s: 9, p: 'b', t: 5 }] } } } });
    await q2.click('#pastebox summary'); await q2.fill('#impt', bad); await q2.click('#impgo'); await q2.click('#impreplace'); await q2.waitForTimeout(150);
    ok(JSON.stringify((await q2.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')))).gen['k3-effektiv-rente-grunn'].miss) === '[{"s":9,"p":"b","t":5}]', 'repeter: ugyldige oppføringer filtreres bort');
    await go(q2, 'repeter'); ok((await q2.locator('img[src=x]').count()) === 0, 'repeter: ingen HTML fra filen');
    await go(q2, 'repeter/tull'); ok((await q2.locator('.empty').count()) === 1, 'repeter: ukjent underside');
    const M = await mk({ w: 320, h: 640 }); await M.goto(B); await M.evaluate((t) => localStorage.setItem('okad221:v1', JSON.stringify(JSON.parse(t).data)), txt);
    await go(M, 'repeter'); await M.reload(); await M.waitForTimeout(250); ok(!(await overflow(M)), 'repeter: ingen sidelengs rulling i 320 px med full liste'); await M.screenshot({ path: out + '/m-repeter.png', fullPage: true });
    await go(M, ''); ok(!(await overflow(M)), 'repeter: forsiden med linje i 320 px'); await M.screenshot({ path: out + '/m-hjem-repeter.png' });
    await q.context().close(); await q2.context().close(); await M.context().close(); }
  // 17) Quiz med repetisjon: feil kommer igjen i senere runder til de er riktige, lagres, flyttes og tåler ugyldige data
  { const q = await mk(), ls = () => q.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')));
    const correctOf = (p) => p.evaluate(() => { const t = document.querySelector('#qq').textContent; const d = document.createElement('div'); return OKAD.quiz.find((x) => { d.innerHTML = x.q; return d.textContent === t; }).correct; });
    // Svarer på en hel runde. how(i) = true for riktig svar. Gir antall spørsmål merket «Repetisjon».
    const round = async (p, how) => { let reps = 0, k = 0; const tot = +(await p.textContent('.eyebrow')).match(/av (\d+)/)[1];
      for (; k < tot; k++) { if (/Repetisjon/.test(await p.textContent('.eyebrow'))) reps++; const c = await correctOf(p); await p.click(how(k) ? `.choice[data-o="${c}"]` : `.choice:not([data-o="${c}"]) >> nth=0`); await p.click('#nx'); } return { reps, tot }; };
    await go(q, 'quiz/repeter'); ok(/Ingenting å repetere ennå/.test(await q.textContent('.empty')), 'quiz-rep: tom før første runde');
    await go(q, 'quiz'); ok((await q.locator('#qdue').count()) === 0, 'quiz-rep: ingen repetisjonsboks før feil');
    await go(q, 'quiz/8'); const r1 = await round(q, () => false);
    ok(r1.reps === 0 && Object.keys((await ls()).qmiss).length === 10, 'quiz-rep: ti feil lagres (' + Object.keys((await ls()).qmiss).length + ')');
    ok(/kommer igjen i en senere runde/.test(await q.textContent('#view')), 'quiz-rep: resultatet sier at feilene kommer igjen');
    ok(Object.values((await ls()).qmiss).every((x) => x.n === 1 && x.t > 0), 'quiz-rep: oppføringene har tid og antall');
    await go(q, 'quiz'); ok(/10 spørsmål du har svart feil på/.test(await q.textContent('#qdue')) && /10<\/b> å repetere/.test(await q.innerHTML('a[href="#/quiz/8"]')), 'quiz-rep: oversikten viser antall, også per kapittel');
    await go(q, ''); ok(/10 å repetere/.test(await q.textContent('a[href="#/quiz"].rowlink')), 'quiz-rep: forsiden viser antall');
    await go(q, 'quiz/alle'); const r2 = await round(q, () => true);
    ok(r2.reps === 5, 'quiz-rep: neste runde har høyst fem repetisjoner (' + r2.reps + ')'); ok(Object.keys((await ls()).qmiss).length === 5, 'quiz-rep: riktige svar fjerner dem');
    ok(/5 er nå riktig/.test(await q.textContent('#qsum')), 'quiz-rep: resultatet teller det som ble ryddet');
    await go(q, 'quiz/repeter'); const r3 = await round(q, (k) => k > 0);
    ok(r3.tot === 5 && r3.reps === 5, 'quiz-rep: egen runde med bare repetisjon (' + r3.tot + ')');
    const left = (await ls()).qmiss; ok(Object.keys(left).length === 1 && Object.values(left)[0].n === 2, 'quiz-rep: ny feil på samme spørsmål øker telleren');
    ok(/Repeter igjen \(1\)/.test(await q.textContent('#again')), 'quiz-rep: knappen tilbyr ny repetisjon');
    await q.click('#again'); await q.waitForTimeout(100); ok(/Spørsmål 1 av 1/.test(await q.textContent('.eyebrow')) && /2 ganger/.test(await q.textContent('#qrep')), 'quiz-rep: spørsmålet sier hvor mange ganger det er feil');
    await go(q, 'repeter'); ok(/Repeter 1 quizspørsmål/.test(await q.textContent('#qline')), 'quiz-rep: repetisjonslisten lenker til quizen');
    // Flytting: med i forhåndsvisningen, flyttes, idempotent
    const txt = await q.evaluate(() => JSON.stringify({ app: 'okad221', format: 1, data: JSON.parse(localStorage.getItem('okad221:v1')) }));
    const q2 = await mk(), ls2 = () => q2.evaluate(() => JSON.parse(localStorage.getItem('okad221:v1')));
    await go(q2, ''); await q2.click('#pastebox summary'); await q2.fill('#impt', txt); await q2.click('#impgo'); await q2.waitForTimeout(100);
    ok(/Quizspørsmål å repetere/.test(await q2.textContent('#impbox')), 'quiz-rep: forhåndsvisningen viser quizrepetisjon'); await q2.click('#impmerge'); await q2.waitForTimeout(150);
    ok(JSON.stringify((await ls2()).qmiss) === JSON.stringify(left), 'quiz-rep: listen flyttes med');
    await q2.click('#pastebox summary'); await q2.fill('#impt', txt); await q2.click('#impgo'); await q2.click('#impmerge'); await q2.waitForTimeout(150);
    ok(JSON.stringify((await ls2()).qmiss) === JSON.stringify(left), 'quiz-rep: samme fil to ganger endrer ingenting');
    // Ugyldige data: ukjent id, negativ tid, HTML i antall, __proto__, liste i stedet for objekt
    const ids = await q2.evaluate(() => OKAD.quiz.slice(0, 3).map((x) => x.id));
    const bad = JSON.stringify({ app: 'okad221', format: 1, data: { qmiss: JSON.parse(`{"qfinnesikke":{"t":1,"n":1},"${ids[0]}":{"t":-5,"n":1},"${ids[1]}":{"t":5,"n":"<img src=x>"},"${ids[2]}":{"t":7,"n":2},"__proto__":{"t":1,"n":1}}`) } });
    await q2.click('#pastebox summary'); await q2.fill('#impt', bad); await q2.click('#impgo'); await q2.waitForTimeout(100);
    ok(/quizspørsmål å repetere finnes ikke/.test(await q2.textContent('#impbox')), 'quiz-rep: ukjente spørsmål varsles'); await q2.click('#impreplace'); await q2.waitForTimeout(150);
    ok(JSON.stringify((await ls2()).qmiss) === JSON.stringify({ [ids[2]]: { t: 7, n: 2 } }), 'quiz-rep: ugyldige oppføringer filtreres bort (' + JSON.stringify((await ls2()).qmiss) + ')');
    await go(q2, 'quiz'); ok((await q2.locator('img[src=x]').count()) === 0 && /1 spørsmål du har svart feil på/.test(await q2.textContent('#qdue')), 'quiz-rep: ingen HTML fra filen, gyldig oppføring brukes');
    await go(q2, ''); await q2.click('#pastebox summary'); await q2.fill('#impt', JSON.stringify({ app: 'okad221', format: 1, data: { gen: { 'k3-effektiv-rente-grunn': { tried: 1, ok: 1, tasks: 1 } }, qmiss: [1, 2] } })); await q2.click('#impgo'); await q2.click('#impreplace'); await q2.waitForTimeout(150);
    ok(JSON.stringify((await ls2()).qmiss) === '{}', 'quiz-rep: liste i stedet for objekt ignoreres');
    // Lagret tilstand med ødelagt qmiss eller utgått spørsmål ved oppstart
    await q2.evaluate(() => localStorage.setItem('okad221:v1', JSON.stringify({ gen: {}, exam: {}, quiz: {}, qmiss: 'tull' }))); await q2.reload(); await q2.waitForTimeout(200); await go(q2, 'quiz');
    ok((await q2.locator('#qdue').count()) === 0 && /Start blandet runde/.test(await q2.textContent('#view')), 'quiz-rep: ødelagt lagret liste gir tom liste');
    await q2.evaluate(() => localStorage.setItem('okad221:v1', JSON.stringify({ gen: {}, exam: {}, quiz: {}, qmiss: { qutgatt: { t: 1, n: 1 } } }))); await q2.reload(); await q2.waitForTimeout(200); await go(q2, 'quiz/repeter');
    ok(/Ingenting å repetere/.test(await q2.textContent('.empty')), 'quiz-rep: utgått spørsmål ved oppstart fjernes');
    await go(q2, 'quiz/repeter/x'); ok((await q2.locator('#view').count()) === 1, 'quiz-rep: ekstra ledd i adressen krasjer ikke');
    // Kapittel 8 etter ti feil har bare fire andre spørsmål: runden fylles med flere som venter, fortsatt ti spørsmål
    await q.evaluate(() => { const st = JSON.parse(localStorage.getItem('okad221:v1')); st.qmiss = {}; OKAD.quiz.filter((x) => x.ch === 8).slice(0, 10).forEach((x, k) => { st.qmiss[x.id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); });
    await q.reload(); await q.waitForTimeout(200); await go(q, 'quiz/8'); const r4 = await round(q, () => true); ok(r4.tot === 10 && r4.reps === 6, 'quiz-rep: kapittel med for få andre spørsmål fylles med flere som venter (' + r4.reps + ' av ' + r4.tot + ')');
    // Lite kapittel (alle har nå minst ti, så kapittel 1 kortes ned til fem i siden) og mobil 320 px
    await q2.evaluate(() => { const c1 = OKAD.quiz.filter((x) => x.ch === 1).slice(5); c1.forEach((x) => OKAD.quiz.splice(OKAD.quiz.indexOf(x), 1)); });
    await go(q2, 'quiz/1'); ok(/av 5/.test(await q2.textContent('.eyebrow')), 'quiz-rep: kapittel med fem spørsmål gir kort runde');
    const M = await mk({ w: 320, h: 640 }); await M.goto(B); await M.evaluate((t) => localStorage.setItem('okad221:v1', JSON.stringify(JSON.parse(t).data)), txt);
    await go(M, 'quiz'); await M.reload(); await M.waitForTimeout(250); ok(!(await overflow(M)), 'quiz-rep: oversikten i 320 px'); await M.screenshot({ path: out + '/m-quiz.png', fullPage: true });
    await go(M, 'quiz/repeter'); ok(!(await overflow(M)) && /Repetisjon/.test(await M.textContent('.eyebrow')), 'quiz-rep: repetisjonsspørsmål i 320 px'); await M.screenshot({ path: out + '/m-quiz-rep.png' });
    await q.context().close(); await q2.context().close(); await M.context().close(); }
  { const q = await mk({ init: () => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('sperret'); } }); } }); await go(q, 'quiz/8');
    for (let i = 0; i < 10; i++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent; const d = document.createElement('div'); return OKAD.quiz.find((x) => { d.innerHTML = x.q; return d.textContent === t; }).correct; }); await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); await q.click('#nx'); }
    await go(q, 'quiz'); ok(/10 spørsmål du har svart feil på/.test(await q.textContent('#qdue')), 'sperret lagring: quizrepetisjon virker for økten'); await q.context().close(); }
  // 18) De tre nye generatorene: fasit godtas, stjernediagram leselig, målsøking og tilnærming
  { const q = await mk({ w: 390, h: 800 });
    for (const [id, seed] of [['k6-folsomhet-internrente', 4], ['k8-leasing-kjop', 5], ['k8-ir-etter-skatt', 6]]) {
      await go(q, `oving/${id}/${seed}`); const fa = await q.evaluate(([g, s]) => OKAD.make(g, s).parts.map((x) => (x.kind === 'num' ? OKAD.fmtAnswer(x) : null)), [id, seed]);
      for (let i = 0; i < fa.length; i++) if (fa[i]) { await q.fill(`#p${i}-in`, fa[i]); await q.press(`#p${i}-in`, 'Enter'); }
      const fb = await q.evaluate(() => [...document.querySelectorAll('.fb')].map((x) => x.textContent).filter(Boolean)); ok(fb.length === fa.filter(Boolean).length && fb.every((x) => /Riktig/.test(x)), `ny type ${id}: alle fasitsvar godtas`);
      ok(!(await overflow(q)), `ny type ${id}: ingen sidelengs rulling med løsninger åpne`); }
    await go(q, 'oving/k6-folsomhet-internrente/4'); await q.click('#all');
    const ch = await q.evaluate(() => { const s = document.querySelector('svg.chart'), r = s.getBoundingClientRect(), host = s.closest('.solution').getBoundingClientRect(); const ls = [...s.querySelectorAll('text.lbl')].map((t) => t.getBoundingClientRect()).sort((a, b) => a.top - b.top);
      let olap = 0; for (let i = 1; i < ls.length; i++) if (ls[i].top < ls[i - 1].bottom - 0.5) olap++; const out = ls.filter((b) => b.right > r.right + 1 || b.top < r.top - 1 || b.bottom > r.bottom + 1).length;
      return { lines: s.querySelectorAll('polyline').length, w: r.width, host: host.width, olap, out, n: ls.length, font: parseFloat(getComputedStyle(s.querySelector('text.lbl')).fontSize) * r.width / 440 }; });
    ok(ch.lines === 6 && ch.n === 7, 'stjernediagram: seks linjer og sju navn (' + ch.lines + '/' + ch.n + ')'); ok(ch.w <= ch.host + 1, 'stjernediagram: får plass i 390 px');
    ok(ch.olap === 0 && ch.out === 0, `stjernediagram: navnene overlapper ikke og står inne i diagrammet (${ch.olap}/${ch.out})`); ok(ch.font >= 9.5, 'stjernediagram: tekst minst 9,5 px på mobil (' + ch.font.toFixed(1) + ')');
    // Kravlinjen og navnene i alle frø: ingen overlapp (sjekkes i SVG-koordinater, uten nettleser)
    const olapAll = await q.evaluate(() => { let bad = 0; for (let s = 1; s <= 300; s++) { const svg = OKAD.make('k6-folsomhet-internrente', s).parts[9].sol; const ys = [...svg.matchAll(/<text class="lbl[^"]*" x="[\d.]+" y="([\d.]+)"/g)].map((m) => +m[1]).sort((a, b) => a - b); for (let i = 1; i < ys.length; i++) if (ys[i] - ys[i - 1] < 16.9) bad++; if (ys[0] < 10 || ys[ys.length - 1] > 300) bad++; } return bad; });
    ok(olapAll === 0, 'stjernediagram: ingen overlapp over 300 frø (' + olapAll + ')');
    // Mørkt tema: linjer og tekst i temaets farger, ikke svart
    const d = await mk({ w: 1200, dark: true }); await go(d, 'oving/k6-folsomhet-internrente/4'); await d.click('#all');
    const col = await d.evaluate(() => { const t = document.querySelector('svg.chart text.lbl'), l = document.querySelector('svg.chart polyline'); return [getComputedStyle(t).fill, getComputedStyle(l).stroke, getComputedStyle(document.body).backgroundColor]; });
    ok(col[0] !== 'rgb(0, 0, 0)' && col[1] !== 'rgb(0, 0, 0)' && col[0] !== col[2], 'stjernediagram: lyst på mørk bakgrunn (' + col.join(' / ') + ')'); await d.locator('svg.chart').screenshot({ path: out + '/stjerne-mork.png' });
    await d.emulateMedia({ media: 'print' }); ok(await d.evaluate(() => getComputedStyle(document.querySelector('svg.chart polyline')).stroke === 'rgb(0, 0, 0)'), 'stjernediagram: svart ved utskrift'); await d.context().close();
    await q.locator('svg.chart').screenshot({ path: out + '/m-stjerne.png' });
    // Målsøking: svar innenfor 0,1 prosentpoeng godtas, utenfor ikke; løsningen oppgir avviket for tilnærmingen med fast skattefordel
    for (const [id, seed, k] of [['k8-leasing-kjop', 5, 5], ['k8-ir-etter-skatt', 6, 4], ['k8-egenkapitalmetoden', 3, 6]]) {
      await go(q, `oving/${id}/${seed}`); const a = await q.evaluate(([g, s, i]) => OKAD.make(g, s).parts[i].answer * 100, [id, seed, k]);
      await q.fill(`#p${k}-in`, OKAD_FMT(a + 0.15)); await q.press(`#p${k}-in`, 'Enter'); const far = await q.textContent(`#p${k}-fb`);
      await q.fill(`#p${k}-in`, OKAD_FMT(a + 0.09)); await q.press(`#p${k}-in`, 'Enter'); const near = await q.textContent(`#p${k}-fb`);
      ok(!/Riktig/.test(far) && /Riktig/.test(near), `${id}: internrenten godtas innenfor 0,1 prosentpoeng, ikke 0,15`);
      ok(/prosentpoeng fra målsøkingssvaret/.test(await q.textContent(`#p${k}-sol`)), `${id}: løsningen oppgir avviket for fast skattefordel`); }
    await go(q, 'oving/k8-leasing-kjop/5'); const npv = await q.evaluate(() => OKAD.make('k8-leasing-kjop', 5).parts[4].answer);
    await q.fill('#p4-in', String(Math.round(-npv))); await q.press('#p4-in', 'Enter'); ok(/fortegnet er feil/.test(await q.textContent('#p4-fb')), 'leasing: motsatt fortegn på NNV gjenkjennes');
    const rd = await q.evaluate(() => OKAD.make('k8-leasing-kjop', 5).parts[0].answer); await q.fill('#p0-in', String(rd).replace('.', ',')); await q.press('#p0-in', 'Enter'); ok(/desimaltall/.test(await q.textContent('#p0-fb')), 'leasing: lånerente som desimaltall gir beskjed');
    await q.context().close(); }
  // 19) Bølge 8: kapittel 12 (kredittpolitikk, kontantrabatt, Altmans Z) og salg av driftsmiddel (8.3)
  { const q = await mk({ w: 390, h: 800 }); const NEW = [['k12-kredittpolitikk', 7], ['k12-kontantrabatt', 7], ['k12-altman-z', 7], ['k8-salg-driftsmiddel', 7]];
    for (const [id, seed] of NEW) {
      await go(q, `oving/${id}/${seed}`); const fa = await q.evaluate(([g, s]) => OKAD.make(g, s).parts.map((x) => (x.kind === 'num' ? OKAD.fmtAnswer(x) : null)), [id, seed]);
      for (let i = 0; i < fa.length; i++) if (fa[i]) { await q.fill(`#p${i}-in`, fa[i]); await q.press(`#p${i}-in`, 'Enter'); }
      const fb = await q.evaluate(() => [...document.querySelectorAll('.fb')].map((x) => x.textContent).filter(Boolean)); ok(fb.length === fa.filter(Boolean).length && fb.every((x) => /Riktig/.test(x)), `bølge 8 ${id}: alle fasitsvar godtas`);
      await q.click('#all'); ok(!(await overflow(q)), `bølge 8 ${id}: ingen sidelengs rulling i 390 px med løsninger åpne`); }
    // Tusen kroner: svar i kroner gir egen beskjed, «tusen» i svaret godtas
    await go(q, 'oving/k12-kontantrabatt/7'); const k = await q.evaluate(() => OKAD.make('k12-kontantrabatt', 7).parts[0].answer);
    ok(/tusen kr/.test(await q.textContent('#p0-in + .unit')), 'kontantrabatt: enheten «tusen kr» står ved feltet');
    await q.fill('#p0-in', String(Math.round(k * 1000))); await q.press('#p0-in', 'Enter'); ok(/tusen kroner/.test(await q.textContent('#p0-fb')), 'kontantrabatt: svar i kroner gir beskjed om tusen kroner');
    await q.fill('#p0-in', Math.round(k) + ' tusen'); await q.press('#p0-in', 'Enter'); ok(/Riktig/.test(await q.textContent('#p0-fb')), 'kontantrabatt: «… tusen» godtas');
    // Netto resultatøkning med motsatt fortegn gjenkjennes
    const net = await q.evaluate(() => OKAD.make('k12-kontantrabatt', 7).parts[6].answer); await q.fill('#p6-in', String(Math.round(-net))); await q.press('#p6-in', 'Enter'); ok(/fortegnet er feil/.test(await q.textContent('#p6-fb')), 'kontantrabatt: motsatt fortegn på netto gjenkjennes');
    // Altman: negativ arbeidskapital uten minus gjenkjennes, sonen står i løsningen
    const zs = await q.evaluate(() => { for (let s = 1; s < 200; s++) if (OKAD.make('k12-altman-z', s).parts[0].answer < -0.01) return s; return 0; });
    await go(q, 'oving/k12-altman-z/' + zs); const x1 = await q.evaluate((s) => OKAD.make('k12-altman-z', s).parts[0].answer, zs);
    await q.fill('#p0-in', (-x1).toFixed(4).replace('.', ',')); await q.press('#p0-in', 'Enter'); ok(/fortegnet er feil/.test(await q.textContent('#p0-fb')), 'altman: negativ arbeidskapital uten minus gir fortegnsbeskjed');
    await q.click('#all'); ok(/høy konkursrisiko|gråsone|lav konkursrisiko/.test(await q.textContent('#p5-sol')), 'altman: løsningen plasserer Z i en sone');
    // Salg av driftsmiddel: NNV med inntektsføring godtas ikke som svar på nedskriving
    await go(q, 'oving/k8-salg-driftsmiddel/7'); const inn = await q.evaluate(() => OKAD.fmtAnswer(OKAD.make('k8-salg-driftsmiddel', 7).parts[2]));
    await q.fill('#p4-in', inn); await q.press('#p4-in', 'Enter'); ok(!/Riktig/.test(await q.textContent('#p4-fb')), 'salg: NNV med inntektsføring godtas ikke ved nedskriving');
    // Kapittel 12 i teorien og på Øv-siden, ikke i prøveeksamenen
    await go(q, 'tema/12'); ok((await q.locator('a[href^="#/oving/k12-"]').count()) === 4, 'tema 12: fire oppgavetyper under «Øv på kapitlet»');
    await go(q, 'oving'); ok(/Kapittel 12/.test(await q.textContent('#view')), 'Øv-siden har kapittel 12');
    ok(await q.evaluate(() => !OKAD.mockSlots.some((m) => m.pool.some(([g]) => /^k12-|k8-salg-driftsmiddel/.test(g)))), 'bølge 8: de nye typene er ikke i prøveeksamenens trekkpott');
    ok(await q.evaluate(() => OKAD.topics.skatt.gens.includes('k8-salg-driftsmiddel')), 'salg av driftsmiddel ligger under temaet nåverdi etter skatt');
    // Tastatur: Tab fra siste tallfelt til Sjekk
    await go(q, 'oving/k12-altman-z/7'); await q.focus('#p6-in'); await q.keyboard.press('Tab'); ok(await q.evaluate(() => document.activeElement.dataset.act === 'check'), 'altman: Tab fra siste tallfelt går til Sjekk');
    const M = await mk({ w: 320, h: 640 }); for (const [id, seed] of NEW) { await go(M, `oving/${id}/${seed}`); await M.click('#all'); ok(!(await overflow(M)), `bølge 8 ${id}: ingen sidelengs rulling i 320 px`); }
    await go(M, 'oving/k12-altman-z/7'); ok(await M.evaluate(() => { const e = document.querySelector('.task-text .formula.wrap'); return e && e.scrollWidth <= e.clientWidth + 1; }), 'altman: Z-formelen vises hel i 320 px'); await M.screenshot({ path: out + '/m-altman.png', fullPage: true }); await M.context().close();
    const D = await mk({ w: 1200, dark: true }); await go(D, 'oving/k12-kredittpolitikk/7'); await D.click('#all'); await D.screenshot({ path: out + '/kreditt-mork.png', fullPage: true }); await D.context().close();
    await q.context().close(); }
  // 20) Bølge 9: factoring (7.7b, 7.8), nøkkeltall for likviditet (12.3) og dager i året
  { const q = await mk({ w: 390, h: 800 }); const NEW = [['k7-factoring', 7], ['k12-nokkeltall-likviditet', 7]];
    // Et frø med kortere kredittid (forskudd ≠ frigjort) og et med forsinket forskudd
    await go(q, 'oving');
    const fs = await q.evaluate(() => { let a = 0, b = 0; for (let s = 1; s < 300 && !(a && b); s++) { const t = OKAD.make('k7-factoring', s); if (!a && /ned til/.test(t.text)) a = s; if (!b && /dager<\/b> etter at fakturaen/.test(t.text)) b = s; } return [a, b]; });
    NEW.push(['k7-factoring', fs[0]], ['k7-factoring', fs[1]]);
    for (const [id, seed] of NEW) {
      await go(q, `oving/${id}/${seed}`); const fa = await q.evaluate(([g, s]) => OKAD.make(g, s).parts.map((x) => (x.kind === 'num' ? OKAD.fmtAnswer(x) : null)), [id, seed]);
      for (let i = 0; i < fa.length; i++) if (fa[i]) { await q.fill(`#p${i}-in`, fa[i]); await q.press(`#p${i}-in`, 'Enter'); }
      const fb = await q.evaluate(() => [...document.querySelectorAll('.fb')].map((x) => x.textContent).filter(Boolean)); ok(fb.length === fa.filter(Boolean).length && fb.every((x) => /Riktig/.test(x)), `bølge 9 ${id}/${seed}: alle fasitsvar godtas`);
      await q.click('#all'); ok(!(await overflow(q)), `bølge 9 ${id}/${seed}: ingen sidelengs rulling i 390 px med løsninger åpne`); }
    // Factoring: frigjort kapital godtas ikke som forskuttert beløp når kredittiden blir kortere; prosent som desimaltall gir beskjed
    await go(q, 'oving/k7-factoring/' + fs[0]); const fr = await q.evaluate((s) => { const t = OKAD.make('k7-factoring', s); return [OKAD.fmtAnswer(t.parts[2]), t.parts[7].answer]; }, fs[0]);
    await q.fill('#p3-in', fr[0]); await q.press('#p3-in', 'Enter'); ok(!/Riktig/.test(await q.textContent('#p3-fb')), 'factoring: frigjort kapital godtas ikke som forskudd ved kortere kredittid');
    await q.fill('#p7-in', String(fr[1]).replace('.', ',')); await q.press('#p7-in', 'Enter'); ok(/desimaltall/.test(await q.textContent('#p7-fb')), 'factoring: kostnad som desimaltall gir beskjed');
    await go(q, 'oving/k7-factoring/' + fs[1]); await q.click('[data-act=hint][data-i="1"]'); ok(/dagene før forskuddet/.test(await q.textContent('#p1-hint')), 'factoring: hintet nevner dagene før forskuddet');
    // Nøkkeltall: «… dager» godtas, kasselikviditet med varelager godtas ikke, gjeldsandel som desimaltall gir beskjed
    await go(q, 'oving/k12-nokkeltall-likviditet/7'); const nk = await q.evaluate(() => { const t = OKAD.make('k12-nokkeltall-likviditet', 7); return [t.parts[4].answer, t.parts[1].answer, t.parts[3].answer]; });
    ok(/dager/.test(await q.textContent('#p4-in + .unit')), 'nøkkeltall: enheten «dager» står ved feltet');
    await q.fill('#p4-in', nk[0].toFixed(1).replace('.', ',') + ' dager'); await q.press('#p4-in', 'Enter'); ok(/Riktig/.test(await q.textContent('#p4-fb')), 'nøkkeltall: «… dager» godtas');
    await q.fill('#p2-in', nk[1].toFixed(2).replace('.', ',')); await q.press('#p2-in', 'Enter'); ok(!/Riktig/.test(await q.textContent('#p2-fb')), 'nøkkeltall: balanselikviditet godtas ikke som kasselikviditet');
    await q.fill('#p3-in', nk[2].toFixed(3).replace('.', ',')); await q.press('#p3-in', 'Enter'); ok(/desimaltall/.test(await q.textContent('#p3-fb')), 'nøkkeltall: gjeldsandel som desimaltall gir beskjed');
    await q.focus('#p6-in'); await q.keyboard.press('Tab'); ok(await q.evaluate(() => document.activeElement.dataset.act === 'check'), 'nøkkeltall: Tab fra siste tallfelt går til Sjekk');
    ok(/\?/.test(await q.textContent('.task-text table')), 'nøkkeltall: året som skal regnes, står med spørsmålstegn i tabellen');
    // Teori, Øv, formler, trekkpott
    await go(q, 'tema/7'); ok((await q.locator('a[href="#/oving/k7-factoring"]').count()) > 0, 'tema 7: factoring under «Øv på kapitlet»'); ok(/Factoring: frigjort kapital og kostnad i prosent/.test(await q.textContent('#view')) && /15,9 %/.test(await q.textContent('#view')), 'tema 7: fremgangsmåte og eksempel 7.8 for factoring');
    await go(q, 'tema/12'); ok(/Nøkkeltall for likviditet mot bransjen/.test(await q.textContent('#view')) && /58,7 %/.test(await q.textContent('#view')), 'tema 12: fremgangsmåte og eksempel for nøkkeltall, med merknad om gjeldsandelen');
    await go(q, 'formler'); await q.fill('#fs', 'kasselikviditet'); ok((await q.locator('.fitem').count()) > 0, 'formelsøk: kasselikviditet gir treff');
    await q.fill('#fs', 'oppgaveteksten sier'); ok((await q.locator('.fitem').count()) >= 4, 'formelsøk: regelen om dager i året står i formlene');
    ok(await q.evaluate(() => !OKAD.mockSlots.some((m) => m.pool.some(([g]) => g === 'k7-factoring' || g === 'k12-nokkeltall-likviditet'))), 'bølge 9: de nye typene er ikke i prøveeksamenens trekkpott');
    ok(await q.evaluate(() => !OKAD.prediction.slots.concat(OKAD.prediction.jokers).some((x) => x.gens.includes('k7-factoring') || x.gens.includes('k12-nokkeltall-likviditet'))), 'bølge 9: de nye typene er ikke i prognosen');
    // Dager i året: alle oppgavetyper som regner med kredittdager eller dager til bortfall, oppgir antallet i teksten
    const days = await q.evaluate(() => { const bad = []; for (const g of OKAD.gens) for (let s = 1; s <= 40; s++) { const t = OKAD.make(g.id, s), all = t.text + t.parts.map((p) => p.q).join(' ');
      if (/kreditt|kundefordring|kontantrabatt|factoring|bortfall/i.test(all) && /\d+ dager/.test(all) && !/(360|365) dager/.test(all)) { bad.push(g.id + '/' + s); break; } } return bad; });
    ok(days.length === 0, 'alle oppgavetyper med dager oppgir antall dager i året' + (days.length ? ': ' + days.join(', ') : ''));
    const M = await mk({ w: 320, h: 640 }); for (const [id, seed] of NEW) { await go(M, `oving/${id}/${seed}`); await M.click('#all'); ok(!(await overflow(M)), `bølge 9 ${id}/${seed}: ingen sidelengs rulling i 320 px`); }
    await go(M, 'oving/k12-nokkeltall-likviditet/7'); ok(await M.evaluate(() => { const w = document.querySelectorAll('.task-text .tablewrap')[1]; return w && w.scrollWidth <= w.clientWidth + 1; }), 'nøkkeltall: balansen med beløp vises hel i 320 px'); ok(await M.evaluate(() => { const w = document.querySelectorAll('.task-text .tablewrap')[0]; return w && w.scrollWidth <= w.clientWidth + 1; }), 'nøkkeltall: tabellen over nøkkeltallene vises hel i 320 px uten sidelengs rulling'); await M.screenshot({ path: out + '/m-nokkeltall.png', fullPage: true }); await M.context().close();
    const D = await mk({ w: 1200, dark: true }); await go(D, 'oving/k7-factoring/' + fs[0]); await D.click('#all'); await D.screenshot({ path: out + '/factoring-mork.png', fullPage: true }); await D.context().close();
    await q.context().close(); }
  // 20) Bølge 10: quizspørsmål om factoring (kap. 7) og nøkkeltall for likviditet (kap. 12)
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const sets = await q.evaluate(() => { const d = document.createElement('div'), txt = (h) => { d.innerHTML = h; return d.textContent; };
      return { f: OKAD.quiz.filter((x) => x.ch === 7 && /factoring/i.test(txt(x.q))).map((x) => x.id), n: OKAD.quiz.filter((x) => x.ch === 12 && /likviditet|gjeldsandel|kundekredittid|varelageret utenfor/i.test(txt(x.q))).map((x) => x.id) }; });
    ok(sets.f.length >= 6, 'bølge 10: minst seks factoringspørsmål i kapittel 7 (' + sets.f.length + ')');
    ok(sets.n.length >= 8, 'bølge 10: minst åtte nøkkeltallspørsmål i kapittel 12 (' + sets.n.length + ')');
    await go(q, 'quiz/12'); ok(/av 10/.test(await q.textContent('.eyebrow')), 'bølge 10: kapittel 12 gir full runde');
    for (const [nm, ids] of [['factoring', sets.f], ['nøkkeltall', sets.n]]) {
      await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, ids);
      await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === ids.length, `bølge 10 ${nm}: repetisjonsrunden har alle (${tot})`);
      let wide = 0, why = 0, pos = new Set();
      for (let k = 0; k < tot; k++) { const r = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); const x = OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }); return { c: x.correct, opt: x.options[x.correct] }; });
        pos.add(r.c); if (await overflow(q)) wide++;
        await q.click(`.choice:not([data-o="${r.c}"]) >> nth=0`); const w = await q.textContent('#why'); if (w.length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
      ok(wide === 0, `bølge 10 ${nm}: spørsmål og forklaring uten sidelengs rulling i 320 px`); ok(why === tot, `bølge 10 ${nm}: feil svar gir forklaring på alle (${why} av ${tot})`);
      ok(pos.size >= 3, `bølge 10 ${nm}: riktig svar står ikke på samme plass i dataene`);
      const left = await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss).length); ok(left === ids.length, `bølge 10 ${nm}: feil igjen holder spørsmålene i repetisjonen`); }
    await q.screenshot({ path: out + '/m-quiz-bolge10.png', fullPage: true }); await q.context().close(); }
  // 21) Bølge 11: quizspørsmål om kontantrabatt, kredittpolitikk og Altmans Z (kap. 12) og prisstigning (kap. 9)
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const sets = await q.evaluate(() => { const d = document.createElement('div'), txt = (h) => { d.innerHTML = h; return d.textContent; }, c12 = OKAD.quiz.filter((x) => x.ch === 12), c9 = OKAD.quiz.filter((x) => x.ch === 9);
      const r = (x) => /rabatt/i.test(txt(x.q)), k = (x) => !r(x) && /kredittpolitikk/i.test(txt(x.q)), z = (x) => /Altman|X\d|Z = /.test(txt(x.q));
      // Tall som står først i et feil alternativ, skal være forklart i forklaringen (navngitt feil)
      const unexplained = c12.filter((x) => r(x) || k(x) || z(x)).concat(c9).flatMap((x) => x.options.filter((o, i) => i !== x.correct && /^−?\d/.test(o) && !txt(x.why).includes(o.match(/^−?[\d \u00a0,]+\d/)[0])).map((o) => txt(x.q).slice(0, 30) + ' → ' + o));
      return { r: c12.filter(r).map((x) => x.id), k: c12.filter(k).map((x) => x.id), z: c12.filter(z).map((x) => x.id), n9a: c9.slice(0, 10).map((x) => x.id), n9b: c9.slice(10).map((x) => x.id), c9: c9.length, unexplained }; });
    ok(sets.r.length >= 6, 'bølge 11: minst seks spørsmål om kontantrabatt (' + sets.r.length + ')');
    ok(sets.k.length >= 5, 'bølge 11: minst fem spørsmål om kredittpolitikk (' + sets.k.length + ')');
    ok(sets.z.length >= 6, 'bølge 11: minst seks spørsmål om Altmans Z (' + sets.z.length + ')');
    ok(sets.c9 >= 14, 'bølge 11: minst 14 spørsmål i kapittel 9 (' + sets.c9 + ')');
    ok(sets.unexplained.length === 0, 'bølge 11: hvert feil tallalternativ er forklart' + (sets.unexplained.length ? ': ' + sets.unexplained.join(' | ') : ''));
    const brk = await q.evaluate(() => OKAD.quiz.filter((x) => [x.q, x.why].concat(x.options).some((t) => /\d \d{3}(?!\d)/.test(t))).length);
    ok(brk === 0, 'bølge 11: tusenskillet i quizen er hardt mellomrom, så tall ikke brytes på mobil (' + brk + ' med vanlig mellomrom)');
    ok(await q.evaluate(() => { const st = OKAD.quiz.find((x) => /183\u00a0028/.test(x.why)); return !!st && st.id === OKAD.U.hash(st.q.replace(/\u00a0/g, ' ')); }), 'bølge 11: id-en er laget før mellomrommene byttes, så repetisjonen ikke flyttes');
    await go(q, 'quiz/9'); ok(/av 10/.test(await q.textContent('.eyebrow')), 'bølge 11: kapittel 9 gir full runde');
    for (const [nm, ids] of [['kontantrabatt', sets.r], ['kredittpolitikk', sets.k], ['Altmans Z', sets.z], ['kapittel 9 del 1', sets.n9a], ['kapittel 9 del 2', sets.n9b]]) {
      await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, ids);
      await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === ids.length, `bølge 11 ${nm}: repetisjonsrunden har alle (${tot})`);
      let wide = 0, why = 0, pos = new Set();
      for (let k = 0; k < tot; k++) { const r = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); const x = OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }); return { c: x.correct }; });
        pos.add(r.c); if (await overflow(q)) wide++;
        await q.click(`.choice:not([data-o="${r.c}"]) >> nth=0`); const w = await q.textContent('#why'); if (w.length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
      ok(wide === 0, `bølge 11 ${nm}: spørsmål og forklaring uten sidelengs rulling i 320 px`); ok(why === tot, `bølge 11 ${nm}: feil svar gir forklaring på alle (${why} av ${tot})`);
      if (tot >= 4) ok(pos.size >= 3, `bølge 11 ${nm}: riktig svar står ikke på samme plass i dataene`);
      const left = await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss).length); ok(left === ids.length, `bølge 11 ${nm}: feil igjen holder spørsmålene i repetisjonen`); }
    await q.screenshot({ path: out + '/m-quiz-bolge11.png', fullPage: true }); await q.context().close(); }
  // 22) Bølge 12: quiz for kapittel 1 og hardt mellomrom i tusenskillet på hele siden
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const c1 = await q.evaluate(() => { const d = document.createElement('div'), txt = (h) => { d.innerHTML = h; return d.textContent; }, c = OKAD.quiz.filter((x) => x.ch === 1);
      const unexplained = c.flatMap((x) => x.options.filter((o, i) => i !== x.correct && /^−?\d/.test(o) && !txt(x.why).includes(o.match(/^−?[\d \u00a0,]+\d/)[0])).map((o) => txt(x.q).slice(0, 30) + ' → ' + o));
      return { ids: c.map((x) => x.id), pos: [...new Set(c.map((x) => x.correct))].length, unexplained }; });
    ok(c1.ids.length >= 10, 'bølge 12: minst ti spørsmål i kapittel 1 (' + c1.ids.length + ')');
    ok(c1.unexplained.length === 0, 'bølge 12: hvert feil tallalternativ i kapittel 1 er forklart' + (c1.unexplained.length ? ': ' + c1.unexplained.join(' | ') : ''));
    ok(c1.pos === 4, 'bølge 12: riktig svar står på alle fire plassene i kapittel 1');
    await go(q, 'quiz/1'); ok(/av 10/.test(await q.textContent('.eyebrow')), 'bølge 12: kapittel 1 gir full runde');
    for (const [nm, ids] of [['kapittel 1 del 1', c1.ids.slice(0, 10)], ['kapittel 1 del 2', c1.ids.slice(10)]]) {
      if (!ids.length) continue;
      await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, ids);
      await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === ids.length, `bølge 12 ${nm}: repetisjonsrunden har alle (${tot})`);
      let wide = 0, why = 0;
      for (let k = 0; k < tot; k++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
        if (await overflow(q)) wide++; await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); if ((await q.textContent('#why')).length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
      ok(wide === 0, `bølge 12 ${nm}: spørsmål og forklaring uten sidelengs rulling i 320 px`); ok(why === tot, `bølge 12 ${nm}: feil svar gir forklaring på alle (${why} av ${tot})`);
      const left = await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss).length); ok(left === ids.length, `bølge 12 ${nm}: feil igjen holder spørsmålene i repetisjonen`); }
    // Ingen tusenskille med vanlig mellomrom i det som vises, på noen side (tekstfelt holdes utenfor). Lukkede fasiter ligger også i siden og telles med.
    const loose = () => q.evaluate(() => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), hit = []; for (let t = w.nextNode(); t; t = w.nextNode()) { if (t.parentNode.nodeName !== 'TEXTAREA' && /\d \d{3}(?!\d)/.test(t.data)) hit.push(t.data.match(/.{0,15}\d \d{3}/)[0]); } return hit; });
    const pages = ['', 'analyse', 'oving', 'prove', 'prove/utskrift/4242', 'eksamener', 'tema', 'formler', 'verktoy', 'repeter'].concat(await q.evaluate(() => OKAD.theory.map((c) => 'tema/' + c.nr).concat(OKAD.exams.map((e) => 'eksamen/' + e.id), OKAD.gens.map((g) => 'oving/' + g.id + '/11'))));
    const bad = [];
    for (const h of pages) { await go(q, h); if (await q.locator('#all').count()) await q.click('#all');
      const hit = await loose(); if (hit.length) bad.push(h + ': ' + hit.slice(0, 2).join(' / ')); }
    ok(bad.length === 0, `bølge 12: tusenskillet er hardt mellomrom på alle ${pages.length} sider` + (bad.length ? ' – ' + bad.slice(0, 5).join(' | ') : ''));
    await go(q, 'tema/12'); ok(!(await overflow(q)), 'bølge 12: teori i 320 px uten sidelengs rulling');
    // Data og id-er er urørt: bare visningen er endret
    ok(await q.evaluate(() => OKAD.theory.some((c) => /\d \d{3}/.test(JSON.stringify(c))) && OKAD.exams.some((e) => /\d \d{3}/.test(JSON.stringify(e)))), 'bølge 12: teori- og eksamensdataene er uendret (byttet bare i visningen)');
    ok(await q.evaluate(() => OKAD.quiz.every((x) => x.id === OKAD.U.hash(x.q.replace(/\u00a0/g, ' ')) || x.id === OKAD.U.hash(x.q))), 'bølge 12: quiz-id-ene er de samme som før');
    // Svar med hardt mellomrom (kopiert fra siden) og med vanlig mellomrom godtas begge
    await go(q, 'verktoy'); await q.fill('#c1', '-1\u00a0000; 600; 600'); ok(!/ikke et tall/.test(await q.textContent('#o1')), 'bølge 12: kalkulatoren godtar beløp med hardt mellomrom');
    await q.context().close(); }
  // Skjermbilder
  const s = await mk(); for (const [nm, h, full] of [['hjem', '', true], ['oving', 'oving', false], ['analyse', 'analyse', true], ['tema', 'tema/8', false], ['task', 'oving/k8-nv-etter-skatt-komplett/42', false]]) { await go(s, h); await s.screenshot({ path: `${out}/${nm}.png`, fullPage: full }); }
  await s.emulateMedia({ colorScheme: 'dark' }); await go(s, 'oving/k4-obligasjon-kurs-ytm-durasjon/3'); await s.click('#all'); await s.screenshot({ path: out + '/task-dark.png' });
  console.log(`${pass.length} bestått, ${fails.length} feilet`); fails.forEach((f) => console.log('FEIL: ' + f)); await b.close();
})();
