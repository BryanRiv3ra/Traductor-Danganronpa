const VERBOS_CONJUGADOS = {
  "love": "ama", "loves": "ama",
  "walk": "camina", "walks": "camina",
  "go": "va", "goes": "va",
  "run": "corre", "runs": "corre",
  "eat": "come", "eats": "come",
  "sing": "canta", "sings": "canta",
  "dance": "baila", "dances": "baila",
  "work": "trabaja", "works": "trabaja",
  "study": "estudia", "studies": "estudia",
  "play": "juega", "plays": "juega",
  "read": "lee", "reads": "lee",
  "write": "escribe", "writes": "escribe",
  "drink": "bebe", "drinks": "bebe",
  "sleep": "duerme", "sleeps": "duerme",
  "come": "viene", "comes": "viene",
  "see": "ve", "sees": "ve",
  "know": "sabe", "knows": "sabe",
  "think": "piensa", "thinks": "piensa",
  "want": "quiere", "wants": "quiere",
  "need": "necesita", "needs": "necesita",
  "like": "gusta", "likes": "gusta",
  "give": "da", "gives": "da",
  "take": "toma", "takes": "toma",
  "make": "hace", "makes": "hace",
  "say": "dice", "says": "dice",
  "call": "llama", "calls": "llama",
  "help": "ayuda", "helps": "ayuda",
  "talk": "habla", "talks": "habla",
  "find": "encuentra", "finds": "encuentra",
  "feel": "siente", "feels": "siente",
  "buy": "compra", "buys": "compra",
  "sell": "vende", "sells": "vende",
  "listen": "escucha", "listens": "escucha",
  "watch": "mira", "watches": "mira",
  "wait": "espera", "waits": "espera",
  "try": "intenta", "tries": "intenta",
  "start": "empieza", "starts": "empieza",
  "stop": "para", "stops": "para",
  "use": "usa", "uses": "usa",
  "show": "muestra", "shows": "muestra",
  "bring": "trae", "brings": "trae",
  "keep": "mantiene", "keeps": "mantiene",
  "open": "abre", "opens": "abre",
  "close": "cierra", "closes": "cierra",
  "arrive": "llega", "arrives": "llega",
  "leave": "sale", "leaves": "sale",
  "live": "vive", "lives": "vive",
  "ask": "pregunta", "asks": "pregunta",
  "jump": "salta", "jumps": "salta",
  "fly": "vuela", "flies": "vuela",
  "speak": "habla", "speaks": "habla",
  "code": "programa", "codes": "programa",
  "can": "puede", "must": "debe", "want": "quiere", "will": "va",
  "approach": "acerca", "approaches": "acerca"
};

const CONJUGACION_PERSONA = {
  "yo": {
    "ama": "amo", "camina": "camino", "corre": "corro", "come": "como",
    "va": "voy", "canta": "canto", "baila": "bailo", "trabaja": "trabajo",
    "estudia": "estudio", "juega": "juego", "lee": "leo", "escribe": "escribo",
    "bebe": "bebo", "duerme": "duermo", "viene": "vengo", "ve": "veo",
    "sabe": "sé", "piensa": "pienso", "quiere": "quiero", "necesita": "necesito",
    "gusta": "gusto", "da": "doy", "toma": "tomo", "hace": "hago",
    "dice": "digo", "ayuda": "ayudo", "habla": "hablo", "siente": "siento",
    "compra": "compro", "vende": "vendo", "escucha": "escucho", "mira": "miro",
    "espera": "espero", "intenta": "intento", "empieza": "empiezo", "usa": "uso",
    "abre": "abro", "cierra": "cierro", "llega": "llego", "sale": "salgo",
    "vive": "vivo", "pregunta": "pregunto", "muestra": "muestro", "trae": "traigo",
    "mantiene": "mantengo", "para": "paro", "encuentra": "encuentro",
    "salta": "salto", "vuela": "vuelo", "programa": "programo",
    "puede": "puedo", "debe": "debo",
    "aproxima": "aproximo",
    "acerca": "acerco"
  },
  "ellos": {
    "ama": "aman", "camina": "caminan", "corre": "corren", "come": "comen",
    "va": "van", "canta": "cantan", "baila": "bailan", "trabaja": "trabajan",
    "estudia": "estudian", "juega": "juegan", "lee": "leen", "escribe": "escriben",
    "bebe": "beben", "duerme": "duermen", "viene": "vienen", "ve": "ven",
    "sabe": "saben", "piensa": "piensan", "quiere": "quieren", "necesita": "necesitan",
    "da": "dan", "toma": "toman", "hace": "hacen", "dice": "dicen",
    "ayuda": "ayudan", "habla": "hablan", "siente": "sienten", "compra": "compran",
    "escucha": "escuchan", "mira": "miran", "espera": "esperan", "intenta": "intentan",
    "empieza": "empiezan", "usa": "usan", "abre": "abren", "llega": "llegan",
    "sale": "salen", "vive": "viven", "para": "paran", "encuentra": "encuentran",
    "salta": "saltan", "vuela": "vuelan", "programa": "programan",
    "puede": "pueden", "debe": "deben",
    "aproxima": "aproximan",
    "acerca": "acercan"
  },
  "nosotros": {
    "ama": "amamos", "camina": "caminamos", "corre": "corremos", "come": "comemos",
    "va": "vamos", "canta": "cantamos", "baila": "bailamos", "trabaja": "trabajamos",
    "puede": "podemos", "debe": "debemos", "quiere": "queremos",
    "aproxima": "aproximamos",
    "acerca": "acercamos"
  },
  "tú": {
    "ama": "amas", "camina": "caminas", "corre": "corres", "come": "comes",
    "va": "vas", "canta": "cantas", "baila": "bailas",
    "puede": "puedes", "debe": "debes", "quiere": "quieres",
    "aproxima": "aproximas",
    "acerca": "acercas"
  }
};

