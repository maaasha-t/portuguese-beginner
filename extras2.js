// Typed answers, grammar labels and two extra grammar parts.
// Typed question: { t: "w", q: "sentence with ___ (cue)", a: [accepted answers], en: "translation", why }.
// With `say` it is a dictation: listen and write.
// WRITE[chunk]: the first two go into Level 1, the rest into Level 2.

const W2 = (pt, en, hint) => ({ pt, en, hint });

// Which parts are grammar, and where the rule is in the book (shown as a green GRAMÁTICA label).
const GRAM = {
  "u1.apresentar": "p. 26 · chamar-se, ser, o/a + name",
  "u2.paises": "p. 27 · ex. A", "u2.deonde": "p. 27 · ex. B, C, D", "u2.ondefica": "p. 27 · ex. E",
  "u3.nac": "p. 28 · ex. A", "u3.linguas": "p. 28 · ex. B", "u3.estar": "p. 28 · ex. C, D",
  "u4.objetos": "p. 29 · ex. A, B", "u4.isto": "p. 29 · isto/isso/aquilo", "u4.cores": "p. 29 · ex. C, D", "u4.artigos": "p. 29 · ex. E",
  "u5.ter": "p. 48 · ex. A, B, D", "u5.ondeesta": "p. 48 · ex. C", "u5.possessivos": "p. 48 · ex. E", "u5.aqui": "p. 48 · ex. F",
  "u6.profissoes": "p. 49 · ex. A", "u6.andar": "p. 49 · ex. B", "u6.dados": "p. 49 · ex. C",
  "u7.concordancia": "p. 50 · ex. A, D", "u7.gostar": "p. 50 · ex. B, C", "u7.contracoes": "p. 50 · ex. C + 3.ª pessoa",
  "u8.locais": "p. 51 · ex. A", "u8.rotina": "p. 51 · ex. B", "u8.muito": "p. 51 · ex. C, D",
  "u9.poss2": "p. 70 · possessives", "u9.este": "p. 70 · demonstratives",
  "u10.fome": "p. 71 · ser vs estar", "u10.gostos": "p. 71 · ler, ver", "u10.qual": "p. 71 · qual",
};

const NEW_CHUNKS = {
  u4: [{
    id: "artigos", title: "Um or o? Which article", sub: "Gramática E, p. 29",
    explain: `
      <p>Two kinds of “a/the”, like in English:</p>
      <ul>
        <li><b>um / uma</b> (a): something new, mentioned for the first time. <span class="pt">É <b>um</b> dicionário.</span></li>
        <li><b>o / a</b> (the): something you both already know. <span class="pt"><b>O</b> dicionário é do João.</span></li>
      </ul>
      <div class="hook"><div class="eyebrow">Same as English</div>
        “Is that <i>a</i> dictionary? — Yes. <i>The</i> dictionary is João's.” First mention → um/uma. After that → o/a.
      </div>
      <p>Plurals: <span class="pt">os / as</span> (the), and for “some” just drop the article: <span class="pt">um livro → livros</span>.</p>`,
    words: [W2("Aquilo é um dicionário?", "Is that a dictionary?", ""), W2("O jornal português é do João.", "The Portuguese newspaper is João's.", ""),
      W2("A mesa da Raquel não é preta.", "Raquel's table isn't black.", ""), W2("Isto é uma parede?", "Is this a wall?", "")],
    links: [],
    quiz: [
      { q: "Aquilo é ___ dicionário?", opts: ["um", "o", "a"], why: "First mention, asking what it is → um." },
      { q: "___ jornal português é do João.", opts: ["O", "Um", "A"], why: "A specific newspaper we know → o." },
      { q: "___ mesa da Raquel não é preta.", opts: ["A", "Uma", "O"], why: "Raquel's table, a specific one → a." },
      { q: "Isto é ___ parede?", opts: ["uma", "a", "um"], why: "What is it? First mention → uma." },
      { q: "___ livro é vermelho. (the book we talked about)", opts: ["O", "Um", "Uma"], why: "Known book → o." },
    ],
  }],
  u7: [{
    id: "contracoes", title: "nisto, daí, dali + talking politely", sub: "Gramática C and 3.ª pessoa, p. 50",
    explain: `
      <p><b>em</b> also merges with isto / isso / aquilo, like <b>de</b> does:</p>
      <ul>
        <li>em + isto = <b>nisto</b> · em + isso = <b>nisso</b> · em + aquilo = <b>naquilo</b></li>
        <li>de + aí = <b>daí</b> (from there) · de + ali = <b>dali</b> (from over there) · de + aqui = <b>daqui</b> (from here)</li>
      </ul>
      <p><span class="pt">Não penso nisso.</span> I don't think about that. <span class="pt">O hotel é longe dali.</span> The hotel is far from there.</p>
      <div class="hook"><div class="eyebrow">3.ª pessoa: the polite “you”</div>
        In Portugal the formal “you” is the 3rd person verb, usually <b>without a pronoun</b>:<br>
        <span class="pt">Tem carta de condução?</span> Do you have a driving licence?<br>
        Don't know the name? Use <span class="pt">o senhor / a senhora</span>: <span class="pt">O senhor tem carta de condução?</span><br>
        Know the name? Use it: <span class="pt">O Miguel tem carta de condução?</span> (said to Miguel himself!)
      </div>
      <p>“você” exists, but said out loud it can sound blunt in Portugal. The name or <i>o senhor / a senhora</i> is safer.</p>`,
    words: [W2("Não penso nisso.", "I don't think about that.", ""), W2("É longe daqui?", "Is it far from here?", ""), W2("O senhor tem carta de condução?", "Do you (sir) have a driving licence?", ""),
      W2("A Ana quer um café?", "Would you like a coffee, Ana? (polite)", "")],
    links: [],
    quiz: [
      { q: "em + isso =", opts: ["nisso", "emisso", "disso"], why: "em + isso = nisso." },
      { q: "de + ali =", opts: ["dali", "deali", "nali"], why: "de + ali = dali." },
      { q: "O restaurante é perto ___. (de + aí)", opts: ["daí", "de aí", "naí"], why: "de + aí = daí." },
      { q: "Asking a stranger (polite) if they have a pen:", opts: ["Tem uma caneta?", "Tens uma caneta?", "Tu tens uma caneta?"], why: "Polite → 3rd person, no pronoun." },
      { q: "Talking to Miguel politely: “___ tem carta de condução?”", opts: ["O Miguel", "Tu", "Ele"], why: "You can use the person's name instead of “you”." },
    ],
  }],
};

