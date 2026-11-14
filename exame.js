// Exame: an exam sheet like the real one. Typing only, instructions in Portuguese, no worked example.
// Every task is generated from rules + word pools, so each sheet has new combinations.

const XR = a => a[Math.floor(Math.random() * a.length)];
const XS = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const XCAP = s => s.charAt(0).toUpperCase() + s.slice(1);
// form index: 0 m sg, 1 f sg, 2 m pl, 3 f pl
const XFI = (g, pl) => (g === "f" ? 1 : 0) + (pl ? 2 : 0);
const XART = ["o", "a", "os", "as"], XDE = ["do", "da", "dos", "das"], XEM = ["no", "na", "nos", "nas"], XUM = ["um", "uma"], XNUM = ["num", "numa"];

const XF = ["Ana", "Rita", "Sofia", "Joana", "Marta", "Inês", "Teresa", "Beatriz", "Fátima"];
const XM = ["Rui", "Pedro", "Jorge", "Nuno", "Tiago", "Vasco", "João", "Miguel", "José"];
const XNAME = () => Math.random() < 0.5 ? { n: XR(XF), g: "f" } : { n: XR(XM), g: "m" };
const XCITY = ["Lisboa", "Coimbra", "Braga", "Faro", "Sintra", "Évora"];
const XPROPER = new Set([...XF, ...XM, ...XCITY, "Porto", "Portugal", "Brasil", "Angola", "Alemanha", "Espanha", "Mac", "Sevilha", "Paris", "Madrid", "Roma", "Londres"]);

// nouns: [singular, plural, gender, unit]
const XN = [
  ["livro", "livros", "m", 4], ["caneta", "canetas", "f", 4], ["mesa", "mesas", "f", 4], ["cadeira", "cadeiras", "f", 4],
  ["dicionário", "dicionários", "m", 4], ["relógio", "relógios", "m", 4], ["computador", "computadores", "m", 4], ["parede", "paredes", "f", 4],
  ["mala", "malas", "f", 5], ["chave", "chaves", "f", 5], ["carro", "carros", "m", 5], ["telemóvel", "telemóveis", "m", 5],
  ["carteira", "carteiras", "f", 5], ["passaporte", "passaportes", "m", 5], ["lápis", "lápis", "m", 5],
  ["casa", "casas", "f", 5], ["quarto", "quartos", "m", 7], ["cidade", "cidades", "f", 7], ["hotel", "hotéis", "m", 7],
  ["restaurante", "restaurantes", "m", 7], ["jornal", "jornais", "m", 4], ["hospital", "hospitais", "m", 8], ["universidade", "universidades", "f", 8],
  ["profissão", "profissões", "f", 6], ["nacionalidade", "nacionalidades", "f", 6], ["apartamento", "apartamentos", "m", 6],
  ["dia", "dias", "m", 8], ["semana", "semanas", "f", 8], ["empresa", "empresas", "f", 8], ["hora", "horas", "f", 8],
  ["irmão", "irmãos", "m", 9], ["irmã", "irmãs", "f", 9], ["mãe", "mães", "f", 9], ["pai", "pais", "m", 9], ["homem", "homens", "m", 9],
  ["rapaz", "rapazes", "m", 9], ["filho", "filhos", "m", 9], ["avião", "aviões", "m", 4], ["cão", "cães", "m", 4], ["mão", "mãos", "f", 4], ["país", "países", "m", 2],
];
const XOBJ = ["livro", "caneta", "mesa", "cadeira", "dicionário", "relógio", "computador", "mala", "carro", "telemóvel", "carteira", "casa", "quarto", "hotel"].map(w => XN.find(n => n[0] === w));
// adjectives with 4 forms + unit
const XADJ = [
  ["preto", "preta", "pretos", "pretas", 4], ["branco", "branca", "brancos", "brancas", 4], ["vermelho", "vermelha", "vermelhos", "vermelhas", 4],
  ["amarelo", "amarela", "amarelos", "amarelas", 4], ["verde", "verde", "verdes", "verdes", 4], ["azul", "azul", "azuis", "azuis", 4],
  ["novo", "nova", "novos", "novas", 7], ["velho", "velha", "velhos", "velhas", 7], ["caro", "cara", "caros", "caras", 7],
  ["barato", "barata", "baratos", "baratas", 7], ["bonito", "bonita", "bonitos", "bonitas", 7], ["pequeno", "pequena", "pequenos", "pequenas", 7],
  ["grande", "grande", "grandes", "grandes", 7], ["antigo", "antiga", "antigos", "antigas", 7],
];
const XPOSS = { meu: ["meu", "minha", "meus", "minhas"], teu: ["teu", "tua", "teus", "tuas"], seu: ["seu", "sua", "seus", "suas"], nosso: ["nosso", "nossa", "nossos", "nossas"] };
const XDEM = { este: ["este", "esta", "estes", "estas"], esse: ["esse", "essa", "esses", "essas"], aquele: ["aquele", "aquela", "aqueles", "aquelas"] };
const XSER = ["sou", "és", "é", "somos", "são"], XESTAR = ["estou", "estás", "está", "estamos", "estão"];

const okU = (U, u) => U.has(+u);
const adjFor = (U, unitMax) => XADJ.filter(a => okU(U, a[4]) || a[4] <= Math.min(...U));
const nounsIn = (U, list) => (list || XN).filter(n => [...U].some(u => u >= n[3]));
const adjsIn = U => XADJ.filter(a => [...U].some(u => u >= a[4]));

