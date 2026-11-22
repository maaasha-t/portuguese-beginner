// Cábulas (cheat-sheet cards), the verb list for the Verbs trainer, and Rewrite tasks for the Workbook.

const tbl = (head, rows) => `<div class="tbl"><table><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

const CARDS = [
{ id: "regular", title: "Regular verbs: present", units: [3, 8], tags: "verbs conjugation endings ar er ir falar comer partir presente",
  key: "Drop -ar / -er / -ir and add the ending. eu is always -o. After that, -ar verbs use A, -er and -ir verbs use E.",
  body: tbl(["", "falar", "comer", "partir"], [
    ["eu", "fal<b>o</b>", "com<b>o</b>", "part<b>o</b>"], ["tu", "fal<b>as</b>", "com<b>es</b>", "part<b>es</b>"],
    ["ele / você", "fal<b>a</b>", "com<b>e</b>", "part<b>e</b>"], ["nós", "fal<b>amos</b>", "com<b>emos</b>", "part<b>imos</b>"],
    ["eles / vocês", "fal<b>am</b>", "com<b>em</b>", "part<b>em</b>"]]) +
    `<p>Same pattern: morar, ficar, trabalhar, estudar, viajar, ganhar, usar, gostar.</p>`,
  trap: "-ar is the odd one: falas, fala, falamos, falam (A). -er and -ir share the same E endings (comes / partes, come / parte, comem / partem), except nós: comemos / partimos." },
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
    ["eu", "chamo", "<b>-me</b>", "my name is"], ["tu", "chamas", "<b>-te</b>", "your name is"], ["ele / ela / você", "chama", "<b>-se</b>", "his / her / your name is"],
    ["nós", "chamamo(s)", "<b>-nos</b>", "our names are"], ["eles / elas / vocês", "chamam", "<b>-se</b>", "their / your names are"]]) +
    `<p>Questions: <i>Como te chamas?</i> (to a friend) · <i>Como se chama?</i> (polite). In a question the little word jumps before the verb.</p>`,
  trap: "eu → -me, tu → -te, nós → -nos, everyone else → -se: Elas chamam-se Maria e Fátima. Como se chamam eles? With nós the -s of chamamos drops: chamamo-nos." },
{ id: "serestar", title: "Ser or estar?", units: [3, 10], tags: "ser estar to be permanent temporary now how where polite formal você o senhor a senhora you",
  key: "ser = what it IS. estar = how or where it is NOW.",
  body: `<div class="use"><div class="uh u-ser">ser · always, who or what</div>
    <div class="ur"><span class="uw">origin, job</span><span><b>Sou de Lisboa. Sou médica.</b> I'm from Lisbon. I'm a doctor.</span></div>
    <div class="ur"><span class="uw">looks</span><span><b>Ela é alta.</b> She's tall.</span></div>
