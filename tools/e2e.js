const { chromium } = require('playwright');
const out = process.argv[2]; const B = 'http://localhost:8765/index.html#/';
const fails = [], pass = [];
const ok = (c, msg) => (c ? pass : fails).push(msg);
(async () => {
  const b = await chromium.launch();
  const mk = async (o = {}) => { const ctx = await b.newContext({ viewport: { width: o.w || 1200, height: o.h || 900 }, colorScheme: o.dark ? 'dark' : 'light', deviceScaleFactor: 1, acceptDownloads: true }); if (o.init) await ctx.addInitScript(o.init); const p = await ctx.newPage(); p.on('pageerror', (e) => fails.push('JS-feil: ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') fails.push('konsoll: ' + m.text()); }); p.on('dialog', (d) => d.accept()); return p; };
  const go = async (p, h) => { await p.goto(B + h); await p.waitForTimeout(250); };
  const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);

  // 1) Alle ruter, desktop + mobil, lyst + mørkt: ingen feil, ingen sidelengs rulling
  const routes = ['', 'analyse', 'oving', 'prove', 'prove/utskrift/4242', 'eksamener', 'eksamen/2025', 'eksamen/2016', 'tema', 'tema/8', 'tema/4', 'tema/12', 'formler', 'quiz', 'quiz/alle', 'verktoy', 'repeter'];
  for (const o of [{ w: 1200 }, { w: 390, h: 800 }, { w: 390, h: 800, dark: true }, { w: 320, h: 640 }]) {
    const p = await mk(o);
    for (const r of routes) { await go(p, r); ok(!(await overflow(p)), `ingen sidelengs rulling ${o.w}px ${r || 'hjem'}`); }
    await p.context().close();
  }
  // 2) Alle generatorer åpner, viser løsninger, ingen overflow på mobil
  { const p = await mk({ w: 390, h: 800 }); const ids = await (async () => { await go(p, 'oving'); return p.evaluate(() => OKAD.gens.map((g) => g.id)); })();
    for (const id of ids) { await go(p, 'oving/' + id + '/11'); await p.click('#all'); ok(!(await overflow(p)), 'mobil gen ' + id); ok((await p.locator('.solution').count()) > 0, 'løsning vises ' + id); }
    ok(ids.length === 34, '34 generatorer'); await p.context().close(); }

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
  // Skjermbilder
  const s = await mk(); for (const [nm, h, full] of [['hjem', '', true], ['oving', 'oving', false], ['analyse', 'analyse', true], ['tema', 'tema/8', false], ['task', 'oving/k8-nv-etter-skatt-komplett/42', false]]) { await go(s, h); await s.screenshot({ path: `${out}/${nm}.png`, fullPage: full }); }
  await s.emulateMedia({ colorScheme: 'dark' }); await go(s, 'oving/k4-obligasjon-kurs-ytm-durasjon/3'); await s.click('#all'); await s.screenshot({ path: out + '/task-dark.png' });
  console.log(`${pass.length} bestått, ${fails.length} feilet`); fails.forEach((f) => console.log('FEIL: ' + f)); await b.close();
})();
