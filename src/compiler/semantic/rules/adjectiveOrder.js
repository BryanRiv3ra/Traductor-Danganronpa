import { VERBOS_COPULATIVOS } from "../tables.js";

function verificarOrdenAdjetivo(tokens, errors) {
  for (let i = 0; i < tokens.length - 1; i++) {
    const actual = tokens[i];
    const siguiente = tokens[i + 1];

    if (actual.token === "ADJ" && siguiente.token === "NOUN") {
      let hayVerboCopulativo = false;
      for (let j = 0; j < i; j++) {
        if (tokens[j].token === "VERB" && ["es", "está", "son", "están", "era", "estaba", "fueron", "eran"].includes(tokens[j].palabra.toLowerCase())) {
          hayVerboCopulativo = true;
          break;
        }
      }
      if (hayVerboCopulativo) continue;

      errors.push({
        tipo: "Semántico",
        descripcion: `Orden incorrecto: el adjetivo '${actual.palabra}' va antes del sustantivo '${siguiente.palabra}'. En español el adjetivo atributivo va después del sustantivo.`,
        posicion: actual.posicion,
        palabra: actual.palabra
      });
    }
  }
}

export { verificarOrdenAdjetivo };