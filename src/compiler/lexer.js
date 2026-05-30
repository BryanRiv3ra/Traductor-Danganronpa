import { dictionary, lookupWord, englishDictionary, fuzzyLookup } from "./dictionary.js";

const _dictionary = dictionary;
const _lookupWord = lookupWord;
const _fuzzyLookup = fuzzyLookup;

// Pre-build normalized→original mapping for accented dictionary entries
const NORMALIZED_SOURCE = {};
for (const [key, entry] of Object.entries(_dictionary)) {
  const norm = normalizarTildes(key);
  if (norm !== key) {
    NORMALIZED_SOURCE[norm] = { original: key, entry };
  }
}

import { REGEX } from "./lexical/patterns.js";
import { CONTRACTIONS } from "./lexical/contractions.js";

function lookupEnglishWord(word) {
  const key = word.toLowerCase();
  let entry = englishDictionary[key] || null;
  let esPlural = false;
  if (!entry && key.endsWith("s") && !key.endsWith("ss") && key.length > 2) {
    const candidates = [];
    if (key.endsWith("ies")) {
      candidates.push(key.slice(0, -3) + "y");
    }
    if (key.endsWith("ves")) {
      candidates.push(key.slice(0, -3) + "f");
      candidates.push(key.slice(0, -3) + "fe");
    }
    if (key.endsWith("es")) {
      candidates.push(key.slice(0, -2));
    }
    candidates.push(key.slice(0, -1));
    for (const c of candidates) {
      entry = englishDictionary[c] || null;
      if (entry) { esPlural = true; break; }
    }
  }
  const irregulares = { "children": "child", "men": "man", "women": "woman", "people": "person", "mice": "mouse", "feet": "foot", "teeth": "tooth", "geese": "goose", "sheep": "sheep", "deer": "deer", "fish": "fish" };
  if (!entry && irregulares[key]) {
    entry = englishDictionary[irregulares[key]] || null;
    esPlural = !!entry;
  }
  if (entry) {
    return { ...entry, esPlural };
  }
  return null;
}

function pluralizarEspanol(palabraEsp) {
  const lower = palabraEsp.toLowerCase();
  if (lower.endsWith("z")) return lower.slice(0, -1) + "ces";
  if (lower.endsWith("s") || lower.endsWith("x")) return lower;
  if (["a","e","i","o","u"].includes(lower.slice(-1))) return lower + "s";
  return lower + "es";
}

function fuzzyLookupEn(word) {
  const key = word.toLowerCase();
  if (!key || key.length < 3) return null;
  const keys = Object.keys(englishDictionary);
  let best = null;
  let bestDist = Infinity;
  const firstChar = key[0];
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
    return { entry: englishDictionary[best], matched: best, distance: bestDist };
  }
  for (const dictKey of keys) {
    if (dictKey[0] !== firstChar) continue;
    if (dictKey.startsWith(key) && dictKey.length - key.length <= 3) {
      return { entry: englishDictionary[dictKey], matched: dictKey, distance: dictKey.length - key.length };
    }
  }
  return null;
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

function expandirContracciones(texto) {
  const palabras = texto.split(/(\s+)/);
  return palabras.map(p => {
    const lower = p.toLowerCase();
    return CONTRACTIONS[lower] ? CONTRACTIONS[lower].expanded : p;
  }).join("");
}

