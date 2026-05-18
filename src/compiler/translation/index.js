import { traducir, traducirAEspanol } from "./translate.js";

function generarTraduccion(resultadoLexer, resultadoParser, resultadoSemantico, direccion = "es-en") {
  const hayErroresLex = resultadoLexer.errors.length > 0;
  const hayErroresSin = resultadoParser.errors.length > 0;
  const hayErroresSem = resultadoSemantico.errors.length > 0;

  if (hayErroresLex || hayErroresSin || hayErroresSem) {
    return {
      traduccion: null,
      exitoso: false,
      mensaje: "No se puede traducir porque existen errores en el análisis."
    };
  }

  const resultado = direccion === "en-es"
    ? traducirAEspanol(resultadoLexer.tokens, resultadoParser.tipoOracion)
    : traducir(resultadoLexer.tokens, resultadoParser.tipoOracion);

  return {
    traduccion: resultado.traduccion,
    palabras: resultado.palabras,
    exitoso: true,
    mensaje: "Traducción generada exitosamente."
  };
}

export { generarTraduccion, traducir, traducirAEspanol };

