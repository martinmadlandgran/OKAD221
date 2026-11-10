/* Kjør: node tools/verify.js [antall frø]
   Faglig kontroll som ikke bruker generatorenes egen fasit:
   1) regnefunksjonene for de nye oppgavetypene mot tall i kilder/ (eksamen 2022 og 2023, kapittel-LF 2.1, 6.5, 6.9, 8.8, 8.12 og 11.13),
   2) uavhengig etterregning av de nye generatorene: tallene leses fra oppgaveteksten og regnes med egne formler,
   3) kontroll av rettingene fra bølge 5 (minimum-varians-vekt, markedsverdier, fortegn nær 0, entydig kombinasjon). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ctx = { console, Intl, Math, Number, String, Array, Object, JSON, Date, parseFloat, isFinite, isNaN }; ctx.globalThis = ctx; vm.createContext(ctx);
for (const s of [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !/app\.js$/.test(s))) vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s });
const O = ctx.OKAD, U = O.U, F = O.F; let problems = 0;
const SEEDS = +process.argv[2] || 500;
// ---------- 1) Mot kildene ----------
{
const out = [];
const eq = (name, got, want, tol) => out.push(`${Math.abs(got - want) <= tol ? 'OK ' : 'AVVIK'} ${name}: ${got.toFixed(4)} (kilde ${want})`);
// 2022 oppg. 1 Homansbyen
const h = O._hotelCalc({ rooms0: 50, add: 15, days: 350, price: 1000, vc: 150, occ: 1, rent: 800000, fk0: 2000000, fk1: 2500000, invest: 11000000, T: 5, r: 0.10, ext: 2 });
eq('2022 1a økt DB', h.dDB, 4462500, 0.5); eq('2022 1a KS', h.cf, 3162500, 0.5); eq('2022 1a NV', h.npv, 988363, 1); eq('2022 1a IR (egen) %', h.irr * 100, 13.46, 0.005);
eq('2022 1b payback', h.pb, 3.48, 0.005); eq('2022 1c forlengelse', h.extVal, 3408011, 1);
// 2023 oppg. 4
const re = 0.03 + 1.33 * 0.07, w = 0.64 * re + 0.36 * 0.04 * 0.78;
eq('2023 4a WACC %', w * 100, 9.0016, 0.00005);
const c = O._capCalc({ demand: [400000, 500000, 600000, 600000, 500000], cap0: 100000, cap1: Infinity, price: 48, vc: 25, fk: 2500000, overhaul: 3500000, overhaulYear: 4, AM: 20000000, a: 0.2, wcPct: 0.2, r: w, salvage: 1000000 });
eq('2023 4b NV spart skatt', c.shield, 3034315, 1); eq('2023 4b KS år 0', c.cf[0], -19845685, 1); eq('2023 4b KS år 5', c.cf[5], 9066000, 0.5);
eq('2023 4b NNV', c.npv, 1044022, 1); eq('2023 4c endring', c.dNpv, 551286, 1);
// Kap. 11 oppg. 13 (WACC 10 %)
const k = O._capCalc({ demand: [600000, 750000, 800000, 900000, 950000], cap0: 500000, cap1: Infinity, price: 41, vc: 23, fk: 1400000, overhaul: 1500000, overhaulYear: 4, AM: 10000000, a: 0.2, wcPct: 0.2, r: 0.10, salvage: 1000000 });
eq('kap11.13 NV spart skatt', k.shield, 1466667, 1); eq('kap11.13 KS år 0', k.cf[0], -9353333, 1); eq('kap11.13 KS år 1', k.cf[1], -918000, 0.5); eq('kap11.13 NNV', k.npv, 746576, 1); eq('kap11.13 tillegg salg', k.dNpv, 529853, 1);
// Kap. 2 oppg. 1
const e = O._ekCalc({ price: 700, vc: 100, qty: [1000, 1200, 1000, 800], fkTotal: 500000, AM: 1000000, wcPct: 0.2, loan: 600000, rate: 0.05, loanType: 'serie' });
[-1140000, 322000, 498000, 378000, 342000].forEach((v, t) => eq('kap2.1 prosjekt år ' + t, e.proj[t], v, 0.5));
[-540000, 142000, 325500, 213000, 184500].forEach((v, t) => eq('kap2.1 til EK år ' + t, e.ek[t], v, 0.5));
eq('kap2.1 sum EK = sum resultat', e.sumEk, e.sumResult, 0.01);
// Kap. 6 oppg. 5 (lite/stort anlegg)
const pl = O._plantCalc({ Is: 800000, cs: 6000, fs: 100000, ds: 55, Il: 1150000, cl: 12000, fl: 150000, dl: 60, T: 20, r: 0.15 });
eq('kap6.5 kritisk netto lite', pl.critCfS, 127809, 1); eq('kap6.5 kritisk volum lite', pl.qS, 4142, 0.5); eq('kap6.5 kritisk netto stort', pl.critCfL, 183726, 1); eq('kap6.5 kritisk volum stort', pl.qL, 5562, 0.5);
eq('kap6.5 maks NV lite', pl.npvMaxS, 639646, 1); eq('kap6.5 kritisk DB stort slår lite', pl.critDbX, 435917, 1); eq('kap6.5 stort slår lite fra', pl.qX, 7265, 0.5);
// Kap. 6 oppg. 9 (fortsette/avslutte)
const co = O._contCalc({ I: 5000000, S: 1600000, C: 1800000, r: 0.10, T: 3, lostQ: 2000, lostP: 300, lostV: 150, V1: 3000000 });
eq('kap6.9a NNV', co.npv, 678437, 1); eq('kap6.9a IR %', co.irr * 100, 16.74, 0.005); eq('kap6.9b laveste salgsverdi', co.minS, 697000, 1); eq('kap6.9c laveste innbetaling', co.minC, 1527190, 1);
eq('kap6.9d NNV kannibalisering', co.npv2, -67618, 1); eq('kap6.9e fortsette', co.npvC, 925620, 1);
// Kap. 8 oppg. 12 (egenproduksjon/kjøp)
const mk = O._makeCalc({ b: 25, v: 14.5, Q: 10000, AM: 250000, K: 64000, r: 0.12, T: 5, a: 0.2, P: 27, P2: 30, dg2: 0.55 });
eq('kap8.12a IR f.s. %', mk.irrFs * 100, 20.0, 0.05); eq('kap8.12b skatteeffekt installasjon', mk.kTax, 14080, 0.5); eq('kap8.12b NV spart skatt', mk.shield, 34375, 0.5); eq('kap8.12b år 0', mk.y0, -265545, 0.5);
eq('kap8.12b NV egenproduksjon', mk.nvMake, -673245, 1); eq('kap8.12b NV kjøp', mk.nvBuy, -702931, 1); eq('kap8.12b forskjell', mk.diff, 29686, 1);
eq('kap8.12c kapitalkostnad', mk.capCost, 73665, 1); eq('kap8.12c kritisk volum', mk.critQ, 8994, 0.5); eq('kap8.12d NV salg', mk.pvRev, 759166, 1); eq('kap8.12d NNV', mk.npvNew, 85921, 1);
eq('kap8.12d annuitet', mk.annNew, 23835, 1); eq('kap8.12d tåler tapt salg', mk.maxLost, 1852, 0.5);
// Kap. 8 oppg. 8 (egenkapitalmetoden). LF oppgir regnearket ved 0 % før målsøking; selve internrenten står ikke i kilden.
const em = O._ekmCalc({ Q: 2400, price: 512.5, mat: 100, lonn: 300, FK: 120000, AM: 250000, S: 102000, wc: 0.2, T: 4, rF: 0.20, rE: 0.14, L: 200000, i: 0.06, a: 0.2 });
eq('kap8.8a IR f.s. %', em.irrF * 100, 25.07, 0.005); eq('kap8.8a NNV f.s.', em.npvF, 60134, 1); eq('kap8.8b NV spart skatt', em.shieldE, 32353, 1); eq('kap8.8b NV nedskriving', em.nedE, 7815, 1);
eq('kap8.8b år 0', em.esE[0], -471463, 1); eq('kap8.8b NNV e.s.', em.npvE, 75486, 1); eq('kap8.8c terminbeløp', em.payment, 57718, 0.5);
[12000, 9257, 6349, 3267].forEach((v, t) => eq('kap8.8c renter år ' + (t + 1), em.intr[t], v, 0.5));
[-263440, 61922, 61318, 60679, 408000].forEach((v, t) => eq('kap8.8c til EK ved 0 % år ' + t, em.ek(0)[t], v, 1));
eq('kap8.8c NV ved 0 %', F.npv(0, em.ek(0)), 328479, 1);
  out.forEach((l) => { if (/^AVVIK/.test(l)) problems++; }); console.log(out.filter((l) => /^AVVIK/.test(l)).join('\n') || `kilder: ${out.length} kontrolltall stemmer`);
}
// ---------- 2) Nye generatorer, etterregnet fra oppgaveteksten ----------
{
const num = (t) => +String(t).replace(/<[^>]+>/g, '').replace(/[\s\u00a0\u202f]/g, '').replace('−', '-').replace(',', '.');
const m1 = (t, re) => { const m = t.match(re); if (!m) throw new Error('fant ikke ' + re); return m[1]; };
const NUM = '([\\d\\s\\u00a0\\u202f,]+)';
const R = (s) => new RegExp(s);
const pv = (c, r, t) => c / Math.pow(1 + r, t);
const irr = (fl) => { let lo = -0.9, hi = 5; const f = (r) => fl.reduce((s, c, t) => s + pv(c, r, t), 0); for (let i = 0; i < 300; i++) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; } return (lo + hi) / 2; };
let bad = 0, checked = 0; const fails = [];
const cmp = (id, seed, part, mine) => {
  checked++;
  const rel = Math.abs(part.answer - mine) / Math.max(1, Math.abs(mine));
  const okSelf = O.check(part, O.fmtAnswer({ ...part, answer: mine })) === 'ok';
  if (!(rel < 1e-7 || Math.abs(part.answer - mine) < 1e-9) || !okSelf) { bad++; if (fails.length < 15) fails.push(`${id} frø ${seed} del ${part.label}: generator ${part.answer} – egen ${mine}`); }
};
for (let s = 1; s <= SEEDS; s++) {
  // ---------- Hotell ----------
  { const t = O.make('k2-hotell-differanse', s), x = t.text;
    const rooms0 = +m1(x, /har (\d+) rom og er åpent/), days = +m1(x, /åpent (\d+) dager/);
    const price = num(m1(x, R('Romprisen er <b>' + NUM + '</b>'))), vc = num(m1(x, R('per natt er <b>' + NUM + '</b>')));
    const fk0 = num(m1(x, R('osv\\. er ' + NUM + ' årlig'))), rent = num(m1(x, R('nabobygg for <b>' + NUM + '</b>')));
    const T = +m1(x, /vare i <b>(\d+) år<\/b>/), I = num(m1(x, R('koste <b>' + NUM + '</b>'))), rooms1 = +m1(x, /romkapasiteten til <b>(\d+) rom/);
    const fk1 = num(m1(x, R('øker til <b>' + NUM + '</b> årlig'))), r = num(m1(x, /Avkastningskravet er <b>(\d+) %/)) / 100;
    const om = x.match(/belegg på <b>(\d+) %<\/b>/), occ = om ? +om[1] / 100 : 1;
    const ext = +m1(t.parts[6].q, /forlenges med (\d) år/);
    const add = rooms1 - rooms0, dDB = add * days * occ * (price - vc), cf = dDB - rent - (fk1 - fk0);
    let A = 0; for (let k = 1; k <= T; k++) A += pv(1, r, k);
    const npv = -I + cf * A; let e = 0; for (let k = T + 1; k <= T + ext; k++) e += pv(cf, r, k);
    const mine = [dDB, cf, npv, irr([-I].concat(Array(T).fill(cf))), I / cf, null, e, (I / A + rent + fk1 - fk0) / (add * days * (price - vc))];
    t.parts.forEach((p, i) => { if (p.kind === 'num') cmp('hotell', s, p, mine[i]); }); }
  // ---------- Kapasitetsutvidelse ----------
  { const t = O.make('k8-kapasitetsutvidelse', s), x = t.text;
    const cap0 = num(m1(x, R('konstant på <b>' + NUM + '</b> enheter'))), price = num(m1(x, R('selges for <b>' + NUM + '</b> per enhet'))), vc = num(m1(x, R('enhetskostnadene er <b>' + NUM + '</b>')));
    const demand = m1(x, /mulig salg på (.*?) enheter årlig/).split(', ').map(num), AM = num(m1(x, R('investere <b>' + NUM + '</b>')));
    const cm = x.match(R('samlet kapasitet på <b>' + NUM + '</b>')), cap1 = cm ? num(cm[1]) : Infinity;
    const a = num(m1(x, /saldometoden med <b>(\d+) %/)) / 100, ohY = +m1(x, /vedlikehold i år (\d)/), oh = num(m1(x, R('beregnet til <b>' + NUM + '</b>')));
    const fk = num(m1(x, R('budsjettert til <b>' + NUM + '</b> årlig'))), wc = num(m1(x, /anslås til <b>(\d+) %/)) / 100;
    const rf = num(m1(x, /Risikofri rente er ([\d,]+) %/)) / 100, rm = num(m1(x, /markedsavkastningen er ([\d,]+) %/)) / 100, rd = num(m1(x, /rente på ([\d,]+) % før skatt/)) / 100;
    const beta = num(m1(x, /aksjebeta (?:på|er) ([\d,]+)/));
    const ek = x.match(/egenkapitalandel på (\d+) %|med (\d+) % egenkapital/), gj = x.match(/gjeldsandel på (\d+) %/);
    const wE = ek ? +(ek[1] || ek[2]) / 100 : 1 - +gj[1] / 100;
    const re = rf + beta * (rm - rf), w = re * wE + rd * 0.78 * (1 - wE);
    const sal = num(m1(t.parts[5].q, R('selges for <b>' + NUM + '</b>')));
    const extra = demand.map((d) => Math.min(d, cap1) - cap0), rev = extra.map((q) => q * price);
    const bal = rev.map((v) => wc * v).concat([0]);
    const shield = AM * a * 0.22 / (w + a);
    let npv = -AM + shield - bal[0];
    for (let k = 1; k <= 5; k++) { const op = rev[k - 1] - extra[k - 1] * vc - fk - (k === ohY ? oh : 0); npv += pv(op * 0.78 - (bal[k] - bal[k - 1]), w, k); }
    const d = pv(sal, w, 5) - pv(sal * a * 0.22 / (w + a), w, 5);
    const mine = [w, extra[0], bal[0], shield, npv, d];
    t.parts.forEach((p, i) => { if (p.kind === 'num') cmp('kapasitet', s, p, mine[i]); }); }
  // ---------- Kontantstrøm til egenkapitalen ----------
  { const t = O.make('k2-kontantstrom-egenkapital', s), x = t.text;
    const Nn = +m1(x, /levetid (\d) år/), AM = num(m1(x, R('anleggsmidler for <b>' + NUM + '</b>'))), price = num(m1(x, R('Salgsprisen er <b>' + NUM + '</b>'))), vc = num(m1(x, R('enhetskostnader er <b>' + NUM + '</b>')));
    const qty = [...m1(x, /Mengde<\/th>(.*?)<\/tr>/).matchAll(/<td>(.*?)<\/td>/g)].map((z) => num(z[1]));
    const fkT = num(m1(x, R('budsjettert til <b>' + NUM + '</b> per år'))), dep = num(m1(x, R('av dette er ' + NUM + ' avskrivninger'))), wc = num(m1(x, /utgjør <b>(\d+) %/)) / 100;
    const serie = /serielån/.test(x), L = num(m1(x, R('(?:serielån|annuitetslån) på <b>' + NUM + '</b>'))), i = num(m1(x, /renten er <b>(\d+) %/)) / 100;
    if (Math.abs(dep * Nn - AM) > 0.01) { bad++; fails.push('EK: avskrivning · n ≠ investering, frø ' + s); }
    const rev = qty.map((q) => q * price), bal = rev.map((v) => wc * v).concat([0]);
    const proj = [-AM - bal[0]]; for (let k = 1; k <= Nn; k++) proj.push(rev[k - 1] - qty[k - 1] * vc - (fkT - dep) - (bal[k] - bal[k - 1]));
    const pay = serie ? null : L * i / (1 - Math.pow(1 + i, -Nn));
    let saldo = L; const intr = [], rep = [];
    for (let k = 1; k <= Nn; k++) { const it = saldo * i, rp = serie ? L / Nn : pay - it; intr.push(it); rep.push(rp); saldo -= rp; }
    const ekf = proj.map((c, k) => (k === 0 ? c + L : c - rep[k - 1] - intr[k - 1]));
    const sumEk = ekf.reduce((z, v) => z + v, 0);
    let sumRes = 0; for (let k = 0; k < Nn; k++) sumRes += rev[k] - qty[k] * vc - fkT - intr[k];
    if (Math.abs(sumEk - sumRes) > 0.01) { bad++; fails.push('EK: sum KS EK ≠ sum resultat, frø ' + s); }
    if (!t.parts[8].q.includes(O.U.n(proj.reduce((z, v) => z + v, 0)))) { bad++; fails.push('EK: sum prosjekt i teksten, frø ' + s); }
    const mine = [proj[0], proj[1], proj[Nn], intr[1], ekf[0], ekf[1], ekf[Nn], sumEk];
    t.parts.forEach((p, k) => { if (p.kind === 'num') cmp('egenkapital', s, p, mine[k]); }); }
  // ---------- Lite eller stort anlegg ----------
  { const t = O.make('k6-lite-stort-anlegg', s), x = t.text;
    const row = (lbl) => { const m = x.match(R(lbl + '[^<]*</th><td><b>' + NUM + '</b></td><td><b>' + NUM + '</b>')); if (!m) throw new Error('rad ' + lbl); return [num(m[1]), num(m[2])]; };
    const [Is, Il] = row('Investering'), [cs, cl] = row('Maksimal kapasitet'), [fs, fl] = row('Betalbare faste'), [ds, dl] = row('Dekningsbidrag per enhet');
    const T = +m1(x, /levetid på <b>(\d+) år/), r = +m1(x, /Avkastningskravet er <b>(\d+) %/) / 100, D = num(m1(t.parts[4].q, R('selge <b>' + NUM + '</b>')));
    let A = 0; for (let k = 1; k <= T; k++) A += pv(1, r, k);
    const maxS = (cs * ds - fs) * A - Is;
    const nS = (Math.min(D, cs) * ds - fs) * A - Is, nL = (Math.min(D, cl) * dl - fl) * A - Il;
    const mine = [(Is / A + fs) / ds, (Il / A + fl) / dl, maxS, ((Il + maxS) / A + fl) / dl, Math.max(nS, nL)];
    // Stort skal ikke være bedre allerede under lite anleggs kapasitet (ellers er «fra hvilket salg» tvetydig).
    for (let q = 0; q <= cs; q += cs / 50) if ((q * dl - fl) * A - Il > (q * ds - fs) * A - Is) { bad++; fails.push('anlegg: stort bedre under kapasiteten, frø ' + s); break; }
    t.parts.forEach((p, i) => { if (p.kind === 'num') cmp('anlegg', s, p, mine[i]); }); }
  // ---------- Fortsette eller avslutte ----------
  { const t = O.make('k6-fortsette-avslutte', s), x = t.text;
    const I = num(m1(x, R('anlegget koster <b>' + NUM + '</b>'))), S = num(m1(x, R('selges for <b>' + NUM + '</b> etter'))), T = +m1(x, /etter <b>(\d) år/);
    const C = num(m1(x, R('innbetalingsoverskudd på <b>' + NUM + '</b>'))), r = +m1(x, /Avkastningskravet er <b>(\d+) %/) / 100;
    const q4 = t.parts[4].q, lq = num(m1(q4, R('med <b>' + NUM + '</b> enheter'))), lp = num(m1(q4, R('selges for <b>' + NUM + '</b>'))), lv = num(m1(q4, R('kostnader på <b>' + NUM + '</b>')));
    const V1 = num(m1(t.parts[5].q, R('selges for <b>' + NUM + '</b>')));
    const fl = [-I]; for (let k = 1; k <= T; k++) fl.push(C + (k === T ? S : 0));
    const npv = fl.reduce((z, c, k) => z + pv(c, r, k), 0); let A = 0; for (let k = 1; k <= T; k++) A += pv(1, r, k);
    const L = lq * (lp - lv); let cont = -V1; for (let k = 1; k <= T - 1; k++) cont += pv(C - L + (k === T - 1 ? S : 0), r, k);
    const mine = [npv, irr(fl), S - npv * Math.pow(1 + r, T), C - npv / A, npv - L * A, cont];
    t.parts.forEach((p, i) => { if (p.kind === 'num') cmp('fortsette', s, p, mine[i]); }); }
  // ---------- Egenproduksjon eller kjøp ----------
  { const t = O.make('k8-egenproduksjon-kjop', s), x = t.text;
    const Q = num(m1(x, R('bruker <b>' + NUM + '</b>'))), b = num(m1(x, R('inn for <b>' + NUM + '</b> per stykk'))), AM = num(m1(x, R('maskin til <b>' + NUM + '</b>'))), K = num(m1(x, R('installasjon for <b>' + NUM + '</b>')));
    const T = +m1(x, /brukes i <b>(\d) år/), v = num(m1(x, R('egenproduksjon er <b>' + NUM + '</b>'))), r = +m1(x, /etter skatt er <b>(\d+) %/) / 100;
    const P = num(m1(t.parts[5].q, R('til <b>' + NUM + '</b> per stykk'))), P2 = num(m1(t.parts[6].q, R('selges for <b>' + NUM + '</b>'))), dg = +m1(t.parts[6].q, /dekningsgrad på <b>(\d+) %/) / 100;
    let A = 0; for (let k = 1; k <= T; k++) A += pv(1, r, k);
    const y0 = -AM - K + 0.22 * K + AM * 0.2 * 0.22 / (r + 0.2), make = y0 - v * Q * 0.78 * A, buy = -b * Q * 0.78 * A;
    const nnv = P * Q * 0.78 * A + Math.max(make, buy);
    const mine = [irr([-(AM + K)].concat(Array(T).fill((b - v) * Q))), make, buy, Math.abs(make - buy), -y0 / A / ((b - v) * 0.78), nnv, nnv / A / (P2 * dg * 0.78)];
    t.parts.forEach((p, i) => { if (p.kind === 'num') cmp('egenproduksjon', s, p, mine[i]); }); }
  // ---------- Egenkapitalmetoden ----------
  { const t = O.make('k8-egenkapitalmetoden', s), x = t.text;
    const Q = num(m1(x, R('selge <b>' + NUM + '</b> enheter'))), price = num(m1(x, R('pris på <b>' + NUM + '</b>'))), mat = num(m1(x, R('Materialkostnadene er <b>' + NUM + '</b>'))), lonn = num(m1(x, R('lønnskostnadene <b>' + NUM + '</b>')));
    const FK = num(m1(x, R('kostnader er <b>' + NUM + '</b> per år'))), T = +m1(x, /varer i <b>(\d) år/), AM = num(m1(x, R('utstyret koster <b>' + NUM + '</b>'))), S = num(m1(x, R('selges for <b>' + NUM + '</b>')));
    const wc = +m1(x, /utgjør <b>(\d+) %/) / 100, rF = +m1(x, /<b>(\d+) %<\/b> før skatt/) / 100, rE = +m1(x, /<b>(\d+) %<\/b> etter skatt/) / 100;
    const L = num(m1(t.parts[3].q, R('lån på <b>' + NUM + '</b>'))), i = +m1(t.parts[3].q, /med (\d+) % rente/) / 100;
    const op = Q * (price - mat - lonn) - FK, AK = wc * Q * price;
    const npvAt = (fl, rr) => fl.reduce((z, c, k) => z + pv(c, rr, k), 0);
    const ff = [-AM - AK]; for (let k = 1; k <= T; k++) ff.push(op + (k === T ? S + AK : 0));
    const sh = (rr) => AM * 0.044 / (rr + 0.2) - S * 0.044 / (rr + 0.2) / Math.pow(1 + rr, T);
    const fe = (rr) => [-AM - AK + sh(rr)].concat(ff.slice(1).map((c, k) => c - 0.22 * op));
    const pay = L * i / (1 - Math.pow(1 + i, -T)); let bal = L; const it = [], ek1 = [];
    for (let k = 1; k <= T; k++) { const ii = bal * i, rp = pay - ii; it.push(ii); ek1.push(op - ii - 0.22 * (op - ii) - rp + (k === T ? S + AK : 0)); bal -= rp; }
    const ek = (rr) => [-AM - AK + L + sh(rr)].concat(ek1);
    let lo = -0.4, hi = 2.5; const g = (rr) => npvAt(ek(rr), rr); for (let k = 0; k < 300; k++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
    const mine = [npvAt(ff, rF), irr(ff), npvAt(fe(rE), rE), pay, it[1], ek1[0], (lo + hi) / 2];
    t.parts.forEach((p, k) => { if (p.kind === 'num') cmp('egenkapitalmetoden', s, p, mine[k]); }); }
}
  problems += bad; console.log(`nye generatorer: ${checked} tallsvar over ${SEEDS} frø, ${bad} avvik`); fails.forEach((z) => console.log('  ', z));
}
// ---------- 3) Rettingene fra bølge 5 ----------
{
let k10bad = 0, k11bad = 0, k8bad = 0, k5bad = 0, k5greedyDiff = 0;
const num = (t) => +t.replace(/[\s\u00a0\u202f]/g, '').replace('−', '-').replace(',', '.');
for (let s = 1; s <= SEEDS; s++) {
  // k10: vekt fra tabellen i teksten
  const t = O.make('k10-to-aksjer-tilstander', s);
  const rows = [...t.text.matchAll(/<tr>(.*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<t[dh][^>]*>(.*?)<\/t[dh]>/g)].map((x) => x[1]));
  const ps = rows[1].slice(1).map(num), a = rows[2].slice(1).map((x) => num(x) / 100), b = rows[3].slice(1).map((x) => num(x) / 100);
  const m = (x) => x.reduce((s2, v, i) => s2 + v * ps[i], 0); const EA = m(a), EB = m(b);
  const vA = m(a.map((x) => (x - EA) ** 2)), vB = m(b.map((x) => (x - EB) ** 2)), c = m(a.map((x, i) => (x - EA) * (b[i] - EB)));
  const w = (vB - c) / (vA + vB - 2 * c);
  if (w < -0.5 - 1e-9 || w > 1.5 + 1e-9) k10bad++;
  if (Math.abs(t.parts.find((p) => p.label === 'k').answer - w) > 1e-9) k10bad++;
  // k11: andel fra markedsverdier = oppgitt andel
  const x = O.make('k11-wacc-kvm', s);
  const mv = x.text.match(/egenkapitalen er ([\d\s\u00a0\u202f]+) mill\. og av gjelden ([\d\s\u00a0\u202f]+) mill/);
  const E = num(mv[1]), G = num(mv[2]);
  const ek = x.text.match(/egenkapitalandel på (\d+)|(\d+) % egenkapital/), gj = x.text.match(/gjeldsandel på (\d+)|og (\d+) % gjeld/);
  const wE = ek ? +(ek[1] || ek[2]) / 100 : 1 - +(gj[1] || gj[2]) / 100;
  if (Math.abs(E / (E + G) - wE) > 1e-12) k11bad++;
  // k8: motsatt fortegn skal ikke godtas
  const y = O.make('k8-nv-etter-skatt-komplett', s); const p = y.parts[3];
  if (O.check(p, U.n(-p.answer, 0)) === 'ok') k8bad++;
  // k5: entydig optimum, brute force fra teksten
  const z = O.make('k5-payback-kapitalrasjonering', s);
  const budget = num(z.text.match(/investeringsbudsjett på <b>([\d\s\u00a0\u202f]+)<\/b>/)[1]);
  const trs = [...z.text.matchAll(/<tr>(.*?)<\/tr>/g)].map((m2) => [...m2[1].matchAll(/<t[dh][^>]*>(.*?)<\/t[dh]>/g)].map((q) => q[1]));
  const inv = trs[trs.length - 2].slice(1).map(num), npv = trs[trs.length - 1].slice(1).map(num);
  const vals = []; for (let mm = 1; mm < 32; mm++) { let I = 0, V = 0; for (let i = 0; i < 5; i++) if (mm >> i & 1) { I += inv[i]; V += npv[i]; } if (I <= budget) vals.push(V); }
  vals.sort((q, r) => r - q);
  if (!(vals[0] > vals[1])) k5bad++;
  if (z.parts[4].answer !== vals[0]) k5bad++;
  if (/lavere enn beste kombinasjon/.test(z.parts[4].sol)) k5greedyDiff++;
}
  const n4 = k10bad + k11bad + k8bad + k5bad; problems += n4; console.log(`rettinger: ${n4} avvik over ${SEEDS} frø (min-varians-vekt ${k10bad}, markedsverdier ${k11bad}, fortegn ${k8bad}, kombinasjon ${k5bad})`);
}
console.log(problems ? `– ${problems} problemer` : '– OK'); process.exit(problems ? 1 : 0);
