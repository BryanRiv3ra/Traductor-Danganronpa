import { lookupWord } from "../dictionary.js";
import { conjugateEnglishVerb, CONJUGACION_PERSONA, VERBOS_CONJUGADOS, ajustarPersonaVerbo, PRONOMBRE_ESP } from "./conjugation.js";
import { reordenarFraseNominal } from "./reorder.js";
import { traducirArticulo, traducirAdjetivo, obtenerGenero, esPlural } from "./gender.js";
import { aplicarContracciones, capitalizarOracion } from "./format.js";

const PUNTUACION_FINAL = ["PUNCT_QUESTION", "PUNCT_EXCLAIM", "PUNCT_PERIOD"];

const VERB_BE_SPANISH = [
  "es", "está", "son", "están", "era", "estaba", "eran", "estaban", "soy", "estoy", "eres", "estás", "somos", "estamos", "fui", "fue", "fueron"
];

const VERB_MODAL_SPANISH = [
  "puedo", "puedes", "puede", "podemos", "pueden", "podía", "podías", "podían", "podíamos",
  "debo", "debes", "debe", "debemos", "deben", "debería", "deberían",
  "quiero", "quieres", "quiere", "queremos", "quieren", "quisiera"
];

function limpiarTraduccion(traduccion) {
  if (!traduccion) return "";
  return traduccion.split("/")[0].trim();
}

function obtenerSingularEspanol(palabra) {
  const lower = palabra.toLowerCase();
  if (lower.endsWith("s")) {
    if (lower.endsWith("es")) {
      const sinEs = lower.slice(0, -2);
      if (lookupWord(sinEs)) return sinEs;
      if (lower.endsWith("ces")) {
        const conZ = lower.slice(0, -3) + "z";
        if (lookupWord(conZ)) return conZ;
      }
    }
    const sinS = lower.slice(0, -1);
    if (lookupWord(sinS)) return sinS;
  }
  return lower;
}

function pluralizarIngles(sustantivoIngles) {
  const lower = sustantivoIngles.toLowerCase();
  const irregulares = {
    "child": "children",
    "man": "men",
    "woman": "women",
    "mouse": "mice",
    "person": "people"
  };
  if (irregulares[lower]) return irregulares[lower];
  if (lower.endsWith("y") && !["a","e","i","o","u"].includes(lower.slice(-2, -1))) {
    return lower.slice(0, -1) + "ies";
  }
  if (lower.endsWith("s") || lower.endsWith("sh") || lower.endsWith("ch") || lower.endsWith("x") || lower.endsWith("z")) {
    return lower + "es";
  }
  return lower + "s";
}

function traducirToken(tok) {
  if (tok.token && tok.token.startsWith("PUNCT")) {
    return tok.traduccion || tok.palabra;
  }
  
  const palabraLower = tok.palabra.toLowerCase();
  
  if (tok.token === "PREP" && palabraLower === "a") {
    return "";
  }

  // For articles and determiners resolved by the lexer, use the token's traduccion directly
  if (["ART_DEF", "ART_INDEF", "POS", "PRON_DEM", "DET_INDEF"].includes(tok.token) && tok.traduccion) {
    return limpiarTraduccion(tok.traduccion);
  }

  let dictEntry = lookupWord(palabraLower);
  let esPluralEspanol = false;
  
  if (!dictEntry) {
    const singular = obtenerSingularEspanol(palabraLower);
    if (singular !== palabraLower) {
      dictEntry = lookupWord(singular);
      esPluralEspanol = true;
    }
  }
  
  if (dictEntry) {
    let trad = limpiarTraduccion(dictEntry.translation);
    if (tok.token === "NOUN" && esPluralEspanol) {
      trad = pluralizarIngles(trad);
    }
    return trad;
  }
  
  return limpiarTraduccion(tok.traduccion || tok.palabra);
}

function traducirPronoun(palabra) {
  const pLower = palabra.toLowerCase();
  const map = {
    "yo": "I",
    "i": "I",
    "tú": "you",
    "él": "he",
    "ella": "she",
    "ello": "it",
    "nosotros": "we",
    "nosotras": "we",
    "ellos": "they",
    "ellas": "they",
    "usted": "you",
    "ustedes": "you",
    "se": "",
    "me": "me",
    "te": "you",
    "nos": "us",
    "les": "them",
    "le": "him/her",
    "lo": "him/it",
    "la": "her/it"
  };
  return pLower in map ? map[pLower] : palabra;
}

