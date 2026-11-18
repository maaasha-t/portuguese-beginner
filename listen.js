// Listen to the lesson: reads the explanation and the words aloud.
// Portuguese parts with a pt-PT voice, English parts with an English voice.

let enVoice = null;
function pickEnVoice() {
  if (!("speechSynthesis" in window)) return;
  const vs = speechSynthesis.getVoices();
  enVoice = vs.find(v => v.lang === "en-GB" && /Daniel|Serena|Kate|Arthur|Martha/i.test(v.name)) || vs.find(v => v.lang === "en-GB") || vs.find(v => v.lang === "en-US") || vs.find(v => /^en/.test(v.lang)) || null;
}
if ("speechSynthesis" in window) { pickEnVoice(); speechSynthesis.addEventListener && speechSynthesis.addEventListener("voiceschanged", pickEnVoice); }

const EN_WORDS = new Set(("the is are am was be to of and in on at for with from by you your yours it its this that these those he she we they i me my our their " +
  "or not no yes but so if when then than after before only also just like as about into out up down here there what which who how why where " +
  "one two three word words means mean say says said sound sounds stress syllable syllables letter letters ending endings start end last first second " +
  "verb verbs noun nouns adjective adjectives plural singular masculine feminine form forms rule rules example examples always never usually often " +
  "near far now right permanent same different change changes add drop keep use used informal formal polite friend friends person people thing things " +
  "has have do does don't doesn't can will would should every all some any more most less very much many other another each both new old good bad big small " +
  "e.g. eg like: note tip trap hook a as do no me so or").split(" "));
