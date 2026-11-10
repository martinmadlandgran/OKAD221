/* ØKAD 221 – finansmotor. Rene funksjoner, ingen DOM. Fungerer i nettleser og Node. */
(function (root) {
  'use strict';
  const F = {};

  // ---------- Nåverdi og internrente ----------
  /** Nåverdi av kontantstrøm cfs[0..n], der cfs[0] er på tidspunkt 0. */
  F.npv = (r, cfs) => cfs.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);

  /** Nåverdi med periodespesifikke diskonteringsrenter (spotrenter). spots[t-1] gjelder tidspunkt t. */
  F.npvSpot = (spots, cfs) => cfs.reduce((s, c, t) => s + (t === 0 ? c : c / Math.pow(1 + spots[t - 1], t)), 0);

  /** Internrente ved halvering. Returnerer NaN hvis ingen fortegnsskifte i [lo, hi]. */
  F.irr = (cfs, lo = -0.99, hi = 10) => {
    let flo = F.npv(lo, cfs), fhi = F.npv(hi, cfs);
    if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return NaN;
    for (let i = 0; i < 200; i++) {
      const mid = (lo + hi) / 2, fm = F.npv(mid, cfs);
      if (flo * fm <= 0) { hi = mid; fhi = fm; } else { lo = mid; flo = fm; }
      if (Math.abs(hi - lo) < 1e-12) break;
    }
    return (lo + hi) / 2;
  };

  /** Generell nullpunktsløser (halvering). */
  F.solve = (fn, lo, hi) => {
    let flo = fn(lo), fhi = fn(hi);
    if (flo * fhi > 0) return NaN;
    for (let i = 0; i < 200; i++) {
      const mid = (lo + hi) / 2, fm = fn(mid);
      if (flo * fm <= 0) { hi = mid; fhi = fm; } else { lo = mid; flo = fm; }
      if (Math.abs(hi - lo) < 1e-13) break;
    }
    return (lo + hi) / 2;
  };

  /** Tilbakebetalingstid (payback) i år, lineært interpolert. NaN hvis aldri tilbakebetalt. */
  F.payback = (cfs) => {
    let acc = 0;
    for (let t = 0; t < cfs.length; t++) {
      const prev = acc; acc += cfs[t];
      if (t > 0 && acc >= 0 && prev < 0) return t - 1 + (-prev) / cfs[t];
    }
    return NaN;
  };

  // ---------- Rentesregning ----------
  /** Sluttverdifaktor (1+r)^n */
  F.fv = (pv, r, n) => pv * Math.pow(1 + r, n);
  F.pv = (fv, r, n) => fv / Math.pow(1 + r, n);
  /** Annuitetens nåverdifaktor (etterskuddsvis): (1-(1+r)^-n)/r */
  F.annuityFactor = (r, n) => (r === 0 ? n : (1 - Math.pow(1 + r, -n)) / r);
  /** Annuitetsfaktor (invers): beløp per periode for lån på 1 */
  F.annuityPayment = (pv, r, n) => pv / F.annuityFactor(r, n);
  /** Sluttverdi av annuitet */
  F.fvAnnuity = (pmt, r, n) => (r === 0 ? pmt * n : pmt * (Math.pow(1 + r, n) - 1) / r);
  /** Nåverdi av voksende annuitet (første beløp c om ett år, vekst g) */
  F.pvGrowingAnnuity = (c, r, g, n) =>
    (Math.abs(r - g) < 1e-12 ? c * n / (1 + r) : c / (r - g) * (1 - Math.pow((1 + g) / (1 + r), n)));
  /** Evigvarende (voksende) kontantstrøm */
  F.perpetuity = (c, r, g = 0) => c / (r - g);
  /** Effektiv årsrente fra nominell årsrente med m terminer */
  F.effFromNom = (nom, m) => Math.pow(1 + nom / m, m) - 1;
  /** Effektiv årsrente fra perioderente */
  F.effFromPeriod = (rp, m) => Math.pow(1 + rp, m) - 1;
  /** Periode-rente fra effektiv årsrente */
  F.periodFromEff = (eff, m) => Math.pow(1 + eff, 1 / m) - 1;
  /** Kontinuerlig forrentning */
  F.effContinuous = (nom) => Math.exp(nom) - 1;
  /** Realrente (Fisher) */
  F.realRate = (nom, infl) => (1 + nom) / (1 + infl) - 1;
  F.nominalRate = (real, infl) => (1 + real) * (1 + infl) - 1;

  /** Annuitetslån: plan med rente, avdrag, restgjeld per termin. */
  F.annuityLoan = (principal, r, n) => {
    const pmt = F.annuityPayment(principal, r, n);
    const rows = []; let bal = principal;
    for (let t = 1; t <= n; t++) {
      const interest = bal * r, repay = pmt - interest; bal -= repay;
      rows.push({ t, payment: pmt, interest, repay, balance: Math.abs(bal) < 1e-7 ? 0 : bal });
    }
    return { payment: pmt, rows };
  };
  /** Serielån: like avdrag. */
  F.serialLoan = (principal, r, n) => {
    const repay = principal / n; const rows = []; let bal = principal;
    for (let t = 1; t <= n; t++) {
      const interest = bal * r; bal -= repay;
      rows.push({ t, payment: repay + interest, interest, repay, balance: Math.abs(bal) < 1e-7 ? 0 : bal });
    }
    return { rows };
  };

  // ---------- Obligasjoner og aksjer ----------
  /** Kontantstrøm for obligasjon med årlig kupong. */
  F.bondCashflows = (face, couponRate, n) => {
    const cfs = [0];
    for (let t = 1; t <= n; t++) cfs.push(face * couponRate + (t === n ? face : 0));
    return cfs;
  };
  F.bondPrice = (face, couponRate, y, n) => F.npv(y, F.bondCashflows(face, couponRate, n));
  F.bondPriceSpot = (face, couponRate, spots) => F.npvSpot(spots, F.bondCashflows(face, couponRate, spots.length));
  F.bondYtm = (price, face, couponRate, n) => {
    const cfs = F.bondCashflows(face, couponRate, n); cfs[0] = -price;
    return F.irr(cfs, -0.9, 5);
  };
  /** Macaulay-durasjon (år) */
  F.duration = (face, couponRate, y, n) => {
    const cfs = F.bondCashflows(face, couponRate, n);
    const price = F.npv(y, cfs);
    let w = 0;
    for (let t = 1; t <= n; t++) w += t * cfs[t] / Math.pow(1 + y, t);
    return w / price;
  };
  F.modDuration = (face, couponRate, y, n) => F.duration(face, couponRate, y, n) / (1 + y);
  /** Terminrente mellom tidspunkt a og b gitt spotrenter (årlige) s_a og s_b */
  F.forwardRate = (sa, a, sb, b) => Math.pow(Math.pow(1 + sb, b) / Math.pow(1 + sa, a), 1 / (b - a)) - 1;
  /** Gordons formel: P0 = D1/(k-g) */
  F.gordon = (d1, k, g) => d1 / (k - g);

  // ---------- Avskrivning og skatt ----------
  /** Saldoavskrivning. Returnerer {dep[], book[]} for år 1..n. book[t] = saldo ved utgangen av år t. */
  F.saldo = (cost, rate, n) => {
    const dep = [], book = []; let b = cost;
    for (let t = 1; t <= n; t++) { const d = b * rate; dep.push(d); b -= d; book.push(b); }
    return { dep, book };
  };
  F.linear = (cost, n, salvage = 0) => Array.from({ length: n }, () => (cost - salvage) / n);
  /**
   * Nåverdi av skattebesparelse ved saldoavskrivning i all fremtid av en saldo B
   * (første avskrivning ett år etter verdsettelsestidspunktet): B·a·s/(r+a)
   */
  F.pvSaldoTaxShield = (balance, a, s, r) => balance * a * s / (r + a);

  // ---------- Kapitalkostnad ----------
  F.capm = (rf, beta, rm) => rf + beta * (rm - rf);
  /** Eldre lærebokvariant: skattejustert risikofri rente */
  F.capmTaxAdj = (rf, beta, rm, s) => rf * (1 - s) + beta * (rm - rf * (1 - s));
  F.wacc = (re, wE, rd, wD, s) => re * wE + rd * (1 - s) * wD;
  /** Egenkapitalbeta fra investeringsbeta (gjeldsbeta = 0 som standard) */
  F.betaEquity = (betaAsset, dOverE, betaDebt = 0) => betaAsset + (betaAsset - betaDebt) * dOverE;
  F.betaAsset = (betaE, wE, betaD = 0, wD = 0) => betaE * wE + betaD * wD;

  // ---------- Usikkerhet og portefølje ----------
  F.mean = (xs, ps) => (ps ? xs.reduce((s, x, i) => s + x * ps[i], 0) : xs.reduce((s, x) => s + x, 0) / xs.length);
  /** Varians. Med sannsynligheter: populasjonsvarians. Uten: utvalg (n-1) hvis sample=true. */
  F.variance = (xs, ps, sample = false) => {
    const m = F.mean(xs, ps);
    if (ps) return xs.reduce((s, x, i) => s + ps[i] * (x - m) ** 2, 0);
    return xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - (sample ? 1 : 0));
  };
  F.sd = (xs, ps, sample = false) => Math.sqrt(F.variance(xs, ps, sample));
  F.covariance = (xs, ys, ps, sample = false) => {
    const mx = F.mean(xs, ps), my = F.mean(ys, ps);
    if (ps) return xs.reduce((s, x, i) => s + ps[i] * (x - mx) * (ys[i] - my), 0);
    return xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / (xs.length - (sample ? 1 : 0));
  };
  F.correlation = (xs, ys, ps, sample = false) =>
    F.covariance(xs, ys, ps, sample) / (F.sd(xs, ps, sample) * F.sd(ys, ps, sample));
  /** Porteføljevarians for to aktiva */
  F.portVar2 = (w1, s1, w2, s2, rho) => w1 * w1 * s1 * s1 + w2 * w2 * s2 * s2 + 2 * w1 * w2 * rho * s1 * s2;
  F.portSd2 = (w1, s1, w2, s2, rho) => Math.sqrt(F.portVar2(w1, s1, w2, s2, rho));
  /** Minimum-varians-vekt for aktivum 1 */
  F.minVarWeight = (s1, s2, rho) => (s2 * s2 - rho * s1 * s2) / (s1 * s1 + s2 * s2 - 2 * rho * s1 * s2);
  F.beta = (covIM, varM) => covIM / varM;

  // ---------- Investeringsanalyse ----------
  /** Annuitetsekvivalent (årskostnad / ekvivalent årlig beløp) av en nåverdi */
  F.eqAnnuity = (npv, r, n) => npv / F.annuityFactor(r, n);
  /** Nåverdiindeks */
  F.pi = (npv, invest) => npv / invest;

  // ---------- Opsjoner ----------
  F.callPayoff = (S, K) => Math.max(S - K, 0);
  F.putPayoff = (S, K) => Math.max(K - S, 0);
  /** Én-periodisk binomisk modell. u, d er faktorer, rf periodens risikofrie rente. */
  F.binomial1 = (S, K, u, d, rf, type = 'call') => {
    const Su = S * u, Sd = S * d;
    const pay = type === 'call' ? F.callPayoff : F.putPayoff;
    const Cu = pay(Su, K), Cd = pay(Sd, K);
    const q = (1 + rf - d) / (u - d);
    const delta = (Cu - Cd) / (Su - Sd);
    const B = (Cd - delta * Sd) / (1 + rf); // posisjon i risikofri (negativ = lån)
    return { Su, Sd, Cu, Cd, q, delta, B, value: (q * Cu + (1 - q) * Cd) / (1 + rf) };
  };
  /** Put-call-paritet: C + PV(K) = P + S. Gir manglende verdi. */
  F.putFromCall = (C, S, K, rf, T) => C - S + K / Math.pow(1 + rf, T);
  F.callFromPut = (P, S, K, rf, T) => P + S - K / Math.pow(1 + rf, T);
  /** Standard normalfordeling, kumulativ */
  F.normCdf = (x) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989422804014327 * Math.exp(-x * x / 2);
    const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return x >= 0 ? 1 - p : p;
  };
  /** Black–Scholes (rc er kontinuerlig rente; generatorene setter inn rf direkte, som LF kap. 13). */
  F.blackScholes = (S, K, rc, sigma, T) => {
    const d1 = (Math.log(S / K) + (rc + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);
    const call = S * F.normCdf(d1) - K * Math.exp(-rc * T) * F.normCdf(d2);
    const put = call - S + K * Math.exp(-rc * T);
    return { d1, d2, Nd1: F.normCdf(d1), Nd2: F.normCdf(d2), call, put };
  };

  root.OKAD = root.OKAD || {};
  root.OKAD.F = F;
  if (typeof module !== 'undefined' && module.exports) module.exports = F;
})(typeof globalThis !== 'undefined' ? globalThis : this);
