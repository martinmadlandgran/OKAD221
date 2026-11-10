/* Kapittel 7, 9, 13 – Lån og kortsiktig finansiering, inflasjon, opsjoner. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table, cfTable } = U;
  // Tall i Excel-formler: uten tusenskille (mellomrom gir feil i Excel).
  const xl = (v, d = 0) => n(v, d).replace(/\s/g, '');

  // ------------------------------------------------------------------
  O.reg({
    id: 'k7-annuitetslan-maanedlig', chapter: 7, level: 2, minutes: 35, examLike: 'Låneoppgaven 2018, 2021, 2022 og 2023 (20 %)',
    title: 'Annuitetslån med månedlige terminer og gebyrer',
    topic: 'Lån',
    blurb: 'Terminbeløp, rente/avdrag, effektiv årsrente, restgjeld, over-/underkurs, nedbetalingstid og realrente etter skatt.',
    gen(R) {
      const scen = R.pick([['Du og din samboer vurderer å kjøpe leilighet og trenger et lån på', R.int(18, 40) * 100000, [15, 20, 25]], ['Du planlegger å kjøpe bil og trenger et lån på', R.int(15, 45) * 10000, [5, 7]], ['Du vurderer å ta opp et lån på', R.int(5, 20) * 100000, [5, 10]]]);
      const L = scen[1], Y = R.pick(scen[2]), N = Y * 12;
      const nom = R.int(300, 850, 5) / 10000, rm = nom / 12;
      const E = R.pick([1000, 2500, 3200, 3551, 5000]), g = R.pick([50, 65, 75, 100]);
      const pmt = F.annuityPayment(L, rm, N);
      const rows = F.annuityLoan(L, rm, 3).rows; // bare for rente-beregning: bruk manuelt under
      let bal = L; const first = []; for (let t = 1; t <= 3; t++) { const i = bal * rm, a = pmt - i; bal -= a; first.push([t, n(i, 2), n(a, 2), n(g, 2), n(pmt + g, 2), n(bal, 2)]); }
      const int1 = L * rm, av3 = (pmt - int1) * Math.pow(1 + rm, 2);
      const q = F.solve((x) => (pmt + g) * F.annuityFactor(x, N) - (L - E), 1e-7, 0.1), eff = F.effFromPeriod(q, 12);
      const kLeft = R.int(1, Y - 1), nLeft = kLeft * 12, rest = pmt * F.annuityFactor(rm, nLeft);
      const nom2 = nom + R.pick([-0.01, -0.005, 0.005, 0.01]), over = pmt * F.annuityFactor(nom2 / 12, nLeft) - rest;
      const P2 = Math.ceil(pmt * R.pick([1.15, 1.25, 1.4]) / 100) * 100;
      const per = -Math.log(1 - L * rm / P2) / Math.log(1 + rm);
      const j = R.pick([0.02, 0.025, 0.03]), realAT = (eff * 0.78 - j) / (1 + j);
      return {
        text: `<p>${scen[0]} <b>${n(L)}</b>. Banken tilbyr et annuitetslån med månedlige betalinger over <b>${Y} år</b>. Nominell årsrente er <b>${pct(nom, 2)}</b>, etableringsgebyret er <b>${n(E)}</b> og termingebyret er <b>${g}</b> per måned.</p>`,
        parts: [
          { q: 'Hvor mye skal du betale i renter og avdrag per måned (uten termingebyr)?', answer: pmt, unit: 'kr', dec: 2, tol: { abs: 0.6, rel: 0 },
            hint: 'Månedsrente = nominell årsrente / 12. Antall terminer = år · 12.',
            sol: f(`Månedsrente = ${frac(pct(nom, 2), '12')} = ${pct(rm, 4)}, antall terminer = ${N}`) + `<p><code>=AVDRAG(${n(nom * 100, 2)}%/12;${N};-${L})</code> = <b>${n(pmt, 2)}</b>. Med termingebyr betaler du ${n(pmt + g, 2)} per måned.</p>` },
          { q: 'Hvor mye er <b>renter</b> i den første måneden?', answer: int1, unit: 'kr', dec: 2, tol: { abs: 0.6, rel: 0 }, sol: f(`${n(L)} · ${frac(n(nom, 4), '12')} = ${n(int1, 2)}`) },
          { q: 'Hvor mye er <b>avdrag</b> i den tredje måneden?', answer: av3, unit: 'kr', dec: 2, tol: { abs: 0.6, rel: 0 },
            sol: table(['Måned', 'Rente', 'Avdrag', 'Gebyr', 'Sum', 'Restgjeld'], first, { allNum: true }) + '<p>Rente = restgjeld · månedsrente; avdrag = terminbeløp − rente. Excel: <code>=RAVDRAG()</code> og <code>=AMORT()</code>.</p>' },
          { q: 'Hva er lånets <b>effektive årsrente</b>? Angi svaret med 2 desimaler.', answer: eff, unit: '%',
            hint: 'Netto utbetalt = lån − etableringsgebyr. Månedlig betaling = terminbeløp + termingebyr. Finn internrenten per måned og annualiser.',
            sol: steps([`Netto utbetalt: ${n(L)} − ${n(E)} = ${n(L - E)}`, `Månedlig betaling inkl. gebyr: ${n(pmt, 2)} + ${g} = ${n(pmt + g, 2)}`,
              `<code>=RENTE(${N};-${xl(pmt + g, 2)};${L - E})</code> = ${pct(q, 4)} per måned`, `Effektiv årsrente = (1 + ${n(q, 6)})<sup>12</sup> − 1 = <b>${pct(eff, 2)}</b>`]) },
          { q: `Hva er restgjelden når det gjenstår ${kLeft} år av tilbakebetalingstiden?`, answer: rest, unit: 'kr', tol: { abs: 2, rel: 0.0003 },
            hint: 'Restgjeld = nåverdien av de gjenstående terminbeløpene (uten gebyr), diskontert med lånerenten.',
            sol: `<p>${nLeft} terminer gjenstår: <code>=NÅVERDI(${n(nom * 100, 2)}%/12;${nLeft};-${xl(pmt, 2)})</code> = <b>${n(rest)}</b>.</p>` },
          { q: `Anta at lånet er et fastrentelån. Når det gjenstår ${kLeft} år, er renten på tilsvarende lån ${pct(nom2, 2)}, og du ønsker å innfri lånet. Hvor stor blir overkursen (positivt tall) eller underkursen (negativt tall)?`, answer: over, unit: 'kr', tol: { abs: 3, rel: 0.003 },
            hint: 'Verdien av lånet for banken = nåverdien av gjenstående terminbeløp til <i>ny</i> markedsrente. Sammenlign med restgjelden.',
            sol: f(`NV ved ${pct(nom2, 2)} = ${n(pmt, 2)} · A(${pct(nom2 / 12, 4)}, ${nLeft}) = ${n(rest + over)}`) + f(`${n(rest + over)} − ${n(rest)} = ${n(over)}`) +
              `<p>${over > 0 ? `Markedsrenten har <b>falt</b> → lånet er verdt mer enn restgjelden for banken → du må betale <b>overkurs</b> på ${n(over)}.` : `Markedsrenten har <b>steget</b> → banken kan låne ut pengene til høyere rente → du får <b>underkurs</b> (rabatt) på ${n(-over)}.`}</p>` },
          { q: `Anta at du fra start betaler ${n(P2)} per måned (eksklusive termingebyr) i stedet. Hvor mange måneder tar det å nedbetale lånet?`, answer: per, unit: '', dec: 2, tol: { abs: 0.06 },
            sol: `<p><code>=PERIODER(${n(nom * 100, 2)}%/12;-${P2};${L})</code> = <b>${n(per, 2)} måneder</b> (${n(per / 12, 2)} år).</p>` + f(`n = −${frac(`ln(1 − ${n(L)} · ${n(rm, 6)} / ${n(P2)})`, `ln(1 + ${n(rm, 6)})`)}`) },
          { q: `Din skattesats er 22 % og inflasjonen er ${pct(j, 1)} årlig. Hva blir lånets realrente etter skatt (ta utgangspunkt i effektiv rente)?`, answer: realAT, unit: '%',
            hint: 'Skatt først, deretter inflasjon: (r · (1 − s) − j) / (1 + j).',
            sol: f(`r<sub>n</sub> = ${pct(eff, 2)} · 0,78 = ${pct(eff * 0.78, 2)}`) + f(`r<sub>r</sub> = ${frac(`${pct(eff * 0.78, 2)} − ${pct(j, 1)}`, `1 + ${n(j, 3)}`)} = ${pct(realAT, 2)}`) },
          { kind: 'text', q: 'Ville effektiv årsrente blitt påvirket dersom lånet var et serielån med de samme betingelsene? Begrunn uten å regne.',
            points: ['Den nominelle renten er den samme, så forskjellen skyldes bare hvordan <b>gebyrene</b> slår ut.',
              'Serielån nedbetales raskere (like avdrag fra start) → lavere gjennomsnittlig gjeld. De faste gebyrene fordeles da på et mindre lånebeløp, og effektiv rente blir <b>noe høyere</b> enn for annuitetslånet.',
              'Omvendt: annuitetslån har høyere gjennomsnittlig gjeld, så gebyrene «slår mindre ut».',
              '<span class="muted">Merk: løsningsforslaget til eksamen 2023 (2f) skriver «noe lavere med serielån», men begrunnelsen i samme setning («annuitetslån … gebyrene slår mindre ut») peker motsatt vei. Bruk begrunnelsen.</span>'] },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k7-serielan-avdragsfri', chapter: 7, level: 2, minutes: 15, examLike: '2018 oppg. 2d, 2019 oppg. 2, 2021 oppg. 2e',
    title: 'Serielån med avdragsfri periode – effektiv rente',
    topic: 'Lån',
    blurb: 'Sett opp låntakers kontantstrøm med renter, avdrag og gebyrer, og finn effektiv rente som internrente.',
    gen(R) {
      const L = R.int(6, 30) * 100000, r = R.int(30, 80, 5) / 1000, N = R.pick([5, 6, 8]), free = R.pick([1, 2, 2]);
      const E = R.pick([1000, 2000, 5000, 10000]), g = R.pick([50, 100, 150]);
      const av = L / (N - free); let bal = L; const rent = [], avd = [], cf = [L - E];
      for (let t = 1; t <= N; t++) { const i = bal * r, a = t > free ? av : 0; rent.push(-i); avd.push(a ? -a : null); bal -= a; cf.push(-i - a - g); }
      const eff = F.irr(cf.map((x) => -x), -0.5, 1);
      const pmtA = F.annuityPayment(L, r, N); const effA = F.solve((x) => (pmtA + g) * F.annuityFactor(x, N) - (L - E), 1e-7, 1);
      const pad = (a) => [null].concat(a);
      return {
        text: `<p>Et lån på <b>${n(L)}</b> tas opp som et <b>serielån</b> med årlige betalinger. Nominell årsrente er <b>${pct(r, 1)}</b>, etableringsgebyret er <b>${n(E)}</b> og termingebyret <b>${g}</b>. Løpetiden er <b>${N} år</b>, men ${free === 1 ? 'det <b>første året</b> er avdragsfritt' : `de første <b>${free}</b> årene er avdragsfrie`}.</p>`,
        parts: [
          { q: 'Hvor stort er det årlige avdraget når avdragene starter?', answer: av, unit: 'kr', sol: f(`${frac(n(L), `${N} − ${free}`)} = ${n(av)}`) },
          { q: `Hva er samlet betaling (renter + avdrag + gebyr) i år ${free + 1}?`, answer: -cf[free + 1], unit: 'kr', sol: f(`${n(L)} · ${n(r, 3)} + ${n(av)} + ${g} = ${n(-cf[free + 1])}`) },
          { q: 'Hva er lånets effektive årsrente? Angi svaret med 2 desimaler.', answer: eff, unit: '%',
            sol: cfTable([['Lån', [L]], ['Renter', pad(rent)], ['Avdrag', pad(avd)], ['Gebyrer', [-E].concat(Array(N).fill(-g))], ['Kontantstrøm', cf, 'sum']], N) + `<p><code>=IR(kontantstrøm)</code> = <b>${pct(eff, 2)}</b>.</p>` },
          { q: 'Hva ville effektiv rente vært for et annuitetslån med samme rente, løpetid og gebyrer (uten avdragsfrihet)?', answer: effA, unit: '%',
            sol: `<p>Terminbeløp: <code>=AVDRAG(${n(r * 100, 1)}%;${N};-${L})</code> = ${n(pmtA)}. Med gebyr: ${n(pmtA + g)}.</p><p><code>=RENTE(${N};-${xl(pmtA + g)};${L - E})</code> = <b>${pct(effA, 2)}</b>.</p>` +
              `<p>${pct(eff, 2) === pct(effA, 2) ? `Med to desimaler er rentene like; med flere desimaler: ${pct(eff, 4)} mot ${pct(effA, 4)}. ` : ''}${eff < effA ? 'Serielånet med avdragsfrihet har lavest effektiv rente: gjelden er høy lenge, så gebyrene utgjør en mindre andel.' : 'Annuitetslånet har lavest effektiv rente her: gjennomsnittlig gjeld er høyere, så gebyrene utgjør en mindre andel.'}</p>` },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k7-kortsiktig-finansiering', chapter: 7, level: 2, minutes: 18, examLike: '2019 oppg. 2 (kassekreditt)',
    title: 'Leverandørkreditt, kassekreditt og leasing',
    topic: 'Kortsiktig finansiering',
    blurb: 'Effektiv rente på kontantrabatt, kassekreditt med provisjon og leasingavtale.',
    gen(R) {
      const D = R.pick([30, 45, 60]), d = R.pick([10, 10, 14]), x = R.pick([0.01, 0.015, 0.02, 0.03]);
      const rp = x / (1 - x), effLev = Math.pow(1 + rp, 360 / (D - d)) - 1;
      const limit = R.int(3, 20) * 100000, util = R.pick([0.4, 0.5, 0.6, 0.75]), rk = R.int(55, 95, 5) / 1000, prov = R.pick([0.0025, 0.003, 0.0033, 0.004]);
      const draw = limit * util, costQ = draw * rk / 4 + limit * prov, rq = costQ / draw, effKK = Math.pow(1 + rq, 4) - 1;
      const M = R.int(1, 8) * 100000, adv = Math.round(M * R.pick([0.2, 0.3, 0.4]) / 1000) * 1000, nL = R.pick([3, 4, 5]);
      const rL = R.int(6, 14) / 100, lease = Math.round((M - adv) / F.annuityFactor(rL, nL) / 100) * 100;
      const irL = F.solve((y) => lease * F.annuityFactor(y, nL) - (M - adv), 1e-6, 1);
      return {
        text: `<p><b>Leverandørkreditt.</b> En leverandør tilbyr betingelsene «netto per ${D} dager, eller ${d} dager – ${pct(x, 1)} kontantrabatt». Regn med 360 dager i året.</p>` +
          `<p><b>Kassekreditt.</b> En bedrift har en kassekreditt med limit (bevilget ramme) på ${n(limit)}. Gjennomsnittlig trekk er ${pct(util, 0)} av limiten. Renten er ${pct(rk, 1)} p.a. av trukket beløp, og provisjonen er ${pct(prov, 2)} av limiten per kvartal. Rente og provisjon betales hvert kvartal.</p>` +
          `<p><b>Leasing.</b> En maskin koster ${n(M)}. Alternativt kan den leases: forskudd ${n(adv)} nå og deretter ${nL} betalinger à ${n(lease)} i slutten av hvert år. Se bort fra skatt.</p>`,
        parts: [
          { q: 'Hvilken effektiv årsrente betaler man ved <b>ikke</b> å benytte kontantrabatten?', answer: effLev, unit: '%', tol: { abs: 0.002 },
            hint: `Du «låner» ${n(100 * (1 - x), 1)} i ${D - d} dager og betaler ${n(100 * x, 1)} for det.`,
            sol: f(`Perioderente = ${frac(n(x, 3), `1 − ${n(x, 3)}`)} = ${pct(rp, 3)} for ${D - d} dager`) + f(`Effektiv årsrente = (1 + ${n(rp, 5)})<sup>360/${D - d}</sup> − 1 = ${pct(effLev, 2)}`) +
              '<p>Leverandørkreditt er som regel svært dyr finansiering – benytt rabatten dersom du kan låne billigere andre steder.</p>' },
          { q: 'Hva koster kassekreditten per kvartal (rente + provisjon)?', answer: costQ, unit: 'kr',
            sol: f(`Rente: ${n(draw)} · ${frac(n(rk, 3), '4')} = ${n(draw * rk / 4)}`) + f(`Provisjon: ${n(limit)} · ${n(prov, 4)} = ${n(limit * prov)}`) + f(`Sum = ${n(costQ)}`) },
          { q: 'Hva er kassekredittens effektive årsrente?', answer: effKK, unit: '%',
            hint: 'Kvartalskostnad delt på <i>trukket</i> beløp gir kvartalsrenten.',
            sol: f(`Kvartalsrente = ${frac(n(costQ), n(draw))} = ${pct(rq, 3)}`) + f(`Effektiv årsrente = (1 + ${n(rq, 5)})<sup>4</sup> − 1 = ${pct(effKK, 2)}`) +
              `<p>Alternativt: ${frac(n(rk, 3), '4')} + ${frac(n(prov, 4), n(util, 2))} = ${pct(rq, 3)}. Jo lavere utnyttelsesgrad, desto dyrere blir kreditten – provisjonen betales av hele rammen.</p>` },
          { q: 'Hvilken effektiv rente innebærer leasingavtalen?', answer: irL, unit: '%',
            hint: 'Sammenlign med kjøp: du sparer kjøpesummen minus forskuddet i dag, og betaler leie etterpå.',
            sol: `<p>Differansekontantstrøm leasing − kjøp: +${n(M)} − ${n(adv)} = +${n(M - adv)} i år 0, og −${n(lease)} i år 1–${nL}.</p><p><code>=RENTE(${nL};-${lease};${M - adv})</code> = <b>${pct(irL, 2)}</b>. Leasing lønner seg dersom denne renten er lavere enn bedriftens lånerente.</p>` },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k9-inflasjon-realrente', chapter: 9, level: 2, minutes: 18, examLike: '2023 oppg. 2g (realrente etter skatt)',
    title: 'Prisstigning: nominelle og reelle størrelser',
    topic: 'Inflasjon',
    blurb: 'Realrente før og etter skatt, og konsistent bruk av nominell/reell kontantstrøm og avkastningskrav.',
    gen(R) {
      const pn = R.int(4, 9) / 100, j = R.pick([0.02, 0.025, 0.03, 0.04]);
      const pr = (pn - j) / (1 + j), rn = pn * 0.78, rr = (rn - j) / (1 + j);
      const I = R.int(5, 30) * 100000, N = R.pick([3, 4, 5]), c = Math.round(I / N * R.pick([1.2, 1.3, 1.45]) / 10000) * 10000;
      const kn = R.pick([0.08, 0.10, 0.12]), kr = (kn - j) / (1 + j);
      const nomCF = U.range(1, N).map((t) => c * Math.pow(1 + j, t));
      const npv = -I + F.npv(kn, [0].concat(nomCF));
      const wrong = -I + c * F.annuityFactor(kn, N);
      return {
        text: `<p><b>Del 1.</b> Et bankinnskudd gir <b>${pct(pn, 0)}</b> nominell rente før skatt. Skattesatsen er 22 % og inflasjonen er <b>${pct(j, 1)}</b>.</p>` +
          `<p><b>Del 2.</b> Et prosjekt krever en investering på <b>${n(I)}</b> og gir en årlig kontantstrøm på <b>${n(c)}</b> i ${N} år, målt i <b>faste priser</b> (dagens kroneverdi). Inflasjonen er ${pct(j, 1)} og det <b>nominelle</b> avkastningskravet er ${pct(kn, 0)}. Se bort fra skatt.</p>`,
        parts: [
          { q: 'Hva er realrenten før skatt på bankinnskuddet?', answer: pr, unit: '%', sol: f(`p<sub>r</sub> = ${frac('p<sub>n</sub> − j', '1 + j')} = ${frac(`${n(pn, 2)} − ${n(j, 3)}`, n(1 + j, 3))} = ${pct(pr, 2)}`) },
          { q: 'Hva er nominell rente etter skatt?', answer: rn, unit: '%', sol: f(`r<sub>n</sub> = p<sub>n</sub> · (1 − s) = ${pct(pn, 0)} · 0,78 = ${pct(rn, 2)}`) },
          { q: 'Hva er realrenten etter skatt?', answer: rr, unit: '%',
            hint: 'Skatt beregnes av den nominelle renten. Trekk skatten først, juster så for inflasjon.',
            sol: f(`r<sub>r</sub> = ${frac('r<sub>n</sub> − j', '1 + j')} = ${frac(`${n(rn, 4)} − ${n(j, 3)}`, n(1 + j, 3))} = ${pct(rr, 2)}`) +
              '<div class="callout warn">Rekkefølgen er viktig: skatt først, deretter inflasjon. Skatten beregnes av <i>hele</i> den nominelle renten – også den delen som bare kompenserer for prisstigning – så realavkastningen etter skatt kan bli svært lav eller negativ.</div>' },
          { q: 'Hva er prosjektets reelle avkastningskrav?', answer: kr, unit: '%', sol: f(`${frac(`${n(kn, 2)} − ${n(j, 3)}`, n(1 + j, 3))} = ${pct(kr, 2)}`) },
          { q: 'Hva er prosjektets nåverdi?', answer: npv, unit: 'kr', tol: { abs: I * 0.001 },
            hint: 'Enten: gjør kontantstrømmen nominell og bruk nominelt krav. Eller: behold faste priser og bruk realkravet. Begge gir samme svar.',
            sol: '<p><b>Metode 1 – nominelt:</b></p>' + cfTable([['Kontantstrøm faste priser', [null].concat(Array(N).fill(c))], ['Nominell kontantstrøm', [-I].concat(nomCF), 'sum']], N) + f(`NNV (${pct(kn, 0)}) = ${n(npv)}`) +
              `<p><b>Metode 2 – reelt:</b> −${n(I)} + ${n(c)} · A(${pct(kr, 3)}, ${N}) = −${n(I)} + ${n(c)} · ${n(F.annuityFactor(kr, N), 4)} = <b>${n(-I + c * F.annuityFactor(kr, N))}</b>. Samme svar.</p>` +
              `<div class="callout bad">Vanlig feil: å diskontere kontantstrøm i faste priser med nominelt krav. Det gir ${n(wrong)} – altså en systematisk <i>undervurdering</i> av prosjektet.</div>` },
          { kind: 'text', q: 'Forklar konsistensregelen for kontantstrøm og avkastningskrav ved prisstigning.',
            points: ['Kontantstrøm i løpende (nominelle) priser → nominelt avkastningskrav.', 'Kontantstrøm i faste priser → realavkastningskrav.', 'Brukes riktig krav, blir nåverdien den samme uansett metode.',
              'I etter-skatt-analyser er nominell metode tryggest: avskrivninger (og dermed skatt) beregnes av historisk kostpris og inflasjonsjusteres ikke.'] },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k13-opsjoner-binomial', chapter: 13, level: 3, minutes: 20, examLike: 'Ikke gitt 2016–2025 – mulig joker (forelest, i formelsamling 2023)',
    title: 'Opsjonsprising: binomialmodellen og salg-kjøp-paritet',
    topic: 'Opsjoner',
    blurb: 'Replikerende portefølje (m og L), verdi av kjøpsopsjon og salgsopsjon – med foreleserens notasjon.',
    gen(R) {
      const P0 = R.pick([80, 100, 120, 150, 200, 250]), u = R.pick([1.2, 1.25, 1.4, 1.5, 2]), d = R.pick([0.5, 0.6, 0.75, 0.8]), rf = R.pick([0.02, 0.03, 0.04, 0.05]);
      const I = Math.round(P0 * R.pick([0.85, 0.9, 1, 1.05, 1.1]) / 5) * 5;
      const B = F.binomial1(P0, I, u, d, rf, 'call');
      const m = B.delta, L = B.B, K0 = B.value, S0 = K0 + I / (1 + rf) - P0;
      const p = R.pick([0.5, 0.6, 0.7]);
      const real = Math.max(0, P0 - I);
      return {
        text: `<p>En aksje omsettes i dag for <b>${n(P0)}</b>. Om ett år er kursen enten steget til <b>${n(B.Su, 2)}</b> (sannsynlighet ${n(p, 1)}) eller falt til <b>${n(B.Sd, 2)}</b> (sannsynlighet ${n(1 - p, 1)}). Risikofri rente er <b>${pct(rf, 0)}</b>. En europeisk kjøpsopsjon på aksjen har innløsningskurs <b>${n(I)}</b> og forfall om ett år.</p>`,
        parts: [
          { q: 'Hva er kjøpsopsjonens verdi ved forfall dersom kursen stiger (K<sub>u</sub>)?', answer: B.Cu, unit: 'kr', dec: 2, tol: { abs: 0.02 }, sol: f(`K<sub>u</sub> = max(0, ${n(B.Su, 2)} − ${n(I)}) = ${n(B.Cu, 2)}`) + `<p>K<sub>d</sub> = max(0, ${n(B.Sd, 2)} − ${n(I)}) = ${n(B.Cd, 2)}.</p>` },
          { q: 'Hvor stor andel av en aksje (m) inngår i porteføljen som replikerer opsjonen?', answer: m, unit: '', dec: 4, tol: { abs: 0.0006 },
            hint: 'm = (K<sub>u</sub> − K<sub>d</sub>) / (u·P<sub>0</sub> − d·P<sub>0</sub>).', sol: f(`m = ${frac(`${n(B.Cu, 2)} − ${n(B.Cd, 2)}`, `${n(B.Su, 2)} − ${n(B.Sd, 2)}`)} = ${n(m, 4)}`) },
          { q: 'Hvor stort er lånet (L) i den replikerende porteføljen? (Oppgi som negativt tall.)', answer: L, unit: 'kr', dec: 2, tol: { abs: 0.02 },
            sol: f(`L = −${frac(`m · d·P<sub>0</sub> − K<sub>d</sub>`, '1 + r<sub>f</sub>')} = −${frac(`${n(m, 4)} · ${n(B.Sd, 2)} − ${n(B.Cd, 2)}`, n(1 + rf, 2))} = ${n(L, 2)}`) },
          { q: 'Hva er verdien av kjøpsopsjonen i dag (K<sub>0</sub>)?', answer: K0, unit: 'kr', dec: 2, tol: { abs: 0.02 },
            sol: f(`K<sub>0</sub> = m · P<sub>0</sub> + L = ${n(m, 4)} · ${n(P0)} + (${n(L, 2)}) = ${n(K0, 2)}`) +
              `<p><b>Kontroll:</b> oppgang: ${n(m, 4)} · ${n(B.Su, 2)} + (${n(L * (1 + rf), 2)}) = ${n(m * B.Su + L * (1 + rf), 2)} ✓. Nedgang: ${n(m, 4)} · ${n(B.Sd, 2)} + (${n(L * (1 + rf), 2)}) = ${n(m * B.Sd + L * (1 + rf), 2)} ✓.</p>` +
              `<p>Realverdi = max(0, ${n(P0)} − ${n(I)}) = ${n(real)}, tidsverdi = ${n(K0 - real, 2)}. Merk at sannsynlighetene (${n(p, 1)}/${n(1 - p, 1)}) <b>ikke</b> brukes i prisingen.</p>` },
          { q: 'Hva er verdien av en salgsopsjon med samme innløsningskurs og forfall (S<sub>0</sub>)?', answer: S0, unit: 'kr', dec: 2, tol: { abs: 0.02 },
            hint: 'Salg-kjøp-paritet: salgsopsjon = kjøpsopsjon + nåverdi av innløsningskurs − aksjekurs.',
            sol: f(`S<sub>0</sub> = K<sub>0</sub> + ${frac('I', '1 + r<sub>f</sub>')} − P<sub>0</sub> = ${n(K0, 2)} + ${n(I / (1 + rf), 2)} − ${n(P0)} = ${n(S0, 2)}`) },
          { kind: 'text', q: 'Hvorfor inngår ikke sannsynligheten for kursoppgang i opsjonsprisen?',
            points: ['Opsjonen kan <b>replikeres</b> nøyaktig med m aksjer og et lån. To posisjoner med identisk kontantstrøm i alle tilstander må ha samme pris (ingen arbitrasje).',
              'Sannsynlighetene og investorenes risikoholdning er allerede bakt inn i dagens aksjekurs P<sub>0</sub>.', 'Opsjonsverdien øker med aksjekurs, volatilitet (større spredning mellom u og d), tid til forfall og rente – og faller med innløsningskursen (for en kjøpsopsjon).'] },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k13-opsjonsposisjoner', chapter: 13, level: 2, minutes: 15, examLike: 'Ikke gitt 2016–2025 – mulig joker',
    title: 'Opsjoner: gevinst, nullpunkt, giring og Black–Scholes',
    topic: 'Opsjoner',
    blurb: 'Gevinst ved forfall for kjøps- og salgsopsjoner, giringseffekt, og Black–Scholes-verdi.',
    gen(R) {
      const P = R.pick([120, 180, 250, 380, 520]), I = Math.round(P * R.pick([1.03, 1.05, 1.08]) / 5) * 5;
      const prem = Math.round(P * R.pick([0.04, 0.05, 0.06])), premP = Math.round(P * R.pick([0.08, 0.1, 0.12]));
      const PT = Math.round(P * R.pick([1.15, 1.2, 1.25]) / 5) * 5, PT2 = Math.round(P * R.pick([0.8, 0.85, 0.9]) / 5) * 5;
      const gainC = (Math.max(0, PT - I) - prem) * 100, gainP = (Math.max(0, I - PT2) - premP) * 100;
      const budget = P * 100, nOpt = budget / prem, retS = PT / P - 1, retO = (nOpt * Math.max(0, PT - I) - budget) / budget;
      const sigma = R.pick([0.2, 0.25, 0.3, 0.35]), rf = R.pick([0.02, 0.0275, 0.035, 0.04]), days = R.pick([51, 90, 120, 182]);
      const BS = F.blackScholes(P, I, rf, sigma, days / 365);
      return {
        text: `<p>En aksje omsettes for <b>${n(P)}</b>. En kjøpsopsjon med innløsningskurs <b>${n(I)}</b> koster <b>${n(prem)}</b> per aksje, og en salgsopsjon med samme innløsningskurs koster <b>${n(premP)}</b> per aksje. Én kontrakt gjelder 100 aksjer.</p>`,
        parts: [
          { q: `Du kjøper én kontrakt kjøpsopsjoner. Hva blir gevinsten dersom kursen ved bortfall er ${n(PT)}?`, answer: gainC, unit: 'kr', tol: { abs: 1 },
            sol: f(`(max(0, ${n(PT)} − ${n(I)}) − ${n(prem)}) · 100 = ${n(gainC)}`) + `<p>Maksimalt tap er premien: ${n(prem * 100)}.</p>` },
          { q: 'Ved hvilken aksjekurs går kjøperen av kjøpsopsjonen i null?', answer: I + prem, unit: 'kr', tol: { abs: 0.5 }, sol: f(`Innløsningskurs + premie = ${n(I)} + ${n(prem)} = ${n(I + prem)}`) },
          { q: `Du kjøper i stedet én kontrakt salgsopsjoner. Hva blir gevinsten dersom kursen ved bortfall er ${n(PT2)}?`, answer: gainP, unit: 'kr', tol: { abs: 1 },
            sol: f(`(max(0, ${n(I)} − ${n(PT2)}) − ${n(premP)}) · 100 = ${n(gainP)}`) + `<p>Nullpunkt: ${n(I)} − ${n(premP)} = ${n(I - premP)}. Maksimal gevinst (kurs → 0): ${n((I - premP) * 100)}.</p>` },
          { q: `Du har ${n(budget)} å investere. Hva blir avkastningen i prosent dersom du kjøper <b>kjøpsopsjoner</b> for hele beløpet og kursen blir ${n(PT)}?`, answer: retO, unit: '%', tol: { abs: 0.002 },
            hint: 'Antall opsjoner = beløp / premie.',
            sol: f(`Antall opsjoner = ${frac(n(budget), n(prem))} = ${n(nOpt, 2)}`) + f(`Gevinst = ${n(nOpt, 2)} · ${n(Math.max(0, PT - I))} − ${n(budget)} = ${n(nOpt * Math.max(0, PT - I) - budget)} → ${pct(retO, 1)}`) +
              `<p>Til sammenligning gir 100 aksjer ${pct(retS, 1)}. ${retO > retS ? 'Opsjoner gir <b>giring</b>: mye større utslag begge veier –' : `Her ender kursen så nær nullpunktet (${n(I + prem)}) at opsjonene gir lavere avkastning enn aksjene. Opsjoner gir likevel <b>giring</b> (større utslag begge veier):`} faller kursen under ${n(I)}, er hele beløpet tapt (−100 %).</p>` },
          { q: `Bruk Black–Scholes: aksjekurs ${n(P)}, innløsningskurs ${n(I)}, risikofri rente ${pct(rf, 2)}, standardavvik ${pct(sigma, 0)} og ${days} dager til bortfall (regn med 365 dager i året). Hva er verdien av kjøpsopsjonen?`, answer: BS.call, unit: 'kr', dec: 2, tol: { abs: 0.03 },
            hint: 'T = dager / 365. d₁ = [ln(P₀/I) + (r<sub>f</sub> + σ²/2)·T] / (σ√T), d₂ = d₁ − σ√T. Kjøpsopsjon = P₀·N(d₁) − I·e<sup>−r·T</sup>·N(d₂).',
            sol: table(['Størrelse', 'Verdi'], [['T', n(days / 365, 4)], ['d<sub>1</sub>', n(BS.d1, 4)], ['d<sub>2</sub>', n(BS.d2, 4)], ['N(d<sub>1</sub>)', n(BS.Nd1, 4)], ['N(d<sub>2</sub>)', n(BS.Nd2, 4)]]) +
              f(`K<sub>0</sub> = ${n(P)} · ${n(BS.Nd1, 4)} − ${n(I)} · e<sup>−${n(rf, 4)} · ${n(days / 365, 4)}</sup> · ${n(BS.Nd2, 4)} = ${n(BS.call, 2)}`) + '<p>Excel: <code>=NORMSFORDELING(d1)</code> gir N(d<sub>1</sub>). Bruk regnearket «Opsjonsprising» fra forelesningen som kontroll.</p>' },
          { q: 'Hva er verdien av salgsopsjonen ifølge Black–Scholes (salg-kjøp-paritet)?', answer: BS.put, unit: 'kr', dec: 2, tol: { abs: 0.03 },
            sol: f(`S<sub>0</sub> = K<sub>0</sub> + I · e<sup>−r·T</sup> − P<sub>0</sub> = ${n(BS.call, 2)} + ${n(I * Math.exp(-rf * days / 365), 2)} − ${n(P)} = ${n(BS.put, 2)}`) },
        ],
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
