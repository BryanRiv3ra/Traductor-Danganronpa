import { VERBOS_AUX_NEGACION } from "../tables.js";

function verificarNegacion(tokens, errors) {
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const esNo = tok.palabra.toLowerCase() === "no";

    if (tok.token === "ADV_NEG" || esNo) {
      if (i === tokens.length - 1) {
        errors.push({
          tipo: "Semántico",
          descripcion: `La partícula de negación '${tok.palabra}' está al final de la oración sin un verbo que negar.`,
          posicion: tok.posicion,
          palabra: tok.palabra,
          sugerencia: `Agrega un verbo después de '${tok.palabra}' o elimina la negación`
        });
        continue;
      }

      const tokensSiguientes = tokens.slice(i + 1);
      const tieneVerboSiguiente = tokensSiguientes.some(t => t.token === "VERB");
      
      if (!tieneVerboSiguiente) {
        errors.push({
          tipo: "Semántico",
          descripcion: `La partícula de negación '${tok.palabra}' no tiene un verbo asociado más adelante.`,
          posicion: tok.posicion,
          palabra: tok.palabra,
          sugerencia: `Agrega un verbo después de '${tok.palabra}'`
        });
      }
    }
  }
}

export { verificarNegacion };