function deducirSujetoDesdeVerbo(palabraVerbo) {
  const vLower = palabraVerbo.toLowerCase();
  
  for (const [persona, map] of Object.entries(CONJUGACION_PERSONA)) {
    if (Object.values(map).includes(vLower)) {
      if (persona === "yo") return "i";
      if (persona === "ellos") return "they";
      if (persona === "nosotros") return "we";
      if (persona === "tú") return "you";
    }
  }
  
  if (vLower.endsWith("o")) return "i";
  if (vLower.endsWith("as") || vLower.endsWith("es")) return "you";
  if (vLower.endsWith("mos")) return "we";
  if (vLower.endsWith("an") || vLower.endsWith("en")) return "they";
  
  return "he";
}

function traducirVerboBe(palabraVerbo, pronSujeto) {
  const vLower = palabraVerbo.toLowerCase();
  const pastForms = ["era", "estaba", "eran", "estaban", "fui", "fue", "fueron"];
  const isPast = pastForms.includes(vLower);
  
  const subj = pronSujeto ? pronSujeto.toLowerCase() : "he";
  const isPlur = ["we", "they", "you", "plural"].includes(subj);
  const isI = subj === "i" || subj === "yo";

  if (isPast) {
    return isPlur ? "were" : "was";
  } else {
    if (isI) return "am";
    return isPlur ? "are" : "is";
  }
}

function traducirVerboGeneral(palabraVerbo, pronSujeto) {
  const palabraLower = palabraVerbo.toLowerCase();
  let dictEntry = lookupWord(palabraLower);
  let baseVerb = dictEntry ? dictEntry.translation : palabraVerbo;
  baseVerb = limpiarTraduccion(baseVerb);
  
  if (baseVerb === palabraVerbo) {
    for (const [eng, esp] of Object.entries(VERBOS_CONJUGADOS)) {
      if (esp.toLowerCase() === palabraLower) {
        baseVerb = eng;
        break;
      }
    }
  }
  
  const cleanBase = conjugateEnglishVerb(baseVerb, "plural");
  const subjectForConjugation = pronSujeto || "he";
  return conjugateEnglishVerb(cleanBase, subjectForConjugation);
}

function reordenarYTraducirFraseNominal(grupo) {
  const reordenado = reordenarFraseNominal(grupo);
  return reordenado.map(tok => {
    if (tok.token === "PRON_PERS") return traducirPronoun(tok.palabra);
    return traducirToken(tok);
  });
}

function agruparYTraducirFrases(tokens) {
  const resultado = [];
  let grupoActual = [];
  
  for (let idx = 0; idx < tokens.length; idx++) {
    const tok = tokens[idx];
    
    if (["CONJ_COORD_COP", "PREP", "VERB"].includes(tok.token) || (tok.token && tok.token.startsWith("PUNCT"))) {
      if (grupoActual.length > 0) {
        resultado.push(...reordenarYTraducirFraseNominal(grupoActual));
        grupoActual = [];
      }
      resultado.push(traducirToken(tok));
    } else {
      grupoActual.push(tok);
    }
  }
  
  if (grupoActual.length > 0) {
    resultado.push(...reordenarYTraducirFraseNominal(grupoActual));
  }
  
  return resultado;
}

