/* Kjør: node tools/verify.js [antall frø]
   Faglig kontroll som ikke bruker generatorenes egen fasit:
   1) regnefunksjonene for de nye oppgavetypene mot tall i kilder/ (eksamen 2022 og 2023, kapittel-LF 2.1, 6.1, 6.5, 6.9, 8.1, 8.3, 8.8, 8.9, 8.10, 8.12, 11.13, 12.1, 12.2, 12.3 og 12.5, 7.7b og 7.8 og forelesningens eksempel 7-10),
   2) uavhengig etterregning av de nye generatorene: tallene leses fra oppgaveteksten og regnes med egne formler,
   3) kontroll av rettingene fra bølge 5 (minimum-varians-vekt, markedsverdier, fortegn nær 0, entydig kombinasjon). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ctx = { console, Intl, Math, Number, String, Array, Object, JSON, Date, parseFloat, isFinite, isNaN }; ctx.globalThis = ctx; vm.createContext(ctx);
for (const s of [...html.matchAll(/<script src="([^"?]+)/g)].map((m) => m[1]).filter((s) => !/app\.js$/.test(s))) vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s });
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
// Kap. 6 oppg. 1 (følsomhet på internrenten)
const se = O._sensCalc({ I: 350000, p: 20, v: 15, FK: 25000, Q: 20000, T: 10, d: 0.1, r: 0.1 });
eq('kap6.1 KS', se.cf, 75000, 0.5); eq('kap6.1 IR %', se.irr * 100, 16.95, 0.005);
[['pris', 35000, 0.00], ['vek', 45000, 4.85], ['volum', 65000, 13.19], ['inv', 75000, 14.41], ['levetid', 75000, 15.63], ['fk', 72500, 16.03]].forEach(([k, cf, ir]) => {
  const x = se.rows.find((y) => y.k === k); eq('kap6.1 KS ' + k, x.w.cf, cf, 0.5); eq('kap6.1 IR ' + k + ' %', x.w.irr * 100, ir, 0.005); });
// Kap. 8 oppg. 10 (leasing eller kjøp)
const ls = O._leaseCalc({ I: 303000, L: 80000, N: 5, i: 0.08, a: 0.2, S: 0 });
eq('kap8.10 lånerente e.s. %', ls.rd * 100, 6.24, 0.00001); eq('kap8.10 tapt skattefordel (6,24 %)', ls.shieldD, 50808, 1); eq('kap8.10 tapt skattefordel ved IR', ls.shield(ls.irr), 48909, 1);
eq('kap8.10 år 0 (6,24 %)', ls.y0D, 252192, 1); eq('kap8.10 leie e.s.', -ls.flows(ls.rd)[1], 62400, 0.5); eq('kap8.10 NNV leasing', ls.npv, -8952, 1); eq('kap8.10 IR e.s. %', ls.irr * 100, 7.26, 0.005);
// Kap. 8 oppg. 9 (før og etter skatt, IR etter skatt)
const it = O._irTaxCalc({ AM: 1021000, S: 418202, wc: 0.15, Q: 4200, price: 450, mat: 100, lonn: 120, ovr: 40, FK: 420000, T: 4, rF: 0.15, rE: 0.10, a: 0.2 });
eq('kap8.9a KS drift', it.op, 378000, 0.5); [-1304500, 378000, 378000, 378000, 1079702].forEach((v, t) => eq('kap8.9a KS år ' + t, it.fs[t], v, 0.5));
eq('kap8.9a IR f.s. %', it.irrF * 100, 20.42, 0.005); eq('kap8.9a NNV f.s.', it.npvF, 175882, 1);
eq('kap8.9b NV spart skatt', it.shield(0.1), 149747, 1); eq('kap8.9b nedskriving', it.ned(0.1), 41893, 1); [-1196647, 294840, 294840, 294840, 996542].forEach((v, t) => eq('kap8.9b grunnlag år ' + t, it.esE[t], v, 1));
eq('kap8.9b NNV e.s.', it.npvE, 217228, 1); eq('kap8.9c IR e.s. %', it.irrE * 100, 16.15, 0.005);
eq('kap8.9c spart skatt ved IR', it.shield(it.irrE), 124282, 1); eq('kap8.9c nedskriving ved IR', it.ned(it.irrE), 27973, 1); eq('kap8.9c år 0 ved IR', it.es(it.irrE)[0], -1208191, 1);
// Kap. 8 oppg. 1 (effektiv skattesats)
const e1 = O._irTaxCalc({ AM: 250000, S: 0, wc: 0, Q: 1, price: 87500, mat: 0, lonn: 0, ovr: 0, FK: 0, T: 4, rF: 0.15, rE: 0.08, a: 0.2 });
eq('kap8.1a IR f.s. %', e1.irrF * 100, 14.96, 0.005); eq('kap8.1b NNV e.s.', e1.npvE, 15338, 1); eq('kap8.1c IR e.s. %', e1.irrE * 100, 10.52, 0.005); eq('kap8.1d effektiv skattesats %', e1.eff * 100, 29.72, 0.005);
// Kap. 12 oppg. 1 og 2 (kundefordringer i investeringen, strammere kredittpolitikk)
const kr = O._creditCalc({ O1: 1800000, d0: 30, dg: 0.4, AM: 750000, RV: 100000, OM: 150000, FK: 378000, r: 0.2, T: 5, d1: 45,
  S: 36000000, svk: 28440000, K: 5250000, V: 4500000, L: 7000000, tap0: 1355000, p: 0.1, X: 30, t1: 0.02, E: 60000, nE: 3, A: 250000, i: 0.15 });
eq('kap12.1 kundefordringer', kr.KF, 150000, 0.5); [-1050000, 342000, 342000, 342000, 342000, 742000].forEach((v, t) => eq('kap12.1 KS år ' + t, kr.flows[t], v, 0.5));
eq('kap12.1 IR %', kr.irr * 100, 25.0, 0.05); eq('kap12.1 NNV', kr.npv, 133540, 1);
eq('kap12.2 endring kunder', kr.dK, 2550000, 0.5); eq('kap12.2 endring varelager', kr.dV, 450000, 0.5); eq('kap12.2 endring kreditorer', kr.dL, 700000, 0.5); eq('kap12.2 redusert kapitalbehov', kr.cap, 2240000, 0.5);
eq('kap12.2 redusert rentekostnad', kr.rente, 336000, 0.5); eq('kap12.2 redusert tap', kr.dTap, 707000, 0.5); eq('kap12.2 sum besparelser', kr.gain, 1043000, 0.5);
eq('kap12.2 tapt DB', kr.lostDB, 756000, 0.5); eq('kap12.2 avskrivning', kr.dep, 20000, 0.5); eq('kap12.2 sum kostnader', kr.cost, 1026000, 0.5); eq('kap12.2 netto besparelse', kr.net, 17000, 0.5);
// Kap. 12 oppg. 3 (kontantrabatt, tall i 1 000)
const kd = O._discCalc({ S: 72900, K: 21970, q: 0.03, d1: 14, a: 0.5, D2: 110, i: 0.14, A: 500, t0: 0.018, t1: 0.009 });
eq('kap12.3 kunder 14 dager', kd.kRab, 1398, 0.5); eq('kap12.3 kunder 110 dager', kd.kRest, 10985, 0.5); eq('kap12.3 sum kunder', kd.K1, 12383, 0.5); eq('kap12.3 endring', -kd.dK, -9587, 0.5);
eq('kap12.3 kontantrabatt', kd.rab, 1094, 0.5); eq('kap12.3 sum kostnadsøkning', kd.cost, 1594, 0.5); eq('kap12.3 sparte renter', kd.rente, 1342, 0.5); eq('kap12.3 reduserte tap', kd.dTap, 656, 0.5);
eq('kap12.3 sum gevinster', kd.gain, 1998, 0.5); eq('kap12.3 netto resultatøkning', kd.net, 405, 0.5);
// Kap. 12 oppg. 5 (Altmans Z)
const kz = O._zCalc({ EBIT: 109969, TA: 693536, Sales: 1384151, MVE: 182468, TL: 511068, WC: -59427, RE: 112971 });
[-0.0857, 0.1629, 0.1586, 0.3570, 1.9958].forEach((v, k) => eq('kap12.5 X' + (k + 1), kz.X[k], v, 0.00005)); [-0.1028, 0.2280, 0.5233, 0.2142, 1.9938].forEach((v, k) => eq('kap12.5 bidrag X' + (k + 1), kz.parts[k], v, 0.00005));
eq('kap12.5 Z', kz.Z, 2.8565, 0.00005);
// Kap. 8 oppg. 3 (salg av driftsmiddel)
const sd = O._saleCalc({ I: 600000, ks: [250000, 200000, 100000], S: 350000, r: 0.1, a: 0.2 });
eq('kap8.3a IR f.s. %', sd.irrF * 100, 20.73, 0.005); eq('kap8.3 NV spart skatt', sd.shield, 88000, 0.5); [-512000, 195000, 156000, 351000].forEach((v, t) => eq('kap8.3b grunnlag år ' + t, sd.inn[t], v, 0.5));
eq('kap8.3b NNV inntektsført', sd.npvInn, 57910, 1); eq('kap8.3c NV økt skatt nedskriving', sd.ned, 38567, 1); [-550567, 195000, 156000, 428000].forEach((v, t) => eq('kap8.3c grunnlag år ' + t, sd.nedF[t], v, 1));
eq('kap8.3c NNV nedskrevet', sd.npvNed, 77194, 1);
// Kap. 7 oppg. 7b og 8 (factoring), og forelesningens eksempel 7-10 (løsningen der er rekonstruert, ikke i LF)
const f7 = O._factCalc({ S: 3600000, D0: 40, D1: 40, m: 0.25, lag: 0, i: 0.2, Y: 360, geb: 0.0035 * 3600000, spart: 0, kk: 0.2 });
eq('kap7.7b kundefordringer før', f7.KF0, 400000, 0.5); eq('kap7.7b margin', f7.KF1, 100000, 0.5); eq('kap7.7b frigjort', f7.frig, 300000, 0.5); eq('kap7.7b renter', f7.rente, 60000, 0.5);
eq('kap7.7b gebyr', f7.geb, 12600, 0.5); eq('kap7.7b sum kostnader', f7.cost, 72600, 0.5); eq('kap7.7b kostnad %', f7.kost * 100, 24.2, 0.005);
const f8 = O._factCalc({ S: 9000000, D0: 60, D1: 60, m: 0.2, lag: 7, i: 0.15, Y: 360, geb: 60000, spart: 50000, kk: 0.2 });
eq('kap7.8 kundefordringer før', f8.KF0, 1500000, 0.5); eq('kap7.8 margin', f8.marg, 300000, 0.5); eq('kap7.8 rest 7 dager', f8.rest, 140000, 0.5); eq('kap7.8 etter factoring', f8.KF1, 440000, 0.5);
eq('kap7.8 reduksjon kapitalbinding', f8.frig, 1060000, 0.5); eq('kap7.8 renter', f8.rente, 159000, 0.5); eq('kap7.8 netto kostnad', f8.cost, 169000, 0.5); eq('kap7.8 kostnad %', f8.kost * 100, 15.9, 0.05);
const fl = O._factCalc({ S: 12000000, D0: 45, D1: 30, m: 0.2, lag: 0, i: 0.13, Y: 360, geb: 2400 * 25, spart: 50000, kk: 0.2 });
eq('forelesning 7-10 frigjort', fl.frig, 1300000, 0.5); eq('forelesning 7-10 renter (av 800 000)', fl.rente, 104000, 0.5); eq('forelesning 7-10 netto', fl.cost, 114000, 0.5); eq('forelesning 7-10 kostnad %', fl.kost * 100, 8.8, 0.05);
// Kap. 12 oppg. 3 (nøkkeltall fra balansen 2022). LFs gjeldsandel 97,1 % lar seg ikke gjenskape fra balansen; regnet gjeldsandel er 58,7 %.
const nk = O._ratioCalc({ S: 72900, AM: 35280, VL: 16450, KF: 21970, KB: 150, LL: 15000, KK: 14600, KG2: 13760, Y: 365, Db: 60 });
eq('kap12.3 sum eiendeler', nk.TA, 73850, 0.5); eq('kap12.3 balanselikviditet', nk.BL, 1.36, 0.005); eq('kap12.3 kasselikviditet', nk.KL, 0.78, 0.005); eq('kap12.3 kundekredittid', nk.D, 110, 0.05);
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
  // ---------- Følsomhet på internrenten ----------
  { const t = O.make('k6-folsomhet-internrente', s), x = t.text;
    const I = num(m1(x, R('Investeringen er <b>' + NUM + '</b>'))), T = +m1(x, /levetid på <b>(\d+) år/), Q = num(m1(x, R('selge <b>' + NUM + '</b>')));
    const p = num(m1(x, R('til <b>' + NUM + '</b> per stykk'))), v = num(m1(x, R('Variable kostnader er <b>' + NUM + '</b>'))), FK = num(m1(x, R('faste kostnader er <b>' + NUM + '</b> per år')));
    const d = +m1(x, /med <b>(\d+) %<\/b> i ugunstig/) / 100, r = +m1(t.parts[8].q, /Avkastningskravet er <b>(\d+) %/) / 100;
    const ir = (II, c, TT) => irr([-II].concat(Array(TT).fill(c))), cf = (pp, vv, qq, ff) => qq * (pp - vv) - ff;
    let A = 0; for (let k = 1; k <= T; k++) A += pv(1, r, k);
    const mine = [cf(p, v, Q, FK), ir(I, cf(p, v, Q, FK), T), ir(I, cf(p * (1 - d), v, Q, FK), T), ir(I, cf(p, v * (1 + d), Q, FK), T), ir(I, cf(p, v, Q * (1 - d), FK), T),
      ir(I * (1 + d), cf(p, v, Q, FK), T), ir(I, cf(p, v, Q, FK), Math.round(T * (1 - d))), ir(I, cf(p, v, Q, FK * (1 + d)), T), 1 - (v + (I / A + FK) / Q) / p];
    if (!/<svg class="chart"/.test(t.parts[9].sol) || (t.parts[9].sol.match(/<polyline/g) || []).length !== 6) { bad++; fails.push('følsomhet: stjernediagram mangler, frø ' + s); }
    t.parts.forEach((pp, i) => { if (pp.kind === 'num') cmp('følsomhet', s, pp, mine[i]); }); }
  // ---------- Leasing eller kjøp ----------
  { const t = O.make('k8-leasing-kjop', s), x = t.text;
    const I = num(m1(x, R('koster <b>' + NUM + '</b> å kjøpe'))), N = +m1(x, /brukes i <b>(\d) år/), sm = x.match(R('selges for <b>' + NUM + '</b>')), S = sm ? num(sm[1]) : 0;
    const a = +m1(x, /saldometoden med <b>(\d+) %/) / 100, i = num(m1(x, /lån med <b>([\d,]+) %<\/b> rente/)) / 100, L = num(m1(x, R('for <b>' + NUM + '</b> per år')));
    const rd = i * 0.78, sh = (rr) => I * a * 0.22 / (rr + a), nd2 = (rr) => S * a * 0.22 / (rr + a) / Math.pow(1 + rr, N);
    const fl = (rr) => [I - sh(rr) + nd2(rr)].concat(Array.from({ length: N }, (_, k) => -L * 0.78 - (k === N - 1 ? S : 0)));
    const npvAt = (f2, rr) => f2.reduce((z, c, k) => z + pv(c, rr, k), 0);
    let lo = -0.1, hi = 0.9; const g = (rr) => npvAt(fl(rr), rr); for (let k = 0; k < 300; k++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
    let A = 0; for (let k = 1; k <= N; k++) A += pv(1, rd, k);
    const mine = [rd, sh(rd), fl(rd)[0], L * 0.78, npvAt(fl(rd), rd), (lo + hi) / 2, (fl(rd)[0] - pv(S, rd, N)) / (A * 0.78)];
    if ((g(rd) > 0) !== /<b>Leasing<\/b> lønner seg/.test(t.parts[4].sol)) { bad++; fails.push('leasing: konklusjon, frø ' + s); }
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('leasing', s, pp, mine[k]); }); }
  // ---------- Internrente etter skatt og effektiv skattesats ----------
  { const t = O.make('k8-ir-etter-skatt', s), x = t.text;
    const Q = num(m1(x, R('selge <b>' + NUM + '</b>'))), T = +m1(x, /i <b>(\d) år<\/b> til/), price = num(m1(x, R('pris på <b>' + NUM + '</b>'))), mat = num(m1(x, R('Materialkostnadene er <b>' + NUM + '</b>')));
    const lonn = num(m1(x, R('lønnskostnadene <b>' + NUM + '</b>'))), om = x.match(R('øvrige variable kostnader <b>' + NUM + '</b>')), ovr = om ? num(om[1]) : 0;
    const FK = num(m1(x, R('kostnader er <b>' + NUM + '</b> per år'))), AM = num(m1(x, R('anlegget koster <b>' + NUM + '</b>'))), sm = x.match(R('selges for <b>' + NUM + '</b>')), S = sm ? num(sm[1]) : 0;
    const wm = x.match(/utgjør <b>(\d+) %/), wc = wm ? +wm[1] / 100 : 0, rF = +m1(x, /<b>(\d+) %<\/b> før skatt/) / 100, rE = +m1(x, /<b>(\d+) %<\/b> etter skatt/) / 100;
    const op = Q * (price - mat - lonn - ovr) - FK, AK = wc * Q * price;
    const npvAt = (f2, rr) => f2.reduce((z, c, k) => z + pv(c, rr, k), 0);
    const ff = [-AM - AK]; for (let k = 1; k <= T; k++) ff.push(op + (k === T ? S + AK : 0));
    const fe = (rr) => [-AM - AK + AM * 0.044 / (rr + 0.2) - S * 0.044 / (rr + 0.2) / Math.pow(1 + rr, T)].concat(ff.slice(1).map((c) => c - 0.22 * op));
    let lo = -0.1, hi = 2.5; const g = (rr) => npvAt(fe(rr), rr); for (let k = 0; k < 300; k++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
    const ie = (lo + hi) / 2, ifs = irr(ff);
    const mine = [op, ifs, npvAt(ff, rF), npvAt(fe(rE), rE), ie, 1 - ie / ifs];
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('ir etter skatt', s, pp, mine[k]); }); }
  // ---------- Kundefordringer og kredittpolitikk ----------
  { const t = O.make('k12-kredittpolitikk', s), x = t.text;
    const O1 = num(m1(x, R('Driftsinntektene er beregnet til <b>' + NUM + '</b>'))), T = +m1(x, /per år i <b>(\d) år<\/b>/), d0 = +m1(x, /får <b>(\d+) dagers<\/b> kreditt/);
    const dg = num(m1(x, /Dekningsgraden er <b>([\d,]+) %/)) / 100, FK = num(m1(x, R('faste kostnadene er <b>' + NUM + '</b> per år'))), AM = num(m1(x, R('Anlegget koster <b>' + NUM + '</b>')));
    const rm = x.match(R('restverdi på <b>' + NUM + '</b>')), RV = rm ? num(rm[1]) : 0, OM = num(m1(x, R('binder prosjektet <b>' + NUM + '</b> i andre'))), r = +m1(x, /Avkastningskravet er <b>(\d+) %/) / 100;
    const d1 = +m1(t.parts[6].q, /<b>(\d+) dagers<\/b> kreditt i stedet/);
    const S = num(m1(x, R('omsetning <b>' + NUM + '</b> og solgte'))), svk = num(m1(x, R('varers kostnad <b>' + NUM + '</b>'))), tap0 = num(m1(x, R('tap på krav <b>' + NUM + '</b>')));
    const V = num(m1(x, R('varelager <b>' + NUM + '</b>'))), K = num(m1(x, R('kundefordringer <b>' + NUM + '</b>'))), L = num(m1(x, R('leverandørgjeld\\) <b>' + NUM + '</b>')));
    const i = +m1(x, /Pantegjelden har <b>(\d+) %/) / 100, X = +m1(x, /kredittid til <b>(\d+) dager/), p = +m1(x, /omsetningen med <b>(\d+) %/) / 100;
    const t1 = num(m1(x, /blir <b>([\d,]+) %<\/b> av den nye/)) / 100, A = num(m1(x, R('administrasjonskostnader på <b>' + NUM + '</b>')));
    const em = x.match(R('utstyr for <b>' + NUM + '</b>, som avskrives lineært over <b>(\\d) år')), E = em ? num(em[1]) : 0, nE = em ? +em[2] : 1;
    const KF = O1 * d0 / 360, fl = [-(AM + KF + OM)]; for (let k = 1; k <= T; k++) fl.push(O1 * dg - FK + (k === T ? RV + KF + OM : 0));
    const dKF = O1 * (d1 - d0) / 360, K1 = S * (1 - p) * X / 360, cap = K - K1 + p * V - p * L - E;
    const gain = i * cap + tap0 - t1 * S * (1 - p), cost = p * (S - svk) + A + E / nE;
    const mine = [KF, fl[0], fl[1], fl[T], fl.reduce((z, c, k) => z + pv(c, r, k), 0), irr(fl), pv(dKF, r, T) - dKF, K1, cap, gain, cost, gain - cost];
    if ((gain - cost > 0) !== /<b>lønner seg<\/b>/.test(t.parts[11].sol)) { bad++; fails.push('kredittpolitikk: konklusjon, frø ' + s); }
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('kredittpolitikk', s, pp, mine[k]); }); }
  // ---------- Kontantrabatt ----------
  { const t = O.make('k12-kontantrabatt', s), x = t.text;
    const S = num(m1(x, R('Omsetningen er <b>' + NUM + '</b>'))), K = num(m1(x, R('kundefordringene er <b>' + NUM + '</b>'))), t0 = num(m1(x, /tap på krav er <b>([\d,]+) %/)) / 100;
    const q = num(m1(x, /gi <b>([\d,]+) %<\/b> kontantrabatt/)) / 100, d1 = +m1(x, /innen <b>(\d+) dager/), a = +m1(x, /regner med at <b>(\d+) %/) / 100, D2 = +m1(x, /resten betaler etter <b>(\d+) dager/);
    const t1 = num(m1(x, /falle til <b>([\d,]+) %/)) / 100, A = num(m1(x, R('øker med <b>' + NUM + '</b>'))), i = +m1(x, /<b>(\d+) %<\/b> rente/) / 100;
    const k1 = S * a * d1 / 365, K1 = k1 + S * (1 - a) * D2 / 365, dK = K - K1, rab = q * a * S, sr = i * dK, st = (t0 - t1) * S;
    const mine = [k1, K1, dK, rab, sr, st, sr + st - rab - A, (sr + st - A) / (a * S), Math.pow(1 / (1 - q), 365 / (D2 - d1)) - 1];
    if ((sr + st - rab - A > 0) !== /<b>lønner seg<\/b>/.test(t.parts[6].sol)) { bad++; fails.push('kontantrabatt: konklusjon, frø ' + s); }
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('kontantrabatt', s, pp, mine[k]); }); }
  // ---------- Altmans Z ----------
  { const t = O.make('k12-altman-z', s), x = t.text;
    const row = (lbl) => num(m1(x, R(lbl + '</th><td><b>(−?[\\d\\s\\u00a0\\u202f]+)</b>')));
    const Sales = row('Omsetning'), EBIT = row('Driftsresultat'), OMM = row('Omløpsmidler'), TA = row('Sum eiendeler'), RE = row('Opptjent egenkapital'), LG = row('Langsiktig gjeld'), KG = row('Kortsiktig gjeld');
    const MVE = num(m1(x, R('egenkapitalen \\(aksjene\\) er <b>' + NUM + '</b>')));
    if (Math.abs(row('Anleggsmidler') + OMM - TA) > 0.01 || Math.abs(row('Innskutt egenkapital') + RE + LG + KG - TA) > 0.01) { bad++; fails.push('altman: balansen går ikke opp, frø ' + s); }
    const X = [(OMM - KG) / TA, RE / TA, EBIT / TA, MVE / (LG + KG), Sales / TA], Z = 1.2 * X[0] + 1.4 * X[1] + 3.3 * X[2] + 0.6 * X[3] + 0.999 * X[4];
    const goal = Z < 1.81 ? 1.81 : 2.99;
    if (/øke/.test(t.parts[6].q) !== (Z < 2.99)) { bad++; fails.push('altman: retning i siste deloppgave, frø ' + s); }
    const zone = Z < 1.81 ? 'høy konkursrisiko' : Z > 2.99 ? 'lav konkursrisiko' : 'gråsone';
    if (!t.parts[5].sol.includes(zone)) { bad++; fails.push('altman: sone, frø ' + s); }
    const mine = X.concat([Z, Math.abs(goal - Z) * TA / 3.3]);
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('altman', s, pp, mine[k]); }); }
  // ---------- Factoring ----------
  { const t = O.make('k7-factoring', s), x = t.text;
    const S = num(m1(x, R('kredittsalg på <b>' + NUM + '</b>'))), D0 = +m1(x, /etter <b>(\d+) dager<\/b>\. Bedriften/), Y = +m1(x, /Regn med <b>(\d+) dager<\/b>/);
    const adv = +m1(x, /forskutterer <b>(\d+) %<\/b>/) / 100, mg = +m1(x, /marginen på (\d+) %/) / 100;
    if (Math.abs(adv + mg - 1) > 1e-9) { bad++; fails.push('factoring: forskudd + margin ≠ 100 %, frø ' + s); }
    const lm = x.match(/<b>(\d+) dager<\/b> etter at fakturaen/), lag = lm ? +lm[1] : 0, dm = x.match(/ned til <b>(\d+) dager<\/b>/), D1 = dm ? +dm[1] : D0;
    const i = +m1(x, /forskuttert beløp er <b>(\d+) %/) / 100, kk = num(m1(x, /effektiv rente på <b>([\d,]+) %/)) / 100;
    const gm = x.match(R('Factoringgebyret er <b>' + NUM + ' kr per faktura</b>'));
    const geb = gm ? S / num(m1(x, R('gjennomsnittsfaktura er på <b>' + NUM + '</b>'))) * num(gm[1]) : num(m1(x, /Factoringgebyret er <b>([\d,]+) %<\/b> av kredittsalget/)) / 100 * S;
    const sm = x.match(R('sparer <b>' + NUM + '</b> per år')), sp = sm ? num(sm[1]) : 0;
    const before = S / Y * D0, after = S / Y * (mg * D1 + adv * lag), freed = before - after, advanced = S / Y * adv * (D1 - lag);
    const net = advanced * i + geb - sp;
    const mine = [before, after, freed, advanced, advanced * i, geb, net, net / freed, kk * freed - advanced * i + sp];
    if ((net / freed < kk) !== /<b>lavere<\/b>/.test(t.parts[7].sol)) { bad++; fails.push('factoring: konklusjon, frø ' + s); }
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('factoring', s, pp, mine[k]); }); }
  // ---------- Nøkkeltall og likviditet ----------
  { const t = O.make('k12-nokkeltall-likviditet', s), x = t.text;
    const row = (lbl) => num(m1(x, R(lbl + '</th><td><b>([\\d\\s\\u00a0\\u202f]+)</b>')));
    const AM = row('Anleggsmidler'), VL = row('Varelager'), KF = row('Kundefordringer'), KB = row('Kontanter og bank'), TA = row('Sum eiendeler');
    const EK = row('Egenkapital'), LL = row('Langsiktig lån'), KK = row('Kassekreditt'), KG2 = row('Leverandørgjeld og annen kortsiktig gjeld');
    if (Math.abs(AM + VL + KF + KB - TA) > 0.01 || Math.abs(EK + LL + KK + KG2 - TA) > 0.01) { bad++; fails.push('nøkkeltall: balansen går ikke opp, frø ' + s); }
    const S = num(m1(x, R('Salgsinntektene i 2025 var <b>' + NUM + '</b>'))), Y = +m1(x, /regnes med <b>(\d+) dager<\/b>/), Db = +m1(t.parts[5].q, /bransjesnittet på (\d+) dager/);
    const tr = (lbl) => m1(x, R(lbl + '</th>((?:<td>[^<]*</td>)+)</tr>')).match(/<td>([^<]*)<\/td>/g).map((z) => z.replace(/<\/?td>/g, ''));
    const cur = VL + KF + KB, short = KK + KG2, freed = KF - S * Db / Y;
    const mine = [cur - short, cur / short, (cur - VL) / short, (LL + short) / TA, KF * Y / S, freed, (cur - freed) / (short - freed)];
    const b0 = num(tr('2022')[0]), bBr = num(tr('Bransje')[0]);
    if (tr('2025').some((z) => z !== '?')) { bad++; fails.push('nøkkeltall: 2025 er ikke tom i tabellen, frø ' + s); }
    if ((b0 > mine[1]) !== /forverring/.test(t.parts[7].points[1])) { bad++; fails.push('nøkkeltall: utvikling, frø ' + s); }
    if ((mine[1] > bBr) !== /\(([\d,]+)\) er bedre enn bransjen/.test(t.parts[7].points[0].split(', og')[0])) { bad++; fails.push('nøkkeltall: mot bransjen, frø ' + s); }
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('nøkkeltall', s, pp, mine[k]); }); }
  // ---------- Salg av driftsmiddel ----------
  { const t = O.make('k8-salg-driftsmiddel', s), x = t.text;
    const I = num(m1(x, R('for <b>' + NUM + '</b>\\. Investeringen'))), T = +m1(x, /Etter <b>(\d) år<\/b>/), S = num(m1(x, R('selges driftsmidlet for <b>' + NUM + '</b>'))), r = +m1(x, /etter skatt er <b>(\d+) %/) / 100;
    const same = x.match(R('før skatt på <b>' + NUM + '</b> per år'));
    const ks = same ? Array(T).fill(num(same[1])) : [...x.matchAll(new RegExp('<b>' + NUM + '</b> i år (\\d)', 'g'))].map((z) => num(z[1]));
    if (ks.length !== T) { bad++; fails.push('salg: antall år, frø ' + s); }
    const fs = [-I].concat(ks.map((c, k) => c + (k === T - 1 ? S : 0))), sh = I * 0.2 * 0.22 / (r + 0.2), nd3 = pv(S * 0.2 * 0.22 / (r + 0.2), r, T);
    let inn = -I + sh, ned = -I + sh - nd3; ks.forEach((c, k) => { inn += pv(0.78 * c, r, k + 1); ned += pv(0.78 * c, r, k + 1); }); inn += pv(0.78 * S, r, T); ned += pv(S, r, T);
    const mine = [irr(fs), sh, inn, nd3, ned, ned - inn];
    if (!(ned > inn)) { bad++; fails.push('salg: nedskriving ikke best, frø ' + s); }
    t.parts.forEach((pp, k) => { if (pp.kind === 'num') cmp('salg av driftsmiddel', s, pp, mine[k]); }); }
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
