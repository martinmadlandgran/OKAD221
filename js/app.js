/* ØKAD 221 – app: ruting, visninger, fremdrift. */
(function () {
  'use strict';
  const O = window.OKAD, U = O.U, F = O.F;
  // Innholdsblokkere (reklame- og sporingsblokkere) kan stoppe enkeltfiler. Da skal siden si det, ikke bli blank.
  const missing = [['prognosen og temaene', O.prediction && O.topics], ['eksamenssettene', O.exams && O.exams.length], ['teorien', O.theory && O.theory.length], ['quizen', O.quiz && O.quiz.length], ['oppgavegeneratorene', O.gens && O.gens.length]].filter((x) => !x[1]).map((x) => x[0]);
  const failed = (window.OKAD_FAILED || []).map((f) => f.replace(/^.*\//, ''));
  if (missing.length || failed.length) {
    const nb0 = document.getElementById('notice'), msg = `Nettleseren stoppet en del av siden (${missing.concat(failed).join(', ')}). Det skyldes trolig en reklame- eller sporingsblokker. Slå den av for ${location.hostname || 'denne siden'} og last siden på nytt.`;
    if (nb0) { nb0.hidden = false; nb0.textContent = msg; }
    O.prediction = O.prediction || { slots: [], jokers: [] }; O.topics = O.topics || {}; O.exams = O.exams || []; O.theory = O.theory || []; O.quiz = O.quiz || []; O.gens = O.gens || []; O.genById = O.genById || {};
  }
  const { n, pct, esc, table } = U;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const view = $('#view');
  // ---------- Hardt mellomrom i tall, så «183 028», «12,5 %», «500 kr» og «30 dager» ikke brytes over to linjer på mobil ----------
  // Tusenskillet, mellom tall og enheten etter («%», «kr», «dager», «år», «tusen», «prosentpoeng», også «30 dagers» og «3 års»),
  // mellom «tusen» og «kr» («1 398 tusen kr»), og mellom «kr» og et tall etter («kr 500»). Enheten må stå som eget ord: «årlig», «kroner» og «kreditt» er urørt.
  // Gjelder bare det som vises: tekstnoder i siden byttes etter hver oppdatering. Data, id-er og lagret fremdrift er urørt.
  const UNIT = '(?:%|(?:kr|dager|år|tusen|prosentpoeng)(?:s)?(?![\\p{L}\\d]))';
  const NBHIT = new RegExp('\\d \\d{3}(?!\\d)|\\d ' + UNIT + '|tusen kr(?![\\p{L}\\d])|(?:^|[^\\p{L}\\d])kr [−-]?\\d', 'u');
  const NBUNIT = new RegExp('(\\d) (?=' + UNIT + ')', 'gu'), NBSTART = new RegExp('^ ' + UNIT, 'u');
  const nb = (t) => t.replace(/(\d) (?=\d{3}(?!\d))/g, '$1 ')
    .replace(NBUNIT, '$1 ')
    .replace(/( tusen) (?=kr(?![\p{L}\d]))/gu, '$1 ')
    .replace(/(^|[^\p{L}\d])kr (?=[−-]?\d)/gu, '$1kr ');
  // Enheten begynner en ny tekstnode rett etter et tall i forrige node (som «<b>12,5</b> %» eller «<b>30</b> dager»).
  const nbJoin = (t) => {
    if (!NBSTART.test(t.data)) return;
    let p = t.previousSibling;
    while (p && p.nodeType === 1 && p.lastChild) p = p.lastChild;
    if (p && p.nodeType === 3 && /\d$/.test(p.data)) t.data = nb(' ' + t.data.slice(1));
  };
  const NBSKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1 };
  const nbNode = (t) => { if (t.parentNode && NBSKIP[t.parentNode.nodeName]) return; if (NBHIT.test(t.data)) t.data = nb(t.data); nbJoin(t); };
  const nbText = (node) => {
    if (node.nodeType === 3) return nbNode(node);
    if (node.nodeType !== 1 || NBSKIP[node.nodeName]) return;
    const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    for (let t = w.nextNode(); t; t = w.nextNode()) nbNode(t);
  };
  nbText(document.body);
  new MutationObserver((ms) => { ms.forEach((m) => m.addedNodes.forEach(nbText)); }).observe(document.body, { childList: true, subtree: true });
  O.exams.sort((a, b) => b.year - a.year);
  O.theory.sort((a, b) => a.nr - b.nr);
  const chTitle = (nr) => { const c = O.theory.find((x) => x.nr === nr); return c ? c.title : ''; };

  // ---------- Lagring (med tydelig beskjed hvis den ikke virker) ----------
  const KEY = 'okad221:v1';
  const blank = () => ({ gen: {}, exam: {}, quiz: {}, qmiss: {}, mock: null, mockLog: [], examDate: '' });
  let S = blank(), storageOk = true;
  const notice = (msg) => { const el = $('#notice'); el.hidden = !msg; el.textContent = msg || ''; };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { storageOk = false; notice('Nettleseren tillater ikke lagring (privat modus?). Siden virker, men fremdriften forsvinner når du lukker fanen.'); }
  const save = () => { if (!storageOk) return; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { storageOk = false; notice('Kunne ikke lagre fremdriften – lagringsplassen i nettleseren er full eller sperret.'); } };
  const gstat = (id) => S.gen[id] || (S.gen[id] = { tried: 0, ok: 0, tasks: 0 });
  const mastery = (id) => { const g = S.gen[id]; return g && g.tried ? g.ok / g.tried : 0; };
  // ---------- Repetisjon: oppgaver med feil på første forsøk ----------
  // S.gen[id].miss = [{ s: frø, p: 'bd' (deloppgaver med feil), t: tid, m: 1 hvis fra prøveeksamen }], eldste først, høyst MISSMAX.
  const MISSMAX = 6;
  const addMiss = (id, seed, label, mock) => {
    const st = gstat(id), ms = st.miss || (st.miss = []);
    let e = ms.find((x) => x.s === seed);
    if (!e) { e = { s: seed, p: '', t: 0 }; ms.push(e); }
    if (!e.p.includes(label)) e.p = (e.p + label).split('').sort().join('');
    e.t = Date.now(); if (mock) e.m = 1;
    ms.sort((a, b) => a.t - b.t); while (ms.length > MISSMAX) ms.shift();
  };
  /** Oppgaven er løst uten feil: fjern den fra listen, eller den eldste av typen hvis det var en ny oppgave. Gir true hvis noe ble fjernet. */
  const clearMiss = (id, seed) => {
    const st = S.gen[id]; if (!st || !st.miss || !st.miss.length) return false;
    const i = st.miss.findIndex((x) => x.s === seed);
    st.miss.splice(i >= 0 ? i : 0, 1);
    if (!st.miss.length) delete st.miss;
    return true;
  };
  /** Hvor mye oppgavetypen trolig teller på eksamen (sannsynlighet × midtre vekt). */
  const examWeight = (id) => {
    let w = 0;
    O.prediction.slots.forEach((x) => { if (x.gens.includes(id)) w = Math.max(w, x.prob * (x.weight[0] + x.weight[1]) / 2); });
    O.prediction.jokers.forEach((x) => { if (x.gens.includes(id)) w = Math.max(w, x.prob * 15); });
    return w || 2;
  };
  function reviewList() {
    return O.gens.map((g) => {
      const ms = (S.gen[g.id] && S.gen[g.id].miss) || [];
      return ms.length ? { g, ms, last: Math.max(...ms.map((x) => x.t)), score: examWeight(g.id) * ms.length } : null;
    }).filter(Boolean).sort((a, b) => b.score - a.score || b.last - a.last);
  }
  // ---------- Repetisjon i quizen: spørsmål besvart feil kommer igjen til de er besvart riktig ----------
  // S.qmiss[id] = { t: sist feil (ms), n: antall feil }. id er en hash av spørsmålsteksten, så den tåler at spørsmål legges til eller flyttes.
  const QREP = 5, QMISSMAX = 1000;
  O.quiz.forEach((q) => { q.id = U.hash(q.q); });
  // Tusenskille som hardt mellomrom (se nb øverst). Etter id-en, så repetisjonen ikke flyttes.
  O.quiz.forEach((q) => { q.q = nb(q.q); q.options = q.options.map(nb); q.why = nb(q.why); });
  const quizById = {}; O.quiz.forEach((q) => { quizById[q.id] = q; });
  if (!S.qmiss || typeof S.qmiss !== 'object' || Array.isArray(S.qmiss)) S.qmiss = {};
  Object.keys(S.qmiss).forEach((k) => { if (!quizById[k]) delete S.qmiss[k]; });
  /** Spørsmål som venter på repetisjon, eldste feil først. ch: kapittelnummer eller 'alle'. */
  const quizDue = (ch) => O.quiz.filter((q) => S.qmiss[q.id] && (ch === 'alle' || String(q.ch) === String(ch))).sort((a, b) => S.qmiss[a.id].t - S.qmiss[b.id].t);
  const partList = (p) => { const a = p.split(''); return a.length === 1 ? a[0] : a.slice(0, -1).join(', ') + ' og ' + a[a.length - 1]; };
  // ---------- Flytte fremdrift mellom enheter: eksport, kontroll, sammenslåing ----------
  const MAXSEED = 2147483647;
  const isInt = (x, lo, hi) => Number.isInteger(x) && x >= lo && x <= hi;
  const isObj = (x) => !!x && typeof x === 'object' && !Array.isArray(x);
  const exportText = () => JSON.stringify({ app: 'okad221', format: 1, exported: new Date().toISOString(), data: S });
  /** Leser og renser en fremdriftsfil. Kaster Error med en forklaring brukeren kan handle på. */
  function readProgress(text) {
    if (typeof text !== 'string' || !text.trim()) throw new Error('Innholdet er tomt. Velg fremdriftsfilen du lastet ned, eller lim inn hele teksten.');
    if (text.length > 2e6) throw new Error('Innholdet er for stort til å være en fremdriftsfil fra denne siden (over 2 MB).');
    let o; try { o = JSON.parse(text); } catch (e) { throw new Error('Innholdet kunne ikke leses. Det må være fremdriftsfilen (.json) eller teksten fra «Kopier som tekst», uendret og komplett.'); }
    if (!isObj(o)) throw new Error('Dette er ikke en fremdriftsfil fra ØKAD 221-siden.');
    if (o.app !== undefined && o.app !== 'okad221') throw new Error('Filen er fra et annet program, ikke fra ØKAD 221-siden.');
    if (o.app === 'okad221' && o.format !== 1) throw new Error(typeof o.format === 'number' && o.format > 1 ? 'Filen er laget med en nyere versjon av siden. Last siden på nytt og prøv igjen.' : 'Filen mangler versjonsnummer og kan ikke leses.');
    const d = o.app === 'okad221' ? o.data : o;
    if (!isObj(d) || !['gen', 'exam', 'quiz', 'qmiss', 'mockLog'].some((k) => k in d)) throw new Error('Filen inneholder ingen fremdrift fra ØKAD 221-siden.');
    const out = blank(), warn = [];
    let unknown = 0;
    if (isObj(d.gen)) Object.keys(d.gen).forEach((id) => {
      const g = d.gen[id];
      if (!Object.prototype.hasOwnProperty.call(O.genById, id)) { unknown++; return; }
      if (isObj(g) && isInt(g.tried, 0, 1e7) && isInt(g.ok, 0, 1e7) && isInt(g.tasks || 0, 0, 1e7)) {
        out.gen[id] = { tried: g.tried, ok: Math.min(g.ok, g.tried), tasks: g.tasks || 0 };
        const ms = Array.isArray(g.miss) ? g.miss.filter((x) => isObj(x) && isInt(x.s, 1, MAXSEED) && typeof x.p === 'string' && /^[a-p]{1,16}$/.test(x.p) && Number.isFinite(x.t))
          .slice(-MISSMAX).map((x) => Object.assign({ s: x.s, p: x.p, t: x.t }, x.m === 1 ? { m: 1 } : {})) : [];
        if (ms.length) out.gen[id].miss = ms;
      }
    });
    if (unknown) warn.push(`${unknown} ${unknown === 1 ? 'oppgavetype' : 'oppgavetyper'} i filen finnes ikke på denne versjonen av siden og ble hoppet over.`);
    if (isObj(d.exam)) Object.keys(d.exam).forEach((k) => { if (/^\d{4}-\d{1,2}[a-z]$/.test(k) && d.exam[k] === true) out.exam[k] = true; });
    if (isObj(d.quiz)) Object.keys(d.quiz).forEach((k) => { const q = d.quiz[k]; if (/^\d{1,2}$/.test(k) && isObj(q) && isInt(q.n, 0, 1e7) && isInt(q.ok, 0, 1e7)) out.quiz[k] = { n: q.n, ok: Math.min(q.ok, q.n) }; });
    if (isObj(d.qmiss)) {
      let qu = 0;
      Object.keys(d.qmiss).slice(0, QMISSMAX).forEach((k) => {
        const x = d.qmiss[k];
        if (!Object.prototype.hasOwnProperty.call(quizById, k)) { qu++; return; }
        if (isObj(x) && Number.isFinite(x.t) && x.t > 0 && isInt(x.n, 1, 1e6)) out.qmiss[k] = { t: x.t, n: x.n };
      });
      if (qu) warn.push(`${qu} ${qu === 1 ? 'quizspørsmål' : 'quizspørsmål'} å repetere finnes ikke på denne versjonen av siden og ble hoppet over.`);
    }
    if (Array.isArray(d.mockLog)) out.mockLog = d.mockLog.slice(-500).filter((x) => isObj(x) && typeof x.date === 'string' && /^[0-9./\- ]{1,20}$/.test(x.date) && isInt(x.score, 0, 100) && isInt(x.min, 0, 1e6))
      .map((x) => Object.assign({ date: x.date, score: x.score, min: x.min }, Number.isFinite(x.t) ? { t: x.t } : {}, x.paper === true ? { paper: true } : {}));
    if (typeof d.examDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.examDate)) out.examDate = d.examDate;
    const m = d.mock;
    if (isObj(m) && isInt(m.seed, 1, MAXSEED) && Number.isFinite(m.start) && isInt(m.dur, 0, 10000) && isObj(m.ans)) {
      const ans = {}; Object.keys(m.ans).forEach((k) => { if (/^m\d{1,2}_\d{1,2}-in$/.test(k) && typeof m.ans[k] === 'string') ans[k] = m.ans[k].slice(0, 2000); });
      out.mock = Object.assign({ seed: m.seed, start: m.start, dur: m.dur, ans }, m.paper === true ? { paper: true } : {});
    }
    const when = typeof o.exported === 'string' && !Number.isNaN(Date.parse(o.exported)) ? new Date(o.exported) : null;
    return { data: out, warn, when };
  }
  const progressSummary = (st) => ({
    tried: U.sum(Object.values(st.gen).map((g) => g.tried)), types: Object.values(st.gen).filter((g) => g.tried > 0).length,
    exam: Object.values(st.exam).filter(Boolean).length, quiz: U.sum(Object.values(st.quiz).map((q) => q.n)), mocks: (st.mockLog || []).length, open: !!st.mock,
    review: U.sum(Object.values(st.gen).map((g) => (g.miss ? g.miss.length : 0))), qreview: Object.keys(st.qmiss || {}).length,
  });
  const isEmptyProgress = (st) => { const x = progressSummary(st); return !x.tried && !x.exam && !x.quiz && !x.qreview && !x.mocks && !x.open && !st.examDate; };
  /** Slår sammen to tilstander. Idempotent: samme fil to ganger gir samme resultat. */
  function mergeProgress(a, b) {
    const out = blank();
    new Set(Object.keys(a.gen).concat(Object.keys(b.gen))).forEach((id) => {
      const x = a.gen[id], y = b.gen[id];
      const best = !x ? y : !y ? x : (y.tried > x.tried || (y.tried === x.tried && y.ok > x.ok) ? y : x);
      out.gen[id] = { tried: best.tried, ok: best.ok, tasks: Math.max((x && x.tasks) || 0, (y && y.tasks) || 0) };
      // Repetisjonslisten: samme oppgave (frø) fra begge slås sammen, de nyeste beholdes.
      const ms = {};
      ((x && x.miss) || []).concat((y && y.miss) || []).forEach((e) => {
        const o = ms[e.s] || (ms[e.s] = { s: e.s, p: '', t: 0 });
        o.p = [...new Set((o.p + e.p).split(''))].sort().join(''); o.t = Math.max(o.t, e.t); if (e.m) o.m = 1;
      });
      const list = Object.values(ms).sort((a, b) => a.t - b.t).slice(-MISSMAX);
      if (list.length) out.gen[id].miss = list;
    });
    Object.keys(a.exam).concat(Object.keys(b.exam)).forEach((k) => { if (a.exam[k] || b.exam[k]) out.exam[k] = true; });
    new Set(Object.keys(a.quiz).concat(Object.keys(b.quiz))).forEach((k) => { const x = a.quiz[k], y = b.quiz[k]; out.quiz[k] = !x ? y : !y ? x : (y.n > x.n ? y : x); });
    // Quizrepetisjon: et spørsmål som venter på én av enhetene, venter etterpå (siste feil og flest feil beholdes).
    const qa = a.qmiss || {}, qb = b.qmiss || {};
    new Set(Object.keys(qa).concat(Object.keys(qb))).forEach((k) => { const x = qa[k], y = qb[k]; out.qmiss[k] = !x ? { t: y.t, n: y.n } : !y ? { t: x.t, n: x.n } : { t: Math.max(x.t, y.t), n: Math.max(x.n, y.n) }; });
    const key = (x) => [x.t || '', x.date, x.score, x.min].join('|'), seen = new Set((a.mockLog || []).map(key));
    out.mockLog = (a.mockLog || []).concat((b.mockLog || []).filter((x) => !seen.has(key(x))));
    if (out.mockLog.every((x) => x.t)) out.mockLog.sort((x, y) => x.t - y.t);
    out.examDate = a.examDate || b.examDate || '';
    out.mock = a.mock || b.mock || null;
    return out;
  }
  let homeFlash = '';

  const genMeta = (g) => { const st = S.gen[g.id]; return st && st.tried ? `<b>${Math.round(st.ok / st.tried * 100)} %</b> riktig av ${st.tried}` : 'ikke prøvd'; };

  // ---------- Tema ----------
  const themeBtn = $('#theme');
  const curTheme = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const paintTheme = () => { themeBtn.textContent = curTheme() === 'dark' ? 'Lyst tema' : 'Mørkt tema'; };
  try { const t = localStorage.getItem('okad221:theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) { /* ignorer */ }
  paintTheme();
  themeBtn.onclick = () => { const next = curTheme() === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; paintTheme(); try { localStorage.setItem('okad221:theme', next); } catch (e) { /* ignorer */ } };

  // ---------- Navigasjon: sju mål på desktop, fem i tommelhøyde på mobil ----------
  const NAV = [['oving', 'Øv'], ['prove', 'Prøveeksamen'], ['eksamener', 'Tidligere eksamener'], ['analyse', 'Eksamensanalyse'], ['tema', 'Teori'], ['formler', 'Formler'], ['quiz', 'Quiz']];
  const SUB = [['tema', 'Teori'], ['formler', 'Formler'], ['quiz', 'Quiz']];
  const TABS = [['', 'Hjem'], ['oving', 'Øv'], ['prove', 'Prøve'], ['eksamener', 'Eksamener'], ['tema', 'Teori']];
  const drawNav = (cur) => {
    const link = ([k, t]) => `<a href="#/${k}"${k === cur ? ' aria-current="page"' : ''}>${t}</a>`;
    $('#nav').innerHTML = NAV.map(link).join('');
    const tabCur = ['formler', 'quiz'].includes(cur) ? 'tema' : ['analyse', 'verktoy'].includes(cur) ? '' : cur;
    $('#tabbar').innerHTML = TABS.map(([k, t]) => `<a href="#/${k}"${k === tabCur ? ' aria-current="page"' : ''}>${t}</a>`).join('');
    // Mobil: Formler og Quiz får ikke plass i bunnmenyen og ligger under Teori. Raden øverst gjør dem synlige med ett trykk.
    // Lages hvis den mangler (en mellomlagret index.html fra før raden fantes, sammen med ny app.js)
    let sub = $('#subnav'); if (!sub) { sub = document.createElement('nav'); sub.className = 'subnav'; sub.id = 'subnav'; sub.setAttribute('aria-label', 'Slå opp'); view.before(sub); }
    sub.hidden = tabCur !== 'tema';
    sub.innerHTML = sub.hidden ? '' : SUB.map(link).join('');
  };
  const LEVEL = ['', 'Grunnleggende', 'Eksamensnivå', 'Krevende'];
  const genRow = (g) => `<li><a class="rowlink" href="#/oving/${g.id}"><span class="rl-title">${g.title}</span><span class="rl-sub">${g.blurb}</span>` +
    `<span class="rl-meta">${genMeta(g)}<br>${LEVEL[g.level]} · ${g.minutes} min</span></a></li>`;
  const notFound = (what, back, backLabel) => { view.innerHTML = `<div class="empty"><h2>Fant ikke ${what}</h2><p>Lenken peker på noe som ikke finnes. Den kan være skrevet feil eller være utdatert.</p><p><a class="btn primary" href="#/${back}">${backLabel}</a></p></div>`; };
  const setTitle = (t) => { document.title = (t ? t + ' – ' : '') + 'ØKAD 221'; };

  // ---------- Analyse (beregnes fra eksamensdataene) ----------
  const years = () => O.exams.map((e) => e.year).sort((a, b) => a - b);
  function topicStats() {
    const m = {}; Object.keys(O.topics).forEach((k) => (m[k] = {}));
    O.exams.forEach((e) => e.tasks.forEach((t) => {
      const per = t.weight / t.parts.length;
      t.parts.forEach((p) => { const ts = (p.topics && p.topics.length ? p.topics : t.topics).filter((k) => m[k]); ts.forEach((k) => { m[k][e.year] = (m[k][e.year] || 0) + per / ts.length; }); });
    }));
    const ys = years(), last = Math.max(...ys);
    return Object.keys(m).map((k) => {
      const present = ys.filter((y) => m[k][y] > 0);
      let wsum = 0, wtot = 0; ys.forEach((y) => { const w = Math.pow(0.75, last - y); wtot += w; if (m[k][y] > 0) wsum += w; });
      const avg = present.length ? U.sum(present.map((y) => m[k][y])) / present.length : 0;
      return { k, name: O.topics[k].name, row: m[k], count: present.length, recent: wsum / wtot, avg, last: present.length ? Math.max(...present) : null };
    }).sort((a, b) => b.recent * b.avg - a.recent * a.avg || b.count - a.count);
  }
  /** Anbefaling: forventet eksamensvekt × hvor mye som gjenstår å mestre. */
  function plan() {
    return O.prediction.slots.map((s) => {
      const ms = s.gens.map(mastery), m = Math.max(...ms), weakest = O.genById[s.gens[ms.indexOf(Math.min(...ms))]];
      const tried = U.sum(s.gens.map((id) => (S.gen[id] ? S.gen[id].tried : 0)));
      return { s, mid: (s.weight[0] + s.weight[1]) / 2, m, tried, g: weakest, score: s.prob * (s.weight[0] + s.weight[1]) / 2 * (1 - m) };
    });
  }

  // ====================================================================
  const routes = {};

  // ---------- Hjem: en arbeidsliste, ikke en plakat ----------
  routes[''] = () => {
    setTitle('');
    const P = plan(), next = P.slice().sort((a, b) => b.score - a.score)[0];
    const totTried = U.sum(Object.values(S.gen).map((g) => g.tried)), totOk = U.sum(Object.values(S.gen).map((g) => g.ok));
    const examParts = U.sum(O.exams.map((e) => U.sum(e.tasks.map((t) => t.parts.length)))), examDone = Object.values(S.exam).filter(Boolean).length;
    const lastMock = (S.mockLog || []).slice(-1)[0];
    let days = '';
    if (S.examDate) { const d = Math.ceil((new Date(S.examDate + 'T09:00') - new Date()) / 864e5); if (d >= 0) days = `<b>${d}</b> ${d === 1 ? 'dag' : 'dager'} til eksamen · `; }
    const started = totTried > 0;
    const RV = reviewList(), rvN = U.sum(RV.map((x) => x.ms.length));
    view.innerHTML = `
      <p class="eyebrow">ØKAD 221 · Investering og finansiering</p>
      <h1>${started ? 'Fortsett eksamenstreningen' : 'Fem oppgavetyper avgjør eksamen'}</h1>
      <p class="statline">${days}${started ? `<b>${totTried}</b> deloppgaver besvart, <b>${Math.round(totOk / totTried * 100)} %</b> riktig på første forsøk · <b>${examDone}</b> av ${examParts} eksamensdeloppgaver krysset av${lastMock ? ` · siste prøveeksamen <b>${lastMock.score} %</b>` : ''}` : 'Rangert etter hvor mye de har telt i de ti settene 2016–2025. Begynn øverst.'}</p>
      <div class="next">
        <div><p class="eyebrow">${S.mock ? 'Påbegynt' : 'Neste nå'}</p><h2>${S.mock ? 'Du har en prøveeksamen som ikke er levert' : next.g.title}</h2>
          <p class="small muted" style="margin:0">${S.mock ? (S.mock.paper ? 'Svarene du har tastet inn fra papiret, er lagret.' : 'Svarene dine er lagret. Klokken har gått siden du startet.') : `${next.s.title} teller trolig ${next.s.weight[0]}–${next.s.weight[1]} % · ca. ${next.g.minutes} min · ${next.tried ? 'du har ' + Math.round(next.m * 100) + ' % riktig hittil' : 'du har ikke prøvd denne ennå'}`}</p></div>
        <a class="btn primary big" href="#/${S.mock ? 'prove' : 'oving/' + next.g.id}">${S.mock ? 'Fortsett prøveeksamen' : 'Start oppgaven'}</a>
      </div>
      ${RV.length ? `<p class="review-line"><a href="#/repeter"><b>Repeter ${rvN} ${rvN === 1 ? 'oppgave' : 'oppgaver'}</b> du har bommet på</a> i ${RV.length} ${RV.length === 1 ? 'oppgavetype' : 'oppgavetyper'}. Viktigst nå: ${RV[0].g.title}.</p>` : ''}
      <ol class="plan" aria-label="Oppgavetyper etter eksamensvekt">${P.slice().sort((a, b) => b.mid - a.mid).map((x) => `<li class="${x.mid >= 28 ? 'heavy' : x.mid < 15 ? 'light' : ''}"><a href="#/oving/${x.g.id}">
        <span class="w">${x.s.weight[0]}–${x.s.weight[1]}<small>% av karakteren</small></span>
        <span><span class="t">${x.s.title}</span><br><span class="d">${x.g.title}</span></span>
        <span class="m">${x.tried ? Math.round(x.m * 100) + ' % riktig' : 'Ikke prøvd'}<span class="meter" aria-hidden="true"><i style="width:${Math.round(x.m * 100)}%"></i></span></span></a></li>`).join('')}</ol>
      <p class="small muted">Vektene er spennet oppgavetypen har hatt de siste årene. <a href="#/analyse">Se hele analysen og prognosen for 2026</a>.</p>
      <div class="cols2">
        <div><h2>Hele sett</h2><ul class="rows">
          <li><a class="rowlink" href="#/prove"><span class="rl-title">Prøveeksamen 2026</span><span class="rl-sub">Fem oppgaver med nye tall, tidtaking og retting.</span><span class="rl-meta">${lastMock ? `sist <b>${lastMock.score} %</b>` : 'ikke tatt'}</span></a></li>
          <li><a class="rowlink" href="#/eksamener"><span class="rl-title">Tidligere eksamener 2016–2025</span><span class="rl-sub">Ordrett oppgavetekst, fasit og løsning per deloppgave.</span><span class="rl-meta"><b>${examDone}</b> / ${examParts}</span></a></li></ul></div>
        <div><h2>Slå opp</h2><ul class="rows">
          <li><a class="rowlink" href="#/tema"><span class="rl-title">Teori per kapittel</span><span class="rl-sub">Begreper, fremgangsmåter, eksempler og typiske feil.</span></a></li>
          <li><a class="rowlink" href="#/formler"><span class="rl-title">Formelsamling</span><span class="rl-sub">Søkbar, ${U.sum(O.theory.map((t) => t.formulas.length))} formler.</span></a></li>
          <li><a class="rowlink" href="#/quiz"><span class="rl-title">Quiz</span><span class="rl-sub">${O.quiz.length} flervalgsspørsmål om begreper og feller.</span>${quizDue('alle').length ? `<span class="rl-meta"><b>${quizDue('alle').length}</b> å repetere</span>` : ''}</a></li>
          <li><a class="rowlink" href="#/verktoy"><span class="rl-title">Kalkulatorer</span><span class="rl-sub">Kontroller NNV, lån, obligasjon og WACC.</span></a></li></ul></div>
      </div>
      <h2>Innstillinger</h2>
      <p class="row"><label for="ed">Eksamensdato (gir nedtelling):</label> <input type="date" id="ed" value="${esc(S.examDate || '')}"></p>
      <h3 id="flytt">Flytt fremdriften til en annen enhet</h3>
      <p class="small muted" style="max-width:68ch">Fremdriften ligger bare i denne nettleseren. Last den ned her og hent den inn på den andre enheten – eller kopier den som tekst og send den til deg selv.</p>
      <p class="row"><button class="btn" type="button" id="exp">Last ned fremdriftsfil</button><button class="btn" type="button" id="copy">Kopier som tekst</button></p>
      <div id="expmsg" class="small" role="status"></div>
      <p class="row"><label for="impf">Hent fremdrift fra fil:</label> <input type="file" id="impf" accept=".json,application/json,text/plain"></p>
      <details id="pastebox"><summary>Lim inn tekst i stedet</summary><div class="inner"><label for="impt">Teksten fra «Kopier som tekst»</label><textarea id="impt" spellcheck="false" autocomplete="off"></textarea><p><button class="btn" type="button" id="impgo">Les inn teksten</button></p></div></details>
      <p id="impstatus" class="sr" role="status"></p><div id="impbox"></div>
      <p style="margin-top:22px"><button class="btn link" id="reset" type="button">Slett all lagret fremdrift</button> <span id="resetmsg" class="small" role="status"></span></p>`;

    $('#ed').onchange = (e) => { S.examDate = e.target.value; save(); routes[''](); };
    setupTransfer();
    $('#reset').onclick = () => {
      if (isEmptyProgress(S)) { $('#resetmsg').textContent = 'Det er ingenting å slette.'; return; }
      if (confirm('Slette all lagret fremdrift på denne enheten? Dette kan ikke angres.')) { S = blank(); save(); routes['']();  $('#resetmsg').textContent = 'Fremdriften er slettet.'; }
    };
  };

  /** Knapper for eksport og import på forsiden. */
  function setupTransfer() {
    const msg = (html, cls) => { $('#expmsg').innerHTML = html ? `<div class="callout ${cls || ''}"><p>${html}</p></div>` : ''; };
    if (homeFlash) { $('#impbox').innerHTML = homeFlash; homeFlash = ''; }
    const stamp = () => new Date().toISOString().slice(0, 10);
    $('#exp').onclick = () => {
      if (isEmptyProgress(S)) return msg('Det er ingen fremdrift å flytte ennå. Løs noen oppgaver først.', 'warn');
      try {
        const url = URL.createObjectURL(new Blob([exportText()], { type: 'application/json' }));
        const a = document.createElement('a'); a.href = url; a.download = `okad221-fremdrift-${stamp()}.json`; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        msg(`Filen <b>okad221-fremdrift-${stamp()}.json</b> er lastet ned. Åpne siden på den andre enheten og velg filen under «Hent fremdrift fra fil». Får du ikke flyttet filen, bruk «Kopier som tekst».`, 'good');
      } catch (e) { msg('Nettleseren stoppet nedlastingen. Bruk «Kopier som tekst» i stedet.', 'warn'); }
    };
    $('#copy').onclick = async () => {
      if (isEmptyProgress(S)) return msg('Det er ingen fremdrift å flytte ennå. Løs noen oppgaver først.', 'warn');
      const txt = exportText();
      try { await navigator.clipboard.writeText(txt); msg('Teksten er kopiert. Send den til deg selv (e-post, melding eller notat), og lim den inn under «Lim inn tekst i stedet» på den andre enheten.', 'good'); }
      catch (e) {
        $('#expmsg').innerHTML = '<div class="callout warn"><p>Nettleseren lot ikke siden kopiere automatisk. Teksten under er merket – kopier den selv (Ctrl+C, eller hold fingeren på teksten på mobil).</p><label for="exptxt" class="sr">Fremdrift som tekst</label><textarea id="exptxt" readonly spellcheck="false"></textarea></div>';
        const ta = $('#exptxt'); ta.value = txt; ta.focus(); ta.select();
      }
    };
    const preview = (text, source) => {
      const box = $('#impbox'), from = source ? ' fra ' + esc(source) : '';
      const say = (t) => { $('#impstatus').textContent = t; };
      let res; try { res = readProgress(text); } catch (e) { box.innerHTML = `<div class="callout bad"><p><b>Kunne ikke hente fremdriften${from}.</b> ${esc(e.message)}</p><p>Ingenting er endret på denne enheten.</p></div>`; say('Kunne ikke hente fremdriften. ' + e.message); return; }
      if (isEmptyProgress(res.data)) { box.innerHTML = `<div class="callout warn"><p><b>Det er ingen fremdrift i innholdet${from}.</b> Det ble trolig lagret før noen oppgaver var løst. Ingenting er endret.</p></div>`; say('Det er ingen fremdrift i innholdet. Ingenting er endret.'); return; }
      say('Fant fremdrift. Velg Slå sammen, Erstatt eller Avbryt.');
      const a = progressSummary(res.data), b = progressSummary(S), c = progressSummary(mergeProgress(S, res.data)), yn = (x) => (x ? 'ja' : 'nei');
      const notes = res.warn.concat(a.open && b.open ? ['Begge har en påbegynt prøveeksamen. Ved sammenslåing beholdes den på denne enheten.'] : []);
      box.innerHTML = `<div class="callout"><p><b>Fremdrift${res.when ? ' lagret ' + esc(res.when.toLocaleString('nb-NO', { dateStyle: 'short', timeStyle: 'short' })) : ''}${from}.</b> Sjekk tallene før du velger.</p>` +
        table(['', 'Filen', 'Her nå', 'Sammen'], [['Deloppgaver besvart', n(a.tried), n(b.tried), n(c.tried)], ['Oppgavetyper prøvd', a.types, b.types, c.types], ['Eksamensdeler krysset av', a.exam, b.exam, c.exam], ['Quizsvar', n(a.quiz), n(b.quiz), n(c.quiz)], ['Quizspørsmål å repetere', a.qreview, b.qreview, c.qreview], ['Prøver levert', a.mocks, b.mocks, c.mocks], ['Oppgaver å repetere', a.review, b.review, c.review], ['Påbegynt prøve', yn(a.open), yn(b.open), yn(c.open)]], { cls: 'wrap' }) + '<p class="small muted" style="margin-top:0">«Sammen» viser hva du får med «Slå sammen».</p>' +
        (notes.length ? '<ul class="small">' + notes.map((w) => `<li>${esc(w)}</li>`).join('') + '</ul>' : '') +
        `<p class="row"><button class="btn primary" type="button" id="impmerge">Slå sammen</button><button class="btn" type="button" id="impreplace">Erstatt det som er her</button><button class="btn link" type="button" id="impcancel">Avbryt</button></p>
        <p class="small muted">Slå sammen beholder det beste fra begge: for hver oppgavetype og hvert quizkapittel beholdes tallene fra enheten med flest forsøk, og avkryssinger og prøveresultater fra begge tas med. Samme fil to ganger endrer ingenting. Erstatt sletter det som er her nå.</p></div>`;
      const done = (how) => {
        save();
        const st = progressSummary(S);
        homeFlash = `<div class="callout good"><p><b>Fremdriften er ${how}.</b> Nå: ${n(st.tried)} ${st.tried === 1 ? 'deloppgave' : 'deloppgaver'} besvart, ${st.exam} ${st.exam === 1 ? 'eksamensdeloppgave' : 'eksamensdeloppgaver'} krysset av, ${st.mocks} ${st.mocks === 1 ? 'prøveeksamen' : 'prøveeksamener'} levert.${storageOk ? '' : ' Nettleseren tillater ikke lagring, så den forsvinner når du lukker fanen.'}</p></div>`;
        routes['']();
        const h = $('#flytt'); if (h) h.scrollIntoView();
      };
      $('#impmerge').onclick = () => { S = mergeProgress(S, res.data); done('slått sammen'); };
      $('#impreplace').onclick = () => { if (isEmptyProgress(S) || confirm('Erstatte all fremdrift på denne enheten med innholdet i filen? Det som er her nå, slettes.')) { S = res.data; done('erstattet med innholdet i filen'); } };
      $('#impcancel').onclick = () => { box.innerHTML = '<p class="small muted">Avbrutt. Ingenting er endret.</p>'; say('Avbrutt. Ingenting er endret.'); $('#impf').value = ''; $('#impf').focus(); };
      $('#impmerge').focus();
    };
    $('#impf').onchange = (e) => {
      const file = e.target.files && e.target.files[0]; if (!file) return;
      if (file.size > 2e6) { $('#impstatus').textContent = 'Filen er for stor. Ingenting er endret.'; $('#impbox').innerHTML = `<div class="callout bad"><p><b>${esc(file.name)} er for stor</b> til å være en fremdriftsfil fra denne siden. Ingenting er endret.</p></div>`; return; }
      const fr = new FileReader();
      fr.onload = () => preview(String(fr.result), file.name);
      fr.onerror = () => { $('#impbox').innerHTML = `<div class="callout bad"><p><b>Kunne ikke lese ${esc(file.name)}.</b> Prøv å laste filen ned på nytt. Ingenting er endret.</p></div>`; };
      fr.readAsText(file);
    };
    $('#impgo').onclick = () => preview($('#impt').value, '');
  }

  // ---------- Eksamensanalyse ----------
  routes.analyse = () => {
    setTitle('Eksamensanalyse');
    const ys = years(), st = topicStats(), P = O.prediction;
    const cls = (v) => (v >= 25 ? 'h3' : v >= 12 ? 'h2' : 'h1');
    const heat = '<div class="tablewrap" tabindex="0" role="region" aria-label="Tema per år, kan rulles sidelengs"><table class="data heat"><thead><tr><th class="kap" title="Kapittel i læreboka">Kap.</th><th>Tema</th>' + ys.map((y) => `<th>${y}</th>`).join('') + '<th>Gitt</th><th>Sist</th></tr></thead><tbody>' +
      st.map((t) => `<tr><td class="kap">${(O.topics[t.k].ch || []).map((c) => `<a href="#/tema/${c}" aria-label="Teori, kapittel ${c}">${c}</a>`).join(', ')}</td><th scope="row">${t.name}</th>` + ys.map((y) => { const v = t.row[y] || 0; return v ? `<td class="${cls(v)}">${Math.round(v)}</td>` : '<td class="z"><span aria-hidden="true">·</span><span class="sr">0</span></td>'; }).join('') + `<td class="gitt">${t.count} av ${ys.length}</td><td>${t.last || '–'}</td></tr>`).join('') + '</tbody></table></div>' +
      '<p class="legend"><span><i style="background:rgba(var(--accent-rgb),.14)"></i>under 12 % av settet</span><span><i style="background:rgba(var(--accent-rgb),.32)"></i>12–24 %</span><span><i style="background:var(--accent)"></i>25 % eller mer</span><span>· = ikke gitt</span></p>';
    const struct = table(['Sett', 'Oppgaver og vekt'], O.exams.slice().sort((a, b) => a.year - b.year).map((e) => [`<a href="#/eksamen/${e.id}">${e.title}</a>`, e.tasks.map((t) => `<b class="num">${t.weight} %</b> ${esc(t.title)}`).join('<br>')]), { cls: 'left wrap' });
    const links = (gens) => gens.map((id) => `<a href="#/oving/${id}">${O.genById[id].title}</a>`).join(' · ');
    view.innerHTML = `
      <p class="eyebrow">Ti sett · ${U.sum(O.exams.map((e) => e.tasks.length))} oppgaver · ${U.sum(O.exams.map((e) => U.sum(e.tasks.map((t) => t.parts.length))))} deloppgaver</p>
      <h1>Hva kommer på eksamen i 2026?</h1>
      <p class="lead">Kort svar: mest sannsynlig de samme fem oppgavetypene som i 2025. Under ser du anslaget, og lenger ned dataene det bygger på.</p>
      <h2>Prognosen</h2>
      <p class="small muted">Stort tall = andel av karakteren oppgavetypen pleier å ha. Sannsynligheten er et skjønn ut fra mønsteret, ikke en beregning.</p>
      ${P.slots.map((s) => `<div class="slot"><div class="big">${s.weight[0]}–${s.weight[1]} %<small>${Math.round(s.prob * 100)} % sannsynlig</small></div><div><h3>${s.nr}. ${s.title}</h3><p>${s.why}</p><p class="small">Øv: ${links(s.gens)}</p></div></div>`).join('')}
      <h3>Jokere</h3>
      ${P.jokers.map((s) => `<details><summary>${s.title} <span class="tag">${Math.round(s.prob * 100)} % sannsynlig</span></summary><div class="inner"><p>${s.why}</p><p class="small">Øv: ${links(s.gens)}</p></div></details>`).join('')}
      <h2>Grunnlaget: hva har kommet, og hvor mye telte det?</h2>
      <p class="small muted">Tallene er omtrentlig prosent av settet (oppgavens vekt fordelt likt på deloppgavene). Kolonnene er årstall. 2017 er mars 2017, resten er høsteksamener. <b>Kap.</b> er kapitlet i læreboka (Bredesen, 7. utg.), og lenken går til teorien. <b>Gitt</b> er hvor mange av de ti eksamenssettene temaet var med i, og <b>Sist</b> er siste år det kom.</p>${heat}
      <h3>Hyppighet når de siste årene teller mest</h3>
      <p class="small muted">Hvert år teller 25 % mindre enn året etter. Obligasjoner, som bare har kommet i 2024 og 2025, får derfor høyere tall enn ren opptelling gir.</p>
      <div>${st.map((t) => `<div class="bar-row"><div>${t.name}</div><div class="bar-track" aria-hidden="true"><i style="width:${Math.round(t.recent * 100)}%"></i></div><div class="bar-val">${Math.round(t.recent * 100)} %</div></div>`).join('')}</div>
      <h3>Slik har settene vært bygget opp</h3>${struct}
      <p><b>Tre faser.</b> 2016–2020: prosjektanalyse, økonomisk levetid, lån eller portefølje, og stor skatteoppgave. 2021–2023: helt fast mal med prosjekt, annuitetslån, portefølje og WACC/skatt. 2024–2025: obligasjoner kommer inn, porteføljeoppgaven vokser, og 2025 har for første gang fem oppgaver.</p>
      <h2>Fellene som går igjen</h2>
      ${table(['Felle', 'Riktig behandling', 'Sett i'], P.traps, { cls: 'left wrap' })}
      <h2>Forbehold</h2>
      <p>Dette er et kvalifisert anslag, ikke en fasit. Samme foreleser har laget alle settene og strukturen har vært stabil, men 2024 og 2025 viser at nye temaer kan komme inn. Pensum er hele læreboka: bruk prognosen til å prioritere, ikke til å velge bort.</p>
      <p>Eksamen varer 4 timer. Tillatte hjelpemidler sto ikke i eksamensfilene. Løsningsforslagene er regneark og godtar målsøking, så eksamen løses etter alt å dømme i Excel.</p>`;
  };

  // ---------- Øvingsoppgaver ----------
  routes.oving = (id, seedStr) => {
    if (id) { if (!O.genById[id]) return notFound('oppgavetypen', 'oving', 'Se alle oppgavetyper'); return taskView(id, parseInt(seedStr, 10) > 0 ? parseInt(seedStr, 10) : U.newSeed()); }
    setTitle('Øv');
    const core = O.prediction.slots.slice().sort((a, b) => b.weight[1] - a.weight[1]);
    const coreIds = new Set(core.flatMap((s) => s.gens));
    const chs = [...new Set(O.gens.map((g) => g.chapter))].sort((a, b) => a - b);
    view.innerHTML = `<h1>Øv på oppgavetypene</h1>
      <p class="lead">Nye tall hver gang. Tast svaret og få det sjekket; hint og full løsning ligger ett trykk unna.</p>
      ${(() => { const RV = reviewList(); return RV.length ? `<p class="review-line"><a href="#/repeter"><b>Repeter det du har bommet på</b></a>: ${RV.length} ${RV.length === 1 ? 'oppgavetype' : 'oppgavetyper'}.</p>` : ''; })()}
      <h2>Disse teller mest</h2>` +
      core.map((s) => `<h3>${s.title} <span class="pts">${s.weight[0]}–${s.weight[1]} %</span></h3><ul class="rows">${s.gens.map((i) => genRow(O.genById[i])).join('')}</ul>`).join('') +
      '<h2>Alt annet, etter kapittel</h2>' +
      chs.map((c) => { const gs = O.gens.filter((g) => g.chapter === c && !coreIds.has(g.id)); return gs.length ? `<h3>Kapittel ${c}${chTitle(c) ? ' · ' + chTitle(c) : ''}</h3><ul class="rows">${gs.map(genRow).join('')}</ul>` : ''; }).join('');
  };

  /** Tegner deloppgavene i en oppgave. opts.exam = prøveeksamen (ingen umiddelbar fasit). */
  function renderParts(task, host, opts = {}) {
    const pre = opts.prefix || 'p';
    const state = task.parts.map(() => ({ first: null, shown: false }));
    host.innerHTML = task.parts.map((p, i) => {
      const pid = `${pre}${i}`;
      const ctrl = p.kind === 'num'
        ? `<div class="answer"><label class="sr" for="${pid}-in">Svar på ${p.label}${p.unit ? ' i ' + p.unit : ''}</label><input type="text" inputmode="decimal" id="${pid}-in" placeholder="Ditt svar" autocomplete="off" aria-describedby="${pid}-fb"><span class="unit">${p.unit || ''}</span>` +
          (opts.exam ? '' : `<button class="btn primary" type="button" data-act="check" data-i="${i}">Sjekk</button>${p.hint ? `<button class="btn link" type="button" data-act="hint" data-i="${i}" aria-expanded="false">Hint</button>` : ''}<button class="btn link" type="button" data-act="sol" data-i="${i}">Vis løsning</button>`) + `<span class="fb" id="${pid}-fb" role="status"></span></div>`
        : `<div class="answer" style="display:block"><label class="sr" for="${pid}-in">Svar på ${p.label}</label><textarea id="${pid}-in" placeholder="Skriv svaret med egne ord først. Det rettes ikke automatisk."></textarea>` + (opts.exam ? '' : `<button class="btn" type="button" data-act="sol" data-i="${i}" style="margin-top:8px">Sammenlign med løsningsforslaget</button>`) + '</div>';
      return `<div class="part"><div class="letter" aria-hidden="true">${p.label}</div><div class="body"><div class="part-q"><span class="sr">Deloppgave ${p.label}: </span>${p.q}</div>${ctrl}<div id="${pid}-hint"></div><div id="${pid}-sol"></div></div></div>`;
    }).join('');
    const showSol = (i) => {
      const p = task.parts[i]; state[i].shown = true;
      $(`#${pre}${i}-sol`, host).innerHTML = '<div class="solution">' + (p.kind === 'num' ? `<p class="svar">Svar: <span>${O.fmtAnswer(p)}</span></p>` + (p.sol || '') : '<h4>Momenter som bør være med</h4><ul class="keypoints">' + (p.points || []).map((x) => `<li>${x}</li>`).join('') + '</ul>' + (p.sol || '')) + '</div>';
    };
    const check = (i, quiet) => {
      const p = task.parts[i], inp = $(`#${pre}${i}-in`, host), fb = $(`#${pre}${i}-fb`, host), raw = inp.value;
      const res = raw.trim() === '' ? 'empty' : O.check(p, raw);
      inp.removeAttribute('aria-invalid');
      if (res === 'empty' || res === 'invalid') {
        fb.className = 'fb near'; fb.textContent = res === 'empty' ? (quiet ? 'Ikke besvart' : 'Skriv inn et svar først.') : 'Dette ble ikke forstått som et tall. Skriv for eksempel 12,34 eller 1 250 000.';
        if (!quiet) { inp.setAttribute('aria-invalid', 'true'); inp.focus(); } return res;
      }
      if (state[i].first === null && !state[i].shown) { state[i].first = res === 'ok'; if (opts.onFirst) opts.onFirst(i, res === 'ok'); }
      fb.className = 'fb ' + (res === 'ok' ? 'ok' : res === 'near' ? 'near' : 'no');
      const diag = res === 'ok' ? '' : O.diagnose(p, raw);
      fb.textContent = res === 'ok' ? '✓ Riktig' : diag ? '✗ ' + diag : res === 'near' ? '≈ Nær, men utenfor avrundingsmarginen. Sjekk en mellomregning eller at du ikke har rundet av underveis.' : '✗ Ikke riktig. Prøv igjen, eller åpne hintet.';
      if (res === 'ok') showSol(i);
      return res;
    };
    host.onclick = (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return; const i = +b.dataset.i, p = task.parts[i];
      if (b.dataset.act === 'check') check(i);
      if (b.dataset.act === 'hint') { const h = $(`#${pre}${i}-hint`, host), open = !h.innerHTML; h.innerHTML = open ? `<div class="callout"><b>Hint:</b> ${p.hint}</div>` : ''; b.setAttribute('aria-expanded', open); }
      if (b.dataset.act === 'sol') { if (state[i].first === null && p.kind === 'num' && opts.onFirst) { state[i].first = false; opts.onFirst(i, false); } showSol(i); b.disabled = true; }
    };
    host.onkeydown = (e) => { if (e.key === 'Enter' && e.target.matches('input[type=text]') && !opts.exam) { e.preventDefault(); check(+e.target.id.slice(pre.length).split('-')[0]); } };
    return { state, showSol, check };
  }

  function taskView(id, seed) {
    const g = O.genById[id], task = O.make(id, seed), st = gstat(id);
    setTitle(g.title);
    history.replaceState(null, '', `#/oving/${id}/${seed}`);
    st.tasks++; save();
    const prev = (st.miss || []).find((x) => x.s === seed);
    view.innerHTML = `<div class="crumbs"><a href="#/oving">Øv</a> › ${prev ? '<a href="#/repeter">Repeter</a>' : `Kapittel ${g.chapter}`}</div>
      <h1>${g.title}</h1>${prev ? `<div class="callout warn"><p>Sist bommet du på deloppgave ${partList(prev.p)} i denne oppgaven${prev.m ? ' (på prøveeksamen)' : ''}. Prøv igjen uten å se på løsningen. Løser du alle tallsvarene riktig på første forsøk, forsvinner den fra repetisjonslisten.</p></div>` : ''}
      <div class="taskbar"><span class="tag">Kap. ${g.chapter}</span><span class="tag">${LEVEL[g.level]}</span><span class="tag">ca. ${g.minutes} min</span>${g.examLike ? `<span class="tag warm">${g.examLike}</span>` : ''}
        <span class="spacer"></span><a href="#/tema/${g.chapter}">Teori til kapittel ${g.chapter}</a></div>
      <div class="task-text">${task.text}</div><div id="parts"></div>
      <p class="row noprint" style="margin-top:22px;padding-top:16px;border-top:3px solid var(--rule)"><button class="btn primary big" type="button" id="new">Ny oppgave med nye tall</button><button class="btn" type="button" id="all">Vis alle løsninger</button></p>
      <p id="rvmsg" class="small" role="status"></p>
      <p class="small muted">Prosent tastes som prosent (12,34), beløp i hele kroner. Små avrundingsavvik godtas. Adressen i nettleseren gir nøyaktig denne oppgaven igjen (nr. ${seed}).</p>`;
    const nums = task.parts.map((p, i) => (p.kind === 'num' ? i : -1)).filter((i) => i >= 0);
    let R = null;
    R = renderParts(task, $('#parts'), { onFirst: (i, ok) => {
      st.tried++; if (ok) st.ok++;
      if (!ok) addMiss(id, seed, task.parts[i].label);
      else if (R && nums.every((j) => R.state[j].first === true) && clearMiss(id, seed)) $('#rvmsg').textContent = 'Alle tallsvar riktig på første forsøk. En oppgave av denne typen er fjernet fra repetisjonslisten.';
      save();
    } });
    $('#new').onclick = () => { taskView(id, U.newSeed()); view.focus(); };
    $('#all').onclick = (e) => {
      // Løsningen åpnet før svar: regnes som bommet i repetisjonslisten (ikke i treffprosenten).
      nums.forEach((i) => { if (R.state[i].first === null && !R.state[i].shown) addMiss(id, seed, task.parts[i].label); });
      save(); task.parts.forEach((_, i) => R.showSol(i)); e.target.disabled = true;
    };
    scrollTo(0, 0);
  }

  // ---------- Repeter: det man har bommet på, viktigst for eksamen øverst ----------
  routes.repeter = (sub) => {
    if (sub) return notFound('siden', 'repeter', 'Til repetisjonslisten');
    setTitle('Repeter');
    const RV = reviewList(), tried = U.sum(Object.values(S.gen).map((g) => g.tried));
    const qd = quizDue('alle').length;
    const head = '<div class="crumbs"><a href="#/oving">Øv</a> › Repeter</div><h1>Repeter det du har bommet på</h1>' +
      (qd ? `<p class="review-line" id="qline"><a href="#/quiz/repeter"><b>Repeter ${qd} quizspørsmål</b></a> du har svart feil på.</p>` : '');
    if (!RV.length) {
      view.innerHTML = head + `<div class="empty"><h2>${tried ? 'Ingenting å repetere' : 'Ingenting å repetere ennå'}</h2><p>${tried
        ? 'Alt du har svart på er enten riktig på første forsøk, eller løst på nytt uten feil. Oppgaver der du svarer feil eller åpner løsningen før du har svart, havner her.'
        : 'Listen fylles når du øver: oppgaver der du svarer feil på første forsøk eller åpner løsningen før du har svart, havner her. Det samme gjør feil på prøveeksamen.'}</p>` +
        `<p class="row"><a class="btn primary" href="#/oving">Øv på oppgavetypene</a><a class="btn" href="#/prove">Ta en prøveeksamen</a></p></div>`;
      return;
    }
    const date = (t) => new Date(t).toLocaleDateString('nb-NO', { day: 'numeric', month: 'numeric' });
    view.innerHTML = head + `<p class="lead">Oppgaver der du svarte feil på første forsøk eller åpnet løsningen før du svarte. Det som trolig teller mest på eksamen, står øverst.</p>
      <p class="small muted" style="max-width:68ch">Løs samme oppgave på nytt: får du alle tallsvarene riktig på første forsøk, forsvinner den fra listen. Løser du en ny oppgave av samme type uten feil, forsvinner den eldste. Listen holder de ${MISSMAX} siste per type.</p>
      <ol class="review" aria-label="Oppgavetyper å repetere">${RV.map((x) => { const last = x.ms[x.ms.length - 1]; return `<li>
        <div class="rv-head"><a class="rv-title" href="#/oving/${x.g.id}/${last.s}">${x.g.title}</a><span class="rl-meta">${x.ms.length} ${x.ms.length === 1 ? 'oppgave' : 'oppgaver'} · ${genMeta(x.g)}</span></div>
        <ul class="rv-tasks">${x.ms.slice().reverse().map((e) => `<li><a href="#/oving/${x.g.id}/${e.s}">Oppgave nr. ${e.s}</a> <span class="muted">– feil på ${partList(e.p)}, ${date(e.t)}${e.m ? ', prøveeksamen' : ''}</span></li>`).join('')}</ul>
        <p class="row"><a class="btn primary" href="#/oving/${x.g.id}/${last.s}">Samme oppgave igjen</a><a class="btn" href="#/oving/${x.g.id}">Nye tall</a><a class="btn link" href="#/tema/${x.g.chapter}">Teori kap. ${x.g.chapter}</a></p></li>`; }).join('')}</ol>`;
  };

  // ---------- Prøveeksamen ----------
  function buildMock(seed) {
    const R = U.rng(seed);
    return O.mockSlots.map((s, i) => {
      const tot = U.sum(s.pool.map((x) => x[1])); let r = R.next() * tot, pick = s.pool[0][0];
      for (const [gid, w] of s.pool) { if ((r -= w) <= 0) { pick = gid; break; } }
      return { weight: s.weight, task: O.make(pick, (seed * 31 + i * 977) % 2147483647 + 1) };
    });
  }
  let timerId = null;
  // ---------- Prøveeksamen på papir: oppgaver først, fasit bakerst ----------
  function printMock(seedStr) {
    let seed;
    if (seedStr === undefined || seedStr === '') { seed = U.newSeed(); history.replaceState(null, '', `#/prove/utskrift/${seed}`); }
    else if (/^\d{1,10}$/.test(seedStr) && +seedStr > 0 && +seedStr <= MAXSEED) seed = +seedStr;
    else return notFound('prøvesettet', 'prove/utskrift', 'Lag et nytt sett for utskrift');
    setTitle('Prøveeksamen på papir');
    const slots = buildMock(seed);
    const ansLine = (p) => (p.kind === 'num' ? `<p class="ansline">Svar: <span class="blank"></span> ${p.unit || ''}</p>` : '<div class="writelines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>');
    const qHtml = slots.map((s, i) => `<section class="pq"><h2>Oppgave ${i + 1} <span class="pts">${s.weight} %</span></h2><div class="task-text">${s.task.text}</div>` +
      s.task.parts.map((p) => `<div class="part"><div class="letter" aria-hidden="true">${p.label}</div><div class="body"><div class="part-q"><span class="sr">Deloppgave ${p.label}: </span>${p.q}</div>${ansLine(p)}</div></div>`).join('') + '</section>').join('');
    const keyHtml = (full) => slots.map((s, i) => `<section class="pk"><h3>Oppgave ${i + 1} · ${s.task.gen.title}</h3>` +
      s.task.parts.map((p) => `<div class="part"><div class="letter" aria-hidden="true">${p.label}</div><div class="body"><div class="solution">` +
        (p.kind === 'num' ? `<p class="svar">Svar: <span>${O.fmtAnswer(p)}</span></p>${full ? p.sol || '' : ''}` : `<h4>Momenter som bør være med</h4><ul class="keypoints">${(p.points || []).map((x) => `<li>${x}</li>`).join('')}</ul>${full ? p.sol || '' : ''}`) +
        '</div></div></div>').join('') + '</section>').join('');
    const link = location.href.split('#')[0] + `#/prove/utskrift/${seed}`;
    view.innerHTML = `<div class="crumbs noprint"><a href="#/prove">Prøveeksamen</a> › På papir</div>
      <h1>Prøveeksamen ØKAD 221 <span class="pts">sett nr. ${seed}</span></h1>
      <div class="noprint">
        <p class="lead">Fem oppgaver med nye tall, satt sammen som prøveeksamenen på skjerm. Fasiten kommer bakerst og begynner på en ny side, så du kan legge den bort mens du jobber.</p>
        <p class="row"><label for="pk">Fasit i utskriften</label> <select id="pk"><option value="full">Svar og fremgangsmåte</option><option value="ans">Bare svar (kortere)</option><option value="none">Ingen fasit</option></select>
          <button class="btn primary big" type="button" id="pp">Skriv ut</button><a class="btn" href="#/prove/utskrift">Nytt sett</a></p>
        <p class="row"><button class="btn" type="button" id="pr">Tast inn svarene og få dem rettet</button><span id="prmsg" class="small" role="status"></span></p>
        <p class="small muted">Adressen gir nøyaktig dette settet igjen. Skriv ut til PDF hvis du vil lagre det.</p>
      </div>
      <p class="printonly small">Varighet 4 timer. Beløp i hele kroner, prosent med to desimaler. Settet finnes igjen på ${esc(link)}</p>
      ${qHtml}
      <div id="keywrap"></div>`;
    const drawKey = () => {
      const mode = $('#pk').value, open = !!$('#keyopen') && $('#keyopen').getAttribute('aria-expanded') === 'true';
      $('#keywrap').innerHTML = mode === 'none' ? '<p class="noprint small muted" style="margin-top:28px">Fasiten er slått av for utskriften.</p>' :
        `<div class="pagebreak"></div><h2>Fasit og løsninger <span class="pts">sett nr. ${seed}</span></h2>
        <p class="noprint"><button class="btn" type="button" id="keyopen" aria-expanded="${open}" aria-controls="keybody">${open ? 'Skjul fasiten' : 'Vis fasiten på skjermen'}</button> <span class="small muted">Utskriften tar alltid med fasiten.</span></p>
        <div id="keybody" class="keybody${open ? '' : ' closed'}">${keyHtml(mode === 'full')}</div>`;
      const b = $('#keyopen'); if (b) b.onclick = () => { b.setAttribute('aria-expanded', String(!open)); drawKey(); $('#keyopen').focus(); };
    };
    drawKey();
    $('#pk').onchange = drawKey;
    $('#pp').onclick = () => print();
    $('#pr').onclick = () => {
      if (S.mock) { $('#prmsg').innerHTML = 'Du har allerede en påbegynt prøveeksamen. <a href="#/prove">Lever eller avbryt den først</a>.'; return; }
      S.mock = { seed, start: Date.now(), dur: 0, ans: {}, paper: true }; save(); location.hash = '#/prove';
    };
  }

  routes.prove = (sub, seedStr) => {
    clearInterval(timerId); setTitle('Prøveeksamen');
    if (sub === 'utskrift') return printMock(seedStr);
    if (sub) return notFound('siden', 'prove', 'Til prøveeksamen');
    if (!S.mock) {
      const log = S.mockLog || [];
      view.innerHTML = `<h1>Prøveeksamen 2026</h1>
        <p class="lead">Ett helt sett etter prognosen: prosjektanalyse (20 %), obligasjoner (10 %), lån eller en joker (20 %), portefølje (20 %) og WACC med nåverdi etter skatt (30 %).</p>
        <p class="row" style="margin:20px 0"><label for="dur">Tid</label> <select id="dur"><option value="240">4 timer</option><option value="300">5 timer</option><option value="180">3 timer</option><option value="0">Uten tidtaking</option></select>
        <button class="btn primary big" type="button" id="start">Start prøveeksamen</button></p>
        <p class="small muted">Ha Excel åpent – du taster bare sluttsvarene her. Svarene lagres underveis, så du kan lukke fanen og fortsette. Den ordentlige eksamenen varer 4 timer.</p>
        <h2>På papir</h2>
        <p>Skriv ut et helt sett med fasit og løsninger bakerst. Løs det for hånd eller i Excel, og rett deg selv – eller tast inn svarene her etterpå og få dem rettet.</p>
        <p><a class="btn" href="#/prove/utskrift">Lag et sett for utskrift</a></p>
        <h2>Tidligere forsøk</h2>` +
        (log.length ? table(['Dato', 'Resultat', 'Tid brukt'], log.slice().reverse().map((x) => [esc(x.date), `${x.score} %`, x.paper ? 'løst på papir' : x.min + ' min'])) : '<p class="muted">Ingen ennå. Resultatene dine havner her.</p>');
      $('#start').onclick = () => { S.mock = { seed: U.newSeed(), start: Date.now(), dur: +$('#dur').value, ans: {} }; save(); routes.prove(); };
      return;
    }
    const M = S.mock, slots = buildMock(M.seed);
    const nNum = U.sum(slots.map((s) => s.task.parts.filter((p) => p.kind === 'num').length));
    view.innerHTML = `<div class="sticky-bar noprint"><div class="row"><b class="hide-m">Prøveeksamen</b><span class="timer" id="timer" role="timer" aria-live="off"></span><span class="small muted" id="filled"></span><span class="spacer"></span><button class="btn link hide-m" type="button" id="print">Skriv ut</button><button class="btn link" type="button" id="abort">Avbryt</button><button class="btn primary" type="button" id="submit">Lever</button></div><div id="timeup" role="alert"></div></div>
      <div id="result" tabindex="-1"></div>` + slots.map((s, i) => `<section><h2 id="mo${i}">Oppgave ${i + 1} <span class="pts">${s.weight} %</span></h2><div class="task-text">${s.task.text}</div><div id="mp${i}"></div></section>`).join('');
    const RS = slots.map((s, i) => renderParts(s.task, $(`#mp${i}`), { exam: true, prefix: `m${i}_` }));
    const inputs = $$('input[type=text], textarea', view), numInputs = $$('input[type=text]', view);
    const countFilled = () => { const k = numInputs.filter((el) => el.value.trim()).length; $('#filled').textContent = `${k} av ${nNum} tallsvar fylt ut`; return k; };
    inputs.forEach((el) => { if (M.ans[el.id]) el.value = M.ans[el.id]; el.oninput = () => { M.ans[el.id] = el.value; save(); countFilled(); }; });
    countFilled();
    let warned = false;
    const tick = () => {
      const el = $('#timer'); if (!el) return clearInterval(timerId);
      const used = Math.floor((Date.now() - M.start) / 1000), left = M.dur ? M.dur * 60 - used : used, a = Math.abs(left);
      el.textContent = (M.dur && left < 0 ? '+' : '') + [Math.floor(a / 3600), Math.floor(a % 3600 / 60), a % 60].map((x) => String(x).padStart(2, '0')).join(':');
      if (M.dur && left <= 0 && !warned) { warned = true; $('#timeup').innerHTML = '<p class="callout warn" style="margin:8px 0 0">Tiden er ute. Du kan levere nå, eller fortsette – klokken viser hvor mye du har gått over.</p>'; }
    };
    if (M.paper) $('#timer').textContent = 'Svar fra papir'; else { tick(); timerId = setInterval(tick, 1000); }
    $('#print').onclick = () => print();
    $('#abort').onclick = () => { if (confirm('Avbryte prøveeksamenen? Svarene dine slettes og forsøket teller ikke.')) { S.mock = null; save(); routes.prove(); } };
    $('#submit').onclick = () => {
      const blankCount = nNum - countFilled();
      if (blankCount && !confirm(`${blankCount} av ${nNum} tallsvar er ikke fylt ut og gir null poeng. Levere likevel?`)) return;
      clearInterval(timerId);
      let total = 0, missed = 0; const rows = [];
      slots.forEach((s, i) => {
        const nums = s.task.parts.filter((p) => p.kind === 'num').length; let ok = 0;
        s.task.parts.forEach((p, j) => { if (p.kind === 'num') { if (RS[i].check(j, true) === 'ok') ok++; else addMiss(s.task.id, s.task.seed, p.label, true); } RS[i].showSol(j); });
        const share = nums ? ok / nums : 0; total += share * s.weight; if (ok < nums) missed++;
        rows.push([`<a href="#mo${i}" data-jump="mo${i}">Oppgave ${i + 1}</a>: ${s.task.gen.title}`, s.weight + ' %', `${ok} / ${nums}`, n(share * s.weight, 1) + ' %']);
      });
      const mins = Math.round((Date.now() - M.start) / 60000), score = Math.round(total);
      const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : score >= 40 ? 'E' : 'F';
      rows.push({ cells: ['Sum', '100 %', '', `${score} %`], cls: 'sum' });
      $('#result').innerHTML = `<h1>${score} % – omtrent karakter ${grade}</h1><p>${M.paper ? 'Svarene er tastet inn fra papiret.' : `Tid brukt: ${mins} minutter.`} Bare tallsvarene er rettet. Drøftingsdelene sammenligner du selv med momentlistene under. På den ordentlige eksamenen gis det også uttelling for riktig metode når sluttsvaret er feil, så dette er et forsiktig anslag.</p>` + table(['Oppgave', 'Vekt', 'Riktige tallsvar', 'Poeng'], rows, { cls: 'left' }) + (missed ? `<p>${missed === 1 ? 'Oppgaven' : `De ${missed} oppgavene`} med feil tallsvar ligger nå i <a href="#/repeter">repetisjonslisten</a>, med de samme tallene.</p>` : '') + '<p class="row"><button class="btn primary" type="button" id="again">Ny prøveeksamen</button></p>';
      (S.mockLog = S.mockLog || []).push(Object.assign({ date: new Date().toLocaleDateString('nb-NO'), score, min: mins, t: Date.now() }, M.paper ? { paper: true } : {})); S.mock = null; save();
      inputs.forEach((el) => { el.readOnly = true; });
      $('.sticky-bar').remove(); $('#again').onclick = () => routes.prove();
      $('#result').onclick = (e) => { const j = e.target.dataset.jump; if (j) { e.preventDefault(); $('#' + j).scrollIntoView(); } };
      scrollTo(0, 0); $('#result').focus();
    };
  };

  // ---------- Tidligere eksamener ----------
  routes.eksamener = () => {
    setTitle('Tidligere eksamener');
    view.innerHTML = '<h1>Tidligere eksamener</h1><p class="lead">Prøv selv først. Åpne deretter fasit og løsning, og kryss av det du fikk til.</p><ul class="rows">' +
      O.exams.map((e) => {
        const tot = U.sum(e.tasks.map((t) => t.parts.length)), done = U.sum(e.tasks.map((t) => t.parts.filter((p) => S.exam[`${e.id}-${t.nr}${p.label}`]).length));
        return `<li><a class="rowlink" href="#/eksamen/${e.id}"><span class="rl-title">${e.title}</span><span class="rl-sub">${e.tasks.map((t) => `${t.weight} % ${esc(t.title)}`).join(' · ')}</span><span class="rl-meta"><b>${done}</b> / ${tot} krysset av</span></a></li>`;
      }).join('') + '</ul>';
  };
  routes.eksamen = (id) => {
    const e = O.exams.find((x) => x.id === id); if (!e) return notFound('eksamenssettet', 'eksamener', 'Se alle eksamenssett');
    setTitle(e.title);
    const src = { LF: 'Fra løsningsforslaget', egen: 'Egen utregning – står ikke i løsningsforslaget' };
    view.innerHTML = `<div class="crumbs"><a href="#/eksamener">Tidligere eksamener</a> › ${e.title}</div><h1>${/^eksamen/i.test(e.title) ? e.title : 'Eksamen ' + e.title.toLowerCase()}</h1>` + (e.note ? `<div class="callout warn">${e.note}</div>` : '') +
      e.tasks.map((t) => {
        const related = [...new Set((t.gens || []).concat(t.topics.concat(...t.parts.map((p) => p.topics || [])).filter((k) => O.topics[k]).map((k) => O.topics[k].gens[0])))].filter((g) => O.genById[g]);
        return `<section><h2>Oppgave ${t.nr} <span class="pts">${t.weight} %</span> · ${esc(t.title)}</h2><div class="task-text">${t.text || ''}</div>` +
          t.parts.map((p) => { const k = `${e.id}-${t.nr}${p.label}`; return `<div class="part"><div class="letter" aria-hidden="true">${p.label}</div><div class="body"><div class="part-q">${p.q}</div>
            <details><summary>Fasit</summary><div class="inner">${p.answer}</div></details>
            <details><summary>Løsning steg for steg</summary><div class="inner"><p class="tag">${src[p.src] || 'Tall fra løsningsforslaget, forklaringen er lagt til'}</p>${p.method}</div></details>
            <p><label><input type="checkbox" data-k="${k}" ${S.exam[k] ? 'checked' : ''}>Denne fikk jeg til (deloppgave ${t.nr}${p.label})</label></p></div></div>`; }).join('') +
          `<p class="small noprint">Samme type med nye tall: ${related.map((g) => `<a href="#/oving/${g}">${O.genById[g].title}</a>`).join(' · ')}</p></section>`;
      }).join('');
    view.onchange = (ev) => { const k = ev.target.dataset && ev.target.dataset.k; if (k) { S.exam[k] = ev.target.checked; save(); } };
  };

  // ---------- Teori ----------
  const fitem = (x) => `<div class="fitem"><b>${x.name}</b><div class="formula" tabindex="0">${x.html}</div><div class="small muted">${x.note || ''}</div></div>`;
  routes.tema = (nr) => {
    if (!nr) {
      setTitle('Teori');
      const grp = (w, title) => { const cs = O.theory.filter((t) => t.examWeight === w); return cs.length ? `<h2>${title}</h2><ul class="rows">${cs.map((t) => `<li><a class="rowlink" href="#/tema/${t.nr}"><span class="rl-title">Kapittel ${t.nr} · ${t.title}</span><span class="rl-meta">${t.formulas.length} formler · ${O.quiz.filter((q) => q.ch === t.nr).length} quizspørsmål</span></a></li>`).join('')}</ul>` : ''; };
      view.innerHTML = '<h1>Teori per kapittel</h1><p class="lead">Sammendrag av forelesningene og læreboka (Bredesen, 7. utgave), sortert etter hvor mye kapitlet har telt på eksamen. Se også <a href="#/formler">formelsamlingen</a> og <a href="#/quiz">quizen</a>.</p>' +
        grp('høy', 'Teller mye på eksamen') + grp('middels', 'Teller noe') + grp('lav', 'Sjelden eller aldri gitt');
      return;
    }
    const c = O.theory.find((x) => String(x.nr) === String(nr)); if (!c) return notFound('kapitlet', 'tema', 'Se alle kapitler');
    setTitle('Kapittel ' + c.nr);
    const gens = O.gens.filter((g) => g.chapter === c.nr), hasQuiz = O.quiz.some((q) => q.ch === c.nr);
    const sec = (title, html) => (html ? `<h2>${title}</h2>${html}` : '');
    view.innerHTML = `<div class="crumbs"><a href="#/tema">Teori</a> › Kapittel ${c.nr}</div><p class="eyebrow">Eksamensvekt: ${c.examWeight}</p><h1>Kapittel ${c.nr}: ${c.title}</h1>
      <div class="callout"><h4 style="margin-top:0">På eksamen</h4>${c.examNotes || ''}</div>${c.summary || ''}` +
      sec('Øv på kapitlet', (gens.length ? `<ul class="rows">${gens.map(genRow).join('')}</ul>` : '<p class="muted">Det finnes ingen regneoppgaver for dette kapitlet.</p>') + (hasQuiz ? `<p><a class="btn" href="#/quiz/${c.nr}">Ta quiz for kapittel ${c.nr}</a></p>` : '')) +
      sec('Fremgangsmåter', (c.methods || []).map((m) => `<h3>${m.title}</h3><ol class="steps">${m.steps.map((s) => `<li>${s}</li>`).join('')}</ol>`).join('')) +
      sec('Typiske feil', (c.pitfalls || []).length ? '<ul class="keypoints">' + c.pitfalls.map((x) => `<li>${x}</li>`).join('') + '</ul>' : '') +
      sec('Formler', (c.formulas || []).map(fitem).join('')) +
      sec('Gjennomregnede eksempler', (c.examples || []).map((x) => `<details><summary>${x.title}</summary><div class="inner">${x.html}</div></details>`).join('')) +
      sec('Begreper', (c.concepts || []).length ? '<dl class="defs">' + c.concepts.map((x) => `<dt>${x.term}</dt><dd>${x.def}</dd>`).join('') + '</dl>' : '') +
      sec('Excel-funksjoner', (c.excel || []).length ? table(['Funksjon', 'Bruk'], c.excel.map((x) => [`<code>${x.fn}</code>`, x.use]), { cls: 'left wrap' }) : '');
    scrollTo(0, 0);
  };

  routes.formler = () => {
    setTitle('Formler');
    view.innerHTML = `<h1>Formelsamling</h1>
      <p class="row noprint"><label for="fs">Søk i formlene</label> <input type="text" id="fs" placeholder="f.eks. annuitet, durasjon, saldo" style="flex:1 1 240px;max-width:420px" autocomplete="off"> <span id="fc" class="small muted" role="status"></span></p><div id="fl"></div>`;
    const draw = (q) => {
      q = (q || '').trim().toLowerCase(); let count = 0;
      const html = O.theory.map((c) => {
        const fs = (c.formulas || []).filter((x) => !q || (x.name + ' ' + (x.note || '') + ' ' + c.title).toLowerCase().includes(q)); count += fs.length;
        return fs.length ? `<h2>Kapittel ${c.nr}: ${c.title}</h2>` + fs.map(fitem).join('') : '';
      }).join('');
      $('#fc').textContent = q ? `${count} treff` : `${count} formler`;
      $('#fl').innerHTML = html || `<div class="empty"><h2>Ingen formler passer «${esc(q)}»</h2><p>Søket ser i formelnavn, forklaring og kapitteltittel. Prøv et kortere ord, for eksempel «rente», «nåverdi» eller «varians».</p><p><button class="btn" type="button" id="fclear">Vis alle formler</button></p></div>`;
      const cl = $('#fclear'); if (cl) cl.onclick = () => { $('#fs').value = ''; draw(''); $('#fs').focus(); };
    };
    draw(''); $('#fs').oninput = (e) => draw(e.target.value);
  };

  // ---------- Quiz ----------
  routes.quiz = (ch) => {
    setTitle('Quiz');
    const chs = [...new Set(O.quiz.map((q) => q.ch))].sort((a, b) => a - b);
    const answered = U.sum(Object.values(S.quiz).map((x) => x.n));
    if (!ch) {
      const due = quizDue('alle');
      view.innerHTML = '<h1>Quiz</h1><p class="lead">Ti flervalgsspørsmål per runde om begreper, relevante kontantstrømmer og typiske feller.</p>' +
        (due.length ? `<div class="callout warn" id="qdue"><p><b>${due.length} spørsmål du har svart feil på</b> kommer igjen i de neste rundene, høyst ${QREP} per runde, til du svarer riktig.</p><p><a class="btn" href="#/quiz/repeter">Repeter bare ${due.length === 1 ? 'dette' : 'disse'} (${due.length})</a></p></div>`
          : `<p class="small muted" style="max-width:68ch">${answered ? 'Ingen spørsmål venter på repetisjon. ' : ''}Svarer du feil, kommer spørsmålet igjen i senere runder til du svarer riktig.</p>`) +
        '<p><a class="btn primary big" href="#/quiz/alle">Start blandet runde</a></p><h2>Eller velg kapittel</h2><ul class="rows">' +
        chs.map((c) => { const s = S.quiz[c], dn = quizDue(c).length; return `<li><a class="rowlink" href="#/quiz/${c}"><span class="rl-title">Kapittel ${c} · ${chTitle(c)}</span><span class="rl-meta">${s && s.n ? `<b>${Math.round(s.ok / s.n * 100)} %</b> riktig av ${s.n} · ` : ''}${dn ? `<b>${dn}</b> å repetere · ` : ''}${O.quiz.filter((q) => q.ch === c).length} spørsmål</span></a></li>`; }).join('') + '</ul>';
      return;
    }
    const onlyRep = ch === 'repeter';
    if (!onlyRep && ch !== 'alle' && !chs.some((c) => String(c) === String(ch))) return notFound('quiz for dette kapitlet', 'quiz', 'Velg et annet kapittel');
    const R0 = U.rng(U.newSeed());
    // Spørsmål du har svart feil på i tidligere runder kommer først i køen (høyst QREP per runde), resten fylles med andre.
    let pool;
    if (onlyRep) pool = quizDue('alle').slice(0, 10);
    else {
      // De øvrige som venter, tas bare med når kapitlet ikke har nok andre spørsmål til en full runde.
      const due = quizDue(ch), rep = due.slice(0, QREP);
      const other = R0.shuffle(O.quiz.filter((q) => (ch === 'alle' || String(q.ch) === String(ch)) && !S.qmiss[q.id])).slice(0, 10 - rep.length);
      pool = R0.shuffle(rep.concat(other, due.slice(QREP, QREP + 10 - rep.length - other.length)));
    }
    if (!pool.length) {
      view.innerHTML = `<div class="crumbs"><a href="#/quiz">Quiz</a> › Repeter</div><h1>Repeter quizspørsmål</h1><div class="empty"><h2>${answered ? 'Ingenting å repetere' : 'Ingenting å repetere ennå'}</h2><p>${answered
        ? 'Alle spørsmål du har svart feil på, er besvart riktig senere. Nye feil havner her og kommer igjen i de neste rundene.'
        : 'Når du svarer feil på et quizspørsmål, havner det her og kommer igjen i senere runder til du svarer riktig.'}</p><p class="row"><a class="btn primary" href="#/quiz/alle">Start blandet runde</a><a class="btn" href="#/quiz">Velg kapittel</a></p></div>`;
      return;
    }
    const wasDue = new Set(pool.filter((q) => S.qmiss[q.id]).map((q) => q.id));
    let i = 0, right = 0, cleared = 0; const missed = [];
    const crumb = onlyRep ? 'Repeter' : ch === 'alle' ? 'Blandet' : 'Kapittel ' + ch;
    const show = () => {
      if (i >= pool.length) {
        const left = quizDue(onlyRep ? 'alle' : ch).length;
        view.innerHTML = `<div class="crumbs"><a href="#/quiz">Quiz</a> › ${crumb}</div><h1>${right} av ${pool.length} riktige</h1>` +
          (wasDue.size ? `<p class="statline" id="qsum">${wasDue.size} av spørsmålene var repetisjon. ${cleared ? `<b>${cleared}</b> er nå riktig og fjernet fra repetisjonen.` : 'Ingen av dem ble riktig denne gangen.'}</p>` : '') +
          (missed.length ? `<h2>Disse kommer igjen i en senere runde</h2><ul class="keypoints">${missed.map((q) => `<li><b>${q.q}</b><br>${q.options[q.correct]} – ${q.why} <a href="#/tema/${q.ch}">Kapittel ${q.ch}</a></li>`).join('')}</ul>` : '<p>Alt riktig.</p>') +
          `<p class="row"><button class="btn primary" type="button" id="again">${onlyRep && left ? `Repeter igjen (${left})` : 'Ny runde'}</button><a href="#/quiz">Velg kapittel</a></p>`;
        $('#again').onclick = () => { if (onlyRep && !left) location.hash = '#/quiz/alle'; else routes.quiz(ch); };
        view.focus(); return;
      }
      const q = pool[i], order = R0.shuffle([0, 1, 2, 3]), isRep = wasDue.has(q.id), m0 = S.qmiss[q.id];
      view.innerHTML = `<div class="crumbs"><a href="#/quiz">Quiz</a> › ${crumb}</div>
        <p class="eyebrow">Spørsmål ${i + 1} av ${pool.length} · kapittel ${q.ch}${isRep ? ' · <span class="tag warm">Repetisjon</span>' : ''}</p><div class="progress" aria-hidden="true"><i style="width:${i / pool.length * 100}%"></i></div>
        <h2 style="border:0;margin-top:.8em" id="qq" tabindex="-1">${q.q}</h2>${isRep && m0 ? `<p class="small muted" id="qrep">Du har svart feil på dette spørsmålet ${m0.n > 1 ? m0.n + ' ganger' : 'før'}.</p>` : ''}<div id="opts" role="group" aria-labelledby="qq">${order.map((o) => `<button class="choice" type="button" data-o="${o}">${q.options[o]}</button>`).join('')}</div><div id="why" role="status"></div>`;
      $('#opts').onclick = (e) => {
        const b = e.target.closest('.choice'); if (!b || b.disabled) return; const ok = +b.dataset.o === q.correct;
        $$('.choice').forEach((x) => { x.disabled = true; if (+x.dataset.o === q.correct) x.classList.add('right'); }); if (!ok) { b.classList.add('wrong'); missed.push(q); } else right++;
        const s = S.quiz[q.ch] || (S.quiz[q.ch] = { n: 0, ok: 0 }); s.n++; if (ok) s.ok++;
        let note = '';
        if (!ok) { const m = S.qmiss[q.id]; S.qmiss[q.id] = { t: Date.now(), n: (m ? m.n : 0) + 1 }; note = 'Spørsmålet kommer igjen i en senere runde.'; }
        else if (S.qmiss[q.id]) { delete S.qmiss[q.id]; cleared++; note = 'Fjernet fra repetisjonen.'; }
        save();
        $('#why').innerHTML = `<div class="callout ${ok ? 'good' : 'bad'}"><b>${ok ? 'Riktig.' : 'Feil.'}</b> ${q.why}${note ? `<br><span class="small">${note}</span>` : ''}</div><button class="btn primary" type="button" id="nx">${i + 1 < pool.length ? 'Neste spørsmål' : 'Se resultat'}</button>`;
        $('#nx').onclick = () => { i++; show(); }; $('#nx').focus();
      };
      if (i > 0) $('#qq').focus();
    };
    show();
  };

  // ---------- Kalkulatorer ----------
  routes.verktoy = () => {
    setTitle('Kalkulatorer');
    const fld = (id, label, val) => `<label for="${id}">${label}<br><input type="text" id="${id}" value="${val}" inputmode="decimal" autocomplete="off"></label>`;
    view.innerHTML = `<h1>Kalkulatorer</h1><p class="lead">Til å kontrollere egne utregninger. Tallene oppdateres mens du skriver.</p>
      <div class="cols2">
      <section><h2>Nåverdi og internrente</h2><label for="c1">Kontantstrøm fra år 0, atskilt med semikolon<br><input type="text" id="c1" value="-4525000; 1345000; 2095000; 1885000; 1650000" style="width:100%" class="mono" autocomplete="off"></label><div class="calc">${fld('c1r', 'Avkastningskrav (%)', '10')}</div><div id="o1" role="status"></div></section>
      <section><h2>Annuitetslån</h2><div class="calc">${fld('c2l', 'Lån', '1200000')}${fld('c2r', 'Nominell årsrente (%)', '3,5')}${fld('c2n', 'År', '5')}${fld('c2m', 'Terminer per år', '12')}${fld('c2e', 'Etableringsgebyr', '1000')}${fld('c2g', 'Termingebyr', '100')}</div><div id="o2" role="status"></div></section>
      <section><h2>Obligasjon</h2><div class="calc">${fld('c3f', 'Pålydende', '1000')}${fld('c3c', 'Kupongrente (%)', '3')}${fld('c3n', 'Løpetid (år)', '3')}${fld('c3y', 'Markedsrente (%)', '10')}${fld('c3p', 'Markedskurs (for YTM)', '850')}</div><div id="o3" role="status"></div></section>
      <section><h2>WACC og skatteledd ved saldo</h2><div class="calc">${fld('c4f', 'Risikofri rente (%)', '3')}${fld('c4m', 'Markedsavkastning (%)', '10')}${fld('c4b', 'Aksjebeta', '1,3')}${fld('c4d', 'Lånerente (%)', '5')}${fld('c4w', 'Gjeldsandel (%)', '50')}${fld('c4a', 'Anleggsmidler', '10000000')}${fld('c4s', 'Saldosats (%)', '20')}${fld('c4v', 'Salgsverdi år n', '0')}${fld('c4n', 'Levetid n (år)', '5')}</div><div id="o4" role="status"></div></section>
      </div>`;
    const v = (id) => U.parse($('#' + id).value);
    /** Viser resultat, eller en konkret melding om hva som mangler. checks: [[felt-id, betingelse, melding]] */
    const out = (target, checks, rowsFn) => {
      const bad = checks.find(([id, ok]) => { const el = $('#' + id); const good = ok(v(id)); el.toggleAttribute('aria-invalid', !good); return !good; });
      $('#' + target).innerHTML = bad ? `<p class="callout warn">${bad[2]}</p>` : table(null, rowsFn());
    };
    const num = (x) => Number.isFinite(x), pos = (x) => Number.isFinite(x) && x > 0, nonneg = (x) => Number.isFinite(x) && x >= 0, rate = (x) => Number.isFinite(x) && x > -100;
    const run = () => {
      const parts = $('#c1').value.split(';').map((s) => s.trim()).filter((s) => s !== ''), cfs = parts.map(U.parse), badCf = parts.find((s, i) => Number.isNaN(cfs[i]));
      $('#c1').toggleAttribute('aria-invalid', !!badCf || cfs.length < 2);
      if (badCf) $('#o1').innerHTML = `<p class="callout warn">«${esc(badCf)}» er ikke et tall. Skill beløpene med semikolon, for eksempel −1000; 400; 400; 400.</p>`;
      else if (cfs.length < 2) $('#o1').innerHTML = '<p class="callout warn">Skriv minst to beløp: investeringen i år 0 og minst én senere kontantstrøm.</p>';
      else out('o1', [['c1r', rate, 'Avkastningskravet må være et tall i prosent, for eksempel 10.']], () => {
        const r = v('c1r') / 100, irr = F.irr(cfs), pb = F.payback(cfs), npv = F.npv(r, cfs);
        return [['NNV', n(npv)], ['Internrente', Number.isNaN(irr) ? 'finnes ikke (kontantstrømmen skifter ikke fortegn)' : pct(irr, 2)], ['Payback', Number.isNaN(pb) ? 'tilbakebetales ikke' : n(pb, 2) + ' år'], ['Nåverdiannuitet', n(npv / F.annuityFactor(r, cfs.length - 1))]];
      });
      out('o2', [['c2l', pos, 'Lånebeløpet må være større enn 0.'], ['c2r', nonneg, 'Renten må være 0 eller høyere, i prosent.'], ['c2n', pos, 'Løpetiden må være større enn 0 år.'], ['c2m', (x) => pos(x) && x <= 365, 'Terminer per år må være mellom 1 og 365 (12 = månedlig).'], ['c2e', (x) => nonneg(x) && x < v('c2l'), 'Etableringsgebyret må være 0 eller høyere, og lavere enn lånet.'], ['c2g', nonneg, 'Termingebyret må være 0 eller høyere.']], () => {
        const L = v('c2l'), m = v('c2m'), N = Math.round(v('c2n') * m), rp = v('c2r') / 100 / m, pmt = F.annuityPayment(L, rp, N), q = F.solve((x) => (pmt + v('c2g')) * F.annuityFactor(x, N) - (L - v('c2e')), 1e-10, 1);
        return [['Terminbeløp (renter + avdrag)', n(pmt, 2)], ['Rente første termin', n(L * rp, 2)], ['Avdrag første termin', n(pmt - L * rp, 2)], ['Effektiv rente per termin', pct(q, 4)], ['Effektiv årsrente', pct(Math.pow(1 + q, m) - 1, 2)], ['Sum renter i løpetiden', n(pmt * N - L)]];
      });
      out('o3', [['c3f', pos, 'Pålydende må være større enn 0.'], ['c3c', nonneg, 'Kupongrenten må være 0 eller høyere, i prosent.'], ['c3n', (x) => pos(x) && Number.isInteger(x) && x <= 100, 'Løpetiden må være et helt antall år mellom 1 og 100.'], ['c3y', rate, 'Markedsrenten må være et tall i prosent.'], ['c3p', pos, 'Markedskursen må være større enn 0.']], () => {
        const f = v('c3f'), c = v('c3c') / 100, bn = v('c3n'), y = v('c3y') / 100, D = F.duration(f, c, y, bn), ytm = F.bondYtm(v('c3p'), f, c, bn);
        return [['Kurs', n(F.bondPrice(f, c, y, bn), 2)], ['Macaulay-durasjon', n(D, 3) + ' år'], ['Modifisert durasjon', n(D / (1 + y), 3)], ['YTM ved markedskurs', Number.isNaN(ytm) ? 'utenfor beregnbart område' : pct(ytm, 2)]];
      });
      out('o4', [['c4f', num, 'Risikofri rente må være et tall i prosent.'], ['c4m', num, 'Markedsavkastningen må være et tall i prosent.'], ['c4b', num, 'Beta må være et tall, for eksempel 1,3.'], ['c4d', nonneg, 'Lånerenten må være 0 eller høyere.'], ['c4w', (x) => nonneg(x) && x <= 100, 'Gjeldsandelen må være mellom 0 og 100 prosent.'], ['c4a', nonneg, 'Anleggsmidler må være 0 eller høyere.'], ['c4s', (x) => pos(x) && x <= 100, 'Saldosatsen må være mellom 0 og 100 prosent.'], ['c4v', nonneg, 'Salgsverdien må være 0 eller høyere.'], ['c4n', pos, 'Levetiden må være større enn 0.']], () => {
        const re = F.capm(v('c4f') / 100, v('c4b'), v('c4m') / 100), wD = v('c4w') / 100, w = F.wacc(re, 1 - wD, v('c4d') / 100, wD, 0.22), a = v('c4s') / 100, sv = v('c4v'), nn = v('c4n');
        return [['Egenkapitalkrav (KVM)', pct(re, 2)], ['WACC', pct(w, 3)], ['NV spart skatt avskrivninger', n(F.pvSaldoTaxShield(v('c4a'), a, 0.22, w))], ['NV salgssum', n(sv / Math.pow(1 + w, nn))], ['NV økt skatt ved nedskriving', n(F.pvSaldoTaxShield(sv, a, 0.22, w) / Math.pow(1 + w, nn))]];
      });
    };
    view.oninput = run; run();
  };

  // ---------- Ruter ----------
  let firstLoad = true;
  function route() {
    clearInterval(timerId); view.onchange = null; view.oninput = null;
    const parts = decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/');
    const known = Object.prototype.hasOwnProperty.call(routes, parts[0]);
    // Krasjer noe, skal brukeren få beskjed og en vei videre, ikke se innholdet fra forrige side under en ny fane.
    try {
      drawNav(known ? ({ eksamen: 'eksamener', repeter: 'oving' }[parts[0]] || parts[0]) : '');
      if (!known) { setTitle('Fant ikke siden'); notFound('siden', '', 'Til forsiden'); }
      else routes[parts[0]](parts[1], parts[2]);
    } catch (e) {
      if (window.console) console.error(e);
      setTitle('Noe gikk galt');
      view.innerHTML = `<div class="empty" role="alert"><h2>Siden kunne ikke vises</h2><p>Noe gikk galt da siden skulle tegnes. Det skjer oftest rett etter en oppdatering, når nettleseren har en blanding av gamle og nye filer. Last siden på nytt. Fremdriften din er lagret og blir ikke borte.</p><p class="small muted">Feilmelding: ${esc(String(e && e.message || e))}</p><p class="row"><button class="btn primary" type="button" id="reload">Last siden på nytt</button><a class="btn" href="#/">Til forsiden</a></p></div>`;
      $('#reload').onclick = () => location.reload();
    }
    scrollTo(0, 0);
    if (!firstLoad) view.focus({ preventScroll: true });
    firstLoad = false;
  }
  addEventListener('hashchange', route);
  // En lenke til siden du allerede står på, endrer ikke adressen og gir derfor ingen hashchange. Vis siden på nytt fra toppen i stedet for å gjøre ingenting.
  const norm = (h) => decodeURIComponent((h || '').replace(/^#\/?/, '')).replace(/\/$/, '');
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href^="#/"]'); if (!a) return;
    if (norm(a.getAttribute('href')) === norm(location.hash)) { e.preventDefault(); route(); view.focus({ preventScroll: true }); }
  });
  route();
})();