function traducir(tokensLexer, tipoOracion) {
  const tokensLimpios = tokensLexer.filter(t => t.palabra !== "¿" && t.palabra !== "¡");
  
  const ultimoToken = tokensLimpios[tokensLimpios.length - 1];
  const tienePuntFinal = ultimoToken && PUNTUACION_FINAL.includes(ultimoToken.token);
  
  const tokens = tienePuntFinal ? tokensLimpios.slice(0, -1) : tokensLimpios;
  
  let verbToken = null;
  let verb2Token = null;
  let subjectTokens = [];
  let negationToken = null;
  let clitSeToken = null;
  let restTokens = [];

  const verbos = [];
  tokens.forEach((t, idx) => {
    if (t.token === "VERB") {
      verbos.push({ token: t, index: idx });
    } else if (t.token === "ADV_NEG") {
      negationToken = t;
    }
  });

  if (verbos.length > 0) {
    verbToken = verbos[0].token;
    const idxV = verbos[0].index;
    if (idxV > 0 && tokens[idxV - 1].token === "CLIT" && tokens[idxV - 1].palabra.toLowerCase() === "se") {
      clitSeToken = tokens[idxV - 1];
    }
    if (verbos.length > 1) {
      verb2Token = verbos[1].token;
    }
  }

  const idxVerb = verbos.length > 0 ? verbos[0].index : -1;
  let subjectFoundBefore = false;
  if (idxVerb !== -1) {
    const tokensAntes = tokens.slice(0, idxVerb).filter(t => t.token !== "ADV_NEG" && t.token !== "CLIT");
    const tieneSustOPron = tokensAntes.some(t => ["NOUN", "PRON_PERS", "PROPN"].includes(t.token));
    if (tieneSustOPron) {
      subjectTokens = tokensAntes;
      subjectFoundBefore = true;
    }
  }

  if (!subjectFoundBefore && idxVerb !== -1 && tipoOracion === "Interrogativa") {
    let esTerceraPersona = true;
    const vLower = verbToken.palabra.toLowerCase();
    for (const [persona, map] of Object.entries(CONJUGACION_PERSONA)) {
      if (Object.values(map).includes(vLower)) {
        if (["yo", "tú", "nosotros"].includes(persona)) {
          esTerceraPersona = false;
        }
      }
    }
    if (vLower.endsWith("o") || vLower.endsWith("mos") || vLower.endsWith("as") || (vLower.endsWith("es") && !["es", "eres"].includes(vLower))) {
      esTerceraPersona = false;
    }

    if (esTerceraPersona) {
      const tokensDespues = tokens.slice(idxVerb + 1);
      let potentialSubject = [];
      for (let i = 0; i < tokensDespues.length; i++) {
        const t = tokensDespues[i];
        if (t.token === "PREP") break;
        if (t.token === "VERB" && t !== verb2Token) break;
        if (t.token === "CLIT") continue;
        potentialSubject.push(t);
      }
      const tieneSustOPron = potentialSubject.some(t => ["NOUN", "PRON_PERS", "PROPN"].includes(t.token));
      if (tieneSustOPron) {
        subjectTokens = potentialSubject;
      }
    }
  }

  tokens.forEach((t, idx) => {
    if (t === verbToken || t === verb2Token || t === negationToken || t === clitSeToken) return;
    if (subjectTokens.includes(t)) return;
    restTokens.push(t);
  });

  let esSujetoPlural = false;
  let pronSujeto = null;
  let esSujetoOmitido = subjectTokens.length === 0;

  if (!esSujetoOmitido) {
    const pronPers = subjectTokens.find(t => t.token === "PRON_PERS");
    if (pronPers) {
      const engPron = traducirPronoun(pronPers.palabra).toLowerCase();
      if (engPron) {
        pronSujeto = engPron;
        if (["we", "they", "you"].includes(engPron)) {
          esSujetoPlural = true;
        }
      } else {
        pronSujeto = deducirSujetoDesdeVerbo(verbToken.palabra);
        if (["we", "they"].includes(pronSujeto)) {
          esSujetoPlural = true;
        }
      }
    } else {
      const coordConj = subjectTokens.some(t => t.token === "CONJ_COORD_COP");
      const tienePluralNoun = subjectTokens.some(t => t.token === "NOUN" && (t.palabra.toLowerCase() !== obtenerSingularEspanol(t.palabra.toLowerCase())));
      if (coordConj || tienePluralNoun) {
        esSujetoPlural = true;
      }
      pronSujeto = esSujetoPlural ? "they" : "he";
    }
  } else if (verbToken) {
    pronSujeto = deducirSujetoDesdeVerbo(verbToken.palabra);
    if (["we", "they"].includes(pronSujeto)) {
      esSujetoPlural = true;
    }
  }

  let subjectWords = [];
  if (!esSujetoOmitido) {
    subjectWords = agruparYTraducirFrases(subjectTokens);
    if (subjectWords.every(w => !w || w.trim() === "")) {
      esSujetoOmitido = true;
    }
  }
  if (esSujetoOmitido && pronSujeto) {
    subjectWords = [pronSujeto.charAt(0).toUpperCase() + pronSujeto.slice(1)];
  }

  const restWords = agruparYTraducirFrases(restTokens);

  let verbWords = [];
  const verbLower = verbToken ? verbToken.palabra.toLowerCase() : "";
  const isBe = VERB_BE_SPANISH.includes(verbLower);
  const isModal = VERB_MODAL_SPANISH.includes(verbLower);
  const isQuerer = ["quiero", "quieres", "quiere", "queremos", "quieren", "quisiera"].includes(verbLower);

  let verb1Base = verbToken ? traducirToken(verbToken) : "";
  let verb2Base = verb2Token ? traducirToken(verb2Token) : "";

  if (clitSeToken) {
    const reflexEntry = lookupWord("se " + verbLower);
    if (reflexEntry) {
      const rt = limpiarTraduccion(reflexEntry.translation);
      const rtWords = rt.toLowerCase().split(/\s+/);
      if (rtWords.length === 1 && rt.toLowerCase() !== verb1Base.toLowerCase()) {
        verb1Base = rt;
        verb2Base = verb2Token ? traducirToken(verb2Token) : "";
      }
    }
  }

  if (tipoOracion === "Interrogativa") {
    let aux = "";
    
    if (isBe) {
      aux = traducirVerboBe(verbLower, pronSujeto);
    } else if (isModal) {
      if (verbLower.startsWith("pued") || verbLower.startsWith("pod")) aux = "can";
      else if (verbLower.startsWith("deb")) aux = "must";
      else aux = "want";
    } else {
      const pastForms = ["fui", "fue", "fueron", "comió", "comieron", "corrió", "corrieron", "cantó", "cantaron", "escribió", "escribieron"];
      const isPast = pastForms.includes(verbLower);
      if (isPast) aux = "did";
      else {
        aux = ["he", "she", "it", "singular"].includes(pronSujeto) ? "does" : "do";
      }
    }

    if (negationToken) {
      if (isBe) {
        verbWords = [aux, ...subjectWords, "not"];
      } else if (isModal) {
        const verb2 = verb2Token ? conjugateEnglishVerb(verb2Base, "plural") : "";
        if (isQuerer) {
          const doAux = ["he", "she", "it", "singular"].includes(pronSujeto) ? "does" : "do";
          verbWords = [doAux, ...subjectWords, "not", "want", "to" + (verb2 ? " " + verb2 : "")];
        } else {
          verbWords = [aux, ...subjectWords, "not", verb2];
        }
      } else {
        const main = verbToken ? conjugateEnglishVerb(verb1Base, "plural") : "";
        verbWords = [aux, ...subjectWords, "not", main];
      }
    } else {
      if (isBe) {
        verbWords = [aux, ...subjectWords];
      } else if (isModal) {
        const verb2 = verb2Token ? conjugateEnglishVerb(verb2Base, "plural") : "";
        if (isQuerer) {
          verbWords = [aux, ...subjectWords, "to" + (verb2 ? " " + verb2 : "")];
        } else {
          verbWords = [aux, ...subjectWords, verb2];
        }
      } else {
        const main = verbToken ? conjugateEnglishVerb(verb1Base, "plural") : "";
        verbWords = [aux, ...subjectWords, main];
      }
    }
    subjectWords = [];
  } else {
    if (negationToken) {
      if (isBe) {
        const conjugatedBe = traducirVerboBe(verbLower, pronSujeto);
        verbWords = [conjugatedBe, "not"];
      } else if (isModal) {
        let modalEng = "can";
        if (verbLower.startsWith("deb")) modalEng = "must";
        const verb2 = verb2Token ? conjugateEnglishVerb(verb2Base, "plural") : "";
        if (isQuerer) {
          const aux = ["he", "she", "it", "singular"].includes(pronSujeto) ? "does" : "do";
          verbWords = [aux, "not", "want", "to" + (verb2 ? " " + verb2 : "")];
        } else {
          verbWords = [modalEng, "not", verb2];
        }
      } else {
        const pastForms = ["fui", "fue", "fueron", "comió", "comieron", "corrió", "corrieron", "cantó", "cantaron", "escribió", "escribieron"];
        const isPast = pastForms.includes(verbLower);
        let aux = "do";
        if (isPast) aux = "did";
        else {
          aux = ["he", "she", "it", "singular"].includes(pronSujeto) ? "does" : "do";
        }
        const main = verbToken ? conjugateEnglishVerb(verb1Base, "plural") : "";
        verbWords = [aux, "not", main];
      }
    } else {
      if (isBe) {
        verbWords = [traducirVerboBe(verbLower, pronSujeto)];
      } else if (isModal) {
        let modalEng = "can";
        if (verbLower.startsWith("deb")) modalEng = "must";
        const verb2 = verb2Token ? conjugateEnglishVerb(verb2Base, "plural") : "";
        if (isQuerer) {
          verbWords = ["want", "to" + (verb2 ? " " + verb2 : "")];
        } else {
          verbWords = [modalEng, verb2];
        }
      } else if (verbToken) {
        verbWords = [traducirVerboGeneral(verbLower, pronSujeto)];
      }
    }
  }

  let palabrasTrad = [...subjectWords, ...verbWords, ...restWords];
  palabrasTrad = palabrasTrad.map(w => w.trim()).filter(w => w.length > 0);

  const palabrasCorregidas = [];
  for (let j = 0; j < palabrasTrad.length; j++) {
    let w = palabrasTrad[j];
    const wLower = w.toLowerCase();
    if (wLower === "a" || wLower === "an") {
      const nextWord = palabrasTrad[j + 1];
      if (nextWord) {
        const firstLetter = nextWord.charAt(0).toLowerCase();
        const startsWithVowel = ["a", "e", "i", "o", "u"].includes(firstLetter);
        w = startsWithVowel ? "an" : "a";
        if (palabrasTrad[j].charAt(0) === "A") {
          w = w.charAt(0).toUpperCase() + w.slice(1);
        }
      }
    }
    palabrasCorregidas.push(w);
  }
  palabrasTrad = palabrasCorregidas.map(w => w === "i" ? "I" : w);

  if (palabrasTrad.length > 0) {
    palabrasTrad[0] = palabrasTrad[0].charAt(0).toUpperCase() + palabrasTrad[0].slice(1);
  }

  let signoFinal = ".";
  if (tipoOracion === "Interrogativa") signoFinal = "?";
  else if (tipoOracion === "Exclamativa") signoFinal = "!";

  let oracion = palabrasTrad.join(" ");
  oracion = oracion.replace(/\s([.,;:!?])/g, "$1");

  if (![".", "?", "!"].includes(oracion.slice(-1))) {
    oracion += signoFinal;
  }

  return { traduccion: oracion, palabras: palabrasTrad };
}