/* ---------- 1. Escreva frases com as palavras dadas ---------- */
const XORDER = [
  [1, "u1.apresentar", () => { const p = XNAME(); return `${p.g === "f" ? "Ela" : "Ele"} chama-se ${p.n}.`; }],
  [1, "u1.apresentar", () => `Como se chama ${XR(["ele", "ela", "o senhor", "a senhora"])}?`],
  [1, "u1.apresentar", () => `Não sei quem ${XR(["és", "é ele", "é ela"])}.`],
  [2, "u2.deonde", () => `${XR(["Somos", "Elas são", "Eles não são"])} de ${XR(XCITY)}.`],
  [2, "u2.ondefica", () => `${XR(["Sevilha", "Paris", "Madrid", "Roma", "Londres"])} não fica em Portugal.`],
  [2, "u2.ondefica", () => `Onde fica ${XR(XCITY)}?`],
  [3, "u3.linguas", () => { const p = XNAME(); return `${XCAP(XART[XFI(p.g)])} ${p.n} não fala ${XR(["inglês", "francês", "russo", "alemão"])} muito bem.`; }],
  [3, "u3.estar", () => { const p = XNAME(); return `Onde está ${XART[XFI(p.g)]} ${p.n} agora?`; }],
  [3, "u3.linguas", () => `${XR(["Eles", "Elas", "Vocês"])} não moram em ${XR(XCITY)}.`],
  [4, "u4.isto", () => `Como se diz isto em ${XR(["inglês", "francês", "russo", "alemão"])}?`],
  [4, "u4.cores", () => { const o = XR(XOBJ), a = XR(XADJ.slice(0, 6)), p = XNAME(); return `${XCAP(XART[XFI(o[2])])} ${o[0]} ${XDE[XFI(p.g)]} ${p.n} é ${a[XFI(o[2])]}.`; }],
  [4, "u4.isto", () => `De que cor é ${XR(["isto", "isso", "aquilo"])}?`],
  [5, "u5.ter", () => { const p = XNAME(), o = XR(XOBJ.slice(0, 11)); return `${XCAP(XART[XFI(p.g)])} ${p.n} não tem ${XUM[XFI(o[2])]} ${o[0]}.`; }],
  [5, "u5.ondeesta", () => { const o = XR(XOBJ.slice(0, 11)), pl = Math.random() < 0.4; return `Onde é que ${pl ? "estão" : "está"} ${XART[XFI(o[2], pl)]} ${pl ? o[1] : o[0]}?`; }],
  [6, "u6.dados", () => `Qual é ${XR(["o teu número de telemóvel", "a sua morada", "o seu último nome", "a tua profissão"])}?`],
  [6, "u6.dados", () => { const p = XNAME(); return `Que idade tem ${XART[XFI(p.g)]} ${p.n}?`; }],
  [7, "u7.gostar", () => { const p = XNAME(), o = XR([["cidade", "f"], ["rua", "f"], ["casa", "f"], ["quarto", "m"]]); return `${XCAP(XART[XFI(p.g)])} ${p.n} não gosta ${XDE[XFI(o[1])]} ${o[0]} ${p.g === "f" ? "dela" : "dele"}.`; }],
  [7, "u7.cidades", () => `Estamos ${XR(["longe", "perto"])} do centro da cidade.`],
  [7, "u7.cidades", () => `A minha casa fica ${XR(["perto", "longe"])} da tua.`],
  [7, "u7.concordancia", () => `${XR(XCITY)} é uma cidade ${XR(["bastante", "muito"])} ${XR(["pequena", "bonita", "antiga", "grande"])}.`],
  [7, "u7.cidades", () => `Como são os ${XR(["restaurantes", "hotéis"])} no Porto?`],
  [8, "u8.rotina", () => { const p = XNAME(), w = XR([["escritório", "m"], ["hospital", "m"], ["restaurante", "m"], ["escola", "f"], ["loja", "f"]]); return `${XCAP(XART[XFI(p.g)])} ${p.n} trabalha ${XNUM[XFI(w[1])]} ${w[0]}.`; }],
  [8, "u8.rotina", () => `Quantos dias ${XR(["trabalhas", "trabalha"])} por semana?`],
  [8, "u8.rotina", () => `${XR(["Estamos", "Estou"])} de férias fora do país.`],
  [9, "u9.familia", () => `O meu ${XR(["irmão", "primo", "pai"])} chama-se ${XR(XM)}.`],
  [9, "u9.familia", () => `A irmã ${XR(["dele", "dela"])} é casada com um ${XR(["espanhol", "inglês", "brasileiro"])}.`],
  [10, "u10.aparencia", () => { const p = XNAME(); return `${XCAP(XART[XFI(p.g)])} ${p.n} tem olhos ${XR(["azuis", "verdes", "castanhos"])}.`; }],
  [10, "u10.aparencia", () => `A minha ${XR(["mãe", "tia", "irmã"])} usa óculos.`],
  [10, "u10.fome", () => `${XR(["Não estou", "Ela não está", "Não estamos"])} com ${XR(["fome", "sede", "frio", "sono"])} agora.`],
];
function xOrder(U) {
  return XORDER.filter(t => okU(U, t[0])).map(([u, topic, f]) => {
    const s = f(), end = /[?!.]$/.test(s) ? s.slice(-1) : ".";
    const toks = s.replace(/[?!.]$/, "").split(" ").map((w, i) => i === 0 && !XPROPER.has(w) ? w.toLowerCase() : w);
    let sh = XS(toks); for (let k = 0; k < 5 && sh.join(" ") === toks.join(" "); k++) sh = XS(toks);
    return { p: sh.join(" / ") + (end === "?" ? "  (?)" : ""), a: [s], topic, unit: u };
  });
}

