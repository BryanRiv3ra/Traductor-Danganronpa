import { articles } from "./data/articles.js";
import { pronouns } from "./data/pronouns.js";
import { determiners } from "./data/determiners.js";
import { numerals } from "./data/numerals.js";
import { nouns } from "./data/nouns.js";
import { adjectives } from "./data/adjectives.js";
import { verbs } from "./data/verbs.js";
import { adverbs } from "./data/adverbs.js";
import { prepositions } from "./data/prepositions.js";
import { conjunctions } from "./data/conjunctions.js";
import { interjections } from "./data/interjections.js";
import { punctuation } from "./data/punctuation.js";

import { VERBOS_CONJUGADOS, CONJUGACION_PERSONA } from "./translation/conjugation.js";

// Combinar en un solo diccionario original
const englishDictionary = Object.assign({},
  articles,
  pronouns,
  determiners,
  numerals,
  nouns,
  adjectives,
  verbs,
  adverbs,
  prepositions,
  conjunctions,
  interjections,
  punctuation
);

const spanishToEnglishDictionary = {};

// 1. Mapear traducciones directas de todas las categorías
Object.entries(englishDictionary).forEach(([englishWord, entry]) => {
  if (entry.token && entry.token.startsWith("PUNCT")) {
    spanishToEnglishDictionary[englishWord] = {
      token: entry.token,
      category: entry.category,
      translation: entry.translation || englishWord
    };
    if (englishWord === "?") {
      spanishToEnglishDictionary["¿"] = { token: "PUNCT_QUESTION", category: "Signo de puntuación", translation: "?" };
      spanishToEnglishDictionary["?"] = { token: "PUNCT_QUESTION", category: "Signo de puntuación", translation: "?" };
    } else if (englishWord === "!") {
      spanishToEnglishDictionary["¡"] = { token: "PUNCT_EXCLAIM", category: "Signo de puntuación", translation: "!" };
      spanishToEnglishDictionary["!"] = { token: "PUNCT_EXCLAIM", category: "Signo de puntuación", translation: "!" };
    }
    return;
  }

  if (!entry.translation) return;

  const translations = entry.translation.toLowerCase().split("/");
  translations.forEach(spanWord => {
    const trimmed = spanWord.trim();
    if (trimmed) {
      if (!spanishToEnglishDictionary[trimmed]) {
        spanishToEnglishDictionary[trimmed] = {
          token: entry.token,
          category: entry.category,
          translation: englishWord
        };
      }
    }
  });
});

// 2. Mapear conjugaciones verbales en español
Object.entries(VERBOS_CONJUGADOS).forEach(([englishVerb, baseSpanishVerb]) => {
  const baseSpanish = baseSpanishVerb.toLowerCase();
  const EXCEPCIONES_PREVENCION_VERBO = ["para", "bajo", "sobre", "entre"];
  
  if (!spanishToEnglishDictionary[baseSpanish] || spanishToEnglishDictionary[baseSpanish].token !== "VERB") {
    if (!EXCEPCIONES_PREVENCION_VERBO.includes(baseSpanish)) {
      const englishSingular = englishVerb.endsWith("s") ? englishVerb : (englishVerb + "s");
      spanishToEnglishDictionary[baseSpanish] = {
        token: "VERB",
        category: "Verbo",
        translation: englishSingular
      };
    }
  }

  Object.entries(CONJUGACION_PERSONA).forEach(([person, verbsMap]) => {
    const conjugated = verbsMap[baseSpanishVerb];
    if (conjugated) {
      const conjugatedLower = conjugated.toLowerCase();
      if (EXCEPCIONES_PREVENCION_VERBO.includes(conjugatedLower)) {
        return;
      }
      
      const existing = spanishToEnglishDictionary[conjugatedLower];
      if (!existing || existing.token !== "VERB") {
        let baseEnglish = englishVerb;
        if (englishVerb.endsWith("s") && englishVerb !== "is" && englishVerb !== "has" && englishVerb !== "was") {
          if (englishVerb.endsWith("es")) {
            baseEnglish = englishVerb.slice(0, -2);
          } else {
            baseEnglish = englishVerb.slice(0, -1);
          }
        }

        spanishToEnglishDictionary[conjugatedLower] = {
          token: "VERB",
          category: "Verbo",
          translation: baseEnglish
        };
      }
    }
  });
});

