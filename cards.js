// Cábulas (cheat-sheet cards), the verb list for the Verbs trainer, and Rewrite tasks for the Workbook.

const tbl = (head, rows) => `<div class="tbl"><table><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

const CARDS = [
{ id: "regular", title: "Regular verbs: present", units: [3, 8], tags: "verbs conjugation endings ar er ir falar comer partir presente",
  key: "Drop -ar / -er / -ir and add the ending. The group's vowel comes back in every form except eu.",
  body: tbl(["", "falar", "comer", "partir"], [
    ["eu", "fal<b>o</b>", "com<b>o</b>", "part<b>o</b>"], ["tu", "fal<b>as</b>", "com<b>es</b>", "part<b>es</b>"],
    ["ele / você", "fal<b>a</b>", "com<b>e</b>", "part<b>e</b>"], ["nós", "fal<b>amos</b>", "com<b>emos</b>", "part<b>imos</b>"],
    ["eles / vocês", "fal<b>am</b>", "com<b>em</b>", "part<b>em</b>"]]) +
    `<p>Same pattern: morar, ficar, trabalhar, estudar, viajar, ganhar, usar, gostar.</p>`,
  trap: "-er and -ir differ only in nós: comemos / partimos." },
{ id: "irregular", title: "Irregular verbs you know", units: [1, 2, 3, 5, 10], tags: "verbs irregular ser estar ter ler ver conjugation",
  key: "Learn these five by heart. Everything else so far is regular.",
  body: tbl(["", "ser", "estar", "ter", "ler", "ver"], [
    ["eu", "sou", "estou", "tenho", "leio", "vejo"], ["tu", "és", "estás", "tens", "lês", "vês"],
    ["ele / você", "é", "está", "tem", "lê", "vê"], ["nós", "somos", "estamos", "temos", "lemos", "vemos"],
    ["eles / vocês", "são", "estão", "têm", "leem", "veem"]]),
  trap: "tem (he has) and têm (they have) sound the same. Only the hat shows the plural." },
{ id: "chamarse", title: "Chamar-se: my name is", units: [1], tags: "chamar-se chamo-me chamas-te chama-se reflexive name called me te se verbs",
  key: "A regular -ar verb + “self” after a hyphen. Both parts change with the person.",
  body: tbl(["", "chamar (regular)", "+ self", "meaning"], [
    ["eu", "chamo", "<b>-me</b>", "my name is"], ["tu", "chamas", "<b>-te</b>", "your name is"], ["ele / ela / você", "chama", "<b>-se</b>", "his / her / your name is"]]) +
    `<p>Questions: <i>Como te chamas?</i> (to a friend) · <i>Como se chama?</i> (polite). In a question the little word jumps before the verb.</p>`,
  trap: "Don't mix the persons: tu → chamas-te, not chamas-se." },
{ id: "serestar", title: "Ser or estar?", units: [3, 10], tags: "ser estar to be permanent temporary doctor place",
  key: "Ser = what it IS. Estar = how or where it is NOW.",
  body: `<div class="two"><div class="box"><h3>ser · DOCTOR</h3><ul>
    <li><b>D</b>escription: <i>é alta</i></li><li><b>O</b>rigin: <i>sou de Kiev</i></li><li><b>C</b>haracteristic: <i>é simpático</i></li>
    <li><b>T</b>ime: <i>são três horas</i></li><li><b>O</b>ccupation: <i>sou médica</i></li><li><b>R</b>elation: <i>é a minha irmã</i></li></ul></div>
    <div class="box"><h3>estar · PLACE</h3><ul>
    <li><b>P</b>osition: <i>está sentada</i></li><li><b>L</b>ocation: <i>estou em casa</i></li><li><b>A</b>ction now: <i>estou a ler</i></li>
    <li><b>C</b>ondition: <i>está cansado</i></li><li><b>E</b>motion: <i>estou com fome</i></li></ul></div></div>`,
  trap: "Where a city or country is → ser or ficar: Lisboa é / fica em Portugal." },
{ id: "contracoes", title: "Little words that merge", units: [2, 5, 7, 8], tags: "contractions de em do da no na num numa disto nisto prepositions articles",
  key: "Preposition + o / a / os / as = one word. Always. Never “em o”.",
  body: tbl(["", "o", "a", "os", "as", "um / uma", "isto"], [
    ["de", "<b>do</b>", "<b>da</b>", "<b>dos</b>", "<b>das</b>", "dum / duma", "disto"],
    ["em", "<b>no</b>", "<b>na</b>", "<b>nos</b>", "<b>nas</b>", "num / numa", "nisto"]]) +
    `<p>Also: <b>daqui, daí, dali</b> (de + aqui / aí / ali), <b>disso, daquilo, nisso, naquilo</b>.</p>`,
  trap: "No article, no merge: de Portugal, em Lisboa, em casa." },
{ id: "artigos", title: "Articles and gender", units: [1, 2, 4], tags: "articles gender o a um uma masculine feminine dia mapa countries",
  key: "o / a = the (you both know it). um / uma = a (first mention).",
  body: tbl(["", "masculine", "feminine"], [["the", "o · os", "a · as"], ["a / some", "um · uns", "uma · umas"]]) +
    `<ul><li>Usually masculine: <b>-o, -l, -r, -s, -ão</b> (o livro, o jornal)</li><li>Usually feminine: <b>-a</b> (a mesa)</li>
    <li>Names take the article: <i>o Pedro, a Ana</i>. Most countries too: <i>a China, o Japão</i>.</li></ul>`,
  trap: "o dia, o mapa (masculine with -a). No article: Portugal, Angola, Marrocos, cities (but o Porto)." },
{ id: "plural", title: "Making plurals", units: [4], tags: "plural nouns adjectives es is ns oes aes",
  key: "Vowel → add -s. Consonant → add -es. Then the special endings.",
  body: tbl(["ending", "singular", "plural"], [
    ["vowel", "mesa", "mesa<b>s</b>"], ["-r, -z, -s", "computador · rapaz · país", "computador<b>es</b> · rapaz<b>es</b> · país<b>es</b>"],
    ["-l", "jornal · azul · difícil", "jorna<b>is</b> · azu<b>is</b> · difíce<b>is</b>"], ["-m", "viagem", "viage<b>ns</b>"],
    ["-ão", "avião · cão · mão", "avi<b>ões</b> · c<b>ães</b> · m<b>ãos</b>"], ["no change", "lápis", "lápis"]]),
  trap: "-ão has three plurals. The most common is -ões. Learn cães and mãos as exceptions." },
{ id: "possessivos", title: "My, your, his", units: [5, 9], tags: "possessives meu minha teu tua seu sua nosso dele dela deles",
  key: "It agrees with the THING, not the owner. And it comes with the article: o meu carro.",
  body: tbl(["", "o … (m)", "a … (f)", "os / as …"], [
    ["my", "o meu", "a minha", "os meus / as minhas"], ["your (tu)", "o teu", "a tua", "os teus / as tuas"],
    ["your (você)", "o seu", "a sua", "os seus / as suas"], ["our", "o nosso", "a nossa", "os nossos / as nossas"],
    ["your (vocês)", "o vosso", "a vossa", "os vossos / as vossas"]]) +
    `<p><b>his / her / their</b> go after the noun and never change: <i>o carro <b>dele</b>, a casa <b>dela</b>, os filhos <b>deles</b></i>.</p>`,
  trap: "A man says “a minha mulher”: feminine because mulher is." },
{ id: "distancia", title: "This, that, that over there", units: [4, 5, 9], tags: "demonstratives isto isso aquilo este esse aquele aqui ai ali distance",
  key: "Three distances: near me · near you · far from both.",
  body: tbl(["", "near me", "near you", "far"], [
    ["thing (no noun)", "isto", "isso", "aquilo"], ["with a noun", "este / esta", "esse / essa", "aquele / aquela"],
    ["plural", "estes / estas", "esses / essas", "aqueles / aquelas"], ["place", "aqui", "aí", "ali"]]) +
    `<p>Memory hook: is<b>t</b>o = <b>t</b>ouching it · is<b>s</b>o = <b>s</b>omeone else has it · a<b>qu</b>ilo = <b>qu</b>ite far.</p>`,
  trap: "esta (this) vs está (is). The accent changes the word." },
{ id: "perguntas", title: "Question words", units: [1, 3, 6, 7, 10], tags: "questions quem onde como qual quais quanto porque porquê que o que",
  key: "Question word + é que + the rest sounds natural: Onde é que moras?",
  body: tbl(["", "", ""], [
    ["quem", "who", "Quem é ele?"], ["onde", "where", "Onde moras?"], ["de onde", "from where", "De onde és?"],
    ["como", "how", "Como te chamas?"], ["o que", "what (thing)", "O que é isto?"], ["qual / quais", "which, what is…", "Qual é a tua morada?"],
    ["quanto / -a / -os / -as", "how much / many", "Quantas línguas falas?"], ["que", "what (+ noun)", "Que idade tens?"],
    ["porque é que", "why", "Porque é que gostas?"], ["porquê?", "why? (alone)", "— Porquê?"]]),
  trap: "Answer “because” = porque (no accent). Asking “why?” on its own = porquê?" },
{ id: "numeros", title: "Numbers: the traps", units: [1, 2, 3], tags: "numbers cardinal ordinal dezasseis sessenta setenta cem cento quinhentos primeiro",
  key: "Tens + e + units: vinte e três. And e between every part: duzentos e trinta e quatro.",
  body: tbl(["", "", ""], [
    ["11–15", "onze, doze, treze, catorze, quinze", "one-offs"], ["16–19", "dezasseis, dezassete, dezoito, dezanove", "dez + a + …"],
    ["60 / 70", "sessenta / setenta", "from seis / sete"], ["100 / 101", "cem / cento e um", "cem alone"],
    ["500", "quinhentos", "irregular"], ["1.º–5.º", "primeiro, segundo, terceiro, quarto, quinto", "ordinals"]]),
  trap: "1 and 2 agree: um / uma, dois / duas (duas chaves). So do hundreds: duzentas pessoas." },
{ id: "adjetivos", title: "Adjectives", units: [4, 7, 10], tags: "adjectives agreement bom boa mau ma colours muito bastante word order",
  key: "Adjectives go AFTER the noun and agree with it: uma casa pequena.",
  body: tbl(["", "m", "f", "m pl", "f pl"], [
    ["-o", "bonito", "bonita", "bonitos", "bonitas"], ["-e", "grande", "grande", "grandes", "grandes"],
    ["-or", "falador", "faladora", "faladores", "faladoras"], ["irregular", "bom · mau", "boa · má", "bons · maus", "boas · más"]]) +
    `<p><b>muito / bastante</b> go before the adjective: <i>muito bonito</i>. With a verb, after: <i>gosto muito</i>.</p>`,
  trap: "cor-de-rosa and cor de laranja never change: os carros cor-de-rosa." },
{ id: "muito", title: "Muito, pouco, quanto", units: [6, 8], tags: "muito pouco quanto agreement much many little few",
  key: "Before a noun → agrees. After a verb → never changes.",
  body: tbl(["", "o café", "a água", "os livros", "as horas"], [
    ["muito", "muito", "muita", "muitos", "muitas"], ["pouco", "pouco", "pouca", "poucos", "poucas"], ["quanto?", "quanto", "quanta", "quantos", "quantas"]]) +
    `<p><i>Trabalha muito. Estudo pouco.</i> (after a verb)</p>`,
  trap: "por = per: oito horas por dia, cinco dias por semana." },
{ id: "sons", title: "Sounds and spelling", units: [0, 1, 2], tags: "pronunciation sounds s z x r rr ch lh nh nasal ão letters alphabet",
  key: "European Portuguese swallows unstressed vowels and turns final S into “sh”.",
  body: tbl(["letters", "sound", "example"], [
    ["s at the end / before p t c", "sh", "dois, escola"], ["s between vowels", "z", "mesa, casa"], ["s before b d g m n l", "zh", "Lisboa, mesmo"],
    ["r at start, rr", "throat R", "rua, carro"], ["r between vowels", "quick tap", "caro"], ["ch · lh · nh", "sh · ly · ny", "chave · filho · vinho"],
    ["ão · ãe · õe", "nasal", "não · mãe · limões"], ["unstressed o · e", "oo · (almost silent)", "tudo · noite"]]),
  trap: "x is usually sh (caixa), but z in exame and ks in táxi." },
];

// Verbs trainer: [infinitive, English, eu, tu, ele, nós, eles, unit, irregular?]
const VERBS = [
  ["ser", "to be", "sou", "és", "é", "somos", "são", 1, true],
  ["chamar-se", "to be called", "chamo-me", "chamas-te", "chama-se", null, null, 1, false],
  ["morar", "to live", "moro", "moras", "mora", "moramos", "moram", 3, false],
  ["falar", "to speak", "falo", "falas", "fala", "falamos", "falam", 3, false],
  ["estar", "to be (now)", "estou", "estás", "está", "estamos", "estão", 3, true],
  ["ficar", "to stay, to be located", "fico", "ficas", "fica", "ficamos", "ficam", 3, false],
  ["ter", "to have", "tenho", "tens", "tem", "temos", "têm", 5, true],
  ["gostar", "to like", "gosto", "gostas", "gosta", "gostamos", "gostam", 7, false],
  ["trabalhar", "to work", "trabalho", "trabalhas", "trabalha", "trabalhamos", "trabalham", 8, false],
  ["estudar", "to study", "estudo", "estudas", "estuda", "estudamos", "estudam", 8, false],
  ["viajar", "to travel", "viajo", "viajas", "viaja", "viajamos", "viajam", 8, false],
  ["ganhar", "to earn", "ganho", "ganhas", "ganha", "ganhamos", "ganham", 8, false],
  ["usar", "to use, to wear", "uso", "usas", "usa", "usamos", "usam", 8, false],
  ["ler", "to read", "leio", "lês", "lê", "lemos", "leem", 10, true],
  ["ver", "to see, to watch", "vejo", "vês", "vê", "vemos", "veem", 10, true],
  ["dançar", "to dance", "danço", "danças", "dança", "dançamos", "dançam", 10, false],
  ["cozinhar", "to cook", "cozinho", "cozinhas", "cozinha", "cozinhamos", "cozinham", 10, false],
];

// Workbook “Rewrite”: change the whole sentence. [unit, instruction, sentence, answer(s), English of the answer]
const REWRITE = [
  [1, "Make it formal (o senhor).", "Como te chamas?", ["Como se chama?"], "What's your name?"],
  [1, "Answer for Ana, about herself.", "Como te chamas?", ["Chamo-me Ana."], "My name is Ana."],
  [2, "Make it negative.", "Ela é da China.", ["Ela não é da China."], "She isn't from China."],
  [2, "Put it in the plural (elas).", "Ela é de Espanha.", ["Elas são de Espanha."], "They are from Spain."],
  [2, "Replace ser with ficar.", "Moscovo é na Rússia.", ["Moscovo fica na Rússia."], "Moscow is in Russia."],
  [2, "Put it in the plural (nós).", "Eu sou de Portugal.", ["Nós somos de Portugal.", "Somos de Portugal."], "We are from Portugal."],
  [3, "Same sentence about a Louise (a woman).", "O Jules é francês.", ["A Louise é francesa."], "Louise is French."],
  [3, "Put it in the plural (eles).", "Ele fala inglês.", ["Eles falam inglês."], "They speak English."],
  [3, "Make it negative.", "Nós falamos italiano.", ["Nós não falamos italiano.", "Não falamos italiano."], "We don't speak Italian."],
  [4, "Put it in the plural.", "O livro é azul.", ["Os livros são azuis."], "The books are blue."],
  [4, "Put it in the plural.", "A cadeira é branca.", ["As cadeiras são brancas."], "The chairs are white."],
  [4, "Make it a question with isso.", "Isto é uma mesa.", ["Isso é uma mesa?"], "Is that a table?"],
  [5, "Add “é que”.", "Onde está o Pedro?", ["Onde é que está o Pedro?"], "Where is Pedro?"],
  [5, "Add “é que”.", "De onde és?", ["De onde é que és?"], "Where are you from?"],
  [5, "Make it negative.", "Tenho carta de condução.", ["Não tenho carta de condução."], "I don't have a driving licence."],
  [5, "Say it's his (use dele).", "O carro é do Rui.", ["O carro é dele."], "The car is his."],
  [6, "Make it about a woman (a Rita).", "O Pedro é professor.", ["A Rita é professora."], "Rita is a teacher."],
  [6, "Ask the same thing with “que idade”.", "Quantos anos tens?", ["Que idade tens?"], "How old are you?"],
  [7, "Replace o hotel with a casa.", "O hotel é bom.", ["A casa é boa."], "The house is good."],
  [7, "Add muito in the right place.", "A cidade é bonita.", ["A cidade é muito bonita."], "The city is very pretty."],
  [7, "Make it negative.", "Gosto de chá.", ["Não gosto de chá."], "I don't like tea."],
  [8, "Put it in the plural (nós).", "Trabalho num hospital.", ["Trabalhamos num hospital."], "We work in a hospital."],
  [8, "Use muitas in the right place.", "Ela trabalha horas.", ["Ela trabalha muitas horas."], "She works many hours."],
  [9, "Put it in the plural.", "Este é o meu filho.", ["Estes são os meus filhos."], "These are my children."],
  [9, "Put it in the plural.", "Aquela é a tia dele.", ["Aquelas são as tias dele."], "Those are his aunts."],
  [10, "Put it in the plural (eles).", "Ele lê o jornal.", ["Eles leem o jornal."], "They read the newspaper."],
  [10, "Use estar com.", "Tenho fome.", ["Estou com fome."], "I'm hungry."],
  [10, "Make it negative.", "Vejo televisão.", ["Não vejo televisão."], "I don't watch TV."],
];
