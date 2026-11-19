// Palavras: all words from the book glossary (units 1–10), three levels.
// Level 1 remember (word → pick the meaning), Level 2 like Lingvist (sentence + hints, type the word),
// Level 3 exam (sentence with a gap, no hints). Progress per word in S.words, kept out of S.log / S.mistakes.

const POS_NAME = {
  en: { noun: "noun", verb: "verb", adjective: "adjective", adverb: "adverb", phrase: "phrase", number: "number", other: "word" },
  ru: { noun: "существительное", verb: "глагол", adjective: "прилагательное", adverb: "наречие", phrase: "фраза", number: "числительное", other: "слово" },
};
let PW = null; // the running session
const pwOpts = () => Object.assign({ lang: "en", p: true, type: "all", geo: true }, S.wordOpts || {});
// countries, cities, nationalities and languages (units 2–4): can be skipped in Settings
const pwIsGeo = w => /^[A-Z]/.test(w.en) && ["2", "3", "4"].includes(String(w.u)) && w.pos !== "phrase";
// word types for the filter
const pwIsVerb = w => w.pos === "verb" || /^to /.test(w.en);
const PW_TYPES = [["all", "All words"], ["verb", "Only verbs"], ["noun", "Only nouns"], ["adjective", "Only adjectives"]];
const pwTypeOk = w => { const t = pwOpts().type; return t === "all" || (t === "verb" ? pwIsVerb(w) : w.pos === t && !pwIsVerb(w)); };
const pwLang = () => pwOpts().lang === "ru" ? "ru" : "en";
const pwTr = w => w[pwLang()] || w.en;
const pwSt = id => (S.words || {})[id] || {};
function pwUnitOk(u, w) {
  if (w && !pwOpts().geo && pwIsGeo(w)) return false;
  if (/^P/.test(u)) return pwOpts().p;
  return inUnits(+u);
}
function pwPool(lvl) {
  // Level 2 takes only words passed on Level 1 (or “I know this word”), Level 3 only words passed on Level 2
  return WORDS.filter(w => pwUnitOk(w.u, w) && pwTypeOk(w) && (lvl === 1 || (w.s && pwStage(w.id) >= lvl - 1)));
}
function pwLabel(w) { return (w.art && w.art !== "o/a" ? w.art + " " : "") + w.w; }
// Progress per word and level: s1/s2/s3 = right answers in a row on that level, w1/w2/w3 = mistakes on that level.
// A level is passed after 2 right in a row; a mistake starts that level again. Passing a harder level counts the easier ones.
// Learned = Level 3 (exam) passed.
const PW_NEED = 2;
function pwRec(id) {
  const s = Object.assign({}, pwSt(id));
  if (s.s1 === undefined) { // older records: only total counters
    s.s1 = Math.max(0, Math.min(PW_NEED, (s.c || 0) - (s.w || 0)));
    s.s2 = Math.min(PW_NEED, s.l2 || 0); s.s3 = Math.min(PW_NEED, s.l3 || 0);
  }
  return s;
}
function pwStage(id) {
  const s = pwRec(id);
  return s.s3 >= PW_NEED ? 3 : s.s2 >= PW_NEED ? 2 : (s.k || s.s1 >= PW_NEED) ? 1 : 0;
}
function pwMark(w, ok, lvl) {
  S.words = S.words || {};
  const s = pwRec(w.id), st = "s" + lvl;
  if (ok) { s.c = (s.c || 0) + 1; s[st] = (s[st] || 0) + 1; if (lvl >= 2) s["l" + lvl] = (s["l" + lvl] || 0) + 1; }
  else { s.w = (s.w || 0) + 1; s["w" + lvl] = (s["w" + lvl] || 0) + 1; s["b" + lvl] = s[st] || 0; s[st] = 0; }
  s.d = dayKey();
  S.words[w.id] = s; save();
}
const pwLearned = w => pwStage(w.id) >= 3;
function pwPick(lvl, n) {
  const pool = pwPool(lvl);
  // first: words ready for this level (easier level passed), with mistakes; last: words already passed here
  const score = w => { const s = pwRec(w.id), g = pwStage(w.id);
    return (g >= lvl ? 1000 : 0) + (g === lvl - 1 ? -20 : 0) + (s["s" + lvl] || 0) * 3 - (s["w" + lvl] || 0) * 4 + (s.d === dayKey() ? 6 : 0) + Math.random() * 4; };
  return pool.map(w => [score(w), w]).sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1]);
}
function pwStart(lvl) {
  const n = lvl === 1 ? 10 : 20, cards = shuffle(pwPick(lvl, n));
  if (!cards.length) return;
  PW = { lvl, cards, i: 0, done: 0, total: cards.length, state: "ask", right: 0, again: new Set(), opts: null };
  go("palq");
}
// words that look alike in meaning: never offered as wrong options for each other (too confusing)
const PW_GROUPS = [["este/esta", "isto", "aqui"], ["esse/essa", "isso", "aí"], ["aquele", "aquilo", "ali"],
  ["Não percebo!", "Não compreendo!"], ["Muito gosto!", "Muito prazer!"], ["Até logo!", "Até já!"], ["Tudo bem?", "Como está?", "Estás bom/boa?"], ["lindo", "bonito", "giro"], ["mulher, a", "senhora, a"]];
