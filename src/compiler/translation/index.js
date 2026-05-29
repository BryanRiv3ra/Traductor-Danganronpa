import { traducir, traducirAEspanol } from "./translate.js";

function generarTraduccion(resultadoLexer, resultadoParser, resultadoSemantico, direccion = "es-en") {
  const hayErroresLex = resultadoLexer.errors.length > 0;
  const hayErroresSin = resultadoParser.errors.length > 0;
  const hayErroresSem = resultadoSemantico.errors.length > 0;

  let traduccion = null;
  let palabras = [];
  let exitoso = false;

  try {
    const resultado = direccion === "en-es"
      ? traducirAEspanol(resultadoLexer.tokens, resultadoParser.tipoOracion)
      : traducir(resultadoLexer.tokens, resultadoParser.tipoOracion);
      
    traduccion = resultado.traduccion;
    palabras = resultado.palabras;
    exitoso = !hayErroresLex && !hayErroresSin && !hayErroresSem;
  } catch (e) {
    // Si la traducción estructurada falla por errores sintácticos complejos,
    // recurrimos a una traducción literal palabra por palabra de los tokens
    if (resultadoLexer.tokens && resultadoLexer.tokens.length > 0) {
      traduccion = resultadoLexer.tokens
        .map(t => {
          if (t.token && t.token.startsWith("PUNCT")) return t.palabra;
          return t.traduccion || t.palabra;
        })
        .join(" ")
        .replace(/\s([.,;:!?])/g, "$1");
      
      if (traduccion.length > 0) {
        traduccion = traduccion.charAt(0).toUpperCase() + traduccion.slice(1);
      }
    }
  }

  return {
    traduccion: traduccion,
    palabras: palabras,
    exitoso: exitoso,
    mensaje: exitoso ? "Traducción generada exitosamente." : "Traducción aproximada generada con advertencias."
  };
}

export { generarTraduccion, traducir, traducirAEspanol };

