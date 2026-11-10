/* Kapittel 12: kapitalbinding og endret kredittpolitikk (kap. 12 oppg. 1–2), kontantrabatt (oppg. 3) og Altmans Z (oppg. 5). */
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
})(typeof globalThis !== 'undefined' ? globalThis : this);
