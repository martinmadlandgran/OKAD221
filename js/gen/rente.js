/* Kapittel 2 – Rentesregning / finansmatematikk. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table, cfTable } = U;
  // Tall i Excel-formler: uten tusenskille (mellomrom gir feil i Excel).
  const xl = (v, d = 0) => n(v, d).replace(/\s/g, '');

  const stores = ['Power', 'Elkjøp', 'Komplett', 'NetOnNet', 'Eplehuset'];
  const products = [['en MacBook Air', 15490], ['en ny TV', 12990], ['en gaming-PC', 21990], ['en vaskemaskin', 8990], ['et kamera', 17490], ['en elsykkel', 24990], ['en mobiltelefon', 11490]];

  // ------------------------------------------------------------------
  O.reg({
    id: 'k3-effektiv-rente-grunn', chapter: 3, level: 1, minutes: 10,
    title: 'Nominell og effektiv rente, nåverdi og sluttverdi',
    topic: 'Rentesregning',
    blurb: 'Grunnleggende omregning mellom nominell rente, terminrente og effektiv årsrente, pluss enkel diskontering.',
    gen(R) {
      const nom = R.int(40, 180, 5) / 1000;       // 4,0–18,0 %
      const amount = R.int(50, 900, 10) * 1000;
      const yrs = R.int(3, 15);
      const r = R.int(3, 12) / 100;
      const effM = F.effFromNom(nom, 12), effQ = F.effFromNom(nom, 4), effC = F.effContinuous(nom);
      const pv = F.pv(amount, r, yrs);
      const dbl = Math.log(2) / Math.log(1 + r);
      const infl = R.int(15, 40, 5) / 1000;
      const real = F.realRate(r, infl);
      return {
        text: `<p>En bank tilbyr et lån med nominell årsrente på <b>${pct(nom, 1)}</b>.</p>`,
        parts: [
          { q: 'Hva er effektiv årsrente dersom renten kapitaliseres <b>månedlig</b>?', answer: effM, unit: '%',
            hint: 'Terminrente = nominell rente / antall terminer. Effektiv rente = (1 + terminrente)<sup>m</sup> − 1.',
            sol: f(`r<sub>eff</sub> = (1 + ${frac(n(nom, 4), '12')})<sup>12</sup> − 1 = ${pct(effM, 2)}`) },
          { q: 'Hva er effektiv årsrente dersom renten kapitaliseres <b>kvartalsvis</b>?', answer: effQ, unit: '%',
            sol: f(`r<sub>eff</sub> = (1 + ${frac(n(nom, 4), '4')})<sup>4</sup> − 1 = ${pct(effQ, 2)}`) + '<p>Færre kapitaliseringer per år gir lavere effektiv rente.</p>' },
          { q: 'Hva er effektiv årsrente ved <b>kontinuerlig</b> forrentning?', answer: effC, unit: '%',
            sol: f(`r<sub>eff</sub> = e<sup>${n(nom, 4)}</sup> − 1 = ${pct(effC, 2)}`) + '<p>Kontinuerlig forrentning er den øvre grensen for effektiv rente.</p>' },
          { q: `Du skal motta ${n(amount)} kr om ${yrs} år. Hva er nåverdien når avkastningskravet er ${pct(r, 0)}?`, answer: pv, unit: 'kr',
            sol: f(`NV = ${frac(n(amount), `(1 + ${n(r, 2)})<sup>${yrs}</sup>`)} = ${n(pv)} kr`) + `<p>Excel: <code>=NÅVERDI(${n(r * 100)}%;${yrs};0;-${amount})</code></p>` },
          { q: `Hvor mange år tar det å doble et beløp til ${pct(r, 0)} årlig rente?`, answer: dbl, unit: 'år', dec: 2,
            hint: 'Løs (1 + r)<sup>n</sup> = 2 for n ved hjelp av logaritmer.',
            sol: f(`n = ${frac('ln 2', `ln(1 + ${n(r, 2)})`)} = ${n(dbl, 2)} år`) + `<p>Excel: <code>=PERIODER(${n(r * 100)}%;0;-1;2)</code></p>` },
          { q: `Den nominelle renten er ${pct(r, 0)} og inflasjonen ${pct(infl, 1)}. Hva er realrenten?`, answer: real, unit: '%',
            sol: f(`r<sub>real</sub> = ${frac(`1 + ${n(r, 2)}`, `1 + ${n(infl, 3)}`)} − 1 = ${pct(real, 2)}`) + '<p>Merk: realrenten er <i>ikke</i> nøyaktig lik nominell rente minus inflasjon.</p>' },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k7-rentefri-kreditt', chapter: 7, level: 2, minutes: 12, examLike: 'H2025 oppg. 3a',
    title: '«Rentefri» kreditt – effektiv årsrente',
    topic: 'Effektiv rente',
    blurb: 'Kontantstrøm med gebyrer og internrente per måned, omregnet til effektiv årsrente. Gjenganger på eksamen.',
    gen(R) {
      const store = R.pick(stores); const [prod, P] = R.pick(products);
      const fee = R.pick([39, 45, 49, 59, 65]);
      const m = R.pick([3, 6, 9, 12]);
      const E = R.pick([199, 249, 299, 399, 495]);
      const cfs = [P]; for (let t = 1; t <= m; t++) cfs.push(-fee - (t === 1 ? E : 0) - (t === m ? P : 0));
      const rm = F.irr(cfs, 0, 1); const eff = F.effFromPeriod(rm, 12);
      const cfs0 = [P - E]; for (let t = 1; t <= m; t++) cfs0.push(-fee - (t === m ? P : 0));
      const rm0 = F.irr(cfs0, 0, 1); const eff0 = F.effFromPeriod(rm0, 12);
      const head = ['Måned']; const row = ['Kontantstrøm'];
      const show = m <= 6 ? U.range(0, m) : [0, 1, 2, '…', m - 1, m];
      show.forEach((t) => { head.push(String(t)); row.push(t === '…' ? '…' : n(cfs[t])); });
      return {
        text: `<p>Hos ${store} vurderer du å kjøpe ${prod}. Kontantprisen er <b>${n(P)}</b>. ${store} tilbyr en rentefri kredittavtale over <b>${m} måneder</b>. Du betaler kun et administrasjonsgebyr på <b>${fee}</b> månedlig i ${m} måneder med første betaling om 1 måned, og sammen med den første betalingen må du betale et etableringsgebyr på <b>${E}</b>. Etter ${m} måneder betaler du varen.</p>`,
        parts: [
          { q: 'Hva er internrenten <b>per måned</b> for denne avtalen? Angi svaret med 3 desimaler.', answer: rm, unit: '%', dec: 3, tol: { abs: 0.00002 },
            hint: 'Sett opp kontantstrømmen sett fra din side: du «mottar» kontantprisen i dag (du slipper å betale), og betaler gebyrer underveis og hele prisen til slutt.',
            sol: '<p>Kontantstrømmen (kreditten du får = kontantprisen du slipper å betale i dag):</p>' + table(head, [row]) +
              `<p>Betaling måned 1 = ${fee} + ${E} = ${n(fee + E)}. Siste betaling = ${fee} + ${n(P)} = ${n(fee + P)}.</p>` +
              `<p>Internrenten per måned finnes med <code>=IR(kontantstrøm)</code> i Excel (eller prøving og feiling): <b>${pct(rm, 3)}</b>.</p>` },
          { q: 'Hvilken <b>effektiv årsrente</b> innebærer avtalen? Angi svaret med 2 desimaler.', answer: eff, unit: '%',
            sol: f(`r<sub>eff</sub> = (1 + ${n(rm, 6)})<sup>12</sup> − 1 = ${pct(eff, 2)}`) +
              '<div class="callout warn">Vanlig feil: å gange månedsrenten med 12. Det gir <i>nominell</i> årsrente (' + pct(rm * 12, 2) + '), ikke effektiv.</div>' },
          { q: `Anta i stedet at etableringsgebyret på ${E} må betales <b>i dag</b> (ved kjøpet). Hva blir effektiv årsrente da?`, answer: eff0, unit: '%',
            hint: 'Netto kreditt i dag blir kontantpris minus etableringsgebyr.',
            sol: `<p>Nå er netto kreditt i dag ${n(P)} − ${E} = ${n(P - E)}, og betalingen i måned 1 er bare ${fee}.</p>` +
              `<p>Månedsrente (IR) = ${pct(rm0, 3)}, og effektiv årsrente = (1 + ${n(rm0, 6)})<sup>12</sup> − 1 = <b>${pct(eff0, 2)}</b>.</p>` +
              '<p>Renten blir høyere fordi gebyret betales tidligere og du i realiteten låner et mindre beløp.</p>' },
          { kind: 'text', q: 'Avtalen markedsføres som «rentefri». Forklar kort hvorfor den effektive renten likevel er positiv, og hvorfor den blir så høy når kredittiden er kort.',
            points: ['Gebyrer (etablering og termingebyr) er i realiteten kredittkostnader og må regnes med i kontantstrømmen – effektiv rente fanger opp <i>alle</i> kostnader.',
              'Gebyrene er faste kronebeløp. Jo mindre lånebeløp og jo kortere kredittid, desto større blir gebyrene relativt til kreditten.',
              'Effektiv rente gjør ulike lånetilbud sammenlignbare; nominell rente (her 0 %) sier lite om den reelle kostnaden.'] },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k7-avbetaling-nominell-effektiv', chapter: 7, level: 2, minutes: 15, examLike: 'H2025 oppg. 3b–c',
    title: 'Avbetaling: nominell rente og effektiv rente med gebyrer',
    topic: 'Effektiv rente',
    blurb: 'Finn renten i en annuitet, og effektiv rente når termingebyr og etableringsgebyr kommer i tillegg.',
    gen(R) {
      const store = R.pick(stores); const [prod, P] = R.pick(products);
      const nomTrue = R.int(69, 219, 10) / 1000;
      const m = R.pick([12, 24, 36, 48]);
      const fee = R.pick([39, 45, 49, 59]);
      const E = R.pick([299, 399, 499, 595]);
      const pmtEx = U.round(F.annuityPayment(P, nomTrue / 12, m), 2);
      const pmt = U.round(pmtEx + fee, 2);
      const rm = F.solve((x) => pmtEx * F.annuityFactor(x, m) - P, 1e-6, 0.2);
      const nom = rm * 12;
      const cf1 = [P]; for (let t = 1; t <= m; t++) cf1.push(-pmt);
      const r1 = F.irr(cf1, 0, 1); const eff1 = F.effFromPeriod(r1, 12);
      const cf2 = cf1.slice(); cf2[1] -= E;
      const r2 = F.irr(cf2, 0, 1); const eff2 = F.effFromPeriod(r2, 12);
      const cost = m * pmt + E - P;
      return {
        text: `<p>${store} selger ${prod} med kontantpris <b>${n(P)}</b>. Du kan få avbetaling over <b>${m} måneder</b>. Du må da betale <b>${n(pmt, 2)}</b> hver måned inklusiv et termingebyr på <b>${fee}</b>, første gang om 1 måned.</p>`,
        parts: [
          { q: `Hvilken <b>nominell årsrente</b> legger ${store} til grunn? Angi svaret med 2 desimaler.`, answer: nom, unit: '%',
            hint: `Trekk ut gebyret: selve annuiteten er ${n(pmt, 2)} − ${fee} = ${n(pmtEx, 2)}. Finn månedsrenten som gjør nåverdien av ${m} slike beløp lik kontantprisen.`,
            sol: `<p>Terminbeløp uten gebyr: ${n(pmt, 2)} − ${fee} = <b>${n(pmtEx, 2)}</b>.</p>` +
              f(`${n(P)} = ${n(pmtEx, 2)} · ${frac(`1 − (1 + r)<sup>−${m}</sup>`, 'r')}`) +
              `<p>Excel: <code>=RENTE(${m};-${xl(pmtEx, 2)};${P})</code> gir månedsrente ${pct(rm, 4)}.</p>` +
              f(`Nominell årsrente = 12 · ${pct(rm, 4)} = ${pct(nom, 2)}`) },
          { q: 'Hva er <b>effektiv årsrente</b> når termingebyret regnes med? Angi svaret med 2 desimaler.', answer: eff1, unit: '%',
            sol: `<p>Nå brukes hele betalingen på ${n(pmt, 2)}: <code>=RENTE(${m};-${xl(pmt, 2)};${P})</code> gir månedsrente ${pct(r1, 4)}.</p>` +
              f(`r<sub>eff</sub> = (1 + ${n(r1, 6)})<sup>12</sup> − 1 = ${pct(eff1, 2)}`) },
          { q: `Det påløper i tillegg et etableringsgebyr på <b>${E}</b> som betales sammen med første terminbeløp. Hvilken effektiv årsrente innebærer avtalen nå?`, answer: eff2, unit: '%',
            hint: 'Kontantstrømmen er ikke lenger en ren annuitet – bruk IR på hele kontantstrømmen.',
            sol: `<p>Kontantstrøm: +${n(P)} i dag, −(${n(pmt, 2)} + ${E}) = −${n(pmt + E, 2)} i måned 1, deretter −${n(pmt, 2)} i måned 2–${m}.</p>` +
              `<p><code>=IR(...)</code> gir månedsrente ${pct(r2, 4)}.</p>` + f(`r<sub>eff</sub> = (1 + ${n(r2, 6)})<sup>12</sup> − 1 = ${pct(eff2, 2)}`) },
          { q: 'Hva er samlet kredittkostnad i kroner (alt du betaler utover kontantprisen)?', answer: cost, unit: 'kr', dec: 2, tol: { abs: 0.6, rel: 0 },
            sol: f(`${m} · ${n(pmt, 2)} + ${E} − ${n(P)} = ${n(cost, 2)} kr`) },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k3-annuitetslan-arlig', chapter: 3, level: 2, minutes: 15,
    title: 'Annuitetslån og serielån',
    topic: 'Lån',
    blurb: 'Terminbeløp, fordeling på renter og avdrag, restgjeld og effektiv rente med etableringsgebyr.',
    gen(R) {
      const L = R.int(10, 60, 5) * 100000;
      const r = R.int(35, 80, 5) / 1000;
      const N = R.pick([5, 8, 10, 12, 15, 20]);
      const k = R.int(2, Math.min(N - 1, 6));
      const E = R.pick([5000, 8000, 10000, 15000]);
      const ann = F.annuityLoan(L, r, N), ser = F.serialLoan(L, r, N);
      const rowK = ann.rows[k - 1];
      const totA = U.sum(ann.rows.map((x) => x.interest)), totS = U.sum(ser.rows.map((x) => x.interest));
      const cfs = [L - E]; for (let t = 1; t <= N; t++) cfs.push(-ann.payment);
      const eff = F.irr(cfs, 0, 1);
      const showRows = ann.rows.slice(0, Math.min(k + 1, N)).map((x) => [x.t, n(x.payment), n(x.interest), n(x.repay), n(x.balance)]);
      return {
        text: `<p>En bedrift tar opp et lån på <b>${n(L)}</b> med <b>${pct(r, 1)}</b> årlig rente og <b>${N} års</b> løpetid. Renter og avdrag betales etterskuddsvis én gang i året.</p>`,
        parts: [
          { q: 'Hva blir det årlige terminbeløpet dersom lånet er et <b>annuitetslån</b>?', answer: ann.payment, unit: 'kr',
            hint: 'Terminbeløp = lån · annuitetsfaktor = lån / A(r, n).',
            sol: f(`Terminbeløp = ${n(L)} · ${frac(`${n(r, 3)}`, `1 − (1 + ${n(r, 3)})<sup>−${N}</sup>`)} = ${n(ann.payment)} kr`) +
              `<p>Excel: <code>=AVDRAG(${n(r * 100, 1)}%;${N};-${L})</code></p>` },
          { q: `Hvor mye er <b>avdrag</b> i år ${k} på annuitetslånet?`, answer: rowK.repay, unit: 'kr',
            hint: 'Rente = restgjeld ved årets start · rentesats. Avdrag = terminbeløp − rente.',
            sol: table(['År', 'Terminbeløp', 'Rente', 'Avdrag', 'Restgjeld'], showRows, { allNum: true }) +
              `<p>I år ${k}: rente ${n(rowK.interest)}, avdrag <b>${n(rowK.repay)}</b>.</p><p>Snarvei: avdragene i et annuitetslån vokser med (1 + r) hvert år: avdrag<sub>${k}</sub> = avdrag<sub>1</sub> · ${n(1 + r, 3)}<sup>${k - 1}</sup>.</p>` },
          { q: `Hva er <b>restgjelden</b> rett etter betalingen i år ${k}?`, answer: rowK.balance, unit: 'kr',
            hint: 'Restgjeld = nåverdien av de gjenværende terminbeløpene.',
            sol: f(`Restgjeld = ${n(ann.payment)} · A(${n(r * 100, 1)} %, ${N - k}) = ${n(ann.payment)} · ${n(F.annuityFactor(r, N - k), 4)} = ${n(rowK.balance)} kr`) },
          { q: 'Hvor mye <b>mer</b> betaler bedriften i renter totalt med annuitetslån enn med serielån?', answer: totA - totS, unit: 'kr',
            hint: 'Serielån: like store avdrag (lån / n) og rente av restgjeld.',
            sol: `<p>Annuitetslån: sum renter = ${N} · ${n(ann.payment)} − ${n(L)} = ${n(totA)}.</p>` +
              `<p>Serielån: avdrag ${n(L / N)} per år. Renter = r · (sum restgjeld) = ${n(r, 3)} · ${n(L / N)} · (${N} + ${N - 1} + … + 1) = ${n(totS)}.</p>` +
              `<p>Differanse: <b>${n(totA - totS)}</b>. Annuitetslånet betales ned saktere i starten og gir derfor mer renter totalt.</p>` },
          { q: `Banken krever et etableringsgebyr på ${n(E)} som trekkes fra ved utbetaling. Hva blir <b>effektiv rente</b> på annuitetslånet?`, answer: eff, unit: '%',
            sol: `<p>Du får utbetalt ${n(L)} − ${n(E)} = ${n(L - E)}, men betaler terminbeløp ${n(ann.payment)} i ${N} år.</p>` +
              `<p>Excel: <code>=RENTE(${N};-${xl(ann.payment)};${L - E})</code> = <b>${pct(eff, 2)}</b>.</p>` },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k3-sparing-pensjon', chapter: 3, level: 2, minutes: 15,
    title: 'Sparing og uttak – annuiteter',
    topic: 'Annuiteter',
    blurb: 'Sluttverdi av sparing, årlig uttak, voksende annuitet og nødvendig sparebeløp.',
    gen(R) {
      const S = R.int(20, 80, 5) * 1000, r = R.int(3, 8) / 100, N = R.pick([10, 15, 20, 25, 30]);
      const M = R.pick([10, 15, 20]), g = R.pick([0.02, 0.025, 0.03]);
      const W = R.int(150, 400, 25) * 1000;
      const fvS = F.fvAnnuity(S, r, N);
      const out = F.annuityPayment(fvS, r, M);
      const fvG = F.pvGrowingAnnuity(S, r, g, N) * Math.pow(1 + r, N);
      const need = W * F.annuityFactor(r, M);
      const save = need / (F.fvAnnuity(1, r, N));
      return {
        text: `<p>Du planlegger å spare <b>${n(S)}</b> hvert år i <b>${N} år</b>, første gang om ett år. Sparepengene gir <b>${pct(r, 0)}</b> årlig avkastning.</p>`,
        parts: [
          { q: `Hvor mye står på kontoen rett etter siste innskudd om ${N} år?`, answer: fvS, unit: 'kr',
            sol: f(`SV = ${n(S)} · ${frac(`(1 + ${n(r, 2)})<sup>${N}</sup> − 1`, n(r, 2))} = ${n(fvS)} kr`) + `<p>Excel: <code>=SLUTTVERDI(${n(r * 100)}%;${N};-${S})</code></p>` },
          { q: `Du vil deretter ta ut et like stort beløp hvert år i ${M} år (første uttak ett år etter siste innskudd), slik at kontoen blir tom. Hvor stort blir det årlige uttaket?`, answer: out, unit: 'kr',
            hint: 'Sluttverdien fra a) er nåverdien av uttaksannuiteten.',
            sol: f(`Uttak = ${frac(n(fvS), `A(${n(r * 100)} %, ${M})`)} = ${frac(n(fvS), n(F.annuityFactor(r, M), 4))} = ${n(out)} kr`) },
          { q: `Anta i stedet at sparebeløpet øker med ${pct(g, 1)} hvert år (første beløp fortsatt ${n(S)}). Hva blir saldoen om ${N} år?`, answer: fvG, unit: 'kr',
            hint: 'Finn først nåverdien av en voksende annuitet, og regn den frem til sluttidspunktet.',
            sol: (Math.abs(r - g) < 1e-9
              ? `<p>Her er veksten lik renten (g = r = ${pct(r, 0)}), så formelen for voksende annuitet kan ikke brukes (nevneren r − g blir 0). Da har hvert innskudd samme nåverdi, ${n(S)} / ${n(1 + r, 2)}:</p>` + f(`NV = ${N} · ${frac(n(S), n(1 + r, 2))} = ${n(F.pvGrowingAnnuity(S, r, g, N))}`)
              : f(`NV = ${frac(n(S), `${n(r, 2)} − ${n(g, 3)}`)} · [1 − (${frac(n(1 + g, 3), n(1 + r, 2))})<sup>${N}</sup>] = ${n(F.pvGrowingAnnuity(S, r, g, N))}`)) +
              f(`SV = NV · (1 + ${n(r, 2)})<sup>${N}</sup> = ${n(fvG)} kr`) },
          { q: `Hvor mye må du spare årlig (konstant beløp) for å kunne ta ut ${n(W)} per år i ${M} år?`, answer: save, unit: 'kr',
            sol: steps([`Nødvendig saldo om ${N} år: ${n(W)} · A(${n(r * 100)} %, ${M}) = ${n(need)}`,
              `Årlig sparebeløp: ${n(need)} / ${n(F.fvAnnuity(1, r, N), 4)} = <b>${n(save)} kr</b>`]) },
        ],
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