// small words of the same kind are the wrong options for each other (dele → meu, nosso, tu…), so the answer is not obvious
const PW_KINDS = {
  person: "eu|tu|você|ele/ela|nós|vocês|meu/minha|teu/tua|seu/sua|dele/dela|deles/delas|nosso|vosso",
  point: "este/esta|esse/essa|aquele|isto|isso|aquilo|aqui|aí|ali",
  ask: "qual|quanto|o que|que|quem|onde|como|Porquê?|Como?",
  link: "até|com|em|mas|ou|porque|sem|cerca de|fora (de)|perto (de)|longe",
  how: "agora|ainda|já|só|também|muito|pouco|bastante|normalmente|felizmente|infelizmente|nada|não|se calhar|às vezes|um pouco (de)",
  hello: "Olá!|Bom dia!|Boa tarde!|Boa noite!|Adeus!|Até amanhã!|Até logo!|Até já!|Até à próxima!|Tudo bem?|Como está?|Estás bom/boa?",
  polite: "Desculpe!|por favor|Obrigado!|Muito gosto!|Muito prazer!|Aqui está!|Que pena!|Boa estadia!|Boas férias!|Mais alguma coisa?",
  class: "Não compreendo!|Não percebo!|Não sei.|Como se diz...?|Como se escreve?|O que significa?",
  feel: "estar com calor|estar com fome|estar com frio|estar com sede|estar com sono|estar pronto",
  amount: "por dia|por semana|em média|de altura média|à noite|água com gás",
};
const PW_KIND = {};
Object.entries(PW_KINDS).forEach(([k, v]) => v.split("|").forEach(x => { if (!PW_KIND[x]) PW_KIND[x] = k; }));
const pwKind = w => PW_KIND[w.w] || w.pos || "";
// este / esse / aquele differ only in the (near me / near you / far) note: they are told apart by distance groups, not by words
const pwBoth = (a, b) => pwKind(a) === "point" && pwKind(b) === "point";
const pwGroup = w => PW_GROUPS.findIndex(g => g.includes(w.w) || g.includes(w.w + ", " + w.art));
// common little words do not make two meanings look alike (Как это пишется? vs Как сказать?)
const PW_STOP = new Set("как это что кто где мне быть хотеть the you how what are can say not have".split(" "));
const pwToks = t => new Set(String(t).toLowerCase().replace(/\([^)]*\)/g, " ").split(/[^a-zа-яё]+/i).filter(x => x.length > 2 && !PW_STOP.has(x)));
function pwOptions(w) {
  const g = pwGroup(w), mine = pwToks(pwTr(w));
  const pool = WORDS.filter(x => x.id !== w.id && (pwOpts().geo || !pwIsGeo(x)) && pwTr(x) !== pwTr(w) && (g < 0 || pwGroup(x) !== g) && (pwBoth(w, x) || ![...pwToks(pwTr(x))].some(t => mine.has(t))));
  // harder: wrong options are the same part of speech, from the same or nearby units
  const un = u => u === "P1" ? 4.5 : u === "P2" ? 8.5 : +u;
  const near = x => Math.abs(un(x.u) - un(w.u));
  // a question is offered with questions, an exclamation with exclamations (the ? or ! must not give the answer away)
  const mark = x => (pwTr(x).trim().match(/[?!]$/) || [""])[0], mk = mark(w);
  const same = pool.filter(x => pwKind(x) === pwKind(w));
  const okMark = x => !mk || mark(x) === mk;
  const tier = f => shuffle(same.filter(x => okMark(x) && f(x)));
  const cand = [...tier(x => x.u === w.u), ...tier(x => x.u !== w.u && near(x) <= 2), ...tier(x => near(x) > 2),
    ...shuffle(pool.filter(x => mk && mark(x) === mk && (x.pos || "") === (w.pos || ""))), ...shuffle(pool.filter(x => mk && mark(x) === mk)),
    ...shuffle(same), ...shuffle(pool.filter(x => (x.pos || "") === (w.pos || ""))), ...shuffle(pool)];
  // the wrong options must not look alike either (two near-same options = both obviously wrong)
  const opts = [];
  for (const x of cand) {
    if (opts.length === 3) break;
    const tx = pwToks(pwTr(x)), gx = pwGroup(x);
    if (opts.some(y => pwTr(y) === pwTr(x) || (gx >= 0 && pwGroup(y) === gx) || (!pwBoth(x, y) && [...pwToks(pwTr(y))].some(t => tx.has(t))))) continue;
    opts.push(x);
  }
  return shuffle([w, ...opts]);
}

