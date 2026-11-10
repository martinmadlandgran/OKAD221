const { chromium } = require('playwright');
const out = process.argv[2]; const B = 'http://localhost:8765/index.html#/';
const fails = [], pass = [];
const ok = (c, msg) => (c ? pass : fails).push(msg);
(async () => {
  const b = await chromium.launch();
  const mk = async (o = {}) => { const ctx = await b.newContext({ viewport: { width: o.w || 1200, height: o.h || 900 }, colorScheme: o.dark ? 'dark' : 'light', deviceScaleFactor: 1 }); if (o.init) await ctx.addInitScript(o.init); const p = await ctx.newPage(); p.on('pageerror', (e) => fails.push('JS-feil: ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') fails.push('konsoll: ' + m.text()); }); p.on('dialog', (d) => d.accept()); return p; };
  const go = async (p, h) => { await p.goto(B + h); await p.waitForTimeout(250); };
  const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);

  // 1) Alle ruter, desktop + mobil, lyst + mørkt: ingen feil, ingen sidelengs rulling
  const routes = ['', 'analyse', 'oving', 'prove', 'eksamener', 'eksamen/2025', 'eksamen/2016', 'tema', 'tema/8', 'tema/4', 'tema/12', 'formler', 'quiz', 'quiz/alle', 'verktoy'];
  for (const o of [{ w: 1200 }, { w: 390, h: 800 }, { w: 390, h: 800, dark: true }, { w: 320, h: 640 }]) {
    const p = await mk(o);
    for (const r of routes) { await go(p, r); ok(!(await overflow(p)), `ingen sidelengs rulling ${o.w}px ${r || 'hjem'}`); }
    await p.context().close();
  }
  // 2) Alle 27 generatorer åpner, viser løsninger, ingen overflow på mobil
  { const p = await mk({ w: 390, h: 800 }); const ids = await (async () => { await go(p, 'oving'); return p.evaluate(() => OKAD.gens.map((g) => g.id)); })();
    for (const id of ids) { await go(p, 'oving/' + id + '/11'); await p.click('#all'); ok(!(await overflow(p)), 'mobil gen ' + id); ok((await p.locator('.solution').count()) > 0, 'løsning vises ' + id); }
    ok(ids.length === 27, '27 generatorer'); await p.context().close(); }

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
  // Skjermbilder
  const s = await mk(); for (const [nm, h, full] of [['hjem', '', true], ['oving', 'oving', false], ['analyse', 'analyse', true], ['tema', 'tema/8', false], ['task', 'oving/k8-nv-etter-skatt-komplett/42', false]]) { await go(s, h); await s.screenshot({ path: `${out}/${nm}.png`, fullPage: full }); }
  await s.emulateMedia({ colorScheme: 'dark' }); await go(s, 'oving/k4-obligasjon-kurs-ytm-durasjon/3'); await s.click('#all'); await s.screenshot({ path: out + '/task-dark.png' });
  console.log(`${pass.length} bestått, ${fails.length} feilet`); fails.forEach((f) => console.log('FEIL: ' + f)); await b.close();
})();
