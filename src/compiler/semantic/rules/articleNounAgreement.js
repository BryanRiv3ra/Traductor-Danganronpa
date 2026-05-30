const ART_SING = new Set(["el", "la", "un", "una"]);
const ART_PL = new Set(["los", "las", "unos", "unas"]);

function verificarConcordanciaArticuloSustantivo(tokens, errors) {
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.token !== "ART_DEF" && tok.token !== "ART_INDEF") continue;
    const pLower = tok.palabra.toLowerCase();
    const esArtSing = ART_SING.has(pLower);
    const esArtPl = ART_PL.has(pLower);
    if (!esArtSing && !esArtPl) continue;

    for (let j = i + 1; j < tokens.length; j++) {
      const next = tokens[j];
      if (next.token === "NOUN") {
        const sustPlural = next.palabra.toLowerCase().endsWith("s");
        if (esArtSing && sustPlural) {
          errors.push({
            tipo: "Semántico",
            descripcion: `Concordancia de número incorrecta: el artículo '${tok.palabra}' es singular pero el sustantivo '${next.palabra}' es plural.`,
            posicion: tok.posicion,
            palabra: tok.palabra,
            sugerencia: `Cambia '${tok.palabra}' por '${pLower === "el" ? "los" : pLower === "la" ? "las" : pLower === "un" ? "unos" : "unas"}' o '${next.palabra}' por '${next.palabra.replace(/s$/, "")}'`
          });
        } else if (esArtPl && !sustPlural) {
          errors.push({
            tipo: "Semántico",
            descripcion: `Concordancia de número incorrecta: el artículo '${tok.palabra}' es plural pero el sustantivo '${next.palabra}' es singular.`,
            posicion: tok.posicion,
            palabra: tok.palabra,
            sugerencia: `Cambia '${tok.palabra}' por '${pLower === "los" ? "el" : pLower === "las" ? "la" : pLower === "unos" ? "un" : "una"}' o '${next.palabra}' por '${next.palabra}s'`
          });
        }
        break;
      }
      if (next.token === "VERB" || next.token === "PREP" || (next.token && next.token.startsWith("PUNCT"))) break;
    }
  }
}

export { verificarConcordanciaArticuloSustantivo };
