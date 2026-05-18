import { VERBOS_MODALES, MODALES_MAL_CONJUGADOS } from "../tables.js";

function verificarVerbosModales(tokens, errors) {
  const MODALES_ESP = [
    "puedo", "puedes", "puede", "podemos", "pueden", "podía", "podías", "podían", "podíamos", "podré", "podrás", "podrá", "podremos", "podrán",
    "debo", "debes", "debe", "debemos", "deben", "debería", "deberías", "deberíamos", "deberían", "deberé", "deberás", "deberá", "deberemos", "deberán",
    "quiero", "quieres", "quiere", "queremos", "quieren", "quisiera", "quisieras", "quisieran", "querré", "querrás", "querrá", "querremos", "querrán"
  ];

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const palabra = tok.palabra.toLowerCase();

    if (tok.token === "VERB" && MODALES_ESP.includes(palabra)) {
      let idxSiguienteVerbo = -1;
      for (let j = i + 1; j < tokens.length; j++) {
        if (tokens[j].token === "VERB") {
          idxSiguienteVerbo = j;
          break;
        }
        if (tokens[j].token === "NOUN" || (tokens[j].token && tokens[j].token.startsWith("PUNCT"))) {
          break;
        }
      }

      if (idxSiguienteVerbo !== -1) {
        const siguienteVerbo = tokens[idxSiguienteVerbo];
        const infLower = siguienteVerbo.palabra.toLowerCase();
        const esInfinitivo = infLower.endsWith("ar") || infLower.endsWith("er") || infLower.endsWith("ir");

        if (!esInfinitivo) {
          errors.push({
            tipo: "Semántico",
            descripcion: `Después del verbo modal '${tok.palabra}' el verbo debe ir en infinitivo (terminar en -ar, -er, -ir), no '${siguienteVerbo.palabra}'.`,
            posicion: siguienteVerbo.posicion,
            palabra: siguienteVerbo.palabra
          });
        }
      }
    }
  }
}

export { verificarVerbosModales };