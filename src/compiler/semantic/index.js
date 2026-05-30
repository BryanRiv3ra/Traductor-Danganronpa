import { verificarConcordancia } from "./rules/subjectVerb.js";
import { verificarConcordanciaArticuloSustantivo } from "./rules/articleNounAgreement.js";
import { verificarVerbosModales } from "./rules/modals.js";
import { verificarNegacion } from "./rules/negation.js";
import { verificarTiempoVerbal } from "./rules/tense.js";
import { verificarOrdenAdjetivo } from "./rules/adjectiveOrder.js";
import { verificarCoherenciaSujetoComplemento } from "./rules/coherence.js";
import { verificarConcordanciaIngles } from "./rules/subjectVerbEn.js";

const PUNTUACION = [
  "PUNCT_PERIOD", "PUNCT_COMMA", "PUNCT_QUESTION", "PUNCT_EXCLAIM",
  "PUNCT_SEMICOLON", "PUNCT_COLON", "PUNCT_APOST", "PUNCT_QUOTE"
];

function analizarSemantico(resultadoParser, tokensLexer, direccion = "es-en") {
  const erroresSemánticos = [];

  if (resultadoParser.hayErrores) {
    return {
      errors: [],
      hayErrores: true,
      mensaje: "No se puede realizar el análisis semántico porque existen errores sintácticos."
    };
  }

  const tokens = tokensLexer.filter(t => !PUNTUACION.includes(t.token));

  if (direccion === "en-es") {
    verificarConcordanciaIngles(tokens, erroresSemánticos);
  }

  if (direccion === "es-en") {
    verificarConcordancia(tokens, erroresSemánticos);
    verificarConcordanciaArticuloSustantivo(tokens, erroresSemánticos);
    verificarVerbosModales(tokens, erroresSemánticos);
    verificarNegacion(tokens, erroresSemánticos);
    verificarTiempoVerbal(tokens, erroresSemánticos);
    verificarOrdenAdjetivo(tokens, erroresSemánticos);
    verificarCoherenciaSujetoComplemento(tokens, erroresSemánticos);
  }

  return {
    errors: erroresSemánticos,
    hayErrores: erroresSemánticos.length > 0
  };
}

export {
    analizarSemantico,
    verificarConcordancia,
    verificarConcordanciaArticuloSustantivo,
    verificarVerbosModales,
    verificarNegacion,
    verificarTiempoVerbal,
    verificarOrdenAdjetivo,
    verificarCoherenciaSujetoComplemento,
    verificarConcordanciaIngles
  };