async function analizarLexico(texto, direccion = "es-en") {
  const tokens = [];
  const errors = [];

  if (!texto || texto.trim() === "") {
    errors.push({
      tipo: "Léxico",
      descripcion: "El texto de entrada está vacío.",
      posicion: 0,
      palabra: ""
    });
    return { tokens, errors };
  }

  if (REGEX.INVALID_CHAR.test(texto)) {
    const match = texto.match(REGEX.INVALID_CHAR);
    errors.push({
      tipo: "Léxico",
      descripcion: `Carácter inválido encontrado: '${match[0]}'`,
      posicion: texto.indexOf(match[0]) + 1,
      palabra: match[0]
    });
  }

  const esEN = direccion === "en-es";

  if (esEN) {
    texto = expandirContracciones(texto);
  }

  const rawTokens = texto.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ']+|\d+(\.\d+)?|[.,?!;:¿¡"]/g) || [];
  let posicion = 1;

  const lookupSource = esEN ? lookupEnglishWord : _lookupWord;
  const fuzzySource = esEN ? fuzzyLookupEn : _fuzzyLookup;
  const apiLang = esEN ? "en|es" : "es|en";
  const catSustantivo = esEN ? "Noun" : "Sustantivo";
  const catVerbo = esEN ? "Verb" : "Verbo";
  const catAdjetivo = esEN ? "Adjective" : "Adjetivo";
  const catAdverbio = esEN ? "Adverb" : "Adverbio";
  const catPronombre = esEN ? "Pronoun" : "Pronombre";
  const catPreposicion = esEN ? "Preposition" : "Preposición";

  for (let i = 0; i < rawTokens.length; i++) {
    const raw = rawTokens[i];
    const rawLower = raw.toLowerCase();

    if (REGEX.PUNCTUATION.test(raw)) {
      const entry = _lookupWord(raw);
      tokens.push({
        posicion: posicion,
        palabra: raw,
        token: entry ? entry.token : "PUNCT",
        categoria: entry ? entry.category : "Signo de puntuación",
        traduccion: entry ? entry.translation : raw
      });
      posicion++;
      continue;
    }

    if (REGEX.NUMBER.test(raw)) {
      tokens.push({
        posicion: posicion,
        palabra: raw,
        token: "NUM_LITERAL",
        categoria: "Numeral literal",
        traduccion: raw
      });
      posicion++;
      continue;
    }

    if (!esEN && CONTRACTIONS[rawLower]) {
      const contraction = CONTRACTIONS[rawLower];
      tokens.push({
        posicion: posicion,
        palabra: raw,
        token: "CONTRACTION",
        categoria: "Contracción",
        traduccion: contraction.translation,
        expanded: contraction.expanded
      });
      posicion++;
      continue;
    }

    if (REGEX.WORD.test(raw) || (esEN && REGEX.WORD.test(raw.replace("'", "")))) {
      const entry = lookupSource(rawLower);
      if (entry) {
        // Ambiguous: "la","los","las" can be ART_DEF or CLIT — use ART_DEF if next token is a NOUN
        let resolvedEntry = entry;
        if (!esEN && (rawLower === "la" || rawLower === "los" || rawLower === "las") && entry.token === "CLIT") {
          const nextIdx = i + 1;
          if (nextIdx < rawTokens.length) {
            const nextWord = rawTokens[nextIdx].toLowerCase().replace(/[^a-záéíóúüñ]/g, "");
            if (nextWord) {
              let esNoun = false;
              const nextDictEntry = lookupSource(nextWord);
              if (nextDictEntry && nextDictEntry.token === "NOUN") {
                esNoun = true;
              }
              // Check fuzzy/plural for the next word
              if (!esNoun) {
                const fuzzyNext = fuzzySource(nextWord);
                if (fuzzyNext && fuzzyNext.entry.token === "NOUN") {
                  esNoun = true;
                }
              }
              if (!esNoun && nextWord.endsWith("s") && nextWord.length > 2) {
                const singularGuess = nextWord.slice(0, -1);
                const singEntry = lookupSource(singularGuess);
                if (singEntry && singEntry.token === "NOUN") {
                  esNoun = true;
                }
              }
              // Check if next word is a numeral followed by a noun (e.g. "los cuatro puntos")
              if (!esNoun) {
                const nextDictEntry2 = lookupSource(nextWord);
                if (nextDictEntry2 && ["NUM_CARD", "NUM_ORD", "NUM_LITERAL"].includes(nextDictEntry2.token)) {
                  const afterNumIdx = nextIdx + 1;
                  if (afterNumIdx < rawTokens.length) {
                    const afterNumWord = rawTokens[afterNumIdx].toLowerCase().replace(/[^a-záéíóúüñ]/g, "");
                    if (afterNumWord) {
                      const numNextEntry = lookupSource(afterNumWord);
                      if (numNextEntry && numNextEntry.token === "NOUN") {
                        esNoun = true;
                      }
                      if (!esNoun) {
                        const fuzzyNum = fuzzySource(afterNumWord);
                        if (fuzzyNum && fuzzyNum.entry.token === "NOUN") {
                          esNoun = true;
                        }
                      }
                      if (!esNoun && afterNumWord.endsWith("s") && afterNumWord.length > 2) {
                        const sg = afterNumWord.slice(0, -1);
                        const sgEntry = lookupSource(sg);
                        if (sgEntry && sgEntry.token === "NOUN") {
                          esNoun = true;
                        }
                      }
                    }
                  }
                }
              }
              if (esNoun) {
                resolvedEntry = { token: "ART_DEF", category: "Artículo definido", translation: "the" };
              }
            }
          }
        }
        let traduccion = resolvedEntry.translation;
        if (esEN && resolvedEntry.esPlural) traduccion = pluralizarEspanol(traduccion);
        tokens.push({
          posicion: posicion,
          palabra: raw,
          token: resolvedEntry.token,
          categoria: resolvedEntry.category,
          traduccion: traduccion
        });
      } else {
        const normalized = normalizarTildes(rawLower);
        const normLookup = lookupSource(normalized) || NORMALIZED_SOURCE[normalized];
        if (normLookup) {
          const normEntry = normLookup.entry || normLookup;
          let traduccion = normEntry.translation;
          if (esEN && normEntry.esPlural) traduccion = pluralizarEspanol(traduccion);
          const originalWord = normLookup.original || normalized;
          const accented = normalized !== rawLower;
          tokens.push({ posicion, palabra: raw, token: normEntry.token, categoria: normEntry.category + (accented ? ` (Corregido: ${originalWord})` : ""), traduccion });
          errors.push({ tipo: "Semántico", leve: true, descripcion: accented ? `Palabra sin tilde: se esperaba '${normalized}'` : `Palabra sin tilde: se esperaba '${originalWord}'`, posicion, palabra: raw, sugerencia: `Corrige la tilde: '${raw}' → '${accented ? normalized : originalWord}'` });
          posicion++;
          continue;
        }
        const fuzzy = fuzzySource(rawLower);
        if (fuzzy) {
          let traduccion = fuzzy.entry.translation;
          if (esEN && fuzzy.entry.esPlural) traduccion = pluralizarEspanol(traduccion);
          tokens.push({
            posicion: posicion,
            palabra: raw,
            token: fuzzy.entry.token,
            categoria: fuzzy.entry.category + " (Corregido: " + fuzzy.matched + ")",
            traduccion: traduccion
          });
        } else {
        let translation = rawLower;
        let guessedToken = "NOUN";
        let guessedCategory = catSustantivo;
        let apiSuccess = false;
        let wordIdentified = false;

        try {
          const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawLower)}&langpair=${apiLang}`, {
            signal: AbortSignal.timeout(3000)
          });
          if (response.ok) {
            const data = await response.json();
            const translatedText = data.responseData?.translatedText?.trim();
            if (translatedText && !translatedText.toLowerCase().includes("mymemory")) {
              translation = translatedText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
              
              if (!esEN) {
                const rawLowerClean = rawLower.replace(/[áéíóúüñ]/g, (m) => {
                  const map = {"á":"a","é":"e","í":"i","ó":"o","ú":"u","ü":"u","ñ":"n"};
                  return map[m] || m;
                });
                const words = translation.split(/\s+/);
                if (words.length > 1) {
                  const filteredWords = words.filter(w => {
                    const wLower = w.toLowerCase();
                    const wLowerClean = wLower.replace(/[áéíóúüñ]/g, (m) => {
                      const map = {"á":"a","é":"e","í":"i","ó":"o","ú":"u","ü":"u","ñ":"n"};
                      return map[m] || m;
                    });
                    return wLower !== rawLower && wLowerClean !== rawLowerClean;
                  });
                  if (filteredWords.length > 0) {
                    translation = filteredWords.join(" ");
                  }
                }
                const palabraUnica = rawLower.trim().split(/\s+/).length === 1;
                const respuestaMultiple = translation.trim().split(/\s+/).length > 1;
                if (palabraUnica && respuestaMultiple) {
                  apiSuccess = false;
                } else {
                  apiSuccess = true;
                }
              } else {
                apiSuccess = true;
              }
            }
          }
        } catch (err) {
        }

        if (apiSuccess) {
          const cleanTranslationLower = translation.toLowerCase();
          const localEntry = esEN
            ? lookupEnglishWord(rawLower)
            : englishDictionary[cleanTranslationLower];
          if (localEntry) {
            guessedToken = localEntry.token;
            guessedCategory = localEntry.category;
            wordIdentified = true;
          } else {
            try {
              const dictLang = esEN ? "en" : "en";
              const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${dictLang}/${encodeURIComponent(esEN ? rawLower : cleanTranslationLower)}`, {
                signal: AbortSignal.timeout(2000)
              });
              if (dictRes.ok) {
                const dictData = await dictRes.json();
                const pos = dictData[0]?.meanings[0]?.partOfSpeech;
                if (pos) {
                  if (pos === "noun") { guessedToken = "NOUN"; guessedCategory = catSustantivo; }
                  else if (pos === "verb") { guessedToken = "VERB"; guessedCategory = catVerbo; }
                  else if (pos === "adjective") { guessedToken = "ADJ"; guessedCategory = catAdjetivo; }
                  else if (pos === "adverb") { guessedToken = "ADV_MODE"; guessedCategory = catAdverbio; }
                  else if (pos === "pronoun") { guessedToken = "PRON_PERS"; guessedCategory = catPronombre; }
                  else if (pos === "preposition") { guessedToken = "PREP"; guessedCategory = catPreposicion; }
                  wordIdentified = true;
                }
              }
             } catch (err) {
              const guessed = guessPOS(rawTokens, i, esEN);
              guessedToken = guessed.token;
              guessedCategory = guessed.category;
            }
          }
          if (!wordIdentified) {
            errors.push({
              tipo: "Léxico",
              descripcion: `Palabra no reconocida: '${raw}'`,
              posicion: posicion,
              palabra: raw
            });
          }
          
          tokens.push({
            posicion: posicion,
            palabra: raw,
            token: guessedToken,
            categoria: `${guessedCategory} (Dinámico)`,
            traduccion: translation
          });
        } else {
          const guessed = guessPOS(rawTokens, i, esEN);
          tokens.push({
            posicion: posicion,
            palabra: raw,
            token: guessed.token,
            categoria: `${guessed.category} (Sugerido)`,
            traduccion: guessed.translation
          });
          errors.push({
            tipo: "Léxico",
            descripcion: `Palabra no reconocida: '${raw}'`,
            posicion: posicion,
            palabra: raw
          });
        }
        }
      }
      posicion++;
      continue;
    }

    errors.push({
      tipo: "Léxico",
      descripcion: `Elemento no reconocido: '${raw}'`,
      posicion: posicion,
      palabra: raw
    });
    posicion++;
  }

  return { tokens, errors };
}