function convertirFraseNominalEspanol(grupo) {
  const segments = [];
  let current = [];
  for (const tok of grupo) {
    if (tok.token === "PREP") {
      if (current.length > 0) segments.push(current);
      segments.push(tok);
      current = [];
    } else {
      current.push(tok);
    }
  }
  if (current.length > 0) segments.push(current);

  const resultado = [];

  for (const seg of segments) {
    if (seg.token === "PREP") {
      resultado.push(limpiarTraduccion(seg.traduccion || seg.palabra));
      continue;
    }

    const articulos = seg.filter(t => ["ART_DEF", "ART_INDEF"].includes(t.token));
    const sustantivos = seg.filter(t => t.token === "NOUN");
    const adjetivos = seg.filter(t => t.token === "ADJ");
    const otros = seg.filter(t => !["ART_DEF", "ART_INDEF", "NOUN", "ADJ"].includes(t.token));

    const headNoun = sustantivos.length > 0 ? sustantivos[0] : null;
    const headNounWord = headNoun ? headNoun.palabra.toLowerCase() : null;
    const nounPlural = headNounWord ? esPlural(headNounWord) : false;

    for (const art of articulos) {
      resultado.push(art.traduccion || art.palabra);
    }

    for (const tok of otros) {
      resultado.push(limpiarTraduccion(tok.traduccion || tok.palabra));
    }

    for (const noun of sustantivos) {
      resultado.push(limpiarTraduccion(noun.traduccion || noun.palabra));
      if (nounPlural) {
        const last = resultado[resultado.length - 1];
        if (last.endsWith("z")) resultado[resultado.length - 1] = last.slice(0, -1) + "ces";
        else if (last.endsWith("s") || last.endsWith("x")) { }
        else if (["a","e","i","o","u"].includes(last.slice(-1))) resultado[resultado.length - 1] = last + "s";
        else resultado[resultado.length - 1] = last + "es";
      }
    }

    for (const adj of adjetivos) {
      let trad;
      if (headNounWord) {
        trad = traducirAdjetivo(adj.palabra, headNounWord);
        if (nounPlural) {
          if (trad.endsWith("z")) trad = trad.slice(0, -1) + "ces";
          else if (trad.endsWith("s") || trad.endsWith("x")) { }
          else if (["a","e","i","o","u"].includes(trad.slice(-1))) trad += "s";
          else trad += "es";
        }
      } else {
        trad = adj.traduccion || adj.palabra;
      }
      resultado.push(trad);
    }
  }

  return resultado;
}

