// Palavras: all words from the book glossary (units 1–10), three levels.
// Level 1 remember (word → pick the meaning), Level 2 like Lingvist (sentence + hints, type the word),
// Level 3 exam (sentence with a gap, no hints). Progress per word in S.words, kept out of S.log / S.mistakes.

const POS_NAME = {
  en: { noun: "noun", verb: "verb", adjective: "adjective", adverb: "adverb", phrase: "phrase", number: "number", other: "word" },
  ru: { noun: "существительное", verb: "глагол", adjective: "прилагательное", adverb: "наречие", phrase: "фраза", number: "числительное", other: "слово" },
};
let PW = null; // the running session
const pwOpts = () => Object.assign({ lang: "en", p: true, type: "all" }, S.wordOpts || {});
// word types for the filter
const pwIsVerb = w => w.pos === "verb" || /^to /.test(w.en);
const PW_TYPES = [["all", "All words"], ["verb", "Only verbs"], ["noun", "Only nouns"], ["adjective", "Only adjectives"]];
const pwTypeOk = w => { const t = pwOpts().type; return t === "all" || (t === "verb" ? pwIsVerb(w) : w.pos === t && !pwIsVerb(w)); };
const pwLang = () => pwOpts().lang === "ru" ? "ru" : "en";
const pwTr = w => w[pwLang()] || w.en;
const pwSt = id => (S.words || {})[id] || {};
function pwUnitOk(u) {
  if (/^P/.test(u)) return pwOpts().p;
  return inUnits(+u);
}
function pwPool(lvl) {
  return WORDS.filter(w => pwUnitOk(w.u) && pwTypeOk(w) && (lvl === 1 || w.s));
}
function pwLabel(w) { return (w.art && w.art !== "o/a" ? w.art + " " : "") + w.w; }
function pwMark(w, ok, lvl) {
  S.words = S.words || {};
  const s = Object.assign({}, S.words[w.id] || {});
  if (ok) s.c = (s.c || 0) + 1; else s.w = (s.w || 0) + 1;
  if (lvl >= 2 && ok) s["l" + lvl] = (s["l" + lvl] || 0) + 1;
  s.d = dayKey();
  S.words[w.id] = s; save();
}
// learned: Level 1 known or answered right at least twice more than wrong
const pwLearned = w => { const s = pwSt(w.id); return s.k || (s.c || 0) - (s.w || 0) >= 2; };
function pwPick(lvl, n) {
  const pool = pwPool(lvl);
  const score = w => { const s = pwSt(w.id); return (s.k ? (lvl === 1 ? 1000 : 40) : 0) + (s.c || 0) * 3 - (s.w || 0) * 4 + (s.d === dayKey() ? 6 : 0) + Math.random() * 4; };
  return pool.map(w => [score(w), w]).sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1]);
}
function pwStart(lvl) {
  const n = lvl === 1 ? 10 : 20, cards = shuffle(pwPick(lvl, n));
  if (!cards.length) return;
  PW = { lvl, cards, i: 0, done: 0, total: cards.length, state: "ask", right: 0, again: new Set(), opts: null };
  go("palq");
}
// words that look alike in meaning: never offered as wrong options for each other (too confusing)
const PW_GROUPS = [["este/esta", "esse/essa", "aquele", "isto", "isso", "aquilo", "aqui", "aí", "ali"],
  ["meu/minha", "teu/tua", "seu/sua", "nosso", "vosso", "dele/dela", "deles/delas"], ["eu", "tu", "você", "ele/ela", "nós", "vocês"],
  ["Não percebo!", "Não compreendo!", "Não sei."], ["Muito gosto!", "Muito prazer!"], ["Olá!", "Bom dia!", "Boa tarde!", "Boa noite!"],
  ["Até amanhã!", "Até logo!", "Até já!", "Até à próxima!", "Adeus!"], ["lindo", "bonito", "giro"], ["mulher, a", "senhora, a"]];
const pwGroup = w => PW_GROUPS.findIndex(g => g.includes(w.w) || g.includes(w.w + ", " + w.art));
const pwToks = t => new Set(String(t).toLowerCase().replace(/\([^)]*\)/g, " ").split(/[^a-zа-яё]+/i).filter(x => x.length > 2));
function pwOptions(w) {
  const g = pwGroup(w), mine = pwToks(pwTr(w));
  const pool = WORDS.filter(x => x.id !== w.id && pwTr(x) !== pwTr(w) && (g < 0 || pwGroup(x) !== g) && ![...pwToks(pwTr(x))].some(t => mine.has(t)));
  const same = shuffle(pool.filter(x => (x.pos || "") === (w.pos || "") && x.u === w.u));
  const rest = shuffle(pool);
  const opts = [...same, ...rest].filter((x, i, a) => a.findIndex(y => pwTr(y) === pwTr(x)) === i).slice(0, 3);
  return shuffle([w, ...opts]);
}

