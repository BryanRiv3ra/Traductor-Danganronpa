const SUJETOS_NUMERICOS = new Set([
  "número", "numero", "numbers", "cantidad", "quantity",
  "edad", "age",
  "precio", "price", "costo", "cost",
  "hora", "time", "hours",
  "fecha", "date",
  "año", "año", "años", "ano", "anos", "year",
  "mes", "month",
  "día", "día", "dias", "days",
  "total",
  "suma", "sum",
  "resultado", "result",
  "puntuación", "puntuacion", "puntaje", "score",
  "temperatura", "temperature",
  "distancia", "distance",
  "peso", "weight",
  "altura", "height",
  "longitud", "length",
  "medida", "measure",
  "porcentaje", "percentage",
  "promedio", "average",
  "calificación", "calificacion", "grade"
]);

const PALABRAS_NUMERICAS = new Set([
  "uno", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
  "once", "doce", "trece", "catorce", "quince", "veinte", "treinta", "cuarenta", "cincuenta",
  "sesenta", "setenta", "ochenta", "noventa", "cien", "ciento", "mil", "millón"
]);

const VERBOS_SER_ESTAR_ESP = [
  "es", "son", "era", "eran", "fue", "fueron", "será", "serán",
  "soy", "eres", "somos", "sois", "sea", "sean", "fuera", "fueran",
  "está", "están", "estaba", "estaban", "estoy", "estás", "estamos", "estáis",
  "esté", "estén", "estuviera", "estuvieran"
];

function esInfinitivo(palabra) {
  const lower = palabra.toLowerCase();
  return lower.endsWith("ar") || lower.endsWith("er") || lower.endsWith("ir");
}

function esGerundio(palabra) {
  const lower = palabra.toLowerCase();
  return lower.endsWith("ando") || lower.endsWith("endo");
}

function esPalabraNumerica(palabra) {
  return PALABRAS_NUMERICAS.has(palabra.toLowerCase());
}

function verificarCoherenciaSujetoComplemento(tokens, errors) {
  const idxVerbo = tokens.findIndex(t => t.token === "VERB" && VERBOS_SER_ESTAR_ESP.includes(t.palabra.toLowerCase()));
  if (idxVerbo === -1) return;

  const antesVerbo = tokens.slice(0, idxVerbo);
  const despuesVerbo = tokens.slice(idxVerbo + 1);

  if (despuesVerbo.length === 0) return;

  for (const tok of despuesVerbo) {
    if (tok.token === "VERB" && !esInfinitivo(tok.palabra) && !esGerundio(tok.palabra)) {
      errors.push({
        tipo: "Semántico",
        descripcion: `Incompatibilidad semántica: el verbo copulativo '${tokens[idxVerbo].palabra}' no puede tener un verbo conjugado '${tok.palabra}' como atributo. Use un sustantivo, adjetivo o infinitivo.`,
        posicion: tok.posicion,
        palabra: tok.palabra
      });
      return;
    }
  }

  const tieneNumero = despuesVerbo.some(t => t.token === "NUM_CARD" || t.token === "NUM_LITERAL") ||
                      despuesVerbo.some(t => esPalabraNumerica(t.palabra));
  if (!tieneNumero) return;

  const ultSust = antesVerbo.filter(t => t.token === "NOUN").pop();
  if (!ultSust) return;

  const sustLower = ultSust.palabra.toLowerCase();
  if (SUJETOS_NUMERICOS.has(sustLower) || sustLower.endsWith("s") && SUJETOS_NUMERICOS.has(sustLower.slice(0, -1))) {
    return;
  }

  errors.push({
    tipo: "Semántico",
    descripcion: `Incompatibilidad semántica: '${ultSust.palabra}' no es compatible con un valor numérico. Un número no puede ser atributo de un sujeto no numérico.`,
    posicion: ultSust.posicion,
    palabra: ultSust.palabra
  });
}

export { verificarCoherenciaSujetoComplemento };
