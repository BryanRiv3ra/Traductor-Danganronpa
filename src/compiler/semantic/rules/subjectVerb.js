import { SUJETOS_SINGULARES, SUJETOS_PLURALES, VERBOS_MODALES } from "../tables.js";

function obtenerNumeroSujeto(tokens) {
  // Si hay un "y" o "and" entre las palabras que preceden al primer verbo, es un sujeto compuesto (plural)
  const idxVerbo = encontrarVerbo(tokens);
  const limit = idxVerbo !== -1 ? idxVerbo : tokens.length;
  for (let i = 0; i < Math.min(limit, 5); i++) {
    if (tokens[i].token === "CONJ_COORD_COP" && (tokens[i].palabra.toLowerCase() === "y" || tokens[i].palabra.toLowerCase() === "and")) {
      return "plural";
    }
  }

  const pronSingularesEsp = ["yo", "tú", "él", "ella", "ello", "usted"];
  const pronPluralesEsp = ["nosotros", "nosotras", "ellos", "ellas", "ustedes", "vosotros", "vosotras"];

  for (let i = 0; i < Math.min(3, tokens.length); i++) {
    const tok = tokens[i];
    if (tok.token === "PRON_PERS") {
      const p = tok.palabra.toLowerCase();
      if (pronPluralesEsp.includes(p) || SUJETOS_PLURALES.has(p)) return "plural";
      if (pronSingularesEsp.includes(p) || SUJETOS_SINGULARES.has(p)) return "singular";
      if (p === "you") return "plural";
    }
    if (tok.token === "ART_INDEF") return "singular";
    if (tok.token === "ART_DEF" || tok.token === "POS") {
      const noun = tokens.slice(i + 1).find(t => t.token === "NOUN");
      if (noun) return noun.palabra.toLowerCase().endsWith("s") ? "plural" : "singular";
      return "singular";
    }
    if (tok.token === "NOUN") {
      return tok.palabra.toLowerCase().endsWith("s") ? "plural" : "singular";
    }
  }
  return "unknown";
}

function encontrarVerbo(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].token === "VERB") return i;
  }
  return -1;
}

function verificarConcordancia(tokens, errors) {
  const numSujeto = obtenerNumeroSujeto(tokens);
  const idxVerbo = encontrarVerbo(tokens);

  if (idxVerbo === -1 || numSujeto === "unknown") return;

  const tokenVerbo = tokens[idxVerbo];
  const verbo = tokenVerbo.palabra.toLowerCase();

  const esPluralVerb = verbo.endsWith("n") || verbo.endsWith("mos") || ["son", "están", "van", "eran", "fueron"].includes(verbo);
  const esSingularVerb = !esPluralVerb;

  if (numSujeto === "singular" && esPluralVerb) {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia de número incorrecta: el sujeto es singular pero el verbo '${tokenVerbo.palabra}' es plural.`,
      posicion: tokenVerbo.posicion,
      palabra: tokenVerbo.palabra,
      sugerencia: `Cambia el verbo '${tokenVerbo.palabra}' a su forma singular`
    });
  }

  if (numSujeto === "plural" && esSingularVerb) {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia de número incorrecta: el sujeto es plural pero el verbo '${tokenVerbo.palabra}' es singular.`,
      posicion: tokenVerbo.posicion,
      palabra: tokenVerbo.palabra,
      sugerencia: `Cambia el verbo '${tokenVerbo.palabra}' a su forma plural`
    });
  }
}

export { verificarConcordancia };