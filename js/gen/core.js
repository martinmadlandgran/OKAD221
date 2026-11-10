/* Register for oppgavegeneratorer + svarsjekk. */
(function (root) {
  'use strict';
  const O = (root.OKAD = root.OKAD || {});
  O.gens = [];
  O.genById = {};
  /**
   * Registrerer en generator:
   * { id, title, chapter, topic, level (1-3), examFreq, blurb, minutes, gen(R) -> { text, parts[] } }
   * part: { q, answer, unit ('kr'|'%'|'år'|''), dec, tol, hint, sol, kind ('num'|'text'), points[] }
   * Prosentsvar lagres som desimaltall (0,1234) og tastes inn som prosent (12,34).
   */
  O.reg = (g) => { O.gens.push(g); O.genById[g.id] = g; };

  O.make = (id, seed) => {
    const g = O.genById[id];
    const task = g.gen(O.U.rng(seed));
    task.id = id; task.seed = seed; task.gen = g;
    task.parts.forEach((p, i) => {
      p.label = p.label || 'abcdefghij'[i];
      p.kind = p.kind || (p.answer === undefined || p.answer === null ? 'text' : 'num');
      if (p.kind === 'num' && p.dec === undefined) p.dec = p.unit === '%' ? 2 : (p.unit === 'år' ? 2 : 0);
    });
    return task;
  };

  /** Sjekker tallsvar. Returnerer 'ok' | 'near' | 'no' | 'invalid'. */
  O.check = (part, input) => {
    const v = O.U.parse(input);
    if (Number.isNaN(v)) return 'invalid';
    const ans = part.answer;
    const user = part.unit === '%' ? v / 100 : v;
    const diff = Math.abs(user - ans);
    const tol = part.tol || {};
    let abs, rel;
    if (part.unit === '%') { abs = tol.abs !== undefined ? tol.abs : 0.00055; rel = 0; }
    else if (part.unit === 'kr') { abs = tol.abs !== undefined ? tol.abs : 1; rel = tol.rel !== undefined ? tol.rel : 0.003; }
    else { abs = tol.abs !== undefined ? tol.abs : 0.5 * Math.pow(10, -(part.dec || 0)) * 1.2; rel = tol.rel !== undefined ? tol.rel : 0.001; }
    const lim = Math.max(abs, rel * Math.abs(ans));
    if (diff <= lim) return 'ok';
    // Vanlig feil: fortegn eller prosent tastet som desimal
    if (diff <= lim * 8) return 'near';
    return 'no';
  };

  O.fmtAnswer = (part) => {
    const U = O.U;
    if (part.unit === '%') return U.pct(part.answer, part.dec);
    return U.n(part.answer, part.dec) + (part.unit ? ' ' + part.unit : '');
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
