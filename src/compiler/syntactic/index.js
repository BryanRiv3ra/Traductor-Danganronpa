import { Parser } from "./Parser.js";
import { imprimirArbol } from "./treePrinter.js";

function analizarSintactico(resultadoLexer, direccion = "es-en") {
  const { tokens, errors: erroresLexicos } = resultadoLexer;

  if (erroresLexicos && erroresLexicos.length > 0) {
    return {
      arbol: null,
      errors: [],
      tipoOracion: null,
      hayErrores: true,
      mensaje: "No se puede realizar el análisis sintáctico porque existen errores léxicos."
    };
  }

  const parser = new Parser(tokens, direccion);
  const resultado = parser.analizar();

  return {
    arbol: resultado.arbol,
    errors: resultado.errors,
    tipoOracion: resultado.tipoOracion,
    hayErrores: resultado.errors.length > 0
  };
}

export { analizarSintactico, imprimirArbol, Parser };

