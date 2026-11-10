/* Valg mellom alternativer: lite eller stort anlegg, fortsette eller avslutte (sunk cost),
   egenproduksjon eller kjøp etter skatt, egenkapitalmetoden etter skatt. Kapittel-LF 6.5, 6.9, 8.12 og 8.8. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, cfTable } = U;
  const S_TAX = 0.22;
  const pad = (a) => [null].concat(a);
  const r100 = (x, step) => Math.round(x / step) * step;
  /** Enhetspris: hele kroner uten desimaler, ellers to. */
  const nd = (x) => n(x, Number.isInteger(x) ? 0 : 2);

  // ==================================================================
  // 1) Lite eller stort anlegg: kritisk volum og når stort lønner seg (kap. 6 oppg. 5)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 6.5. */
  function plantCalc({ Is, cs, fs, ds, Il, cl, fl, dl, T, r, D }) {
    const A = F.annuityFactor(r, T);
    const critCfS = Is / A, critDbS = critCfS + fs, qS = critDbS / ds;
    const critCfL = Il / A, critDbL = critCfL + fl, qL = critDbL / dl;
    const npvMaxS = (cs * ds - fs) * A - Is;
    const critCfX = (Il + npvMaxS) / A, critDbX = critCfX + fl, qX = critDbX / dl;
    // Volum under lite anleggs kapasitet der stort ville vært like godt (skal ligge over kapasiteten, ellers er oppgaven tvetydig).
    const q0 = dl > ds ? ((Il - Is) / A + fl - fs) / (dl - ds) : Infinity;
    const npvAt = (q, I, cap, fk, db) => (Math.min(q, cap) * db - fk) * A - I;
    const npvS = D === undefined ? null : npvAt(D, Is, cs, fs, ds), npvL = D === undefined ? null : npvAt(D, Il, cl, fl, dl);
    return { A, critCfS, critDbS, qS, critCfL, critDbL, qL, npvMaxS, critCfX, critDbX, qX, q0, npvS, npvL, best: D === undefined ? null : Math.max(npvS, npvL) };
  }
  O._plantCalc = plantCalc;

  const plantFirms = [['Grønnfôr AS', 'fôrpellets'], ['Isoplast AS', 'isolasjonsplater'], ['Fjordbetong AS', 'betongelementer'], ['Treflis Vest AS', 'trepellets'], ['Nordkomp AS', 'kompostjord'], ['Hav og Fisk AS', 'fiskemel']];

  O.reg({
    id: 'k6-lite-stort-anlegg', chapter: 6, level: 2, minutes: 20, examLike: 'Kapitteloppgave 6.5 – ikke gitt som egen oppgave 2016–2025',
    title: 'Lite eller stort anlegg: kritisk volum og når det store lønner seg',
    topic: 'Følsomhet',
    blurb: 'Kritisk volum for hvert anlegg via annuitetsfaktoren, største nåverdi med lite anlegg, og volumet der det store anlegget slår det lille.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, prod] = R.pick(plantFirms);
      const T = R.pick([10, 15, 20]), r = R.pick([0.10, 0.12, 0.15]);
      const cs = R.pick([4000, 5000, 6000, 8000, 10000]), ds = R.pick([40, 50, 55, 60, 75]);
      const fs = Math.max(50000, r100(cs * ds * R.pick([0.2, 0.3, 0.4]), 10000));
      const A = F.annuityFactor(r, T);
      const Is = r100((cs * ds - fs) * A * R.pick([0.5, 0.6, 0.7, 0.8]), 50000);
      const cl = cs * R.pick([1.5, 2, 2.5]), dl = ds + R.pick([0, 5, 10]);
      const fl = r100(fs * R.pick([1.3, 1.5, 1.8]), 10000), Il = r100(Is * R.pick([1.3, 1.45, 1.6]), 50000);
      const c0 = plantCalc({ Is, cs, fs, ds, Il, cl, fl, dl, T, r });
      // Krav: begge kritiske volum under kapasiteten, stort slår lite et sted mellom de to kapasitetene, og ikke allerede under lite anleggs kapasitet.
      if (!(c0.qS < 0.92 * cs && c0.qL < 0.92 * cl && c0.qX > cs * 1.05 && c0.qX < cl * 0.95 && c0.q0 > cs * 1.2 && c0.npvMaxS > 0)) return null;
      const scen = R.pick(['under', 'mellom', 'over']);
      const D = scen === 'under' ? r100(cs * R.pick([0.8, 0.9]), 100) : scen === 'mellom' ? r100((cs + c0.qX) / 2, 100) : r100((c0.qX + cl) / 2, 100);
      if (Math.abs(D - c0.qX) < 0.03 * c0.qX || D > cl) return null;
      const p = { Is, cs, fs, ds, Il, cl, fl, dl, T, r, D };
      const c = plantCalc(p);
      const largeBest = c.npvL > c.npvS;
      const tbl = U.table(['', 'Lite anlegg', 'Stort anlegg', 'Stort for å slå lite'], [
        ['Investering', n(Is), n(Il), `${n(Il)} + ${n(c.npvMaxS)} = ${n(Il + c.npvMaxS)}`],
        [`Kritisk netto innbetaling per år (÷ ${n(c.A, 4)})`, n(c.critCfS), n(c.critCfL), n(c.critCfX)],
        ['+ Faste kostnader', n(fs), n(fl), n(fl)],
        ['= Kritisk dekningsbidrag', n(c.critDbS), n(c.critDbL), n(c.critDbX)],
        ['÷ Dekningsbidrag per enhet', n(ds), n(dl), n(dl)],
        { cells: ['= Kritisk volum', n(c.qS), n(c.qL), n(c.qX)], cls: 'sum' }]);
      const task = {
        text: `<p>${firm} skal bygge et nytt anlegg for ${prod} og vurderer to størrelser. Anleggene har en levetid på <b>${T} år</b> og ingen restverdi. Avkastningskravet er <b>${pct(r, 0)}</b>. Se bort fra skatt og arbeidskapital.</p>` +
          U.table(['', 'Lite anlegg', 'Stort anlegg'], [['Investering', `<b>${n(Is)}</b>`, `<b>${n(Il)}</b>`], ['Maksimal kapasitet (enheter per år)', `<b>${n(cs)}</b>`, `<b>${n(cl)}</b>`],
            ['Betalbare faste kostnader per år', `<b>${n(fs)}</b>`, `<b>${n(fl)}</b>`], ['Dekningsbidrag per enhet', `<b>${n(ds)}</b>`, `<b>${n(dl)}</b>`]]),
        parts: [
          { q: 'Hvor stort årlig salg (i enheter) må det lille anlegget ha for at NNV skal bli 0?', answer: c.qS, unit: '', dec: 0, tol: { abs: 1, rel: 0 },
            hint: 'Finn først den årlige netto innbetalingen som akkurat dekker investeringen (investering / annuitetsfaktor). Legg til de faste kostnadene og del på dekningsbidraget per enhet.',
            sol: f(`Kritisk netto innbetaling = ${frac(n(Is), `A(${n(r * 100)} %, ${T}) = ${n(c.A, 4)}`)} = ${n(c.critCfS)}`) +
              f(`Kritisk volum = ${frac(`${n(c.critCfS)} + ${n(fs)}`, n(ds))} = ${frac(n(c.critDbS), n(ds))} = ${n(c.qS, 1)} ≈ ${n(c.qS)} enheter`) +
              `<p>Det er ${pct(c.qS / cs, 0)} av kapasiteten.</p>` },
          { q: 'Hvor stort årlig salg må det store anlegget ha for at NNV skal bli 0?', answer: c.qL, unit: '', dec: 0, tol: { abs: 1, rel: 0 },
            sol: f(`Kritisk volum = ${frac(`${n(Il)} / ${n(c.A, 4)} + ${n(fl)}`, n(dl))} = ${frac(n(c.critDbL), n(dl))} = ${n(c.qL)} enheter`) },
          { q: 'Hva er nåverdien (NNV) av det lille anlegget når det går for full kapasitet?', answer: c.npvMaxS, unit: 'kr', tol: { abs: Is * 0.001 },
            sol: f(`NNV = (${n(cs)} · ${n(ds)} − ${n(fs)}) · ${n(c.A, 4)} − ${n(Is)} = ${n(cs * ds - fs)} · ${n(c.A, 4)} − ${n(Is)} = ${n(c.npvMaxS)}`) +
              '<p>Mer enn dette kan det lille anlegget aldri tjene, uansett hvor stor etterspørselen er.</p>' },
          { q: 'Fra hvilket årlig salg er det store anlegget bedre enn det lille (når det lille går for full kapasitet)?', answer: c.qX, unit: '', dec: 0, tol: { abs: 1, rel: 0 },
            hint: 'Det store anlegget må tjene inn både sin egen investering og den nåverdien man gir opp ved å ikke velge det lille anlegget. Legg den største nåverdien fra lite anlegg til investeringen i det store.',
            sol: tbl + f(`Kritisk volum = ${frac(`(${n(Il)} + ${n(c.npvMaxS)}) / ${n(c.A, 4)} + ${n(fl)}`, n(dl))} = ${n(c.qX)} enheter`) +
              `<p>Under ${n(cs)} enheter (det lille anleggets kapasitet) er det lille anlegget best: det er billigere og har lavere faste kostnader${dl > ds ? ', og det høyere dekningsbidraget i det store anlegget veier ikke opp for det' : ''}. Mellom ${n(cs)} og ${n(c.qX)} enheter kan det lille ikke selge mer, men det store tjener fortsatt mindre. Først over ${n(c.qX)} enheter er det store anlegget best.</p>` },
          { q: `Markedsavdelingen anslår at man kan selge <b>${n(D)}</b> enheter i året. Hva blir NNV med det anlegget som er best ved dette salget?`, answer: c.best, unit: 'kr', tol: { abs: Is * 0.001 },
            hint: 'Regn NNV for begge anleggene. Det lille kan ikke selge mer enn kapasiteten sin.',
            sol: f(`Lite: (${D > cs ? `min(${n(D)}; ${n(cs)})` : n(D)} · ${n(ds)} − ${n(fs)}) · ${n(c.A, 4)} − ${n(Is)} = ${n(c.npvS)}`) +
              f(`Stort: (${n(D)} · ${n(dl)} − ${n(fl)}) · ${n(c.A, 4)} − ${n(Il)} = ${n(c.npvL)}`) +
              `<p>Velg <b>${largeBest ? 'det store' : 'det lille'} anlegget</b>, med NNV ${n(c.best)}. Det stemmer med grensen på ${n(c.qX)} enheter: ${n(D)} ligger ${D > c.qX ? 'over' : 'under'} den.</p>` },
          { kind: 'text', q: 'Hvilke forhold utenom tallene bør trekke inn i valget mellom anleggene?',
            points: ['<b>Usikkerhet om etterspørselen</b>: det store anlegget har høyere faste kostnader og et høyere kritisk volum, og taper mest hvis salget blir lavere enn ventet.',
              '<b>Fleksibilitet</b>: et lite anlegg kan ofte utvides senere. Et stort anlegg gir rom for vekst uten ny investering.',
              `<b>Kapasitetsgrensen</b>: med lite anlegg mister man alt salg over ${n(cs)} enheter, og kunder man avviser kan gå til konkurrenter.`,
              '<b>Levetid og restverdi</b>: beregningen antar like lang levetid og ingen restverdi for begge.'] },
        ],
      };
      return { p, c, task };
    },
  });

  // ==================================================================
  // 2) Fortsette eller avslutte: kritiske verdier, kannibalisering og sunk cost (kap. 6 oppg. 9)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 6.9. */
  function contCalc({ I, S, C, r, T, lostQ, lostP, lostV, V1 }) {
    const A = F.annuityFactor(r, T), disc = Math.pow(1 + r, T);
    const flows = [-I].concat(U.range(1, T).map((t) => C + (t === T ? S : 0)));
    const npv = F.npv(r, flows), irr = F.irr(flows);
    const minS = S - npv * disc, ann = npv / A, minC = C - ann;
    const lostDb = lostQ * (lostP - lostV);
    const flows2 = [-I].concat(U.range(1, T).map((t) => C - lostDb + (t === T ? S : 0)));
    const npv2 = F.npv(r, flows2);
    const flowsC = [-V1].concat(U.range(1, T - 1).map((t) => C - lostDb + (t === T - 1 ? S : 0)));
    const npvC = F.npv(r, flowsC);
    return { A, disc, flows, npv, irr, minS, ann, minC, lostDb, flows2, npv2, flowsC, npvC };
  }
  O._contCalc = contCalc;

  const contFirms = [['Sjøsprøyt AS', 'en ny sportsdrikk', 'den eksisterende tørstedrikken'], ['Bakeriet Nord AS', 'en ny frokostbar', 'den gamle müslibaren'],
    ['Lysverk AS', 'en ny LED-lampe', 'den eldre lampeserien'], ['Turutstyr AS', 'en lett tursekk', 'standardsekken'], ['Melkeriet Vest AS', 'en ny proteinyoghurt', 'den vanlige yoghurten']];

  O.reg({
    id: 'k6-fortsette-avslutte', chapter: 6, level: 2, minutes: 25, examLike: 'Kapitteloppgave 6.9 · sunk cost og kannibalisering 2020, 2021 og 2025',
    title: 'Fortsette eller avslutte: kritiske verdier, kannibalisering og sunk cost',
    topic: 'Følsomhet',
    blurb: 'NNV og internrente, laveste salgsverdi og laveste årlige innbetaling, tapt dekningsbidrag fra et eksisterende produkt, og om det lønner seg å fortsette når investeringen allerede er gjort.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, prod, old] = R.pick(contFirms);
      const T = R.pick([3, 3, 4, 5]), r = R.pick([0.08, 0.10, 0.10, 0.12]);
      const I = R.int(4, 16) * 500000, S = r100(I * R.pick([0.2, 0.3, 0.35]), 100000);
      const A = F.annuityFactor(r, T);
      const C = r100((I * (1 + R.pick([0.08, 0.12, 0.15])) - S / Math.pow(1 + r, T)) / A, 50000);
      const npv0 = -I + C * A + S / Math.pow(1 + r, T);
      if (npv0 <= 0) return null;
      const lostP = R.pick([200, 250, 300, 400]), lostV = r100(lostP * R.pick([0.4, 0.5, 0.6]), 10);
      const lostQ = Math.max(100, r100(npv0 / A * R.pick([0.6, 1.15, 1.3, 1.6]) / (lostP - lostV), 100));
      // Salgsverdien i dag trekkes rundt nåverdien av de gjenværende årene, så både «fortsett» og «selg nå» forekommer.
      const lost0 = lostQ * (lostP - lostV);
      const pvRest = (C - lost0) * F.annuityFactor(r, T - 1) + S / Math.pow(1 + r, T - 1);
      const V1 = r100(pvRest * R.pick([0.8, 0.9, 1.1, 1.2]), 100000);
      if (V1 >= 0.9 * I || V1 <= S) return null;
      const p = { I, S, C, r, T, lostQ, lostP, lostV, V1 };
      const c = contCalc(p);
      if (!(c.minS > 0.05 * S && c.minC > 0 && Math.abs(c.npv2) > 0.005 * I && Math.abs(c.npvC) > 0.005 * I && c.npv > 0.01 * I)) return null;
      const tbl = cfTable([['Innbetalingsoverskudd', pad(Array(T).fill(C))], ['Anleggsmidler', [-I].concat(Array(T - 1).fill(null), [S])], ['Kontantstrøm', c.flows, 'sum']], T);
      const tbl2 = cfTable([['Innbetalingsoverskudd', pad(Array(T).fill(C))], ['Tapt dekningsbidrag', pad(Array(T).fill(-c.lostDb))], ['Anleggsmidler', [-I].concat(Array(T - 1).fill(null), [S])], ['Kontantstrøm', c.flows2, 'sum']], T);
      const tblC = cfTable([['Innbetalingsoverskudd', pad(Array(T - 1).fill(C))], ['Tapt dekningsbidrag', pad(Array(T - 1).fill(-c.lostDb))], ['Salgsverdi i dag (alternativverdi)', [-V1]], ['Salgsverdi ved slutten', [null].concat(Array(T - 2).fill(null), [S])], ['Kontantstrøm', c.flowsC, 'sum']], T - 1, { corner: 'År fra nå' });
      const task = {
        text: `<p>${firm} vurderer å produsere ${prod}. Produksjonsanlegget koster <b>${n(I)}</b> og kan selges for <b>${n(S)}</b> etter <b>${T} år</b>. Produktet gir et årlig innbetalingsoverskudd på <b>${n(C)}</b>. Avkastningskravet er <b>${pct(r, 0)}</b>. Se bort fra skatt og arbeidskapital.</p>`,
        parts: [
          { q: 'Beregn prosjektets nåverdi (NNV).', answer: c.npv, unit: 'kr', tol: { abs: I * 0.001 },
            sol: tbl + f(`NNV = −${n(I)} + ${n(C)} · ${n(A, 4)} + ${frac(n(S), `${n(1 + r, 2)}<sup>${T}</sup>`)} = ${n(c.npv)}`) + `<p>Prosjektet er <b>lønnsomt</b>.</p>` },
          { q: 'Beregn internrenten.', answer: c.irr, unit: '%',
            sol: `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irr, 2)}</b>, høyere enn kravet på ${pct(r, 0)}.</p>` },
          { q: `Hva er den laveste salgsverdien av anlegget etter ${T} år som gir NNV = 0?`, answer: c.minS, unit: 'kr', tol: { abs: I * 0.001 },
            hint: `Salgsverdien kommer i år ${T}. Den kan falle med NNV omregnet til verdi i år ${T}.`,
            sol: f(`Mulig fall = NNV · ${n(1 + r, 2)}<sup>${T}</sup> = ${n(c.npv)} · ${n(c.disc, 4)} = ${n(c.npv * c.disc)}`) + f(`Laveste salgsverdi = ${n(S)} − ${n(c.npv * c.disc)} = ${n(c.minS)}`) },
          { q: 'Hva er det laveste årlige innbetalingsoverskuddet som gir NNV = 0?', answer: c.minC, unit: 'kr', tol: { abs: I * 0.0005 },
            sol: f(`Nåverdiannuitet = ${frac(n(c.npv), n(A, 4))} = ${n(c.ann)}`) + f(`Laveste innbetalingsoverskudd = ${n(C)} − ${n(c.ann)} = ${n(c.minC)}`) },
          { q: `Det viser seg at det nye produktet vil redusere salget av ${old} med <b>${n(lostQ)}</b> enheter per år. ${old[0].toUpperCase() + old.slice(1)} selges for <b>${n(lostP)}</b> og har variable enhetskostnader på <b>${n(lostV)}</b>. Hva blir prosjektets NNV når dette tas med?`, answer: c.npv2, unit: 'kr', tol: { abs: I * 0.001 },
            hint: 'Kannibalisering er en relevant kostnad. Det man taper, er dekningsbidraget (pris − variable kostnader) på de tapte enhetene, ikke omsetningen.',
            sol: f(`Tapt dekningsbidrag = ${n(lostQ)} · (${n(lostP)} − ${n(lostV)}) = ${n(c.lostDb)} per år`) + tbl2 +
              f(`NNV = ${n(c.npv)} − ${n(c.lostDb)} · ${n(A, 4)} = ${n(c.npv2)}`) + `<p>Prosjektet er ${c.npv2 > 0 ? 'fortsatt <b>lønnsomt</b>' : 'nå <b>ikke lønnsomt</b>'}.</p>` },
          { q: `Anta at bedriften allerede har investert og drevet i ett år før kannibaliseringen ble oppdaget. Det første årets innbetaling er mottatt. Anlegget kan nå selges for <b>${n(V1)}</b>. Kannibaliseringen gjelder alle de ${T - 1} gjenværende årene. Hva er NNV av å fortsette produksjonen, sammenlignet med å selge anlegget nå?`, answer: c.npvC, unit: 'kr', tol: { abs: I * 0.001 },
            hint: `Det som er investert, er sunk cost. Det som betyr noe nå, er salgsverdien man gir opp ved å fortsette (${n(V1)}), og kontantstrømmene de ${T - 1} neste årene.`,
            sol: tblC + f(`NNV = −${n(V1)} + ${U.range(1, T - 1).map((t) => frac(n(c.flowsC[t]), `${n(1 + r, 2)}<sup>${t}</sup>`)).join(' + ')} = ${n(c.npvC)}`) +
              `<p>${c.npvC > 0 ? '<b>Fortsett</b>: de gjenværende kontantstrømmene er verdt mer enn det man får ved å selge anlegget nå.' : '<b>Selg anlegget nå</b>: salgsverdien i dag er verdt mer enn de gjenværende kontantstrømmene.'}${(c.npv2 < 0) !== (c.npvC < 0) ? ` Legg merke til at svaret er et annet enn i forrige deloppgave (NNV ${n(c.npv2)}). Investeringen på ${n(I)} er allerede gjort og skal ikke med lenger.` : ''}</p>` },
          { kind: 'text', q: 'Forklar hvorfor den opprinnelige investeringen ikke skal med i den siste beregningen, og hva som skal med i stedet.',
            points: [`Investeringen på ${n(I)} er <b>sunk cost</b>: den er betalt og kan ikke hentes tilbake uansett hva man bestemmer nå.`,
              `Det relevante er <b>alternativverdien</b>: ved å fortsette gir man opp salgsverdien på ${n(V1)} i dag. Den regnes som en utbetaling i år 0.`,
              'Bare fremtidige kontantstrømmer som endres av beslutningen er relevante, også det tapte dekningsbidraget fra det eksisterende produktet.',
              'Et prosjekt som ikke burde vært startet, kan likevel være lønnsomt å fullføre.'] },
        ],
      };
      return { p, c, task };
    },
  });

  // ==================================================================
  // 3) Egenproduksjon eller kjøp etter skatt (kap. 8 oppg. 12)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 8.12. */
  function makeCalc({ b, v, Q, AM, K, r, T, a, P, P2, dg2 }) {
    const A = F.annuityFactor(r, T);
    const diffFlows = [-(AM + K)].concat(Array(T).fill((b - v) * Q));
    const irrFs = F.irr(diffFlows);
    const kTax = K * S_TAX, shield = F.pvSaldoTaxShield(AM, a, S_TAX, r);
    const y0 = -AM - K + kTax + shield, yMake = -v * Q * (1 - S_TAX), yBuy = -b * Q * (1 - S_TAX);
    const nvMake = y0 + yMake * A, nvBuy = yBuy * A, diff = nvMake - nvBuy;
    const capCost = -y0 / A, saveUnit = (b - v) * (1 - S_TAX), critQ = capCost / saveUnit;
    const nvBest = Math.max(nvMake, nvBuy), makeBest = nvMake >= nvBuy;
    const revAt = P * Q * (1 - S_TAX), pvRev = revAt * A, npvNew = pvRev + nvBest, annNew = npvNew / A;
    const db2 = P2 * dg2 * (1 - S_TAX), maxLost = annNew / db2;
    return { A, diffFlows, irrFs, kTax, shield, y0, yMake, yBuy, nvMake, nvBuy, diff, capCost, saveUnit, critQ, nvBest, makeBest, revAt, pvRev, npvNew, annNew, db2, maxLost };
  }
  O._makeCalc = makeCalc;

  const makeFirms = [['Bryggeriet Fjellbekk AS', 'flaskeetiketter', 'pilsen', 'juleølet'], ['Hagemøbler Nord AS', 'beslag', 'hagebenken', 'hagebordet'],
    ['Sykkelverkstedet AS', 'kjededeksler', 'bysykkelen', 'terrengsykkelen'], ['Kaffebrenneriet AS', 'kapsler', 'kapselkaffen', 'kaffebønnene'], ['Snekkeriet Vest AS', 'skuffeskinner', 'kjøkkenskapet', 'garderobeskapet']];

  O.reg({
    id: 'k8-egenproduksjon-kjop', chapter: 8, level: 3, minutes: 35, examLike: 'Kapitteloppgave 8.12 – ikke gitt som egen oppgave 2016–2025',
    title: 'Egenproduksjon eller kjøp etter skatt: kostnadsnåverdi og kritisk volum',
    topic: 'Nåverdi etter skatt',
    blurb: 'Sammenlign nåverdien av kostnadene etter skatt, finn volumet der alternativene er like gode, og hvor mye kannibalisering et nytt produkt tåler.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, part, prod, other] = R.pick(makeFirms);
      const T = R.pick([4, 5, 5, 6]), r = R.pick([0.08, 0.10, 0.12]), a = 0.2;
      const Q = R.int(6, 24) * 1000, b = R.pick([12, 16, 20, 25, 30, 40]);
      const v = Math.round(b * R.pick([0.5, 0.58, 0.65]) * 2) / 2;
      const A = F.annuityFactor(r, T);
      const critTarget = Q * R.pick([0.75, 0.85, 1.15, 1.3]);
      const need = critTarget * (b - v) * (1 - S_TAX) * A;            // = −år 0 etter skatt
      const kShare = R.pick([0.15, 0.2, 0.25]);
      const AM = r100(need / ((1 - S_TAX * a / (r + a)) + kShare * (1 - S_TAX)), 10000);
      const K = r100(AM * kShare, 1000);
      if (AM < 50000) return null;
      const P2 = R.pick([25, 30, 40, 50]), dg2 = R.pick([0.4, 0.5, 0.55, 0.6]);
      const c0 = makeCalc({ b, v, Q, AM, K, r, T, a, P: 0, P2, dg2 });
      const P = Math.round(-c0.nvBest * R.pick([1.06, 1.1, 1.15]) / (Q * (1 - S_TAX) * A) * 2) / 2;
      const p = { b, v, Q, AM, K, r, T, a, P, P2, dg2 };
      const c = makeCalc(p);
      if (!(Math.abs(c.diff) > 0.004 * Math.abs(c.nvMake) && c.npvNew > 0.02 * -c.nvBest && Number.isFinite(c.irrFs) && c.irrFs > -0.5)) return null;
      const tbl = cfTable([['Kontantstrøm egenproduksjon før skatt', [-(AM + K)].concat(Array(T).fill(-v * Q))], ['Skatteeffekt installasjon (kostnadsføres)', [c.kTax]],
        ['NV spart skatt avskrivninger', [c.shield]], ['Skatteeffekt variable kostnader', pad(Array(T).fill(v * Q * S_TAX))], ['Beregningsgrunnlag', [c.y0].concat(Array(T).fill(c.yMake)), 'sum']], T);
      const task = {
        text: `<p>${firm} bruker <b>${n(Q)}</b> ${part} i året til ${prod}. I dag kjøpes de inn for <b>${nd(b)}</b> per stykk. Bedriften vurderer å produsere dem selv. Det krever en maskin til <b>${n(AM)}</b> og installasjon for <b>${n(K)}</b>. Installasjonen kostnadsføres direkte og gir skattefradrag i år 0. Maskinen avskrives etter saldometoden med <b>20 %</b>, brukes i <b>${T} år</b> og har ingen verdi ved slutten. Variable kostnader ved egenproduksjon er <b>${nd(v)}</b> per stykk. De faste kostnadene endres ikke.</p>` +
          `<p>Skattesatsen er 22 %, og avkastningskravet etter skatt er <b>${pct(r, 0)}</b>. Skatt betales samme år som inntekten opptjenes.</p>`,
        parts: [
          { q: 'Se bort fra skatt. Hva er internrenten på differanseinvesteringen (egenproduksjon minus kjøp)?', answer: c.irrFs, unit: '%',
            hint: 'Differansen er investeringen i år 0 og den årlige besparelsen (kjøpspris − variabel kostnad) · antall.',
            sol: f(`Årlig besparelse = (${nd(b)} − ${nd(v)}) · ${n(Q)} = ${n((b - v) * Q)}`) +
              f(`Kontantstrøm: −${n(AM + K)} i år 0 og +${n((b - v) * Q)} i år 1–${T} → <code>=IR(...)</code> = ${pct(c.irrFs, 2)}`) },
          { q: 'Hva er nåverdien av kostnadene etter skatt ved <b>egenproduksjon</b>? (Oppgi som negativt tall.)', answer: c.nvMake, unit: 'kr', tol: { abs: AM * 0.002, rel: 0.002 },
            hint: 'Ta med investeringen, skattefradraget for installasjonen, nåverdien av spart skatt på saldoavskrivningene og de variable kostnadene etter skatt.',
            sol: tbl + f(`NV spart skatt = ${frac(`${n(AM)} · 0,20 · 0,22`, `${n(r, 2)} + 0,20`)} = ${n(c.shield)}`) +
              f(`NV = ${n(c.y0)} + (${n(c.yMake)}) · A(${n(r * 100)} %, ${T}) = ${n(c.y0)} − ${n(-c.yMake)} · ${n(A, 4)} = ${n(c.nvMake)}`) },
          { q: 'Hva er nåverdien av kostnadene etter skatt ved å fortsette å <b>kjøpe</b>? (Oppgi som negativt tall.)', answer: c.nvBuy, unit: 'kr', tol: { abs: AM * 0.002, rel: 0.002 },
            sol: f(`Årlig kostnad etter skatt = ${nd(b)} · ${n(Q)} · (1 − 0,22) = ${n(-c.yBuy)}`) + f(`NV = −${n(-c.yBuy)} · ${n(A, 4)} = ${n(c.nvBuy)}`) },
          { q: 'Hvor mye lavere er kostnadsnåverdien for det billigste alternativet?', answer: Math.abs(c.diff), unit: 'kr', tol: { abs: AM * 0.002, rel: 0.004 },
            sol: f(`|${n(c.nvMake)} − (${n(c.nvBuy)})| = ${n(Math.abs(c.diff))}`) + `<p><b>${c.makeBest ? 'Egenproduksjon' : 'Kjøp'}</b> er billigst. Velg alternativet med den <i>minst negative</i> kostnadsnåverdien.</p>` },
          { q: 'Ved hvilket årlig antall er de to alternativene like gode?', answer: c.critQ, unit: '', dec: 0, tol: { abs: 1, rel: 0.001 },
            hint: 'Gjør investeringen etter skatt (år 0) om til en årlig kapitalkostnad med annuitetsfaktoren. Del på besparelsen per stykk etter skatt.',
            sol: f(`Årlig kapitalkostnad = ${frac(n(-c.y0), n(A, 4))} = ${n(c.capCost)}`) +
              f(`Besparelse per stykk etter skatt = (${nd(b)} − ${nd(v)}) · 0,78 = ${n(c.saveUnit, 2)}`) +
              f(`Kritisk volum = ${frac(n(c.capCost), n(c.saveUnit, 2))} = ${n(c.critQ)} stykk`) +
              `<p>Over ${n(c.critQ)} stykk i året lønner egenproduksjon seg. Med ${n(Q)} stykk er ${c.makeBest ? 'egenproduksjon' : 'kjøp'} best, som i forrige deloppgave.</p>` },
          { q: `Anta i stedet at ${prod} er et nytt produkt bedriften vurderer å lansere. Det selges <b>${n(Q)}</b> enheter i året til <b>${nd(P)}</b> per stykk, og hver enhet bruker én av delene over. Andre kostnader enn ${part} kan ses bort fra, og bedriften velger det billigste alternativet for ${part}. Hva er nåverdien (NNV) etter skatt av ${prod}?`, answer: c.npvNew, unit: 'kr', tol: { abs: AM * 0.002, rel: 0.004 },
            sol: f(`Salgsinntekt etter skatt = ${nd(P)} · ${n(Q)} · 0,78 = ${n(c.revAt)} per år → NV = ${n(c.revAt)} · ${n(A, 4)} = ${n(c.pvRev)}`) +
              f(`NNV = ${n(c.pvRev)} + (${n(c.nvBest)}) = ${n(c.npvNew)}`) },
          { q: `Salget av ${prod} vil redusere salget av ${other}, som selges for <b>${n(P2)}</b> per enhet med en dekningsgrad på <b>${pct(dg2, 0)}</b>. Hvor mange færre enheter av ${other} i året tåler det nye produktet før NNV blir 0?`, answer: c.maxLost, unit: '', dec: 0, tol: { abs: 1, rel: 0.001 },
            hint: 'Gjør NNV om til en nåverdiannuitet. Del på tapt dekningsbidrag etter skatt per enhet.',
            sol: f(`Nåverdiannuitet = ${frac(n(c.npvNew), n(A, 4))} = ${n(c.annNew)}`) +
              f(`Tapt DB etter skatt per enhet = ${n(P2)} · ${n(dg2, 2)} · 0,78 = ${n(c.db2, 2)}`) +
              f(`Tåler = ${frac(n(c.annNew), n(c.db2, 2))} = ${n(c.maxLost)} enheter per år`) },
          { kind: 'text', q: 'Hva annet enn kostnadsnåverdien bør bedriften vurdere før den velger egenproduksjon?',
            points: ['<b>Volumrisiko</b>: egenproduksjon binder kapital i en maskin. Faller behovet under det kritiske volumet, var kjøp billigere.',
              '<b>Kvalitet, leveringssikkerhet og kontroll</b> over en innsatsfaktor taler for egenproduksjon.',
              '<b>Fleksibilitet</b>: kjøp kan sies opp eller økes uten ny investering.',
              '<b>Installasjonskostnaden</b> er her kostnadsført direkte, som oppgaven sier. Hvis den i stedet aktiveres, avskrives den sammen med maskinen og gir skattefordelen senere.'] },
        ],
      };
      return { p, c, task };
    },
  });

  // ==================================================================
  // 4) Egenkapitalmetoden etter skatt (kap. 8 oppg. 8)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 8.8. Skattefordelen i år 0 regnes med samme rente som diskonterer (som i målsøkingen). */
  function ekmCalc({ Q, price, mat, lonn, FK, AM, S, wc, T, rF, rE, L, i, a }) {
    const op = Q * (price - mat - lonn) - FK, AK = wc * Q * price;
    const fs = [-AM - AK].concat(U.range(1, T).map((t) => op + (t === T ? S + AK : 0)));
    const npvF = F.npv(rF, fs), irrF = F.irr(fs);
    const shield = (x) => F.pvSaldoTaxShield(AM, a, S_TAX, x), ned = (x) => F.pvSaldoTaxShield(S, a, S_TAX, x) / Math.pow(1 + x, T);
    const es = (x) => [-AM - AK + shield(x) - ned(x)].concat(U.range(1, T).map((t) => op * (1 - S_TAX) + (t === T ? S + AK : 0)));
    const npvE = F.npv(rE, es(rE)), irrE = F.solve((x) => F.npv(x, es(x)), -0.5, 3);
    const plan = F.annuityLoan(L, i, T);
    const intr = plan.rows.map((x) => x.interest), rep = plan.rows.map((x) => x.repay);
    const ebt = intr.map((x) => op - x), tax = ebt.map((x) => -S_TAX * x);
    const ekY = U.range(1, T).map((t) => op - intr[t - 1] + tax[t - 1] - rep[t - 1] + (t === T ? S + AK : 0));
    const ek = (x) => [-AM - AK + L + shield(x) - ned(x)].concat(ekY);
    const irrEk = F.solve((x) => F.npv(x, ek(x)), -0.5, 3);
    const irrEkFixed = F.irr(ek(rE));
    return { op, AK, fs, npvF, irrF, shieldE: shield(rE), nedE: ned(rE), esE: es(rE), npvE, irrE, payment: plan.payment, intr, rep, ebt, tax, ekY, ek, irrEk, irrEkFixed, shield, ned };
  }
  O._ekmCalc = ekmCalc;

  const ekmFirms = [['Laksefôr AS', 'fôrsekker'], ['Takstein Vest AS', 'takstein'], ['Glassverket AS', 'drikkeglass'], ['Plankeverket AS', 'terrassebord'], ['Sportsdeler AS', 'skistaver']];

  O.reg({
    id: 'k8-egenkapitalmetoden', chapter: 8, level: 3, minutes: 40, examLike: 'Kapitteloppgave 8.8 – ikke gitt som egen oppgave 2016–2025',
    title: 'Før skatt, etter skatt og egenkapitalmetoden: avkastning til eierne',
    topic: 'Nåverdi etter skatt',
    blurb: 'Samme prosjekt tre ganger: før skatt, etter skatt med saldoavskrivning, og som kontantstrøm til egenkapitalen med annuitetslån, rentefradrag og egenkapitalens internrente.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, prod] = R.pick(ekmFirms);
      const T = R.pick([4, 4, 5]), rF = R.pick([0.15, 0.18, 0.20]), rE = R.pick([0.10, 0.12, 0.14]), i = R.pick([0.05, 0.06, 0.07]), a = 0.2;
      const Q = R.int(10, 40) * 100, mat = R.pick([60, 80, 100, 120]), lonn = R.pick([150, 200, 250, 300]);
      const price = Math.round((mat + lonn) / R.pick([0.7, 0.75, 0.8]) * 2) / 2;
      const wc = R.pick([0.15, 0.2, 0.25]);
      const AM = r100(Q * price * R.pick([0.15, 0.2, 0.3]), 10000), S = r100(AM * R.pick([0.3, 0.4]), 1000), AK = wc * Q * price;
      const opT = (AM + AK - (S + AK) / Math.pow(1 + rF, T)) / F.annuityFactor(rF, T) * R.pick([0.95, 1.05, 1.12]);
      const FK = r100(Q * (price - mat - lonn) - opT, 10000);
      if (FK < 20000) return null;
      const L = r100((AM + AK) * R.pick([0.3, 0.4, 0.5]), 10000);
      const p = { Q, price, mat, lonn, FK, AM, S, wc, T, rF, rE, L, i, a };
      const c = ekmCalc(p);
      if (!(c.op > 0 && Math.abs(c.npvF) > 0.01 * AM && c.ek(c.irrEk)[0] < 0 && Number.isFinite(c.irrEk) && Number.isFinite(c.irrE) && c.irrEk > 0)) return null;
      const ekTbl = cfTable([['Kontantstrøm drift', pad(Array(T).fill(c.op))], ['Renter', pad(c.intr.map((x) => -x))], ['Resultat før skatt', pad(c.ebt), 'sub'], ['Skatt 22 %', pad(c.tax)],
        ['Lån og avdrag', [L].concat(c.rep.map((x) => -x))], ['NV spart skatt avskrivninger', [c.shield(c.irrEk)]], ['NV økt skatt ved salg (nedskriving)', [-c.ned(c.irrEk)]],
        ['Anleggsmidler', [-AM].concat(Array(T - 1).fill(null), [S])], ['Arbeidskapital', [-c.AK].concat(Array(T - 1).fill(null), [c.AK])], ['Kontantstrøm til egenkapitalen', c.ek(c.irrEk), 'sum']], T);
      const task = {
        text: `<p>${firm} vurderer å produsere ${prod}. Man regner med å selge <b>${n(Q)}</b> enheter i året til en pris på <b>${nd(price)}</b>. Materialkostnadene er <b>${n(mat)}</b> og lønnskostnadene <b>${n(lonn)}</b> per enhet. Økte betalbare faste kostnader er <b>${n(FK)}</b> per år. Prosjektet varer i <b>${T} år</b>.</p>` +
          `<p>Produksjonsutstyret koster <b>${n(AM)}</b> og kan selges for <b>${n(S)}</b> ved slutten av år ${T}. Salget nedskrives på saldo. Utstyret avskrives etter saldometoden med <b>20 %</b>. Arbeidskapitalen utgjør <b>${pct(wc, 0)}</b> av årlig omsetning, bindes i år 0 og frigjøres i år ${T}. Skattesatsen er 22 %, og skatt betales samme år som inntekten opptjenes.</p>` +
          `<p>Avkastningskravet er <b>${pct(rF, 0)}</b> før skatt og <b>${pct(rE, 0)}</b> etter skatt.</p>`,
        parts: [
          { q: 'Se bort fra skatt. Hva er prosjektets nåverdi (NNV) med avkastningskravet før skatt?', answer: c.npvF, unit: 'kr', tol: { abs: AM * 0.002, rel: 0.004 },
            sol: cfTable([['Omsetning', pad(Array(T).fill(Q * price))], ['Materialkostnader', pad(Array(T).fill(-Q * mat))], ['Lønnskostnader', pad(Array(T).fill(-Q * lonn))], ['Faste kostnader', pad(Array(T).fill(-FK))],
              ['Anleggsmidler', [-AM].concat(Array(T - 1).fill(null), [S])], ['Arbeidskapital', [-c.AK].concat(Array(T - 1).fill(null), [c.AK])], ['Kontantstrøm før skatt', c.fs, 'sum']], T) +
              f(`NNV (${pct(rF, 0)}) = ${n(c.npvF)}`) },
          { q: 'Hva er internrenten før skatt?', answer: c.irrF, unit: '%', sol: `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irrF, 2)}</b>.</p>` },
          { q: 'Hva er nåverdien etter skatt med totalkapitalmetoden (krav etter skatt, ingen lån i kontantstrømmen)?', answer: c.npvE, unit: 'kr', tol: { abs: AM * 0.002, rel: 0.004 },
            hint: 'Skatt på driftskontantstrømmen, + NV spart skatt på avskrivningene, − NV av økt skatt fordi salgssummen nedskrives på saldo.',
            sol: f(`Skatt per år = 0,22 · ${n(c.op)} = ${n(S_TAX * c.op)}`) +
              f(`NV spart skatt = ${frac(`${n(AM)} · 0,20 · 0,22`, `${n(rE, 2)} + 0,20`)} = ${n(c.shieldE)}`) +
              f(`NV økt skatt nedskriving = ${frac(`${n(S)} · 0,20 · 0,22`, `${n(rE, 2)} + 0,20`)} · ${frac('1', `${n(1 + rE, 2)}<sup>${T}</sup>`)} = ${n(c.nedE)}`) +
              f(`Beregningsgrunnlag: ${c.esE.map((x) => n(x)).join(' ; ')} → NNV (${pct(rE, 0)}) = <b>${n(c.npvE)}</b>`) },
          { q: `Prosjektet finansieres delvis med et annuitetslån på <b>${n(L)}</b> over ${T} år med ${pct(i, 0)} rente. Hva er det årlige terminbeløpet?`, answer: c.payment, unit: 'kr',
            sol: f(`${frac(`${n(L)} · ${n(i, 2)}`, `1 − ${n(1 + i, 2)}<sup>−${T}</sup>`)} = ${n(c.payment)}`) + '<p>Excel: <code>=AVDRAG(' + n(i * 100) + '%;' + T + ';-' + L + ')</code></p>' },
          { q: 'Hva er rentekostnaden i år 2?', answer: c.intr[1], unit: 'kr',
            sol: f(`Restlån etter år 1 = ${n(L)} − ${n(c.rep[0])} = ${n(L - c.rep[0])}`) + f(`Renter år 2 = ${n(L - c.rep[0])} · ${n(i, 2)} = ${n(c.intr[1])}`) },
          { q: 'Hva er kontantstrømmen til egenkapitalen i år 1 (etter renter, skatt og avdrag)?', answer: c.ekY[0], unit: 'kr',
            hint: 'Rentene er fradragsberettiget, så skatten regnes av driftskontantstrømmen minus renter. Avdraget gir ikke fradrag.',
            sol: f(`${n(c.op)} − ${n(c.intr[0])} − 0,22 · (${n(c.op)} − ${n(c.intr[0])}) − ${n(c.rep[0])} = ${n(c.ekY[0])}`) },
          { q: 'Hva er egenkapitalens internrente etter skatt (egenkapitalavkastningen)?', answer: c.irrEk, unit: '%', tol: { abs: 0.001 },
            hint: 'Finn renten der NV av kontantstrømmen til egenkapitalen er 0 (målsøking). Skattefordelen av avskrivningene i år 0 avhenger av renten, så regn den med den samme renten.',
            sol: ekTbl +
              `<p>Ved målsøking blir NV = 0 ved <b>${pct(c.irrEk, 2)}</b>. Skattefordelen i år 0 er regnet med denne renten. Regner du skattefordelen med kravet på ${pct(rE, 0)} i stedet, blir internrenten ${pct(c.irrEkFixed, 2)}. Forskjellen er liten, men målsøkingen er den riktige fremgangsmåten.</p>` +
              `<p>Til sammenligning er prosjektets internrente etter skatt (uten lån) ${pct(c.irrE, 2)}. Lånet koster ${pct(i * (1 - S_TAX), 2)} etter skatt.</p>` },
          { kind: 'text', q: 'Forklar hvorfor egenkapitalens avkastning skiller seg fra prosjektets avkastning etter skatt, og hvorfor renter og avdrag ikke skal med i totalkapitalmetoden.',
            points: [`<b>Giring</b>: lånet koster ${pct(i * (1 - S_TAX), 2)} etter skatt. Er prosjektets avkastning etter skatt (${pct(c.irrE, 2)}) høyere, tjener eierne på differansen, og egenkapitalavkastningen blir ${c.irrEk > c.irrE ? 'høyere' : 'lavere'} (${pct(c.irrEk, 2)}). Er den lavere, trekker lånet ned.`,
              '<b>Risiko</b>: med lån øker svingningene i eiernes avkastning, så eierne krever også høyere avkastning. Høyere egenkapitalavkastning er derfor ikke i seg selv et bedre prosjekt.',
              '<b>Totalkapitalmetoden</b> holder finansieringen utenfor kontantstrømmen. Kostnaden ved lån ligger i avkastningskravet (WACC). Tar man med renter og avdrag i tillegg, telles de to ganger.',
              '<b>Egenkapitalmetoden</b>: lånebeløpet er en innbetaling i år 0, renter gir skattefradrag, avdrag gir ikke fradrag. Kontantstrømmen diskonteres med eiernes krav.'] },
        ],
      };
      return { p, c, task };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
