const PRON_PLURAL = new Set(["they", "we", "you"]);
const PRON_SINGULAR_3RD = new Set(["he", "she", "it"]);

function esSustantivoSingular(palabra) {
  return !palabra.toLowerCase().endsWith("s") || palabra.toLowerCase() === "news";
}

function esSustantivoPlural(palabra) {
  return palabra.toLowerCase().endsWith("s") && palabra.toLowerCase() !== "news";
}

function esVerboTerceraPersona(verbo) {
  const lower = verbo.toLowerCase();
  return lower.endsWith("s") && !esVerboBaseFormaS(lower);
}

function esVerboBaseFormaS(verbo) {
  // Palabras que terminan en s pero son base form
  const baseFormsEndingInS = ["is", "was", "has", "does", "goes", "does"];
  return baseFormsEndingInS.includes(verbo);
}

function obtenerSujetoYNumero(tokens, idxVerb) {
  for (let i = 0; i < idxVerb; i++) {
    const tok = tokens[i];
    if (tok.token === "PRON_PERS") {
      const p = tok.palabra.toLowerCase();
      if (PRON_PLURAL.has(p)) return { token: tok, numero: "plural" };
      if (PRON_SINGULAR_3RD.has(p)) return { token: tok, numero: "singular" };
    }
    if (tok.token === "NOUN") {
      const p = tok.palabra.toLowerCase();
      if (esSustantivoPlural(p)) return { token: tok, numero: "plural" };
      if (esSustantivoSingular(p)) return { token: tok, numero: "singular" };
    }
  }
  return null;
}

function verificarConcordanciaIngles(tokens, errors) {
  if (!tokens || tokens.length === 0) return;

  const idxVerb = tokens.findIndex(t => t.token === "VERB");
  if (idxVerb === -1) return;

  const verbToken = tokens[idxVerb];
  const verbLower = verbToken.palabra.toLowerCase();

  // Modal verbs don't change form
  const modals = new Set(["can", "could", "will", "would", "shall", "should", "may", "might", "must"]);
  if (modals.has(verbLower)) return;

  // Past tense doesn't have subject-verb agreement in English
  const pastForms = new Set(["was", "were", "had", "did", "went", "ate", "drank", "ran", "sang", "spoke",
    "broke", "drove", "wrote", "gave", "took", "made", "said", "saw", "came", "knew", "got",
    "found", "told", "left", "felt", "thought", "understood"]);
  if (pastForms.has(verbLower)) return;

  const sujeto = obtenerSujetoYNumero(tokens, idxVerb);
  if (!sujeto) return;

  // Check: be verb forms
  if (verbLower === "is" && sujeto.numero === "plural") {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia incorrecta: el sujeto '${sujeto.token.palabra}' es plural pero el verbo es '${verbLower}'. Use 'are'.`,
      posicion: verbToken.posicion,
      palabra: verbToken.palabra,
      sugerencia: `Cambia '${verbLower}' por 'are' para concordar con el sujeto plural '${sujeto.token.palabra}'`
    });
    return;
  }
  if (verbLower === "are" && sujeto.numero === "singular") {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia incorrecta: el sujeto '${sujeto.token.palabra}' es singular pero el verbo es '${verbLower}'. Use 'is'.`,
      posicion: verbToken.posicion,
      palabra: verbToken.palabra,
      sugerencia: `Cambia '${verbLower}' por 'is' para concordar con el sujeto singular '${sujeto.token.palabra}'`
    });
    return;
  }

  // For "has/have"
  if (verbLower === "have" && sujeto.numero === "singular") {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia incorrecta: el sujeto '${sujeto.token.palabra}' es singular pero el verbo es '${verbLower}'. Use 'has'.`,
      posicion: verbToken.posicion,
      palabra: verbToken.palabra,
      sugerencia: `Cambia '${verbLower}' por 'has' para concordar con el sujeto singular '${sujeto.token.palabra}'`
    });
    return;
  }
  if (verbLower === "has" && sujeto.numero === "plural") {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia incorrecta: el sujeto '${sujeto.token.palabra}' es plural pero el verbo es '${verbLower}'. Use 'have'.`,
      posicion: verbToken.posicion,
      palabra: verbToken.palabra,
      sugerencia: `Cambia '${verbLower}' por 'have' para concordar con el sujeto plural '${sujeto.token.palabra}'`
    });
    return;
  }

  // General rule: 3rd person singular verb should end in "s", plural verb should not
  const verbEndsInS = verbLower.endsWith("s") && !modals.has(verbLower) && verbLower !== "is" && verbLower !== "was" && verbLower !== "has" && verbLower !== "does" && verbLower !== "goes" && verbLower !== "yes";

  if (sujeto.numero === "singular" && !verbEndsInS && !verbLower.endsWith("s")) {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia incorrecta: el sujeto '${sujeto.token.palabra}' es singular pero el verbo '${verbLower}' no termina en -s.`,
      posicion: verbToken.posicion,
      palabra: verbToken.palabra,
      sugerencia: `Cambia el verbo '${verbLower}' a '${verbLower}s' para concordar con el sujeto singular '${sujeto.token.palabra}'`
    });
    return;
  }

  if (sujeto.numero === "plural" && verbEndsInS) {
    errors.push({
      tipo: "Semántico",
      descripcion: `Concordancia incorrecta: el sujeto '${sujeto.token.palabra}' es plural pero el verbo '${verbLower}' termina en -s.`,
      posicion: verbToken.posicion,
      palabra: verbToken.palabra,
      sugerencia: `Cambia el verbo '${verbLower}' a su forma base (sin -s) para concordar con el sujeto plural '${sujeto.token.palabra}'`
    });
  }
}

export { verificarConcordanciaIngles };