function guessPOS(rawTokens, index, esEN = false) {
  const raw = rawTokens[index];
  const rawLower = raw.toLowerCase();

  if (esEN) {
    if (rawLower.endsWith("ly") && rawLower.length > 3) {
      return { token: "ADV_MODE", category: "Adverb", translation: rawLower };
    }
    if (rawLower.endsWith("tion") || rawLower.endsWith("sion") || rawLower.endsWith("ment") || rawLower.endsWith("ness") || rawLower.endsWith("ity") || rawLower.endsWith("er") || rawLower.endsWith("or") || rawLower.endsWith("ist") || rawLower.endsWith("ism")) {
      return { token: "NOUN", category: "Noun", translation: rawLower };
    }
    if (rawLower.endsWith("ous") || rawLower.endsWith("al") || rawLower.endsWith("ful") || rawLower.endsWith("less") || rawLower.endsWith("ive") || rawLower.endsWith("able") || rawLower.endsWith("ible") || rawLower.endsWith("ic") || rawLower.endsWith("ish") || rawLower.endsWith("like")) {
      return { token: "ADJ", category: "Adjective", translation: rawLower };
    }
    if (rawLower.endsWith("ing") || rawLower.endsWith("ed")) {
      return { token: "VERB", category: "Verb", translation: rawLower };
    }
  } else {
    if (rawLower.endsWith("mente") && rawLower.length > 5) {
      return { token: "ADV_MODE", category: "Adverbio", translation: rawLower };
    }
    if (
      ((rawLower.endsWith("ar") || rawLower.endsWith("er") || rawLower.endsWith("ir")) && rawLower.length > 2) ||
      (rawLower.endsWith("ndo") && rawLower.length > 3) ||
      ((rawLower.endsWith("ado") || rawLower.endsWith("ido")) && rawLower.length > 3) ||
      (rawLower.endsWith("ste") && rawLower.length > 3) ||
      (rawLower.endsWith("mos") && rawLower.length > 3)
    ) {
      return { token: "VERB", category: "Verbo", translation: rawLower };
    }
    if (
      rawLower.endsWith("cion") || rawLower.endsWith("ción") ||
      rawLower.endsWith("sion") || rawLower.endsWith("sión") ||
      rawLower.endsWith("dad") || rawLower.endsWith("tad") ||
      rawLower.endsWith("ez")
    ) {
      return { token: "NOUN", category: "Sustantivo", translation: rawLower };
    }
  }

  const prev = index > 0 ? rawTokens[index - 1].toLowerCase() : null;
  const next = index < rawTokens.length - 1 ? rawTokens[index + 1].toLowerCase() : null;

  const lookupFn = esEN
    ? (w) => { const k = w.toLowerCase(); return englishDictionary[k] || null; }
    : (w) => { const k = w.toLowerCase(); return _dictionary[k] || null; };

  const prevEntry = prev ? lookupFn(prev) : null;
  const nextEntry = next ? lookupFn(next) : null;

  if (prevEntry && prevEntry.token === "PRON_PERS") {
    return { token: "VERB", category: esEN ? "Verb" : "Verbo", translation: rawLower };
  }

  if (esEN) {
    if (prev && ["the", "a", "an", "this", "that", "these", "those", "my", "your", "his", "her", "its", "our", "their"].includes(prev)) {
      if (nextEntry && nextEntry.token === "NOUN") {
        return { token: "ADJ", category: "Adjective", translation: rawLower };
      }
      return { token: "NOUN", category: "Noun", translation: rawLower };
    }
  } else {
    if (prev && prev === "no") {
      return { token: "VERB", category: "Verbo", translation: rawLower };
    }
    const DETERMINANTES_ESP = ["el", "la", "los", "las", "un", "una", "unos", "unas", "mi", "mis", "tu", "tus", "su", "sus", "este", "esta", "estos", "estas", "ese", "esa", "esos", "esas", "aquel", "aquella"];
    if (prev && (DETERMINANTES_ESP.includes(prev) || (prevEntry && ["ART_DEF", "ART_INDEF", "POS", "PRON_DEM", "DET_INDEF"].includes(prevEntry.token)))) {
      if (nextEntry && nextEntry.token === "NOUN") {
        return { token: "ADJ", category: "Adjetivo", translation: rawLower };
      }
      return { token: "NOUN", category: "Sustantivo", translation: rawLower };
    }
  }

  if (nextEntry && nextEntry.token === "NOUN") {
    return { token: "ADJ", category: esEN ? "Adjective" : "Adjetivo", translation: rawLower };
  }
  if (nextEntry && nextEntry.token === "VERB") {
    return { token: "NOUN", category: esEN ? "Noun" : "Sustantivo", translation: rawLower };
  }
  if (prevEntry && prevEntry.token === "VERB") {
    return { token: "NOUN", category: esEN ? "Noun" : "Sustantivo", translation: rawLower };
  }

  return { token: "NOUN", category: esEN ? "Noun" : "Sustantivo", translation: rawLower };
}

function generarTablaSimbolos(tokens) {
  return tokens.map((t, index) => ({
    numero: index + 1,
    posicion: t.posicion,
    palabra: t.palabra,
    token: t.token,
    categoria: t.categoria,
    traduccion: t.traduccion
  }));
}

function generarTablaErrores(errors) {
  return errors.map((e, index) => ({
    numero: index + 1,
    tipo: e.tipo,
    palabra: e.palabra,
    posicion: e.posicion,
    descripcion: e.descripcion
  }));
}

function normalizarTildes(palabra) {
  const map = { 'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u','ñ':'n','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','Ü':'U','Ñ':'N' };
  return palabra.replace(/[áéíóúüñÁÉÍÓÚÜÑ]/g, m => map[m] || m);
}

function hayErroresLexicos(errors) {
  return errors.some(e => e.tipo === "Léxico");
}

export {
    analizarLexico,
    generarTablaSimbolos,
    generarTablaErrores,
    hayErroresLexicos,
    normalizarTildes,
    REGEX,
    CONTRACTIONS
  };

