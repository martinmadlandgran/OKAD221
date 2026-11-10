/* Hjelpefunksjoner: tallformat, tilfeldige tall med frø, HTML-byggere. */
(function (root) {
  'use strict';
  const U = {};

  // ---------- Tilfeldige tall med frø (reproduserbare oppgaver) ----------
  U.rng = (seed) => {
    let a = seed >>> 0;
    const next = () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const R = {
      next,
      /** Heltall i [lo, hi] med steg */
      int: (lo, hi, step = 1) => lo + step * Math.floor(next() * (Math.floor((hi - lo) / step) + 1)),
      pick: (arr) => arr[Math.floor(next() * arr.length)],
      bool: (p = 0.5) => next() < p,
      shuffle: (arr) => {
        const a2 = arr.slice();
        for (let i = a2.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [a2[i], a2[j]] = [a2[j], a2[i]]; }
        return a2;
      },
    };
    return R;
  };
  U.newSeed = () => Math.floor(Math.random() * 2147483647) + 1;

  // ---------- Norsk tallformat ----------
  const nb = (dec) => new Intl.NumberFormat('nb-NO', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const cache = {};
  /** Tall med d desimaler, mellomrom som tusenskille og komma som desimaltegn. */
  U.n = (x, d = 0) => {
    if (x === null || x === undefined || Number.isNaN(x)) return '–';
    const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x;
    return (cache[d] || (cache[d] = nb(d))).format(v).replace(/−/g, '−');
  };
  /** Prosent fra desimaltall: 0.1234 -> "12,34 %" */
  U.pct = (x, d = 2) => U.n(x * 100, d) + ' %';
  U.kr = (x, d = 0) => U.n(x, d) + ' kr';
  /** Tolker brukerinndata: "1 234,5", "12,3%", "1.234,5", "-5" */
  U.parse = (s) => {
    if (typeof s !== 'string') return NaN;
    let t = s.trim().replace(/[\s  ]/g, '').replace(/%|tusen|kr|år|dager|dag/gi, '').replace(/−/g, '-');
    if (t === '') return NaN;
    if (t.includes(',') && t.includes('.')) t = t.replace(/\./g, '').replace(',', '.');
    else t = t.replace(',', '.');
    return /^-?\d*\.?\d+(e-?\d+)?$/i.test(t) ? parseFloat(t) : NaN;
  };

  // ---------- HTML ----------
  U.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /**
   * Bygger en tabell. head: array av celler, rows: array av arrayer.
   * Første kolonne venstrejustert, resten høyrejustert (tall). Rad kan være {cells, cls}.
   */
  U.table = (head, rows, opts = {}) => {
    const th = head ? '<thead><tr>' + head.map((h) => `<th>${h}</th>`).join('') + '</tr></thead>' : '';
    const tb = rows.map((r) => {
      const cells = Array.isArray(r) ? r : r.cells; const cls = Array.isArray(r) ? '' : ` class="${r.cls || ''}"`;
      return `<tr${cls}>` + cells.map((c, i) => (i === 0 && !opts.allNum ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('') + '</tr>';
    }).join('');
    return `<div class="tablewrap"><table class="data${opts.cls ? ' ' + opts.cls : ''}">${th}<tbody>${tb}</tbody></table></div>`;
  };
  /** Kontantstrømtabell: rader = [navn, verdier[]] over år 0..n. null/undefined vises tomt. */
  U.cfTable = (rows, n, opts = {}) => {
    const start = opts.start === undefined ? 0 : opts.start;
    const head = [opts.corner || 'År'];
    for (let t = start; t <= n; t++) head.push(String(t));
    const body = rows.map((r) => {
      const [name, vals, cls] = r;
      const cells = [name];
      for (let t = start; t <= n; t++) {
        const v = vals[t];
        cells.push(v === null || v === undefined ? '' : (typeof v === 'string' ? v : U.n(v, opts.dec || 0)));
      }
      return { cells, cls: cls || '' };
    });
    return U.table(head, body);
  };
  /** Formelblokk */
  U.f = (html) => `<div class="formula">${html}</div>`;
  /** Brøk */
  U.frac = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  U.steps = (arr) => '<ol class="steps">' + arr.map((s) => `<li>${s}</li>`).join('') + '</ol>';

  /** Kort, stabil id fra en tekst (FNV-1a, 32 bit). Brukes for quizspørsmål. */
  U.hash = (str) => { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return 'q' + (h >>> 0).toString(36); };

  // ---------- Avrunding ----------
  U.round = (x, d = 0) => { const p = Math.pow(10, d); return Math.round((x + Number.EPSILON) * p) / p; };
  U.sum = (a) => a.reduce((s, x) => s + x, 0);
  U.range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

  root.OKAD = root.OKAD || {};
  root.OKAD.U = U;
  if (typeof module !== 'undefined' && module.exports) module.exports = U;
})(typeof globalThis !== 'undefined' ? globalThis : this);
