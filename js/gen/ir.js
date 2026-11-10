/* Internrente: følsomhetsanalyse og stjernediagram (kap. 6 oppg. 1), leasing eller kjøp etter skatt (kap. 8 oppg. 10),
   og internrente etter skatt med effektiv skattesats (kap. 8 oppg. 9, med oppg. 1d). */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, cfTable } = U;
  const S_TAX = 0.22;
  const pad = (a) => [null].concat(a);
  const r100 = (x, step) => Math.round(x / step) * step;
  const cl = (x) => U.round(x, 6);
  /** Beløp: hele tall uten desimaler, ellers to. */
  const nd = (x) => n(x, Number.isInteger(cl(x)) ? 0 : 2);
  const pctS = (x) => n(x * 100, Number.isInteger(cl(x * 100)) ? 0 : 2) + ' %';

  /** Forklarer tilnærmingen med skattefordelen holdt fast, med det faktiske avviket fra målsøkingssvaret. */
  const fixedNote = (fixed, exact, rate) => {
    const dpp = Math.abs(fixed - exact) * 100;
    return `<p>Holder du skattefordelen fast på ${rate} og bruker <code>=IR(...)</code> på beregningsgrunnlaget, blir svaret ${pct(fixed, 2)}, ${n(dpp, 2)} prosentpoeng fra målsøkingssvaret. ` +
      (dpp <= 0.1 ? 'Det er innenfor toleransen på 0,1 prosentpoeng og godtas her, men målsøkingen er den riktige fremgangsmåten.</p>' : 'Siden godtar svar innenfor 0,1 prosentpoeng av målsøkingssvaret, så tilnærmingen er ikke god nok her.</p>');
  };
  O._fixedNote = fixedNote;

  // ==================================================================
  // Stjernediagram som SVG: internrente mot endring i hver variabel. Bare linjer og tekst, farger fra temaet.
  // ==================================================================
  function starChart(lines, d, r, title) {
    const W = 440, H = 300, L = 48, RM = 112, T = 16, B = 44;
    const ys = lines.flatMap((l) => l.pts.map((p) => p[1])).concat([r]);
    let lo = Math.min(...ys), hi = Math.max(...ys);
    const step = [0.01, 0.02, 0.025, 0.05, 0.1, 0.2, 0.5].find((s) => (hi - lo) / s <= 6) || 1;
    lo = Math.floor(lo / step - 1e-9) * step; hi = Math.ceil(hi / step + 1e-9) * step; if (hi - lo < step) hi = lo + step;
    const X = (x) => L + (x + d) / (2 * d) * (W - L - RM), Y = (y) => T + (hi - y) / (hi - lo) * (H - T - B);
    const fx = (v) => v.toFixed(1);
    let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">`;
    for (let k = 0; lo + k * step <= hi + 1e-9; k++) {
      const v = lo + k * step;
      s += `<line class="grid" x1="${L}" x2="${fx(X(d))}" y1="${fx(Y(v))}" y2="${fx(Y(v))}"/><text class="tick" x="${L - 6}" y="${fx(Y(v) + 4)}" text-anchor="end">${n(v * 100, step < 0.01 ? 1 : 0)} %</text>`;
    }
    [-d, 0, d].forEach((x) => { s += `<line class="${x === 0 ? 'axis0' : 'grid'}" x1="${fx(X(x))}" x2="${fx(X(x))}" y1="${T}" y2="${H - B}"/><text class="tick" x="${fx(X(x))}" y="${H - B + 18}" text-anchor="middle">${x === 0 ? '0' : (x > 0 ? '+' : '−') + n(d * 100) + ' %'}</text>`; });
    s += `<text class="tick" x="${fx(X(0))}" y="${H - 6}" text-anchor="middle">Endring i variabelen</text>`;
    s += `<line class="req" x1="${L}" x2="${fx(X(d))}" y1="${fx(Y(r))}" y2="${fx(Y(r))}"/>`;
    lines.forEach((l) => { s += `<polyline class="line" points="${l.pts.map((p) => fx(X(p[0])) + ',' + fx(Y(p[1]))).join(' ')}"/>` + l.pts.map((p) => `<circle class="dot" cx="${fx(X(p[0]))}" cy="${fx(Y(p[1]))}" r="2.6"/>`).join(''); });
    // Navnene står ved høyre ende av hver linje, skjøvet fra hverandre så de ikke overlapper.
    const labels = lines.map((l) => ({ t: l.short, y: Y(l.pts[l.pts.length - 1][1]), cls: 'lbl' })).concat([{ t: `Krav ${pctS(r)}`, y: Y(r), cls: 'lbl req-lbl' }]).sort((a, b) => a.y - b.y);
    const gap = 17;
    for (let k = 1; k < labels.length; k++) if (labels[k].y < labels[k - 1].y + gap) labels[k].y = labels[k - 1].y + gap;
    const over = labels[labels.length - 1].y - (H - B + 4);
    if (over > 0) labels.forEach((x) => { x.y -= over; });
    for (let k = labels.length - 2; k >= 0; k--) if (labels[k].y > labels[k + 1].y - gap) labels[k].y = labels[k + 1].y - gap;
    labels.forEach((x) => { s += `<text class="${x.cls}" x="${fx(X(d) + 8)}" y="${fx(x.y + 4)}">${x.t}</text>`; });
    return `<figure class="chartfig">${s}</svg><figcaption class="small muted">Stjernediagram: hver linje viser internrenten når én variabel endres og resten holdes på basisverdien. Linjene er trukket mellom de tre beregnede punktene (−${n(d * 100)} %, 0 og +${n(d * 100)} %).</figcaption></figure>`;
  }

  // ==================================================================
  // 1) Følsomhetsanalyse og stjernediagram på internrenten (kap. 6 oppg. 1)
  // ==================================================================
  const VARS = [
    { k: 'pris', name: 'Salgspris', short: 'Pris', low: 'pris', worse: -1 },
    { k: 'vek', name: 'Variable kostnader per enhet', short: 'VEK', low: 'variable kostnader', worse: 1 },
    { k: 'volum', name: 'Salgsvolum', short: 'Volum', low: 'volum', worse: -1 },
    { k: 'inv', name: 'Investeringsutgift', short: 'Investering', low: 'investering', worse: 1 },
    { k: 'levetid', name: 'Levetid (år)', short: 'Levetid', low: 'levetid', worse: -1 },
    { k: 'fk', name: 'Faste kostnader', short: 'FK', low: 'faste kostnader', worse: 1 },
  ];
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 6.1. */
  function sensCalc({ I, p, v, FK, Q, T, d, r }) {
    const cfOf = (pp, vv, qq, ff) => qq * (pp - vv) - ff;
    const irOf = (II, c, TT) => F.irr([-II].concat(Array(TT).fill(c)));
    const at = (k, x) => {
      const g = { I, p, v, FK, Q, T };
      if (k === 'pris') g.p = cl(p * (1 + x)); if (k === 'vek') g.v = cl(v * (1 + x)); if (k === 'volum') g.Q = cl(Q * (1 + x));
      if (k === 'inv') g.I = cl(I * (1 + x)); if (k === 'levetid') g.T = Math.round(T * (1 + x)); if (k === 'fk') g.FK = cl(FK * (1 + x));
      g.cf = cfOf(g.p, g.v, g.Q, g.FK); g.irr = irOf(g.I, g.cf, g.T); return g;
    };
    const cf = cfOf(p, v, Q, FK), irr = irOf(I, cf, T);
    const rows = VARS.map((x) => {
      const w = at(x.k, x.worse * d), b = at(x.k, -x.worse * d);
      const val = { pris: p, vek: v, volum: Q, inv: I, levetid: T, fk: FK }[x.k], wv = { pris: w.p, vek: w.v, volum: w.Q, inv: w.I, levetid: w.T, fk: w.FK }[x.k];
      return Object.assign({}, x, { val, wv, w, b, drop: irr - w.irr });
    });
    const A = F.annuityFactor(r, T), pCrit = v + (I / A + FK) / Q, pFall = 1 - pCrit / p;
    return { cf, irr, rows, A, pCrit, pFall, at };
  }
  O._sensCalc = sensCalc;

  const sensFirms = [['Fjellvann AS', 'flaskevann', 'flasker'], ['Strikk og Garn AS', 'ullgarn', 'nøster'], ['Nordlys Lys AS', 'stearinlys', 'pakker'],
    ['Kystbåt AS', 'kajakker', 'kajakker'], ['Granitt Vest AS', 'heller', 'heller'], ['Bryggeriet Sjø AS', 'alkoholfritt øl', 'kasser']];

  O.reg({
    id: 'k6-folsomhet-internrente', chapter: 6, level: 2, minutes: 25, examLike: 'Kapitteloppgave 6.1 – ikke gitt som egen oppgave 2016–2025',
    title: 'Følsomhetsanalyse og stjernediagram på internrenten',
    topic: 'Følsomhet',
    blurb: 'Endre én variabel om gangen i ugunstig retning, regn ny internrente, ranger variablene og les stjernediagrammet.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, prod, unit] = R.pick(sensFirms);
      const d = R.pick([0.1, 0.1, 0.2]), T = d === 0.1 ? R.pick([10, 10, 20]) : R.pick([5, 10, 15]);
      const p = R.pick([20, 40, 60, 80, 120, 250]), v = Math.round(p * R.pick([0.5, 0.6, 0.7, 0.75]) * 2) / 2;
      const Q = R.int(4, 40) * 1000, FK = Math.max(10000, r100(Q * (p - v) * R.pick([0.1, 0.2, 0.3]), 5000));
      const cf0 = Q * (p - v) - FK, tgt = R.pick([0.13, 0.15, 0.17, 0.2]);
      const I = r100(cf0 * F.annuityFactor(tgt, T), 10000), r = R.pick([0.08, 0.1, 0.12]);
      const c = sensCalc({ I, p, v, FK, Q, T, d, r });
      if (!(c.irr > r + 0.01 && c.rows.every((x) => x.w.cf > 0 && Number.isFinite(x.w.irr) && x.w.irr > -0.08 && Number.isFinite(x.b.irr)) && c.pFall > 0.003)) return null;
      const below = c.rows.filter((x) => x.w.irr < r), rank = c.rows.slice().sort((a, b) => b.drop - a.drop);
      const val = (x, y) => (x.k === 'levetid' ? `${y} år` : nd(y));
      const task = {
        text: `<p>${firm} vurderer å produsere ${prod}. Investeringen er <b>${n(I)}</b>, og prosjektet har en levetid på <b>${T} år</b> uten restverdi. Man regner med å selge <b>${n(Q)}</b> ${unit} i året til <b>${nd(p)}</b> per stykk. Variable kostnader er <b>${nd(v)}</b> per stykk, og betalbare faste kostnader er <b>${n(FK)}</b> per år. Se bort fra skatt og arbeidskapital.</p>` +
          `<p>For å se hvilke anslag som er mest kritiske, skal ledelsen ha en følsomhetsanalyse på internrenten: én variabel endres om gangen med <b>${pctS(d)}</b> i ugunstig retning, mens resten holdes på basisverdien.</p>`,
        parts: [
          { q: 'Hva er den årlige kontantstrømmen i basiskalkylen?', answer: c.cf, unit: 'kr',
            sol: f(`${n(Q)} · (${nd(p)} − ${nd(v)}) − ${n(FK)} = ${n(c.cf)}`) },
          { q: 'Hva er internrenten i basiskalkylen?', answer: c.irr, unit: '%',
            sol: f(`−${n(I)} + ${n(c.cf)} · A(IR, ${T}) = 0`) + `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irr, 2)}</b>.</p>` },
        ].concat(c.rows.map((x) => {
          const w = x.w;
          const how = { pris: `${n(Q)} · (${nd(w.p)} − ${nd(v)}) − ${n(FK)}`, vek: `${n(Q)} · (${nd(p)} − ${nd(w.v)}) − ${n(FK)}`, volum: `${n(w.Q)} · (${nd(p)} − ${nd(v)}) − ${n(FK)}`,
            inv: null, levetid: null, fk: `${n(Q)} · (${nd(p)} − ${nd(v)}) − ${n(w.FK)}` }[x.k];
          const q = { pris: `Salgsprisen blir ${pctS(d)} lavere`, vek: `De variable kostnadene per stykk blir ${pctS(d)} høyere`, volum: `Salgsvolumet blir ${pctS(d)} lavere`,
            inv: `Investeringen blir ${pctS(d)} høyere`, levetid: `Levetiden blir ${pctS(d)} kortere (${w.T} år)`, fk: `De faste kostnadene blir ${pctS(d)} høyere` }[x.k];
          return { q: `${q}. Hva blir internrenten?`, answer: w.irr, unit: '%',
            hint: x.k === 'inv' ? 'Kontantstrømmen er den samme, men utbetalingen i år 0 øker.' : x.k === 'levetid' ? 'Kontantstrømmen er den samme, men den kommer i færre år.' : 'Regn ny årlig kontantstrøm og deretter internrenten.',
            sol: (how ? f(`Kontantstrøm = ${how} = ${n(w.cf)}`) : f(`Investering ${n(w.I)}, kontantstrøm ${n(w.cf)} i ${w.T} år`)) +
              `<p><code>=IR(...)</code> = <b>${pct(w.irr, 2)}</b>, ${pct(x.drop, 2)} lavere enn basis.${w.irr < r ? ` Det er under avkastningskravet på ${pctS(r)}.` : ''}</p>` };
        }), [
          { q: `Avkastningskravet er <b>${pctS(r)}</b>. Hvor mange prosent kan salgsprisen falle før internrenten blir lik avkastningskravet?`, answer: c.pFall, unit: '%',
            hint: 'Ved NNV = 0 er internrenten lik kravet. Finn prisen der nåverdien av kontantstrømmen akkurat dekker investeringen.',
            sol: f(`Kritisk kontantstrøm = ${frac(n(I), `A(${pctS(r)}, ${T}) = ${n(c.A, 4)}`)} = ${n(I / c.A)}`) +
              f(`Kritisk pris = ${nd(v)} + ${frac(`${n(I / c.A)} + ${n(FK)}`, n(Q))} = ${n(c.pCrit, 2)}`) +
              f(`Fall = 1 − ${frac(n(c.pCrit, 2), nd(p))} = ${pct(c.pFall, 2)}`) +
              `<p>I stjernediagrammet er dette punktet der prislinjen krysser kravlinjen.</p>` },
          { kind: 'text', q: 'Tegn et stjernediagram for internrenten. Hvilke variabler er mest kritiske, og hva er svakhetene ved denne typen følsomhetsanalyse?',
            points: [`Rangering etter fall i internrenten: ${rank.map((x) => `${x.low} (${pct(x.w.irr, 2)})`).join(', ')}. <b>${rank[0].name}</b> er mest kritisk${rank[0].k === 'pris' ? ': prisen virker på hele omsetningen, mens kostnadene bare er en del av den' : ''}.`,
              below.length ? `Med avkastningskrav ${pctS(r)} gjør ${below.length === 1 ? 'én av endringene' : below.length + ' av endringene'} prosjektet ulønnsomt: ${below.map((x) => x.low).join(', ')}.` : `Ingen av endringene på ${pctS(d)} tar internrenten under kravet på ${pctS(r)}.`,
              '<b>Lesing</b>: hver linje går gjennom basisinternrenten ved 0 % endring. Jo brattere linje, jo mer følsom er internrenten for variabelen. Der en linje krysser kravlinjen, er variabelen på sin kritiske verdi.',
              '<b>Svakheter</b>: bare én variabel endres om gangen, så samvariasjon (for eksempel lavere pris og høyere volum) fanges ikke. Diagrammet sier ingenting om hvor sannsynlig en endring er, og 10 % kan være lite for én variabel og mye for en annen.'],
            sol: starChart(c.rows.map((x) => ({ short: x.short, pts: [[-d, (x.worse < 0 ? x.w : x.b).irr], [0, c.irr], [d, (x.worse < 0 ? x.b : x.w).irr]] })), d, r, `Stjernediagram for internrenten i ${firm}`) +
              U.table(['Variabel', 'Basis', `Ugunstig (${pctS(d)})`, 'Kontantstrøm', 'Internrente'], c.rows.map((x) => [x.name, val(x, x.val), val(x, x.wv), n(x.w.cf), pct(x.w.irr, 2)]).concat([{ cells: ['Basis', '', '', n(c.cf), pct(c.irr, 2)], cls: 'sum' }])) },
        ]),
      };
      return { p: { I, p, v, FK, Q, T, d, r }, c, task };
    },
  });

  // ==================================================================
  // 2) Leasing eller kjøp etter skatt (kap. 8 oppg. 10)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 8.10. Kontantstrømmen er leasing minus kjøp.
      Nullpunktet søkes over −15 %: saldoformelen har en singularitet ved r = −a. */
  function leaseCalc({ I, L, N, i, a, S }) {
    const rd = i * (1 - S_TAX);
    const shield = (r) => F.pvSaldoTaxShield(I, a, S_TAX, r), ned = (r) => (S ? F.pvSaldoTaxShield(S, a, S_TAX, r) / Math.pow(1 + r, N) : 0);
    const y0 = (r) => I - shield(r) + ned(r), lAt = L * (1 - S_TAX);
    const flows = (r) => [y0(r)].concat(U.range(1, N).map((t) => -lAt - (t === N ? S : 0)));
    const npv = F.npv(rd, flows(rd)), irr = F.solve((r) => F.npv(r, flows(r)), -0.15, 1), irrFixed = F.irr(flows(rd), -0.15, 1);
    const A = F.annuityFactor(rd, N), Lmax = (y0(rd) - S / Math.pow(1 + rd, N)) / (A * (1 - S_TAX));
    return { rd, shield, ned, y0, lAt, flows, npv, irr, irrFixed, A, Lmax, shieldD: shield(rd), nedD: ned(rd), y0D: y0(rd) };
  }
  O._leaseCalc = leaseCalc;

  const leaseFirms = [['Vestvei Transport AS', 'en ny lastebil', 0.24, 'saldogruppe c'], ['Trykkeriet Nord AS', 'en trykkmaskin', 0.2, 'saldogruppe d'], ['Regnskapshuset AS', 'nytt datautstyr', 0.3, 'saldogruppe a'],
    ['Anleggsdrift Sør AS', 'en gravemaskin', 0.2, 'saldogruppe d'], ['Bakeriet Brød og Bit AS', 'en ny steinovn', 0.2, 'saldogruppe d'], ['Kystfrakt AS', 'en varebil', 0.24, 'saldogruppe c']];

  O.reg({
    id: 'k8-leasing-kjop', chapter: 8, level: 2, minutes: 25, examLike: 'Kapitteloppgave 8.10 – ikke gitt som egen oppgave 2016–2025',
    title: 'Leasing eller kjøp etter skatt',
    topic: 'Nåverdi etter skatt',
    blurb: 'Leasing som et lån: spart investering mot tapt skattefordel og leie etter skatt, NNV med lånerenten etter skatt, leasingens internrente og høyeste leie som lønner seg.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, asset, a, grp] = R.pick(leaseFirms);
      const I = R.int(15, 120) * 10000, N = R.pick([3, 4, 5, 5, 6]), i = R.pick([0.05, 0.06, 0.07, 0.08, 0.09]);
      const S = R.bool() ? 0 : r100(I * R.pick([0.1, 0.15, 0.2, 0.3]), 1000);
      const rd = i * (1 - S_TAX), tgt = rd + R.pick([-0.015, -0.008, 0.008, 0.015]);
      const c0 = leaseCalc({ I, L: 0, N, i, a, S });
      const L = r100((c0.y0(tgt) - S / Math.pow(1 + tgt, N)) / (F.annuityFactor(tgt, N) * (1 - S_TAX)), 1000);
      if (L <= 0) return null;
      const p = { I, L, N, i, a, S };
      const c = leaseCalc(p);
      if (!(Number.isFinite(c.irr) && Math.abs(c.npv) > 0.004 * I && Math.abs(c.irr - c.rd) > 0.003 && Math.abs(c.Lmax - L) > 0.004 * L)) return null;
      const leaseBest = c.npv > 0;
      const tbl = (r, y0) => cfTable([['Spart investering', [I]], ['Tapt NV skattefordel avskrivninger', [-c.shield(r)]]].concat(S ? [['Slipper økt skatt ved nedskriving av salget', [c.ned(r)]], ['Tapt salgsverdi', [null].concat(Array(N - 1).fill(null), [-S])]] : [])
        .concat([['Leasingleie', pad(Array(N).fill(-L))], ['Skattefradrag for leien (22 %)', pad(Array(N).fill(L * S_TAX))], ['Beregningsgrunnlag', [y0].concat(U.range(1, N).map((t) => -c.lAt - (t === N ? S : 0))), 'sum']]), N);
      const task = {
        text: `<p>${firm} trenger ${asset}, som koster <b>${n(I)}</b> å kjøpe. Den brukes i <b>${N} år</b>${S ? ` og kan da selges for <b>${n(S)}</b>. Salget nedskrives på saldo` : ' og har ingen verdi ved slutten'}. Ved kjøp avskrives den etter saldometoden med <b>${pctS(a)}</b> (${grp}), og kjøpet finansieres med et lån med <b>${pctS(i)}</b> rente før skatt.</p>` +
          `<p>Leverandøren tilbyr i stedet leasing i ${N} år for <b>${n(L)}</b> per år, betalt etterskuddsvis. Leien er fradragsberettiget${S ? ', og utleieren tar tilbake eiendelen ved slutten' : ''}. Skattesatsen er 22 %, og skatt betales samme år som inntekten opptjenes. Driftsinntekter og andre kostnader er de samme i begge tilfeller.</p>`,
        parts: [
          { q: 'Hva er lånerenten etter skatt?', answer: c.rd, unit: '%',
            hint: 'Leasing er et alternativ til å låne. Renter er fradragsberettiget, så kostnaden etter skatt er lavere enn den nominelle renten.',
            sol: f(`${pctS(i)} · (1 − 0,22) = ${pct(c.rd, 2)}`) + '<p>Leasing sammenlignes med lånefinansiert kjøp, så kontantstrømmen diskonteres med lånerenten etter skatt, ikke med prosjektets avkastningskrav.</p>' },
          { q: 'Ved leasing får ikke bedriften avskrive eiendelen. Hva er nåverdien av skattefordelen av saldoavskrivningene som går tapt? Bruk lånerenten etter skatt.', answer: c.shieldD, unit: 'kr',
            sol: f(`NV spart skatt = ${frac(`${n(I)} · ${n(a, 2)} · 0,22`, `${n(c.rd, 4)} + ${n(a, 2)}`)} = ${n(c.shieldD)}`) },
          { q: 'Sett opp kontantstrømmen for leasing sammenlignet med kjøp (leasing minus kjøp). Hva er beregningsgrunnlaget i år 0?', answer: c.y0D, unit: 'kr',
            hint: S ? 'Ved leasing sparer man investeringen, men taper skattefordelen av avskrivningene. Man slipper også den økte skatten ved at salget nedskrives på saldo, men går glipp av salgsverdien.' : 'Ved leasing sparer man investeringen i år 0, men taper skattefordelen av avskrivningene.',
            sol: (S ? f(`NV økt skatt ved nedskriving = ${frac(`${n(S)} · ${n(a, 2)} · 0,22`, `${n(c.rd, 4)} + ${n(a, 2)}`)} · ${frac('1', `${n(1 + c.rd, 4)}<sup>${N}</sup>`)} = ${n(c.nedD)}`) : '') +
              f(`År 0 = ${n(I)} − ${n(c.shieldD)}${S ? ` + ${n(c.nedD)}` : ''} = ${n(c.y0D)}`) + tbl(c.rd, c.y0D) },
          { q: 'Hva er leasingleien etter skatt per år?', answer: c.lAt, unit: 'kr',
            sol: f(`${n(L)} · (1 − 0,22) = ${n(c.lAt)}`) },
          { q: 'Hva er nåverdien (NNV) av å lease i stedet for å kjøpe, med lånerenten etter skatt?', answer: c.npv, unit: 'kr', tol: { abs: I * 0.0005, rel: 0.003 },
            sol: f(`NNV = ${n(c.y0D)} − ${n(c.lAt)} · A(${pct(c.rd, 2)}, ${N})${S ? ` − ${frac(n(S), `${n(1 + c.rd, 4)}<sup>${N}</sup>`)}` : ''} = ${n(c.y0D)} − ${n(c.lAt)} · ${n(c.A, 4)}${S ? ` − ${n(S / Math.pow(1 + c.rd, N))}` : ''} = <b>${n(c.npv)}</b>`) +
              `<p>${leaseBest ? '<b>Leasing</b> lønner seg: nåverdien av det man sparer, er større enn nåverdien av leien etter skatt.' : '<b>Kjøp med lån</b> er billigst: leasing gir negativ nåverdi sammenlignet med kjøp.'}</p>` },
          { q: 'Hva er leasingens internrente etter skatt (den effektive kostnaden ved leasing)?', answer: c.irr, unit: '%', tol: { abs: 0.001 },
            hint: 'Finn renten der NNV av leasing minus kjøp er 0 (målsøking). Skattefordelen i år 0 avhenger av renten, så regn den med den samme renten.',
            sol: tbl(c.irr, c.y0(c.irr)) +
              `<p>Ved målsøking blir NNV = 0 ved <b>${pct(c.irr, 2)}</b>. Skattefordelen i år 0 er regnet med denne renten (${n(c.shield(c.irr))}). </p>` + fixedNote(c.irrFixed, c.irr, `lånerenten etter skatt (${pct(c.rd, 2)})`) +
              `<p>Leasingens internrente er ${pct(c.irr, 2)}, ${c.irr > c.rd ? 'høyere' : 'lavere'} enn lånerenten etter skatt på ${pct(c.rd, 2)}. ${c.irr > c.rd ? 'Leasing er altså en dyrere måte å finansiere eiendelen på.' : 'Leasing er altså en billigere måte å finansiere eiendelen på.'} Det stemmer med fortegnet på NNV.</p>` },
          { q: 'Hva er den høyeste årlige leien som gjør leasing like gunstig som kjøp?', answer: c.Lmax, unit: 'kr',
            hint: 'Sett NNV = 0 og løs for leien. Husk at leien gir skattefradrag.',
            sol: f(`${frac(`${n(c.y0D)}${S ? ` − ${n(S / Math.pow(1 + c.rd, N))}` : ''}`, `${n(c.A, 4)} · (1 − 0,22)`)} = ${n(c.Lmax)}`) +
              `<p>Tilbudet på ${n(L)} er ${L > c.Lmax ? 'høyere' : 'lavere'} enn dette, så ${L > c.Lmax ? 'kjøp' : 'leasing'} er best.</p>` },
          { kind: 'text', q: 'Hvorfor diskonteres leasingalternativet med lånerenten etter skatt, og hva annet enn nåverdien bør med i valget?',
            points: ['<b>Leasing er finansiering</b>: driften er den samme uansett, så valget er mellom to måter å skaffe eiendelen på. Leasing erstatter et lån, og kontantstrømmene er like sikre som et lån. Derfor er lånerenten etter skatt riktig sats, ikke prosjektets avkastningskrav.',
              '<b>Skatt</b>: leien er fradragsberettiget, men ved leasing taper man fradraget for saldoavskrivningene. Rentene er fradragsberettiget ved lån, derfor lånerenten etter skatt.',
              '<b>Andre forhold</b>: service og vedlikehold i avtalen, risiko for teknisk foreldelse og restverdi (bærer utleieren den?), oppsigelsesvilkår og fleksibilitet, og om bedriften har lånekapasitet.',
              'Prosjektet selv må fortsatt være lønnsomt. Leasing gjør ikke et ulønnsomt prosjekt lønnsomt, bare finansieringen billigere eller dyrere.'] },
        ],
      };
      return { p, c, task };
    },
  });

  // ==================================================================
  // 3) Internrente etter skatt og effektiv skattesats (kap. 8 oppg. 9, med oppg. 1d)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 8.9 og 8.1. Skattefordelen regnes med samme rente som diskonterer. */
  function irTaxCalc({ AM, S, wc, Q, price, mat, lonn, ovr, FK, T, rF, rE, a }) {
    const op = Q * (price - mat - lonn - ovr) - FK, AK = wc * Q * price;
    const fs = [-AM - AK].concat(U.range(1, T).map((t) => op + (t === T ? S + AK : 0)));
    const irrF = F.irr(fs), npvF = F.npv(rF, fs);
    const shield = (x) => F.pvSaldoTaxShield(AM, a, S_TAX, x), ned = (x) => (S ? F.pvSaldoTaxShield(S, a, S_TAX, x) / Math.pow(1 + x, T) : 0);
    const es = (x) => [-AM - AK + shield(x) - ned(x)].concat(U.range(1, T).map((t) => op * (1 - S_TAX) + (t === T ? S + AK : 0)));
    const npvE = F.npv(rE, es(rE)), irrE = F.solve((x) => F.npv(x, es(x)), -0.15, 3), irrEFixed = F.irr(es(rE));
    const eff = 1 - irrE / irrF;
    return { op, AK, fs, irrF, npvF, shield, ned, es, npvE, irrE, irrEFixed, eff, esE: es(rE) };
  }
  O._irTaxCalc = irTaxCalc;

  const irFirms = [['Fjordlaks Foredling AS', 'røykelaks', 'pakker'], ['Trebåt AS', 'robåter', 'båter'], ['Isbreen AS', 'iskrem', 'kartonger'], ['Vestlandsull AS', 'ullpledd', 'pledd'], ['Smia Nord AS', 'vedovner', 'ovner']];

  O.reg({
    id: 'k8-ir-etter-skatt', chapter: 8, level: 3, minutes: 30, examLike: 'Kapitteloppgave 8.9 og 8.1 – ikke gitt som egen oppgave 2016–2025',
    title: 'Internrente før og etter skatt, og effektiv skattesats',
    topic: 'Nåverdi etter skatt',
    blurb: 'Samme prosjekt før og etter skatt: NNV og internrente begge veier, internrenten etter skatt ved målsøking, og hvor mye av avkastningen skatten egentlig tar.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, prod, unit] = R.pick(irFirms);
      const T = R.pick([3, 4, 4, 5, 6]), a = 0.2, rF = R.pick([0.12, 0.15, 0.18]), rE = R.pick([0.08, 0.1, 0.12]);
      const Q = R.int(10, 60) * 100, mat = R.pick([40, 60, 80, 100]), lonn = R.pick([60, 90, 120, 150]), ovr = R.pick([0, 20, 30, 40]);
      const price = Math.round((mat + lonn + ovr) / R.pick([0.5, 0.55, 0.6, 0.65]) / 5) * 5;
      const AM = r100(Q * price * R.pick([0.5, 0.7, 1, 1.3]), 1000);
      const mode = R.pick(['saldo', 'andel', 'andel', 'ingen']);
      const S = mode === 'ingen' ? 0 : mode === 'saldo' ? Math.round(AM * Math.pow(1 - a, T)) : r100(AM * R.pick([0.2, 0.3]), 1000);
      const wc = mode === 'ingen' ? 0 : R.pick([0.1, 0.15, 0.2]);
      const AK = wc * Q * price, tgt = rF + R.pick([0.02, 0.04, 0.06]);
      const opT = (AM + AK - (S + AK) / Math.pow(1 + tgt, T)) / F.annuityFactor(tgt, T);
      const FK = r100(Q * (price - mat - lonn - ovr) - opT, 1000);
      if (FK < 10000) return null;
      const p = { AM, S, wc, Q, price, mat, lonn, ovr, FK, T, rF, rE, a };
      const c = irTaxCalc(p);
      if (!(c.op > 0 && Number.isFinite(c.irrE) && Number.isFinite(c.irrF) && c.eff > 0.05 && c.eff < 0.45 && Math.abs(c.npvE) > 0.005 * AM && Math.abs(c.npvF) > 0.003 * AM)) return null;
      const yrs = (v) => pad(Array(T).fill(v)), endOnly = (x0, xT) => [x0].concat(Array(T - 1).fill(null), [xT]);
      const fsTbl = cfTable([['Omsetning', yrs(Q * price)], ['Materialkostnader', yrs(-Q * mat)], ['Lønn og øvrige variable kostnader', yrs(-Q * (lonn + ovr))], ['Faste kostnader', yrs(-FK)], ['Anleggsmidler', endOnly(-AM, S || null)]]
        .concat(wc ? [['Arbeidskapital', endOnly(-c.AK, c.AK)]] : []).concat([['Kontantstrøm før skatt', c.fs, 'sum']]), T);
      const esTbl = (x) => cfTable([['Kontantstrøm drift', yrs(c.op)], ['Skatt 22 %', yrs(-S_TAX * c.op)], ['NV spart skatt avskrivninger', [c.shield(x)]]].concat(S ? [['NV økt skatt ved nedskriving', [-c.ned(x)]]] : [])
        .concat([['Anleggsmidler', endOnly(-AM, S || null)]]).concat(wc ? [['Arbeidskapital', endOnly(-c.AK, c.AK)]] : []).concat([['Beregningsgrunnlag', c.es(x), 'sum']]), T);
      const higher = c.eff > S_TAX;
      const task = {
        text: `<p>${firm} vurderer å starte produksjon av ${prod}. Man regner med å selge <b>${n(Q)}</b> ${unit} i året i <b>${T} år</b> til en pris på <b>${n(price)}</b>. Materialkostnadene er <b>${n(mat)}</b>, lønnskostnadene <b>${n(lonn)}</b>${ovr ? ` og øvrige variable kostnader <b>${n(ovr)}</b>` : ''} per stykk. Økte betalbare faste kostnader er <b>${n(FK)}</b> per år.</p>` +
          `<p>Produksjonsanlegget koster <b>${n(AM)}</b> og avskrives etter saldometoden med <b>20 %</b>. ${S ? `Det kan selges for <b>${n(S)}</b> ved slutten av år ${T}, og salget nedskrives på saldo.` : 'Det har ingen verdi ved slutten.'} ${wc ? `Arbeidskapitalen utgjør <b>${pctS(wc)}</b> av årlig omsetning, bindes i år 0 og frigjøres i år ${T}.` : 'Prosjektet binder ingen arbeidskapital.'} Skattesatsen er 22 %, og skatt betales samme år som inntekten opptjenes.</p>` +
          `<p>Avkastningskravet er <b>${pctS(rF)}</b> før skatt og <b>${pctS(rE)}</b> etter skatt.</p>`,
        parts: [
          { q: 'Hva er den årlige kontantstrømmen fra driften før skatt?', answer: c.op, unit: 'kr',
            sol: f(`${n(Q)} · (${n(price)} − ${n(mat)} − ${n(lonn)}${ovr ? ` − ${n(ovr)}` : ''}) − ${n(FK)} = ${n(c.op)}`) },
          { q: 'Hva er internrenten før skatt?', answer: c.irrF, unit: '%',
            sol: fsTbl + `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irrF, 2)}</b>.</p>` },
          { q: `Hva er nåverdien (NNV) før skatt med kravet på ${pctS(rF)}?`, answer: c.npvF, unit: 'kr', tol: { abs: AM * 0.001, rel: 0.003 },
            sol: f(`NNV (${pctS(rF)}) = ${n(c.npvF)}`) + `<p>Prosjektet er ${c.npvF > 0 ? '' : '<b>ikke</b> '}lønnsomt før skatt.</p>` },
          { q: `Hva er nåverdien (NNV) etter skatt med kravet på ${pctS(rE)}?`, answer: c.npvE, unit: 'kr', tol: { abs: AM * 0.001, rel: 0.003 },
            hint: 'Skatt på driftskontantstrømmen, + NV spart skatt på avskrivningene i år 0' + (S ? ', − NV av økt skatt fordi salget nedskrives på saldo' : '') + '. Investering' + (wc ? ', arbeidskapital' : '') + (S ? ' og salgssum' : '') + ' gir ingen direkte skatt.',
            sol: f(`NV spart skatt = ${frac(`${n(AM)} · 0,20 · 0,22`, `${n(rE, 2)} + 0,20`)} = ${n(c.shield(rE))}`) +
              (S ? f(`NV økt skatt nedskriving = ${frac(`${n(S)} · 0,20 · 0,22`, `${n(rE, 2)} + 0,20`)} · ${frac('1', `${n(1 + rE, 2)}<sup>${T}</sup>`)} = ${n(c.ned(rE))}`) : '') +
              esTbl(rE) + f(`NNV (${pctS(rE)}) = <b>${n(c.npvE)}</b>`) },
          { q: 'Hva er internrenten etter skatt?', answer: c.irrE, unit: '%', tol: { abs: 0.001 },
            hint: 'Finn renten der NNV etter skatt er 0 (målsøking). Nåverdien av skattefordelen i år 0 avhenger av renten, så den må regnes med den samme renten.',
            sol: esTbl(c.irrE) +
              `<p>Ved målsøking blir NNV = 0 ved <b>${pct(c.irrE, 2)}</b>. Her er NV spart skatt ${n(c.shield(c.irrE))}${S ? ` og nedskrivingen −${n(c.ned(c.irrE))}` : ''}, så år 0 blir ${n(c.es(c.irrE)[0])}.</p>` +
              fixedNote(c.irrEFixed, c.irrE, `kravet (${pctS(rE)})`) },
          { q: 'Hva er den effektive skattesatsen på prosjektet?', answer: c.eff, unit: '%', tol: { abs: Math.max(0.003, 0.001 / c.irrF) },
            hint: 'Effektiv skattesats er den delen av avkastningen før skatt som går bort i skatt, målt med internrentene.',
            sol: f(`Effektiv skattesats = 1 − ${frac('IR etter skatt', 'IR før skatt')} = 1 − ${frac(pct(c.irrE, 2), pct(c.irrF, 2))} = <b>${pct(c.eff, 2)}</b>`) +
              `<p>Det er ${higher ? 'høyere' : 'lavere'} enn den nominelle skattesatsen på 22 %. Svar som bygger på en internrente etter skatt innenfor 0,1 prosentpoeng av målsøkingssvaret, godtas (her ±${n(Math.max(0.003, 0.001 / c.irrF) * 100, 2)} prosentpoeng).</p>` },
          { kind: 'text', q: 'Forklar hvorfor den effektive skattesatsen skiller seg fra 22 %.',
            points: [`Den effektive skattesatsen er ${pct(c.eff, 2)}, ${higher ? 'høyere' : 'lavere'} enn 22 %.`,
              'Effektiv og nominell skattesats er like når de skattemessige avskrivningene følger det økonomiske verdifallet på investeringen.',
              higher ? `Her kommer fradragene <b>senere</b> enn verdifallet: saldoavskrivning med 20 % er langsom over ${T} år${S ? '' : ', og saldoen som står igjen når prosjektet er slutt, gir fradrag først i årene etterpå'}. Skatten betales tidligere enn fradragene, og det øker den effektive satsen.` :
                `Her kommer fradragene <b>tidligere</b> enn verdifallet${S ? `: anlegget beholder mye av verdien (salg ${n(S)}), mens saldoavskrivningen gir fradrag fra første år` : ''}. Utsatt skatt er verdt noe, og det senker den effektive satsen.`,
              `Effektiv skattesats bygger på internrentene. Derfor er den uavhengig av avkastningskravene på ${pctS(rF)} og ${pctS(rE)}.`] },
        ],
      };
      return { p, c, task };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
