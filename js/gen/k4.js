/* Kapittel 4 – Obligasjoner og aksjer. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table } = U;
  const issuers = ['NordEnergi ASA', 'Vestkraft AS', 'Fjordbygg ASA', 'Havbruk Nord ASA', 'Sørlandsbanken ASA', 'Grønn Transport AS'];

  const bondTable = (face, c, y, N) => {
    const rows = []; let sumPV = 0, sumW = 0;
    for (let t = 1; t <= N; t++) {
      const cf = face * c + (t === N ? face : 0), pv = cf / Math.pow(1 + y, t);
      sumPV += pv; sumW += t * pv;
      rows.push([t, n(cf, 2), n(1 / Math.pow(1 + y, t), 4), n(pv, 2), n(t * pv, 2)]);
    }
    rows.push({ cells: ['Sum', '', '', n(sumPV, 2), n(sumW, 2)], cls: 'sum' });
    return table(['År (t)', 'Kontantstrøm', 'Diskonteringsfaktor', 'Nåverdi', 't · nåverdi'], rows, { allNum: true });
  };

  // ------------------------------------------------------------------
  O.reg({
    id: 'k4-obligasjon-kurs-ytm-durasjon', chapter: 4, level: 2, minutes: 20, examLike: 'H2025 oppg. 2',
    title: 'Obligasjon: kurs, YTM, renteendring og durasjon',
    topic: 'Obligasjoner',
    blurb: 'Den komplette obligasjonsoppgaven: kurs, effektiv rente til forfall, kursfølsomhet og Macaulay-durasjon.',
    gen(R) {
      const issuer = R.pick(issuers), face = R.pick([1000, 1000, 1000, 10000, 100000]);
      const N = R.int(3, 6);
      const c = R.int(2, 8) / 100;
      let y = R.int(3, 11) / 100; if (y === c) y += 0.01;
      let y2 = y + R.pick([-0.03, -0.02, -0.01, 0.01, 0.02, 0.03]); if (y2 <= 0.005) y2 = y + 0.02;
      const price = F.bondPrice(face, c, y, N);
      const mkt = U.round(price * (1 + R.pick([-0.06, -0.04, -0.03, 0.03, 0.04, 0.05])) / (face / 100), 0) * (face / 100);
      const ytm = F.bondYtm(mkt, face, c, N);
      const price2 = F.bondPrice(face, c, y2, N);
      const D = F.duration(face, c, y, N), MD = D / (1 + y);
      const approx = -MD * (y2 - y);
      const exact = price2 / price - 1;
      const dir = y2 < y ? 'faller' : 'stiger';
      return {
        text: `<p>Du arbeider som analytiker i et investeringsselskap og vurderer en obligasjon utstedt av ${issuer}. Obligasjonen betaler årlig kupong.</p>` +
          table(['Utsteder', 'Pålydende', 'Kupongrente', 'Løpetid (år)', 'Avkastningskrav (markedsrente)'], [[issuer, n(face), pct(c, 0), N, pct(y, 0)]]),
        parts: [
          { q: `Beregn kursen på obligasjonen gitt en markedsrente på ${pct(y, 0)}.`, answer: price, unit: 'kr', dec: 2, tol: { abs: face * 0.0006, rel: 0 },
            hint: 'Kursen er nåverdien av alle kuponger pluss pålydende, diskontert med markedsrenten.',
            sol: f(`Kurs = ${n(face * c)} · A(${n(y * 100)} %, ${N}) + ${frac(n(face), `(1 + ${n(y, 2)})<sup>${N}</sup>`)} = ${n(face * c * F.annuityFactor(y, N), 2)} + ${n(face / Math.pow(1 + y, N), 2)} = ${n(price, 2)}`) +
              `<p>Kupongrenten (${pct(c, 0)}) er ${c < y ? 'lavere' : 'høyere'} enn markedsrenten (${pct(y, 0)}), så obligasjonen omsettes til ${c < y ? '<b>underkurs</b>' : '<b>overkurs</b>'}.</p>` +
              `<p>Excel: <code>=NÅVERDI(${n(y * 100)}%;${N};-${face * c};-${face})</code></p>` },
          { q: `Anta at obligasjonen omsettes i dag for kr ${n(mkt)}. Beregn avkastning til forfall (YTM).`, answer: ytm, unit: '%',
            hint: 'YTM er internrenten i kontantstrømmen: −kurs i dag, kuponger hvert år og pålydende til slutt.',
            sol: `<p>Kontantstrøm: −${n(mkt)} i dag, ${n(face * c)} i år 1–${N - 1}, og ${n(face * c + face)} i år ${N}.</p>` +
              `<p>Excel: <code>=RENTE(${N};${face * c};-${mkt};${face})</code> eller <code>=IR(...)</code> gir <b>${pct(ytm, 2)}</b>.</p>` +
              `<p>Siden kursen ${n(mkt)} er ${mkt < price ? 'lavere' : 'høyere'} enn verdien fra a) (${n(price, 2)}), er YTM ${mkt < price ? 'høyere' : 'lavere'} enn ${pct(y, 0)}.</p>` },
          { q: `Beregn ny kurs dersom avkastningskravet ${dir} til ${pct(y2, 0)}.`, answer: price2, unit: 'kr', dec: 2, tol: { abs: face * 0.0006, rel: 0 },
            sol: f(`Kurs = ${n(face * c)} · A(${n(y2 * 100)} %, ${N}) + ${frac(n(face), `(1 + ${n(y2, 2)})<sup>${N}</sup>`)} = ${n(price2, 2)}`) +
              `<p>Kursen ${price2 > price ? 'stiger' : 'faller'} fra ${n(price, 2)} til ${n(price2, 2)} (${pct(exact, 2)}).</p>` },
          { kind: 'text', q: 'Kommenter hvordan kursen påvirkes av renteendringen, og hvorfor.',
            points: ['Kurs og markedsrente beveger seg <b>motsatt</b> vei: de fremtidige kontantstrømmene er faste, og når de diskonteres med lavere rente blir nåverdien høyere (og omvendt).',
              'Når markedsrenten faller, blir den faste kupongen mer attraktiv enn det nye obligasjoner tilbyr → investorer betaler mer.',
              'Effekten er sterkere jo lengre løpetid/durasjon og jo lavere kupong obligasjonen har (renterisiko).',
              'Kupongrente = markedsrente gir pari kurs; kupong &lt; markedsrente gir underkurs; kupong &gt; markedsrente gir overkurs.'] },
          { q: `Beregn Macaulay-durasjonen ved avkastningskravet på ${pct(y, 0)}.`, answer: D, unit: 'år', dec: 2, tol: { abs: 0.012, rel: 0 },
            hint: 'Durasjon = sum(t · nåverdi av kontantstrøm t) / kurs.',
            sol: bondTable(face, c, y, N) + f(`Durasjon = ${frac(n(D * price, 2), n(price, 2))} = ${n(D, 2)} år`) +
              '<p>Durasjonen er den veide gjennomsnittlige tiden til kontantstrømmene mottas, med nåverdiandeler som vekter. Den er alltid kortere enn løpetiden for en kupongobligasjon.</p>' },
          { q: `Bruk modifisert durasjon til å anslå den prosentvise kursendringen når renten endres fra ${pct(y, 0)} til ${pct(y2, 0)}.`, answer: approx, unit: '%',
            hint: 'Modifisert durasjon = durasjon / (1 + r). Kursendring ≈ −modifisert durasjon · renteendring.',
            sol: f(`D<sub>mod</sub> = ${frac(n(D, 3), `1 + ${n(y, 2)}`)} = ${n(MD, 3)}`) + f(`ΔP/P ≈ −${n(MD, 3)} · (${n((y2 - y) * 100, 0)} %-poeng) = ${pct(approx, 2)}`) +
              `<p>Eksakt endring fra c) er ${pct(exact, 2)}. Avviket skyldes konveksitet – durasjon er en lineær tilnærming som fungerer best for små renteendringer.</p>` },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k4-spotrenter-terminrenter', chapter: 4, level: 3, minutes: 18,
    title: 'Spotrenter, terminrenter og rentens terminstruktur',
    topic: 'Obligasjoner',
    blurb: 'Pris en kupongobligasjon med spotrenter, og utled implisitte terminrenter.',
    gen(R) {
      const up = R.bool(0.7);
      const s1 = R.int(20, 50, 5) / 1000, d1 = R.int(3, 10) / 1000, d2 = R.int(2, 8) / 1000;
      const s = up ? [s1, s1 + d1, s1 + d1 + d2] : [s1 + d1 + d2, s1 + d1, s1];
      const face = 1000, c = R.int(3, 8) / 100;
      const price = F.bondPriceSpot(face, c, s);
      const f12 = F.forwardRate(s[0], 1, s[1], 2), f23 = F.forwardRate(s[1], 2, s[2], 3);
      const ytm = F.bondYtm(price, face, c, 3);
      const zero = face / Math.pow(1 + s[2], 3);
      return {
        text: '<p>I markedet observeres følgende spotrenter (effektive årsrenter på nullkupongobligasjoner):</p>' +
          table(['Løpetid', '1 år', '2 år', '3 år'], [['Spotrente', pct(s[0], 1), pct(s[1], 1), pct(s[2], 1)]]),
        parts: [
          { q: `Hva er kursen på en nullkupongobligasjon med pålydende ${n(face)} og 3 års løpetid?`, answer: zero, unit: 'kr', dec: 2, tol: { abs: 0.6, rel: 0 },
            sol: f(`Kurs = ${frac(n(face), `(1 + ${n(s[2], 3)})<sup>3</sup>`)} = ${n(zero, 2)}`) },
          { q: `Hva er kursen på en 3-årig obligasjon med pålydende ${n(face)} og årlig kupong på ${pct(c, 0)}?`, answer: price, unit: 'kr', dec: 2, tol: { abs: 0.6, rel: 0 },
            hint: 'Hver kontantstrøm diskonteres med spotrenten for sin egen løpetid.',
            sol: f(`Kurs = ${frac(n(face * c), n(1 + s[0], 3))} + ${frac(n(face * c), `${n(1 + s[1], 3)}<sup>2</sup>`)} + ${frac(n(face * c + face), `${n(1 + s[2], 3)}<sup>3</sup>`)} = ${n(price, 2)}`) },
          { q: 'Hva er obligasjonens avkastning til forfall (YTM)?', answer: ytm, unit: '%',
            sol: `<p>YTM er den <i>ene</i> renten som gir samme kurs: <code>=RENTE(3;${face * c};-${n(price, 2)};${face})</code> = <b>${pct(ytm, 2)}</b>.</p><p>YTM er et veid snitt av spotrentene og ligger nærmest 3-årsrenten fordi det meste av kontantstrømmen kommer i år 3.</p>` },
          { q: 'Hva er den implisitte terminrenten for år 2 (fra tidspunkt 1 til 2)?', answer: f12, unit: '%',
            hint: '(1 + s₂)² = (1 + s₁)(1 + f₁,₂).',
            sol: f(`<sub>1</sub>f<sub>2</sub> = ${frac(`(1 + ${n(s[1], 3)})<sup>2</sup>`, `1 + ${n(s[0], 3)}`)} − 1 = ${pct(f12, 2)}`) },
          { q: 'Hva er den implisitte terminrenten for år 3 (fra tidspunkt 2 til 3)?', answer: f23, unit: '%',
            sol: f(`<sub>2</sub>f<sub>3</sub> = ${frac(`(1 + ${n(s[2], 3)})<sup>3</sup>`, `(1 + ${n(s[1], 3)})<sup>2</sup>`)} − 1 = ${pct(f23, 2)}`) },
          { kind: 'text', q: `Rentekurven er her ${up ? 'stigende' : 'fallende'}. Hva sier forventningshypotesen om markedets forventninger til fremtidige korte renter?`,
            points: [`Ifølge forventningshypotesen er terminrentene lik markedets forventede fremtidige spotrenter. En ${up ? 'stigende' : 'fallende'} kurve tyder på at markedet venter ${up ? 'høyere' : 'lavere'} korte renter fremover.`,
              'Likviditetspremieteorien: investorer krever en premie for å binde penger lenge, så en stigende kurve kan også skyldes likviditetspremie og ikke bare renteforventninger.',
              'Terminrenten er den renten som gjør investoren indifferent mellom én lang plassering og en rullering av korte plasseringer.'] },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k3-aksje-gordon', chapter: 3, level: 2, minutes: 15,
    title: 'Aksjeverdsettelse med dividendemodellen (Gordon)',
    topic: 'Aksjer',
    blurb: 'Konstant vekst, implisitt avkastningskrav og totrinns vekst.',
    gen(R) {
      const d0 = R.int(20, 120, 5) / 10, g = R.int(2, 5) / 100, k = g + R.int(4, 9) / 100;
      const d1 = d0 * (1 + g), p0 = F.gordon(d1, k, g);
      const mkt = U.round(p0 * R.pick([0.8, 0.85, 0.9, 1.1, 1.2]), 0);
      const kImp = d1 / mkt + g;
      const gHigh = R.int(8, 15) / 100;
      const D = [d0 * (1 + gHigh), d0 * (1 + gHigh) ** 2, d0 * (1 + gHigh) ** 3];
      const d4 = D[2] * (1 + g), p3 = d4 / (k - g);
      const p0two = D[0] / (1 + k) + D[1] / (1 + k) ** 2 + (D[2] + p3) / (1 + k) ** 3;
      const p1 = p0 * (1 + g);
      return {
        text: `<p>Et selskap har nettopp utbetalt et utbytte på <b>${n(d0, 2)}</b> kr per aksje (D<sub>0</sub>). Utbyttet forventes å vokse med <b>${pct(g, 0)}</b> årlig i all fremtid. Aksjonærenes avkastningskrav er <b>${pct(k, 0)}</b>.</p>`,
        parts: [
          { q: 'Hva er aksjens verdi i dag?', answer: p0, unit: 'kr', dec: 2, tol: { abs: 0.06, rel: 0.001 },
            hint: 'Gordons formel bruker <i>neste års</i> utbytte D₁ = D₀(1 + g).',
            sol: f(`D<sub>1</sub> = ${n(d0, 2)} · ${n(1 + g, 2)} = ${n(d1, 3)}`) + f(`P<sub>0</sub> = ${frac('D<sub>1</sub>', 'k − g')} = ${frac(n(d1, 3), `${n(k, 2)} − ${n(g, 2)}`)} = ${n(p0, 2)} kr`) +
              '<div class="callout warn">Klassisk feil: å bruke D<sub>0</sub> i telleren. Formelen krever utbyttet som kommer om ett år.</div>' },
          { q: `Aksjen omsettes på børsen for ${n(mkt)} kr. Hvilken forventet avkastning priser markedet inn?`, answer: kImp, unit: '%',
            hint: 'Løs Gordons formel for k: k = D₁/P₀ + g.',
            sol: f(`k = ${frac(n(d1, 3), n(mkt))} + ${n(g, 2)} = ${pct(d1 / mkt, 2)} + ${pct(g, 0)} = ${pct(kImp, 2)}`) +
              `<p>Direkteavkastning + vekst. Siden ${pct(kImp, 2)} er ${kImp > k ? 'høyere' : 'lavere'} enn kravet på ${pct(k, 0)}, er aksjen ${kImp > k ? '<b>underpriset</b> (kjøp)' : '<b>overpriset</b>'} gitt dine forutsetninger.</p>` },
          { q: 'Hva forventes aksjekursen å være om ett år (rett etter utbetalingen av D₁), gitt verdien fra a)?', answer: p1, unit: 'kr', dec: 2, tol: { abs: 0.06, rel: 0.001 },
            sol: f(`P<sub>1</sub> = ${frac('D<sub>2</sub>', 'k − g')} = P<sub>0</sub> · (1 + g) = ${n(p0, 2)} · ${n(1 + g, 2)} = ${n(p1, 2)} kr`) + '<p>Med konstant vekst vokser kursen i samme takt som utbyttet.</p>' },
          { q: `Anta i stedet at utbyttet vokser med ${pct(gHigh, 0)} de tre første årene, og deretter ${pct(g, 0)} i all fremtid. Hva er aksjens verdi i dag?`, answer: p0two, unit: 'kr', dec: 2, tol: { abs: 0.1, rel: 0.002 },
            hint: 'Regn ut D₁–D₃ eksplisitt. Bruk Gordon på tidspunkt 3 for alt som kommer etterpå, og diskonter alt til i dag.',
            sol: table(['', 'År 1', 'År 2', 'År 3'], [['Utbytte', n(D[0], 3), n(D[1], 3), n(D[2], 3)], ['Terminalverdi P<sub>3</sub>', '', '', n(p3, 2)], ['Nåverdi', n(D[0] / (1 + k), 2), n(D[1] / (1 + k) ** 2, 2), n((D[2] + p3) / (1 + k) ** 3, 2)]]) +
              f(`P<sub>3</sub> = ${frac(`D<sub>4</sub>`, 'k − g')} = ${frac(`${n(D[2], 3)} · ${n(1 + g, 2)}`, `${n(k, 2)} − ${n(g, 2)}`)} = ${n(p3, 2)}`) + f(`P<sub>0</sub> = ${n(p0two, 2)} kr`) },
        ],
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
