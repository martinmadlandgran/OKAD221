/* Relevante kontantstrømmer: differanse ved utvidelse (hotell), kapasitetsutvidelse etter skatt, kontantstrøm til egenkapitalen. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table, cfTable } = U;
  const S_TAX = 0.22;
  const pad = (a) => [null].concat(a);

  // ==================================================================
  // 1) Hotell: utvidelse med nabobygg – differansekontantstrøm (2022 oppg. 1, kap. 6 oppg. 6)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot eksamen 2022. */
  function hotelCalc({ rooms0, add, days, price, vc, occ, rent, fk0, fk1, invest, T, r, ext }) {
    const dbUnit = price - vc;
    const db0 = rooms0 * days * dbUnit, db1 = db0 + add * days * occ * dbUnit, dDB = db1 - db0;
    const dFK = fk1 - fk0, cf = dDB - rent - dFK;
    const flows = [-invest].concat(Array(T).fill(cf));
    const A = F.annuityFactor(r, T), npv = -invest + cf * A, irr = F.irr(flows), pb = invest / cf;
    const extVal = cf * F.annuityFactor(r, ext) / Math.pow(1 + r, T);
    const critCf = invest / A, critOcc = (critCf + rent + dFK) / (add * days * dbUnit);
    return { dbUnit, db0, db1, dDB, dFK, cf, flows, A, npv, irr, pb, extVal, critCf, critOcc };
  }
  O._hotelCalc = hotelCalc;

  const hotels = ['Kaiparken Hotell AS', 'Torget Hotell AS', 'Elvebredden Hotell AS', 'Stasjonen Hotell AS', 'Bryggen Hotell AS', 'Fjellstua Hotell AS'];

  O.reg({
    id: 'k2-hotell-differanse', chapter: 2, level: 2, minutes: 25, examLike: '2022 oppg. 1 (20 %)',
    title: 'Utvidelse av et fullt hotell: differansekontantstrøm, NNV, payback og forlengelse',
    topic: 'Prosjektanalyse før skatt',
    blurb: 'Bare endringene teller: økt dekningsbidrag fra nye rom, leie og økning i faste kostnader. NNV, internrente, payback, verdien av en forlengelse og kritisk belegg.',
    gen(R) {
      // Trekk på nytt til kontantstrømmen er positiv og NNV verken er nær 0 eller svært negativ.
      let t; for (let k = 0; k < 120; k++) { t = this.build(R); if (t.task && Math.abs(t.c.npv) > 0.03 * t.p.invest && t.c.npv > -0.25 * t.p.invest) break; }
      for (let k = 0; !t.task && k < 1000; k++) t = this.build(R);
      return t.task;
    },
    build(R) {
      const name = R.pick(hotels);
      const rooms0 = R.pick([40, 50, 60, 80]), add = R.pick([10, 15, 20, 25]), days = R.pick([350, 360, 365]);
      const price = R.pick([900, 1000, 1100, 1200, 1400]), vc = R.pick([120, 150, 180, 200, 250]);
      const occ = R.pick([1, 1, 0.9, 0.85, 0.8]);
      const rent = R.int(5, 12) * 100000, fk0 = R.int(15, 30) * 100000, fk1 = fk0 + R.int(3, 8) * 100000;
      const T = R.pick([4, 5, 5, 6]), r = R.pick([0.08, 0.10, 0.10, 0.12]), ext = R.pick([2, 2, 3]);
      const cf0 = add * days * occ * (price - vc) - rent - (fk1 - fk0);
      const invest = Math.max(1000000, Math.round(cf0 * F.annuityFactor(r, T) * R.pick([0.8, 0.88, 0.95, 1.05]) / 500000) * 500000);
      const p = { rooms0, add, days, price, vc, occ, rent, fk0, fk1, invest, T, r, ext };
      const c = hotelCalc(p);
      if (c.cf <= 0) return { p, c: { npv: 0 }, task: null };
      const rooms1 = rooms0 + add;
      const occTxt = occ === 1 ? 'Man regner med at også de nye rommene vil være fullt belagt.' : `I de nye rommene regner man med et belegg på <b>${pct(occ, 0)}</b> hvert år.`;
      const flowsTbl = cfTable([['Økt dekningsbidrag', pad(Array(T).fill(c.dDB))], ['Leie av nabobygg', pad(Array(T).fill(-rent))], ['Økte faste kostnader', pad(Array(T).fill(-c.dFK))], ['Ombygging', [-invest]], ['Kontantstrøm', c.flows, 'sum']], T);
      const task = {
        text: `<p>${name} har ${rooms0} rom og er åpent ${days} dager i året. Romprisen er <b>${n(price)}</b>, og variable kostnader per natt er <b>${n(vc)}</b>. Beleggsprosenten er praktisk talt 100 %: det er betalende gjester på et rom så godt som hele tiden.</p>` +
          `<p>Betalbare faste kostnader til drift av resepsjon, vedlikehold osv. er ${n(fk0)} årlig.</p>` +
          `<p>Hotellet må ofte avvise gjester fordi det er fullt. Man har nå muligheten til å leie et nabobygg for <b>${n(rent)}</b> årlig. Avtalen kan vare i <b>${T} år</b>. Bygget må oppgraderes for å fungere som hotell, og oppgraderingen er beregnet å koste <b>${n(invest)}</b>. Tar man bygget i bruk, øker romkapasiteten til <b>${rooms1} rom</b>, og de faste kostnadene øker til <b>${n(fk1)}</b> årlig. ${occTxt} Når leieperioden er over, overdras bygget til eieren uten betaling. Avkastningskravet er <b>${pct(r, 0)}</b>. Se bort fra skatt.</p>`,
        parts: [
          { q: 'Hvor mye øker det årlige dekningsbidraget dersom nabobygget tas i bruk?', answer: c.dDB, unit: 'kr',
            hint: `Bare endringen er relevant. De ${rooms0} rommene hotellet har i dag, gir samme dekningsbidrag enten man utvider eller ikke.`,
            sol: f(`DB i dag = ${rooms0} rom · ${days} dager · (${n(price)} − ${n(vc)}) = ${n(c.db0)}`) +
              f(`DB med ${rooms1} rom = ${n(c.db0)} + ${add} rom · ${days} dager${occ === 1 ? '' : ' · ' + n(occ, 2)} · ${n(c.dbUnit)} = ${n(c.db1)}`) +
              f(`Økt DB = ${n(c.db1)} − ${n(c.db0)} = ${n(c.dDB)}`) },
          { q: `Hva er den årlige kontantstrømmen fra utvidelsen i år 1–${T}?`, answer: c.cf, unit: 'kr',
            hint: 'Trekk fra leien og bare <i>økningen</i> i de faste kostnadene – ikke hele beløpet.',
            sol: f(`${n(c.dDB)} − ${n(rent)} − (${n(fk1)} − ${n(fk0)}) = ${n(c.cf)}`) +
              `<p>De faste kostnadene hotellet har i dag (${n(fk0)}), betales uansett og er ikke relevante. Det er bare økningen på ${n(c.dFK)} som skyldes utvidelsen.</p>` },
          { q: 'Beregn utvidelsens nåverdi (NNV).', answer: c.npv, unit: 'kr', tol: { abs: invest * 0.001 },
            sol: flowsTbl + f(`NNV = −${n(invest)} + ${n(c.cf)} · A(${n(r * 100)} %, ${T}) = −${n(invest)} + ${n(c.cf)} · ${n(c.A, 4)} = ${n(c.npv)}`) +
              `<p>Utvidelsen er ${c.npv > 0 ? '<b>lønnsom</b>' : '<b>ikke lønnsom</b>'}. Excel: <code>=NNV(${n(r * 100)}%;år 1:år ${T})-${invest}</code></p>` },
          { q: 'Beregn internrenten.', answer: c.irr, unit: '%',
            sol: `<p><code>=IR(kontantstrøm år 0–${T})</code> eller <code>=RENTE(${T};${c.cf};-${invest})</code> = <b>${pct(c.irr, 2)}</b>. Den er ${c.irr > r ? 'høyere' : 'lavere'} enn avkastningskravet på ${pct(r, 0)}, som stemmer med at NNV er ${c.npv > 0 ? 'positiv' : 'negativ'}.</p>` },
          { q: 'Hva er tilbakebetalingstiden (payback), i år med to desimaler?', answer: c.pb, unit: 'år', dec: 2, tol: { abs: 0.012 },
            sol: f(`Payback = ${frac('Investering', 'Årlig kontantstrøm')} = ${frac(n(invest), n(c.cf))} = ${n(c.pb, 2)} år`) + '<p>Kontantstrømmen er lik hvert år, så det holder å dele. Med ulike beløp må du akkumulere år for år.</p>' },
          { kind: 'text', q: 'Hva kan du si om payback-metoden som verktøy for å analysere prosjektlønnsomhet?',
            points: ['Tar ikke hensyn til tidsverdien av penger: en krone om fire år teller like mye som en krone i dag.',
              `Ser bort fra alle kontantstrømmer etter tilbakebetalingstidspunktet. Her er payback ${n(c.pb, 2)} år av ${T}, men metoden sier ingenting om de siste årene.`,
              'Kravet til maksimal tilbakebetalingstid er vilkårlig.',
              'Fordel: enkel, og sier noe om likviditet og risiko. Brukes som supplement til NNV, ikke som lønnsomhetsmål.'] },
          { q: `Anta at leieavtalen kan forlenges med ${ext} år på samme vilkår etter at ${T}-årsavtalen er over. Hva er forlengelsen verdt i dag?`, answer: c.extVal, unit: 'kr', tol: { abs: invest * 0.001 },
            hint: `Forlengelsen gir ${ext} ekstra år med samme kontantstrøm, uten ny ombygging. Diskonter beløpene i år ${T + 1}${ext === 3 ? `, ${T + 2}` : ''} og ${T + ext} til i dag.`,
            sol: f(`Verdi i dag = ${U.range(T + 1, T + ext).map((t) => frac(n(c.cf), `${n(1 + r, 2)}<sup>${t}</sup>`)).join(' + ')} = ${n(c.extVal)}`) +
              f(`Eller: ${n(c.cf)} · A(${n(r * 100)} %, ${ext}) / ${n(1 + r, 2)}<sup>${T}</sup> = ${n(c.cf)} · ${n(F.annuityFactor(r, ext), 4)} / ${n(Math.pow(1 + r, T), 4)} = ${n(c.extVal)}`) },
          { q: `Hva er det laveste belegget i de nye rommene (i prosent) som gir NNV = 0 over ${T}-årsavtalen?`, answer: c.critOcc, unit: '%', tol: { abs: 0.0006 },
            hint: 'Finn den årlige kontantstrømmen som akkurat dekker investeringen (investering / annuitetsfaktor). Legg til leie og økte faste kostnader, og del på dekningsbidraget fra de nye rommene ved fullt belegg.',
            sol: f(`Kritisk årlig kontantstrøm = ${frac(n(invest), n(c.A, 4))} = ${n(c.critCf)}`) +
              f(`Kritisk DB = ${n(c.critCf)} + ${n(rent)} + ${n(c.dFK)} = ${n(c.critCf + rent + c.dFK)}`) +
              f(`Kritisk belegg = ${frac(n(c.critCf + rent + c.dFK), `${add} · ${days} · ${n(c.dbUnit)}`)} = ${pct(c.critOcc, 2)}`) +
              (c.critOcc > 1 ? '<p>Over 100 %: utvidelsen blir ikke lønnsom selv med fullt belegg i de nye rommene.</p>' : `<p>Belegget i de nye rommene kan falle til ${pct(c.critOcc, 1)} før utvidelsen blir ulønnsom${occ < 1 ? ` (budsjettert ${pct(occ, 0)})` : ''}.</p>`) },
        ],
      };
      return { p, c, task };
    },
  });

  // ==================================================================
  // 2) Kapasitetsutvidelse etter skatt (2023 oppg. 4, kap. 8 oppg. 6, kap. 11 oppg. 13)
  // ==================================================================
  /**
   * Ren beregning, også brukt til kontroll mot eksamen 2023.
   * demand[t-1] = mulig salg år t, cap0 = dagens kapasitet (= dagens salg), cap1 = samlet kapasitet etter utvidelse (Infinity = ingen grense).
   */
  function capCalc({ demand, cap0, cap1, price, vc, fk, overhaul, overhaulYear, AM, a, wcPct, r, salvage }) {
    const N = demand.length;
    const extra = demand.map((d) => Math.max(0, Math.min(d, cap1) - cap0));
    const rev = extra.map((q) => q * price), vcs = extra.map((q) => q * vc);
    const oh = U.range(1, N).map((t) => (t === overhaulYear ? overhaul : 0));
    const op = U.range(0, N - 1).map((i) => rev[i] - vcs[i] - fk - oh[i]);
    const tax = op.map((x) => -S_TAX * x);
    const WCbal = rev.map((x) => wcPct * x).concat([0]);
    const wcCF = WCbal.map((w, t) => -(w - (t ? WCbal[t - 1] : 0)));
    const shield = F.pvSaldoTaxShield(AM, a, S_TAX, r);
    const cf = [-AM + shield + wcCF[0]];
    for (let t = 1; t <= N; t++) cf.push(op[t - 1] + tax[t - 1] + wcCF[t]);
    const npv = F.npv(r, cf);
    const pvSale = salvage / Math.pow(1 + r, N), pvLost = F.pvSaldoTaxShield(salvage, a, S_TAX, r) / Math.pow(1 + r, N);
    return { N, extra, rev, vcs, oh, op, tax, WCbal, wcCF, shield, cf, npv, pvSale, pvLost, dNpv: pvSale - pvLost };
  }
  O._capCalc = capCalc;

  const capFirms = [['Optika AS', 'en linse til mobilkameraer'], ['Ventilteknikk AS', 'en ventil til fiskeoppdrett'], ['Nordpak AS', 'en returemballasje i papp'],
    ['Sensora AS', 'en fuktsensor til bygg'], ['Varmefilter AS', 'et filter til varmepumper'], ['Dronedeler AS', 'et batterideksel til droner']];

  O.reg({
    id: 'k8-kapasitetsutvidelse', chapter: 8, level: 3, minutes: 45, examLike: '2023 oppg. 4 (35 %)',
    title: 'Kapasitetsutvidelse: WACC og nåverdi etter skatt på merproduksjonen',
    topic: 'Nåverdi etter skatt',
    blurb: 'Salget ligger på kapasitetsgrensen. Bare økningen utover dagens kapasitet er relevant. WACC, arbeidskapital, saldoavskrivning, vedlikehold og salg av utstyret.',
    gen(R) {
      let t; for (let k = 0; k < 150; k++) { t = this.build(R); if (t && Math.abs(t.c.npv) < 0.22 * t.p.AM && Math.abs(t.c.npv) > 0.006 * t.p.AM) break; }
      return t.task;
    },
    build(R) {
      const [firm, prod] = R.pick(capFirms);
      const W = O._waccSetup(R, firm), r = W.wacc;
      const N = 5;
      const cap0 = R.pick([50000, 80000, 100000, 200000, 500000]);
      const f1 = R.pick([1.3, 1.5, 2, 3, 4]);
      const shape = R.pick([[1, 1.25, 1.5, 1.5, 1.25], [1, 1.1, 1.2, 1.3, 1.4], [1, 1.2, 1.3, 1.3, 1.1], [1, 1.25, 1.5, 1.4, 1.2]]);
      const step = cap0 / 20;
      const demand = shape.map((s) => Math.round(cap0 * f1 * s / step) * step);
      const limited = R.bool(0.4);
      const sorted = demand.slice().sort((x, y) => y - x);
      const cap1 = limited ? Math.round((sorted[1] + sorted[2]) / 2 / step) * step : Infinity;
      const extra1 = Math.min(demand[0], cap1) - cap0;
      // Pris velges slik at økt omsetning i år 1 blir 4–60 mill. (realistisk størrelse, som 14,4 mill. i 2023).
      const prices = [30, 48, 60, 85, 120, 250].filter((x) => extra1 * x >= 4e6 && extra1 * x <= 6e7);
      const price = prices.length ? R.pick(prices) : (extra1 * 250 < 4e6 ? 250 : 30);
      const vc = Math.round(price * R.pick([0.4, 0.5, 0.55]));
      const AM = Math.max(2000000, Math.round(extra1 * price * R.pick([1.0, 1.2, 1.4, 1.6]) / 500000) * 500000);
      const a = R.pick([0.2, 0.2, 0.2, 0.3]);
      const fk = Math.round(AM * R.pick([0.08, 0.1, 0.125]) / 100000) * 100000;
      const overhaulYear = R.pick([3, 4]), overhaul = Math.round(AM * R.pick([0.1, 0.15, 0.175]) / 100000) * 100000;
      const H = R.int(3, 10) * 100000;
      const wcPct = R.pick([0.15, 0.2, 0.25]);
      const salvage = Math.round(AM * R.pick([0.05, 0.08, 0.1]) / 100000) * 100000 || 100000;
      const p = { demand, cap0, cap1, price, vc, fk, overhaul, overhaulYear, AM, a, wcPct, r, salvage };
      const c = capCalc(p);
      const rows = [['Merkvantum (enheter)', pad(c.extra.map((x) => n(x)))], ['Omsetning (merkvantum · ' + n(price) + ')', pad(c.rev)], ['Variable kostnader', pad(c.vcs.map((x) => -x))], ['Andre faste kostnader', pad(Array(N).fill(-fk))],
        ['Større vedlikehold', pad(c.oh.map((x) => (x ? -x : null)))], ['Resultat før skatt (ekskl. avskr.)', pad(c.op), 'sub'], ['Skatt 22 %', pad(c.tax)], ['Arbeidskapital', c.wcCF.map((x) => x || null)],
        ['Anleggsmidler', [-AM]], ['NV spart skatt avskrivninger', [c.shield]], ['Beregningsgrunnlag (kontantstrøm)', c.cf, 'sum']];
      const capTxt = limited ? ` Det nye utstyret gir en samlet kapasitet på <b>${n(cap1)}</b> enheter i året.` : '';
      const task = {
        text: `<p>${firm} produserer og selger blant annet ${prod}. Etterspørselen er svært høy, og de siste årene har salget ligget konstant på <b>${n(cap0)}</b> enheter, som er kapasitetsgrensen.</p>` +
          `<p>Produktet selges for <b>${n(price)}</b> per enhet, og de variable enhetskostnadene er <b>${n(vc)}</b>. Markedsavdelingen anslår et mulig salg på ${demand.map((d) => n(d)).join(', ')} enheter årlig de neste ${N} årene. For å kunne produsere mer må man investere <b>${n(AM)}</b> i nytt produksjonsutstyr.${capTxt} Utstyret avskrives etter saldometoden med <b>${pct(a, 0)}</b> årlig, og man regner foreløpig med at det ikke har noen verdi ved slutten av år ${N}. Utstyret må gjennom et større vedlikehold i år ${overhaulYear}, beregnet til <b>${n(overhaul)}</b>.</p>` +
          `<p>Andre betalbare faste kostnader knyttet til utvidelsen er budsjettert til <b>${n(fk)}</b> årlig. Ledelsen krever også at prosjektet bærer en andel av selskapets indirekte faste kostnader, anslått til ${n(H)} årlig. Utvidelsen fører til økt arbeidskapital, som anslås til <b>${pct(wcPct, 0)}</b> av omsetningen.</p>` + W.text,
        parts: [
          { q: `Finn ${firm} sitt veide totalavkastningskrav (WACC).`, answer: r, unit: '%', sol: W.sol },
          { q: 'Hvor mange enheter er relevante for prosjektet i år 1?', answer: c.extra[0], unit: '', dec: 0, tol: { abs: 0.5, rel: 0 },
            hint: `Dagens salg på ${n(cap0)} enheter får man uansett. Bare økningen skyldes investeringen.${limited ? ' Husk også den nye kapasitetsgrensen.' : ''}`,
            sol: f(`Merkvantum år 1 = ${limited && demand[0] > cap1 ? `min(${n(demand[0])}; ${n(cap1)})` : n(demand[0])} − ${n(cap0)} = ${n(c.extra[0])}`) +
              `<p>Alle år: ${c.extra.map((x) => n(x)).join(', ')} enheter.${limited ? ` I år der etterspørselen er over ${n(cap1)}, kan man ikke selge mer enn den nye kapasiteten.` : ''}</p>` },
          { q: 'Hvor mye arbeidskapital må bindes i år 0? (Oppgi som positivt beløp.)', answer: c.WCbal[0], unit: 'kr',
            hint: 'Arbeidskapitalen bindes ved inngangen til året og beregnes av omsetningen fra <i>merkvantumet</i>, ikke av bedriftens samlede omsetning.',
            sol: f(`${pct(wcPct, 0)} · ${n(c.extra[0])} · ${n(price)} = ${pct(wcPct, 0)} · ${n(c.rev[0])} = ${n(c.WCbal[0])}`) +
              `<p>Deretter bindes eller frigjøres bare endringen hvert år: ${c.wcCF.slice(1).map((x) => n(x)).join(' / ')} i år 1–${N}. Alt frigjøres i år ${N}.</p>` },
          { q: 'Hva er nåverdien av spart skatt på saldoavskrivningene?', answer: c.shield, unit: 'kr', tol: { abs: AM * 0.0005, rel: 0.002 },
            sol: f(`${frac('AM · a · s', 'WACC + a')} = ${frac(`${n(AM)} · ${n(a, 2)} · 0,22`, `${n(r, 4)} + ${n(a, 2)}`)} = ${n(c.shield)}`) + '<p>Formelen forutsetter at saldoen avskrives videre i all fremtid.</p>' },
          { q: 'Beregn nåverdien etter skatt. (Bruk WACC uten avrunding.)', answer: c.npv, unit: 'kr', tol: { abs: AM * 0.004, rel: 0.012 },
            hint: 'Fremgangsmåten er den samme som i den store skatteoppgaven, men omsetning, variable kostnader og arbeidskapital regnes bare av merkvantumet.',
            sol: cfTable(rows, N) +
              steps([`<b>Merkvantum</b>: bare salget utover dagens ${n(cap0)} enheter er relevant.`,
                `<b>Ikke med</b>: de indirekte faste kostnadene (${n(H)}) endres ikke av utvidelsen, og avskrivningene er ikke utbetalinger (bare skatteeffekten tas med, i ett ledd i år 0).`,
                `<b>Vedlikeholdet</b> i år ${overhaulYear} kostnadsføres og gir skattefradrag samme år.`,
                `<b>Nåverdi</b> med WACC = ${pct(r, 3)}: <code>=NNV(WACC;år1:år${N})+år0</code> = <b>${n(c.npv)}</b>. Utvidelsen er ${c.npv > 0 ? '<b>lønnsom</b> og bør gjennomføres' : '<b>ikke lønnsom</b> og bør ikke gjennomføres'}.`]) },
          { q: `Anta nå at utstyret kan selges for <b>${n(salvage)}</b> ved slutten av år ${N}. Salget behandles på den skattemessig gunstigste måten. Hvor mye <b>endres</b> nåverdien etter skatt?`, answer: c.dNpv, unit: 'kr', tol: { abs: salvage * 0.004, rel: 0.012 },
            hint: 'Salgssummen nedskrives på saldo: du får salgssummen, men mister fremtidige avskrivninger på samme beløp.',
            sol: f(`NV salgssum = ${frac(n(salvage), `(1 + ${n(r, 4)})<sup>${N}</sup>`)} = ${n(c.pvSale)}`) +
              f(`NV økt skatt = ${frac(`${n(salvage)} · ${n(a, 2)} · 0,22`, `${n(r, 4)} + ${n(a, 2)}`)} · ${frac('1', `(1 + ${n(r, 4)})<sup>${N}</sup>`)} = ${n(c.pvLost)}`) +
              f(`Endring = ${n(c.pvSale)} − ${n(c.pvLost)} = +${n(c.dNpv)}`) + `<p>Ny nåverdi etter skatt: ${n(c.npv)} + ${n(c.dNpv)} = <b>${n(c.npv + c.dNpv)}</b>.</p>` },
          { kind: 'text', q: 'Hvilke opplysninger i oppgaven skal <b>ikke</b> med i kontantstrømmen? Begrunn kort.',
            points: [`<b>Dagens salg (${n(cap0)} enheter)</b> og overskuddet fra det får bedriften uansett. Bare merproduksjonen skyldes investeringen.`,
              limited ? `<b>Etterspørsel over ${n(cap1)} enheter</b> kan ikke dekkes med det nye utstyret og gir ikke salg.` : 'Hele den anslåtte økningen kan produseres med det nye utstyret.',
              `<b>Indirekte faste kostnader (${n(H)})</b> er fordelte kostnader som ikke endres av prosjektet.`,
              '<b>Avskrivninger</b> er ikke utbetalinger. Skatteeffekten tas med som nåverdi av spart skatt.',
              '<b>Renter og avdrag</b> holdes utenfor: finansieringen ligger i WACC (totalkapitalmetoden).'] },
        ],
      };
      return { p, c, task };
    },
  });

  // ==================================================================
  // 3) Prosjektets kontantstrøm og kontantstrøm til egenkapitalen (kap. 2 oppg. 1)
  // ==================================================================
  /** Ren beregning, også brukt til kontroll mot kapittel-LF 2.1. */
  function ekCalc({ price, vc, qty, fkTotal, AM, wcPct, loan, rate, loanType }) {
    const N = qty.length, dep = AM / N, fkCash = fkTotal - dep;
    const rev = qty.map((q) => q * price), vcs = qty.map((q) => q * vc);
    const WCbal = rev.map((x) => wcPct * x).concat([0]);
    const wcCF = WCbal.map((w, t) => -(w - (t ? WCbal[t - 1] : 0)));
    const proj = [-AM + wcCF[0]];
    for (let t = 1; t <= N; t++) proj.push(rev[t - 1] - vcs[t - 1] - fkCash + wcCF[t]);
    const plan = loanType === 'serie' ? F.serialLoan(loan, rate, N) : F.annuityLoan(loan, rate, N);
    const repay = plan.rows.map((x) => x.repay), interest = plan.rows.map((x) => x.interest);
    const ek = proj.map((c, t) => (t === 0 ? c + loan : c - repay[t - 1] - interest[t - 1]));
    const result = U.range(0, N - 1).map((i) => rev[i] - vcs[i] - fkTotal - interest[i]);
    return { N, dep, fkCash, rev, vcs, WCbal, wcCF, proj, repay, interest, ek, result, sumProj: U.sum(proj), sumEk: U.sum(ek), sumResult: U.sum(result), sumInt: U.sum(interest) };
  }
  O._ekCalc = ekCalc;

  O.reg({
    id: 'k2-kontantstrom-egenkapital', chapter: 2, level: 2, minutes: 25, examLike: 'Kapitteloppgave 2.1 – ikke gitt som egen oppgave 2016–2025',
    title: 'Prosjektets kontantstrøm og kontantstrøm til egenkapitalen',
    topic: 'Kontantstrøm',
    blurb: 'Budsjetter prosjektets kontantstrøm med arbeidskapital, og legg så til lån, avdrag og renter for å finne det som går til eierne.',
    gen(R) {
      // Trekk på nytt til prosjektet samlet gir overskudd (summen av resultatene er positiv), som i kapitteloppgaven.
      let t; for (let k = 0; k < 60; k++) { t = this.build(R); if (t.c.sumResult > 0) break; }
      return t.task;
    },
    build(R) {
      const N = R.pick([4, 4, 5]);
      const price = R.pick([500, 700, 900, 1200, 1500]);
      const vc = Math.round(price * R.pick([0.15, 0.25, 0.35]) / 10) * 10;
      const q1 = R.pick([1000, 1500, 2000, 2500]);
      const shape = N === 4 ? R.pick([[1, 1.2, 1, 0.8], [1, 1.25, 1.25, 1], [0.8, 1, 1.2, 1]]) : R.pick([[1, 1.2, 1.2, 1, 0.8], [0.8, 1, 1.2, 1.2, 1]]);
      const qty = shape.map((s) => Math.round(q1 * s / 100) * 100);
      const rev1 = q1 * price;
      const AM = Math.round(rev1 * R.pick([1.2, 1.4, 1.6]) * N / 4 / 100000) * 100000;
      const dep = AM / N;
      const fkCash = Math.round(rev1 * R.pick([0.25, 0.3, 0.35]) / 10000) * 10000;
      const fkTotal = dep + fkCash;
      const wcPct = R.pick([0.1, 0.15, 0.2, 0.25]);
      const loan = Math.round(AM * R.pick([0.5, 0.6, 0.7]) / 100000) * 100000;
      const rate = R.pick([0.04, 0.05, 0.06, 0.07]);
      const loanType = R.bool(0.6) ? 'serie' : 'annuitet';
      const c = ekCalc({ price, vc, qty, fkTotal, AM, wcPct, loan, rate, loanType });
      const yrs = U.range(1, N);
      const loanTxt = loanType === 'serie' ? `et serielån på <b>${n(loan)}</b> med like store årlige avdrag over ${N} år` : `et annuitetslån på <b>${n(loan)}</b> med like store årlige terminbeløp over ${N} år`;
      const projTbl = cfTable([['Omsetning', pad(c.rev)], ['Variable kostnader', pad(c.vcs.map((x) => -x))], ['Betalbare faste kostnader', pad(Array(N).fill(-c.fkCash))], ['Arbeidskapital', c.wcCF.map((x) => x || null)], ['Anleggsmidler', [-AM]], ['Prosjektets kontantstrøm', c.proj, 'sum']], N);
      const ekTbl = cfTable([['Prosjektets kontantstrøm', c.proj, 'sub'], ['Utbetalt lån', [loan]], ['Avdrag', pad(c.repay.map((x) => -x))], ['Renter', pad(c.interest.map((x) => -x))], ['Kontantstrøm til egenkapitalen', c.ek, 'sum']], N);
      const last = N;
      const task = {
        text: `<p>En bedrift vurderer et prosjekt med levetid ${N} år. Prosjektet krever anleggsmidler for <b>${n(AM)}</b>, som avskrives lineært til 0 over levetiden. Salgsprisen er <b>${n(price)}</b> per enhet og variable enhetskostnader er <b>${n(vc)}</b>. Forventet salg:</p>` +
          table(['År'].concat(yrs), [['Mengde'].concat(qty.map((x) => n(x)))]) +
          `<p>De faste kostnadene er budsjettert til <b>${n(fkTotal)}</b> per år, og av dette er ${n(dep)} avskrivninger. Arbeidskapitalen utgjør <b>${pct(wcPct, 0)}</b> av omsetningen og må være på plass ved inngangen til hvert år.</p>` +
          `<p>Prosjektet finansieres delvis med ${loanTxt}. Lånet utbetales i år 0, og renten er <b>${pct(rate, 0)}</b> per år av lånesaldoen ved inngangen til året. Se bort fra skatt.</p>`,
        parts: [
          { q: 'Hva er prosjektets kontantstrøm i år 0?', answer: c.proj[0], unit: 'kr',
            hint: 'Investering pluss arbeidskapitalen som må være på plass før salget i år 1 starter.',
            sol: f(`−${n(AM)} − ${pct(wcPct, 0)} · ${n(c.rev[0])} = −${n(AM)} − ${n(c.WCbal[0])} = ${n(c.proj[0])}`) },
          { q: 'Hva er prosjektets kontantstrøm i år 1?', answer: c.proj[1], unit: 'kr',
            hint: 'Trekk avskrivningene ut av de faste kostnadene: de er ikke en utbetaling. Arbeidskapitalen endres med forskjellen mellom behovet i år 2 og år 1.',
            sol: projTbl + f(`${n(c.rev[0])} − ${n(c.vcs[0])} − ${n(c.fkCash)} ${c.wcCF[1] >= 0 ? '+' : '−'} ${n(Math.abs(c.wcCF[1]))} = ${n(c.proj[1])}`) +
              `<p>Betalbare faste kostnader = ${n(fkTotal)} − ${n(dep)} = ${n(c.fkCash)}.</p>` },
          { q: `Hva er prosjektets kontantstrøm i år ${last}?`, answer: c.proj[last], unit: 'kr',
            sol: f(`${n(c.rev[last - 1])} − ${n(c.vcs[last - 1])} − ${n(c.fkCash)} + ${n(c.wcCF[last])} = ${n(c.proj[last])}`) + `<p>All arbeidskapital som står igjen (${n(c.WCbal[last - 1])}), frigjøres i år ${last}.</p>` },
          { q: 'Hvor mye betales i renter i år 2?', answer: c.interest[1], unit: 'kr',
            sol: f(`Saldo ved inngangen til år 2 = ${n(loan)} − ${n(c.repay[0])} = ${n(loan - c.repay[0])}`) + f(`Renter år 2 = ${pct(rate, 0)} · ${n(loan - c.repay[0])} = ${n(c.interest[1])}`) +
              (loanType === 'annuitet' ? `<p>Terminbeløpet er ${n(c.repay[0] + c.interest[0])} (<code>=AVDRAG(${n(rate * 100)}%;${N};-${loan})</code>). Avdraget er terminbeløpet minus renten.</p>` : `<p>Avdraget er ${n(loan)} / ${N} = ${n(c.repay[0])} hvert år.</p>`) },
          { q: 'Hva er kontantstrømmen til egenkapitalen i år 0?', answer: c.ek[0], unit: 'kr',
            sol: f(`${n(c.proj[0])} + ${n(loan)} = ${n(c.ek[0])}`) + '<p>Eierne skyter inn det lånet ikke dekker.</p>' },
          { q: 'Hva er kontantstrømmen til egenkapitalen i år 1?', answer: c.ek[1], unit: 'kr',
            hint: 'Prosjektets kontantstrøm minus det långiveren får: avdrag og renter.',
            sol: ekTbl + f(`${n(c.proj[1])} − ${n(c.repay[0])} − ${n(c.interest[0])} = ${n(c.ek[1])}`) },
          { q: `Hva er kontantstrømmen til egenkapitalen i år ${last}?`, answer: c.ek[last], unit: 'kr',
            sol: f(`${n(c.proj[last])} − ${n(c.repay[last - 1])} − ${n(c.interest[last - 1])} = ${n(c.ek[last])}`) },
          { q: 'Hva er summen av kontantstrømmen til egenkapitalen over hele levetiden (år 0 til siste år, udiskontert)?', answer: c.sumEk, unit: 'kr',
            sol: f(`${c.ek.map((x) => n(x)).join(' + ')} = ${n(c.sumEk)}`) +
              f(`Sum budsjetterte resultater = Σ(omsetning − variable − faste kostnader inkl. avskrivninger − renter) = ${n(c.sumResult)}`) },
          { kind: 'text', q: `Summen av prosjektets kontantstrøm er ${n(c.sumProj)}. Hvorfor er den høyere enn summen av kontantstrømmen til egenkapitalen, og hvorfor er summen til egenkapitalen lik summen av de budsjetterte resultatene?`,
            points: [`Forskjellen (${n(c.sumProj - c.sumEk)}) er rentene. Lånet som utbetales i år 0, er lik summen av avdragene, så over hele levetiden er det bare rentene som går fra prosjektet til långiveren.`,
              'Over hele levetiden summerer avskrivningene seg til investeringen, og arbeidskapitalen frigjøres. Tidsforskjellene mellom resultat og kontantstrøm går derfor i null, og summen til eierne blir lik summen av resultatene.',
              'Prosjektets kontantstrøm (totalkapitalmetoden) holder renter og avdrag utenfor fordi finansieringen ligger i avkastningskravet (WACC). Kontantstrømmen til egenkapitalen diskonteres med egenkapitalkravet.',
              'Rentene skal ikke trekkes fra prosjektets kontantstrøm når den diskonteres med et krav som allerede inneholder lånerenten – da blir finansieringskostnaden telt to ganger.'] },
        ],
      };
      return { c, task };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
