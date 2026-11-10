/* ØKAD 221 – app: ruting, visninger, fremdrift. */
(function () {
  'use strict';
  const O = window.OKAD, U = O.U, F = O.F;
  const { n, pct, esc, table } = U;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const view = $('#view');
  O.exams.sort((a, b) => b.year - a.year);
  O.theory.sort((a, b) => a.nr - b.nr);
  const chTitle = (nr) => { const c = O.theory.find((x) => x.nr === nr); return c ? c.title : ''; };

  // ---------- Lagring ----------
  const KEY = 'okad221:v1';
  let S = { gen: {}, exam: {}, quiz: {}, mock: null, mockLog: [], examDate: '' };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* utilgjengelig lagring */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignorer */ } };
  const gstat = (id) => S.gen[id] || (S.gen[id] = { tried: 0, ok: 0, tasks: 0 });
  const mastery = (id) => { const g = S.gen[id]; return g && g.tried ? g.ok / g.tried : 0; };

  // ---------- Tema ----------
  const themeBtn = $('#theme');
  const applyTheme = (t) => { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; };
  try { applyTheme(localStorage.getItem('okad221:theme')); } catch (e) { /* ignorer */ }
  themeBtn.onclick = () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark'; applyTheme(next);
    try { localStorage.setItem('okad221:theme', next); } catch (e) { /* ignorer */ }
  };

  // ---------- Navigasjon ----------
  const NAV = [['', 'Hjem'], ['analyse', 'Eksamensanalyse'], ['oving', 'Øvingsoppgaver'], ['prove', 'Prøveeksamen 2026'], ['eksamener', 'Tidligere eksamener'], ['tema', 'Teori'], ['formler', 'Formler'], ['quiz', 'Quiz'], ['verktoy', 'Kalkulatorer']];
  const drawNav = (cur) => { $('#nav').innerHTML = NAV.map(([k, t]) => `<a href="#/${k}" class="${k === cur ? 'active' : ''}">${t}</a>`).join(''); };
  const levelTag = (l) => `<span class="tag">${['', 'Grunnleggende', 'Eksamensnivå', 'Krevende'][l] || ''}</span>`;
  const probTag = (p) => `<span class="tag ${p >= 0.85 ? 'hot' : p >= 0.5 ? 'warm' : 'cool'}">${Math.round(p * 100)} %</span>`;
  const bar = (label, val, max, txt) => `<div class="bar-row"><div>${label}</div><div class="bar-track"><i style="width:${Math.max(0, Math.min(100, val / max * 100))}%"></i></div><div class="bar-val">${txt}</div></div>`;
  const genCard = (g) => {
    const st = S.gen[g.id];
    return `<a class="card" href="#/oving/${g.id}"><h3>${g.title}</h3><p>${g.blurb}</p><p class="row" style="margin-top:8px">` +
      `<span class="tag">Kap. ${g.chapter}</span>${levelTag(g.level)}<span class="tag">ca. ${g.minutes} min</span>` +
      (g.examLike ? `<span class="tag warm">${g.examLike}</span>` : '') + (st && st.tried ? `<span class="tag good">${Math.round(st.ok / st.tried * 100)} % riktig (${st.tried})</span>` : '') + '</p></a>';
  };

  // ---------- Analyse (beregnes fra eksamensdataene) ----------
  const years = () => O.exams.map((e) => e.year).sort((a, b) => a - b);
  function topicMatrix() {
    const m = {}; Object.keys(O.topics).forEach((k) => (m[k] = {}));
    O.exams.forEach((e) => e.tasks.forEach((t) => {
      const per = t.weight / t.parts.length;
      t.parts.forEach((p) => { const ts = (p.topics && p.topics.length ? p.topics : t.topics).filter((k) => m[k]); ts.forEach((k) => { m[k][e.year] = (m[k][e.year] || 0) + per / ts.length; }); });
    }));
    return m;
  }
  function topicStats() {
    const m = topicMatrix(), ys = years(), last = Math.max(...ys);
    return Object.keys(m).map((k) => {
      const present = ys.filter((y) => m[k][y] > 0);
      let wsum = 0, wtot = 0; ys.forEach((y) => { const w = Math.pow(0.75, last - y); wtot += w; if (m[k][y] > 0) wsum += w; });
      const avg = present.length ? U.sum(present.map((y) => m[k][y])) / present.length : 0;
      return { k, name: O.topics[k].name, row: m[k], count: present.length, freq: present.length / ys.length, recent: wsum / wtot, avg, last: present.length ? Math.max(...present) : null };
    }).sort((a, b) => b.recent * b.avg - a.recent * a.avg || b.count - a.count);
  }

  // ====================================================================
  const routes = {};

  routes[''] = () => {
    const gens = O.gens, tried = gens.filter((g) => S.gen[g.id] && S.gen[g.id].tried);
    const totTried = U.sum(tried.map((g) => S.gen[g.id].tried)), totOk = U.sum(tried.map((g) => S.gen[g.id].ok));
    const examParts = U.sum(O.exams.map((e) => U.sum(e.tasks.map((t) => t.parts.length)))), examDone = Object.values(S.exam).filter(Boolean).length;
    const quizN = U.sum(Object.values(S.quiz).map((q) => q.n)), quizOk = U.sum(Object.values(S.quiz).map((q) => q.ok));
    // Anbefaling: forventet eksamensvekt × (1 − mestring)
    const rec = O.prediction.slots.map((s) => {
      const ms = s.gens.map(mastery), m = Math.max(...ms), g = O.genById[s.gens[ms.indexOf(Math.min(...ms))]];
      return { s, score: s.prob * (s.weight[0] + s.weight[1]) / 2 * (1 - m), m, g };
    }).sort((a, b) => b.score - a.score);
    let days = '';
    if (S.examDate) { const d = Math.ceil((new Date(S.examDate) - new Date()) / 864e5); days = d >= 0 ? `<div class="stat">${d}</div><div class="stat-label">dager til eksamen</div>` : ''; }
    view.innerHTML = `
      <h1>Eksamenstrening i investering og finansiering</h1>
      <p class="lead">Alt er bygget på de ti eksamenssettene 2016–2025 med løsningsforslag, forelesningene og kapitteloppgavene i ØKAD 221. Oppgavene genereres med nye tall hver gang og løses med samme metode som løsningsforslagene bruker.</p>
      <div class="grid c4" style="margin:20px 0">
        <div class="card"><div class="stat">${n(totTried)}</div><div class="stat-label">deloppgaver besvart</div></div>
        <div class="card"><div class="stat">${totTried ? Math.round(totOk / totTried * 100) + ' %' : '–'}</div><div class="stat-label">riktig på første sjekk</div></div>
        <div class="card"><div class="stat">${examDone}<span class="muted small"> / ${examParts}</span></div><div class="stat-label">eksamensdeloppgaver krysset av</div></div>
        <div class="card">${days || `<div class="stat">${quizN ? Math.round(quizOk / quizN * 100) + ' %' : '–'}</div><div class="stat-label">riktig i quiz (${quizN})</div>`}</div>
      </div>
      <h2>Hva bør du øve på nå?</h2>
      <p class="muted small">Rangert etter forventet vekt på eksamen 2026 × hvor mye du har igjen å mestre.</p>
      <div class="card">${rec.map((x) => `<div class="bar-row"><div><a href="#/oving/${x.g.id}"><b>${x.s.title}</b></a> <span class="muted small">${x.s.weight[0]}–${x.s.weight[1]} %</span></div><div class="progress good"><i style="width:${Math.round(x.m * 100)}%"></i></div><div class="bar-val">${Math.round(x.m * 100)} %</div></div>`).join('')}</div>
      <h2>Slik bruker du siden</h2>
      <div class="grid c3">
        <a class="card" href="#/analyse"><h3>1. Les eksamensanalysen</h3><p>Hva som har kommet hvert år, hvor mye det teller, og prognosen for 2026.</p></a>
        <a class="card" href="#/oving"><h3>2. Øv på oppgavetypene</h3><p>${O.gens.length} generatorer med uendelig mange varianter, hint og full løsning steg for steg.</p></a>
        <a class="card" href="#/prove"><h3>3. Ta en prøveeksamen</h3><p>Fem oppgaver satt sammen etter 2026-prognosen, med tidtaking og automatisk retting.</p></a>
        <a class="card" href="#/eksamener"><h3>Tidligere eksamener</h3><p>Alle ${O.exams.length} sett med oppgavetekst, fasit og løsningsmetode for hver deloppgave.</p></a>
        <a class="card" href="#/tema"><h3>Teori per kapittel</h3><p>Begreper, formler, fremgangsmåter, eksempler og typiske feil.</p></a>
        <a class="card" href="#/quiz"><h3>Quiz</h3><p>${O.quiz.length} flervalgsspørsmål om begreper og eksamensfeller.</p></a>
      </div>
      <h2>Eksamensdato</h2>
      <div class="row"><label for="ed">Legg inn datoen for å få nedtelling:</label> <input type="date" id="ed" value="${esc(S.examDate || '')}"> <button class="btn sm ghost" id="reset">Nullstill all fremdrift</button></div>`;
    $('#ed').onchange = (e) => { S.examDate = e.target.value; save(); routes[''](); };
    $('#reset').onclick = () => { if (confirm('Slette all lagret fremdrift på denne enheten?')) { S = { gen: {}, exam: {}, quiz: {}, mock: null, mockLog: [], examDate: '' }; save(); routes[''](); } };
  };

  // ---------- Eksamensanalyse ----------
  routes.analyse = () => {
    const ys = years(), st = topicStats(), P = O.prediction;
    const heat = '<div class="tablewrap"><table class="data heat"><thead><tr><th>Tema</th>' + ys.map((y) => `<th>${String(y).slice(2)}</th>`).join('') + '<th>Antall</th><th>Sist</th></tr></thead><tbody>' +
      st.map((t) => `<tr><th scope="row">${t.name}</th>` + ys.map((y) => { const v = t.row[y] || 0; return v ? `<td style="background:rgba(var(--heat),${Math.min(0.85, 0.12 + v / 45)});${v > 22 ? 'color:#fff' : ''}" title="${y}: ca. ${Math.round(v)} % av settet">${Math.round(v)}</td>` : '<td class="z">·</td>'; }).join('') + `<td><b>${t.count}</b>/${ys.length}</td><td>${t.last || '–'}</td></tr>`).join('') + '</tbody></table></div>';
    const struct = table(['År', 'Oppgaver', 'Struktur (vekt i %)'], O.exams.slice().sort((a, b) => a.year - b.year).map((e) => [`<a href="#/eksamen/${e.id}">${e.title}</a>`, e.tasks.length, e.tasks.map((t) => `<span class="tag">${t.weight}</span> ${esc(t.title)}`).join('<br>')]), { cls: 'left wrap' });
    view.innerHTML = `
      <h1>Eksamensanalyse 2016–2025 og prognose for 2026</h1>
      <p class="lead">Ti eksamenssett, ${U.sum(O.exams.map((e) => e.tasks.length))} oppgaver og ${U.sum(O.exams.map((e) => U.sum(e.tasks.map((t) => t.parts.length))))} deloppgaver er klassifisert etter tema. Tallene i varmekartet er omtrentlig andel av settet i prosent (oppgavens vekt fordelt likt på deloppgavene).</p>
      <h2>Hva har kommet – og hvor mye teller det?</h2>${heat}
      <p class="small muted">Sortert etter nylig hyppighet × gjennomsnittlig vekt. Kolonnene er årstall (16 = desember 2016, 17 = mars 2017 osv.).</p>
      <h2>Hyppighet, vektet mot de siste årene</h2>
      <div class="card">${st.map((t) => bar(t.name, t.recent, 1, Math.round(t.recent * 100) + ' %')).join('')}</div>
      <p class="small muted">Hvert år teller 25 % mindre enn året etter, slik at 2025 teller mest. Et tema som bare har kommet de to siste årene (obligasjoner) får dermed høyere tall enn ren opptelling tilsier.</p>
      <h2>Slik har settene vært bygget opp</h2>${struct}
      <div class="callout"><b>Tre faser.</b> 2016–2020: prosjektanalyse + økonomisk levetid + lån eller portefølje + stor skatteoppgave. 2021–2023: helt fast mal med prosjekt (20–25 %), annuitetslån (20 %), portefølje (20 %) og WACC/skatt (30–35 %). 2024–2025: obligasjoner kommer inn, porteføljeoppgaven vokser, og 2025 har for første gang fem oppgaver der skatteoppgaven «bare» teller 25 %.</div>
      <h2>Prognose: slik kan eksamen 2026 se ut</h2>
      <p>Mest sannsynlig 4–5 oppgaver, nesten bare regning med korte begrunnelser, løst i Excel. Prosenten til høyre er anslått sannsynlighet for at temaet får en egen oppgave eller tydelig deloppgave.</p>
      ${P.slots.map((s) => `<div class="card" style="margin:10px 0"><div class="row"><h3 style="margin:0">Oppgave ${s.nr}: ${s.title}</h3><span class="spacer"></span><span class="tag">${s.weight[0]}–${s.weight[1]} % av karakteren</span>${probTag(s.prob)}</div><p>${s.why}</p><p class="row">${s.gens.map((id) => `<a class="btn sm" href="#/oving/${id}">${O.genById[id].title}</a>`).join('')}</p></div>`).join('')}
      <h3>Jokere – mindre sannsynlig, men mulig</h3>
      ${P.jokers.map((s) => `<details><summary>${s.title} ${probTag(s.prob)}</summary><div class="inner"><p>${s.why}</p><p class="row">${s.gens.map((id) => `<a class="btn sm" href="#/oving/${id}">${O.genById[id].title}</a>`).join('')}</p></div></details>`).join('')}
      <h2>Fellene som går igjen</h2>
      ${table(['Felle', 'Riktig behandling', 'Sett i'], P.traps, { cls: 'left wrap' })}
      <h2>Forbehold</h2>
      <div class="callout warn"><p>Prognosen er et kvalifisert anslag basert på mønstre i ti tidligere sett – ikke en fasit. Samme foreleser har laget alle settene og strukturen har vært svært stabil, men 2024 og 2025 viser at nye temaer kan komme inn. Pensum er hele læreboka: bruk prognosen til å prioritere, ikke til å velge bort.</p>
      <p>Varighet og tillatte hjelpemidler sto ikke i eksamensfilene. Løsningsforslagene er regneark og godtar målsøking, så eksamen løses etter alt å dømme i Excel – øv med regneark ved siden av.</p></div>`;
  };

  // ---------- Øvingsoppgaver ----------
  routes.oving = (id, seedStr) => {
    if (id && O.genById[id]) return taskView(id, parseInt(seedStr, 10) || U.newSeed());
    const chs = [...new Set(O.gens.map((g) => g.chapter))].sort((a, b) => a - b);
    const core = O.prediction.slots.map((s) => s.gens[0]);
    view.innerHTML = `<h1>Øvingsoppgaver</h1><p class="lead">Hver oppgave lages på nytt med nye tall. Tast svaret, få det sjekket, og åpne hint eller full løsning når du trenger det. Samme metode og oppsett som løsningsforslagene til eksamen.</p>
      <h2>Kjernepakken – de fem oppgavetypene prognosen peker på</h2><div class="grid c2">${core.map((i) => genCard(O.genById[i])).join('')}</div>` +
      chs.map((c) => `<h2>Kapittel ${c}${chTitle(c) ? ': ' + chTitle(c) : ''}</h2><div class="grid c2">${O.gens.filter((g) => g.chapter === c).map(genCard).join('')}</div>`).join('');
  };

  /** Tegner deloppgavene i en oppgave. opts.exam = prøveeksamen (ingen umiddelbar fasit). Returnerer state. */
  function renderParts(task, host, opts = {}) {
    const state = task.parts.map(() => ({ first: null, ok: false, shown: false, val: '' }));
    host.innerHTML = task.parts.map((p, i) => {
      const pid = `${opts.prefix || 'p'}${i}`;
      const input = p.kind === 'num'
        ? `<div class="answer"><input type="text" inputmode="decimal" id="${pid}-in" aria-label="Svar ${p.label}" placeholder="Ditt svar" autocomplete="off"><span class="unit">${p.unit || ''}</span>` +
          (opts.exam ? '' : `<button class="btn sm primary" data-act="check" data-i="${i}">Sjekk</button>${p.hint ? `<button class="btn sm ghost" data-act="hint" data-i="${i}">Hint</button>` : ''}<button class="btn sm ghost" data-act="sol" data-i="${i}">Vis løsning</button>`) + `<span class="fb" id="${pid}-fb" role="status"></span></div>`
        : `<div class="answer" style="display:block"><textarea id="${pid}-in" placeholder="Skriv svaret ditt med egne ord før du ser løsningsforslaget …"></textarea>` + (opts.exam ? '' : `<button class="btn sm" data-act="sol" data-i="${i}">Vis løsningsforslag</button>`) + '</div>';
      return `<div class="part"><div class="part-q"><b>${p.label})</b><div>${p.q}</div></div>${input}<div id="${pid}-hint"></div><div id="${pid}-sol"></div></div>`;
    }).join('');
    const showSol = (i) => {
      const p = task.parts[i], pid = `${opts.prefix || 'p'}${i}`; state[i].shown = true;
      $(`#${pid}-sol`, host).innerHTML = '<div class="solution">' + (p.kind === 'num' ? `<p><b>Svar: ${O.fmtAnswer(p)}</b></p>` + (p.sol || '') : '<p><b>Momenter som bør være med:</b></p><ul class="keypoints">' + (p.points || []).map((x) => `<li>${x}</li>`).join('') + '</ul>' + (p.sol || '')) + '</div>';
    };
    const check = (i) => {
      const p = task.parts[i], pid = `${opts.prefix || 'p'}${i}`, fb = $(`#${pid}-fb`, host), res = O.check(p, $(`#${pid}-in`, host).value);
      if (res === 'invalid') { fb.className = 'fb near'; fb.textContent = 'Skriv et tall'; return res; }
      if (state[i].first === null && !state[i].shown) { state[i].first = res === 'ok'; if (opts.onFirst) opts.onFirst(i, res === 'ok'); }
      state[i].ok = res === 'ok';
      fb.className = 'fb ' + (res === 'ok' ? 'ok' : res === 'near' ? 'near' : 'no');
      fb.textContent = res === 'ok' ? '✓ Riktig' : res === 'near' ? 'Nesten – sjekk avrunding, fortegn eller en mellomregning' : '✗ Ikke riktig ennå';
      if (res === 'ok') showSol(i);
      return res;
    };
    host.onclick = (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return; const i = +b.dataset.i, p = task.parts[i], pid = `${opts.prefix || 'p'}${i}`;
      if (b.dataset.act === 'check') check(i);
      if (b.dataset.act === 'hint') $(`#${pid}-hint`, host).innerHTML = `<div class="callout hint">${p.hint}</div>`;
      if (b.dataset.act === 'sol') { if (state[i].first === null && p.kind === 'num' && opts.onFirst) { state[i].first = false; opts.onFirst(i, false); } showSol(i); }
    };
    host.onkeydown = (e) => { if (e.key === 'Enter' && e.target.matches('input') && !opts.exam) { const i = +e.target.id.replace(/\D+(\d+)-in/, '$1'); check(i); } };
    return { state, showSol, check };
  }

  function taskView(id, seed) {
    const g = O.genById[id], task = O.make(id, seed), st = gstat(id);
    history.replaceState(null, '', `#/oving/${id}/${seed}`);
    st.tasks++; save();
    view.innerHTML = `<div class="crumbs"><a href="#/oving">Øvingsoppgaver</a> › Kapittel ${g.chapter}</div>
      <h1>${g.title}</h1>
      <p class="row"><span class="tag">Kap. ${g.chapter}</span>${levelTag(g.level)}<span class="tag">ca. ${g.minutes} min</span>${g.examLike ? `<span class="tag warm">${g.examLike}</span>` : ''}
        <span class="spacer"></span><a class="btn sm" href="#/tema/${g.chapter}">Teori kap. ${g.chapter}</a><button class="btn sm primary" id="new">Ny oppgave ↻</button></p>
      <div class="card"><div class="task-text">${task.text}</div><div id="parts"></div></div>
      <p class="row noprint" style="margin-top:14px"><button class="btn" id="all">Vis alle løsninger</button><button class="btn primary" id="new2">Ny oppgave med nye tall ↻</button><span class="muted small">Oppgave-ID ${seed} – lenken i adressefeltet gir nøyaktig samme oppgave.</span></p>
      <p class="small muted">Prosentsvar tastes som prosent (12,34), beløp i kroner. Små avrundingsavvik godtas.</p>`;
    const R = renderParts(task, $('#parts'), { onFirst: (i, ok) => { st.tried++; if (ok) st.ok++; save(); } });
    const next = () => taskView(id, U.newSeed());
    $('#new').onclick = next; $('#new2').onclick = next;
    $('#all').onclick = () => task.parts.forEach((_, i) => R.showSol(i));
    scrollTo(0, 0);
  }

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
  routes.prove = (seedStr) => {
    clearInterval(timerId);
    if (!seedStr && !S.mock) {
      const log = S.mockLog || [];
      view.innerHTML = `<h1>Prøveeksamen 2026</h1>
        <p class="lead">Et helt sett på fem oppgaver, satt sammen etter prognosen: prosjektanalyse (20 %), obligasjoner (10 %), lån eller en joker (20 %), portefølje (20 %) og WACC med nåverdi etter skatt (30 %). Nye tall hver gang.</p>
        <div class="card"><p><b>Slik gjør du det realistisk:</b> ha Excel åpent, sett av sammenhengende tid, og ikke åpne teorien underveis. Du taster inn sluttsvarene her. Når du leverer, rettes tallsvarene automatisk og du ser full løsning på alt. Drøftingsdelene vurderer du selv mot momentlisten.</p>
        <div class="row"><label for="dur">Tid:</label> <select id="dur"><option value="240">4 timer</option><option value="300">5 timer</option><option value="180">3 timer</option><option value="0">Uten tidtaking</option></select>
        <button class="btn primary" id="start">Start prøveeksamen</button></div>
        <p class="small muted">Varigheten på den ordentlige eksamenen sto ikke i eksamensfilene – velg det emnebeskrivelsen sier.</p></div>` +
        (log.length ? '<h2>Tidligere forsøk</h2>' + table(['Dato', 'Resultat', 'Tid brukt'], log.slice().reverse().map((x) => [x.date, `<b>${x.score} %</b>`, x.min + ' min'])) : '');
      $('#start').onclick = () => { S.mock = { seed: U.newSeed(), start: Date.now(), dur: +$('#dur').value, ans: {} }; save(); routes.prove(); };
      return;
    }
    const M = S.mock || { seed: parseInt(seedStr, 10), start: Date.now(), dur: 0, ans: {} };
    const slots = buildMock(M.seed);
    view.innerHTML = `<div class="sticky-bar noprint"><div class="row"><b>Prøveeksamen 2026</b><span class="spacer"></span><span class="timer" id="timer"></span><button class="btn sm" id="print">Skriv ut</button><button class="btn sm" id="abort">Avbryt</button><button class="btn sm primary" id="submit">Lever og rett</button></div></div>
      <div id="result"></div>` + slots.map((s, i) => `<div class="card" style="margin-bottom:16px"><h2 style="margin-top:0">Oppgave ${i + 1} <span class="pts">(${s.weight} %)</span></h2><div class="task-text">${s.task.text}</div><div id="mp${i}"></div></div>`).join('');
    const RS = slots.map((s, i) => renderParts(s.task, $(`#mp${i}`), { exam: true, prefix: `m${i}_` }));
    $$('input[type=text], textarea', view).forEach((el) => { if (M.ans[el.id]) el.value = M.ans[el.id]; el.oninput = () => { M.ans[el.id] = el.value; save(); }; });
    const tick = () => {
      const el = $('#timer'); if (!el) return clearInterval(timerId);
      const used = Math.floor((Date.now() - M.start) / 1000), left = M.dur ? M.dur * 60 - used : used, a = Math.abs(left);
      el.textContent = (M.dur ? (left < 0 ? '+' : '') : '') + [Math.floor(a / 3600), Math.floor(a % 3600 / 60), a % 60].map((x) => String(x).padStart(2, '0')).join(':');
      el.style.color = M.dur && left < 600 ? 'var(--bad)' : '';
    };
    tick(); timerId = setInterval(tick, 1000);
    $('#print').onclick = () => print();
    $('#abort').onclick = () => { if (confirm('Avbryte prøveeksamenen? Svarene slettes.')) { S.mock = null; save(); clearInterval(timerId); location.hash = '#/prove'; routes.prove(); } };
    $('#submit').onclick = () => {
      clearInterval(timerId);
      let total = 0; const rows = [];
      slots.forEach((s, i) => {
        const nums = s.task.parts.map((p, j) => [p, j]).filter(([p]) => p.kind === 'num'); let ok = 0;
        s.task.parts.forEach((p, j) => { if (p.kind === 'num') { const r = RS[i].check(j); if (r === 'ok') ok++; } RS[i].showSol(j); });
        const share = nums.length ? ok / nums.length : 0; total += share * s.weight;
        rows.push([`Oppgave ${i + 1}: ${s.task.gen.title}`, s.weight + ' %', `${ok} / ${nums.length}`, n(share * s.weight, 1) + ' %']);
      });
      const mins = Math.round((Date.now() - M.start) / 60000), score = Math.round(total);
      const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : score >= 40 ? 'E' : 'F';
      rows.push({ cells: ['Sum', '100 %', '', `<b>${score} %</b>`], cls: 'sum' });
      $('#result').innerHTML = `<div class="callout ${score >= 60 ? 'good' : score >= 40 ? 'warn' : 'bad'}"><h2 style="margin-top:0">Resultat: ${score} % – omtrent karakter ${grade}</h2><p>Tid brukt: ${mins} minutter. Bare tallsvarene er rettet automatisk; drøftingsdelene sjekker du selv mot momentlistene under. Karakteren bruker vanlig veiledende prosentskala og er bare en pekepinn – på eksamen gis det også uttelling for riktig metode selv om sluttsvaret er feil.</p></div>` + table(['Oppgave', 'Vekt', 'Riktige tallsvar', 'Poeng'], rows) + '<p class="row"><a class="btn primary" href="#/prove">Ny prøveeksamen</a></p>';
      if (S.mock) { (S.mockLog = S.mockLog || []).push({ date: new Date().toLocaleDateString('nb-NO'), score, min: mins }); S.mock = null; save(); }
      $('#submit').disabled = true; scrollTo(0, 0);
    };
  };

  // ---------- Tidligere eksamener ----------
  routes.eksamener = () => {
    view.innerHTML = '<h1>Tidligere eksamener</h1><p class="lead">Alle ti settene med ordrett oppgavetekst. Prøv selv først – åpne deretter fasit og løsningsmetode, og kryss av det du fikk til.</p><div class="grid c2">' +
      O.exams.map((e) => {
        const tot = U.sum(e.tasks.map((t) => t.parts.length)), done = U.sum(e.tasks.map((t) => t.parts.filter((p) => S.exam[`${e.id}-${t.nr}${p.label}`]).length));
        return `<a class="card" href="#/eksamen/${e.id}"><h3>${e.title}</h3><p>${e.tasks.map((t) => `${t.weight} % ${esc(t.title)}`).join(' · ')}</p><div class="progress good" style="margin-top:10px"><i style="width:${done / tot * 100}%"></i></div><p class="small muted">${done} av ${tot} deloppgaver krysset av</p></a>`;
      }).join('') + '</div>';
  };
  routes.eksamen = (id) => {
    const e = O.exams.find((x) => x.id === id); if (!e) return routes.eksamener();
    const srcTag = (s) => (s === 'LF' ? '<span class="tag good">Fra løsningsforslaget</span>' : s === 'egen' ? '<span class="tag warm">Egen utregning – ikke i LF</span>' : '<span class="tag cool">LF-tall + egen forklaring</span>');
    view.innerHTML = `<div class="crumbs"><a href="#/eksamener">Tidligere eksamener</a> › ${e.title}</div><h1>Eksamen ${e.title.toLowerCase().replace(/^eksamen /, '')}</h1>` + (e.note ? `<div class="callout warn">${e.note}</div>` : '') +
      e.tasks.map((t) => {
        const related = [...new Set(t.topics.concat(...t.parts.map((p) => p.topics || [])).filter((k) => O.topics[k]).flatMap((k) => O.topics[k].gens.slice(0, 1)))];
        return `<div class="card" style="margin-bottom:16px"><h2 style="margin-top:0">Oppgave ${t.nr} <span class="pts">(${t.weight} %)</span> – ${esc(t.title)}</h2><div class="task-text">${t.text || ''}</div>` +
          t.parts.map((p) => { const k = `${e.id}-${t.nr}${p.label}`; return `<div class="part"><div class="part-q"><b>${p.label})</b><div>${p.q}</div></div>
            <details style="margin-left:1.9em"><summary>Fasit</summary><div class="inner">${p.answer}</div></details>
            <details style="margin-left:1.9em"><summary>Løsning steg for steg</summary><div class="inner"><p>${srcTag(p.src)}</p>${p.method}</div></details>
            <label style="margin-left:1.9em"><input type="checkbox" data-k="${k}" ${S.exam[k] ? 'checked' : ''}> Denne fikk jeg til</label></div>`; }).join('') +
          `<p class="row noprint" style="margin-top:12px"><span class="muted small">Øv på samme type med nye tall:</span>${related.map((g) => `<a class="btn sm" href="#/oving/${g}">${O.genById[g].title}</a>`).join('')}</p></div>`;
      }).join('');
    view.onchange = (ev) => { const k = ev.target.dataset && ev.target.dataset.k; if (k) { S.exam[k] = ev.target.checked; save(); } };
  };

  // ---------- Teori ----------
  const wTag = (w) => `<span class="tag ${w === 'høy' ? 'hot' : w === 'middels' ? 'warm' : 'cool'}">Eksamensvekt: ${w}</span>`;
  routes.tema = (nr) => {
    const c = O.theory.find((x) => String(x.nr) === String(nr));
    if (!c) {
      view.innerHTML = '<h1>Teori per kapittel</h1><p class="lead">Sammendrag av forelesningene og læreboka (Bredesen, 7. utgave), med vekt på det som faktisk blir spurt om på eksamen.</p><div class="grid c2">' +
        O.theory.map((t) => `<a class="card" href="#/tema/${t.nr}"><h3>Kapittel ${t.nr}: ${t.title}</h3><p>${wTag(t.examWeight)} <span class="tag">${t.formulas.length} formler</span> <span class="tag">${O.quiz.filter((q) => q.ch === t.nr).length} quizspørsmål</span></p></a>`).join('') + '</div>';
      return;
    }
    const gens = O.gens.filter((g) => g.chapter === c.nr);
    const sec = (title, html) => (html ? `<h2>${title}</h2>${html}` : '');
    view.innerHTML = `<div class="crumbs"><a href="#/tema">Teori</a> › Kapittel ${c.nr}</div><h1>Kapittel ${c.nr}: ${c.title}</h1><p>${wTag(c.examWeight)}</p>
      <div class="callout"><b>På eksamen:</b> ${c.examNotes || ''}</div>${c.summary || ''}` +
      sec('Sentrale begreper', (c.concepts || []).length ? '<div class="card"><dl>' + c.concepts.map((x) => `<dt><b>${x.term}</b></dt><dd style="margin:0 0 10px">${x.def}</dd>`).join('') + '</dl></div>' : '') +
      sec('Formler', (c.formulas || []).map((x) => `<div class="card" style="margin:8px 0"><b>${x.name}</b><div class="formula">${x.html}</div><div class="small">${x.note || ''}</div></div>`).join('')) +
      sec('Fremgangsmåter', (c.methods || []).map((m) => `<details open><summary>${m.title}</summary><div class="inner"><ol class="steps">${m.steps.map((s) => `<li>${s}</li>`).join('')}</ol></div></details>`).join('')) +
      sec('Gjennomregnede eksempler', (c.examples || []).map((x) => `<details><summary>${x.title}</summary><div class="inner">${x.html}</div></details>`).join('')) +
      sec('Typiske feil', (c.pitfalls || []).length ? '<div class="callout bad"><ul>' + c.pitfalls.map((x) => `<li>${x}</li>`).join('') + '</ul></div>' : '') +
      sec('Excel-funksjoner', (c.excel || []).length ? table(['Funksjon', 'Bruk'], c.excel.map((x) => [`<code>${x.fn}</code>`, x.use]), { cls: 'left wrap' }) : '') +
      sec('Øv på kapitlet', (gens.length ? `<div class="grid c2">${gens.map(genCard).join('')}</div>` : '<p class="muted">Ingen egne regneoppgaver for dette kapitlet.</p>') + (O.quiz.some((q) => q.ch === c.nr) ? `<p><a class="btn primary" href="#/quiz/${c.nr}">Ta quiz for kapittel ${c.nr}</a></p>` : ''));
    scrollTo(0, 0);
  };

  routes.formler = () => {
    view.innerHTML = `<h1>Formelsamling</h1><p class="lead">Alle formlene fra teorikapitlene samlet. På eksamen har det vært vedlagt en formelsamling, men du må vite når hver formel brukes.</p>
      <p class="noprint"><input type="text" id="fs" placeholder="Søk, f.eks. «annuitet» eller «durasjon»" style="width:min(420px,100%)"> <button class="btn sm" onclick="print()">Skriv ut</button></p><div id="fl"></div>`;
    const draw = (q) => {
      q = (q || '').toLowerCase();
      $('#fl').innerHTML = O.theory.map((c) => {
        const fs = (c.formulas || []).filter((x) => !q || (x.name + ' ' + (x.note || '')).toLowerCase().includes(q));
        return fs.length ? `<h2>Kapittel ${c.nr}: ${c.title}</h2>` + fs.map((x) => `<div class="card" style="margin:8px 0"><b>${x.name}</b><div class="formula">${x.html}</div><div class="small">${x.note || ''}</div></div>`).join('') : '';
      }).join('') || '<p class="muted">Ingen treff.</p>';
    };
    draw(''); $('#fs').oninput = (e) => draw(e.target.value);
  };

  // ---------- Quiz ----------
  routes.quiz = (ch) => {
    const chs = [...new Set(O.quiz.map((q) => q.ch))].sort((a, b) => a - b);
    if (!ch) {
      view.innerHTML = '<h1>Quiz</h1><p class="lead">Korte flervalgsspørsmål om begreper, relevante kontantstrømmer og typiske feller. Ti spørsmål per runde.</p><div class="grid c3">' +
        `<a class="card" href="#/quiz/alle"><h3>Blandet – alle kapitler</h3><p>${O.quiz.length} spørsmål i banken</p></a>` +
        chs.map((c) => { const s = S.quiz[c]; return `<a class="card" href="#/quiz/${c}"><h3>Kapittel ${c}</h3><p>${chTitle(c)}</p><p class="small muted">${O.quiz.filter((q) => q.ch === c).length} spørsmål${s && s.n ? ` · ${Math.round(s.ok / s.n * 100)} % riktig` : ''}</p></a>`; }).join('') + '</div>';
      return;
    }
    const pool = U.rng(U.newSeed()).shuffle(O.quiz.filter((q) => ch === 'alle' || String(q.ch) === String(ch))).slice(0, 10);
    if (!pool.length) return routes.quiz();
    let i = 0, right = 0;
    const show = () => {
      if (i >= pool.length) {
        view.innerHTML = `<h1>Ferdig!</h1><div class="callout ${right >= 8 ? 'good' : right >= 5 ? 'warn' : 'bad'}"><p class="stat">${right} av ${pool.length} riktige</p></div><p class="row"><a class="btn primary" id="again">Ny runde</a><a class="btn" href="#/quiz">Velg kapittel</a></p>`;
        $('#again').onclick = () => routes.quiz(ch); return;
      }
      const q = pool[i], order = U.rng(U.newSeed()).shuffle([0, 1, 2, 3]);
      view.innerHTML = `<div class="crumbs"><a href="#/quiz">Quiz</a> › ${ch === 'alle' ? 'Blandet' : 'Kapittel ' + ch}</div><div class="progress"><i style="width:${i / pool.length * 100}%"></i></div>
        <p class="muted small">Spørsmål ${i + 1} av ${pool.length} · kapittel ${q.ch}</p><div class="card"><p style="font-size:1.1rem"><b>${q.q}</b></p><div id="opts">${order.map((o) => `<button class="choice" data-o="${o}">${q.options[o]}</button>`).join('')}</div><div id="why"></div></div>`;
      $('#opts').onclick = (e) => {
        const b = e.target.closest('.choice'); if (!b || b.disabled) return; const o = +b.dataset.o, ok = o === q.correct;
        $$('.choice').forEach((x) => { x.disabled = true; if (+x.dataset.o === q.correct) x.classList.add('right'); }); if (!ok) b.classList.add('wrong'); else right++;
        const s = S.quiz[q.ch] || (S.quiz[q.ch] = { n: 0, ok: 0 }); s.n++; if (ok) s.ok++; save();
        $('#why').innerHTML = `<div class="callout ${ok ? 'good' : 'bad'}"><b>${ok ? 'Riktig.' : 'Feil.'}</b> ${q.why}</div><button class="btn primary" id="nx">${i + 1 < pool.length ? 'Neste spørsmål' : 'Se resultat'}</button>`;
        $('#nx').onclick = () => { i++; show(); }; $('#nx').focus();
      };
    };
    show();
  };

  // ---------- Kalkulatorer ----------
  routes.verktoy = () => {
    const fld = (id, label, val) => `<label>${label}<br><input type="text" id="${id}" value="${val}" style="width:100%"></label>`;
    view.innerHTML = `<h1>Kalkulatorer</h1><p class="lead">Til å kontrollere egne utregninger. På eksamen bruker du Excel – her ser du de samme tallene med mellomregning.</p>
      <div class="grid c2">
      <div class="card"><h3>Nåverdi og internrente</h3>${fld('c1', 'Kontantstrøm fra år 0, atskilt med semikolon', '-4525000; 1345000; 2095000; 1885000; 1650000')}${fld('c1r', 'Avkastningskrav (%)', '10')}<div id="o1"></div></div>
      <div class="card"><h3>Annuitetslån</h3><div class="grid c3">${fld('c2l', 'Lån', '1200000')}${fld('c2r', 'Nominell årsrente (%)', '3,5')}${fld('c2n', 'År', '5')}${fld('c2m', 'Terminer per år', '12')}${fld('c2e', 'Etableringsgebyr', '1000')}${fld('c2g', 'Termingebyr', '100')}</div><div id="o2"></div></div>
      <div class="card"><h3>Obligasjon</h3><div class="grid c3">${fld('c3f', 'Pålydende', '1000')}${fld('c3c', 'Kupongrente (%)', '3')}${fld('c3n', 'Løpetid (år)', '3')}${fld('c3y', 'Markedsrente (%)', '10')}${fld('c3p', 'Markedskurs (for YTM)', '850')}</div><div id="o3"></div></div>
      <div class="card"><h3>WACC og saldo-skatteledd</h3><div class="grid c3">${fld('c4f', 'Risikofri rente (%)', '3')}${fld('c4m', 'Markedsavkastning (%)', '10')}${fld('c4b', 'Aksjebeta', '1,3')}${fld('c4d', 'Lånerente (%)', '5')}${fld('c4w', 'Gjeldsandel (%)', '50')}${fld('c4a', 'Anleggsmidler', '10000000')}${fld('c4s', 'Saldosats (%)', '20')}${fld('c4v', 'Salgsverdi år n', '0')}${fld('c4n', 'Levetid n', '5')}</div><div id="o4"></div></div>
      </div>`;
    const v = (id) => U.parse($('#' + id).value);
    const run = () => {
      const cfs = $('#c1').value.split(';').map(U.parse).filter((x) => !Number.isNaN(x)), r = v('c1r') / 100, irr = F.irr(cfs), pb = F.payback(cfs);
      $('#o1').innerHTML = table(null, [['NNV', n(F.npv(r, cfs))], ['Internrente', Number.isNaN(irr) ? '–' : pct(irr, 2)], ['Payback', Number.isNaN(pb) ? '–' : n(pb, 2) + ' år'], ['Nåverdiannuitet', n(F.npv(r, cfs) / F.annuityFactor(r, cfs.length - 1))]]);
      const L = v('c2l'), m = v('c2m'), N = v('c2n') * m, rp = v('c2r') / 100 / m, pmt = F.annuityPayment(L, rp, N), q = F.solve((x) => (pmt + v('c2g')) * F.annuityFactor(x, N) - (L - v('c2e')), 1e-9, 1);
      $('#o2').innerHTML = table(null, [['Terminbeløp (renter + avdrag)', n(pmt, 2)], ['Rente første termin', n(L * rp, 2)], ['Avdrag første termin', n(pmt - L * rp, 2)], ['Effektiv rente per termin', pct(q, 4)], ['Effektiv årsrente', pct(Math.pow(1 + q, m) - 1, 2)], ['Sum renter i løpetiden', n(pmt * N - L)]]);
      const f = v('c3f'), c = v('c3c') / 100, bn = v('c3n'), y = v('c3y') / 100, D = F.duration(f, c, y, bn);
      $('#o3').innerHTML = table(null, [['Kurs', n(F.bondPrice(f, c, y, bn), 2)], ['Macaulay-durasjon', n(D, 3) + ' år'], ['Modifisert durasjon', n(D / (1 + y), 3)], ['YTM ved markedskurs', pct(F.bondYtm(v('c3p'), f, c, bn), 2)]]);
      const re = F.capm(v('c4f') / 100, v('c4b'), v('c4m') / 100), wD = v('c4w') / 100, w = F.wacc(re, 1 - wD, v('c4d') / 100, wD, 0.22), a = v('c4s') / 100, sv = v('c4v'), nn = v('c4n');
      $('#o4').innerHTML = table(null, [['Egenkapitalkrav (KVM)', pct(re, 2)], ['WACC', pct(w, 3)], ['NV spart skatt avskrivninger', n(F.pvSaldoTaxShield(v('c4a'), a, 0.22, w))], ['NV salgssum', n(sv / Math.pow(1 + w, nn))], ['NV økt skatt ved nedskriving', n(F.pvSaldoTaxShield(sv, a, 0.22, w) / Math.pow(1 + w, nn))]]);
    };
    view.oninput = run; run();
  };

  // ---------- Ruter ----------
  function route() {
    clearInterval(timerId); view.onchange = null; view.oninput = null;
    const parts = decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/');
    const name = routes[parts[0]] ? parts[0] : '';
    drawNav(name === 'eksamen' ? 'eksamener' : name);
    routes[name](parts[1], parts[2]);
    if (name !== 'oving' || !parts[1]) scrollTo(0, 0);
  }
  addEventListener('hashchange', route);
  route();
})();