function palavras() {
  const L = S.wordLvl || 1, o = pwOpts(), all = pwPool(1), learned = all.filter(pwLearned).length;
  const units = [...new Set(all.map(w => w.u))];
  return `${topbar("home", "Home")}
    <div><p class="eyebrow">Palavras · words from the book</p><h1>Words</h1>
      <p class="muted">${all.length} words from ${unitLabel().toLowerCase()}${o.p ? " + Português em Ação (P)" : ""}. Learned: <b>${learned}</b>. <button class="linkbtn" data-go="palstats">My words →</button></p></div>
    <div class="segs" role="group" aria-label="Level">
      <button class="${L === 1 ? "on" : ""}" data-pwlvl="1">1 · Remember</button>
      <button class="${L === 2 ? "on" : ""}" data-pwlvl="2">2 · Lingvist</button>
      <button class="${L === 3 ? "on" : ""}" data-pwlvl="3">3 · Exam</button></div>
    <p class="small muted">${L === 1 ? "See a word, hear it, pick what it means. Tap “I know it” to skip words you already know. 10 words per set."
      : L === 2 ? "A sentence with a gap, plus the word's meaning and the whole sentence translated. Type the word. A wrong word comes back later. 20 per set."
      : "A sentence with a gap and no hints at all, like on the exam. Type the word. 20 per set."}</p>
    <div class="chips">${PW_TYPES.map(([k, t]) => `<button class="chip ${o.type === k ? "on" : ""}" data-pwtype="${k}">${t} · ${WORDS.filter(w => pwUnitOk(w.u, w) && (k === "all" || (k === "verb" ? pwIsVerb(w) : w.pos === k && !pwIsVerb(w)))).length}</button>`).join("")}</div>
    ${L > 1 ? `<p class="small muted">Only words you passed on Level ${L - 1}: <b>${pwPool(L).length}</b> ready.</p>` : ""}
    ${pwPool(L).length ? `<button class="btn" data-pwgo>Start · ${Math.min(L === 1 ? 10 : 20, pwPool(L).length)} ${o.type === "verb" ? "verbs" : "words"}</button>`
      : `<p class="small">No words are ready for this level yet. Pass some words on Level ${L - 1} first (2 right in a row, or “I know this word” on Level 1).</p>`}
    <div class="exsec"><h2>Settings</h2>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <span class="small muted" style="align-self:center">Translation:</span>
        <button class="chip ${o.lang === "en" ? "on" : ""}" data-pwlang="en">English</button>
        <button class="chip ${o.lang === "ru" ? "on" : ""}" data-pwlang="ru">Русский</button></div>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <span class="small muted" style="align-self:center">“Português em Ação” 1–2 (café, plane, border):</span>
        <button class="chip ${o.p ? "on" : ""}" data-pwp="1">Include</button>
        <button class="chip ${!o.p ? "on" : ""}" data-pwp="0">Skip</button></div>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <span class="small muted" style="align-self:center">Countries, cities, nationalities, languages (${WORDS.filter(pwIsGeo).length} words):</span>
        <button class="chip ${o.geo ? "on" : ""}" data-pwgeo="1">Include</button>
        <button class="chip ${!o.geo ? "on" : ""}" data-pwgeo="0">Skip</button></div>
      <button class="unitchip" data-go="units">${unitLabel()} · change</button></div>`;
}

