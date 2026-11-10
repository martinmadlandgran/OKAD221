/* Kapittel 2, 4, 5, 6 – Kontantstrøm, nåverdi, internrente, rangering, kritiske verdier, levetid. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table, cfTable } = U;
  const pad = (a) => [null].concat(a);

  // ------------------------------------------------------------------
  O.reg({
    id: 'k2-prosjekt-for-skatt', chapter: 2, level: 2, minutes: 30, examLike: 'Oppgave 1 i 2023 og 2025',
    title: 'Prosjektets kontantstrøm, nåverdi og internrente (før skatt)',
    topic: 'Prosjektanalyse før skatt',
    blurb: 'Kalkyletabell med feller (avskrivninger, fordelte kostnader), arbeidskapital som prosent av omsetning, NNV, internrente og kritiske verdier.',
    gen(R) {
      let t; for (let i = 0; i < 120; i++) { t = this.build(R); if (Math.abs(t.npv) < 0.3 * t.AM) break; }
      return t;
    },
    build(R) {
      const N = 4, r = R.pick([0.08, 0.09, 0.10, 0.12]);
      const AM = R.int(6, 18) * 500000;
      const p0 = R.pick([800, 1200, 1400, 2000, 3400]);
      const price = [p0, p0, Math.round(p0 * R.pick([0.93, 1, 1]) / 50) * 50, Math.round(p0 * R.pick([0.86, 0.93, 1]) / 50) * 50];
      const v0 = Math.round(p0 * R.pick([0.35, 0.4, 0.5]) / 50) * 50;
      const vcu = [v0, v0 - R.pick([0, 50]), v0 - 50, v0 - R.pick([50, 100])];
      const q0 = Math.max(500, Math.round(AM * R.pick([0.7, 0.85, 1.0]) / p0 / 100) * 100);
      const qty = [q0, Math.round(q0 * 1.2 / 100) * 100, Math.round(q0 * 1.2 / 100) * 100, q0];
      const dep = AM / N, alloc = R.int(4, 12) * 100000;
      const other = Math.round(AM * R.pick([0.1, 0.15, 0.2]) / 50000) * 50000;
      const wcPct = R.pick([0.1, 0.15, 0.2]);
      const d = R.pick([25, 50, 50, 100]);
      const rev = qty.map((q, i) => q * price[i]), vc = qty.map((q, i) => q * vcu[i]);
      const WC = rev.map((x) => wcPct * x).concat([0]);
      const wcCF = WC.map((w, t) => -(w - (t ? WC[t - 1] : 0)));
      const cf = [-AM + wcCF[0]]; for (let t = 1; t <= N; t++) cf.push(rev[t - 1] - vc[t - 1] - other + wcCF[t]);
      const npv = F.npv(r, cf), irr = F.irr(cf);
      const sav = qty.map((q) => q * d); const pvSav = F.npv(r, pad(sav));
      const ann = npv / F.annuityFactor(r, N);
      const minSalv = -npv * Math.pow(1 + r, N);
      return {
        npv, AM,
        text: `<p>En bedrift vurderer å starte et nytt prosjekt, hvor man eventuelt må anskaffe anleggsmidler for <b>${n(AM)}</b>. Enkelte data fra kalkylene er gitt under:</p>` +
          table(['År', '1', '2', '3', '4'], [['Pris'].concat(price.map((x) => n(x))), ['Variabel enh. kostnad'].concat(vcu.map((x) => n(x))), ['Mengde'].concat(qty.map((x) => n(x))), ['Faste kostnader'].concat(qty.map(() => n(dep + alloc)))]) +
          `<p>Bedriften avskriver anleggsmidlene lineært til 0 over levetiden. De faste kostnadene i oppstillingen over består av avskrivninger på ${n(dep)} og fordelte faste kostnader fra hovedkontoret på ${n(alloc)}.</p>` +
          `<p>Det vil påløpe andre faste kostnader som ikke er med i oppstillingen over på <b>${n(other)}</b> årlig. Prosjektet vil også medføre økt arbeidskapital, og man antar at arbeidskapitalen vil utgjøre <b>${pct(wcPct, 0)}</b> av omsetningen. Avkastningskravet er <b>${pct(r, 0)}</b>.</p>`,
        parts: [
          { q: 'Beregn prosjektets nåverdi (NNV).', answer: npv, unit: 'kr', tol: { abs: AM * 0.001 },
            hint: 'Ta bare med betalbare, relevante poster. Arbeidskapitalen bindes ett år <i>før</i> omsetningen den hører til.',
            sol: cfTable([['Omsetning', pad(rev)], ['Variable kostnader', pad(vc.map((x) => -x))], ['Andre faste kostnader', pad(qty.map(() => -other))], ['Arbeidskapital', wcCF], ['Anleggsmidler', [-AM]], ['Kontantstrøm', cf, 'sum']], N) +
              steps([`<b>Faste kostnader i tabellen (${n(dep + alloc)}) tas ikke med:</b> avskrivninger er ikke en utbetaling, og fordelte hovedkontorkostnader påvirkes ikke av prosjektet.`,
                `<b>Arbeidskapital:</b> ${pct(wcPct, 0)} av neste års omsetning bindes året før. År 0: ${pct(wcPct, 0)} · ${n(rev[0])} = ${n(WC[0])}. År 1: endring ${n(WC[1])} − ${n(WC[0])} = ${n(WC[1] - WC[0])} (utbetaling hvis positiv). Alt som står igjen frigjøres i år ${N}.`,
                `<code>=NNV(${n(r * 100)}%; år 1–${N}) + år 0</code> = <b>${n(npv)}</b>. Prosjektet er ${npv > 0 ? 'lønnsomt' : 'ulønnsomt'}.`]) },
          { q: 'Beregn prosjektets internrente.', answer: irr, unit: '%',
            sol: `<p><code>=IR(kontantstrøm år 0–${N})</code> = <b>${pct(irr, 2)}</b>. Internrenten er ${irr > r ? 'høyere' : 'lavere'} enn avkastningskravet (${pct(r, 0)}), som stemmer med at NNV er ${npv > 0 ? 'positiv' : 'negativ'}.</p>` },
          { q: `Anta at det er mulig å kjøpe en mer avansert maskin som reduserer de variable enhetskostnadene med ${d} hvert år. Hvor mye kan man <b>maksimalt</b> betale for denne maskinen for at den skal være aktuell (dvs. minst like god som den opprinnelige)?`, answer: AM + pvSav, unit: 'kr', tol: { abs: AM * 0.001 },
            hint: 'Finn nåverdien av de årlige besparelsene. Så mye mer kan maskinen koste.',
            sol: cfTable([['Besparelse (' + d + ' · mengde)', pad(sav)]], N, { start: 1 }) +
              f(`NV besparelse = ${n(pvSav)}`) + f(`Maks pris = ${n(AM)} + ${n(pvSav)} = ${n(AM + pvSav)}`) +
              '<p>Arbeidskapitalen påvirkes ikke (den avhenger av omsetningen), og avskrivninger er uten betydning før skatt.</p>' },
          { q: 'Hvor mye kan de årlige «andre faste kostnadene» <b>endres</b> før nåverdien blir null? (Positivt tall = kan øke, negativt = må reduseres.)', answer: ann, unit: 'kr', tol: { abs: AM * 0.0005 },
            hint: 'Gjør nåverdien om til en nåverdiannuitet: NNV / annuitetsfaktor.',
            sol: f(`Nåverdiannuitet = ${frac('NNV', `A(${n(r * 100)} %, ${N})`)} = ${frac(n(npv), n(F.annuityFactor(r, N), 4))} = ${n(ann)}`) +
              `<p>Kritisk verdi for faste kostnader: ${n(other)} + (${n(ann)}) = <b>${n(other + ann)}</b> per år.</p>` },
          { q: `Hvilken restverdi (salgssum for anleggsmidlene i år ${N}) ville gitt NNV = 0? (Negativt svar betyr at prosjektet tåler en like stor fjerningskostnad.)`, answer: minSalv, unit: 'kr', tol: { abs: AM * 0.001 },
            sol: f(`−NNV · (1 + r)<sup>${N}</sup> = ${n(-npv)} · ${n(Math.pow(1 + r, N), 4)} = ${n(minSalv)}`) + '<p>Et engangsbeløp i år n finner du ved å regne nåverdien frem til år n. (Målsøking i Excel godtas også på eksamen.)</p>' },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k4-to-prosjekter-fisher', chapter: 4, level: 2, minutes: 30, examLike: 'Oppgave 1 i 2016, 2017, 2019, 2020, 2021 og 2024',
    title: 'To gjensidig utelukkende prosjekter: NNV, internrente, payback og differanseinvestering',
    topic: 'Prosjektrangering',
    blurb: 'Sett opp kontantstrøm for A og B, ranger, og finn avkastningskravet som gir lik nåverdi (Fisher-renten).',
    gen(R) {
      let t0; for (let tries = 0; tries < 60; tries++) {
        const N = R.pick([5, 6]), r = R.pick([0.08, 0.10, 0.12]);
        const IA = R.int(10, 24) * 100000, IB = IA + R.int(3, 8) * 100000;
        const wcA = R.int(4, 10) * 10000, wcB = R.int(4, 10) * 10000, resB = R.int(5, 20) * 10000;
        const mA = R.int(4, 9) * 10000, mB0 = R.int(3, 7) * 10000, mBg = R.pick([0, 5000, 10000]);
        const base = IA * R.pick([0.36, 0.4, 0.44]);
        const shape = N === 5 ? [0.8, 1.1, 1.2, 1.1, 0.9] : [0.75, 1.1, 1.2, 1.15, 1.05, 0.8];
        const dA = shape.map((s) => Math.round(base * s / 5000) * 5000);
        const dB = dA.map((x, i) => Math.round(x * R.pick([1.0, 1.05, 1.1]) / 5000) * 5000 + (i === 0 ? R.int(8, 16) * 10000 : R.int(1, 5) * 10000));
        const cfA = [-IA - wcA].concat(dA.map((x, i) => x - mA + (i === N - 1 ? wcA : 0)));
        const cfB = [-IB - wcB].concat(dB.map((x, i) => x - (mB0 + mBg * i) + (i === N - 1 ? wcB + resB : 0)));
        const diff = cfB.map((x, i) => x - cfA[i]);
        const fisher = F.irr(diff, -0.5, 2);
        const pbA = F.payback(cfA), pbB = F.payback(cfB);
        if (!isFinite(fisher) || fisher < 0.01 || !isFinite(pbA) || !isFinite(pbB) || diff.slice(1).some((x) => x < 0)) continue;
        t0 = { N, r, IA, IB, wcA, wcB, resB, mA, mB0, mBg, dA, dB, cfA, cfB, diff, fisher, pbA, pbB }; break;
      }
      const { N, r, IA, IB, wcA, wcB, resB, mA, mB0, mBg, dA, dB, cfA, cfB, diff, fisher, pbA, pbB } = t0;
      const nA = F.npv(r, cfA), nB = F.npv(r, cfB), iA = F.irr(cfA), iB = F.irr(cfB);
      const pvD = F.npv(r, pad(dA)), annD = pvD / F.annuityFactor(r, N);
      const best = nA > nB ? 'A' : 'B'; const conflict = (nA > nB) !== (iA > iB);
      return {
        text: '<p>En bedrift vurderer om man skal gjennomføre enten prosjekt A eller prosjekt B. Det foreligger følgende opplysninger:</p>' +
          table(['Prosjekt', 'A', 'B'], [['Antatt levetid (år)', N, N], ['Anleggsmidler', n(IA), n(IB)], ['Restverdi', '0', n(resB)], ['Arbeidskapitalbehov', n(wcA), n(wcB)]]) +
          '<p>Kontantstrømmene fra driften (vedlikeholdskostnader er ikke inkludert) er budsjettert til:</p>' +
          table(['År', 'A', 'B'], dA.map((x, i) => [i + 1, n(x), n(dB[i])]), { allNum: true }) +
          `<p>Vedlikeholdskostnadene for prosjekt A er beregnet til ${n(mA)} årlig. For prosjekt B er de anslått til ${n(mB0)} i år 1${mBg ? `, og deretter øker de med ${n(mBg)} årlig` : ' og er konstante'}. Avkastningskravet er <b>${pct(r, 0)}</b>.</p>`,
        parts: [
          { q: 'Beregn nåverdien (NNV) for prosjekt A.', answer: nA, unit: 'kr', tol: { abs: IA * 0.001 },
            hint: 'Arbeidskapitalen bindes i år 0 og frigjøres siste år. Husk vedlikehold.',
            sol: cfTable([['Anleggsmidler', [-IA]], ['Drift', pad(dA)], ['Vedlikehold', pad(dA.map(() => -mA))], ['Arbeidskapital', [-wcA].concat(Array(N - 1).fill(null), [wcA])], ['Kontantstrøm A', cfA, 'sum']], N) + f(`NNV<sub>A</sub> = ${n(nA)}`) },
          { q: 'Beregn nåverdien (NNV) for prosjekt B.', answer: nB, unit: 'kr', tol: { abs: IA * 0.001 },
            sol: cfTable([['Anleggsmidler', [-IB].concat(Array(N - 1).fill(null), [resB])], ['Drift', pad(dB)], ['Vedlikehold', pad(dB.map((_, i) => -(mB0 + mBg * i)))], ['Arbeidskapital', [-wcB].concat(Array(N - 1).fill(null), [wcB])], ['Kontantstrøm B', cfB, 'sum']], N) + f(`NNV<sub>B</sub> = ${n(nB)}`) },
          { q: 'Beregn internrenten for prosjekt A.', answer: iA, unit: '%', sol: `<p><code>=IR(kontantstrøm A)</code> = <b>${pct(iA, 2)}</b></p>` },
          { q: 'Beregn internrenten for prosjekt B.', answer: iB, unit: '%', sol: `<p><code>=IR(kontantstrøm B)</code> = <b>${pct(iB, 2)}</b></p>` },
          { q: 'Beregn tilbakebetalingstiden (payback) for prosjekt A, i år med to desimaler.', answer: pbA, unit: 'år', dec: 2, tol: { abs: 0.012 },
            hint: 'Akkumuler kontantstrømmen. Interpoler lineært i året der den akkumulerte kontantstrømmen blir positiv.',
            sol: (() => { let acc = 0; const rows = cfA.map((c, t) => { acc += c; return [t, n(c), n(acc)]; }); return table(['År', 'Kontantstrøm', 'Akkumulert'], rows, { allNum: true }); })() +
              `<p>Payback A = <b>${n(pbA, 2)} år</b>. Tilsvarende for B: ${n(pbB, 2)} år.</p>` },
          { kind: 'text', q: 'Hvilket prosjekt vil du velge? Begrunn, og kommenter hva de ulike metodene sier.',
            points: [`Prosjektene er gjensidig utelukkende → velg det med <b>høyest nåverdi</b>: prosjekt <b>${best}</b> (NNV ${n(Math.max(nA, nB))} mot ${n(Math.min(nA, nB))}).`,
              conflict ? `<b>Rangeringskonflikt:</b> prosjekt ${best === 'A' ? 'B' : 'A'} har høyest internrente, men internrenten måler avkastning per krone og tar ikke hensyn til prosjektets størrelse. NNV måler formuesøkningen i kroner og er riktig kriterium.` : 'Her gir NNV og internrente samme rangering, men det er NNV som er det riktige kriteriet for gjensidig utelukkende prosjekter.',
              'Payback ignorerer tidsverdien av penger og alle kontantstrømmer etter tilbakebetalingstidspunktet, og har et vilkårlig krav. Den sier noe om likviditet/risiko, ikke om lønnsomhet.',
              `Differanseinvesteringen (B − A) har internrente ${pct(fisher, 2)}; den er ${fisher > r ? 'høyere' : 'lavere'} enn kravet (${pct(r, 0)}), så merinvesteringen i B er ${fisher > r ? 'lønnsom → velg B' : 'ulønnsom → velg A'}.`] },
          { q: 'Hvilket avkastningskrav ville gitt identisk nåverdi for de to prosjektene?', answer: fisher, unit: '%',
            hint: 'Sett opp differansekontantstrømmen B − A og finn internrenten til den.',
            sol: cfTable([['B − A', diff, 'sum']], N) + `<p><code>=IR(differanse)</code> = <b>${pct(fisher, 2)}</b> (Fisher-skjæringspunktet). ${fisher > r ? `Ved avkastningskrav under ${pct(fisher, 2)} er B best; over er A best.` : `Ved avkastningskrav under ${pct(fisher, 2)} er B best; over er A best – og kravet på ${pct(r, 0)} ligger over.`}</p>` },
          { q: 'Anta at kontantstrømmen fra driften i prosjekt A (eksklusiv vedlikehold) i stedet er en annuitet. Hvor høyt må det årlige beløpet være for å gi samme nåverdi som i a)?', answer: annD, unit: 'kr', tol: { abs: IA * 0.0005 },
            sol: f(`NV drift = ${n(pvD)}`) + f(`Årlig beløp = ${frac(n(pvD), `A(${n(r * 100)} %, ${N})`)} = ${frac(n(pvD), n(F.annuityFactor(r, N), 4))} = ${n(annD)}`) +
              `<p>Excel: <code>=AVDRAG(${n(r * 100)}%;${N};-${n(pvD)})</code></p>` },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k4-resultat-til-kontantstrom', chapter: 4, level: 2, minutes: 20, examLike: '2024 oppg. 1',
    title: 'Fra resultatbudsjett til kontantstrøm: maskin A eller B?',
    topic: 'Prosjektrangering',
    blurb: 'Resultatbudsjett med avskrivninger må gjøres om til kontantstrøm før du regner NNV og internrente.',
    gen(R) {
      let t0; for (let k = 0; k < 60; k++) {
        const N = 5, r = R.pick([0.08, 0.10, 0.12]);
        const IA = R.int(6, 14) * 1000000, IB = IA + R.int(2, 4) * 1000000, wc = R.int(5, 12) * 100000;
        const rev = Math.round(IA * R.pick([0.55, 0.6, 0.65]) / 100000) * 100000;
        const vcA = Math.round(rev * 0.33 / 100000) * 100000, vcB = vcA - Math.round((IB - IA) * R.pick([0.25, 0.27, 0.29]) / 50000) * 50000;
        const fk = Math.round(rev * 0.17 / 100000) * 100000;
        const cA = rev - vcA - fk, cB = rev - vcB - fk;
        const cfA = [-IA - wc, cA, cA, cA, cA, cA + wc], cfB = [-IB - wc, cB, cB, cB, cB, cB + wc];
        const fisher = F.irr(cfB.map((x, i) => x - cfA[i]), -0.5, 2);
        if (vcB <= 0 || !isFinite(fisher)) continue;
        t0 = { N, r, IA, IB, wc, rev, vcA, vcB, fk, cA, cB, cfA, cfB, fisher }; break;
      }
      const { N, r, IA, IB, wc, rev, vcA, vcB, fk, cA, cB, cfA, cfB, fisher } = t0;
      const nA = F.npv(r, cfA), nB = F.npv(r, cfB);
      return {
        text: `<p>En bedrift vurderer et nytt prosjekt og har mottatt tilbud på anleggsmidler fra to leverandører. Maskin A koster <b>${n(IA)}</b> og maskin B koster <b>${n(IB)}</b>. Maskinene avskrives lineært til 0 over prosjektets levetid på ${N} år. Arbeidskapitalen er <b>${n(wc)}</b> uansett maskin, og avkastningskravet er <b>${pct(r, 0)}</b>. Se bort fra skatt.</p><p>Resultatbudsjett for hvert av de ${N} årene:</p>` +
          table(['', 'Maskin A', 'Maskin B'], [['Omsetning', n(rev), n(rev)], ['Variable kostnader', n(vcA), n(vcB)], ['Betalbare faste kostnader', n(fk), n(fk)], ['Avskrivninger', n(IA / N), n(IB / N)], { cells: ['Driftsresultat', n(cA - IA / N), n(cB - IB / N)], cls: 'sum' }]),
        parts: [
          { q: 'Hva er den årlige kontantstrømmen fra driften med maskin A?', answer: cA, unit: 'kr',
            hint: 'Avskrivninger er ikke en utbetaling.', sol: f(`Driftsresultat + avskrivninger = ${n(cA - IA / N)} + ${n(IA / N)} = ${n(cA)}`) },
          { q: 'Beregn NNV for maskin A.', answer: nA, unit: 'kr', tol: { abs: IA * 0.001 },
            sol: cfTable([['Maskin A', [-IA]], ['Arbeidskapital', [-wc, null, null, null, null, wc]], ['Kontantstrøm drift', pad(Array(N).fill(cA))], ['Kontantstrøm A', cfA, 'sum']], N) + f(`NNV<sub>A</sub> = ${n(nA)}, IR = ${pct(F.irr(cfA), 2)}`) },
          { q: 'Beregn NNV for maskin B.', answer: nB, unit: 'kr', tol: { abs: IA * 0.001 },
            sol: cfTable([['Kontantstrøm B', cfB, 'sum']], N) + f(`NNV<sub>B</sub> = ${n(nB)}, IR = ${pct(F.irr(cfB), 2)}`) +
              `<p>${Math.max(nA, nB) > 0 ? `Velger maskin <b>${nA > nB ? 'A' : 'B'}</b> på grunn av høyest nåverdi.` : 'Ingen av alternativene er lønnsomme.'}</p>` },
          { q: 'Hvilket avkastningskrav ville gitt identisk NNV for de to maskinene?', answer: fisher, unit: '%',
            sol: `<p>Differanse B − A: −${n(IB - IA)} i år 0, deretter +${n(cB - cA)} i år 1–${N}.</p><p><code>=RENTE(${N};${cB - cA};-${IB - IA})</code> = <b>${pct(fisher, 2)}</b>.</p>` },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k6-kritiske-verdier', chapter: 6, level: 2, minutes: 20, examLike: '2016, 2017, 2018, 2020, 2023',
    title: 'Følsomhetsanalyse: kritiske verdier (nullpunkt)',
    topic: 'Følsomhet',
    blurb: 'Laveste pris, laveste mengde, høyeste faste kostnader og høyeste investering som gir NNV = 0 – via nåverdiannuitet.',
    gen(R) {
      const N = R.pick([4, 5, 6, 8]), r = R.pick([0.08, 0.10, 0.12, 0.15]);
      const I = R.int(10, 60) * 100000, p = R.pick([150, 400, 800, 1200, 2500]);
      const v = Math.round(p * R.pick([0.4, 0.5, 0.6]) / 10) * 10;
      const A = F.annuityFactor(r, N);
      const fk = Math.round(I * R.pick([0.1, 0.15, 0.2]) / 10000) * 10000;
      const q = Math.round((I / A * R.pick([1.1, 1.2, 1.35]) + fk) / (p - v) / 10) * 10;
      const cf = q * (p - v) - fk, npv = -I + cf * A, ann = npv / A;
      const pMin = p - ann / q, qMin = q - ann / (p - v), fMax = fk + ann, iMax = I + npv, vMax = v + ann / q;
      const margins = [['Pris', (pMin - p) / p], ['Mengde', (qMin - q) / q], ['Variabel enhetskostnad', (vMax - v) / v], ['Faste kostnader', (fMax - fk) / fk], ['Investering', (iMax - I) / I]];
      const most = margins.slice().sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
      return {
        text: `<p>Et prosjekt krever en investering på <b>${n(I)}</b> og har en levetid på <b>${N} år</b> uten restverdi. Budsjettert årlig salg er <b>${n(q)}</b> enheter til en pris på <b>${n(p)}</b>. Variable enhetskostnader er <b>${n(v)}</b>, og betalbare faste kostnader er <b>${n(fk)}</b> per år. Avkastningskravet er <b>${pct(r, 0)}</b>. Se bort fra skatt og arbeidskapital.</p>`,
        parts: [
          { q: 'Beregn prosjektets NNV.', answer: npv, unit: 'kr', tol: { abs: I * 0.001 },
            sol: f(`Årlig kontantstrøm = ${n(q)} · (${n(p)} − ${n(v)}) − ${n(fk)} = ${n(cf)}`) + f(`NNV = −${n(I)} + ${n(cf)} · ${n(A, 4)} = ${n(npv)}`) },
          { q: 'Hva er den laveste prisen som gir NNV = 0?', answer: pMin, unit: 'kr', dec: 2, tol: { abs: p * 0.001 },
            hint: 'Nåverdiannuiteten (NNV / annuitetsfaktor) er det årlige «overskuddet». Fordel det på antall enheter.',
            sol: f(`Nåverdiannuitet = ${frac(n(npv), n(A, 4))} = ${n(ann)}`) + f(`Kritisk pris = ${n(p)} − ${frac(n(ann), n(q))} = ${n(pMin, 2)}`) + `<p>Prisen kan falle ${pct(-(pMin - p) / p, 1)} før prosjektet blir ulønnsomt.</p>` },
          { q: 'Hva er den laveste årlige salgsmengden som gir NNV = 0?', answer: qMin, unit: '', dec: 0, tol: { abs: Math.max(1, q * 0.002) },
            hint: 'Del nåverdiannuiteten på <b>dekningsbidraget</b> per enhet – ikke på prisen.',
            sol: f(`Kritisk mengde = ${n(q)} − ${frac(n(ann), `${n(p)} − ${n(v)}`)} = ${n(qMin)} enheter`) + '<div class="callout warn">Fallgruve foreleser peker på: mengden deles på dekningsbidraget (pris − variabel enhetskostnad), ikke på prisen. Færre solgte enheter sparer også variable kostnader.</div>' },
          { q: 'Hva er de høyeste årlige faste kostnadene prosjektet tåler?', answer: fMax, unit: 'kr', tol: { abs: I * 0.0005 },
            sol: f(`${n(fk)} + ${n(ann)} = ${n(fMax)}`) },
          { q: 'Hva er det høyeste investeringsbeløpet prosjektet tåler?', answer: iMax, unit: 'kr', tol: { abs: I * 0.001 },
            sol: f(`${n(I)} + NNV = ${n(I)} + ${n(npv)} = ${n(iMax)}`) + '<p>Investeringen skjer i år 0, så den tåler en endring lik hele nåverdien – ingen annuitetsomregning.</p>' },
          { kind: 'text', q: 'Hvilken av størrelsene er prosjektet mest følsomt for? Hva er svakhetene ved følsomhetsanalyse?',
            points: ['Sikkerhetsmarginer (prosentvis endring til NNV = 0): ' + margins.map((m) => `${m[0]} ${pct(m[1], 1)}`).join(', ') + '.',
              `Prosjektet er mest følsomt for <b>${most[0].toLowerCase()}</b> (minst margin).`,
              'Følsomhetsanalysen endrer én variabel om gangen og ser bort fra at variablene ofte henger sammen (f.eks. pris og mengde).',
              'Den sier ingenting om <i>sannsynligheten</i> for at endringen inntreffer. Scenarioanalyse og simulering kan supplere.'] },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k4-okonomisk-levetid', chapter: 4, level: 3, minutes: 25, examLike: '2016, 2017, 2018 og 2020 (20–25 %)',
    title: 'Optimal økonomisk levetid: engangsinvestering og investeringskjede',
    topic: 'Økonomisk levetid',
    blurb: 'Tabell med NNV og nåverdiannuitet for hver mulig levetid. Engangsinvestering → maks NNV; kjede → maks annuitet.',
    gen(R) {
      let t0; for (let k = 0; k < 80; k++) {
        const N = R.pick([4, 5, 6]), r = R.pick([0.08, 0.10, 0.12]);
        const I = R.int(8, 40) * 50000;
        const c1 = Math.round(I * R.pick([0.42, 0.48, 0.55]) / 5000) * 5000;
        const dec = R.pick([0.82, 0.86, 0.9]), sdec = R.pick([0.6, 0.65, 0.7]);
        const cf = U.range(1, N).map((t) => Math.round(c1 * Math.pow(dec, t - 1) / 1000) * 1000);
        const sv = U.range(1, N).map((t) => Math.round(I * Math.pow(sdec, t) / 5000) * 5000);
        const rows = U.range(1, N).map((L) => { const flow = [-I].concat(cf.slice(0, L)); flow[L] += sv[L - 1]; const v = F.npv(r, flow); return { L, npv: v, ann: v / F.annuityFactor(r, L) }; });
        const b1 = rows.slice().sort((a, b) => b.npv - a.npv), b2 = rows.slice().sort((a, b) => b.ann - a.ann);
        if (b1[0].npv <= 0 || b1[0].L === b2[0].L || b1[0].npv - b1[1].npv < I * 0.004 || b2[0].ann - b2[1].ann < I * 0.002) continue;
        t0 = { N, r, I, cf, sv, rows, one: b1[0], chain: b2[0] }; break;
      }
      if (!t0) return O.genById['k4-okonomisk-levetid'].gen(O.U.rng(R.int(1, 1e9)));
      const { N, r, I, cf, sv, rows, one, chain } = t0;
      const tbl = table(['Levetid (år)', 'NNV', 'Annuitetsfaktor', 'Nåverdiannuitet'], rows.map((x) => ({ cells: [x.L, n(x.npv), n(F.annuityFactor(r, x.L), 4), n(x.ann)], cls: x.L === one.L || x.L === chain.L ? 'sub' : '' })), { allNum: true });
      return {
        text: `<p>En bedrift vurderer å investere i en maskin som koster <b>${n(I)}</b>. Maskinen kan maksimalt brukes i ${N} år, men kontantstrømmen fra driften faller med alderen. Tabellen viser kontantstrøm fra driften i hvert år og salgsverdien dersom maskinen selges ved utgangen av året. Avkastningskravet er <b>${pct(r, 0)}</b>.</p>` +
          table(['År'].concat(U.range(1, N)), [['Kontantstrøm fra drift'].concat(cf.map((x) => n(x))), ['Salgsverdi ved utgangen av året'].concat(sv.map((x) => n(x)))]),
        parts: [
          { q: 'Anta at investeringen <b>ikke</b> skal gjentas (engangsinvestering). Hva er optimal levetid i år?', answer: one.L, unit: 'år', dec: 0, tol: { abs: 0.01, rel: 0 },
            hint: 'Regn NNV for hver mulig levetid: −investering + driftskontantstrømmer til og med salgsåret + salgsverdien det året.',
            sol: tbl + `<p>For hver levetid L: NNV = −${n(I)} + Σ drift<sub>t</sub>/(1+r)<sup>t</sup> + salgsverdi<sub>L</sub>/(1+r)<sup>L</sup>.</p><p>Engangsinvestering: velg høyest <b>NNV</b> → <b>${one.L} år</b>.</p>` },
          { q: 'Hva er NNV ved denne levetiden?', answer: one.npv, unit: 'kr', tol: { abs: I * 0.001 }, sol: f(`NNV(${one.L} år) = ${n(one.npv)}`) },
          { q: 'Anta nå at maskinen skal skiftes ut med en identisk maskin i all fremtid (investeringskjede). Hva er optimal levetid?', answer: chain.L, unit: 'år', dec: 0, tol: { abs: 0.01, rel: 0 },
            hint: 'Når investeringen gjentas, må alternativene gjøres sammenlignbare per år: nåverdiannuitet = NNV / annuitetsfaktor.',
            sol: tbl + `<p>Kjede: velg høyest <b>nåverdiannuitet</b> → <b>${chain.L} år</b>.</p>` },
          { q: 'Hva er nåverdiannuiteten ved denne levetiden?', answer: chain.ann, unit: 'kr', tol: { abs: I * 0.0005 },
            sol: f(`${frac(n(chain.npv), n(F.annuityFactor(r, chain.L), 4))} = ${n(chain.ann)}`) + `<p>Nåverdien av hele den evige kjeden er ${n(chain.ann)} / ${n(r, 2)} = ${n(chain.ann / r)}.</p>` },
          { kind: 'text', q: 'Hvorfor blir optimal levetid kortere når investeringen gjentas?',
            points: ['Ved en kjede har det en <b>alternativkostnad</b> å beholde den gamle maskinen: du utsetter gevinsten fra alle fremtidige maskiner.',
              'Ved engangsinvestering beholder du maskinen så lenge ett år til gir positivt bidrag til NNV. Ved kjede må det ekstra året gi mer enn nåverdiannuiteten til en ny maskin.',
              'Nåverdiannuiteten gjør alternativer med ulik levetid sammenlignbare (lik årlig overskudd).'] },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k4-arskostnad-ulik-levetid', chapter: 4, level: 2, minutes: 12, examLike: '2025 oppg. 3d',
    title: 'Årskostnad: maskiner med ulik levetid',
    topic: 'Økonomisk levetid',
    blurb: 'Sammenlign maskiner som skiftes ut regelmessig ved å regne om til ekvivalent årlig kostnad.',
    gen(R) {
      const r = R.pick([0.06, 0.08, 0.10, 0.12]);
      const lives = R.pick([[4, 6, 9], [5, 7, 10], [3, 5, 8], [4, 7, 10]]);
      const k0 = R.int(3, 8) * 100000;
      const cost = [k0, k0 + R.int(15, 25) * 10000, k0 + R.int(35, 50) * 10000];
      const m0 = Math.round(k0 * R.pick([0.14, 0.16, 0.18]) / 5000) * 5000;
      const maint = [m0, m0 - R.int(4, 6) * 5000, m0 - R.int(7, 9) * 5000];
      const pv = cost.map((c, i) => c + maint[i] * F.annuityFactor(r, lives[i]));
      const eac = pv.map((x, i) => x / F.annuityFactor(r, lives[i]));
      const bi = eac.indexOf(Math.min(...eac)), wi = eac.indexOf(Math.max(...eac));
      const L = 'ABC';
      const maxPrice = (eac[bi] - maint[wi]) * F.annuityFactor(r, lives[wi]);
      return {
        text: `<p>En bedrift skifter regelmessig ut en maskin, og nå vurderes tre maskiner A, B og C. Avkastningskravet er <b>${pct(r, 0)}</b>.</p>` +
          table(['Maskin', 'Kostpris', 'Årlig vedlikehold', 'Levetid (år)'], [0, 1, 2].map((i) => [L[i], n(cost[i]), n(maint[i]), lives[i]])),
        parts: [0, 1, 2].map((i) => ({
          q: `Hva er årskostnaden (ekvivalent årlig kostnad) for maskin ${L[i]}?`, answer: eac[i], unit: 'kr', tol: { abs: 5, rel: 0.0005 },
          hint: i === 0 ? 'Finn nåverdien av alle kostnader over levetiden og fordel den som en annuitet over samme levetid.' : undefined,
          sol: f(`NV kostnader = ${n(cost[i])} + ${n(maint[i])} · A(${n(r * 100)} %, ${lives[i]}) = ${n(pv[i])}`) + f(`Årskostnad = ${frac(n(pv[i]), n(F.annuityFactor(r, lives[i]), 4))} = ${n(eac[i])}`) +
            `<p>Snarvei: kostpris / annuitetsfaktor + vedlikehold = ${n(cost[i] / F.annuityFactor(r, lives[i]))} + ${n(maint[i])}. Excel: <code>=AVDRAG(${n(r * 100)}%;${lives[i]};-${cost[i]})+${maint[i]}</code></p>`,
        })).concat([
          { kind: 'text', q: 'Hvilken maskin bør man anskaffe? Hvorfor kan man ikke bare sammenligne nåverdien av kostnadene?',
            points: [`Velg maskin <b>${L[bi]}</b> – lavest årskostnad (${n(eac[bi])}).`,
              'Nåverdien av kostnadene dekker ulikt antall år. En maskin med kort levetid ser «billig» ut fordi den må erstattes tidligere.',
              'Årskostnad (annuitet) gjør alternativene sammenlignbare når utskiftingen gjentas i all fremtid med samme vilkår.'] },
          { q: `Hvor høy kan kostprisen på maskin ${L[wi]} være for at den skal være like god som maskin ${L[bi]}?`, answer: maxPrice, unit: 'kr', tol: { abs: 50, rel: 0.001 },
            hint: 'Sett årskostnaden lik den beste maskinens, og løs for kostprisen.',
            sol: f(`(${n(eac[bi])} − ${n(maint[wi])}) · A(${n(r * 100)} %, ${lives[wi]}) = ${n(eac[bi] - maint[wi])} · ${n(F.annuityFactor(r, lives[wi]), 4)} = ${n(maxPrice)}`) },
        ]),
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k5-payback-kapitalrasjonering', chapter: 5, level: 2, minutes: 15,
    title: 'Payback, nåverdiindeks og kapitalrasjonering',
    topic: 'Andre lønnsomhetsmetoder',
    blurb: 'Tilbakebetalingstid med og uten diskontering, og valg av prosjekter med begrenset budsjett.',
    gen(R) {
      const r = R.pick([0.08, 0.10, 0.12]);
      const I = R.int(10, 40) * 50000, N = 5;
      const cfs = [-I].concat(U.range(1, N).map(() => Math.round(I * R.int(31, 42) / 100 / 5000) * 5000));
      const pb = F.payback(cfs);
      const disc = cfs.map((c, t) => c / Math.pow(1 + r, t)); const dpb = F.payback(disc);
      const names = 'ABCDE'.split('');
      const projs = names.map((nm) => { const inv = R.int(4, 16) * 100000; const pi = R.int(5, 45) / 100; return { nm, inv, npv: Math.round(inv * pi / 10000) * 10000 }; });
      const budget = Math.round(U.sum(projs.map((x) => x.inv)) * R.pick([0.45, 0.55, 0.6]) / 100000) * 100000;
      let best = { npv: -1, set: [] };
      for (let m = 0; m < 32; m++) { let inv = 0, v = 0; const set = []; projs.forEach((x, i) => { if (m >> i & 1) { inv += x.inv; v += x.npv; set.push(x.nm); } }); if (inv <= budget && v > best.npv) best = { npv: v, set, inv }; }
      const ranked = projs.slice().sort((a, b) => b.npv / b.inv - a.npv / a.inv);
      let left = budget, fracNpv = 0; const used = [];
      ranked.forEach((x) => { if (left <= 0) return; const share = Math.min(1, left / x.inv); fracNpv += share * x.npv; left -= share * x.inv; used.push(`${x.nm} (${pct(share, 0)})`); });
      return {
        text: `<p><b>Del 1.</b> Et prosjekt har følgende kontantstrøm, og avkastningskravet er ${pct(r, 0)}:</p>` + cfTable([['Kontantstrøm', cfs]], N) +
          `<p><b>Del 2.</b> En bedrift har et investeringsbudsjett på <b>${n(budget)}</b> og kan velge blant fem uavhengige prosjekter:</p>` +
          table(['Prosjekt'].concat(names), [['Investering'].concat(projs.map((x) => n(x.inv))), ['NNV'].concat(projs.map((x) => n(x.npv)))]),
        parts: [
          { q: 'Hva er tilbakebetalingstiden (payback) for prosjektet i del 1?', answer: pb, unit: 'år', dec: 2, tol: { abs: 0.012 },
            sol: (() => { let acc = 0; return table(['År', 'Kontantstrøm', 'Akkumulert'], cfs.map((c, t) => { acc += c; return [t, n(c), n(acc)]; }), { allNum: true }); })() + `<p>Payback = <b>${n(pb, 2)} år</b> (lineær interpolasjon i året der akkumulert kontantstrøm skifter fortegn).</p>` },
          { q: 'Hva er den <b>diskonterte</b> tilbakebetalingstiden?', answer: dpb, unit: 'år', dec: 2, tol: { abs: 0.012 },
            hint: 'Diskonter hver kontantstrøm først, og akkumuler nåverdiene.',
            sol: (() => { let acc = 0; return table(['År', 'Nåverdi', 'Akkumulert nåverdi'], disc.map((c, t) => { acc += c; return [t, n(c), n(acc)]; }), { allNum: true }); })() +
              (isFinite(dpb) ? `<p>Diskontert payback = <b>${n(dpb, 2)} år</b> – alltid lengre enn vanlig payback.</p>` : '') },
          { q: 'Hva er nåverdiindeksen til prosjekt A i del 2?', answer: projs[0].npv / projs[0].inv, unit: '', dec: 3, tol: { abs: 0.0012 },
            sol: f(`NVI = ${frac('NNV', 'Investering')} = ${frac(n(projs[0].npv), n(projs[0].inv))} = ${n(projs[0].npv / projs[0].inv, 3)}`) },
          { q: 'Anta at prosjektene er <b>delbare</b>. Hva er den høyeste samlede NNV bedriften kan oppnå innenfor budsjettet?', answer: fracNpv, unit: 'kr', tol: { abs: 2000 },
            hint: 'Ranger etter nåverdiindeks og fyll opp budsjettet. Det siste prosjektet tas med delvis.',
            sol: table(['Prosjekt', 'Investering', 'NNV', 'NVI'], ranked.map((x) => [x.nm, n(x.inv), n(x.npv), n(x.npv / x.inv, 3)])) + `<p>Velg i rekkefølge etter NVI: ${used.join(', ')}. Samlet NNV = <b>${n(fracNpv)}</b>.</p>` },
          { q: 'Anta at prosjektene <b>ikke</b> er delbare. Hva er den høyeste samlede NNV innenfor budsjettet?', answer: best.npv, unit: 'kr', tol: { abs: 1 },
            hint: 'Nåverdiindeksen er bare en rettesnor når prosjektene er udelelige – prøv kombinasjoner.',
            sol: `<p>Beste kombinasjon er <b>${best.set.join(' + ')}</b> med samlet investering ${n(best.inv)} (budsjett ${n(budget)}) og samlet NNV <b>${n(best.npv)}</b>.</p><p>Med udelelige prosjekter kan rangering etter NVI gi feil svar fordi budsjettet ikke utnyttes fullt – man må sammenligne samlet NNV for aktuelle kombinasjoner.</p>` },
          { kind: 'text', q: 'Hva kan du si om payback-metoden som verktøy for å analysere prosjektlønnsomhet?',
            points: ['Tar ikke hensyn til tidsverdien av penger (vanlig payback).', 'Ser bort fra alle kontantstrømmer etter tilbakebetalingstidspunktet – kan forkaste lønnsomme, langsiktige prosjekter.',
              'Kravet til maksimal tilbakebetalingstid er vilkårlig satt.', 'Fordeler: enkel, sier noe om likviditet og risiko (rask tilbakebetaling = mindre eksponering). Brukes som supplement, ikke som lønnsomhetsmål.'] },
        ],
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
