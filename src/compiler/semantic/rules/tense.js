import { IRREGULARES_MAL_CONJUGADOS } from "../tables.js";

function verificarTiempoVerbal(tokens, errors) {
  for (const tok of tokens) {
    if (tok.token === "VERB" || tok.token === "UNKNOWN") {
      const verbo = tok.palabra.toLowerCase();
      if (IRREGULARES_MAL_CONJUGADOS.hasOwnProperty(verbo)) {
        const correcto = IRREGULARES_MAL_CONJUGADOS[verbo];
        if (correcto !== null) {
          errors.push({
            tipo: "Semántico",
            descripcion: `Tiempo verbal incorrecto: '${tok.palabra}' no es una forma válida. La forma correcta es '${correcto}'.`,
            posicion: tok.posicion,
            palabra: tok.palabra,
            sugerencia: `Usa '${correcto}' en lugar de '${tok.palabra}'`
          });
        }
      }
    }
  }
}

export { verificarTiempoVerbal };