function palq() {
  if (!PW) return palavras();
  if (PW.i >= PW.cards.length) return pwResult();
  const w = PW.cards[PW.i], L = PW.lvl, lang = pwLang();
  const bar = `<div class="pwbar"><span>${PW.done}/${PW.total}</span><div><i style="width:${PW.done / PW.total * 100}%"></i></div></div>`;
  const play = t => `<button class="pwplay" data-say="${String(t).replace(/"/g, "&quot;")}" aria-label="Listen">${icon.play}</button>`;
  const full = (w.s || "").replace(/\[\[(.+?)\]\]/, "$1");
  const sentHtml = (fill) => (w.s || "").replace(/\[\[(.+?)\]\]/, (m, x) => fill(x));
  if (L === 1) {
    if (!PW.opts) PW.opts = pwOptions(w);
    const ans = PW.state !== "ask";
    return `${topbar("palavras", "Stop")}${bar}
      <div class="pwcard"><div class="pwword">${pwLabel(w)} ${play(pwLabel(w))}</div>
        ${w.pos && w.pos !== "other" ? `<div class="small muted">${POS_NAME[lang][w.pos] || ""}</div>` : ""}</div>
      <div class="opts">${PW.opts.map((o, k) => {
        const cls = ans && o.id === w.id ? "ok" : ans && k === PW.picked ? "no" : "";
        return `<button class="opt ${cls}" data-pwopt="${k}" ${ans ? "disabled" : ""}>${pwTr(o).replace(/[.!?]$/, "")}</button>`; }).join("")}</div>
      ${ans ? `<div class="why ${PW.state === "right" ? "ok" : "no"}"><strong>${PW.state === "right" ? "Certo!" : "Not quite"}</strong>
          <span><b>${pwLabel(w)}</b> = ${pwTr(w)}</span>
          ${w.s ? `<span class="pt">${sentHtml(x => `<b>${x}</b>`)}</span><span class="muted">= ${lang === "ru" ? w.sru : w.sen}</span>${play(full)}` : ""}</div>
        <button class="btn" data-pwnext>Next</button>`
      : `<button class="btn ghost" data-pwknow>✓ I know this word</button>`}`;
  }
  // Level 2 (Lingvist) and Level 3 (exam)
  const st = PW.state, val = PW.typed || "";
  const ansW = w.a[0], size = Math.max(4, ansW.length + 1);
  const input = `<input id="pwa" class="pwin ${st === "right" ? "ok" : st === "near" ? "near" : st === "retype" ? "no" : ""}" size="${size}" value="${val.replace(/"/g, "&quot;")}" ${st === "right" || st === "near" ? "disabled" : ""}
    autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" aria-label="The missing word">`;
  const hints = L === 2 || st !== "ask";
  return `${topbar("palavras", "Stop")}${bar}
    <div class="pwcard pwsent"><p class="pwline">${sentHtml(() => input)}</p>
      ${L === 2 ? `<div class="pwhint">${w.pos && w.pos !== "other" ? `<span class="small muted">${POS_NAME[lang][w.pos] || ""}</span>` : ""}
        <b>${pwTr(w)}</b><span class="muted">${lang === "ru" ? w.sru : w.sen}</span></div>` : ""}
      ${L === 3 && st !== "ask" ? `<div class="pwhint"><b>${pwLabel(w)} = ${pwTr(w)}</b><span class="muted">${lang === "ru" ? w.sru : w.sen}</span></div>` : ""}</div>
    ${st === "retype" ? `<p class="small" style="color:var(--bad)">The word is <b>${ansW}</b>. Type it once to remember it.${PW.lastWrong ? ` <button class="linkbtn" data-pwmine>My word “${PW.lastWrong.replace(/</g, "&lt;")}” is right too</button>` : ""}</p>` : ""}
    ${st === "near" ? `<p class="small" style="color:var(--warn)">Almost! Watch the accents: <b>${ansW}</b></p>` : ""}
    ${st === "right" || st === "near" ? `<div class="row">${play(full)}<button class="btn" data-pwnext>Next</button></div>`
      : `<div class="accents">${ACC.map(ch => `<button type="button" class="acc" data-acc="${ch}">${ch}</button>`).join("")}</div>
         <div class="row"><button class="btn" data-pwcheck>Check</button>${st === "ask" ? `<button class="btn ghost" data-pwshow>Show</button>` : ""}</div>`}
    ${hints ? "" : ""}`;
}
function pwResult() {
  const n = PW.total, r = PW.right;
  return `${topbar("palavras", "Words")}
    <div class="exsec"><p class="eyebrow">Level ${PW.lvl} · done</p><div class="score">${r}<span style="font-size:24px"> / ${n}</span></div>
      <p>${r === n ? "Perfect!" : r >= n * 0.7 ? "Good. The missed words will come back first next time." : "The missed words will come back first next time."}</p>
      <div class="row"><button class="btn" data-pwgo>Next set</button><button class="btn ghost" data-go="palstats">My words</button></div></div>`;
}
function pwCheck() {
  const w = PW.cards[PW.i], el = document.getElementById("pwa"); if (!el) return;
  const v = el.value; PW.typed = v; if (!v.trim()) return;
  const r = judge(v, w.a);
  if (PW.state === "retype") { if (r !== "bad") { PW.state = "right"; speak(w.s.replace(/\[\[(.+?)\]\]/, "$1")); } return render(); }
  if (r === "ok" || r === "near") {
    PW.state = r === "ok" ? "right" : "near";
    if (!PW.again.has(w.id)) PW.right++;
    pwMark(w, true, PW.lvl);
    speak(w.s.replace(/\[\[(.+?)\]\]/, "$1"));
  } else {
    pwMark(w, false, PW.lvl);
    if (!PW.again.has(w.id)) { PW.again.add(w.id); PW.cards.push(w); }
    PW.state = "retype"; PW.lastWrong = v; PW.typed = "";
  }
  render();
}
function pwClick(t) {
  if (t.dataset.pwlvl) { S.wordLvl = +t.dataset.pwlvl; save(); return render(); }
  if (t.dataset.pwlang) { S.wordOpts = Object.assign(pwOpts(), { lang: t.dataset.pwlang }); save(); return render(); }
  if (t.dataset.pwtype) { S.wordOpts = Object.assign(pwOpts(), { type: t.dataset.pwtype }); save(); return render(); }
  if (t.dataset.pwstat) { S.pwStatF = t.dataset.pwstat; save(); return render(); }
  if (t.dataset.pwgeo) { S.wordOpts = Object.assign(pwOpts(), { geo: t.dataset.pwgeo === "1" }); save(); return render(); }
  if (t.dataset.pwp) { S.wordOpts = Object.assign(pwOpts(), { p: t.dataset.pwp === "1" }); save(); return render(); }
  if (t.hasAttribute("data-pwgo")) return pwStart(S.wordLvl || 1);
  if (!PW) return;
  const w = PW.cards[PW.i];
  if (t.dataset.pwopt !== undefined) {
    if (PW.state !== "ask") return;
    PW.picked = +t.dataset.pwopt; const ok = PW.opts[PW.picked].id === w.id;
    PW.state = ok ? "right" : "wrong"; if (ok && !PW.again.has(w.id)) PW.right++;
    pwMark(w, ok, 1); speak(pwLabel(w));
    if (!ok && !PW.again.has(w.id)) { PW.again.add(w.id); PW.cards.push(w); }
    return render();
  }
  if (t.hasAttribute("data-pwknow")) { S.words = S.words || {}; S.words[w.id] = Object.assign(pwRec(w.id), { k: 1, d: dayKey() }); save(); PW.right++; PW.done++; PW.i++; PW.opts = null; PW.state = "ask"; return render(); }
  if (t.hasAttribute("data-pwshow")) { pwMark(w, false, PW.lvl); if (!PW.again.has(w.id)) { PW.again.add(w.id); PW.cards.push(w); } PW.state = "retype"; PW.lastWrong = ""; PW.typed = ""; return render(); }
  if (t.hasAttribute("data-pwcheck")) return pwCheck();
  if (t.hasAttribute("data-pwmine")) {
    // undo the wrong mark: count it as right and take the word out of the repeat queue
    const s = pwRec(w.id), L = PW.lvl; s.w = Math.max(0, (s.w || 1) - 1); s["w" + L] = Math.max(0, (s["w" + L] || 1) - 1); s.c = (s.c || 0) + 1;
    s["s" + L] = (s["b" + L] || 0) + 1; if (L >= 2) s["l" + L] = (s["l" + L] || 0) + 1; S.words[w.id] = s; save();
    const j = PW.cards.lastIndexOf(w); if (j > PW.i) PW.cards.splice(j, 1); PW.again.delete(w.id);
    PW.right++; PW.state = "right"; PW.typed = PW.lastWrong; PW.lastWrong = ""; return render();
  }
  if (t.hasAttribute("data-pwnext")) { PW.done = Math.min(PW.total, PW.done + (PW.again.has(w.id) && PW.i >= PW.total ? 0 : 1)); PW.i++; PW.opts = null; PW.picked = null; PW.state = "ask"; PW.typed = ""; PW.lastWrong = ""; return render(); }
}