/* ---------- 2. Frases com verbo, artigos e preposições (u5 E) ---------- */
function xBuild(U) {
  const out = [];
  const nm = () => XNAME();
  const objs = [["telemóvel", "m", 0], ["mala", "f", 0], ["óculos", "m", 1], ["chaves", "f", 1], ["carteira", "f", 0], ["livros", "m", 1], ["passaporte", "m", 0]];
  const places = [["aqui", "aqui"], ["ali", "ali"], ["aí", "aí"], ["mesa", "na mesa"], ["carro", "no carro"], ["casa", "em casa"], ["escritório", "no escritório"]];
  if (okU(U, 5)) for (let k = 0; k < 4; k++) {
    const o = XR(objs), p = nm(), pl = XR(places), fi = XFI(o[1], o[2]);
    out.push({ p: `${o[0]} / ${p.n} / estar / ${pl[0]}`, a: [`${XCAP(XART[fi])} ${o[0]} ${XDE[XFI(p.g)]} ${p.n} ${o[2] ? "estão" : "está"} ${pl[1]}.`], topic: "u5.ondeesta", unit: 5 });
    const f2 = XR([["secretária", "f"], ["mesa", "f"], ["carro", "m"], ["quarto", "m"], ["mala", "f"]]), p1 = XR(["meu", "teu", "nosso"]), p2 = XR(["meu", "teu", "nosso", "seu"]);
    const ob = XR(objs.filter(x => x[0] !== f2[0])), fo = XFI(ob[1], ob[2]), ff = XFI(f2[1]);
    out.push({ p: `${XPOSS[p1][fo]} / ${ob[0]} / estar / ${XPOSS[p2][ff]} / ${f2[0]}`, a: [`${XCAP(XART[fo])} ${XPOSS[p1][fo]} ${ob[0]} ${ob[2] ? "estão" : "está"} ${XEM[ff]} ${XPOSS[p2][ff]} ${f2[0]}.`], topic: "u5.possessivos", unit: 5 });
    const n = XR(XOBJ.filter(x => x[0] !== "hotel")), npl = Math.random() < 0.4, a = XR(adjsIn(U)), fa = XFI(n[2], npl), pw = XR(["meu", "teu", "nosso", "seu"]);
    out.push({ p: `${npl ? n[1] : n[0]} / ${a[fa]} / ser / ${XPOSS[pw][fa]}`, a: [`${XCAP(XART[fa])} ${npl ? n[1] : n[0]} ${a[fa]} ${npl ? "são" : "é"} ${XPOSS[pw][fa]}.`], topic: "u5.possessivos", unit: 5 });
  }
  if (okU(U, 3)) for (let k = 0; k < 3; k++) {
    const p = nm(), c = XR([["Lisboa", "em Lisboa"], ["Porto", "no Porto"], ["Coimbra", "em Coimbra"], ["Brasil", "no Brasil"], ["Alemanha", "na Alemanha"], ["Portugal", "em Portugal"]]);
    out.push({ p: `${p.n} / morar / ${c[0]}`, a: [`${XCAP(XART[XFI(p.g)])} ${p.n} mora ${c[1]}.`], topic: "u3.linguas", unit: 3 });
  }
  if (okU(U, 2)) for (let k = 0; k < 3; k++) {
    const c = XR([["Brasil", "do Brasil"], ["Porto", "do Porto"], ["Angola", "de Angola"], ["Alemanha", "da Alemanha"], ["Lisboa", "de Lisboa"], ["Estados Unidos", "dos Estados Unidos"]]);
    const s = XR([["nós", "Nós somos"], ["eles", "Eles são"], ["ela", "Ela é"], ["eu", "Eu sou"]]);
    out.push({ p: `${s[0]} / ser / ${c[0]}`, a: [`${s[1]} ${c[1]}.`, `${s[1].split(" ")[1]} ${c[1]}.`], topic: "u2.deonde", unit: 2 });
  }
  if (okU(U, 7)) for (let k = 0; k < 3; k++) {
    const p = nm(), o = XR([["cidade", "f"], ["rua", "f"], ["casa", "f"], ["quarto", "m"], ["trabalho", "m"]]);
    out.push({ p: `${p.n} / não / gostar / ${o[0]} / ${p.g === "f" ? "dela" : "dele"}`, a: [`${XCAP(XART[XFI(p.g)])} ${p.n} não gosta ${XDE[XFI(o[1])]} ${o[0]} ${p.g === "f" ? "dela" : "dele"}.`], topic: "u7.contracoes", unit: 7 });
  }
  if (okU(U, 8)) for (let k = 0; k < 3; k++) {
    const p = nm(), w = XR([["escritório", "m"], ["hospital", "m"], ["restaurante", "m"], ["escola", "f"], ["loja", "f"]]), fi = XFI(w[1]);
    const base = `${XCAP(XART[XFI(p.g)])} ${p.n} trabalha`;
    out.push({ p: `${p.n} / trabalhar / ${w[0]}`, a: [`${base} ${XNUM[fi]} ${w[0]}.`, `${base} ${XEM[fi]} ${w[0]}.`], topic: "u8.rotina", unit: 8 });
  }
  return out;
}

/* ---------- 3. Escreva as frases no plural ---------- */
function xPlural(U) {
  const out = [], objs = nounsIn(U, XOBJ), adjs = adjsIn(U);
  if (!objs.length || !okU(U, 4) && !okU(U, 5) && !okU(U, 7) && !okU(U, 9)) return out;
  for (let k = 0; k < 8; k++) {
    const n = XR(objs), a = XR(adjs), s = XFI(n[2]), p = XFI(n[2], 1), kind = XR(["the", "um", "poss", "dem"]);
    if (kind === "the") out.push({ p: `${XCAP(XART[s])} ${n[0]} é ${a[s]}.`, a: [`${XCAP(XART[p])} ${n[1]} são ${a[p]}.`], topic: "u4.objetos", unit: 4 });
    if (kind === "um") out.push({ p: `É ${XUM[s]} ${n[0]} ${a[s]}.`, a: [`São ${n[1]} ${a[p]}.`, `São ${["uns", "umas"][s]} ${n[1]} ${a[p]}.`], topic: "u4.objetos", unit: 4 });
    if (kind === "poss" && [...U].some(u => u >= 5)) { const w = XR(Object.keys(XPOSS)); out.push({ p: `${XCAP(XART[s])} ${XPOSS[w][s]} ${n[0]} é ${a[s]}.`, a: [`${XCAP(XART[p])} ${XPOSS[w][p]} ${n[1]} são ${a[p]}.`], topic: "u5.possessivos", unit: 5 }); }
    if (kind === "dem" && okU(U, 9)) {
      const m = XR([...objs, ...XN.filter(x => ["filho", "irmão", "irmã", "mãe"].includes(x[0]))]), ms = XFI(m[2]), mp = XFI(m[2], 1), d = XR(Object.keys(XDEM)), w = XR(Object.keys(XPOSS));
      out.push({ p: `${XCAP(XDEM[d][ms])} é ${XART[ms]} ${XPOSS[w][ms]} ${m[0]}.`, a: [`${XCAP(XDEM[d][mp])} são ${XART[mp]} ${XPOSS[w][mp]} ${m[1]}.`], topic: "u9.este", unit: 9 });
    }
  }
  if (okU(U, 3)) {
    const nat = [["alemão", "alemã", "alemães", "alemãs"], ["português", "portuguesa", "portugueses", "portuguesas"], ["inglês", "inglesa", "ingleses", "inglesas"], ["espanhol", "espanhola", "espanhóis", "espanholas"], ["brasileiro", "brasileira", "brasileiros", "brasileiras"]];
    for (let k = 0; k < 2; k++) { const f = XR(nat), g = XR(["m", "f"]); out.push({ p: `${g === "f" ? "Ela" : "Ele"} é ${f[XFI(g)]}.`, a: [`${g === "f" ? "Elas" : "Eles"} são ${f[XFI(g, 1)]}.`], topic: "u3.nac", unit: 3 }); }
  }
  return out;
}