const PRONOMBRE_ESP = {
  "i": "yo", "we": "nosotros", "you": "tú",
  "they": "ellos", "he": "él", "she": "ella", "it": "ello"
};

function ajustarPersonaVerbo(verbEsp, pronIngl) {
  const pron = pronIngl?.toLowerCase();
  const espKey = PRONOMBRE_ESP[pron];
  if (!espKey) return verbEsp;
  const tabla = CONJUGACION_PERSONA[espKey];
  if (!tabla) return verbEsp;
  return tabla[verbEsp.toLowerCase()] || verbEsp;
}

function conjugateEnglishVerb(baseVerb, subject) {
  const lowerBase = baseVerb.toLowerCase();
  
  const irregulars = {
    "be": { "yo": "am", "ellos": "are", "nosotros": "are", "tú": "are", "singular": "is", "plural": "are" },
    "is": { "yo": "am", "ellos": "are", "nosotros": "are", "tú": "are", "singular": "is", "plural": "are" },
    "are": { "yo": "am", "ellos": "are", "nosotros": "are", "tú": "are", "singular": "is", "plural": "are" },
    "was": { "yo": "was", "ellos": "were", "nosotros": "were", "tú": "were", "singular": "was", "plural": "were" },
    "were": { "yo": "was", "ellos": "were", "nosotros": "were", "tú": "were", "singular": "was", "plural": "were" },
    "have": { "yo": "have", "ellos": "have", "nosotros": "have", "tú": "have", "singular": "has", "plural": "have" },
    "has": { "yo": "have", "ellos": "have", "nosotros": "have", "tú": "have", "singular": "has", "plural": "have" },
    "do": { "yo": "do", "ellos": "do", "nosotros": "do", "tú": "do", "singular": "does", "plural": "do" },
    "does": { "yo": "do", "ellos": "do", "nosotros": "do", "tú": "do", "singular": "does", "plural": "do" }
  };
  
  if (irregulars[lowerBase]) {
    return irregulars[lowerBase][subject] || irregulars[lowerBase]["singular"];
  }
  
  const MODALS = ["can", "could", "will", "would", "should", "must", "may", "might"];
  if (MODALS.includes(lowerBase)) return baseVerb;
  
  if (subject === "singular" || subject === "he" || subject === "she" || subject === "it" || subject === "él" || subject === "ella" || subject === "ello") {
    let verb = lowerBase;
    if (verb.endsWith("o") || verb.endsWith("ch") || verb.endsWith("sh") || verb.endsWith("ss") || verb.endsWith("x") || verb.endsWith("z")) {
      return verb + "es";
    }
    if (verb.endsWith("y") && !["a","e","i","o","u"].includes(verb.slice(-2, -1))) {
      return verb.slice(0, -1) + "ies";
    }
    if (verb.endsWith("s")) return verb;
    return verb + "s";
  }
  
  let verb = lowerBase;
  if (subject === "yo" || subject === "ellos" || subject === "nosotros" || subject === "tú" || subject === "plural" || subject === "i" || subject === "they" || subject === "we" || subject === "you") {
    if (verb.endsWith("s") && !verb.endsWith("ss") && verb !== "is" && verb !== "has" && verb !== "was") {
      if (verb.endsWith("ies")) {
        verb = verb.slice(0, -3) + "y";
      } else if (verb.endsWith("es") && (verb.endsWith("oes") || verb.endsWith("ches") || verb.endsWith("shes") || verb.endsWith("xes"))) {
        verb = verb.slice(0, -2);
      } else {
        verb = verb.slice(0, -1);
      }
    }
  }
  return verb;
}

export { VERBOS_CONJUGADOS, ajustarPersonaVerbo, PRONOMBRE_ESP, CONJUGACION_PERSONA, conjugateEnglishVerb };