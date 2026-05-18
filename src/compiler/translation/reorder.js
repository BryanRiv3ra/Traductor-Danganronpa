function reordenarFraseNominal(grupo) {
  const articulos = grupo.filter(t => ["ART_DEF", "ART_INDEF"].includes(t.token));
  const sustantivos = grupo.filter(t => t.token === "NOUN");
  const adjetivos = grupo.filter(t => t.token === "ADJ");
  const otros = grupo.filter(t => !["ART_DEF", "ART_INDEF", "NOUN", "ADJ"].includes(t.token));

  // En Español -> Inglés, el orden de salida en inglés debe ser:
  // Artículo + Adjetivo + Sustantivo (ej: "the blue cat" en vez de "el gato azul")
  return [...articulos, ...otros, ...adjetivos, ...sustantivos];
}

export { reordenarFraseNominal };