/* ---------- 4. Forma feminina ou masculina ---------- */
const XPAIRS = [
  ["o pai", "a mãe", 9, "u9.familia"], ["o irmão", "a irmã", 9, "u9.familia"], ["o filho", "a filha", 9, "u9.familia"], ["o tio", "a tia", 9, "u9.familia"],
  ["o marido", "a mulher", 9, "u9.familia", 1], ["o namorado", "a namorada", 9, "u9.familia"], ["o homem", "a mulher", 9, "u9.familia", 1], ["o avô", "a avó", 9, "u9.familia"],
  ["o neto", "a neta", 9, "u9.familia"], ["o primo", "a prima", 9, "u9.familia"], ["o rapaz", "a rapariga", 9, "u9.familia"], ["o amigo", "a amiga", 9, "u9.familia"],
  ["o professor", "a professora", 6, "u6.profissoes"], ["o ator", "a atriz", 6, "u6.profissoes"], ["o médico", "a médica", 6, "u6.profissoes"],
  ["o enfermeiro", "a enfermeira", 6, "u6.profissoes"], ["o empregado de mesa", "a empregada de mesa", 6, "u6.profissoes"], ["o cantor", "a cantora", 6, "u6.profissoes"],
  ["o estudante", "a estudante", 6, "u6.profissoes"], ["o jornalista", "a jornalista", 6, "u6.profissoes"], ["o advogado", "a advogada", 6, "u6.profissoes"],
  ["o alemão", "a alemã", 3, "u3.nac"], ["o português", "a portuguesa", 3, "u3.nac"], ["o espanhol", "a espanhola", 3, "u3.nac"], ["o inglês", "a inglesa", 3, "u3.nac"], ["o japonês", "a japonesa", 3, "u3.nac"],
];
function xGender(U) {
  return XPAIRS.filter(p => okU(U, p[2])).map(p => {
    const back = !p[4] && Math.random() < 0.4;
    return back ? { p: p[1], a: [p[0]], topic: p[3], unit: p[2] } : { p: p[0], a: [p[1]], topic: p[3], unit: p[2] };
  });
}

/* ---------- 5. Complete com ser ou estar ---------- */
const XSUBJ = [["Eu", 0, 1], ["Tu", 1, 0], ["A Ana", 2, 1], ["O Rui", 2, 0], ["O senhor", 2, 0], ["Nós", 3, 2], ["A Rita e eu", 3, 3], ["Os meus pais", 4, 2], ["Elas", 4, 3], ["Vocês", 4, 2]];
const XSE = [
  [["com fome"], "e", 10], [["com frio"], "e", 10], [["com sono"], "e", 10], [["com calor"], "e", 10], [["cansado", "cansada", "cansados", "cansadas"], "e", 10],
  [["doente", "doente", "doentes", "doentes"], "e", 10], [["de férias"], "e", 10], [["em casa"], "e", 3], [["no Porto agora"], "e", 3],
  [["de Lisboa"], "s", 2], [["alto", "alta", "altos", "altas"], "s", 10], [["moreno", "morena", "morenos", "morenas"], "s", 10],
  [["simpático", "simpática", "simpáticos", "simpáticas"], "s", 7], [["casado", "casada", "casados", "casadas"], "s", 6],
  [["professor", "professora", "professores", "professoras"], "s", 6], [["brasileiro", "brasileira", "brasileiros", "brasileiras"], "s", 3],
];
function xSerEstar(U) {
  if (!okU(U, 3) && !okU(U, 10)) return [];
  const out = [];
  for (let k = 0; k < 10; k++) {
    const c = XR(XSE.filter(c => [...U].some(u => u >= c[2]))), s = XR(XSUBJ), comp = c[0][s[2]] || c[0][0];
    const verb = (c[1] === "s" ? XSER : XESTAR)[s[1]];
    const drop = s[1] !== 2 && s[1] !== 4 && s[0].length < 4 && Math.random() < 0.5;
    out.push({ p: drop ? `___ ${comp}. (${s[0].toLowerCase()})` : `${s[0]} ___ ${comp}.`, a: [verb], topic: "u3.estar", unit: 3 });
  }
  return out;
}

/* ---------- 6. Complete com o verbo na forma correta ---------- */
function xVerb(U) {
  const out = [];
  if (typeof VERBS === "undefined") return out;
  for (let k = 0; k < 14; k++) {
    const ok = VERBS.filter(v => WHO_REST[v[0]] && v[0] !== "ser" && v[0] !== "estar" && [...U].some(u => u >= v[7]));
    if (!ok.length) break;
    const v = XR(ok), s = XR(WHO_SUBJ), form = v[2 + s[1]]; if (!form) continue;
    const neg = Math.random() < 0.25 ? "não " : "", rest = WHO_REST[v[0]][0];
    const drop = ["Eu", "Tu", "Nós"].includes(s[0]) && Math.random() < 0.5;
    out.push({ p: drop ? `${neg ? "Não " : ""}___ ${rest}. (${s[0].toLowerCase()}/${v[0]})` : `${s[0]} ${neg}___ ${rest}. (${v[0]})`, a: [form], topic: WHO_REST[v[0]][1], unit: v[7] });
  }
  return out;
}