function conjugarVerboParaSujeto(token, pronSujeto) {
  const spanishForm = token.traduccion || token.palabra;
  const englishWord = token.palabra.toLowerCase();
  const baseForm = VERBOS_CONJUGADOS[englishWord];
  if (baseForm) {
    return ajustarPersonaVerbo(baseForm, pronSujeto || "he");
  }
  return limpiarTraduccion(spanishForm);
}

const DO_AUX = new Set(["do", "does", "did"]);
const BE_AUX = new Set(["am", "is", "are", "was", "were"]);
const MODAL_AUX = new Set(["can", "could", "will", "would", "should", "must", "may", "might"]);

const BE_EN_TO_ES = {
  "am":   { "i": "soy", "default": "soy" },
  "is":   { "default": "es" },
  "are":  { "we": "somos", "they": "son", "you": "eres", "default": "es" },
  "was":  { "i": "era", "default": "era" },
  "were": { "i": "era", "we": "éramos", "they": "eran", "you": "eras", "default": "era" }
};

function traducirAEspanol(tokensLexer, tipoOracion) {
  const tokensLimpios = tokensLexer.filter(t => t.palabra !== "¿" && t.palabra !== "¡");

  const ultimoToken = tokensLimpios[tokensLimpios.length - 1];
  const tienePuntFinal = ultimoToken && PUNTUACION_FINAL.includes(ultimoToken.token);
  const tokens = tienePuntFinal ? tokensLimpios.slice(0, -1) : tokensLimpios;

  const verbIndices = tokens.reduce((acc, t, i) => { if (t.token === "VERB") acc.push(i); return acc; }, []);
  const negationIdx = tokens.findIndex(t => t.token === "ADV_NEG");

  let subjectTokens = [];
  if (verbIndices.length > 0 && verbIndices[0] > 0) {
    subjectTokens = tokens.slice(0, verbIndices[0]);
  }

  const persToken = subjectTokens.find(t => t.token === "PRON_PERS");
  let pronSujeto = persToken ? persToken.palabra.toLowerCase() : null;
  if (!pronSujeto && subjectTokens.length > 0) {
    const irregPlural = new Set(["children", "men", "women", "people", "mice", "feet", "teeth", "geese"]);
    const pluralNoun = subjectTokens.some(t =>
      t.token === "NOUN" && (irregPlural.has(t.palabra.toLowerCase()) || (!t.palabra.endsWith("ss") && t.palabra.toLowerCase().endsWith("s")))
    );
    const coordConj = subjectTokens.some(t => t.token === "CONJ_COORD_COP");
    pronSujeto = (pluralNoun || coordConj) ? "they" : "he";
  }

  const subjectWords = subjectTokens.length > 0 ? convertirFraseNominalEspanol(subjectTokens) : [];

  let predicateWords = [];

  const hasNegation = negationIdx >= 0;

  if (verbIndices.length > 0) {
    if (hasNegation) {
      const negatedVerb = verbIndices.find(i => i > negationIdx);
      const auxBeforeNeg = verbIndices.find(i => i === negationIdx - 1);

      if (negatedVerb !== undefined) {
        const auxToken = auxBeforeNeg !== undefined ? tokens[auxBeforeNeg] : null;
        const isBeNeg = auxToken && BE_AUX.has(auxToken.palabra.toLowerCase());

        if (isBeNeg) {
          const beTable = BE_EN_TO_ES[auxToken.palabra.toLowerCase()];
          const beForm = (beTable && beTable[pronSujeto]) ? beTable[pronSujeto] : (beTable ? beTable["default"] : conjugarVerboParaSujeto(auxToken, pronSujeto));
          predicateWords.push("no");
          predicateWords.push(beForm);
        } else {
          predicateWords.push("no");
          predicateWords.push(conjugarVerboParaSujeto(tokens[negatedVerb], pronSujeto));
        }
        const restAfterVerb = tokens.slice(negatedVerb + 1);
        predicateWords.push(...convertirFraseNominalEspanol(restAfterVerb));
      } else if (auxBeforeNeg !== undefined) {
        const beTable = BE_EN_TO_ES[tokens[auxBeforeNeg].palabra.toLowerCase()];
        const beForm = (beTable && beTable[pronSujeto]) ? beTable[pronSujeto] : (beTable ? beTable["default"] : conjugarVerboParaSujeto(tokens[auxBeforeNeg], pronSujeto));
        predicateWords.push("no");
        predicateWords.push(beForm);
        const restAfterNeg = tokens.slice(negationIdx + 1);
        predicateWords.push(...convertirFraseNominalEspanol(restAfterNeg));
      } else {
        const restAfterNeg = tokens.slice(negationIdx + 1);
        predicateWords.push("no");
        predicateWords.push(...convertirFraseNominalEspanol(restAfterNeg));
      }
    } else {
      const firstVerb = verbIndices[0];
      const firstLower = (tokens[firstVerb] && tokens[firstVerb].palabra || "").toLowerCase();

      if (DO_AUX.has(firstLower) && verbIndices.length > 1) {
        const mainVerbIdx = verbIndices[1];
        const beforeMain = tokens.slice(firstVerb + 1, mainVerbIdx).filter(t => !subjectTokens.includes(t));
        predicateWords.push(...convertirFraseNominalEspanol(beforeMain));
        predicateWords.push(conjugarVerboParaSujeto(tokens[mainVerbIdx], pronSujeto));
        const afterMain = tokens.slice(mainVerbIdx + 1);
        predicateWords.push(...convertirFraseNominalEspanol(afterMain));
      } else if (BE_AUX.has(firstLower)) {
        const afterVerb = tokens.slice(firstVerb + 1);
        const beTable = BE_EN_TO_ES[firstLower];
        const beForm = (beTable && beTable[pronSujeto]) ? beTable[pronSujeto] : (beTable ? beTable["default"] : conjugarVerboParaSujeto(tokens[firstVerb], pronSujeto));
        predicateWords.push(beForm);
        predicateWords.push(...convertirFraseNominalEspanol(afterVerb));
      } else if (MODAL_AUX.has(firstLower) && verbIndices.length > 1) {
        const secondVerb = verbIndices[1];
        const modalConjugated = conjugarVerboParaSujeto(tokens[firstVerb], pronSujeto);
        const mainInf = limpiarTraduccion(tokens[secondVerb].traduccion || tokens[secondVerb].palabra);
        predicateWords.push(modalConjugated);
        if (firstLower === "will") predicateWords.push("a");
        predicateWords.push(mainInf);
        const afterMain = tokens.slice(secondVerb + 1);
        predicateWords.push(...convertirFraseNominalEspanol(afterMain));
      } else {
        const beforeVerb = tokens.slice(0, firstVerb).filter(t => !subjectTokens.includes(t));
        predicateWords.push(...convertirFraseNominalEspanol(beforeVerb));
        predicateWords.push(conjugarVerboParaSujeto(tokens[firstVerb], pronSujeto));
        const afterVerb = tokens.slice(firstVerb + 1);
        predicateWords.push(...convertirFraseNominalEspanol(afterVerb));
      }
    }
  } else {
    predicateWords = convertirFraseNominalEspanol(tokens.filter(t => !subjectTokens.includes(t)));
  }

  let palabrasTrad = [...subjectWords, ...predicateWords];
  palabrasTrad = palabrasTrad.map(w => w.trim()).filter(w => w.length > 0);

  palabrasTrad = aplicarContracciones(palabrasTrad);
  palabrasTrad = capitalizarOracion(palabrasTrad, tipoOracion);

  if (palabrasTrad.length > 0) {
    palabrasTrad[0] = palabrasTrad[0].charAt(0).toUpperCase() + palabrasTrad[0].slice(1);
  }

  let signoFinal = ".";
  if (tipoOracion === "Interrogativa") signoFinal = "?";
  else if (tipoOracion === "Exclamativa") signoFinal = "!";

  let oracion = palabrasTrad.join(" ");
  oracion = oracion.replace(/\s([.,;:!?])/g, "$1");

  if (![".", "?", "!"].includes(oracion.slice(-1))) {
    oracion += signoFinal;
  }

  return { traduccion: oracion, palabras: palabrasTrad };
}

export { traducir, traducirAEspanol };