const PT_MARK = /[ãõçáàâéêíóôú]/i;
let PT_WORDS = null;
function ptWords() {
  if (PT_WORDS) return PT_WORDS;
  PT_WORDS = new Set();
  const add = t => String(t || "").toLowerCase().replace(/<[^>]+>/g, " ").split(/[\s.,!?;:()“”"«»/…·]+/).forEach(w => { if (w) PT_WORDS.add(w); });
  LESSONS.forEach(l => l.chunks.forEach(c => c.words.forEach(w => add(w.pt))));
  (typeof VERBS !== "undefined" ? VERBS : []).forEach(v => v.slice(0, 7).forEach((f, i) => i !== 1 && add(f)));
  (typeof ADJ !== "undefined" ? ADJ : []).forEach(a => a.slice(0, 4).forEach(add));
  (typeof NOUNS !== "undefined" ? NOUNS : []).forEach(n => { add(n[0]); add(n[1]); });
  Object.keys(typeof GLOSS !== "undefined" ? GLOSS : {}).forEach(k => k.split(/\s+/).forEach(w => PT_WORDS.add(w)));
  (typeof WORDS !== "undefined" ? WORDS : []).forEach(w => w.w.toLowerCase().split(/[\s/]+/).forEach(x => PT_WORDS.add(x)));
  return PT_WORDS;
}
// split free text into runs of the same language
function langRuns(text, start) {
  const toks = text.split(/(\s+)/), runs = [];
  let cur = start || "en";
  toks.forEach(t => {
    if (!t.trim()) { if (runs.length) runs[runs.length - 1].t += t; return; }
    const w = t.toLowerCase().replace(/^[^a-zà-ú]+|[^a-zà-ú-]+$/gi, "");
    let lang = cur;
    if (w) {
      const isEn = EN_WORDS.has(w), isPt = PT_MARK.test(w) || ptWords().has(w);
      if (PT_MARK.test(w)) lang = "pt"; else if (isEn && !isPt) lang = "en"; else if (isPt && !isEn) lang = "pt"; else if (!isEn && !isPt) lang = "en";
    }
    if (runs.length && runs[runs.length - 1].lang === lang) runs[runs.length - 1].t += t; else runs.push({ lang, t });
    cur = lang;
  });
  return runs;
}
// walk the DOM of the lesson and collect {lang, t, el}
function lessonSegments(root) {
  const segs = [];
  const push = (lang, t, el) => { t = t.replace(/\s+/g, " "); if (!t.trim() || !/[a-zà-ú0-9]/i.test(t)) return;
    const last = segs[segs.length - 1]; if (last && last.lang === lang && last.el === el) last.t += (/\s$/.test(last.t) || /^\s/.test(t) ? "" : " ") + t; else segs.push({ lang, t, el }); };
  const blocks = root.querySelectorAll("h2, .explain > p, .explain li, .explain .conj-row, .explain .hook, .explain tr, .words .word");
  blocks.forEach(el => {
    if (el.closest("li") && el.tagName !== "LI" && el !== el.closest("li")) return;
    if (el.classList.contains("word")) {
      const pt = el.querySelector(".body .pt"), en = el.querySelector(".body .en");
      if (pt) push("pt", pt.textContent + ". ", el); if (en) push("en", en.textContent + ". ", el); return;
    }
    if (el.classList.contains("hook") && el.querySelector("p, li")) return;
    const walk = node => {
      if (node.nodeType === 3) {
        const p = node.parentElement;
        if (p.closest(".pt") || p.closest(".conj-row .pt")) return push("pt", node.textContent, el);
        if (p.closest(".en, .say")) return push("en", node.textContent, el);
        langRuns(node.textContent, segs.length ? segs[segs.length - 1].lang : "en").forEach(r => push(r.lang, r.t, el));
        return;
      }
      if (node.nodeType === 1 && !node.matches("button.hintbtn, script, style")) node.childNodes.forEach(walk);
    };
    el.childNodes.forEach(walk);
    const last = segs[segs.length - 1]; if (last && last.el === el && !/[.!?:]\s*$/.test(last.t)) last.t += ". ";
  });
  return segs;
}
let LS = null; // { segs, i, paused }
function listenStop() { if (LS) { LS.stopped = true; LS = null; } try { speechSynthesis.cancel(); } catch {} document.querySelectorAll(".reading").forEach(e => e.classList.remove("reading")); listenBtn(); }
function listenBtn() {
  const b = document.getElementById("listenbtn"), s = document.getElementById("listenstop");
  if (b) b.innerHTML = !LS ? "▶ Listen to the lesson" : LS.paused ? "▶ Continue" : "⏸ Pause";
  if (s) s.hidden = !LS;
}
function listenNext() {
  if (!LS || LS.stopped || LS.paused) return;
  document.querySelectorAll(".reading").forEach(e => e.classList.remove("reading"));
  if (LS.i >= LS.segs.length) { LS = null; return listenBtn(); }
  const sg = LS.segs[LS.i];
  if (sg.el && sg.el.isConnected) { sg.el.classList.add("reading"); if (LS.follow) sg.el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
  const u = new SpeechSynthesisUtterance(sg.t.trim());
  if (sg.lang === "pt") { u.lang = "pt-PT"; if (voice) u.voice = voice; u.rate = 0.85; } else { u.lang = enVoice ? enVoice.lang : "en-GB"; if (enVoice) u.voice = enVoice; u.rate = 1; }
  const me = LS;
  u.onend = () => { if (LS === me && !me.paused) { me.i++; listenNext(); } };
  u.onerror = () => { if (LS === me && !me.paused) { me.i++; setTimeout(listenNext, 50); } };
  speechSynthesis.speak(u);
}
function listenToggle() {
  if (!("speechSynthesis" in window)) return;
  if (!enVoice) pickEnVoice();
  if (!LS) {
    const root = document.getElementById("app");
    LS = { segs: lessonSegments(root), i: 0, paused: false, follow: true };
    speechSynthesis.cancel(); listenBtn(); return listenNext();
  }
  if (LS.paused) { LS.paused = false; listenBtn(); return listenNext(); }
  LS.paused = true; speechSynthesis.cancel(); listenBtn();
}