/* ---------- 7. Escreva as perguntas ---------- */
const XQ = [
  [1, "u1.apresentar", () => [`Chamo-me ${XR(XF)} ${XR(["Vieira", "Santos", "Costa"])}.`, ["Como te chamas?", "Como se chama?", "Como é que te chamas?", "Como é que se chama?", "Qual é o teu nome?", "Qual é o seu nome?"]]],
  [1, "u1.cumprimentar", () => ["Bem, obrigada. E tu?", ["Como estás?", "Tudo bem?", "Olá, tudo bem?", "Olá, como estás?", "Como está?"]]],
  [2, "u2.deonde", () => [`Sou de ${XR(XCITY)}.`, ["De onde és?", "De onde é?", "De onde é que és?", "De onde é que é?", "De onde é você?"]]],
  [2, "u2.ondefica", () => { const c = XR([["Sevilha", "Espanha"], ["Hamburgo", "Alemanha"], ["Luanda", "Angola"], ["Coimbra", "Portugal"]]); return [`${c[0]} fica em ${c[1]}.`, [`Onde fica ${c[0]}?`, `Onde é que fica ${c[0]}?`, `Onde é ${c[0]}?`, `Onde é que é ${c[0]}?`]]; }],
  [3, "u3.linguas", () => [`Moro em ${XR(XCITY)}.`, ["Onde moras?", "Onde mora?", "Onde é que moras?", "Onde é que mora?", "Onde mora você?"]]],
  [3, "u3.linguas", () => [`Falo ${XR(["inglês e russo", "português e francês", "alemão e inglês"])}.`, ["Que línguas falas?", "Que línguas fala?", "Que línguas é que falas?", "Que línguas é que fala?"]]],
  [3, "u3.estar", () => ["Estamos no Porto.", ["Onde estão?", "Onde estão vocês?", "Onde é que estão?", "Onde é que vocês estão?"]]],
  [4, "u4.isto", () => [`É ${XR(["um livro", "uma caneta", "um dicionário", "uma cadeira"])}.`, ["O que é isto?", "O que é isso?", "O que é aquilo?", "Que é isto?", "O que é que é isto?"]]],
  [4, "u4.cores", () => { const o = XR(XOBJ.slice(0, 11)), a = XR(XADJ.slice(0, 6)), f = XFI(o[2]); return [`${XCAP(XART[f])} ${o[0]} é ${a[f]}.`, [`De que cor é ${XART[f]} ${o[0]}?`, `Qual é a cor ${XDE[f]} ${o[0]}?`]]; }],
  [5, "u5.ondeesta", () => { const o = XR([["chaves", "as", "estão"], ["óculos", "os", "estão"], ["mala", "a", "está"], ["telemóvel", "o", "está"]]); return [`${XCAP(o[1])} ${o[0]} ${o[2]} ${XR(["na mesa", "no carro", "ali", "em casa"])}.`, [`Onde ${o[2]} ${o[1]} ${o[0]}?`, `Onde é que ${o[2]} ${o[1]} ${o[0]}?`, `Onde ${o[2]} ${o[1]} meus ${o[0]}?`.replace("as meus", "as minhas").replace("a meus", "a minha").replace("o meus", "o meu")]]; }],
  [5, "u5.possessivos", () => { const o = XR(XOBJ.slice(0, 11)), p = XNAME(), f = XFI(o[2]); return [`${XCAP(XART[f])} ${o[0]} é ${XDE[XFI(p.g)]} ${p.n}.`, [`De quem é ${XART[f]} ${o[0]}?`, `De quem é que é ${XART[f]} ${o[0]}?`]]; }],
  [6, "u6.dados", () => [`Tenho ${XR(["vinte e oito", "trinta e dois", "quarenta"])} anos.`, ["Quantos anos tens?", "Quantos anos tem?", "Que idade tens?", "Que idade tem?", "Qual é a tua idade?", "Qual é a sua idade?"]]],
  [6, "u6.dados", () => [`A minha morada é Rua ${XR(["da Boavista", "do Sol", "Augusta"])}, ${XR([12, 28, 45])}.`, ["Qual é a tua morada?", "Qual é a sua morada?"]]],
  [6, "u6.andar", () => [`Moro no ${XR(["terceiro", "quinto", "segundo"])} andar.`, ["Em que andar moras?", "Em que andar mora?", "Em que andar é que moras?", "Em que andar é que mora?"]]],
  [6, "u6.dados", () => [`Sou ${XR(["advogada", "médico", "professora", "jornalista"])}.`, ["Qual é a tua profissão?", "Qual é a sua profissão?", "O que fazes?", "O que faz?", "O que é que fazes?", "O que é que faz?"]]],
  [7, "u7.cidades", () => [`A minha cidade é ${XR(["muito bonita", "bastante pequena", "muito antiga"])}.`, ["Como é a tua cidade?", "Como é a sua cidade?", "Como é que é a tua cidade?", "Como é que é a sua cidade?"]]],
  [8, "u8.rotina", () => { const w = XR(["num hospital", "num escritório", "numa escola", "numa loja"]); return [`Trabalho ${w}.`, ["Onde trabalhas?", "Onde trabalha?", "Onde é que trabalhas?", "Onde é que trabalha?"]]; }],
  [8, "u8.rotina", () => [`Trabalho ${XR(["cinco", "quatro", "seis"])} dias por semana.`, ["Quantos dias trabalhas por semana?", "Quantos dias trabalha por semana?", "Quantos dias é que trabalhas por semana?", "Quantos dias é que trabalha por semana?"]]],
  [9, "u9.familia", () => [`Tenho ${XR(["dois", "três"])} irmãos.`, ["Quantos irmãos tens?", "Quantos irmãos tem?", "Quantos irmãos é que tens?", "Quantos irmãos é que tem?"]]],
  [9, "u9.este", () => [`É a minha ${XR(["irmã", "mãe", "tia"])}.`, ["Quem é esta?", "Quem é essa?", "Quem é aquela?", "Quem é?", "Quem é ela?"]]],
  [10, "u10.aparencia", () => { const p = XNAME(); return [`${XCAP(XART[XFI(p.g)])} ${p.n} tem olhos ${XR(["azuis", "verdes", "castanhos"])}.`, [`De que cor são os olhos ${XDE[XFI(p.g)]} ${p.n}?`, `Como são os olhos ${XDE[XFI(p.g)]} ${p.n}?`]]; }],
  [10, "u10.qual", () => [`O meu ${XR(["filme", "livro"])} preferido é ${XR(["Titanic", "Os Maias"])}.`, ["Qual é o teu filme preferido?", "Qual é o seu filme preferido?", "Qual é o teu livro preferido?", "Qual é o seu livro preferido?"]]],
];
function xQuestions(U) {
  return XQ.filter(t => okU(U, t[0])).map(([u, topic, f]) => { const [ans, qs] = f(); return { p: ans, a: qs, topic, unit: u }; });
}

