/* Salg av driftsmiddel etter skatt: salgssummen inntektsført direkte eller nedskrevet på saldo (kap. 8 oppg. 3). */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, cfTable } = U;
  const S_TAX = 0.22;
  const rnd = (x, step) => Math.round(x / step) * step;
  const pctS = (x) => n(x * 100, Number.isInteger(U.round(x * 100, 6)) ? 0 : 1) + ' %';

  /** Ren beregning, også brukt til kontroll mot kapittel-LF 8.3. ks = kontantstrøm fra drift før skatt år 1..T. */
  function saleCalc({ I, ks, S, r, a }) {
    const T = ks.length;
    const fs = [-I].concat(ks.map((c, k) => c + (k === T - 1 ? S : 0)));
    const irrF = F.irr(fs);
    const shield = F.pvSaldoTaxShield(I, a, S_TAX, r), ned = F.pvSaldoTaxShield(S, a, S_TAX, r) / Math.pow(1 + r, T);
    const inn = [-I + shield].concat(ks.map((c, k) => c * (1 - S_TAX) + (k === T - 1 ? S * (1 - S_TAX) : 0)));
    const nedF = [-I + shield - ned].concat(ks.map((c, k) => c * (1 - S_TAX) + (k === T - 1 ? S : 0)));
    const npvInn = F.npv(r, inn), npvNed = F.npv(r, nedF), diff = npvNed - npvInn;
    return { T, fs, irrF, shield, ned, inn, nedF, npvInn, npvNed, diff, taxS: S * S_TAX, pvTaxS: S * S_TAX / Math.pow(1 + r, T) };
  }
  O._saleCalc = saleCalc;

  const saleFirms = [['Fjordtrykk AS', 'en ny trykkpresse'], ['Hallingdal Sag AS', 'et nytt sagbruksanlegg'], ['Vestkyst Frakt AS', 'en kranbil'],
    ['Sunnmøre Mekaniske AS', 'en CNC-maskin'], ['Nordland Brønnboring AS', 'en borerigg'], ['Bakeri Solsiden AS', 'en produksjonslinje']];

  O.reg({
    id: 'k8-salg-driftsmiddel', chapter: 8, level: 2, minutes: 20, examLike: 'Kapitteloppgave 8.3 – salg «på skattemessig gunstigste måte» kom i 2016, 2020, 2021, 2023 og 2024',
    title: 'Salg av driftsmiddel: inntektsføre eller nedskrive saldo',
    topic: 'Nåverdi etter skatt',
    blurb: 'Samme prosjekt etter skatt to ganger: salgssummen skattlagt i salgsåret, eller nedskrevet på saldo slik at skatten kommer gradvis. Hvorfor nedskriving er gunstigst.',
    gen(R) {
      let t; for (let k = 0; k < 400; k++) { t = this.build(R); if (t) break; }
      return t.task;
    },
    build(R) {
      const [firm, asset] = R.pick(saleFirms);
      const T = R.pick([3, 3, 4, 5]), I = R.int(30, 150) * 10000, r = R.pick([0.08, 0.1, 0.12]), a = 0.2;
      const c1 = rnd(I * R.pick([0.3, 0.35, 0.4, 0.45]), 10000), fall = R.pick([0, 0.1, 0.2]);
      const ks = U.range(0, T - 1).map((k) => rnd(c1 * Math.max(0.2, 1 - fall * k), 10000));
      const S = rnd(I * R.pick([0.2, 0.3, 0.4, 0.5, 0.6]), 10000);
      const p = { I, ks, S, r, a };
      const c = saleCalc(p);
      if (!(Number.isFinite(c.irrF) && c.irrF > 0.02 && c.irrF < 0.6 && Math.abs(c.npvInn) > 0.005 * I && Math.abs(c.npvNed) > 0.005 * I)) return null;
      const yrs = (v) => [null].concat(v), endOnly = (x0, xT) => [x0].concat(Array(T - 1).fill(null), [xT]);
      const sameKs = ks.every((v) => v === ks[0]);
      const ksTxt = sameKs ? `<b>${n(ks[0])}</b> per år` : ks.map((v, k) => `<b>${n(v)}</b> i år ${k + 1}`).join(', ').replace(/, ([^,]*)$/, ' og $1');
      const innTbl = cfTable([['Anleggsmidler', endOnly(-I, S)], ['Kontantstrøm drift før skatt', yrs(ks)], ['Skatt drift (22 %)', yrs(ks.map((v) => -v * S_TAX))],
        ['Skatt salgssum (22 %)', endOnly(null, -c.taxS)], ['NV spart skatt avskrivninger', [c.shield]], ['Beregningsgrunnlag', c.inn, 'sum']], T);
      const nedTbl = cfTable([['Anleggsmidler', endOnly(-I, S)], ['Kontantstrøm drift før skatt', yrs(ks)], ['Skatt drift (22 %)', yrs(ks.map((v) => -v * S_TAX))],
        ['NV spart skatt avskrivninger', [c.shield]], ['NV økt skatt nedskriving', [-c.ned]], ['Beregningsgrunnlag', c.nedF, 'sum']], T);
      const task = {
        text: `<p>${firm} vurderer å kjøpe ${asset} for <b>${n(I)}</b>. Investeringen gir en kontantstrøm fra driften før skatt på ${ksTxt}. Etter <b>${T} år</b> selges driftsmidlet for <b>${n(S)}</b>.</p>` +
          `<p>Driftsmidlet avskrives etter saldometoden med <b>20 %</b>. Skattesatsen er 22 %, og skatt betales samme år som inntekten opptjenes. Avkastningskravet etter skatt er <b>${pctS(r)}</b>.</p>` +
          `<p>Salget kan føres på to måter: (1) salgssummen <b>inntektsføres direkte</b> og skattlegges i salgsåret, mens saldoen avskrives videre som før, eller (2) salgssummen <b>nedskrives på saldo</b>, slik at saldoen og alle senere avskrivninger blir lavere.</p>`,
        parts: [
          { q: 'Hva er internrenten før skatt?', answer: c.irrF, unit: '%',
            sol: f(`Kontantstrøm før skatt: ${c.fs.map((v) => n(v)).join('; ')}`) + `<p><code>=IR(kontantstrøm år 0–${T})</code> = <b>${pct(c.irrF, 2)}</b>.</p>` },
          { q: 'Hva er nåverdien av skattefordelen av saldoavskrivningene på investeringen?', answer: c.shield, unit: 'kr',
            sol: f(`NV spart skatt = ${frac(`${n(I)} · 0,20 · 0,22`, `${n(r, 2)} + 0,20`)} = ${n(c.shield)}`) + '<p>Formelen gjelder evigvarende saldoavskrivning. Den føres som ett beløp i år 0.</p>' },
          { q: 'Hva er NNV etter skatt når salgssummen inntektsføres direkte?', answer: c.npvInn, unit: 'kr',
            hint: 'Hele salgssummen skattlegges i salgsåret. Saldoen avskrives videre, så skattefordelen av investeringen er den samme som i forrige deloppgave.',
            sol: f(`Skatt på salgssummen i år ${T} = 0,22 · ${n(S)} = ${n(c.taxS)}`) + innTbl + f(`NNV (${pctS(r)}) = <b>${n(c.npvInn)}</b>`) },
          { q: 'Hva er nåverdien av den økte skatten når salgssummen i stedet nedskrives på saldo?', answer: c.ned, unit: 'kr',
            hint: 'Nedskrivingen reduserer saldoen fra år ' + T + ', så fremtidige avskrivninger blir lavere. Regn tapt skattefordel i år ' + T + ' og diskonter til år 0.',
            sol: f(`NV økt skatt = ${frac(`${n(S)} · 0,20 · 0,22`, `${n(r, 2)} + 0,20`)} · ${frac('1', `${n(1 + r, 2)}<sup>${T}</sup>`)} = ${n(c.ned)}`) },
          { q: 'Hva er NNV etter skatt når salgssummen nedskrives på saldo?', answer: c.npvNed, unit: 'kr',
            hint: 'Salgssummen gir ingen direkte skatt, men den økte skatten fra lavere avskrivninger trekkes fra i år 0.',
            sol: nedTbl + f(`NNV (${pctS(r)}) = <b>${n(c.npvNed)}</b>`) },
          { q: 'Hvor mye mer er prosjektet verdt når salgssummen nedskrives på saldo?', answer: c.diff, unit: 'kr',
            sol: f(`${n(c.npvNed)} − ${n(c.npvInn)} = <b>${n(c.diff)}</b>`) +
              f(`Kontroll: ${frac(n(c.taxS), `${n(1 + r, 2)}<sup>${T}</sup>`)} − ${n(c.ned)} = ${n(c.pvTaxS)} − ${n(c.ned)} = ${n(c.pvTaxS - c.ned)}`) +
              '<p>Forskjellen er nåverdien av skatten på salgssummen betalt med én gang, minus nåverdien av den samme skatten betalt gradvis gjennom lavere avskrivninger.</p>' },
          { kind: 'text', q: 'Hvorfor er nedskriving på saldo skattemessig gunstigst, og hvordan ser du det i tallene?',
            points: [`Med nedskriving er NNV ${n(c.npvNed)}, mot ${n(c.npvInn)} med inntektsføring: ${n(c.diff)} bedre.`,
              `Nominelt betales den samme skatten (22 % av ${n(S)} = ${n(c.taxS)}). Ved inntektsføring kommer hele skatten i år ${T}. Ved nedskriving kommer den gradvis som lavere avskrivninger i årene etter, og utsatt skatt er verdt mindre i nåverdi.`,
              `Nåverdien av den utsatte skatten er ${n(c.ned)}, mens nåverdien av skatten i år ${T} er ${n(c.pvTaxS)}. Forholdet er a / (r + a) = 0,20 / ${n(r + 0.2, 2)}: jo høyere avkastningskrav, jo mer er utsettelsen verdt.`,
              'På eksamen betyr «på skattemessig gunstigste måte» nedskriving: + salgssum i år n, og − salgssum · a · s / (r + a) / (1 + r)<sup>n</sup> i år 0.'] },
        ],
      };
      return { p, c, task };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
