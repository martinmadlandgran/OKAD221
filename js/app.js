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

  // ---------- Lagring (med tydelig beskjed hvis den ikke virker) ----------
  const KEY = 'okad221:v1';
  const blank = () => ({ gen: {}, exam: {}, quiz: {}, mock: null, mockLog: [], examDate: '' });
  let S = blank(), storageOk = true;
  const notice = (msg) => { const el = $('#notice'); el.hidden = !msg; el.textContent = msg || ''; };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { storageOk = false; notice('Nettleseren tillater ikke lagring (privat modus?). Siden virker, men fremdriften forsvinner når du lukker fanen.'); }
  const save = () => { if (!storageOk) return; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { storageOk = false; notice('Kunne ikke lagre fremdriften – lagringsplassen i nettleseren er full eller sperret.'); } };
  const gstat = (id) => S.gen[id] || (S.gen[id] = { tried: 0, ok: 0, tasks: 0 });
  const mastery = (id) => { const g = S.gen[id]; return g && g.tried ? g.ok / g.tried : 0; };
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
  const TABS = [['', 'Hjem'], ['oving', 'Øv'], ['prove', 'Prøve'], ['eksamener', 'Eksamener'], ['tema', 'Teori']];
  const drawNav = (cur) => {
    const link = ([k, t]) => `<a href="#/${k}"${k === cur ? ' aria-current="page"' : ''}>${t}</a>`;
    $('#nav').innerHTML = NAV.map(link).join('');
    const tabCur = ['formler', 'quiz'].includes(cur) ? 'tema' : ['analyse', 'verktoy'].includes(cur) ? '' : cur;
    $('#tabbar').innerHTML = TABS.map(([k, t]) => `<a href="#/${k}"${k === tabCur ? ' aria-current="page"' : ''}>${t}</a>`).join('');
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
    view.innerHTML = `
      <p class="eyebrow">ØKAD 221 · Investering og finansiering</p>
      <h1>${started ? 'Fortsett eksamenstreningen' : 'Fem oppgavetyper avgjør eksamen'}</h1>
      <p class="statline">${days}${started ? `<b>${totTried}</b> deloppgaver besvart, <b>${Math.round(totOk / totTried * 100)} %</b> riktig på første forsøk · <b>${examDone}</b> av ${examParts} eksamensdeloppgaver krysset av${lastMock ? ` · siste prøveeksamen <b>${lastMock.score} %</b>` : ''}` : 'Rangert etter hvor mye de har telt i de ti settene 2016–2025. Begynn øverst.'}</p>
      <div class="next">
        <div><p class="eyebrow">${S.mock ? 'Påbegynt' : 'Neste nå'}</p><h2>${S.mock ? 'Du har en prøveeksamen som ikke er levert' : next.g.title}</h2>
          <p class="small muted" style="margin:0">${S.mock ? 'Svarene dine er lagret. Klokken har gått siden du startet.' : `${next.s.title} teller trolig ${next.s.weight[0]}–${next.s.weight[1]} % · ca. ${next.g.minutes} min · ${next.tried ? 'du har ' + Math.round(next.m * 100) + ' % riktig hittil' : 'du har ikke prøvd denne ennå'}`}</p></div>
        <a class="btn primary big" href="#/${S.mock ? 'prove' : 'oving/' + next.g.id}">${S.mock ? 'Fortsett prøveeksamen' : 'Start oppgaven'}</a>
      </div>
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
          <li><a class="rowlink" href="#/quiz"><span class="rl-title">Quiz</span><span class="rl-sub">${O.quiz.length} flervalgsspørsmål om begreper og feller.</span></a></li>
          <li><a class="rowlink" href="#/verktoy"><span class="rl-title">Kalkulatorer</span><span class="rl-sub">Kontroller NNV, lån, obligasjon og WACC.</span></a></li></ul></div>
      </div>
      <h2>Innstillinger</h2>
      <p class="row"><label for="ed">Eksamensdato (gir nedtelling):</label> <input type="date" id="ed" value="${esc(S.examDate || '')}"></p>
      <p><button class="btn link" id="reset" type="button">Slett all lagret fremdrift</button> <span id="resetmsg" class="small" role="status"></span></p>`;
    $('#ed').onchange = (e) => { S.examDate = e.target.value; save(); routes[''](); };
    $('#reset').onclick = () => {
      if (!started && !examDone && !(S.mockLog || []).length) { $('#resetmsg').textContent = 'Det er ingenting å slette.'; return; }
      if (confirm('Slette all lagret fremdrift på denne enheten? Dette kan ikke angres.')) { S = blank(); save(); routes['']();  $('#resetmsg').textContent = 'Fremdriften er slettet.'; }
    };
  };

  // ---------- Eksamensanalyse ----------
  routes.analyse = () => {
    setTitle('Eksamensanalyse');
    const ys = years(), st = topicStats(), P = O.prediction;
    const cls = (v) => (v >= 25 ? 'h3' : v >= 12 ? 'h2' : 'h1');
    const heat = '<div class="tablewrap" tabindex="0" role="region" aria-label="Tema per år, kan rulles sidelengs"><table class="data heat"><thead><tr><th>Tema</th>' + ys.map((y) => `<th><span class="sr">20</span>${String(y).slice(2)}</th>`).join('') + '<th>Sett</th><th>Sist</th></tr></thead><tbody>' +
      st.map((t) => `<tr><th scope="row">${t.name}</th>` + ys.map((y) => { const v = t.row[y] || 0; return v ? `<td class="${cls(v)}">${Math.round(v)}</td>` : '<td class="z"><span aria-hidden="true">·</span><span class="sr">0</span></td>'; }).join('') + `<td>${t.count}/${ys.length}</td><td>${t.last || '–'}</td></tr>`).join('') + '</tbody></table></div>' +
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
      <p class="small muted">Tallene er omtrentlig prosent av settet (oppgavens vekt fordelt likt på deloppgavene). Kolonnene er årstall; 17 er mars 2017, resten er høsteksamener.</p>${heat}
      <h3>Hyppighet når de siste årene teller mest</h3>
      <p class="small muted">Hvert år teller 25 % mindre enn året etter. Obligasjoner, som bare har kommet i 2024 og 2025, får derfor høyere tall enn ren opptelling gir.</p>
      <div>${st.map((t) => `<div class="bar-row"><div>${t.name}</div><div class="bar-track" aria-hidden="true"><i style="width:${Math.round(t.recent * 100)}%"></i></div><div class="bar-val">${Math.round(t.recent * 100)} %</div></div>`).join('')}</div>
      <h3>Slik har settene vært bygget opp</h3>${struct}
      <p><b>Tre faser.</b> 2016–2020: prosjektanalyse, økonomisk levetid, lån eller portefølje, og stor skatteoppgave. 2021–2023: helt fast mal med prosjekt, annuitetslån, portefølje og WACC/skatt. 2024–2025: obligasjoner kommer inn, porteføljeoppgaven vokser, og 2025 har for første gang fem oppgaver.</p>
      <h2>Fellene som går igjen</h2>
      ${table(['Felle', 'Riktig behandling', 'Sett i'], P.traps, { cls: 'left wrap' })}
      <h2>Forbehold</h2>
      <p>Dette er et kvalifisert anslag, ikke en fasit. Samme foreleser har laget alle settene og strukturen har vært stabil, men 2024 og 2025 viser at nye temaer kan komme inn. Pensum er hele læreboka: bruk prognosen til å prioritere, ikke til å velge bort.</p>
      <p>Varighet og tillatte hjelpemidler sto ikke i eksamensfilene. Løsningsforslagene er regneark og godtar målsøking, så eksamen løses etter alt å dømme i Excel.</p>`;
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
    view.innerHTML = `<div class="crumbs"><a href="#/oving">Øv</a> › Kapittel ${g.chapter}</div>
      <h1>${g.title}</h1>
      <div class="taskbar"><span class="tag">Kap. ${g.chapter}</span><span class="tag">${LEVEL[g.level]}</span><span class="tag">ca. ${g.minutes} min</span>${g.examLike ? `<span class="tag warm">${g.examLike}</span>` : ''}
        <span class="spacer"></span><a href="#/tema/${g.chapter}">Teori til kapittel ${g.chapter}</a></div>
      <div class="task-text">${task.text}</div><div id="parts"></div>
      <p class="row noprint" style="margin-top:22px;padding-top:16px;border-top:3px solid var(--rule)"><button class="btn primary big" type="button" id="new">Ny oppgave med nye tall</button><button class="btn" type="button" id="all">Vis alle løsninger</button></p>
      <p class="small muted">Prosent tastes som prosent (12,34), beløp i hele kroner. Små avrundingsavvik godtas. Adressen i nettleseren gir nøyaktig denne oppgaven igjen (nr. ${seed}).</p>`;
    const R = renderParts(task, $('#parts'), { onFirst: (i, ok) => { st.tried++; if (ok) st.ok++; save(); } });
    $('#new').onclick = () => { taskView(id, U.newSeed()); view.focus(); };
    $('#all').onclick = (e) => { task.parts.forEach((_, i) => R.showSol(i)); e.target.disabled = true; };
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
  routes.prove = () => {
    clearInterval(timerId); setTitle('Prøveeksamen');
    if (!S.mock) {
      const log = S.mockLog || [];
      view.innerHTML = `<h1>Prøveeksamen 2026</h1>
        <p class="lead">Ett helt sett etter prognosen: prosjektanalyse (20 %), obligasjoner (10 %), lån eller en joker (20 %), portefølje (20 %) og WACC med nåverdi etter skatt (30 %).</p>
        <p class="row" style="margin:20px 0"><label for="dur">Tid</label> <select id="dur"><option value="240">4 timer</option><option value="300">5 timer</option><option value="180">3 timer</option><option value="0">Uten tidtaking</option></select>
        <button class="btn primary big" type="button" id="start">Start prøveeksamen</button></p>
        <p class="small muted">Ha Excel åpent – du taster bare sluttsvarene her. Svarene lagres underveis, så du kan lukke fanen og fortsette. Varigheten på den ordentlige eksamenen sto ikke i eksamensfilene; velg det emnebeskrivelsen sier.</p>
        <h2>Tidligere forsøk</h2>` +
        (log.length ? table(['Dato', 'Resultat', 'Tid brukt'], log.slice().reverse().map((x) => [x.date, `${x.score} %`, x.min + ' min'])) : '<p class="muted">Ingen ennå. Resultatene dine havner her.</p>');
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
    tick(); timerId = setInterval(tick, 1000);
    $('#print').onclick = () => print();
    $('#abort').onclick = () => { if (confirm('Avbryte prøveeksamenen? Svarene dine slettes og forsøket teller ikke.')) { S.mock = null; save(); routes.prove(); } };
    $('#submit').onclick = () => {
      const blankCount = nNum - countFilled();
      if (blankCount && !confirm(`${blankCount} av ${nNum} tallsvar er ikke fylt ut og gir null poeng. Levere likevel?`)) return;
      clearInterval(timerId);
      let total = 0; const rows = [];
      slots.forEach((s, i) => {
        const nums = s.task.parts.filter((p) => p.kind === 'num').length; let ok = 0;
        s.task.parts.forEach((p, j) => { if (p.kind === 'num' && RS[i].check(j, true) === 'ok') ok++; RS[i].showSol(j); });
        const share = nums ? ok / nums : 0; total += share * s.weight;
        rows.push([`<a href="#mo${i}" data-jump="mo${i}">Oppgave ${i + 1}</a>: ${s.task.gen.title}`, s.weight + ' %', `${ok} / ${nums}`, n(share * s.weight, 1) + ' %']);
      });
      const mins = Math.round((Date.now() - M.start) / 60000), score = Math.round(total);
      const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : score >= 40 ? 'E' : 'F';
      rows.push({ cells: ['Sum', '100 %', '', `${score} %`], cls: 'sum' });
      $('#result').innerHTML = `<h1>${score} % – omtrent karakter ${grade}</h1><p>Tid brukt: ${mins} minutter. Bare tallsvarene er rettet. Drøftingsdelene sammenligner du selv med momentlistene under. På den ordentlige eksamenen gis det også uttelling for riktig metode når sluttsvaret er feil, så dette er et forsiktig anslag.</p>` + table(['Oppgave', 'Vekt', 'Riktige tallsvar', 'Poeng'], rows, { cls: 'left' }) + '<p class="row"><button class="btn primary" type="button" id="again">Ny prøveeksamen</button></p>';
      (S.mockLog = S.mockLog || []).push({ date: new Date().toLocaleDateString('nb-NO'), score, min: mins }); S.mock = null; save();
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
        const related = [...new Set(t.topics.concat(...t.parts.map((p) => p.topics || [])).filter((k) => O.topics[k]).map((k) => O.topics[k].gens[0]))];
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
    if (!ch) {
      view.innerHTML = '<h1>Quiz</h1><p class="lead">Ti flervalgsspørsmål per runde om begreper, relevante kontantstrømmer og typiske feller.</p>' +
        '<p><a class="btn primary big" href="#/quiz/alle">Start blandet runde</a></p><h2>Eller velg kapittel</h2><ul class="rows">' +
        chs.map((c) => { const s = S.quiz[c]; return `<li><a class="rowlink" href="#/quiz/${c}"><span class="rl-title">Kapittel ${c} · ${chTitle(c)}</span><span class="rl-meta">${s && s.n ? `<b>${Math.round(s.ok / s.n * 100)} %</b> riktig av ${s.n} · ` : ''}${O.quiz.filter((q) => q.ch === c).length} spørsmål</span></a></li>`; }).join('') + '</ul>';
      return;
    }
    const pool = U.rng(U.newSeed()).shuffle(O.quiz.filter((q) => ch === 'alle' || String(q.ch) === String(ch))).slice(0, 10);
    if (!pool.length) return notFound('quiz for dette kapitlet', 'quiz', 'Velg et annet kapittel');
    let i = 0, right = 0; const missed = [];
    const show = () => {
      if (i >= pool.length) {
        view.innerHTML = `<h1>${right} av ${pool.length} riktige</h1>` + (missed.length ? '<h2>Disse bør du se på igjen</h2><ul class="keypoints">' + missed.map((q) => `<li><b>${q.q}</b><br>${q.options[q.correct]} – ${q.why} <a href="#/tema/${q.ch}">Kapittel ${q.ch}</a></li>`).join('') + '</ul>' : '<p>Alt riktig.</p>') +
          '<p class="row"><button class="btn primary" type="button" id="again">Ny runde</button><a href="#/quiz">Velg kapittel</a></p>';
        $('#again').onclick = () => routes.quiz(ch); view.focus(); return;
      }
      const q = pool[i], order = U.rng(U.newSeed()).shuffle([0, 1, 2, 3]);
      view.innerHTML = `<div class="crumbs"><a href="#/quiz">Quiz</a> › ${ch === 'alle' ? 'Blandet' : 'Kapittel ' + ch}</div>
        <p class="eyebrow">Spørsmål ${i + 1} av ${pool.length} · kapittel ${q.ch}</p><div class="progress" aria-hidden="true"><i style="width:${i / pool.length * 100}%"></i></div>
        <h2 style="border:0;margin-top:.8em" id="qq" tabindex="-1">${q.q}</h2><div id="opts" role="group" aria-labelledby="qq">${order.map((o) => `<button class="choice" type="button" data-o="${o}">${q.options[o]}</button>`).join('')}</div><div id="why" role="status"></div>`;
      $('#opts').onclick = (e) => {
        const b = e.target.closest('.choice'); if (!b || b.disabled) return; const ok = +b.dataset.o === q.correct;
        $$('.choice').forEach((x) => { x.disabled = true; if (+x.dataset.o === q.correct) x.classList.add('right'); }); if (!ok) { b.classList.add('wrong'); missed.push(q); } else right++;
        const s = S.quiz[q.ch] || (S.quiz[q.ch] = { n: 0, ok: 0 }); s.n++; if (ok) s.ok++; save();
        $('#why').innerHTML = `<div class="callout ${ok ? 'good' : 'bad'}"><b>${ok ? 'Riktig.' : 'Feil.'}</b> ${q.why}</div><button class="btn primary" type="button" id="nx">${i + 1 < pool.length ? 'Neste spørsmål' : 'Se resultat'}</button>`;
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
    drawNav(known ? (parts[0] === 'eksamen' ? 'eksamener' : parts[0]) : '');
    if (!known) { setTitle('Fant ikke siden'); notFound('siden', '', 'Til forsiden'); }
    else routes[parts[0]](parts[1], parts[2]);
    scrollTo(0, 0);
    if (!firstLoad) view.focus({ preventScroll: true });
    firstLoad = false;
  }
  addEventListener('hashchange', route);
  route();
})();