function palavras() {
  const L = S.wordLvl || 1, o = pwOpts(), all = pwPool(1), learned = all.filter(pwLearned).length;
  const units = [...new Set(all.map(w => w.u))];
  return `${topbar("home", "Home")}
    <div><p class="eyebrow">Palavras · words from the book</p><h1>Words</h1>
      <p class="muted">${all.length} words from ${unitLabel().toLowerCase()}${o.p ? " + Português em Ação (P)" : ""}. Learned: <b>${learned}</b>.</p></div>
    <div class="segs" role="group" aria-label="Level">
      <button class="${L === 1 ? "on" : ""}" data-pwlvl="1">1 · Remember</button>
      <button class="${L === 2 ? "on" : ""}" data-pwlvl="2">2 · Lingvist</button>
      <button class="${L === 3 ? "on" : ""}" data-pwlvl="3">3 · Exam</button></div>
    <p class="small muted">${L === 1 ? "See a word, hear it, pick what it means. Tap “I know it” to skip words you already know. 10 words per set."
      : L === 2 ? "A sentence with a gap, plus the word's meaning and the whole sentence translated. Type the word. A wrong word comes back later. 20 per set."
      : "A sentence with a gap and no hints at all, like on the exam. Type the word. 20 per set."}</p>
    <div class="chips">${PW_TYPES.map(([k, t]) => `<button class="chip ${o.type === k ? "on" : ""}" data-pwtype="${k}">${t} · ${WORDS.filter(w => pwUnitOk(w.u) && (k === "all" || (k === "verb" ? pwIsVerb(w) : w.pos === k && !pwIsVerb(w)))).length}</button>`).join("")}</div>
    <button class="btn" data-pwgo>Start · ${Math.min(L === 1 ? 10 : 20, pwPool(L).length)} ${o.type === "verb" ? "verbs" : "words"}</button>
    <div class="exsec"><h2>Settings</h2>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <span class="small muted" style="align-self:center">Translation:</span>
        <button class="chip ${o.lang === "en" ? "on" : ""}" data-pwlang="en">English</button>
        <button class="chip ${o.lang === "ru" ? "on" : ""}" data-pwlang="ru">Русский</button></div>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <span class="small muted" style="align-self:center">“Português em Ação” 1–2 (café, plane, border):</span>
        <button class="chip ${o.p ? "on" : ""}" data-pwp="1">Include</button>
        <button class="chip ${!o.p ? "on" : ""}" data-pwp="0">Skip</button></div>
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
        return `<button class="opt ${cls}" data-pwopt="${k}" ${ans ? "disabled" : ""}>${pwTr(o)}</button>`; }).join("")}</div>
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
      <div class="row"><button class="btn" data-pwgo>Next set</button><button class="btn ghost" data-go="palavras">Words</button></div></div>`;
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
  if (t.hasAttribute("data-pwknow")) { S.words = S.words || {}; S.words[w.id] = Object.assign({}, S.words[w.id], { k: 1, d: dayKey() }); save(); PW.right++; PW.done++; PW.i++; PW.opts = null; PW.state = "ask"; return render(); }
  if (t.hasAttribute("data-pwshow")) { pwMark(w, false, PW.lvl); if (!PW.again.has(w.id)) { PW.again.add(w.id); PW.cards.push(w); } PW.state = "retype"; PW.lastWrong = ""; PW.typed = ""; return render(); }
  if (t.hasAttribute("data-pwcheck")) return pwCheck();
  if (t.hasAttribute("data-pwmine")) {
    // undo the wrong mark: count it as right and take the word out of the repeat queue
    const s = Object.assign({}, (S.words || {})[w.id]); s.w = Math.max(0, (s.w || 1) - 1); s.c = (s.c || 0) + 1; S.words[w.id] = s; save();
    const j = PW.cards.lastIndexOf(w); if (j > PW.i) PW.cards.splice(j, 1); PW.again.delete(w.id);
    PW.right++; PW.state = "right"; PW.typed = PW.lastWrong; PW.lastWrong = ""; return render();
  }
  if (t.hasAttribute("data-pwnext")) { PW.done = Math.min(PW.total, PW.done + (PW.again.has(w.id) && PW.i >= PW.total ? 0 : 1)); PW.i++; PW.opts = null; PW.picked = null; PW.state = "ask"; PW.typed = ""; PW.lastWrong = ""; return render(); }
}
