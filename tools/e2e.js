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
  // Quiz-id-ene regnet fra de rå dataene utenfor nettleseren (som check.js), for å se at visningen ikke flytter repetisjonen
  const rawIds = (() => { const fs = require('fs'), path = require('path'), vm = require('vm'), root = path.join(__dirname, '..'); const ctx = { console, Intl, Math, Number, String, Array, Object, JSON, Date, parseFloat, isFinite, isNaN }; ctx.globalThis = ctx; vm.createContext(ctx);
    for (const m of fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script src="([^"?]+)/g)) if (!/app\.js$/.test(m[1])) vm.runInContext(fs.readFileSync(path.join(root, m[1]), 'utf8'), ctx);
    return ctx.OKAD.quiz.map((x) => ctx.OKAD.U.hash(x.q)).sort().join(','); })();
  const sameIds = async (p) => (await p.evaluate(() => OKAD.quiz.map((x) => x.id).sort().join(','))) === rawIds;

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
    ok(ids.length === 45, '45 generatorer'); await p.context().close(); }

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
  await p.fill('#c2n', '0'); ok(/større enn 0\sår/.test(await p.textContent('#o2')), 'lån: 0 år'); await p.fill('#c2n', '5'); await p.fill('#c2r', ''); ok(/Renten/.test(await p.textContent('#o2')), 'lån: tom rente'); await p.fill('#c2r', '0'); ok(/20[\s ]000,00/.test(await p.textContent('#o2')), 'lån: 0 % rente virker');
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
  await p.click('#submit'); await p.waitForTimeout(200); ok(/^100\s%/.test(await p.textContent('#result h1')), 'prøve: fasitsvar gir 100 % (' + (await p.textContent('#result h1')) + ')');
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
    ok((await q.textContent('#keybody')).replace(/\u00a0/g, ' ').includes(want.replace(/\u00a0/g, ' ')), 'papir: fasiten stemmer med oppgave 1');
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
    // Kapittel 8 der alle unntatt fire venter, har bare fire andre spørsmål: runden fylles med flere som venter, fortsatt ti spørsmål
    await q.evaluate(() => { const st = JSON.parse(localStorage.getItem('okad221:v1')); st.qmiss = {}; OKAD.quiz.filter((x) => x.ch === 8).slice(0, -4).forEach((x, k) => { st.qmiss[x.id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); });
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
    await go(q, 'tema/7'); ok((await q.locator('a[href="#/oving/k7-factoring"]').count()) > 0, 'tema 7: factoring under «Øv på kapitlet»'); ok(/Factoring: frigjort kapital og kostnad i prosent/.test(await q.textContent('#view')) && /15,9\s%/.test(await q.textContent('#view')), 'tema 7: fremgangsmåte og eksempel 7.8 for factoring');
    await go(q, 'tema/12'); ok(/Nøkkeltall for likviditet mot bransjen/.test(await q.textContent('#view')) && /58,7\s%/.test(await q.textContent('#view')), 'tema 12: fremgangsmåte og eksempel for nøkkeltall, med merknad om gjeldsandelen');
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
    ok(await sameIds(q), 'bølge 12: quiz-id-ene er de samme som før');
    // Svar med hardt mellomrom (kopiert fra siden) og med vanlig mellomrom godtas begge
    await go(q, 'verktoy'); await q.fill('#c1', '-1\u00a0000; 600; 600'); ok(!/ikke et tall/.test(await q.textContent('#o1')), 'bølge 12: kalkulatoren godtar beløp med hardt mellomrom');
    // Funn fra brukertesten: Formler og Quiz er synlige på mobil fra Teori, Formler og Quiz, med ett trykk
    for (const h of ['tema', 'tema/4', 'formler', 'quiz', 'quiz/1']) { await go(q, h); const sub = await q.evaluate(() => { const n = document.querySelector('#subnav'); return n && getComputedStyle(n).display !== 'none' ? [...n.querySelectorAll('a')].map((a) => a.textContent + (a.getAttribute('aria-current') ? '*' : '')) : null; });
      const want = h.startsWith('tema') ? 'Teori*' : h.startsWith('formler') ? 'Formler*' : 'Quiz*';
      ok(!!sub && sub.length === 3 && sub.includes(want), `bølge 12: raden Teori · Formler · Quiz vises i 320 px på ${h} (${sub})`); ok(!(await overflow(q)), `bølge 12: raden gir ingen sidelengs rulling på ${h}`); }
    for (const h of ['', 'oving', 'eksamener', 'prove']) { await go(q, h); ok(await q.evaluate(() => getComputedStyle(document.querySelector('#subnav')).display === 'none'), `bølge 12: raden vises ikke på ${h || 'hjem'}`); }
    await go(q, 'tema'); await q.click('#subnav a[href="#/quiz"]'); await q.waitForTimeout(150); ok(/#\/quiz$/.test(q.url()) && (await q.locator('#subnav a[aria-current="page"]').textContent()) === 'Quiz', 'bølge 12: ett trykk fra Teori til Quiz');
    ok(await q.evaluate(() => { const r = document.querySelector('#subnav a').getBoundingClientRect(); return r.height >= 44; }), 'bølge 12: trykkflaten i raden er minst 44 px høy');
    await go(q, 'formler'); await q.screenshot({ path: out + '/m-subnav.png' });
    await q.context().close();
    { const d = await mk();
      // Funn fra eier: lenken til siden man står på (ØKAD 221 på forsiden, Øv på Øv, Eksamensanalyse på analysen) gjorde ingenting
      for (const [h, sel] of [['', '.brand'], ['oving', '#nav a[href="#/oving"]'], ['analyse', '#nav a[href="#/analyse"]'], ['quiz', '#nav a[href="#/quiz"]']]) {
        await go(d, h); await d.evaluate(() => { scrollTo(0, 600); document.querySelector('#view').insertAdjacentHTML('beforeend', '<p id="stale">x</p>'); }); await d.click(sel); await d.waitForTimeout(150);
        ok(await d.evaluate(() => scrollY === 0 && !document.querySelector('#stale')), `lenken til siden man står på, viser den på nytt fra toppen (${h || 'hjem'})`); }
      await go(d, 'oving'); await d.click('#nav a[href="#/analyse"]'); await d.waitForTimeout(150); ok(/#\/analyse$/.test(d.url()), 'vanlige lenker virker som før');
      // Funn fra eier (Safari): en mellomlagret index.html uten #subnav sammen med ny app.js stoppet all navigasjon. Fanen ble markert, men innholdet ble stående.
      await go(d, 'eksamener'); await d.evaluate(() => document.querySelector('#subnav').remove());
      for (const [sel, h1] of [['.brand', 'Fem oppgavetyper'], ['#nav a[href="#/oving"]', 'Øv på'], ['#nav a[href="#/prove"]', 'Prøveeksamen'], ['#nav a[href="#/analyse"]', 'Hva kommer'], ['#nav a[href="#/quiz"]', 'Quiz']]) { await d.click(sel); await d.waitForTimeout(120); ok((await d.textContent('#view h1')).startsWith(h1), `uten #subnav i index.html virker navigasjonen fortsatt (${sel})`); }
      // Alle skript og stilarket har samme versjonsnummer, så en ny index.html aldri blandes med gamle filer fra mellomlageret
      const vs = await d.evaluate(() => [...document.querySelectorAll('script[src], link[rel=stylesheet][href^="css/"]')].map((x) => (x.getAttribute('src') || x.getAttribute('href')).split('?v=')[1]));
      ok(vs.length >= 20 && vs.every((v) => v && v === vs[0]), 'alle skript og stilarket har samme versjonsnummer (' + vs[0] + ')');
      // Krasjer en side, vises en feilmelding med vei videre, ikke innholdet fra forrige side
      const errs = fails.length; await go(d, 'eksamener'); await d.evaluate(() => { OKAD.prediction.slots = null; }); await d.click('#nav a[href="#/analyse"]'); await d.waitForTimeout(120);
      ok(/Siden kunne ikke vises/.test(await d.textContent('#view')) && (await d.locator('#reload').count()) === 1 && !/Tidligere eksamener/.test(await d.textContent('#view h1, #view h2')), 'en side som krasjer, gir feilmelding og knapp for å laste på nytt');
      fails.splice(errs); await d.reload(); await d.waitForTimeout(200); ok(/Hva kommer/.test(await d.textContent('#view h1')), 'last på nytt viser siden igjen');
      // Funn fra eier (Chrome og Safari): en innholdsblokkering stoppet js/data/analyse.js. Forsiden ble blank, og Øv, Analyse og ØKAD 221 viste forrige side.
      const names = await d.evaluate(() => [...document.querySelectorAll('script[src]')].map((x) => x.getAttribute('src').split('?')[0]));
      ok(!names.some((n) => /analy|track|stat|metric|pixel|beacon|(^|[\/_-])ads?[\/_.-]|banner|advert/i.test(n)), 'ingen skriptfil har et navn som innholdsblokkere stopper (' + names.filter((n) => /analy|track|stat|metric|pixel|beacon|banner|advert/i.test(n)).join(', ') + ')');
      await d.context().close(); }
    for (const f of ['prognose', 'eksamen-b', 'kreditt']) { const d = await mk(); const errs = fails.length; await d.route(new RegExp(f + '\\.js'), (r) => r.abort('blockedbyclient'));
      await d.goto(B); await d.waitForTimeout(300); ok(!(await d.locator('#notice').isHidden()) && (await d.textContent('#notice')).includes('blokker'), `blokkert ${f}.js: siden sier fra om det`);
      let blank = 0, stale = 0; for (const [sel, h] of [['.brand', ''], ['#nav a[href="#/oving"]', 'oving'], ['#nav a[href="#/eksamener"]', 'eksamener'], ['#nav a[href="#/analyse"]', 'analyse'], ['#nav a[href="#/prove"]', 'prove'], ['.brand', '']]) {
        await d.click(sel); await d.waitForTimeout(120); const t = await d.textContent('#view'); if (!t.trim()) blank++; if (h !== 'eksamener' && /Prøv selv først/.test(t)) stale++; }
      ok(blank === 0 && stale === 0, `blokkert ${f}.js: ingen blank side og aldri innholdet fra forrige side (${blank} blanke, ${stale} gamle)`);
      fails.splice(errs); await d.context().close(); }
    { const d = await mk();
      // Eier: hele årstall i varmekartet, og forklaring på «Gitt» (het «Sett»)
      await go(d, 'analyse'); const hh = await d.evaluate(() => [...document.querySelectorAll('table.heat thead th')].map((x) => x.textContent.trim()));
      ok(hh.includes('2025') && hh.includes('2016') && !hh.includes('25') && hh.includes('Gitt') && !hh.includes('Sett'), 'varmekartet har hele årstall og kolonnen Gitt (' + hh.slice(1, 4).join(',') + '…)');
      ok(/\d+ av 10/.test(await d.textContent('table.heat tbody td.gitt')) && /Gitt.{0,5} er hvor mange av de ti eksamenssettene/.test(await d.textContent('#view')), 'Gitt vises som «8 av 10» og er forklart over tabellen');
      const kap = await d.evaluate(() => [...document.querySelectorAll('table.heat tbody tr')].map((r) => [r.querySelector('td.kap').textContent, r.querySelector('th').textContent]));
      ok(kap.length === 14 && kap.every(([k]) => /^\d+(, \d+)*$/.test(k)) && kap.some(([k, n]) => k === '8' && /etter skatt/.test(n)) && kap.some(([k, n]) => k === '2, 4' && /før skatt/.test(n)), 'varmekartet viser kapittel i første kolonne for alle temaer');
      await d.click('table.heat td.kap a[href="#/tema/13"]'); await d.waitForTimeout(150); ok(/Kapittel 13/.test(await d.textContent('#view h1')), 'kapittellenken i varmekartet går til teorien');
      await go(d, 'quiz'); ok(await d.evaluate(() => getComputedStyle(document.querySelector('#subnav')).display === 'none'), 'bølge 12: raden vises ikke på desktop (toppmenyen har Formler og Quiz)'); await d.context().close(); } }
  // 23) Bølge 13: hardt mellomrom mellom tall og «%» og mellom tall og «kr» på hele siden
  { const q = await mk({ w: 320, h: 640 });
    // Søker i hver tekstnode og i teksten satt sammen på tvers av noder (som «<b>12,5</b> %»). Tekstfelt holdes utenfor.
    const loose = () => q.evaluate(() => { const re = /\d (?:%|kr(?![\p{L}\d]))|(?:^|[^\p{L}\d])kr [−-]?\d/u, w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), hit = []; let all = '';
      for (let t = w.nextNode(); t; t = w.nextNode()) { if (['TEXTAREA', 'SCRIPT', 'STYLE'].includes(t.parentNode.nodeName)) { all += '\n'; continue; } all += t.data; }
      const g = new RegExp(re.source, 'gu'); let m; while ((m = g.exec(all))) hit.push(all.slice(Math.max(0, m.index - 12), m.index + m[0].length + 3).replace(/\n/g, '⏎'));
      return hit; });
    await go(q, 'oving');
    const pages = ['', 'analyse', 'oving', 'prove', 'prove/utskrift/4242', 'eksamener', 'tema', 'formler', 'verktoy', 'repeter', 'quiz/alle'].concat(await q.evaluate(() => OKAD.theory.map((c) => 'tema/' + c.nr).concat(OKAD.exams.map((e) => 'eksamen/' + e.id), OKAD.gens.map((g) => 'oving/' + g.id + '/11'))));
    const bad = []; let seen = 0;
    for (const h of pages) { await go(q, h); if (await q.locator('#all').count()) await q.click('#all');
      seen += await q.evaluate(() => (document.body.textContent.match(/\d (?:%|kr)/g) || []).length);
      const hit = await loose(); if (hit.length) bad.push(h + ': ' + hit.slice(0, 2).join(' / ')); }
    ok(bad.length === 0, `bølge 13: «%» og «kr» står med hardt mellomrom etter tallet på alle ${pages.length} sider` + (bad.length ? ' – ' + bad.slice(0, 5).join(' | ') : ''));
    ok(seen > 500, 'bølge 13: kontrollen fant tall med «%» eller «kr» å se på (' + seen + ')');
    // Prøveeksamen levert: resultat og løsninger i prosent og kroner
    await go(q, 'prove'); await q.click('#start'); await q.waitForTimeout(200); await q.click('#submit'); await q.waitForTimeout(200);
    const pr = await loose(); ok(pr.length === 0, 'bølge 13: levert prøveeksamen uten løst «%» eller «kr»' + (pr.length ? ' – ' + pr.slice(0, 3).join(' | ') : ''));
    // Quiz: spørsmål, alternativer og forklaring
    await go(q, 'quiz/alle'); let qb = 0; for (let k = 0; k < 10; k++) { await q.click('.choice >> nth=0'); qb += (await loose()).length; await q.click('#nx'); }
    ok(qb === 0, 'bølge 13: quizen (spørsmål, alternativer og forklaringer) uten løst «%» eller «kr»');
    // Kanttilfeller: «kr» som del av et ord endres ikke, «kr 500» og tall i egen node får hardt mellomrom
    await go(q, 'formler');
    const edge = await q.evaluate(async () => { const d = document.createElement('p'); d.id = 'nb13'; d.textContent = 'x'; document.querySelector('#view').appendChild(d);
      d.innerHTML = '5 kroner, 10 kreditt, 3 krav, Okr 5, 12,5 % og 1 425 050 kr, kr 500, kr −3, 12 kr. <b>7,5</b> % og <span class="num">400</span> kr';
      await new Promise((r) => setTimeout(r, 30)); return d.textContent.replace(/ /g, '_'); });
    ok(edge === '5 kroner, 10 kreditt, 3 krav, Okr 5, 12,5_% og 1_425_050_kr, kr_500, kr_−3, 12_kr. 7,5_% og 400_kr', 'bølge 13: kanttilfeller («kroner», «kreditt», «kr 500», tall i egen node) – ' + edge);
    // Data, id-er og lagret fremdrift er urørt: bare visningen er endret
    ok(await q.evaluate(() => OKAD.theory.some((c) => /\d %/.test(JSON.stringify(c))) && OKAD.exams.some((e) => /\d %/.test(JSON.stringify(e))) && OKAD.exams.some((e) => /\d kr\b/.test(JSON.stringify(e)))), 'bølge 13: teori- og eksamensdataene er uendret (byttet bare i visningen)');
    ok(await sameIds(q), 'bølge 13: quiz-id-ene er de samme som før (hash av de rå dataene, regnet utenfor nettleseren)');
    ok(await q.evaluate(() => OKAD.U.pct(0.125, 1) === '12,5 %' && OKAD.U.kr(500) === '500 kr'), 'bølge 13: tallformatet i koden er uendret (hardt mellomrom bare i visningen)');
    // Fremdriftsteksten (tekstfelt) kopieres ut uendret, og svar som limes inn fra siden forstås
    await go(q, 'oving/k4-obligasjon-kurs-ytm-durasjon/3'); const a1 = await q.evaluate(() => OKAD.fmtAnswer(OKAD.make('k4-obligasjon-kurs-ytm-durasjon', 3).parts[1]));
    await q.fill('#p1-in', a1.replace(/ /g, ' ')); await q.press('#p1-in', 'Enter'); ok(/Riktig/.test(await q.textContent('#p1-fb')), 'bølge 13: svar med hardt mellomrom før «%» godtas (' + a1 + ')');
    await go(q, 'tema/8'); ok(!(await overflow(q)), 'bølge 13: teori i 320 px uten sidelengs rulling');
    await go(q, 'oving/k12-kontantrabatt/7'); await q.click('#all'); ok(!(await overflow(q)), 'bølge 13: oppgave med løsninger i 320 px uten sidelengs rulling'); await q.screenshot({ path: out + '/m-bolge13.png', fullPage: true });
    await q.context().close(); }
  // 24) Bølge 14: hardt mellomrom mellom tall og «dager», «år», «tusen» og «prosentpoeng» på hele siden
  { const q = await mk({ w: 320, h: 640 });
    const RE = '\\d (?:%|(?:kr|dager|år|tusen|prosentpoeng)s?(?![\\p{L}\\d]))|\\d\u00a0tusen kr(?![\\p{L}\\d])|(?:^|[^\\p{L}\\d])kr [−-]?\\d';
    const loose = () => q.evaluate((src) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), hit = []; let all = '';
      for (let t = w.nextNode(); t; t = w.nextNode()) { if (['TEXTAREA', 'SCRIPT', 'STYLE'].includes(t.parentNode.nodeName)) { all += '\n'; continue; } all += t.data; }
      const g = new RegExp(src, 'gu'); let m; while ((m = g.exec(all))) hit.push(all.slice(Math.max(0, m.index - 12), m.index + m[0].length + 3).replace(/\n/g, '⏎'));
      return hit; }, RE);
    await go(q, 'oving');
    const pages = ['', 'analyse', 'oving', 'prove', 'prove/utskrift/4242', 'eksamener', 'tema', 'formler', 'verktoy', 'repeter', 'quiz/alle'].concat(await q.evaluate(() => OKAD.theory.map((c) => 'tema/' + c.nr).concat(OKAD.exams.map((e) => 'eksamen/' + e.id), OKAD.gens.map((g) => 'oving/' + g.id + '/11'))));
    const bad = [], seen = { dager: 0, år: 0, tusen: 0, prosentpoeng: 0 };
    for (const h of pages) { await go(q, h); if (await q.locator('#all').count()) await q.click('#all');
      const c = await q.evaluate(() => { const t = document.body.textContent, r = {}; for (const u of ['dager', 'år', 'tusen', 'prosentpoeng']) r[u] = (t.match(new RegExp('\\d\u00a0' + u + 's?(?![\\p{L}\\d])', 'gu')) || []).length; return r; });
      for (const u in c) seen[u] += c[u];
      const hit = await loose(); if (hit.length) bad.push(h + ': ' + hit.slice(0, 2).join(' / ')); }
    ok(bad.length === 0, `bølge 14: «dager», «år», «tusen» og «prosentpoeng» (og «%», «kr») står med hardt mellomrom etter tallet på alle ${pages.length} sider` + (bad.length ? ' – ' + bad.slice(0, 5).join(' | ') : ''));
    ok(Object.values(seen).every((x) => x > 0), 'bølge 14: kontrollen fant alle fire enhetene å se på (' + JSON.stringify(seen) + ')');
    await go(q, 'prove'); await q.click('#start'); await q.waitForTimeout(200); await q.click('#submit'); await q.waitForTimeout(200);
    const pr = await loose(); ok(pr.length === 0, 'bølge 14: levert prøveeksamen uten løse enheter' + (pr.length ? ' – ' + pr.slice(0, 3).join(' | ') : ''));
    await go(q, 'quiz/alle'); let qb = 0; for (let k = 0; k < 10; k++) { await q.click('.choice >> nth=0'); qb += (await loose()).length; await q.click('#nx'); }
    ok(qb === 0, 'bølge 14: quizen (spørsmål, alternativer og forklaringer) uten løse enheter');
    // Kanttilfeller: enheten må være eget ord, bøyningen med -s tas med, og tall og enhet i hver sin node
    await go(q, 'formler');
    const edge = await q.evaluate(async () => { const d = document.createElement('p'); document.querySelector('#view').appendChild(d);
      d.innerHTML = '30 dager, 30 dagers kreditt, 3 år, 3 års levetid, 5 årlig, i år 1, 4 dagen, 2 tusenlapper, 1 398 tusen kr, 0,4 prosentpoeng, <b>45</b> dager og <span>1 398</span> tusen kr';
      await new Promise((r) => setTimeout(r, 30)); return d.textContent.replace(/\u00a0/g, '_'); });
    ok(edge === '30_dager, 30_dagers kreditt, 3_år, 3_års levetid, 5 årlig, i år 1, 4 dagen, 2 tusenlapper, 1_398_tusen_kr, 0,4_prosentpoeng, 45_dager og 1_398_tusen_kr', 'bølge 14: kanttilfeller («årlig», «i år 1», «tusenlapper», «dagers», «tusen kr», tall i egen node) – ' + edge);
    // Data, id-er og svarfelt er urørt
    ok(await q.evaluate(() => OKAD.theory.some((c) => /\d (?:dager|år)/.test(JSON.stringify(c))) && OKAD.exams.some((e) => /\d år/.test(JSON.stringify(e)))), 'bølge 14: teori- og eksamensdataene er uendret (byttet bare i visningen)');
    ok(await sameIds(q), 'bølge 14: quiz-id-ene er de samme som før (hash av de rå dataene)');
    await go(q, 'oving/k12-nokkeltall-likviditet/7'); const a4 = await q.evaluate(() => OKAD.fmtAnswer(OKAD.make('k12-nokkeltall-likviditet', 7).parts[4]));
    await q.fill('#p4-in', a4.replace(/ /g, '\u00a0') + '\u00a0dager'); await q.press('#p4-in', 'Enter'); ok(/Riktig/.test(await q.textContent('#p4-fb')), 'bølge 14: svar med hardt mellomrom før «dager» godtas (' + a4 + ')');
    await go(q, 'oving/k12-kontantrabatt/7'); await q.fill('#p0-in', (await q.evaluate(() => OKAD.fmtAnswer(OKAD.make('k12-kontantrabatt', 7).parts[0]))).replace(/ /g, '\u00a0') + '\u00a0tusen'); await q.press('#p0-in', 'Enter'); ok(/Riktig/.test(await q.textContent('#p0-fb')), 'bølge 14: svar med hardt mellomrom før «tusen» godtas');
    await q.click('#all'); ok(!(await overflow(q)), 'bølge 14: oppgave med løsninger i 320 px uten sidelengs rulling'); await q.screenshot({ path: out + '/m-bolge14.png', fullPage: true });
    await q.context().close(); }
  // 25) Bølge 15: hardt mellomrom også før «mill.», «millioner», «mnd.», «måneder», «timer» og «prosent»
  { const q = await mk({ w: 320, h: 640 });
    const NEW = ['mill', 'millioner', 'mnd', 'måned', 'måneder', 'timer', 'prosent'];
    const RE = '\\d (?:%|(?:kr|dager|år|tusen|prosentpoeng|' + NEW.join('|') + ')s?(?![\\p{L}\\d]))|\\d\u00a0(?:tusen|mill\\.|millioner) kr(?![\\p{L}\\d])|(?:^|[^\\p{L}\\d])kr [−-]?\\d';
    const loose = () => q.evaluate((src) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), hit = []; let all = '';
      for (let t = w.nextNode(); t; t = w.nextNode()) { if (['TEXTAREA', 'SCRIPT', 'STYLE'].includes(t.parentNode.nodeName)) { all += '\n'; continue; } all += t.data; }
      const g = new RegExp(src, 'gu'); let m; while ((m = g.exec(all))) hit.push(all.slice(Math.max(0, m.index - 12), m.index + m[0].length + 3).replace(/\n/g, '⏎'));
      return hit; }, RE);
    await go(q, 'oving');
    const pages = ['', 'analyse', 'oving', 'prove', 'prove/utskrift/4242', 'eksamener', 'tema', 'formler', 'verktoy', 'repeter', 'quiz/alle'].concat(await q.evaluate(() => OKAD.theory.map((c) => 'tema/' + c.nr).concat(OKAD.exams.map((e) => 'eksamen/' + e.id), OKAD.gens.map((g) => 'oving/' + g.id + '/11'))));
    const bad = []; let seen = 0;
    for (const h of pages) { await go(q, h); if (await q.locator('#all').count()) await q.click('#all');
      seen += await q.evaluate((u) => (document.body.textContent.match(new RegExp('\\d\u00a0(?:' + u + ')\\.?s?(?![\\p{L}\\d])', 'gu')) || []).length, NEW.join('|'));
      const hit = await loose(); if (hit.length) bad.push(h + ': ' + hit.slice(0, 2).join(' / ')); }
    ok(bad.length === 0, `bølge 15: «mill.», «millioner», «mnd.», «måneder», «timer» og «prosent» (og enhetene fra før) står med hardt mellomrom etter tallet på alle ${pages.length} sider` + (bad.length ? ' – ' + bad.slice(0, 5).join(' | ') : ''));
    ok(seen >= 10, 'bølge 15: kontrollen fant de nye enhetene å se på (' + seen + ')');
    await go(q, 'quiz/alle'); let qb = 0; for (let k = 0; k < 10; k++) { await q.click('.choice >> nth=0'); qb += (await loose()).length; await q.click('#nx'); }
    ok(qb === 0, 'bølge 15: quizen uten løse enheter');
    await go(q, 'formler');
    const edge = await q.evaluate(async () => { const d = document.createElement('p'); document.querySelector('#view').appendChild(d);
      d.innerHTML = '2,5 millioner kr, 1,6 mill. kr, 6 mnd, 12 mnd. rente, 1 måned, 3 måneder, 3 måneders kreditt, 4 timer, 5 prosent, 2 milliarder, 3 millionærer, 4 timeregnskap, 5 prosentvis, 2 prosentpoeng og <b>6</b> måneder';
      await new Promise((r) => setTimeout(r, 30)); return d.textContent.replace(/\u00a0/g, '_'); });
    ok(edge === '2,5_millioner_kr, 1,6_mill._kr, 6_mnd, 12_mnd. rente, 1_måned, 3_måneder, 3_måneders kreditt, 4_timer, 5_prosent, 2 milliarder, 3 millionærer, 4 timeregnskap, 5 prosentvis, 2_prosentpoeng og 6_måneder', 'bølge 15: kanttilfeller («millionærer», «timeregnskap», «prosentvis», «mill. kr», tall i egen node) – ' + edge);
    ok(await sameIds(q), 'bølge 15: quiz-id-ene er de samme som før (hash av de rå dataene)');
    ok(await q.evaluate(() => OKAD.theory.some((c) => /\d (?:mill\.|millioner|måneder|timer)/.test(JSON.stringify(c))) || OKAD.exams.some((e) => /\d (?:mill\.|millioner|måneder|timer)/.test(JSON.stringify(e)))), 'bølge 15: teori- og eksamensdataene er uendret (byttet bare i visningen)');
    await go(q, 'tema/4'); ok(!(await overflow(q)), 'bølge 15: teori i 320 px uten sidelengs rulling');
    await q.context().close(); }
  // 26) Bølge 16: fire nye quizspørsmål i hvert av kapittel 2, 3, 5 og 6
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const cs = await q.evaluate(() => { const d = document.createElement('div'), txt = (h) => { d.innerHTML = h; return d.textContent; }, r = {};
      for (const ch of [2, 3, 5, 6]) { const c = OKAD.quiz.filter((x) => x.ch === ch);
        const unexplained = c.flatMap((x) => x.options.filter((o, i) => i !== x.correct && /^−?\d/.test(o) && !txt(x.why).includes(o.match(/^−?[\d  ,]+\d|^\d/)[0])).map((o) => txt(x.q).slice(0, 30) + ' → ' + o));
        r[ch] = { ids: c.map((x) => x.id), newIds: c.slice(-4).map((x) => x.id), newPos: c.slice(-4).map((x) => x.correct).sort().join(''), pos: new Set(c.map((x) => x.correct)).size, unexplained }; }
      return r; });
    for (const ch of [2, 3, 5, 6]) { const c = cs[ch];
      ok(c.ids.length >= 16, `bølge 16: minst 16 spørsmål i kapittel ${ch} (${c.ids.length})`);
      ok(c.unexplained.length === 0, `bølge 16: hvert feil tallalternativ i kapittel ${ch} er forklart` + (c.unexplained.length ? ': ' + c.unexplained.join(' | ') : ''));
      ok(c.newPos === '0123' && c.pos === 4, `bølge 16: riktig svar står på alle fire plassene i de nye spørsmålene i kapittel ${ch}`);
      await go(q, 'quiz/' + ch); ok(/av 10/.test(await q.textContent('.eyebrow')), `bølge 16: kapittel ${ch} gir full runde`); }
    const ids = [2, 3, 5, 6].flatMap((ch) => cs[ch].newIds);
    for (const [nm, part] of [['del 1', ids.slice(0, 8)], ['del 2', ids.slice(8)]]) {
      await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, part);
      await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === part.length, `bølge 16 ${nm}: repetisjonsrunden har alle nye spørsmål (${tot})`);
      let wide = 0, why = 0;
      for (let k = 0; k < tot; k++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
        if (await overflow(q)) wide++; await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); if ((await q.textContent('#why')).length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
      ok(wide === 0, `bølge 16 ${nm}: spørsmål og forklaring uten sidelengs rulling i 320 px`); ok(why === tot, `bølge 16 ${nm}: feil svar gir forklaring på alle (${why} av ${tot})`);
      const left = await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss).length); ok(left === part.length, `bølge 16 ${nm}: feil igjen holder spørsmålene i repetisjonen`); }
    ok(await sameIds(q), 'bølge 16: quiz-id-ene er de samme som i de rå dataene');
    await q.context().close(); }
  // 27) Bølge 17: hvert feil tallalternativ er forklart i alle 13 kapitler, og fire nye spørsmål i kapittel 10 og 13
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const all = await q.evaluate(() => { const d = document.createElement('div'), txt = (h) => { d.innerHTML = h; return d.textContent; }, r = {};
      for (let ch = 1; ch <= 13; ch++) { const c = OKAD.quiz.filter((x) => x.ch === ch);
        r[ch] = { n: c.length, pos: new Set(c.map((x) => x.correct)).size, unexplained: c.flatMap((x) => x.options.filter((o, i) => i !== x.correct && /^−?\d/.test(o) && !txt(x.why).includes(o.match(/^−?[\d \u00a0,]+\d|^\d/)[0])).map((o) => txt(x.q).slice(0, 30) + ' → ' + o)) }; }
      const nw = (re) => OKAD.quiz.filter((x) => re.test(x.q)).map((x) => ({ id: x.id, c: x.correct, ch: x.ch }));
      r.nye = nw(/0,25 for begge opp|−0,00525 \(korrelasjon|fra 100 til 1.425,05|fra 165 til 168|m = 0,7778 aksjer|38.000 å spekulere|salgsopsjoner med innløsningskurs 400 og premie 44|salgsopsjon med innløsningskurs 400 og betaler 44/);
      return r; });
    const bad = []; for (let ch = 1; ch <= 13; ch++) bad.push(...all[ch].unexplained);
    ok(bad.length === 0, 'bølge 17: hvert feil tallalternativ er forklart i alle 13 kapitler' + (bad.length ? ': ' + bad.slice(0, 8).join(' | ') : ''));
    ok([...Array(13).keys()].every((k) => all[k + 1].pos === 4), 'bølge 17: riktig svar står på alle fire plassene i hvert kapittel');
    ok(all[10].n >= 17 && all[13].n >= 18, `bølge 17: kapittel 10 har minst 17 og kapittel 13 minst 18 spørsmål (${all[10].n} og ${all[13].n})`);
    const nye = all.nye; ok(nye.length === 8, 'bølge 17: alle åtte nye spørsmål finnes (' + nye.length + ')');
    for (const ch of [10, 13]) ok(nye.filter((x) => x.ch === ch).map((x) => x.c).sort().join('') === '0123', `bølge 17: riktig svar på alle fire plassene i de nye spørsmålene i kapittel ${ch}`);
    for (const ch of [10, 13]) { await go(q, 'quiz/' + ch); ok(/av 10/.test(await q.textContent('.eyebrow')), `bølge 17: kapittel ${ch} gir full runde`); }
    const ids = nye.map((x) => x.id);
    await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, ids);
    await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === ids.length, `bølge 17: repetisjonsrunden har alle nye spørsmål (${tot})`);
    let wide = 0, why = 0;
    for (let k = 0; k < tot; k++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
      if (await overflow(q)) wide++; await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); if ((await q.textContent('#why')).length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
    ok(wide === 0, 'bølge 17: spørsmål og forklaring uten sidelengs rulling i 320 px'); ok(why === tot, `bølge 17: feil svar gir forklaring på alle (${why} av ${tot})`);
    ok(await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss).length) === ids.length, 'bølge 17: feil igjen holder spørsmålene i repetisjonen');
    ok(await sameIds(q), 'bølge 17: quiz-id-ene er de samme som i de rå dataene');
    await q.context().close(); }
  // 28) Bølge 18: fire nye quizspørsmål i kapittel 8 og 11
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const r = await q.evaluate(() => { const re = /sparer den 149.000 i transportutgifter|uavskrevet saldo 131.693|samlet skatteledd\?|20.000 ved 10.% krav og −30.000|Egenkapitalbeta er 1,55|Gjelden er omsatt og har beta 0,24|Olav Thon ASA har beta 1,23|Kovariansen mellom en aksje og markedet er 0,03/;
      return { n8: OKAD.quiz.filter((x) => x.ch === 8).length, n11: OKAD.quiz.filter((x) => x.ch === 11).length, nye: OKAD.quiz.filter((x) => re.test(x.q)).map((x) => ({ id: x.id, c: x.correct, ch: x.ch })) }; });
    ok(r.n8 >= 18 && r.n11 >= 18, `bølge 18: kapittel 8 og 11 har minst 18 spørsmål hver (${r.n8} og ${r.n11})`);
    ok(r.nye.length === 8, 'bølge 18: alle åtte nye spørsmål finnes (' + r.nye.length + ')');
    for (const ch of [8, 11]) ok(r.nye.filter((x) => x.ch === ch).map((x) => x.c).sort().join('') === '0123', `bølge 18: riktig svar på alle fire plassene i de nye spørsmålene i kapittel ${ch}`);
    for (const ch of [8, 11]) { await go(q, 'quiz/' + ch); ok(/av 10/.test(await q.textContent('.eyebrow')), `bølge 18: kapittel ${ch} gir full runde`); }
    const ids = r.nye.map((x) => x.id);
    await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, ids);
    await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === ids.length, `bølge 18: repetisjonsrunden har alle nye spørsmål (${tot})`);
    let wide = 0, why = 0;
    for (let k = 0; k < tot; k++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
      if (await overflow(q)) wide++; await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); if ((await q.textContent('#why')).length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
    ok(wide === 0, 'bølge 18: spørsmål og forklaring uten sidelengs rulling i 320 px'); ok(why === tot, `bølge 18: feil svar gir forklaring på alle (${why} av ${tot})`);
    ok(await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss).length) === ids.length, 'bølge 18: feil igjen holder spørsmålene i repetisjonen');
    ok(await sameIds(q), 'bølge 18: quiz-id-ene er de samme som i de rå dataene');
    await q.context().close(); }
  // 29) Bølge 19: prøveeksamenen på mobil (320 og 390 px)
  for (const w of [320, 390]) { const q = await mk({ w, h: w === 320 ? 640 : 800 });
    await go(q, 'prove'); ok((await q.evaluate(() => document.querySelector('#dur').getBoundingClientRect().height)) >= 44, `bølge 19 ${w}px: tidsvalget har trykkflate på minst 44 px`);
    await q.click('#start'); await q.waitForTimeout(300);
    const bar = await q.evaluate(() => { const b = document.querySelector('.sticky-bar'), r = b.getBoundingClientRect(), kids = [...b.querySelectorAll('.row > *')].filter((e) => getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().width > 0);
      const mids = kids.map((e) => { const k = e.getBoundingClientRect(); return k.top + k.height / 2; });
      return { h: r.height, oneRow: Math.max(...mids) - Math.min(...mids) < 6, right: Math.max(...kids.map((e) => e.getBoundingClientRect().right)), btn: ['#abort', '#submit'].every((s) => b.querySelector(s).getBoundingClientRect().height >= 44), filled: document.querySelector('#filled').innerText.trim(), aria: document.querySelector('#filled').getAttribute('aria-label') }; });
    ok(bar.h <= 64 && bar.oneRow, `bølge 19 ${w}px: klokkeraden er én rad og høyst 64 px (${Math.round(bar.h)} px)`);
    ok(bar.right <= w - 10, `bølge 19 ${w}px: Lever-knappen går ikke ut over kanten (${Math.round(bar.right)} px)`);
    ok(bar.btn, `bølge 19 ${w}px: Avbryt og Lever har trykkflate på minst 44 px`);
    ok(/^0\/\d+ svar$/.test(bar.filled) && /^0 av \d+ tallsvar fylt ut$/.test(bar.aria), `bølge 19 ${w}px: telleren er kort på skjermen og hel for skjermleser (${bar.filled} / ${bar.aria})`);
    const under = (sel) => q.evaluate((sel) => { const e = document.querySelector(sel); e.scrollIntoView({ block: 'start' }); return e.getBoundingClientRect().top >= document.querySelector('.sticky-bar').getBoundingClientRect().bottom - 1; }, sel);
    ok(await under('#mo4'), `bølge 19 ${w}px: overskriften til oppgave 5 havner under klokkeraden, ikke bak den`);
    ok(await under('#m2_1-in'), `bølge 19 ${w}px: et svarfelt havner under klokkeraden, ikke bak den`);
    // Lever med tomme felt, og velg å fortsette: beskjeden sier hvor, og du havner på første tomme felt
    await q.fill('#m0_0-in', '1'); let msg = ''; q.removeAllListeners('dialog'); q.on('dialog', (d) => { msg = d.message(); d.dismiss(); });
    await q.click('#submit'); await q.waitForTimeout(200);
    const foc = await q.evaluate(() => { const a = document.activeElement, r = a.getBoundingClientRect(); return { id: a.id, vis: r.top >= document.querySelector('.sticky-bar').getBoundingClientRect().bottom - 1 && r.bottom <= innerHeight }; });
    ok(/oppgave 1 \(\d+\), oppgave 2 \(\d+\)/.test(msg) && /Levere likevel/.test(msg), `bølge 19 ${w}px: beskjeden ved levering sier hvilke oppgaver som mangler svar`);
    ok(foc.id === 'm0_1-in' && foc.vis, `bølge 19 ${w}px: «ikke lever» tar deg til første tomme felt, synlig under klokkeraden (${foc.id})`);
    ok(!!(await q.$('.sticky-bar')), `bølge 19 ${w}px: prøven står urørt når du ikke leverer`);
    // Tiden er ute: raden blir høyere, og avstanden fra toppen følger med
    await q.evaluate(() => { const st = JSON.parse(localStorage.getItem('okad221:v1')); st.mock.start = Date.now() - 5 * 3600e3; localStorage.setItem('okad221:v1', JSON.stringify(st)); }); await q.reload(); await q.waitForTimeout(1300);
    ok(/Tiden er ute/.test(await q.textContent('#timeup')) && await under('#mo2'), `bølge 19 ${w}px: når tiden er ute, havner oppgavene fortsatt under den høyere raden`);
    // Lever: resultattabellen får plass, også poengkolonnen
    q.removeAllListeners('dialog'); q.on('dialog', (d) => d.accept()); await q.click('#submit'); await q.waitForTimeout(300);
    const res = await q.evaluate(() => { const t = document.querySelector('#result table'), w = t.closest('.tablewrap'), last = t.querySelector('thead th:last-child').getBoundingClientRect(); return { fits: t.scrollWidth <= w.clientWidth + 1, poeng: last.right <= w.getBoundingClientRect().right + 1, pad: document.documentElement.style.scrollPaddingTop }; });
    ok(res.fits && res.poeng, `bølge 19 ${w}px: resultattabellen får plass uten sidelengs rulling, med poengkolonnen synlig`);
    ok(res.pad === '', `bølge 19 ${w}px: avstanden fra toppen nullstilles når klokkeraden er borte`);
    ok(!(await overflow(q)), `bølge 19 ${w}px: levert prøveeksamen uten sidelengs rulling`);
    if (w === 320) await q.screenshot({ path: out + '/m-bolge19-levert.png' });
    await q.click('#again'); await q.click('#start'); await q.waitForTimeout(200); await go(q, 'oving');
    ok((await q.evaluate(() => document.documentElement.style.scrollPaddingTop)) === '', `bølge 19 ${w}px: avstanden fra toppen nullstilles når du går til en annen side`);
    await go(q, 'prove'); await q.click('#abort'); await q.context().close(); }
  // Excel-formler i løsningene brytes etter semikolon i 320 px, og teksten som kopieres er uendret
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'oving'); const ids = await q.evaluate(() => OKAD.gens.map((g) => g.id)); const wide = [];
    for (const id of ids) { await go(q, 'oving/' + id + '/11'); await q.click('#all'); if (await overflow(q)) wide.push(id); }
    ok(wide.length === 0, 'bølge 19: alle 45 oppgavetyper med løsningene åpne uten sidelengs rulling i 320 px' + (wide.length ? ' – ' + wide.join(', ') : ''));
    await go(q, 'oving/k7-annuitetslan-maanedlig/11'); await q.click('#all');
    const c = await q.evaluate(() => { const cs = [...document.querySelectorAll('#view code')].filter((x) => x.textContent.includes(';')); return { n: cs.length, wbr: cs.every((x) => x.querySelectorAll('wbr').length === (x.textContent.match(/;/g) || []).length), clean: cs.every((x) => !/[\u200b\u00ad]/.test(x.textContent)), fits: cs.every((x) => x.getBoundingClientRect().right <= innerWidth) }; });
    ok(c.n > 0 && c.wbr && c.fits, `bølge 19: Excel-formlene får bruddpunkt etter hvert semikolon og holder seg innenfor skjermen (${c.n} formler)`);
    ok(c.clean, 'bølge 19: formlene inneholder ingen usynlige tegn, så de kan kopieres rett inn i Excel');
    await q.context().close(); }
  { const q = await mk(); await go(q, 'prove'); await q.click('#start'); await q.waitForTimeout(200);
    ok(/^0 av \d+ tallsvar fylt ut$/.test((await q.evaluate(() => document.querySelector('#filled').innerText)).trim()), 'bølge 19: på PC står telleren med hele teksten');
    await q.click('#abort'); await q.context().close(); }
  // 30) Bølge 20: brede tabeller på mobil (snudde årstabeller, fast første kolonne, strek og hint når tabellen kan rulles)
  const tabState = (q) => q.evaluate(() => [...document.querySelectorAll('#view .tablewrap')].filter((w) => w.clientWidth && w.checkVisibility()).map((w) => {
    const vis = [...w.querySelectorAll('table')].find((t) => getComputedStyle(t).display !== 'none'), h = w.nextElementSibling, first = vis.querySelector('tbody tr > :first-child');
    return { over: w.scrollWidth > w.clientWidth + 1, turned: vis.classList.contains('turned'), hasTurn: !!w.querySelector('table.turned'), scrolls: w.classList.contains('scrolls'), more: w.classList.contains('more'),
      hint: !!(h && h.classList.contains('scrollhint') && !h.hidden), sticky: first ? getComputedStyle(first).position : '', tab: w.tabIndex, role: w.getAttribute('role'),
      turnedW: w.querySelector('table.turned') ? w.querySelector('table.turned').scrollWidth : 0, origAria: w.querySelector('table.orig') ? w.querySelector('table.orig').getAttribute('aria-hidden') : null }; }));
  for (const w of [320, 390]) { const q = await mk({ w, h: 640 }); await go(q, 'oving'); const ids = await q.evaluate(() => OKAD.gens.map((g) => g.id));
    const bad = [], badTurn = []; let n = 0, turned = 0, scrolls = 0, fits = 0;
    for (const id of ids) { await go(q, 'oving/' + id + '/11'); await q.click('#all'); await q.waitForTimeout(120);
      for (const t of await tabState(q)) { n++; if (t.turned) turned++;
        if (t.over) { scrolls++; if (!(t.scrolls && t.more && t.hint && t.sticky === 'sticky' && t.tab === 0 && t.role === 'region')) bad.push(id); }
        else { fits++; if (t.scrolls || t.hint) bad.push(id + ' (hint uten at tabellen ruller)'); }
        if (t.hasTurn && t.turned && t.origAria === null) badTurn.push(id + ' (originalen ikke skjult for skjermleser)'); } }
    ok(bad.length === 0, `bølge 20 ${w}px: hver tabell som er bredere enn skjermen, har fast første kolonne, strek i kanten, hint og kan nås med tastatur, og ingen andre har hint (${n} tabeller, ${scrolls} ruller, ${fits} får plass)` + (bad.length ? ' – ' + [...new Set(bad)].slice(0, 6).join(', ') : ''));
    ok(turned >= 8, `bølge 20 ${w}px: årstabeller med få poster vises snudd (${turned})`);
    ok(badTurn.length === 0, `bølge 20 ${w}px: skjermleseren leser bare tabellen som vises` + (badTurn.length ? ' – ' + badTurn.join(', ') : ''));
    await q.context().close(); }
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'oving/k5-payback-kapitalrasjonering/11'); await q.waitForTimeout(150);
    // Den snudde tabellen har samme tall som originalen, med årene som rader, og får plass
    const tr = await q.evaluate(() => { const w = document.querySelector('.task-text .tablewrap'), o = w.querySelector('table.orig'), t = w.querySelector('table.turned');
      const oy = [...o.tHead.rows[0].cells].slice(1).map((c) => c.textContent), ov = [...o.tBodies[0].rows[0].cells].slice(1).map((c) => c.textContent);
      const ty = [...t.tBodies[0].rows].map((r) => r.cells[0].textContent), tv = [...t.tBodies[0].rows].map((r) => r.cells[1].textContent);
      return { same: JSON.stringify(oy) === JSON.stringify(ty) && JSON.stringify(ov) === JSON.stringify(tv), fits: w.scrollWidth <= w.clientWidth + 1, vis: getComputedStyle(t).display, n: ty.length }; });
    ok(tr.same && tr.fits && tr.vis === 'table' && tr.n >= 5, `bølge 20: den snudde tabellen har de samme tallene med årene som rader, og får plass i 320 px (${tr.n} år)`);
    await q.screenshot({ path: out + '/m-bolge20-snudd.png' });
    // Utskrift viser originalen
    await q.emulateMedia({ media: 'print' }); ok(await q.evaluate(() => { const w = document.querySelector('.task-text .tablewrap'); return getComputedStyle(w.querySelector('table.orig')).display === 'table' && getComputedStyle(w.querySelector('table.turned')).display === 'none'; }), 'bølge 20: utskrift viser tabellen med årene som kolonner'); await q.emulateMedia({ media: 'screen' });
    // En tabell som allerede har månedene som rader, snus ikke
    await go(q, 'oving/k7-annuitetslan-maanedlig/11'); await q.click('#all'); ok(await q.evaluate(() => ![...document.querySelectorAll('#view table.turned')].some((t) => /Rente|Avdrag/.test(t.tHead.textContent) === false && /^Måned/.test(t.tHead.rows[0].cells[0].textContent) && /^\d/.test(t.tHead.rows[0].cells[1].textContent))), 'bølge 20: en tabell som allerede har månedene som rader, snus ikke');
    // Strek i kanten forsvinner når man har rullet til enden, og første kolonne står fast
    await go(q, 'oving/k2-prosjekt-for-skatt/11'); await q.waitForTimeout(150);
    const sc = await q.evaluate(async () => { const w = document.querySelector('.task-text .tablewrap'), c = w.querySelector('tbody tr > :first-child'), x0 = c.getBoundingClientRect().left;
      w.scrollLeft = w.scrollWidth; await new Promise((r) => setTimeout(r, 120)); return { more: w.classList.contains('more'), fixed: Math.abs(c.getBoundingClientRect().left - x0) < 1, hint: !w.nextElementSibling.hidden }; });
    ok(!sc.more && sc.fixed && sc.hint, 'bølge 20: streken i kanten forsvinner ved enden av tabellen, og første kolonne står fast mens man ruller');
    await q.screenshot({ path: out + '/m-bolge20-rull.png' });
    // Til PC-bredde og tilbake: tabellene følger med
    await q.setViewportSize({ width: 1200, height: 900 }); await q.waitForTimeout(250);
    const pc = await tabState(q); ok(pc.every((t) => !t.turned && !t.hint && !t.over), 'bølge 20: på PC vises tabellene som før, uten hint');
    await q.setViewportSize({ width: 320, height: 640 }); await q.waitForTimeout(250);
    const mob = await tabState(q); ok(mob.filter((t) => t.over).every((t) => t.hint && t.scrolls), 'bølge 20: tilbake til mobilbredde får de brede tabellene hint igjen');
    ok(!(await overflow(q)), 'bølge 20: ingen sidelengs rulling av siden i 320 px');
    await q.context().close(); }
  // Prøveeksamen, eksamenssett og teori i 320 px: brede tabeller har hint, siden ruller ikke
  { const q = await mk({ w: 320, h: 640 }); const bad = [];
    for (const h of ['prove/utskrift/4242', 'eksamen/2025', 'eksamen/2023', 'tema/8', 'tema/12', 'analyse']) { await go(q, h); await q.evaluate(() => document.querySelectorAll('#view details').forEach((d) => { d.open = true; })); await q.waitForTimeout(250);
      for (const t of await tabState(q)) if (t.over && !(t.hint && t.sticky === 'sticky' && t.tab === 0)) bad.push(h); if (await overflow(q)) bad.push(h + ' (siden ruller)'); }
    ok(bad.length === 0, 'bølge 20: brede tabeller i eksamenssett, teori, analyse og papirutgaven har hint og fast første kolonne, også i paneler som åpnes' + (bad.length ? ' – ' + [...new Set(bad)].join(', ') : ''));
    await q.context().close(); }
  { const q = await mk(); await go(q, 'oving/k5-payback-kapitalrasjonering/11'); await q.waitForTimeout(150);
    ok(await q.evaluate(() => { const w = document.querySelector('.task-text .tablewrap'); return getComputedStyle(w.querySelector('table.orig')).display === 'table' && w.querySelector('table.turned').getAttribute('aria-hidden') !== null && w.querySelector('table.orig').getAttribute('aria-hidden') === null; }), 'bølge 20: på PC vises originalen, og skjermleseren hopper over den snudde');
    await q.context().close(); }
  // 31) Bølge 21: fire nye quizspørsmål i kapittel 1 og 9
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const r = await q.evaluate(() => { const re = /Hva gjelder finansieringsproblemet|egenkapitalen 2.100.000\. Hvor stor er den langsiktige|øker varelageret med 500.000 og betaler med kassekreditten|narre noen mennesker|realavkastningskravet er 6.%, som gir et nominelt krav på 10,24|Kostnadene er 600.000 i dag og stiger 6.%|lån på 1.000.000 som skal betales tilbake om tre år|setter inn 100.000 til 5.% rente\. Inflasjonen er 2/;
      return { n1: OKAD.quiz.filter((x) => x.ch === 1).length, n9: OKAD.quiz.filter((x) => x.ch === 9).length, nye: OKAD.quiz.filter((x) => re.test(x.q)).map((x) => ({ id: x.id, c: x.correct, ch: x.ch })) }; });
    ok(r.n1 >= 16 && r.n9 >= 18, `bølge 21: kapittel 1 har minst 16 og kapittel 9 minst 18 spørsmål (${r.n1} og ${r.n9})`);
    ok(r.nye.length === 8, 'bølge 21: alle åtte nye spørsmål finnes (' + r.nye.length + ')');
    for (const ch of [1, 9]) ok(r.nye.filter((x) => x.ch === ch).map((x) => x.c).sort().join('') === '0123', `bølge 21: riktig svar på alle fire plassene i de nye spørsmålene i kapittel ${ch}`);
    const ids = r.nye.map((x) => x.id);
    await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, ids);
    await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === ids.length, `bølge 21: repetisjonsrunden har alle nye spørsmål (${tot})`);
    let wide = 0, why = 0;
    for (let k = 0; k < tot; k++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
      if (await overflow(q)) wide++; await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); if ((await q.textContent('#why')).length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
    ok(wide === 0, 'bølge 21: spørsmål og forklaring uten sidelengs rulling i 320 px'); ok(why === tot, `bølge 21: feil svar gir forklaring på alle (${why} av ${tot})`);
    ok(await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss).length) === ids.length, 'bølge 21: feil igjen holder spørsmålene i repetisjonen');
    ok(await sameIds(q), 'bølge 21: quiz-id-ene er de samme som i de rå dataene');
    await q.context().close(); }
  // 32) Bølge 22: modifisert internrente (4.13), lisens eller egenproduksjon (4.11), og fire nye quizspørsmål i kapittel 4, 6 og 8
  { const NEW = ['k4-modifisert-internrente', 'k4-lisens-egenproduksjon'];
    for (const w of [320, 390]) { const q = await mk({ w, h: 700 });
      for (const id of NEW) for (const seed of [7, 11, 23]) {
        await go(q, `oving/${id}/${seed}`); const fa = await q.evaluate(([g, s]) => OKAD.make(g, s).parts.map((x) => (x.kind === 'num' ? OKAD.fmtAnswer(x) : null)), [id, seed]);
        for (let i = 0; i < fa.length; i++) if (fa[i]) { await q.fill(`#p${i}-in`, fa[i]); await q.press(`#p${i}-in`, 'Enter'); }
        const fb = await q.evaluate(() => [...document.querySelectorAll('.fb')].map((x) => x.textContent).filter(Boolean));
        ok(fb.length === fa.filter(Boolean).length && fb.every((x) => /Riktig/.test(x)), `bølge 22 ${w}px ${id}/${seed}: alle fasitsvar godtas`);
        await q.click('#all'); ok(!(await overflow(q)), `bølge 22 ${w}px ${id}/${seed}: ingen sidelengs rulling med løsningene åpne`); }
      await q.context().close(); }
    const q = await mk({ w: 390, h: 800 }); await go(q, 'oving');
    // MIR ligger mellom kravet og IR, og internrenten godtas ikke som MIR
    const mr = await q.evaluate(() => { let ok = true; for (let s = 1; s <= 200; s++) { const t = OKAD.make('k4-modifisert-internrente', s), r = +t.text.match(/Avkastningskravet er <b>(\d+)/)[1] / 100; if (!(t.parts[4].answer > r && t.parts[4].answer < t.parts[2].answer)) ok = false; } return ok; });
    ok(mr, 'bølge 22: MIR ligger mellom avkastningskravet og internrenten i 200 frø');
    await go(q, 'oving/k4-modifisert-internrente/7'); await q.fill('#p4-in', await q.evaluate(() => OKAD.fmtAnswer(OKAD.make('k4-modifisert-internrente', 7).parts[2]))); await q.press('#p4-in', 'Enter');
    ok(!/Riktig/.test(await q.textContent('#p4-fb')), 'bølge 22: internrenten godtas ikke som modifisert internrente');
    await q.click('#all'); ok(/MODIR/.test(await q.textContent('#p4-sol')), 'bølge 22: løsningen viser Excel-funksjonen MODIR');
    // Lisens: begge utfallene forekommer, og feil fortegn på forskjellen gjenkjennes
    const lic = await q.evaluate(() => { let own = 0, neg = 0; for (let s = 1; s <= 400; s++) { if (OKAD.make('k4-lisens-egenproduksjon', s).parts[4].answer > 0) own++; else if (!neg) neg = s; } return { own, neg }; });
    ok(lic.own > 120 && lic.own < 280, `bølge 22: både lisens og egenproduksjon er best i en god del av frøene (egenproduksjon i ${lic.own} av 400)`);
    await go(q, 'oving/k4-lisens-egenproduksjon/' + lic.neg); const d = await q.evaluate((s) => OKAD.make('k4-lisens-egenproduksjon', s).parts[4].answer, lic.neg);
    await q.fill('#p4-in', String(Math.round(-d))); await q.press('#p4-in', 'Enter'); ok(/fortegnet er feil/.test(await q.textContent('#p4-fb')), 'bølge 22: positivt svar når lisens er best, gir beskjed om fortegnet');
    // Kapittel 4 i teorien og på Øv-siden, under temaene, ikke i prøveeksamenen
    await go(q, 'tema/4'); ok((await q.locator('a[href="#/oving/k4-modifisert-internrente"], a[href^="#/oving/k4-modifisert-internrente"]').count()) > 0 && (await q.locator('a[href^="#/oving/k4-lisens-egenproduksjon"]').count()) > 0, 'bølge 22: begge typene står under «Øv på kapitlet» i teori for kapittel 4');
    await go(q, 'oving'); ok(await q.evaluate(() => /Modifisert internrente/.test(document.querySelector('#view').textContent) && /Lisens eller egenproduksjon/.test(document.querySelector('#view').textContent)), 'bølge 22: begge typene står på Øv-siden');
    ok(await q.evaluate(() => !OKAD.mockSlots.some((m) => m.pool.some(([g]) => /k4-modifisert-internrente|k4-lisens-egenproduksjon/.test(g)))), 'bølge 22: de nye typene er ikke i prøveeksamenens trekkpott');
    ok(await q.evaluate(() => OKAD.topics.prosjekt.gens.includes('k4-modifisert-internrente') && OKAD.topics.toprosjekt.gens.includes('k4-lisens-egenproduksjon')), 'bølge 22: de nye typene ligger under temaene for prosjektanalyse og gjensidig utelukkende prosjekter');
    // Quiz: fire nye i kapittel 4, 6 og 8
    await go(q, 'quiz');
    const r = await q.evaluate(() => { const re = /sluttverdi 8.465.195|NNV ved 12.% er 180.357|Halvparten finansieres med et lån til 8|koster 4.300.000, og installasjonen|Arbeidskapitalen på 100.000 bindes i år 0 og frigjøres i år 5|Hvor mange hybler kan stå tomme|leie ut i to år til|Hvor mye kan salget i år 4 falle|overhaling på 1.500.000 som kostnadsføres|råmaterialer på lager for 600.000|nåverdien i år 0 av den økte skatten fordi saldoen|NNV etter skatt er 262.676 uten restverdi/;
      const c = (ch) => OKAD.quiz.filter((x) => x.ch === ch).length; return { n: [c(4), c(6), c(8)], nye: OKAD.quiz.filter((x) => re.test(x.q)).map((x) => ({ id: x.id, c: x.correct, ch: x.ch })) }; });
    ok(r.n[0] >= 20 && r.n[1] >= 20 && r.n[2] >= 22, `bølge 22: kapittel 4, 6 og 8 har ${r.n.join(', ')} spørsmål`);
    ok(r.nye.length === 12, 'bølge 22: alle tolv nye quizspørsmål finnes (' + r.nye.length + ')');
    for (const ch of [4, 6, 8]) ok(r.nye.filter((x) => x.ch === ch).map((x) => x.c).sort().join('') === '0123', `bølge 22: riktig svar på alle fire plassene i de nye spørsmålene i kapittel ${ch}`);
    for (const [nm, part] of [['del 1', r.nye.slice(0, 6).map((x) => x.id)], ['del 2', r.nye.slice(6).map((x) => x.id)]]) {
      await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, part);
      await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1]; ok(tot === part.length, `bølge 22 quiz ${nm}: repetisjonsrunden har alle (${tot})`);
      let wide = 0, why = 0;
      for (let k = 0; k < tot; k++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
        if (await overflow(q)) wide++; await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); if ((await q.textContent('#why')).length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); }
      ok(wide === 0, `bølge 22 quiz ${nm}: ingen sidelengs rulling`); ok(why === tot, `bølge 22 quiz ${nm}: feil svar gir forklaring på alle (${why} av ${tot})`); }
    ok(await sameIds(q), 'bølge 22: quiz-id-ene er de samme som i de rå dataene');
    await q.context().close(); }
  // 33) Bølge 23: fire nye quizspørsmål i kapittel 10 og 11
  { const q = await mk({ w: 320, h: 640 }); await go(q, 'quiz');
    const r = await q.evaluate(() => { const re = /Daglig standardavvik for en aksje er 1,5|ikke innsideinformasjon\?|varians 0,0486 \(σ = 22,05|avkastning 15,00.%, −13,04.%|eiendeler for 6.000.000, finansiert med 25|Aksje G har beta 0,7|hele formuen sin i eget selskap|Et nytt prosjekt har beta 1,4/;
      const d = document.createElement('div'), txt = (h) => { d.innerHTML = h; return d.textContent; }, c = (ch) => OKAD.quiz.filter((x) => x.ch === ch);
      const nye = OKAD.quiz.filter((x) => re.test(x.q));
      return { n: [c(10).length, c(11).length], nye: nye.map((x) => ({ id: x.id, c: x.correct, ch: x.ch })),
        unexplained: nye.flatMap((x) => x.options.filter((o, i) => i !== x.correct).filter((o) => { const m = o.match(/−?\d[\d  ]*(,\d+)?/); return m && !txt(x.why).includes(m[0].trim()); }).map((o) => txt(x.q).slice(0, 30) + ' → ' + o)) }; });
    ok(r.n[0] >= 21 && r.n[1] >= 22, `bølge 23: kapittel 10 og 11 har ${r.n.join(' og ')} spørsmål`);
    ok(r.nye.length === 8, 'bølge 23: alle åtte nye quizspørsmål finnes (' + r.nye.length + ')');
    for (const ch of [10, 11]) ok(r.nye.filter((x) => x.ch === ch).map((x) => x.c).sort().join('') === '0123', `bølge 23: riktig svar på alle fire plassene i de nye spørsmålene i kapittel ${ch}`);
    ok(r.unexplained.length === 0, 'bølge 23: hvert tall i et feil alternativ er forklart, også når teksten står først' + (r.unexplained.length ? ': ' + r.unexplained.join(' | ') : ''));
    await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1') || '{"gen":{},"exam":{},"quiz":{}}'); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, r.nye.map((x) => x.id));
    // En kapittelrunde tar med de fire som venter i kapitlet (høyst fem per runde)
    for (const ch of [10, 11]) { await q.reload(); await go(q, 'quiz/' + ch); let rep = 0; const n = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1];
      for (let k = 0; k < n; k++) { if (await q.locator('#qrep').count()) rep++; const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
        await q.click(`.choice:not([data-o="${c}"]) >> nth=0`); await q.click('#nx'); }
      ok(rep === 4, `bølge 23: kapittelrunden for kapittel ${ch} tar med alle fire nye som venter (${rep})`); }
    await q.evaluate((ids) => { const st = JSON.parse(localStorage.getItem('okad221:v1')); st.qmiss = {}; ids.forEach((id, k) => { st.qmiss[id] = { t: k + 1, n: 1 }; }); localStorage.setItem('okad221:v1', JSON.stringify(st)); }, r.nye.map((x) => x.id));
    await q.reload(); await go(q, 'quiz/repeter'); const tot = +(await q.textContent('.eyebrow')).match(/av (\d+)/)[1];
    ok(tot === 8, `bølge 23: repetisjonsrunden har alle åtte (${tot})`);
    let wide = 0, why = 0, seen = 0;
    for (let k = 0; k < tot; k++) { const c = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
      if (await overflow(q)) wide++; await q.click(`.choice[data-o="${c}"]`); if ((await q.textContent('#why')).length > 80) why++; if (await overflow(q)) wide++; await q.click('#nx'); seen++; }
    ok(wide === 0, 'bølge 23: spørsmål og forklaring uten sidelengs rulling i 320 px'); ok(why === 8, `bølge 23: riktig svar gir også forklaring (${why} av 8)`);
    ok(await q.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('okad221:v1')).qmiss || {}).length) === 0, 'bølge 23: riktig svar tømmer repetisjonen');
    // Feil svar på ett spørsmål holder det i repetisjonen
    const one = r.nye.find((x) => x.ch === 11).id;
    await q.evaluate((id) => { const st = JSON.parse(localStorage.getItem('okad221:v1')); st.qmiss = { [id]: { t: 1, n: 1 } }; localStorage.setItem('okad221:v1', JSON.stringify(st)); }, one);
    await q.reload(); await go(q, 'quiz/repeter'); const c1 = await q.evaluate(() => { const t = document.querySelector('#qq').textContent, d = document.createElement('div'); return OKAD.quiz.find((y) => { d.innerHTML = y.q; return d.textContent === t; }).correct; });
    await q.click(`.choice:not([data-o="${c1}"]) >> nth=0`); ok((await q.textContent('#why')).length > 80, 'bølge 23: feil svar gir forklaring'); await q.click('#nx');
    ok(await q.evaluate((id) => !!JSON.parse(localStorage.getItem('okad221:v1')).qmiss[id], one), 'bølge 23: feil igjen holder spørsmålet i repetisjonen');
    ok(await sameIds(q), 'bølge 23: quiz-id-ene er de samme som i de rå dataene');
    await q.context().close(); }
  // Skjermbilder
  const s = await mk(); for (const [nm, h, full] of [['hjem', '', true], ['oving', 'oving', false], ['analyse', 'analyse', true], ['tema', 'tema/8', false], ['task', 'oving/k8-nv-etter-skatt-komplett/42', false]]) { await go(s, h); await s.screenshot({ path: `${out}/${nm}.png`, fullPage: full }); }
  await s.emulateMedia({ colorScheme: 'dark' }); await go(s, 'oving/k4-obligasjon-kurs-ytm-durasjon/3'); await s.click('#all'); await s.screenshot({ path: out + '/task-dark.png' });
  console.log(`${pass.length} bestått, ${fails.length} feilet`); fails.forEach((f) => console.log('FEIL: ' + f)); await b.close();
})();