</div>
  <div class="use"><div class="uh u-pol">polite “you” = é, without você</div>
    <div class="ur"><span class="uw">to a stranger</span><span><b>Desculpe, é o Rui?</b> Excuse me, are you Rui?</span></div>
    <div class="ur"><span class="uw">friend / him</span><span><b>És o Rui?</b> Are you Rui? · <b>Ele é o Rui?</b> Is he Rui?</span></div></div>
  <div class="use"><div class="uh u-estar">estar · now, can change</div>
    <div class="ur"><span class="uw">place now</span><span><b>Estou em casa.</b> I'm at home.</span></div>
    <div class="ur"><span class="uw">feeling</span><span><b>Estou cansada.</b> I'm tired.</span></div>
    <div class="ur"><span class="uw">doing now</span><span><b>Estou a ler.</b> I'm reading.</span></div></div>
  <div class="use"><div class="uh u-both">same word, new meaning</div>
    <div class="ur"><span class="uw">always / today</span><span><b>Ela é bonita</b> = she's pretty. <b>Ela está bonita</b> = she looks pretty today.</span></div></div>`,
  trap: "Cities never move → ser / ficar: <i>Lisboa fica em Portugal.</i> You now → estar: <i>Estou em Lisboa.</i>" },
{ id: "preposicoes", title: "Prepositions", units: [2, 3, 5, 6, 7, 8], tags: "prepositions em de a para com sem por até perto longe ao à comigo where when from to with",
  key: "em = where you are. de = from. a / para = where you go.",
  body: `<div class="use"><div class="uh u-ser">em · in, on, at</div>
    <div class="ur"><span class="uw">place</span><span><b>Estou no café.</b> I'm at the café.</span></div>
    <div class="ur"><span class="uw">day</span><span><b>no sábado</b> on Saturday</span></div></div>
  <div class="use"><div class="uh u-estar">de · from, of</div>
    <div class="ur"><span class="uw">origin</span><span><b>Sou da Ucrânia.</b> I'm from Ukraine.</span></div>
    <div class="ur"><span class="uw">whose</span><span><b>o carro do Rui</b> Rui's car</span></div>
    <div class="ur"><span class="uw">transport</span><span><b>de carro</b> by car · <b>a pé</b> on foot</span></div></div>
  <div class="use"><div class="uh u-pol">a, para · to, for</div>
    <div class="ur"><span class="uw">go to</span><span><b>Vou ao Porto. Vou para casa.</b></span></div>
    <div class="ur"><span class="uw">clock</span><span><b>às três</b> at three</span></div>
    <div class="ur"><span class="uw">for</span><span><b>Isto é para ti.</b> It's for you.</span></div></div>
  <div class="use"><div class="uh u-both">com · sem · por · até</div>
    <div class="ur"><span class="uw">with, without</span><span><b>com leite, sem açúcar</b></span></div>
    <div class="ur"><span class="uw">per, until</span><span><b>por semana · até amanhã</b></span></div></div>`,
  trap: "a + o = <b>ao</b>, a + a = <b>à</b>. com + eu = <b>comigo</b>. Near / far: <i>perto <b>de</b>, longe <b>de</b></i>." },
{ id: "paises", title: "Countries: do, da, no, na", units: [2], tags: "countries países paises de em do da dos no na nos article Cabo Verde Timor exam",
  key: "é / são de + country (from), fica em + country (in). de / em glue to the country's article.",
  body: tbl(["country", "from (de)", "in (em)"], [
    ["o Brasil, o Egito, o Japão, o Paquistão", "<b>do</b> Brasil", "<b>no</b> Brasil"],
    ["a China, a Índia, a Polónia, a Nigéria", "<b>da</b> China", "<b>na</b> China"],
    ["os Estados Unidos", "<b>dos</b> Estados Unidos", "<b>nos</b> Estados Unidos"],
    ["as Filipinas", "<b>das</b> Filipinas", "<b>nas</b> Filipinas"],
    ["Portugal, Angola, Moçambique, Cabo Verde, Timor-Leste, Marrocos", "<b>de</b> Angola", "<b>em</b> Angola"]]) +
    `<p><i>O Kofi é <b>da</b> Nigéria. Xangai fica <b>na</b> China. Luanda fica <b>em</b> Angola. A Joana é <b>de</b> Timor-Leste.</i></p>`,
  trap: "Cities: no article (de Lisboa, em Lisboa), except o Porto: do Porto, no Porto." },
{ id: "familia", title: "Family", units: [9], tags: "family família familia avô avó neto tio sobrinho primo marido mulher sou a sou o exam",
  key: "“O meu tio chama-se Paulo. Sou a ___ do Paulo.” Flip the relation, then look at o / a before the gap: a = a woman speaks.",
  body: tbl(["they are my…", "so I am their… (o / a)"], [
    ["avô / avó", "neto / neta"], ["pai / mãe", "filho / filha"], ["tio / tia", "<b>sobrinho / sobrinha</b>"],
    ["primo / prima", "primo / prima"], ["irmão / irmã", "irmão / irmã"], ["marido", "mulher"], ["mulher", "marido"]]) +
    `<p>Groups: <i>os pais</i> (parents), <i>os filhos</i> (children), <i>os irmãos</i> (siblings), <i>os avós</i> (grandparents).</p>`,
  trap: "Grandpa has a hat: avô. Grandma: avó. Never a tilde (avõ). tio → sobrinha, not prima." },
{ id: "trabalho", title: "Work words", units: [6, 8], tags: "work trabalho profissão profissao hospital escola escritório por dia ao fim de semana às vezes gostar de com num numa exam",
  key: "Where people work, how often, and the little words around it.",
  body: `<div class="use"><div class="uh u-ser">who works where · num / numa</div>
    <div class="ur"><span class="uw">num (o-word)</span><span><b>num</b> hospital (enfermeira, médico) · escritório (empregado de escritório) · restaurante (cozinheiro)</span></div>
    <div class="ur"><span class="uw">numa (a-word)</span><span><b>numa</b> escola (professor/a) · loja · empresa</span></div></div>
  <div class="use"><div class="uh u-estar">how often, when</div>
    <div class="ur"><span class="uw">per</span><span>oito horas <b>por</b> dia · cinco dias <b>por</b> semana</span></div>
    <div class="ur"><span class="uw">when</span><span><b>Às</b> vezes · <b>ao</b> fim de semana · <b>ao</b> sábado · <b>à</b> noite</span></div></div>
  <div class="use"><div class="uh u-pol">little words</div>
    <div class="ur"><span class="uw">questions</span><span>Qual é a tua <b>profissão</b>? — Sou engenheiro. (no article with jobs)</span></div>
    <div class="ur"><span class="uw">with verbs</span><span>gosta <b>de</b> ser cozinheira · trabalho <b>com</b> o Pedro</span></div></div>`,
  trap: "ao fim de semana: a + o = ao, not no." },
{ id: "ordem", title: "Word order", units: [1, 2, 3, 4, 7, 10], tags: "word order ordem frases sentence não question pergunta adjective um pouco de exam",
  key: "Who → (não) → verb → the rest. A question word goes first.",
  body: tbl(["pattern", "example"], [
    ["who + verb + rest", "<i>Eles moram em Faro.</i>"],
    ["não right before the verb", "<i>O Paulo <b>não</b> é alemão.</i>"],
    ["question word first", "<i><b>Onde</b> mora a Rita agora?</i> · <i><b>Quantas</b> línguas fala a Marta?</i>"],
    ["yes/no question = same order", "<i>Ele é de Londres?</i> (only the voice goes up)"],
    ["adjective after the noun", "<i>a caneta <b>vermelha</b></i> · <i>uma cidade <b>bonita</b></i>"],
    ["muito / bastante before the adjective", "<i>muito bonita</i> · after a verb: <i>falamos muito bem</i>"],
    ["whose: thing + de + owner", "<i>o telemóvel <b>da</b> Ana</i>"]]),
  trap: "Keep groups together: falo um pouco de espanhol · Como se diz aquilo em inglês?" },
{ id: "contracoes", title: "Little words that merge", units: [2, 5, 7, 8], tags: "contractions de em do da no na num numa disto nisto prepositions articles",
  key: "Preposition + o / a / os / as = one word. Always. Never “em o”.",
  body: tbl(["", "o", "a", "os", "as", "um / uma", "isto"], [
    ["de", "<b>do</b>", "<b>da</b>", "<b>dos</b>", "<b>das</b>", "dum / duma", "disto"],
    ["em", "<b>no</b>", "<b>na</b>", "<b>nos</b>", "<b>nas</b>", "num / numa", "nisto"]]) +
    `<p>Also: <b>daqui, daí, dali</b> (de + aqui / aí / ali), <b>disso, daquilo, nisso, naquilo</b>.</p>`,
  trap: "No article, no merge: de Portugal, em Lisboa, em casa." },
{ id: "artigos", title: "Articles and gender", units: [1, 2, 4], tags: "articles gender o a um uma masculine feminine dia mapa countries exceptions cidade mão país",
  key: "o / a = the (you both know it). um / uma = a (first mention). -o is usually masculine, -a usually feminine.",
  body: tbl(["", "masculine", "feminine"], [["the", "o · os", "a · as"], ["a / some", "um · uns", "uma · umas"]]) +
    `<div class="use"><div class="uh u-ser">exceptions: o, but ends in -a</div>
    <div class="ur"><span class="uw">o …</span><span>o <b>dia</b>, o <b>mapa</b>, o <b>problema</b>, o <b>programa</b>, o <b>cinema</b>, o <b>sofá</b></span></div></div>
  <div class="use"><div class="uh u-pol">exceptions: a, but not -a</div>
    <div class="ur"><span class="uw">always a</span><span>-dade: a <b>cidade</b>, a idade · -ção: a <b>lição</b>, a <b>televisão</b> · -agem: a <b>viagem</b></span></div>
    <div class="ur"><span class="uw">learn one by one</span><span>a <b>mão</b>, a <b>tarde</b>, a <b>noite</b>, a <b>chave</b>, a <b>parede</b>, a <b>cor</b>, a <b>mulher</b></span></div></div>
  <div class="use"><div class="uh u-estar">masculine in Portuguese, feminine in Russian</div>
    <div class="ur"><span class="uw">o …</span><span>o <b>país</b> (страна), o <b>café</b>, o <b>hotel</b>, o <b>jornal</b>, o <b>lápis</b>, o <b>nome</b></span></div></div>
  <div class="use"><div class="uh u-both">no article</div>
    <div class="ur"><span class="uw">countries</span><span>Portugal, Angola, Moçambique, Cabo Verde, Timor-Leste, Marrocos (but <b>o</b> Brasil)</span></div>
    <div class="ur"><span class="uw">other</span><span>cities (but <b>o</b> Porto) · jobs: <i>Sou médica</i> · <i>em casa</i> · after chamar-se</span></div></div>`,
  trap: "Names take o / a when you talk about someone: o Pedro, a casa da Ana. Same word for both: o / a estudante, chefe, colega, jornalista." },
{ id: "plural", title: "Making plurals", units: [4], tags: "plural nouns adjectives es is ns oes aes",
  key: "Vowel → add -s. Consonant → add -es. Then the special endings.",
  body: tbl(["ending", "singular", "plural"], [
    ["vowel", "mesa", "mesa<b>s</b>"], ["-r, -z, -s", "computador · rapaz · país", "computador<b>es</b> · rapaz<b>es</b> · país<b>es</b>"],
    ["-l", "jornal · azul · difícil", "jorna<b>is</b> · azu<b>is</b> · difíce<b>is</b>"], ["-m", "viagem", "viage<b>ns</b>"],
    ["-ão", "avião · cão · mão", "avi<b>ões</b> · c<b>ães</b> · m<b>ãos</b>"], ["no change", "lápis", "lápis"]]),
  trap: "-ão has three plurals. The most common is -ões. Learn cães and mãos as exceptions." },
{ id: "possessivos", title: "Possessives: my, your, his", units: [5, 9], tags: "possessives possessivos meu minha teu tua seu sua nosso vosso dele dela deles de quem",
  key: "Two steps: 1) who owns it → meu / teu / nosso / vosso; 2) o or a before the gap → meu or minha. dele / dela look only at the owner.",
  body: tbl(["", "o … (m)", "a … (f)", "os / as …"], [
    ["my", "o meu", "a minha", "os meus / as minhas"], ["your (tu)", "o teu", "a tua", "os teus / as tuas"],
    ["your (você)", "o seu", "a sua", "os seus / as suas"], ["our", "o nosso", "a nossa", "os nossos / as nossas"],
    ["your (vocês)", "o vosso", "a vossa", "os vossos / as vossas"]]) +
    `<p><b>his / her / their</b> = de + ele / ela / eles. Pick it by the <b>owner</b>, not the thing. It goes after the noun and never changes: <i>a cidade <b>dele</b></i> (his city), <i>o carro <b>dela</b></i> (her car), <i>os filhos <b>deles</b></i>.</p>`,
  trap: "Owner in brackets (tu) → teu. No brackets → the person in the sentence before (Ela é de Angola → dela; Somos… → nosso). De quem é isto? É teu (tu) · É dela (ela) · É seu (o senhor)." },
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
{ id: "numeros", title: "Numbers in words", units: [1, 2, 3], tags: "numbers cardinal dezasseis sessenta setenta cem cento quinhentos mil primeiro exam",
  key: "Build it from parts and put e between them: 145 = cento e quarenta e cinco. After mil, e only before a number under 100 or round hundreds.",
  body: tbl(["", "", ""], [
    ["0–10", "zero, um, dois, três, quatro, cinco, seis, sete, oito, nove, dez", ""],
    ["11–19", "onze, doze, treze, catorze, quinze · dezasseis, dezassete, dezoito, dezanove", "16–19 = dez + six…"],
    ["20–90", "vinte, trinta, quarenta, cinquenta, <b>sessenta</b>, <b>setenta</b>, oitenta, noventa", "60 from seis, 70 from sete"],
    ["100", "<b>cem</b> alone · 101–199: <b>cento</b> e …", "cem · cento e um"],
    ["200–900", "duzentos, trezentos, quatrocentos, <b>quinhentos</b>, seiscentos, setecentos, oitocentos, novecentos", "500 is special"],
    ["1000", "<b>mil</b> (never “um mil”)", ""]]) +
    `<p><i>92 noventa e dois · 145 cento e quarenta e cinco · 632 seiscentos e trinta e dois · 777 setecentos e setenta e sete · <b>1015 mil e quinze</b> · 1234 mil duzentos e trinta e quatro</i></p>`,
  trap: "1, 2 and hundreds agree with feminine nouns: uma casa, duas chaves, duzentas pessoas. For counting and phone numbers use um, dois." },
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
  ["chamar-se", "to be called", "chamo-me", "chamas-te", "chama-se", "chamamo-nos", "chamam-se", 1, false],
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
