/* Kapittel 8 + 11 – Nåverdi etter skatt, WACC. Den store eksamensoppgaven (25–40 %). */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table, cfTable } = U;
  const S_TAX = 0.22;

  const firms = [['AS Villmark', 'en ladbar kaffekjele for turbruk'], ['AS Innovasjon', 'en ny smart dørlås'], ['Fjordtek AS', 'en kompakt vannrenser'],
    ['AS ABC', 'en videreutviklet sykkelcomputer'], ['Nordlys Elektro AS', 'en bærbar solcellelader'], ['Kystmek AS', 'en ny type fortøyningskrok'],
    ['Polar Outdoor AS', 'et oppvarmet sitteunderlag'], ['Bergen Sensor AS', 'en fuktsensor for boliger']];

  /** Felles WACC-tekst og -beregning. */
  function waccSetup(R, firm) {
    const rf = R.pick([0.02, 0.025, 0.03, 0.035, 0.04]);
    const rm = R.pick([0.08, 0.09, 0.10]);
    const beta = R.int(105, 185, 5) / 100;
    const rd = rf + R.pick([0.01, 0.015, 0.02, 0.025]);
    const wD = R.pick([0.3, 0.36, 0.4, 0.5, 0.6]);
    const wE = 1 - wD;
    const re = F.capm(rf, beta, rm);
    const wacc = F.wacc(re, wE, rd, wD, S_TAX);
    const comparable = R.bool(0.5);
    const finTxt = R.pick([
      `${firm} finansierer sine prosjekter med en egenkapitalandel på ${pct(wE, 0)}.`,
      `${firm} finansierer sine prosjekter med en gjeldsandel på ${pct(wD, 0)}.`,
      `${firm} finansierer sine prosjekter med ${pct(wE, 0)} egenkapital og ${pct(wD, 0)} gjeld.`]);
    const text = `<p>Bedriftens skattesats er 22 %. Risikofri rente er ${pct(rf, 1)} og markedsavkastningen er ${pct(rm, 0)}. ${firm} kan låne penger til en rente på ${pct(rd, 1)} før skatt. ` +
      (comparable ? `${firm} er ikke børsnotert, men et sammenlignbart børsnotert selskap har en aksjebeta på ${n(beta, 2)}. ` : `Bedriftens aksjebeta er ${n(beta, 2)}. `) + finTxt + '</p>';
    const sol = f(`r<sub>e</sub> = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>) = ${pct(rf, 1)} + ${n(beta, 2)} · (${pct(rm, 0)} − ${pct(rf, 1)}) = ${pct(re, 2)}`) +
      f(`WACC = r<sub>e</sub> · ${frac('E', 'V')} + r<sub>g</sub> · (1 − s) · ${frac('G', 'V')} = ${pct(re, 2)} · ${n(wE, 2)} + ${pct(rd, 1)} · (1 − 0,22) · ${n(wD, 2)} = ${pct(wacc, 2)}`) +
      '<p class="small muted">Pensum (7. utg.) bruker kapitalverdimodellen <b>uten</b> skattejustering av risikofri rente. Gjeldsrenten skattejusteres fordi renter er fradragsberettiget.</p>';
    return { rf, rm, beta, rd, wD, wE, re, wacc, text, sol };
  }
  O._waccSetup = waccSetup;

  // ------------------------------------------------------------------
  O.reg({
    id: 'k8-nv-etter-skatt-komplett', chapter: 8, level: 3, minutes: 60, examLike: 'Siste oppgave 2018–2025 (25–40 %)',
    title: 'Den store oppgaven: WACC og nåverdi etter skatt',
    topic: 'Nåverdi etter skatt',
    blurb: 'Relevante kontantstrømmer med feller, arbeidskapital, saldoavskrivning, WACC og salg av anleggsmiddel. Har kommet hvert eneste år.',
    gen(R) {
      // Trekk på nytt til nåverdien er realistisk (innenfor ±22 % av investeringen), slik at konklusjonen ikke er opplagt.
      let t; for (let i = 0; i < 120; i++) { t = this.build(R); if (Math.abs(t.npv) < 0.22 * t.AM) break; }
      return t;
    },
    build(R) {
      const [firm, prod] = R.pick(firms);
      const N = 5;
      const W = waccSetup(R, firm);
      const r = W.wacc;
      const a = R.pick([0.2, 0.2, 0.2, 0.24, 0.3]);
      const AM = R.int(10, 40) * 500000;
      // Salg
      const growthMode = R.bool(0.35);
      const price0 = R.pick([60, 120, 250, 480, 650, 900, 1500]);
      const vcu = Math.round(price0 * R.pick([0.3, 0.35, 0.4, 0.45, 0.5]));
      const baseRev = AM * R.pick([0.55, 0.65, 0.75, 0.85]);
      const v1 = Math.max(100, Math.round(baseRev / price0 / 100) * 100);
      let vol, price, gv = 0, gp = 0;
      if (growthMode) {
        gv = R.pick([0.03, 0.05, 0.08, 0.10]); gp = R.pick([0, 0.02, 0.03]);
        vol = U.range(1, N).map((t) => v1 * Math.pow(1 + gv, t - 1)); price = U.range(1, N).map((t) => price0 * Math.pow(1 + gp, t - 1));
      } else {
        const shape = R.pick([[1, 1.2, 1.4, 1.4, 1.1], [0.8, 1, 1.25, 1.25, 1], [1, 1.25, 1.5, 1.5, 1.25], [1, 1, 1.15, 1.15, 0.85], [0.6, 0.8, 1.5, 1.5, 1.2]]);
        vol = shape.map((x) => Math.round(v1 * x / 100) * 100); price = U.range(1, N).map(() => price0);
      }
      const rev = vol.map((v, i) => v * price[i]);
      const vc = vol.map((v) => v * vcu);
      const FK0 = Math.round(rev[0] * R.pick([0.1, 0.15, 0.2]) / 50000) * 50000;
      const gF = growthMode ? R.pick([0, 0.02]) : 0;
      const FK = U.range(1, N).map((t) => FK0 * Math.pow(1 + gF, t - 1));
      // Arbeidskapital
      const wcPct = R.pick([0.15, 0.18, 0.2, 0.25]);
      const WCbal = []; for (let t = 0; t < N; t++) WCbal.push(wcPct * rev[t]); WCbal.push(0); // WCbal[t] = bundet ved utgangen av år t
      const wcCF = WCbal.map((w, t) => -(w - (t === 0 ? 0 : WCbal[t - 1])));
      // Moduler (feller)
      const mods = R.shuffle(['sunk', 'overhead', 'rent', 'salary', 'cannibal', 'overhaul', 'install', 'specialist']).slice(0, R.int(3, 4));
      if (!mods.includes('sunk') && !mods.includes('overhead') && !mods.includes('specialist')) mods[0] = R.pick(['sunk', 'overhead']);
      const extraRows = []; const txt = []; const notes = []; const irrelevant = [];
      let AMb = AM;
      const zero = () => Array(N).fill(0);
      if (mods.includes('sunk')) {
        const dev = R.int(5, 30) * 100000;
        txt.push(`Utviklingskostnadene har så langt beløpt seg til ${n(dev)}.`);
        irrelevant.push(`<b>Utviklingskostnadene (${n(dev)})</b> er allerede påløpt (sunk cost) og påvirkes ikke av beslutningen.`);
      }
      if (mods.includes('install')) {
        const inst = R.int(2, 10) * 100000; AMb = AM + inst;
        txt.push(`Installasjonskostnadene for anleggsmidlene er beregnet til ${n(inst)}, og dette beløpet balanseføres (aktiveres) sammen med anleggsmidlene.`);
        notes.push(`Installasjonskostnaden aktiveres: investering og avskrivningsgrunnlag blir ${n(AM)} + ${n(inst)} = <b>${n(AMb)}</b>.`);
      }
      if (mods.includes('overhead')) {
        const H = R.int(4, 12) * 100000; const q = R.pick([0, 0.5, 0.25]);
        txt.push(`Hovedkontoret krever at ${n(H)} av selskapets indirekte faste kostnader bæres av prosjektet årlig` + (q ? `, men prosjektet skaper bare ${pct(q, 0)} av disse kostnadene.` : ', selv om disse kostnadene ikke påvirkes av om prosjektet gjennomføres eller ikke.'));
        if (q) { extraRows.push(['Indirekte kostnader (' + pct(q, 0) + ')', zero().map(() => -H * q)]); notes.push(`Bare den delen av de indirekte kostnadene prosjektet faktisk forårsaker er relevant: ${pct(q, 0)} · ${n(H)} = ${n(H * q)}.`); }
        else irrelevant.push(`<b>Fordelte indirekte kostnader (${n(H)})</b> endres ikke av prosjektet og er derfor ikke en relevant kontantstrøm.`);
      }
      if (mods.includes('rent')) {
        const L = R.int(15, 40) * 10000; const gL = R.pick([0.02, 0.03]);
        txt.push(`Hvis prosjektet starter, må man ta i bruk et lokale man eier, men som i dag er leid ut med en leieinntekt på ${n(L)} i år 1. Utleieavtalen sier at leien økes med ${pct(gL, 0)} årlig.`);
        extraRows.push(['Tapt leieinntekt', zero().map((_, i) => -L * Math.pow(1 + gL, i))]);
        notes.push('Tapt leieinntekt er en <b>alternativkostnad</b> og skal med, selv om det ikke er en utbetaling.');
      }
      if (mods.includes('salary')) {
        const A = R.int(50, 70) * 10000, B = A + R.int(8, 20) * 10000;
        txt.push(`En person som allerede er ansatt, får ansvar for prosjektet. Lønnen er i dag ${n(A)} årlig, men vil på grunn av økt ansvar øke til ${n(B)} årlig.`);
        extraRows.push(['Lønnsøkning', zero().map(() => -(B - A))]);
        notes.push(`Bare <b>lønnsøkningen</b> (${n(B)} − ${n(A)} = ${n(B - A)}) er relevant – grunnlønnen betales uansett.`);
      }
      if (mods.includes('specialist')) {
        const A = R.int(60, 80) * 10000, B = R.int(85, 120) * 10000, yrs = R.pick([2, 3]);
        txt.push(`En spesialist fra en annen enhet i selskapet vil arbeide med prosjektet de ${yrs} første årene. Lønnen hennes er ${n(A)} årlig. Det må ansettes vikarer for å ivareta oppgavene spesialisten hadde, med samlet lønnskostnad ${n(B)} årlig i samme periode.`);
        extraRows.push(['Vikarer', zero().map((_, i) => (i < yrs ? -B : 0))]);
        irrelevant.push(`<b>Spesialistens lønn (${n(A)})</b> betales uansett. Det relevante er merkostnaden til vikarene (${n(B)} i år 1–${yrs}).`);
      }
      if (mods.includes('cannibal')) {
        const pe = Math.round(price0 * 0.75), ve = Math.round(pe * 0.45), fe = Math.round(pe * 0.2);
        const u1 = Math.round(v1 * R.pick([0.15, 0.2, 0.25]) / 100) * 100, u2 = Math.round(u1 * 0.8 / 100) * 100;
        txt.push('Salget av det nye produktet vil gå ut over salget av et eksisterende produkt, som er kalkulert slik per enhet:' +
          table(['', 'År 1', 'År 2'], [['Pris', n(pe), n(pe)], ['Variabel enhetskostnad', n(ve), n(ve)], ['Fast enhetskostnad', n(fe), n(fe)], ['Resultat', n(pe - ve - fe), n(pe - ve - fe)]]) +
          `Man regner med at salget av det eksisterende produktet faller med ${n(u1)} enheter i år 1 og ${n(u2)} enheter i år 2. Etter år 2 ville dette produktet uansett blitt trukket fra markedet.`);
        extraRows.push(['Tapt DB eksisterende produkt', [-u1 * (pe - ve), -u2 * (pe - ve), 0, 0, 0]]);
        notes.push(`Kannibalisering: tapt <b>dekningsbidrag</b> = enheter · (${n(pe)} − ${n(ve)}) = ${n(u1 * (pe - ve))} i år 1 og ${n(u2 * (pe - ve))} i år 2. Faste enhetskostnader er fordelte kostnader som ikke faller bort.`);
      }
      if (mods.includes('overhaul')) {
        const k = R.pick([3, 4]); const M = Math.round(AM * R.pick([0.1, 0.15]) / 100000) * 100000;
        txt.push(`Anleggsmidlene må gjennomgå et større vedlikehold i år ${k}, kostnadsberegnet til ${n(M)}.`);
        extraRows.push(['Større vedlikehold', zero().map((_, i) => (i === k - 1 ? -M : 0))]);
      }
      // Kontantstrøm
      const op = U.range(0, N - 1).map((i) => rev[i] - vc[i] - FK[i] + U.sum(extraRows.map((x) => x[1][i])));
      const tax = op.map((x) => -S_TAX * x);
      const shield = F.pvSaldoTaxShield(AMb, a, S_TAX, r);
      const cf = [-AMb + shield + wcCF[0]];
      for (let t = 1; t <= N; t++) cf.push(op[t - 1] + tax[t - 1] + wcCF[t]);
      const npv = F.npv(r, cf);
      const Sv = Math.round(AM * R.pick([0.05, 0.08, 0.1, 0.15]) / 50000) * 50000;
      const pvSale = Sv / Math.pow(1 + r, N), pvLost = F.pvSaldoTaxShield(Sv, a, S_TAX, r) / Math.pow(1 + r, N);
      const dNpv = pvSale - pvLost;

      const pad = (arr) => [null].concat(arr);
      const rows = [['Omsetning', pad(rev)], ['Variable kostnader', pad(vc.map((x) => -x))], ['Betalbare faste kostnader', pad(FK.map((x) => -x))]]
        .concat(extraRows.map((x) => [x[0], pad(x[1].map((v) => v || null))]))
        .concat([['Resultat før skatt (ekskl. avskr.)', pad(op), 'sub'], ['Skatt 22 %', pad(tax)], ['Arbeidskapital', wcCF.map((x) => x || null)],
          ['Anleggsmidler', [-AMb]], ['NV spart skatt avskrivninger', [shield]], ['Beregningsgrunnlag (kontantstrøm)', cf, 'sum']]);

      const volTxt = growthMode
        ? `Salgsvolumet i år 1 er budsjettert til ${n(v1)} enheter, og man forventer at volumet øker med ${pct(gv, 0)} årlig. Salgsprisen er budsjettert til ${n(price0)}${gp ? `, og man forventer at prisen kan øke med ${pct(gp, 0)} årlig` : ' og holdes konstant'}. De variable enhetskostnadene er ${n(vcu)} og forventes ikke å øke. Betalbare faste kostnader er budsjettert til ${n(FK0)} i år 1${gF ? ` og øker med ${pct(gF, 0)} årlig` : ' og er konstante'}.`
        : `Salgsprisen er ${n(price0)} per enhet og de variable enhetskostnadene er ${n(vcu)}. Det er budsjettert med salg på ${vol.map((v, i) => `${n(v)} enheter i år ${i + 1}`).join(', ')}. Betalbare faste kostnader er budsjettert til ${n(FK0)} årlig.`;

      return {
        npv, AM,
        text: `<p>${firm} har utviklet ${prod} og vurderer nå om produktet skal lanseres. Prosjektets levetid er ${N} år.</p>` +
          `<p>Prosjektet krever en investering i anleggsmidler på <b>${n(AM)}</b>. Anleggsmidlene avskrives etter saldometoden med <b>${pct(a, 0)}</b> årlig, og man regner foreløpig ikke med noen salgsverdi ved levetidens slutt.</p>` +
          `<p>${volTxt}</p><p>Prosjektet medfører økt arbeidskapital, og man antar at arbeidskapitalen vil utgjøre <b>${pct(wcPct, 0)}</b> av omsetningen.</p>` +
          txt.map((t) => `<p>${t}</p>`).join('') + W.text,
        parts: [
          { q: 'Beregn egenkapitalens avkastningskrav med kapitalverdimodellen.', answer: W.re, unit: '%',
            sol: f(`r<sub>e</sub> = ${pct(W.rf, 1)} + ${n(W.beta, 2)} · (${pct(W.rm, 0)} − ${pct(W.rf, 1)}) = ${pct(W.re, 2)}`) },
          { q: `Beregn ${firm} sitt veide totalavkastningskrav (WACC).`, answer: r, unit: '%', sol: W.sol },
          { kind: 'text', q: 'Hvilke opplysninger i oppgaven skal <b>ikke</b> med i kontantstrømmen, og hvilke må justeres? Begrunn kort.',
            points: irrelevant.concat(notes).concat(['<b>Avskrivninger</b> er ikke en kontantstrøm – bare skatteeffekten av dem tas med.',
              '<b>Rentekostnader/finansiering</b> holdes utenfor (totalkapitalmetoden): finansieringen ligger i avkastningskravet WACC.']) },
          { q: 'Beregn prosjektets nåverdi etter skatt. (Bruk WACC uten avrunding.)', answer: npv, unit: 'kr', tol: { abs: AM * 0.004, rel: 0.012 },
            hint: 'Fremgangsmåte fra løsningsforslagene: (1) relevant driftskontantstrøm før skatt, (2) 22 % skatt av denne, (3) arbeidskapital = prosent av <i>neste års</i> omsetning, bundet året før, (4) nåverdi av spart skatt på saldoavskrivninger som eget ledd i år 0: AM · a · s / (r + a).',
            sol: cfTable(rows, N) +
              steps([
                `<b>Arbeidskapital</b> bindes ved inngangen til året: ${pct(wcPct, 0)} av neste års omsetning. År 0: ${pct(wcPct, 0)} · ${n(rev[0])} = ${n(WCbal[0])}. Deretter bare <i>endringen</i>, og alt frigjøres i år ${N}.`,
                `<b>Skatt</b>: 22 % av driftskontantstrømmen før avskrivninger. Avskrivningenes skatteeffekt tas i ett ledd:` +
                  f(`NV spart skatt = ${frac('AM · a · s', 'r + a')} = ${frac(`${n(AMb)} · ${n(a, 2)} · 0,22`, `${n(r, 4)} + ${n(a, 2)}`)} = ${n(shield)}`) +
                  'Formelen forutsetter at saldoen avskrives videre i all fremtid (også etter levetidens slutt).',
                `<b>Nåverdi</b> med WACC = ${pct(r, 3)}: <code>=NNV(WACC; år1:år${N}) + år0</code> = <b>${n(npv)}</b>.`,
                `Prosjektet er ${npv > 0 ? '<b>lønnsomt</b> (NV &gt; 0) og bør gjennomføres' : '<b>ulønnsomt</b> (NV &lt; 0) og bør ikke gjennomføres'}.`].concat(notes)) },
          { q: `Anta nå at anleggsmidlene kan selges for <b>${n(Sv)}</b> ved levetidens slutt. Salget behandles på den skattemessig gunstigste måten. Hvor mye <b>endres</b> nåverdien etter skatt?`, answer: dNpv, unit: 'kr', tol: { abs: Sv * 0.004, rel: 0.012 },
            hint: 'Skattemessig gunstigst = salgssummen nedskrives på saldo. Du får salgssummen, men mister fremtidige avskrivninger på det samme beløpet.',
            sol: f(`NV salgssum = ${frac(n(Sv), `(1 + ${n(r, 4)})<sup>${N}</sup>`)} = ${n(pvSale)}`) +
              f(`NV økt skatt = ${frac(`${n(Sv)} · ${n(a, 2)} · 0,22`, `${n(r, 4)} + ${n(a, 2)}`)} · ${frac('1', `(1 + ${n(r, 4)})<sup>${N}</sup>`)} = ${n(pvLost)}`) +
              f(`Endring i NV = ${n(pvSale)} − ${n(pvLost)} = +${n(dNpv)}`) + `<p>Ny nåverdi etter skatt: ${n(npv)} + ${n(dNpv)} = <b>${n(npv + dNpv)}</b>.</p>` +
              '<p class="small muted">Alternativet – å inntektsføre gevinsten direkte – gir skatt med én gang og er derfor mindre gunstig enn å nedskrive på saldo (skatten skyves ut i tid).</p>' },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k8-saldo-arlig-kontantstrom', chapter: 8, level: 2, minutes: 25, examLike: 'Forelesning kap. 8 («Nytt eksempel»)',
    title: 'Nåverdi etter skatt – år for år med saldoavskrivning',
    topic: 'Nåverdi etter skatt',
    blurb: 'Sett opp resultat, skatt og kontantstrøm etter skatt per år, og vis at samleleddsmetoden gir samme svar.',
    gen(R) {
      const N = R.pick([3, 4, 5]); const a = R.pick([0.2, 0.24, 0.3]); const r = R.pick([0.07, 0.08, 0.09, 0.1]);
      const AM = R.int(10, 50) * 100000;
      const cfb = U.range(1, N).map(() => Math.round(AM * (R.int(28, 45) / 100) / 10000) * 10000);
      const sal = F.saldo(AM, a, N);
      const taxable = cfb.map((c, i) => c - sal.dep[i]); const tax = taxable.map((x) => x * S_TAX);
      const cfa = cfb.map((c, i) => c - tax[i]);
      const rvN = sal.book[N - 1];
      const shieldAfter = F.pvSaldoTaxShield(rvN, a, S_TAX, r); const pvAfter = shieldAfter / Math.pow(1 + r, N);
      const npv = -AM + F.npv(r, [0].concat(cfa)) + pvAfter;
      const shieldAll = F.pvSaldoTaxShield(AM, a, S_TAX, r);
      const pvOp = F.npv(r, [0].concat(cfb.map((c) => c * (1 - S_TAX))));
      const pad = (x) => [null].concat(x);
      return {
        text: `<p>En bedrift vurderer en investering på <b>${n(AM)}</b> med ${N} års levetid og ingen salgsverdi. Investeringen saldoavskrives med <b>${pct(a, 0)}</b> årlig. Skattesatsen er 22 %, og avkastningskravet etter skatt er <b>${pct(r, 0)}</b>. Kontantstrøm fra driften før skatt er budsjettert slik:</p>` +
          cfTable([['Kontantstrøm før skatt', pad(cfb)]], N, { start: 1 }),
        parts: [
          { q: 'Hva er saldoavskrivningen i år 2?', answer: sal.dep[1], unit: 'kr',
            sol: f(`AV<sub>2</sub> = a · RV<sub>1</sub> = ${n(a, 2)} · ${n(AM)} · (1 − ${n(a, 2)}) = ${n(sal.dep[1])}`) },
          { q: 'Hva er kontantstrøm etter skatt i år 1?', answer: cfa[0], unit: 'kr',
            hint: 'Skatt = 22 % · (kontantstrøm før skatt − avskrivning). Avskrivningen legges ikke til som utbetaling.',
            sol: cfTable([['Kontantstrøm før skatt', pad(cfb)], ['− Saldoavskrivning', pad(sal.dep)], ['= Skattepliktig resultat', pad(taxable), 'sub'], ['Skatt 22 %', pad(tax)], ['Kontantstrøm etter skatt', pad(cfa), 'sum']], N, { start: 1 }) +
              (taxable.some((x) => x < 0) ? '<p>Negativt skattepliktig resultat gir en skattebesparelse – vi forutsetter at bedriften er i skatteposisjon totalt.</p>' : '') },
          { q: `Hva er uavskrevet saldo (restverdi) ved utgangen av år ${N}?`, answer: rvN, unit: 'kr',
            sol: f(`RV<sub>${N}</sub> = ${n(AM)} · (1 − ${n(a, 2)})<sup>${N}</sup> = ${n(rvN)}`) },
          { q: `Hva er nåverdien <b>i dag</b> av spart skatt på avskrivningene som gjenstår <b>etter</b> år ${N}?`, answer: pvAfter, unit: 'kr',
            hint: 'Saldoen avskrives videre i all fremtid. Verdien på tidspunkt n er RVₙ · s · a/(r + a), som så diskonteres n år.',
            sol: f(`${frac(`${n(rvN)} · 0,22 · ${n(a, 2)}`, `${n(r, 2)} + ${n(a, 2)}`)} = ${n(shieldAfter)} (i år ${N})`) + f(`${frac(n(shieldAfter), `${n(1 + r, 2)}<sup>${N}</sup>`)} = ${n(pvAfter)}`) },
          { q: 'Hva er prosjektets nåverdi etter skatt?', answer: npv, unit: 'kr', tol: { abs: AM * 0.002 },
            sol: f(`NNV = −${n(AM)} + ${n(F.npv(r, [0].concat(cfa)))} + ${n(pvAfter)} = ${n(npv)}`) +
              '<p><b>Kontroll med samleleddsmetoden</b> (den løsningsforslagene på eksamen bruker):</p>' +
              f(`NNV = −AM + Σ ${frac('CF<sub>t</sub> · (1 − s)', '(1 + r)<sup>t</sup>')} + ${frac('AM · s · a', 'r + a')} = −${n(AM)} + ${n(pvOp)} + ${n(shieldAll)} = ${n(-AM + pvOp + shieldAll)}`) +
              '<p>Samme svar. Samleleddsmetoden er raskest på eksamen, men gir ikke «riktig» kontantstrøm per år – bare riktig nåverdi.</p>' },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k11-wacc-kvm', chapter: 11, level: 2, minutes: 12, examLike: 'Deloppgave a) i siste oppgave hvert år',
    title: 'Kapitalverdimodellen og WACC',
    topic: 'Avkastningskrav',
    blurb: 'Egenkapitalkrav med KVM, gjeldskrav etter skatt og veid totalkapitalkostnad.',
    gen(R) {
      const firm = R.pick(firms)[0]; const W = waccSetup(R, firm);
      const E = R.int(20, 90) * 10; const G = Math.round(E * W.wD / W.wE);
      const beta2 = U.round(W.beta + R.pick([-0.4, -0.3, 0.3, 0.4]), 2);
      const re2 = F.capm(W.rf, beta2, W.rm);
      const ret = W.re + R.pick([-0.03, -0.02, 0.02, 0.03]);
      const betaA = W.beta * W.wE;
      return {
        text: W.text + `<p class="small muted">Markedsverdien av egenkapitalen er ${n(E)} mill. og av gjelden ${n(G)} mill.</p>`,
        parts: [
          { q: 'Hva er markedets risikopremie?', answer: W.rm - W.rf, unit: '%', sol: f(`r<sub>m</sub> − r<sub>f</sub> = ${pct(W.rm, 0)} − ${pct(W.rf, 1)} = ${pct(W.rm - W.rf, 2)}`) },
          { q: 'Beregn egenkapitalens avkastningskrav.', answer: W.re, unit: '%', sol: f(`r<sub>e</sub> = ${pct(W.rf, 1)} + ${n(W.beta, 2)} · ${pct(W.rm - W.rf, 1)} = ${pct(W.re, 2)}`) },
          { q: 'Hva er gjeldskostnaden etter skatt?', answer: W.rd * (1 - S_TAX), unit: '%', sol: f(`r<sub>g</sub> · (1 − s) = ${pct(W.rd, 1)} · 0,78 = ${pct(W.rd * 0.78, 2)}`) },
          { q: 'Beregn WACC.', answer: W.wacc, unit: '%', sol: W.sol },
          { q: `En aksje med beta ${n(W.beta, 2)} forventes å gi ${pct(ret, 1)} avkastning. Hvor stor er avviket fra verdipapirmarkedslinjen (alfa)?`, answer: ret - W.re, unit: '%',
            sol: f(`α = forventet avkastning − krav etter KVM = ${pct(ret, 1)} − ${pct(W.re, 2)} = ${pct(ret - W.re, 2)}`) +
              `<p>Aksjen ligger ${ret > W.re ? 'over linjen – den er <b>underpriset</b> (kjøp). Kursen vil presses opp til forventet avkastning faller til kravet.' : 'under linjen – den er <b>overpriset</b> (selg). Kursen vil falle til forventet avkastning stiger til kravet.'}</p>` },
          { q: `Et annet prosjekt har høyere/lavere risiko, tilsvarende egenkapitalbeta ${n(beta2, 2)}. Hva blir egenkapitalkravet for dette prosjektet?`, answer: re2, unit: '%',
            sol: f(`r<sub>e</sub> = ${pct(W.rf, 1)} + ${n(beta2, 2)} · ${pct(W.rm - W.rf, 1)} = ${pct(re2, 2)}`) + '<p>Avkastningskravet skal reflektere <i>prosjektets</i> systematiske risiko, ikke nødvendigvis bedriftens gjennomsnitt.</p>' },
          { q: 'Hva er bedriftens totalkapitalbeta (investeringsbeta) dersom gjeldsbeta er 0?', answer: betaA, unit: '', dec: 2,
            sol: f(`β<sub>T</sub> = β<sub>e</sub> · ${frac('E', 'V')} + β<sub>g</sub> · ${frac('G', 'V')} = ${n(W.beta, 2)} · ${n(W.wE, 2)} + 0 = ${n(betaA, 2)}`) },
          { kind: 'text', q: 'Hvorfor bruker vi beta og ikke standardavvik som risikomål i kapitalverdimodellen?',
            points: ['Total risiko (standardavvik) består av systematisk (markeds-) risiko og usystematisk (bedriftsspesifikk) risiko.',
              'Usystematisk risiko kan diversifiseres bort gratis i en veldiversifisert portefølje – markedet betaler derfor ingen risikopremie for den.',
              'Beta måler aksjens bidrag til markedsporteføljens risiko: β = Kov(r<sub>j</sub>, r<sub>m</sub>) / Var(r<sub>m</sub>). Bare denne risikoen prises.',
              'Markedsporteføljen har beta 1, risikofri plassering beta 0.'] },
        ],
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
