// Formas trainer: gender & number of adjectives / nouns, phrases that agree, and verbs in context ("who is it?").

// Adjectives and other words with 4 forms: [m sg, f sg, m pl, f pl, English, unit, topic, type]
const ADJ = [
  ["bonito", "bonita", "bonitos", "bonitas", "pretty", 7, "u7.concordancia", "o"],
  ["pequeno", "pequena", "pequenos", "pequenas", "small", 7, "u7.concordancia", "o"],
  ["novo", "nova", "novos", "novas", "new, young", 7, "u7.concordancia", "o"],
  ["velho", "velha", "velhos", "velhas", "old", 7, "u7.concordancia", "o"],
  ["caro", "cara", "caros", "caras", "expensive", 7, "u7.concordancia", "o"],
  ["barato", "barata", "baratos", "baratas", "cheap", 7, "u7.concordancia", "o"],
  ["antigo", "antiga", "antigos", "antigas", "old, historic", 7, "u7.concordancia", "o"],
  ["simpático", "simpática", "simpáticos", "simpáticas", "nice", 7, "u7.concordancia", "o"],
  ["alto", "alta", "altos", "altas", "tall", 10, "u10.aparencia", "o"],
  ["magro", "magra", "magros", "magras", "thin", 10, "u10.aparencia", "o"],
  ["cansado", "cansada", "cansados", "cansadas", "tired", 10, "u10.fome", "o"],
  ["casado", "casada", "casados", "casadas", "married", 6, "u6.dados", "o"],
  ["branco", "branca", "brancos", "brancas", "white", 4, "u4.cores", "o"],
  ["preto", "preta", "pretos", "pretas", "black", 4, "u4.cores", "o"],
  ["vermelho", "vermelha", "vermelhos", "vermelhas", "red", 4, "u4.cores", "o"],
  ["amarelo", "amarela", "amarelos", "amarelas", "yellow", 4, "u4.cores", "o"],
  ["grande", "grande", "grandes", "grandes", "big", 7, "u7.concordancia", "e"],
  ["verde", "verde", "verdes", "verdes", "green", 4, "u4.cores", "e"],
  ["pobre", "pobre", "pobres", "pobres", "poor", 7, "u7.concordancia", "e"],
  ["interessante", "interessante", "interessantes", "interessantes", "interesting", 8, "u8.nuria", "e"],
  ["azul", "azul", "azuis", "azuis", "blue", 4, "u4.cores", "l"],
  ["difícil", "difícil", "difíceis", "difíceis", "difficult", 7, "u7.concordancia", "l"],
  ["agradável", "agradável", "agradáveis", "agradáveis", "pleasant", 7, "u7.concordancia", "l"],
  ["falador", "faladora", "faladores", "faladoras", "talkative", 7, "u7.concordancia", "or"],
  ["professor", "professora", "professores", "professoras", "teacher", 6, "u6.profissoes", "or"],
  ["bom", "boa", "bons", "boas", "good", 7, "u7.concordancia", "irr"],
  ["mau", "má", "maus", "más", "bad", 7, "u7.concordancia", "irr"],
  ["ator", "atriz", "atores", "atrizes", "actor", 6, "u6.profissoes", "irr"],
  ["português", "portuguesa", "portugueses", "portuguesas", "Portuguese", 3, "u3.nac", "es"],
  ["inglês", "inglesa", "ingleses", "inglesas", "English", 3, "u3.nac", "es"],
  ["francês", "francesa", "franceses", "francesas", "French", 3, "u3.nac", "es"],
  ["japonês", "japonesa", "japoneses", "japonesas", "Japanese", 3, "u3.nac", "es"],
  ["alemão", "alemã", "alemães", "alemãs", "German", 3, "u3.nac", "ao"],
  ["espanhol", "espanhola", "espanhóis", "espanholas", "Spanish", 3, "u3.nac", "ol"],
  ["russo", "russa", "russos", "russas", "Russian", 3, "u3.nac", "o"],
  ["médico", "médica", "médicos", "médicas", "doctor", 6, "u6.profissoes", "o"],
  ["estudante", "estudante", "estudantes", "estudantes", "student", 6, "u6.profissoes", "e"],
  ["jornalista", "jornalista", "jornalistas", "jornalistas", "journalist", 6, "u6.profissoes", "e"],
  ["belga", "belga", "belgas", "belgas", "Belgian", 3, "u3.nac", "e"],
];
const FORM_RULE = {
  o: "-o → -a for feminine. Plural: add -s (-os / -as).",
  e: "Same for him and her. Plural: add -s.",
  l: "Same for him and her. Plural: -l → -is (azul → azuis, difícil → difíceis).",
  or: "-or → -ora for feminine. Plural: -ores / -oras.",
  es: "-ês → -esa for feminine (the accent goes). Plural: -eses / -esas.",
  ao: "alemão → alemã · alemães · alemãs.",
  ol: "-ol → -ola for feminine. Plural: -óis / -olas.",
  irr: "Irregular: learn by heart (bom/boa, mau/má, ator/atriz).",
};

