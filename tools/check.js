/* Kjør: node tools/check.js  — laster alle skript og røyk-tester generatorer og data. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]).filter((s) => !/app\.js$/.test(s));
const ctx = { console, Intl, Math, Number, String, Array, Object, JSON, Date, parseFloat, isFinite, isNaN };
ctx.globalThis = ctx; vm.createContext(ctx);
for (const s of scripts) vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s });
const O = ctx.OKAD; let bad = 0;
const N = +process.argv[2] || 300;
for (const g of O.gens) {
  for (let seed = 1; seed <= N; seed++) {
    let t;
    try { t = O.make(g.id, seed); } catch (e) { console.log('FEIL', g.id, seed, e.message); bad++; break; }
    const all = t.text + t.parts.map((p) => p.q + (p.sol || '') + (p.hint || '') + (p.points || []).join('')).join('');
    if (/NaN|undefined|Infinity|\[object/.test(all)) { console.log('UGYLDIG TEKST', g.id, seed, all.match(/.{40}(NaN|undefined|Infinity|\[object).{20}/)?.[0]); bad++; break; }
    for (const p of t.parts) {
      if (p.kind === 'num' && !Number.isFinite(p.answer)) { console.log('UGYLDIG SVAR', g.id, seed, p.label); bad++; }
      if (p.kind === 'num' && O.check(p, O.fmtAnswer(p)) !== 'ok') { console.log('FASIT SJEKKER IKKE SEG SELV', g.id, seed, p.label, O.fmtAnswer(p)); bad++; }
      if (p.kind === 'text' && !(p.points && p.points.length) && !p.sol) { console.log('MANGLER PUNKTER', g.id, p.label); bad++; }
    }
  }
}
console.log(`${O.gens.length} generatorer × ${N} frø`, bad ? `– ${bad} problemer` : '– OK');
if (O.exams) console.log('eksamener:', O.exams.map((e) => e.id + ':' + e.tasks.length).join(' '));
if (O.theory) console.log('teori-kapitler:', O.theory.map((c) => c.nr).join(','));
if (O.quiz) console.log('quiz-spørsmål:', O.quiz.length);
process.exit(bad ? 1 : 0);
