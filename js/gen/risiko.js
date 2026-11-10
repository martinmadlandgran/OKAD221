/* Kapittel 10 og 11 – Finansiell risiko, portefølje, KVM. */
(function (root) {
  'use strict';
  const O = root.OKAD, F = O.F, U = O.U;
  const { n, pct, f, frac, steps, table } = U;

  const statsTable = (names, ps, a, b, lab) => {
    const EA = F.mean(a, ps), EB = F.mean(b, ps);
    const rows = ps.map((p, i) => [names[i], n(p, 2), pct(a[i], 2), pct(b[i], 2), n(p * (a[i] - EA) ** 2, 6), n(p * (b[i] - EB) ** 2, 6), n(p * (a[i] - EA) * (b[i] - EB), 6)]);
    rows.push({ cells: ['Sum', '1,00', 'E = ' + pct(EA, 2), 'E = ' + pct(EB, 2), n(F.variance(a, ps), 6), n(F.variance(b, ps), 6), n(F.covariance(a, b, ps), 6)], cls: 'sum' });
    return table(['Tilstand', 'p', `r<sub>${lab[0]}</sub>`, `r<sub>${lab[1]}</sub>`, `p·(r<sub>${lab[0]}</sub>−E)²`, `p·(r<sub>${lab[1]}</sub>−E)²`, 'p·avvik·avvik'], rows);
  };
  const dominance = (EA, sA, EB, sB, a, b) => {
    const eq = Math.abs(EA - EB) < 5e-5;
    if ((EA >= EB - 5e-5 && sA < sB) && (EA > EB + 5e-5 || eq)) return `<b>Aksje ${a} dominerer</b>: ${eq ? 'samme' : 'høyere'} forventet avkastning og lavere standardavvik. En risikoavers investor vil entydig foretrekke ${a} dersom bare én aksje kan eies.`;
    if ((EB >= EA - 5e-5 && sB < sA) && (EB > EA + 5e-5 || eq)) return `<b>Aksje ${b} dominerer</b>: ${eq ? 'samme' : 'høyere'} forventet avkastning og lavere standardavvik. En risikoavers investor vil entydig foretrekke ${b} dersom bare én aksje kan eies.`;
    return `<b>Ingen dominerer.</b> Aksje ${EA > EB ? a : b} har høyere forventet avkastning, men også høyere risiko. Valget avhenger av investorens risikoaversjon – man kan ikke entydig si hvilken som er best.`;
  };

  function makeStates(R, equalMean) {
    const k = R.pick([3, 3, 4]);
    const ps = k === 3 ? R.pick([[0.2, 0.5, 0.3], [0.25, 0.5, 0.25], [0.3, 0.4, 0.3], [0.5, 0.3, 0.2], [0.2, 0.6, 0.2]]) : R.pick([[0.2, 0.3, 0.15, 0.35], [0.1, 0.4, 0.3, 0.2], [0.25, 0.25, 0.25, 0.25]]);
    const names = k === 3 ? R.pick([['Høy etterspørsel', 'Normal', 'Lav etterspørsel'], ['Vekst', 'Normal', 'Tilbakegang'], ['Oppgang', 'Normal', 'Nedgang']]) : ['Sterk vekst', 'Moderat vekst', 'Stagnasjon', 'Nedgang'];
    for (let tries = 0; tries < 200; tries++) {
      const a = [], b = [];
      const top = R.int(12, 28), step = R.int(6, 14);
      for (let i = 0; i < k; i++) a.push((top - i * step + R.int(-2, 2)) / 100);
      const mode = R.pick(['pos', 'pos', 'neg', 'mix']);
      for (let i = 0; i < k; i++) {
        const j = mode === 'neg' ? k - 1 - i : i;
        b.push(((mode === 'mix' ? R.int(-8, 22) : R.int(8, 20) - j * R.int(4, 10)) + R.int(-2, 2)) / 100);
      }
      if (equalMean) { // juster siste tilstand for B så forventningene blir like (avrundet til 0,5 %-poeng)
        const EA = F.mean(a, ps); let rest = 0; for (let i = 0; i < k - 1; i++) rest += ps[i] * b[i];
        b[k - 1] = Math.round((EA - rest) / ps[k - 1] * 200) / 200;
      }
      const sA = F.sd(a, ps), sB = F.sd(b, ps);
      if (sA < 0.02 || sB < 0.02 || Math.abs(sA - sB) < 0.004 || Math.min(...b) < -0.4 || Math.max(...b) > 0.5) continue;
      if (equalMean && Math.abs(F.mean(a, ps) - F.mean(b, ps)) > 0.004) continue;
      return { ps, names, a, b };
    }
    return { ps: [0.2, 0.5, 0.3], names: ['Høy', 'Normal', 'Lav'], a: [0.14, 0.12, -0.04], b: [0.12, 0.11, -0.01] };
  }

  // ------------------------------------------------------------------
  O.reg({
    id: 'k10-to-aksjer-tilstander', chapter: 10, level: 2, minutes: 30, examLike: 'Porteføljeoppgaven 2020–2023 (20–25 %)',
    title: 'To aksjer: forventet avkastning, risiko, kovarians og portefølje',
    topic: 'Portefølje',
    blurb: 'Tilstandstabell med sannsynligheter. Forventning, standardavvik, dominans, kovarians, korrelasjon, portefølje og minimum varians.',
    gen(R) {
      const S = makeStates(R, R.bool(0.4));
      const { ps, names, a, b } = S;
      const EA = F.mean(a, ps), EB = F.mean(b, ps), vA = F.variance(a, ps), vB = F.variance(b, ps), sA = Math.sqrt(vA), sB = Math.sqrt(vB);
      const cov = F.covariance(a, b, ps), rho = cov / (sA * sB);
      const w = R.pick([0.5, 0.5, 0.6, 0.4, 0.3]);
      const Ep = w * EA + (1 - w) * EB, vp = w * w * vA + (1 - w) * (1 - w) * vB + 2 * w * (1 - w) * cov, sp = Math.sqrt(vp);
      const wavg = w * sA + (1 - w) * sB;
      const wMin = (vB - cov) / (vA + vB - 2 * cov);
      const sMin = Math.sqrt(Math.max(0, wMin * wMin * vA + (1 - wMin) ** 2 * vB + 2 * wMin * (1 - wMin) * cov));
      return {
        text: '<p>Avkastningen til aksjene A og B avhenger av markedsforholdene, og kan presenteres slik:</p>' +
          table(['Markedsforhold'].concat(names), [['Sannsynlighet'].concat(ps.map((p) => n(p, 2))), ['Aksje A avkastning'].concat(a.map((x) => pct(x, 2))), ['Aksje B avkastning'].concat(b.map((x) => pct(x, 2)))]),
        parts: [
          { q: 'Beregn forventet avkastning for aksje A.', answer: EA, unit: '%',
            sol: f(`E(r<sub>A</sub>) = Σ p<sub>i</sub> · r<sub>i</sub> = ${ps.map((p, i) => `${n(p, 2)} · ${pct(a[i], 1)}`).join(' + ')} = ${pct(EA, 2)}`) },
          { q: 'Beregn forventet avkastning for aksje B.', answer: EB, unit: '%',
            sol: f(`E(r<sub>B</sub>) = ${ps.map((p, i) => `${n(p, 2)} · ${pct(b[i], 1)}`).join(' + ')} = ${pct(EB, 2)}`) },
          { q: 'Beregn standardavviket til avkastningen for aksje A.', answer: sA, unit: '%', tol: { abs: 0.0006 },
            hint: 'Varians = Σ p · (r − E)². Standardavvik = kvadratroten av variansen. Regn med desimaltall (0,14, ikke 14).',
            sol: statsTable(names, ps, a, b, 'AB') + f(`Var(r<sub>A</sub>) = ${n(vA, 6)} → σ<sub>A</sub> = √${n(vA, 6)} = ${pct(sA, 2)}`) },
          { q: 'Beregn standardavviket til avkastningen for aksje B.', answer: sB, unit: '%', tol: { abs: 0.0006 },
            sol: f(`Var(r<sub>B</sub>) = ${n(vB, 6)} → σ<sub>B</sub> = ${pct(sB, 2)}`) },
          { kind: 'text', q: 'Kan du ut fra svarene si om den ene eller andre aksjen entydig er å foretrekke?', points: [dominance(EA, sA, EB, sB, 'A', 'B'),
            'Middelverdi–varians-kriteriet: en aksje dominerer dersom den har minst like høy forventet avkastning <i>og</i> lavere risiko (eller høyere avkastning og ikke høyere risiko).'] },
          { q: 'Beregn kovariansen mellom aksjenes avkastning (som desimaltall, 6 desimaler).', answer: cov, unit: '', dec: 6, tol: { abs: 0.000012, rel: 0.002 },
            hint: 'Kov = Σ p · (r<sub>A</sub> − E<sub>A</sub>) · (r<sub>B</sub> − E<sub>B</sub>).',
            sol: statsTable(names, ps, a, b, 'AB') + f(`Kov(r<sub>A</sub>, r<sub>B</sub>) = ${n(cov, 6)}`) },
          { q: 'Beregn korrelasjonskoeffisienten.', answer: rho, unit: '', dec: 4, tol: { abs: 0.006 },
            sol: f(`ρ = ${frac('Kov', 'σ<sub>A</sub> · σ<sub>B</sub>')} = ${frac(n(cov, 6), `${n(sA, 4)} · ${n(sB, 4)}`)} = ${n(rho, 4)}`) },
          { q: `Hva er forventet avkastning for en portefølje med ${pct(w, 0)} i A og ${pct(1 - w, 0)} i B?`, answer: Ep, unit: '%',
            sol: f(`E(r<sub>p</sub>) = ${n(w, 2)} · ${pct(EA, 2)} + ${n(1 - w, 2)} · ${pct(EB, 2)} = ${pct(Ep, 2)}`) },
          { q: 'Hva er porteføljens standardavvik?', answer: sp, unit: '%', tol: { abs: 0.0006 },
            hint: 'Var(p) = w²σ<sub>A</sub>² + (1−w)²σ<sub>B</sub>² + 2w(1−w)·Kov.',
            sol: f(`Var(r<sub>p</sub>) = ${n(w, 2)}² · ${n(vA, 6)} + ${n(1 - w, 2)}² · ${n(vB, 6)} + 2 · ${n(w, 2)} · ${n(1 - w, 2)} · ${n(cov, 6)} = ${n(vp, 6)}`) + f(`σ<sub>p</sub> = ${pct(sp, 2)}`) +
              `<p>Veid snitt av standardavvikene er ${pct(wavg, 2)}. Diversifikasjonsgevinsten er ${pct(wavg - sp, 2)}-poeng.</p>` },
          { kind: 'text', q: 'Kommenter diversifikasjonsgevinsten. Hva avgjør hvor stor den blir?', points: [
            rho > 0.8 ? `Gevinsten er <b>beskjeden</b> fordi korrelasjonen er høy og positiv (${n(rho, 2)}) – aksjene svinger i takt.` : rho < 0 ? `Gevinsten er <b>stor</b> fordi korrelasjonen er negativ (${n(rho, 2)}) – når den ene aksjen gjør det dårlig, gjør den andre det bra.` : `Korrelasjonen er ${n(rho, 2)}, som gir en merkbar diversifikasjonsgevinst.`,
            'Bare ved ρ = +1 blir porteføljens standardavvik lik det veide snittet. For all ρ &lt; 1 blir risikoen lavere enn snittet.',
            'Forventet avkastning påvirkes ikke av korrelasjonen – den er alltid det veide snittet. Diversifisering reduserer risiko «gratis».'] },
          { q: 'Hvilken andel i aksje A gir porteføljen med lavest mulig standardavvik? (Svar i prosent; negativ = shortsalg.)', answer: wMin, unit: '%', tol: { abs: 0.003 },
            hint: 'w<sub>A</sub> = (σ<sub>B</sub>² − Kov) / (σ<sub>A</sub>² + σ<sub>B</sub>² − 2·Kov).',
            sol: f(`w<sub>A</sub> = ${frac(`${n(vB, 6)} − ${n(cov, 6)}`, `${n(vA, 6)} + ${n(vB, 6)} − 2 · ${n(cov, 6)}`)} = ${pct(wMin, 2)}`) +
              `<p>Minimum-varians-porteføljen har standardavvik ${pct(sMin, 2)}.` + (wMin < 0 || wMin > 1 ? ' Andelen ligger utenfor 0–100 % fordi korrelasjonen er svært høy: uten shortsalg er det da best å eie bare aksjen med lavest risiko.' : '') + '</p>' },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k10-kurser-til-avkastning', chapter: 10, level: 2, minutes: 30, examLike: '2024 oppg. 3 og 2025 oppg. 4 (25–30 %)',
    title: 'To aksjer fra kursutfall: ukorrelert portefølje, risikofri plassering og systematisk risiko',
    topic: 'Portefølje',
    blurb: 'Regn kurser om til avkastning, finn E og σ, bygg portefølje med ρ = 0, minimum varians, kombiner med risikofri rente og drøft systematisk risiko.',
    gen(R) {
      let S; for (let k = 0; k < 200; k++) {
        const ps = R.pick([[0.25, 0.5, 0.25], [0.2, 0.5, 0.3], [0.3, 0.4, 0.3]]);
        const p0A = R.pick([50, 80, 100, 200]), p0B = R.pick([50, 100, 150]);
        const mk = (p0, spread) => [1 + spread, 1 + R.int(0, 2) * 0.05, 1 - spread * R.pick([0.5, 0.6, 0.75])].map((x) => Math.round(p0 * x));
        const pa = mk(p0A, R.pick([0.25, 0.3, 0.4])), pb = mk(p0B, R.pick([0.45, 0.6, 0.75]));
        const a = pa.map((x) => x / p0A - 1), b = pb.map((x) => x / p0B - 1);
        const sA = F.sd(a, ps), sB = F.sd(b, ps);
        if (Math.abs(sA - sB) < 0.03 || F.mean(a, ps) < 0.02 || F.mean(b, ps) < 0.02) continue;
        S = { ps, p0A, p0B, pa, pb, a, b }; break;
      }
      const { ps, p0A, p0B, pa, pb, a, b } = S;
      const EA = F.mean(a, ps), EB = F.mean(b, ps), vA = F.variance(a, ps), vB = F.variance(b, ps), sA = Math.sqrt(vA), sB = Math.sqrt(vB);
      const w = R.pick([0.5, 0.5, 0.6, 0.4]);
      const Ep = w * EA + (1 - w) * EB, sp = Math.sqrt(w * w * vA + (1 - w) ** 2 * vB);
      const wMin = vB / (vA + vB), sMin = Math.sqrt(wMin * wMin * vA + (1 - wMin) ** 2 * vB);
      const rf = R.pick([0.02, 0.03, 0.04]), wf = R.pick([0.2, 0.3, 0.4, 0.5]);
      const low = sA < sB ? 'A' : 'B', El = sA < sB ? EA : EB, sl = Math.min(sA, sB);
      const Ec = wf * rf + (1 - wf) * El, sc = (1 - wf) * sl;
      const eq = Math.abs(EA - EB) < 0.003;
      return {
        text: `<p>En investor vurderer to aksjer, A og B. Kursen på aksje A er nå <b>${p0A}</b> og kursen på aksje B er <b>${p0B}</b>. Om ett år forventes følgende utfall:</p>` +
          table(['Sannsynlighet', 'Kurs aksje A', 'Kurs aksje B'], ps.map((p, i) => [pct(p, 0), pa[i], pb[i]]), { allNum: true }),
        parts: [
          { q: 'Hva er forventet avkastning for aksje A?', answer: EA, unit: '%',
            hint: 'Regn først kurs om til avkastning: sluttkurs / startkurs − 1.',
            sol: table(['p', 'Avkastning A', 'Avkastning B'], ps.map((p, i) => [n(p, 2), pct(a[i], 2), pct(b[i], 2)]), { allNum: true }) + f(`E(r<sub>A</sub>) = ${ps.map((p, i) => `${n(p, 2)} · ${pct(a[i], 2)}`).join(' + ')} = ${pct(EA, 2)}`) },
          { q: 'Hva er forventet avkastning for aksje B?', answer: EB, unit: '%', sol: f(`E(r<sub>B</sub>) = ${ps.map((p, i) => `${n(p, 2)} · ${pct(b[i], 2)}`).join(' + ')} = ${pct(EB, 2)}`) },
          { q: 'Hva er standardavviket til avkastningen for aksje A?', answer: sA, unit: '%', tol: { abs: 0.0006 },
            sol: f(`Var = ${ps.map((p, i) => `${n(p, 2)} · (${n(a[i], 4)} − ${n(EA, 4)})²`).join(' + ')} = ${n(vA, 6)}`) + f(`σ<sub>A</sub> = ${pct(sA, 2)}`) },
          { q: 'Hva er standardavviket til avkastningen for aksje B?', answer: sB, unit: '%', tol: { abs: 0.0006 }, sol: f(`Var = ${n(vB, 6)} → σ<sub>B</sub> = ${pct(sB, 2)}`) },
          { kind: 'text', q: 'Anta at begge aksjene er korrekt priset i henhold til kapitalverdimodellen. Skyldes forskjellen i standardavvik mellom A og B systematisk eller usystematisk risiko? Diskuter.',
            points: ['I KVM bestemmes forventet avkastning <b>bare</b> av systematisk risiko (beta): E(r) = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>).',
              eq ? 'Aksjene har (tilnærmet) lik forventet avkastning → de må ha lik beta, altså lik systematisk risiko. Forskjellen i standardavvik må derfor skyldes <b>usystematisk</b> (bedriftsspesifikk) risiko.'
                : `Aksje ${EA > EB ? 'A' : 'B'} har høyest forventet avkastning og må derfor ha høyest beta (mest systematisk risiko). Men aksje ${sA > sB ? 'A' : 'B'} har høyest standardavvik. ` + ((EA > EB) === (sA > sB) ? 'Noe av forskjellen i total risiko kan dermed skyldes systematisk risiko, resten er usystematisk.' : 'At aksjen med lavest forventet avkastning har høyest total risiko, viser at mye av dens risiko er <b>usystematisk</b> – den gir ingen ekstra avkastning.'),
              'Usystematisk risiko kan diversifiseres bort og belønnes ikke med risikopremie. Standardavviket måler total risiko og sier derfor ikke direkte noe om avkastningskravet.'] },
          { q: `Anta at selskapene opererer i helt ulike markeder slik at kovarians og korrelasjon er 0. Hva er forventet avkastning for en portefølje med ${pct(w, 0)} i A og ${pct(1 - w, 0)} i B?`, answer: Ep, unit: '%',
            sol: f(`E(r<sub>p</sub>) = ${n(w, 2)} · ${pct(EA, 2)} + ${n(1 - w, 2)} · ${pct(EB, 2)} = ${pct(Ep, 2)}`) },
          { q: 'Hva er standardavviket til denne porteføljen?', answer: sp, unit: '%', tol: { abs: 0.0006 },
            hint: 'Med ρ = 0 faller kovariansleddet bort.',
            sol: f(`Var(r<sub>p</sub>) = ${n(w, 2)}² · ${n(vA, 6)} + ${n(1 - w, 2)}² · ${n(vB, 6)} = ${n(sp * sp, 6)} → σ<sub>p</sub> = ${pct(sp, 2)}`) +
              `<p>Lavere enn veid snitt (${pct(w * sA + (1 - w) * sB, 2)})${sp < Math.min(sA, sB) ? ' – og faktisk lavere enn begge enkeltaksjene' : ''}.</p>` },
          { q: 'Hvilken andel i aksje A minimerer porteføljens standardavvik (fortsatt ρ = 0)?', answer: wMin, unit: '%', tol: { abs: 0.003 },
            sol: f(`w<sub>A</sub> = ${frac('σ<sub>B</sub>²', 'σ<sub>A</sub>² + σ<sub>B</sub>²')} = ${frac(n(vB, 6), n(vA + vB, 6))} = ${pct(wMin, 2)}`) + `<p>Andel B = ${pct(1 - wMin, 2)}. Laveste standardavvik = ${pct(sMin, 2)}. Mest vekt på aksjen med lavest risiko.</p>` },
          { q: `Anta at du plasserer ${pct(wf, 0)} risikofritt til ${pct(rf, 0)} rente og resten i aksje ${low}. Hva blir forventet avkastning?`, answer: Ec, unit: '%',
            sol: f(`${n(wf, 2)} · ${pct(rf, 0)} + ${n(1 - wf, 2)} · ${pct(El, 2)} = ${pct(Ec, 2)}`) },
          { q: 'Hva blir standardavviket til denne kombinasjonen?', answer: sc, unit: '%', tol: { abs: 0.0006 },
            sol: f(`σ = ${n(1 - wf, 2)} · ${pct(sl, 2)} = ${pct(sc, 2)}`) + '<p>Den risikofrie plasseringen har standardavvik 0 og kovarians 0 med alt annet, så risikoen skaleres lineært med aksjeandelen.</p>' },
        ],
      };
    },
  });

  // ------------------------------------------------------------------
  O.reg({
    id: 'k11-kml-beta', chapter: 11, level: 3, minutes: 18, examLike: '2019 oppg. 3c (kovarians fra beta)',
    title: 'Kapitalmarkedslinjen, beta og verdipapirmarkedslinjen',
    topic: 'Avkastningskrav',
    blurb: 'Kombiner markedsporteføljen med risikofri plassering, og regn mellom beta, kovarians og korrelasjon.',
    gen(R) {
      const rf = R.pick([0.02, 0.03, 0.04]), rm = rf + R.pick([0.05, 0.06, 0.07]), sm = R.pick([0.15, 0.18, 0.2, 0.22]);
      const target = R.pick([0.08, 0.1, 0.12, 0.25, 0.3]);
      const wM = target / sm, Et = rf + (rm - rf) / sm * target;
      const beta = R.int(60, 180, 5) / 100, cov = beta * sm * sm, sj = Math.ceil(beta * sm * R.pick([1.3, 1.5, 1.8]) * 100) / 100;
      const rho = cov / (sj * sm), sys = beta * sm, unsys = Math.sqrt(sj * sj - sys * sys);
      const w1 = R.pick([0.3, 0.4, 0.5, 0.6]), b2 = R.int(50, 190, 10) / 100, bp = w1 * beta + (1 - w1) * b2;
      return {
        text: `<p>Risikofri rente er <b>${pct(rf, 0)}</b>. Markedsporteføljen har forventet avkastning <b>${pct(rm, 0)}</b> og standardavvik <b>${pct(sm, 0)}</b>. Aksjen i selskapet Delta ASA har beta <b>${n(beta, 2)}</b> og standardavvik <b>${pct(sj, 0)}</b>.</p>`,
        parts: [
          { q: 'Hva er helningen på kapitalmarkedslinjen (prisen per enhet risiko)?', answer: (rm - rf) / sm, unit: '', dec: 3, tol: { abs: 0.0012 },
            sol: f(`${frac('r<sub>m</sub> − r<sub>f</sub>', 'σ<sub>m</sub>')} = ${frac(pct(rm - rf, 0), pct(sm, 0))} = ${n((rm - rf) / sm, 3)}`) },
          { q: `Du ønsker en effisient portefølje med standardavvik ${pct(target, 0)}. Hvor stor andel må plasseres i markedsporteføljen?`, answer: wM, unit: '%',
            sol: f(`w<sub>m</sub> = ${frac(pct(target, 0), pct(sm, 0))} = ${pct(wM, 2)}`) + (wM > 1 ? `<p>Andelen er over 100 %: du må <b>låne</b> ${pct(wM - 1, 1)} av egenkapitalen til risikofri rente og investere alt i markedsporteføljen.</p>` : `<p>Resten, ${pct(1 - wM, 1)}, plasseres risikofritt.</p>`) },
          { q: 'Hva er forventet avkastning på denne porteføljen?', answer: Et, unit: '%',
            sol: f(`E(r<sub>p</sub>) = r<sub>f</sub> + ${frac('r<sub>m</sub> − r<sub>f</sub>', 'σ<sub>m</sub>')} · σ<sub>p</sub> = ${pct(rf, 0)} + ${n((rm - rf) / sm, 3)} · ${pct(target, 0)} = ${pct(Et, 2)}`) },
          { q: 'Hva er avkastningskravet til Delta-aksjen ifølge KVM?', answer: F.capm(rf, beta, rm), unit: '%', sol: f(`${pct(rf, 0)} + ${n(beta, 2)} · (${pct(rm, 0)} − ${pct(rf, 0)}) = ${pct(F.capm(rf, beta, rm), 2)}`) },
          { q: 'Hva er kovariansen mellom Delta-aksjens avkastning og markedets avkastning? (6 desimaler)', answer: cov, unit: '', dec: 6, tol: { abs: 0.000012, rel: 0.002 },
            hint: 'β = Kov(r<sub>j</sub>, r<sub>m</sub>) / Var(r<sub>m</sub>).', sol: f(`Kov = β · σ<sub>m</sub>² = ${n(beta, 2)} · ${n(sm, 2)}² = ${n(cov, 6)}`) },
          { q: 'Hva er korrelasjonen mellom Delta-aksjen og markedet?', answer: rho, unit: '', dec: 3, tol: { abs: 0.003 },
            sol: f(`ρ = ${frac('Kov', 'σ<sub>j</sub> · σ<sub>m</sub>')} = ${frac(n(cov, 6), `${n(sj, 2)} · ${n(sm, 2)}`)} = ${n(rho, 3)}`) + `<p>Tilsvarende: β = ρ · σ<sub>j</sub> / σ<sub>m</sub>.</p>` },
          { q: 'Hvor stor del av Delta-aksjens standardavvik er usystematisk risiko? (Oppgi usystematisk standardavvik.)', answer: unsys, unit: '%', tol: { abs: 0.0006 },
            hint: 'σ<sub>j</sub>² = β²σ<sub>m</sub>² + usystematisk varians.',
            sol: f(`Systematisk: β · σ<sub>m</sub> = ${pct(sys, 2)}`) + f(`Usystematisk: √(${n(sj, 2)}² − ${n(sys, 4)}²) = ${pct(unsys, 2)}`) + '<p>Bare den systematiske delen gir risikopremie.</p>' },
          { q: `Du setter ${pct(w1, 0)} i Delta og resten i en aksje med beta ${n(b2, 2)}. Hva er porteføljens beta?`, answer: bp, unit: '', dec: 3, tol: { abs: 0.0012 },
            sol: f(`β<sub>p</sub> = ${n(w1, 2)} · ${n(beta, 2)} + ${n(1 - w1, 2)} · ${n(b2, 2)} = ${n(bp, 3)}`) + '<p>Porteføljens beta er alltid det veide snittet av enkeltaksjenes betaer.</p>' },
        ],
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