/* ---------- 8. As frases têm erros. Reescreva-as sem erros ---------- */
function xErrors(U) {
  const out = [], objs = nounsIn(U, XOBJ), adjs = adjsIn(U).filter(a => a[0] !== a[1]);
  const max = Math.max(...U);
  for (let k = 0; k < 12; k++) {
    const kind = XR(["pl", "gen", "art", "contr", "verb", "serestar", "poss", "qual"]);
    if (kind === "pl" && max >= 4) { const n = XR(objs), a = XR(adjsIn(U)), p = XFI(n[2], 1); if (a[p] !== a[0]) out.push({ p: `${XCAP(XART[p])} ${n[1]} são ${a[0]}.`, a: [`${XCAP(XART[p])} ${n[1]} são ${a[p]}.`], topic: "u4.objetos", unit: 4 }); }
    if (kind === "gen" && max >= 7 && adjs.length) { const n = XR(objs.filter(x => x[2] === "f")), a = XR(adjs); if (n) out.push({ p: `A ${n[0]} é ${a[0]}.`, a: [`A ${n[0]} é ${a[1]}.`], topic: "u7.concordancia", unit: 7 }); }
    if (kind === "art" && max >= 4) { const n = XR(objs), a = XR(adjsIn(U)), f = XFI(n[2]), w = XFI(n[2] === "f" ? "m" : "f"); out.push({ p: `${XCAP(XART[w])} ${n[0]} é ${a[f]}.`, a: [`${XCAP(XART[f])} ${n[0]} é ${a[f]}.`], topic: "u4.artigos", unit: 4 }); }
    if (kind === "contr" && max >= 2) {
      const p = XNAME(), o = XR(XOBJ.slice(0, 11)), f = XFI(o[2]), t = XR([
        [`Sou de o Porto.`, `Sou do Porto.`], [`${XCAP(XART[f])} ${o[0]} é de ${XART[XFI(p.g)]} ${p.n}.`, `${XCAP(XART[f])} ${o[0]} é ${XDE[XFI(p.g)]} ${p.n}.`],
        [`${XCAP(XART[f])} ${o[0]} está em a mesa.`, `${XCAP(XART[f])} ${o[0]} está na mesa.`], [`Moramos em o Brasil.`, `Moramos no Brasil.`], [`Somos de os Estados Unidos.`, `Somos dos Estados Unidos.`]]);
      out.push({ p: t[0], a: [t[1]], topic: max >= 7 ? "u7.contracoes" : "u2.deonde", unit: 2 });
    }
    if (kind === "verb" && max >= 3 && typeof VERBS !== "undefined") {
      const vs = VERBS.filter(v => WHO_REST[v[0]] && v[0] !== "ser" && [...U].some(u => u >= v[7])); if (!vs.length) continue;
      const v = XR(vs), s = XR(WHO_SUBJ), right = v[2 + s[1]], wrong = XR([2, 3, 4, 5, 6].map(i => v[i]).filter(x => x && x !== right));
      if (right && wrong) out.push({ p: `${s[0]} ${wrong} ${WHO_REST[v[0]][0]}.`, a: [`${s[0]} ${right} ${WHO_REST[v[0]][0]}.`], topic: WHO_REST[v[0]][1], unit: v[7] });
    }
    if (kind === "serestar" && max >= 3) {
      const c = XR(XSE.filter(c => [...U].some(u => u >= c[2]))), s = XR(XSUBJ), comp = c[0][s[2]] || c[0][0];
      const right = (c[1] === "s" ? XSER : XESTAR)[s[1]], wrong = (c[1] === "s" ? XESTAR : XSER)[s[1]];
      out.push({ p: `${s[0]} ${wrong} ${comp}.`, a: [`${s[0]} ${right} ${comp}.`], topic: "u3.estar", unit: 3 });
    }
    if (kind === "poss" && max >= 5) {
      const n = XR(objs), a = XR(adjsIn(U)), f = XFI(n[2]), w = XR(Object.keys(XPOSS)), bad = XPOSS[w][f === 1 ? 0 : 1];
      out.push({ p: `${XCAP(XART[f])} ${bad} ${n[0]} é ${a[f]}.`, a: [`${XCAP(XART[f])} ${XPOSS[w][f]} ${n[0]} é ${a[f]}.`], topic: "u5.possessivos", unit: 5 });
    }
    if (kind === "qual" && max >= 10) {
      const n = XR(objs), f = XFI(n[2]), pl = Math.random() < 0.5, w = XR(["teu", "seu", "nosso"]);
      out.push(pl ? { p: `Qual são ${XART[f + 2]} ${XPOSS[w][f + 2]} ${n[1]}?`, a: [`Quais são ${XART[f + 2]} ${XPOSS[w][f + 2]} ${n[1]}?`], topic: "u10.qual", unit: 10 }
        : { p: `Quais é ${XART[f]} ${XPOSS[w][f]} ${n[0]}?`, a: [`Qual é ${XART[f]} ${XPOSS[w][f]} ${n[0]}?`], topic: "u10.qual", unit: 10 });
    }
  }
  return out;
}

