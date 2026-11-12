/* Kapittel 4 – Obligasjoner og aksjer, modifisert internrente (kapittel-LF 4.13) og lisens eller egenproduksjon (kapittel-LF 4.11). */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table } = U;
  // Tall i Excel-formler: uten tusenskille (mellomrom gir feil i Excel).
  const xl = (v, d = 0) => n(v, d).replace(/\s/g, '');
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
            sol: `<p>YTM er den <i>ene</i> renten som gir samme kurs: <code>=RENTE(3;${face * c};-${xl(price, 2)};${face})</code> = <b>${pct(ytm, 2)}</b>.</p><p>YTM er et veid snitt av spotrentene og ligger nærmest 3-årsrenten fordi det meste av kontantstrømmen kommer i år 3.</p>` },
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
  // ==================================================================
  // Modifisert internrente (kap. 4 oppg. 13)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 4.13. sales[t-1] er salget i år t. */
  function mirCalc({ I, sales, vk, fk, r }) {
    const T = sales.length, cf = [-I].concat(sales.map((s) => s * (1 - vk) - fk));
    const npv = F.npv(r, cf), irr = F.irr(cf);
    const fvs = cf.slice(1).map((c, k) => c * Math.pow(1 + r, T - (k + 1))), fv = U.sum(fvs);
    const mir = Math.pow(fv / I, 1 / T) - 1;
    return { T, cf, npv, irr, fvs, fv, mir };
  }
  O._mirCalc = mirCalc;
  const mirFirms = [['Fjellbryggeriet AS', 'en ny ølserie'], ['Kystkjøkken AS', 'ferdigretter av fisk'], ['Nordlys Design AS', 'en serie lamper'], ['Trehus Vest AS', 'ferdighytter i moduler'], ['Bakeriet Sør AS', 'glutenfrie brød']];

  O.reg({
    id: 'k4-modifisert-internrente', chapter: 4, level: 2, minutes: 15, examLike: 'Kapitteloppgave 4.13 – ikke gitt som egen oppgave 2016–2025',
    title: 'Modifisert internrente: NNV, IR og MIR',
    topic: 'Prosjektanalyse før skatt',
    blurb: 'Kontantstrøm, nåverdi og internrente, sluttverdien av innbetalingene reinvestert til avkastningskravet, og den modifiserte internrenten (MODIR).',
    gen(R) { let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; } return t.task; },
    build(R) {
      const [firm, prod] = R.pick(mirFirms);
      const T = R.pick([4, 4, 5]), r = R.pick([0.10, 0.12, 0.15]), vk = R.pick([0.2, 0.25, 0.3, 0.35]);
      const I = R.int(6, 16) * 500000, fk = R.int(1, 4) * 100000;
      const s1 = Math.round(I * R.pick([0.45, 0.5, 0.55, 0.6]) / 25000) * 25000, s2 = Math.round(s1 * R.pick([1.2, 1.3, 1.4]) / 25000) * 25000, k1 = Math.floor(T / 2);
      const sales = U.range(1, T).map((t) => (t <= k1 ? s1 : s2));
      const c = mirCalc({ I, sales, vk, fk, r });
      if (!(c.npv > 0 && c.irr - r >= 0.04 && c.irr < 0.6)) return null;
      const yrs = U.range(1, T);
      const task = {
        text: `<p>${firm} vurderer å starte produksjon av ${prod}. Investeringen er <b>${n(I)}</b> i år 0, og prosjektet varer i <b>${T} år</b> uten restverdi. Variable kostnader er <b>${pct(vk, 0)}</b> av salget, og de betalbare faste kostnadene er <b>${n(fk)}</b> per år. Avkastningskravet er <b>${pct(r, 0)}</b>. Se bort fra skatt og arbeidskapital.</p>` +
          table(['År'].concat(yrs.map(String)), [['Salg'].concat(sales.map((s) => `<b>${n(s)}</b>`))]),
        parts: [
          { q: 'Hva er kontantstrømmen i år 1?', answer: c.cf[1], unit: 'kr',
            sol: f(`${n(sales[0])} · (1 − ${n(vk * 100)} %) − ${n(fk)} = ${n(sales[0] * (1 - vk))} − ${n(fk)} = ${n(c.cf[1])}`) },
          { q: 'Beregn prosjektets nåverdi (NNV).', answer: c.npv, unit: 'kr', tol: { abs: I * 0.001 },
            sol: U.cfTable([['Salg', [null].concat(sales)], ['Variable kostnader', [null].concat(sales.map((s) => -s * vk))], ['Faste kostnader', [null].concat(sales.map(() => -fk))], ['Investering', [-I]], ['Kontantstrøm', c.cf, 'sum']], T) +
              `<p><code>=NNV(${n(r * 100)}%; år 1–${T}) + år 0</code> = <b>${n(c.npv)}</b>.</p>` },
          { q: 'Beregn prosjektets internrente (IR).', answer: c.irr, unit: '%',
            sol: `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irr, 2)}</b>. Internrenten forutsetter at innbetalingene underveis kan plasseres til ${pct(c.irr, 2)}, altså langt over avkastningskravet på ${pct(r, 0)}.</p>` },
          { q: `Anta at innbetalingene reinvesteres til avkastningskravet fram til år ${T}. Hva er sluttverdien av innbetalingene i år ${T}?`, answer: c.fv, unit: 'kr', tol: { abs: I * 0.001 },
            hint: `Hver innbetaling forrentes med ${pct(r, 0)} fra året den kommer, til år ${T}. Innbetalingen i år ${T} forrentes ikke.`,
            sol: U.table(['År', 'Kontantstrøm', 'Faktor', `Sluttverdi år ${T}`], yrs.map((t) => [String(t), n(c.cf[t]), `${n(1 + r, 2)}<sup>${T - t}</sup>`, n(c.fvs[t - 1])]).concat([{ cells: ['Sum', '', '', n(c.fv)], cls: 'sum' }])) + `<p>Hver innbetaling ganges med ${n(1 + r, 2)} opphøyd i antall år fram til år ${T}.</p>` },
          { q: 'Beregn den modifiserte internrenten (MIR).', answer: c.mir, unit: '%',
            hint: 'Den modifiserte internrenten er renten som gjør investeringen i år 0 lik sluttverdien av innbetalingene.',
            sol: f(`MIR = ${frac(n(c.fv), n(I))}<sup>1/${T}</sup> − 1`) + f(`= <b>${pct(c.mir, 2)}</b>`) +
              `<p>I Excel: <code>=MODIR(kontantstrøm år 0–${T}; ${n(r * 100)}%; ${n(r * 100)}%)</code>. MIR ligger mellom kravet (${pct(r, 0)}) og IR (${pct(c.irr, 2)}), fordi innbetalingene her bare forrentes med kravet.</p>` },
          { kind: 'text', q: 'Hvorfor er den modifiserte internrenten lavere enn internrenten, og når er det et poeng å bruke den?',
            points: [`<b>Reinvesteringsrenten</b>: internrenten forutsetter at innbetalingene underveis plasseres til internrenten selv (${pct(c.irr, 1)}). MIR forutsetter at de plasseres til avkastningskravet (${pct(r, 0)}), som er mer realistisk.`,
              '<b>Samme konklusjon om lønnsomhet</b>: MIR er over kravet når NNV er positiv, så den sier ikke noe annet om prosjektet skal gjennomføres.',
              '<b>Flere internrenter</b>: skifter kontantstrømmen fortegn flere ganger, kan det finnes flere internrenter. MIR gir ett svar.',
              '<b>Rangering</b>: ved gjensidig utelukkende prosjekter er NNV fortsatt beslutningsregelen. Ulik størrelse kan gi feil rangering også med MIR.'] },
        ],
      };
      return { p: { I, sales, vk, fk, r }, c, task };
    },
  });

  // ==================================================================
  // Lisens eller egenproduksjon (kap. 4 oppg. 11)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 4.11. price[t-1] og qty[t-1] gjelder år t. */
  function licCalc({ price, qty, roy, vek, fk, M, AK, r, dP }) {
    const T = price.length, rev = price.map((p, k) => p * qty[k]);
    const royalty = rev.map((x) => x * roy), nvLic = F.npv(r, [0].concat(royalty));
    const cf = [-(M + AK)].concat(qty.map((q, k) => q * (price[k] - vek) - fk + (k === T - 1 ? AK : 0)));
    const npv = F.npv(r, cf), irr = F.irr(cf);
    const dRev = dP ? qty.map((q, k) => q * dP[k]) : null, dNpv = dP ? F.npv(r, [0].concat(dRev)) : null;
    return { T, rev, royalty, nvLic, cf, npv, irr, diff: npv - nvLic, dRev, dNpv, dLic: dP ? dNpv * roy : null };
  }
  O._licCalc = licCalc;
  const licFirms = [['Sykkelfabrikken Nord AS', 'en ny elsykkelmotor', 'en stor tysk produsent'], ['Lydverk AS', 'en trådløs høyttaler', 'en svensk elektronikkjede'], ['Fjordtekstil AS', 'et nytt regntøy', 'en internasjonal klesprodusent'], ['Kaldt Vann AS', 'en vannrenser for hytter', 'en dansk produsent']];

  O.reg({
    id: 'k4-lisens-egenproduksjon', chapter: 4, level: 2, minutes: 25, examLike: 'Kapitteloppgave 4.11 – ikke gitt som egen oppgave 2016–2025',
    title: 'Lisens eller egenproduksjon: nåverdi av royalty mot NNV av egen produksjon',
    topic: 'Prosjektrangering',
    blurb: 'Nåverdien av royalty fra en lisens, kontantstrøm, NNV og internrente for egen produksjon med maskin og arbeidskapital, og hva reviderte priser gjør med nåverdien.',
    gen(R) { let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; } return t.task; },
    build(R) {
      const [firm, prod, buyer] = R.pick(licFirms);
      const T = 4, r = R.pick([0.10, 0.12, 0.13, 0.15]), roy = R.pick([0.08, 0.10, 0.12, 0.15]);
      const p0 = R.int(10, 16) * 10, pf = R.pick([[1, 0.92, 0.92, 0.77], [1, 1, 0.9, 0.8], [1, 0.95, 0.9, 0.85]]);
      const price = pf.map((x) => Math.round(p0 * x / 5) * 5);
      const q0 = R.int(8, 15) * 10000, qf = R.pick([[1, 1.2, 1.2, 1.1], [1, 1.1, 1.2, 1], [1, 1.25, 1.3, 1.15]]);
      const qty = qf.map((x) => Math.round(q0 * x / 1000) * 1000);
      const vek = Math.round(p0 * R.pick([0.4, 0.45, 0.5]) / 5) * 5;
      const fk = Math.round(q0 * (p0 - vek) * R.pick([0.45, 0.6, 0.75]) / 100000) * 100000;
      const M = Math.round(q0 * p0 * R.pick([0.2, 0.25, 0.3]) / 100000) * 100000, AK = Math.round(q0 * p0 * R.pick([0.1, 0.12, 0.15]) / 100000) * 100000;
      const dP = R.pick([[10, 10, 0, -10], [5, 10, 5, -15], [15, 10, 0, -10], [-5, 0, 10, 10]]);
      const c = licCalc({ price, qty, roy, vek, fk, M, AK, r, dP });
      if (!(c.npv > 0 && c.irr > r + 0.05 && c.irr < 1.5 && Math.abs(c.diff) > 0.05 * c.nvLic && M > 0 && AK > 0 && fk > 0)) return null;
      const own = c.diff > 0, yrs = U.range(1, T), newP = price.map((p, k) => p + dP[k]);
      const task = {
        text: `<p>${firm} har utviklet ${prod}. ${buyer[0].toUpperCase() + buyer.slice(1)} tilbyr seg å produsere og selge produktet på lisens og betale <b>${pct(roy, 0)}</b> av omsetningen i royalty. Alternativet er å produsere selv. Da må bedriften kjøpe en maskin til <b>${n(M)}</b> og binde <b>${n(AK)}</b> i arbeidskapital i år 0. Arbeidskapitalen frigjøres i år ${T}, og maskinen har ingen restverdi. Variable kostnader er <b>${n(vek)}</b> per enhet, og de faste kostnadene øker med <b>${n(fk)}</b> per år. Avkastningskravet er <b>${pct(r, 0)}</b>. Pris og mengde er de samme med lisens og egenproduksjon. Se bort fra skatt.</p>` +
          table(['År'].concat(yrs.map(String)), [['Pris per enhet'].concat(price.map((x) => `<b>${n(x)}</b>`)), ['Mengde'].concat(qty.map((x) => `<b>${n(x)}</b>`))]),
        parts: [
          { q: 'Hva er nåverdien av royaltyinntektene med lisens?', answer: c.nvLic, unit: 'kr', tol: { abs: c.nvLic * 0.001 },
            hint: 'Royaltyen er en andel av omsetningen (pris · mengde). Lisensen krever ingen investering.',
            sol: U.cfTable([['Omsetning', [null].concat(c.rev)], [`Royalty (${pct(roy, 0)})`, [null].concat(c.royalty), 'sum']], T) + `<p><code>=NNV(${n(r * 100)}%; royalty år 1–${T})</code> = <b>${n(c.nvLic)}</b>.</p>` },
          { q: 'Hva er kontantstrømmen i år 1 ved egenproduksjon?', answer: c.cf[1], unit: 'kr',
            sol: f(`${n(qty[0])} · (${n(price[0])} − ${n(vek)}) − ${n(fk)} = ${n(qty[0] * (price[0] - vek))} − ${n(fk)} = ${n(c.cf[1])}`) },
          { q: 'Beregn NNV for egenproduksjon.', answer: c.npv, unit: 'kr', tol: { abs: c.nvLic * 0.001 },
            sol: U.cfTable([['Omsetning', [null].concat(c.rev)], ['Variable kostnader', [null].concat(qty.map((q) => -q * vek))], ['Økte faste kostnader', [null].concat(qty.map(() => -fk))], ['Maskin', [-M]], ['Arbeidskapital', [-AK].concat(yrs.map((t) => (t === T ? AK : null)))], ['Kontantstrøm', c.cf, 'sum']], T) +
              `<p><code>=NNV(${n(r * 100)}%; år 1–${T}) + år 0</code> = <b>${n(c.npv)}</b>.</p>` },
          { q: 'Beregn internrenten for egenproduksjon.', answer: c.irr, unit: '%',
            sol: `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irr, 2)}</b>. Internrenten kan ikke sammenlignes med lisensen, som ikke har noen investering og derfor ingen internrente.</p>` },
          { q: 'Hvor mye mer er egenproduksjon verdt enn lisens, målt i nåverdi? (Negativt hvis lisens er best.)', answer: c.diff, unit: 'kr', tol: { abs: c.nvLic * 0.001 },
            sol: f(`${n(c.npv)} − ${n(c.nvLic)} = <b>${n(c.diff)}</b>`) + `<p>${own ? 'Egenproduksjon' : 'Lisens'} gir høyest nåverdi. Begge alternativene er regnet mot det samme avkastningskravet, så nåverdiene kan sammenlignes direkte.</p>` },
          { q: `Markedsavdelingen reviderer prisene til ${newP.map((x) => '<b>' + n(x) + '</b>').join(', ')} i år 1–${T}, med de samme mengdene. Hvor mye endres NNV for egenproduksjon?`, answer: c.dNpv, unit: 'kr', tol: { abs: c.nvLic * 0.001 },
            hint: 'Når mengden og de variable kostnadene per enhet er de samme, endres kontantstrømmen bare med prisendringen ganger mengden.',
            sol: U.cfTable([['Prisendring', [null].concat(dP)], ['Endring i omsetning (= endring i kontantstrøm)', [null].concat(c.dRev), 'sum']], T) +
              `<p>Nåverdien endres med <b>${n(c.dNpv)}</b>. Med lisens endres nåverdien bare med royaltyandelen: ${pct(roy, 0)} · ${n(c.dNpv)} = ${n(c.dLic)}. Egenproduksjon tar hele gevinsten og hele tapet ved prisendringer.</p>` },
          { kind: 'text', q: 'Hvilke forhold utenom tallene bør trekke inn i valget mellom lisens og egenproduksjon?',
            points: ['<b>Risiko</b>: egenproduksjon tar hele risikoen for pris og salg, og har faste kostnader og kapital bundet. Royaltyen svinger bare med omsetningen.',
              '<b>Kapital</b>: egenproduksjon binder kapital i maskin og arbeidskapital, som kanskje kunne vært brukt bedre andre steder.',
              '<b>Kompetanse og kontroll</b>: egen produksjon gir kontroll over kvalitet og kunnskap. Med lisens kan lisenstakeren bygge opp kompetanse og bli en konkurrent.',
              '<b>Tidshorisont</b>: beregningen dekker bare de oppgitte årene. Lisensavtalens lengde og hva som skjer etterpå, kan endre bildet.'] },
        ],
      };
      return { p: { price, qty, roy, vek, fk, M, AK, r, dP }, c, task };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