// 3. Generar conjugaciones para verbos españoles del mapeo reverso
Object.keys(spanishToEnglishDictionary).forEach(spanWord => {
  const entry = spanishToEnglishDictionary[spanWord];
  if (entry && entry.token === "VERB") {
    const baseSpanish = spanWord.toLowerCase();
    const EXCEPCIONES_PREVENCION_VERBO = ["para", "bajo", "sobre", "entre"];
    if (EXCEPCIONES_PREVENCION_VERBO.includes(baseSpanish)) return;
    Object.entries(CONJUGACION_PERSONA).forEach(([person, verbsMap]) => {
      const conjugated = verbsMap[baseSpanish];
      if (conjugated) {
        const conjugatedLower = conjugated.toLowerCase();
        if (EXCEPCIONES_PREVENCION_VERBO.includes(conjugatedLower)) return;
        const existing = spanishToEnglishDictionary[conjugatedLower];
        if (!existing || existing.token !== "VERB") {
          let baseEnglish = entry.translation;
          if (baseEnglish.endsWith("s") && baseEnglish !== "is" && baseEnglish !== "has" && baseEnglish !== "was") {
            if (baseEnglish.endsWith("es")) {
              baseEnglish = baseEnglish.slice(0, -2);
            } else {
              baseEnglish = baseEnglish.slice(0, -1);
            }
          }
          spanishToEnglishDictionary[conjugatedLower] = {
            token: "VERB",
            category: "Verbo",
            translation: baseEnglish
          };
        }
      }
    });
  }
});

// Mapear el diccionario en español como el diccionario exportado
const dictionary = spanishToEnglishDictionary;

function lookupWord(word) {
  const key = word.toLowerCase();
  return dictionary[key] || null;
}

function levenshteinDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function fuzzyLookup(word) {
  const key = word.toLowerCase();
  if (!key || key.length < 3) return null;

  const keys = Object.keys(dictionary);
  const firstChar = key[0];

  // 1. Sufijos comunes del español: quitar -o, -a, -os, -as, -e, -s
  const sufijos = [["os", 2], ["as", 2], ["o", 1], ["a", 1], ["e", 1], ["s", 1]];
  for (const [suf, len] of sufijos) {
    if (key.endsWith(suf) && key.length > len + 1) {
      const base = key.slice(0, -len);
      if (dictionary[base]) return { entry: dictionary[base], matched: base, distance: len };
    }
  }

  // 2. Prefijo: si la palabra mal escrita es prefijo de una del dict (max 3 chars extra)
  for (const dictKey of keys) {
    if (dictKey[0] !== firstChar) continue;
    if (dictKey.startsWith(key) && dictKey.length - key.length <= 3) {
      return { entry: dictionary[dictKey], matched: dictKey, distance: dictKey.length - key.length };
    }
  }

  // 3. Levenshtein: distancia según longitud
  let best = null;
  let bestDist = Infinity;
  for (const dictKey of keys) {
    if (dictKey[0] !== firstChar) continue;
    const dist = levenshteinDistance(key, dictKey);
    if (dist < bestDist) {
      bestDist = dist;
      best = dictKey;
    }
  }
  const maxDist = key.length <= 4 ? 0 : (key.length <= 6 ? 1 : 2);
  if (bestDist <= maxDist) {
    return { entry: dictionary[best], matched: best, distance: bestDist };
  }

  return null;
}

export { dictionary, lookupWord, englishDictionary, fuzzyLookup };
