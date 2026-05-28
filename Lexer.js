// ============================================================
//  lexer.js
//  Análisis Léxico — Compilador Traductor Inglés → Español
//  Proyecto Grupal Compiladores 2026
//  Universidad Mariano Gálvez de Guatemala
// ============================================================

// Importar diccionario (en Node.js)
// En el navegador, dictionary.js debe cargarse antes que lexer.js
let _dictionary, _lookupWord;

if (typeof module !== "undefined" && module.exports) {
  const dict = require("./dictionary.js");
  _dictionary = dict.dictionary;
  _lookupWord = dict.lookupWord;
} else {
  // En navegador, se usan las variables globales de dictionary.js
  _dictionary = dictionary;
  _lookupWord = lookupWord;
}

// ─────────────────────────────────────────────
// EXPRESIONES REGULARES
// ─────────────────────────────────────────────
const REGEX = {
  // Palabra válida en inglés: letras y apóstrofe (para contracciones: don't, it's, etc.)
  WORD: /^[a-zA-Z']+$/,

  // Número entero o decimal
  NUMBER: /^\d+(\.\d+)?$/,

  // Signos de puntuación reconocidos
  PUNCTUATION: /^[.,?!;:'"]+$/,

  // Espacio en blanco
  WHITESPACE: /^\s+$/,

  // Contracciones comunes del inglés
  CONTRACTION: /^[a-zA-Z]+'[a-zA-Z]+$/,

  // Carácter inválido (no letra, no número, no puntuación reconocida)
  INVALID_CHAR: /[^a-zA-Z0-9.,?!;:'" \t\n\r]/
};

// ─────────────────────────────────────────────
// TABLA DE CONTRACCIONES
// Expande contracciones a sus formas completas
// ─────────────────────────────────────────────
const CONTRACTIONS = {
  "don't":   { expanded: "do not",    translation: "no" },
  "doesn't": { expanded: "does not",  translation: "no" },
  "didn't":  { expanded: "did not",   translation: "no" },
  "won't":   { expanded: "will not",  translation: "no" },
  "wouldn't":{ expanded: "would not", translation: "no haría" },
  "can't":   { expanded: "can not",   translation: "no puede" },
  "couldn't":{ expanded: "could not", translation: "no podría" },
  "shouldn't":{ expanded: "should not",translation: "no debería" },
  "isn't":   { expanded: "is not",    translation: "no es/está" },
  "aren't":  { expanded: "are not",   translation: "no son/están" },
  "wasn't":  { expanded: "was not",   translation: "no era/estaba" },
  "weren't": { expanded: "were not",  translation: "no eran/estaban" },
  "haven't": { expanded: "have not",  translation: "no he/han" },
  "hasn't":  { expanded: "has not",   translation: "no ha" },
  "hadn't":  { expanded: "had not",   translation: "no había" },
  "i'm":     { expanded: "i am",      translation: "yo soy/estoy" },
  "i've":    { expanded: "i have",    translation: "yo he" },
  "i'll":    { expanded: "i will",    translation: "yo haré" },
  "i'd":     { expanded: "i would",   translation: "yo haría" },
  "you're":  { expanded: "you are",   translation: "tú eres/estás" },
  "you've":  { expanded: "you have",  translation: "tú has" },
  "you'll":  { expanded: "you will",  translation: "tú harás" },
  "he's":    { expanded: "he is",     translation: "él es/está" },
  "she's":   { expanded: "she is",    translation: "ella es/está" },
  "it's":    { expanded: "it is",     translation: "ello es/está" },
  "we're":   { expanded: "we are",    translation: "nosotros somos/estamos" },
  "they're": { expanded: "they are",  translation: "ellos son/están" },
  "there's": { expanded: "there is",  translation: "hay" },
  "that's":  { expanded: "that is",   translation: "eso es" },
  "what's":  { expanded: "what is",   translation: "qué es" },
  "let's":   { expanded: "let us",    translation: "vamos a" }
};

// ─────────────────────────────────────────────
// FUNCIÓN PRINCIPAL: analizarLexico
// Recibe: texto (string)
// Retorna: { tokens, errors }
// ─────────────────────────────────────────────
function analizarLexico(texto) {

  const tokens = [];   // Lista de tokens encontrados
  const errors = [];   // Lista de errores léxicos

  if (!texto || texto.trim() === "") {
    errors.push({
      tipo:        "Léxico",
      descripcion: "El texto de entrada está vacío.",
      posicion:    0,
      palabra:     ""
    });
    return { tokens, errors };
  }

  // Verificar caracteres inválidos en todo el texto
  if (REGEX.INVALID_CHAR.test(texto)) {
    const match = texto.match(REGEX.INVALID_CHAR);
    errors.push({
      tipo:        "Léxico",
      descripcion: `Carácter inválido encontrado: '${match[0]}'`,
      posicion:    texto.indexOf(match[0]) + 1,
      palabra:     match[0]
    });
  }

  // Tokenizar: separar texto en palabras y signos de puntuación
  // Regex que captura: palabras (con apóstrofe), números, puntuación
  const rawTokens = texto.match(/[a-zA-Z']+|\d+(\.\d+)?|[.,?!;:"]/g) || [];

  let posicion = 1; // Posición de la palabra en la oración

  for (let i = 0; i < rawTokens.length; i++) {
    const raw = rawTokens[i];
    const rawLower = raw.toLowerCase();

    // ── Signo de puntuación ───────────────────
    if (REGEX.PUNCTUATION.test(raw)) {
      const entry = _lookupWord(raw);
      tokens.push({
        posicion:   posicion,
        palabra:    raw,
        token:      entry ? entry.token : "PUNCT",
        categoria:  entry ? entry.category : "Signo de puntuación",
        traduccion: entry ? entry.translation : raw
      });
      posicion++;
      continue;
    }

    // ── Número ────────────────────────────────
    if (REGEX.NUMBER.test(raw)) {
      tokens.push({
        posicion:   posicion,
        palabra:    raw,
        token:      "NUM_LITERAL",
        categoria:  "Numeral literal",
        traduccion: raw // Los números no cambian
      });
      posicion++;
      continue;
    }

    // ── Contracción ───────────────────────────
    if (CONTRACTIONS[rawLower]) {
      const contraction = CONTRACTIONS[rawLower];
      tokens.push({
        posicion:   posicion,
        palabra:    raw,
        token:      "CONTRACTION",
        categoria:  "Contracción",
        traduccion: contraction.translation,
        expanded:   contraction.expanded
      });
      posicion++;
      continue;
    }

    // ── Palabra normal: buscar en diccionario ─
    if (REGEX.WORD.test(raw)) {
      const entry = _lookupWord(rawLower);

      if (entry) {
        // Palabra reconocida ✓
        tokens.push({
          posicion:   posicion,
          palabra:    raw,
          token:      entry.token,
          categoria:  entry.category,
          traduccion: entry.translation
        });
      } else {
        // Palabra NO reconocida → error léxico
        tokens.push({
          posicion:   posicion,
          palabra:    raw,
          token:      "UNKNOWN",
          categoria:  "Desconocido",
          traduccion: "???"
        });
        errors.push({
          tipo:        "Léxico",
          descripcion: `Palabra no reconocida en el diccionario: '${raw}'`,
          posicion:    posicion,
          palabra:     raw
        });
      }
      posicion++;
      continue;
    }

    // ── Cualquier otra cosa → error léxico ───
    errors.push({
      tipo:        "Léxico",
      descripcion: `Elemento no reconocido: '${raw}'`,
      posicion:    posicion,
      palabra:     raw
    });
    posicion++;
  }

  return { tokens, errors };
}

// ─────────────────────────────────────────────
// FUNCIÓN: generarTablaSimbolos
// Recibe: resultado del analizarLexico
// Retorna: array con la tabla de símbolos
// ─────────────────────────────────────────────
function generarTablaSimbolos(tokens) {
  return tokens.map((t, index) => ({
    numero:     index + 1,
    posicion:   t.posicion,
    palabra:    t.palabra,
    token:      t.token,
    categoria:  t.categoria,
    traduccion: t.traduccion
  }));
}

// ─────────────────────────────────────────────
// FUNCIÓN: generarTablaErrores
// Recibe: array de errores
// Retorna: array formateado de errores
// ─────────────────────────────────────────────
function generarTablaErrores(errors) {
  return errors.map((e, index) => ({
    numero:      index + 1,
    tipo:        e.tipo,
    palabra:     e.palabra,
    posicion:    e.posicion,
    descripcion: e.descripcion
  }));
}

// ─────────────────────────────────────────────
// FUNCIÓN: hayErroresLexicos
// ─────────────────────────────────────────────
function hayErroresLexicos(errors) {
  return errors.some(e => e.tipo === "Léxico");
}

// ─────────────────────────────────────────────
// EXPORTAR
// ─────────────────────────────────────────────
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    analizarLexico,
    generarTablaSimbolos,
    generarTablaErrores,
    hayErroresLexicos,
    REGEX,
    CONTRACTIONS
  };
}

// ─────────────────────────────────────────────
// PRUEBA RÁPIDA (solo en Node.js directo)
// Ejecutar: node lexer.js
// ─────────────────────────────────────────────
if (typeof require !== "undefined" && require.main === module) {
  const pruebas = [
    "The cat is big",
    "She runs quickly to the park",
    "I don't know the answer",
    "The xyz dog is happy",
    "He eats good food every day",
    "Hello, my name is John!"
  ];

  pruebas.forEach(texto => {
    console.log("\n" + "=".repeat(60));
    console.log("ENTRADA:", texto);
    console.log("=".repeat(60));

    const { tokens, errors } = analizarLexico(texto);
    const tablaSimbolos = generarTablaSimbolos(tokens);
    const tablaErrores  = generarTablaErrores(errors);

    console.log("\n📋 TABLA DE SÍMBOLOS:");
    console.table(tablaSimbolos);

    if (tablaErrores.length > 0) {
      console.log("\n❌ TABLA DE ERRORES LÉXICOS:");
      console.table(tablaErrores);
    } else {
      console.log("\n✅ Sin errores léxicos.");
    }
  });
}