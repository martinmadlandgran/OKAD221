/* Kapittel 12: kapitalbinding og endret kredittpolitikk (kap. 12 oppg. 1–2), kontantrabatt og nøkkeltall for likviditet (oppg. 3) og Altmans Z (oppg. 5).
   Kapittel 7: factoring (kap. 7 oppg. 7b og 8). Antall dager i året står alltid i oppgaveteksten. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, cfTable } = U;
  const rnd = (x, step) => Math.round(x / step) * step;
  const cl = (x) => U.round(x, 6);
  const pctS = (x) => n(x * 100, Number.isInteger(cl(x * 100)) ? 0 : 1) + ' %';
  const dS = (x) => n(x, Number.isInteger(cl(x)) ? 0 : 1);
  const T1000 = 'tusen kr';
  const tolK = { abs: 2, rel: 0.002 };

  // ==================================================================
  // 1) Kapitalbinding i kundefordringer og strammere kredittpolitikk (kap. 12 oppg. 1–2)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 12.1 og 12.2. */
  function creditCalc({ O1, d0, dg, AM, RV, OM, FK, r, T, d1, S, svk, K, V, L, tap0, p, X, t1, E, nE, A, i }) {
    // Del 1: prosjekt med kundefordringer
    const KF = O1 * d0 / 360, y0 = -(AM + KF + OM), cf = O1 * dg - FK, cfT = cf + RV + KF + OM;
    const flows = [y0].concat(U.range(1, T).map((t) => (t === T ? cfT : cf)));
    const npv = F.npv(r, flows), irr = F.irr(flows);
    const KF1 = O1 * d1 / 360, dKF = KF1 - KF, dNpv = -dKF + dKF / Math.pow(1 + r, T);
    // Del 2: strammere kredittpolitikk
    const S1 = S * (1 - p), K1 = S1 * X / 360, dK = K - K1, dV = V * p, dL = L * p;
    const cap = dK + dV - dL - E, rente = i * cap, tap1 = t1 * S1, dTap = tap0 - tap1, gain = rente + dTap;
    const lostDB = p * (S - svk), dep = nE ? E / nE : 0, cost = lostDB + A + dep, net = gain - cost;
    return { KF, y0, cf, cfT, flows, npv, irr, KF1, dKF, dNpv, S1, K1, dK, dV, dL, cap, rente, tap1, dTap, gain, lostDB, dep, cost, net, d0K: K / S * 360 };
  }
  O._creditCalc = creditCalc;

  const creditFirms = [['Nordfjord Møbler AS', 'en ny serie hagemøbler'], ['Bergen Sport AS', 'en ny linje turutstyr'], ['Lofoten Fisk AS', 'ferdigretter av fisk'],
    ['Valdres Tre AS', 'trapper på bestilling'], ['Tromsø Elektro AS', 'varmepumper til hytter'], ['Sørlandet Glass AS', 'isolerglass']];

  O.reg({
    id: 'k12-kredittpolitikk', chapter: 12, level: 2, minutes: 30, examLike: 'Kapitteloppgave 12.1 og 12.2 – ikke gitt som egen oppgave 2016–2025',
    title: 'Kundefordringer i investeringen og strammere kredittpolitikk',
    topic: 'Arbeidskapital og kredittpolitikk',
    blurb: 'Kapital bundet i kundefordringer i en prosjektkalkyle, og om kortere kredittid lønner seg: frigjort kapital og reduserte tap mot tapt dekningsbidrag.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, prod] = R.pick(creditFirms);
      // Del 1
      const O1 = R.int(30, 150) * 36000, d0 = R.pick([30, 30, 45, 60]), dg = R.pick([0.3, 0.35, 0.4, 0.45, 0.5]), T = R.pick([4, 5, 5, 6]);
      const r = R.pick([0.12, 0.15, 0.2]), AM = rnd(O1 * R.pick([0.3, 0.4, 0.5, 0.6]), 10000), RV = rnd(AM * R.pick([0, 0.1, 0.15, 0.2]), 10000);
      const OM = rnd(O1 * R.pick([0.05, 0.08, 0.1]), 10000), KF = O1 * d0 / 360, I0 = AM + KF + OM;
      const tgt = r + R.pick([-0.04, -0.02, 0.03, 0.05, 0.08]);
      const cfT = (I0 - (RV + KF + OM) / Math.pow(1 + tgt, T)) / F.annuityFactor(tgt, T);
      const FK = rnd(O1 * dg - cfT, 1000), d1 = d0 + R.pick([15, 30]);
      if (FK < 20000) return null;
      // Del 2
      const S = R.int(3, 15) * 3600000, dgS = R.pick([0.15, 0.2, 0.21, 0.25, 0.3]), svk = S * (1 - dgS);
      const D0 = R.pick([45, 50, 55, 60, 72]), K = S * D0 / 360, X = D0 - R.pick([15, 20, 25]);
      const p = R.pick([0.05, 0.08, 0.1, 0.12]), V = rnd(S * R.pick([0.08, 0.1, 0.12, 0.15]), 10000), L = rnd(S * R.pick([0.1, 0.15, 0.2]), 10000);
      const tap0 = rnd(S * R.pick([0.025, 0.03, 0.035, 0.04]), 1000), t1 = R.pick([0.01, 0.015, 0.02]);
      const nE = R.pick([3, 4, 5]), E = R.bool(0.25) ? 0 : nE * R.pick([10000, 20000, 30000]), i = R.pick([0.08, 0.1, 0.12, 0.15]);
      const base = creditCalc({ O1, d0, dg, AM, RV, OM, FK, r, T, d1, S, svk, K, V, L, tap0, p, X, t1, E, nE, A: 0, i });
      const want = (R.bool() ? 1 : -1) * S * R.pick([0.0008, 0.0015, 0.003]);
      const A = rnd(base.net - want, 10000);
      if (A < 50000) return null;
      const pr = { O1, d0, dg, AM, RV, OM, FK, r, T, d1, S, svk, K, V, L, tap0, p, X, t1, E, nE, A, i };
      const c = creditCalc(pr);
      if (!(Number.isFinite(c.irr) && c.cf > 0 && Math.abs(c.npv) > 0.01 * I0 && Math.abs(c.net) > 0.0004 * S && c.cap > 0)) return null;
      const adm = rnd(S * dgS * R.pick([0.4, 0.5]), 10000), avs = rnd(S * 0.005, 10000), dr = S - svk - adm - avs - tap0;
      if (dr <= 0) return null;
      const lonn = c.net > 0;
      const T0row = (v0, vT) => [v0].concat(Array(T - 1).fill(null), [vT]);
      const task = {
        text: `<p><b>Del 1.</b> ${firm} vurderer å starte produksjon av ${prod}. Driftsinntektene er beregnet til <b>${n(O1)}</b> per år i <b>${T} år</b>, og kundene får <b>${d0} dagers</b> kreditt (regn med 360 dager i året). Dekningsgraden er <b>${pctS(dg)}</b>, og de betalbare faste kostnadene er <b>${n(FK)}</b> per år.</p>` +
          `<p>Anlegget koster <b>${n(AM)}</b> og har ${RV ? `en restverdi på <b>${n(RV)}</b>` : '<b>ingen</b> restverdi'} etter ${T} år. I tillegg til kundefordringene binder prosjektet <b>${n(OM)}</b> i andre omløpsmidler. Omløpsmidlene bindes i år 0 og frigjøres i år ${T}. Avkastningskravet er <b>${pctS(r)}</b>. Se bort fra skatt.</p>` +
          `<p><b>Del 2.</b> Hele bedriften har i fjor hatt omsetning <b>${n(S)}</b> og solgte varers kostnad <b>${n(svk)}</b> (variabel). Andre poster i regnskapet: administrasjonskostnader ${n(adm)}, avskrivninger ${n(avs)}, tap på krav <b>${n(tap0)}</b>, driftsresultat ${n(dr)}. I balansen står varelager <b>${n(V)}</b>, kundefordringer <b>${n(K)}</b> og kreditorer (leverandørgjeld) <b>${n(L)}</b>. Pantegjelden har <b>${pctS(i)}</b> rente.</p>` +
          `<p>Ledelsen vurderer å korte ned kundenes kredittid til <b>${X} dager</b> (360 dager i året). Det ventes å redusere omsetningen med <b>${pctS(p)}</b>, og varelageret og kreditorene faller med samme prosent. Tap på krav blir <b>${pctS(t1)}</b> av den nye omsetningen. Oppfølgingen krever økte administrasjonskostnader på <b>${n(A)}</b> per år${E ? ` og nytt utstyr for <b>${n(E)}</b>, som avskrives lineært over <b>${nE} år</b>` : ''}. Endringen i kapitalbehovet finansieres med pantegjelden.</p>`,
        parts: [
          { q: 'Del 1. Hvor mye kapital bindes i kundefordringer i prosjektet?', answer: c.KF, unit: 'kr',
            hint: 'Kundefordringer = driftsinntekter · kredittdager / 360.',
            sol: f(`${n(O1)} · ${frac(d0, 360)} = ${n(c.KF)}`) + '<p>Kundefordringene er kapital som er bundet så lenge prosjektet varer, akkurat som anlegget og de andre omløpsmidlene.</p>' },
          { q: 'Hva er kontantstrømmen i år 0?', answer: c.y0, unit: 'kr',
            sol: f(`−(${n(AM)} + ${n(c.KF)} + ${n(OM)}) = ${n(c.y0)}`) },
          { q: `Hva er den årlige kontantstrømmen i år 1–${T - 1}?`, answer: c.cf, unit: 'kr',
            hint: 'Dekningsbidrag = driftsinntekter · dekningsgrad. Trekk fra de faste kostnadene.',
            sol: f(`${n(O1)} · ${n(dg, 2)} − ${n(FK)} = ${n(c.cf)}`) },
          { q: `Hva er kontantstrømmen i år ${T}?`, answer: c.cfT, unit: 'kr',
            hint: 'Kundefordringene og de andre omløpsmidlene frigjøres siste år.' + (RV ? ' Restverdien kommer også da.' : ''),
            sol: f(`${n(c.cf)}${RV ? ` + ${n(RV)}` : ''} + ${n(c.KF)} + ${n(OM)} = ${n(c.cfT)}`) +
              cfTable([['Anleggsmidler', T0row(-AM, RV || null)], ['Kundefordringer', T0row(-c.KF, c.KF)], ['Andre omløpsmidler', T0row(-OM, OM)],
                ['Driftsinntekter', [null].concat(Array(T).fill(O1))], [`Variable kostnader (${pctS(1 - dg)})`, [null].concat(Array(T).fill(-O1 * (1 - dg)))], ['Faste kostnader', [null].concat(Array(T).fill(-FK))],
                ['Kontantstrøm', c.flows, 'sum']], T) },
          { q: `Hva er nåverdien (NNV) med avkastningskravet på ${pctS(r)}?`, answer: c.npv, unit: 'kr',
            sol: f(`NNV = ${n(c.y0)} + ${n(c.cf)} · A(${pctS(r)}, ${T - 1}) + ${frac(n(c.cfT), `${n(1 + r, 2)}<sup>${T}</sup>`)} = <b>${n(c.npv)}</b>`) + `<p>Prosjektet er ${c.npv > 0 ? '' : '<b>ikke</b> '}lønnsomt.</p>` },
          { q: 'Hva er internrenten?', answer: c.irr, unit: '%',
            sol: `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irr, 2)}</b>, ${c.irr > r ? 'over' : 'under'} kravet på ${pctS(r)}.</p>` },
          { q: `Kundene ber om <b>${d1} dagers</b> kreditt i stedet for ${d0}, uten at salget endres. Hvor mye endres NNV?`, answer: c.dNpv, unit: 'kr',
            hint: 'Mer kapital bindes i år 0 og frigjøres i siste år. Endringen i NNV er rentekostnaden av den ekstra kapitalbindingen.',
            sol: f(`Nye kundefordringer = ${n(O1)} · ${frac(d1, 360)} = ${n(c.KF1)}, økning ${n(c.dKF)}`) +
              f(`ΔNNV = −${n(c.dKF)} + ${frac(n(c.dKF), `${n(1 + r, 2)}<sup>${T}</sup>`)} = <b>${n(c.dNpv)}</b>`) +
              '<p>Lengre kredittid er en rabatt i form av rentefri kreditt. Den koster bedriften rentene på kapitalen som bindes.</p>' },
          { q: 'Del 2. Hva blir kundefordringene med den nye kredittiden?', answer: c.K1, unit: 'kr',
            hint: 'Bruk den nye omsetningen, ikke fjorårets.',
            sol: f(`Ny omsetning = ${n(S)} · (1 − ${n(p, 2)}) = ${n(c.S1)}`) + f(`Kundefordringer = ${n(c.S1)} · ${frac(X, 360)} = ${n(c.K1)}`) +
              `<p>I dag er kredittiden ${frac(n(K), n(S))} · 360 = ${dS(c.d0K)} dager.</p>` },
          { q: 'Hvor mye reduseres kapitalbehovet netto?', answer: c.cap, unit: 'kr',
            hint: 'Mindre kundefordringer og mindre varelager frigjør kapital. Mindre kreditorer betyr mindre gratis finansiering fra leverandørene, og øker kapitalbehovet.' + (E ? ' Det nye utstyret øker også kapitalbehovet.' : ''),
            sol: U.table(['Kapitalbehov', 'Økning', 'Reduksjon'], [].concat(E ? [['Anleggsmidler – nytt utstyr', n(E), '']] : [],
              [['Kundefordringer', '', n(c.dK)], ['Varelager', '', n(c.dV)], ['Kreditorer', n(c.dL), ''], { cells: ['Sum', n(c.dL + E), n(c.dK + c.dV)], cls: 'sum' }, { cells: ['Redusert kapitalbehov', '', n(c.cap)], cls: 'sum' }])) },
          { q: 'Hva er sum besparelser per år (sparte renter og reduserte tap på krav)?', answer: c.gain, unit: 'kr',
            sol: f(`Sparte renter = ${pctS(i)} · ${n(c.cap)} = ${n(c.rente)}`) + f(`Nye tap = ${pctS(t1)} · ${n(c.S1)} = ${n(c.tap1)}, reduksjon ${n(tap0)} − ${n(c.tap1)} = ${n(c.dTap)}`) +
              f(`Sum besparelser = ${n(c.rente)} + ${n(c.dTap)} = <b>${n(c.gain)}</b>`) },
          { q: 'Hva er sum økte kostnader og tap per år?', answer: c.cost, unit: 'kr',
            hint: 'Lavere salg koster dekningsbidraget, ikke omsetningen.',
            sol: f(`Tapt dekningsbidrag = ${n(p, 2)} · (${n(S)} − ${n(svk)}) = ${n(c.lostDB)}`) +
              f(`Sum = ${n(c.lostDB)} + ${n(A)}${E ? ` + ${frac(n(E), nE)}` : ''} = <b>${n(c.cost)}</b>`) },
          { q: 'Hva er netto besparelse per år av den nye kredittpolitikken?', answer: c.net, unit: 'kr',
            sol: U.table(['Resultatvirkning', 'Beløp'], [['Redusert rentekostnad', n(c.rente)], ['Redusert tap på krav', n(c.dTap)], { cells: ['Sum besparelser', n(c.gain)], cls: 'sum' },
              ['Tapt dekningsbidrag', n(-c.lostDB)], ['Administrasjonskostnader', n(-A)]].concat(E ? [['Avskrivning nytt utstyr', n(-c.dep)]] : [], [{ cells: ['Sum kostnader', n(-c.cost)], cls: 'sum' }, { cells: ['Netto besparelse', n(c.net)], cls: 'sum' }])) +
              `<p>${lonn ? 'Strammere kredittpolitikk <b>lønner seg</b>.' : 'Strammere kredittpolitikk <b>lønner seg ikke</b>: tapt dekningsbidrag og kostnadene er større enn besparelsene.'}</p>` },
          { kind: 'text', q: 'Bør bedriften stramme inn kredittiden? Hva bør med i vurderingen utover tallene?',
            points: [`Netto besparelse er ${n(c.net)} per år, så tiltaket ${lonn ? 'lønner seg' : 'lønner seg ikke'} med disse forutsetningene. Beløpet er lite sammenlignet med omsetningen på ${n(S)}, så konklusjonen er følsom for anslagene.`,
              '<b>Frigjort kapital er ikke en gevinst</b> i seg selv. Gevinsten er rentene som spares på kapitalen, og den gjentas hvert år.',
              `<b>Mest usikkert</b>: hvor mye salget faller (${pctS(p)} gir ${n(c.lostDB)} i tapt dekningsbidrag), og om kundene som forsvinner, er de som betaler dårligst. Da faller tapene mer enn anslått.`,
              'Kundeforhold og konkurrenter: kortere kredittid enn bransjen kan koste kunder over tid. Kreditorene faller med salget, så leverandørkreditten (gratis finansiering) blir også mindre.'] },
        ],
      };
      return { p: pr, c, task };
    },
  });

  // ==================================================================
  // 2) Kontantrabatt (kap. 12 oppg. 3), tall i 1 000 kr, 365 dager
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 12.3. */
  function discCalc({ S, K, q, d1, a, D2, i, A, t0, t1 }) {
    const kRab = S * a * d1 / 365, kRest = S * (1 - a) * D2 / 365, K1 = kRab + kRest, dK = K - K1;
    const rab = q * a * S, cost = rab + A, rente = i * dK, dTap = (t0 - t1) * S, gain = rente + dTap, net = gain - cost;
    const qMax = (gain - A) / (a * S), eff = Math.pow(1 + q / (1 - q), 365 / (D2 - d1)) - 1;
    return { kRab, kRest, K1, dK, rab, cost, rente, dTap, gain, net, qMax, eff, D0: K / S * 365 };
  }
  O._discCalc = discCalc;

  const discFirms = [['Grossisten Vest AS', 'byggevarer'], ['Nordisk Kontor AS', 'kontorrekvisita'], ['Fjellmat Engros AS', 'dagligvarer til kiosker'], ['Agder Verktøy AS', 'verktøy til håndverkere'], ['Midtnorsk Papir AS', 'emballasje']];

  O.reg({
    id: 'k12-kontantrabatt', chapter: 12, level: 2, minutes: 20, examLike: 'Kapitteloppgave 12.3 – ikke gitt som egen oppgave 2016–2025',
    title: 'Kontantrabatt: rabattkostnad mot frigjort kapital og færre tap',
    topic: 'Arbeidskapital og kredittpolitikk',
    blurb: 'Nye kundefordringer når en del av kundene betaler raskt, sparte renter og reduserte tap mot rabatten, høyeste rabatt som lønner seg og kundens effektive rente.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, vare] = R.pick(discFirms);
      const S = R.int(200, 1500) * 100, D0 = R.pick([60, 75, 90, 110]), K = Math.round(S * D0 / 365);
      const q = R.pick([0.01, 0.015, 0.02, 0.025, 0.03]), d1 = R.pick([10, 14, 15]), a = R.pick([0.3, 0.4, 0.5, 0.6, 0.7]);
      const D2 = R.bool(0.3) ? D0 + 15 : D0, i = R.pick([0.08, 0.1, 0.12, 0.14]);
      const t0 = R.pick([0.01, 0.012, 0.015, 0.018, 0.02, 0.025]), t1 = U.round(t0 * R.pick([0.5, 0.6, 0.75]), 3);
      const base = discCalc({ S, K, q, d1, a, D2, i, A: 0, t0, t1 });
      const A = rnd(base.net - (R.bool() ? 1 : -1) * S * R.pick([0.002, 0.004, 0.007]), 10);
      if (A < 50) return null;
      const pr = { S, K, q, d1, a, D2, i, A, t0, t1 };
      const c = discCalc(pr);
      if (!(c.dK > 0 && Math.abs(c.net) > 0.0015 * S && c.qMax > 0.002)) return null;
      const lonn = c.net > 0;
      const task = {
        text: `<p>${firm} selger ${vare} på kreditt. Omsetningen er <b>${n(S)}</b> per år, og kundefordringene er <b>${n(K)}</b>. Kundene betaler i dag i gjennomsnitt etter <b>${D0} dager</b>, og tap på krav er <b>${pctS(t0)}</b> av omsetningen. Alle tall er i 1 000 kr, og det regnes med 365 dager i året.</p>` +
          `<p>Bedriften vurderer å gi <b>${pctS(q)}</b> kontantrabatt ved betaling innen <b>${d1} dager</b>. Man regner med at <b>${pctS(a)}</b> av kundene (målt i omsetning) bruker rabatten, mens resten betaler etter <b>${D2} dager</b>. Tap på krav ventes å falle til <b>${pctS(t1)}</b> av omsetningen, og administrasjonskostnadene øker med <b>${n(A)}</b> per år. Omsetningen er ellers uendret. Kundefordringene finansieres med kassekreditt med <b>${pctS(i)}</b> rente.</p>`,
        parts: [
          { q: 'Hvor store blir kundefordringene fra kundene som bruker rabatten?', answer: c.kRab, unit: T1000, tol: tolK,
            hint: 'Omsetning · andel · dager / 365.',
            sol: f(`${n(S)} · ${n(a, 2)} · ${frac(d1, 365)} = ${n(c.kRab)}`) },
          { q: 'Hva blir de samlede kundefordringene etter endringen?', answer: c.K1, unit: T1000, tol: tolK,
            sol: f(`${n(c.kRab)} + ${n(S)} · ${n(1 - a, 2)} · ${frac(D2, 365)} = ${n(c.kRab)} + ${n(c.kRest)} = <b>${n(c.K1)}</b>`) },
          { q: 'Hvor mye kapital frigjøres i kundefordringer?', answer: c.dK, unit: T1000, tol: tolK,
            sol: f(`${n(K)} − ${n(c.K1)} = ${n(c.dK)}`) },
          { q: 'Hva koster kontantrabatten per år?', answer: c.rab, unit: T1000, tol: tolK,
            hint: 'Bare omsetningen til kundene som bruker rabatten, gir rabatt.',
            sol: f(`${pctS(q)} · ${pctS(a)} · ${n(S)} = ${n(c.rab)}`) },
          { q: 'Hvor mye spares i rentekostnader per år?', answer: c.rente, unit: T1000, tol: tolK,
            sol: f(`${pctS(i)} · ${n(c.dK)} = ${n(c.rente)}`) },
          { q: 'Hvor mye reduseres tap på krav per år?', answer: c.dTap, unit: T1000, tol: tolK,
            sol: f(`(${pctS(t0)} − ${pctS(t1)}) · ${n(S)} = ${n(c.dTap)}`) },
          { q: 'Hva er netto resultatøkning per år av å innføre kontantrabatten?', answer: c.net, unit: T1000, tol: tolK,
            sol: U.table(['Beregning', 'Beløp'], [['Kontantrabatt', n(c.rab)], ['Økte administrasjonskostnader', n(A)], { cells: ['Sum kostnadsøkning', n(c.cost)], cls: 'sum' },
              ['Sparte rentekostnader', n(c.rente)], ['Reduserte tap på krav', n(c.dTap)], { cells: ['Sum gevinster', n(c.gain)], cls: 'sum' }, { cells: ['Netto resultatøkning', n(c.net)], cls: 'sum' }]) +
              `<p>${lonn ? 'Kontantrabatten <b>lønner seg</b>.' : 'Kontantrabatten <b>lønner seg ikke</b>: rabatten og administrasjonen koster mer enn det som spares.'}</p>` },
          { q: 'Hvor høy kontantrabatt (i prosent) kan bedriften gi før tiltaket ikke lønner seg, når like mange kunder bruker den?', answer: c.qMax, unit: '%', tol: { abs: 0.0002 },
            hint: 'Sett netto resultatøkning lik 0 og løs for rabattsatsen. Sparte renter, reduserte tap og administrasjonskostnadene er de samme.',
            sol: f(`${frac(`${n(c.rente)} + ${n(c.dTap)} − ${n(A)}`, `${n(a, 2)} · ${n(S)}`)} = <b>${pct(c.qMax, 2)}</b>`) +
              `<p>Tilbudet på ${pctS(q)} er ${q < c.qMax ? 'lavere' : 'høyere'} enn dette. Svar innenfor 0,02 prosentpoeng godtas.</p>` },
          { q: 'Hva er den effektive årsrenten for en kunde som ikke bruker rabatten, men betaler etter ' + D2 + ' dager?', answer: c.eff, unit: '%', tol: { abs: 0.001 },
            hint: `Kunden låner beløpet fra dag ${d1} til dag ${D2} og betaler rabatten i rente. Rente for perioden = rabatt / (1 − rabatt).`,
            sol: f(`(1 + ${frac(n(q, 3), n(1 - q, 3))})<sup>365/${D2 - d1}</sup> − 1 = <b>${pct(c.eff, 2)}</b>`) +
              `<p>Det er ${c.eff > i ? 'mer' : 'mindre'} enn bedriftens kassekredittrente på ${pctS(i)}. ${c.eff > i ? 'En kunde som kan låne billigere enn dette, bør ta rabatten. Derfor er det rimelig at mange gjør det.' : 'For kunden er det billigere å vente med å betale enn å låne. Rabatten er lite fristende.'} Samme regnestykke brukes for leverandørkreditt i kapittel 7.</p>` },
          { kind: 'text', q: 'Hva er de viktigste usikkerhetene i analysen, og hvorfor er det ikke nok å se på frigjort kapital?',
            points: ['Frigjort kapital er ikke en gevinst i seg selv. Gevinsten er rentene som spares på kapitalen hvert år.',
              `<b>Andelen som bruker rabatten</b> (${pctS(a)}) er usikker. Flere brukere gir både høyere rabattkostnad og mer frigjort kapital. Rabatten koster mest når kunder som allerede betaler raskt, tar den.`,
              `<b>Tapene</b>: det er de dårligste betalerne som gir tap, og de bruker sjelden rabatten. Anslaget på ${pctS(t1)} må begrunnes.`,
              'Kunder som tar rabatten, men betaler for sent, må følges opp, ellers blir rabatten en ren priskutt.'] },
        ],
      };
      return { p: pr, c, task };
    },
  });

  // ==================================================================
  // 3) Altmans Z (kap. 12 oppg. 5), 1968-koeffisientene
  // ==================================================================
  const ZW = [1.2, 1.4, 3.3, 0.6, 0.999], ZLO = 1.81, ZHI = 2.99;
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 12.5. */
  function zCalc({ EBIT, TA, Sales, MVE, TL, WC, RE }) {
    const X = [WC / TA, RE / TA, EBIT / TA, MVE / TL, Sales / TA], parts = X.map((x, k) => x * ZW[k]), Z = U.sum(parts);
    const zone = Z < ZLO ? 'høy' : Z > ZHI ? 'lav' : 'grå';
    const tgt = Z < ZHI ? (Z < ZLO ? ZLO : ZHI) : ZHI, dEBIT = (tgt - Z) / 3.3 * TA;
    return { X, parts, Z, zone, tgt, dEBIT };
  }
  O._zCalc = zCalc;

  const zFirms = ['Kystverft AS', 'Innlandet Bygg AS', 'Polar Reiseliv AS', 'Fjordkraft Montasje AS', 'Elvebakken Mat AS', 'Haugaland Plast AS', 'Nordvest Transport AS'];

  O.reg({
    id: 'k12-altman-z', chapter: 12, level: 1, minutes: 15, examLike: 'Kapitteloppgave 12.5 – ikke gitt som egen oppgave 2016–2025',
    title: 'Altmans Z-score: fem forholdstall og konkursrisiko',
    topic: 'Arbeidskapital og kredittpolitikk',
    blurb: 'Regn de fem forholdstallene fra regnskapet, vei dem sammen til Z og plasser bedriften i sonene for konkursrisiko.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const firm = R.pick(zFirms);
      const TA = R.int(100, 2000) * 1000 + R.int(0, 999), TL = Math.round(TA * R.pick([0.45, 0.55, 0.65, 0.75, 0.85]) + R.int(-500, 500));
      const BE = TA - TL, RE = Math.round(BE * R.pick([0.3, 0.5, 0.7, 0.9]) + R.int(-300, 300));
      const MVE = Math.round(BE * R.pick([0.5, 0.8, 1.2, 1.8, 2.5]) + R.int(-300, 300));
      const Sales = Math.round(TA * R.pick([0.6, 0.9, 1.3, 1.7, 2.2]) + R.int(-900, 900)), EBIT = Math.round(TA * R.pick([-0.03, 0.02, 0.05, 0.08, 0.12, 0.16]) + R.int(-300, 300));
      const OMM = Math.round(TA * R.pick([0.25, 0.35, 0.45, 0.55]) + R.int(-500, 500)), KG = Math.round(TL * R.pick([0.4, 0.55, 0.7, 0.85]) + R.int(-500, 500));
      const WC = OMM - KG;
      if (!(RE > 0 && MVE > 0 && KG > 0 && KG < TL && OMM < TA)) return null;
      const pr = { EBIT, TA, Sales, MVE, TL, WC, RE };
      const c = zCalc(pr);
      if (Math.abs(c.Z - ZLO) < 0.03 || Math.abs(c.Z - ZHI) < 0.03 || c.Z < 0.3) return null;
      const AM = TA - OMM, IE = BE - RE, LG = TL - KG;
      const zoneTxt = { høy: `under ${n(ZLO, 2)}: <b>høy konkursrisiko</b>`, grå: `mellom ${n(ZLO, 2)} og ${n(ZHI, 2)}: <b>gråsone</b>`, lav: `over ${n(ZHI, 2)}: <b>lav konkursrisiko</b>` }[c.zone];
      const names = ['Arbeidskapital / totale eiendeler', 'Opptjent egenkapital / totale eiendeler', 'Driftsresultat / totale eiendeler', 'Markedsverdi egenkapital / total gjeld', 'Omsetning / totale eiendeler'];
      const top = c.parts.map((v, k) => [v, k]).sort((x, y) => y[0] - x[0])[0][1];
      const below = c.Z < ZHI;
      const task = {
        text: `<p>Banken til ${firm} vil vurdere konkursrisikoen med Altmans Z-score:</p>` + '<div class="formula wrap">' + ['Z = 1,2 · X<sub>1</sub>', '+ 1,4 · X<sub>2</sub>', '+ 3,3 · X<sub>3</sub>', '+ 0,6 · X<sub>4</sub>', '+ 0,999 · X<sub>5</sub>'].map((x) => `<span>${x}</span>`).join(' ') + '</div>' +
          `<p>der X<sub>1</sub> = arbeidskapital / totale eiendeler, X<sub>2</sub> = opptjent egenkapital / totale eiendeler, X<sub>3</sub> = driftsresultat / totale eiendeler, X<sub>4</sub> = markedsverdi egenkapital / total gjeld og X<sub>5</sub> = omsetning / totale eiendeler. Altman brukte grensene ${n(ZLO, 2)} og ${n(ZHI, 2)}: under ${n(ZLO, 2)} er risikoen høy, over ${n(ZHI, 2)} lav, og imellom er en gråsone.</p>` +
          `<p>Regnskapet (tall i 1 000 kr):</p>` +
          U.table(['Post', 'Beløp'], [['Omsetning', `<b>${n(Sales)}</b>`], ['Driftsresultat', `<b>${n(EBIT)}</b>`], ['Anleggsmidler', `<b>${n(AM)}</b>`], ['Omløpsmidler', `<b>${n(OMM)}</b>`], { cells: ['Sum eiendeler', `<b>${n(TA)}</b>`], cls: 'sum' },
            ['Innskutt egenkapital', `<b>${n(IE)}</b>`], ['Opptjent egenkapital', `<b>${n(RE)}</b>`], ['Langsiktig gjeld', `<b>${n(LG)}</b>`], ['Kortsiktig gjeld', `<b>${n(KG)}</b>`], { cells: ['Sum egenkapital og gjeld', `<b>${n(TA)}</b>`], cls: 'sum' }]) +
          `<p>Markedsverdien av egenkapitalen (aksjene) er <b>${n(MVE)}</b>.</p>`,
        parts: [
          { q: 'Hva er X<sub>1</sub> (arbeidskapital / totale eiendeler)?', answer: c.X[0], unit: '', dec: 4,
            hint: 'Arbeidskapital = omløpsmidler − kortsiktig gjeld. Den kan være negativ.',
            sol: f(`Arbeidskapital = ${n(OMM)} − ${n(KG)} = ${n(WC)}`) + f(`X<sub>1</sub> = ${frac(n(WC), n(TA))} = ${n(c.X[0], 4)}`) },
          { q: 'Hva er X<sub>2</sub> (opptjent egenkapital / totale eiendeler)?', answer: c.X[1], unit: '', dec: 4,
            sol: f(`X<sub>2</sub> = ${frac(n(RE), n(TA))} = ${n(c.X[1], 4)}`) + '<p>Bare opptjent (tilbakeholdt) egenkapital, ikke innskutt.</p>' },
          { q: 'Hva er X<sub>3</sub> (driftsresultat / totale eiendeler)?', answer: c.X[2], unit: '', dec: 4,
            sol: f(`X<sub>3</sub> = ${frac(n(EBIT), n(TA))} = ${n(c.X[2], 4)}`) },
          { q: 'Hva er X<sub>4</sub> (markedsverdi egenkapital / total gjeld)?', answer: c.X[3], unit: '', dec: 4,
            hint: 'Total gjeld er kortsiktig og langsiktig gjeld til sammen. Bruk markedsverdien, ikke den bokførte egenkapitalen.',
            sol: f(`Total gjeld = ${n(LG)} + ${n(KG)} = ${n(TL)}`) + f(`X<sub>4</sub> = ${frac(n(MVE), n(TL))} = ${n(c.X[3], 4)}`) },
          { q: 'Hva er X<sub>5</sub> (omsetning / totale eiendeler)?', answer: c.X[4], unit: '', dec: 4,
            sol: f(`X<sub>5</sub> = ${frac(n(Sales), n(TA))} = ${n(c.X[4], 4)}`) },
          { q: 'Hva er Z-verdien?', answer: c.Z, unit: '', dec: 4, tol: { abs: 0.001 },
            sol: U.table(['Forholdstall', 'Verdi', 'Vekt', 'Bidrag'], names.map((nm, k) => [nm, n(c.X[k], 4), n(ZW[k], ZW[k] === 0.999 ? 3 : 1), n(c.parts[k], 4)]).concat([{ cells: ['Z-verdi', '', '', n(c.Z, 4)], cls: 'sum' }])) +
              `<p>Z = ${n(c.Z, 4)}, ${zoneTxt}. Svar innenfor 0,001 godtas, så forholdstall avrundet til fire desimaler gir riktig svar.</p>` },
          { q: below ? `Hvor mye må driftsresultatet øke (i 1 000 kr) for at Z skal komme opp i ${n(c.tgt, 2)}, når alt annet er likt?` : `Hvor mye kan driftsresultatet falle (i 1 000 kr) før Z kommer ned i ${n(ZHI, 2)}, når alt annet er likt?`,
            answer: Math.abs(c.dEBIT), unit: T1000, tol: { abs: 2, rel: 0.003 },
            hint: 'Driftsresultatet inngår bare i X3, med vekt 3,3. Endring i Z = 3,3 · endring i driftsresultat / totale eiendeler.',
            sol: f(`${frac(`|${n(c.tgt, 2)} − ${n(c.Z, 4)}|`, '3,3')} · ${n(TA)} = <b>${n(Math.abs(c.dEBIT))}</b>`) +
              `<p>Driftsresultatet må ${below ? `øke fra ${n(EBIT)} til ${n(EBIT + c.dEBIT)}` : `ikke falle under ${n(EBIT + c.dEBIT)}`}. Svaret forutsetter at et høyere resultat ikke endrer egenkapitalen eller eiendelene samme år.</p>` },
          { kind: 'text', q: 'Hva sier Z-verdien om bedriften, og hva er svakhetene ved modellen?',
            points: [`Z = ${n(c.Z, 4)} ligger ${zoneTxt}.`,
              `Største bidrag: ${names[top].toLowerCase()} (${n(c.parts[top], 4)}).${c.X[0] < 0 ? ' Arbeidskapitalen er negativ, så kortsiktig gjeld er større enn omløpsmidlene. Det trekker ned og er et likviditetsvarsel.' : ''}`,
              '<b>Svakheter</b>: koeffisientene og grensene er tilpasset amerikanske industriselskaper på 1960-tallet. Bransje, land og regnskapsregler er annerledes i dag. Omsetning / eiendeler varierer mye mellom bransjer, så handel får høy Z og kapitaltunge bedrifter lav.',
              'Modellen bygger på regnskapstall som kan være gamle når de leses, og markedsverdi av egenkapitalen finnes bare for børsnoterte selskaper. Bruk Z som et varselsignal sammen med likviditet, kontantstrøm og bransjetall, ikke som en fasit.'] },
        ],
      };
      return { p: pr, c, task };
    },
  });
  // ==================================================================
  // 4) Factoring (kap. 7 oppg. 7b og 8, med kortere kredittid som i forelesningens eksempel 7-10)
  // ==================================================================
  const pct2 = (x) => { const v = cl(x * 100), d = Number.isInteger(v) ? 0 : Number.isInteger(cl(v * 10)) ? 1 : 2; return n(v, d) + ' %'; };
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 7.7b og 7.8. */
  function factCalc({ S, D0, D1, m, lag, i, Y, geb, spart, kk }) {
    const KF0 = S * D0 / Y, marg = m * S * D1 / Y, rest = (1 - m) * S * lag / Y, KF1 = marg + rest, frig = KF0 - KF1;
    const fsk = (1 - m) * S * (D1 - lag) / Y, rente = i * fsk, cost = rente + geb - spart, kost = cost / frig;
    const maxGeb = kk * frig - rente + spart;
    return { KF0, marg, rest, KF1, frig, fsk, rente, geb, cost, kost, maxGeb };
  }
  O._factCalc = factCalc;

  const factFirms = ['Vestlandsprofil AS', 'Nordic Emballasje AS', 'Trøndelag Rør AS', 'Hallingdal Interiør AS', 'Kystnett Elektro AS', 'Oslofjord Grossist AS'];

  O.reg({
    id: 'k7-factoring', chapter: 7, level: 2, minutes: 15, examLike: 'Kapitteloppgave 7.7b og 7.8 – ikke gitt som egen oppgave 2016–2025',
    title: 'Factoring: frigjort kapital og kostnad i prosent',
    topic: 'Kortsiktig finansiering',
    blurb: 'Kapitalbinding i kundefordringer før og etter factoring, renter på forskuttert beløp, gebyr og sparte kostnader, og om factoring er billigere enn kassekreditt.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const firm = R.pick(factFirms);
      const S = R.int(20, 150) * 100000, D0 = R.pick([30, 40, 45, 60]), Y = R.bool(0.8) ? 360 : 365;
      const D1 = R.bool(0.3) ? D0 - R.pick([10, 15]) : D0, m = R.pick([0.15, 0.2, 0.25]), lag = R.bool(0.5) ? 0 : R.pick([5, 7, 10]);
      const i = R.pick([0.08, 0.1, 0.12, 0.13, 0.15]);
      const perInv = R.bool(0.5), q = R.pick([0.002, 0.0025, 0.0035, 0.005]), snitt = R.pick([2000, 2500, 4000, 5000, 10000]), g = R.pick([15, 20, 25, 30, 40]);
      const nInv = S / snitt, geb = perInv ? nInv * g : q * S;
      const spart = R.bool(0.3) ? 0 : rnd(S * R.pick([0.002, 0.004, 0.006]), 5000);
      const c0 = factCalc({ S, D0, D1, m, lag, i, Y, geb, spart, kk: 0 });
      const kk = U.round(c0.kost + R.pick([-0.04, -0.025, -0.015, 0.015, 0.025, 0.04]), 3);
      if (!(kk >= 0.06 && kk <= 0.3 && c0.cost > 0 && Math.abs(c0.kost - kk) > 0.005)) return null;
      const pr = { S, D0, D1, m, lag, i, Y, geb, spart, kk };
      const c = factCalc(pr);
      if (!(c.maxGeb > Math.max(0.2 * c.geb, 1000))) return null;
      const billig = c.kost < kk, kort = D1 < D0;
      const task = {
        text: `<p>${firm} har et kredittsalg på <b>${n(S)}</b> per år, og kundene betaler i gjennomsnitt etter <b>${D0} dager</b>. Bedriften vurderer å selge kundefordringene til et factoringselskap. Regn med <b>${Y} dager</b> i året.</p>` +
          `<p>Factoringselskapet forskutterer <b>${pctS(1 - m)}</b> av fakturabeløpet ${lag ? `<b>${lag} dager</b> etter at fakturaen er sendt` : '<b>straks</b> fakturaen er sendt'}. Resten, marginen på ${pctS(m)}, får bedriften når kunden betaler. ` +
          (kort ? `Factoringselskapet følger opp kundene tettere, og kredittiden ventes å gå ned til <b>${D1} dager</b>. ` : 'Kredittiden er den samme med factoring. ') +
          `Renten på forskuttert beløp er <b>${pctS(i)}</b> per år. ` +
          (perInv ? `Factoringgebyret er <b>${n(g)} kr per faktura</b>, og en gjennomsnittsfaktura er på <b>${n(snitt)}</b>. ` : `Factoringgebyret er <b>${pct2(q)}</b> av kredittsalget. `) +
          (spart ? `Bedriften sparer <b>${n(spart)}</b> per år i administrasjon av kundefordringene.` : 'Bedriften sparer ingen administrasjonskostnader.') +
          ` Alternativet er å finansiere kundefordringene med kassekreditt, som har en effektiv rente på <b>${pctS(kk)}</b>.</p>`,
        parts: [
          { q: 'Hvor mye kapital er bundet i kundefordringer i dag, uten factoring?', answer: c.KF0, unit: 'kr',
            hint: `Kundefordringer = kredittsalg · kredittdager / ${Y}.`,
            sol: f(`${n(S)} · ${frac(D0, Y)} = ${n(c.KF0)}`) },
          { q: 'Hvor mye kapital må bedriften selv binde i kundefordringer med factoring?', answer: c.KF1, unit: 'kr',
            hint: 'Marginen er bundet til kunden betaler.' + (lag ? ` Resten er bundet de ${lag} dagene før forskuddet kommer.` : ' Resten kommer straks, så den binder ingen kapital.'),
            sol: f(`Margin: ${n(m, 2)} · ${n(S)} · ${frac(D1, Y)} = ${n(c.marg)}`) +
              (lag ? f(`Før forskuddet: ${n(1 - m, 2)} · ${n(S)} · ${frac(lag, Y)} = ${n(c.rest)}`) + f(`Bundet med factoring = ${n(c.marg)} + ${n(c.rest)} = <b>${n(c.KF1)}</b>`) : `<p>Forskuddet kommer straks, så bare marginen er bundet: <b>${n(c.KF1)}</b>.</p>`) },
          { q: 'Hvor mye kapital frigjøres (reduksjonen i kapitalbindingen)?', answer: c.frig, unit: 'kr',
            sol: f(`${n(c.KF0)} − ${n(c.KF1)} = <b>${n(c.frig)}</b>`) + (kort ? `<p>En del av dette kommer av den kortere kredittiden, ikke av forskuddet: ${n(S)} · ${frac(D0 - D1, Y)} = ${n(S * (D0 - D1) / Y)}.</p>` : '') },
          { q: 'Hvor stort er det forskutterte beløpet factoringselskapet i gjennomsnitt har ute?', answer: c.fsk, unit: 'kr',
            hint: `Forskuddet er ${pctS(1 - m)} av fakturabeløpet, og det løper fra ${lag ? `dag ${lag}` : 'fakturadagen'} til kunden betaler etter ${D1} dager.`,
            sol: f(`${n(1 - m, 2)} · ${n(S)} · ${frac(D1 - lag, Y)} = <b>${n(c.fsk)}</b>`) +
              `<p>${kort ? 'Her er forskuddet mindre enn den frigjorte kapitalen, fordi den kortere kredittiden frigjør kapital uten at noen må forskuttere den.' : 'Når kredittiden er den samme, er forskuddet lik den frigjorte kapitalen, som i løsningsforslagene til kapittel 7.'}</p>` },
          { q: 'Hva betaler bedriften i renter på forskuttert beløp per år?', answer: c.rente, unit: 'kr',
            sol: f(`${pctS(i)} · ${n(c.fsk)} = ${n(c.rente)}`) },
          { q: 'Hva er factoringgebyret per år?', answer: c.geb, unit: 'kr',
            hint: perInv ? 'Antall fakturaer = kredittsalg / gjennomsnittsfaktura.' : 'Gebyret beregnes av hele kredittsalget.',
            sol: perInv ? f(`${frac(n(S), n(snitt))} = ${n(nInv)} fakturaer · ${n(g)} = ${n(c.geb)}`) : f(`${pct2(q)} · ${n(S)} = ${n(c.geb)}`) },
          { q: 'Hva er netto kostnad ved factoring per år?', answer: c.cost, unit: 'kr',
            sol: U.table(['', 'Beløp'], [['Renter på forskuttert beløp', n(c.rente)], ['Factoringgebyr', n(c.geb)]].concat(spart ? [['Sparte administrasjonskostnader', n(-spart)]] : [], [{ cells: ['Netto kostnad', n(c.cost)], cls: 'sum' }])) },
          { q: 'Hva koster factoring i prosent av frigjort kapital?', answer: c.kost, unit: '%',
            sol: f(`${frac(n(c.cost), n(c.frig))} = <b>${pct(c.kost, 2)}</b>`) +
              `<p>Det er ${billig ? '<b>lavere</b>' : '<b>høyere</b>'} enn kassekredittens ${pctS(kk)}, så factoring er ${billig ? 'billigst' : 'dyrest'}.</p>` },
          { q: 'Hvor høyt kan factoringgebyret være per år før factoring blir like dyrt som kassekreditten?', answer: c.maxGeb, unit: 'kr',
            hint: 'Factoring er like dyrt når netto kostnad = kassekredittrenten · frigjort kapital.',
            sol: f(`${pctS(kk)} · ${n(c.frig)} − ${n(c.rente)}${spart ? ` + ${n(spart)}` : ''} = <b>${n(c.maxGeb)}</b>`) +
              `<p>Gebyret er ${n(c.geb)}, altså ${c.geb < c.maxGeb ? 'under' : 'over'} grensen.</p>` },
          { kind: 'text', q: 'Bør bedriften velge factoring? Hva bør med i vurderingen utover kostnaden i prosent?',
            points: [`Factoring koster ${pct(c.kost, 1)} av frigjort kapital mot ${pctS(kk)} for kassekreditten, så factoring er ${billig ? 'billigst' : 'dyrest'} med disse tallene.`,
              '<b>Riktig sammenligning</b>: kostnaden skal deles på den <i>frigjorte</i> kapitalen, og sammenlignes med den effektive renten på alternativ finansiering. Gebyr og sparte administrasjonskostnader hører med, ikke bare renten.',
              kort ? `Den kortere kredittiden (${D0} til ${D1} dager) frigjør kapital som ikke koster renter. Er anslaget for optimistisk, blir factoring dyrere.` : 'Marginen må bedriften fortsatt finansiere selv til kunden betaler.',
              'Andre forhold: factoringselskapet overtar oppfølging og innkreving (mindre administrasjon, ofte færre tap), men kundene merker at fordringen er solgt. Avtalen kan være med eller uten regress, altså om bedriften eller factoringselskapet bærer tapene.'] },
        ],
      };
      return { p: pr, c, task };
    },
  });

  // ==================================================================
  // 5) Nøkkeltall for likviditet mot bransjen (kap. 12 oppg. 3), tall i 1 000 kr
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 12.3. */
  function ratioCalc({ S, AM, VL, KF, KB, LL, KK, KG2, Y, Db }) {
    const OM = VL + KF + KB, KG = KK + KG2, TA = AM + OM, gjeld = LL + KG, EK = TA - gjeld;
    const WC = OM - KG, BL = OM / KG, KL = (KF + KB) / KG, GA = gjeld / TA, D = KF / S * Y;
    const F = KF - S * Db / Y, BL2 = (OM - F) / (KG - F);
    return { OM, KG, TA, gjeld, EK, WC, BL, KL, GA, D, F, BL2 };
  }
  O._ratioCalc = ratioCalc;

  const ratioFirms = [['Fjordhandel AS', 'byggevarehandel'], ['Nordisk Maskin AS', 'maskinforhandler'], ['Innlandet Agentur AS', 'agenturhandel'], ['Polar Sjømat AS', 'sjømateksport'], ['Rogaland Stål AS', 'stålgrossist']];

  O.reg({
    id: 'k12-nokkeltall-likviditet', chapter: 12, level: 1, minutes: 15, examLike: 'Kapitteloppgave 12.3 – ikke gitt som egen oppgave 2016–2025',
    title: 'Nøkkeltall: likviditet, gjeldsandel og kredittid mot bransjen',
    topic: 'Arbeidskapital og kredittpolitikk',
    blurb: 'Balanselikviditet, kasselikviditet, gjeldsandel og kundekredittid fra regnskapet, sammenlignet med bransjesnitt og utviklingen de siste årene.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, bransje] = R.pick(ratioFirms);
      const S = R.int(300, 2000) * 50, Y = R.bool(0.8) ? 365 : 360, D = R.int(45, 120), KF = Math.round(S * D / Y);
      const Db = R.pick([30, 45, 60]); if (D - Db < 12) return null;
      const VL = Math.round(S * R.pick([0.12, 0.18, 0.24, 0.3]) + R.int(-50, 50)), KB = Math.round(S * R.pick([0.002, 0.005, 0.01, 0.02]) + R.int(0, 20));
      const OM = VL + KF + KB, KG = Math.round(OM / R.pick([0.95, 1.1, 1.25, 1.4, 1.6, 1.8, 2.1]));
      const KK = Math.round(KG * R.pick([0.35, 0.45, 0.55, 0.65])), KG2 = KG - KK;
      const AM = Math.round(OM * R.pick([0.6, 0.8, 1, 1.2, 1.4])), TA = AM + OM, gjeld = Math.round(TA * (R.pick([0.5, 0.6, 0.7, 0.8, 0.9]) + R.int(-25, 25) / 1000)), LL = gjeld - KG;
      if (LL < 0) return null;
      const pr = { S, AM, VL, KF, KB, LL, KK, KG2, Y, Db };
      const c = ratioCalc(pr);
      if (!(c.F > 0 && KK > c.F + 0.05 * KG && c.EK > 0 && Math.abs(c.BL - 1) > 0.03)) return null;
      // Bransjesnitt og tidligere år (gitt i oppgaven)
      const BLb = R.pick([1.3, 1.5, 1.8]), KLb = R.pick([0.8, 0.9, 1.0]), GAb = R.pick([0.55, 0.65, 0.75, 0.85]);
      if (Math.abs(c.BL - BLb) < 0.05 || Math.abs(c.KL - KLb) < 0.03 || Math.abs(c.GA - GAb) < 0.02) return null;
      const verre = R.bool(0.65), s = verre ? 1 : -1;
      const sB = R.pick([0.08, 0.1, 0.15]), sK = R.pick([0.04, 0.06, 0.08]), sG = R.pick([0.02, 0.03, 0.05]), sD = R.pick([8, 10, 15]);
      // Monoton utvikling med ulike sprang fra år til år
      const acc = { B: [0], K: [0], G: [0], D: [0] }, jit = () => 0.6 + R.int(0, 8) / 10;
      for (let k = 1; k <= 3; k++) { acc.B.push(acc.B[k - 1] + sB * jit()); acc.K.push(acc.K[k - 1] + sK * jit()); acc.G.push(acc.G[k - 1] + sG * jit()); acc.D.push(acc.D[k - 1] + sD * jit()); }
      const prev = [3, 2, 1].map((k) => ({ BL: U.round(c.BL + s * acc.B[k], 2), KL: U.round(c.KL + s * acc.K[k], 2), GA: U.round(c.GA - s * acc.G[k], 3), D: Math.round(c.D - s * acc.D[k]) }));
      if (prev.some((x) => x.BL <= 0.3 || x.KL <= 0.1 || x.GA <= 0.2 || x.GA >= 1 || x.D < 15)) return null;
      const yrs = [2022, 2023, 2024, 2025];
      const nkt = U.table(['Nøkkeltall'].concat(yrs.map(String), ['Bransjesnitt']), [
        ['Balanselikviditet'].concat(prev.map((x) => n(x.BL, 2)), ['?', n(BLb, 2)]),
        ['Kasselikviditet'].concat(prev.map((x) => n(x.KL, 2)), ['?', n(KLb, 2)]),
        ['Gjeldsandel'].concat(prev.map((x) => pct(x.GA, 1)), ['?', pctS(GAb)]),
        ['Kundekredittid, dager'].concat(prev.map((x) => n(x.D)), ['?', String(Db)])], { cls: 'wrapth' });
      const bal = U.table(['Balanse 31.12.2025', 'Beløp'], [['Anleggsmidler', `<b>${n(AM)}</b>`], ['Varelager', `<b>${n(VL)}</b>`], ['Kundefordringer', `<b>${n(KF)}</b>`], ['Kontanter og bank', `<b>${n(KB)}</b>`], { cells: ['Sum eiendeler', `<b>${n(c.TA)}</b>`], cls: 'sum' },
        ['Egenkapital', `<b>${n(c.EK)}</b>`], ['Langsiktig lån', `<b>${n(LL)}</b>`], ['Kassekreditt', `<b>${n(KK)}</b>`], ['Leverandørgjeld og annen kortsiktig gjeld', `<b>${n(KG2)}</b>`], { cells: ['Sum egenkapital og gjeld', `<b>${n(c.TA)}</b>`], cls: 'sum' }], { cls: 'wrapth' });
      const vs = (x, b, hi) => (x > b ? (hi ? 'bedre enn' : 'svakere enn') : (hi ? 'svakere enn' : 'bedre enn'));
      const task = {
        text: `<p>${firm} driver ${bransje}. Banken vil vurdere likviditeten før kassekreditten fornyes. Salgsinntektene i 2025 var <b>${n(S)}</b>, alt på kreditt. Alle tall er i 1 000 kr, og det regnes med <b>${Y} dager</b> i året.</p>` +
          `<p>Nøkkeltallene for de tre foregående årene og bransjesnittet:</p>` + nkt + bal +
          `<p>Balanselikviditet = omløpsmidler / kortsiktig gjeld. Kasselikviditet = (omløpsmidler − varelager) / kortsiktig gjeld. Gjeldsandel = total gjeld / totalkapital. Kundekredittid = kundefordringer / salgsinntekter · ${Y}.</p>`,
        parts: [
          { q: 'Hva er arbeidskapitalen (omløpsmidler − kortsiktig gjeld)?', answer: c.WC, unit: T1000, tol: tolK,
            hint: 'Kortsiktig gjeld er kassekreditten og leverandørgjelden og annen kortsiktig gjeld.',
            sol: f(`Omløpsmidler = ${n(VL)} + ${n(KF)} + ${n(KB)} = ${n(c.OM)}`) + f(`Kortsiktig gjeld = ${n(KK)} + ${n(KG2)} = ${n(c.KG)}`) + f(`Arbeidskapital = ${n(c.OM)} − ${n(c.KG)} = <b>${n(c.WC)}</b>`) },
          { q: 'Hva er balanselikviditeten i 2025?', answer: c.BL, unit: '', dec: 2,
            sol: f(`${frac(n(c.OM), n(c.KG))} = <b>${n(c.BL, 2)}</b>`) + `<p>Bransjesnittet er ${n(BLb, 2)}. En vanlig tommelfingerregel er at balanselikviditeten bør være over 2, men bransjen er et bedre sammenligningsgrunnlag.</p>` },
          { q: 'Hva er kasselikviditeten i 2025?', answer: c.KL, unit: '', dec: 2,
            hint: 'Varelageret holdes utenfor, fordi det tar lengst tid å gjøre om til penger.',
            sol: f(`${frac(`${n(c.OM)} − ${n(VL)}`, n(c.KG))} = ${frac(n(KF + KB), n(c.KG))} = <b>${n(c.KL, 2)}</b>`) + `<p>Bransjesnittet er ${n(KLb, 2)}. En vanlig tommelfingerregel er minst 1.</p>` },
          { q: 'Hva er gjeldsandelen i 2025?', answer: c.GA, unit: '%', dec: 1, tol: { abs: 0.0006 },
            hint: 'Total gjeld er langsiktig og kortsiktig gjeld. Totalkapitalen er sum eiendeler.',
            sol: f(`Total gjeld = ${n(LL)} + ${n(c.KG)} = ${n(c.gjeld)}`) + f(`${frac(n(c.gjeld), n(c.TA))} = <b>${pct(c.GA, 1)}</b>`) },
          { q: 'Hva er kundekredittiden i 2025?', answer: c.D, unit: 'dager', dec: 1, tol: { abs: 0.6 },
            sol: f(`${frac(n(KF), n(S))} · ${Y} = <b>${n(c.D, 1)}</b> dager`) + `<p>Bransjen ligger på ${Db} dager. Kundene bruker altså ${n(c.D - Db)} dager lenger enn snittet.</p>` },
          { q: `Hvor mye kapital frigjøres hvis kundekredittiden kommer ned til bransjesnittet på ${Db} dager?`, answer: c.F, unit: T1000, tol: tolK,
            hint: `Nye kundefordringer = salgsinntekter · ${Db} / ${Y}.`,
            sol: f(`Nye kundefordringer = ${n(S)} · ${frac(Db, Y)} = ${n(S * Db / Y)}`) + f(`Frigjort = ${n(KF)} − ${n(S * Db / Y)} = <b>${n(c.F)}</b>`) },
          { q: 'Den frigjorte kapitalen brukes til å nedbetale kassekreditten. Hva blir balanselikviditeten da?', answer: c.BL2, unit: '', dec: 2,
            hint: 'Både omløpsmidlene og den kortsiktige gjelden går ned med det frigjorte beløpet.',
            sol: f(`${frac(`${n(c.OM)} − ${n(c.F)}`, `${n(c.KG)} − ${n(c.F)}`)} = <b>${n(c.BL2, 2)}</b>`) +
              `<p>${c.BL > 1 ? 'Når balanselikviditeten er over 1, øker den når like store beløp trekkes fra over og under brøkstreken.' : 'Når balanselikviditeten er under 1, faller den når like store beløp trekkes fra over og under brøkstreken.'} Kasselikviditeten blir ${n((KF + KB - c.F) / (c.KG - c.F), 2)}.</p>` },
          { kind: 'text', q: 'Hvordan vurderer du likviditeten og soliditeten, sammenlignet med bransjen og utviklingen siden 2022?',
            points: [`Balanselikviditeten (${n(c.BL, 2)}) er ${vs(c.BL, BLb, true)} bransjen (${n(BLb, 2)}), og kasselikviditeten (${n(c.KL, 2)}) er ${vs(c.KL, KLb, true)} bransjen (${n(KLb, 2)}). Gjeldsandelen (${pct(c.GA, 1)}) er ${vs(c.GA, GAb, false)} bransjen (${pctS(GAb)}).`,
              `Utviklingen fra 2022 er en <b>${verre ? 'forverring' : 'bedring'}</b> på alle fire nøkkeltallene: balanselikviditet fra ${n(prev[0].BL, 2)} til ${n(c.BL, 2)}, gjeldsandel fra ${pct(prev[0].GA, 1)} til ${pct(c.GA, 1)} og kredittid fra ${prev[0].D} til ${n(c.D)} dager.`,
              `<b>Kredittiden</b> (${n(c.D)} dager mot ${Db} i bransjen) binder kapital og er finansiert med kassekreditt. Lange kundefordringer gjør også balanselikviditeten bedre enn den er, fordi gamle fordringer kan være vanskelige å kreve inn.`,
              'Tiltak: strammere kredittpolitikk eller kontantrabatt, factoring, eller å gjøre om kassekreditt til langsiktig lån. Nøkkeltallene er øyeblikksbilder fra balansedagen og bør leses sammen med kontantstrømmen.'] },
        ],
      };
      return { p: pr, c, task };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