/* ---------- 9. Complete com a palavra que falta (preposições) ---------- */
function xPrep(U) {
  const out = [];
  const C = [["Portugal", ""], ["Angola", ""], ["Moçambique", ""], ["Brasil", "o"], ["Japão", "o"], ["Canadá", "o"], ["Estados Unidos", "os"], ["Suécia", "a"], ["Grécia", "a"], ["Alemanha", "a"], ["Rússia", "a"]];
  const CITY = [["Lisboa", 0], ["Luanda", 1], ["Maputo", 2], ["São Paulo", 3], ["Tóquio", 4], ["Toronto", 5], ["Miami", 6], ["Estocolmo", 7], ["Atenas", 8], ["Berlim", 9], ["Moscovo", 10]];
  const de = a => ({ "": "de", o: "do", a: "da", os: "dos", as: "das" })[a], em = a => ({ "": "em", o: "no", a: "na", os: "nos", as: "nas" })[a];
  if (okU(U, 2)) for (let k = 0; k < 6; k++) {
    if (Math.random() < 0.5) { const c = XR(C), p = XNAME(); out.push({ p: `${XCAP(XART[XFI(p.g)])} ${p.n} é ___ ${c[0]}.`, a: [de(c[1])], topic: "u2.deonde", unit: 2 }); }
    else { const t = XR(CITY), c = C[t[1]]; out.push({ p: `${t[0]} é ___ ${c[0]}.`, a: [em(c[1])], topic: "u2.ondefica", unit: 2 }); }
  }
  if (okU(U, 5)) for (let k = 0; k < 4; k++) {
    const o = XR(XOBJ.slice(0, 11)), pl = XR([["mesa", "na"], ["carro", "no"], ["mala", "na"], ["casa", "em"], ["escritório", "no"], ["quarto", "no"]].filter(x => x[0] !== o[0]));
    out.push({ p: `${XCAP(XART[XFI(o[2])])} ${o[0]} está ___ ${pl[0]}.`, a: [pl[1]], topic: "u5.ondeesta", unit: 5 });
  }
  if (okU(U, 7)) for (let k = 0; k < 3; k++) {
    const t = XR([["café", "m", 0, "português"], ["cerveja", "f", 0, "portuguesa"], ["chá", "m", 0, "verde"], ["cidade", "f", 0, ""], ["música", "f", 0, "portuguesa"], ["livros", "m", 1, "do Saramago"], ["praias", "f", 1, "do Algarve"]]), p = XNAME();
    const tail = t[3] || (p.g === "f" ? "dela" : "dele"), c = XDE[XFI(t[1], t[2])];
    out.push({ p: `${XCAP(XART[XFI(p.g)])} ${p.n} gosta ___ ${t[0]} ${tail}.`, a: t[3] && t[2] === 0 && t[0] !== "música" ? [c, "de"] : [c], topic: "u7.contracoes", unit: 7 });
  }
  if (okU(U, 8)) for (let k = 0; k < 3; k++) {
    const w = XR([["escritório", "m"], ["hospital", "m"], ["restaurante", "m"], ["escola", "f"], ["loja", "f"], ["universidade", "f"]]), p = XNAME(), f = XFI(w[1]);
    out.push({ p: `${XCAP(XART[XFI(p.g)])} ${p.n} trabalha ___ ${w[0]}.`, a: [XNUM[f], XEM[f]], topic: "u8.rotina", unit: 8 });
  }
  return out;
}

/* ---------- 10. muito / pouco na forma correta ---------- */
function xMuito(U) {
  if (!okU(U, 8)) return [];
  const N = [["horas", "f", 1], ["trabalho", "m", 0], ["empregados", "m", 1], ["dias", "m", 1], ["dinheiro", "m", 0], ["cerveja", "f", 0], ["água", "f", 0], ["cantores", "m", 1],
    ["leite", "m", 0], ["vinho", "m", 0], ["empresas", "f", 1], ["pessoas", "f", 1], ["livros", "m", 1], ["amigas", "f", 1], ["tempo", "m", 0], ["cidades", "f", 1]];
  return XS(N).slice(0, 8).map(n => { const w = XR(["muit", "pouc"]), f = XFI(n[1], n[2]); return { p: `${w}___ ${n[0]}`, a: [w + ["o", "a", "os", "as"][f]], topic: "u8.muito", unit: 8 }; });
}

/* ---------- 11. De quem é? (possessivos) ---------- */
function xWhose(U) {
  if (!okU(U, 5) && !okU(U, 9)) return [];
  const O = [["eu", "meu"], ["tu", "teu"], ["nós", "nosso"], ["o senhor", "seu"], ["você", "seu"], ["ele", "dele"], ["ela", "dela"], ["eles", "deles"], ["elas", "delas"]];
  const out = [];
  for (let k = 0; k < 8; k++) {
    const n = XR(XOBJ.slice(0, 11)), pl = Math.random() < 0.3, f = XFI(n[2], pl), a = XR(XADJ.slice(0, 6)), verb = pl ? "São" : "É";
    if (Math.random() < 0.25) { const p = XNAME(); out.push({ p: `De quem ${pl ? "são" : "é"} ${XART[f]} ${pl ? n[1] : n[0]} ${a[f]}? (${p.n})`, a: [`${verb} ${XDE[XFI(p.g)]} ${p.n}.`], topic: "u5.possessivos", unit: 5 }); continue; }
    const o = XR(O), pos = o[1].startsWith("de") ? o[1] : XPOSS[o[1]][f];
    const ans = [`${verb} ${pos}.`]; if (!o[1].startsWith("de")) ans.push(`${verb} ${XART[f]} ${pos}.`);
    if (o[1] === "seu") ans.push(`${verb} ${o[0] === "você" ? "de você" : "do senhor"}.`);
    out.push({ p: `De quem ${pl ? "são" : "é"} ${XART[f]} ${pl ? n[1] : n[0]} ${a[f]}? (${o[0]})`, a: ans, topic: o[1].startsWith("de") ? "u9.poss2" : "u5.possessivos", unit: o[1].startsWith("de") ? 5 : 5 });
  }
  return out;
}

