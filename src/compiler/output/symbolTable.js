const TIPO_POR_TOKEN = {
  "ART_DEF": "Determinante", "ART_INDEF": "Determinante",
  "PRON_PERS": "Pronombre", "PRON_DEM": "Pronombre", "PRON_INTER": "Pronombre",
  "POS": "Determinante", "DET_INDEF": "Determinante",
  "NUM_CARD": "Numeral", "NUM_ORD": "Numeral", "NUM_LITERAL": "Numeral",
  "NOUN": "Sustantivo", "ADJ": "Adjetivo",
  "VERB": "Verbo",
  "ADV_TIME": "Adverbio", "ADV_PLACE": "Adverbio", "ADV_QUANT": "Adverbio",
  "ADV_MODE": "Adverbio", "ADV_AFFIRM": "Adverbio", "ADV_NEG": "Adverbio", "ADV_DOUBT": "Adverbio",
  "PREP": "Preposición",
  "CONJ_COORD_COP": "Conjunción", "CONJ_COORD_ADV": "Conjunción", "CONJ_COORD_DIS": "Conjunción",
  "CONJ_COORD_EXP": "Conjunción",
  "CONJ_SUB_COND": "Conjunción", "CONJ_SUB_CAUS": "Conjunción", "CONJ_SUB_CONC": "Conjunción",
  "CONJ_SUB_TEMP": "Conjunción", "CONJ_SUB_COMP": "Conjunción", "CONJ_SUB_CONS": "Conjunción",
  "CONJ_SUB_FIN": "Conjunción",
  "INTERJ": "Interjección",
  "CONTRACTION": "Contracción",
  "PUNCT_PERIOD": "Puntuación", "PUNCT_COMMA": "Puntuación", "PUNCT_QUESTION": "Puntuación",
  "PUNCT_EXCLAIM": "Puntuación", "PUNCT_SEMICOLON": "Puntuación", "PUNCT_COLON": "Puntuación",
  "PUNCT_APOST": "Puntuación", "PUNCT_QUOTE": "Puntuación",
  "UNKNOWN": "Desconocido"
};

function generarTablaSimbolos(tokens) {
  if (!tokens || tokens.length === 0) return [];
  return tokens.map((tok, index) => ({
    numero: index + 1,
    posicion: tok.posicion,
    palabra: tok.palabra,
    token: tok.token,
    categoria: tok.categoria,
    traduccion: tok.traduccion,
    tipo: TIPO_POR_TOKEN[tok.token] || "Desconocido"
  }));
}

function filtrarPorTipo(tablaSimbolos, tipo) {
  return tablaSimbolos.filter(s => s.tipo === tipo);
}

function filtrarPorToken(tablaSimbolos, token) {
  return tablaSimbolos.filter(s => s.token === token);
}

function obtenerResumenTabla(tablaSimbolos) {
  const resumen = {};
  tablaSimbolos.forEach(s => { resumen[s.tipo] = (resumen[s.tipo] || 0) + 1; });
  return resumen;
}

function tablaAHTML(tablaSimbolos) {
  if (tablaSimbolos.length === 0) return `<p class="tabla-vacia">No hay símbolos para mostrar.</p>`;
  const filas = tablaSimbolos.map(s => `
    <tr class="fila-${s.tipo.toLowerCase()}">
      <td>${s.numero}</td>
      <td>${s.posicion}</td>
      <td><strong>${s.palabra}</strong></td>
      <td><code>${s.token}</code></td>
      <td>${s.categoria}</td>
      <td>${s.traduccion}</td>
      <td><span class="badge badge-${s.tipo.toLowerCase()}">${s.tipo}</span></td>
    </tr>`).join("");
  return `
    <table class="tabla-simbolos">
      <thead><tr><th>#</th><th>Pos.</th><th>Palabra</th><th>Token</th><th>Categoría</th><th>Traducción</th><th>Tipo</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>`;
}

function tablaAJSON(tablaSimbolos) {
  return JSON.stringify(tablaSimbolos, null, 2);
}

export { generarTablaSimbolos, filtrarPorTipo, filtrarPorToken, obtenerResumenTabla, tablaAHTML, tablaAJSON, TIPO_POR_TOKEN };