const WRITE = {
// ---------- Lesson 0 (dictation) ----------
"alfabeto.letras": [
  { t: "w", q: "Listen to the spelling and write the name.", say: "erre, i, tê, á", a: ["Rita"], why: "R-I-T-A." },
  { t: "w", q: "Listen to the spelling and write the word.", say: "gê, á, tê, o", a: ["gato"], en: "cat", why: "gê = G." },
  { t: "w", q: "Listen to the spelling and write the city.", say: "ele, i, esse, bê, o, á", a: ["Lisboa"], why: "L-I-S-B-O-A." },
],
"alfabeto.cg": [
  { t: "w", q: "Write the missing letters: bra___o (arm) — sounds “BRA-soo”", a: ["ç"], why: "S sound before o → ç." },
  { t: "w", q: "Write the missing letters: ___erra (war) — hard G before e", a: ["gu"], why: "Hard G before e/i → gu." },
  { t: "w", q: "Write the missing letters: ___ente (hot) — K sound before e", a: ["qu"], why: "K before e/i → qu." },
],
"alfabeto.h": [
  { t: "w", q: "Listen and write the word.", say: "chave", a: ["chave"], en: "key", why: "SH sound → ch." },
  { t: "w", q: "Listen and write the word.", say: "vinho", a: ["vinho"], en: "wine", why: "NY sound → nh." },
  { t: "w", q: "Listen and write the word.", say: "filho", a: ["filho"], en: "son", why: "LY sound → lh." },
],
"alfabeto.s": [
  { t: "w", q: "Listen and write the word.", say: "mesa", a: ["mesa"], en: "table", why: "Z sound between vowels is written with one s." },
  { t: "w", q: "Listen and write the word.", say: "luz", a: ["luz"], en: "light", why: "Final “sh” here is written z." },
],
"alfabeto.r": [
  { t: "w", q: "Listen and write the word.", say: "carro", a: ["carro"], en: "car", why: "Strong R in the middle → rr." },
  { t: "w", q: "Listen and write the word.", say: "caro", a: ["caro"], en: "expensive", why: "Soft tap → one r." },
],
"alfabeto.vogais": [
  { t: "w", q: "Listen and write the word.", say: "mãe", a: ["mãe"], en: "mother", why: "Nasal → ã." },
  { t: "w", q: "Listen and write the word.", say: "não", a: ["não"], en: "no", why: "ão." },
],
// ---------- Unit 1 ----------
"u1.cumprimentar": [
  { t: "w", q: "It's 15:00. Write the greeting: Boa ___!", a: ["tarde"], en: "Good afternoon!", why: "Afternoon → Boa tarde." },
  { t: "w", q: "You're a woman. Thank someone: ___!", a: ["obrigada"], en: "Thank you!", why: "Women say obrigada." },
  { t: "w", q: "Formal: “Bom dia! Como ___?”", a: ["está"], en: "Good morning! How are you?", why: "Formal → está." },
  { t: "w", q: "Welcome Ana (a woman): Bem-___, Ana!", a: ["vinda"], en: "Welcome, Ana!", why: "She arrives → bem-vinda." },
],
"u1.apresentar": [
  { t: "w", q: "___ Jorge. (eu, chamar-se)", a: ["chamo-me"], en: "My name is Jorge.", why: "eu → chamo-me (Gramática p. 26, ex. A)." },
  { t: "w", q: "Eu ___ o Pedro. (ser)", a: ["sou"], en: "I'm Pedro.", why: "eu → sou." },
  { t: "w", q: "Ela ___ Mafalda Raposo. (chamar-se)", a: ["chama-se"], en: "Her name is Mafalda Raposo.", why: "ela → chama-se." },
  { t: "w", q: "___ Raquel? (tu, chamar-se)", a: ["chamas-te"], en: "Is your name Raquel?", why: "tu → chamas-te. No question word → pronoun after the verb." },
  { t: "w", q: "Como ___ chama o senhor?", a: ["se"], en: "What's your name, sir?", why: "After como, the pronoun goes before the verb: se chama." },
  { t: "w", q: "E tu, quem ___? (ser)", a: ["és"], en: "And you, who are you?", why: "tu → és." },
  { t: "w", q: "É ___ Clara. (article)", a: ["a"], en: "It's Clara.", why: "Woman's name → a (Gramática p. 26, ex. D)." },
],
"u1.numeros": [
  { t: "w", q: "Listen and write the number in words.", say: "treze", a: ["treze"], en: "13", why: "13 = treze." },
  { t: "w", q: "Write 16 in words.", a: ["dezasseis"], why: "dez + a + seis." },
  { t: "w", q: "Write 12 in words.", a: ["doze"], why: "12 = doze." },
],
"u1.dias": [
  { t: "w", q: "Write the day: Monday = ___-feira", a: ["segunda"], why: "Monday = segunda-feira." },
  { t: "w", q: "Write the day: Saturday", a: ["sábado"], why: "Saturday = sábado." },
  { t: "w", q: "Write the day: Thursday = ___-feira", a: ["quinta"], why: "Thursday = quinta-feira." },
],
"u1.despedir": [
  { t: "w", q: "See you tomorrow! = Até ___!", a: ["amanhã"], why: "amanhã = tomorrow." },
  { t: "w", q: "See you later (today)! = Até ___!", a: ["logo"], why: "logo = later today." },
],
"u1.pronuncia": [
  { t: "w", q: "Listen and write the word.", say: "obrigado", a: ["obrigado"], en: "thank you", why: "o-bri-GA-do." },
  { t: "w", q: "Listen and write the word.", say: "amanhã", a: ["amanhã"], en: "tomorrow", why: "nh + nasal ã." },
],
// ---------- Unit 2 ----------
"u2.paises": [
  { t: "w", q: "Write the article: ___ Alemanha", a: ["a"], en: "Germany", why: "Feminine → a (Gramática p. 27, ex. A)." },
  { t: "w", q: "Write the article: ___ Japão", a: ["o"], en: "Japan", why: "Masculine → o." },
  { t: "w", q: "Write the article: ___ Estados Unidos", a: ["os"], en: "the United States", why: "Plural → os." },
  { t: "w", q: "Write the article: ___ Filipinas", a: ["as"], en: "the Philippines", why: "Feminine plural → as." },
],
"u2.deonde": [
  { t: "w", q: "Ele é ___ Brasil. (de + o)", a: ["do"], en: "He is from Brazil.", why: "de + o = do (ex. B)." },
  { t: "w", q: "A Samantha é ___ Filipinas.", a: ["das"], en: "Samantha is from the Philippines.", why: "as Filipinas → das." },
  { t: "w", q: "Make it negative: Sou do Japão. → ___ sou do Japão.", a: ["não"], en: "I'm not from Japan.", why: "não before the verb (ex. C)." },
  { t: "w", q: "Eu sou de Portugal. → Nós ___ de Portugal.", a: ["somos"], en: "We are from Portugal.", why: "nós → somos (ex. D)." },
  { t: "w", q: "Ela é de Espanha. → Elas ___ de Espanha.", a: ["são"], en: "They are from Spain.", why: "elas → são." },
],
"u2.ondefica": [
  { t: "w", q: "Munique é ___ Alemanha.", a: ["na"], en: "Munich is in Germany.", why: "em + a = na (ex. E)." },
  { t: "w", q: "Chicago é ___ Estados Unidos.", a: ["nos"], en: "Chicago is in the United States.", why: "em + os = nos." },
  { t: "w", q: "Berlim ___ na Alemanha. (ficar)", a: ["fica"], en: "Berlin is in Germany.", why: "Location of a city → fica." },
  { t: "w", q: "Sintra é ___ Portugal.", a: ["em"], en: "Sintra is in Portugal.", why: "No article → em." },
],
"u2.num21": [
  { t: "w", q: "Write 23 in words.", a: ["vinte e três"], why: "vinte + e + três." },
  { t: "w", q: "Write 60 in words.", a: ["sessenta"], why: "60 = sessenta (from seis)." },
  { t: "w", q: "Write 75 in words.", a: ["setenta e cinco"], why: "setenta + e + cinco." },
],
"u2.pron2": [
  { t: "w", q: "Listen and write the word.", say: "espanhol", a: ["espanhol"], en: "Spanish", why: "es + panh + ol." },
  { t: "w", q: "Listen and write the word.", say: "Atenas", a: ["Atenas"], en: "Athens", why: "A-te-nas." },
],
// ---------- Unit 3 ----------
"u3.nac": [
  { t: "w", q: "A Olga é ___. (russo)", a: ["russa"], en: "Olga is Russian.", why: "-o → -a (ex. A)." },
  { t: "w", q: "A Louise é ___. (francês)", a: ["francesa"], en: "Louise is French.", why: "-ês → -esa, no accent." },
  { t: "w", q: "O Lucas e a Elsa são ___. (sueco)", a: ["suecos"], en: "Lucas and Elsa are Swedish.", why: "Mixed group → masculine plural." },
  { t: "w", q: "Ela é alemã. Fala ___. (the language)", a: ["alemão"], en: "She's German. She speaks German.", why: "The language = the masculine form." },
  { t: "w", q: "Plural of “espanhol”:", a: ["espanhóis"], why: "-ol → -óis." },
],
"u3.linguas": [
  { t: "w", q: "Ele não ___ chinês. (falar)", a: ["fala"], en: "He doesn't speak Chinese.", why: "ele → fala (ex. B)." },
  { t: "w", q: "Não ___ italiano. (nós, falar)", a: ["falamos"], en: "We don't speak Italian.", why: "nós → falamos." },
  { t: "w", q: "Vocês ___ alemão? (falar)", a: ["falam"], en: "Do you speak German?", why: "vocês → falam." },
  { t: "w", q: "___ espanhol? (tu, falar)", a: ["falas"], en: "Do you speak Spanish?", why: "tu → falas." },
  { t: "w", q: "Onde ___ a Ulrika? (morar)", a: ["mora"], en: "Where does Ulrika live?", why: "ela → mora." },
],
"u3.estar": [
  { t: "w", q: "Como ___? (tu, estar)", a: ["estás"], en: "How are you?", why: "tu → estás (ex. C)." },
  { t: "w", q: "___ em Londres. (nós, estar)", a: ["estamos"], en: "We are in London.", why: "nós → estamos." },
  { t: "w", q: "Não ___ muito bem. (eu, estar)", a: ["estou"], en: "I'm not very well.", why: "eu → estou." },
  { t: "w", q: "A Ana e o Ricardo ___ em Roma. (now)", a: ["estão"], en: "Ana and Ricardo are in Rome.", why: "Now → estar, eles → estão (ex. D)." },
  { t: "w", q: "O Christos e a Anna ___ gregos.", a: ["são"], en: "Christos and Anna are Greek.", why: "Nationality → ser." },
],
"u3.num1000": [
  { t: "w", q: "Write 200 in words.", a: ["duzentos"], why: "200 = duzentos." },
  { t: "w", q: "Write 500 in words.", a: ["quinhentos"], why: "Irregular: quinhentos." },
  { t: "w", q: "300 people: ___ pessoas", a: ["trezentas"], en: "300 people", why: "Hundreds agree with feminine nouns: trezentas pessoas." },
  { t: "w", q: "Write 101 in words.", a: ["cento e um"], why: "101 = cento e um." },
],
"u3.pron3": [
  { t: "w", q: "Listen and write the word.", say: "irmã", a: ["irmã"], en: "sister", why: "Short nasal → ã." },
  { t: "w", q: "Listen and write the word.", say: "irmão", a: ["irmão"], en: "brother", why: "ão." },
],
// ---------- Unit 4 ----------
"u4.objetos": [
  { t: "w", q: "Write um or uma: ___ janela", a: ["uma"], en: "a window", why: "Feminine → uma (ex. A)." },
  { t: "w", q: "Write um or uma: ___ mapa", a: ["um"], en: "a map", why: "Trap word: o mapa." },
  { t: "w", q: "Plural: o computador → os ___", a: ["computadores"], why: "-r → -es (ex. B)." },
  { t: "w", q: "Plural: um jornal → ___", a: ["jornais"], why: "-l → -is." },
  { t: "w", q: "Plural: o país → os ___", a: ["países"], why: "-s → -es." },
  { t: "w", q: "Plural: a cadeira → as ___", a: ["cadeiras"], why: "Just add -s." },
],
"u4.isto": [
  { t: "w", q: "You hold it: “O que é ___?”", a: ["isto"], en: "What is this?", why: "Near me → isto." },
  { t: "w", q: "Your friend holds it: “O que é ___?”", a: ["isso"], en: "What is that?", why: "Near you → isso." },
  { t: "w", q: "It's far away: “Como se diz ___ em português?”", a: ["aquilo"], en: "How do you say that in Portuguese?", why: "Far → aquilo." },
],
"u4.cores": [
  { t: "w", q: "Os livros são ___. (azul)", a: ["azuis"], en: "The books are blue.", why: "azul → azuis (ex. C)." },
  { t: "w", q: "A porta é ___. (preto)", a: ["preta"], en: "The door is black.", why: "a porta → preta." },
  { t: "w", q: "As mesas são ___. (branco)", a: ["brancas"], en: "The tables are white.", why: "Feminine plural → brancas." },
  { t: "w", q: "O relógio ___ Ana é branco.", a: ["da"], en: "Ana's watch is white.", why: "de + a = da (ex. D)." },
  { t: "w", q: "É um quadro ___ Van Gogh.", a: ["de"], en: "It's a painting by Van Gogh.", why: "Name without article → de." },
],
"u4.artigos": [
  { t: "w", q: "Write o, a, um or uma: ___ jornal português é do João.", a: ["o"], en: "The Portuguese newspaper is João's.", why: "Known newspaper → o." },
  { t: "w", q: "Write o, a, um or uma: Aquilo é ___ dicionário?", a: ["um"], en: "Is that a dictionary?", why: "First mention → um." },
  { t: "w", q: "Write o, a, um or uma: Isto é ___ parede?", a: ["uma"], en: "Is this a wall?", why: "First mention → uma." },
  { t: "w", q: "Write o, a, um or uma: ___ livro é vermelho.", a: ["o"], en: "The book is red.", why: "A specific book → o (ex. E)." },
],
"u4.aula": [
  { t: "w", q: "I don't understand: Não ___.", a: ["percebo", "compreendo"], why: "Não percebo = Não compreendo." },
  { t: "w", q: "Can you repeat? = Pode ___?", a: ["repetir"], why: "repetir = to repeat." },
  { t: "w", q: "What does “janela” mean? = O que ___ janela?", a: ["significa"], why: "significar = to mean." },
],
"u4.pron4": [
  { t: "w", q: "Listen and write the word.", say: "parede", a: ["parede"], en: "wall", why: "pa-RE-de." },
  { t: "w", q: "Listen and write the word.", say: "verde", a: ["verde"], en: "green", why: "The final e is almost silent but written." },
],
// ---------- Unit 5 ----------
"u5.ter": [
  { t: "w", q: "Ela não ___ passaporte. (ter)", a: ["tem"], en: "She doesn't have a passport.", why: "ela → tem (ex. B)." },
  { t: "w", q: "Não ___ chaves. (nós, ter)", a: ["temos"], en: "We don't have keys.", why: "nós → temos." },
  { t: "w", q: "Vocês ___ dinheiro? (ter)", a: ["têm"], en: "Do you have money?", why: "vocês → têm (with the hat)." },
  { t: "w", q: "Não ___ carta de condução. (eu, ter)", a: ["tenho"], en: "I don't have a driving licence.", why: "eu → tenho." },
  { t: "w", q: "Write dois or duas: ___ chaves", a: ["duas"], en: "two keys", why: "a chave → duas (ex. D)." },
  { t: "w", q: "o passaporte ___ Raul", a: ["do"], en: "Raul's passport", why: "Owner → do (ex. A)." },
],
"u5.ondeesta": [
  { t: "w", q: "Add two words to the question: Onde ___ está o Pedro? (é + que)", a: ["é que"], en: "Where is Pedro?", why: "Question word + é que (ex. C)." },
  { t: "w", q: "I'm at home: Estou ___ casa.", a: ["em"], en: "I'm at home.", why: "em casa, no article." },
  { t: "w", q: "Ele está ___ escritório.", a: ["no"], en: "He's at the office.", why: "o escritório → no." },
],
"u5.possessivos": [
  { t: "w", q: "O ___ lápis está na mala. (eu)", a: ["meu"], en: "My pencil is in the bag.", why: "o lápis → o meu (ex. E)." },
  { t: "w", q: "Onde tens a ___ caneta? (tu)", a: ["tua"], en: "Where's your pen?", why: "a caneta → a tua." },
  { t: "w", q: "O relógio ___ está na secretária. (ele)", a: ["dele"], en: "His watch is on the desk.", why: "His → dele, after the noun." },
  { t: "w", q: "O ___ país é Marrocos. (nós)", a: ["nosso"], en: "Our country is Morocco.", why: "o país → o nosso." },
  { t: "w", q: "Estou na ___ casa. (vocês)", a: ["vossa"], en: "I'm at your house.", why: "a casa → a vossa." },
  { t: "w", q: "O carro ___ está na rua. (elas)", a: ["delas"], en: "Their car is in the street.", why: "Their (f) → delas." },
],
"u5.aqui": [
  { t: "w", q: "O que é isso ___? (near you)", a: ["aí"], en: "What's that there?", why: "isso ↔ aí (ex. F)." },
  { t: "w", q: "Isto ___ é uma moeda de 2 euros. (near me)", a: ["aqui"], en: "This here is a 2-euro coin.", why: "isto ↔ aqui." },
  { t: "w", q: "Aquilo ___ são óculos Ray-Ban. (far)", a: ["ali"], en: "Those over there are Ray-Bans.", why: "aquilo ↔ ali." },
],
"u5.pron5": [
  { t: "w", q: "Listen and write the word.", say: "garrafa", a: ["garrafa"], en: "bottle", why: "Strong R → rr." },
  { t: "w", q: "Listen and write the word.", say: "quem", a: ["quem"], en: "who", why: "qu + em." },
],
// ---------- Unit 6 ----------
"u6.profissoes": [
  { t: "w", q: "Feminine: aluno → ___", a: ["aluna"], why: "-o → -a (ex. A)." },
  { t: "w", q: "Feminine: ator → ___", a: ["atriz"], why: "Irregular." },
  { t: "w", q: "Masculine: professora → ___", a: ["professor"], why: "-ora → -or." },
  { t: "w", q: "Feminine: jornalista → ___", a: ["jornalista"], why: "-ista doesn't change." },
  { t: "w", q: "Feminine: advogado → ___", a: ["advogada"], why: "-o → -a." },
],
"u6.soletrar": [
  { t: "w", q: "Listen to the spelling and write the surname.", say: "esse, o, u, esse, á", a: ["Sousa"], why: "S-O-U-S-A." },
  { t: "w", q: "Listen to the spelling and write the name.", say: "jota, o, agá, á, ene", a: ["Johan"], why: "jota = J, agá = H." },
],
"u6.andar": [
  { t: "w", q: "Write the ordinal: 3.º = ___", a: ["terceiro"], why: "3rd = terceiro." },
  { t: "w", q: "Write the ordinal: 7.º = ___", a: ["sétimo"], why: "7th = sétimo." },
  { t: "w", q: "Ela mora no ___ andar. (2.º)", a: ["segundo"], en: "She lives on the second floor.", why: "2nd = segundo." },
  { t: "w", q: "Read it: D. Pedro IV = Dom Pedro ___", a: ["quarto"], en: "King Pedro IV", why: "Kings use ordinals: IV = quarto." },
],
"u6.dados": [
  { t: "w", q: "___ anos tens? (how many)", a: ["quantos"], en: "How old are you?", why: "os anos → quantos (ex. C)." },
  { t: "w", q: "___ dinheiro tens?", a: ["quanto"], en: "How much money do you have?", why: "o dinheiro → quanto." },
  { t: "w", q: "___ línguas falas?", a: ["quantas"], en: "How many languages do you speak?", why: "as línguas → quantas." },
  { t: "w", q: "Age: ___ 30 anos. (eu)", a: ["tenho"], en: "I'm 30.", why: "Age uses ter." },
  { t: "w", q: "@ is read as ___", a: ["arroba"], why: "@ = arroba." },
],
"u6.pron6": [
  { t: "w", q: "Listen and write the word.", say: "nosso", a: ["nosso"], en: "our", why: "SS = s." },
  { t: "w", q: "Listen and write the word.", say: "casado", a: ["casado"], en: "married", why: "Z sound between vowels = one s." },
],
// ---------- Unit 7 ----------
"u7.adjetivos": [
  { t: "w", q: "Opposite of “bonito”: ___", a: ["feio"], why: "bonito ↔ feio." },
  { t: "w", q: "Opposite of “caro”: ___", a: ["barato"], why: "caro ↔ barato." },
  { t: "w", q: "Opposite of “perto”: ___", a: ["longe"], why: "perto ↔ longe." },
],
"u7.concordancia": [
  { t: "w", q: "Feminine: bonito → ___", a: ["bonita"], why: "-o → -a (ex. A)." },
  { t: "w", q: "Feminine: bom → ___", a: ["boa"], why: "Irregular." },
  { t: "w", q: "Feminine: mau → ___", a: ["má"], why: "Irregular, with an accent." },
  { t: "w", q: "Plural: difícil → ___", a: ["difíceis"], why: "-il → -eis." },
  { t: "w", q: "Não gosto de hotéis ___. (caro)", a: ["caros"], en: "I don't like expensive hotels.", why: "os hotéis → caros, after the noun (ex. D)." },
  { t: "w", q: "Évora é uma cidade ___. (antigo)", a: ["antiga"], en: "Évora is an old city.", why: "a cidade → antiga." },
],
"u7.gostar": [
  { t: "w", q: "Elas ___ Portugal. (gostar de)", a: ["gostam de"], en: "They like Portugal.", why: "elas → gostam + de (ex. B)." },
  { t: "w", q: "O Rui não ___ Rita. (gostar de)", a: ["gosta da"], en: "Rui doesn't like Rita.", why: "gosta + de + a = gosta da." },
  { t: "w", q: "Gostas ___? (de + isso)", a: ["disso"], en: "Do you like that?", why: "de + isso = disso (ex. C)." },
  { t: "w", q: "O centro é longe ___. (de + aqui)", a: ["daqui"], en: "The centre is far from here.", why: "de + aqui = daqui." },
  { t: "w", q: "Não gosto ___. (de + aquilo)", a: ["daquilo"], en: "I don't like that.", why: "de + aquilo = daquilo." },
],
"u7.contracoes": [
  { t: "w", q: "Write: em + isto = ___", a: ["nisto"], why: "em + isto = nisto." },
  { t: "w", q: "Write: de + aí = ___", a: ["daí"], why: "de + aí = daí." },
  { t: "w", q: "Write: em + aquilo = ___", a: ["naquilo"], why: "em + aquilo = naquilo." },
  { t: "w", q: "A escola é longe ___. (de + ali)", a: ["dali"], en: "The school is far from there.", why: "de + ali = dali." },
  { t: "w", q: "Polite, to a stranger: O ___ tem carta de condução?", a: ["senhor"], en: "Do you have a driving licence, sir?", why: "Don't know the name → o senhor / a senhora." },
],
"u7.cidades": [
  { t: "w", q: "Macau é uma cidade rica e muito ___. (modern)", a: ["moderna"], en: "Macau is a rich and very modern city.", why: "a cidade → moderna." },
  { t: "w", q: "O hotel do Song é muito ___. (cheap)", a: ["barato"], en: "Song's hotel is very cheap.", why: "o hotel → barato." },
],
"u7.pron7": [
  { t: "w", q: "Listen and write the word.", say: "pão", a: ["pão"], en: "bread", why: "Nasal ão." },
  { t: "w", q: "Listen and write the word.", say: "dez", a: ["dez"], en: "ten", why: "Final “sh” sound written z." },
],
// ---------- Unit 8 ----------
"u8.locais": [
  { t: "w", q: "Ela trabalha ___ escola. (em + uma)", a: ["numa"], en: "She works in a school.", why: "em + uma = numa (ex. A)." },
  { t: "w", q: "Trabalho ___ escritório. (em + um)", a: ["num"], en: "I work in an office.", why: "em + um = num." },
  { t: "w", q: "Ele é ___ cidade perto de Paris. (de + uma)", a: ["duma"], en: "He's from a city near Paris.", why: "de + uma = duma." },
  { t: "w", q: "Sou ___ país muito pequeno. (de + um)", a: ["dum"], en: "I'm from a very small country.", why: "de + um = dum." },
],
"u8.rotina": [
  { t: "w", q: "Elas não ___ o computador. (usar)", a: ["usam"], en: "They don't use the computer.", why: "elas → usam (ex. B)." },
  { t: "w", q: "___ bem? (tu, ganhar)", a: ["ganhas"], en: "Do you earn well?", why: "tu → ganhas." },
  { t: "w", q: "O Rui e a Ana ___ à noite. (trabalhar)", a: ["trabalham"], en: "Rui and Ana work at night.", why: "eles → trabalham." },
  { t: "w", q: "Não ___ muito. (nós, estudar)", a: ["estudamos"], en: "We don't study much.", why: "nós → estudamos." },
  { t: "w", q: "Trabalho oito horas ___ dia.", a: ["por"], en: "I work eight hours a day.", why: "per day → por dia." },
],
"u8.nuria": [
  { t: "w", q: "Sometimes = às ___", a: ["vezes"], why: "às vezes = sometimes." },
  { t: "w", q: "Unfortunately = ___", a: ["infelizmente"], why: "in + feliz + mente." },
],
"u8.muito": [
  { t: "w", q: "Ele tem ___ dinheiro. (muito)", a: ["muito"], en: "He has a lot of money.", why: "o dinheiro → muito (ex. C)." },
  { t: "w", q: "Ela trabalha ___ horas. (muito)", a: ["muitas"], en: "She works many hours.", why: "as horas → muitas." },
  { t: "w", q: "Ele fala ___ línguas. (pouco)", a: ["poucas"], en: "He speaks few languages.", why: "as línguas → poucas (ex. D)." },
  { t: "w", q: "A garrafa tem ___ água. (pouco)", a: ["pouca"], en: "The bottle has little water.", why: "a água → pouca." },
  { t: "w", q: "O Jorge estuda ___. (muito)", a: ["muito"], en: "Jorge studies a lot.", why: "After a verb → no change." },
],
"u8.opiniao": [
  { t: "w", q: "I think that… = Eu ___ que…", a: ["acho"], why: "achar = to think." },
  { t: "w", q: "Listen and write the word.", say: "dinheiro", a: ["dinheiro"], en: "money", why: "NY sound → nh." },
],
// ---------- Unit 9 ----------
"u9.familia": [
  { t: "w", q: "A mãe da minha mãe é a minha ___.", a: ["avó"], en: "My mother's mother is my grandmother.", why: "avó (open ó)." },
  { t: "w", q: "A irmã da minha mãe é a minha ___.", a: ["tia"], en: "My mother's sister is my aunt.", why: "tia = aunt." },
  { t: "w", q: "o pai + a mãe = os ___", a: ["pais"], en: "the parents", why: "os pais = parents." },
  { t: "w", q: "O filho do meu filho é o meu ___.", a: ["neto"], en: "My son's son is my grandson.", why: "neto = grandson." },
  { t: "w", q: "Feminine: o irmão → a ___", a: ["irmã"], why: "-ão → -ã." },
],
"u9.poss2": [
  { t: "w", q: "Plural: o meu filho → os ___ filhos", a: ["meus"], en: "my children", why: "meu → meus." },
  { t: "w", q: "Plural: a tua irmã → as ___ irmãs", a: ["tuas"], en: "your sisters", why: "tua → tuas." },
  { t: "w", q: "Plural: o nosso chefe → os ___ chefes", a: ["nossos"], en: "our bosses", why: "nosso → nossos." },
  { t: "w", q: "Plural: a vossa casa → as ___ casas", a: ["vossas"], en: "your houses", why: "vossa → vossas." },
],
"u9.este": [
  { t: "w", q: "Plural: Este é o meu filho. → ___ são os meus filhos.", a: ["Estes"], en: "These are my children.", why: "este → estes." },
  { t: "w", q: "Near you: ___ caneta é minha!", a: ["Essa"], en: "That pen is mine!", why: "a caneta, near you → essa." },
  { t: "w", q: "Far: ___ casa é do meu avô.", a: ["Aquela"], en: "That house is my grandfather's.", why: "a casa, far → aquela." },
  { t: "w", q: "Plural: Aquela é a tia dele. → ___ são as tias dele.", a: ["Aquelas"], en: "Those are his aunts.", why: "aquela → aquelas." },
],
"u9.pron9": [
  { t: "w", q: "Listen and write the word.", say: "mulher", a: ["mulher"], en: "woman", why: "LH." },
  { t: "w", q: "Listen and write the word.", say: "avô", a: ["avô"], en: "grandfather", why: "Closed ô." },
],
// ---------- Unit 10 ----------
"u10.aparencia": [
  { t: "w", q: "Ela ___ alta. (ser)", a: ["é"], en: "She is tall.", why: "Adjective → ser." },
  { t: "w", q: "Ele ___ olhos azuis. (ter)", a: ["tem"], en: "He has blue eyes.", why: "Body → ter." },
  { t: "w", q: "Ela ___ óculos. (usar)", a: ["usa"], en: "She wears glasses.", why: "usar óculos." },
  { t: "w", q: "Opposite of “alto”: ___", a: ["baixo"], why: "alto ↔ baixo." },
],
"u10.fome": [
  { t: "w", q: "I'm hungry: Estou com ___.", a: ["fome"], why: "fome = hunger." },
  { t: "w", q: "I'm thirsty: Estou com ___.", a: ["sede"], why: "sede = thirst." },
  { t: "w", q: "Ele ___ cansado hoje. (ser / estar)", a: ["está"], en: "He's tired today.", why: "Temporary → estar." },
  { t: "w", q: "Ele ___ magro. (ser / estar)", a: ["é"], en: "He's thin.", why: "Permanent → ser." },
],
"u10.gostos": [
  { t: "w", q: "Eu ___ muito. (ler)", a: ["leio"], en: "I read a lot.", why: "ler → leio." },
  { t: "w", q: "Eu ___ muitos filmes. (ver)", a: ["vejo"], en: "I watch a lot of films.", why: "ver → vejo." },
  { t: "w", q: "Eles ___ televisão. (ver)", a: ["veem"], en: "They watch TV.", why: "ver → veem." },
  { t: "w", q: "Nós ___ o jornal. (ler)", a: ["lemos"], en: "We read the newspaper.", why: "ler → lemos." },
  { t: "w", q: "Gosto ___ dançar.", a: ["de"], en: "I like dancing.", why: "gostar de + verb." },
],
"u10.qual": [
  { t: "w", q: "___ é a tua morada?", a: ["qual"], en: "What's your address?", why: "Qual é + o/a…" },
  { t: "w", q: "___ são os teus livros?", a: ["quais"], en: "Which are your books?", why: "Plural → quais." },
],
"u10.pron10": [
  { t: "w", q: "Listen and write the word.", say: "baixo", a: ["baixo"], en: "short", why: "SH sound → x." },
  { t: "w", q: "Listen and write the word.", say: "próximo", a: ["próximo"], en: "next", why: "x here = s." },
],
};