/* ---------- 12. Números por extenso ---------- */
function xNumWord(n) {
  const U = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezasseis", "dezassete", "dezoito", "dezanove"];
  const T = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const H = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
  if (n === 1000) return "mil"; if (n === 100) return "cem";
  const two = m => m < 20 ? U[m] : T[Math.floor(m / 10)] + (m % 10 ? " e " + U[m % 10] : "");
  if (n < 100) return two(n);
  const h = Math.floor(n / 100), r = n % 100;
  return H[h] + (r ? " e " + two(r) : "");
}
function xNumbers(U) {
  const out = [], seen = new Set();
  const rng = []; if (okU(U, 1)) rng.push([11, 20, "u1.numeros", 1]); if (okU(U, 2)) rng.push([21, 99, "u2.num21", 2]); if (okU(U, 3)) rng.push([101, 999, "u3.num1000", 3]);
  if (!rng.length) return out;
  for (let k = 0; k < 10; k++) {
    const r = XR(rng); let n = r[0] + Math.floor(Math.random() * (r[1] - r[0] + 1)); if (r[3] === 3 && Math.random() < 0.3) n = Math.round(n / 100) * 100 || 100;
    if (seen.has(n)) continue; seen.add(n);
    const w = xNumWord(n); out.push({ p: String(n), a: [w, w.replace("catorze", "quatorze")], topic: r[2], unit: r[3] });
  }
  return out;
}

/* ---------- 13. Escreva o contrário ---------- */
const XOPP = [
  [["grande", "grande"], ["pequeno", "pequena"], 7], [["caro", "cara"], ["barato", "barata"], 7], [["novo", "nova"], ["velho", "velha"], 7], [["bom", "boa"], ["mau", "má"], 7],
  [["simpático", "simpática"], ["antipático", "antipática"], 7], [["bonito", "bonita"], ["feio", "feia"], 7], [["perto"], ["longe"], 7],
  [["alto", "alta"], ["baixo", "baixa"], 10], [["magro", "magra"], ["gordo", "gorda"], 10], [["claro", "clara"], ["escuro", "escura"], 10],
  [["loiro", "loira"], ["moreno", "morena"], 10], [["curto", "curta"], ["comprido", "comprida"], 10], [["muito"], ["pouco"], 8],
];
function xOpp(U) {
  return XOPP.filter(o => okU(U, o[2])).map(o => {
    const g = o[0].length > 1 && Math.random() < 0.4 ? 1 : 0, sw = Math.random() < 0.5, a = sw ? o[1] : o[0], b = sw ? o[0] : o[1];
    return { p: a[g], a: [b[g]], topic: o[2] === 10 ? "u10.aparencia" : o[2] === 8 ? "u8.muito" : "u7.adjetivos", unit: o[2] };
  });
}

/* ---------- 14. Artigo definido + nome no plural ---------- */
function xArtPl(U) {
  return nounsIn(U).filter(n => okU(U, n[3]) || Math.random() < 0.3).map(n => ({ p: `___ ${n[0]}`, a: [`${XART[XFI(n[2], 1)]} ${n[1]}`], topic: n[3] >= 9 ? "u9.familia" : n[3] >= 7 ? "u7.concordancia" : "u4.objetos", unit: n[3] }));
}

/* ---------- the sheet ---------- */
const XSECTIONS = [
  ["order", "Escreva frases com as palavras dadas.", "Write sentences with the given words.", xOrder],
  ["build", "Faça frases. Escreva o verbo na forma correta e acrescente os artigos e as preposições necessárias. Não mude a ordem das palavras.", "Make sentences. Put the verb in the right form and add the articles and prepositions you need. Don't change the word order.", xBuild],
  ["plural", "Escreva as frases no plural.", "Write the sentences in the plural.", xPlural],
  ["errors", "As frases abaixo têm erros. Reescreva-as sem erros.", "The sentences below have mistakes. Rewrite them without mistakes.", xErrors],
  ["questions", "Escreva as perguntas.", "Write the questions (the answer is given).", xQuestions],
  ["verb", "Complete com o verbo na forma correta.", "Complete with the verb in the right form.", xVerb],
  ["serestar", "Complete com ser ou estar na forma correta.", "Complete with ser or estar in the right form.", xSerEstar],
  ["prep", "Complete com a palavra que falta.", "Complete with the missing word.", xPrep],
  ["whose", "Responda às perguntas.", "Answer the questions (whose is it?).", xWhose],
  ["gender", "Escreva a forma feminina ou masculina.", "Write the feminine or masculine form.", xGender],
  ["artpl", "Escreva o artigo definido e o nome no plural.", "Write the definite article and the noun in the plural.", xArtPl],
  ["muito", "Escreva muito ou pouco na forma correta.", "Write muito or pouco in the right form.", xMuito],
  ["opp", "Escreva a palavra com significado oposto.", "Write the word with the opposite meaning.", xOpp],
  ["numbers", "Escreva os números por extenso.", "Write the numbers in words.", xNumbers],
];
function makeExam(units) {
  const U = new Set(units.length ? units : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const ready = XSECTIONS.map(([key, instr, en, f]) => {
    const seen = new Set(), items = XS(f(U)).filter(it => !seen.has(it.p) && seen.add(it.p));
    return { key, instr, en, items };
  }).filter(s => s.items.length >= 3);
  const first = ready.filter(s => s.key === "order" || s.key === "build");
  const rest = XS(ready.filter(s => s.key !== "order" && s.key !== "build")).slice(0, 8 - first.length);
  const keys = new Set([...first, ...rest].map(s => s.key));
  return ready.filter(s => keys.has(s.key)).map((s, i) => ({
    letter: "ABCDEFGHIJ"[i], instr: s.instr, en: s.en, key: s.key,
    items: s.items.slice(0, s.key === "order" || s.key === "build" || s.key === "errors" || s.key === "questions" ? 5 : 6).map(it => ({ ...it, ans: "", r: null })),
  }));
}