// My words: progress per word
const PW_FILTERS = [["all", "All"], ["hard", "Hard"], ["3", "Learned"], ["2", "Level 2 passed"], ["1", "Level 1 passed"], ["0", "Not yet"]];
function palstats() {
  const all = pwPool(1), f = S.pwStatF || "all", n = [0, 0, 0, 0];
  const info = all.map(w => { const s = pwRec(w.id), g = pwStage(w.id); n[g]++; return { w, s, g, bad: (s.w || 0), seen: !!(s.c || s.w || s.k) }; });
  const hard = x => x.g < 3 && x.bad >= 2;
  const cnt = k => k === "all" ? all.length : k === "hard" ? info.filter(hard).length : n[+k];
  const list = info.filter(x => f === "all" || (f === "hard" ? hard(x) : x.g === +f))
    .sort((a, b) => f === "hard" ? b.bad - a.bad : (b.g - a.g) || (b.seen - a.seen) || (b.bad - a.bad));
  const dot = (s, g, L) => { const done = g >= L, half = !done && (s["s" + L] || 0) > 0;
    return `<i class="pwdot ${done ? "on" : half ? "half" : ""}" title="Level ${L}"></i>`; };
  const pct = k => (n[k] / Math.max(1, all.length) * 100).toFixed(1);
  return `${topbar("palavras", "Words")}
    <div><p class="eyebrow">Palavras · progress</p><h1>My words</h1>
      <p class="muted">${n[3]} of ${all.length} learned.</p></div>
    <div class="pwmeter" aria-hidden="true"><i class="g3" style="width:${pct(3)}%"></i><i class="g2" style="width:${pct(2)}%"></i><i class="g1" style="width:${pct(1)}%"></i></div>
    <p class="small muted">Each dot is a level: Remember · Lingvist · Exam. A level is passed after <b>2 right answers in a row</b> (half dot = 1 so far). A mistake starts that level again. Passing a harder level counts the easier ones too. A word is <b>learned</b> when Level 3 is passed. “Hard” = 2+ mistakes and not learned yet.</p>
    <div class="chips">${PW_FILTERS.map(([k, t]) => `<button class="chip ${f === k ? "on" : ""}" data-pwstat="${k}">${t} · ${cnt(k)}</button>`).join("")}</div>
    <div class="pwlist">${list.map(({ w, s, g, bad }) => `<div class="pwrow${g >= 3 ? " done" : ""}"><span class="pwdots">${dot(s, g, 1)}${dot(s, g, 2)}${dot(s, g, 3)}</span>
      <span class="pt">${pwLabel(w)}</span><span class="muted">${pwTr(w)}</span>${bad ? `<span class="pwbad">✗${bad}</span>` : ""}</div>`).join("") || `<p class="muted">No words here yet.</p>`}</div>`;
}