// Nouns: [singular with article, plural with article, English, unit, topic, rule]
const NOUNS = [
  ["a mesa", "as mesas", "table", 4, "u4.objetos", "Ends in a vowel → add -s."],
  ["o livro", "os livros", "book", 4, "u4.objetos", "Ends in a vowel → add -s."],
  ["a parede", "as paredes", "wall", 4, "u4.objetos", "Ends in a vowel → add -s."],
  ["o computador", "os computadores", "computer", 4, "u4.objetos", "-r → add -es."],
  ["o rapaz", "os rapazes", "boy", 4, "u4.objetos", "-z → add -es."],
  ["o país", "os países", "country", 4, "u4.objetos", "-s → add -es."],
  ["a mulher", "as mulheres", "woman", 9, "u9.familia", "-r → add -es."],
  ["o jornal", "os jornais", "newspaper", 4, "u4.objetos", "-l → -is."],
  ["o hotel", "os hotéis", "hotel", 7, "u7.concordancia", "-el → -éis."],
  ["a viagem", "as viagens", "trip", 4, "u4.objetos", "-m → -ns."],
  ["o avião", "os aviões", "plane", 4, "u4.objetos", "-ão → -ões (the most common)."],
  ["o cão", "os cães", "dog", 4, "u4.objetos", "-ão → -ães (exception)."],
  ["a mão", "as mãos", "hand", 4, "u4.objetos", "-ão → -ãos (exception)."],
  ["o irmão", "os irmãos", "brother", 9, "u9.familia", "-ão → -ãos (exception)."],
  ["o lápis", "os lápis", "pencil", 4, "u4.objetos", "No change, only the article."],
  ["a chave", "as chaves", "key", 5, "u5.ter", "Ends in a vowel → add -s."],
  ["a cidade", "as cidades", "city", 7, "u7.concordancia", "Ends in a vowel → add -s."],
];

// Whole phrases where everything has to agree: [phrase, instruction, answer(s), English of answer, unit, topic]
const PHRASES = [
  ["o meu livro novo", "plural", ["os meus livros novos"], "my new books", 5, "u5.possessivos"],
  ["a minha casa pequena", "plural", ["as minhas casas pequenas"], "my small houses", 5, "u5.possessivos"],
  ["o teu carro branco", "plural", ["os teus carros brancos"], "your white cars", 5, "u5.possessivos"],
  ["a tua mala azul", "plural", ["as tuas malas azuis"], "your blue bags", 5, "u5.possessivos"],
  ["o nosso amigo simpático", "plural", ["os nossos amigos simpáticos"], "our nice friends", 5, "u5.possessivos"],
  ["a nossa cidade antiga", "plural", ["as nossas cidades antigas"], "our old cities", 7, "u7.concordancia"],
  ["este hotel caro", "plural", ["estes hotéis caros"], "these expensive hotels", 9, "u9.este"],
  ["aquela rapariga alta", "plural", ["aquelas raparigas altas"], "those tall girls", 9, "u9.este"],
  ["o filho dele", "plural", ["os filhos dele"], "his children", 9, "u9.poss2"],
  ["um dia difícil", "plural", ["uns dias difíceis", "dias difíceis"], "(some) difficult days", 7, "u7.concordancia"],
  ["o meu amigo simpático", "feminine (a friend who is a woman)", ["a minha amiga simpática"], "my nice (female) friend", 5, "u5.possessivos"],
  ["o professor português", "feminine", ["a professora portuguesa"], "the Portuguese (female) teacher", 6, "u6.profissoes"],
  ["um ator espanhol", "feminine", ["uma atriz espanhola"], "a Spanish actress", 6, "u6.profissoes"],
  ["o teu irmão alemão", "feminine", ["a tua irmã alemã"], "your German sister", 9, "u9.familia"],
  ["este médico inglês", "feminine", ["esta médica inglesa"], "this English (female) doctor", 9, "u9.este"],
  ["o vinho é bom", "change to: a cerveja", ["a cerveja é boa"], "the beer is good", 7, "u7.concordancia"],
  ["o quarto é pequeno e bonito", "change to: as casas", ["as casas são pequenas e bonitas"], "the houses are small and pretty", 7, "u7.concordancia"],
  ["o livro dela é vermelho", "change to: as canetas", ["as canetas dela são vermelhas"], "her pens are red", 5, "u5.possessivos"],
];

// Verbs in context: [verb, rest of sentence, topic]
const WHO_REST = {
  ser: ["de Portugal", "u2.deonde"], estar: ["em casa", "u3.estar"], ter: ["dois irmãos", "u5.ter"],
  falar: ["inglês", "u3.linguas"], morar: ["em Lisboa", "u3.linguas"], ficar: ["em casa hoje", "u3.linguas"],
  gostar: ["de café", "u7.gostar"], trabalhar: ["num escritório", "u8.rotina"], estudar: ["português", "u8.rotina"],
  viajar: ["muito", "u8.rotina"], ganhar: ["bem", "u8.rotina"], usar: ["óculos", "u10.aparencia"],
  ler: ["o jornal", "u10.gostos"], ver: ["televisão", "u10.gostos"], dançar: ["salsa", "u10.gostos"], cozinhar: ["bem", "u10.gostos"],
};
// [subject, person index 0..4, hint about who it is]
const WHO_SUBJ = [
  ["Eu", 0, "eu"], ["Tu", 1, "tu"], ["A Ana", 2, "she → ela"], ["O senhor", 2, "formal you → like ele"], ["Você", 2, "você → like ele"],
  ["O meu pai", 2, "he → ele"], ["Nós", 3, "nós"], ["A Rita e eu", 3, "Rita + I = nós"], ["O Rui e a Ana", 4, "two people → eles"],
  ["Vocês", 4, "vocês → like eles"], ["Os meus pais", 4, "they → eles"], ["Elas", 4, "elas"],
];
