import { conjugateEnglishVerb } from "./conjugation.js";

function procesarNegacion(tokens, esSujetoPlural, pronSujeto) {
  const resultado = [];
  
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const sig = tokens[i + 1];
    
    // Si encontramos "no" (ADV_NEG) seguido por un verbo en español
    if (tok.token === "ADV_NEG" && sig && sig.token === "VERB") {
      const verbLower = sig.palabra.toLowerCase();
      
      const isBe = ["es", "está", "son", "están", "era", "estaba", "eran", "estaban", "soy", "estoy", "eres", "estás", "somos", "estamos"].includes(verbLower);
      const isModal = ["puede", "pueden", "puedo", "puedes", "podemos", "podía", "podías", "podían", "podíamos", "debe", "deben", "debo", "debes", "debemos", "debería", "deberían"].includes(verbLower);
      
      if (isBe) {
        // En inglés: [verbo de ser/estar traducido] + not (ej. "is not", "are not")
        const verbTrad = sig.traduccion || sig.palabra;
        resultado.push({ ...sig, traduccion: verbTrad });
        resultado.push({ token: "ADV_NEG", palabra: "no", categoria: "Negación", traduccion: "not" });
        i++;
        continue;
      }
      
      if (isModal) {
        // En inglés: [modal traducido] + not (ej. "cannot", "should not")
        const verbTrad = sig.traduccion || sig.palabra;
        resultado.push({ ...sig, traduccion: verbTrad });
        resultado.push({ token: "ADV_NEG", palabra: "no", categoria: "Negación", traduccion: "not" });
        i++;
        continue;
      }
      
      // Verbos generales: "do not" / "does not" / "did not" + verbo base
      const isPast = verbLower.endsWith("ó") || verbLower.endsWith("ió") || verbLower.endsWith("é") || verbLower.endsWith("í") || verbLower.endsWith("ste") || verbLower.endsWith("eron") || ["fue", "fueron", "iba", "iban", "vino", "vinieron", "hizo", "hicieron", "tuvo", "tuvieron"].includes(verbLower);
      
      let aux = "do";
      if (isPast) {
        aux = "did";
      } else {
        // Presente: do o does
        const isThirdSingular = pronSujeto === "he" || pronSujeto === "she" || pronSujeto === "it" || (!pronSujeto && !esSujetoPlural);
        if (isThirdSingular) {
          aux = "does";
        }
      }
      
      resultado.push({ token: "VERB", palabra: aux, categoria: "Verbo", traduccion: aux });
      resultado.push({ token: "ADV_NEG", palabra: "no", categoria: "Negación", traduccion: "not" });
      
      const baseVerb = sig.traduccion || sig.palabra;
      const baseVerbClean = conjugateEnglishVerb(baseVerb, "plural"); // obtiene la forma base limpia
      
      resultado.push({ ...sig, traduccion: baseVerbClean });
      i++;
      continue;
    }
    
    resultado.push(tok);
  }
  return resultado;
}

export { procesarNegacion };